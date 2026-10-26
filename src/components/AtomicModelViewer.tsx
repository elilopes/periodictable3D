import React, {useState} from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import {ElementData} from '../data/elements';
import {BohrAtom, BohrLegend} from './BohrAtom';
import {QuantumOrbitalModel} from './QuantumOrbitalModel';
import {BallAndStickModel} from './BallAndStickModel';
import {SpaceFillingModel} from './SpaceFillingModel';
import {VisualElementsArtView} from './VisualElementsArtView';
import {useLanguage} from '../i18n/LanguageContext';
import {
  Atom,
  Sparkles,
  Share2,
  CircleDot,
  RotateCw,
  Info,
  Layers,
  Palette,
} from 'lucide-react';

export type AtomicModelType =
  | 'rutherford-bohr'
  | 'quantum-orbital'
  | 'ball-and-stick'
  | 'space-filling'
  | 'visual-elements';

interface AtomicModelViewerProps {
  element: ElementData;
}

export function AtomicModelViewer({element}: AtomicModelViewerProps) {
  const {t, language} = useLanguage();
  const [activeModel, setActiveModel] = useState<AtomicModelType>('rutherford-bohr');
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [showTrails, setShowTrails] = useState<boolean>(true);

  // Modelos configurados com ícones (5 representações completas)
  const modelOptions: Array<{
    id: AtomicModelType;
    label: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'rutherford-bohr',
      label: t.models.rutherfordBohr.shortName,
      icon: <Atom className="w-3.5 h-3.5" />,
    },
    {
      id: 'quantum-orbital',
      label: t.models.quantumOrbital.shortName,
      icon: <Sparkles className="w-3.5 h-3.5" />,
    },
    {
      id: 'ball-and-stick',
      label: t.models.ballAndStick.shortName,
      icon: <Share2 className="w-3.5 h-3.5" />,
    },
    {
      id: 'space-filling',
      label: t.models.spaceFilling.shortName,
      icon: <CircleDot className="w-3.5 h-3.5" />,
    },
    {
      id: 'visual-elements',
      label: language === 'pt' ? 'Visual Elements' : language === 'ru' ? 'Visual Elements (RSC)' : 'Visual Elements',
      icon: <Palette className="w-3.5 h-3.5" />,
    },
  ];

  // Informações do modelo ativo
  const activeModelInfo = (() => {
    switch (activeModel) {
      case 'rutherford-bohr':
        return t.models.rutherfordBohr;
      case 'quantum-orbital':
        return t.models.quantumOrbital;
      case 'ball-and-stick':
        return t.models.ballAndStick;
      case 'space-filling':
        return t.models.spaceFilling;
      case 'visual-elements':
        return {
          title: 'Murray Robertson’s Visual Elements (Royal Society of Chemistry)',
          badge: 'Arte & Ciência RSC',
          desc: language === 'pt'
            ? 'Representação artística e histórica de cada elemento químico criada pelo aclamado artista Murray Robertson para a Royal Society of Chemistry (RSC). Cada elemento possui uma gravura digital exclusiva que combina ciência moderna, história e simbolismo visual.'
            : language === 'ru'
            ? 'Художественное и историческое представление каждого элемента, созданное художником Мюрреем Робертсоном для Королевского химического общества Великобритании (RSC). Сочетает науку, историю и визуальные символы.'
            : 'Artistic and historical interpretation of each chemical element created by artist Murray Robertson for the Royal Society of Chemistry (RSC), blending modern science, historical discovery, and visual symbolism.',
        };
    }
  })();

  return (
    <div className="flex flex-col gap-3">
      {/* Seletor dos Modelos de Visualização Atômica */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            {t.models.modelSelectorLabel}
          </span>
          <span className="text-[10px] text-sky-400 font-mono">
            {activeModelInfo.badge}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {modelOptions.map((opt) => {
            const isSelected = opt.id === activeModel;
            return (
              <button
                key={opt.id}
                onClick={() => setActiveModel(opt.id)}
                className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                  isSelected
                    ? 'bg-sky-500/20 border-sky-400/60 text-sky-300 shadow-md font-bold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {opt.icon}
                <span className="truncate">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Área Central: Visualizador 3D ou Visual Elements Artwork */}
      <div
        className="w-full h-72 bg-slate-900/90 rounded-2xl overflow-hidden border border-slate-800/80 relative shadow-inner select-none touch-none flex items-center justify-center"
        style={{touchAction: 'none'}}
      >
        {activeModel === 'visual-elements' ? (
          <VisualElementsArtView element={element} />
        ) : (
          <Canvas camera={{position: [0, 0, 7.5], fov: 46}}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 10]} intensity={1.2} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            <pointLight position={[0, 0, 6]} intensity={1.0} />

            {/* Renderização do Modelo 3D Selecionado */}
            {activeModel === 'rutherford-bohr' && (
              <BohrAtom
                element={element}
                speed={rotationSpeed}
                showTrails={showTrails}
              />
            )}

            {activeModel === 'quantum-orbital' && (
              <QuantumOrbitalModel element={element} />
            )}

            {activeModel === 'ball-and-stick' && (
              <BallAndStickModel element={element} />
            )}

            {activeModel === 'space-filling' && (
              <SpaceFillingModel element={element} />
            )}

            {/* Controle de Órbita: Rotação com Mouse ou Dedo */}
            <OrbitControls
              enableDamping
              dampingFactor={0.06}
              minDistance={3.5}
              maxDistance={18}
              makeDefault
            />
          </Canvas>
        )}

        {/* Controles sobrepostos específicos para o modelo Rutherford-Bohr */}
        {activeModel === 'rutherford-bohr' && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-slate-950/80 px-2 py-1 rounded-lg border border-slate-800 text-[11px] text-slate-300 pointer-events-auto">
            <button
              onClick={() => setShowTrails(!showTrails)}
              className={`px-2 py-0.5 rounded text-[10px] ${
                showTrails ? 'bg-sky-500/20 text-sky-300' : 'text-slate-500'
              }`}
            >
              {t.sidebar.orbitsToggle}
            </button>
            <button
              onClick={() => setRotationSpeed((s) => (s === 1 ? 2 : s === 2 ? 0.5 : 1))}
              className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] hover:text-white"
            >
              {rotationSpeed}x
            </button>
          </div>
        )}

        {/* Dica de Rotação com o Mouse ou Dedo (quando em modelo 3D) */}
        {activeModel !== 'visual-elements' && (
          <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1.5 bg-slate-950/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] text-slate-300 pointer-events-none">
            <RotateCw className="w-3 h-3 text-sky-400 animate-spin" style={{animationDuration: '8s'}} />
            <span>{t.models.rotateInstruction}</span>
          </div>
        )}
      </div>

      {/* Seção Informativa do Modelo Selecionado */}
      <div className="p-3.5 bg-slate-900/70 rounded-xl border border-slate-800 text-xs text-slate-300 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-sky-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
            {activeModelInfo.title}
          </span>
        </div>
        <p className="text-slate-300 leading-relaxed text-[11px]">
          {activeModelInfo.desc}
        </p>
        {'uncertaintyPrinciple' in activeModelInfo && Boolean((activeModelInfo as any).uncertaintyPrinciple) && (
          <div className="mt-1 p-2 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-[11px] text-indigo-300">
            <strong>{String((activeModelInfo as any).uncertaintyPrinciple)}</strong>
          </div>
        )}
        {'geometryNote' in activeModelInfo && Boolean((activeModelInfo as any).geometryNote) && (
          <div className="mt-1 p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-[11px] text-emerald-300">
            {String((activeModelInfo as any).geometryNote)}
          </div>
        )}
        {'vanDerWaalsRadius' in activeModelInfo && Boolean((activeModelInfo as any).vanDerWaalsRadius) && (
          <div className="mt-1 p-2 rounded-lg bg-amber-950/40 border border-amber-800/40 text-[11px] text-amber-300">
            {String((activeModelInfo as any).vanDerWaalsRadius)}
          </div>
        )}
      </div>

      {/* Legenda de Camadas do Bohr (quando em Rutherford-Bohr) */}
      {activeModel === 'rutherford-bohr' && (
        <BohrLegend element={element} />
      )}
    </div>
  );
}
