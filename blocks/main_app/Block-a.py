from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
from config import Config
import os

app = Flask(__name__)
app.config.from_object(Config)

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Initialize Flask-Mail
mail = Mail(app)

# Import models after initializing db
from models import Order, Contact

# Ensure the instance folder exists
try:
    os.makedirs(app.instance_path)
except OSError:
    pass

# Import routes after app initialization
from routes import *

if __name__ == '__main__':
    app.run(debug=True)