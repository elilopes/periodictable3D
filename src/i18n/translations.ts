import {Language} from './types';
import {ElementCategory, PhysicalState, ElementOrigin} from '../data/elements';

export interface Translations {
  app: {
    title: string;
    subtitleBadge: string;
    description: string;
    cameraTip: string;
    elementsCounter: string;
    viewTable: string;
    viewCylinder: string;
    viewSphere: string;
    btnBonds: string;
    btnCompare: string;
    btnOrganic: string;
    btnInorganic: string;
    searchPlaceholder: string;
    clearFilters: string;
    allCategories: string;
    allPhases: string;
    allOrigins: string;
    naturalOnly: string;
    artificialOnly: string;
    naturalBadge: string;
    artificialBadge: string;
    emptySelectionTitle: string;
    emptySelectionDesc: string;
    btnExploreBonds: string;
  };
  categories: Record<ElementCategory, string>;
  phases: Record<PhysicalState, string>;
  phaseFilterLabels: {
    all: string;
    solid: string;
    liquid: string;
    gas: string;
    unknown: string;
  };
  sidebar: {
    tabBohr: string;
    tabProps: string;
    tabHistory: string;
    tabApps: string;
    bohrTitle: string;
    nucleus: string;
    electrons: string;
    shellsLabel: string;
    orbitsToggle: string;
    bohrExplanation: string;
    atomicMass: string;
    atomicNumber: string;
    groupPeriod: string;
    phaseAt20: string;
    meltingPoint: string;
    boilingPoint: string;
    electronegativity: string;
    density: string;
    notApplicable: string;
    unknown: string;
    electronConfig: string;
    physChemFeatures: string;
    discoverers: string;
    discoveryYear: string;
    originClassification: string;
    historicalContext: string;
    wikiBtn: string;
    appsTitle: string;
    viewBondsForAtom: string;
    compareWithAnother: string;
  };
  models: {
    modelSelectorLabel: string;
    rotateInstruction: string;
    rutherfordBohr: {
      name: string;
      shortName: string;
      title: string;
      badge: string;
      desc: string;
    };
    quantumOrbital: {
      name: string;
      shortName: string;
      title: string;
      badge: string;
      desc: string;
      uncertaintyPrinciple: string;
    };
    ballAndStick: {
      name: string;
      shortName: string;
      title: string;
      badge: string;
      desc: string;
      geometryNote: string;
    };
    spaceFilling: {
      name: string;
      shortName: string;
      title: string;
      badge: string;
      desc: string;
      vanDerWaalsRadius: string;
    };
  };
  bonds: {
    modalTitle: string;
    badgeOctet: string;
    subtitle: string;
    selectMolecule: string;
    atomInteraction: string;
    btnSeparated: string;
    btnFormBond: string;
    atomsInMolecule: string;
    valenceElectrons: string;
    orbitControlTip: string;
    molecularChemistry: string;
    bondType: string;
    spatialGeometry: string;
    mechanism: string;
    transferMechanism: string;
    sharingMechanism: string;
    howStabilizationWorks: string;
    octetRuleTitle: string;
    octetRuleText: string;
    molecules: Record<
      string,
      {
        name: string;
        bondTypeLabel: string;
        geometry: string;
        description: string;
        explanation: string;
      }
    >;
  };
  compare: {
    modalTitle: string;
    badge: string;
    subtitle: string;
    elementA: string;
    elementB: string;
    searchAPlaceholder: string;
    searchBPlaceholder: string;
    tableTitle: string;
    property: string;
    electronConfig: string;
    atomicMass: string;
    electronegativity: string;
    category: string;
    position: string;
    phase: string;
    meltingPoint: string;
    boilingPoint: string;
    origin: string;
    discovery: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  pt: {
    app: {
      title: 'Tabela Periódica 3D',
      subtitleBadge: '118 Elementos (92 Naturais • 26 Artificiais)',
      description: 'Modelos atômicos quânticos e Rutherford-Bohr, orbitais, ligações químicas e propriedades físicas',
      cameraTip: 'Gire com o botão esquerdo • Zoom na roda • Mova com botão direito',
      elementsCounter: 'elementos',
      viewTable: 'Tabela 3D',
      viewCylinder: 'Espiral',
      viewSphere: 'Globo',
      btnBonds: 'Ligações Químicas 3D',
      btnCompare: 'Comparar Elementos',
      btnOrganic: 'Funções Orgânicas',
      btnInorganic: 'Funções Inorgânicas',
      searchPlaceholder: 'Pesquisar por nome, símbolo, número, grupo, massa (ex: Ouro, Au, 79, 12.011, Grupo 18)...',
      clearFilters: 'Limpar Filtros',
      allCategories: 'Todas as Categorias',
      allPhases: 'Todos os Estados',
      allOrigins: 'Origem (Todos os 118)',
      naturalOnly: '92 Elementos Naturais',
      artificialOnly: '26 Elementos Artificiais',
      naturalBadge: 'Natural',
      artificialBadge: 'Artificial',
      emptySelectionTitle: 'Explore os 118 Elementos',
      emptySelectionDesc: 'Clique em qualquer elemento na tabela 3D para visualizar o Sistema Rutherford-Bohr 3D, modelo orbital quântico, esferas e bastões e espaço preenchido.',
      btnExploreBonds: 'Ver Ligações Químicas 3D',
    },
    categories: {
      'nao-metal': 'Não Metal',
      'gas-nobre': 'Gás Nobre',
      'metal-alcalino': 'Metal Alcalino',
      'metal-alcalino-terroso': 'Alcalino-terroso',
      'metaloide': 'Semimetal / Metalóide',
      'halogenio': 'Halogênio',
      'metal-pos-transicao': 'Metal Pós-transição',
      'metal-transicao': 'Metal de Transição',
      'lantanideo': 'Lantanídeo',
      'actinideo': 'Actinídeo',
    },
    phases: {
      gas: 'Gás',
      liquido: 'Líquido',
      solido: 'Sólido',
      desconhecido: 'Desconhecido / Sintético',
    },
    phaseFilterLabels: {
      all: 'Todos os Estados',
      solid: 'Sólidos',
      liquid: 'Líquidos (Hg, Br, Ga, Cs)',
      gas: 'Gases',
      unknown: 'Sintéticos / Previstos',
    },
    sidebar: {
      tabBohr: 'Rutherford-Bohr',
      tabProps: 'Propriedades',
      tabHistory: 'Descoberta',
      tabApps: 'Aplicações',
      bohrTitle: 'Sistema Rutherford-Bohr 3D',
      nucleus: 'Núcleo',
      electrons: 'elétrons',
      shellsLabel: 'Camadas de Energia (Bohr)',
      orbitsToggle: 'Órbitas',
      bohrExplanation: 'Os elétrons orbitam o núcleo positivo em níveis discretos de energia quantizada (n = 1 a 7). Cada camada comporta no máximo 2n² elétrons (K=2, L=8, M=18, N=32, O=32, P=18, Q=8).',
      atomicMass: 'Massa Atômica',
      atomicNumber: 'Número Atômico (Z)',
      groupPeriod: 'Grupo / Período',
      phaseAt20: 'Estado a 20°C',
      meltingPoint: 'Ponto de Fusão',
      boilingPoint: 'Ponto de Ebulição',
      electronegativity: 'Eletronegatividade',
      density: 'Densidade',
      notApplicable: 'Não aplicável',
      unknown: 'Desconhecido',
      electronConfig: 'Configuração Eletrônica Completa:',
      physChemFeatures: 'Características Físico-Químicas:',
      discoverers: 'Descobridor(es):',
      discoveryYear: 'Ano da Descoberta:',
      originClassification: 'Classificação de Origem:',
      historicalContext: 'Contexto Histórico:',
      wikiBtn: 'Saiba mais no artigo da Wikipédia',
      appsTitle: 'Importância no Cotidiano, Tecnologia e Indústria:',
      viewBondsForAtom: 'Ver Ligações Químicas Formadas por este Átomo',
      compareWithAnother: 'Comparar com outro Elemento',
    },
    models: {
      modelSelectorLabel: 'Modelos de Visualização Atômica 3D',
      rotateInstruction: 'Rotacione com o mouse ou com o dedo • Zoom na pinça',
      rutherfordBohr: {
        name: 'Sistema Rutherford-Bohr 3D',
        shortName: 'Rutherford-Bohr',
        title: 'Sistema Rutherford-Bohr 3D (Planetário)',
        badge: 'Modelo Clássico Quantizado',
        desc: 'Modelo atômico planetário proposto por Ernest Rutherford e Niels Bohr. Os elétrons giram ao redor do núcleo positivo denso em camadas circulares discretas de energia quantizada (K, L, M, N, O, P, Q).',
      },
      quantumOrbital: {
        name: 'Modelo Orbital / Mecânica Quântica',
        shortName: 'Mecânica Quântica',
        title: 'Modelo Orbital Quântico (Schrödinger, Heisenberg e Dirac)',
        badge: 'Modelo Científico Atual',
        desc: 'O modelo científico contemporâneo. Em vez de trajetórias circulares rígidas, os elétrons formam uma nuvem de probabilidade eletrônica tridimensional (|ψ|²), onde existe a máxima chance de encontrar a partícula.',
        uncertaintyPrinciple: 'Princípio da Incerteza de Heisenberg: é impossível determinar com precisão infinita e simultânea a posição e o momento linear de um elétron (Δx · Δp ≥ ℏ/2).',
      },
      ballAndStick: {
        name: 'Esferas e Bastões (Ball-and-Stick)',
        shortName: 'Esferas & Bastões',
        title: 'Modelo de Esferas e Bastões (Ball-and-Stick)',
        badge: 'Geometria e Ângulos de Ligação',
        desc: 'Os átomos do elemento são visualizados como esferas coloridas e as ligações químicas como bastões cilíndricos. É excelente para observar a geometria espacial, os ângulos de ligação e a coordenação cristalográfica.',
        geometryNote: 'Mostra o arranjo natural característico (molécula diatômica, anel poliátomo ou retículo cristalino elementar).',
      },
      spaceFilling: {
        name: 'Espaço Preenchido (Calotte / Van der Waals)',
        shortName: 'Espaço Preenchido',
        title: 'Modelo de Espaço Preenchido (Calotte / Space-filling)',
        badge: 'Raios Reais de Van der Waals',
        desc: 'Mostra os átomos como esferas cujos raios são rigorosamente proporcionais aos raios atômicos reais (raios de Van der Waals). Oferece uma noção física realista do volume estérico e do espaço 3D ocupado pelo elemento.',
        vanDerWaalsRadius: 'Representação volumétrica precisa sem vazios artificiais entre os átomos ligados.',
      },
    },
    bonds: {
      modalTitle: 'Simulador Interativo de Ligações Químicas 3D',
      badgeOctet: 'Regra do Octeto',
      subtitle: 'Veja como os elétrons unem átomos para formar moléculas estáveis',
      selectMolecule: 'Selecione uma Molécula:',
      atomInteraction: 'Interação dos Átomos:',
      btnSeparated: 'Separados',
      btnFormBond: 'Formar Ligação',
      atomsInMolecule: 'Átomos na molécula:',
      valenceElectrons: 'e⁻ val.',
      orbitControlTip: 'Gire com o mouse ou dedo para examinar a geometria tridimensional',
      molecularChemistry: 'Química Molecular',
      bondType: 'Tipo de Ligação:',
      spatialGeometry: 'Geometria Espacial:',
      mechanism: 'Mecanismo:',
      transferMechanism: 'Transferência definitiva de e⁻',
      sharingMechanism: 'Compartilhamento de pares de e⁻',
      howStabilizationWorks: 'Como ocorre a estabilização:',
      octetRuleTitle: 'Regra do Octeto:',
      octetRuleText: 'A maioria dos átomos busca adquirir a configuração de gás nobre com 8 elétrons na camada de valência (ou 2 no caso do Hidrogênio) para alcançar a estabilidade termodinâmica mínima.',
      molecules: {
        h2o: {
          name: 'Água',
          bondTypeLabel: 'Ligação Covalente Polar',
          geometry: 'Angular (104,5°)',
          description: 'A molécula essencial para toda a vida conhecida. O oxigênio atrai com mais força os elétrons compartilhados gerando polos elétricos.',
          explanation: 'O oxigênio (6 elétrons de valência) compartilha 1 par de elétrons com cada um dos dois hidrogênios (1 elétron cada), completando o octeto com 8 elétrons e os hidrogênios com 2 (dueto). A alta eletronegatividade do oxigênio cria cargas parciais δ- no O e δ+ nos H.',
        },
        nacl: {
          name: 'Cloreto de Sódio (Sal)',
          bondTypeLabel: 'Ligação Iônica',
          geometry: 'Linear / Retículo Cristalino Cúbico',
          description: 'O exemplo clássico de atração eletrostática intensa entre um cátion metálico e um ânion não-metálico.',
          explanation: 'O sódio (Na) possui 1 elétron na camada de valência; ele doa esse elétron completamente para o cloro (Cl), que possui 7 elétrons. O Na se torna o cátion Na⁺ e o Cl vira o ânion Cl⁻ com octeto completo.',
        },
        co2: {
          name: 'Dióxido de Carbono',
          bondTypeLabel: 'Ligações Covalentes Duplas Polares (Molécula Linear Apolar)',
          geometry: 'Linear (180°)',
          description: 'Gás vital na respiração vegetal (fotossíntese) e responsável pelo efeito estufa atmosférico natural.',
          explanation: 'O átomo de carbono central compartilha 2 pares de elétrons com cada oxigênio, formando duas ligações duplas (O=C=O). Ambos atingem a estabilidade do octeto.',
        },
        ch4: {
          name: 'Metano',
          bondTypeLabel: 'Ligação Covalente Apolar',
          geometry: 'Tetraédrica (109,5°)',
          description: 'O mais simples dos hidrocarbonetos e principal componente do gás natural fóssil e biogás.',
          explanation: 'O carbono forma orbitais híbridos sp³ em arranjo tetraédrico tridimensional, compartilhando 1 elétron com cada um dos 4 átomos de hidrogênio.',
        },
        o2: {
          name: 'Gás Oxigênio',
          bondTypeLabel: 'Ligação Covalente Dupla Apolar',
          geometry: 'Linear',
          description: 'O gás que respiramos. Dois átomos idênticos de oxigênio unidos por uma ligação dupla forte (O=O).',
          explanation: 'Como os dois átomos têm a mesma eletronegatividade, os 2 pares de elétrons compartilhados (4 elétrons no total) são atraídos com exatamente a mesma intensidade por ambos os núcleos.',
        },
        nh3: {
          name: 'Amônia',
          bondTypeLabel: 'Ligação Covalente Polar',
          geometry: 'Piramidal Trigonal (107°)',
          description: 'Composto chave para fertilizantes agrícolas nitrogenados que alimentam bilhões de pessoas.',
          explanation: 'O nitrogênio possui 5 elétrons de valência. Ele compartilha 3 elétrons com 3 hidrogênios e mantém 1 par de elétrons isolado no topo, empurrando as ligações para uma pirâmide.',
        },
      },
    },
    compare: {
      modalTitle: 'Comparador Quântico de Elementos',
      badge: 'Configuração Eletrônica & Propriedades',
      subtitle: 'Compare lado a lado átomos, massa, camadas de Bohr e características periódicas',
      elementA: 'Elemento A:',
      elementB: 'Elemento B:',
      searchAPlaceholder: 'Pesquisar elemento A (ex: Ferro, Fe, 26)...',
      searchBPlaceholder: 'Pesquisar elemento B (ex: Ouro, Au, 79)...',
      tableTitle: 'Tabela Comparativa de Propriedades Químicas e Físicas',
      property: 'Propriedade',
      electronConfig: 'Configuração Eletrônica',
      atomicMass: 'Massa Atômica',
      electronegativity: 'Eletronegatividade (Pauling)',
      category: 'Categoria',
      position: 'Posição Periódica',
      phase: 'Estado Físico a 20°C',
      meltingPoint: 'Ponto de Fusão',
      boilingPoint: 'Ponto de Ebulição',
      origin: 'Origem do Elemento',
      discovery: 'História da Descoberta',
    },
  },

  en: {
    app: {
      title: '3D Periodic Table',
      subtitleBadge: '118 Elements (92 Natural • 26 Artificial)',
      description: 'Quantum and Rutherford-Bohr atomic models, orbitals, chemical bonds and physical properties',
      cameraTip: 'Left-click to rotate • Scroll to zoom • Right-click to pan',
      elementsCounter: 'elements',
      viewTable: '3D Table',
      viewCylinder: 'Spiral',
      viewSphere: 'Globe',
      btnBonds: '3D Chemical Bonds',
      btnCompare: 'Compare Elements',
      btnOrganic: 'Organic Functions',
      btnInorganic: 'Inorganic Functions',
      searchPlaceholder: 'Search by name, symbol, number, group, mass (e.g. Gold, Au, 79, 12.011, Group 18)...',
      clearFilters: 'Clear Filters',
      allCategories: 'All Categories',
      allPhases: 'All States of Matter',
      allOrigins: 'Origin (All 118)',
      naturalOnly: '92 Natural Elements',
      artificialOnly: '26 Synthetic Elements',
      naturalBadge: 'Natural',
      artificialBadge: 'Synthetic',
      emptySelectionTitle: 'Explore All 118 Elements',
      emptySelectionDesc: 'Click on any element in the 3D table to inspect its 3D Rutherford-Bohr System, Quantum Orbital Model, Ball-and-Stick, and Space-Filling Calotte.',
      btnExploreBonds: 'Explore 3D Chemical Bonds',
    },
    categories: {
      'nao-metal': 'Non-metal',
      'gas-nobre': 'Noble Gas',
      'metal-alcalino': 'Alkali Metal',
      'metal-alcalino-terroso': 'Alkaline Earth',
      'metaloide': 'Metalloid',
      'halogenio': 'Halogen',
      'metal-pos-transicao': 'Post-transition Metal',
      'metal-transicao': 'Transition Metal',
      'lantanideo': 'Lanthanide',
      'actinideo': 'Actinide',
    },
    phases: {
      gas: 'Gas',
      liquido: 'Liquid',
      solido: 'Solid',
      desconhecido: 'Unknown / Synthetic',
    },
    phaseFilterLabels: {
      all: 'All States',
      solid: 'Solids',
      liquid: 'Liquids (Hg, Br, Ga, Cs)',
      gas: 'Gases',
      unknown: 'Synthetic / Predicted',
    },
    sidebar: {
      tabBohr: 'Rutherford-Bohr',
      tabProps: 'Properties',
      tabHistory: 'Discovery',
      tabApps: 'Applications',
      bohrTitle: '3D Rutherford-Bohr System',
      nucleus: 'Nucleus',
      electrons: 'electrons',
      shellsLabel: 'Energy Shells (Bohr)',
      orbitsToggle: 'Orbits',
      bohrExplanation: 'Electrons orbit the positive nucleus in discrete quantized energy levels (n = 1 to 7). Each shell holds at most 2n² electrons (K=2, L=8, M=18, N=32, O=32, P=18, Q=8).',
      atomicMass: 'Atomic Mass',
      atomicNumber: 'Atomic Number (Z)',
      groupPeriod: 'Group / Period',
      phaseAt20: 'Phase at 20°C',
      meltingPoint: 'Melting Point',
      boilingPoint: 'Boiling Point',
      electronegativity: 'Electronegativity',
      density: 'Density',
      notApplicable: 'Not applicable',
      unknown: 'Unknown',
      electronConfig: 'Complete Electron Configuration:',
      physChemFeatures: 'Physicochemical Features:',
      discoverers: 'Discoverer(s):',
      discoveryYear: 'Year of Discovery:',
      originClassification: 'Origin Classification:',
      historicalContext: 'Historical Context:',
      wikiBtn: 'Learn more on Wikipedia',
      appsTitle: 'Importance in Daily Life, Tech & Industry:',
      viewBondsForAtom: 'View Chemical Bonds Formed by this Atom',
      compareWithAnother: 'Compare with Another Element',
    },
    models: {
      modelSelectorLabel: '3D Atomic Visualization Models',
      rotateInstruction: 'Rotate with mouse or finger • Pinch to zoom',
      rutherfordBohr: {
        name: '3D Rutherford-Bohr System',
        shortName: 'Rutherford-Bohr',
        title: '3D Rutherford-Bohr Planetary System',
        badge: 'Classic Quantized Model',
        desc: 'Planetary atomic model introduced by Ernest Rutherford and Niels Bohr. Electrons revolve around the dense positive nucleus in discrete, quantized circular orbits (K, L, M, N, O, P, Q).',
      },
      quantumOrbital: {
        name: 'Orbital / Quantum Mechanics Model',
        shortName: 'Quantum Mechanics',
        title: 'Quantum Orbital Model (Schrödinger, Heisenberg & Dirac)',
        badge: 'Current Scientific Model',
        desc: 'The modern scientific model. Instead of fixed circular orbits, electrons form a 3D electronic probability cloud (|ψ|²), mapping regions with maximum probability of finding an electron.',
        uncertaintyPrinciple: 'Heisenberg Uncertainty Principle: It is physically impossible to simultaneously measure with infinite precision both position and momentum of an electron (Δx · Δp ≥ ℏ/2).',
      },
      ballAndStick: {
        name: 'Ball-and-Stick Model',
        shortName: 'Ball-and-Stick',
        title: 'Ball-and-Stick Molecular & Lattice Model',
        badge: 'Geometry & Bond Angles',
        desc: 'Atoms are represented as colored spheres and chemical bonds as connecting rods. Ideal for inspecting spatial molecular geometry, bonding angles, and crystalline coordination.',
        geometryNote: 'Represents the natural elemental state (diatomic gas, polyatomic ring, or elemental crystal lattice).',
      },
      spaceFilling: {
        name: 'Space-filling Model (Calotte / Van der Waals)',
        shortName: 'Space-filling',
        title: 'Space-Filling Model (Calotte / Van der Waals)',
        badge: 'Real Van der Waals Radii',
        desc: 'Atoms are displayed as interlocking spheres proportional to their actual Van der Waals atomic radii, providing an accurate sense of the steric volume and space occupied by the element.',
        vanDerWaalsRadius: 'True volumetric depiction with no artificial empty gaps between bonded atoms.',
      },
    },
    bonds: {
      modalTitle: '3D Chemical Bonds Interactive Simulator',
      badgeOctet: 'Octet Rule',
      subtitle: 'See how valence electrons join atoms to form stable molecules',
      selectMolecule: 'Select a Molecule:',
      atomInteraction: 'Atomic Interaction:',
      btnSeparated: 'Separated',
      btnFormBond: 'Form Bond',
      atomsInMolecule: 'Atoms in molecule:',
      valenceElectrons: 'val. e⁻',
      orbitControlTip: 'Rotate with your mouse or finger to inspect the 3D geometry',
      molecularChemistry: 'Molecular Chemistry',
      bondType: 'Bond Type:',
      spatialGeometry: 'Spatial Geometry:',
      mechanism: 'Mechanism:',
      transferMechanism: 'Definitive e⁻ transfer',
      sharingMechanism: 'Sharing of e⁻ pairs',
      howStabilizationWorks: 'How stabilization occurs:',
      octetRuleTitle: 'The Octet Rule:',
      octetRuleText: 'Most atoms strive to acquire a noble gas configuration with 8 valence electrons (or 2 for Hydrogen) to reach minimal thermodynamic energy and maximum stability.',
      molecules: {
        h2o: {
          name: 'Water',
          bondTypeLabel: 'Polar Covalent Bond',
          geometry: 'Bent (104.5°)',
          description: 'The molecule essential to all known life. Oxygen pulls the shared electron pairs closer, generating electrical dipoles.',
          explanation: 'Oxygen (6 valence electrons) shares 1 electron pair with each of the two hydrogen atoms (1 electron each), completing its octet with 8 electrons and hydrogen with 2 (duet). Oxygen’s high electronegativity creates partial charges δ- on O and δ+ on H.',
        },
        nacl: {
          name: 'Sodium Chloride (Table Salt)',
          bondTypeLabel: 'Ionic Bond',
          geometry: 'Linear / Cubic Crystal Lattice',
          description: 'The textbook example of electrostatic attraction between a metal cation and a non-metal anion.',
          explanation: 'Sodium (Na) has 1 valence electron and easily loses it to chlorine (Cl), which has 7 electrons. Na becomes the stable Na⁺ cation and Cl becomes the Cl⁻ anion with a complete octet.',
        },
        co2: {
          name: 'Carbon Dioxide',
          bondTypeLabel: 'Double Polar Covalent Bonds (Nonpolar Molecule)',
          geometry: 'Linear (180°)',
          description: 'A vital gas in plant photosynthesis and the principal greenhouse gas in planetary atmospheric equilibrium.',
          explanation: 'The central carbon atom shares 2 pairs of electrons with each oxygen atom, forming two double bonds (O=C=O). Both achieve octet stability. Because it is linear, dipoles cancel out.',
        },
        ch4: {
          name: 'Methane',
          bondTypeLabel: 'Nonpolar Covalent Bond',
          geometry: 'Tetrahedral (109.5°)',
          description: 'The simplest hydrocarbon and main constituent of natural gas and biogas fuel.',
          explanation: 'Carbon forms sp³ hybrid orbitals in a symmetrical 3D tetrahedron, sharing 1 electron with each of the 4 hydrogen atoms.',
        },
        o2: {
          name: 'Oxygen Gas',
          bondTypeLabel: 'Nonpolar Double Covalent Bond',
          geometry: 'Linear',
          description: 'The gas we breathe. Two identical oxygen atoms bound by a strong double bond (O=O).',
          explanation: 'Because both atoms have the exact same electronegativity, the 2 shared electron pairs (4 electrons total) are pulled equally by both nuclei.',
        },
        nh3: {
          name: 'Ammonia',
          bondTypeLabel: 'Polar Covalent Bond',
          geometry: 'Trigonal Pyramidal (107°)',
          description: 'Key compound for nitrogenous fertilizers feeding billions through the Haber-Bosch process.',
          explanation: 'Nitrogen has 5 valence electrons. It shares 3 electrons with 3 hydrogen atoms and keeps a lone electron pair at the apex, repelling the bonds downward into a pyramid.',
        },
      },
    },
    compare: {
      modalTitle: 'Quantum Element Comparator',
      badge: 'Electron Configuration & Properties',
      subtitle: 'Side-by-side comparison of atoms, mass, Bohr shells and periodic trends',
      elementA: 'Element A:',
      elementB: 'Element B:',
      searchAPlaceholder: 'Search element A (e.g. Iron, Fe, 26)...',
      searchBPlaceholder: 'Search element B (e.g. Gold, Au, 79)...',
      tableTitle: 'Comparative Table of Chemical & Physical Properties',
      property: 'Property',
      electronConfig: 'Electron Configuration',
      atomicMass: 'Atomic Mass',
      electronegativity: 'Electronegativity (Pauling)',
      category: 'Category',
      position: 'Periodic Position',
      phase: 'Phase at 20°C',
      meltingPoint: 'Melting Point',
      boilingPoint: 'Boiling Point',
      origin: 'Element Origin',
      discovery: 'Discovery History',
    },
  },

  ru: {
    app: {
      title: '3D Периодическая таблица',
      subtitleBadge: '118 элементов (92 природных • 26 искусственных)',
      description: 'Квантовые модели и система Резерфорда-Бора, орбитали, химические связи и физические свойства',
      cameraTip: 'Вращение: левая кнопка • Масштаб: колесико • Сдвиг: правая кнопка',
      elementsCounter: 'элементов',
      viewTable: '3D Таблица',
      viewCylinder: 'Спираль',
      viewSphere: 'Сфера',
      btnBonds: '3D Химические связи',
      btnCompare: 'Сравнить элементы',
      btnOrganic: 'Органические функции',
      btnInorganic: 'Неорганические функции',
      searchPlaceholder: 'Поиск по названию, символу, номеру, группе, массе (напр.: Золото, Au, 79, 12.011, Группа 18)...',
      clearFilters: 'Сбросить фильтры',
      allCategories: 'Все категории',
      allPhases: 'Все агрегатные состояния',
      allOrigins: 'Происхождение (Все 118)',
      naturalOnly: '92 природных элемента',
      artificialOnly: '26 искусственных элементов',
      naturalBadge: 'Природный',
      artificialBadge: 'Искусственный',
      emptySelectionTitle: 'Исследуйте 118 химических элементов',
      emptySelectionDesc: 'Нажмите на любой элемент в 3D-таблице для просмотра 3D Системы Резерфорда-Бора, квантовой орбитальной модели, шаростержневой модели и модели заполненного пространства.',
      btnExploreBonds: 'Смотреть 3D химические связи',
    },
    categories: {
      'nao-metal': 'Неметалл',
      'gas-nobre': 'Благородный газ',
      'metal-alcalino': 'Щелочной металл',
      'metal-alcalino-terroso': 'Щелочноземельный металл',
      'metaloide': 'Полуметалл',
      'halogenio': 'Галоген',
      'metal-pos-transicao': 'Постпереходный металл',
      'metal-transicao': 'Переходный металл',
      'lantanideo': 'Лантаноид',
      'actinideo': 'Актиноид',
    },
    phases: {
      gas: 'Газ',
      liquido: 'Жидкость',
      solido: 'Твердое',
      desconhecido: 'Неизвестно / Синтетический',
    },
    phaseFilterLabels: {
      all: 'Все состояния',
      solid: 'Твердые',
      liquid: 'Жидкие (Hg, Br, Ga, Cs)',
      gas: 'Газы',
      unknown: 'Синтетические / Расчетные',
    },
    sidebar: {
      tabBohr: 'Резерфорд-Бор',
      tabProps: 'Свойства',
      tabHistory: 'Открытие',
      tabApps: 'Применение',
      bohrTitle: '3D Система Резерфорда-Бора',
      nucleus: 'Ядро',
      electrons: 'электронов',
      shellsLabel: 'Энергетические уровни (Бор)',
      orbitsToggle: 'Орбиты',
      bohrExplanation: 'Электроны обращаются вокруг положительного ядра по квантованным дискретным орбитам (n = 1-7). Максимум на оболочке: 2n² электронов (K=2, L=8, M=18, N=32, O=32, P=18, Q=8).',
      atomicMass: 'Атомная масса',
      atomicNumber: 'Атомный номер (Z)',
      groupPeriod: 'Группа / Период',
      phaseAt20: 'Состояние при 20°C',
      meltingPoint: 'Температура плавления',
      boilingPoint: 'Температура кипения',
      electronegativity: 'Электроотрицательность',
      density: 'Плотность',
      notApplicable: 'Не применимо',
      unknown: 'Неизвестно',
      electronConfig: 'Электронная конфигурация:',
      physChemFeatures: 'Физико-химические свойства:',
      discoverers: 'Первооткрыватель(и):',
      discoveryYear: 'Год открытия:',
      originClassification: 'Происхождение элемента:',
      historicalContext: 'Исторический контекст:',
      wikiBtn: 'Подробнее в Википедии',
      appsTitle: 'Значение в жизни, технологиях и промышленности:',
      viewBondsForAtom: 'Смотреть химические связи этого атома',
      compareWithAnother: 'Сравнить с другим элементом',
    },
    models: {
      modelSelectorLabel: '3D Модели визуализации атома',
      rotateInstruction: 'Вращение мышью или пальцем • Масштаб щипком',
      rutherfordBohr: {
        name: '3D Система Резерфорда-Бора',
        shortName: 'Резерфорд-Бор',
        title: '3D Планетарная система Резерфорда-Бора',
        badge: 'Классическая квантовая модель',
        desc: 'Планетарная модель атома Резерфорда-Бора. Электроны вращаются вокруг плотного положительного ядра по квантованным круговым оболочкам (K, L, M, N, O, P, Q).',
      },
      quantumOrbital: {
        name: 'Орбитальная / Квантово-механическая модель',
        shortName: 'Квантовая механика',
        title: 'Квантово-механическая орбитальная модель (Шрёдингер, Гейзенберг, Дирак)',
        badge: 'Современная научная модель',
        desc: 'Современная модель атома. Вместо жестких траекторий электроны образуют трехмерное электронное облако плотности вероятности (|ψ|²), определяющее области максимального нахождения электрона.',
        uncertaintyPrinciple: 'Принцип неопределенности Гейзенберга: невозможно одновременно с абсолютной точностью определить координаты и импульс квантовой частицы (Δx · Δp ≥ ℏ/2).',
      },
      ballAndStick: {
        name: 'Шаростержневая модель (Ball-and-Stick)',
        shortName: 'Шары и стержни',
        title: 'Шаростержневая модель (Ball-and-Stick)',
        badge: 'Геометрия и углы связей',
        desc: 'Атомы представлены цветными сферами, а химические связи — стержнями. Позволяет наглядно оценить пространственную геометрию, валентные углы и структуру кристаллической решетки.',
        geometryNote: 'Отражает характерное пространственное строение простого вещества (двухатомная молекула, кольцо или кристаллическая решетка).',
      },
      spaceFilling: {
        name: 'Модель заполненного пространства (Калотта / Ван-дер-Ваальс)',
        shortName: 'Заполненное пространство',
        title: 'Модель заполненного пространства (Calotte / Space-filling)',
        badge: 'Реальные радиусы Ван-дер-Ваальса',
        desc: 'Атомы отображаются сферами, радиусы которых пропорциональны истинным ван-дер-ваальсовым радиусам. Дает реалистичное физическое представление о занимаемом атомом трехмерном объеме.',
        vanDerWaalsRadius: 'Точное объемное представление без искусственных пустот между связанными атомами.',
      },
    },
    bonds: {
      modalTitle: 'Интерактивный 3D-симулятор химических связей',
      badgeOctet: 'Правило октета',
      subtitle: 'Как валентные электроны объединяют атомы в устойчивые молекулы',
      selectMolecule: 'Выберите молекулу:',
      atomInteraction: 'Взаимодействие атомов:',
      btnSeparated: 'Разделены',
      btnFormBond: 'Образовать связь',
      atomsInMolecule: 'Атомы в молекуле:',
      valenceElectrons: 'вал. e⁻',
      orbitControlTip: 'Вращайте мышью или пальцем для исследования 3D-геометрии',
      molecularChemistry: 'Молекулярная химия',
      bondType: 'Тип связи:',
      spatialGeometry: 'Пространственная геометрия:',
      mechanism: 'Механизм:',
      transferMechanism: 'Полная передача электрона',
      sharingMechanism: 'Обобществление пар электронов',
      howStabilizationWorks: 'Как достигается устойчивость:',
      octetRuleTitle: 'Правило октета:',
      octetRuleText: 'Большинство атомов стремятся приобрести электронную оболочку благородного газа с 8 валентными электронами (или 2 для водорода) для достижения минимальной потенциальной энергии.',
      molecules: {
        h2o: {
          name: 'Вода',
          bondTypeLabel: 'Ковалентная полярная связь',
          geometry: 'Угловая (104,5°)',
          description: 'Главная молекула жизни. Кислород сильнее притягивает общие пары электронов, образуя электрические полюса.',
          explanation: 'Кислород (6 валентных электронов) делит по одной паре электронов с двумя атомами водорода, заполняя октет до 8 электронов, а водород до 2 (дуплет).',
        },
        nacl: {
          name: 'Хлорид натрия (Поваренная соль)',
          bondTypeLabel: 'Ионная связь',
          geometry: 'Кубическая кристаллическая решетка',
          description: 'Классический пример электростатического притяжения металлического катиона и неметаллического аниона.',
          explanation: 'Натрий (Na) имеет 1 валентный электрон и полностью отдает его атому хлора (Cl) с 7 электронами. Na становится катионом Na⁺, а Cl — анионом Cl⁻ с заполненным октетом.',
        },
        co2: {
          name: 'Углекислый газ',
          bondTypeLabel: 'Двойные полярные связи (Неполярная молекула)',
          geometry: 'Линейная (180°)',
          description: 'Жизненно важный газ для фотосинтеза растений и регулятор парникового эффекта Земли.',
          explanation: 'Центральный атом углерода обобществляет по 2 пары электронов с каждым кислородом, образуя две двойные связи (O=C=O).',
        },
        ch4: {
          name: 'Метан',
          bondTypeLabel: 'Ковалентная неполярная связь',
          geometry: 'Тетраэдрическая (109,5°)',
          description: 'Простейший углеводород, основной компонент природного газа.',
          explanation: 'Углерод образует sp³-гибридные орбитали в виде тетраэдра, связываясь с 4 атомами водорода.',
        },
        o2: {
          name: 'Кислород',
          bondTypeLabel: 'Ковалентная неполярная двойная связь',
          geometry: 'Линейная',
          description: 'Газ, которым мы дышим. Два одинаковых атома кислорода связаны прочной двойной связью (O=O).',
          explanation: 'Так как атомы обладают одинаковой электроотрицательностью, две пары электронов делятся абсолютно симметрично.',
        },
        nh3: {
          name: 'Аммиак',
          bondTypeLabel: 'Ковалентная полярная связь',
          geometry: 'Тригонально-пирамидальная (107°)',
          description: 'Основа азотных удобрений, обеспечивающих продовольствием миллиарды людей.',
          explanation: 'Азот имеет 5 валентных электронов. Он обобществляет 3 электрона с 3 водородами, а неподеленная пара отталкивает связи книзу, образуя пирамиду.',
        },
      },
    },
    compare: {
      modalTitle: 'Квантовое сравнение элементов',
      badge: 'Электронная конфигурация и свойства',
      subtitle: 'Сравнение атомов, массы, оболочек Бора и периодических закономерностей',
      elementA: 'Элемент А:',
      elementB: 'Элемент B:',
      searchAPlaceholder: 'Поиск элемента A (напр.: Железо, Fe, 26)...',
      searchBPlaceholder: 'Поиск элемента B (напр.: Золото, Au, 79)...',
      tableTitle: 'Сравнительная таблица химических и физических свойств',
      property: 'Свойство',
      electronConfig: 'Электронная конфигурация',
      atomicMass: 'Атомная масса',
      electronegativity: 'Электроотрицательность (Полинг)',
      category: 'Категория',
      position: 'Положение в таблице',
      phase: 'Состояние при 20°C',
      meltingPoint: 'Температура плавления',
      boilingPoint: 'Температура кипения',
      origin: 'Происхождение элемента',
      discovery: 'История открытия',
    },
  },
};
