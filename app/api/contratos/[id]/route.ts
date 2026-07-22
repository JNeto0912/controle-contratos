import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const contrato = await prisma.contrato.findUnique({
    where: { id: params.id },
    include: { marcos: true, entregas: true, alertas: true },
  })
  if (!contrato) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })
  return NextResponse.json(contrato)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json()
  const contrato = await prisma.contrato.update({ where: { id: params.id }, data: body })
  return NextResponse.json(contrato)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.contrato.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}