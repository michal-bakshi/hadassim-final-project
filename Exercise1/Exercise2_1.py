import pandas as pd
from datetime import datetime

def load_csv_file(file_path):
    try:
        df = pd.read_csv(file_path)
        print("CSV file loaded successfully.")
        return df
    except Exception as e:
        print(f"Error loading CSV file: {e}")
        return pd.DataFrame()


def preprocess_data(df):
    df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce', dayfirst=True)
    df = df[df['timestamp'].notna()]

    df['value'] = pd.to_numeric(df['value'], errors='coerce')
    df = df[df['value'].notna()]

    df = df.drop_duplicates(subset=['timestamp'])

    return df


def calculate_hourly_average(df):
    df['timestamp'] = df['timestamp'].dt.floor('h')
    hourly_avg = df.groupby('timestamp')['value'].mean().reset_index()
    return hourly_avg


def main():
 file_path = "time_series.csv"
 df = load_csv_file(file_path)

 if not df.empty:
     df = preprocess_data(df)
     hourly_avg = calculate_hourly_average(df)

     if not hourly_avg.empty:
         print(hourly_avg)
         hourly_avg.to_csv("clean_data.csv", index=False)
         print("Cleaned data saved to clean_data.csv")



if __name__ == "__main__":
    main()