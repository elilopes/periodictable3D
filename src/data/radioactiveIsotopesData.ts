export type DecayType =
  | 'alpha'
  | 'beta-minus'
  | 'beta-plus'
  | 'gamma'
  | 'fission';

export interface ParticleEmissionData {
  type: DecayType;
  name: string;
  symbol: string;
  charge: number;
  massNumber: number;
  color: string;
  trailColor: string;
  description: string;
  speedFractionOfLight: number; // Fração da velocidade da luz c
  penetrationPower: 'baixa' | 'media' | 'alta' | 'altissima';
  shieldingMaterial: string;
}

export const DECAY_PARTICLES_INFO: Record<DecayType, ParticleEmissionData> = {
  alpha: {
    type: 'alpha',
    name: 'Partícula Alfa (α)',
    symbol: '⁴₂He²⁺',
    charge: +2,
    massNumber: 4,
    color: '#f59e0b',
    trailColor: '#fbbf24',
    description: 'Núcleo de Hélio-4 composto por 2 prótons e 2 nêutrons fortemente ligados. É ejetada com alta energia cinética (~4 a 8 MeV) pelo efeito de tunelamento quântico.',
    speedFractionOfLight: 0.05,
    penetrationPower: 'baixa',
    shieldingMaterial: 'Uma folha de papel ou alguns centímetros de ar',
  },
  'beta-minus': {
    type: 'beta-minus',
    name: 'Partícula Beta Negativa (β⁻)',
    symbol: 'e⁻ (ou ⁰₋₁e)',
    charge: -1,
    massNumber: 0,
    color: '#06b6d4',
    trailColor: '#38bdf8',
    description: 'Elétron ultrarrelativístico criado no núcleo quando um nêutron instável se desintegra pela força fraca (n → p⁺ + e⁻ + ν̄ₑ). Acompanhado de um antineutrino do elétron.',
    speedFractionOfLight: 0.9,
    penetrationPower: 'media',
    shieldingMaterial: 'Alguns milímetros de Alumínio ou Acrílico',
  },
  'beta-plus': {
    type: 'beta-plus',
    name: 'Partícula Beta Positiva / Pósitron (β⁺)',
    symbol: 'e⁺ (ou ⁰₊₁e)',
    charge: +1,
    massNumber: 0,
    color: '#d946ef',
    trailColor: '#f472b6',
    description: 'Antimatéria do elétron! Gerada quando um próton do núcleo se converte em nêutron (p⁺ → n + e⁺ + νₑ). Ao colidir com um elétron orbital, sofre aniquilação par emitindo 2 fótons gama de 511 keV (base do PET Scan).',
    speedFractionOfLight: 0.85,
    penetrationPower: 'media',
    shieldingMaterial: 'Placas de Alumínio e blindagem de Chumbo',
  },
  gamma: {
    type: 'gamma',
    name: 'Radiação Gama (γ)',
    symbol: 'γ (Fóton de alta energia)',
    charge: 0,
    massNumber: 0,
    color: '#a855f7',
    trailColor: '#c084fc',
    description: 'Onda eletromagnética de comprimento de onda ultracurto (frequência altíssima) emitida quando um núcleo metaestável ou excitado desce para um nível de menor energia quântica sem mudar seu número de prótons.',
    speedFractionOfLight: 1.0,
    penetrationPower: 'alta',
    shieldingMaterial: 'Vários centímetros de Chumbo maciço ou paredes de Concreto denso',
  },
  fission: {
    type: 'fission',
    name: 'Fissão Nuclear',
    symbol: 'Fissão + 2 a 3 nêutrons (¹₀n)',
    charge: 0,
    massNumber: 1,
    color: '#ef4444',
    trailColor: '#f87171',
    description: 'Ruptura violenta de um núcleo superpesado em dois fragmentos menores de massas intermediárias com ejeção de 2 a 3 nêutrons rápidos e liberação massiva de ~200 MeV de energia via E=mc².',
    speedFractionOfLight: 0.07,
    penetrationPower: 'altissima',
    shieldingMaterial: 'Água pesada, Parafina, Boro e espessas camadas de Concreto',
  },
};

export interface RadioactiveIsotope {
  id: string;
  name: string;
  symbol: string;
  atomicNumber: number; // Z
  massNumber: number; // A
  neutrons: number; // N = A - Z
  decayType: DecayType;
  halfLifeText: string;
  halfLifeSeconds: number;
  daughterName: string;
  daughterSymbol: string;
  daughterZ: number;
  daughterA: number;
  nuclearEquation: string;
  decayEnergyMeV: number;
  practicalApplications: string[];
  historicalContext: string;
  wikiUrl: string;
}

export const RADIOACTIVE_ISOTOPES: RadioactiveIsotope[] = [
  {
    id: 'u238',
    name: 'Urânio-238',
    symbol: '²³⁸U',
    atomicNumber: 92,
    massNumber: 238,
    neutrons: 146,
    decayType: 'alpha',
    halfLifeText: '4,468 bilhões de anos',
    halfLifeSeconds: 1.41e17,
    daughterName: 'Tório-234',
    daughterSymbol: '²³⁴Th',
    daughterZ: 90,
    daughterA: 234,
    nuclearEquation: '²³⁸₉₂U → ²³⁴₉₀Th + ⁴₂He²⁺ + 4.27 MeV',
    decayEnergyMeV: 4.27,
    practicalApplications: [
      'Datação radiométrica da idade da Terra e de meteoritos (4,54 bilhões de anos)',
      'Blindagem de alta densidade contra radiação gama em radioterapia',
      'Material fértil em reatores regeneradores (geração de Plutônio-239)',
    ],
    historicalContext: 'Constitui 99,27% de todo o urânio natural da Terra. Sua longa meia-vida é comparável à idade do nosso Sistema Solar.',
    wikiUrl: 'https://pt.wikipedia.org/wiki/Ur%C3%A2nio-238',
  },
  {
    id: 'ra226',
    name: 'Rádio-226',
    symbol: '²²⁶Ra',
    atomicNumber: 88,
    massNumber: 226,
    neutrons: 138,
    decayType: 'alpha',
    halfLifeText: '1.600 anos',
    halfLifeSeconds: 5.05e10,
    daughterName: 'Radônio-222',
    daughterSymbol: '²²²Rn',
    daughterZ: 86,
    daughterA: 222,
    nuclearEquation: '²²⁶₈₈Ra → ²²²₈₆Rn + ⁴₂He²⁺ + 4.87 MeV',
    decayEnergyMeV: 4.87,
    practicalApplications: [
      'Pioneirismo em radioterapia contra tumores malignos (curieterapia)',
      'Fontes históricas de nêutrons misturado com berílio',
      'Pinturas luminescentes antigas em instrumentos de aviação militar',
    ],
    historicalContext: 'Isolado por Marie Curie e Pierre Curie em 1898 a partir da pechblenda, rendendo o Prêmio Nobel e inaugurando a era nuclear.',
    wikiUrl: 'https://pt.wikipedia.org/wiki/R%C3%A1dio-226',
  },
  {
    id: 'po210',
    name: 'Polônio-210',
    symbol: '²¹⁰Po',
    atomicNumber: 84,
    massNumber: 210,
    neutrons: 126,
    decayType: 'alpha',
    halfLifeText: '138,4 dias',
    halfLifeSeconds: 1.19e7,
    daughterName: 'Chumbo-206 (Estável)',
    daughterSymbol: '²⁰⁶Pb',
    daughterZ: 82,
    daughterA: 206,
    nuclearEquation: '²¹⁰₈₄Po → ²⁰⁶₈₂Pb + ⁴₂He²⁺ + 5.30 MeV',
    decayEnergyMeV: 5.30,
    practicalApplications: [
      'Eliminadores de eletricidade estática em fábricas de microeletrônica',
      'Geradores termoelétricos de radioisótopos (RTG) em sondas espaciais Lunokhod',
      'Fonte pura de partículas alfa em pesquisas de física de partículas',
    ],
    historicalContext: 'Nomeado por Marie Curie em homenagem à sua terra natal, a Polônia. Um único grama de Po-210 gera cerca de 140 watts de potência térmica!',
    wikiUrl: 'https://pt.wikipedia.org/wiki/Pol%C3%B4nio-210',
  },
  {
    id: 'c14',
    name: 'Carbono-14',
    symbol: '¹⁴C',
    atomicNumber: 6,
    massNumber: 14,
    neutrons: 8,
    decayType: 'beta-minus',
    halfLifeText: '5.730 anos',
    halfLifeSeconds: 1.81e11,
    daughterName: 'Nitrogênio-14 (Estável)',
    daughterSymbol: '¹⁴N',
    daughterZ: 7,
    daughterA: 14,
    nuclearEquation: '¹⁴₆C → ¹⁴₇N + e⁻ + ν̄ₑ + 0.156 MeV',
    decayEnergyMeV: 0.156,
    practicalApplications: [
      'Datação por radiocarbono em arqueologia, antropologia e paleontologia',
      'Rastreamento metabólico de compostos orgânicos em bioquímica',
      'Estudo de fluxos de dióxido de carbono e ciclos climáticos globais',
    ],
    historicalContext: 'Descoberto em 1940 por Martin Kamen e Sam Ruben. Willard Libby ganhou o Prêmio Nobel de Química em 1960 pelo método da datação.',
    wikiUrl: 'https://pt.wikipedia.org/wiki/Carbono-14',
  },
  {
    id: 'cs137',
    name: 'Césio-137',
    symbol: '¹³⁷Cs',
    atomicNumber: 55,
    massNumber: 137,
    neutrons: 82,
    decayType: 'beta-minus',
    halfLifeText: '30,17 anos',
    halfLifeSeconds: 9.52e8,
    daughterName: 'Bário-137m / Bário-137',
    daughterSymbol: '¹³⁷Ba',
    daughterZ: 56,
    daughterA: 137,
    nuclearEquation: '¹³⁷₅₅Cs → ¹³⁷₅₆Ba + e⁻ + γ (662 keV)',
    decayEnergyMeV: 1.176,
    practicalApplications: [
      'Irradiação de alimentos e esterilização de materiais cirúrgicos hospitalares',
      'Medidores industriais de nível e densidade de líquidos em tubulações',
      'Calibração precisa de detectores Geiger-Müller e cintiladores',
    ],
    historicalContext: 'Principal subproduto de fissão em usinas nucleares. Seu decaimento emite um fóton gama de 662 keV facilmente detectável.',
    wikiUrl: 'https://pt.wikipedia.org/wiki/C%C3%A9sio-137',
  },
  {
    id: 'i131',
    name: 'Iodo-131',
    symbol: '¹³¹I',
    atomicNumber: 53,
    massNumber: 131,
    neutrons: 78,
    decayType: 'beta-minus',
    halfLifeText: '8,02 dias',
    halfLifeSeconds: 6.93e5,
    daughterName: 'Xenônio-131 (Estável)',
    daughterSymbol: '¹³¹Xe',
    daughterZ: 54,
    daughterA: 131,
    nuclearEquation: '¹³¹₅₃I → ¹³¹₅₄Xe + e⁻ + ν̄ₑ + γ + 0.971 MeV',
    decayEnergyMeV: 0.971,
    practicalApplications: [
      'Tratamento padrão ouro de câncer de tireoide e hipertireoidismo',
      'Cintilografia da tireoide para avaliação funcional glandular',
      'Radioimunoterapia de linfomas malignos',
    ],
    historicalContext: 'A glândula tireoide capta avidamente o iodo. O Iodo-131 destrói seletivamente células cancerosas com alcance de fração de milímetro.',
    wikiUrl: 'https://pt.wikipedia.org/wiki/Iodo-131',
  },
  {
    id: 'f18',
    name: 'Flúor-18',
    symbol: '¹⁸F',
    atomicNumber: 9,
    massNumber: 18,
    neutrons: 9,
    decayType: 'beta-plus',
    halfLifeText: '109,7 minutos',
    halfLifeSeconds: 6586,
    daughterName: 'Oxigênio-18 (Estável)',
    daughterSymbol: '¹⁸O',
    daughterZ: 8,
    daughterA: 18,
    nuclearEquation: '¹⁸₉F → ¹⁸₈O + e⁺ + νₑ (Aniquilação: e⁺ + e⁻ → 2γ de 511 keV)',
    decayEnergyMeV: 0.634,
    practicalApplications: [
      'Tomografia por Emissão de Pósitrons (PET Scan) com Fludesoxiglicose (¹⁸F-FDG)',
      'Detecção precoce de metástases cancerígenas em todo o corpo',
      'Mapeamento do metabolismo cerebral e diagnóstico de Alzheimer',
    ],
    historicalContext: 'Produzido em cíclotrons hospitalares. A aniquilação do pósitron com um elétron gera dois fótons gama em ângulos opostos exatos de 180°!',
    wikiUrl: 'https://pt.wikipedia.org/wiki/Fl%C3%BAor-18',
  },
  {
    id: 'tc99m',
    name: 'Tecnécio-99m',
    symbol: '⁹⁹ᵐTc',
    atomicNumber: 43,
    massNumber: 99,
    neutrons: 56,
    decayType: 'gamma',
    halfLifeText: '6,01 horas',
    halfLifeSeconds: 21636,
    daughterName: 'Tecnécio-99 (Fundamental)',
    daughterSymbol: '⁹⁹Tc',
    daughterZ: 43,
    daughterA: 99,
    nuclearEquation: '⁹⁹ᵐ₄₃Tc → ⁹⁹₄₃Tc + γ (140.5 keV)',
    decayEnergyMeV: 0.141,
    practicalApplications: [
      'Mais de 80% de todos os procedimentos diagnósticos de medicina nuclear do mundo',
      'Cintilografia miocárdica (avaliação de infartos e perfusão cardíaca)',
      'Cintilografia óssea para detecção de fraturas ocultas e lesões',
    ],
    historicalContext: 'O "m" significa isômero nuclear metaestável. Emite raios gama ideais de 140 keV que atravessam o corpo sem ionização celular excessiva.',
    wikiUrl: 'https://pt.wikipedia.org/wiki/Tecn%C3%A9cio-99m',
  },
  {
    id: 'u235',
    name: 'Urânio-235 (Fissão Nuclear)',
    symbol: '²³⁵U',
    atomicNumber: 92,
    massNumber: 235,
    neutrons: 143,
    decayType: 'fission',
    halfLifeText: '703,8 milhões de anos (espontâneo) / microssegundos (induzido)',
    halfLifeSeconds: 2.22e16,
    daughterName: 'Bário-141 + Criptônio-92 + 3 nêutrons',
    daughterSymbol: '¹⁴¹Ba + ⁹²Kr + 3¹n',
    daughterZ: 56, // Fragmento Bário
    daughterA: 141,
    nuclearEquation: '²³⁵₉₂U + ¹₀n → ²³⁶₉₂U* → ¹⁴¹₅₆Ba + ⁹²₃₆Kr + 3 ¹₀n + ~200 MeV',
    decayEnergyMeV: 200.0,
    practicalApplications: [
      'Geração de eletricidade em usinas nucleares civis com emissão zero de carbono',
      'Propulsão de submarinos nucleares e quebra-gelos de longo alcance',
      'Produção de radioisótopos médicos essenciais em reatores de pesquisa',
    ],
    historicalContext: 'Descoberto em 1935 por Arthur Jeffrey Dempster. O único isótopo físsil natural existente na Terra capaz de sustentar uma reação em cadeia de nêutrons.',
    wikiUrl: 'https://pt.wikipedia.org/wiki/Ur%C3%A2nio-235',
  },
];
