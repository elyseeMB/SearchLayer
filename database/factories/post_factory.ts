import factory from '@adonisjs/lucid/factories'
import Post from '#models/post'
import stringHelpers from '@adonisjs/core/helpers/string'

const posts = [
  {
    title: 'Les dernières avancées en intelligence artificielle',
    description:
      "Découvrez les innovations récentes qui transforment notre façon d'interagir avec la technologie.",
    body: "L'intelligence artificielle connaît une progression exponentielle ces derniers mois. Les modèles de langage comme GPT-4, Claude 3 et Gemini révolutionnent déjà de nombreux secteurs professionnels. Des entreprises du monde entier investissent massivement dans ces technologies pour automatiser leurs processus et améliorer leur productivité.\n\nLes experts prévoient que d'ici 2025, l'IA sera intégrée à plus de 80% des outils professionnels courants. Cette transformation soulève cependant des questions importantes sur l'avenir du travail et les compétences nécessaires pour prospérer dans ce nouvel environnement technologique.\n\nLes chercheurs travaillent également sur des solutions pour rendre l'IA plus éthique et transparente, notamment dans le domaine médical où les décisions automatisées peuvent avoir des conséquences directes sur la santé des patients.",
    pageTitle: 'Avancées IA 2024',
  },
  {
    title: 'Guide complet du développement web moderne',
    description:
      'Tout ce que vous devez savoir sur les frameworks JavaScript et les meilleures pratiques de développement.',
    body: "Le développement web a évolué de manière spectaculaire au cours de la dernière décennie. Les frameworks comme React, Vue.js et Angular ont transformé notre approche de la création d'interfaces utilisateur complexes et interactives.\n\nL'écosystème JavaScript continue de s'enrichir avec de nouveaux outils comme Next.js, Nuxt.js et SvelteKit qui simplifient le développement d'applications full-stack. Ces frameworks intègrent des fonctionnalités comme le rendu côté serveur, le routing automatique et l'optimisation des performances.\n\nLes développeurs modernes doivent également maîtriser des concepts comme les Progressive Web Apps (PWA), les WebAssembly et les API modernes. La demande pour des compétences en développement web reste particulièrement élevée, avec des salaires moyens qui continuent d'augmenter dans ce secteur.",
    pageTitle: 'Développement Web Guide',
  },
  {
    title: 'Les tendances marketing digital pour 2024',
    description:
      'Stratégies et innovations qui marqueront le paysage du marketing digital cette année.',
    body: "Le marketing digital continue d'évoluer rapidement avec l'émergence de nouvelles technologies et l'évolution des comportements des consommateurs. L'IA générative transforme déjà la création de contenu, permettant aux marketeurs de produire des textes, images et vidéos personnalisés à grande échelle.\n\nLe marketing d'influence gagne en maturité avec des collaborations plus authentiques et des mesures de ROI plus précises. Les micro-influenceurs deviennent particulièrement intéressants pour les marques cherchant à atteindre des niches spécifiques avec un budget limité.\n\nL'expérience client devient le centre de toutes les stratégies marketing. Les entreprises investissent dans des solutions de personnalisation avancées, utilisant des données comportementales pour adapter chaque point de contact du parcours client.",
    pageTitle: 'Marketing Digital 2024',
  },
  {
    title: 'Cybersécurité : Protéger vos données en entreprise',
    description:
      'Mesures essentielles et bonnes pratiques pour sécuriser les informations sensibles de votre organisation.',
    body: "La cybersécurité est devenue un enjeu critique pour toutes les entreprises, quelle que soit leur taille. Les attaques par ransomware ont augmenté de 150% depuis 2020, coûtant en moyenne 4,5 millions de dollars par incident aux organisations touchées.\n\nLa protection des données commence par une évaluation complète des risques et la mise en place de politiques de sécurité claires. Les entreprises doivent notamment investir dans des solutions de détection et de réponse aux menaces (EDR), former régulièrement leurs employés aux bonnes pratiques de sécurité, et maintenir des plans de réponse aux incidents.\n\nLe zero trust architecture devient la norme pour la sécurité des réseaux d'entreprise. Cette approche considère que aucun utilisateur ou appareil ne doit être automatiquement fiable, nécessitant une vérification systématique à chaque accès.",
    pageTitle: 'Cybersécurité Entreprise',
  },
  {
    title: "L'avenir du travail hybride",
    description:
      'Comment les entreprises adaptent leurs organisations pour concilier télétravail et présentiel.',
    body: "Le travail hybride est devenu le nouveau standard pour de nombreuses entreprises après la pandémie. Cette transition nécessite une refonte complète des méthodes de management, des outils de collaboration et de la culture d'entreprise.\n\nLes études montrent que 70% des employés préfèrent un modèle hybride, combinant 2-3 jours de télétravail par semaine. Les entreprises qui adoptent ce mode de fonctionnement rapportent une augmentation de la productivité et une meilleure rétention des talents.\n\nLes défis restent nombreux : maintenir la cohésion d'équipe, garantir l'équité entre employés distants et présents, et mesurer la performance de manière objective. Les investissements dans des outils de collaboration visuelle et des espaces de travail flexibles deviennent essentiels.",
    pageTitle: 'Travail Hybride Futur',
  },
  {
    title: 'Innovations dans les énergies renouvelables',
    description:
      'Découvertes récentes qui pourraient accélérer la transition énergétique mondiale.',
    body: "Le secteur des énergies renouvelables connaît une période d'innovation sans précédent. Les panneaux solaires nouvelle génération atteignent des rendements supérieurs à 25%, tandis que les éoliennes offshore deviennent plus puissantes et plus efficaces.\n\nLe stockage d'énergie constitue le prochain grand défi. Les nouvelles batteries lithium-ion offrent des densités énergétiques améliorées, mais les chercheurs explorent également des alternatives comme les batteries à flux, l'hydrogène vert et le stockage par gravité.\n\nL'intelligence artificielle optimise déjà la gestion des réseaux électriques, prévoyant la production et la consommation pour équilibrer l'offre et la demande. Ces innovations pourraient permettre d'atteindre 100% d'énergies renouvelables dans de nombreux pays d'ici 2035.",
    pageTitle: 'Énergies Renouvelables 2024',
  },
  {
    title: 'La révolution de la santé numérique',
    description: "Comment les technologies transforment la médecine et l'accès aux soins.",
    body: "La santé numérique (e-health) redéfinit complètement la relation patient-médecin. La télémédecine a explosé pendant la pandémie et continue de se développer, permettant des consultations à distance et un suivi plus régulier des patients chroniques.\n\nLes objets connectés et applications mobiles permettent un auto-suivi précis des paramètres de santé : rythme cardiaque, tension, glycémie, sommeil. Ces données aident les médecins à poser des diagnostics plus précis et à personnaliser les traitements.\n\nL'IA médicale révolutionne également l'imagerie médicale, détectant des anomalies avec une précision supérieure à l'œil humain dans certains domaines. Les chirurgiens assistés par robot réalisent des interventions moins invasives avec une meilleure précision.",
    pageTitle: 'Santé Numérique Innovation',
  },
  {
    title: 'Les cryptomonnaies en 2024',
    description: "Analyse du marché des actifs numériques et des perspectives d'adoption massive.",
    body: "Le marché des cryptomonnaies montre des signes de maturation avec l'approbation récente des ETF Bitcoin aux États-Unis. Cette ouverture aux investisseurs institutionnels pourrait marquer un tournant dans l'adoption massive des actifs numériques.\n\nLa technologie blockchain continue d'évoluer avec des solutions comme Ethereum 2.0 qui réduisent considérablement la consommation énergétique. Les applications décentralisées (DeFi) proposent des alternatives innovantes aux services financiers traditionnels.\n\nLes banques centrales explorent activement les monnaies numériques (CBDC), avec la Chine déjà en phase avancée avec son yuan numérique. Ces développements pourraient redéfinir le système financier mondial dans les années à venir.",
    pageTitle: 'Cryptomonnaies 2024',
  },
  {
    title: "L'essor du commerce électronique durable",
    description:
      "Comment les marques intègrent l'éco-responsabilité dans leur stratégie e-commerce.",
    body: "Le commerce électronique fait face à un défi majeur : concilier croissance rapide et impact environnemental. Les consommateurs sont de plus en plus attentifs à l'origine des produits, aux conditions de production et à l'empreinte carbone des livraisons.\n\nLes marques innovantes proposent des solutions comme l'emballage réutilisable, la livraison groupée, et la compensation carbone automatique. Certaines expérimentent même des dark stores urbains pour réduire les distances de livraison.\n\nL'économie circulaire gagne également du terrain dans l'e-commerce avec des plateformes de revente, de réparation et de location. Ces modèles pourraient représenter jusqu'à 25% du commerce électronique d'ici 2030.",
    pageTitle: 'E-Commerce Durable',
  },
  {
    title: "L'éducation transformée par la technologie",
    description: "Nouveaux outils et méthodes pédagogiques qui révolutionnent l'apprentissage.",
    body: "La technologie transforme profondément le paysage de l'éducation. Les plateformes d'apprentissage en ligne comme Coursera et edX ont démocratisé l'accès à des formations de qualité, tandis que les outils d'IA personnalisent les parcours d'apprentissage.\n\nLa réalité virtuelle et augmentée ouvrent de nouvelles possibilités pédagogiques, permettant des simulations immersives pour la formation médicale, l'architecture ou l'ingénierie. Ces technologies rendent l'apprentissage plus concret et mémorable.\n\nL'analyse des données d'apprentissage permet aux enseignants d'identifier rapidement les élèves en difficulté et d'adapter leurs méthodes. Les systèmes de tutorat intelligents peuvent fournir un soutien individualisé 24/7, complétant l'enseignement traditionnel.",
    pageTitle: 'Éducation Technologie',
  },
]

export const PostFactory = factory
  .define(Post, async ({ faker }) => {
    const random = faker.helpers.arrayElement(posts)
    const variation = faker.number.int({ min: 0, max: 2 })

    let title = random.title
    let description = random.description
    let body = random.body
    let pageTitle = random.pageTitle

    if (variation === 1) {
      title = `${title} : ${faker.lorem.words({ min: 2, max: 4 })}`
      description = `${description} ${faker.lorem.sentence()}`
      body = `${body}\n\n${faker.lorem.paragraphs(2)}`
    } else if (variation === 2) {
      title = `${faker.lorem.words({ min: 2, max: 3 })} et ${title.toLowerCase()}`
      description = `${faker.lorem.sentence()} ${description}`
      body = `${faker.lorem.paragraphs(1)}\n\n${body}`
    }

    return {
      title: stringHelpers.titleCase(title),
      description: description,
      body: body,
      pageTitle: stringHelpers.titleCase(pageTitle),
      slug: stringHelpers.slug(title) + '-' + faker.string.alphanumeric({ length: 6 }),
    }
  })
  .build()
