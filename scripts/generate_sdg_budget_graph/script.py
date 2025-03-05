import os
from pathlib import Path

import matplotlib.image as mpimg
import matplotlib.patches as patches
import matplotlib.pyplot as plt
import pandas as pd

# Define SDG colors
sdg_colors = {
    1: "#E5243B",
    2: "#DDA63A",
    3: "#4C9F38",
    4: "#C5192D",
    5: "#FF3A21",
    6: "#26BDE2",
    7: "#FCC30B",
    8: "#A21942",
    9: "#FD6925",
    10: "#DD1367",
    11: "#FD9D24",
    12: "#BF8B2E",
    13: "#3F7E44",
    14: "#0A97D9",
    15: "#56C02B",
    16: "#00689D",
    17: "#19486A",
}

# Create output directory if it doesn't exist
output_dir = Path("data/plots")
output_dir.mkdir(parents=True, exist_ok=True)

# Path to SDG icons
sdg_icons_dir = Path("assets/sdg_icons")


def get_project_count(file_name_base):
    """
    Get the count of water-focused projects from the metadata file.

    Args:
        file_name_base: Base name of the file (without .csv extension)

    Returns:
        int: Number of water-focused projects, or None if metadata file not found
    """
    metadata_path = output_dir / f"metadata_{file_name_base}.txt"
    if os.path.exists(metadata_path):
        with open(metadata_path, "r") as f:
            for line in f:
                if line.startswith("water_focused_count="):
                    return int(line.strip().split("=")[1])
    return None


def create_plot(file_name_base):
    """
    Create SDG budget distribution plot from processed data.

    Args:
        file_name_base: Base name of the file (without .csv extension)
    """
    # Load the processed data
    csv_path = Path("data/output/sdg_budget_distribution.csv")
    if not os.path.exists(csv_path):
        # If file doesn't exist in output directory, try loading from projects data
        csv_path = Path(f"./data/projects/{file_name_base}.csv")
        if not os.path.exists(csv_path):
            print(f"Error: Processed data file not found at {csv_path}")
            return

        # Process the data from raw projects file
        df = pd.read_csv(csv_path)
        df = df[df["tag"] == "water focused"]
        df["SDGs"] = df["sdg"].str.split(", ")

        df_exploded = df.explode("SDGs")
        df_sdg_budget = df_exploded.groupby("SDGs", as_index=False).agg(
            {"budget": "sum"}
        )
        df_sdg_budget["SDGs"] = df_sdg_budget["SDGs"].astype(int)
        df_sdg_budget = df_sdg_budget.groupby("SDGs", as_index=False).agg(
            {"budget": "sum"}
        )

        # Convert budget to billions for display
        df_sdg_budget["budget_billions"] = df_sdg_budget["budget"] / 1_000_000_000

        # Sort by SDG number
        df_sdgs = df_sdg_budget.copy()
        df_sdgs["SDGs"] = df_sdgs["SDGs"].astype(int)
        df_sdgs = df_sdgs.sort_values(by="SDGs", ascending=True)

        # Export to CSV
        output_csv_path = output_dir / f"sdg_budget_distribution_{file_name_base}.csv"
        df_sdgs.to_csv(output_csv_path, index=False)
        print(f"CSV data exported to {output_csv_path}")
    else:
        # If processed file exists, use it directly
        df_sdgs = pd.read_csv(csv_path)
        df_sdgs["SDGs"] = df_sdgs["SDGs"].astype(int)

        # Export to CSV for reference
        output_csv_path = output_dir / f"sdg_budget_distribution_{file_name_base}.csv"
        df_sdgs.to_csv(output_csv_path, index=False)
        print(f"CSV data exported to {output_csv_path}")

    # Get colors for each SDG
    colors = [sdg_colors[sdg] for sdg in df_sdgs["SDGs"]]

    # Function to add SDG icon above bar
    def add_sdg_icon(ax, sdg, x, y):
        try:
            sdg_int = int(sdg)
            icon_path = sdg_icons_dir / f"Goal_{sdg_int}.png"

            if os.path.exists(icon_path):
                # Load the image
                img = mpimg.imread(icon_path)

                # Set fixed square dimensions for consistent appearance
                icon_size = 0.5  # Smaller size for better proportions

                # Add the image without a background box for cleaner appearance
                ax.imshow(
                    img,
                    extent=[
                        x - icon_size / 2,
                        x + icon_size / 2,
                        y,
                        y + icon_size,  # Force square aspect ratio
                    ],
                    aspect="equal",  # Force equal aspect ratio
                    zorder=11,
                )

                return True
            else:
                print(f"Icon file not found for SDG {sdg_int}: {icon_path}")

                # Fallback to colored box with number (also square)
                rect_size = 0.5  # Square dimensions

                rect = patches.Rectangle(
                    (x - rect_size / 2, y),
                    rect_size,
                    rect_size,  # Equal height and width
                    facecolor=sdg_colors[sdg_int],
                    edgecolor="white",
                    linewidth=1.5,
                    alpha=1.0,
                    zorder=10,
                )
                ax.add_patch(rect)

                # Add the SDG number in white text
                ax.text(
                    x,
                    y + rect_size / 2,
                    str(sdg_int),
                    ha="center",
                    va="center",
                    color="white",
                    fontsize=14,
                    fontweight="bold",
                    zorder=11,
                )

                return False
        except Exception as e:
            print(f"Error adding icon for SDG {sdg}: {e}")
            return False

    # Get the count of water-focused projects
    project_count = get_project_count(file_name_base)
    project_count_text = (
        f"{project_count} " if project_count else "501 "
    )  # Default to 501 if count not found

    # Create figure with specific size and style
    plt.figure(figsize=(24, 10))  # Even wider figure for more padding on sides
    plt.rcParams.update(
        {
            "font.size": 12,
            "font.family": "sans-serif",
            "font.weight": "normal",
            "axes.titleweight": "bold",
            "axes.labelweight": "bold",
            "axes.spines.top": False,
            "axes.spines.right": False,
        }
    )

    # Set background color to white
    ax = plt.gca()
    ax.set_facecolor("white")
    fig = plt.gcf()
    fig.patch.set_facecolor("white")

    # Set x-axis limits with padding on both sides
    plt.xlim(0.25, 17.75)  # Add more padding on both sides of x-axis

    # Plot bar chart with reduced width for better spacing
    bars = plt.bar(
        df_sdgs["SDGs"],
        df_sdgs["budget_billions"],
        color=colors,
        width=0.35,  # Even narrower bars for better spacing
        edgecolor="white",
        linewidth=0.5,
    )

    # Add SDG icons above each bar
    for bar, sdg in zip(bars, df_sdgs["SDGs"]):
        # Position for the icon (above the bar)
        x = bar.get_x() + bar.get_width() / 2
        y = bar.get_height() + 0.05  # Smaller offset for better appearance

        # Add the SDG icon
        add_sdg_icon(ax, sdg, x, y)

    # Add value labels on top of bars
    for bar in bars:
        height = bar.get_height()
        plt.text(
            bar.get_x() + bar.get_width() / 2.0,
            height + 0.6,  # Reduced offset to account for smaller icons
            f"{height:.1f}",
            ha="center",
            va="bottom",
            fontsize=11,  # Slightly larger font
            fontweight="bold",  # Make the values bold
        )

    # Customize the plot
    plt.xlabel("SDGs", fontsize=16, fontweight="bold")
    plt.ylabel("Billion USD", fontsize=16, fontweight="bold")
    plt.title(
        f"Budget distribution of UNDPs {project_count_text}Water-Focused Projects {file_name_base} by SDGs",
        fontsize=18,
        fontweight="bold",
        pad=20,  # Add some padding above the title
    )
    plt.xticks(df_sdgs["SDGs"], fontsize=14)
    plt.yticks(fontsize=14)

    # Set y-axis limit with some padding
    max_budget = df_sdgs["budget_billions"].max()
    plt.ylim(0, max_budget * 1.7)  # Increased padding for SDG icons and labels

    # Add a light gray background grid
    plt.grid(True, linestyle="--", alpha=0.3, axis="y")

    # Remove top and right spines
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)

    # Add subtle box around the plot
    ax.spines["left"].set_linewidth(0.5)
    ax.spines["bottom"].set_linewidth(0.5)
    ax.spines["left"].set_color("#888888")
    ax.spines["bottom"].set_color("#888888")

    # Add more padding around the plot
    plt.subplots_adjust(left=0.08, right=0.92, top=0.9, bottom=0.1)

    # Don't use tight_layout as it may override our custom padding
    # plt.tight_layout()

    # Save the figure with high resolution
    output_path = output_dir / f"sdg_distribution_water_focused_{file_name_base}.png"
    plt.savefig(output_path, dpi=300, bbox_inches="tight")
    print(f"Plot saved to {output_path}")


def main():
    """Create plots for all processed SDG budget data files."""
    create_plot("2018-24")
    create_plot("2018-22")

    print("SDG budget plots created successfully.")


if __name__ == "__main__":
    main()
