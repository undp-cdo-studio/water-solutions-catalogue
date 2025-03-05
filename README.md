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
- Node.js (v14 or higher)
- Python 3.x
- Required Python packages: pandas, matplotlib

### Installation
```bash
# Install dependencies
make install

# Start development server
make dev
```

### Usage
1. Access web interface:
   Open [http://localhost:3000](http://localhost:3000)

## Data Analysis

### Available Datasets
1. Original Dataset (143 projects, $1.05B)
2. Original 2023-2024 Format (970 projects, $8.11B)
3. Full 2023-2024 Format (1,147 projects, $8.50B)

### Key Findings
- Highest budget allocation: SDG 13 (Climate Action)
- Second highest: SDG 6 (Clean Water and Sanitation)
- Third highest: SDG 1 (No Poverty)

## Development

### Available Commands
- `make install`: Install dependencies
- `make dev`: Start development server
- `make build`: Build the application
- `make start`: Start production server
- `make clean`: Remove build artifacts
- `make lint`: Run linter
- `make rebuild`: Full clean and rebuild

## Documentation
- [SDG Budget Analysis](data/projects/README.md)
- [Scripts Documentation](scripts/README.md)

## Technical Stack
- Next.js for web interface
- Python for data processing
- Matplotlib for visualizations
- Pandas for data analysis

## Deployment
Deploy using Vercel:
```bash
make build
vercel deploy
```

## License
[Add appropriate license information]
