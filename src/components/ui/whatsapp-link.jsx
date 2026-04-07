const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '33765691039';

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Bonjour Dylan, j'ai vu votre portfolio et je souhaite discuter d'un projet web. Seriez-vous disponible ?"
);

export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function WhatsAppLink({ children, className, onClick, ...props }) {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label="Nous contacter sur WhatsApp — ouvre WhatsApp avec un message pré-rempli"
      onClick={onClick}
      {...props}
    >
      {children}
    </a>
  );
}
