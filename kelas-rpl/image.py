#code that feches an image from a google drive and returns the image in a format that can be used in a web application 
#use fetch.js to update the image in the web applicationfrom flask import Flask, send_file, request
import requests
from io import BytesIO

app = Flask(__name__)

# Example: Map folder names to Google Drive file IDs
FOLDER_IMAGES = {
    "folder1": "YOUR_FILE_ID_1",
    "folder2": "YOUR_FILE_ID_2",
    "folder3": "YOUR_FILE_ID_3",
}

def get_drive_image(file_id):
    url = f"https://drive.google.com/uc?export=download&id={file_id}"
    response = requests.get(url)
    response.raise_for_status()
    return BytesIO(response.content)

@app.route('/image')
def serve_image():
    folder = request.args.get('folder')
    file_id = FOLDER_IMAGES.get(folder)
    if not file_id:
        return "Invalid folder", 404
    image_io = get_drive_image(file_id)
    return send_file(image_io, mimetype='image/jpeg')

if __name__ == "__main__":
    app.run(debug=True)