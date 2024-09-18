Here's the Python code for the Email confirmation function in app.py:

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