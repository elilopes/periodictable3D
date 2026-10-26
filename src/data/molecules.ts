export type BondType = 'covalente-polar' | 'covalente-apolar' | 'ionica';

export interface MoleculeAtom {
  elementSymbol: string;
  elementName: string;
  position: [number, number, number];
  color: string;
  radius: number;
  charge?: string;
  valenceElectrons: number;
}

export interface ChemicalBond {
  fromIndex: number;
  toIndex: number;
  order: 1 | 2 | 3; // simples, dupla, tripla
  type: BondType;
  sharedElectrons: number;
}

export interface MoleculeData {
  id: string;
  name: string;
  formula: string;
  bondType: BondType;
  bondTypeLabel: string;
  geometry: string;
  description: string;
  bondExplanation: string;
  wikiUrl: string;
  atoms: MoleculeAtom[];
  bonds: ChemicalBond[];
}

export const MOLECULES_LIST: MoleculeData[] = [
  {
    id: 'h2o',
    name: 'Água',
    formula: 'H₂O',
    bondType: 'covalente-polar',
    bondTypeLabel: 'Ligação Covalente Polar',
    geometry: 'Angular (104,5°)',
    description: 'A molécula essencial para toda a vida conhecida. O oxigênio atrai com mais força os elétrons compartilhados gerando polos elétricos.',
    bondExplanation: 'O oxigênio (6 elétrons de valência) compartilha 1 par de elétrons com cada um dos dois hidrogênios (1 elétron cada), completando o octeto com 8 elétrons e os hidrogênios com 2 (dueto). A alta eletronegatividade do oxigênio cria cargas parciais δ- no O e δ+ nos H.',
    wikiUrl: 'https://pt.wikipedia.org/wiki/Água',
    atoms: [
      { elementSymbol: 'O', elementName: 'Oxigênio', position: [0, 0, 0], color: '#ef4444', radius: 0.45, valenceElectrons: 6, charge: 'δ⁻' },
      { elementSymbol: 'H', elementName: 'Hidrogênio', position: [-0.96, 0.76, 0], color: '#f8fafc', radius: 0.28, valenceElectrons: 1, charge: 'δ⁺' },
      { elementSymbol: 'H', elementName: 'Hidrogênio', position: [0.96, 0.76, 0], color: '#f8fafc', radius: 0.28, valenceElectrons: 1, charge: 'δ⁺' }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 1, type: 'covalente-polar', sharedElectrons: 2 },
      { fromIndex: 0, toIndex: 2, order: 1, type: 'covalente-polar', sharedElectrons: 2 }
    ]
  },
  {
    id: 'nacl',
    name: 'Cloreto de Sódio (Sal de Cozinha)',
    formula: 'NaCl',
    bondType: 'ionica',
    bondTypeLabel: 'Ligação Iônica',
    geometry: 'Linear / Retículo Cristalino Cúbico',
    description: 'O exemplo clássico de atração eletrostática intensa entre um cátion metálico e um ânion não-metálico.',
    bondExplanation: 'O sódio (Na) possui 1 elétron na camada de valência e baixa energia de ionização; ele doa esse elétron completamente para o cloro (Cl), que possui 7 elétrons. O Na se torna o cátion Na⁺ estável e o Cl vira o ânion Cl⁻ com octeto completo. Eles se atraem fortemente pela força eletrostática de Coulomb.',
    wikiUrl: 'https://pt.wikipedia.org/wiki/Cloreto_de_sódio',
    atoms: [
      { elementSymbol: 'Na', elementName: 'Sódio', position: [-1.2, 0, 0], color: '#a855f7', radius: 0.48, valenceElectrons: 1, charge: 'Na⁺' },
      { elementSymbol: 'Cl', elementName: 'Cloro', position: [1.2, 0, 0], color: '#22c55e', radius: 0.62, valenceElectrons: 7, charge: 'Cl⁻' }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 1, type: 'ionica', sharedElectrons: 0 }
    ]
  },
  {
    id: 'co2',
    name: 'Dióxido de Carbono',
    formula: 'CO₂',
    bondType: 'covalente-polar',
    bondTypeLabel: 'Ligações Covalentes Duplas Polares (Molécula Linear Apolar)',
    geometry: 'Linear (180°)',
    description: 'Gás vital na respiração vegetal (fotossíntese) e responsável pelo efeito estufa atmosférico natural.',
    bondExplanation: 'O átomo de carbono central compartilha 2 pares de elétrons com cada oxigênio, formando duas ligações duplas (O=C=O). Ambos atingem a estabilidade do octeto (8 elétrons na camada de valência). Como a molécula é perfeitamente simétrica (180°), os momentos dipolares se anulam.',
    wikiUrl: 'https://pt.wikipedia.org/wiki/Dióxido_de_carbono',
    atoms: [
      { elementSymbol: 'C', elementName: 'Carbono', position: [0, 0, 0], color: '#475569', radius: 0.42, valenceElectrons: 4 },
      { elementSymbol: 'O', elementName: 'Oxigênio', position: [-1.4, 0, 0], color: '#ef4444', radius: 0.42, valenceElectrons: 6 },
      { elementSymbol: 'O', elementName: 'Oxigênio', position: [1.4, 0, 0], color: '#ef4444', radius: 0.42, valenceElectrons: 6 }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 2, type: 'covalente-polar', sharedElectrons: 4 },
      { fromIndex: 0, toIndex: 2, order: 2, type: 'covalente-polar', sharedElectrons: 4 }
    ]
  },
  {
    id: 'ch4',
    name: 'Metano',
    formula: 'CH₄',
    bondType: 'covalente-apolar',
    bondTypeLabel: 'Ligação Covalente Apolar',
    geometry: 'Tetraédrica (109,5°)',
    description: 'O mais simples dos hidrocarbonetos e principal componente do gás natural fóssil e biogás.',
    bondExplanation: 'O carbono forma orbitais híbridos sp³ em arranjo tetraédrico tridimensional, compartilhando 1 elétron com cada um dos 4 átomos de hidrogênio. A atração é equilibrada nas 4 direções espaciais.',
    wikiUrl: 'https://pt.wikipedia.org/wiki/Metano',
    atoms: [
      { elementSymbol: 'C', elementName: 'Carbono', position: [0, 0, 0], color: '#475569', radius: 0.45, valenceElectrons: 4 },
      { elementSymbol: 'H', elementName: 'Hidrogênio', position: [1.1, 1.1, 1.1], color: '#f8fafc', radius: 0.28, valenceElectrons: 1 },
      { elementSymbol: 'H', elementName: 'Hidrogênio', position: [-1.1, -1.1, 1.1], color: '#f8fafc', radius: 0.28, valenceElectrons: 1 },
      { elementSymbol: 'H', elementName: 'Hidrogênio', position: [-1.1, 1.1, -1.1], color: '#f8fafc', radius: 0.28, valenceElectrons: 1 },
      { elementSymbol: 'H', elementName: 'Hidrogênio', position: [1.1, -1.1, -1.1], color: '#f8fafc', radius: 0.28, valenceElectrons: 1 }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 1, type: 'covalente-apolar', sharedElectrons: 2 },
      { fromIndex: 0, toIndex: 2, order: 1, type: 'covalente-apolar', sharedElectrons: 2 },
      { fromIndex: 0, toIndex: 3, order: 1, type: 'covalente-apolar', sharedElectrons: 2 },
      { fromIndex: 0, toIndex: 4, order: 1, type: 'covalente-apolar', sharedElectrons: 2 }
    ]
  },
  {
    id: 'o2',
    name: 'Gás Oxigênio',
    formula: 'O₂',
    bondType: 'covalente-apolar',
    bondTypeLabel: 'Ligação Covalente Dupla Apolar',
    geometry: 'Linear',
    description: 'O gás que respiramos. Dois átomos idênticos de oxigênio unidos por uma ligação dupla forte (O=O).',
    bondExplanation: 'Como os dois átomos têm a mesma eletronegatividade, os 2 pares de elétrons compartilhados (4 elétrons no total) são atraídos com exatamente a mesma intensidade por ambos os núcleos.',
    wikiUrl: 'https://pt.wikipedia.org/wiki/Oxigênio',
    atoms: [
      { elementSymbol: 'O', elementName: 'Oxigênio 1', position: [-0.65, 0, 0], color: '#ef4444', radius: 0.45, valenceElectrons: 6 },
      { elementSymbol: 'O', elementName: 'Oxigênio 2', position: [0.65, 0, 0], color: '#ef4444', radius: 0.45, valenceElectrons: 6 }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 2, type: 'covalente-apolar', sharedElectrons: 4 }
    ]
  },
  {
    id: 'nh3',
    name: 'Amônia',
    formula: 'NH₃',
    bondType: 'covalente-polar',
    bondTypeLabel: 'Ligação Covalente Polar',
    geometry: 'Piramidal Trigonal (107°)',
    description: 'Composto chave para fertilizantes agrícolas nitrogenados que alimentam bilhões de pessoas.',
    bondExplanation: 'O nitrogênio possui 5 elétrons de valência. Ele compartilha 3 elétrons com 3 hidrogênios e mantém 1 par de elétrons isolado no topo, empurrando as ligações para uma pirâmide trigonal.',
    wikiUrl: 'https://pt.wikipedia.org/wiki/Amônia',
    atoms: [
      { elementSymbol: 'N', elementName: 'Nitrogênio', position: [0, 0.2, 0], color: '#3b82f6', radius: 0.45, valenceElectrons: 5 },
      { elementSymbol: 'H', elementName: 'Hidrogênio', position: [0, -0.6, 1.0], color: '#f8fafc', radius: 0.28, valenceElectrons: 1 },
      { elementSymbol: 'H', elementName: 'Hidrogênio', position: [-0.9, -0.6, -0.5], color: '#f8fafc', radius: 0.28, valenceElectrons: 1 },
      { elementSymbol: 'H', elementName: 'Hidrogênio', position: [0.9, -0.6, -0.5], color: '#f8fafc', radius: 0.28, valenceElectrons: 1 }
    ],
    bonds: [
      { fromIndex: 0, toIndex: 1, order: 1, type: 'covalente-polar', sharedElectrons: 2 },
      { fromIndex: 0, toIndex: 2, order: 1, type: 'covalente-polar', sharedElectrons: 2 },
      { fromIndex: 0, toIndex: 3, order: 1, type: 'covalente-polar', sharedElectrons: 2 }
    ]
  }
];
