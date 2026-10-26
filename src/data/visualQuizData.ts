export interface VisualObjectTarget {
  id: number; // 1 a 10 (posição da esquerda para a direita)
  elementSymbol: string;
  xPercent: number; // Porcentagem horizontal na imagem (aproximada do cartão/objeto)
  elementName: {
    pt: string;
    en: string;
    ru: string;
  };
  objectDescription: {
    pt: string;
    en: string;
    ru: string;
  };
  hint: {
    pt: string;
    en: string;
    ru: string;
  };
}

export interface VisualChallenge {
  id: number;
  imageSrc: string;
  title: {
    pt: string;
    en: string;
    ru: string;
  };
  subtitle: {
    pt: string;
    en: string;
    ru: string;
  };
  targets: VisualObjectTarget[];
}

export const VISUAL_CHALLENGES: VisualChallenge[] = [
  {
    id: 1,
    imageSrc: '/images/quiz-table-periodica1.jpeg',
    title: {
      pt: 'Desafio Visual 1: Amostras Elementares no Laboratório',
      en: 'Visual Challenge 1: Elemental Lab Samples',
      ru: 'Визуальный вызов 1: Лабораторные образцы элементов',
    },
    subtitle: {
      pt: 'Arraste as letras dos elementos químicos da coluna para cada um dos 10 frascos e amostras na mesa.',
      en: 'Drag the element letters from the column to each of the 10 vials and samples on the table.',
      ru: 'Перетащите буквы химических элементов из колонки к каждому из 10 образцов на столе.',
    },
    targets: [
      {
        id: 1,
        elementSymbol: 'Cu',
        xPercent: 7.2,
        elementName: { pt: 'Cobre (Cu)', en: 'Copper (Cu)', ru: 'Медь (Cu)' },
        objectDescription: {
          pt: 'Bobina de fio de cobre metálico avermelhado enrolado',
          en: 'Coiled spool of reddish copper metal wire',
          ru: 'Бухта намотанной красноватой медной проволоки',
        },
        hint: {
          pt: 'Metal de cor avermelhada dúctil, essencial na condução elétrica residencial.',
          en: 'Reddish ductile metal essential for home electrical wiring.',
          ru: 'Красноватый пластичный металл, основа домашней электропроводки.',
        },
      },
      {
        id: 2,
        elementSymbol: 'Fe',
        xPercent: 16.5,
        elementName: { pt: 'Ferro (Fe)', en: 'Iron (Fe)', ru: 'Железо (Fe)' },
        objectDescription: {
          pt: 'Fragmento rochoso de meteorito ferromagnético escuro',
          en: 'Dark porous iron meteorite/magnetite specimen',
          ru: 'Темный пористый фрагмент железного метеорита/магнетита',
        },
        hint: {
          pt: 'Metal ferromagnético que compõe a maior parte da massa do planeta Terra.',
          en: 'Ferromagnetic metal that forms most of Earth\'s core and mass.',
          ru: 'Ферромагнитный металл, составляющий большую часть массы Земли.',
        },
      },
      {
        id: 3,
        elementSymbol: 'Au',
        xPercent: 25.8,
        elementName: { pt: 'Ouro (Au)', en: 'Gold (Au)', ru: 'Золото (Au)' },
        objectDescription: {
          pt: 'Agrupamento de cristais brilhantes de ouro nativo',
          en: 'Specimen cluster of lustrous native gold crystals',
          ru: 'Образец блестящих кристаллов самородного золота',
        },
        hint: {
          pt: 'Metal nobre amarelo inalterável que nunca oxida; símbolo vem do latim Aurum.',
          en: 'Unreactive yellow noble metal that never oxidizes; symbol from Latin Aurum.',
          ru: 'Инертный желтый благородный металл; символ от латинского Aurum.',
        },
      },
      {
        id: 4,
        elementSymbol: 'Zn',
        xPercent: 35.2,
        elementName: { pt: 'Zinco (Zn)', en: 'Zinc (Zn)', ru: 'Цинк (Zn)' },
        objectDescription: {
          pt: 'Frasco de vidro com esferas e pastilhas metálicas de zinco',
          en: 'Glass jar with zinc metal granules and spheres',
          ru: 'Стеклянная банка с гранулами и шариками металлического цинка',
        },
        hint: {
          pt: 'Metal usado na galvanização do aço para protegê-lo contra a ferrugem.',
          en: 'Metal widely used for galvanizing steel to prevent rust.',
          ru: 'Металл для оцинковки стали с целью защиты от ржавчины.',
        },
      },
      {
        id: 5,
        elementSymbol: 'Si',
        xPercent: 44.6,
        elementName: { pt: 'Silício (Si)', en: 'Silicon (Si)', ru: 'Кремний (Si)' },
        objectDescription: {
          pt: 'Cristal límpido e facetado de quartzo puro (dióxido de silício)',
          en: 'Prismatic clear faceted crystal of natural quartz (silica)',
          ru: 'Прозрачный граненый кристалл природного кварца (диоксид кремния)',
        },
        hint: {
          pt: 'Segundo elemento mais abundante na crosta terrestre e base de todos os microchips.',
          en: 'Second most abundant element in Earth\'s crust, foundational to computer chips.',
          ru: 'Второй по распространенности элемент в земной коре, основа микрочипов.',
        },
      },
      {
        id: 6,
        elementSymbol: 'Ag',
        xPercent: 54.0,
        elementName: { pt: 'Prata (Ag)', en: 'Silver (Ag)', ru: 'Серебро (Ag)' },
        objectDescription: {
          pt: 'Carretel com fiação metálica prateada de alta pureza',
          en: 'Spool wound with high-purity silver wire',
          ru: 'Катушка с проволокой из высокочистого серебра',
        },
        hint: {
          pt: 'Elemento com a mais alta condutividade elétrica e térmica de todos os metais.',
          en: 'Element boasting the highest electrical and thermal conductivity of all metals.',
          ru: 'Элемент с самой высокой электро- и теплопроводностью среди металлов.',
        },
      },
      {
        id: 7,
        elementSymbol: 'Pb',
        xPercent: 63.5,
        elementName: { pt: 'Chumbo (Pb)', en: 'Lead (Pb)', ru: 'Свинец (Pb)' },
        objectDescription: {
          pt: 'Conjunto de chumbadas cônicas de pesca e tubo cinza pesado',
          en: 'Set of conical lead fishing weights and heavy lead pipe',
          ru: 'Набор конических свинцовых грузил для рыбалки и тяжелая трубка',
        },
        hint: {
          pt: 'Metal muito denso e macio, excelente protetor contra radiações ionizantes.',
          en: 'Dense, soft heavy metal historically used for weights and radiation shielding.',
          ru: 'Плотный мягкий металл, используемый для грузил и защиты от радиации.',
        },
      },
      {
        id: 8,
        elementSymbol: 'S',
        xPercent: 72.8,
        elementName: { pt: 'Enxofre (S)', en: 'Sulfur (S)', ru: 'Сера (S)' },
        objectDescription: {
          pt: 'Montículo de pó amarelo brilhante de enxofre puro',
          en: 'Mound of bright yellow powdered pure sulfur',
          ru: 'Горка ярко-желтого порошка чистой серы',
        },
        hint: {
          pt: 'Não-metal de cor amarela viva, associado a emissões vulcânicas e à pólvora.',
          en: 'Vibrant yellow non-metal associated with volcanoes and gunpowder.',
          ru: 'Ярко-желтый неметалл, связанный с вулканами и порохом.',
        },
      },
      {
        id: 9,
        elementSymbol: 'O',
        xPercent: 82.2,
        elementName: { pt: 'Oxigênio (O)', en: 'Oxygen (O)', ru: 'Кислород (O)' },
        objectDescription: {
          pt: 'Cúpula transparente com oxigênio líquido criogênico azul pálido',
          en: 'Glass cloche containing pale blue cryogenic liquid oxygen',
          ru: 'Стеклянный купол с бледно-голубым жидким криогенным кислородом',
        },
        hint: {
          pt: 'Gás vital que, em estado líquido sob extremo resfriamento, adquire tonalidade azulada.',
          en: 'Vital gas that assumes a distinct pale blue tint in cryogenic liquid state.',
          ru: 'Жизненно важный газ, приобретающий голубой оттенок в жидком криогенном состоянии.',
        },
      },
      {
        id: 10,
        elementSymbol: 'Hg',
        xPercent: 91.8,
        elementName: { pt: 'Mercúrio (Hg)', en: 'Mercury (Hg)', ru: 'Ртуть (Hg)' },
        objectDescription: {
          pt: 'Termômetro clássico de laboratório com coluna de mercúrio líquido',
          en: 'Classic laboratory glass thermometer with silvery liquid mercury column',
          ru: 'Классический лабораторный термометр со столбиком жидкой ртути',
        },
        hint: {
          pt: 'O único elemento metálico que é líquido nas condições normais de temperatura e pressão.',
          en: 'The only metallic element that is liquid at standard room temperature and pressure.',
          ru: 'Единственный металл, являющийся жидкостью при нормальных условиях.',
        },
      },
    ],
  },
  {
    id: 2,
    imageSrc: '/images/quiz-table-periodica2.jpeg',
    title: {
      pt: 'Desafio Visual 2: Gases, Minerais e Equipamentos',
      en: 'Visual Challenge 2: Gases, Minerals & Equipment',
      ru: 'Визуальный вызов 2: Газы, минералы и приборы',
    },
    subtitle: {
      pt: 'Identifique os 10 elementos presentes nos objetos sobre a bancada rústica.',
      en: 'Identify the 10 elements represented by objects on the wooden workbench.',
      ru: 'Определите 10 элементов, представленных объектами на деревянном верстаке.',
    },
    targets: [
      {
        id: 1,
        elementSymbol: 'O',
        xPercent: 7.2,
        elementName: { pt: 'Oxigênio (O)', en: 'Oxygen (O)', ru: 'Кислород (O)' },
        objectDescription: {
          pt: 'Cúpula com líquido azul pálido (oxigênio líquido criogênico)',
          en: 'Cloche dome with pale blue liquid (liquid oxygen)',
          ru: 'Стеклянный купол с бледно-голубой жидкостью (жидкий кислород)',
        },
        hint: {
          pt: 'Em estado líquido sob baixíssima temperatura, este gás vital assume tom azul claro.',
          en: 'At cryogenic liquid temperatures, this vital gas takes on a pale blue color.',
          ru: 'При криогенных температурах этот жизненно важный газ приобретает голубой цвет.',
        },
      },
      {
        id: 2,
        elementSymbol: 'He',
        xPercent: 16.5,
        elementName: { pt: 'Hélio (He)', en: 'Helium (He)', ru: 'Гелий (He)' },
        objectDescription: {
          pt: 'Balões festivos de aniversário flutuando no ar',
          en: 'Floating festive birthday party balloons',
          ru: 'Плавающие в воздухе праздничные воздушные шары',
        },
        hint: {
          pt: 'Gás nobre não-inflamável mais leve que o ar que faz balões flutuarem.',
          en: 'Non-flammable noble gas lighter than air used in party balloons.',
          ru: 'Негорючий благородный газ легче воздуха, надувающий шары.',
        },
      },
      {
        id: 3,
        elementSymbol: 'C',
        xPercent: 25.8,
        elementName: { pt: 'Carbono (C)', en: 'Carbon (C)', ru: 'Углерод (C)' },
        objectDescription: {
          pt: 'Amostra mineral negra e cristalina de grafite/carvão mineral',
          en: 'Lustrous black crystalline specimen of natural mineral carbon',
          ru: 'Блестящий черный образец природного углерода/графита',
        },
        hint: {
          pt: 'Elemento tetravalente que forma a espinha dorsal de toda a química orgânica.',
          en: 'Tetravalent element forming the backbone of all organic chemistry.',
          ru: 'Тетравалентный элемент, основа всей органической химии.',
        },
      },
      {
        id: 4,
        elementSymbol: 'Ar',
        xPercent: 35.2,
        elementName: { pt: 'Argônio (Ar)', en: 'Argon (Ar)', ru: 'Аргон (Ar)' },
        objectDescription: {
          pt: 'Ampola de vidro com gás nobre emitindo luminescência azul celeste',
          en: 'Gas discharge ampoule glowing with pale blue-cyan plasma',
          ru: 'Газоразрядная ампула с небесно-голубым свечением',
        },
        hint: {
          pt: 'O gás nobre mais abundante na atmosfera da Terra (~0,93%).',
          en: 'The most abundant noble gas in Earth\'s atmosphere (~0.93%).',
          ru: 'Самый распространенный благородный газ в атмосфере Земли (~0,93%).',
        },
      },
      {
        id: 5,
        elementSymbol: 'Na',
        xPercent: 44.6,
        elementName: { pt: 'Sódio (Na)', en: 'Sodium (Na)', ru: 'Натрий (Na)' },
        objectDescription: {
          pt: 'Bloco de metal sódio submerso em óleo mineral protetor',
          en: 'Sodium metal block stored under protective oil in a jar',
          ru: 'Брусок металлического натрия под защитным минеральным маслом',
        },
        hint: {
          pt: 'Metal alcalino que oxida rapidamente no ar, devendo ser guardado em querosene/óleo.',
          en: 'Alkali metal that oxidizes rapidly in air, must be stored in oil.',
          ru: 'Щелочной металл, быстро окисляющийся на воздухе, хранится в масле.',
        },
      },
      {
        id: 6,
        elementSymbol: 'Ti',
        xPercent: 54.0,
        elementName: { pt: 'Titânio (Ti)', en: 'Titanium (Ti)', ru: 'Титан (Ti)' },
        objectDescription: {
          pt: 'Pulseira de relógio resistente e parafusos de titânio',
          en: 'Durable watch bracelet and titanium precision screws',
          ru: 'Прочный браслет для часов и титановые винты',
        },
        hint: {
          pt: 'Metal de transição tão forte quanto o aço, porém 45% mais leve e biocompatível.',
          en: 'Transition metal strong as steel, 45% lighter and biocompatible.',
          ru: 'Металл прочный как сталь, но на 45% легче и биосовместим.',
        },
      },
      {
        id: 7,
        elementSymbol: 'S',
        xPercent: 63.5,
        elementName: { pt: 'Enxofre (S)', en: 'Sulfur (S)', ru: 'Сера (S)' },
        objectDescription: {
          pt: 'Mineral de pirita rica em enxofre (dissulfeto de ferro)',
          en: 'Sulfur-rich pyrite mineral specimen (fool\'s gold)',
          ru: 'Богатый серой минерал пирит (дисульфид железа)',
        },
        hint: {
          pt: 'Não-metal amarelo conhecido na antiguidade como "fogo de pedra" e presente na pirita.',
          en: 'Yellow non-metal known since antiquity and key component of pyrite.',
          ru: 'Желтый неметалл, известный с древности, компонент пирита.',
        },
      },
      {
        id: 8,
        elementSymbol: 'Ag',
        xPercent: 72.8,
        elementName: { pt: 'Prata (Ag)', en: 'Silver (Ag)', ru: 'Серебро (Ag)' },
        objectDescription: {
          pt: 'Pires com moedas de prata e colar reluzente',
          en: 'Glass dish with vintage silver coins and chain',
          ru: 'Блюдце со старинными серебряными монетами и цепочкой',
        },
        hint: {
          pt: 'Metal precioso com alta refletividade e forte ação bactericida natural.',
          en: 'Precious metal with high optical reflectivity and natural antibacterial properties.',
          ru: 'Драгоценный металл с высокой отражательной способностью и антибактериальным эффектом.',
        },
      },
      {
        id: 9,
        elementSymbol: 'I',
        xPercent: 82.2,
        elementName: { pt: 'Iodo (I)', en: 'Iodine (I)', ru: 'Иод (I)' },
        objectDescription: {
          pt: 'Frasco com cristais de iodo e vapores violetas nas paredes',
          en: 'Bottle with iodine crystals producing violet vapors',
          ru: 'Флакон с кристаллами иода, дающими фиолетовый пар',
        },
        hint: {
          pt: 'Nutriente essencial para a tireoide humana, adicionado obrigatoriamente ao sal de cozinha.',
          en: 'Essential nutrient for the thyroid gland, mandatorily added to table salt.',
          ru: 'Важный микроэлемент для щитовидной железы, добавляемый в поваренную соль.',
        },
      },
      {
        id: 10,
        elementSymbol: 'Pb',
        xPercent: 91.8,
        elementName: { pt: 'Chumbo (Pb)', en: 'Lead (Pb)', ru: 'Свинец (Pb)' },
        objectDescription: {
          pt: 'Chumbadas cônicas de pesca e tubo cinza pesado',
          en: 'Heavy lead fishing sinkers and pipe piece',
          ru: 'Тяжелые свинцовые грузила для рыбалки и трубка',
        },
        hint: {
          pt: 'Elemento pesado maleável cujo símbolo provém da palavra latina Plumbum.',
          en: 'Dense malleable heavy metal whose symbol comes from Latin Plumbum.',
          ru: 'Тяжелый податливый металл, чей символ происходит от латинского Plumbum.',
        },
      },
    ],
  },
  {
    id: 3,
    imageSrc: '/images/quiz-table-periodica3.jpeg',
    title: {
      pt: 'Desafio Visual 3: Cristais Metálicos e Estruturas Únicas',
      en: 'Visual Challenge 3: Metallic Crystals & Rare Elements',
      ru: 'Визуальный вызов 3: Металлические кристаллы и редкие элементы',
    },
    subtitle: {
      pt: 'Conecte cada elemento à sua forma pura ou cristalina disposta sobre a mesa.',
      en: 'Match each chemical element to its sample or crystal on the lab table.',
      ru: 'Сопоставьте каждый химический элемент с образцом на столе.',
    },
    targets: [
      {
        id: 1,
        elementSymbol: 'Ca',
        xPercent: 7.2,
        elementName: { pt: 'Cálcio (Ca)', en: 'Calcium (Ca)', ru: 'Кальций (Ca)' },
        objectDescription: {
          pt: 'Domo de vidro com cristais prateados de cálcio puro',
          en: 'Glass dome with silver calcium metal crystals',
          ru: 'Стеклянный купол с кристаллами металлического кальция',
        },
        hint: {
          pt: 'Quinto elemento mais abundante na crosta terrestre, essencial em ossos e conchas.',
          en: 'Fifth most abundant element in Earth\'s crust, key in bones and seashells.',
          ru: 'Пятый по распространенности элемент в коре, основа костей и ракушек.',
        },
      },
      {
        id: 2,
        elementSymbol: 'Pt',
        xPercent: 16.5,
        elementName: { pt: 'Platina (Pt)', en: 'Platinum (Pt)', ru: 'Платина (Pt)' },
        objectDescription: {
          pt: 'Carretel de fio de platina pura enrolado em espiral',
          en: 'Spool of coiled pure platinum metal wire',
          ru: 'Катушка с намотанной проволокой из чистой платины',
        },
        hint: {
          pt: 'Metal precioso denso usado em conversores catalíticos de veículos e joias de luxo.',
          en: 'Dense noble metal used in catalytic converters and luxury jewelry.',
          ru: 'Плотный благородный металл для катализаторов и ювелирных изделий.',
        },
      },
      {
        id: 3,
        elementSymbol: 'Zn',
        xPercent: 25.8,
        elementName: { pt: 'Zinco (Zn)', en: 'Zinc (Zn)', ru: 'Цинк (Zn)' },
        objectDescription: {
          pt: 'Prato de vidro com grânulos esféricos metálicos de zinco',
          en: 'Glass dish with zinc metal shot and spheres',
          ru: 'Стеклянная чашка с гранулами металлического цинка',
        },
        hint: {
          pt: 'Metal amplamente usado na galvanização para proteger ligas de ferro contra oxidação.',
          en: 'Metal widely used for galvanizing to protect iron alloys against rust.',
          ru: 'Металл для оцинковки, защищающий железные сплавы от ржавчины.',
        },
      },
      {
        id: 4,
        elementSymbol: 'Cu',
        xPercent: 35.2,
        elementName: { pt: 'Cobre (Cu)', en: 'Copper (Cu)', ru: 'Медь (Cu)' },
        objectDescription: {
          pt: 'Frasco com esferas e grãos de cobre avermelhado reluzente',
          en: 'Vial with lustrous reddish-orange copper granules',
          ru: 'Флакон с блестящими красноватыми гранулами меди',
        },
        hint: {
          pt: 'Primeiro metal trabalhado pelos humanos; excelente condutor de calor e eletricidade.',
          en: 'First metal manipulated by prehistoric humans; outstanding conductor.',
          ru: 'Первый металл, освоенный человеком; отличный проводник.',
        },
      },
      {
        id: 5,
        elementSymbol: 'Fe',
        xPercent: 44.6,
        elementName: { pt: 'Ferro (Fe)', en: 'Iron (Fe)', ru: 'Железо (Fe)' },
        objectDescription: {
          pt: 'Frascos gêmeos com pó fino cinzento de ferro para laboratório',
          en: 'Twin bottles with fine grey lab-grade iron powders',
          ru: 'Два флакона с серым порошком железа для лаборатории',
        },
        hint: {
          pt: 'Metal central do núcleo externo e interno do planeta Terra.',
          en: 'Core metal dominating Earth\'s inner and outer magnetic core.',
          ru: 'Главный металл внешнего и внутреннего ядра планеты Земля.',
        },
      },
      {
        id: 6,
        elementSymbol: 'C',
        xPercent: 54.0,
        elementName: { pt: 'Carbono (C)', en: 'Carbon (C)', ru: 'Углерод (C)' },
        objectDescription: {
          pt: 'Frasco de vidro com cristais negros lustrosos de carvão ativado',
          en: 'Glass bottle with lustrous black activated carbon granules',
          ru: 'Флакон с блестящими черными гранулами активированного угля',
        },
        hint: {
          pt: 'Possui a maior variedade de compostos químicos conhecidos devido à capacidade de formar cadeias.',
          en: 'Forms millions of diverse chemical compounds through stable catenation.',
          ru: 'Образует миллионы соединений благодаря способности к образованию длинных цепей.',
        },
      },
      {
        id: 7,
        elementSymbol: 'Bi',
        xPercent: 63.5,
        elementName: { pt: 'Bismuto (Bi)', en: 'Bismuth (Bi)', ru: 'Висмут (Bi)' },
        objectDescription: {
          pt: 'Esplêndido cristal iridescente de bismuto em formato de degraus piramidais',
          en: 'Spectacular hopper crystal of iridescent bismuth metal',
          ru: 'Впечатляющий радужный лестничный кристалл металлического висмута',
        },
        hint: {
          pt: 'Metal famoso pelos cristais geométricos multicoloridos e por ter meia-vida de bilhões de anos.',
          en: 'Metal famed for rainbow staircase crystals and subtle primordial radioactivity.',
          ru: 'Металл, известный радужными кристаллами в форме лестниц и огромным периодом полураспада.',
        },
      },
      {
        id: 8,
        elementSymbol: 'Sn',
        xPercent: 72.8,
        elementName: { pt: 'Estanho (Sn)', en: 'Tin (Sn)', ru: 'Олово (Sn)' },
        objectDescription: {
          pt: 'Pilha de lingotes retangulares de estanho prateado fundido',
          en: 'Stack of silvery cast pure tin metal ingots',
          ru: 'Стопка серебристых слитков чистейшего олова',
        },
        hint: {
          pt: 'Quando dobrado rapidamente, produz um som estalado característico conhecido como "choro do estanho".',
          en: 'When bent rapidly, emits a distinctive creaking sound called "tin cry".',
          ru: 'При резком сгибании издает характерный хруст, известный как «оловянный крик».',
        },
      },
      {
        id: 9,
        elementSymbol: 'Ne',
        xPercent: 82.2,
        elementName: { pt: 'Neônio (Ne)', en: 'Neon (Ne)', ru: 'Неон (Ne)' },
        objectDescription: {
          pt: 'Tubo de descarga de gás luminescente emitindo luz rosa/púrpura viva',
          en: 'Sealed discharge tube glowing with bright pinkish-red plasma',
          ru: 'Запаянная трубка, светящаяся яркой розово-красной плазмой',
        },
        hint: {
          pt: 'Gás nobre com a menor faixa de temperatura líquida e símbolo dos letreiros luminosos.',
          en: 'Noble gas iconic for its bright reddish-orange glow in high-voltage signs.',
          ru: 'Благородный газ, знаменитый красным свечением в неоновых вывесках.',
        },
      },
      {
        id: 10,
        elementSymbol: 'Pb',
        xPercent: 91.8,
        elementName: { pt: 'Chumbo (Pb)', en: 'Lead (Pb)', ru: 'Свинец (Pb)' },
        objectDescription: {
          pt: 'Amostra de mineral cúbico galena e barra de chumbo cinza',
          en: 'Specimen of cubic galena mineral and grey lead metal block',
          ru: 'Кубический образец минерала галенита и свинцовый брусок',
        },
        hint: {
          pt: 'O principal minério natural é a galena (PbS), mineral cúbico escuro e muito pesado.',
          en: 'Its primary natural ore is galena (PbS), a very heavy cubic dark mineral.',
          ru: 'Главная руда — галенит (PbS), тяжелый кубический минерал.',
        },
      },
    ],
  },
  {
    id: 4,
    imageSrc: '/images/quiz-table-periodica4.jpeg',
    title: {
      pt: 'Desafio Visual 4: Reagentes Ativos e Tubos de Laboratório',
      en: 'Visual Challenge 4: Active Reagents & Lab Tubes',
      ru: 'Визуальный вызов 4: Активные реагенты и лабораторные трубки',
    },
    subtitle: {
      pt: 'Arraste as letras para os reagentes químicos e materiais de engenharia.',
      en: 'Drag the letters to the matching chemical reagents and engineering items.',
      ru: 'Перетащите буквы к химическим реагентам и материалам.',
    },
    targets: [
      {
        id: 1,
        elementSymbol: 'He',
        xPercent: 7.2,
        elementName: { pt: 'Hélio (He)', en: 'Helium (He)', ru: 'Гелий (He)' },
        objectDescription: {
          pt: 'Balão metalizado esférico furta-cor flutuando no ar',
          en: 'Metallic iridescent spherical balloon floating in air',
          ru: 'Переливающийся металлизированный шар, парящий в воздухе',
        },
        hint: {
          pt: 'Possui o ponto de fusão e ebulição mais baixos entre todas as substâncias do universo.',
          en: 'Has the lowest melting and boiling points of any substance known.',
          ru: 'Имеет самые низкие температуры плавления и кипения во Вселенной.',
        },
      },
      {
        id: 2,
        elementSymbol: 'C',
        xPercent: 16.5,
        elementName: { pt: 'Carbono (C)', en: 'Carbon (C)', ru: 'Углерод (C)' },
        objectDescription: {
          pt: 'Placa de vidro com cristais negros de carbono amorfo/grafítico',
          en: 'Petri glass dish with black graphitic carbon crystals',
          ru: 'Стеклянная чашка Петри с черными кристаллами графита',
        },
        hint: {
          pt: 'Capaz de formar fulerenos, nanotubos e grafeno, materiais de ponta da nanotecnologia.',
          en: 'Forms fullerenes, nanotubes, and graphene for advanced nanotechnology.',
          ru: 'Образует фуллерены, нанотрубки и графен для нанотехнологий.',
        },
      },
      {
        id: 3,
        elementSymbol: 'N',
        xPercent: 25.8,
        elementName: { pt: 'Nitrogênio (N)', en: 'Nitrogen (N)', ru: 'Азот (N)' },
        objectDescription: {
          pt: 'Ampola de vidro com fumaça e névoa densa branca criogênica',
          en: 'Vertical glass ampoule producing cold white cryogenic vapor',
          ru: 'Вертикальная ампула с белым холодным криогенным паром',
        },
        hint: {
          pt: 'Gás incolor diatômico (N2) com tripla ligação que compõe quase 80% do ar.',
          en: 'Diatomic gas (N2) with a strong triple bond making up ~80% of air.',
          ru: 'Двухатомный газ (N2) с тройной связью, составляющий ~80% воздуха.',
        },
      },
      {
        id: 4,
        elementSymbol: 'Na',
        xPercent: 35.2,
        elementName: { pt: 'Sódio (Na)', en: 'Sodium (Na)', ru: 'Натрий (Na)' },
        objectDescription: {
          pt: 'Frasco com etiqueta "Sodium Sample" guardando metal sódio sob líquido inerte',
          en: 'Jar labeled "Sodium Sample" with sodium metal block in fluid',
          ru: 'Банка с надписью «Sodium Sample» с блоком натрия в масле',
        },
        hint: {
          pt: 'Elemento do grupo 1 cujo cátion Na+ é o principal eletrólito extracelular no corpo humano.',
          en: 'Group 1 element whose Na+ cation is the primary extracellular electrolyte in blood.',
          ru: 'Элемент 1-й группы, катион Na+ — главный внеклеточный электролит.',
        },
      },
      {
        id: 5,
        elementSymbol: 'P',
        xPercent: 44.6,
        elementName: { pt: 'Fósforo (P)', en: 'Phosphorus (P)', ru: 'Фосфор (P)' },
        objectDescription: {
          pt: 'Frascos rotulados "Phosphorus" com pó vermelho e bastões brancos',
          en: 'Bottles labeled "Phosphorus" with red powder and white sticks',
          ru: 'Флаконы с надписью «Phosphorus» с красным порошком и палочками',
        },
        hint: {
          pt: 'Existe nas formas de fósforo branco (altamente pirofórico) e fósforo vermelho estável.',
          en: 'Exists as pyrophoric white phosphorus and stable red phosphorus.',
          ru: 'Существует в виде белого (самовоспламеняющегося) и стабильного красного фосфора.',
        },
      },
      {
        id: 6,
        elementSymbol: 'Ti',
        xPercent: 54.0,
        elementName: { pt: 'Titânio (Ti)', en: 'Titanium (Ti)', ru: 'Титан (Ti)' },
        objectDescription: {
          pt: 'Engrenagem industrial helicoidal com coloração azul/violeta anodizada',
          en: 'High-tech helical gear with iridescent blue/purple heat anodization',
          ru: 'Шестерня из титана с сине-фиолетовой анодированной пленкой',
        },
        hint: {
          pt: 'Metal amplamente empregado em turbinas de aeronaves, próteses médicas e naves espaciais.',
          en: 'Used in aircraft turbine engines, medical prosthetic hips, and spacecraft.',
          ru: 'Используется в турбинах самолетов, медицинских протезах и космосе.',
        },
      },
      {
        id: 7,
        elementSymbol: 'Zn',
        xPercent: 63.5,
        elementName: { pt: 'Zinco (Zn)', en: 'Zinc (Zn)', ru: 'Цинк (Zn)' },
        objectDescription: {
          pt: 'Balde de chapa galvanizada contendo parafusos e porcas de zinco',
          en: 'Galvanized metal bucket filled with zinc-coated hardware',
          ru: 'Оцинкованное ведро с оцинкованными болтами и гайками',
        },
        hint: {
          pt: 'Age como "ânodo de sacrifício" para evitar a oxidação de estruturas marinhas e cascos de navios.',
          en: 'Acts as a sacrificial anode to prevent electrochemical rust on ships.',
          ru: 'Служит «жертвенным анодом» для защиты судов от ржавчины.',
        },
      },
      {
        id: 8,
        elementSymbol: 'Br',
        xPercent: 72.8,
        elementName: { pt: 'Bromo (Br)', en: 'Bromine (Br)', ru: 'Бром (Br)' },
        objectDescription: {
          pt: 'Frasco rotulado "Bromine" com líquido denso castanho-avermelhado',
          en: 'Amber vial labeled "Bromine" with dense red-brown liquid',
          ru: 'Флакон с надписью «Bromine» с красно-бурой жидкостью',
        },
        hint: {
          pt: 'O único elemento não-metálico que é líquido nas Condições Normais de Temperatura e Pressão.',
          en: 'The only non-metallic chemical element that is liquid at standard room conditions.',
          ru: 'Единственный неметаллический элемент, являющийся жидкостью при н.у.',
        },
      },
      {
        id: 9,
        elementSymbol: 'Ag',
        xPercent: 82.2,
        elementName: { pt: 'Prata (Ag)', en: 'Silver (Ag)', ru: 'Серебро (Ag)' },
        objectDescription: {
          pt: 'Prato de vidro com barra retangular fundida e anel de prata trabalhado',
          en: 'Glass dish with cast silver ingot and engraved silver ring',
          ru: 'Стеклянная чаша с серебряным слитком и кольцом',
        },
        hint: {
          pt: 'Elemento com a maior refletividade óptica na luz visível e no infravermelho.',
          en: 'Element with the highest optical reflectivity for visible and infrared light.',
          ru: 'Элемент с наивысшей оптической отражательной способностью.',
        },
      },
      {
        id: 10,
        elementSymbol: 'Pb',
        xPercent: 91.8,
        elementName: { pt: 'Chumbo (Pb)', en: 'Lead (Pb)', ru: 'Свинец (Pb)' },
        objectDescription: {
          pt: 'Pesos de chumbo gravados com "10" e cano de chumbo espesso',
          en: 'Lead sinkers marked with "10" and thick grey lead pipe',
          ru: 'Свинцовые грузила с гравировкой «10» и свинцовая труба',
        },
        hint: {
          pt: 'Metal de baixo ponto de fusão (327°C) e alta densidade (11,34 g/cm³), usado em baterias automotivas.',
          en: 'Low melting point (327°C) and high density (11.34 g/cm³), key in car batteries.',
          ru: 'Низкая температура плавления и высокая плотность, основа автоаккумуляторов.',
        },
      },
    ],
  },
  {
    id: 5,
    imageSrc: '/images/quiz-table-periodica5.jpeg',
    title: {
      pt: 'Desafio Visual 5: Objetos do Cotidiano e Seus Elementos',
      en: 'Visual Challenge 5: Everyday Objects & Elements',
      ru: 'Визуальный вызов 5: Повседневные предметы и элементы',
    },
    subtitle: {
      pt: 'Descubra qual elemento químico dá vida a cada objeto do dia a dia sobre a mesa.',
      en: 'Discover which chemical element is the foundation of each everyday object.',
      ru: 'Узнайте, какой химический элемент лежит в основе каждого предмета на столе.',
    },
    targets: [
      {
        id: 1,
        elementSymbol: 'H',
        xPercent: 7.2,
        elementName: { pt: 'Hidrogênio (H)', en: 'Hydrogen (H)', ru: 'Водород (H)' },
        objectDescription: {
          pt: 'Balão vermelho marcado com a letra H',
          en: 'Red balloon marked with the letter H',
          ru: 'Красный воздушный шар с буквой H',
        },
        hint: {
          pt: 'O elemento mais leve e abundante em todo o cosmos, com apenas um próton e um elétron.',
          en: 'The lightest and most abundant element in the universe (Z = 1).',
          ru: 'Самый легкий и распространенный элемент во Вселенной (Z = 1).',
        },
      },
      {
        id: 2,
        elementSymbol: 'Li',
        xPercent: 16.5,
        elementName: { pt: 'Lítio (Li)', en: 'Lithium (Li)', ru: 'Литий (Li)' },
        objectDescription: {
          pt: 'Bateria recarregável moderna de íon de lítio com fios',
          en: 'Rechargeable lithium-ion cell battery with wires',
          ru: 'Литий-ионный аккумулятор для электроники с проводами',
        },
        hint: {
          pt: 'O metal sólido menos denso da tabela, essencial para smartphones e carros elétricos.',
          en: 'The least dense solid metal, powering modern mobile phones and EVs.',
          ru: 'Наименее плотный твердый металл, питающий смартфоны и электрокары.',
        },
      },
      {
        id: 3,
        elementSymbol: 'C',
        xPercent: 25.8,
        elementName: { pt: 'Carbono (C)', en: 'Carbon (C)', ru: 'Углерод (C)' },
        objectDescription: {
          pt: 'Cartão com desenho de lápis de grafite e diamante brilhante',
          en: 'Card illustration featuring a graphite pencil and cut diamond',
          ru: 'Карточка с рисунком графитового карандаша и бриллианта',
        },
        hint: {
          pt: 'Alótropos do mesmo elemento: o grafite macio do lápis e o diamante, o mineral natural mais duro.',
          en: 'Allotropes of the same element: soft pencil graphite and ultra-hard diamond.',
          ru: 'Аллотропы одного элемента: мягкий графит карандаша и сверхтвердый алмаз.',
        },
      },
      {
        id: 4,
        elementSymbol: 'O',
        xPercent: 35.2,
        elementName: { pt: 'Oxigênio (O)', en: 'Oxygen (O)', ru: 'Кислород (O)' },
        objectDescription: {
          pt: 'Frasco borbulhador de vidro de laboratório com água líquida pura (H2O)',
          en: 'Laboratory gas washing flask filled with bubbling water (H2O)',
          ru: 'Лабораторная склянка с барботером и чистой водой (H2O)',
        },
        hint: {
          pt: 'Gás comburente indispensável à respiração aeróbica e componente de 89% da massa da água.',
          en: 'Oxidizer gas indispensable for aerobic breathing and 89% of water by mass.',
          ru: 'Газ-окислитель для дыхания, составляющий 89% массы воды.',
        },
      },
      {
        id: 5,
        elementSymbol: 'Al',
        xPercent: 44.6,
        elementName: { pt: 'Alumínio (Al)', en: 'Aluminum (Al)', ru: 'Алюминий (Al)' },
        objectDescription: {
          pt: 'Rolo de papel laminado de alumínio e lata de refrigerante',
          en: 'Kitchen aluminum foil roll and empty aluminum soda can',
          ru: 'Рулон алюминиевой фольги и алюминиевая банка из-под напитка',
        },
        hint: {
          pt: 'Metal leve amplamente reciclado no Brasil, com excelente resistência à corrosão por anodização natural.',
          en: 'Lightweight, endlessly recyclable metal extracted from bauxite ore.',
          ru: 'Легкий, бесконечно перерабатываемый металл из бокситов.',
        },
      },
      {
        id: 6,
        elementSymbol: 'Ca',
        xPercent: 54.0,
        elementName: { pt: 'Cálcio (Ca)', en: 'Calcium (Ca)', ru: 'Кальций (Ca)' },
        objectDescription: {
          pt: 'Bastão de giz escolar e cascas de ovo trituradas (carbonato de cálcio)',
          en: 'Stick of school chalk and crushed eggshells (calcium carbonate)',
          ru: 'Кусочек школьного мела и измельченная яичная скорлупа (карбонат кальция)',
        },
        hint: {
          pt: 'Mineral que compõe a casca dos ovos (CaCO3) e confere rigidez mecânica aos ossos e dentes.',
          en: 'Mineral forming eggshells (CaCO3) and structural bones in vertebrates.',
          ru: 'Минерал яичной скорлупы (CaCO3) и твердости костей и зубов.',
        },
      },
      {
        id: 7,
        elementSymbol: 'Fe',
        xPercent: 63.5,
        elementName: { pt: 'Ferro (Fe)', en: 'Iron (Fe)', ru: 'Железо (Fe)' },
        objectDescription: {
          pt: 'Prego de ferro oxidado e rocha natural de minério de magnetita',
          en: 'Large rusted iron construction nail and magnetic iron lodestone',
          ru: 'Ржавый железный гвоздь и кусок природного магнитного железняка',
        },
        hint: {
          pt: 'Metal mais utilizado no planeta para vigas estruturais, automóveis e navios.',
          en: 'The most heavily used industrial structural metal on Earth.',
          ru: 'Самый используемый конструкционный металл на планете.',
        },
      },
      {
        id: 8,
        elementSymbol: 'Cu',
        xPercent: 72.8,
        elementName: { pt: 'Cobre (Cu)', en: 'Copper (Cu)', ru: 'Медь (Cu)' },
        objectDescription: {
          pt: 'Carretel de fiação de cobre e moedas de centavos de cobre',
          en: 'Spool of polished copper wire and copper penny coins',
          ru: 'Катушка медной проволоки и медные монеты',
        },
        hint: {
          pt: 'Metal nobre avermelhado, essencial na condução elétrica e em ligas como latão e bronze.',
          en: 'Reddish metal key in electrical conductivity and alloys like brass & bronze.',
          ru: 'Красноватый металл для электропроводки и сплавов латуни и бронзы.',
        },
      },
      {
        id: 9,
        elementSymbol: 'Ag',
        xPercent: 82.2,
        elementName: { pt: 'Prata (Ag)', en: 'Silver (Ag)', ru: 'Серебро (Ag)' },
        objectDescription: {
          pt: 'Colher clássica de prata esterlina e anel ornamentado de prata',
          en: 'Antique sterling silver spoon and patterned silver jewelry ring',
          ru: 'Старинная ложка из стерлингового серебра и серебряное кольцо',
        },
        hint: {
          pt: 'Metal nobre apreciado desde a antiguidade para faqueiros nobres e adereços reluzentes.',
          en: 'Precious metal treasured for fine tableware, cutlery, and jewelry.',
          ru: 'Благородный металл для столовых приборов и ювелирных украшений.',
        },
      },
      {
        id: 10,
        elementSymbol: 'Au',
        xPercent: 91.8,
        elementName: { pt: 'Ouro (Au)', en: 'Gold (Au)', ru: 'Золото (Au)' },
        objectDescription: {
          pt: 'Pepita de ouro nativo e moeda de ouro com a inscrição "Au"',
          en: 'Raw native gold nugget and minted gold bullion coin with "Au"',
          ru: 'Самородок природного золота и золотая инвестиционная монета «Au»',
        },
        hint: {
          pt: 'O mais maleável dos metais; um único grama pode ser esticado em um fio de mais de 2 km.',
          en: 'The most malleable metal; 1 gram can be beaten into a 1 m² sheet or 2 km wire.',
          ru: 'Самый ковкий металл: 1 грамм можно вытянуть в нить длиной более 2 км.',
        },
      },
    ],
  },
];
