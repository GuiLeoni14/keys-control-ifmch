import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { google } from 'googleapis'

export async function POST(request: Request) {
  try {
    const { labName } = await request.json()
    const session = await auth()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { name, email } = session.user
    const action = `🔑 ${name} retirou a chave do ${labName}`
    const timestamp = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    })

    const googleAuth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth: googleAuth })

    await sheets.spreadsheets.values.append({
      spreadsheetId: '12557zZniAG-YHbSAPUv4crNfveaDEEvuaFu1R3zPnfM',
      range: 'A:E', // Nome, E-mail, Laboratório, Ação, Data/Hora
      valueInputOption: 'RAW',
      requestBody: {
        values: [[name, email, labName, action, timestamp]],
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao salvar dados:', error)
    return NextResponse.json({ error: 'Erro ao salvar dados' }, { status: 500 })
  }
}
