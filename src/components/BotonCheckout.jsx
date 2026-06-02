// TODO: migrar a Stripe Checkout cuando crezca el volumen
//
// Este componente aísla toda la lógica de "checkout". Hoy construye un pedido
// por WhatsApp; el día que se integre una pasarela de pago real, solo hay que
// cambiar el interior de este componente (no las cards ni el drawer).
import { MessageCircle } from 'lucide-react'
import { whatsappLinkPedido } from '../data/productos'

/**
 * @param {{ producto: object, cantidad: number }[]} items
 */
export default function BotonCheckout({ items = [], className = '' }) {
  const vacio = items.length === 0

  return (
    <a
      href={vacio ? undefined : whatsappLinkPedido(items)}
      target="_blank"
      rel="noopener noreferrer"
      aria-disabled={vacio}
      onClick={(e) => {
        if (vacio) e.preventDefault()
      }}
      className={
        'inline-flex items-center justify-center gap-2 min-h-[44px] w-full rounded-full bg-oliva text-crema-clara px-6 py-3.5 text-[14px] font-medium hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oliva focus-visible:ring-offset-2 transition-colors ' +
        (vacio ? 'opacity-40 cursor-not-allowed ' : '') +
        className
      }
    >
      <MessageCircle size={18} />
      Pedir por WhatsApp
    </a>
  )
}
