# UNDP Open Project Data Indexer

## Overview
This module processes data from the UNDP Open Data API to identify, analyze, and classify water-related projects. It uses Azure OpenAI to determine if projects are water-focused, water-related, or unrelated to water initiatives, and extracts comprehensive metadata for further analysis.

## Features
- Fetches project data directly from the UNDP Open Data API
- Classifies projects as "focused", "related", or "none" using Azure OpenAI
- Extracts detailed project metadata including SDGs, budget information, focus areas, and markers
- Generates comprehensive CSV output with standardized data format
- Supports filtering by start year and specific project IDs
- Includes budget breakdown by year and SDG
- Provides detailed reasoning for each project classification
- Standardizes project IDs to 8 characters by padding with leading zeros
- Prevents duplicate processing by detecting projects with different ID formats but same URL

## Input Data
The script fetches data from the UNDP Open Data API and requires:
- Azure OpenAI credentials (set as environment variables)
- Optional command-line parameters for filtering and output control

## Output
The script generates a CSV file with the following structure:
- Project ID and URL
- Classification tag and reasoning
- Project title and description
- Operating unit and budget information
- Budget breakdown by year and SDG
- SDG IDs and names
- Focus areas and markers
- Project start and end dates

## Usage
The script can be run in several ways using the Taskfile:

### Basic Indexing
```
task index
```
This will fetch all projects from 2023 onwards and process them.

### Test Mode
```
task index-test
```
This will process only 30 projects for testing purposes.

### Custom Start Year
```
task index-custom START_YEAR=2022
```
This will process projects from 2022 onwards.

### Specific Project
```
task index-project PROJECT_ID=01000282
```
This will process only the specified project ID.

### Deduplication
```
task deduplicate-csv
```
This will deduplicate the water_projects_analysis.csv file based on project_url, removing duplicate entries where multiple rows share the same project_url. The original file is backed up before deduplication.

### Extract Projects
```
task extract-projects
```
This will extract specified projects from the water_projects_analysis.csv file based on a list of project IDs in data/project_ids_list.txt. The extracted projects will be saved to data/extracted_water_projects.csv.

### Process Project List
```
task process-project-list
```
This will process projects from a list file (data/project_ids_list.txt), add missing ones by fetching them from the API, and extract all to a new CSV file (data/extracted_water_projects.csv).

## Command-line Arguments
The script accepts the following command-line arguments:
- `--start-year`: Start year for filtering projects (default: 2023)
- `--test-limit`: Limit number of projects for testing (default: None)
- `--output-file`: Output file path (default: auto-generated with timestamp)
- `--project-id`: Specific project ID to process (default: None)
- `--project-ids-file`: Path to a file containing a list of project IDs to process (one ID per line)
- `--extract-only`: Extract specified projects from existing CSV without API calls
- `--extract-output`: Output file for extracted projects (default: extracted_projects_TIMESTAMP.csv)

## Integration
The output from this module can serve as input for the SDG Budget Calculator module in `scripts/calculate_budget_by_sdg/`, creating a complete data processing and analysis pipeline.

## Methodology
The classification approach:
- Uses Azure OpenAI to analyze project titles and descriptions
- Classifies projects as "focused" (primarily water-related), "related" (includes water components), or "none" (no water connection)
- Provides detailed reasoning for each classification
- Extracts comprehensive metadata for further analysis
- Standardizes project IDs to 8 characters by padding with leading zeros
- Detects and skips duplicate projects based on standardized IDs and URLs

## Project ID Standardization
The script handles project IDs in different formats:
- Standardizes all project IDs to 8 characters by padding with leading zeros
- Generates consistent project URLs using the standardized IDs
- Detects and skips duplicate projects based on standardized IDs and URLs
- Handles API requests with both standardized and original ID formats
- Prevents redundant processing of identical projects with different ID formats

## Deduplication Process
The deduplication process:
- Reads the existing water_projects_analysis.csv file
- Creates a backup of the original file
- Identifies duplicate entries based on project_url
- Removes duplicates, keeping the first occurrence
- Saves the deduplicated data back to the original file
- Reports the number of duplicates removed

This process should be run before starting a new indexing run to ensure that the dataset doesn't contain duplicates.

## Example Output
Sample data format (water_projects_analysis.csv):
```
project_id,tag,Reasoning,title,description,project_url,operating_unit,budget,expense,budget_breakdown,our_focus,signature_solutions,sdg,sdg_names,focus_area,focus_area_descr,markers,start_date,end_date
01000282,none,"The project focuses on local peace building, community resilience, civic engagement, and strengthening local institutions. It does not mention water-related elements or activities.",Local Peace Building and Community Resilience,"Pillar II: Local Peace Building and community resilience...",https://open.undp.org/projects/01000282,Syria,9385167.0,3264374.0,"Budget by year: 2025: $887,862.00; 2024: $6,105,184.00; 2023: $2,392,121.00. SDG 16 (Peace, justice, and strong institutions) budget: 2023: $2,389,728.88; 2023: $2,392,599.42; 2024: $6,099,078.82; 2024: $6,106,405.04; 2025: $886,974.14; 2025: $888,039.57. ",,,16,"Peace, justice, and strong institutions",21,"Structural transformation, including green, inclusive and digital transitions","Digital: Output partially enabled through digital technology; OECD DAC Sector: 150 - Government & Civil Society, 152 - Conflict, Peace & Security, 160 - Other Social Infrastructure & Services",2023-01-01,2025-12-31
```

This standardized output enables consistent analysis and visualization of water-related projects across the UNDP portfolio.
