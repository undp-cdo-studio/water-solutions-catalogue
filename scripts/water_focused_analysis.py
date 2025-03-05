import pandas as pd
from utils import analyse_with_azure

df = pd.read_csv("solutions_rows.csv")

df["all_text"] = (
    "Background: "
    + df["background"].astype(str)
    + "\n Summary: "
    + df["solution_summary"].astype(str)
    + "\n Best Practice Title: "
    + df["best_practice_title"].astype(str)
    + "\n Project Name:  "
    + df["project_name"].astype(str)
)


water_tagging_prompt = """
# Objective
You are an expert UNDP analyst. Review this project information and determine whether the project is water related or water focused.

## Guidance
- If any mention of rivers, lakes, streams, brooks, springs, dams, flooding, storm surges or water infrastructure appears in the project title or description,  it's water-focused.
- Likewise, if the project is about water supply, sanitation facilities, water resource management, irrigation systems, flood management, drought management or WASH programs, it's water-focused.
- If the project is about projects which may contain a water element, or isn't primarily related to water management or the water part of the ecosystem, it's water-related.

## Output format
true if water-focused; or false if water-related
"""

outputs = []
errors = []
for index, row in df.iterrows():
    print(row["all_text"])
    try:
        result = analyse_with_azure(water_tagging_prompt, row["all_text"])
        outputs.append({"id": row["id"], "tag": result})
    except Exception as e:
        print("Error processing: " + str(e))
        errors.append(row)
