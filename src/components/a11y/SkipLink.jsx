'use client';

export default function SkipLink({ targetId = 'main' }) {
  const href = `#${targetId}`;

  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-accent focus:text-black focus:px-4 focus:py-2 focus:rounded-sm focus:font-medium"
      onClick={() => {
        // Ensure focus moves to the main container for SR + keyboard users
        window.setTimeout(() => {
          const target = document.getElementById(targetId);
          if (target && 'focus' in target) target.focus();
        }, 0);
      }}
    >
      Aller au contenu
    </a>
  );
}
