import nodemailer from 'nodemailer'

const DEFAULT_MAIL_TO = 'career@sahajanandinfotech.com'

let transporter

/* SMTP credentials come from .env only; the transporter is created on first use (after dotenv has loaded) */
export const getTransporter = () => {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT)

    if (!process.env.SMTP_HOST || !port || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error('SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS must be set in .env')
    }

    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  return transporter
}

// Sender and recipient shared by every email the site sends (contact form, job applications)
export const getMailFrom = () => process.env.SMTP_FROM || process.env.SMTP_USER

export const getMailTo = () => process.env.CONTACT_EMAIL_TO || DEFAULT_MAIL_TO
