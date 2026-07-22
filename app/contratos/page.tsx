import { prisma } from '@/lib/prisma'
import { ContratoCard } from '@/components/ContratoCard'

export const dynamic = 'force-dynamic'

async function getContratos() {
  return prisma.contrato.findMany({
    orderBy: { fim: 'asc' },
    include: { marcos: true, entregas: true },
  })
}

export default async function ContratosPage() {
  const contratos = await getContratos()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">Contratos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contratos.map((c) => (
          <ContratoCard key={c.id} contrato={c} />
        ))}
      </div>
    </div>
  )
}