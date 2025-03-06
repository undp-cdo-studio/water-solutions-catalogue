import os

import pandas as pd

# Read the main CSV file
main_csv_path = "data/water_projects_analysis.csv"
df_main = pd.read_csv(main_csv_path)
print(f"Total projects in main CSV: {len(df_main)}")

# Read the extracted projects CSV file
extracted_csv_path = "data/extracted_water_projects.csv"
if os.path.exists(extracted_csv_path):
    df_extracted = pd.read_csv(extracted_csv_path)
    print(f"Total projects in extracted CSV: {len(df_extracted)}")
else:
    print(f"Extracted CSV file not found: {extracted_csv_path}")
    df_extracted = pd.DataFrame()

# Read the project IDs list
with open("data/project_ids_list.txt", "r") as f:
    ids = [line.strip() for line in f if line.strip()]
print(f"Total projects in project_ids_list.txt: {len(ids)}")


# Standardize IDs (add leading zero if needed)
def standardize_id(id_str):
    if len(id_str) <= 7:
        return "0" + id_str
    return id_str


std_ids = [standardize_id(id_str) for id_str in ids]
df_main["std_id"] = df_main["project_id"].astype(str).apply(standardize_id)

if not df_extracted.empty:
    df_extracted["std_id"] = (
        df_extracted["project_id"].astype(str).apply(standardize_id)
    )

# Find intersection with main CSV
existing_in_main = set(df_main["std_id"]).intersection(set(std_ids))
print(f"Projects from list in main CSV: {len(existing_in_main)}")
print(f"Projects from list NOT in main CSV: {len(std_ids) - len(existing_in_main)}")

# Find intersection with extracted CSV
if not df_extracted.empty:
    existing_in_extracted = set(df_extracted["std_id"]).intersection(set(std_ids))
    print(f"Projects from list in extracted CSV: {len(existing_in_extracted)}")
    print(
        f"Projects from list NOT in extracted CSV: {len(std_ids) - len(existing_in_extracted)}"
    )

# Print examples of projects not in main CSV
not_in_main = set(std_ids) - set(df_main["std_id"])
if not_in_main:
    print("\nProjects not in main CSV:")
    for i, id_str in enumerate(sorted(list(not_in_main))):
        if i < 10:
            print(f"  - {id_str}")
        elif i == 10:
            print(f"  - ... and {len(not_in_main) - 10} more")
            break

# Check for projects in extracted but not in main
if not df_extracted.empty:
    in_extracted_not_in_main = set(df_extracted["std_id"]) - set(df_main["std_id"])
    if in_extracted_not_in_main:
        print("\nProjects in extracted CSV but NOT in main CSV:")
        for id_str in sorted(list(in_extracted_not_in_main)):
            print(f"  - {id_str}")
    else:
        print("\nAll projects in extracted CSV are also in main CSV.")

# Check for projects in main but not in extracted
if not df_extracted.empty:
    in_main_not_in_extracted = set(df_main["std_id"]).intersection(set(std_ids)) - set(
        df_extracted["std_id"]
    )
    if in_main_not_in_extracted:
        print("\nProjects in main CSV but NOT in extracted CSV (from the list):")
        for id_str in sorted(list(in_main_not_in_extracted)):
            print(f"  - {id_str}")
    else:
        print(
            "\nAll projects from the list that are in main CSV are also in extracted CSV."
        )
