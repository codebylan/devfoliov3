const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '33765691039';

// ─── Message builder ─────────────────────────────────────────────────────────

const PROJECT_MESSAGES = {
  vitrine:
    "Bonjour Dylan, j'ai consulté votre offre Vitrine Pro et je souhaite créer un site vitrine pour mon activité. Seriez-vous disponible ?",
  business:
    "Bonjour Dylan, j'ai consulté votre offre Site Business et je souhaite attirer plus de clients en ligne. Pouvons-nous en discuter ?",
  custom:
    "Bonjour Dylan, j'ai consulté votre offre Sur Mesure. J'ai un projet avec des besoins spécifiques. Seriez-vous disponible pour en discuter ?",
  ecommerce:
    "Bonjour Dylan, j'ai vu votre portfolio. Je souhaite lancer une boutique en ligne. Pouvons-nous en discuter ?",
  refonte:
    "Bonjour Dylan, j'ai vu votre portfolio. Mon site actuel a besoin d'une refonte. Seriez-vous disponible ?",
  seo:
    "Bonjour Dylan, j'ai vu votre portfolio. Je cherche à améliorer mon référencement Google. Seriez-vous disponible ?",
};

const SOURCE_MESSAGES = {
  prices:
    "Bonjour Dylan, j'ai consulté vos tarifs et je souhaite discuter de mon projet. Seriez-vous disponible ?",
};

const DEFAULT_MESSAGE =
  "Bonjour Dylan, j'ai vu votre portfolio et je souhaite discuter d'un projet web. Seriez-vous disponible ?";

/**
 * Returns a plain (non-encoded) pre-filled message based on context.
 * @param {{ projectType?: string, source?: string }} options
 */
export function buildWhatsAppMessage({ projectType, source } = {}) {
  if (projectType && PROJECT_MESSAGES[projectType]) {
    return PROJECT_MESSAGES[projectType];
  }
  if (source && SOURCE_MESSAGES[source]) {
    return SOURCE_MESSAGES[source];
  }
  return DEFAULT_MESSAGE;
}

/**
 * Returns a full wa.me URL with encoded pre-filled message.
 * @param {{ projectType?: string, source?: string }} options
 */
export function buildWhatsAppHref(options = {}) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(options))}`;
}

// Static default — used when no context is needed (backward compat)
export const WHATSAPP_HREF = buildWhatsAppHref();

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * @param {{ projectType?: string, source?: string, className?: string, onClick?: Function, children: React.ReactNode }} props
 */
export default function WhatsAppLink({
  children,
  className,
  projectType,
  source,
  onClick,
  ...props
}) {
  const href =
    projectType || source
      ? buildWhatsAppHref({ projectType, source })
      : WHATSAPP_HREF;

  return (
    <a
      href={href}
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
