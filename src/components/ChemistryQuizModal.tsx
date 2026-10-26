import React, {useState} from 'react';
import {X, Award, Sparkles, CheckCircle2, XCircle, RotateCcw, Brain, ShieldCheck} from 'lucide-react';
import {useLanguage} from '../i18n/LanguageContext';

interface ChemistryQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Qual é o elemento químico mais abundante no universo e o primeiro da Tabela Periódica?',
    options: ['Hélio (He)', 'Hidrogênio (H)', 'Oxigênio (O)', 'Carbono (C)'],
    correctIndex: 1,
    explanation: 'O Hidrogênio (H, Z=1) compõe cerca de 75% da massa elemental do universo observável.',
  },
  {
    id: 2,
    question: 'Quantos elétrons a camada de valência de um Gás Nobre (exceto o Hélio) normalmente possui para estar completa?',
    options: ['2 elétrons', '4 elétrons', '6 elétrons', '8 elétrons (Regra do Octeto)'],
    correctIndex: 3,
    explanation: 'A Regra do Octeto estabelece que os átomos buscam estabilidade com 8 elétrons na camada mais externa.',
  },
  {
    id: 3,
    question: 'Qual é o modelo atômico que descreve os elétrons como uma nuvem de probabilidade (|ψ|²) governada pela Mecânica Quântica?',
    options: [
      'Modelo de Dalton',
      'Modelo de Rutherford-Bohr',
      'Modelo Orbital Quântico (Schrödinger e Heisenberg)',
      'Modelo de Pudim de Passas',
    ],
    correctIndex: 2,
    explanation: 'O modelo orbital quântico moderno substituiu as órbitas circulares rígidas por regiões tridimensionais de probabilidade.',
  },
  {
    id: 4,
    question: 'Qual tipo de ligação química ocorre entre o Sódio (Na) e o Cloro (Cl) no sal de cozinha (NaCl)?',
    options: [
      'Ligação Covalente Apolar',
      'Ligação Iônica (Transferência de elétron)',
      'Ligação Metálica',
      'Ligação de Hidrogênio',
    ],
    correctIndex: 1,
    explanation: 'O sódio doa seu elétron de valência para o cloro, formando íons Na⁺ e Cl⁻ atraídos electrostaticamente.',
  },
  {
    id: 5,
    question: 'Qual função orgânica oxigenada está presente no vinagre comum (Ácido Etanoico)?',
    options: ['Álcool', 'Éter', 'Ácido Carboxílico', 'Cetona'],
    correctIndex: 2,
    explanation: 'O ácido acético (ou ácido etanoico) possui o grupo funcional carboxila (—COOH), característico dos ácidos carboxílicos.',
  },
];

export function ChemistryQuizModal({isOpen, onClose}: ChemistryQuizModalProps) {
  const {language} = useLanguage();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Desafio de estabilização 3D
  const [challengeMode, setChallengeMode] = useState<boolean>(false);
  const [selectedAtomForChallenge, setSelectedAtomForChallenge] = useState<string | null>(null);
  const [challengeSuccess, setChallengeSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === QUIZ_QUESTIONS[currentStep].correctIndex) {
      setScore((s) => s + 20);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setChallengeMode(true);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setScore(0);
    setIsAnswered(false);
    setQuizFinished(false);
    setChallengeMode(false);
    setSelectedAtomForChallenge(null);
    setChallengeSuccess(false);
  };

  const handleTestStabilization = (atomSymbol: string) => {
    setSelectedAtomForChallenge(atomSymbol);
    if (atomSymbol === 'O') {
      setChallengeSuccess(true);
      setScore((s) => s + 20);
      setQuizFinished(true);
    } else {
      setChallengeSuccess(false);
    }
  };

  const q = QUIZ_QUESTIONS[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-6 select-none">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/85 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-sky-500/20 via-indigo-500/20 to-fuchsia-500/20 text-sky-400 rounded-xl border border-sky-500/30">
              <Brain className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {language === 'pt' ? 'Quiz & Desafio de Estabilização 3D' : 'Chemistry Quiz & 3D Challenge'}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  Pontos: {score} / 120
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {challengeMode
                  ? 'Desafio Prático: Estabilização de Moléculas'
                  : `Questão ${currentStep + 1} de ${QUIZ_QUESTIONS.length}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Corpo do Quiz ou Desafio */}
        <div className="p-6 sm:p-8 flex flex-col gap-6 overflow-y-auto">
          {!challengeMode && !quizFinished ? (
            <div className="flex flex-col gap-6">
              <div className="p-5 bg-slate-950/70 rounded-xl border border-slate-800">
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {q.question}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === q.correctIndex;

                  let btnStyle = 'bg-slate-950/60 border-slate-800 text-slate-200 hover:bg-slate-800/80';
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-500/20 border-rose-500/60 text-rose-300';
                    }
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
                      {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <div className="p-4 bg-slate-950/90 rounded-xl border border-slate-800 flex flex-col gap-3">
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-sky-400 block mb-1">Explicação Científica:</strong>
                    {q.explanation}
                  </div>
                  <button
                    onClick={handleNext}
                    className="self-end px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-xs font-bold shadow-lg hover:from-sky-500 hover:to-indigo-500 transition"
                  >
                    {currentStep < QUIZ_QUESTIONS.length - 1 ? 'Próxima Questão →' : 'Ir para o Desafio 3D 🚀'}
                  </button>
                </div>
              )}
            </div>
          ) : challengeMode && !quizFinished ? (
            <div className="flex flex-col gap-6 items-center text-center">
              <div className="p-4 bg-sky-500/10 text-sky-400 rounded-2xl border border-sky-500/20">
                <ShieldCheck className="w-12 h-12 animate-bounce" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">Desafio de Estabilização Molecular ($H_2O$)</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Para formar uma molécula de Água ($H_2O$) estável segundo a Regra do Octeto, dois átomos de Hidrogênio precisam se ligar ao átomo central ausente. Qual átomo completa a estrutura 3D?
                </p>
              </div>

              {/* Simulação Visual do Desafio */}
              <div className="w-full max-w-md p-6 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center gap-6">
                <div className="flex flex-col items-center">
                  <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-900 font-bold flex items-center justify-center text-xs">H</span>
                  <span className="text-[10px] text-slate-400 mt-1">Hidrogênio</span>
                </div>
                <span className="text-slate-600 text-xl font-bold">+</span>
                <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-sky-400/80 bg-sky-500/10 flex items-center justify-center text-sky-400 font-bold text-xs animate-pulse">
                  {selectedAtomForChallenge || '?'}
                </div>
                <span className="text-slate-600 text-xl font-bold">+</span>
                <div className="flex flex-col items-center">
                  <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-900 font-bold flex items-center justify-center text-xs">H</span>
                  <span className="text-[10px] text-slate-400 mt-1">Hidrogênio</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                {['O', 'Na', 'C', 'Cl'].map((sym) => (
                  <button
                    key={sym}
                    onClick={() => handleTestStabilization(sym)}
                    className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm shadow-md transition"
                  >
                    Átomo: {sym}
                  </button>
                ))}
              </div>

              {selectedAtomForChallenge && !challengeSuccess && (
                <div className="p-3 bg-rose-500/20 text-rose-300 rounded-xl border border-rose-500/30 text-xs">
                  Átomo incorreto! O átomo necessário para formar $H_2O$ com 6 elétrons de valência é o Oxigênio (O). Tente novamente!
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-6 items-center text-center py-6">
              <div className="p-5 bg-gradient-to-tr from-amber-500/20 to-emerald-500/20 text-amber-400 rounded-3xl border border-amber-500/40 shadow-xl">
                <Award className="w-16 h-16" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-white mb-2">Quiz & Desafio Concluídos!</h3>
                <p className="text-sm text-slate-300">
                  Você concluiu todas as etapas com uma pontuação total de <strong className="text-emerald-400">{score} / 120 pontos</strong>.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 max-w-md leading-relaxed">
                <Sparkles className="w-4 h-4 text-amber-400 inline mr-1.5" />
                Você demonstrou excelente domínio sobre o modelo de Rutherford-Bohr, orbitais quânticos, ligações químicas e estabilização molecular.
              </div>

              <button
                onClick={handleRestart}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-lg hover:from-emerald-500 hover:to-teal-500 flex items-center gap-2 transition"
              >
                <RotateCcw className="w-4 h-4" />
                Refazer Quiz & Desafio
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
