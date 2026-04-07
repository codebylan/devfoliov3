import { MessageCircle } from 'lucide-react';
import WhatsAppLink from './whatsapp-link';

/**
 * Floating WhatsApp CTA — monté dans le layout, présent sur toutes les pages.
 * Mobile : toujours visible, 56×56 tap target.
 * Desktop : discret au repos (opacity-50), plein au hover/focus.
 * z-30 → sous le menu mobile (z-40) quand il est ouvert.
 */
export default function WhatsAppFloatingButton() {
  return (
    <WhatsAppLink
      className="fixed bottom-6 right-6 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-accent text-black shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-200 lg:opacity-50 lg:hover:opacity-100 lg:hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#262626] focus-visible:opacity-100"
      aria-label="Contacter Dylan sur WhatsApp — ouvre l'application avec un message pré-rempli"
    >
      <MessageCircle size={24} strokeWidth={2} aria-hidden="true" />
    </WhatsAppLink>
  );
}
