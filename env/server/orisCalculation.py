import pandas as pd

# === Load data ===
runs_df = pd.read_csv("sporting_college_data_1850048_off_ball_runs.csv")
tracking_df = pd.read_csv("sporting_college_data_1850048_tracking.csv", low_memory=False)

# === Compute ORIS score for each run ===
runs_df["ORIS"] = (
    3 * runs_df["break_defensive_line"].fillna(0) +
    2 * runs_df["push_defensive_line"].fillna(0) +
    4 * runs_df["is_pass_reception_matched"].fillna(0) +
    runs_df["n_opponents_overtaken"].fillna(0) -
    0.1 * runs_df["duration"].fillna(0)
)

# === Aggregate ORIS by player_id ===
player_oris = runs_df.groupby("player_id")["ORIS"].agg(
    total_oris="sum",
    avg_oris="mean",
    num_runs="count"
).reset_index()

# === Pull player_name and team_name from tracking data ===
# Drop duplicates to ensure unique player-team-name mapping
player_info = tracking_df[["player_id", "player_name", "team_name"]].drop_duplicates()

player_oris["player_id"] = player_oris["player_id"].astype(str)
player_info["player_id"] = player_info["player_id"].astype(str)

# Merge the info into ORIS summary
player_oris = player_oris.merge(player_info, on="player_id", how="left")

# === Save to CSV ===
player_oris = player_oris[["player_id", "player_name", "team_name", "total_oris", "avg_oris", "num_runs"]]
player_oris.to_csv("oris_scores_with_names_and_teams.csv", index=False)

print("✅ CSV saved: oris_scores_with_names_and_teams.csv")
