import pandas as pd
import plotly.express as px

# Load your Excel file
df = pd.read_excel("Match 2 Scatter Plot.xlsx")

# Print actual column names to debug
print("Original columns:", df.columns.tolist())

# Strip spaces
df.columns = df.columns.str.strip()

# Confirm post-strip names
print("After stripping:", df.columns.tolist())

# Use a safe rename map only for existing columns
rename_map = {
    'Total ORIS': 'Total_ORIS',
    'Avg Risk': 'Avg_Risk_Score',
    'Team Name': 'Team_Name',
    'Jersey Number': 'Jersey_Number',
    'Name': 'Player_Name'
}

df.rename(columns={k: v for k, v in rename_map.items() if k in df.columns}, inplace=True)

# Print final columns
print("Renamed columns:", df.columns.tolist())

# Now safe to proceed
color_map = {
    'North Carolina Courage': 'red',
    'Kansas City Current': 'blue'
}
df['Color'] = df['Team_Name'].map(color_map)

# Hover text
df['hover_text'] = df['Player_Name'] + ' (#' + df['Jersey_Number'].astype(str) + ')'

# Check existence before proceeding
if 'Avg_Risk_Score' not in df.columns or 'Total_ORIS' not in df.columns:
    raise ValueError("Check if the Excel sheet has the correct headers: 'Avg Risk', 'Total ORIS', etc.")

# Median lines
avg_risk_median = df['Avg_Risk_Score'].median()
oris_median = df['Total_ORIS'].median()

# Plot
fig = px.scatter(
    df,
    x='Avg_Risk_Score',
    y='Total_ORIS',
    color='Team_Name',
    color_discrete_map=color_map,
    hover_name='hover_text',
    title='Average Risk Score vs Total ORIS',
)

# Customize appearance
fig.update_traces(marker=dict(size=12, line=dict(width=1, color='black')))

# Add quadrant lines
fig.add_shape(type='line', x0=avg_risk_median, y0=df['Total_ORIS'].min(),
              x1=avg_risk_median, y1=df['Total_ORIS'].max(),
              line=dict(dash='dash', color='gray'))

fig.add_shape(type='line', x0=df['Avg_Risk_Score'].min(), y0=oris_median,
              x1=df['Avg_Risk_Score'].max(), y1=oris_median,
              line=dict(dash='dash', color='gray'))

# Annotations
x_min, x_max = df['Avg_Risk_Score'].min(), df['Avg_Risk_Score'].max()
y_min, y_max = df['Total_ORIS'].min(), df['Total_ORIS'].max()

fig.add_annotation(x=x_max + 0.5, y=y_max + 0.5, text="<b>High Risk-Passes, High ORIS</b>", showarrow=False)
fig.add_annotation(x=x_max + 0.5, y=y_min - 0.5, text="<b>High Risk-Passes, Low ORIS</b>", showarrow=False)
fig.add_annotation(x=x_min - 0.5, y=y_min - 0.5, text="<b>Low Risk-Passes, Low ORIS</b>", showarrow=False)
fig.add_annotation(x=x_min - 0.5, y=y_max + 0.5, text="<b>Low Risk-Passes, High ORIS</b>", showarrow=False)

# Final layout
fig.update_layout(
    xaxis_title='Average Risk Score',
    yaxis_title='Total ORIS',
    legend_title='Team',
    template='plotly_white'
)

# Save and show
fig.write_html("match2_plot.html", full_html=False, include_plotlyjs='cdn')
fig.show()
print("✅ match2_plot.html has been created successfully!")
