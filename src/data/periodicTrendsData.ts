export type PeriodicPropertyType =
  | 'atomicRadius'
  | 'electronegativity'
  | 'ionizationEnergy'
  | 'density'
  | 'meltingPoint'
  | 'electronAffinity';

export interface PeriodicPropertyMetadata {
  id: PeriodicPropertyType;
  name: string;
  unit: string;
  symbol: string;
  description: string;
  trendGroupRule: string; // Como varia na coluna (grupo)
  trendPeriodRule: string; // Como varia na linha (período)
  scientificWhy: string; // Por que ocorre fisicamente
  minVal: number;
  maxVal: number;
  highestElement: { symbol: string; name: string; value: string };
  lowestElement: { symbol: string; name: string; value: string };
}

export const PERIODIC_PROPERTIES_INFO: Record<PeriodicPropertyType, PeriodicPropertyMetadata> = {
  atomicRadius: {
    id: 'atomicRadius',
    name: 'Raio Atômico',
    unit: 'pm (picômetros)',
    symbol: 'r_at',
    description: 'Distância média entre o núcleo atômico e a camada eletrônica de valência mais externa.',
    trendGroupRule: 'Aumenta de CIMA para BAIXO (↓)',
    trendPeriodRule: 'Aumenta da DIREITA para a ESQUERDA (←)',
    scientificWhy: 'No grupo, o número quântico principal (camadas K, L, M...) cresce, afastando os elétrons do núcleo (efeito de blindagem). No período, com o mesmo número de camadas, o aumento da carga nuclear efetiva (Z_eff) puxa a eletrosfera para mais perto, encolhendo o átomo.',
    minVal: 30,
    maxVal: 350,
    highestElement: { symbol: 'Fr', name: 'Frâncio', value: '348 pm' },
    lowestElement: { symbol: 'He', name: 'Hélio', value: '31 pm' },
  },
  electronegativity: {
    id: 'electronegativity',
    name: 'Eletronegatividade',
    unit: 'Escala Pauling',
    symbol: 'χ',
    description: 'Tendência relativa de um átomo em atrair o par de elétrons compartilhado em uma ligação química.',
    trendGroupRule: 'Aumenta de BAIXO para CIMA (↑)',
    trendPeriodRule: 'Aumenta da ESQUERDA para a DIREITA (→)',
    scientificWhy: 'Átomos menores com alta carga nuclear efetiva têm seus núcleos mais próximos dos elétrons externos, exercendo uma atração eletrostática coulombiana muito mais intensa sobre os elétrons de ligação.',
    minVal: 0.7,
    maxVal: 4.0,
    highestElement: { symbol: 'F', name: 'Flúor', value: '3.98' },
    lowestElement: { symbol: 'Fr', name: 'Frâncio', value: '0.70' },
  },
  ionizationEnergy: {
    id: 'ionizationEnergy',
    name: '1ª Energia de Ionização',
    unit: 'kJ/mol',
    symbol: 'E_i',
    description: 'Energia mínima requerida para remover o elétron mais fracamente ligado de um átomo neutro e isolado no estado gasoso: X(g) + E_i → X⁺(g) + e⁻.',
    trendGroupRule: 'Aumenta de BAIXO para CIMA (↑)',
    trendPeriodRule: 'Aumenta da ESQUERDA para a DIREITA (→)',
    scientificWhy: 'Quanto menor o raio e maior a carga nuclear efetiva, mais fortemente o elétron está preso ao poço de potencial do núcleo, exigindo maior energia para ser ejetado. Os gases nobres têm as maiores energias devido à camada de valência completa e estável.',
    minVal: 370,
    maxVal: 2400,
    highestElement: { symbol: 'He', name: 'Hélio', value: '2.372 kJ/mol' },
    lowestElement: { symbol: 'Cs', name: 'Césio', value: '375.7 kJ/mol' },
  },
  density: {
    id: 'density',
    name: 'Densidade (a 20°C)',
    unit: 'g/cm³',
    symbol: 'ρ',
    description: 'Massa por unidade de volume. Nos sólidos e líquidos, reflete o empacotamento atômico e a massa nuclear condensada.',
    trendGroupRule: 'Cresce em direção ao CENTRO e BAIXO (↓)',
    trendPeriodRule: 'Máxima nos metais de transição centrais dos períodos 6 e 7',
    scientificWhy: 'Devido à contração dos lantanídeos, os elementos do período 6 (Ósmio, Irídio, Platina) têm núcleos extremamente pesados confinados em raios atômicos surpreendentemente pequenos, gerando a maior densidade da matéria na Terra.',
    minVal: 0.0001,
    maxVal: 23.0,
    highestElement: { symbol: 'Os', name: 'Ósmio', value: '22.59 g/cm³' },
    lowestElement: { symbol: 'H', name: 'Hidrogênio', value: '0.00009 g/cm³' },
  },
  meltingPoint: {
    id: 'meltingPoint',
    name: 'Ponto de Fusão',
    unit: '°C',
    symbol: 'T_f',
    description: 'Temperatura na qual a energia térmica supera as forças de coesão cristalina ou molecular, transicionando de sólido para líquido.',
    trendGroupRule: 'Varia segundo o tipo de ligação (covalente em rede > metálica forte > van der Waals)',
    trendPeriodRule: 'Atinge picos dramáticos no grupo 6 (Metais refratários como W) e no Carbono (rede diamante)',
    scientificWhy: 'O Tungstênio (W) possui orbitais d semipreenchidos que formam ligações metálicas ultrarresistentes. O Carbono na forma de diamante requer a quebra de redes covalentes tridimensionais colossais.',
    minVal: -273,
    maxVal: 3600,
    highestElement: { symbol: 'C', name: 'Carbono', value: '3.550 °C (sublimação)' },
    lowestElement: { symbol: 'He', name: 'Hélio', value: '-272.2 °C' },
  },
  electronAffinity: {
    id: 'electronAffinity',
    name: 'Afinidade Eletrônica',
    unit: 'kJ/mol',
    symbol: 'E_ea',
    description: 'Energia liberada quando um elétron é adicionado a um átomo neutro no estado gasoso para formar um ânion: X(g) + e⁻ → X⁻(g) + energia.',
    trendGroupRule: 'Aumenta para CIMA (com exceção do Cloro que supera o Flúor por menor repulsão intereletrônica)',
    trendPeriodRule: 'Aumenta da ESQUERDA para a DIREITA (máxima nos Halogênios)',
    scientificWhy: 'Halogênios necessitam de apenas 1 elétron para alcançar a configuração estável de gás nobre. O Cloro tem a maior afinidade porque sua camada 3p é um pouco mais espaçosa que a 2p do Flúor, sofrendo menor repulsão entre os elétrons.',
    minVal: 0,
    maxVal: 360,
    highestElement: { symbol: 'Cl', name: 'Cloro', value: '349 kJ/mol' },
    lowestElement: { symbol: 'Ne', name: 'Neônio', value: '0 kJ/mol (estável)' },
  },
};

// Mapeamento científico de valores de raio atômico (pm), 1ª energia de ionização (kJ/mol) e afinidade eletrônica (kJ/mol) para os 118 elementos
export const ELEMENT_TREND_VALUES: Record<
  number,
  {
    atomicRadius: number; // pm
    ionizationEnergy: number; // kJ/mol
    electronAffinity: number; // kJ/mol
  }
> = {
  1: { atomicRadius: 53, ionizationEnergy: 1312, electronAffinity: 73 }, // H
  2: { atomicRadius: 31, ionizationEnergy: 2372, electronAffinity: 0 }, // He
  3: { atomicRadius: 167, ionizationEnergy: 520, electronAffinity: 60 }, // Li
  4: { atomicRadius: 112, ionizationEnergy: 899, electronAffinity: 0 }, // Be
  5: { atomicRadius: 87, ionizationEnergy: 801, electronAffinity: 27 }, // B
  6: { atomicRadius: 67, ionizationEnergy: 1086, electronAffinity: 122 }, // C
  7: { atomicRadius: 56, ionizationEnergy: 1402, electronAffinity: 7 }, // N
  8: { atomicRadius: 48, ionizationEnergy: 1314, electronAffinity: 141 }, // O
  9: { atomicRadius: 42, ionizationEnergy: 1681, electronAffinity: 328 }, // F
  10: { atomicRadius: 38, ionizationEnergy: 2080, electronAffinity: 0 }, // Ne
  11: { atomicRadius: 190, ionizationEnergy: 496, electronAffinity: 53 }, // Na
  12: { atomicRadius: 145, ionizationEnergy: 738, electronAffinity: 0 }, // Mg
  13: { atomicRadius: 118, ionizationEnergy: 578, electronAffinity: 43 }, // Al
  14: { atomicRadius: 111, ionizationEnergy: 786, electronAffinity: 134 }, // Si
  15: { atomicRadius: 98, ionizationEnergy: 1012, electronAffinity: 72 }, // P
  16: { atomicRadius: 88, ionizationEnergy: 1000, electronAffinity: 200 }, // S
  17: { atomicRadius: 79, ionizationEnergy: 1251, electronAffinity: 349 }, // Cl
  18: { atomicRadius: 71, ionizationEnergy: 1520, electronAffinity: 0 }, // Ar
  19: { atomicRadius: 243, ionizationEnergy: 419, electronAffinity: 48 }, // K
  20: { atomicRadius: 194, ionizationEnergy: 590, electronAffinity: 2 }, // Ca
  21: { atomicRadius: 184, ionizationEnergy: 633, electronAffinity: 18 }, // Sc
  22: { atomicRadius: 176, ionizationEnergy: 658, electronAffinity: 8 }, // Ti
  23: { atomicRadius: 171, ionizationEnergy: 650, electronAffinity: 51 }, // V
  24: { atomicRadius: 166, ionizationEnergy: 653, electronAffinity: 65 }, // Cr
  25: { atomicRadius: 161, ionizationEnergy: 717, electronAffinity: 0 }, // Mn
  26: { atomicRadius: 156, ionizationEnergy: 762, electronAffinity: 16 }, // Fe
  27: { atomicRadius: 152, ionizationEnergy: 760, electronAffinity: 64 }, // Co
  28: { atomicRadius: 149, ionizationEnergy: 737, electronAffinity: 112 }, // Ni
  29: { atomicRadius: 145, ionizationEnergy: 745, electronAffinity: 119 }, // Cu
  30: { atomicRadius: 142, ionizationEnergy: 906, electronAffinity: 0 }, // Zn
  31: { atomicRadius: 136, ionizationEnergy: 579, electronAffinity: 41 }, // Ga
  32: { atomicRadius: 125, ionizationEnergy: 762, electronAffinity: 119 }, // Ge
  33: { atomicRadius: 114, ionizationEnergy: 947, electronAffinity: 78 }, // As
  34: { atomicRadius: 103, ionizationEnergy: 941, electronAffinity: 195 }, // Se
  35: { atomicRadius: 94, ionizationEnergy: 1140, electronAffinity: 325 }, // Br
  36: { atomicRadius: 88, ionizationEnergy: 1351, electronAffinity: 0 }, // Kr
  37: { atomicRadius: 265, ionizationEnergy: 403, electronAffinity: 47 }, // Rb
  38: { atomicRadius: 219, ionizationEnergy: 549, electronAffinity: 5 }, // Sr
  39: { atomicRadius: 212, ionizationEnergy: 600, electronAffinity: 30 }, // Y
  40: { atomicRadius: 206, ionizationEnergy: 640, electronAffinity: 41 }, // Zr
  41: { atomicRadius: 198, ionizationEnergy: 652, electronAffinity: 86 }, // Nb
  42: { atomicRadius: 190, ionizationEnergy: 684, electronAffinity: 72 }, // Mo
  43: { atomicRadius: 183, ionizationEnergy: 702, electronAffinity: 53 }, // Tc
  44: { atomicRadius: 178, ionizationEnergy: 710, electronAffinity: 101 }, // Ru
  45: { atomicRadius: 173, ionizationEnergy: 720, electronAffinity: 110 }, // Rh
  46: { atomicRadius: 169, ionizationEnergy: 804, electronAffinity: 54 }, // Pd
  47: { atomicRadius: 165, ionizationEnergy: 731, electronAffinity: 126 }, // Ag
  48: { atomicRadius: 161, ionizationEnergy: 868, electronAffinity: 0 }, // Cd
  49: { atomicRadius: 156, ionizationEnergy: 558, electronAffinity: 39 }, // In
  50: { atomicRadius: 145, ionizationEnergy: 708, electronAffinity: 107 }, // Sn
  51: { atomicRadius: 133, ionizationEnergy: 834, electronAffinity: 103 }, // Sb
  52: { atomicRadius: 123, ionizationEnergy: 869, electronAffinity: 190 }, // Te
  53: { atomicRadius: 115, ionizationEnergy: 1008, electronAffinity: 295 }, // I
  54: { atomicRadius: 108, ionizationEnergy: 1170, electronAffinity: 0 }, // Xe
  55: { atomicRadius: 298, ionizationEnergy: 376, electronAffinity: 46 }, // Cs
  56: { atomicRadius: 253, ionizationEnergy: 503, electronAffinity: 14 }, // Ba
  57: { atomicRadius: 240, ionizationEnergy: 538, electronAffinity: 48 }, // La
  58: { atomicRadius: 235, ionizationEnergy: 534, electronAffinity: 50 }, // Ce
  59: { atomicRadius: 230, ionizationEnergy: 527, electronAffinity: 50 }, // Pr
  60: { atomicRadius: 228, ionizationEnergy: 533, electronAffinity: 50 }, // Nd
  61: { atomicRadius: 225, ionizationEnergy: 540, electronAffinity: 50 }, // Pm
  62: { atomicRadius: 222, ionizationEnergy: 545, electronAffinity: 50 }, // Sm
  63: { atomicRadius: 220, ionizationEnergy: 547, electronAffinity: 50 }, // Eu
  64: { atomicRadius: 218, ionizationEnergy: 593, electronAffinity: 50 }, // Gd
  65: { atomicRadius: 215, ionizationEnergy: 566, electronAffinity: 50 }, // Tb
  66: { atomicRadius: 212, ionizationEnergy: 573, electronAffinity: 50 }, // Dy
  67: { atomicRadius: 210, ionizationEnergy: 581, electronAffinity: 50 }, // Ho
  68: { atomicRadius: 208, ionizationEnergy: 589, electronAffinity: 50 }, // Er
  69: { atomicRadius: 206, ionizationEnergy: 597, electronAffinity: 50 }, // Tm
  70: { atomicRadius: 204, ionizationEnergy: 603, electronAffinity: 50 }, // Yb
  71: { atomicRadius: 202, ionizationEnergy: 523, electronAffinity: 50 }, // Lu
  72: { atomicRadius: 200, ionizationEnergy: 658, electronAffinity: 0 }, // Hf
  73: { atomicRadius: 195, ionizationEnergy: 761, electronAffinity: 31 }, // Ta
  74: { atomicRadius: 188, ionizationEnergy: 770, electronAffinity: 79 }, // W
  75: { atomicRadius: 182, ionizationEnergy: 760, electronAffinity: 14 }, // Re
  76: { atomicRadius: 177, ionizationEnergy: 840, electronAffinity: 106 }, // Os
  77: { atomicRadius: 173, ionizationEnergy: 880, electronAffinity: 151 }, // Ir
  78: { atomicRadius: 169, ionizationEnergy: 870, electronAffinity: 205 }, // Pt
  79: { atomicRadius: 166, ionizationEnergy: 890, electronAffinity: 223 }, // Au
  80: { atomicRadius: 162, ionizationEnergy: 1007, electronAffinity: 0 }, // Hg
  81: { atomicRadius: 156, ionizationEnergy: 589, electronAffinity: 19 }, // Tl
  82: { atomicRadius: 154, ionizationEnergy: 716, electronAffinity: 35 }, // Pb
  83: { atomicRadius: 143, ionizationEnergy: 703, electronAffinity: 91 }, // Bi
  84: { atomicRadius: 135, ionizationEnergy: 812, electronAffinity: 183 }, // Po
  85: { atomicRadius: 127, ionizationEnergy: 920, electronAffinity: 270 }, // At
  86: { atomicRadius: 120, ionizationEnergy: 1037, electronAffinity: 0 }, // Rn
  87: { atomicRadius: 348, ionizationEnergy: 380, electronAffinity: 47 }, // Fr
  88: { atomicRadius: 283, ionizationEnergy: 509, electronAffinity: 9 }, // Ra
  89: { atomicRadius: 260, ionizationEnergy: 499, electronAffinity: 34 }, // Ac
  90: { atomicRadius: 250, ionizationEnergy: 587, electronAffinity: 50 }, // Th
  91: { atomicRadius: 245, ionizationEnergy: 568, electronAffinity: 50 }, // Pa
  92: { atomicRadius: 240, ionizationEnergy: 598, electronAffinity: 50 }, // U
  93: { atomicRadius: 238, ionizationEnergy: 604, electronAffinity: 50 }, // Np
  94: { atomicRadius: 236, ionizationEnergy: 585, electronAffinity: 50 }, // Pu
  95: { atomicRadius: 234, ionizationEnergy: 578, electronAffinity: 50 }, // Am
  96: { atomicRadius: 232, ionizationEnergy: 581, electronAffinity: 50 }, // Cm
  97: { atomicRadius: 230, ionizationEnergy: 601, electronAffinity: 50 }, // Bk
  98: { atomicRadius: 228, ionizationEnergy: 608, electronAffinity: 50 }, // Cf
  99: { atomicRadius: 226, ionizationEnergy: 619, electronAffinity: 50 }, // Es
  100: { atomicRadius: 224, ionizationEnergy: 627, electronAffinity: 50 }, // Fm
  101: { atomicRadius: 222, ionizationEnergy: 635, electronAffinity: 50 }, // Md
  102: { atomicRadius: 220, ionizationEnergy: 642, electronAffinity: 50 }, // No
  103: { atomicRadius: 218, ionizationEnergy: 470, electronAffinity: 50 }, // Lr
  104: { atomicRadius: 210, ionizationEnergy: 580, electronAffinity: 50 }, // Rf
  105: { atomicRadius: 205, ionizationEnergy: 660, electronAffinity: 50 }, // Db
  106: { atomicRadius: 200, ionizationEnergy: 757, electronAffinity: 50 }, // Sg
  107: { atomicRadius: 195, ionizationEnergy: 740, electronAffinity: 50 }, // Bh
  108: { atomicRadius: 190, ionizationEnergy: 730, electronAffinity: 50 }, // Hs
  109: { atomicRadius: 185, ionizationEnergy: 800, electronAffinity: 50 }, // Mt
  110: { atomicRadius: 180, ionizationEnergy: 955, electronAffinity: 50 }, // Ds
  111: { atomicRadius: 175, ionizationEnergy: 1025, electronAffinity: 50 }, // Rg
  112: { atomicRadius: 170, ionizationEnergy: 1155, electronAffinity: 0 }, // Cn
  113: { atomicRadius: 170, ionizationEnergy: 705, electronAffinity: 50 }, // Nh
  114: { atomicRadius: 180, ionizationEnergy: 824, electronAffinity: 50 }, // Fl
  115: { atomicRadius: 187, ionizationEnergy: 538, electronAffinity: 50 }, // Mc
  116: { atomicRadius: 183, ionizationEnergy: 724, electronAffinity: 50 }, // Lv
  117: { atomicRadius: 178, ionizationEnergy: 743, electronAffinity: 166 }, // Ts
  118: { atomicRadius: 170, ionizationEnergy: 860, electronAffinity: 50 }, // Og
};

export function getElementTrendValue(
  elementNumber: number,
  property: PeriodicPropertyType,
  elementObj?: {
    electronegativity?: number;
    density?: number;
    meltingPoint?: number;
  }
): number {
  const trend = ELEMENT_TREND_VALUES[elementNumber];
  switch (property) {
    case 'atomicRadius':
      return trend?.atomicRadius ?? 150;
    case 'ionizationEnergy':
      return trend?.ionizationEnergy ?? 700;
    case 'electronAffinity':
      return trend?.electronAffinity ?? 50;
    case 'electronegativity':
      return elementObj?.electronegativity ?? 1.8;
    case 'density':
      return elementObj?.density ?? 5.0;
    case 'meltingPoint':
      return elementObj?.meltingPoint ?? 500;
    default:
      return 100;
  }
}
