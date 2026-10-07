import { Resend } from 'resend'

let client

// RESEND_API_KEY comes from .env only (backend); the client is created on first use, after dotenv has loaded
const getClient = () => {
  if (!client) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY must be set in .env')
    }

    client = new Resend(process.env.RESEND_API_KEY)
  }

  return client
}

const resendFrom = () => process.env.CONTACT_EMAIL_FROM
const resendTo = () => process.env.CONTACT_EMAIL_TO

// Sends one email through Resend. Resend reports failures in `error` instead of throwing, so it is rethrown here
// `to` defaults to CONTACT_EMAIL_TO; the admin password-reset email passes the admin's own address
export const sendWithResend = async ({ to, subject, text, replyTo, attachments }) => {
  if (!resendFrom() || !(to || resendTo())) {
    throw new Error('CONTACT_EMAIL_FROM and CONTACT_EMAIL_TO must be set in .env')
  }

  const { data, error } = await getClient().emails.send({
    from: resendFrom(),
    to: to || resendTo(),
    subject,
    text,
    ...(replyTo ? { replyTo } : {}),
    ...(attachments?.length ? { attachments } : {}),
  })

  if (error) {
    const failure = new Error(`Resend rejected the email: ${error.name || 'error'} - ${error.message}`)
    failure.resend = error
    throw failure
  }

  return data
}
