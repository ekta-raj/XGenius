import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import glob
import os
import numpy as np

# 📍 CONFIGURATION
DATA_DIR = '../data/'
OUTPUT_DIR = '../static_outputs/'

# Step 1: Load and Merge All Player ORIS Summary Files
def load_all_oris_files():
    all_files = glob.glob(os.path.join(DATA_DIR, "match1_oris_scores_with_names_and_teams_1846146.csv"))
    df_list = []

    for file in all_files:
        df = pd.read_csv(file)
        df['source_file'] = os.path.basename(file)
        df_list.append(df)

    df_all = pd.concat(df_list, ignore_index=True)
    
    # Convert player_id to string to ensure matching
    df_all['player_id'] = df_all['player_id'].astype(str)
    
    return df_all

# Step 2: Compute True Success Rate from Raw Run Data
def compute_true_success_rate():
    df_runs = pd.read_csv(os.path.join(DATA_DIR, 'off_ball_runs1.csv'))

    # Convert player_id to string to ensure matching
    df_runs['player_id'] = df_runs['player_id'].astype(str)

    # Calculate success rate per player
    df_success = df_runs.groupby('player_id').agg({
        'is_pass_reception_matched': 'mean'
    }).rename(columns={
        'is_pass_reception_matched': 'success_rate'
    }).reset_index()

    return df_success

# Step 3: Merge ORIS + Real Success Rate
def compute_player_profiles(df_all):
    df_profile = df_all.groupby(['player_id', 'player_name', 'team_name']).agg({
        'total_oris': 'sum',
        'avg_oris': 'mean',
        'num_runs': 'sum'
    }).reset_index()

    # Merge in actual success rate
    df_success = compute_true_success_rate()
    df_profile = pd.merge(df_profile, df_success, on='player_id', how='left')

    # Clean up duplicate player_name columns if present
    if 'player_name_x' in df_profile.columns:
        df_profile['player_name'] = df_profile['player_name_x']
        df_profile.drop(columns=['player_name_x', 'player_name_y'], inplace=True)

    # Optional: filter low-volume players
    df_profile = df_profile[df_profile['num_runs'] >= 3]

    #hi
    return df_profile

# Step 4: Scatter Plot (Matplotlib)
def plot_scatter(df_profile):
    plt.figure(figsize=(10, 6))
    sns.scatterplot(
        data=df_profile,
        x='avg_oris',
        y='success_rate',
        hue='team_name',
        style='team_name',
        s=100
    )
    plt.title('Off-Ball Player Influence: avg_ORIS vs Success Rate')
    plt.xlabel('Average ORIS per Run')
    plt.ylabel('Pass Reception Success Rate')
    plt.grid(True)
    plt.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
    plt.tight_layout()
    plt.savefig(os.path.join(OUTPUT_DIR, 'scatter_avgORIS_successRate.png'))
    plt.close()

# Step 5: Interactive Plotly Comparison
def plot_interactive_bar_comparison(df_profile, top_n=5):
    import plotly.graph_objects as go

    top_players = df_profile.sort_values('total_oris', ascending=False).head(top_n).copy()
    player_names = top_players['player_name']

    fig = go.Figure()

    fig.add_trace(go.Bar(
        y=player_names,
        x=top_players['total_oris'],
        name='Total ORIS',
        orientation='h',
        marker_color='rgba(255, 183, 3, 0.8)'
    ))

    fig.add_trace(go.Bar(
        y=player_names,
        x=top_players['avg_oris'],
        name='Avg ORIS',
        orientation='h',
        marker_color='rgba(0, 123, 255, 0.8)'
    ))

    fig.add_trace(go.Bar(
        y=player_names,
        x=top_players['success_rate'],
        name='Success Rate',
        orientation='h',
        marker_color='rgba(40, 167, 69, 0.8)'
    ))

    fig.update_layout(
        barmode='group',
        title='Top Off-Ball Influencers',
        xaxis_title='Score',
        yaxis_title='Player Name',
        template='plotly_white',
        height=500
    )

    output_path = os.path.join(OUTPUT_DIR, 'top5_oris_interactive.html')
    fig.write_html(output_path)
    print(f"✅ Interactive plot saved at: {output_path}")

# MAIN
if __name__ == '__main__':
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    df_all = load_all_oris_files()
    df_profile = compute_player_profiles(df_all)
    plot_scatter(df_profile)
    plot_interactive_bar_comparison(df_profile, top_n=5)
    print("✅ Visuals saved in:", OUTPUT_DIR)
