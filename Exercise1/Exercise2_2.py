import pandas as pd
from Exercise2_1 import preprocess_data
import os
import shutil
from concurrent.futures import ThreadPoolExecutor

def split_data_by_day(df):
    os.makedirs("daily_files", exist_ok=True)
    os.makedirs("hourly_averages", exist_ok=True)

    df['date'] = df['timestamp'].dt.date
    for date, group in df.groupby('date'):
        output_path = os.path.join("daily_files", f"data_{date}.csv")  # תיקנתי כאן את שם התיקייה ל-"daily_files"
        group.to_csv(output_path, index=False)

def compute_hourly_average(file_name):
    try:
        path = os.path.join("daily_files", file_name)
        df_day = pd.read_csv(path)

        df_day['timestamp'] = pd.to_datetime(df_day['timestamp'], errors='coerce')
        df_day['value'] = pd.to_numeric(df_day['value'], errors='coerce')

        df_day = df_day.dropna(subset=['timestamp', 'value'])
        df_day['hour'] = df_day['timestamp'].dt.floor('h')

        # Compute hourly average
        hourly_avg = df_day.groupby('hour')['value'].mean().reset_index()

        output_path = os.path.join("hourly_averages", f"hourly_{file_name}")
        hourly_avg.to_csv(output_path, index=False)
        print(f"✅ Processed {file_name}")
    except Exception as e:
        print(f"Error processing {file_name}: {e}")

def merge_hourly_averages():
    all_hourly_files = [pd.read_csv(os.path.join("hourly_averages", f)) for f in os.listdir("hourly_averages") if f.endswith('.csv')]
    final_df = pd.concat(all_hourly_files)

    final_df.sort_values(by='hour', inplace=True)
    final_df.to_csv("final_output.csv", index=False)

    print("✅ Final file successfully created: final_output.csv")

def main():
    shutil.rmtree("daily_files", ignore_errors=True)
    shutil.rmtree("hourly_averages", ignore_errors=True)

    file_path = "time_series.csv"
    old_df = pd.read_csv(file_path)
    df=preprocess_data(old_df)

    split_data_by_day(df)

    split_files_list = os.listdir("daily_files")
    with ThreadPoolExecutor() as executor:
        futures = [executor.submit(compute_hourly_average, file_name) for file_name in split_files_list]
        for future in futures:
            future.result()

    merge_hourly_averages()

if __name__ == "__main__":
    main()
