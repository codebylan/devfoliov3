'use client';

import { useState } from 'react';
import { getAvailableSlots } from '../../actions/availability';
import { createBooking } from '../../actions/booking';

export default function TestBookingPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+33612345678',
    company: 'https://example.com',
    projectType: 'saas',
    meetingType: 'phone',
  });

  const testCreateBooking = async () => {
    setLoading(true);
    try {
      // 1. Récupérer un créneau disponible
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 2); // +2 = après-demain pour éviter les conflits
      const dateStr = tomorrow.toISOString().split('T')[0];

      const slotsResponse = await getAvailableSlots(dateStr, 'Europe/Paris');

      if (slotsResponse.error || !slotsResponse.slots?.length) {
        setResult({
          error: 'Aucun créneau disponible demain. Essayez un autre jour.',
          availableSlots: slotsResponse.slots || [],
        });
        return;
      }

      // 2. Utiliser le premier créneau disponible
      const firstSlot = slotsResponse.slots[0]; // Ex: "10:00"
      const [hours, minutes] = firstSlot.split(':');
      const bookingDate = new Date(dateStr);
      bookingDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      // 3. Créer le booking avec les données du formulaire
      const result = await createBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || '',
        projectType: formData.projectType,
        meetingType: formData.meetingType,
        bookingStart: bookingDate.toISOString(),
        timezone: 'Europe/Paris',
        turnstileToken: 'test-token-bypass', // Token de test (à remplacer par le vrai widget)
      });

      setResult({
        ...result,
        usedSlot: firstSlot,
        bookingDate: dateStr,
        message: result.success
          ? '✅ Booking créé avec succès ! Vérifiez votre email et les logs Supabase.'
          : '❌ Erreur lors de la création',
      });
    } finally {
      setLoading(false);
    }
  };

  const testGetSlots = async () => {
    setLoading(true);
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 2); // +2 = après-demain
      const dateStr = tomorrow.toISOString().split('T')[0];

      const result = await getAvailableSlots(dateStr, 'Europe/Paris');
      setResult({ ...result, date: dateStr });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">🧪 Test Booking System</h1>
        <p className="text-gray-400 mb-8">
          Test de création de bookings et d'envoi d'emails
        </p>

        {/* Formulaire de test */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            📝 Données de test (modifiables)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Nom</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Site web
              </label>
              <input
                type="url"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Type de projet
              </label>
              <select
                value={formData.projectType}
                onChange={(e) =>
                  setFormData({ ...formData, projectType: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              >
                <option value="saas">SaaS</option>
                <option value="ecommerce">E-commerce</option>
                <option value="vitrine">Site Vitrine</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Type de rendez-vous
              </label>
              <select
                value={formData.meetingType}
                onChange={(e) =>
                  setFormData({ ...formData, meetingType: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              >
                <option value="phone">📞 Téléphone</option>
                <option value="meet">📹 Google Meet</option>
              </select>
            </div>
          </div>
        </div>

        {/* Boutons de test */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={testGetSlots}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? '⏳ Chargement...' : '🔵 Test Get Slots'}
          </button>

          <button
            onClick={testCreateBooking}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? '⏳ Création...' : '🟢 Test Create Booking + Email'}
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-2">📖 Instructions</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>
              🔵 <strong>Test Get Slots</strong> : Affiche les créneaux
              disponibles demain
            </li>
            <li>
              🟢 <strong>Test Create Booking</strong> : Crée un booking et
              déclenche l'envoi d'email
            </li>
            <li>
              📧 <strong>Vérifier l'email</strong> : Consultez l'email
              configuré ci-dessus
            </li>
            <li>
              🔍 <strong>Logs Supabase</strong> : Allez dans Edge Functions →
              Logs pour voir l'exécution
            </li>
          </ul>
        </div>

        {/* Résultat */}
        {result && (
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">📊 Résultat</h3>
            <pre className="bg-gray-950 p-4 rounded text-green-400 text-sm overflow-auto max-h-96">
              {JSON.stringify(result, null, 2)}
            </pre>

            {result.success && (
              <div className="mt-4 p-4 bg-green-900/20 border border-green-700 rounded">
                <p className="text-green-400 font-semibold">
                  ✅ Booking créé avec succès !
                </p>
                <p className="text-sm text-gray-300 mt-2">
                  <strong>Prochaines étapes :</strong>
                </p>
                <ul className="text-sm text-gray-300 mt-1 space-y-1">
                  <li>
                    1. Vérifiez votre boîte email :{' '}
                    <span className="text-blue-400">{formData.email}</span>
                  </li>
                  <li>
                    2. Consultez les logs Supabase : Dashboard → Edge Functions
                    → send-booking-email → Logs
                  </li>
                  <li>
                    3. Vérifiez la table <code>email_logs</code> dans Supabase
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
