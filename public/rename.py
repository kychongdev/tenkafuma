import os

# Define the directory where your files are located
directory = './characters'  # Change this to your directory

# Loop through all files in the directory
for filename in os.listdir(directory):
    # Check if the filename contains "cs" and "_0_0"
    if 'cs' in filename or '_0_0' in filename:
        # Create the new filename by replacing "cs" and "_0_0" with an empty string
        new_filename = filename.replace('cs', '').replace('_0_0', '')
        # Build full file paths
        old_file = os.path.join(directory, filename)
        new_file = os.path.join(directory, new_filename)
        # Rename the file
        os.rename(old_file, new_file)
        print(f'Renamed: {filename} -> {new_filename}')
    else:
        print(f'Skipping: {filename} (no change needed)')
