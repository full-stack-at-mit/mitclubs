import csv
import psycopg2

# database connection details
DB_NAME = "mit_clubs"
DB_USER = "postgres"
DB_PASSWORD = "root"
DB_HOST = "localhost"
DB_PORT = "5432"

CSV_FILE_PATH = "clubs_scraped.csv"

# connect to postgresql
try:
    conn = psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT
    )
    cursor = conn.cursor()
    print("Connected to the database.")

    # create an insert query
    insert_query = """
    INSERT INTO clubs (name, is_active, is_accepting, recruiting_cycle, membership_process, type, email, website, mission, picture_url)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    # open the csv and read data
    with open(CSV_FILE_PATH, mode='r', encoding='utf-8') as csvfile:
        csvreader = csv.DictReader(csvfile)
        
        # insert each row into the table
        for row in csvreader:
            cursor.execute(insert_query, (
                row['name'],
                row['is_active'] == 'TRUE',
                row['is_accepting'] == 'TRUE',
                row['recruiting_cycle'],
                row['membership_process'],
                row['type'],
                row['email'],
                row['website'],
                row['mission'],
                row['picture_url']
            ))

    # commit changes and close the connection
    conn.commit()
    print("Data inserted successfully.")
except Exception as e:
    print(f"Error: {e}")
finally:
    if conn:
        cursor.close()
        conn.close()
        print("Database connection closed.")