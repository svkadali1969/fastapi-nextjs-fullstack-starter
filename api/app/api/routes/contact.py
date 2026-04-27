import os
import logging
import resend

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

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

@router.post("/submit")
async def submit_contact(form: ContactForm):
    try:
        resend.api_key = os.getenv("RESEND_API_KEY")

        if not resend.api_key:
            raise HTTPException(status_code=500, detail="Email configuration error")

        subject = f"New {form.form_type.title()} Enquiry - {form.name}"

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

        to_email = os.getenv("MAIL_TO", "admin@theveritaai.com")

        params = {
            "from": "The Verita <admin@theveritaai.com>",
            "to": [to_email],
            "subject": subject,
            "text": body,
        }

        resend.Emails.send(params)

        return {"status": "success", "message": "Enquiry received"}

    except Exception as e:
        logger.error("Email send failed: %s", str(e))
        raise HTTPException(status_code=500, detail=str(e))