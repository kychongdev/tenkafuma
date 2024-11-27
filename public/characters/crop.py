from PIL import Image
import os

# Define the input and output folder paths
input_folder = "./new"
output_folder = "./square"

# Create the output folder if it doesn't exist
os.makedirs(output_folder, exist_ok=True)

# Loop over each file in the input folder
for filename in os.listdir(input_folder):
    # Construct the full path to the image file
    file_path = os.path.join(input_folder, filename)
    
    # Check if the file is an image (you may adjust this for specific formats)
    if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        # Open the image
        image = Image.open(file_path)
        
        # Get the dimensions of the image
        width, height = image.size
        
        # Define the cropping box (left, upper, right, lower)
        cropping_box = (0, 50, width, height - 295)
        
        # Crop the image
        cropped_image = image.crop(cropping_box)
        
        # Save the cropped image in the output folder
        output_path = os.path.join(output_folder, filename)
        cropped_image.save(output_path)

        print(f"Cropped and saved: {output_path}")

print("All images have been processed.")
