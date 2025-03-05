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


## Command-line Arguments
The script accepts the following command-line arguments:
- `--start-year`: Start year for filtering projects (default: 2023)
- `--test-limit`: Limit number of projects for testing (default: None)
- `--output-file`: Output file path (default: auto-generated with timestamp)
- `--project-id`: Specific project ID to process (default: None)

## Integration
The output from this module can serve as input for the SDG Budget Calculator module in `scripts/calculate_budget_by_sdg/`, creating a complete data processing and analysis pipeline.

## Methodology
The classification approach:
- Uses Azure OpenAI to analyze project titles and descriptions
- Classifies projects as "focused" (primarily water-related), "related" (includes water components), or "none" (no water connection)
- Provides detailed reasoning for each classification
- Extracts comprehensive metadata for further analysis

## Example Output
Sample data format (water_projects_analysis.csv):
```
project_id,tag,Reasoning,title,description,project_url,operating_unit,budget,expense,budget_breakdown,our_focus,signature_solutions,sdg,sdg_names,focus_area,focus_area_descr,markers,start_date,end_date
01000282,none,"The project focuses on local peace building, community resilience, civic engagement, and strengthening local institutions. It does not mention water-related elements or activities.",Local Peace Building and Community Resilience,"Pillar II: Local Peace Building and community resilience...",https://open.undp.org/projects/01000282,Syria,9385167.0,3264374.0,"Budget by year: 2025: $887,862.00; 2024: $6,105,184.00; 2023: $2,392,121.00. SDG 16 (Peace, justice, and strong institutions) budget: 2023: $2,389,728.88; 2023: $2,392,599.42; 2024: $6,099,078.82; 2024: $6,106,405.04; 2025: $886,974.14; 2025: $888,039.57. ",,,16,"Peace, justice, and strong institutions",21,"Structural transformation, including green, inclusive and digital transitions","Digital: Output partially enabled through digital technology; OECD DAC Sector: 150 - Government & Civil Society, 152 - Conflict, Peace & Security, 160 - Other Social Infrastructure & Services",2023-01-01,2025-12-31
```

This standardized output enables consistent analysis and visualization of water-related projects across the UNDP portfolio.
