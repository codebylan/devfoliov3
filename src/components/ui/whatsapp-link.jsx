const WHATSAPP_NUMBER = '33765691039'; // ⚠️ À remplacer par le vrai numéro avant déploiement
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Bonjour Dylan, j'ai vu votre portfolio et je souhaite discuter d'un projet web. Seriez-vous disponible ?"
);

export const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function WhatsAppLink({ children, className }) {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label="Contacter sur WhatsApp"
    >
      {children}
    </a>
  );
}
