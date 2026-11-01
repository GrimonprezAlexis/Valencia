// Conseils du jour, soirées, infos pratiques (à éditer ici)

export const ADVICE = {
  ven: "Basilique : 6 € en espèces, ferme à 18:30.",
  sam: "Logement à 17:30 pour se préparer. Club pas avant 1:30.",
  dim: "Barques dès 10:00. Chez Ojalá : sous-sol dans le sable.",
  lun: "Jour férié. Check-out avant 11:00.",
};

// À faire avant de partir
export const DEADLINES = [
  { icon: "🎂", title: "Réserver le resto de samedi", text: "Dire « es su cumpleaños »." },
  { icon: "🪩", title: "Acheter la prévente du club", text: "FourVenues ou Xceed." },
  { icon: "🏠", title: "Écrire à l'hôte", text: "Arrivée 15:30 · valises lundi jusqu'à 13:00 ?" },
  { icon: "💶", title: "Prendre des espèces", text: "Pour la basilique." },
];

// Soirée
export const NIGHT = [
  { icon: "👗", title: "Tenue très chic", text: "Pas de look sport ni baskets." },
  { icon: "🕑", title: "Club vers 1:30", text: "Fermeture vers 6:00." },
];

export const INFOS = {
  emergency: [
    { label: "Urgences (tout)", num: "112", note: "Police, ambulance, pompiers" },
    { label: "Police nationale", num: "091", note: "Vol, perte de papiers" },
        { label: "Ambassade de Suisse · Madrid", num: "+34914363960", display: "+34 914 36 39 60" },
          ],
  health: [
    { name: "Hospital Clínico San Carlos", detail: "Calle del Prof. Martín Lagos · urgences 24 h/24", q: "Hospital Clínico San Carlos Madrid" },
    { name: "Hospital Gregorio Marañón", detail: "Calle del Dr. Esquerdo 46 · grand hôpital public", q: "Hospital General Universitario Gregorio Marañón" },
  ],
  sections: [
    { icon: "🚇", title: "Transports", items: ["Métro L1 Portazgo ↔ Sol : 15 min.", "Après 1:30 : taxi ou Uber ≈ 15–20 €.", "Aéroport ↔ logement : taxi ≈ 25–30 €."] },
    { icon: "🌤️", title: "Météo", items: ["≈ 15 °C le jour, ≈ 6 °C le soir.", "Prendre une veste pour les rooftops."] },
    { icon: "🎒", title: "Pickpockets", items: ["Sol, Gran Vía et métro : sac fermé devant soi."] },
    { icon: "💳", title: "Argent", items: ["Carte acceptée partout (sauf basilique).", "Pourboire : facultatif."] },
    { icon: "🔌", title: "Prises", items: ["Type F : adaptateur pour les prises suisses."] },
  ],
  phrases: [
    { fr: "Bonjour", es: "¡Hola!" },
    { fr: "Merci", es: "Gracias" },
    { fr: "Santé !", es: "¡Salud!" },
    { fr: "C'est combien ?", es: "¿Cuánto cuesta?" },
    { fr: "L'addition", es: "La cuenta, por favor" },
    { fr: "C'est son anniversaire", es: "¡Es su cumpleaños!" },
  ],
};
