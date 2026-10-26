export interface ElementI18n {
  name: {
    pt: string;
    en: string;
    ru: string;
  };
  wikiSlug: {
    pt: string;
    en: string;
    ru: string;
  };
  desc?: {
    pt: string;
    en: string;
    ru: string;
  };
}

export const ELEMENT_NAMES_I18N: Record<number, ElementI18n> = {
  1: {
    name: { pt: 'Hidrogênio', en: 'Hydrogen', ru: 'Водород' },
    wikiSlug: { pt: 'Hidrogênio', en: 'Hydrogen', ru: 'Водород' },
  },
  2: {
    name: { pt: 'Hélio', en: 'Helium', ru: 'Гелий' },
    wikiSlug: { pt: 'Hélio', en: 'Helium', ru: 'Гелий' },
  },
  3: {
    name: { pt: 'Lítio', en: 'Lithium', ru: 'Литий' },
    wikiSlug: { pt: 'Lítio', en: 'Lithium', ru: 'Литий' },
  },
  4: {
    name: { pt: 'Berílio', en: 'Beryllium', ru: 'Бериллий' },
    wikiSlug: { pt: 'Berílio', en: 'Beryllium', ru: 'Бериллий' },
  },
  5: {
    name: { pt: 'Boro', en: 'Boron', ru: 'Бор_(элемент)' },
    wikiSlug: { pt: 'Boro', en: 'Boron', ru: 'Бор_(элемент)' },
  },
  6: {
    name: { pt: 'Carbono', en: 'Carbon', ru: 'Углерод' },
    wikiSlug: { pt: 'Carbono', en: 'Carbon', ru: 'Углерод' },
  },
  7: {
    name: { pt: 'Nitrogênio', en: 'Nitrogen', ru: 'Азот' },
    wikiSlug: { pt: 'Nitrogênio', en: 'Nitrogen', ru: 'Азот' },
  },
  8: {
    name: { pt: 'Oxigênio', en: 'Oxygen', ru: 'Кислород' },
    wikiSlug: { pt: 'Oxigênio', en: 'Oxygen', ru: 'Кислород' },
  },
  9: {
    name: { pt: 'Flúor', en: 'Fluorine', ru: 'Фтор' },
    wikiSlug: { pt: 'Flúor', en: 'Fluorine', ru: 'Фтор' },
  },
  10: {
    name: { pt: 'Neônio', en: 'Neon', ru: 'Неон' },
    wikiSlug: { pt: 'Neônio', en: 'Neon', ru: 'Неон' },
  },
  11: {
    name: { pt: 'Sódio', en: 'Sodium', ru: 'Натрий' },
    wikiSlug: { pt: 'Sódio', en: 'Sodium', ru: 'Натрий' },
  },
  12: {
    name: { pt: 'Magnésio', en: 'Magnesium', ru: 'Магний' },
    wikiSlug: { pt: 'Magnésio', en: 'Magnesium', ru: 'Магний' },
  },
  13: {
    name: { pt: 'Alumínio', en: 'Aluminium', ru: 'Алюминий' },
    wikiSlug: { pt: 'Alumínio', en: 'Aluminium', ru: 'Алюминий' },
  },
  14: {
    name: { pt: 'Silício', en: 'Silicon', ru: 'Кремний' },
    wikiSlug: { pt: 'Silício', en: 'Silicon', ru: 'Кремний' },
  },
  15: {
    name: { pt: 'Fósforo', en: 'Phosphorus', ru: 'Фосфор' },
    wikiSlug: { pt: 'Fósforo', en: 'Phosphorus', ru: 'Фосфор' },
  },
  16: {
    name: { pt: 'Enxofre', en: 'Sulfur', ru: 'Сера' },
    wikiSlug: { pt: 'Enxofre', en: 'Sulfur', ru: 'Сера' },
  },
  17: {
    name: { pt: 'Cloro', en: 'Chlorine', ru: 'Хлор' },
    wikiSlug: { pt: 'Cloro', en: 'Chlorine', ru: 'Хлор' },
  },
  18: {
    name: { pt: 'Argônio', en: 'Argon', ru: 'Аргон' },
    wikiSlug: { pt: 'Argônio', en: 'Argon', ru: 'Аргон' },
  },
  19: {
    name: { pt: 'Potássio', en: 'Potassium', ru: 'Калий' },
    wikiSlug: { pt: 'Potássio', en: 'Potassium', ru: 'Калий' },
  },
  20: {
    name: { pt: 'Cálcio', en: 'Calcium', ru: 'Кальций' },
    wikiSlug: { pt: 'Cálcio', en: 'Calcium', ru: 'Кальций' },
  },
  21: {
    name: { pt: 'Escândio', en: 'Scandium', ru: 'Скандий' },
    wikiSlug: { pt: 'Escândio', en: 'Scandium', ru: 'Скандий' },
  },
  22: {
    name: { pt: 'Titânio', en: 'Titanium', ru: 'Титан_(элемент)' },
    wikiSlug: { pt: 'Titânio', en: 'Titanium', ru: 'Титан_(элемент)' },
  },
  23: {
    name: { pt: 'Vanádio', en: 'Vanadium', ru: 'Ванадий' },
    wikiSlug: { pt: 'Vanádio', en: 'Vanadium', ru: 'Ванадий' },
  },
  24: {
    name: { pt: 'Cromo', en: 'Chromium', ru: 'Хром' },
    wikiSlug: { pt: 'Cromo', en: 'Chromium', ru: 'Хром' },
  },
  25: {
    name: { pt: 'Manganês', en: 'Manganese', ru: 'Марганец' },
    wikiSlug: { pt: 'Manganês', en: 'Manganese', ru: 'Марганец' },
  },
  26: {
    name: { pt: 'Ferro', en: 'Iron', ru: 'Железо' },
    wikiSlug: { pt: 'Ferro', en: 'Iron', ru: 'Железо' },
  },
  27: {
    name: { pt: 'Cobalto', en: 'Cobalt', ru: 'Кобальт' },
    wikiSlug: { pt: 'Cobalto', en: 'Cobalt', ru: 'Кобальт' },
  },
  28: {
    name: { pt: 'Níquel', en: 'Nickel', ru: 'Никель' },
    wikiSlug: { pt: 'Níquel', en: 'Nickel', ru: 'Никель' },
  },
  29: {
    name: { pt: 'Cobre', en: 'Copper', ru: 'Медь' },
    wikiSlug: { pt: 'Cobre', en: 'Copper', ru: 'Медь' },
  },
  30: {
    name: { pt: 'Zinco', en: 'Zinc', ru: 'Цинк' },
    wikiSlug: { pt: 'Zinco', en: 'Zinc', ru: 'Цинк' },
  },
  31: {
    name: { pt: 'Gálio', en: 'Gallium', ru: 'Галлий' },
    wikiSlug: { pt: 'Gálio', en: 'Gallium', ru: 'Галлий' },
  },
  32: {
    name: { pt: 'Germânio', en: 'Germanium', ru: 'Германий' },
    wikiSlug: { pt: 'Germânio', en: 'Germanium', ru: 'Германий' },
  },
  33: {
    name: { pt: 'Arsênio', en: 'Arsenic', ru: 'Мышьяк' },
    wikiSlug: { pt: 'Arsênio', en: 'Arsenic', ru: 'Мышьяк' },
  },
  34: {
    name: { pt: 'Selênio', en: 'Selenium', ru: 'Селен' },
    wikiSlug: { pt: 'Selênio', en: 'Selenium', ru: 'Селен' },
  },
  35: {
    name: { pt: 'Bromo', en: 'Bromine', ru: 'Бром' },
    wikiSlug: { pt: 'Bromo', en: 'Bromine', ru: 'Бром' },
  },
  36: {
    name: { pt: 'Criptônio', en: 'Krypton', ru: 'Криптон' },
    wikiSlug: { pt: 'Crípton', en: 'Krypton', ru: 'Криптон' },
  },
  37: {
    name: { pt: 'Rubídio', en: 'Rubidium', ru: 'Рубидий' },
    wikiSlug: { pt: 'Rubídio', en: 'Rubidium', ru: 'Рубидий' },
  },
  38: {
    name: { pt: 'Estrôncio', en: 'Strontium', ru: 'Стронций' },
    wikiSlug: { pt: 'Estrôncio', en: 'Strontium', ru: 'Стронций' },
  },
  39: {
    name: { pt: 'Ítrio', en: 'Yttrium', ru: 'Иттрий' },
    wikiSlug: { pt: 'Ítrio', en: 'Yttrium', ru: 'Иттрий' },
  },
  40: {
    name: { pt: 'Zircônio', en: 'Zirconium', ru: 'Цирконий' },
    wikiSlug: { pt: 'Zircônio', en: 'Zirconium', ru: 'Цирконий' },
  },
  41: {
    name: { pt: 'Nióbio', en: 'Niobium', ru: 'Ниобий' },
    wikiSlug: { pt: 'Nióbio', en: 'Niobium', ru: 'Ниобий' },
  },
  42: {
    name: { pt: 'Molibdênio', en: 'Molybdenum', ru: 'Молибден' },
    wikiSlug: { pt: 'Molibdênio', en: 'Molybdenum', ru: 'Молибден' },
  },
  43: {
    name: { pt: 'Tecnécio', en: 'Technetium', ru: 'Технеций' },
    wikiSlug: { pt: 'Tecnécio', en: 'Technetium', ru: 'Технеций' },
  },
  44: {
    name: { pt: 'Rutênio', en: 'Ruthenium', ru: 'Рутений' },
    wikiSlug: { pt: 'Rutênio', en: 'Ruthenium', ru: 'Рутений' },
  },
  45: {
    name: { pt: 'Ródio', en: 'Rhodium', ru: 'Родий' },
    wikiSlug: { pt: 'Ródio', en: 'Rhodium', ru: 'Родий' },
  },
  46: {
    name: { pt: 'Paládio', en: 'Palladium', ru: 'Палладий' },
    wikiSlug: { pt: 'Paládio', en: 'Palladium', ru: 'Палладий' },
  },
  47: {
    name: { pt: 'Prata', en: 'Silver', ru: 'Серебро' },
    wikiSlug: { pt: 'Prata', en: 'Silver', ru: 'Серебро' },
  },
  48: {
    name: { pt: 'Cádmio', en: 'Cadmium', ru: 'Кадмий' },
    wikiSlug: { pt: 'Cádmio', en: 'Cadmium', ru: 'Кадмий' },
  },
  49: {
    name: { pt: 'Índio', en: 'Indium', ru: 'Индий' },
    wikiSlug: { pt: 'Índio_(elemento_químico)', en: 'Indium', ru: 'Индий' },
  },
  50: {
    name: { pt: 'Estanho', en: 'Tin', ru: 'Олово' },
    wikiSlug: { pt: 'Estanho', en: 'Tin', ru: 'Олово' },
  },
  51: {
    name: { pt: 'Antimônio', en: 'Antimony', ru: 'Сурьма' },
    wikiSlug: { pt: 'Antimônio', en: 'Antimony', ru: 'Сурьма' },
  },
  52: {
    name: { pt: 'Telúrio', en: 'Tellurium', ru: 'Теллур' },
    wikiSlug: { pt: 'Telúrio', en: 'Tellurium', ru: 'Теллур' },
  },
  53: {
    name: { pt: 'Iodo', en: 'Iodine', ru: 'Иод' },
    wikiSlug: { pt: 'Iodo', en: 'Iodine', ru: 'Иод' },
  },
  54: {
    name: { pt: 'Xenônio', en: 'Xenon', ru: 'Ксенон' },
    wikiSlug: { pt: 'Xenônio', en: 'Xenon', ru: 'Ксенон' },
  },
  55: {
    name: { pt: 'Césio', en: 'Caesium', ru: 'Цезий' },
    wikiSlug: { pt: 'Césio', en: 'Caesium', ru: 'Цезий' },
  },
  56: {
    name: { pt: 'Bário', en: 'Barium', ru: 'Барий' },
    wikiSlug: { pt: 'Bário', en: 'Barium', ru: 'Барий' },
  },
  57: {
    name: { pt: 'Lantânio', en: 'Lanthanum', ru: 'Лантан' },
    wikiSlug: { pt: 'Lantânio', en: 'Lanthanum', ru: 'Лантан' },
  },
  58: {
    name: { pt: 'Cério', en: 'Cerium', ru: 'Церий' },
    wikiSlug: { pt: 'Cério', en: 'Cerium', ru: 'Церий' },
  },
  59: {
    name: { pt: 'Praseodímio', en: 'Praseodymium', ru: 'Празеодим' },
    wikiSlug: { pt: 'Praseodímio', en: 'Praseodymium', ru: 'Празеодим' },
  },
  60: {
    name: { pt: 'Neodímio', en: 'Neodymium', ru: 'Неодим' },
    wikiSlug: { pt: 'Neodímio', en: 'Neodymium', ru: 'Неодим' },
  },
  61: {
    name: { pt: 'Promécio', en: 'Promethium', ru: 'Прометий' },
    wikiSlug: { pt: 'Promécio', en: 'Promethium', ru: 'Прометий' },
  },
  62: {
    name: { pt: 'Samário', en: 'Samarium', ru: 'Самарий' },
    wikiSlug: { pt: 'Samário', en: 'Samarium', ru: 'Самарий' },
  },
  63: {
    name: { pt: 'Európio', en: 'Europium', ru: 'Европий' },
    wikiSlug: { pt: 'Európio', en: 'Europium', ru: 'Европий' },
  },
  64: {
    name: { pt: 'Gadolínio', en: 'Gadolinium', ru: 'Гадолиний' },
    wikiSlug: { pt: 'Gadolínio', en: 'Gadolinium', ru: 'Гадолиний' },
  },
  65: {
    name: { pt: 'Térbio', en: 'Terbium', ru: 'Тербий' },
    wikiSlug: { pt: 'Térbio', en: 'Terbium', ru: 'Тербий' },
  },
  66: {
    name: { pt: 'Disprósio', en: 'Dysprosium', ru: 'Диспрозий' },
    wikiSlug: { pt: 'Disprósio', en: 'Dysprosium', ru: 'Диспрозий' },
  },
  67: {
    name: { pt: 'Hólmio', en: 'Holmium', ru: 'Гольмий' },
    wikiSlug: { pt: 'Hólmio', en: 'Holmium', ru: 'Гольмий' },
  },
  68: {
    name: { pt: 'Érbio', en: 'Erbium', ru: 'Эрбий' },
    wikiSlug: { pt: 'Érbio', en: 'Erbium', ru: 'Эрбий' },
  },
  69: {
    name: { pt: 'Túlio', en: 'Thulium', ru: 'Тулий' },
    wikiSlug: { pt: 'Túlio', en: 'Thulium', ru: 'Тулий' },
  },
  70: {
    name: { pt: 'Itérbio', en: 'Ytterbium', ru: 'Иттербий' },
    wikiSlug: { pt: 'Itérbio', en: 'Ytterbium', ru: 'Иттербий' },
  },
  71: {
    name: { pt: 'Lutécio', en: 'Lutetium', ru: 'Лютеций' },
    wikiSlug: { pt: 'Lutécio', en: 'Lutetium', ru: 'Лютеций' },
  },
  72: {
    name: { pt: 'Háfnio', en: 'Hafnium', ru: 'Гафний' },
    wikiSlug: { pt: 'Háfnio', en: 'Hafnium', ru: 'Гафний' },
  },
  73: {
    name: { pt: 'Tântalo', en: 'Tantalum', ru: 'Тантал_(элемент)' },
    wikiSlug: { pt: 'Tântalo_(elemento_químico)', en: 'Tantalum', ru: 'Тантал_(элемент)' },
  },
  74: {
    name: { pt: 'Tungstênio', en: 'Tungsten', ru: 'Вольфрам' },
    wikiSlug: { pt: 'Tungstênio', en: 'Tungsten', ru: 'Вольфрам' },
  },
  75: {
    name: { pt: 'Rênio', en: 'Rhenium', ru: 'Рений' },
    wikiSlug: { pt: 'Rênio', en: 'Rhenium', ru: 'Рений' },
  },
  76: {
    name: { pt: 'Ósmio', en: 'Osmium', ru: 'Осмий' },
    wikiSlug: { pt: 'Ósmio', en: 'Osmium', ru: 'Осмий' },
  },
  77: {
    name: { pt: 'Irídio', en: 'Iridium', ru: 'Иридий' },
    wikiSlug: { pt: 'Irídio', en: 'Iridium', ru: 'Иридий' },
  },
  78: {
    name: { pt: 'Platina', en: 'Platinum', ru: 'Платина' },
    wikiSlug: { pt: 'Platina', en: 'Platinum', ru: 'Платина' },
  },
  79: {
    name: { pt: 'Ouro', en: 'Gold', ru: 'Золото' },
    wikiSlug: { pt: 'Ouro', en: 'Gold', ru: 'Золото' },
  },
  80: {
    name: { pt: 'Mercúrio', en: 'Mercury', ru: 'Ртуть' },
    wikiSlug: { pt: 'Mercúrio_(elemento_químico)', en: 'Mercury_(element)', ru: 'Ртуть' },
  },
  81: {
    name: { pt: 'Tálio', en: 'Thallium', ru: 'Таллий' },
    wikiSlug: { pt: 'Tálio', en: 'Thallium', ru: 'Таллий' },
  },
  82: {
    name: { pt: 'Chumbo', en: 'Lead', ru: 'Свинец' },
    wikiSlug: { pt: 'Chumbo', en: 'Lead', ru: 'Свинец' },
  },
  83: {
    name: { pt: 'Bismuto', en: 'Bismuth', ru: 'Висмут' },
    wikiSlug: { pt: 'Bismuto', en: 'Bismuth', ru: 'Висмут' },
  },
  84: {
    name: { pt: 'Polônio', en: 'Polonium', ru: 'Полоний' },
    wikiSlug: { pt: 'Polônio', en: 'Polonium', ru: 'Полоний' },
  },
  85: {
    name: { pt: 'Astato', en: 'Astatine', ru: 'Астат' },
    wikiSlug: { pt: 'Ástato', en: 'Astatine', ru: 'Астат' },
  },
  86: {
    name: { pt: 'Radônio', en: 'Radon', ru: 'Радон' },
    wikiSlug: { pt: 'Rádon', en: 'Radon', ru: 'Радон' },
  },
  87: {
    name: { pt: 'Frâncio', en: 'Francium', ru: 'Франций' },
    wikiSlug: { pt: 'Frâncio', en: 'Francium', ru: 'Франций' },
  },
  88: {
    name: { pt: 'Rádio', en: 'Radium', ru: 'Радий' },
    wikiSlug: { pt: 'Rádio_(elemento_químico)', en: 'Radium', ru: 'Радий' },
  },
  89: {
    name: { pt: 'Actínio', en: 'Actinium', ru: 'Актиний' },
    wikiSlug: { pt: 'Actínio', en: 'Actinium', ru: 'Актиний' },
  },
  90: {
    name: { pt: 'Tório', en: 'Thorium', ru: 'Торий' },
    wikiSlug: { pt: 'Tório', en: 'Thorium', ru: 'Торий' },
  },
  91: {
    name: { pt: 'Protactínio', en: 'Protactinium', ru: 'Протактиний' },
    wikiSlug: { pt: 'Protactínio', en: 'Protactinium', ru: 'Протактиний' },
  },
  92: {
    name: { pt: 'Urânio', en: 'Uranium', ru: 'Уран_(элемент)' },
    wikiSlug: { pt: 'Urânio', en: 'Uranium', ru: 'Уран_(элемент)' },
  },
  93: {
    name: { pt: 'Netúnio', en: 'Neptunium', ru: 'Нептуний' },
    wikiSlug: { pt: 'Neptúnio', en: 'Neptunium', ru: 'Нептуний' },
  },
  94: {
    name: { pt: 'Plutônio', en: 'Plutonium', ru: 'Плутоний' },
    wikiSlug: { pt: 'Plutônio', en: 'Plutonium', ru: 'Плутоний' },
  },
  95: {
    name: { pt: 'Amerício', en: 'Americium', ru: 'Америций' },
    wikiSlug: { pt: 'Amerício', en: 'Americium', ru: 'Америций' },
  },
  96: {
    name: { pt: 'Cúrio', en: 'Curium', ru: 'Кюрий' },
    wikiSlug: { pt: 'Cúrio_(elemento_químico)', en: 'Curium', ru: 'Кюрий' },
  },
  97: {
    name: { pt: 'Berquélio', en: 'Berkelium', ru: 'Берклий' },
    wikiSlug: { pt: 'Berquélio', en: 'Berkelium', ru: 'Берклий' },
  },
  98: {
    name: { pt: 'Califórnio', en: 'Californium', ru: 'Калифорний' },
    wikiSlug: { pt: 'Califórnio', en: 'Californium', ru: 'Калифорний' },
  },
  99: {
    name: { pt: 'Einstênio', en: 'Einsteinium', ru: 'Эйнштейний' },
    wikiSlug: { pt: 'Einstênio', en: 'Einsteinium', ru: 'Эйнштейний' },
  },
  100: {
    name: { pt: 'Férmio', en: 'Fermium', ru: 'Фермий' },
    wikiSlug: { pt: 'Férmio', en: 'Fermium', ru: 'Фермий' },
  },
  101: {
    name: { pt: 'Mendelévio', en: 'Mendelevium', ru: 'Менделевий' },
    wikiSlug: { pt: 'Mendelévio', en: 'Mendelevium', ru: 'Менделевий' },
  },
  102: {
    name: { pt: 'Nobélio', en: 'Nobelium', ru: 'Нобелий' },
    wikiSlug: { pt: 'Nobélio', en: 'Nobelium', ru: 'Нобелий' },
  },
  103: {
    name: { pt: 'Laurêncio', en: 'Lawrencium', ru: 'Лоуренсий' },
    wikiSlug: { pt: 'Laurêncio', en: 'Lawrencium', ru: 'Лоуренсий' },
  },
  104: {
    name: { pt: 'Rutherfórdio', en: 'Rutherfordium', ru: 'Резерфордий' },
    wikiSlug: { pt: 'Rutherfórdio', en: 'Rutherfordium', ru: 'Резерфордий' },
  },
  105: {
    name: { pt: 'Dúbnio', en: 'Dubnium', ru: 'Дубний' },
    wikiSlug: { pt: 'Dúbnio', en: 'Dubnium', ru: 'Дубний' },
  },
  106: {
    name: { pt: 'Seabórgio', en: 'Seaborgium', ru: 'Сиборгий' },
    wikiSlug: { pt: 'Seabórgio', en: 'Seaborgium', ru: 'Сиборгий' },
  },
  107: {
    name: { pt: 'Bóhrio', en: 'Bohrium', ru: 'Борий' },
    wikiSlug: { pt: 'Bóhrio', en: 'Bohrium', ru: 'Борий' },
  },
  108: {
    name: { pt: 'Hássio', en: 'Hassium', ru: 'Хассий' },
    wikiSlug: { pt: 'Hássio', en: 'Hassium', ru: 'Хассий' },
  },
  109: {
    name: { pt: 'Meitnério', en: 'Meitnerium', ru: 'Мейтнерий' },
    wikiSlug: { pt: 'Meitnério', en: 'Meitnerium', ru: 'Мейтнерий' },
  },
  110: {
    name: { pt: 'Darmstádio', en: 'Darmstadtium', ru: 'Дармштадтий' },
    wikiSlug: { pt: 'Darmstádio', en: 'Darmstadtium', ru: 'Дармштадтий' },
  },
  111: {
    name: { pt: 'Roentgênio', en: 'Roentgenium', ru: 'Рентгений' },
    wikiSlug: { pt: 'Roentgênio', en: 'Roentgenium', ru: 'Рентгений' },
  },
  112: {
    name: { pt: 'Copernício', en: 'Copernicium', ru: 'Коперниций' },
    wikiSlug: { pt: 'Copernício', en: 'Copernicium', ru: 'Коперниций' },
  },
  113: {
    name: { pt: 'Nipônio', en: 'Nihonium', ru: 'Нихоний' },
    wikiSlug: { pt: 'Nipônio', en: 'Nihonium', ru: 'Нихоний' },
  },
  114: {
    name: { pt: 'Fleróvio', en: 'Flerovium', ru: 'Флеровий' },
    wikiSlug: { pt: 'Fleróvio', en: 'Flerovium', ru: 'Флеровий' },
  },
  115: {
    name: { pt: 'Moscóvio', en: 'Moscovium', ru: 'Московий' },
    wikiSlug: { pt: 'Moscóvio', en: 'Moscovium', ru: 'Московий' },
  },
  116: {
    name: { pt: 'Livermório', en: 'Livermorium', ru: 'Ливерморий' },
    wikiSlug: { pt: 'Livermório', en: 'Livermorium', ru: 'Ливерморий' },
  },
  117: {
    name: { pt: 'Tenessino', en: 'Tennessine', ru: 'Теннессин' },
    wikiSlug: { pt: 'Tenessino', en: 'Tennessine', ru: 'Теннессин' },
  },
  118: {
    name: { pt: 'Oganessônio', en: 'Oganesson', ru: 'Оганесон' },
    wikiSlug: { pt: 'Oganessônio', en: 'Oganesson', ru: 'Оганесон' },
  },
};
