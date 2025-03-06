#!/usr/bin/env python3
"""
Deduplicate the water_projects_analysis.csv file based on project_url.

This script removes duplicate entries where multiple rows share the same project_url.
It creates a backup of the original file before making any changes.

Usage:
    python deduplicate_csv.py

The script will:
1. Read the water_projects_analysis.csv file
2. Create a backup of the original file
3. Identify duplicate entries based on project_url
4. Remove duplicates, keeping the first occurrence
5. Save the deduplicated data back to the original file
6. Report the number of duplicates removed

This process should be run before starting a new indexing run to ensure that
the dataset doesn't contain duplicates.
"""

import os
import shutil
from datetime import datetime as dt

# Add type stubs for external libraries
import pandas as pd  # type: ignore


def deduplicate_csv(input_file, output_file=None):
    """
    Deduplicate a CSV file based on project_url.

    Args:
        input_file: Path to the input CSV file
        output_file: Path to the output CSV file (default: input file with timestamp)

    Returns:
        Tuple of (output_file_path, duplicate_count)
    """
    print(f"Reading CSV file: {input_file}")

    # Read the CSV file
    try:
        df = pd.read_csv(input_file)
        original_count = len(df)
        print(f"Read {original_count} rows from {input_file}")
    except Exception as e:
        print(f"Error reading CSV file: {str(e)}")
        return None, 0

    # Check if project_url column exists
    if "project_url" not in df.columns:
        print("Error: project_url column not found in CSV file")
        return None, 0

    # Find duplicates
    duplicates = df[df.duplicated(subset=["project_url"], keep=False)]
    duplicate_count = len(duplicates)

    if duplicate_count > 0:
        print(f"Found {duplicate_count} duplicate rows based on project_url")

        # Print some examples of duplicates
        duplicate_urls = duplicates["project_url"].unique()
        print(
            f"Examples of duplicate project_urls ({min(5, len(duplicate_urls))} of {len(duplicate_urls)}):"
        )
        for url in duplicate_urls[:5]:
            dup_rows = df[df["project_url"] == url]
            print(
                f"  {url}: {len(dup_rows)} rows with project_ids: {', '.join(dup_rows['project_id'].astype(str))}"
            )

        # Remove duplicates, keeping the first occurrence
        df_deduplicated = df.drop_duplicates(subset=["project_url"], keep="first")
        print(
            f"After deduplication: {len(df_deduplicated)} rows (removed {original_count - len(df_deduplicated)} duplicates)"
        )

        # Generate output file name if not provided
        if output_file is None:
            timestamp = dt.now().strftime("%Y%m%d_%H%M%S")
            output_file = (
                f"{os.path.splitext(input_file)[0]}_deduplicated_{timestamp}.csv"
            )

        # Save deduplicated data
        df_deduplicated.to_csv(output_file, index=False)
        print(f"Saved deduplicated data to {output_file}")

        return output_file, duplicate_count
    else:
        print("No duplicates found based on project_url")
        return input_file, 0


def main():
    """Main function."""
    # Define input file
    input_file = "data/water_projects_analysis.csv"

    # Check if input file exists
    if not os.path.exists(input_file):
        print(f"Error: Input file {input_file} not found")
        return 1

    # Create backup of original file
    timestamp = dt.now().strftime("%Y%m%d_%H%M%S")
    backup_file = f"{os.path.splitext(input_file)[0]}_backup_{timestamp}.csv"
    try:
        shutil.copy2(input_file, backup_file)
        print(f"Created backup of original file: {backup_file}")
    except Exception as e:
        print(f"Warning: Failed to create backup: {str(e)}")

    # Deduplicate CSV file
    output_file, duplicate_count = deduplicate_csv(input_file, input_file)

    if output_file is None:
        print("Deduplication failed")
        return 1

    if duplicate_count > 0:
        print(
            f"Successfully removed {duplicate_count} duplicate rows from {input_file}"
        )
        print(f"Original file backed up to {backup_file}")
    else:
        print("No changes made to the original file")

    return 0


if __name__ == "__main__":
    exit(main())
