import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Tag,
  Home,
  Building2,
  Lightbulb,
  TrendingUp,
  BookOpen,
  ChevronRight,
  Share2,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ─── Types ─────────────────────────────────────────────────────────────────── */

type Section = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  callout?: string;
};

type Article = {
  slug: string;
  title: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  sections: Section[];
};

/* ─── Articles data ──────────────────────────────────────────────────────────── */

const articles: Record<string, Article> = {
  "marche-immobilier-dakar-2026": {
    slug: "marche-immobilier-dakar-2026",
    title: "Le marché immobilier à Dakar en 2026 : tendances et opportunités",
    category: "Immobilier",
    categoryColor: "#C8922A",
    categoryBg: "#F5E6C8",
    author: "Équipe Kasafrik",
    date: "10 janvier 2026",
    readTime: "8 min",
    tags: ["Dakar", "Investissement", "Prix immobilier", "2026"],
    excerpt:
      "Le marché immobilier dakarois entre dans une nouvelle ère. La pression foncière dans les quartiers centraux pousse les acheteurs vers des zones périphériques en plein essor.",
    sections: [
      {
        paragraphs: [
          "Le marché immobilier sénégalais aborde 2026 dans un contexte de transformation profonde. Si la capitale Dakar reste le moteur principal de la demande, la géographie de l'investissement se redessine progressivement. Les zones historiquement prisées comme le Plateau, les Almadies ou Mermoz atteignent des niveaux de saturation foncière qui font mécaniquement grimper les prix, tandis que des axes périphériques autrefois boudés par les investisseurs affichent désormais des rendements locatifs attractifs.",
          "Cette recomposition du marché s'explique par plusieurs facteurs convergents : la croissance démographique de Dakar (estimée à 3,5 % par an), l'amélioration progressive des infrastructures routières vers des zones comme Diamniadio ou Thiès, et la montée en puissance d'une classe moyenne sénégalaise qui cherche un premier achat immobilier accessible.",
        ],
      },
      {
        heading: "Évolution des prix : des dynamiques contrastées",
        paragraphs: [
          "En 2026, le prix moyen du mètre carré à Dakar intra-muros oscille entre 300 000 et 900 000 FCFA selon les quartiers, avec des pointes à plus d'un million de francs dans les zones ultra-premium comme la Corniche Ouest ou les Almadies front de mer. Ces niveaux de prix, inédits il y a dix ans, reflètent une tension persistante entre une offre foncière limitée et une demande soutenue par la diaspora sénégalaise.",
          "À l'opposé, des quartiers comme Pikine, Guédiawaye ou Rufisque proposent encore des opportunités d'achat entre 80 000 et 150 000 FCFA/m², avec des perspectives de valorisation solides à horizon de cinq à dix ans, portées par les projets d'infrastructure du Plan Sénégal Émergent.",
          "Sur le marché locatif, les loyers mensuels dans les quartiers centraux de Dakar varient de 150 000 FCFA pour un studio fonctionnel à plus de 1 500 000 FCFA pour une villa de standing. Les rendements bruts oscillent entre 4 % et 7 %, des niveaux comparables aux marchés immobiliers d'Afrique du Nord.",
        ],
      },
      {
        heading: "Les zones à surveiller en 2026",
        paragraphs: [
          "Diamniadio s'affirme comme la grande opportunité du marché : avec l'Arena du Sénégal, le Centre International de Conférences Abdou Diouf et la Zone Économique Spéciale, la nouvelle ville à 30 km de Dakar attire de plus en plus d'investisseurs institutionnels et particuliers. Les prix actuels, encore raisonnables (entre 100 000 et 250 000 FCFA/m²), devraient progresser significativement dans les trois prochaines années.",
          "Saly Portudal, sur la Petite Côte, connaît quant à elle une demande croissante de la part d'acheteurs cherchant des résidences secondaires ou des investissements dans l'hébergement touristique. Le boom du tourisme sénégalais, dynamisé par les travaux du futur aéroport de Kaolack, renforce l'attrait de cette zone.",
          "Thiès, troisième ville du Sénégal et carrefour routier stratégique, voit ses prix immobiliers progresser de 8 à 12 % par an depuis 2023. La création de zones industrielles autour de la ville attire une main-d'œuvre qualifiée qui génère une demande locative soutenue.",
        ],
      },
      {
        heading: "Le marché des bureaux et locaux commerciaux",
        paragraphs: [
          "Le marché des bureaux dakarois se restructure depuis la crise de 2020. La demande de surfaces flexibles (coworking, bureaux partagés) explose, portée par l'essor des startups technologiques et des PME en croissance. Le taux de vacance des bureaux de classe A tourne autour de 12 % au centre-ville, créant des opportunités pour les propriétaires capables de proposer des espaces modulables.",
          "Les locaux commerciaux en pied d'immeuble dans les quartiers résidentiels en plein essor restent un investissement particulièrement rentable : des rendements de 8 à 10 % bruts ne sont pas rares dans des zones comme les cités récentes de Diamniadio ou les nouvelles artères de la banlieue dakaroise.",
        ],
      },
      {
        heading: "Conseils pour investir intelligemment en 2026",
        list: [
          "Vérifiez systématiquement le titre foncier avant tout engagement — les litiges fonciers restent fréquents au Sénégal.",
          "Privilégiez les zones desservies par les nouvelles infrastructures (TER, autoroutes) pour maximiser la valorisation.",
          "Pour un investissement locatif, ciblez les quartiers à fort taux d'occupation étudiante ou de cadres expatriés.",
          "Faites appel à un notaire agréé pour sécuriser la transaction, même pour les terrains sans construction.",
          "Comparez les offres sur plusieurs plateformes — Kasafrik vous permet de filtrer par quartier, budget et type de bien.",
        ],
        paragraphs: [
          "En résumé, 2026 offre encore de réelles opportunités sur le marché immobilier sénégalais, à condition de sortir des zones saturées et d'adopter une vision à moyen terme. Les investisseurs qui misent dès maintenant sur les pôles émergents (Diamniadio, Thiès, Saly) ont toutes les chances de réaliser des plus-values significatives dans les cinq prochaines années.",
        ],
      },
    ],
  },

  "vendre-terrain-senegal-guide": {
    slug: "vendre-terrain-senegal-guide",
    title: "Comment vendre son terrain au Sénégal : guide complet",
    category: "Immobilier",
    categoryColor: "#C8922A",
    categoryBg: "#F5E6C8",
    author: "Équipe Kasafrik",
    date: "5 janvier 2026",
    readTime: "7 min",
    tags: ["Terrain", "Vente", "Notaire", "Titre foncier"],
    excerpt:
      "Titre foncier, bornage, procédure notariale, fiscalité... La vente d'un terrain au Sénégal comporte des étapes incontournables que tout vendeur doit maîtriser.",
    sections: [
      {
        paragraphs: [
          "Vendre un terrain au Sénégal peut sembler simple en surface, mais la procédure légale comporte de nombreuses étapes qui, si elles sont mal maîtrisées, peuvent retarder ou même invalider la transaction. Que vous vendiez un terrain familial hérité, un lot acquis il y a quelques années ou un terrain constructible en zone urbaine, ce guide vous accompagne pas à pas.",
          "La première chose à savoir : au Sénégal, la sécurité juridique d'une vente immobilière repose entièrement sur le titre foncier. Un terrain sans titre foncier en bonne et due forme expose l'acheteur — et parfois le vendeur — à des risques juridiques importants. Avant d'engager tout processus de vente, il est donc indispensable de vérifier la situation juridique de votre bien.",
        ],
      },
      {
        heading: "Étape 1 : Vérification et régularisation du titre foncier",
        paragraphs: [
          "Le titre foncier (TF) est le document qui établit de manière définitive la propriété d'un terrain au Sénégal. Il est délivré par la Conservation Foncière (Direction des Domaines) après immatriculation au livre foncier. Si votre terrain dispose déjà d'un TF en votre nom, parfait. Sinon, il vous faudra engager une procédure d'immatriculation ou de régularisation avant toute vente.",
          "Pour vérifier l'état du TF de votre terrain, rendez-vous à la Conservation Foncière compétente (Dakar, Thiès, Saint-Louis, etc.) avec le numéro de TF et une copie de votre carte d'identité. Un extrait cadastral vous permettra également de confirmer les limites exactes de la parcelle.",
          "Si le titre foncier n'est pas à votre nom (succession, donation non formalisée), la régularisation est indispensable avant la vente. Cette procédure prend généralement 3 à 6 mois et nécessite l'intervention d'un notaire.",
        ],
      },
      {
        heading: "Étape 2 : Le bornage du terrain",
        paragraphs: [
          "Le bornage consiste à délimiter physiquement les contours du terrain à l'aide de bornes posées par un géomètre agréé. C'est une étape souvent négligée mais cruciale : elle évite les litiges de voisinage, précise la superficie réelle du terrain et rassure l'acheteur.",
          "Pour faire borner votre terrain, contactez un cabinet de géomètre-expert agréé au Sénégal. Les honoraires varient selon la superficie et la localisation du terrain. Un plan de bornage officiel sera établi et annexé à l'acte de vente.",
          "Bon à savoir : si votre terrain est déjà borné mais que les bornes ont disparu ou ont été déplacées, un re-bornage est nécessaire. Cette opération est à la charge du vendeur dans la plupart des transactions.",
        ],
      },
      {
        heading: "Étape 3 : L'estimation et la fixation du prix",
        paragraphs: [
          "Pour fixer un prix juste, consultez les prix au mètre carré pratiqués dans votre zone en utilisant des plateformes comme Kasafrik, ou faites appel à un expert immobilier agréé pour une estimation formelle. Un prix trop élevé allongera le délai de vente ; un prix trop bas vous léserait.",
          "Tenez compte des éléments valorisants : accès à une voie goudronnée, proximité des réseaux d'eau et d'électricité, orientation, voisinage, possibilités constructives selon le plan d'urbanisme local.",
        ],
        callout:
          "💡 Conseil Kasafrik : publiez votre annonce sur Kasafrik avec des photos du terrain, son plan de bornage et son numéro de TF pour rassurer instantanément les acheteurs sérieux.",
      },
      {
        heading: "Étape 4 : La procédure notariale",
        paragraphs: [
          "Au Sénégal, toute vente d'immeuble (terrain inclus) doit obligatoirement être constatée par acte notarié pour être opposable aux tiers et permettre la mutation du titre foncier. Le recours à un notaire n'est pas optionnel : c'est une exigence légale.",
          "La procédure notariale se déroule ainsi : signature d'un compromis de vente (promesse synallagmatique), versement d'un acompte (généralement 10 à 20 % du prix), instruction du dossier par le notaire (vérification du TF, absence de saisie ou hypothèque, purge des droits de préemption), puis signature de l'acte définitif et paiement du solde.",
          "Les frais de notaire au Sénégal représentent environ 3 à 5 % du prix de vente, à la charge de l'acheteur dans la pratique courante. Cependant, la répartition des frais est librement négociable entre les parties.",
        ],
      },
      {
        heading: "Étape 5 : La fiscalité applicable",
        paragraphs: [
          "La vente d'un terrain au Sénégal est soumise à diverses taxes dont il faut tenir compte dans le calcul de votre gain net. La taxe de plus-value immobilière (TPVI) s'applique si vous avez réalisé un gain lors de la vente, au taux de 15 % sur la plus-value réalisée. Certaines exonérations existent (résidence principale, durée de détention).",
          "Les droits d'enregistrement et de publicité foncière (à la charge de l'acheteur) s'élèvent à environ 5 % du prix de vente. La TVA sur cession immobilière peut également s'appliquer dans certains cas (terrain à bâtir vendu par un promoteur).",
          "Pour optimiser votre fiscalité, consultez un conseiller fiscal ou votre notaire avant de fixer le prix de vente. Une structuration appropriée de la transaction peut légalement réduire votre charge fiscale.",
        ],
      },
      {
        heading: "Erreurs fréquentes à éviter",
        list: [
          "Vendre sans titre foncier en bonne forme (expose à des litiges ultérieurs).",
          "Ne pas vérifier l'absence d'hypothèque ou de saisie sur le terrain.",
          "Accepter un paiement en dehors de la procédure notariale.",
          "Fixer un prix sans estimation sérieuse du marché.",
          "Ignorer les obligations fiscales liées à la plus-value.",
          "Ne pas formaliser les engagements dans un compromis de vente avant l'acte définitif.",
        ],
      },
    ],
  },

  "diamniadio-nouvelle-ville-investir": {
    slug: "diamniadio-nouvelle-ville-investir",
    title: "Diamniadio, la nouvelle ville : investir maintenant ou attendre ?",
    category: "Immobilier",
    categoryColor: "#C8922A",
    categoryBg: "#F5E6C8",
    author: "Équipe Kasafrik",
    date: "28 décembre 2025",
    readTime: "6 min",
    tags: ["Diamniadio", "Investissement", "Nouvelle ville", "Sénégal"],
    excerpt:
      "Centre international de conférences, Arena, zones industrielles, autoroutes... Diamniadio s'impose comme le pari immobilier de la décennie. Notre analyse.",
    sections: [
      {
        paragraphs: [
          "À 30 kilomètres de Dakar, le long de l'autoroute à péage, Diamniadio est passé en moins de dix ans d'un carrefour routier poussiéreux à un véritable pôle urbain en devenir. Le gouvernement sénégalais y a investi des milliards de francs CFA, convaincu que la décongestion de Dakar passe par la création d'un nouveau centre urbain structuré. Mais pour un investisseur immobilier, la vraie question est : le moment est-il opportun pour acheter à Diamniadio, ou vaut-il mieux attendre que le projet arrive à maturité ?",
        ],
      },
      {
        heading: "Ce qui est déjà construit et opérationnel",
        paragraphs: [
          "Diamniadio n'est plus un chantier à papier. Plusieurs infrastructures majeures sont déjà opérationnelles : l'Arena du Sénégal (une salle omnisports de 15 000 places, l'une des plus grandes d'Afrique de l'Ouest), le Centre International de Conférences Abdou Diouf (CICAD, 3 000 places), les sièges de plusieurs ministères et agences publiques relocalisés depuis Dakar, la cité de l'air à proximité de l'aéroport Blaise Diagne, et la gare du Train Express Régional (TER) qui relie Dakar en 45 minutes.",
          "Ces infrastructures génèrent d'ores et déjà un flux quotidien de fonctionnaires, de salariés de zone industrielle et de visiteurs en congrès, ce qui crée une demande réelle en logements locatifs et en services.",
        ],
      },
      {
        heading: "Les projets en cours qui changeront la donne",
        paragraphs: [
          "Les chantiers en cours à Diamniadio laissent entrevoir une transformation encore plus radicale dans les 3 à 5 prochaines années. La Zone Économique Spéciale (ZES) de Diamniadio vise à attirer des entreprises industrielles et logistiques, avec des facilités fiscales significatives. Plusieurs usines et entrepôts y sont déjà implantés ou en cours de construction.",
          "Le projet de parc technologique, annoncé en partenariat avec des entreprises asiatiques et européennes, devrait créer plusieurs milliers d'emplois qualifiés. Un campus universitaire public et des lycées d'excellence sont également programmés, ce qui renforcera encore l'attractivité résidentielle de la zone.",
          "Enfin, l'extension du réseau routier et la perspective d'une ligne de bus rapide (BRT) reliant Diamniadio à Dakar sont des facteurs structurants qui valoriseront durablement le foncier.",
        ],
      },
      {
        heading: "Les prix actuels : une fenêtre d'opportunité ?",
        paragraphs: [
          "En 2026, les prix immobiliers à Diamniadio restent nettement inférieurs à ceux de Dakar intra-muros. On trouve des appartements neufs entre 30 et 70 millions de FCFA selon la surface et les finitions, et des terrains viabilisés à des prix allant de 15 000 à 80 000 FCFA le mètre carré selon la localisation précise dans la zone.",
          "Ces niveaux de prix, encore accessibles pour un investisseur individuel, contrastent avec les 300 000 à 900 000 FCFA/m² pratiqués dans les quartiers centraux de Dakar. Les spécialistes immobiliers estiment que les prix à Diamniadio devraient doubler ou tripler d'ici 2030 si les projets d'infrastructure se concrétisent comme annoncé.",
        ],
        callout:
          "📊 Donnée clé : entre 2020 et 2025, les prix fonciers à Diamniadio ont progressé de 40 à 60 % dans les zones proches des infrastructures déjà livrées.",
      },
      {
        heading: "Les risques à anticiper",
        paragraphs: [
          "Investir à Diamniadio n'est pas sans risques. Le principal risque est celui du calendrier : les projets publics sénégalais connaissent souvent des retards significatifs, et un investissement immobilier fondé sur des infrastructures qui tardent à être livrées peut se retrouver illiquide pendant plusieurs années.",
          "La demande locative réelle reste encore limitée par rapport à l'offre : de nombreux logements livrés dans la zone sont sous-occupés, ce qui pèse sur les niveaux de loyers. Si vous achetez dans l'optique d'une revente à court terme, le marché secondaire reste peu liquide.",
        ],
      },
      {
        heading: "Notre verdict",
        paragraphs: [
          "Pour un investisseur avec un horizon de 5 à 10 ans et une tolérance au risque modérée, Diamniadio représente aujourd'hui une opportunité réelle. La combinaison d'un prix d'entrée encore accessible, d'infrastructures déjà en place et de projets à fort potentiel justifie de s'y positionner maintenant plutôt qu'attendre que les prix reflètent pleinement le potentiel de la zone.",
          "En revanche, si vous avez besoin de liquidités rapides ou si vous souhaitez un rendement locatif immédiat, patientez encore 2 à 3 ans le temps que la masse critique d'habitants et d'entreprises soit atteinte.",
        ],
      },
    ],
  },

  "location-vs-achat-dakar-2026": {
    slug: "location-vs-achat-dakar-2026",
    title: "Location vs achat à Dakar : que choisir en 2026 ?",
    category: "Conseils",
    categoryColor: "#1A1A2E",
    categoryBg: "#E8E8F0",
    author: "Équipe Kasafrik",
    date: "20 décembre 2025",
    readTime: "5 min",
    tags: ["Location", "Achat", "Dakar", "Financement"],
    excerpt:
      "Loyers en hausse, taux bancaires, apport personnel... L'équation financière entre louer et acheter à Dakar n'a jamais été aussi complexe.",
    sections: [
      {
        paragraphs: [
          "C'est l'une des questions immobilières les plus fréquentes au Sénégal : vaut-il mieux continuer à louer ou franchir le pas de l'achat immobilier ? La réponse dépend de nombreux facteurs : votre situation financière, votre stabilité professionnelle, votre horizon de vie à Dakar et vos objectifs patrimoniaux. Ce guide vous aide à trancher selon votre profil.",
        ],
      },
      {
        heading: "L'état du marché locatif dakarois en 2026",
        paragraphs: [
          "Les loyers à Dakar ont progressé de 15 à 25 % en cinq ans dans les quartiers centraux. Un appartement de deux pièces fonctionnel à Mermoz ou Sacré-Cœur se loue aujourd'hui entre 200 000 et 350 000 FCFA par mois. Dans les quartiers périphériques comme Parcelles Assainies ou Guédiawaye, les mêmes surfaces trouvent preneur à 80 000 à 150 000 FCFA mensuels.",
          "Cette inflation locative s'explique par la tension entre une offre insuffisante (peu de nouveaux logements abordables mis sur le marché dans les zones bien desservies) et une demande soutenue par la croissance démographique et l'urbanisation. Pour un locataire, chaque année de location représente une somme versée définitivement, sans constitution de patrimoine.",
        ],
      },
      {
        heading: "Accès au crédit immobilier au Sénégal",
        paragraphs: [
          "Le crédit immobilier reste le principal levier pour accéder à la propriété au Sénégal. Les principaux acteurs (BNDE, BHS, Banque Islamique du Sénégal, CBAO, Ecobank) proposent des prêts immobiliers à des taux variant entre 8 et 12 % selon l'établissement, la durée et le profil de l'emprunteur.",
          "La durée maximale des prêts est généralement de 20 ans pour les salariés du secteur formel. Un apport personnel d'au moins 20 à 30 % du prix d'achat est exigé par la plupart des banques. Les conditions d'octroi restent strictes : justificatifs de revenus réguliers, domiciliation de salaire, assurance emprunteur.",
          "Pour les travailleurs indépendants et commerçants, les conditions d'accès au crédit sont plus restrictives, bien que certaines banques islamiques proposent des solutions de financement participatif (mourabaha, ijara) adaptées à ces profils.",
        ],
      },
      {
        heading: "Analyse financière : louer ou acheter ?",
        paragraphs: [
          "Prenons un exemple concret : un appartement F3 à Dakar Liberté à 25 000 000 FCFA. Avec un apport de 5 000 000 FCFA (20 %) et un crédit de 20 000 000 FCFA sur 15 ans à 10 %, la mensualité de remboursement s'établit à environ 215 000 FCFA. Pour le même bien, le loyer mensuel serait de l'ordre de 200 000 à 250 000 FCFA.",
          "En surface, les mensualités sont comparables. Mais la différence fondamentale est qu'en achetant, vous constituez un patrimoine : au bout de 15 ans, vous êtes propriétaire d'un bien dont la valeur aura vraisemblablement progressé. En louant, vous avez dépensé 45 000 000 FCFA sans rien posséder.",
        ],
        callout:
          "🧮 Règle empirique : si votre mensualité de crédit ne dépasse pas 130 % de votre loyer actuel pour le même bien, l'achat est financièrement pertinent.",
      },
      {
        heading: "Profils pour qui la location est préférable",
        list: [
          "Expatriés ou salariés avec une affectation à durée déterminée à Dakar.",
          "Jeunes actifs dont la situation professionnelle est encore instable.",
          "Personnes sans apport personnel suffisant (moins de 15 % du prix d'achat).",
          "Investisseurs qui préfèrent garder leurs liquidités pour d'autres opportunités.",
          "Personnes susceptibles de changer de ville ou de pays dans les 3 prochaines années.",
        ],
      },
      {
        heading: "Profils pour qui l'achat est recommandé",
        list: [
          "Salariés du secteur formel avec un CDI et un revenu stable depuis au moins 2 ans.",
          "Personnes enracinées à Dakar avec une vision patrimoniale long terme.",
          "Propriétaires-bailleurs souhaitant investir pour générer des revenus locatifs.",
          "Membres de la diaspora souhaitant sécuriser un bien au Sénégal.",
          "Personnes disposant d'un apport de 25 % ou plus et d'une capacité d'épargne régulière.",
        ],
        paragraphs: [
          "En conclusion, il n'y a pas de réponse universelle. L'achat est pertinent si vous vous projetez à Dakar sur le long terme, si vous avez les ressources financières nécessaires et si vous trouvez un bien à un prix cohérent avec le marché. La location reste une option rationnelle pour ceux dont la situation de vie est encore en transition.",
        ],
      },
    ],
  },

  "quartiers-prises-dakar-investir": {
    slug: "quartiers-prises-dakar-investir",
    title: "Les quartiers les plus prisés de Dakar pour investir en 2026",
    category: "Immobilier",
    categoryColor: "#C8922A",
    categoryBg: "#F5E6C8",
    author: "Équipe Kasafrik",
    date: "15 décembre 2025",
    readTime: "7 min",
    tags: ["Quartiers", "Dakar", "Investissement", "Carte immobilière"],
    excerpt:
      "Almadies, Plateau, Mermoz, Sacré-Cœur, Point E, Fann Résidence... Notre classement 2026 des meilleures zones d'investissement immobilier à Dakar.",
    sections: [
      {
        paragraphs: [
          "Dakar est une ville de contrastes immobiliers. Dans un périmètre de quelques kilomètres, on peut passer d'un marché ultra-premium comparable aux capitales européennes à des zones émergentes offrant encore des opportunités d'entrée abordables. Pour investir efficacement, il est essentiel de comprendre les spécificités de chaque quartier : dynamique de prix, profil de la demande locative, qualité des infrastructures et potentiel de valorisation.",
        ],
      },
      {
        heading: "Les Almadies & Ngor : le premium absolu",
        paragraphs: [
          "Les Almadies et Ngor constituent le marché le plus premium de Dakar, voire de toute l'Afrique de l'Ouest francophone. Avec leur accès à l'océan Atlantique, leurs restaurants de standing, leurs ambassades et leurs résidences sécurisées, ces quartiers attirent expatriés, cadres supérieurs et diplomates. Le prix au mètre carré dépasse souvent 700 000 FCFA pour les biens de qualité.",
          "Le rendement locatif brut y est modéré (3 à 5 %) compte tenu du niveau des prix d'acquisition, mais la valorisation patrimoniale à long terme est solide. Pour les investisseurs cherchant la sécurité et le prestige, c'est le choix naturel.",
        ],
      },
      {
        heading: "Mermoz & Sacré-Cœur : le meilleur rapport qualité/prix",
        paragraphs: [
          "Mermoz et Sacré-Cœur représentent ce qu'on appelle le 'bon plan' de l'investissement dakarois : des quartiers résidentiels établis, bien équipés (commerces, écoles internationales, cliniques), prisés par les familles de la classe moyenne supérieure et les cadres d'entreprises. Les prix y sont plus abordables qu'aux Almadies (350 000 à 550 000 FCFA/m²) mais la demande locative est forte et régulière.",
          "Le rendement locatif brut oscille entre 5 et 7 %, ce qui est excellent pour Dakar. Une villa de 4 chambres à Mermoz se loue facilement entre 600 000 et 1 000 000 FCFA par mois. Ces quartiers séduisent également les acheteurs cherchant un premier achat résidentiel de qualité.",
        ],
        callout:
          "⭐ Coup de cœur Kasafrik : Mermoz et Sacré-Cœur offrent le meilleur équilibre entre rendement locatif, qualité de vie et potentiel de valorisation pour l'investisseur individuel.",
      },
      {
        heading: "Point E & Fann Résidence : l'élégance universitaire",
        paragraphs: [
          "Ces deux quartiers historiques, situés à proximité de l'Université Cheikh Anta Diop et des grandes institutions dakaroises, conservent une forte attractivité malgré leur ancienneté. Le bâti y est plus ancien mais la rénovation de nombreuses maisons coloniales ou de villas des années 60-70 crée un marché dynamique pour les biens réhabilités.",
          "Les prix au m² varient entre 300 000 et 600 000 FCFA. La demande locative est soutenue par la proximité des universités, des cliniques et des administrations. Les petites surfaces (studios, F2) destinées aux étudiants et jeunes actifs offrent des rendements attractifs de 7 à 9 %.",
        ],
      },
      {
        heading: "Le Plateau : le cœur d'affaires en mutation",
        paragraphs: [
          "Le Plateau, centre historique et d'affaires de Dakar, connaît une profonde mutation. La tertiarisation de l'économie dakaroise renforce la demande de bureaux et de commerces de qualité, tandis que l'immobilier résidentiel de prestige y reste peu développé en raison de la densité urbaine. Les prix y sont parmi les plus élevés de la ville (500 000 à 900 000 FCFA/m² pour les biens de qualité).",
          "L'investissement au Plateau se justifie principalement pour les locaux commerciaux et les bureaux. Le résidentiel y est plus difficile à louer sauf pour des prestations haut de gamme.",
        ],
      },
      {
        heading: "Parcelles Assainies & Liberté : les zones populaires dynamiques",
        paragraphs: [
          "Parcelles Assainies et le quartier Liberté représentent un marché immobilier plus accessible (150 000 à 300 000 FCFA/m²) mais très actif. La forte densité de population et la présence d'une classe moyenne active génèrent une demande locative soutenue, notamment pour les petites surfaces.",
          "Le rendement locatif brut peut atteindre 8 à 10 % pour les biens bien entretenus et correctement positionnés. Ces quartiers sont particulièrement intéressants pour les investisseurs avec des budgets limités cherchant des rendements immédiats.",
        ],
      },
      {
        heading: "Tendances émergentes à surveiller",
        list: [
          "Diamniadio : la nouvelle ville à 30 km de Dakar, portée par les investissements publics (voir notre article dédié).",
          "Thiès : 3e ville du pays, en pleine expansion industrielle — prix encore très abordables.",
          "Saly Portudal : marché touristique et résidentiel secondaire en plein essor sur la Petite Côte.",
          "Mbour : ville côtière à surveiller, portée par le développement du littoral sénégalais.",
        ],
      },
    ],
  },

  "organiser-evenement-senegal": {
    slug: "organiser-evenement-senegal",
    title: "Organiser un événement au Sénégal : tout ce qu'il faut savoir",
    category: "Événements",
    categoryColor: "#C84B2F",
    categoryBg: "#FAE8E3",
    author: "Équipe Kasafrik",
    date: "8 décembre 2025",
    readTime: "9 min",
    tags: ["Événements", "Organisation", "Dakar", "Billetterie"],
    excerpt:
      "Autorisations préfectorales, choix de la salle, billetterie digitale, sécurité... Notre guide complet pour réussir votre événement au Sénégal.",
    sections: [
      {
        paragraphs: [
          "Le Sénégal est un pays de fêtes, de festivals et de rassemblements. Des grandes soirées musicales du Grand Théâtre de Dakar aux forums économiques du King Fahd Palace, en passant par les festivals culturels régionaux, le marché événementiel sénégalais est en pleine effervescence. Mais organiser un événement public au Sénégal ne s'improvise pas : il existe des obligations légales et des démarches administratives incontournables.",
          "Ce guide complet vous accompagne étape par étape pour organiser un événement professionnel, conforme à la réglementation et couronné de succès.",
        ],
      },
      {
        heading: "Les autorisations administratives nécessaires",
        paragraphs: [
          "Tout événement public au Sénégal nécessite une autorisation préalable des autorités compétentes. La démarche principale consiste à déposer une demande d'autorisation auprès du Gouverneur de région ou du Préfet de département selon l'ampleur de l'événement. Ce dossier doit inclure une description de l'événement (nature, date, lieu, nombre de participants prévu), un plan de sécurité, les coordonnées des responsables et une attestation d'assurance.",
          "Pour les événements musicaux ou culturels impliquant des artistes, vous devrez également notifier le Bureau Sénégalais du Droit d'Auteur (BSDA) et vous acquitter des droits d'auteur correspondant au répertoire musical utilisé. Cette obligation concerne aussi bien les concerts en salle que les événements en plein air.",
          "Si votre événement implique la vente d'alcool, une autorisation spéciale est nécessaire. Pour les événements religieux de grande ampleur, la coordination avec les autorités locales et parfois le Ministère de l'Intérieur est recommandée.",
        ],
      },
      {
        heading: "Choisir la bonne salle ou le bon espace",
        paragraphs: [
          "Le choix du lieu est l'une des décisions les plus structurantes de votre événement. Dakar dispose d'une offre variée : le Grand Théâtre National pour les spectacles de prestige (2 400 places), l'Arena du Sénégal à Diamniadio pour les grandes manifestations (15 000 places), le King Fahd Palace pour les conférences et banquets, et de nombreuses salles de taille intermédiaire dans les hôtels et espaces événementiels privés.",
          "Pour les événements en plein air, les plages de Dakar (avec autorisation des collectivités locales), les jardins des hôtels et les stades (sous réserve de disponibilité auprès des fédérations sportives) sont des options populaires. Le Lac Rose, la Corniche Ouest et le Cap-Vert offrent des cadres naturels magnifiques pour des événements premium.",
          "Critères de sélection : capacité d'accueil, accessibilité (transports en commun, parking), disponibilité de la sonorisation et des équipements techniques, services de restauration intégrés, politique de sécurité, et bien sûr le coût de location.",
        ],
      },
      {
        heading: "La billetterie : passer au digital avec Kasafrik",
        paragraphs: [
          "La gestion de la billetterie est un enjeu critique pour tout organisateur. Une billetterie mal gérée génère des files d'attente, des fraudes et une mauvaise expérience pour les participants. La solution Kasafrik Billetterie permet de créer votre événement en ligne, de paramétrer vos types de billets (Standard, VIP, Table VIP, Early Bird...), de fixer vos tarifs et d'ouvrir les ventes en quelques clics.",
          "Chaque billet acheté génère automatiquement un QR code unique envoyé par email et disponible dans l'application Kasafrik. À l'entrée de l'événement, votre équipe utilise le scanner intégré pour valider les billets en temps réel : aucun risque de fraude, aucun billet en double, et un contrôle d'accès fluide même pour plusieurs milliers de participants.",
          "Les paiements sont sécurisés via Wave, Orange Money et carte bancaire. Kasafrik reverse les fonds à l'organisateur dans les 48h suivant l'événement (après déduction de la commission de 3 %).",
        ],
        callout:
          "📱 Avec Kasafrik Billetterie, vos participants reçoivent leur billet QR instantanément après paiement. Fini les queues, les billets papier et les fraudes.",
      },
      {
        heading: "Communication et promotion de votre événement",
        paragraphs: [
          "La promotion d'un événement au Sénégal doit combiner les canaux digitaux et les médias traditionnels pour toucher l'ensemble de votre cible. Sur les réseaux sociaux, Facebook et Instagram restent les plateformes dominantes ; TikTok gagne du terrain, notamment auprès des 18-35 ans. Les groupes WhatsApp sont un outil de diffusion virale à ne pas négliger.",
          "La radio reste un media de masse incontournable au Sénégal, notamment RFM, ZIK FM et TFM Radio pour les événements musicaux et culturels. Les spots radio dans les 15 jours précédant l'événement amplifient significativement la vente de billets.",
          "L'affichage physique (banderoles, panneaux publicitaires sur les axes routiers fréquentés) conserve une efficacité réelle, notamment pour les événements grand public. Prévoyez votre plan de communication au moins 4 semaines avant l'événement.",
        ],
      },
      {
        heading: "Sécurité et logistique : les incontournables",
        paragraphs: [
          "La sécurité est un aspect non négociable pour tout événement public. Au-delà de l'autorisation préfectorale qui intègre un plan de sécurité, vous devez prévoir un dispositif de sécurité privée proportionné à l'audience attendue. Pour les grands événements, la coordination avec la police nationale et les sapeurs-pompiers est obligatoire.",
          "Sur le plan logistique, assurez-vous de la disponibilité des sanitaires en nombre suffisant (règle : 1 toilette pour 100 participants), des issues de secours clairement signalisées, d'un plan d'évacuation testé par votre équipe, et d'un accès facilité pour les secours.",
          "La gestion des flux d'entrée est souvent sous-estimée : prévoyez des couloirs d'accès séparés selon les types de billets (Standard, VIP), des points d'accueil bien visibles et un nombre suffisant de scanners pour éviter les temps d'attente excessifs.",
        ],
      },
      {
        heading: "Budget type pour un événement de 500 personnes à Dakar",
        list: [
          "Location de salle : 500 000 à 2 000 000 FCFA selon le lieu et la durée.",
          "Sonorisation et éclairage : 300 000 à 1 500 000 FCFA.",
          "Sécurité privée : 150 000 à 500 000 FCFA.",
          "Communication et marketing : 200 000 à 800 000 FCFA.",
          "Restauration (si applicable) : variable selon le format.",
          "Droits BSDA (musique enregistrée) : à partir de 50 000 FCFA.",
          "Gestion billetterie Kasafrik : 3 % des recettes de billetterie.",
        ],
      },
    ],
  },
};

/* ─── Slug aliases (pour compatibilité avec les liens du blog listing) ────── */

const slugAliases: Record<string, string> = {
  "diamniadio-investir-maintenant-ou-attendre": "diamniadio-nouvelle-ville-investir",
  "organiser-evenement-senegal-guide": "organiser-evenement-senegal",
};

/* ─── Sidebar data ────────────────────────────────────────────────────────── */

const recentArticles = [
  { slug: "marche-immobilier-dakar-2026", title: "Le marché immobilier à Dakar en 2026", category: "Immobilier", date: "10 janv. 2026" },
  { slug: "vendre-terrain-senegal-guide", title: "Comment vendre son terrain au Sénégal", category: "Immobilier", date: "5 janv. 2026" },
  { slug: "diamniadio-nouvelle-ville-investir", title: "Diamniadio : investir maintenant ou attendre ?", category: "Immobilier", date: "28 déc. 2025" },
  { slug: "location-vs-achat-dakar-2026", title: "Location vs achat à Dakar", category: "Conseils", date: "20 déc. 2025" },
  { slug: "quartiers-prises-dakar-investir", title: "Les quartiers prisés de Dakar pour investir", category: "Immobilier", date: "15 déc. 2025" },
  { slug: "organiser-evenement-senegal", title: "Organiser un événement au Sénégal", category: "Événements", date: "8 déc. 2025" },
];

const sidebarCategories = [
  { label: "Immobilier", count: 8, color: "#C8922A", bg: "#F5E6C8" },
  { label: "Événements", count: 4, color: "#C84B2F", bg: "#FAE8E3" },
  { label: "Conseils", count: 2, color: "#1A1A2E", bg: "#E8E8F0" },
  { label: "Hôtels", count: 2, color: "#4A7C59", bg: "#D6EDE0" },
  { label: "Tendances", count: 1, color: "#635BFF", bg: "#F0EFFF" },
];

/* ─── generateStaticParams ────────────────────────────────────────────────── */

export function generateStaticParams() {
  const primary = Object.keys(articles);
  const aliases = Object.keys(slugAliases);
  return [...primary, ...aliases].map((slug) => ({ slug }));
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resolvedSlug = slugAliases[slug] ?? slug;
  const article = articles[resolvedSlug];

  if (!article) notFound();

  const IconMap: Record<string, React.ElementType> = {
    Immobilier: Home,
    Événements: Calendar,
    Conseils: Lightbulb,
    Hôtels: Building2,
    Tendances: TrendingUp,
  };
  const CategoryIcon = IconMap[article.category] ?? BookOpen;

  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1A1A2E] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
            <Link href="/" className="hover:text-[#C8922A] transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-[#C8922A] transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400 truncate max-w-xs">{article.title}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg"
                style={{ backgroundColor: article.categoryBg, color: article.categoryColor }}
              >
                <CategoryIcon className="w-3 h-3" />
                {article.category}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime} de lecture
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-5">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <div className="w-6 h-6 bg-[#C8922A] rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-white" />
                </div>
                {article.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {article.date}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Image placeholder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-1">
        <div
          className="h-48 md:h-64 rounded-2xl flex flex-col items-center justify-center gap-3 relative overflow-hidden shadow-lg"
          style={{ backgroundColor: article.categoryBg }}
        >
          <div
            className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full opacity-20"
            style={{ backgroundColor: article.categoryColor }}
          />
          <div
            className="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-10"
            style={{ backgroundColor: article.categoryColor }}
          />
          <CategoryIcon
            className="w-14 h-14 relative z-10"
            style={{ color: article.categoryColor }}
          />
          <span
            className="text-sm font-bold uppercase tracking-widest relative z-10"
            style={{ color: article.categoryColor }}
          >
            {article.category}
          </span>
        </div>
      </div>

      {/* Content + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Article body ── */}
          <main className="lg:col-span-2">
            {/* Excerpt */}
            <p className="text-base text-gray-600 leading-relaxed border-l-4 border-[#C8922A] pl-4 mb-8 italic">
              {article.excerpt}
            </p>

            {/* Sections */}
            <div className="space-y-8">
              {article.sections.map((section, i) => (
                <div key={i}>
                  {section.heading && (
                    <h2 className="text-xl font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                      <span
                        className="w-1.5 h-6 rounded-full inline-block shrink-0"
                        style={{ backgroundColor: article.categoryColor }}
                      />
                      {section.heading}
                    </h2>
                  )}

                  {section.paragraphs?.map((p, j) => (
                    <p key={j} className="text-sm text-gray-700 leading-relaxed mb-4">
                      {p}
                    </p>
                  ))}

                  {section.list && (
                    <ul className="space-y-2 my-4">
                      {section.list.map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-gray-700">
                          <span
                            className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: article.categoryColor }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.callout && (
                    <div
                      className="rounded-xl p-4 text-sm font-medium my-4 border-l-4"
                      style={{
                        backgroundColor: article.categoryBg,
                        borderColor: article.categoryColor,
                        color: article.categoryColor,
                      }}
                    >
                      {section.callout}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-gray-200">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-600"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Share */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5" /> Partager
              </span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=https://kasafrik.sn/blog/${article.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-[#1877F2] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=https://kasafrik.sn/blog/${article.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-[#1DA1F2] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Twitter / X
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(article.title + " — https://kasafrik.sn/blog/" + article.slug)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-[#25D366] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                WhatsApp
              </a>
            </div>

            {/* Back to blog */}
            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#C8922A] hover:text-[#8A6118] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour au blog
              </Link>
            </div>
          </main>

          {/* ── Sidebar ── */}
          <aside className="space-y-6">

            {/* Recent articles */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">
              <h3 className="text-sm font-bold text-[#1A1A2E] mb-4 uppercase tracking-wider">
                Articles récents
              </h3>
              <div className="space-y-4">
                {recentArticles
                  .filter((a) => a.slug !== resolvedSlug)
                  .slice(0, 5)
                  .map((a) => {
                    const AIcon = IconMap[a.category] ?? BookOpen;
                    const cat = sidebarCategories.find((c) => c.label === a.category);
                    return (
                      <Link
                        key={a.slug}
                        href={`/blog/${a.slug}`}
                        className="flex items-start gap-3 group"
                      >
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: cat?.bg ?? "#F5E6C8" }}
                        >
                          <AIcon
                            className="w-4 h-4"
                            style={{ color: cat?.color ?? "#C8922A" }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-[#1A1A2E] leading-snug group-hover:text-[#C8922A] transition-colors line-clamp-2">
                            {a.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">{a.date}</p>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-[#1A1A2E] mb-4 uppercase tracking-wider">
                Catégories
              </h3>
              <div className="space-y-2">
                {sidebarCategories.map((cat) => (
                  <Link
                    key={cat.label}
                    href="/blog"
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#F5E6C8] transition-all group"
                  >
                    <span className="text-sm text-gray-600 group-hover:text-[#C8922A] font-medium transition-colors">
                      {cat.label}
                    </span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-md"
                      style={{ backgroundColor: cat.bg, color: cat.color }}
                    >
                      {cat.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-[#1A1A2E] rounded-2xl p-5 text-center">
              <div className="w-10 h-10 bg-[#C8922A]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Tag className="w-5 h-5 text-[#C8922A]" />
              </div>
              <p className="text-white font-bold text-sm mb-1">Newsletter Kasafrik</p>
              <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                Recevez chaque semaine les meilleures analyses immobilières.
              </p>
              <input
                type="email"
                placeholder="votre@email.com"
                className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-500 text-xs focus:outline-none focus:ring-2 focus:ring-[#C8922A] mb-2"
              />
              <button className="w-full py-2 bg-[#C8922A] hover:bg-[#8A6118] text-white text-xs font-semibold rounded-lg transition-all">
                S&apos;abonner
              </button>
            </div>

            {/* Kasafrik CTA */}
            <div
              className="rounded-2xl p-5 text-center border"
              style={{ backgroundColor: article.categoryBg, borderColor: article.categoryColor + "40" }}
            >
              <CategoryIcon className="w-8 h-8 mx-auto mb-2" style={{ color: article.categoryColor }} />
              <p className="font-bold text-sm mb-1" style={{ color: article.categoryColor }}>
                {article.category === "Événements"
                  ? "Publiez votre événement"
                  : "Trouvez un bien immobilier"}
              </p>
              <p className="text-xs text-gray-500 mb-3">
                {article.category === "Événements"
                  ? "Gérez votre billetterie sur Kasafrik."
                  : "Des milliers d'annonces vérifiées au Sénégal."}
              </p>
              <Link
                href={article.category === "Événements" ? "/evenements" : "/immobilier"}
                className="inline-flex items-center gap-1 text-xs font-bold rounded-lg px-4 py-2 text-white transition-all hover:opacity-90"
                style={{ backgroundColor: article.categoryColor }}
              >
                Explorer <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
