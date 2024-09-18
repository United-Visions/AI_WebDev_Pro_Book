# Database connection and management

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