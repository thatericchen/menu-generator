from flask import Flask, request, jsonify, send_from_directory, redirect, url_for, render_template
from flask_cors import CORS
from werkzeug.utils import secure_filename
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
import os
import traceback

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

def generate_pdf(food_items, upload_folder):
    pdf_filename = 'menu.pdf'
    pdf_path = os.path.join(upload_folder, pdf_filename)
    c = canvas.Canvas(pdf_path, pagesize=letter)

    c.drawString(100, 750, 'Menu')
    y_position = 700

    for item in food_items:
        c.drawString(100, y_position, f"Item: {item['title']}")
        c.drawString(100, y_position - 20, f"Description: {item['description']}")
        c.drawString(100, y_position - 40, f"Price: {item['price']}")
        if 'picture' in item:
            picture_path = os.path.join(upload_folder, item['picture'])
            print(f"Debug: Full image path: {picture_path}")
            try:
                picture = ImageReader(picture_path)
                c.drawImage(picture, 100, y_position - 240, width=200, height=200, preserveAspectRatio=True, mask='auto')
                y_position -= 280  # Adjust space for image
            except Exception as e:
                print(f"Error loading image {picture_path}: {e}")
                traceback.print_exc()
        else:
            y_position -= 60  # Adjust space for text only

        # Check for end of page and create a new page if necessary
        if y_position <= 100:
            c.showPage()
            y_position = 750

    c.save()
    return pdf_filename

@app.route('/submit', methods=['POST'])
def submit_form():
    restaurant_name = request.form.get('restaurantName')
    restaurant_slogan = request.form.get('restaurantSlogan')
    restaurant_logo = request.files.get('restaurantLogo')

    if restaurant_logo:
        logo_filename = secure_filename(restaurant_logo.filename)
        restaurant_logo.save(os.path.join(app.config['UPLOAD_FOLDER'], logo_filename))

    food_items = []
    index = 0
    while True:
        title = request.form.get(f'foodItems[{index}].title')
        if not title:
            break
        description = request.form.get(f'foodItems[{index}].description')
        price = request.form.get(f'foodItems[{index}].price')
        dietary_restrictions = request.form.get(f'foodItems[{index}].dietaryRestrictions')
        vegetarian = request.form.get(f'foodItems[{index}].vegetarian') == 'true'
        spicy = request.form.get(f'foodItems[{index}].spicy') == 'true'
        gluten_free = request.form.get(f'foodItems[{index}].glutenFree') == 'true'
        picture = request.files.get(f'foodItems[{index}].picture')

        item_data = {
            'title': title,
            'description': description,
            'price': price,
            'dietary_restrictions': dietary_restrictions,
            'vegetarian': vegetarian,
            'spicy': spicy,
            'gluten_free': gluten_free
        }

        if picture:
            picture_filename = secure_filename(picture.filename)
            picture_path = os.path.join(app.config['UPLOAD_FOLDER'], picture_filename)
            picture.save(picture_path)
            print(f"Saved file to {picture_path}")

        food_items.append(item_data)
        index += 1

    pdf_filename = generate_pdf(food_items, app.config['UPLOAD_FOLDER'])
    pdf_url = url_for('uploaded_file', filename=pdf_filename, _external=True)

    return jsonify({'pdf_url': pdf_url})

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    app.run(debug=True, port=5002)

