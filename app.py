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
    app.run(debug=True)@app.route('/')
def home():
    return render_template('index.html')@app.route('/order', methods=['POST'])
def process_order():
    if request.method == 'POST':
        customer_name = request.form.get('customer_name')
        customer_email = request.form.get('customer_email')
        
        if not customer_name or not customer_email:
            return jsonify({'error': 'Missing required fields'}), 400

        # Create a new order
        new_order = Order(customer_name=customer_name, customer_email=customer_email)
        db.session.add(new_order)
        db.session.commit()

        # Send confirmation email
        send_confirmation_email(customer_email, new_order.id)

        return jsonify({'message': 'Order processed successfully', 'order_id': new_order.id}), 200

def send_confirmation_email(email, order_id):
    subject = "Order Confirmation - AI WebDev Pro Book"
    body = f"""
    Dear Customer,

    Thank you for your order of the AI WebDev Pro Book!

    Your order ID is: {order_id}

    We'll process your order shortly and send you another email with shipping details.

    If you have any questions, please don't hesitate to contact us.

    Best regards,
    The AI WebDev Pro Team
    """

    msg = Message(subject=subject,
                  sender=app.config['MAIL_DEFAULT_SENDER'],
                  recipients=[email],
                  body=body)

    try:
        mail.send(msg)
    except Exception as e:
        app.logger.error(f"Failed to send email: {str(e)}")

@app.route('/contact', methods=['POST'])
def submit_contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')

        if not name or not email or not message:
            return jsonify({'error': 'Missing required fields'}), 400

        # Create a new contact submission
        new_contact = Contact(name=name, email=email, message=message)
        db.session.add(new_contact)
        db.session.commit()

        # Send notification email to admin
        send_contact_notification(name, email, message)

        return jsonify({'message': 'Contact form submitted successfully'}), 200

def send_contact_notification(name, email, message):
    subject = "New Contact Form Submission"
    body = f"""
    A new contact form submission has been received:

    Name: {name}
    Email: {email}
    Message:
    {message}
    """

    msg = Message(subject=subject,
                  sender=app.config['MAIL_DEFAULT_SENDER'],
                  recipients=[app.config['ADMIN_EMAIL']],
                  body=body)

    try:
        mail.send(msg)
    except Exception as e:
        app.logger.error(f"Failed to send contact notification email: {str(e)}")Here's the Python code for the Email confirmation function in app.py:

def send_confirmation_email(email, order_id):
    subject = "Order Confirmation - AI WebDev Pro Book"
    body = f"""
    Dear Customer,

    Thank you for your order of the AI WebDev Pro Book!

    Your order ID is: {order_id}

    We'll process your order shortly and send you another email with shipping details.

    If you have any questions, please don't hesitate to contact us.

    Best regards,
    The AI WebDev Pro Team
    """

    msg = Message(subject=subject,
                  sender=app.config['MAIL_DEFAULT_SENDER'],
                  recipients=[email],
                  body=body)

    try:
        mail.send(msg)
    except Exception as e:
        app.logger.error(f"Failed to send email: {str(e)}")# Database connection and management

# Import necessary modules
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Define Order model
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100), nullable=False)
    customer_email = db.Column(db.String(120), nullable=False)
    order_date = db.Column(db.DateTime, default=datetime.utcnow)
    payment_status = db.Column(db.String(20), default='Pending')

    def __repr__(self):
        return f'<Order {self.id}>'

# Define Contact model
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)
    submission_date = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Contact {self.id}>'

# Database initialization function
def init_db():
    with app.app_context():
        db.create_all()

# Call init_db() to create tables
init_db()

# Function to add a new order
def add_order(customer_name, customer_email):
    new_order = Order(customer_name=customer_name, customer_email=customer_email)
    db.session.add(new_order)
    db.session.commit()
    return new_order

# Function to add a new contact submission
def add_contact(name, email, message):
    new_contact = Contact(name=name, email=email, message=message)
    db.session.add(new_contact)
    db.session.commit()
    return new_contact

# Function to get all orders
def get_all_orders():
    return Order.query.all()

# Function to get all contact submissions
def get_all_contacts():
    return Contact.query.all()

# Function to get an order by ID
def get_order_by_id(order_id):
    return Order.query.get(order_id)

# Function to update order payment status
def update_order_payment_status(order_id, status):
    order = Order.query.get(order_id)
    if order:
        order.payment_status = status
        db.session.commit()
        return True
    return False

# Function to delete an order
def delete_order(order_id):
    order = Order.query.get(order_id)
    if order:
        db.session.delete(order)
        db.session.commit()
        return True
    return False

# Function to delete a contact submission
def delete_contact(contact_id):
    contact = Contact.query.get(contact_id)
    if contact:
        db.session.delete(contact)
        db.session.commit()
        return True
    return False