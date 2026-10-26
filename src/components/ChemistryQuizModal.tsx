import React, {useState} from 'react';
import {X, Award, Sparkles, CheckCircle2, XCircle, RotateCcw, Brain, ShieldCheck, Lightbulb} from 'lucide-react';
import {useLanguage} from '../i18n/LanguageContext';
import {VISUAL_CHALLENGES} from '../data/visualQuizData';
import {VisualQuizChallengeView} from './VisualQuizChallengeView';

interface ChemistryQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuizQuestion {
  id: number;
  question: {
    pt: string;
    en: string;
    ru: string;
  };
  options: {
    pt: string[];
    en: string[];
    ru: string[];
  };
  correctIndex: number;
  hints: {
    pt: [string, string, string];
    en: [string, string, string];
    ru: [string, string, string];
  };
  explanation: {
    pt: string;
    en: string;
    ru: string;
  };
}

interface MolecularChallenge {
  id: number;
  formula: string;
  title: {
    pt: string;
    en: string;
    ru: string;
  };
  description: {
    pt: string;
    en: string;
    ru: string;
  };
  leftAtoms: {symbol: string; label: string}[];
  rightAtoms: {symbol: string; label: string}[];
  options: string[];
  correctAtom: string;
  successMessage: {
    pt: string;
    en: string;
    ru: string;
  };
  errorMessage: {
    pt: string;
    en: string;
    ru: string;
  };
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: {
      pt: 'Qual é o elemento químico mais abundante no universo e o primeiro da Tabela Periódica?',
      en: 'What is the most abundant chemical element in the universe and the first on the Periodic Table?',
      ru: 'Какой химический элемент самый распространенный во Вселенной и первый в Периодической таблице?',
    },
    options: {
      pt: ['Hélio (He)', 'Hidrogênio (H)', 'Oxigênio (O)', 'Carbono (C)'],
      en: ['Helium (He)', 'Hydrogen (H)', 'Oxygen (O)', 'Carbon (C)'],
      ru: ['Гелий (He)', 'Водород (H)', 'Кислород (O)', 'Углерод (C)'],
    },
    correctIndex: 1,
    hints: {
      pt: [
        'Dica 1: É um gás extremamente leve e altamente inflamável.',
        'Dica 2: Seu número atômico é Z = 1.',
        'Dica 3: As estrelas, como o Sol, são formadas majoritariamente por este elemento.',
      ],
      en: [
        'Hint 1: It is an extremely light, highly flammable gas.',
        'Hint 2: Its atomic number is Z = 1.',
        'Hint 3: Stars like our Sun are predominantly composed of this element.',
      ],
      ru: [
        'Подсказка 1: Это чрезвычайно легкий и легковоспламеняющийся газ.',
        'Подсказка 2: Его атомный номер Z = 1.',
        'Подсказка 3: Звезды, такие как Солнце, состоят преимущественно из этого элемента.',
      ],
    },
    explanation: {
      pt: 'O Hidrogênio (H, Z=1) compõe cerca de 75% da massa elemental do universo observável.',
      en: 'Hydrogen (H, Z=1) makes up about 75% of the elemental mass of the observable universe.',
      ru: 'Водород (H, Z=1) составляет около 75% элементарной массы наблюдаемой Вселенной.',
    },
  },
  {
    id: 2,
    question: {
      pt: 'Quantos elétrons a camada de valência de um Gás Nobre (exceto o Hélio) normalmente possui para estar completa?',
      en: 'How many valence electrons does a Noble Gas (except Helium) typically have to achieve stability?',
      ru: 'Сколько валентных электронов обычно имеет благородный газ (кроме гелия) для стабильности?',
    },
    options: {
      pt: ['2 elétrons', '4 elétrons', '6 elétrons', '8 elétrons (Regra do Octeto)'],
      en: ['2 electrons', '4 electrons', '6 electrons', '8 electrons (Octet Rule)'],
      ru: ['2 электрона', '4 электрона', '6 электронов', '8 электронов (Правило октета)'],
    },
    correctIndex: 3,
    hints: {
      pt: [
        'Dica 1: Está associado ao famoso "número 8".',
        'Dica 2: É o número mágico que garante estabilidade máxima aos átomos.',
        'Dica 3: Inspirou a famosa Regra do Octeto na química.',
      ],
      en: [
        'Hint 1: It is famously associated with the number 8.',
        'Hint 2: It is the magic number granting maximum atomic chemical stability.',
        'Hint 3: It inspired the renowned Octet Rule in chemistry.',
      ],
      ru: [
        'Подсказка 1: Это связано со знаменитым числом 8.',
        'Подсказка 2: Это магическое число для максимальной стабильности атомов.',
        'Подсказка 3: Это легло в основу правила октета в химии.',
      ],
    },
    explanation: {
      pt: 'A Regra do Octeto estabelece que os átomos buscam estabilidade química adquirindo 8 elétrons na camada de valência.',
      en: 'The Octet Rule states that atoms seek chemical stability by acquiring 8 valence electrons.',
      ru: 'Правило октета гласит, что атомы стремятся к стабильности, приобретая 8 валентных электронов.',
    },
  },
  {
    id: 3,
    question: {
      pt: 'Qual modelo atômico descreve os elétrons como uma nuvem de probabilidade (|ψ|²) governada pela Mecânica Quântica?',
      en: 'Which atomic model describes electrons as a probability density cloud (|ψ|²) governed by quantum mechanics?',
      ru: 'Какая модель атома описывает электроны как облако вероятности (|ψ|²), управляемое квантовой механикой?',
    },
    options: {
      pt: [
        'Modelo de Dalton',
        'Modelo de Rutherford-Bohr',
        'Modelo Orbital Quântico (Schrödinger e Heisenberg)',
        'Modelo de Pudim de Passas',
      ],
      en: [
        "Dalton's Model",
        'Rutherford-Bohr Model',
        'Quantum Orbital Model (Schrödinger & Heisenberg)',
        'Plum Pudding Model',
      ],
      ru: [
        'Модель Дальтона',
        'Модель Резерфорда-Бора',
        'Квантово-орбитальная модель (Шрёдингер и Гейзенберг)',
        'Модель сливового пудинга Томпсона',
      ],
    },
    correctIndex: 2,
    hints: {
      pt: [
        'Dica 1: Não usa órbitas circulares fixas e rígidas como planetas.',
        'Dica 2: Baseia-se no Princípio da Incerteza de Heisenberg.',
        'Dica 3: Leva o nome dos físicos Schrödinger e Heisenberg.',
      ],
      en: [
        'Hint 1: It does not use rigid circular planetary orbits.',
        'Hint 2: It relies fundamentally on Heisenberg’s Uncertainty Principle.',
        'Hint 3: It is named after physicists Schrödinger and Heisenberg.',
      ],
      ru: [
        'Подсказка 1: Не использует жесткие круговые орбиты как у планет.',
        'Подсказка 2: Основана на принципе неопределенности Гейзенберга.',
        'Подсказка 3: Названа в честь физиков Шрёдингера и Гейзенберга.',
      ],
    },
    explanation: {
      pt: 'O modelo orbital quântico moderno substituiu as órbitas circulares rígidas por regiões tridimensionais de probabilidade.',
      en: 'The modern quantum orbital model replaced fixed circular orbits with 3D probability clouds.',
      ru: 'Современная квантовая модель заменила фиксированные орбиты трехмерными областями вероятности.',
    },
  },
  {
    id: 4,
    question: {
      pt: 'Qual tipo de ligação química ocorre entre o Sódio (Na) e o Cloro (Cl) no sal de cozinha (NaCl)?',
      en: 'What type of chemical bonding occurs between Sodium (Na) and Chlorine (Cl) in table salt (NaCl)?',
      ru: 'Какой тип химической связи возникает между натрием (Na) и хлором (Cl) в поваренной соли (NaCl)?',
    },
    options: {
      pt: [
        'Ligação Covalente Apolar',
        'Ligação Iônica (Transferência de elétron)',
        'Ligação Metálica',
        'Ligação de Hidrogênio',
      ],
      en: [
        'Nonpolar Covalent Bond',
        'Ionic Bond (Electron Transfer)',
        'Metallic Bond',
        'Hydrogen Bond',
      ],
      ru: [
        'Неполярная ковалентная связь',
        'Ионная связь (перенос электрона)',
        'Металлическая связь',
        'Водородная связь',
      ],
    },
    correctIndex: 1,
    hints: {
      pt: [
        'Dica 1: Envolve um metal que doa elétron e um ametal que recebe.',
        'Dica 2: Há formação de íons positivos (Na⁺) e negativos (Cl⁻).',
        'Dica 3: Ocorre forte atração eletrostática entre cargas opostas.',
      ],
      en: [
        'Hint 1: It involves a metal donating an electron and a non-metal receiving it.',
        'Hint 2: Cations (Na⁺) and anions (Cl⁻) are formed.',
        'Hint 3: Strong electrostatic attraction binds the oppositely charged ions.',
      ],
      ru: [
        'Подсказка 1: Металл отдает электрон, а неметалл его принимает.',
        'Подсказка 2: Образуются катионы (Na⁺) и анионы (Cl⁻).',
        'Подсказка 3: Ионы притягиваются силами электростатического притяжения.',
      ],
    },
    explanation: {
      pt: 'O sódio doa seu elétron de valência para o cloro, formando íons Na⁺ e Cl⁻ atraídos electrostaticamente.',
      en: 'Sodium donates its valence electron to chlorine, forming Na⁺ and Cl⁻ ions bound electrostatically.',
      ru: 'Натрий отдает свой валентный электрон хлору, образуя электростатически притягивающиеся ионы Na⁺ и Cl⁻.',
    },
  },
  {
    id: 5,
    question: {
      pt: 'Qual função orgânica oxigenada está presente no vinagre comum (Ácido Etanoico)?',
      en: 'Which oxygenated organic function is present in standard vinegar (Ethanoic Acid)?',
      ru: 'Какая кислородсодержащая органическая функция присутствует в уксусе (этановой кислоте)?',
    },
    options: {
      pt: ['Álcool', 'Éter', 'Ácido Carboxílico', 'Cetona'],
      en: ['Alcohol', 'Ether', 'Carboxylic Acid', 'Ketone'],
      ru: ['Спирт', 'Простой эфир', 'Карбоновая кислота', 'Кетон'],
    },
    correctIndex: 2,
    hints: {
      pt: [
        'Dica 1: Possui caráter ácido característico e sabor azedo.',
        'Dica 2: Seu grupo funcional é a carboxila (—COOH).',
        'Dica 3: É o ácido orgânico mais conhecido do cotidiano culinário.',
      ],
      en: [
        'Hint 1: It has a characteristic acidic and sour taste.',
        'Hint 2: Its functional group is the carboxyl group (—COOH).',
        'Hint 3: It is the most ubiquitous organic acid in everyday culinary life.',
      ],
      ru: [
        'Подсказка 1: Имеет характерный кислый вкус.',
        'Подсказка 2: Функциональная группа — карбоксил (—COOH).',
        'Подсказка 3: Самая известная органическая кислота в кулинарии.',
      ],
    },
    explanation: {
      pt: 'O ácido acético (ou etanoico) possui o grupo carboxila (—COOH), característico dos ácidos carboxílicos.',
      en: 'Acetic (ethanoic) acid contains the carboxyl group (—COOH), characteristic of carboxylic acids.',
      ru: 'Уксусная (этановая) кислота содержит карбоксильную группу (—COOH), характерную для карбоновых кислот.',
    },
  },
];

const MOLECULAR_CHALLENGES: MolecularChallenge[] = [
  {
    id: 1,
    formula: 'H2O',
    title: {
      pt: 'Desafio de Estabilização: Molécula de Água (H2O)',
      en: 'Stabilization Challenge: Water Molecule (H2O)',
      ru: 'Вызов стабилизации: Молекула воды (H2O)',
    },
    description: {
      pt: 'Para formar uma molécula de H2O estável segundo a Regra do Octeto, dois átomos de Hidrogênio precisam se ligar ao átomo central ausente.',
      en: 'To form a stable H2O molecule according to the Octet Rule, two Hydrogen atoms need to bond with the missing central atom.',
      ru: 'Чтобы образовать стабильную молекулу H2O по правилу октета, два атома водорода должны связаться с недостающим центральным атомом.',
    },
    leftAtoms: [{symbol: 'H', label: 'Hidrogênio'}],
    rightAtoms: [{symbol: 'H', label: 'Hidrogênio'}],
    options: ['O', 'Na', 'C', 'Cl'],
    correctAtom: 'O',
    successMessage: {
      pt: 'Excelente! O Oxigênio (O) possui 6 elétrons na camada de valência e compartilha elétrons com dois Hidrogênios, completando seu octeto.',
      en: 'Excellent! Oxygen (O) has 6 valence electrons and shares electrons with two Hydrogens, completing its octet.',
      ru: 'Отлично! Кислород (O) имеет 6 валентных электронов и образует ковалентные связи с двумя атомами водорода.',
    },
    errorMessage: {
      pt: 'Átomo incorreto! O átomo central necessário para formar H2O com 6 elétrons de valência é o Oxigênio (O).',
      en: 'Incorrect atom! The central atom required to form H2O with 6 valence electrons is Oxygen (O).',
      ru: 'Неверный атом! Центральным атомом для H2O является кислород (O).',
    },
  },
  {
    id: 2,
    formula: 'CO2',
    title: {
      pt: 'Desafio de Estabilização: Dióxido de Carbono (CO2)',
      en: 'Stabilization Challenge: Carbon Dioxide (CO2)',
      ru: 'Вызов стабилизации: Диоксид углерода (CO2)',
    },
    description: {
      pt: 'Para formar a molécula linear de CO2, dois átomos de Oxigênio precisam se ligar através de ligações duplas ao átomo central ausente.',
      en: 'To form linear CO2, two Oxygen atoms must bond via double bonds to the missing central atom.',
      ru: 'Для образования линейной молекулы CO2 два атома кислорода должны соединиться двойными связями с недостающим центральным атомом.',
    },
    leftAtoms: [{symbol: 'O', label: 'Oxigênio'}],
    rightAtoms: [{symbol: 'O', label: 'Oxigênio'}],
    options: ['C', 'N', 'Mg', 'S'],
    correctAtom: 'C',
    successMessage: {
      pt: 'Perfeito! O Carbono (C) é tetravalente e forma duas ligações duplas com os oxigênios, completando 8 elétrons na valência.',
      en: 'Perfect! Carbon (C) is tetravalent and forms two double bonds with oxygens, completing its octet.',
      ru: 'Идеально! Углерод (C) валентен и образует две двойные связи с кислородом.',
    },
    errorMessage: {
      pt: 'Átomo incorreto! O átomo central tetravalente necessário para ligar dois oxigénios é o Carbono (C).',
      en: 'Incorrect atom! The tetravalent central atom required is Carbon (C).',
      ru: 'Неверный атом! Требуемый тетравалентный центральный атом — углерод (C).',
    },
  },
  {
    id: 3,
    formula: 'NaCl',
    title: {
      pt: 'Desafio de Ligação Iônica: Sal de Cozinha (NaCl)',
      en: 'Ionic Bonding Challenge: Table Salt (NaCl)',
      ru: 'Вызов ионной связи: Поваренная соль (NaCl)',
    },
    description: {
      pt: 'Para formar o cloreto de sódio sólido estável por transferência eletrostática de elétron, o Sódio (Na) se une ao halogênio ausente.',
      en: 'To form stable sodium chloride via electrostatic electron transfer, Sodium (Na) bonds with the missing halogen.',
      ru: 'Для образования хлорида натрия путем электростатического переноса натрий (Na) соединяется с недостающим галогеном.',
    },
    leftAtoms: [{symbol: 'Na', label: 'Sódio'}],
    rightAtoms: [],
    options: ['Cl', 'F', 'Br', 'I'],
    correctAtom: 'Cl',
    successMessage: {
      pt: 'Sensacional! O Sódio doa seu elétron para o Cloro (Cl), formando íons Na+ e Cl- fortemente atraídos.',
      en: 'Sensational! Sodium donates its electron to Chlorine (Cl), forming strongly attracted Na+ and Cl- ions.',
      ru: 'Сенсационно! Натрий отдает электрон хлору (Cl), образуя ионы Na+ и Cl-.',
    },
    errorMessage: {
      pt: 'Átomo incorreto! O halogênio que recebe o elétron do sódio formando o sal de cozinha é o Cloro (Cl).',
      en: 'Incorrect atom! The halogen receiving the electron is Chlorine (Cl).',
      ru: 'Неверный атом! Галоген, принимающий электрон — хлор (Cl).',
    },
  },
  {
    id: 4,
    formula: 'NH3',
    title: {
      pt: 'Desafio de Estabilização: Amônia (NH3)',
      en: 'Stabilization Challenge: Ammonia (NH3)',
      ru: 'Вызов стабилизации: Аммиак (NH3)',
    },
    description: {
      pt: 'Na molécula piramidal de amônia, três átomos de Hidrogênio se ligam covalentemente ao átomo central ausente do grupo 15.',
      en: 'In pyramidal ammonia, three Hydrogen atoms covalently bond to the missing Group 15 central atom.',
      ru: 'В пирамидальном аммиаке три атома водорода ковалентно связаны с недостающим центральным атомом 15-й группы.',
    },
    leftAtoms: [{symbol: 'H', label: 'H'}, {symbol: 'H', label: 'H'}],
    rightAtoms: [{symbol: 'H', label: 'H'}],
    options: ['N', 'P', 'O', 'C'],
    correctAtom: 'N',
    successMessage: {
      pt: 'Excelente! O Nitrogênio (N) possui 5 elétrons na valência e faz 3 ligações simples com os hidrogênios, completando o octeto.',
      en: 'Excellent! Nitrogen (N) has 5 valence electrons and forms 3 single bonds with hydrogens.',
      ru: 'Отлично! Азот (N) имеет 5 валентных электронов и образует 3 связи с водородом.',
    },
    errorMessage: {
      pt: 'Átomo incorreto! O elemento central da amônia (NH3) é o Nitrogênio (N).',
      en: 'Incorrect atom! The central element of ammonia (NH3) is Nitrogen (N).',
      ru: 'Неверный атом! Центральный элемент аммиака (NH3) — азот (N).',
    },
  },
];

type QuizStepType = 'question' | 'visual_challenge' | 'molecular_3d' | 'finished';

interface StepDescriptor {
  type: QuizStepType;
  index: number;
  label: string;
}

export function ChemistryQuizModal({isOpen, onClose}: ChemistryQuizModalProps) {
  const {language} = useLanguage();

  const [filterMode, setFilterMode] = useState<'alternating' | 'images' | 'questions'>('alternating');

  const steps: StepDescriptor[] = React.useMemo(() => {
    if (filterMode === 'images') {
      return VISUAL_CHALLENGES.map((_, i) => ({
        type: 'visual_challenge',
        index: i,
        label: `🖼️ Img ${i + 1}`,
      }));
    }
    if (filterMode === 'questions') {
      return [
        ...QUIZ_QUESTIONS.map((_, i) => ({
          type: 'question' as const,
          index: i,
          label: `💡 Q${i + 1}`,
        })),
        ...MOLECULAR_CHALLENGES.map((_, i) => ({
          type: 'molecular_3d' as const,
          index: i,
          label: `⚛️ Desafio ${i + 1}`,
        })),
      ];
    }
    // Modo Alternado
    const list: StepDescriptor[] = [];
    for (let i = 0; i < 5; i++) {
      list.push({type: 'question', index: i, label: `💡 Q${i + 1}`});
      list.push({type: 'visual_challenge', index: i, label: `🖼️ Img ${i + 1}`});
    }
    for (let i = 0; i < MOLECULAR_CHALLENGES.length; i++) {
      list.push({type: 'molecular_3d', index: i, label: `⚛️ Desafio ${i + 1}`});
    }
    return list;
  }, [filterMode]);

  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [wrongAttempts, setWrongAttempts] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Desafios 3D múltiplos
  const [selectedAtomForChallenge, setSelectedAtomForChallenge] = useState<string | null>(null);
  const [challengeSuccess, setChallengeSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentStep = steps[currentStepIdx] || {type: 'finished', index: 0, label: 'Fim'};

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    const q = QUIZ_QUESTIONS[currentStep.index];
    const correct = idx === q.correctIndex;

    if (correct) {
      setIsAnswered(true);
      setScore((s) => s + 20);
    } else {
      setWrongAttempts((w) => Math.min(w + 1, 2));
    }
  };

  const handleNextStep = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setWrongAttempts(0);
    setSelectedAtomForChallenge(null);
    setChallengeSuccess(false);
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx((s) => s + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentStepIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsAnswered(false);
    setWrongAttempts(0);
    setIsFinished(false);
    setSelectedAtomForChallenge(null);
    setChallengeSuccess(false);
  };

  const handleTestStabilization = (atomSymbol: string, challenge: MolecularChallenge) => {
    setSelectedAtomForChallenge(atomSymbol);
    if (atomSymbol === challenge.correctAtom) {
      setChallengeSuccess(true);
      setScore((s) => s + 25);
    } else {
      setChallengeSuccess(false);
    }
  };

  const currentQuestion = currentStep.type === 'question' ? QUIZ_QUESTIONS[currentStep.index] : null;
  const currentVisualChallenge = currentStep.type === 'visual_challenge' ? VISUAL_CHALLENGES[currentStep.index] : null;
  const currentMolChallenge = currentStep.type === 'molecular_3d' ? MOLECULAR_CHALLENGES[currentStep.index] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-2 sm:p-4 md:p-6 select-none">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3.5 bg-slate-950/90 border-b border-slate-800 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-sky-500/20 via-indigo-500/20 to-fuchsia-500/20 text-sky-400 rounded-2xl border border-sky-500/30">
              <Brain className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                {language === 'pt' ? 'Quiz & Desafios de Estabilização' : 'Quiz & Stabilization Challenges'}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  {score} pts
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {isFinished
                  ? 'Resultados Finais'
                  : currentStep.type === 'visual_challenge'
                  ? `Desafio Visual ${currentStep.index + 1} de 5 (10 Objetos & Letras)`
                  : currentStep.type === 'question'
                  ? `Pergunta Teórica ${currentStep.index + 1} de 5`
                  : `Desafio de Estabilização ${currentStep.index + 1} de ${MOLECULAR_CHALLENGES.length}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Seletor de Modo */}
            <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-[11px] font-semibold">
              <button
                onClick={() => {
                  setFilterMode('alternating');
                  setCurrentStepIdx(0);
                }}
                className={`px-2.5 py-1 rounded-lg transition ${
                  filterMode === 'alternating'
                    ? 'bg-sky-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Alternado
              </button>
              <button
                onClick={() => {
                  setFilterMode('images');
                  setCurrentStepIdx(0);
                }}
                className={`px-2.5 py-1 rounded-lg transition ${
                  filterMode === 'images'
                    ? 'bg-sky-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Imagens
              </button>
              <button
                onClick={() => {
                  setFilterMode('questions');
                  setCurrentStepIdx(0);
                }}
                className={`px-2.5 py-1 rounded-lg transition ${
                  filterMode === 'questions'
                    ? 'bg-sky-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Teoria & Desafios
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Barra de Passos / Navegador Rápido */}
        {!isFinished && (
          <div className="flex items-center gap-1.5 px-5 py-2 bg-slate-950/60 border-b border-slate-800/80 overflow-x-auto scrollbar-thin">
            {steps.map((st, i) => {
              const isActive = i === currentStepIdx;
              return (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentStepIdx(i);
                    setSelectedOption(null);
                    setIsAnswered(false);
                    setWrongAttempts(0);
                    setSelectedAtomForChallenge(null);
                    setChallengeSuccess(false);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20 font-bold scale-105'
                      : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {st.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Corpo do Quiz */}
        <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-6 overflow-y-auto max-h-[calc(92vh-130px)]">
          {isFinished ? (
            <div className="flex flex-col gap-6 items-center text-center py-6">
              <div className="p-5 bg-gradient-to-tr from-amber-500/20 to-emerald-500/20 text-amber-400 rounded-3xl border border-amber-500/40 shadow-xl animate-bounce">
                <Award className="w-16 h-16" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  {language === 'pt' ? 'Parabéns! Quiz & Desafios Concluídos!' : 'Congratulations! Quiz & Challenges Completed!'}
                </h3>
                <p className="text-sm text-slate-300 max-w-lg mx-auto">
                  {language === 'pt'
                    ? `Você concluiu todas as etapas com uma pontuação fantástica de ${score} pontos!`
                    : `You completed all steps with an outstanding score of ${score} points!`}
                </p>
              </div>

              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 max-w-lg leading-relaxed flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-amber-400 shrink-0" />
                <span>
                  Você demonstrou maestria nas propriedades dos elementos, identificação visual de amostras e estabilização de ligações químicas!
                </span>
              </div>

              <button
                onClick={handleRestart}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-lg hover:from-emerald-500 hover:to-teal-500 flex items-center gap-2 transition"
              >
                <RotateCcw className="w-4 h-4" />
                {language === 'pt' ? 'Jogar Novamente' : 'Play Again'}
              </button>
            </div>
          ) : currentStep.type === 'question' && currentQuestion ? (
            <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
              <div className="p-5 bg-slate-950/70 rounded-2xl border border-slate-800 flex flex-col gap-3 shadow-lg">
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {currentQuestion.question[language] || currentQuestion.question.pt}
                </h3>

                <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
                  <div className="flex items-start gap-2 text-xs text-amber-300 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                    <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                    <span>{currentQuestion.hints[language]?.[0] || currentQuestion.hints.pt[0]}</span>
                  </div>
                  {wrongAttempts >= 1 && (
                    <div className="flex items-start gap-2 text-xs text-amber-300 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 animate-fadeIn">
                      <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                      <span>{currentQuestion.hints[language]?.[1] || currentQuestion.hints.pt[1]}</span>
                    </div>
                  )}
                  {wrongAttempts >= 2 && (
                    <div className="flex items-start gap-2 text-xs text-amber-300 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 animate-fadeIn">
                      <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                      <span>{currentQuestion.hints[language]?.[2] || currentQuestion.hints.pt[2]}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(currentQuestion.options[language] || currentQuestion.options.pt).map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQuestion.correctIndex;

                  let btnStyle = 'bg-slate-950/60 border-slate-800 text-slate-200 hover:bg-slate-800/80';
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold';
                    }
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-500/20 border-rose-500/60 text-rose-300';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />}
                      {!isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>

              {selectedOption !== null && !isAnswered && (
                <div className="p-3 bg-rose-500/10 text-rose-300 rounded-xl border border-rose-500/20 text-xs flex items-center justify-between">
                  <span>
                    {language === 'pt'
                      ? 'Resposta incorreta! Tente novamente ou observe a nova dica revelada acima.'
                      : 'Incorrect! Try again or check the newly revealed hint above.'}
                  </span>
                </div>
              )}

              {isAnswered && (
                <div className="p-5 bg-slate-950/90 rounded-2xl border border-slate-800 flex flex-col gap-3 animate-fadeIn">
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-sky-400 block mb-1">
                      {language === 'pt' ? 'Explicação Científica:' : 'Scientific Explanation:'}
                    </strong>
                    {currentQuestion.explanation[language] || currentQuestion.explanation.pt}
                  </div>
                  <button
                    onClick={handleNextStep}
                    className="self-end px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-xs font-bold shadow-lg hover:from-sky-500 hover:to-indigo-500 transition"
                  >
                    {language === 'pt' ? 'Continuar →' : 'Continue →'}
                  </button>
                </div>
              )}
            </div>
          ) : currentStep.type === 'visual_challenge' && currentVisualChallenge ? (
            <VisualQuizChallengeView
              challenge={currentVisualChallenge}
              onComplete={(earnedPoints) => {
                setScore((s) => s + earnedPoints);
              }}
              onNext={handleNextStep}
            />
          ) : currentStep.type === 'molecular_3d' && currentMolChallenge ? (
            <div className="flex flex-col gap-6 items-center text-center max-w-xl mx-auto w-full">
              <div className="p-4 bg-sky-500/10 text-sky-400 rounded-2xl border border-sky-500/20">
                <ShieldCheck className="w-12 h-12 animate-bounce" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {currentMolChallenge.title[language] || currentMolChallenge.title.pt}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentMolChallenge.description[language] || currentMolChallenge.description.pt}
                </p>
              </div>

              <div className="w-full p-6 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center gap-4 flex-wrap">
                {currentMolChallenge.leftAtoms.map((at, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="w-9 h-9 rounded-full bg-slate-200 text-slate-900 font-bold flex items-center justify-center text-xs shadow">
                      {at.symbol}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1">{at.label}</span>
                  </div>
                ))}

                {currentMolChallenge.leftAtoms.length > 0 && <span className="text-slate-600 text-lg font-bold">+</span>}

                <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-sky-400/80 bg-sky-500/10 flex items-center justify-center text-sky-400 font-bold text-sm animate-pulse shadow-inner">
                  {selectedAtomForChallenge || '?'}
                </div>

                {currentMolChallenge.rightAtoms.length > 0 && <span className="text-slate-600 text-lg font-bold">+</span>}

                {currentMolChallenge.rightAtoms.map((at, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="w-9 h-9 rounded-full bg-slate-200 text-slate-900 font-bold flex items-center justify-center text-xs shadow">
                      {at.symbol}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1">{at.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                {currentMolChallenge.options.map((sym) => (
                  <button
                    key={sym}
                    disabled={challengeSuccess}
                    onClick={() => handleTestStabilization(sym, currentMolChallenge)}
                    className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm shadow-md transition disabled:opacity-50"
                  >
                    Átomo: {sym}
                  </button>
                ))}
              </div>

              {selectedAtomForChallenge && !challengeSuccess && (
                <div className="p-3 bg-rose-500/20 text-rose-300 rounded-xl border border-rose-500/30 text-xs">
                  {currentMolChallenge.errorMessage[language] || currentMolChallenge.errorMessage.pt}
                </div>
              )}

              {challengeSuccess && (
                <div className="flex flex-col gap-3 w-full animate-fadeIn">
                  <div className="p-4 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-500/30 text-xs leading-relaxed">
                    {currentMolChallenge.successMessage[language] || currentMolChallenge.successMessage.pt}
                  </div>
                  <button
                    onClick={handleNextStep}
                    className="self-center px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-lg hover:from-emerald-500 hover:to-teal-500 transition"
                  >
                    {language === 'pt' ? 'Próximo Desafio →' : 'Next Challenge →'}
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
