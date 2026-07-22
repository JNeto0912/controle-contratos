import Link from 'next/link'

const statusColors: Record<string, string> = {
  EM_PROPOSTA: 'bg-gray-200 text-gray-700',
  GANHOU: 'bg-blue-100 text-blue-700',
  EM_EXECUCAO: 'bg-green-100 text-green-700',
  ENCERRADO: 'bg-gray-300 text-gray-600',
  RENOVACAO: 'bg-yellow-100 text-yellow-700',
}

export function ContratoCard({ contrato }: { contrato: any }) {
  return (
    <Link href={`/contratos/${contrato.id}`}>
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
        <h3 className="font-semibold text-blue-700">{contrato.orgao} - {contrato.objeto}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {new Date(contrato.inicio).toLocaleDateString()} a {new Date(contrato.fim).toLocaleDateString()}
        </p>
        <p className="text-sm font-medium mt-1">
          R$ {Number(contrato.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
        <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${statusColors[contrato.status]}`}>
          {contrato.status.replace('_', ' ')}
        </span>
      </div>
    </Link>
  )
}