// src/data/conseils.js
// Contenu statique des conseils par semaine de grossesse

const conseils = {
  // ── PREMIER TRIMESTRE (S1 - S13) ──

  1: {
    titre: "Semaine 1 — Le voyage commence",
    sousTitre:
      "Techniquement, la grossesse commence dès la date de tes dernières règles.",
    categories: [
      {
        id: "nutrition",
        label: "Nutrition",
        emoji: "🥗",
        conseils: [
          {
            titre: "Commence l'acide folique",
            texte:
              "La vitamine B9 (acide folique) est essentielle dès maintenant. Elle prévient les malformations du tube neural. Demande une prescription à ton médecin.",
          },
          {
            titre: "Alimentation équilibrée",
            texte:
              "Favorise les légumes verts, légumineuses, céréales complètes. Évite l'alcool, le tabac et la charcuterie dès maintenant.",
          },
        ],
      },
      {
        id: "bienetre",
        label: "Bien-être",
        emoji: "💆",
        conseils: [
          {
            titre: "Prends soin de toi",
            texte:
              "Repose-toi suffisamment. Ton corps se prépare à une grande aventure. La fatigue peut apparaître très tôt.",
          },
        ],
      },
    ],
  },

  4: {
    titre: "Semaine 4 — L'embryon s'implante",
    sousTitre:
      "Ton bébé est maintenant un embryon de la taille d'un grain de pavot.",
    categories: [
      {
        id: "nutrition",
        label: "Nutrition",
        emoji: "🥗",
        conseils: [
          {
            titre: "Continue l'acide folique",
            texte:
              "Continue ta supplémentation en acide folique jusqu'à la fin du premier trimestre minimum.",
          },
          {
            titre: "Évite certains aliments",
            texte:
              "Évite les fromages à pâte molle, la charcuterie, les œufs crus, le poisson cru — risque de listériose et toxoplasmose.",
          },
        ],
      },
      {
        id: "bienetre",
        label: "Bien-être",
        emoji: "💆",
        conseils: [
          {
            titre: "Nausées matinales",
            texte:
              "Si les nausées apparaissent, mange de petites quantités souvent. Le gingembre peut aider. Parles-en à ton médecin si elles sont trop intenses.",
          },
        ],
      },
      {
        id: "bebe",
        label: "Bébé",
        emoji: "👶",
        conseils: [
          {
            titre: "Implantation réussie",
            texte:
              "L'embryon vient de s'implanter dans la paroi utérine. Le cœur commence à se former.",
          },
        ],
      },
    ],
  },

  8: {
    titre: "Semaine 8 — Le cœur bat fort",
    sousTitre:
      "Ton bébé mesure environ 1,6 cm. Son cœur bat à 150-170 battements par minute.",
    categories: [
      {
        id: "nutrition",
        label: "Nutrition",
        emoji: "🥗",
        conseils: [
          {
            titre: "Fer et vitamine C",
            texte:
              "Augmente les aliments riches en fer : lentilles, épinards, viande rouge. Associe-les à la vitamine C pour une meilleure absorption.",
          },
          {
            titre: "Hydratation",
            texte:
              "Bois 1,5 à 2 litres d'eau par jour. Cela aide à réduire les nausées et prévient les infections urinaires fréquentes en début de grossesse.",
          },
        ],
      },
      {
        id: "bienetre",
        label: "Bien-être",
        emoji: "💆",
        conseils: [
          {
            titre: "Première consultation",
            texte:
              "Si ce n'est pas encore fait, prends rendez-vous pour ta première consultation prénatale avant la fin de la semaine 10.",
          },
          {
            titre: "Fatigue intense",
            texte:
              "La fatigue du premier trimestre est normale — ton corps produit le placenta. Dors autant que possible.",
          },
        ],
      },
      {
        id: "bebe",
        label: "Bébé",
        emoji: "👶",
        conseils: [
          {
            titre: "Développement rapide",
            texte:
              "Les bras, les jambes, les doigts et les orteils se forment. Le visage prend forme avec les yeux et les oreilles visibles.",
          },
        ],
      },
    ],
  },

  12: {
    titre: "Semaine 12 — Fin du premier trimestre",
    sousTitre:
      "Ton bébé mesure environ 6 cm. C'est la semaine de la première échographie !",
    categories: [
      {
        id: "nutrition",
        label: "Nutrition",
        emoji: "🥗",
        conseils: [
          {
            titre: "Les nausées s'allègent",
            texte:
              "Pour la plupart des femmes, les nausées diminuent à partir de cette semaine. Tu peux progressivement reprendre une alimentation normale.",
          },
        ],
      },
      {
        id: "bienetre",
        label: "Bien-être",
        emoji: "💆",
        conseils: [
          {
            titre: "Première échographie",
            texte:
              "L'échographie du 1er trimestre (entre S11 et S13) mesure la clarté nucale pour dépister certaines anomalies chromosomiques.",
          },
          {
            titre: "Annonce de la grossesse",
            texte:
              "Beaucoup de couples attendent la fin du premier trimestre pour annoncer la grossesse. C'est souvent après la première échographie.",
          },
        ],
      },
      {
        id: "bebe",
        label: "Bébé",
        emoji: "👶",
        conseils: [
          {
            titre: "Tous les organes sont formés",
            texte:
              "À la semaine 12, tous les organes principaux sont en place. Le reste de la grossesse sera dédié à leur croissance et maturation.",
          },
        ],
      },
    ],
  },

  // ── DEUXIÈME TRIMESTRE (S14 - S26) ──

  16: {
    titre: "Semaine 16 — La belle période commence",
    sousTitre:
      "Ton bébé mesure 12 cm. Tu commences à sentir les premiers mouvements bientôt.",
    categories: [
      {
        id: "nutrition",
        label: "Nutrition",
        emoji: "🥗",
        conseils: [
          {
            titre: "Calcium indispensable",
            texte:
              "Les os de ton bébé se renforcent. Consomme des produits laitiers, sardines, brocoli, amandes. Évite de boire du café avec les repas — il bloque l'absorption du calcium.",
          },
          {
            titre: "Augmente les protéines",
            texte:
              "Ton bébé grandit vite. Assure-toi d'avoir suffisamment de protéines : œufs, légumineuses, viande maigre, poisson.",
          },
        ],
      },
      {
        id: "bienetre",
        label: "Bien-être",
        emoji: "💆",
        conseils: [
          {
            titre: "Activité physique douce",
            texte:
              "Le deuxième trimestre est idéal pour le yoga prénatal, la natation ou la marche. Évite les sports à risque de chute ou de contact.",
          },
          {
            titre: "Soins de la peau",
            texte:
              "Le ventre commence à s'arrondir. Hydrate ta peau quotidiennement pour prévenir les vergetures.",
          },
        ],
      },
      {
        id: "bebe",
        label: "Bébé",
        emoji: "👶",
        conseils: [
          {
            titre: "Il entend des sons",
            texte:
              "Ton bébé commence à percevoir les sons externes. Parle-lui, mets de la musique douce.",
          },
        ],
      },
    ],
  },

  20: {
    titre: "Semaine 20 — Le milieu du chemin",
    sousTitre:
      "Ton bébé mesure environ 25 cm. C'est la semaine de la grande échographie morphologique !",
    categories: [
      {
        id: "nutrition",
        label: "Nutrition",
        emoji: "🥗",
        conseils: [
          {
            titre: "Omega-3 pour le cerveau",
            texte:
              "Les acides gras oméga-3 sont essentiels pour le développement cérébral. Consomme des poissons gras (saumon, maquereau) 2 fois par semaine.",
          },
        ],
      },
      {
        id: "bienetre",
        label: "Bien-être",
        emoji: "💆",
        conseils: [
          {
            titre: "Échographie morphologique",
            texte:
              "L'échographie du 2ème trimestre (entre S20 et S24) examine en détail tous les organes de ton bébé et peut révéler le sexe si tu le souhaites.",
          },
          {
            titre: "Douleurs ligamentaires",
            texte:
              "Des douleurs dans le bas-ventre ou sur les côtés sont normales — ce sont les ligaments qui s'étirent. Consulte si la douleur est intense.",
          },
        ],
      },
      {
        id: "bebe",
        label: "Bébé",
        emoji: "👶",
        conseils: [
          {
            titre: "Il se retourne",
            texte:
              "Ton bébé fait des acrobaties. Tu peux sentir ses mouvements de plus en plus clairement, souvent la nuit.",
          },
        ],
      },
    ],
  },

  24: {
    titre: "Semaine 24 — Le bébé prend de l'ampleur",
    sousTitre:
      "Ton bébé mesure environ 30 cm et pèse 600g. Ses poumons se développent activement.",
    categories: [
      {
        id: "nutrition",
        label: "Nutrition",
        emoji: "🥗",
        conseils: [
          {
            titre: "Augmente ton apport en fer",
            texte:
              "Ton bébé constitue ses réserves en fer. Privilégie les lentilles, épinards, viande rouge maigre et associe-les à de la vitamine C pour une meilleure absorption.",
          },
          {
            titre: "Calcium et vitamine D",
            texte:
              "Les os de ton bébé se renforcent. Consomme des produits laitiers, sardines, amandes et expose-toi modérément au soleil.",
          },
          {
            titre: "Hydratation",
            texte:
              "Bois au moins 1,5 à 2 litres d'eau par jour. Une bonne hydratation prévient les contractions prématurées et les crampes.",
          },
        ],
      },
      {
        id: "bienetre",
        label: "Bien-être",
        emoji: "💆",
        conseils: [
          {
            titre: "Parle à ton bébé",
            texte:
              "À la semaine 24, ton bébé peut entendre ta voix. Parle-lui, lis-lui des histoires — il te reconnaîtra à la naissance.",
          },
          {
            titre: "Activité physique douce",
            texte:
              "La marche, la natation et le yoga prénatal sont idéaux. 30 minutes par jour améliorent la circulation et réduisent les douleurs dorsales.",
          },
          {
            titre: "Prends soin de ton dos",
            texte:
              "Ton centre de gravité se déplace. Évite de rester longtemps debout, utilise un coussin de grossesse la nuit.",
          },
        ],
      },
      {
        id: "bebe",
        label: "Bébé",
        emoji: "👶",
        conseils: [
          {
            titre: "Développement pulmonaire",
            texte:
              "Les poumons produisent du surfactant, essentiel pour respirer après la naissance.",
          },
          {
            titre: "Il bouge de plus en plus",
            texte:
              "Tu devrais sentir des mouvements réguliers. Si tu ne sens pas au moins 10 mouvements en 2h, contacte ton médecin.",
          },
        ],
      },
      {
        id: "sommeil",
        label: "Sommeil",
        emoji: "🌙",
        conseils: [
          {
            titre: "Dors sur le côté gauche",
            texte:
              "Cette position optimise la circulation sanguine vers le bébé. Un coussin entre les jambes t'aidera.",
          },
          {
            titre: "Rituel de détente",
            texte:
              "Un bain tiède ou quelques respirations profondes avant de dormir améliorent la qualité du sommeil.",
          },
        ],
      },
    ],
  },

  // ── TROISIÈME TRIMESTRE (S27 - S40) ──

  28: {
    titre: "Semaine 28 — Le troisième trimestre commence",
    sousTitre:
      "Ton bébé mesure 37 cm et pèse environ 1 kg. Il ouvre les yeux !",
    categories: [
      {
        id: "nutrition",
        label: "Nutrition",
        emoji: "🥗",
        conseils: [
          {
            titre: "Petits repas fréquents",
            texte:
              "L'utérus comprime l'estomac. Mange 5 à 6 petits repas par jour plutôt que 3 gros repas pour éviter les reflux et l'inconfort.",
          },
        ],
      },
      {
        id: "bienetre",
        label: "Bien-être",
        emoji: "💆",
        conseils: [
          {
            titre: "Cours de préparation à l'accouchement",
            texte:
              "C'est le bon moment pour commencer les cours de préparation — respiration, positions, allaitement.",
          },
          {
            titre: "Gonflement des pieds",
            texte:
              "L'œdème des chevilles est normal. Surélève tes pieds le soir et évite de rester debout trop longtemps.",
          },
        ],
      },
      {
        id: "bebe",
        label: "Bébé",
        emoji: "👶",
        conseils: [
          {
            titre: "Il ouvre les yeux",
            texte:
              "Les paupières de ton bébé s'ouvrent pour la première fois. Il peut percevoir la lumière à travers la paroi abdominale.",
          },
        ],
      },
    ],
  },

  32: {
    titre: "Semaine 32 — Le bébé se prépare",
    sousTitre:
      "Ton bébé mesure 42 cm et pèse environ 1,7 kg. Il se positionne pour la naissance.",
    categories: [
      {
        id: "nutrition",
        label: "Nutrition",
        emoji: "🥗",
        conseils: [
          {
            titre: "Magnésium contre les crampes",
            texte:
              "Les crampes nocturnes sont fréquentes. Le magnésium peut aider — parles-en à ton médecin.",
          },
        ],
      },
      {
        id: "bienetre",
        label: "Bien-être",
        emoji: "💆",
        conseils: [
          {
            titre: "Prépare ta valise de maternité",
            texte:
              "Il est temps de préparer ta valise : affaires pour toi, pour bébé, documents médicaux.",
          },
          {
            titre: "Contractions de Braxton Hicks",
            texte:
              "Des contractions irrégulières et indolores sont normales — c'est l'utérus qui s'entraîne. Si elles deviennent régulières et douloureuses, appelle ton médecin.",
          },
        ],
      },
      {
        id: "bebe",
        label: "Bébé",
        emoji: "👶",
        conseils: [
          {
            titre: "Il se tourne tête en bas",
            texte:
              "La plupart des bébés se positionnent tête en bas vers la semaine 32-36. Ton médecin vérifiera sa position.",
          },
        ],
      },
    ],
  },

  36: {
    titre: "Semaine 36 — Le grand final approche",
    sousTitre:
      "Ton bébé mesure 47 cm et pèse environ 2,6 kg. Il est presque prêt !",
    categories: [
      {
        id: "bienetre",
        label: "Bien-être",
        emoji: "💆",
        conseils: [
          {
            titre: "Rendez-vous plus fréquents",
            texte:
              "À partir de la semaine 36, les consultations deviennent hebdomadaires. Ton médecin surveille la position du bébé et la dilatation.",
          },
          {
            titre: "Repos absolu",
            texte:
              "Repose-toi au maximum. La fatigue de fin de grossesse est intense — écoute ton corps.",
          },
        ],
      },
      {
        id: "bebe",
        label: "Bébé",
        emoji: "👶",
        conseils: [
          {
            titre: "Poumons matures",
            texte:
              "À la semaine 36, les poumons sont considérés comme matures. Un bébé né maintenant a d'excellentes chances de se porter bien.",
          },
        ],
      },
    ],
  },

  40: {
    titre: "Semaine 40 — Le grand jour approche",
    sousTitre:
      "C'est la date prévue ! Chaque grossesse est unique — patiente encore un peu.",
    categories: [
      {
        id: "bienetre",
        label: "Bien-être",
        emoji: "💆",
        conseils: [
          {
            titre: "Les signes du travail",
            texte:
              "Contractions régulières et douloureuses, perte des eaux, perte du bouchon muqueux — contacte immédiatement ta maternité.",
          },
          {
            titre: "Reste calme",
            texte:
              "Le dépassement de terme (jusqu'à 41-42 semaines) est normal. Ton médecin te suivra de près et proposera un déclenchement si nécessaire.",
          },
        ],
      },
    ],
  },
};

// Fonction principale — retourne les conseils de la semaine
// Si la semaine exacte n'existe pas, retourne la semaine la plus proche
export function getConseilsSemaine(semaine) {
  // Si la semaine existe directement
  if (conseils[semaine]) return conseils[semaine];

  // Sinon cherche la semaine la plus proche dans les données disponibles
  const semaines = Object.keys(conseils)
    .map(Number)
    .sort((a, b) => a - b);
  const plusProche = semaines.reduce((prev, curr) =>
    Math.abs(curr - semaine) < Math.abs(prev - semaine) ? curr : prev,
  );

  return conseils[plusProche];
}

export default conseils;
