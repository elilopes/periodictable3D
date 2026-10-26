import React, {useState, useMemo} from 'react';
import {VisualChallenge} from '../data/visualQuizData';
import {CheckCircle2, XCircle, RotateCcw, Lightbulb, Award, Sparkles, ArrowRight, Eye, Info} from 'lucide-react';
import {useLanguage} from '../i18n/LanguageContext';

interface VisualQuizChallengeViewProps {
  challenge: VisualChallenge;
  onComplete: (score: number) => void;
  onNext?: () => void;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

export function VisualQuizChallengeView({challenge, onComplete, onNext}: VisualQuizChallengeViewProps) {
  const {language} = useLanguage();

  // Mapeamento embaralhado estável de letras para os elementos alvo
  const letterMapping = useMemo(() => {
    // Embaralha de maneira previsível usando o id do desafio
    const shuffledTargets = [...challenge.targets].sort((a, b) => {
      const hashA = (a.id * 37 + challenge.id * 13) % 17;
      const hashB = (b.id * 37 + challenge.id * 13) % 17;
      return hashA - hashB;
    });

    return shuffledTargets.map((target, idx) => ({
      letter: LETTERS[idx],
      targetId: target.id,
      elementSymbol: target.elementSymbol,
      elementName: target.elementName[language] || target.elementName.pt,
      hint: target.hint[language] || target.hint.pt,
    }));
  }, [challenge, language]);

  // Estado das respostas: targetId (1..10) -> letter ('A'..'J')
  const [placements, setPlacements] = useState<Record<number, string>>({});
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showHintFor, setShowHintFor] = useState<number | null>(null);
  const [draggedLetter, setDraggedLetter] = useState<string | null>(null);

  // Letras já posicionadas
  const usedLetters = useMemo(() => new Set(Object.values(placements)), [placements]);

  // Colocar uma letra em um alvo (objeto 1..10)
  const placeLetterOnTarget = (targetId: number, letter: string) => {
    setPlacements((prev) => {
      const next = {...prev};
      // Se a letra já estava em outro slot, remove do anterior
      Object.keys(next).forEach((k) => {
        if (next[Number(k)] === letter) {
          delete next[Number(k)];
        }
      });
      next[targetId] = letter;
      return next;
    });
    setSelectedLetter(null);
    setIsChecked(false);
  };

  // Remover uma letra de um slot
  const removeLetterFromTarget = (targetId: number) => {
    setPlacements((prev) => {
      const next = {...prev};
      delete next[targetId];
      return next;
    });
    setIsChecked(false);
  };

  // Arrastar (HTML5 Drag & Drop)
  const handleDragStart = (letter: string) => {
    setDraggedLetter(letter);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: number) => {
    if (draggedLetter) {
      placeLetterOnTarget(targetId, draggedLetter);
      setDraggedLetter(null);
    }
  };

  // Calcular acertos
  const checkResults = () => {
    setIsChecked(true);
    let correctCount = 0;
    challenge.targets.forEach((target) => {
      const placedLetter = placements[target.id];
      const correctItem = letterMapping.find((m) => m.targetId === target.id);
      if (placedLetter && correctItem && placedLetter === correctItem.letter) {
        correctCount += 1;
      }
    });

    const earnedPoints = correctCount * 10;
    onComplete(earnedPoints);
  };

  const handleReset = () => {
    setPlacements({});
    setSelectedLetter(null);
    setIsChecked(false);
    setShowHintFor(null);
  };

  // Contagem de acertos atual se já verificado
  const correctCount = useMemo(() => {
    if (!isChecked) return 0;
    return challenge.targets.filter((target) => {
      const placedLetter = placements[target.id];
      const correctItem = letterMapping.find((m) => m.targetId === target.id);
      return placedLetter && correctItem && placedLetter === correctItem.letter;
    }).length;
  }, [isChecked, challenge.targets, placements, letterMapping]);

  const allAssigned = Object.keys(placements).length === 10;

  return (
    <div className="flex flex-col gap-6">
      {/* Título e Instruções */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            {challenge.title[language] || challenge.title.pt}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {challenge.subtitle[language] || challenge.subtitle.pt}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs px-3 py-1 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 font-semibold">
            {Object.keys(placements).length} / 10 posicionados
          </span>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Limpar e recomeçar desafio"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Conteúdo Principal: Coluna Lateral de Letras + Imagem Interativa com Dropzones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Coluna de Elementos e Letras (Arrastáveis / Clicáveis) */}
        <div className="lg:col-span-4 bg-slate-950/90 p-4 rounded-2xl border border-slate-800 flex flex-col gap-3 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-sky-400" />
              Elementos Químicos
            </span>
            <span className="text-[10px] text-slate-400">Arraste ou clique</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 max-h-[460px] overflow-y-auto pr-1">
            {letterMapping.map((item) => {
              const isUsed = usedLetters.has(item.letter);
              const isSelected = selectedLetter === item.letter;

              // Encontrar em qual slot está colocado
              let placedInSlot: number | null = null;
              Object.entries(placements).forEach(([slotStr, l]) => {
                if (l === item.letter) placedInSlot = Number(slotStr);
              });

              return (
                <div
                  key={item.letter}
                  draggable={true}
                  onDragStart={() => handleDragStart(item.letter)}
                  onClick={() => {
                    if (isUsed && placedInSlot) {
                      removeLetterFromTarget(placedInSlot);
                    } else {
                      setSelectedLetter(isSelected ? null : item.letter);
                    }
                  }}
                  className={`group relative p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 select-none ${
                    isSelected
                      ? 'bg-sky-500/25 border-sky-400 text-white shadow-lg ring-2 ring-sky-400/50 scale-[1.02]'
                      : isUsed
                      ? 'bg-slate-900/60 border-slate-800/80 text-slate-400 opacity-75'
                      : 'bg-slate-900/90 border-slate-700/80 text-slate-200 hover:border-slate-500 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-md shrink-0">
                      {item.letter}
                    </span>
                    <span className="text-xs font-semibold truncate text-slate-100">
                      {item.elementName}
                    </span>
                  </div>

                  {placedInSlot ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 shrink-0">
                      Slot {placedInSlot}
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 group-hover:text-slate-300">
                      {isSelected ? 'Selecione objeto' : 'Arrastar'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {selectedLetter && (
            <div className="p-2.5 bg-sky-500/10 border border-sky-500/30 rounded-xl text-xs text-sky-300 flex items-center gap-2 animate-pulse">
              <span className="w-5 h-5 rounded-md bg-sky-600 text-white font-bold flex items-center justify-center text-[10px]">
                {selectedLetter}
              </span>
              <span>Clique no cartão/objeto desejado na mesa para posicionar!</span>
            </div>
          )}
        </div>

        {/* Imagem do Desafio com os 10 Objetos e Dropzones */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700 bg-slate-950 group">
            {/* Imagem de Fundo (10 objetos na bancada) */}
            <img
              src={challenge.imageSrc}
              alt="Mesa de Laboratório com 10 Elementos Químicos"
              className="w-full h-full object-cover block select-none pointer-events-none"
            />

            {/* Overlay sutil para realce das zonas */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

            {/* 10 Zonas Interativas ao longo da mesa */}
            {challenge.targets.map((target) => {
              const placedLetter = placements[target.id];
              const isTargetSelected = selectedLetter !== null;
              const correctItem = letterMapping.find((m) => m.targetId === target.id);
              const isCorrect = isChecked && placedLetter && correctItem && placedLetter === correctItem.letter;
              const isWrong = isChecked && placedLetter && correctItem && placedLetter !== correctItem.letter;

              return (
                <div
                  key={target.id}
                  style={{
                    left: `${target.xPercent}%`,
                    transform: 'translateX(-50%)',
                  }}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(target.id)}
                  onClick={() => {
                    if (selectedLetter) {
                      placeLetterOnTarget(target.id, selectedLetter);
                    } else if (placedLetter) {
                      removeLetterFromTarget(target.id);
                    }
                  }}
                  className={`absolute bottom-3 sm:bottom-4 flex flex-col items-center cursor-pointer transition-transform duration-200 ${
                    isTargetSelected ? 'hover:scale-110' : ''
                  }`}
                >
                  {/* Marcador superior apontando para o objeto */}
                  <div
                    onMouseEnter={() => setShowHintFor(target.id)}
                    onMouseLeave={() => setShowHintFor(null)}
                    className="mb-1 text-[9px] px-1.5 py-0.5 rounded-full bg-slate-900/90 text-amber-300 font-bold border border-amber-500/40 backdrop-blur-sm shadow flex items-center gap-1 hover:bg-amber-500/20 transition"
                  >
                    <span>#{target.id}</span>
                    <Eye className="w-2.5 h-2.5" />
                  </div>

                  {/* Cartão de Dropzone (Alinhado com os cartões da mesa) */}
                  <div
                    className={`w-9 sm:w-12 md:w-14 h-12 sm:h-14 md:h-16 rounded-xl border-2 flex flex-col items-center justify-center transition-all shadow-xl backdrop-blur-md ${
                      isCorrect
                        ? 'bg-emerald-600/90 border-emerald-400 text-white ring-4 ring-emerald-500/50 scale-105'
                        : isWrong
                        ? 'bg-rose-600/90 border-rose-400 text-white ring-4 ring-rose-500/50'
                        : placedLetter
                        ? 'bg-indigo-600/90 border-indigo-400 text-white'
                        : isTargetSelected
                        ? 'bg-sky-500/40 border-sky-300 text-sky-200 border-dashed animate-pulse ring-2 ring-sky-400/50'
                        : 'bg-slate-900/75 border-slate-400/60 text-slate-300 border-dashed hover:border-white hover:bg-slate-800/80'
                    }`}
                  >
                    {placedLetter ? (
                      <div className="flex flex-col items-center">
                        <span className="text-base sm:text-xl font-black">{placedLetter}</span>
                        {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                        {isWrong && <XCircle className="w-3.5 h-3.5 text-white" />}
                      </div>
                    ) : (
                      <span className="text-xs sm:text-sm font-bold opacity-60">?</span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Tooltip de Inspeção do Objeto ao passar o mouse ou tocar */}
            {showHintFor !== null && (
              <div
                style={{
                  left: `${challenge.targets.find((t) => t.id === showHintFor)?.xPercent}%`,
                  transform: 'translateX(-50%)',
                }}
                className="absolute top-4 z-20 w-48 sm:w-56 p-2.5 bg-slate-950/95 border border-amber-500/50 text-white rounded-xl shadow-2xl backdrop-blur-md pointer-events-none animate-fadeIn"
              >
                <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Lightbulb className="w-3 h-3 text-amber-400" />
                  Objeto #{showHintFor}
                </div>
                <p className="text-xs text-slate-200 leading-snug">
                  {challenge.targets.find((t) => t.id === showHintFor)?.objectDescription[language] ||
                    challenge.targets.find((t) => t.id === showHintFor)?.objectDescription.pt}
                </p>
                <p className="text-[10px] text-amber-300/90 mt-1.5 italic">
                  {challenge.targets.find((t) => t.id === showHintFor)?.hint[language] ||
                    challenge.targets.find((t) => t.id === showHintFor)?.hint.pt}
                </p>
              </div>
            )}
          </div>

          {/* Barra de Ações: Verificar, Pontuação e Próximo */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={checkResults}
                disabled={Object.keys(placements).length === 0}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {language === 'pt' ? 'Verificar Respostas' : 'Check Answers'}
              </button>

              <button
                onClick={() => {
                  // Preencher com a solução para estudo se o usuário desejar
                  const solution: Record<number, string> = {};
                  letterMapping.forEach((item) => {
                    solution[item.targetId] = item.letter;
                  });
                  setPlacements(solution);
                  setIsChecked(true);
                }}
                className="px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition"
              >
                {language === 'pt' ? 'Revelar Solução' : 'Reveal Solution'}
              </button>
            </div>

            {isChecked && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-700">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>
                    {correctCount} / 10 corretos (+{correctCount * 10} pts)
                  </span>
                </div>

                {onNext && (
                  <button
                    onClick={onNext}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold shadow-lg flex items-center gap-2 transition"
                  >
                    <span>{language === 'pt' ? 'Próximo Desafio' : 'Next Challenge'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
