// Conseils du jour, page Infos, comparatif Valence → Madrid (à éditer ici)

export const ADVICE = {
  ven: "Soyez sur l'Azotea del Círculo à 17:30 : le soleil se couche vers 18:05. Le taxi depuis l'aéroport a un prix fixe de 33 €, inutile de négocier.",
  sam: "Billets du Palais royal à prendre en ligne la veille. Ce soir chez Amazónico, après le dîner, descendez au Jungle Jazz Club : la fête se fait sur place.",
  dim: "Match NFL au Bernabéu aujourd'hui : évitez la Castellana et le métro ligne 10 en fin d'après-midi, prévoyez 10 min de marge en taxi. Le Rastro n'a lieu que le dimanche matin.",
  lun: "Le 9 novembre est férié à Madrid (Almudena) : rues calmes et taxi rapide. Faites l'enregistrement en ligne la veille.",
};

// Ce qu'il faut décider maintenant (à J-26)
export const DEADLINES = [
  { icon: "🏨", title: "Hôtel : réserver ce soir", text: "Le dimanche 8, les Falcons et les Bengals jouent un match NFL au Bernabéu, et un concert de Duran Duran a lieu le vendredi. Les prix ont doublé et plusieurs hôtels du centre sont déjà complets (Main Street, Moderno)." },
  { icon: "✈️", title: "Vols : cette semaine", text: "Il y a des vols directs tous les jours (easyJet, Iberia/Swiss, Air Europa). Plus on attend, plus c'est cher." },
  { icon: "🍸", title: "Amazónico : réserver tout de suite", text: "Le samedi soir est la soirée la plus demandée. Précisez qu'il s'agit d'un anniversaire." },
  { icon: "🗓️", title: "Lundi 9 férié", text: "C'est la fête de l'Almudena à Madrid : beaucoup de boutiques sont fermées, mais l'aéroport fonctionne normalement." },
];

export const COMPARE = [
  { theme: "Rooftop coucher de soleil", valence: "Luna de Valencia", madrid: "Azotea del Círculo", note: "La vue la plus iconique de Madrid" },
  { theme: "Rooftop DJ / lounge", valence: "The Coin", madrid: "Picalagartos · Ginkgo", note: "Deux rooftops au lieu d'un" },
  { theme: "Paella du soir", valence: "Los Gómez", madrid: "La Barraca", note: "Paella valencienne depuis 1935" },
  { theme: "Bar à cocktails", valence: "Botanista", madrid: "Salmon Guru", note: "Classé parmi les 50 meilleurs bars du monde" },
  { theme: "Brunch d'anniversaire", valence: "Coco Social House", madrid: "Loca Obsesión", note: "Noté 4,9" },
  { theme: "Culture", valence: "Cathédrale · Lonja · San Nicolás", madrid: "Palacio Real", note: "Un seul grand monument, moins de marche" },
  { theme: "Marché", valence: "Mercado Central", madrid: "Mercado de San Miguel · El Rastro", note: "Le Rastro n'a lieu que le dimanche" },
  { theme: "Plage Malvarrosa", valence: "Plage & déjeuner face à la mer", madrid: "Retiro en barque", note: "Pas de mer, mais l'eau et la photo" },
  { theme: "Jardin secret", valence: "Jardín de Ayora", madrid: "Palacio de Cristal", note: "En travaux, à voir de l'extérieur" },
  { theme: "Soirée d'anniversaire", valence: "Censura", madrid: "Amazónico + Jungle Jazz Club", note: "Dîner puis fête au même endroit" },
  { theme: "Coucher de soleil n°2", valence: "Torres de Serranos", madrid: "Templo de Debod", note: "Élu plus beau coucher de soleil d'Espagne" },
  { theme: "Massage à deux", valence: "Spa Plaza Mercado", madrid: "The Nook", note: "Noté 4,9, ouvert le dimanche" },
  { theme: "Dîner d'au revoir", valence: "Matoque", madrid: "Rosi La Loca", note: "Plus festif et instagrammable" },
];

export const TRADEOFFS = {
  plus: ["Une vie nocturne plus riche (clubs, jazz, rooftops)", "Tout se fait à pied depuis La Latina", "Le Prado est gratuit du lundi au samedi de 18:00 à 20:00 (option bonus)"],
  minus: ["Pas de plage, et ≈ 15 °C au lieu de ≈ 22 °C", "Un hôtel environ deux fois plus cher ce week-end (NFL)", "Plus de monde le dimanche"],
};

export const INFOS = {
  emergency: [
    { label: "Urgences (tout)", num: "112", note: "Police, ambulance, pompiers · gratuit, répond en anglais" },
    { label: "Police nationale", num: "091", note: "Vol, perte de papiers" },
    { label: "Police municipale", num: "092", note: "Problème en ville" },
    { label: "Ambassade de Suisse · Madrid", num: "+34914363960", display: "+34 914 36 39 60", note: "Calle Núñez de Balboa 35A" },
    { label: "Helpline DFAE (24/7)", num: "+41800247365", display: "+41 800 24 7 365" },
    { label: "Posada del Dragón (hôtel)", num: "+34911191424", display: "+34 911 19 14 24" },
  ],
  health: [
    { name: "Hospital Clínico San Carlos", detail: "Calle del Prof. Martín Lagos · urgences 24 h/24", q: "Hospital Clínico San Carlos Madrid" },
    { name: "Hospital Gregorio Marañón", detail: "Calle del Dr. Esquerdo 46 · grand hôpital public", q: "Hospital General Universitario Gregorio Marañón" },
  ],
  sections: [
    { icon: "💳", title: "Argent", items: ["Euro. La carte est acceptée partout, même pour un café.", "Une carte sans frais de change est idéale (Revolut, Neon…).", "Le pourboire n'est pas obligatoire : 5 à 10 % au restaurant si le service est top."] },
    { icon: "🕘", title: "Horaires espagnols", items: ["Déjeuner de 14:00 à 16:00, dîner de 21:00 à 23:00.", "Le vermouth du dimanche midi est une vraie tradition.", "Les clubs ouvrent vers minuit."] },
    { icon: "🚕", title: "Se déplacer", items: ["Aéroport ↔ centre en taxi : prix fixe de 33 €.", "En métro (ligne 8), le billet coûte ≈ 5 € avec le supplément aéroport.", "Uber, Cabify et Bolt fonctionnent bien. Le centre se fait à pied."] },
    { icon: "🌤️", title: "Météo de novembre", items: ["≈ 13 à 17 °C l'après-midi, ≈ 5 à 8 °C le soir.", "Prendre un manteau léger pour les rooftops, la plupart sont chauffés.", "Coucher du soleil vers 18:05."] },
    { icon: "🎒", title: "Sécurité", items: ["Attention aux pickpockets à Sol, sur la Gran Vía, dans le métro et au Rastro.", "Gardez le sac fermé devant vous et ne posez pas le téléphone sur la table en terrasse.", "La ville est très sûre, même la nuit."] },
    { icon: "🏥", title: "Santé", items: ["Prenez votre carte d'assurance maladie (valable dans l'UE).", "Une pharmacie se repère à sa croix verte ; une « farmacia de guardia » est ouverte la nuit.", "L'eau du robinet est très bonne à Madrid."] },
    { icon: "🔌", title: "Prises", items: ["Type F (230 V).", "Les prises suisses à 3 broches ne rentrent pas : prenez un adaptateur."] },
    { icon: "🥘", title: "À goûter", items: ["Bocadillo de calamares sur la Plaza Mayor.", "Cocido madrileño, tortilla, croquetas.", "Churros con chocolate et vermouth maison."] },
  ],
  phrases: [
    { fr: "Une table pour deux", es: "Una mesa para dos, por favor" },
    { fr: "L'addition, s'il vous plaît", es: "La cuenta, por favor" },
    { fr: "C'est son anniversaire", es: "¡Es su cumpleaños!" },
    { fr: "Deux verres de cava", es: "Dos copas de cava" },
    { fr: "Un vermouth maison", es: "Un vermut de grifo" },
    { fr: "Merci beaucoup", es: "Muchas gracias" },
  ],
};
