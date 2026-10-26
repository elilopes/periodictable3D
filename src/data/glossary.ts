export interface GlossaryTerm {
  id: string;
  term: {
    pt: string;
    en: string;
    ru: string;
  };
  definition: {
    pt: string;
    en: string;
    ru: string;
  };
}

export const CHEMISTRY_GLOSSARY: GlossaryTerm[] = [
  {
    id: 'numero-atomico',
    term: {
      pt: 'Número Atômico (Z)',
      en: 'Atomic Number (Z)',
      ru: 'Атомный номер (Z)',
    },
    definition: {
      pt: 'É a identidade do átomo: o número de prótons (partículas positivas) que existem no núcleo. Se mudar o número de prótons, muda o elemento (por exemplo, hidrogênio tem 1, carbono tem 6, ouro tem 79).',
      en: 'The identity of the atom: the number of protons in the nucleus. Changing the number of protons changes the element itself.',
      ru: 'Идентичность атома: количество протонов в ядре. Изменение количества протонов меняет химический элемент.',
    },
  },
  {
    id: 'massa-atomica',
    term: {
      pt: 'Massa Atômica',
      en: 'Atomic Mass',
      ru: 'Атомная масса',
    },
    definition: {
      pt: 'É o peso total do átomo, somando os prótons e nêutrons que ficam bem no centrinho (núcleo). É como o peso na balança do mundo atômico.',
      en: 'The total weight of the atom, combining protons and neutrons in the nucleus.',
      ru: 'Общий вес атома, объединяющий протоны и нейтроны в ядре.',
    },
  },
  {
    id: 'camada-valencia',
    term: {
      pt: 'Camada de Valência',
      en: 'Valence Shell',
      ru: 'Валентная оболочка',
    },
    definition: {
      pt: 'É a camada de elétrons mais externa de um átomo. É a camada que "entra em contato" com outros átomos e decide se eles vão fazer amizade (ligações químicas) ou não.',
      en: 'The outermost electron shell of an atom. It determines how atoms bond with each other.',
      ru: 'Самая внешняя электронная оболочка атома, определяющая химические связи.',
    },
  },
  {
    id: 'regra-octeto',
    term: {
      pt: 'Regra do Octeto',
      en: 'Octet Rule',
      ru: 'Правило октета',
    },
    definition: {
      pt: 'A "lei da estabilidade": a maioria dos átomos quer ficar com 8 elétrons na última camada para relaxar e ficar estável (igual aos gases nobres).',
      en: 'The stability rule: most atoms strive to have 8 electrons in their outer shell to achieve full stability.',
      ru: 'Правило стабильности: большинство атомов стремятся иметь 8 электронов на внешней оболочке.',
    },
  },
  {
    id: 'ligacao-ionica',
    term: {
      pt: 'Ligação Iônica',
      en: 'Ionic Bond',
      ru: 'Ионная связь',
    },
    definition: {
      pt: 'Quando um átomo generoso doa um elétron de vez para outro que está precisando. Fica um positivo e um negativo, grudados por atração magnética/elétrica (ex: sal de cozinha).',
      en: 'When one atom completely donates an electron to another, creating positive and negative ions that attract each other like magnets.',
      ru: 'Когда один атом полностью отдает электрон другому, создавая положительные и отрицательные ионы.',
    },
  },
  {
    id: 'ligacao-covalente',
    term: {
      pt: 'Ligação Covalente',
      en: 'Covalent Bond',
      ru: 'Ковалентная связь',
    },
    definition: {
      pt: 'Quando dois átomos fazem sociedade e compartilham pares de elétrons para todo mundo ficar feliz e com o octeto completo (ex: água e oxigênio).',
      en: 'When atoms share pairs of electrons to complete their outer shells together.',
      ru: 'Когда атомы делятся парами электронов для совместного заполнения оболочек.',
    },
  },
  {
    id: 'eletronegatividade',
    term: {
      pt: 'Eletronegatividade',
      en: 'Electronegativity',
      ru: 'Электроотрицательность',
    },
    definition: {
      pt: 'O poder de "puxar a cobertora para o seu lado": a força com que um átomo puxa os elétrons compartilhados para perto dele em uma ligação.',
      en: 'The ability of an atom to attract shared electrons toward itself in a chemical bond.',
      ru: 'Способность атома притягивать общие электроны к себе.',
    },
  },
  {
    id: 'orbital',
    term: {
      pt: 'Orbital (Mecânica Quântica)',
      en: 'Orbital (Quantum Mechanics)',
      ru: 'Орбиталь',
    },
    definition: {
      pt: 'Em vez de uma pista circular certinha, o orbital é como uma "nuvem estatística" tridimensional onde é mais provável encontrar o elétron zanzando.',
      en: 'A 3D probability cloud region where an electron is most likely to be found.',
      ru: 'Трехмерная область вероятности нахождения электрона.',
    },
  },
  {
    id: 'ph',
    term: {
      pt: 'Escala de pH',
      en: 'pH Scale',
      ru: 'Шкала pH',
    },
    definition: {
      pt: 'Mede o quão ácido ou básico (alcalino) algo é. De 0 a 7 é ácido (limão, vinagre), 7 é neutro (água pura) e acima de 7 até 14 é básico/alcalino (soda, sabão).',
      en: 'Measures how acidic or basic a solution is from 0 to 14.',
      ru: 'Измеряет кислотность или щелочность раствора от 0 до 14.',
    },
  },
  {
    id: 'carbonila',
    term: {
      pt: 'Grupo Carbonila (C=O)',
      en: 'Carbonyl Group',
      ru: 'Карбонильная группа',
    },
    definition: {
      pt: 'Um átomo de carbono ligado por uma ligação dupla a um átomo de oxigênio (C=O). Super comum em aldeídos, cetonas e ácidos.',
      en: 'A carbon atom double-bonded to an oxygen atom (C=O), found in aldehydes and ketones.',
      ru: 'Атом углерода, связанный двойной связью с кислородом (C=O).',
    },
  },
  {
    id: 'hidroxila',
    term: {
      pt: 'Grupo Hidroxila (—OH)',
      en: 'Hydroxyl Group',
      ru: 'Гидроксильная группа',
    },
    definition: {
      pt: 'Um oxigênio ligado a um hidrogênio (—OH). É a marca registrada dos álcoois, fenóis e bases inorgânicas.',
      en: 'An oxygen atom bonded to a hydrogen atom (—OH), characteristic of alcohols and bases.',
      ru: 'Атом кислорода, связанный с водородом (—OH), характерен для спиртов и оснований.',
    },
  },
];
