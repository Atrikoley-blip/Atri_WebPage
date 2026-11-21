from flask import Flask, render_template, request, jsonify
import json
from datetime import datetime
import re

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/contact", methods=["POST"])
def contact():

    data = request.get_json(silent=True) or {}

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    message = data.get("message", "").strip()

    if not name or not email or not message:
        return jsonify({
            "success": False,
            "message": "Please fill all fields."
        }), 400

    if len(name) > 80 or len(message) > 2000:
        return jsonify({
            "success": False,
            "message": "Input is too long."
        }), 400

    if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", email):
        return jsonify({
            "success": False,
            "message": "Enter a valid email address."
        }), 400

    contact_data = {
        "name": name,
        "email": email,
        "message": message,
        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }

    with open("messages.txt", "a", encoding="utf-8") as file:
        file.write(json.dumps(contact_data) + "\n")

    return jsonify({
        "success": True,
        "message": "Message received successfully!"
    })

if __name__ == "__main__":
    app.run(debug=True)