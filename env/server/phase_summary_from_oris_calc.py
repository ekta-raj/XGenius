import os
import pandas as pd

def string_to_seconds(t):
    """Convert 'MM:SS.s' format string to float seconds."""
    if isinstance(t, (int, float)):
        return float(t)
    if ":" not in str(t):
        return float(t)
    mins, rest = t.split(":")
    return int(mins) * 60 + float(rest)

def seconds_to_mmss(seconds):
    """Convert seconds (int/float) to MM:SS format string."""
    minutes = int(seconds) // 60
    secs = int(seconds) % 60
    return f"{minutes:02}:{secs:02}"

# === Step 1: Set your match folder ===
match_folder = "Match6Data(1875301)"  # Change per match

# === Step 2: Load file paths ===
runs_path = os.path.join(match_folder, "sporting_college_data_1875301_off_ball_runs.csv")
possessions_path = os.path.join(match_folder, "sporting_college_data_1875301_player_possessions.csv")

# === Step 3: Load CSVs ===
runs_df = pd.read_csv(runs_path)
possessions_df = pd.read_csv(possessions_path)

# === Step 4: Compute ORIS ===
runs_df["ORIS"] = (
    3 * runs_df["break_defensive_line"].fillna(0) +
    2 * runs_df["push_defensive_line"].fillna(0) +
    4 * runs_df["is_pass_reception_matched"].fillna(0) +
    runs_df["n_opponents_overtaken"].fillna(0) -
    0.1 * runs_df["duration"].fillna(0)
)

# === Step 5: ORIS summary per possession ===
phase_summary = runs_df.groupby("associated_player_possession_event_id")["ORIS"].agg(
    total_oris="sum",
    avg_oris="mean",
    num_runs="count"
).reset_index()

# === Step 6: Merge with possession outcomes ===
merged = possessions_df.merge(
    phase_summary,
    left_on="event_id",
    right_on="associated_player_possession_event_id",
    how="left"
)

# === Step 7: Fill missing ORIS values ===
merged["total_oris"] = merged["total_oris"].fillna(0).infer_objects(copy=False)
merged["avg_oris"] = merged["avg_oris"].fillna(0).infer_objects(copy=False)
merged["num_runs"] = merged["num_runs"].fillna(0).astype(int)

# === Step 8: Convert 'MM:SS.s' -> seconds -> back to 'MM:SS' ===
merged["time_range"] = merged.apply(
    lambda row: f"{seconds_to_mmss(string_to_seconds(row['time_start']))} - {seconds_to_mmss(string_to_seconds(row['time_end']))}",
    axis=1
)

# === Step 9: Final output ===
final_df = merged[[
    "event_id", "match_id", "team_shortname", "time_range",
    "num_runs", "total_oris", "avg_oris",
    "lead_to_shot", "lead_to_goal"
]]

# === Step 10: Save to CSV ===
output_path = os.path.join(match_folder, "phase_summary.csv")
final_df.to_csv(output_path, index=False)

print(f"✅ Saved phase summary to: {output_path}")
