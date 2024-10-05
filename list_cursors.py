import os
import json

def list_cursor_files(directory):
    cursor_files = [f for f in os.listdir(directory) if f.endswith('.png')]
    return cursor_files

if __name__ == "__main__":
    cursor_directory = '../cursorsNum'  # Adjust the path as necessary
    cursor_files = list_cursor_files(cursor_directory)
    print(json.dumps(cursor_files))  # Output the list as JSON