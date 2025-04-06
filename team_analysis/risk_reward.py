import pandas as pd

# Load your actual passes data (from passing_options.csv filtered for actual passes)
passing_options = pd.read_csv("/Users/ektaraj/Documents/XGenius/XGenius/team_analysis/match1/sporting_college_data_1846146_passing_options.csv")

# Step 1: Filter actual passes (pass + matched reception)
actual_passes = passing_options[
    (passing_options["is_pass_reception_matched"] == True) &
    (passing_options["player_in_possession_id"].notna()) &
    (passing_options["player_id"].notna())
]

# Step 2: Select features for risk score calculation
risk_data = actual_passes[[
    'event_id',
    'player_in_possession_id',
    'player_in_possession_name',
    'player_id',
    'player_name',
    'frame_start',
    'x_start', 'y_start',
    'player_in_possession_x_start', 'player_in_possession_y_start',
    'pass_distance',
    'interplayer_distance',
    'interplayer_angle',
    'trajectory_angle',
    'pass_angle',
    'n_opponents_ahead_pass_reception',
    'n_opponents_bypassed',
    'delta_to_last_defensive_line_start',
    'separation_start',
    'defensive_structure',
    'inside_defensive_shape_end',
    'dangerous',
    'difficult_pass_target'
]].dropna(subset=[
    'x_start', 'y_start',
    'player_in_possession_x_start', 'player_in_possession_y_start',
    'pass_distance',
    'n_opponents_ahead_pass_reception',
    'n_opponents_bypassed'
])

# Step 3: Define risk score function
def compute_risk_score(row):
    distance_risk = row['pass_distance'] * 0.3
    angle_risk = (abs(row['pass_angle']) +
                  abs(row['trajectory_angle']) +
                  abs(row['interplayer_angle'])) * 0.1
    defenders_ahead_risk = row['n_opponents_ahead_pass_reception'] * 2.0
    defenders_bypassed_risk = row['n_opponents_bypassed'] * 1.5
    defensive_line_risk = abs(row.get('delta_to_last_defensive_line_start', 0)) * 0.5
    separation_risk = (10 - row.get('separation_start', 0)) * 0.2
    shape_risk = 2.0 if row.get('inside_defensive_shape_end', False) else 0
    structure_risk = 1.5 if row.get('defensive_structure', '') == 'compact' else 0
    danger_flag = 3.0 if row.get('dangerous', False) else 0
    difficulty_flag = 2.5 if row.get('difficult_pass_target', False) else 0

    total_risk = (
        distance_risk +
        angle_risk +
        defenders_ahead_risk +
        defenders_bypassed_risk +
        defensive_line_risk +
        separation_risk +
        shape_risk +
        structure_risk +
        danger_flag +
        difficulty_flag
    )
    return total_risk

# Step 4: Apply risk score function
risk_data['risk_score'] = risk_data.apply(compute_risk_score, axis=1)

# Step 5: Add team classification using team_id
team_info = passing_options[['player_in_possession_id', 'team_id']].drop_duplicates()
risk_data = pd.merge(risk_data, team_info, on='player_in_possession_id', how='left')

team_ids = risk_data['team_id'].dropna().unique()
if len(team_ids) >= 2:
    team_map = {team_ids[0]: 'Team 1', team_ids[1]: 'Team 2'}
else:
    team_map = {team_ids[0]: 'Team 1'}
risk_data['team_class'] = risk_data['team_id'].map(team_map)

# Step 6: Average risk score per player
average_risk_by_player = (
    risk_data.groupby(['player_in_possession_id', 'player_in_possession_name', 'team_class'])
    .agg(avg_risk_score=('risk_score', lambda x: round(x.mean(), 2)))
    .reset_index()
)

# Save results if needed
risk_data.to_csv("actual_passes_with_risk_scores.csv", index=False)
average_risk_by_player.to_csv("average_risk_scores_per_player.csv", index=False)
