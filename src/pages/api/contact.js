const MAX = {
  name: 120,
  phone: 40,
  email: 254,
  subject: 200,
  message: 2000,
}

function trimString(value, maxLength) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

function isValidEmail(email) {
  if (!email) return true
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function buildTelegramText({ name, phone, email, subject, message }) {
  return [
    'Portfolio',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    email ? `Email: ${email}` : null,
    `Subject: ${subject}`,
    '',
    'Message:',
    message,
  ]
    .filter(Boolean)
    .join('\n')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) {
    return res.status(500).json({
      success: false,
      message: 'Contact service is not configured. Please try again later.',
    })
  }

  const name = trimString(req.body?.name, MAX.name)
  const phone = trimString(req.body?.phone, MAX.phone)
  const email = trimString(req.body?.email, MAX.email)
  const subject = trimString(req.body?.subject, MAX.subject)
  const message = trimString(req.body?.message, MAX.message)

  if (!name || !phone || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all required fields.',
    })
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid email address.',
    })
  }

  const text = buildTelegramText({ name, phone, email, subject, message })

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    })

    const data = await response.json()

    if (!response.ok || !data.ok) {
      return res.status(502).json({
        success: false,
        message: 'Could not deliver your message. Please try again later.',
      })
    }

    return res.status(200).json({ success: true })
  } catch {
    return res.status(502).json({
      success: false,
      message: 'Could not deliver your message. Please try again later.',
    })
  }
}

export const config = { api: { bodyParser: { sizeLimit: '32kb' } } }
