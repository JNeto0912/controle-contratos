import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const contratos = await prisma.contrato.findMany({
    orderBy: { fim: 'asc' },
    include: { marcos: true, entregas: true },
  })
  return NextResponse.json(contratos)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const contrato = await prisma.contrato.create({ data: body })
  return NextResponse.json(contrato, { status: 201 })
}