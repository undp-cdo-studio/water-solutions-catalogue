# Scripts Documentation

## Overview
This directory contains Python scripts for processing, analyzing, and visualizing UNDP water project data and SDG budget distributions.

## Script Categories

### Data Processing
- `calculate_budget_by_sdg/script.py`: Processes project data to calculate SDG budget distributions
- `join_projects.py`: Merges water project data from multiple sources using ATLAS Award ID
- `water.py`: Processes water project documentation and regional classifications

### Visualization
- `generate_sdg_budget_graph/script.py`: Creates visualizations of SDG budget distributions with official UN SDG icons
- `plot_sdg_distribution.py`: Generates individual dataset distribution plots
- `compare_sdg_distributions.py`: Creates comparison visualizations between datasets

### Analysis
- `analyze_water_projects_2024.py`: Analyzes 2023-2024 water project data
- `calculate_budget_by_sdg/script.py`: Performs budget calculations and analysis

## Usage

### Data Processing
```bash
# Process budget data
python calculate_budget_by_sdg/script.py

# Merge project data
python join_projects.py

# Process water documentation
python water.py
```

### Visualization
```bash
# Generate SDG budget graphs
python generate_sdg_budget_graph/script.py

# Create distribution plots
python plot_sdg_distribution.py

# Generate comparison visualizations
python compare_sdg_distributions.py
```

### Analysis
```bash
# Analyze water projects data from 2023-2024
python analyze_water_projects_2024.py

# Compare original and transformed datasets
python analyze_overlap.py

# Analyze water-focused projects
python water_focused_analysis.py
```

### UNDP Open Project Data
```bash
# Index all projects from 2023 onwards
python index_undp_open_project_data/script.py

# Run with test limit (30 projects)
python index_undp_open_project_data/script.py --test-limit 30

# Process projects from a specific year
python index_undp_open_project_data/script.py --start-year 2022

# Process a specific project by ID
python index_undp_open_project_data/script.py --project-id 01000282

# Deduplicate the water projects analysis CSV
python index_undp_open_project_data/deduplicate_csv.py
```

## Input Requirements
- Project data files in CSV format
- SDG reference data
- Water project documentation
- Regional classification data

## Output
- Processed CSV files with budget calculations
- High-resolution PNG visualizations
- Analysis reports and metadata

## Dependencies
- pandas
- matplotlib
- numpy
- seaborn (for some visualizations)
- azure-ai-language-questionanswering (for classification)
- requests (for API access)
- python-dotenv (for environment variables)

## Configuration
Scripts use configuration files in their respective directories for customizable parameters such as:
- File paths
- Visualization settings
- Analysis parameters