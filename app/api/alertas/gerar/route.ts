import { NextResponse } from 'next/server'
import { gerarAlertas } from '@/lib/alertas'

export async function GET() {
  await gerarAlertas()
  return NextResponse.json({ ok: true })
}