import argparse
import json
import multiprocessing
import os
import sys
import time
from datetime import datetime as dt
from typing import Any, Dict, List

# Add type stubs for external libraries
import pandas as pd  # type: ignore
import requests  # type: ignore
from dotenv import load_dotenv  # type: ignore

# Add the parent directory to the Python path to resolve the utils module
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils import analyse_with_azure  # type: ignore

# Load environment variables from .env file
load_dotenv()

water_tagging_prompt = """
# Objective
You are an expert UNDP analyst. Review this project information and determine whether the project is water related or water focused, and provide a brief reasoning.

## Guidance
- If any mention of rivers, lakes, streams, brooks, springs, dams, flooding, storm surges or water infrastructure appears in the project title or description, it's water-focused.
- Likewise, if the project is about water supply, sanitation facilities, water resource management, irrigation systems, flood management, drought management or WASH programs, it's water-focused.
- If the project is about projects which may contain a water element, or isn't primarily related to water management or the water part of the ecosystem, it's water-related.
- If the project has no connection to water at all, classify it as "none".

## Output format
Return a JSON object with two fields:
1. "tag": Either "focused", "related", or "none"
2. "reasoning": A brief 1-2 sentence explanation for the classification

Example:
{
  "tag": "focused",
  "reasoning": "This project directly addresses flood management and water infrastructure development in coastal areas."
}
"""


def main():
    # Parse command-line arguments
    parser = argparse.ArgumentParser(description="Process UNDP projects data")
    parser.add_argument(
        "--start-year",
        type=int,
        default=2023,
        help="Start year for filtering projects (default: 2023)",
    )
    parser.add_argument(
        "--test-limit",
        type=int,
        default=None,
        help="Limit number of projects for testing (default: None)",
    )
    parser.add_argument(
        "--output-file",
        type=str,
        default=None,
        help="Output file path (default: auto-generated with timestamp)",
    )
    parser.add_argument(
        "--project-id",
        type=str,
        default=None,
        help="Specific project ID to process (default: None)",
    )
    args = parser.parse_args()

    start_year = args.start_year
    test_limit = args.test_limit
    output_file = args.output_file
    project_id = args.project_id

    print(f"Starting the script with start year: {start_year}")
    if test_limit:
        print(f"⚠️ TEST MODE: Processing only {test_limit} projects")
    if project_id:
        print(f"⚠️ PROJECT MODE: Processing only project ID {project_id}")

    # Verify environment variables are set
    required_env_vars = [
        "AZURE_OPENAI_KEY",
        "AZURE_OPENAI_ENDPOINT",
        "AZURE_OPENAI_VERSION",
    ]
    missing_vars = [var for var in required_env_vars if not os.environ.get(var)]

    if missing_vars:
        print(
            f"❌ ERROR: Missing required environment variables: {', '.join(missing_vars)}"
        )
        print("Please check your .env file and ensure all required variables are set.")
        return 1

    print("✅ Environment variables verified")
    print(f"Azure OpenAI Key: {os.environ.get('AZURE_OPENAI_KEY', 'Not found')[:5]}...")
    print(
        f"Azure OpenAI Endpoint: {os.environ.get('AZURE_OPENAI_ENDPOINT', 'Not found')}"
    )

    try:
        # If a specific project ID is provided, use that instead of fetching from API
        if project_id:
            print(f"Using specified project ID: {project_id}")
            ids = [project_id]
        else:
            print("Fetching projects from UNDP API...")
            # UNDP API base URL
            api_base_url = "https://api.open.undp.org"

            # Calculate the date strings for start_year and the current date
            current_year = str(dt.now().year)

            # Fetch list of projects from the API
            print(f"Fetching projects for years {start_year}-{current_year}...")

            # Initialize list to store all project IDs
            all_project_ids = []

            # For each year between start_year and current_year, fetch the project summaries
            for year in range(int(start_year), int(current_year) + 1):
                print(f"Fetching project summaries for {year}...")
                url = f"{api_base_url}/api/project_summary_{year}.json"

                response = requests.get(url)
                if response.status_code != 200:
                    print(
                        f"❌ ERROR: Failed to fetch projects for {year}: {response.status_code}"
                    )
                    continue

                data = response.json()

                # Debug: Print the structure of the first project to understand the API response
                if (
                    data and len(data) > 0 and year == int(start_year)
                ):  # Only print for the first year
                    print(f"Sample project structure for {year}:")
                    print(json.dumps(data[0], indent=2))

                    # Try to identify the correct field for project ID
                    possible_id_fields = [
                        "project_id",
                        "id",
                        "projectId",
                        "project_code",
                        "code",
                    ]
                    id_field = None

                    for field in possible_id_fields:
                        if field in data[0]:
                            print(f"Using project ID field: {field}")
                            id_field = field
                            break

                    if not id_field:
                        print(
                            "❌ WARNING: Could not identify project ID field. Available fields:"
                        )
                        print(list(data[0].keys()))
                else:
                    print(f"❌ WARNING: No data returned for {year}")
                    continue

                # Extract project IDs from the response using the identified field
                project_count = 0
                for project in data:
                    project_id = None

                    # Try all possible ID fields
                    for field in possible_id_fields:
                        if field in project:
                            project_id = project.get(field)
                            if project_id:
                                all_project_ids.append(project_id)
                                project_count += 1
                                break

                print(
                    f"Fetched {len(data)} projects for {year}, extracted {project_count} project IDs"
                )

            # Remove duplicates
            all_project_ids = list(set(all_project_ids))
            print(
                f"✅ Successfully fetched {len(all_project_ids)} unique projects from UNDP API"
            )

            # Create a list of IDs to process
            ids = all_project_ids

            # Apply test limit if set
            if test_limit and len(ids) > test_limit:
                print(f"⚠️ Limiting to {test_limit} projects for testing")
                ids = ids[:test_limit]

            print(f"✅ Collected {len(ids)} project IDs")
    except Exception as e:
        print(f"❌ ERROR: Failed to fetch projects from API: {str(e)}")
        return 1

    outputs: List[Dict[str, Any]] = []
    new_outputs: List[Dict[str, Any]] = []
    errors: List[str] = []
    ids_backup: List[str] = []  # Initialize ids_backup

    # Track progress
    total_projects = len(ids)
    processed = 0
    success_count = 0
    error_count = 0
    skipped_count = 0

    # Set output file name
    if not output_file:
        output_file = "scripts/index_undp_open_project_data/water_projects_analysis.csv"

    # Check if output file exists and load existing data
    existing_data = {}
    if os.path.exists(output_file):
        print(f"Output file {output_file} exists, loading existing data...")
        try:
            existing_df = pd.read_csv(output_file)
            if "project_id" in existing_df.columns:
                existing_data = {
                    str(row["project_id"]): row for _, row in existing_df.iterrows()
                }
                print(f"Loaded {len(existing_data)} existing entries")
        except Exception as e:
            print(f"Error loading existing data: {str(e)}")

    # Create DataFrame to store results with all columns from the sample CSV
    columns = [
        "project_id",
        "tag",
        "Reasoning",
        "title",
        "description",
        "project_url",
        "operating_unit",
        "budget",
        "expense",
        "budget_breakdown",
        "our_focus",
        "signature_solutions",
        "sdg",
        "sdg_names",
        "focus_area",
        "focus_area_descr",
        "markers",
        "start_date",
        "end_date",
    ]
    results_df = pd.DataFrame(columns=columns)

    # Set API base URL for fetching project details
    api_base_url = "https://api.open.undp.org"

    for id in ids:
        processed += 1
        print(f"Processing project ID: {id} ({processed}/{total_projects})")

        # Skip if already processed
        if str(id) in existing_data:
            print(f"⏩ Skipping project {id} - already processed")
            skipped_count += 1
            continue

        try:
            # Fetch detailed project information from the API
            project_url = f"{api_base_url}/api/projects/{id}.json"
            response = requests.get(project_url)

            # Add a small delay between API requests to avoid rate limiting
            time.sleep(0.5)

            if response.status_code != 200:
                raise Exception(
                    f"Failed to fetch project details: {response.status_code}"
                )

            project_data = response.json()

            # Debug: Print the structure of the project data
            if processed == 1:  # Only print for the first project
                print("Sample project details structure:")
                print(
                    json.dumps(project_data, indent=2)[:500] + "..."
                )  # Print first 500 chars to avoid overwhelming output

            # Extract project details with fallbacks for different field names
            title = project_data.get("title", "")
            if not title:
                # Try alternative field names for title
                for field in ["name", "project_title", "project_name"]:
                    if field in project_data:
                        title = project_data.get(field, "")
                        if title:
                            print(f"Found title in field: {field}")
                            break

            desc = project_data.get("description", "")
            if not desc:
                # Try alternative field names for description
                for field in [
                    "project_description",
                    "project_descr",
                    "summary",
                    "overview",
                ]:
                    if field in project_data:
                        desc = project_data.get(field, "")
                        if desc:
                            print(f"Found description in field: {field}")
                            break

            # Get start date from the project data with fallbacks
            start_date = ""
            if "start" in project_data:
                start_date = project_data.get("start", "")
            else:
                # Try alternative field names for start date
                for field in ["start_date", "project_start", "date_start"]:
                    if field in project_data:
                        start_date = project_data.get(field, "")
                        if start_date:
                            print(f"Found start date in field: {field}")
                            break

            # Get operating unit
            operating_unit = ""
            if "operating_unit" in project_data:
                operating_unit = project_data.get("operating_unit", "")
            elif "operating_unit_id" in project_data:
                operating_unit = project_data.get("operating_unit_id", "")

            # Get budget
            budget = 0
            if "budget" in project_data:
                budget = project_data.get("budget", 0)

            # Get expenditure
            expense = 0
            if "expenditure" in project_data:
                expense = project_data.get("expenditure", 0)

            # Get start and end dates
            end_date = project_data.get("end", "")

            # Get SDG information
            sdg = ""
            sdg_names = ""
            if "sdg" in project_data:
                sdg_data = project_data.get("sdg", [])
                if isinstance(sdg_data, list) and sdg_data:
                    sdg_ids = []
                    sdg_name_list = []
                    for s in sdg_data:
                        if isinstance(s, dict):
                            if "id" in s:
                                sdg_ids.append(s["id"])
                            if "name" in s:
                                sdg_name_list.append(s["name"])
                    sdg = ", ".join(sdg_ids)
                    sdg_names = ", ".join(sdg_name_list)

            # If SDG data not found in project_data, check in outputs
            if (
                not sdg
                and "outputs" in project_data
                and isinstance(project_data["outputs"], list)
                and project_data["outputs"]
            ):
                for output in project_data["outputs"]:
                    if (
                        "sdg" in output
                        and isinstance(output["sdg"], list)
                        and output["sdg"]
                    ):
                        sdg_ids = []
                        sdg_name_list = []
                        for s in output["sdg"]:
                            if isinstance(s, dict):
                                if "id" in s:
                                    sdg_ids.append(s["id"])
                                if "name" in s:
                                    sdg_name_list.append(s["name"])
                        sdg = ", ".join(sdg_ids)
                        sdg_names = ", ".join(sdg_name_list)
                        break

            # Create project URL
            project_url = f"https://open.undp.org/projects/{id}"

            # Create budget breakdown
            budget_breakdown = ""
            if (
                "outputs" in project_data
                and isinstance(project_data["outputs"], list)
                and project_data["outputs"]
            ):
                for output in project_data["outputs"]:
                    # Get budget by fiscal year
                    if "budget" in output and "fiscal_year" in output:
                        budget_list = output.get("budget", [])
                        fiscal_years = output.get("fiscal_year", [])
                        if (
                            isinstance(budget_list, list)
                            and isinstance(fiscal_years, list)
                            and len(budget_list) == len(fiscal_years)
                        ):
                            budget_by_year = [
                                f"{fiscal_years[i]}: ${budget_list[i]:,.2f}"
                                for i in range(len(budget_list))
                            ]
                            if budget_by_year:
                                budget_breakdown += (
                                    "Budget by year: "
                                    + "; ".join(budget_by_year)
                                    + ". "
                                )

                    # Get budget by SDG
                    if (
                        "sdg" in output
                        and isinstance(output["sdg"], list)
                        and output["sdg"]
                    ):
                        for sdg_item in output["sdg"]:
                            if (
                                isinstance(sdg_item, dict)
                                and "id" in sdg_item
                                and "name" in sdg_item
                                and "budget" in sdg_item
                                and "year" in sdg_item
                            ):
                                sdg_id = sdg_item.get("id", "")
                                sdg_name = sdg_item.get("name", "")
                                sdg_budget = sdg_item.get("budget", [])
                                sdg_years = sdg_item.get("year", [])

                                if (
                                    isinstance(sdg_budget, list)
                                    and isinstance(sdg_years, list)
                                    and len(sdg_budget) == len(sdg_years)
                                ):
                                    sdg_budget_by_year = [
                                        f"{sdg_years[i]}: ${sdg_budget[i]:,.2f}"
                                        for i in range(len(sdg_budget))
                                    ]
                                    if sdg_budget_by_year:
                                        budget_breakdown += (
                                            f"SDG {sdg_id} ({sdg_name}) budget: "
                                            + "; ".join(sdg_budget_by_year)
                                            + ". "
                                        )

                    # Only process the first output
                    break

            # Get focus area information
            focus_area = ""
            focus_area_descr = ""
            if (
                "outputs" in project_data
                and isinstance(project_data["outputs"], list)
                and project_data["outputs"]
            ):
                for output in project_data["outputs"]:
                    if "focus_area" in output:
                        focus_area = output.get("focus_area", "")
                        break

                for output in project_data["outputs"]:
                    if "focus_area_descr" in output:
                        focus_area_descr = output.get("focus_area_descr", "")
                        break

            # Get markers information
            markers = ""
            if (
                "outputs" in project_data
                and isinstance(project_data["outputs"], list)
                and project_data["outputs"]
            ):
                for output in project_data["outputs"]:
                    if (
                        "markers" in output
                        and isinstance(output["markers"], list)
                        and output["markers"]
                    ):
                        marker_list = []
                        for marker in output["markers"]:
                            if (
                                isinstance(marker, dict)
                                and "marker" in marker
                                and "marker_type" in marker
                            ):
                                marker_name = marker.get("marker", "")
                                marker_types = marker.get("marker_type", [])
                                if isinstance(marker_types, list) and marker_types:
                                    marker_list.append(
                                        f"{marker_name}: {', '.join(marker_types)}"
                                    )
                        markers = "; ".join(marker_list)
                        break

            # Get our_focus information
            our_focus = ""
            if "our_focus" in project_data:
                focus_data = project_data.get("our_focus", [])
                if isinstance(focus_data, list) and focus_data:
                    our_focus = ", ".join([str(f) for f in focus_data])

            # Get signature_solutions information
            signature_solutions = ""
            if "signature_solutions" in project_data:
                solutions_data = project_data.get("signature_solutions", [])
                if isinstance(solutions_data, list) and solutions_data:
                    signature_solutions = ", ".join([str(s) for s in solutions_data])

            print(f"Retrieved data for project {id}:")
            print(f"Title: {title}")
            print(f"Start date: {start_date}")
            print(f"SDGs: {sdg}")
            print(f"Focus area: {focus_area} - {focus_area_descr}")

            # Check if the project start date is after or equal to the specified start year
            # Skip projects with start dates before the specified start year
            if start_date:
                try:
                    project_start_year = int(start_date.split("-")[0])
                    if project_start_year < start_year:
                        print(
                            f"⚠️ Skipping project {id} with start date {start_date} (before {start_year})"
                        )
                        skipped_count += 1
                        continue
                except (ValueError, IndexError):
                    print(
                        f"⚠️ Warning: Could not parse start date '{start_date}' for project {id}"
                    )

            # Analyze if the project is water-focused using Azure OpenAI with combined prompt
            result_json = analyse_with_azure(
                water_tagging_prompt, "Title: " + title + " Description: " + desc
            )

            # Parse the JSON result
            try:
                # Check if the result is already a dict
                if isinstance(result_json, dict):
                    result = result_json
                else:
                    # Try to parse the JSON string
                    result_json = (
                        result_json.replace("```json", "").replace("```", "").strip()
                    )
                    result = json.loads(result_json)

                tag = result.get("tag", "none")
                reasoning = result.get("reasoning", "No reasoning provided")

                # Normalize tag values
                if tag.lower() == "water focused" or tag.lower() == "focused":
                    tag = "focused"
                elif tag.lower() == "water related" or tag.lower() == "related":
                    tag = "related"
                else:
                    tag = "none"

            except Exception as e:
                print(f"⚠️ Error parsing result JSON: {str(e)}")
                print(f"Raw result: {result_json}")
                # Fallback to simple parsing
                if "focused" in result_json.lower():
                    tag = "focused"
                    reasoning = (
                        "Error parsing JSON, but detected 'focused' in response."
                    )
                elif "related" in result_json.lower():
                    tag = "related"
                    reasoning = (
                        "Error parsing JSON, but detected 'related' in response."
                    )
                else:
                    tag = "none"
                    reasoning = "Error parsing JSON, defaulting to 'none'."

            # Create a new row for the DataFrame with all columns from the sample CSV
            new_row = {
                "project_id": id,
                "tag": tag,
                "Reasoning": reasoning,
                "title": title,
                "description": desc,
                "project_url": project_url,
                "operating_unit": operating_unit,
                "budget": budget,
                "expense": expense,
                "budget_breakdown": budget_breakdown,
                "our_focus": our_focus,
                "signature_solutions": signature_solutions,
                "sdg": sdg,
                "sdg_names": sdg_names,
                "focus_area": focus_area,
                "focus_area_descr": focus_area_descr,
                "markers": markers,
                "start_date": start_date,
                "end_date": end_date,
            }

            # Append to DataFrame
            results_df = pd.concat(
                [results_df, pd.DataFrame([new_row])], ignore_index=True
            )

            # Save after each successful processing to avoid data loss
            combined_df = pd.concat(
                [pd.DataFrame.from_dict(existing_data.values()), results_df],
                ignore_index=True,
            )
            combined_df.to_csv(output_file, index=False)

            print(f"✅ Successfully processed project {id}: {tag}")
            success_count += 1
        except Exception as e:
            print(f"❌ Error processing {id}: {str(e)}")
            errors.append(id)
            error_count += 1

    print(
        f"Finished processing all projects. Success: {success_count}/{total_projects}, Errors: {error_count}/{total_projects}, Skipped: {skipped_count}/{total_projects}"
    )

    # Save error log if there were errors
    if errors:
        # Filter out None values
        valid_errors = [err for err in errors if err is not None]
        if valid_errors:
            with open("water_projects_errors.log", "w") as f:
                f.write("\n".join(valid_errors))
            print("✅ Error log saved to water_projects_errors.log")

    try:
        print("Finalizing output...")
        # Verify file was created
        if os.path.exists(output_file):
            print(
                f"✅ Verified {output_file} exists (size: {os.path.getsize(output_file) / 1024:.2f} KB)"
            )

            # Print summary of results
            final_df = pd.read_csv(output_file)
            tag_counts = final_df["tag"].value_counts()
            print("\nResults summary:")
            for tag, count in tag_counts.items():
                print(f"  {tag}: {count} projects")
        else:
            # If no projects were processed successfully, create an empty file with headers
            if success_count == 0:
                empty_df = pd.DataFrame(columns=columns)
                empty_df.to_csv(output_file, index=False)
                print(f"✅ Created empty {output_file} with headers only")
            else:
                print(f"❌ ERROR: Failed to create {output_file}")
                return 1
    except Exception as e:
        print(f"❌ ERROR: Failed to finalize output: {str(e)}")
        return 1

    print("✅ Script completed successfully")
    return 0


if __name__ == "__main__":
    multiprocessing.freeze_support()
    exit_code = main()
    if exit_code:
        print("❌ Script completed with errors")
        exit(exit_code)
    else:
        print("✅ Script completed successfully")
