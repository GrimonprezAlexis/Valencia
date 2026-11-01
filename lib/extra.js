// Conseils du jour, soirées, infos pratiques (à éditer ici)

export const ADVICE = {
  ven: "Journée dense mais tout se fait à pied autour du Palais royal. La basilique ferme à 18:30 et ne paie qu'en espèces (6 €). Soyez devant le Palais vers 18:00 pour le coucher du soleil.",
  sam: "Churros au réveil, shopping, Tapa Tapa. Pour le RIU 360º, arrivez vers 17:15 (file possible). Club : pas avant 1:30, préventes achetées et tenue très soignée.",
  dim: "La location de barques au Retiro ouvre à 10:00. Chez Ojalá, demandez le sous-sol dans le sable. Coucher de soleil au Círculo vers 18:00.",
  lun: "Le 9 novembre est férié à Madrid (Almudena) : rues calmes. Vol à 15:55 : matinée libre pour les derniers churros, check-out avant 11:00.",
};

// Ce qu'il faut faire maintenant (à J-5)
export const DEADLINES = [
  { icon: "🎂", title: "Dîner d'anniversaire : réserver aujourd'hui", text: "Bestial, Brutal Bar, Victoria ou Circolo Popolare : le samedi soir part vite. Préciser « es su cumpleaños »." },
  { icon: "🪩", title: "Club : acheter les préventes", text: "Gabana, Kapital, Lula ou Ištar : entrée avec boisson sur FourVenues ou Xceed. Vandido écarté (2,7 sur Google, nombreux refus à l'entrée)." },
  { icon: "🏠", title: "Prévenir l'hôte", text: "Indiquer une arrivée vers 15:30 vendredi et demander s'il peut garder les valises lundi jusqu'à 13:00." },
  { icon: "💶", title: "Prévoir des espèces", text: "La basilique Saint-François-le-Grand (6 €) n'accepte souvent que le liquide." },
  { icon: "🏰", title: "Palais royal gratuit : pas pour vous", text: "La gratuité UE est du lundi au jeudi 16:00–18:00. Vous êtes là du vendredi au lundi midi : visite à 14 € ou extérieurs gratuits." },
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
    { icon: "🚕", title: "Se déplacer", items: ["Logement ↔ centre : métro ligne 1 depuis Portazgo, direct jusqu'à Sol et Gran Vía (≈ 15–20 min). Ticket 10 trajets ≈ 15 €.", "Le métro ferme vers 1:30 : ensuite taxi, Uber, Cabify ou Bolt (≈ 15–20 € jusqu'à Vallecas).", "Aéroport ↔ logement en taxi : au compteur ≈ 25–30 € (le forfait 33 € vaut seulement pour le centre)."] },
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
