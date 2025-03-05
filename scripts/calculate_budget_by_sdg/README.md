# SDG Budget Calculator

## Overview
This module processes UNDP project data to calculate budget distributions across the Sustainable Development Goals (SDGs). It extracts, analyzes, and formats budget allocation data for visualization and reporting purposes.

## Features
- Processes CSV project data from 2018-2024
- Categorizes projects by SDG relevance
- Calculates total budget allocation per SDG
- Exports processed data for visualization
- Supports both water-focused and all project analyses

## Input Data
The script expects project data in CSV format with the following structure:
- Project ID
- Budget amount
- SDG tags (comma-separated list)
- Project classification (e.g., "water focused")

## Output
The script generates:
1. CSV files with processed budget data per SDG
2. Optional metadata files with project counts and processing details

## Usage
This will:
1. Process the raw project data
2. Calculate budget allocation by SDG
3. Generate the necessary output files for visualization

## Integration
The output from this module serves as direct input for the visualization module in `scripts/generate_sdg_budget_graph/`, creating a complete data processing and visualization pipeline.

## Methodology
The budget calculation approach:
- Distributes the original project budget across all associated SDGs
- Represents the allocation ratio between SDGs rather than factual final figures
- Normalizes budget between each SDG to explain differences in allocation
- Assumes duplication across each category as it's impossible to determine exact budget allocation per SDG

## Example Output
Sample data format (sdg_budget_distribution.csv):
```
SDGs,budget,budget_billions
1,1600000000,1.6
2,900000000,0.9
3,1500000000,1.5
...
```

This standardized output enables consistent visualization of SDG budget distribution.
