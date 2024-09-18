@app.route('/order', methods=['POST'])
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
        app.logger.error(f"Failed to send contact notification email: {str(e)}")