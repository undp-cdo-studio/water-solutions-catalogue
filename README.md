# UNDP Water Projects SDG Budget Analysis

## Overview
This project analyzes and visualizes the distribution of UNDP water-focused project budgets across the Sustainable Development Goals (SDGs). It processes project data from 2018-2024, calculates budget allocations, and generates professional visualizations with official UN SDG iconography.

## Key Features
- Budget distribution analysis across SDGs for water-focused projects
- High-resolution visualizations with official SDG icons and color schemes
- Multiple dataset comparisons (2018-2022, 2018-2024)
- Interactive web interface built with Next.js

## Scripts
The project includes various Python scripts for data processing, analysis, and visualization, located in the `scripts/` directory. These handle tasks such as SDG budget calculations, visualization generation, and dataset comparisons. For detailed information about available scripts and their usage, see [Scripts Documentation](scripts/README.md).

## Project Structure
```
├── data/
│   ├── projects/                   # Raw project data
│   ├── output/                     # Processed data & reports
│   └── plots/                      # Generated visualizations
├── assets/
│   └── sdg_icons/                  # Official UN SDG icons
└── components/                     # Web interface components
```

## Getting Started

### Prerequisites
- Python 3.x
- Required Python packages: pandas, matplotlib, seaborn, openpyxl, azure-ai-language-questionanswering, requests, python-dotenv
- Node.js and npm (for web interface)

### Installation
```bash
# Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install required Python packages
pip install -r requirements.txt

# Install Node.js dependencies (for web interface)
npm install
```

### Running Scripts
```bash
# Index UNDP Open Project Data (all projects from 2023 onwards)
python scripts/index_undp_open_project_data/script.py

# Run with test limit (30 projects)
python scripts/index_undp_open_project_data/script.py --test-limit 30

# Process projects from a specific year
python scripts/index_undp_open_project_data/script.py --start-year 2022

# Process a specific project by ID
python scripts/index_undp_open_project_data/script.py --project-id 01000282

# Deduplicate the water projects analysis CSV
python scripts/index_undp_open_project_data/deduplicate_csv.py

# Extract specific projects from a list
python scripts/index_undp_open_project_data/script.py --extract-only --project-ids-file data/project_ids_list.txt --extract-output data/extracted_water_projects.csv

# Process projects from a list file
python scripts/index_undp_open_project_data/script.py --project-ids-file data/project_ids_list.txt --extract-output data/extracted_water_projects.csv
```

### Running the Web Interface
```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Data Analysis

### Available Datasets
1. Original Dataset (143 projects, $1.05B)
2. Original 2023-2024 Format (970 projects, $8.11B)
3. Full 2023-2024 Format (1,147 projects, $8.50B)

### Key Findings
- Highest budget allocation: SDG 13 (Climate Action)
- Second highest: SDG 6 (Clean Water and Sanitation)
- Third highest: SDG 1 (No Poverty)

## Documentation
- [SDG Budget Analysis](data/projects/README.md)
- [Scripts Documentation](scripts/README.md)

## Technical Stack
- Python for data processing
- Matplotlib for visualizations
- Pandas for data analysis
- Next.js for web interface

## License
[Add appropriate license information]
