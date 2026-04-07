import { ArrowRight, MessageCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './button';
import WhatsAppLink from './whatsapp-link';

const variantClasses = {
  primary: 'bg-accent text-black font-semibold hover:bg-accent/90 transition-colors',
  secondary: 'bg-transparent border border-white/10 text-white/50',
};

const sizeClasses = {
  default: 'px-6 py-5 text-sm',
  lg: 'px-10 py-6 text-base',
};

/**
 * WhatsAppCTA — bouton lien WhatsApp standardisé.
 *
 * @param {string}  label      - Texte du bouton. Défaut : "Discutons sur WhatsApp"
 * @param {'primary'|'secondary'} variant - Style du bouton
 * @param {'default'|'lg'}     size      - Taille du bouton
 * @param {boolean} showIcon   - Affiche l'icône MessageCircle en tête
 * @param {boolean} showArrow  - Affiche ArrowRight animé en queue (ex. section CTA)
 * @param {string}  className  - Classes additionnelles sur le Button
 */
export default function WhatsAppCTA({
  label = 'Discutons sur WhatsApp',
  variant = 'primary',
  size = 'default',
  showIcon = true,
  showArrow = false,
  className,
  ...linkProps
}) {
  return (
    <WhatsAppLink {...linkProps}>
      <Button
        asChild
        className={cn(
          'group cursor-pointer',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
      >
        <span className="flex items-center gap-2">
          {showIcon && <MessageCircle size={16} />}
          {label}
          {showArrow && (
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          )}
        </span>
      </Button>
    </WhatsAppLink>
  );
}
