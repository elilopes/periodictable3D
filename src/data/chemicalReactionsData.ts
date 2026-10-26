import {MoleculeAtom, ChemicalBond} from './molecules';

export type ReactionCategory =
  | 'sintese'
  | 'combustao'
  | 'oxirreducao'
  | 'acido-base'
  | 'dupla-troca';

export interface ChemicalReaction {
  id: string;
  name: string;
  category: ReactionCategory;
  categoryLabel: string;
  equation: string;
  balancedEquation: string;
  description: string;
  bondType: 'covalente-polar' | 'covalente-apolar' | 'ionica' | 'metalica';
  bondTypeLabel: string;
  deltaH: string; // Ex: -572 kJ/mol (Exotérmica)
  isExothermic: boolean;
  visualEffect: 'flame' | 'spark' | 'plasma' | 'glow' | 'bubble';
  requiredElements: Array<{ symbol: string; count: number; name: string }>;
  explanation: string;
  wikiUrl: string;
  // Estrutura 3D do produto para renderização na câmara
  productMolecule: {
    name: string;
    formula: string;
    geometry: string;
    atoms: MoleculeAtom[];
    bonds: ChemicalBond[];
  };
  // Átomos dos reagentes em posições iniciais separadas para animação de colisão
  reactantAtoms: Array<{
    symbol: string;
    name: string;
    color: string;
    radius: number;
    initialPos: [number, number, number];
  }>;
}

export const CHEMICAL_REACTIONS_LIST: ChemicalReaction[] = [
  {
    id: 'h2o-synthesis',
    name: 'Síntese da Água',
    category: 'sintese',
    categoryLabel: 'Síntese / Combustão Limpa',
    equation: '2 H₂ + O₂ → 2 H₂O',
    balancedEquation: '2 H₂(g) + O₂(g) → 2 H₂O(l)',
    description: 'A clássica reação exotérmica de fusão entre o gás hidrogênio e o oxigênio molecular, liberando água pura e abundante energia térmica.',
    bondType: 'covalente-polar',
    bondTypeLabel: 'Ligação Covalente Polar',
    deltaH: '-571.6 kJ/mol (Fortemente Exotérmica)',
    isExothermic: true,
    visualEffect: 'plasma',
    requiredElements: [
      { symbol: 'H', count: 4, name: 'Hidrogênio' },
      { symbol: 'O', count: 2, name: 'Oxigênio' },
    ],
    explanation: 'Os átomos de hidrogênio (1 elétron) compartilham pares eletrônicos com o oxigênio (6 elétrons de valência). Pela geometria angular de 104,5° e alta eletronegatividade do oxigênio, formam-se dipolos permanentes com cargas parciais.',
    wikiUrl: 'https://pt.wikipedia.org/wiki/Água',
    productMolecule: {
      name: 'Molécula de Água',
      formula: 'H₂O',
      geometry: 'Angular (104,5°)',
      atoms: [
        { elementSymbol: 'O', elementName: 'Oxigênio', position: [0, 0, 0], color: '#ef4444', radius: 0.52, valenceElectrons: 6, charge: 'δ⁻' },
        { elementSymbol: 'H', elementName: 'Hidrogênio', position: [-0.98, 0.74, 0], color: '#f8fafc', radius: 0.32, valenceElectrons: 1, charge: 'δ⁺' },
        { elementSymbol: 'H', elementName: 'Hidrogênio', position: [0.98, 0.74, 0], color: '#f8fafc', radius: 0.32, valenceElectrons: 1, charge: 'δ⁺' },
      ],
      bonds: [
        { fromIndex: 0, toIndex: 1, order: 1, type: 'covalente-polar', sharedElectrons: 2 },
        { fromIndex: 0, toIndex: 2, order: 1, type: 'covalente-polar', sharedElectrons: 2 },
      ],
    },
    reactantAtoms: [
      { symbol: 'H', name: 'Hidrogênio', color: '#f8fafc', radius: 0.32, initialPos: [-2.8, 1.4, 0] },
      { symbol: 'H', name: 'Hidrogênio', color: '#f8fafc', radius: 0.32, initialPos: [-2.2, 0.6, 0] },
      { symbol: 'O', name: 'Oxigênio', color: '#ef4444', radius: 0.52, initialPos: [0, 2.2, 0] },
      { symbol: 'O', name: 'Oxigênio', color: '#ef4444', radius: 0.52, initialPos: [0, -2.2, 0] },
      { symbol: 'H', name: 'Hidrogênio', color: '#f8fafc', radius: 0.32, initialPos: [2.2, -0.6, 0] },
      { symbol: 'H', name: 'Hidrogênio', color: '#f8fafc', radius: 0.32, initialPos: [2.8, -1.4, 0] },
    ],
  },
  {
    id: 'nacl-synthesis',
    name: 'Formação do Cloreto de Sódio (Sal de Cozinha)',
    category: 'oxirreducao',
    categoryLabel: 'Reação Redox / Formação Iônica',
    equation: '2 Na + Cl₂ → 2 NaCl',
    balancedEquation: '2 Na(s) + Cl₂(g) → 2 NaCl(s)',
    description: 'Reação espetacular entre um metal alcalino altamente reativo (Sódio) e um gás tóxico corrosivo (Cloro), formando o sal de cozinha comestível e essencial.',
    bondType: 'ionica',
    bondTypeLabel: 'Ligação Iônica (Transferência de Cargas)',
    deltaH: '-822.2 kJ/mol (Violentamente Exotérmica)',
    isExothermic: true,
    visualEffect: 'spark',
    requiredElements: [
      { symbol: 'Na', count: 1, name: 'Sódio' },
      { symbol: 'Cl', count: 1, name: 'Cloro' },
    ],
    explanation: 'O sódio (metal com baixa eletronegatividade 0.93) doa espontaneamente seu elétron de valência 3s¹ para o cloro (alta eletronegatividade 3.16), formando o cátion Na⁺ e o ânion Cl⁻ com camadas de valência completas. A atração de Coulomb mantém a estrutura cúbica.',
    wikiUrl: 'https://pt.wikipedia.org/wiki/Cloreto_de_s%C3%B3dio',
    productMolecule: {
      name: 'Par Iônico Cloreto de Sódio',
      formula: 'NaCl',
      geometry: 'Linear Iônica',
      atoms: [
        { elementSymbol: 'Na⁺', elementName: 'Cátion Sódio', position: [-0.95, 0, 0], color: '#f43f5e', radius: 0.44, valenceElectrons: 8, charge: '+1' },
        { elementSymbol: 'Cl⁻', elementName: 'Ânion Cloreto', position: [0.95, 0, 0], color: '#22c55e', radius: 0.65, valenceElectrons: 8, charge: '-1' },
      ],
      bonds: [
        { fromIndex: 0, toIndex: 1, order: 1, type: 'ionica', sharedElectrons: 2 },
      ],
    },
    reactantAtoms: [
      { symbol: 'Na', name: 'Sódio', color: '#f43f5e', radius: 0.55, initialPos: [-2.6, 0, 0] },
      { symbol: 'Cl', name: 'Cloro', color: '#22c55e', radius: 0.62, initialPos: [2.6, 0, 0] },
    ],
  },
  {
    id: 'co2-combustion',
    name: 'Combustão Completa do Carbono',
    category: 'combustao',
    categoryLabel: 'Combustão Exotérmica',
    equation: 'C + O₂ → CO₂',
    balancedEquation: 'C(s) + O₂(g) → CO₂(g)',
    description: 'Queima de grafite ou carvão com excesso de oxigênio gasoso, liberando dióxido de carbono linear estável.',
    bondType: 'covalente-apolar',
    bondTypeLabel: 'Covalente Dupla (Molécula Linear Apolar)',
    deltaH: '-393.5 kJ/mol (Exotérmica)',
    isExothermic: true,
    visualEffect: 'flame',
    requiredElements: [
      { symbol: 'C', count: 1, name: 'Carbono' },
      { symbol: 'O', count: 2, name: 'Oxigênio' },
    ],
    explanation: 'O carbono compartilha 2 pares de elétrons com cada oxigênio, formando duas ligações duplas (O=C=O). Como a molécula tem geometria perfeitamente linear (180°), os momentos dipolares se anulam (vetor μ = 0), tornando a molécula apolar.',
    wikiUrl: 'https://pt.wikipedia.org/wiki/Di%C3%B3xido_de_carbono',
    productMolecule: {
      name: 'Dióxido de Carbono',
      formula: 'CO₂',
      geometry: 'Linear (180°)',
      atoms: [
        { elementSymbol: 'C', elementName: 'Carbono', position: [0, 0, 0], color: '#475569', radius: 0.46, valenceElectrons: 4, charge: 'δ⁺' },
        { elementSymbol: 'O', elementName: 'Oxigênio', position: [-1.45, 0, 0], color: '#ef4444', radius: 0.48, valenceElectrons: 6, charge: 'δ⁻' },
        { elementSymbol: 'O', elementName: 'Oxigênio', position: [1.45, 0, 0], color: '#ef4444', radius: 0.48, valenceElectrons: 6, charge: 'δ⁻' },
      ],
      bonds: [
        { fromIndex: 0, toIndex: 1, order: 2, type: 'covalente-polar', sharedElectrons: 4 },
        { fromIndex: 0, toIndex: 2, order: 2, type: 'covalente-polar', sharedElectrons: 4 },
      ],
    },
    reactantAtoms: [
      { symbol: 'C', name: 'Carbono', color: '#475569', radius: 0.46, initialPos: [0, 2.5, 0] },
      { symbol: 'O', name: 'Oxigênio', color: '#ef4444', radius: 0.48, initialPos: [-2.2, -1.5, 0] },
      { symbol: 'O', name: 'Oxigênio', color: '#ef4444', radius: 0.48, initialPos: [2.2, -1.5, 0] },
    ],
  },
  {
    id: 'nh3-haber',
    name: 'Síntese da Amônia (Processo Haber-Bosch)',
    category: 'sintese',
    categoryLabel: 'Síntese Catalítica Industrial',
    equation: 'N₂ + 3 H₂ → 2 NH₃',
    balancedEquation: 'N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g)',
    description: 'A reação química que alimenta o mundo: síntese de amônia para produção de fertilizantes agrícolas sintéticos a partir do nitrogênio atmosférico.',
    bondType: 'covalente-polar',
    bondTypeLabel: 'Ligação Covalente Polar (Geometria Piramidal)',
    deltaH: '-92.4 kJ/mol (Exotérmica Moderada)',
    isExothermic: true,
    visualEffect: 'glow',
    requiredElements: [
      { symbol: 'N', count: 1, name: 'Nitrogênio' },
      { symbol: 'H', count: 3, name: 'Hidrogênio' },
    ],
    explanation: 'O nitrogênio possui 5 elétrons de valência. Ele compartilha 1 par com cada um dos 3 átomos de hidrogênio e mantém um par isolado não ligante no topo, empurrando as ligações para uma geometria piramidal trigonal (107°).',
    wikiUrl: 'https://pt.wikipedia.org/wiki/Processo_de_Haber',
    productMolecule: {
      name: 'Amônia',
      formula: 'NH₃',
      geometry: 'Piramidal Trigonal (107°)',
      atoms: [
        { elementSymbol: 'N', elementName: 'Nitrogênio', position: [0, 0.35, 0], color: '#3b82f6', radius: 0.50, valenceElectrons: 5, charge: 'δ⁻' },
        { elementSymbol: 'H', elementName: 'Hidrogênio', position: [-0.94, -0.35, 0.4], color: '#f8fafc', radius: 0.30, valenceElectrons: 1, charge: 'δ⁺' },
        { elementSymbol: 'H', elementName: 'Hidrogênio', position: [0.94, -0.35, 0.4], color: '#f8fafc', radius: 0.30, valenceElectrons: 1, charge: 'δ⁺' },
        { elementSymbol: 'H', elementName: 'Hidrogênio', position: [0, -0.35, -0.98], color: '#f8fafc', radius: 0.30, valenceElectrons: 1, charge: 'δ⁺' },
      ],
      bonds: [
        { fromIndex: 0, toIndex: 1, order: 1, type: 'covalente-polar', sharedElectrons: 2 },
        { fromIndex: 0, toIndex: 2, order: 1, type: 'covalente-polar', sharedElectrons: 2 },
        { fromIndex: 0, toIndex: 3, order: 1, type: 'covalente-polar', sharedElectrons: 2 },
      ],
    },
    reactantAtoms: [
      { symbol: 'N', name: 'Nitrogênio', color: '#3b82f6', radius: 0.50, initialPos: [0, 2.3, 0] },
      { symbol: 'H', name: 'Hidrogênio', color: '#f8fafc', radius: 0.30, initialPos: [-2.5, -1.2, 0] },
      { symbol: 'H', name: 'Hidrogênio', color: '#f8fafc', radius: 0.30, initialPos: [0, -2.2, 1.2] },
      { symbol: 'H', name: 'Hidrogênio', color: '#f8fafc', radius: 0.30, initialPos: [2.5, -1.2, 0] },
    ],
  },
  {
    id: 'mgo-combustion',
    name: 'Combustão Incandescente do Magnésio',
    category: 'combustao',
    categoryLabel: 'Oxidação Metálica Intensa',
    equation: '2 Mg + O₂ → 2 MgO',
    balancedEquation: '2 Mg(s) + O₂(g) → 2 MgO(s)',
    description: 'Queima vigorosa de fita de magnésio que produz uma luz branca ofuscante rica em radiação ultravioleta, gerando óxido de magnésio sólido branco.',
    bondType: 'ionica',
    bondTypeLabel: 'Ligação Iônica Bivalente (Mg²⁺ O²⁻)',
    deltaH: '-1203.4 kJ/mol (Extremamente Exotérmica)',
    isExothermic: true,
    visualEffect: 'plasma',
    requiredElements: [
      { symbol: 'Mg', count: 1, name: 'Magnésio' },
      { symbol: 'O', count: 1, name: 'Oxigênio' },
    ],
    explanation: 'O átomo de magnésio (alcalino-terroso) transfere seus dois elétrons de valência (3s²) para o oxigênio, gerando cátions Mg²⁺ e ânions O²⁻ que interagem com enorme energia de rede cristalina.',
    wikiUrl: 'https://pt.wikipedia.org/wiki/%C3%93xido_de_magn%C3%A9sio',
    productMolecule: {
      name: 'Óxido de Magnésio',
      formula: 'MgO',
      geometry: 'Iônica Cúbica',
      atoms: [
        { elementSymbol: 'Mg²⁺', elementName: 'Magnésio', position: [-0.85, 0, 0], color: '#f59e0b', radius: 0.48, valenceElectrons: 8, charge: '+2' },
        { elementSymbol: 'O²⁻', elementName: 'Óxido', position: [0.85, 0, 0], color: '#ef4444', radius: 0.58, valenceElectrons: 8, charge: '-2' },
      ],
      bonds: [
        { fromIndex: 0, toIndex: 1, order: 2, type: 'ionica', sharedElectrons: 4 },
      ],
    },
    reactantAtoms: [
      { symbol: 'Mg', name: 'Magnésio', color: '#f59e0b', radius: 0.55, initialPos: [-2.4, 0, 0] },
      { symbol: 'O', name: 'Oxigênio', color: '#ef4444', radius: 0.50, initialPos: [2.4, 0, 0] },
    ],
  },
  {
    id: 'ch4-synthesis',
    name: 'Formação do Metano (Gás Natural)',
    category: 'sintese',
    categoryLabel: 'Hidrocarboneto Alcano Fundamental',
    equation: 'C + 2 H₂ → CH₄',
    balancedEquation: 'C(s) + 2 H₂(g) → CH₄(g)',
    description: 'A molécula orgânica mais simples: hibridização sp³ do carbono com quatro ligações sigma covalentes direcionadas para os vértices de um tetraedro regular.',
    bondType: 'covalente-apolar',
    bondTypeLabel: 'Covalente Tetraédrica (Hibridização sp³)',
    deltaH: '-74.8 kJ/mol (Exotérmica)',
    isExothermic: true,
    visualEffect: 'glow',
    requiredElements: [
      { symbol: 'C', count: 1, name: 'Carbono' },
      { symbol: 'H', count: 4, name: 'Hidrogênio' },
    ],
    explanation: 'O carbono promove um elétron 2s para o orbital 2p vazio e hibridiza quatro orbitais degenerados sp³ com ângulo perfeito de 109,5°. O arranjo minimiza a repulsão eletrônica.',
    wikiUrl: 'https://pt.wikipedia.org/wiki/Metano',
    productMolecule: {
      name: 'Metano',
      formula: 'CH₄',
      geometry: 'Tetraédrica Regular (109,5°)',
      atoms: [
        { elementSymbol: 'C', elementName: 'Carbono', position: [0, 0, 0], color: '#475569', radius: 0.48, valenceElectrons: 4 },
        { elementSymbol: 'H', elementName: 'Hidrogênio', position: [0, 1.05, 0], color: '#f8fafc', radius: 0.28, valenceElectrons: 1 },
        { elementSymbol: 'H', elementName: 'Hidrogênio', position: [0.98, -0.35, 0.4], color: '#f8fafc', radius: 0.28, valenceElectrons: 1 },
        { elementSymbol: 'H', elementName: 'Hidrogênio', position: [-0.98, -0.35, 0.4], color: '#f8fafc', radius: 0.28, valenceElectrons: 1 },
        { elementSymbol: 'H', elementName: 'Hidrogênio', position: [0, -0.35, -1.02], color: '#f8fafc', radius: 0.28, valenceElectrons: 1 },
      ],
      bonds: [
        { fromIndex: 0, toIndex: 1, order: 1, type: 'covalente-polar', sharedElectrons: 2 },
        { fromIndex: 0, toIndex: 2, order: 1, type: 'covalente-polar', sharedElectrons: 2 },
        { fromIndex: 0, toIndex: 3, order: 1, type: 'covalente-polar', sharedElectrons: 2 },
        { fromIndex: 0, toIndex: 4, order: 1, type: 'covalente-polar', sharedElectrons: 2 },
      ],
    },
    reactantAtoms: [
      { symbol: 'C', name: 'Carbono', color: '#475569', radius: 0.48, initialPos: [0, 0, 0] },
      { symbol: 'H', name: 'Hidrogênio', color: '#f8fafc', radius: 0.28, initialPos: [-2.5, 1.5, 0] },
      { symbol: 'H', name: 'Hidrogênio', color: '#f8fafc', radius: 0.28, initialPos: [2.5, 1.5, 0] },
      { symbol: 'H', name: 'Hidrogênio', color: '#f8fafc', radius: 0.28, initialPos: [-2.0, -1.8, 0] },
      { symbol: 'H', name: 'Hidrogênio', color: '#f8fafc', radius: 0.28, initialPos: [2.0, -1.8, 0] },
    ],
  },
  {
    id: 'hcl-synthesis',
    name: 'Síntese do Ácido Clorídrico Gasoso',
    category: 'sintese',
    categoryLabel: 'Síntese de Hidrácido Forte',
    equation: 'H₂ + Cl₂ → 2 HCl',
    balancedEquation: 'H₂(g) + Cl₂(g) → 2 HCl(g)',
    description: 'Reação fotoquímica em cadeia ativada por luz entre hidrogênio e cloro, gerando cloreto de hidrogênio com forte momento dipolar.',
    bondType: 'covalente-polar',
    bondTypeLabel: 'Covalente Polar (Forte Dipolo)',
    deltaH: '-184.6 kJ/mol (Exotérmica)',
    isExothermic: true,
    visualEffect: 'spark',
    requiredElements: [
      { symbol: 'H', count: 1, name: 'Hidrogênio' },
      { symbol: 'Cl', count: 1, name: 'Cloro' },
    ],
    explanation: 'A grande diferença de eletronegatividade (Cl = 3.16 vs H = 2.20, ΔEN = 0.96) desloca fortemente a nuvem eletrônica para o cloro, conferindo caráter dipolar acentuado que permite fácil ionização em água.',
    wikiUrl: 'https://pt.wikipedia.org/wiki/Ácido_clor%C3%ADdrico',
    productMolecule: {
      name: 'Cloreto de Hidrogênio',
      formula: 'HCl',
      geometry: 'Linear Polar',
      atoms: [
        { elementSymbol: 'H', elementName: 'Hidrogênio', position: [-0.95, 0, 0], color: '#f8fafc', radius: 0.32, valenceElectrons: 1, charge: 'δ⁺' },
        { elementSymbol: 'Cl', elementName: 'Cloro', position: [0.65, 0, 0], color: '#22c55e', radius: 0.62, valenceElectrons: 7, charge: 'δ⁻' },
      ],
      bonds: [
        { fromIndex: 0, toIndex: 1, order: 1, type: 'covalente-polar', sharedElectrons: 2 },
      ],
    },
    reactantAtoms: [
      { symbol: 'H', name: 'Hidrogênio', color: '#f8fafc', radius: 0.32, initialPos: [-2.2, 0, 0] },
      { symbol: 'Cl', name: 'Cloro', color: '#22c55e', radius: 0.62, initialPos: [2.2, 0, 0] },
    ],
  },
  {
    id: 'fes-synthesis',
    name: 'Reação de Síntese de Sulfeto de Ferro',
    category: 'oxirreducao',
    categoryLabel: 'Reação Redox / Composto Intermetálico',
    equation: 'Fe + S → FeS',
    balancedEquation: 'Fe(s) + S(s) → FeS(s)',
    description: 'Experimento clássico escolar: aquecimento da mistura cinza de limalha de ferro e pó amarelo de enxofre em tubo de ensaio, incandescente até formar sulfeto de ferro(II) não magnético.',
    bondType: 'ionica',
    bondTypeLabel: 'Iônica com Caráter Covalente Parcial',
    deltaH: '-100.0 kJ/mol (Exotérmica)',
    isExothermic: true,
    visualEffect: 'flame',
    requiredElements: [
      { symbol: 'Fe', count: 1, name: 'Ferro' },
      { symbol: 'S', count: 1, name: 'Enxofre' },
    ],
    explanation: 'O ferro perde 2 elétrons de valência para o enxofre, formando Fe²⁺ e S²⁻. A nova substância formada não é atraída pelo ímã comum como o pó de ferro original.',
    wikiUrl: 'https://pt.wikipedia.org/wiki/Sulfeto_de_ferro(II)',
    productMolecule: {
      name: 'Sulfeto de Ferro(II)',
      formula: 'FeS',
      geometry: 'Rede Cristalina Hexagonal',
      atoms: [
        { elementSymbol: 'Fe²⁺', elementName: 'Ferro(II)', position: [-0.85, 0, 0], color: '#6366f1', radius: 0.54, valenceElectrons: 8, charge: '+2' },
        { elementSymbol: 'S²⁻', elementName: 'Sulfeto', position: [0.85, 0, 0], color: '#eab308', radius: 0.58, valenceElectrons: 8, charge: '-2' },
      ],
      bonds: [
        { fromIndex: 0, toIndex: 1, order: 2, type: 'ionica', sharedElectrons: 4 },
      ],
    },
    reactantAtoms: [
      { symbol: 'Fe', name: 'Ferro', color: '#6366f1', radius: 0.54, initialPos: [-2.3, 0, 0] },
      { symbol: 'S', name: 'Enxofre', color: '#eab308', radius: 0.58, initialPos: [2.3, 0, 0] },
    ],
  },
];

// Elementos disponíveis na bancada para o usuário arrastar ou clicar
export const WORKBENCH_AVAILABLE_ELEMENTS = [
  { symbol: 'H', name: 'Hidrogênio', number: 1, color: '#f8fafc', mass: 1.008, category: 'Não Metal' },
  { symbol: 'C', name: 'Carbono', number: 6, color: '#475569', mass: 12.011, category: 'Não Metal' },
  { symbol: 'N', name: 'Nitrogênio', number: 7, color: '#3b82f6', mass: 14.007, category: 'Não Metal' },
  { symbol: 'O', name: 'Oxigênio', number: 8, color: '#ef4444', mass: 15.999, category: 'Não Metal' },
  { symbol: 'Na', name: 'Sódio', number: 11, color: '#f43f5e', mass: 22.990, category: 'Metal Alcalino' },
  { symbol: 'Mg', name: 'Magnésio', number: 12, color: '#f59e0b', mass: 24.305, category: 'Alcalino-terroso' },
  { symbol: 'Al', name: 'Alumínio', number: 13, color: '#3b82f6', mass: 26.982, category: 'Metal Pós-transição' },
  { symbol: 'S', name: 'Enxofre', number: 16, color: '#eab308', mass: 32.06, category: 'Não Metal' },
  { symbol: 'Cl', name: 'Cloro', number: 17, color: '#22c55e', mass: 35.45, category: 'Halogênio' },
  { symbol: 'K', name: 'Potássio', number: 19, color: '#ec4899', mass: 39.098, category: 'Metal Alcalino' },
  { symbol: 'Ca', name: 'Cálcio', number: 20, color: '#d97706', mass: 40.078, category: 'Alcalino-terroso' },
  { symbol: 'Fe', name: 'Ferro', number: 26, color: '#6366f1', mass: 55.845, category: 'Metal de Transição' },
  { symbol: 'Cu', name: 'Cobre', number: 29, color: '#ea580c', mass: 63.546, category: 'Metal de Transição' },
  { symbol: 'Zn', name: 'Zinco', number: 30, color: '#0284c7', mass: 65.38, category: 'Metal de Transição' },
];
