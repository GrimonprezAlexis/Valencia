// Conseils du jour + page Infos (à éditer ici)

export const ADVICE = {
  ven: "Soyez sur le rooftop Luna à 17:30 : le soleil se couche vers 17:50. Pour les trajets, Uber et Cabify marchent très bien ; un taxi blanc avec une lumière verte est libre.",
  sam: "Le Mercado Central est fermé le dimanche : c'est aujourd'hui ou jamais. Crème solaire pour la plage, et réservez Censura en précisant « es mi cumpleaños ».",
  dim: "Dimanche : la plupart des boutiques sont fermées, mais les monuments municipaux (Torres de Serranos, Lonja) sont souvent gratuits. Les Torres ferment à 14:00.",
  lun: "Faites l'enregistrement easyJet en ligne la veille et gardez la carte d'embarquement dans l'app. Uber commandé pour 7:45, l'aéroport est à 20 min.",
};

export const INFOS = {
  emergency: [
    { label: "Urgences (tout)", num: "112", note: "Police, ambulance, pompiers · gratuit, répond en anglais" },
    { label: "Police nationale", num: "091", note: "Vol, perte de papiers" },
    { label: "Police locale", num: "092", note: "Problème en ville" },
    { label: "Ambassade de Suisse · Madrid", num: "+34914363960", display: "+34 914 36 39 60" },
    { label: "Consulat suisse · Barcelone", num: "+34934090650", display: "+34 934 09 06 50", note: "Compétent pour Valence" },
    { label: "Helpline DFAE (24/7)", num: "+41800247365", display: "+41 800 24 7 365" },
  ],
  health: [
    { name: "Hospital Clínico Universitario", detail: "Av. de Blasco Ibáñez 17 · urgences 24/7, le plus central", q: "Hospital Clínico Universitario Valencia" },
    { name: "Hospital La Fe", detail: "Av. de Fernando Abril Martorell 106 · grand hôpital", q: "Hospital Universitari i Politècnic La Fe" },
  ],
  sections: [
    { icon: "💳", title: "Argent", items: ["Euro. Carte acceptée presque partout, même pour un café.", "Carte sans frais de change idéale (Revolut, Neon…).", "Pourboire non obligatoire : 5–10 % au restaurant si le service est top."] },
    { icon: "🕘", title: "Horaires espagnols", items: ["Déjeuner 14:00–16:00, dîner 21:00–23:00.", "Beaucoup de boutiques ferment le dimanche.", "Les bars s'animent après minuit."] },
    { icon: "🚇", title: "Se déplacer", items: ["Aéroport → centre : métro L3/L5 (≈ 25 min, ≈ 5 €) ou Uber/taxi (≈ 20–25 €).", "Centre historique : tout à pied.", "Uber, Cabify et taxis (lumière verte = libre)."] },
    { icon: "🌤️", title: "Météo de novembre", items: ["≈ 18–22 °C l'après-midi, ≈ 10–13 °C le soir.", "Prévoir une petite veste pour les rooftops.", "Coucher du soleil vers 17:50."] },
    { icon: "🎒", title: "Sécurité", items: ["Attention aux pickpockets au Mercado Central, sur la plage et dans les foules.", "Sac fermé devant soi, téléphone pas sur la table en terrasse.", "Ville globalement très sûre, même le soir."] },
    { icon: "🏥", title: "Santé", items: ["Prendre la carte d'assurance maladie (valable dans l'UE).", "Pharmacie = croix verte ; « farmacia de guardia » ouverte la nuit.", "Eau du robinet potable, mais au goût chloré."] },
    { icon: "🔌", title: "Prises", items: ["Type F (230 V).", "Les prises suisses à 3 broches ne rentrent pas : prendre un adaptateur."] },
    { icon: "🥘", title: "À goûter", items: ["Paella valenciana (poulet, lapin, haricots) — plutôt le midi chez les locaux.", "Agua de Valencia : cocktail cava + orange.", "Horchata et fartons, esgarraet, all i pebre."] },
  ],
  phrases: [
    { fr: "Une table pour deux", es: "Una mesa para dos, por favor" },
    { fr: "L'addition, s'il vous plaît", es: "La cuenta, por favor" },
    { fr: "C'est mon anniversaire", es: "¡Es mi cumpleaños!" },
    { fr: "Deux verres de cava", es: "Dos copas de cava" },
    { fr: "Où se trouve… ?", es: "¿Dónde está…?" },
    { fr: "Merci beaucoup", es: "Muchas gracias" },
  ],
};
