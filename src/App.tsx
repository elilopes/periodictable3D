/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {useState, useMemo} from 'react';
import {ELEMENTS_118, ElementData} from './data/elements';
import {PeriodicTableScene, ViewMode} from './components/PeriodicTableScene';
import {Sidebar} from './components/Sidebar';
import {FilterBar} from './components/FilterBar';
import {ChemicalBondVisualizer} from './components/ChemicalBondVisualizer';
import {ElementComparisonModal} from './components/ElementComparisonModal';
import {OrganicFunctionsModal} from './components/OrganicFunctionsModal';
import {InorganicFunctionsModal} from './components/InorganicFunctionsModal';
import {ChemistryQuizModal} from './components/ChemistryQuizModal';
import {ChemistryGlossaryModal} from './components/ChemistryGlossaryModal';
import {PeriodicTrendsModal} from './components/PeriodicTrendsModal';
import {RadioactiveDecayModal} from './components/RadioactiveDecayModal';
import {ReactionLabModal} from './components/ReactionLabModal';
import {LanguageProvider, useLanguage} from './i18n/LanguageContext';

function PeriodicTableApp() {
  const {getElementName} = useLanguage();

  // Elemento selecionado (inicia no Carbono para demonstração instantânea das órbitas)
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(ELEMENTS_118[5]); // Carbono

  // Filtros de busca
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [selectedPhase, setSelectedPhase] = useState<string>('todas');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('todas');

  // Modo de visualização 3D da tabela
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  // Modais
  const [isBondsOpen, setIsBondsOpen] = useState<boolean>(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState<boolean>(false);
  const [isOrganicOpen, setIsOrganicOpen] = useState<boolean>(false);
  const [isInorganicOpen, setIsInorganicOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [isTrendsOpen, setIsTrendsOpen] = useState<boolean>(false);
  const [isDecayOpen, setIsDecayOpen] = useState<boolean>(false);
  const [isReactionLabOpen, setIsReactionLabOpen] = useState<boolean>(false);
  const [compareElementA, setCompareElementA] = useState<ElementData | null>(ELEMENTS_118[5]); // Carbono
  const [compareElementB, setCompareElementB] = useState<ElementData | null>(ELEMENTS_118[13]); // Silício

  // Contagem de elementos correspondentes aos filtros considerando também o nome traduzido
  const matchedCount = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ELEMENTS_118.filter((el) => {
      const locName = getElementName(el.number).toLowerCase();
      const matchSearch =
        !q ||
        el.name.toLowerCase().includes(q) ||
        locName.includes(q) ||
        el.symbol.toLowerCase().includes(q) ||
        el.number.toString() === q ||
        el.atomicMass.toString().includes(q) ||
        el.group.toString() === q ||
        el.period.toString() === q;

      const matchCategory = selectedCategory === 'todas' || el.category === selectedCategory;
      const matchPhase = selectedPhase === 'todas' || el.phase === selectedPhase;
      const matchOrigin = selectedOrigin === 'todas' || el.origin === selectedOrigin;

      return matchSearch && matchCategory && matchPhase && matchOrigin;
    }).length;
  }, [searchQuery, selectedCategory, selectedPhase, selectedOrigin, getElementName]);

  const handleOpenComparison = (element?: ElementData) => {
    if (element) {
      setCompareElementA(element);
    }
    setIsComparisonOpen(true);
  };

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col overflow-hidden font-sans select-none">
      {/* Barra Superior de Filtros, Seletor de Idioma e Ferramentas */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPhase={selectedPhase}
        setSelectedPhase={setSelectedPhase}
        selectedOrigin={selectedOrigin}
        setSelectedOrigin={setSelectedOrigin}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenComparison={() => handleOpenComparison(selectedElement || undefined)}
        onOpenBonds={() => setIsBondsOpen(true)}
        onOpenOrganic={() => setIsOrganicOpen(true)}
        onOpenInorganic={() => setIsInorganicOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenTrends={() => setIsTrendsOpen(true)}
        onOpenDecay={() => setIsDecayOpen(true)}
        onOpenReactionLab={() => setIsReactionLabOpen(true)}
        matchedCount={matchedCount}
      />

      {/* Área Central: Cena 3D + Painel Lateral */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Cena 3D da Tabela Periódica */}
        <main className="flex-1 h-full relative">
          <PeriodicTableScene
            selectedElement={selectedElement}
            onElementSelect={setSelectedElement}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            selectedPhase={selectedPhase}
            selectedOrigin={selectedOrigin}
            viewMode={viewMode}
          />
        </main>

        {/* Painel Lateral com Modelo de Bohr 3D, Dados, História e Aplicações */}
        <Sidebar
          element={selectedElement}
          onClose={() => setSelectedElement(null)}
          onOpenComparison={handleOpenComparison}
          onOpenBonds={() => setIsBondsOpen(true)}
        />
      </div>

      {/* Modal: Ligações Químicas 3D Interativas */}
      <ChemicalBondVisualizer
        isOpen={isBondsOpen}
        onClose={() => setIsBondsOpen(false)}
      />

      {/* Modal: Comparador de Elementos e Configurações Eletrônicas */}
      <ElementComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        initialElementA={compareElementA}
        initialElementB={compareElementB}
      />

      {/* Modal: Funções Orgânicas Oxigenadas */}
      <OrganicFunctionsModal
        isOpen={isOrganicOpen}
        onClose={() => setIsOrganicOpen(false)}
      />

      {/* Modal: Funções Químicas Inorgânicas */}
      <InorganicFunctionsModal
        isOpen={isInorganicOpen}
        onClose={() => setIsInorganicOpen(false)}
      />

      {/* Modal: Quiz & Desafio */}
      <ChemistryQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />

      {/* Modal: Glossário de Termos Técnicos */}
      <ChemistryGlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* Modal: Tendências Periódicas 3D (Topografia) */}
      <PeriodicTrendsModal
        isOpen={isTrendsOpen}
        onClose={() => setIsTrendsOpen(false)}
      />

      {/* Modal: Decaimento Radioativo 3D & Transmutação Nuclear */}
      <RadioactiveDecayModal
        isOpen={isDecayOpen}
        onClose={() => setIsDecayOpen(false)}
      />

      {/* Modal: Laboratório 3D de Reações Químicas (Drag-and-Drop) */}
      <ReactionLabModal
        isOpen={isReactionLabOpen}
        onClose={() => setIsReactionLabOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PeriodicTableApp />
    </LanguageProvider>
  );
}
