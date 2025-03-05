#!/usr/bin/env python3
import os

import pandas as pd

# Create logs directory if it doesn't exist
os.makedirs(".logs", exist_ok=True)

# Load the datasets with different encodings to handle potential issues
try:
    original_df = pd.read_csv(
        "data/output/WaterTotalSheet_Original_2023_2024_format.csv", encoding="utf-8"
    )
except UnicodeDecodeError:
    original_df = pd.read_csv(
        "data/output/WaterTotalSheet_Original_2023_2024_format.csv", encoding="latin1"
    )

try:
    new_df = pd.read_csv(
        "data/input/2023-2024 water projects-HH-v1_AA(2023-2024 water projects).csv",
        encoding="utf-8",
    )
except UnicodeDecodeError:
    new_df = pd.read_csv(
        "data/input/2023-2024 water projects-HH-v1_AA(2023-2024 water projects).csv",
        encoding="latin1",
    )

try:
    combined_df = pd.read_csv(
        "data/output/WaterTotalSheet_2023_2024_format.csv", encoding="utf-8"
    )
except UnicodeDecodeError:
    combined_df = pd.read_csv(
        "data/output/WaterTotalSheet_2023_2024_format.csv", encoding="latin1"
    )

# Analyze the data
original_count = len(original_df)
original_focused_count = len(original_df[original_df["tag"] == "water focused"])
new_count = len(new_df)
new_focused_count = len(new_df[new_df["tag"] == "water focused"])
combined_count = len(combined_df)
combined_focused_count = len(combined_df[combined_df["tag"] == "water focused"])

# Check for duplicates
original_project_ids = set(original_df["project_id"])
new_project_ids = set(new_df["project_id"])
combined_project_ids = set(combined_df["project_id"])

duplicates = original_project_ids.intersection(new_project_ids)
duplicate_rows = new_df[new_df["project_id"].isin(duplicates)]

# Calculate totals
try:
    total_budget_new_focused = new_df[new_df["tag"] == "water focused"]["budget"].sum()
except:
    total_budget_new_focused = "Error calculating budget"

# Generate the report
with open(".logs/water_projects_analysis.txt", "w") as f:
    f.write("=====================================================\n")
    f.write("WATER PROJECTS ANALYSIS REPORT\n")
    f.write("=====================================================\n\n")

    f.write("SUMMARY COUNTS:\n")
    f.write(f"Original dataset projects: {original_count}\n")
    f.write(f"Original dataset 'water focused' projects: {original_focused_count}\n")
    f.write(f"New dataset projects: {new_count}\n")
    f.write(f"New dataset 'water focused' projects: {new_focused_count}\n")
    f.write(f"Combined dataset projects: {combined_count}\n")
    f.write(f"Combined dataset 'water focused' projects: {combined_focused_count}\n\n")

    f.write("BUDGET ANALYSIS:\n")
    if isinstance(total_budget_new_focused, str):
        f.write(
            f"Total budget for new 'water focused' projects: {total_budget_new_focused}\n\n"
        )
    else:
        f.write(
            f"Total budget for new 'water focused' projects: ${total_budget_new_focused:,.2f}\n\n"
        )

    f.write("DUPLICATE ANALYSIS:\n")
    f.write(
        f"Number of duplicate project IDs between original and new datasets: {len(duplicates)}\n"
    )

    if len(duplicates) > 0:
        f.write("\nList of duplicate project IDs:\n")
        for pid in sorted(duplicates):
            f.write(f"- {pid}\n")

        f.write("\nDetails of duplicate projects in the new dataset:\n")
        for idx, row in duplicate_rows.iterrows():
            f.write(f"Project ID: {row['project_id']}\n")
            f.write(f"Title: {row['title']}\n")
            f.write(f"Tag: {row['tag']}\n")
            try:
                f.write(f"Budget: ${row['budget']:,.2f}\n")
            except:
                f.write(f"Budget: {row['budget']}\n")
            f.write("-----------------------\n")

    f.write("\nANALYSIS OF THE DISCREPANCY:\n")
    f.write(
        f"The original dataset has {original_focused_count} 'water focused' projects.\n"
    )
    f.write(f"The new dataset has {new_focused_count} 'water focused' projects.\n")
    f.write(
        f"The combined dataset has {combined_focused_count} 'water focused' projects.\n\n"
    )

    additional_focused = combined_focused_count - original_focused_count

    # Calculate duplicate focused projects
    duplicate_focused_projects = []
    for pid in duplicates:
        if pid in set(new_df[new_df["tag"] == "water focused"]["project_id"]):
            duplicate_focused_projects.append(pid)

    expected_additional = new_focused_count - len(duplicate_focused_projects)

    f.write(
        f"Additional 'water focused' projects in combined dataset: {additional_focused}\n"
    )
    f.write(
        f"Expected additional projects (new focused minus duplicates): {expected_additional}\n"
    )
    f.write(
        f"Number of 'water focused' projects in the new dataset that are duplicates: {len(duplicate_focused_projects)}\n\n"
    )

    f.write("EXPLANATION OF DISCREPANCY:\n")
    if additional_focused != expected_additional:
        f.write(
            f"The discrepancy between {additional_focused} additional projects in the combined dataset versus the {expected_additional} expected additional projects can be explained by:\n\n"
        )
        f.write(
            "1. There may be duplicates between the original and new datasets with different tags that were reconciled during merging.\n"
        )
        f.write(
            "2. Some projects in the original dataset may have had their tags changed when merging with the new dataset.\n"
        )
        f.write(
            "3. The combined dataset may include projects from other sources beyond just these two files.\n"
        )
        f.write(
            "4. There might be filtering or processing differences when the datasets were combined.\n"
        )

        if additional_focused > expected_additional:
            f.write(
                "\nSpecifically, it appears that more 'water focused' projects were added than expected, suggesting that some projects in the original dataset may have been reclassified from 'water related' to 'water focused' during the merge process.\n"
            )
        else:
            f.write(
                "\nSpecifically, it appears that fewer 'water focused' projects were added than expected, suggesting that some projects in the new dataset may have been reclassified from 'water focused' to 'water related' during the merge process, or were not included in the combined dataset.\n"
            )
    else:
        f.write(
            "The number of additional 'water focused' projects matches the expected count, suggesting the addition was done correctly.\n"
        )

print("Analysis complete! Report saved to .logs/water_projects_analysis.txt")
