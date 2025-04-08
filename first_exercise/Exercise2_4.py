import pandas as pd


def load_parquet_file(file_path):
    try:
        df = pd.read_parquet(file_path)  # This is the change between opening the two file types
        print("Parquet file loaded successfully.")
        return df
    except Exception as e:
        print(f"Error loading Parquet file: {e}")
        return pd.DataFrame()



def preprocess_data(df):

    df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce', dayfirst=True)
    df['mean_value'] = pd.to_numeric(df['mean_value'], errors='coerce')

    # Filter after conversion
    df = df.dropna(subset=['timestamp', 'mean_value'])
    df = df.drop_duplicates(subset=['timestamp'])

    return df



def calculate_hourly_average(df):
    df['hour'] = df['timestamp'].dt.floor('h')
    hourly_avg = df.groupby('hour')['mean_value'].mean().reset_index()
    return hourly_avg



def save_to_csv(df, output_file="average_by_hour.csv"):
    try:
        df.to_csv(output_file, index=False)
        print(f"Results successfully saved to {output_file}")
    except Exception as e:
        print(f"Error saving the file: {e}")


def main():
 file_path = "time_series.parquet"
 df = load_parquet_file(file_path)

 if not df.empty:
     df = preprocess_data(df)
     hourly_avg = calculate_hourly_average(df)

     if not hourly_avg.empty:
         save_to_csv(hourly_avg)

if __name__ == "__main__":
    main()


# יתרונות פורמט Parquet:
# אחסון עמודות (Columnar Storage)
# הנתונים נשמרים לפי עמודות ולא לפי שורות, דבר המאפשר גישה מהירה ויעילה רק לנתונים הנדרשים בפועל.
#
# דחיסה יעילה (Efficient Compression)
# הקובץ דחוס, מה שחוסך שטח אחסון ומקצר את זמני הקריאה והעיבוד.
#
# שימור טיפוסי נתונים (Data Types Support)
# הפורמט שומר על טיפוסי הנתונים המקוריים, דבר שמונע שגיאות המרה ושומר על דיוק הנתונים.
#
# שילוב עם כלים מתקדמים (Tool Integration)
# הפורמט נתמך על ידי כלים חזקים כמו Spark ו־Pandas, מה שמאפשר ניתוח יעיל של כמויות גדולות של מידע.
#
# מתאים במיוחד לסדרות זמן (Time Series Friendly)
# מאפשר עיבוד נוח ויעיל של נתונים מבוססי־זמן, ומשתלב היטב עם ספריות כמו pandas לניתוח סדרות זמן.