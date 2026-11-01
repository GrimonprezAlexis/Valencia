// Conseils du jour, soirées, infos pratiques (à éditer ici)

export const ADVICE = {
  ven: "Le taxi depuis l'aéroport a un prix fixe de 33 €. À la Cava Baja, faites comme les locaux : un verre et une tapa par bar, puis on change.",
  sam: "Soyez sur l'Azotea del Círculo à 17:30 (coucher de soleil vers 18:00). En club, inutile d'arriver avant 1:30 : préventes achetées et tenue très soignée.",
  dim: "Grasse matinée méritée. Si vous êtes debout avant 11:00, le Rastro (marché aux puces, dimanche 9:00–15:00) est à 10 min en taxi de l'hôtel.",
  lun: "Le 9 novembre est férié à Madrid (Almudena) : rues calmes et taxi rapide. Enregistrement en ligne la veille.",
};

// Ce qu'il faut faire maintenant (à J-5)
export const DEADLINES = [
  { icon: "🎂", title: "Dîner d'anniversaire : réserver aujourd'hui", text: "Rosi La Loca, Barbara Ann ou Amazónico : complets des semaines à l'avance le samedi soir. Préciser « es su cumpleaños »." },
  { icon: "🪩", title: "Club : acheter les préventes", text: "Entrée avec boisson incluse sur FourVenues ou Xceed : le passage à l'entrée est bien plus fluide." },
  { icon: "⚠️", title: "Fortuny est fermé", text: "Le club du guide a fermé définitivement en mars 2026. Les 3 autres options restent valables." },
  { icon: "🗓️", title: "Lundi 9 férié", text: "Fête de l'Almudena : beaucoup de boutiques fermées, l'aéroport fonctionne normalement." },
];

// Conseils soirée de Sandra
export const NIGHT = [
  { icon: "👗", title: "Le dress code est roi", text: "« Chic » à Madrid veut dire vraiment soigné : tenues de soirée, accessoires élégants. Éviter le look sport ; les baskets blanches peuvent être refusées à Salamanca." },
  { icon: "🕑", title: "Horaires espagnols", text: "Dîner à 21:00, club pas avant 1:30–2:00, fermeture vers 6:00. Entre les deux : un verre dans un bar branché." },
  { icon: "🎟️", title: "Préventes", text: "« Entrada con copa » sur les sites officiels, FourVenues ou Xceed. Sur place, le prix est souvent plus élevé." },
  { icon: "📍", title: "Où sortir", text: "Pour un public de 30 ans et plus, viser Salamanca, Chamberí ou les dîners-spectacles qui deviennent des clubs (Barbara Ann)." },
];

export const INFOS = {
  emergency: [
    { label: "Urgences (tout)", num: "112", note: "Police, ambulance, pompiers · gratuit, répond en anglais" },
    { label: "Police nationale", num: "091", note: "Vol, perte de papiers" },
    { label: "Police municipale", num: "092", note: "Problème en ville" },
    { label: "Ambassade de Suisse · Madrid", num: "+34914363960", display: "+34 914 36 39 60", note: "Calle Núñez de Balboa 35A" },
    { label: "Helpline DFAE (24/7)", num: "+41800247365", display: "+41 800 24 7 365" },
      ],
  health: [
    { name: "Hospital Clínico San Carlos", detail: "Calle del Prof. Martín Lagos · urgences 24 h/24", q: "Hospital Clínico San Carlos Madrid" },
    { name: "Hospital Gregorio Marañón", detail: "Calle del Dr. Esquerdo 46 · grand hôpital public", q: "Hospital General Universitario Gregorio Marañón" },
  ],
  sections: [
    { icon: "💳", title: "Argent", items: ["Euro. La carte est acceptée partout, même pour un café.", "Une carte sans frais de change est idéale (Revolut, Neon…).", "Le pourboire n'est pas obligatoire : 5 à 10 % au restaurant si le service est top."] },
    { icon: "🕘", title: "Horaires espagnols", items: ["Déjeuner de 14:00 à 16:00, dîner de 21:00 à 23:00.", "Le vermouth du dimanche midi est une vraie tradition.", "Les clubs se remplissent vers 1:30 et ferment vers 6:00."] },
    { icon: "🚕", title: "Se déplacer", items: ["Aéroport ↔ centre en taxi : prix fixe de 33 €.", "En métro (ligne 8), le billet coûte ≈ 5 € avec le supplément aéroport.", "Uber, Cabify et Bolt fonctionnent bien. Le centre se fait à pied."] },
    { icon: "🌤️", title: "Météo de novembre", items: ["≈ 13 à 17 °C l'après-midi, ≈ 5 à 8 °C le soir.", "Prendre un manteau léger pour les rooftops, la plupart sont chauffés.", "Coucher du soleil vers 18:05."] },
    { icon: "🎒", title: "Sécurité", items: ["Attention aux pickpockets à Sol, sur la Gran Vía, dans le métro et au Rastro.", "Gardez le sac fermé devant vous et ne posez pas le téléphone sur la table en terrasse.", "La ville est très sûre, même la nuit."] },
    { icon: "🏥", title: "Santé", items: ["Prenez votre carte d'assurance maladie (valable dans l'UE).", "Une pharmacie se repère à sa croix verte ; une « farmacia de guardia » est ouverte la nuit.", "L'eau du robinet est très bonne à Madrid."] },
    { icon: "🔌", title: "Prises", items: ["Type F (230 V).", "Les prises suisses à 3 broches ne rentrent pas : prenez un adaptateur."] },
    { icon: "🥘", title: "À goûter", items: ["Jambon ibérique de bellota, croquetas, tortilla.", "Bocadillo de calamares sur la Plaza Mayor.", "Sangria blanche, cava et churros con chocolate."] },
  ],
  phrases: [
    { fr: "Une table pour deux", es: "Una mesa para dos, por favor" },
    { fr: "L'addition, s'il vous plaît", es: "La cuenta, por favor" },
    { fr: "C'est son anniversaire", es: "¡Es su cumpleaños!" },
    { fr: "Deux verres de cava", es: "Dos copas de cava" },
    { fr: "Une sangria blanche", es: "Una sangría blanca" },
    { fr: "On est sur la liste", es: "Estamos en la lista" },
    { fr: "Merci beaucoup", es: "Muchas gracias" },
  ],
};
