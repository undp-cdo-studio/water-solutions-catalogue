import os
import sys
from pathlib import Path

import pandas as pd

# Add the scripts directory to the path to import config
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from config import PROJECTS_DATA_PATH

# Create output directory if it doesn't exist
output_dir = Path("data/plots")
output_dir.mkdir(parents=True, exist_ok=True)


def process_budget_data(file_name):
    """
    Process SDG budget data from CSV files and save the results.

    Args:
        file_name: Name of the CSV file in data/projects/ directory

    Returns:
        tuple: (Path to the output CSV file, Count of water-focused projects)
    """
    # Load and process data
    df = pd.read_csv(f"{PROJECTS_DATA_PATH}/{file_name}")

    file_name_base = file_name.replace(".csv", "")

    # Filter for water focused projects
    df = df[df["tag"] == "water focused"]

    # Get the count of water-focused projects
    water_focused_count = len(df)

    df["SDGs"] = df["sdg"].str.split(", ")

    # Explode the SDGs column to get one row per SDG
    df_exploded = df.explode("SDGs")
    df_sdg_budget = df_exploded.groupby("SDGs", as_index=False).agg({"budget": "sum"})
    df_sdg_budget["SDGs"] = df_sdg_budget["SDGs"].astype(int)
    df_sdg_budget = df_sdg_budget.groupby("SDGs", as_index=False).agg({"budget": "sum"})

    # Convert budget to billions for display
    df_sdg_budget["budget_billions"] = df_sdg_budget["budget"] / 1_000_000_000

    # Sort by SDG number
    df_sdgs = df_sdg_budget.copy()
    df_sdgs["SDGs"] = df_sdgs["SDGs"].astype(int)
    df_sdgs = df_sdgs.sort_values(by="SDGs", ascending=True)

    # Export to CSV with metadata
    csv_output_path = output_dir / f"sdg_budget_distribution_{file_name_base}.csv"
    df_sdgs.to_csv(csv_output_path, index=False)

    # Also save the count to a metadata file
    metadata_path = output_dir / f"metadata_{file_name_base}.txt"
    with open(metadata_path, "w") as f:
        f.write(f"water_focused_count={water_focused_count}\n")

    print(f"CSV data exported to {csv_output_path}")
    print(f"Total water-focused projects in {file_name_base}: {water_focused_count}")

    return csv_output_path, water_focused_count


def main():
    """Process all SDG budget data files."""
    # Process each data file
    process_budget_data("2018-24.csv")
    process_budget_data("2018-22.csv")

    print("SDG budget data processing complete.")


if __name__ == "__main__":
    main()
