import psycopg2
# for nicer table formatting
from tabulate import tabulate

# database connection details
DB_NAME = "mit_clubs"
DB_USER = "postgres"
DB_PASSWORD = "root"
DB_HOST = "localhost"
DB_PORT = "5432"

def view_clubs():
    try:
        # connect to PostgreSQL
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT
        )
        cursor = conn.cursor()
        print("Connected to the database.")

        # query to retrieve all clubs
        cursor.execute("SELECT * FROM clubs;")
        clubs = cursor.fetchall()
        
        # use tabulate to format the output in a table
        headers = ["club_id", "name", "is_active", "is_accepting", "recruiting_cycle", 
                   "membership_process", "type", "email", "website", "mission", "picture_url"]
        print(tabulate(clubs, headers, tablefmt="plain"))

    except Exception as e:
        print(f"Error: {e}")
    finally:
        if conn:
            cursor.close()
            conn.close()
            print("Database connection closed.")

if __name__ == '__main__':
    view_clubs()