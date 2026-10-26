export interface OrganicFunctionData {
  id: string;
  name: {
    pt: string;
    en: string;
    ru: string;
  };
  functionalGroup: string;
  structuralFormula: string;
  generalFormula: string;
  iupacSuffix: string;
  description: {
    pt: string;
    en: string;
    ru: string;
  };
  representativeExample: {
    name: string;
    formula: string;
    structure: string;
    uses: string;
  };
  properties: {
    polarity: string;
    boilingPointTrend: string;
    intermolecularForces: string;
  };
  wikiUrl: string;
  molecule3D: {
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

export const ORGANIC_OXYGEN_FUNCTIONS: OrganicFunctionData[] = [
  {
    id: 'alcoois',
    name: {
      pt: 'Álcoois',
      en: 'Alcohols',
      ru: 'Спирты',
    },
    functionalGroup: 'Hidroxila (—OH) ligada a carbono saturado (sp³)',
    structuralFormula: 'R—OH',
    generalFormula: 'CₙH₂ₙ₊₁OH',
    iupacSuffix: '-ol (ex: Etanol, Metanol)',
    description: {
      pt: 'Compostos que contêm um ou mais grupos hidroxila (—OH) ligados diretamente a carbonos saturados. Capazes de formar fortes pontes de hidrogênio intermoleculares.',
      en: 'Compounds containing one or more hydroxyl groups (—OH) bonded to saturated carbon atoms. Capable of strong intermolecular hydrogen bonding.',
      ru: 'Соединения, содержащие одну или несколько гидроксильных групп (—OH), связанных с насыщенным атомом углерода.',
    },
    representativeExample: {
      name: 'Etanol (Álcool Etílico)',
      formula: 'C₂H₅OH',
      structure: 'CH₃—CH₂—OH',
      uses: 'Combustível automotivo renovável, desinfetante antisséptico 70%, bebidas e solvente industrial.',
    },
    properties: {
      polarity: 'Polar (região —OH polar e cadeia carbônica apolar)',
      boilingPointTrend: 'Elevado ponto de ebulição devido a ligações de hidrogênio',
      intermolecularForces: 'Ligações de hidrogênio e forças de London',
    },
    wikiUrl: 'https://pt.wikipedia.org/wiki/Álcool',
    molecule3D: {
      atoms: [
        { symbol: 'C', name: 'Carbono 1', pos: [-0.9, 0, 0], color: '#475569', radius: 0.4 },
        { symbol: 'C', name: 'Carbono 2', pos: [0.4, 0, 0], color: '#475569', radius: 0.4 },
        { symbol: 'O', name: 'Oxigênio', pos: [1.3, 0.7, 0], color: '#ef4444', radius: 0.44 },
        { symbol: 'H', name: 'Hidrogênio (OH)', pos: [2.1, 0.3, 0], color: '#f8fafc', radius: 0.25 },
        { symbol: 'H', name: 'Hidrogênio C1', pos: [-1.4, -0.9, 0], color: '#f8fafc', radius: 0.25 },
        { symbol: 'H', name: 'Hidrogênio C1', pos: [-1.4, 0.9, 0], color: '#f8fafc', radius: 0.25 },
        { symbol: 'H', name: 'Hidrogênio C2', pos: [0.4, -0.9, 0], color: '#f8fafc', radius: 0.25 },
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 },
        { from: 0, to: 5, order: 1 },
        { from: 1, to: 6, order: 1 },
      ],
    },
  },
  {
    id: 'fenois',
    name: {
      pt: 'Fenóis',
      en: 'Phenols',
      ru: 'Фенолы',
    },
    functionalGroup: 'Hidroxila (—OH) ligada diretamente a anel aromático',
    structuralFormula: 'Ar—OH',
    generalFormula: 'C₆H₅OH (Fenol comum)',
    iupacSuffix: '-fenol ou hidroxibenzeno',
    description: {
      pt: 'Compostos que possuem o grupo hidroxila (—OH) ligado a um anel benzênico aromático. Possuem caráter levemente ácido devido à ressonância do anel.',
      en: 'Compounds in which a hydroxyl group (—OH) is directly bonded to an aromatic benzene ring. Weakly acidic due to resonance stabilization.',
      ru: 'Органические соединения ароматического ряда, в молекулах которых гидроксильные группы связаны с атомами углерода бензольного кольца.',
    },
    representativeExample: {
      name: 'Fenol (Ácido Fênico / Hidroxibenzeno)',
      formula: 'C₆H₅OH',
      structure: 'C₆H₅—OH',
      uses: 'Pioneiro antisséptico cirúrgico, produção de resinas baquelite, aspirina e corantes.',
    },
    properties: {
      polarity: 'Polar moderado',
      boilingPointTrend: 'Ponto de ebulição elevado (sólido cristalino a 25°C)',
      intermolecularForces: 'Ligações de hidrogênio e empilhamento pi (π-stacking)',
    },
    wikiUrl: 'https://pt.wikipedia.org/wiki/Fenóis',
    molecule3D: {
      atoms: [
        { symbol: 'C', name: 'C1', pos: [0, 0.8, 0], color: '#475569', radius: 0.38 },
        { symbol: 'C', name: 'C2', pos: [0.7, 0.4, 0], color: '#475569', radius: 0.38 },
        { symbol: 'C', name: 'C3', pos: [0.7, -0.4, 0], color: '#475569', radius: 0.38 },
        { symbol: 'C', name: 'C4', pos: [0, -0.8, 0], color: '#475569', radius: 0.38 },
        { symbol: 'C', name: 'C5', pos: [-0.7, -0.4, 0], color: '#475569', radius: 0.38 },
        { symbol: 'C', name: 'C6', pos: [-0.7, 0.4, 0], color: '#475569', radius: 0.38 },
        { symbol: 'O', name: 'Oxigênio (OH)', pos: [0, 1.8, 0], color: '#ef4444', radius: 0.42 },
        { symbol: 'H', name: 'Hidrogênio (OH)', pos: [0.7, 2.2, 0], color: '#f8fafc', radius: 0.25 },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 2 },
        { from: 3, to: 4, order: 1 },
        { from: 4, to: 5, order: 2 },
        { from: 5, to: 0, order: 1 },
        { from: 0, to: 6, order: 1 },
        { from: 6, to: 7, order: 1 },
      ],
    },
  },
  {
    id: 'eteres',
    name: {
      pt: 'Éteres',
      en: 'Ethers',
      ru: 'Простые эфиры',
    },
    functionalGroup: 'Oxigênio como heteroátomo entre dois carbonos (—O—)',
    structuralFormula: 'R—O—R\'',
    generalFormula: 'CₙH₂ₙ₊₂O',
    iupacSuffix: 'Prefix-oxi-alcano (ex: Metoxietano)',
    description: {
      pt: 'Compostos que contêm um átomo de oxigênio ligado a dois radicais orgânicos alquila ou arila. São líquidos muito voláteis e inflamáveis, pouco polares.',
      en: 'Organic compounds containing an oxygen atom bonded to two alkyl or aryl groups. Highly volatile and widely used as nonpolar solvents.',
      ru: 'Органические вещества, в которых атом кислорода связан с двумя углеводородными радикалами.',
    },
    representativeExample: {
      name: 'Éter Dietílico (Etoxietano)',
      formula: 'C₄H₁₀O',
      structure: 'CH₃—CH₂—O—CH₂—CH₃',
      uses: 'Histórico anestésico geral inalatório, solvente industrial de gorduras e extração de óleos.',
    },
    properties: {
      polarity: 'Fracamente polar (geometria angular)',
      boilingPointTrend: 'Ponto de ebulição baixo (não fazem ligações de H entre si)',
      intermolecularForces: 'Dipolo permanente fraco e dispersão de London',
    },
    wikiUrl: 'https://pt.wikipedia.org/wiki/Éteres',
    molecule3D: {
      atoms: [
        { symbol: 'O', name: 'Oxigênio central', pos: [0, 0.4, 0], color: '#ef4444', radius: 0.44 },
        { symbol: 'C', name: 'C1', pos: [-1.1, -0.2, 0], color: '#475569', radius: 0.4 },
        { symbol: 'C', name: 'C2', pos: [1.1, -0.2, 0], color: '#475569', radius: 0.4 },
        { symbol: 'C', name: 'C3', pos: [-2.1, 0.5, 0], color: '#475569', radius: 0.38 },
        { symbol: 'C', name: 'C4', pos: [2.1, 0.5, 0], color: '#475569', radius: 0.38 },
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 1, to: 3, order: 1 },
        { from: 2, to: 4, order: 1 },
      ],
    },
  },
  {
    id: 'aldeidos',
    name: {
      pt: 'Aldeídos',
      en: 'Aldehydes',
      ru: 'Альдегиды',
    },
    functionalGroup: 'Carbonila terminal ligada a hidrogênio (—CHO)',
    structuralFormula: 'R—CHO',
    generalFormula: 'CₙH₂ₙO',
    iupacSuffix: '-al (ex: Metanal, Etanal)',
    description: {
      pt: 'Compostos que contêm o grupo carbonila (C=O) posicionado na extremidade da cadeia carbônica, ligado a pelo menos um hidrogênio. Odor característico.',
      en: 'Compounds containing a carbonyl group (C=O) bonded to at least one hydrogen atom at the end of a carbon chain.',
      ru: 'Органические соединения, содержащие карбонильную группу (C=O) на конце углеродной цепи, связанную с атомом водорода.',
    },
    representativeExample: {
      name: 'Metanal (Formaldeído / Formol)',
      formula: 'CH₂O',
      structure: 'H—CHO',
      uses: 'Conservação de peças anatômicas e tecidos biológicos, fabricação de resinas fenólicas.',
    },
    properties: {
      polarity: 'Polar (dipolo forte na carbonila C=O)',
      boilingPointTrend: 'Intermediário entre éteres e álcoois',
      intermolecularForces: 'Dipolo-dipolo',
    },
    wikiUrl: 'https://pt.wikipedia.org/wiki/Aldeído',
    molecule3D: {
      atoms: [
        { symbol: 'C', name: 'Carbono carbonílico', pos: [0, 0, 0], color: '#475569', radius: 0.42 },
        { symbol: 'O', name: 'Oxigênio (C=O)', pos: [0, 1.25, 0], color: '#ef4444', radius: 0.45 },
        { symbol: 'H', name: 'H terminal 1', pos: [-0.95, -0.6, 0], color: '#f8fafc', radius: 0.26 },
        { symbol: 'H', name: 'H terminal 2', pos: [0.95, -0.6, 0], color: '#f8fafc', radius: 0.26 },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
      ],
    },
  },
  {
    id: 'cetonas',
    name: {
      pt: 'Cetonas',
      en: 'Ketones',
      ru: 'Кетоны',
    },
    functionalGroup: 'Carbonila entre dois átomos de carbono (—CO—)',
    structuralFormula: 'R—CO—R\'',
    generalFormula: 'CₙH₂ₙO',
    iupacSuffix: '-ona (ex: Propanona / Acetona)',
    description: {
      pt: 'Compostos que contêm o grupo carbonila (C=O) localizado entre dois átomos de carbono. Excelentes solventes orgânicos.',
      en: 'Organic compounds characterized by the presence of a carbonyl group (C=O) bonded to two carbon atoms.',
      ru: 'Органические вещества, в молекулах которых карбонильная группа связана с двумя углеводородными радикалами.',
    },
    representativeExample: {
      name: 'Propanona (Acetona)',
      formula: 'C₃H₆O',
      structure: 'CH₃—CO—CH₃',
      uses: 'Removedor de esmaltes, solvente em laboratórios e síntese de polímeros acrílicos.',
    },
    properties: {
      polarity: 'Polar (dipolo acentuado)',
      boilingPointTrend: 'Ponto de ebulição mais elevado que éteres e hidrocarbonetos',
      intermolecularForces: 'Dipolo-dipolo permanente',
    },
    wikiUrl: 'https://pt.wikipedia.org/wiki/Cetona',
    molecule3D: {
      atoms: [
        { symbol: 'C', name: 'C central (carbonila)', pos: [0, 0, 0], color: '#475569', radius: 0.42 },
        { symbol: 'O', name: 'Oxigênio (C=O)', pos: [0, 1.25, 0], color: '#ef4444', radius: 0.45 },
        { symbol: 'C', name: 'Metil 1', pos: [-1.2, -0.65, 0], color: '#475569', radius: 0.38 },
        { symbol: 'C', name: 'Metil 2', pos: [1.2, -0.65, 0], color: '#475569', radius: 0.38 },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 1 },
        { from: 0, to: 3, order: 1 },
      ],
    },
  },
  {
    id: 'carboxilicos',
    name: {
      pt: 'Ácidos Carboxílicos',
      en: 'Carboxylic Acids',
      ru: 'Карбоновые кислоты',
    },
    functionalGroup: 'Carboxila (Carbonila + Hidroxila: —COOH)',
    structuralFormula: 'R—COOH',
    generalFormula: 'CₙH₂ₙ₊₁COOH',
    iupacSuffix: 'Ácido ... -oico (ex: Ácido Acético)',
    description: {
      pt: 'Compostos que contêm o grupo funcional carboxila (—COOH). Apresentam caráter ácido acentuado e formam dímeros por ligações de hidrogênio.',
      en: 'Organic compounds containing a carboxyl group (—COOH). Characterized by acidic properties and strong dimerization via hydrogen bonds.',
      ru: 'Класс органических соединений, молекулы которых содержат одну или несколько карбоксильных групп —COOH.',
    },
    representativeExample: {
      name: 'Ácido Etanoico (Ácido Acético)',
      formula: 'CH₃COOH',
      structure: 'CH₃—COOH',
      uses: 'Componente do vinagre (4% a 8%), acidulante alimentar e produção de plásticos PET.',
    },
    properties: {
      polarity: 'Fortemente polar',
      boilingPointTrend: 'Altíssimo ponto de ebulição (formam dímeros estáveis)',
      intermolecularForces: 'Ligações duplas de hidrogênio intermoleculares',
    },
    wikiUrl: 'https://pt.wikipedia.org/wiki/Ácido_carboxílico',
    molecule3D: {
      atoms: [
        { symbol: 'C', name: 'C carbonílico', pos: [0.3, 0, 0], color: '#475569', radius: 0.42 },
        { symbol: 'O', name: 'Oxigênio carbonila (C=O)', pos: [0.6, 1.2, 0], color: '#ef4444', radius: 0.44 },
        { symbol: 'O', name: 'Oxigênio hidroxila (—OH)', pos: [1.1, -0.9, 0], color: '#ef4444', radius: 0.42 },
        { symbol: 'H', name: 'Hidrogênio ionizável H⁺', pos: [2.0, -0.7, 0], color: '#f8fafc', radius: 0.25 },
        { symbol: 'C', name: 'Metil (CH3)', pos: [-1.1, -0.3, 0], color: '#475569', radius: 0.4 },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 1 },
        { from: 2, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 },
      ],
    },
  },
  {
    id: 'esteres',
    name: {
      pt: 'Ésteres',
      en: 'Esters',
      ru: 'Сложные эфиры',
    },
    functionalGroup: 'Carboxilato de alquila (—COO—R)',
    structuralFormula: 'R—COO—R\'',
    generalFormula: 'CₙH₂ₙO₂',
    iupacSuffix: '-oato de -ila (ex: Acetato de etila)',
    description: {
      pt: 'Compostos derivados da esterificação entre um ácido carboxílico e um álcool. Famosos por aromas e essências agradáveis de frutas e flores.',
      en: 'Compounds derived from the reaction between a carboxylic acid and an alcohol. Renowned for fruity, sweet, and floral aromas in nature.',
      ru: 'Производные оксокислот, формально являющиеся продуктами замещения атомов водорода гидроксилов на углеводородный остаток.',
    },
    representativeExample: {
      name: 'Etanoato de Etila',
      formula: 'C₄H₈O₂',
      structure: 'CH₃—COO—CH₂—CH₃',
      uses: 'Aromatizante artificial de frutas, solvente de colas, vernizes e descafeinização.',
    },
    properties: {
      polarity: 'Moderadamente polar',
      boilingPointTrend: 'Menor que álcoois e ácidos de mesma massa molar',
      intermolecularForces: 'Dipolo-dipolo',
    },
    wikiUrl: 'https://pt.wikipedia.org/wiki/Éster',
    molecule3D: {
      atoms: [
        { symbol: 'C', name: 'C carbonílico', pos: [0, 0, 0], color: '#475569', radius: 0.42 },
        { symbol: 'O', name: 'Oxigênio carbonila (C=O)', pos: [0, 1.25, 0], color: '#ef4444', radius: 0.44 },
        { symbol: 'O', name: 'Oxigênio éter (—O—)', pos: [1.1, -0.6, 0], color: '#ef4444', radius: 0.42 },
        { symbol: 'C', name: 'Etila 1', pos: [2.2, 0.1, 0], color: '#475569', radius: 0.38 },
        { symbol: 'C', name: 'Etila 2', pos: [3.3, -0.6, 0], color: '#475569', radius: 0.38 },
        { symbol: 'C', name: 'Metil acetila', pos: [-1.2, -0.6, 0], color: '#475569', radius: 0.38 },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 0, to: 2, order: 1 },
        { from: 2, to: 3, order: 1 },
        { from: 3, to: 4, order: 1 },
        { from: 0, to: 5, order: 1 },
      ],
    },
  },
  {
    id: 'anidridos',
    name: {
      pt: 'Anidridos de Ácido',
      en: 'Acid Anhydrides',
      ru: 'Ангидриды кислот',
    },
    functionalGroup: 'Grupo diacilóxido (—CO—O—CO—)',
    structuralFormula: 'R—CO—O—CO—R\'',
    generalFormula: 'CₙH₂ₙ₋₂O₃',
    iupacSuffix: 'Anidrido ... -oico',
    description: {
      pt: 'Compostos formados pela desidratação intermolecular ou intramolecular de duas moléculas de ácidos carboxílicos. Reagentes acilantes potentes.',
      en: 'Compounds formed by the dehydration of two carboxylic acid molecules. Highly reactive acylating agents in organic synthesis.',
      ru: 'Органические соединения, образующиеся при дегидратации карбоновых кислот.',
    },
    representativeExample: {
      name: 'Anidrido Acético',
      formula: 'C₄H₆O₃',
      structure: 'CH₃—CO—O—CO—CH₃',
      uses: 'Produção de acetato de celulose e síntese farmacológica da aspirina (ácido acetilsalicílico).',
    },
    properties: {
      polarity: 'Polar moderado',
      boilingPointTrend: 'Ponto de ebulição elevado devido ao peso molecular e forte dipolo',
      intermolecularForces: 'Dipolo-dipolo e forças de dispersão',
    },
    wikiUrl: 'https://pt.wikipedia.org/wiki/Anidrido_de_ácido',
    molecule3D: {
      atoms: [
        { symbol: 'O', name: 'Oxigênio central', pos: [0, 0.5, 0], color: '#ef4444', radius: 0.42 },
        { symbol: 'C', name: 'Carbonil 1', pos: [-1.1, -0.2, 0], color: '#475569', radius: 0.4 },
        { symbol: 'C', name: 'Carbonil 2', pos: [1.1, -0.2, 0], color: '#475569', radius: 0.4 },
        { symbol: 'O', name: 'O=C1', pos: [-1.5, 0.9, 0], color: '#ef4444', radius: 0.42 },
        { symbol: 'O', name: 'O=C2', pos: [1.5, 0.9, 0], color: '#ef4444', radius: 0.42 },
        { symbol: 'C', name: 'Metil 1', pos: [-2.3, -1.0, 0], color: '#475569', radius: 0.38 },
        { symbol: 'C', name: 'Metil 2', pos: [2.3, -1.0, 0], color: '#475569', radius: 0.38 },
      ],
      bonds: [
        { from: 0, to: 1, order: 1 },
        { from: 0, to: 2, order: 1 },
        { from: 1, to: 3, order: 2 },
        { from: 2, to: 4, order: 2 },
        { from: 1, to: 5, order: 1 },
        { from: 2, to: 6, order: 1 },
      ],
    },
  },
  {
    id: 'enois',
    name: {
      pt: 'Enóis',
      en: 'Enols',
      ru: 'Енолы',
    },
    functionalGroup: 'Hidroxila (—OH) ligada diretamente a carbono insaturado sp² (C=C—OH)',
    structuralFormula: 'R₂C=CR—OH',
    generalFormula: 'CₙH₂ₙO (isômero de cetonas/aldeídos)',
    iupacSuffix: '-en-ol',
    description: {
      pt: 'Compostos que possuem um grupo hidroxila (—OH) ligado a um carbono insaturado com ligação dupla (—C=C—). Geralmente em tautomeria rápida com aldeídos e cetonas.',
      en: 'Compounds with a hydroxyl group bonded to a carbon-carbon double bond carbon. Often exist in rapid tautomeric equilibrium with carbonyls.',
      ru: 'Соединения, содержащие гидроксильную группу у атома углерода с двойной связью.',
    },
    representativeExample: {
      name: 'Etenol (Álcool Vinílico)',
      formula: 'C₂H₄O',
      structure: 'CH₂=CH—OH',
      uses: 'Monômero na fabricação de polímeros como o acetato de polivinila (PVA) e colas.',
    },
    properties: {
      polarity: 'Polar',
      boilingPointTrend: 'Elevado devido à ponte de hidrogênio e tautomerização',
      intermolecularForces: 'Ligações de hidrogênio e dipolo',
    },
    wikiUrl: 'https://pt.wikipedia.org/wiki/Enol',
    molecule3D: {
      atoms: [
        { symbol: 'C', name: 'C dupla 1', pos: [-0.9, 0, 0], color: '#475569', radius: 0.4 },
        { symbol: 'C', name: 'C dupla 2 (OH)', pos: [0.4, 0, 0], color: '#475569', radius: 0.4 },
        { symbol: 'O', name: 'Oxigênio OH', pos: [1.3, 0.8, 0], color: '#ef4444', radius: 0.42 },
        { symbol: 'H', name: 'Hidrogênio OH', pos: [2.1, 0.5, 0], color: '#f8fafc', radius: 0.25 },
        { symbol: 'H', name: 'H c1', pos: [-1.4, -0.9, 0], color: '#f8fafc', radius: 0.25 },
        { symbol: 'H', name: 'H c1', pos: [-1.4, 0.9, 0], color: '#f8fafc', radius: 0.25 },
      ],
      bonds: [
        { from: 0, to: 1, order: 2 },
        { from: 1, to: 2, order: 1 },
        { from: 2, to: 3, order: 1 },
        { from: 0, to: 4, order: 1 },
        { from: 0, to: 5, order: 1 },
      ],
    },
  },
  {
    id: 'sais-organicos',
    name: {
      pt: 'Sais Orgânicos',
      en: 'Organic Salts',
      ru: 'Соли органических кислот',
    },
    functionalGroup: 'Íon carboxilato (—COO⁻ M⁺)',
    structuralFormula: 'R—COO⁻ Na⁺',
    generalFormula: 'CₙH₂ₙ₊₁COONa',
    iupacSuffix: '-oato de [cátion] (ex: Etanoato de sódio)',
    description: {
      pt: 'Compostos iônicos formados pela neutralização de ácidos carboxílicos por bases. Possuem uma longa cadeia apolar lipofílica e uma cabeça iônica hidrofílica (tensoativos/sabões).',
      en: 'Ionic compounds formed by neutralizing carboxylic acids with bases. Famous as surfactants and soaps with hydrophilic heads and lipophilic tails.',
      ru: 'Ионные соединения, образующиеся при нейтрализации карбоновых кислот основаниями (например, мыла).',
    },
    representativeExample: {
      name: 'Estearato de Sódio (Sabão Comum)',
      formula: 'C₁₈H₃₅O₂Na',
      structure: 'CH₃—(CH₂)₁₆—COO⁻ Na⁺',
      uses: 'Fabricação de sabões em barra e líquidos, agentes emulsificantes na limpeza e detergência.',
    },
    properties: {
      polarity: 'Altamente iônico na extremidade e apolar na cadeia alquílica',
      boilingPointTrend: 'Pontos de fusão muito elevados (sólidos cristalinos iônicos)',
      intermolecularForces: 'Atração eletrostática iônica e forças de Van der Waals',
    },
    wikiUrl: 'https://pt.wikipedia.org/wiki/Sal_(química)',
    molecule3D: {
      atoms: [
        { symbol: 'Na', name: 'Cátion Sódio (Na⁺)', pos: [-2.0, 0.8, 0], color: '#a855f7', radius: 0.5 },
        { symbol: 'C', name: 'C carbonílico', pos: [-0.6, 0, 0], color: '#475569', radius: 0.42 },
        { symbol: 'O', name: 'Oxigênio 1 (—O⁻)', pos: [-0.4, 1.2, 0], color: '#ef4444', radius: 0.42 },
        { symbol: 'O', name: 'Oxigênio 2 (=O)', pos: [0.5, -0.6, 0], color: '#ef4444', radius: 0.42 },
        { symbol: 'C', name: 'C alquílico', pos: [-1.8, -0.8, 0], color: '#475569', radius: 0.4 },
      ],
      bonds: [
        { from: 1, to: 2, order: 1 },
        { from: 1, to: 3, order: 2 },
        { from: 1, to: 4, order: 1 },
      ],
    },
  },
];
