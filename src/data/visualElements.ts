export interface VisualElementArtData {
  number: number;
  symbol: string;
  artist: string;
  rscUrl: string;
  imageUrl: string;
  symbolism: {
    pt: string;
    en: string;
    ru: string;
  };
}

export function getVisualElementData(number: number, symbol: string, nameEn: string): VisualElementArtData {
  const cleanName = nameEn.toLowerCase().replace(/[^a-z]/g, '');
  const rscUrl = `https://www.rsc.org/periodic-table/element/${number}/${cleanName}`;
  
  // Imagem de alta resolução oficial da Royal Society of Chemistry / Visual Elements
  const imageUrl = `https://www.rsc.org/periodic-table/content/Images/Elements/${symbol}_900.jpg`;

  return {
    number,
    symbol,
    artist: 'Murray Robertson',
    rscUrl,
    imageUrl,
    symbolism: {
      pt: `Gravura artística oficial criada por Murray Robertson para a Royal Society of Chemistry (RSC). A obra mescla gravuras clássicas, elementos astronômicos, simbologia alquímica e descobertas da ciência contemporânea representativas do elemento ${symbol}.`,
      en: `Official Visual Elements artwork created by artist Murray Robertson for the Royal Society of Chemistry (RSC). It blends alchemical imagery, astronomical symbols, and modern scientific discovery representing element ${symbol}.`,
      ru: `Официальное художественное изображение Visual Elements, созданное художником Мюрреем Робертсоном для Королевского химического общества (RSC). Сочетает алхимические мотивы, астрономию и современную науку о элементе ${symbol}.`,
    },
  };
}
