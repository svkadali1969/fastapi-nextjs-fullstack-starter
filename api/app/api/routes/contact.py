import os
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
load_dotenv()

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/contact", tags=["contact"])

class ContactForm(BaseModel):
    name: str
    email: str = ""
    org: str = ""
    role: str = ""
    interest: str = ""
    message: str = ""
    form_type: str = "general"


def send_email(subject: str, body: str, to_email: str):
    mail_username = os.getenv("MAIL_USERNAME")
    mail_password = os.getenv("MAIL_PASSWORD")
    mail_from = os.getenv("MAIL_FROM")

    if not all([mail_username, mail_password, mail_from]):
        raise HTTPException(status_code=500, detail="Email configuration error")

    import email.message
    msg = email.message.EmailMessage()
    msg["Subject"] = subject
    msg["From"] = mail_from
    msg["To"] = to_email
    msg.set_content(body)


    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.ehlo()
        server.starttls()
        server.login(mail_username, mail_password)
        server.send_message(msg)

@router.post("/submit")

async def submit_contact(form: ContactForm):
    try:
        # Route to right email based on form type
        to_emails = {
            "education": os.getenv("MAIL_TO", "admin@theveritaai.com"),
            "research": os.getenv("MAIL_TO", "admin@theveritaai.com"),
            "partner": os.getenv("MAIL_TO", "admin@theveritaai.com"),
            "fellows": os.getenv("MAIL_TO", "admin@theveritaai.com"),
            "general": os.getenv("MAIL_TO", "admin@theveritaai.com"),
        }

        to_email = to_emails.get(form.form_type, os.getenv("MAIL_TO"))

        subject = f"New {form.form_type.title()} Enquiry - {form.name} ({form.email})"
        body = f"""
            New enquiry from The Verita website

            Form type: {form.form_type.upper()}
            Name: {form.name}
            Email: {form.email}
            Organization: {form.org}
            Role: {form.role}
            Interest: {form.interest}

            Message:
            {form.message}
                """.strip()
        send_email(subject, body, to_email)
        
        return {"status": "success", "message": "Enquiry received"}

    except Exception as e:
            logger.error("Email send failed: %s", str(e))
            raise HTTPException(status_code=500, detail=str(e))


