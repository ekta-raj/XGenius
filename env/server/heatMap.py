import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import os

# === Step 1: Load data ===
phase_df = pd.read_csv("phase_summary_match6_1875301.csv")
matches_df = pd.read_csv("sporting_college_data_matches.csv")

# === Step 2: Binning for ORIS and run counts ===
phase_df["oris_bin"] = pd.cut(
    phase_df["total_oris"],
    bins=[-1, 2, 4, 6, 8, 10, float("inf")],
    labels=["0–2", "2–4", "4–6", "6–8", "8–10", "10+"]
)

phase_df["run_bin"] = pd.cut(
    phase_df["num_runs"],
    bins=[-1, 0, 1, 2, 3, 4, 5, float("inf")],
    labels=["0", "1", "2", "3", "4", "5", "6+"]
)

# === Step 3: Merge match metadata ===
match_meta = matches_df[[
    "match_id",
    "home_team_short_name", "away_team_short_name",
    "home_team_score", "away_team_score"
]]
merged = phase_df.merge(match_meta, on="match_id", how="left")

# === Step 4: Loop through each team ===
teams = merged["team_shortname"].unique()

for team in teams:
    team_data = merged[merged["team_shortname"] == team]

    if team_data.empty:
        print(f"⚠️ Skipping {team} – no data.")
        continue

    # Get metadata for title
    row = team_data.iloc[0]
    if team == row["home_team_short_name"]:
        opponent = row["away_team_short_name"]
        score = f"({row['home_team_score']}-{row['away_team_score']})"
    else:
        opponent = row["home_team_short_name"]
        score = f"({row['away_team_score']}-{row['home_team_score']})"

    # Clean names for filenames
    safe_team = team.replace(" ", "_")
    safe_opp = opponent.replace(" ", "_")
    score_fmt = score.strip("()").replace("-", "_")

    # === HEATMAP ===
    heatmap_data = team_data.pivot_table(
        index="run_bin",
        columns="oris_bin",
        values="lead_to_shot",
        aggfunc="mean",
        observed=False
    )

    if not heatmap_data.empty:
        plt.figure(figsize=(10, 7))
        sns.heatmap(heatmap_data, annot=True, fmt=".0%", cmap="YlGnBu", cbar_kws={"label": "Shot Probability"})
        plt.title(f"Shot Probability – {team} vs {opponent} {score}")
        plt.xlabel("Total ORIS in Possession Phase")
        plt.ylabel("Number of Off-Ball Runs")
        plt.tight_layout()

        # Save heatmap image and CSV
        heatmap_img = f"heatmap_{safe_team}_vs_{safe_opp}_{score_fmt}.png"
        heatmap_csv = f"heatmap_data_{safe_team}_vs_{safe_opp}_{score_fmt}.csv"
        plt.savefig(heatmap_img)
        heatmap_data.to_csv(heatmap_csv)
        plt.show()
    else:
        print(f"⚠️ No heatmap data for {team} vs {opponent} {score}")

    # === BAR CHART ===
    bar_data = team_data[team_data["lead_to_shot"].isin([True, False]) & team_data["total_oris"].notna()]
    bar_data = bar_data.groupby("lead_to_shot")["total_oris"].mean().reset_index()
    bar_data["lead_to_shot"] = bar_data["lead_to_shot"].map({False: "No Shot", True: "Shot"})

    if not bar_data.empty:
        plt.figure(figsize=(6, 4))
        sns.barplot(data=bar_data, x="lead_to_shot", y="total_oris", color="skyblue")
        plt.title(f"Avg ORIS – {team} vs {opponent} {score}")
        plt.ylabel("Average Total ORIS")
        plt.xlabel("")
        plt.tight_layout()

        # Save bar chart
        bar_img = f"bar_avg_oris_{safe_team}_vs_{safe_opp}_{score_fmt}.png"
        plt.savefig(bar_img)
        plt.show()
    else:
        print(f"⚠️ No bar chart data for {team} vs {opponent} {score}")
