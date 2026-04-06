'use client';

import { useRef, useState } from 'react';
import { submitAuditRequest } from '../../actions/audit';
import { FadeIn } from '../motion/FadeIn';
import { Button } from '../ui/button';

const SECTORS = [
  { value: '', label: 'Votre secteur d'activité' },
  { value: 'institut', label: 'Institut / Salon' },
  { value: 'sante', label: 'Cabinet de santé' },
  { value: 'restaurant', label: 'Restaurant / Commerce' },
  { value: 'consultant', label: 'Consultant / Coach' },
  { value: 'autre', label: 'Autre' },
];

const AuditForm = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(formRef.current);

    const result = await submitAuditRequest({
      firstName: formData.get('firstName'),
      email: formData.get('email'),
      siteUrl: formData.get('siteUrl'),
      sector: formData.get('sector'),
    });

    if (result.success) {
      setStatus('success');
      formRef.current?.reset();
    } else {
      setStatus('error');
      setErrorMessage(result.error ?? 'Une erreur est survenue. Réessayez.');
    }
  };

  return (
    <section id="audit">
      <FadeIn className="max-w-2xl">
        <p className="text-accent text-xs uppercase tracking-[0.2em] mb-4">
          Audit gratuit
        </p>
        <h2 className="text-4xl sm:text-5xl italic leading-[0.95] mb-4">
          Votre site mérite{' '}
          <span className="text-accent">mieux.</span>
        </h2>
        <p className="text-white/50 mb-10">
          Recevez une analyse personnalisée de votre site en 48h : performance,
          SEO, points d'amélioration concrets. Gratuit, sans engagement.
        </p>

        {status === 'success' ? (
          <div className="border border-emerald-500/30 bg-emerald-500/5 p-6 rounded-sm text-emerald-400">
            <p className="font-medium">Demande reçue !</p>
            <p className="text-sm mt-1 text-emerald-400/70">
              Je vous envoie votre audit sous 48h par email.
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="audit-firstName"
                  className="block text-xs text-white/40 uppercase tracking-widest mb-2"
                >
                  Prénom <span className="text-accent">*</span>
                </label>
                <input
                  id="audit-firstName"
                  name="firstName"
                  type="text"
                  required
                  placeholder="Sophie"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 px-4 py-3 text-sm focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="audit-email"
                  className="block text-xs text-white/40 uppercase tracking-widest mb-2"
                >
                  Email <span className="text-accent">*</span>
                </label>
                <input
                  id="audit-email"
                  name="email"
                  type="email"
                  required
                  placeholder="sophie@monentreprise.fr"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 px-4 py-3 text-sm focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="audit-siteUrl"
                className="block text-xs text-white/40 uppercase tracking-widest mb-2"
              >
                URL de votre site actuel{' '}
                <span className="text-white/20">(optionnel)</span>
              </label>
              <input
                id="audit-siteUrl"
                name="siteUrl"
                type="url"
                placeholder="https://monentreprise.fr"
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 px-4 py-3 text-sm focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="audit-sector"
                className="block text-xs text-white/40 uppercase tracking-widest mb-2"
              >
                Secteur d'activité <span className="text-accent">*</span>
              </label>
              <select
                id="audit-sector"
                name="sector"
                required
                defaultValue=""
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-accent/50 transition-colors appearance-none"
              >
                {SECTORS.map((s) => (
                  <option
                    key={s.value}
                    value={s.value}
                    disabled={s.value === ''}
                    className="bg-[#0D0D0D]"
                  >
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-sm">{errorMessage}</p>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                disabled={status === 'loading'}
                className="bg-accent text-black font-semibold cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Envoi en cours…' : 'Recevoir mon audit gratuit'}
              </Button>
              <p className="text-white/25 text-xs mt-3">
                Audit envoyé sous 48h par email. Gratuit, sans engagement.
              </p>
            </div>
          </form>
        )}
      </FadeIn>
    </section>
  );
};

export default AuditForm;
