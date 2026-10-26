export interface InorganicFunctionData {
  id: string;
  name: {
    pt: string;
    en: string;
    ru: string;
  };
  arrheniusDefinition: {
    pt: string;
    en: string;
    ru: string;
  };
  classification: {
    title: string;
    types: Array<{name: string; example: string; desc: string}>;
  };
  phBehavior: {
    phRange: string;
    litmusPaper: string;
    phenolphthalein: string;
  };
  neutralizationReaction: {
    equation: string;
    description: string;
  };
  examples: Array<{
    name: string;
    formula: string;
    application: string;
  }>;
  wikiUrl: string;
  molecule3D: {
    name: string;
    formula: string;
    atoms: Array<{
      symbol: string;
      name: string;
      pos: [number, number, number];
      color: string;
      radius: number;
    }>;
    bonds: Array<{
      from: number;
      to: number;
      order?: 1 | 2;
    }>;
  };
}

export const INORGANIC_FUNCTIONS: InorganicFunctionData[] = [
  {
    id: 'acidos',
    name: {
      pt: 'Ácidos',
      en: 'Acids',
      ru: 'Кислоты',
    },
    arrheniusDefinition: {
      pt: 'Substâncias que em solução aquosa se ionizam, liberando exclusivamente como cátions o íon hidrogênio (H⁺ ou H₃O⁺ hidrônio).',
      en: 'Substances that ionize in aqueous solution, releasing solely hydrogen cations (H⁺ or hydronium H₃O⁺).',
      ru: 'Сложные вещества, молекулы которых содержат атомы водорода, способные замещаться на атомы металлов, диссоциирующие с образованием катионов H⁺.',
    },
    classification: {
      title: 'Classificação dos Ácidos:',
      types: [
        { name: 'Hidrácidos', example: 'HCl, HBr, HCN', desc: 'Não contêm oxigênio na fórmula molecular.' },
        { name: 'Oxiácidos', example: 'H₂SO₄, HNO₃, H₃PO₄', desc: 'Contêm oxigênio ligado ao elemento central.' },
        { name: 'Monoácidos', example: 'HCl, HNO₃', desc: 'Possuem 1 hidrogênio ionizável.' },
        { name: 'Diácidos e Poliácidos', example: 'H₂SO₄ (2 H⁺), H₃PO₄ (3 H⁺)', desc: 'Possuem 2 ou mais hidrogênios ionizáveis.' },
      ],
    },
    phBehavior: {
      phRange: 'pH < 7,0 (Soluções Ácidas)',
      litmusPaper: 'Torna o papel de tornassol azul em Vermelho',
      phenolphthalein: 'Permanece incolor',
    },
    neutralizationReaction: {
      equation: 'HCl + NaOH → NaCl + H₂O',
      description: 'Ácido Clorídrico neutraliza Hidróxido de Sódio formando Sal de Cozinha e Água.',
    },
    examples: [
      { name: 'Ácido Clorídrico', formula: 'HCl', application: 'Presente no suco gástrico estomacal e decapagem industrial de aços.' },
      { name: 'Ácido Sulfúrico', formula: 'H₂SO₄', application: 'O reagente industrial mais produzido do mundo; baterias automotivas e fertilizantes.' },
      { name: 'Ácido Nítrico', formula: 'HNO₃', application: 'Produção de fertilizantes agrícolas de nitrato e explosivos industriais.' },
      { name: 'Ácido Fosfórico', formula: 'H₃PO₄', application: 'Acidulante em refrigerantes de cola e adubos fosfatados.' },
    ],
    wikiUrl: 'https://pt.wikipedia.org/wiki/Ácido',
    molecule3D: {
      name: 'Ácido Clorídrico',
      formula: 'HCl',
      atoms: [
        { symbol: 'H', name: 'Hidrogênio (H⁺)', pos: [-0.85, 0, 0], color: '#f8fafc', radius: 0.3 },
        { symbol: 'Cl', name: 'Cloro (Cl⁻)', pos: [0.85, 0, 0], color: '#22c55e', radius: 0.62 },
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
      ],
    },
  },
  {
    id: 'bases',
    name: {
      pt: 'Bases (Hidróxidos)',
      en: 'Bases (Hydroxides)',
      ru: 'Основания (Гидроксиды)',
    },
    arrheniusDefinition: {
      pt: 'Substâncias que em solução aquosa sofrem dissociação iônica, liberando como único ânion o íon hidróxido (OH⁻).',
      en: 'Substances that dissociate in aqueous solution, releasing solely hydroxide anions (OH⁻).',
      ru: 'Сложные вещества, при диссоциации которых в водном растворе в качестве анионов образуются только гидроксид-ионы OH⁻.',
    },
    classification: {
      title: 'Classificação das Bases:',
      types: [
        { name: 'Bases Fortes', example: 'NaOH, KOH, Ca(OH)₂', desc: 'Bases de metais alcalinos e alcalino-terrosos (grau de dissociação α ≈ 100%).' },
        { name: 'Bases Fracas', example: 'NH₄OH, Al(OH)₃, Fe(OH)₃', desc: 'Bases de metais de transição e amônia aquosa (α < 5%).' },
        { name: 'Solúveis', example: 'NaOH, KOH', desc: 'Solubilidade muito alta em água.' },
        { name: 'Praticamente Insolúveis', example: 'Mg(OH)₂, Fe(OH)₃', desc: 'Formam precipitados ou suspensões leitosas.' },
      ],
    },
    phBehavior: {
      phRange: 'pH > 7,0 (Soluções Básicas / Alcalinas)',
      litmusPaper: 'Torna o papel de tornassol vermelho em Azul',
      phenolphthalein: 'Torna a fenolftaleína Rosa-carmim vibrante',
    },
    neutralizationReaction: {
      equation: 'H⁺ (aq) + OH⁻ (aq) → H₂O (l)',
      description: 'A essência da reação de neutralização: próton e hidróxido formam água líquida estável.',
    },
    examples: [
      { name: 'Hidróxido de Sódio (Soda Cáustica)', formula: 'NaOH', application: 'Desentupidor de encanamentos, fabricação de sabões e sabonetes.' },
      { name: 'Hidróxido de Cálcio (Cal Extinta)', formula: 'Ca(OH)₂', application: 'Argamassas na construção civil, caiação e correção de acidez de solos agrícolas.' },
      { name: 'Hidróxido de Magnésio', formula: 'Mg(OH)₂', application: 'Leite de magnésia: antiácido estomacal suave e laxante.' },
      { name: 'Hidróxido de Amônio (Amoníaco)', formula: 'NH₄OH', application: 'Produtos de limpeza pesada desengordurante e fertilizantes.' },
    ],
    wikiUrl: 'https://pt.wikipedia.org/wiki/Base_(química)',
    molecule3D: {
      name: 'Hidróxido de Sódio',
      formula: 'NaOH',
      atoms: [
        { symbol: 'Na', name: 'Sódio (Na⁺)', pos: [-1.2, 0, 0], color: '#a855f7', radius: 0.5 },
        { symbol: 'O', name: 'Oxigênio (OH⁻)', pos: [0.3, 0, 0], color: '#ef4444', radius: 0.44 },
        { symbol: 'H', name: 'Hidrogênio', pos: [1.1, 0, 0], color: '#f8fafc', radius: 0.26 },
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 1 },
      ],
    },
  },
  {
    id: 'oxidos',
    name: {
      pt: 'Óxidos',
      en: 'Oxides',
      ru: 'Оксиды',
    },
    arrheniusDefinition: {
      pt: 'Compostos binários (formados por exatamente dois elementos) em que o oxigênio é o elemento mais eletronegativo (NOX = -2).',
      en: 'Binary compounds (composed of two elements) in which oxygen is the most electronegative element with an oxidation state of -2.',
      ru: 'Бинарные химические соединения, состоящие из кислорода в степени окисления -2 и другого химического элемента.',
    },
    classification: {
      title: 'Classificação dos Óxidos:',
      types: [
        { name: 'Óxidos Ácidos (Anidridos)', example: 'CO₂, SO₃, NO₂', desc: 'Reagem com água formando ácidos; reagem com bases formando sal e água (chuva ácida).' },
        { name: 'Óxidos Básicos', example: 'CaO, Na₂O, BaO', desc: 'Reagem com água formando bases; reagem com ácidos formando sal e água.' },
        { name: 'Óxidos Neutros', example: 'CO, NO, N₂O', desc: 'Não reagem com água, ácidos nem bases.' },
        { name: 'Óxidos Anfóteros', example: 'Al₂O₃, ZnO', desc: 'Comportam-se como ácidos diante de bases fortes e como bases diante de ácidos fortes.' },
        { name: 'Peróxidos', example: 'H₂O₂, Na₂O₂', desc: 'Possuem a ponte oxigênio-oxigênio (—O—O—) com NOX do O = -1.' },
      ],
    },
    phBehavior: {
      phRange: 'Variável: Óxidos ácidos geram pH < 7; Óxidos básicos geram pH > 7',
      litmusPaper: 'CO₂ acidifica água (vermelho); CaO torna a água alcalina (azul)',
      phenolphthalein: 'Soluções de óxidos básicos ficam rosas',
    },
    neutralizationReaction: {
      equation: 'CO₂ + Ca(OH)₂ → CaCO₃ ↓ + H₂O',
      description: 'Gás carbônico borbulhado em água de cal forma precipitado branco de calcário.',
    },
    examples: [
      { name: 'Dióxido de Carbono', formula: 'CO₂', application: 'Gás da fotossíntese, efervescência de refrigerantes e extintores de incêndio.' },
      { name: 'Óxido de Cálcio (Cal Virgem)', formula: 'CaO', application: 'Fabricação de cimento, argamassa e neutralização de solos.' },
      { name: 'Dióxido de Silício (Sílica)', formula: 'SiO₂', application: 'Principal componente da areia de praia, vidro e microchips de computador.' },
      { name: 'Óxido de Zinco', formula: 'ZnO', application: 'Pomadas cicatrizantes e protetores solares refletores de raios UV.' },
    ],
    wikiUrl: 'https://pt.wikipedia.org/wiki/Óxido',
    molecule3D: {
      name: 'Dióxido de Carbono',
      formula: 'CO₂',
      atoms: [
        { symbol: 'C', name: 'Carbono central', pos: [0, 0, 0], color: '#475569', radius: 0.42 },
        { symbol: 'O', name: 'Oxigênio 1', pos: [-1.4, 0, 0], color: '#ef4444', radius: 0.45 },
        { symbol: 'O', name: 'Oxigênio 2', pos: [1.4, 0, 0], color: '#ef4444', radius: 0.45 },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 2 },
      ],
    },
  },
  {
    id: 'sais',
    name: {
      pt: 'Sais',
      en: 'Salts',
      ru: 'Соли',
    },
    arrheniusDefinition: {
      pt: 'Compostos iônicos que em solução aquosa se dissociam liberando pelo menos um cátion diferente de H⁺ e pelo menos um ânion diferente de OH⁻.',
      en: 'Ionic compounds that dissociate in aqueous solution, releasing at least one cation other than H⁺ and at least one anion other than OH⁻.',
      ru: 'Сложные вещества, состоящие из катионов металлов и анионов кислотных остатков.',
    },
    classification: {
      title: 'Classificação dos Sais:',
      types: [
        { name: 'Sais Normais / Neutros', example: 'NaCl, CaCO₃, K₂SO₄', desc: 'Não possuem H⁺ nem OH⁻ residuais ionizáveis.' },
        { name: 'Hidrogenossais (Ácidos)', example: 'NaHCO₃, NaHSO₄', desc: 'Possuem hidrogênios ionizáveis na estrutura do ânion.' },
        { name: 'Hidroxissais (Básicos)', example: 'Al(OH)Cl₂, Mg(OH)Cl', desc: 'Possuem ânions hidróxido OH⁻ na rede cristalina.' },
        { name: 'Sais Hidratados', example: 'CuSO₄ · 5H₂O, CaSO₄ · 2H₂O', desc: 'Possuem moléculas de água de cristalização retidas no retículo.' },
      ],
    },
    phBehavior: {
      phRange: 'Variável: Sais neutros (pH ≈ 7), sais de ácido forte e base fraca (pH < 7), base forte e ácido fraco (pH > 7)',
      litmusPaper: 'NaCl = neutro; NaHCO₃ = levemente alcalino (azul)',
      phenolphthalein: 'Solução de Na₂CO₃ fica rosa devido à hidrólise salina alcalina',
    },
    neutralizationReaction: {
      equation: 'HCl + NaOH → NaCl + H₂O',
      description: 'Reação estequiométrica clássica de formação de sal por neutralização total.',
    },
    examples: [
      { name: 'Cloreto de Sódio (Sal de Cozinha)', formula: 'NaCl', application: 'Tempero e conservação de alimentos, soro fisiológico 0,9% e produção de cloro gasoso.' },
      { name: 'Bicarbonato de Sódio', formula: 'NaHCO₃', application: 'Fermento químico para bolos, antiácido estomacal e extintores de pó químico.' },
      { name: 'Carbonato de Cálcio', formula: 'CaCO₃', application: 'Mármore, calcário, giz escolar, conchas de moluscos e casca do ovo.' },
      { name: 'Sulfato de Cálcio (Gesso)', formula: 'CaSO₄ · 2H₂O', application: 'Imobilização médica de fraturas ósseas, forros e molduras na construção civil.' },
    ],
    wikiUrl: 'https://pt.wikipedia.org/wiki/Sal_(química)',
    molecule3D: {
      name: 'Cloreto de Sódio',
      formula: 'NaCl',
      atoms: [
        { symbol: 'Na', name: 'Cátion Sódio (Na⁺)', pos: [-1.1, 0, 0], color: '#a855f7', radius: 0.48 },
        { symbol: 'Cl', name: 'Ânion Cloro (Cl⁻)', pos: [1.1, 0, 0], color: '#22c55e', radius: 0.62 },
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
      ],
    },
  },
];
