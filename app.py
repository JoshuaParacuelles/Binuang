from flask import Flask, request, jsonify
from werkzeug.exceptions import HTTPException
import logging
import traceback
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app)

# MySQL connection
try:
    db = pymysql.connect(
        host='localhost',
        user='root',
        password='',
        database='amazing_site',
        cursorclass=pymysql.cursors.DictCursor
    )
except Exception as e:
    logging.error('Could not connect to the database: %s', traceback.format_exc())
    db = None

logging.basicConfig(level=logging.DEBUG)

# REGISTER
@app.route('/register', methods=['POST'])
def register():
    try:
        if db is None:
            return jsonify({'success': False, 'message': 'Database not connected'}), 500

        data = request.json
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'success': False, 'message': 'Fill all fields!'})

        cursor = db.cursor()
        cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
        if cursor.fetchone():
            return jsonify({'success': False, 'message': 'User already exists!'})

        cursor.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, password))
        db.commit()

        return jsonify({'success': True, 'message': 'Registered successfully!'})

    except Exception:
        return jsonify({'success': False, 'message': 'Internal Server Error'}), 500


# LOGIN
@app.route('/login', methods=['POST'])
def login():
    try:
        if db is None:
            return jsonify({'success': False, 'message': 'Database not connected'}), 500

        data = request.json
        email = data.get('email')
        password = data.get('password')

        cursor = db.cursor()
        cursor.execute("SELECT * FROM users WHERE email=%s AND password=%s", (email, password))
        user = cursor.fetchone()

        if user:
            return jsonify({'success': True, 'email': email})
        else:
            return jsonify({'success': False, 'message': 'Invalid credentials!'})

    except Exception:
        return jsonify({'success': False, 'message': 'Internal Server Error'}), 500


# CONTACT
@app.route('/contact', methods=['POST'])
def contact():
    try:
        data = request.json
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        cursor = db.cursor()
        cursor.execute("INSERT INTO contacts (name, email, message) VALUES (%s, %s, %s)", (name, email, message))
        db.commit()

        return jsonify({'success': True, 'message': 'Message sent!'})

    except Exception:
        return jsonify({'success': False, 'message': 'Internal Server Error'}), 500


# PROFILE
@app.route('/profile', methods=['POST'])
def profile():
    try:
        data = request.json
        email = data.get('email')

        cursor = db.cursor()
        cursor.execute("SELECT id, email, name FROM users WHERE email=%s", (email,))
        user = cursor.fetchone()

        if user:
            return jsonify({'success': True, 'profile': user})
        else:
            return jsonify({'success': False, 'message': 'User not found!'})

    except Exception:
        return jsonify({'success': False, 'message': 'Internal Server Error'}), 500


@app.route('/ping')
def ping():
    return jsonify({'success': True, 'message': 'pong'})


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)
