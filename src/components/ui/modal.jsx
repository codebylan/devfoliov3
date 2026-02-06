'use client';

import { X } from 'lucide-react';
import { useEffect, useId, useRef } from 'react';

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const getFocusableElements = (root) => {
  if (!root) return [];
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');

  return Array.from(root.querySelectorAll(selectors)).filter(
    (el) => el instanceof HTMLElement && !el.hasAttribute('disabled')
  );
};

const Modal = ({ isOpen, onClose, children, title, ariaLabel }) => {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const titleId = useId();
  const contentId = useId();

  const accessibleTitle =
    typeof title === 'string' && title.trim().length > 0
      ? title
      : ariaLabel || 'Fenêtre de dialogue';

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';

    const focusInitial = () => {
      const closeBtn = closeButtonRef.current;
      if (closeBtn instanceof HTMLElement) {
        closeBtn.focus();
        return;
      }
      const focusables = getFocusableElements(dialogRef.current);
      if (focusables[0]) focusables[0].focus();
    };

    const focusTimer = window.setTimeout(focusInitial, 0);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        const active = document.activeElement;
        const isFormControl =
          active &&
          (active.tagName === 'INPUT' ||
            active.tagName === 'TEXTAREA' ||
            active.tagName === 'SELECT');
        if (isFormControl) {
          active.blur();
          return;
        }
        e.preventDefault();
        onCloseRef.current();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusables = getFocusableElements(dialogRef.current);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
        return;
      }

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';

      const prev = previouslyFocusedRef.current;
      if (prev instanceof HTMLElement) prev.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay: on touch devices, do not close on backdrop tap — viewport resize when keyboard opens causes spurious overlay "clicks". Close only via X or Escape. */}
      <div
        className="absolute inset-0 z-0 bg-black/80 backdrop-blur-sm"
        onClick={(e) => {
          if (isTouchDevice()) return;
          if (e.target !== e.currentTarget) return;
          const active = document.activeElement;
          const isFormControl =
            active &&
            (active.tagName === 'INPUT' ||
              active.tagName === 'TEXTAREA' ||
              active.tagName === 'SELECT');
          if (isFormControl) return;
          onClose();
        }}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={contentId}
        className="relative z-10 bg-[#1a1a1a] border border-accent/20 rounded-sm w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          {typeof title === 'string' && title.trim().length > 0 ? (
            <h2 id={titleId} className="text-2xl italic text-accent">
              {title}
            </h2>
          ) : (
            <h2 id={titleId} className="sr-only">
              {accessibleTitle}
            </h2>
          )}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-white/5 transition-colors"
            aria-label="Fermer"
          >
            <X size={20} className="text-white/60" />
          </button>
        </div>

        {/* Content */}
        <div id={contentId} className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
