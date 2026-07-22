import { prisma } from './prisma'
import { differenceInDays } from 'date-fns'

export async function gerarAlertas() {
  const contratos = await prisma.contrato.findMany({ include: { entregas: true } })
  const hoje = new Date()

  for (const contrato of contratos) {
    const diasParaFim = differenceInDays(new Date(contrato.fim), hoje)

    if (diasParaFim <= 30 && diasParaFim > 15) {
      await criarAlerta(contrato.id, `Contrato vence em ${diasParaFim} dias`, 'ATENCAO')
    } else if (diasParaFim <= 15 && diasParaFim > 7) {
      await criarAlerta(contrato.id, `Contrato vence em ${diasParaFim} dias`, 'ATENCAO')
    } else if (diasParaFim <= 7 && diasParaFim >= 0) {
      await criarAlerta(contrato.id, `Contrato vence em ${diasParaFim} dias`, 'CRITICO')
    }

    for (const entrega of contrato.entregas) {
      const atraso = differenceInDays(hoje, new Date(entrega.prazo))
      if (atraso > 0 && entrega.status !== 'ENTREGUE') {
        await criarAlerta(contrato.id, `Entrega "${entrega.descricao}" atrasada em ${atraso} dias`, 'CRITICO')
      }
    }
  }
}

async function criarAlerta(contratoId: string, mensagem: string, criticidade: 'NORMAL' | 'ATENCAO' | 'CRITICO') {
  const existente = await prisma.alerta.findFirst({ where: { contratoId, mensagem, lido: false } })
  if (!existente) {
    await prisma.alerta.create({ data: { contratoId, mensagem, criticidade } })
  }
}