import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosError } from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      console.error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set')
      return res.status(500).json({ success: false, error: 'Server configuration error' })
    }

    const text = `New feedback:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`

    try {
      const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: text
      })

      if (response.data.ok) {
        return res.status(200).json({ success: true })
      } else {
        console.error('Telegram API returned false for "ok":', response.data)
        return res.status(500).json({ success: false, error: 'Telegram API error' })
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        console.error('Error sending message to Telegram:', axiosError.response?.data)
        return res.status(500).json({ 
          success: false, 
          error: 'Failed to send message',
          details: axiosError.response?.data
        })
      } else {
        console.error('Unexpected error:', error)
        return res.status(500).json({ success: false, error: 'Unexpected error occurred' })
      }
    }
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}