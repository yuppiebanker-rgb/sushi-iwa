export interface MenuItem {
  id: string;
  name: string;
  badge: string;
  description: string;
  price: string;
  category: MenuCategory;
  image: string;
  isSignature?: boolean;
  isGlutenFree?: boolean;
  isChefPick?: boolean;
}

export type MenuCategory =
  | 'entradas' | 'sashimi' | 'curricanes' | 'nigiris'
  | 'temaki' | 'rollos-gf' | 'rollos-especiales'
  | 'platos' | 'postres';

export const MENU_ITEMS: MenuItem[] = [
  // ENTRADAS
  { id: 'camarones-roca', name: 'Camarones Roca', badge: 'Entrada', description: 'Camarones en salsa especial de la casa.', price: '$285', category: 'entradas', image: 'camarones-roca.jpg' },
  { id: 'sopa-miso', name: 'Sopa Miso', badge: 'Entrada', description: 'Miso tradicional japonés.', price: '$145', category: 'entradas', image: 'bar.jpg' },
  { id: 'tostada-atun', name: 'Tostada de Atún', badge: 'Entrada · 1pz', description: 'Tostada crujiente con atún fresco.', price: '$95', category: 'entradas', image: 'tostada-atun.jpg' },
  { id: 'crispy-rice', name: 'Crispy Rice Spicy Tuna', badge: 'Entrada · 4pz', description: 'Arroz crocante con atún spicy.', price: '$245', category: 'entradas', image: 'crispy-rice.jpg' },
  { id: 'edamames', name: 'Edamames', badge: 'Acompañamiento', description: 'Frijoles de soya al vapor.', price: '$125', category: 'entradas', image: 'edamames.jpg' },
  { id: 'seaweed-salad', name: 'Seaweed Salad', badge: 'Ensalada', description: 'Alga marina fresca con aderezo japonés.', price: '$160', category: 'entradas', image: 'sashimi-mix.jpg' },

  // SASHIMI
  { id: 'sashimi-atun', name: 'Atún', badge: 'Sashimi', description: 'Maguro fresco.', price: '$240', category: 'sashimi', image: 'sashimi-atun.jpg' },
  { id: 'sashimi-salmon', name: 'Salmón', badge: 'Sashimi', description: 'Salmón canadiense de primera calidad.', price: '$265', category: 'sashimi', image: 'nigiri-salmon.jpg' },
  { id: 'sashimi-hamachi', name: 'Hamachi', badge: 'Sashimi', description: 'Yellowtail fresco.', price: '$325', category: 'sashimi', image: 'nigiri-maguro.jpg' },
  { id: 'sashimi-mixto', name: 'Mixto', badge: 'Sashimi', description: 'Selección del día: atún, salmón, hamachi.', price: '$330', category: 'sashimi', image: 'sashimi-mix.jpg' },
  { id: 'hamachi-jalap', name: 'Hamachi Jalapeño Sashimi', badge: 'Sashimi · Firma', description: 'Yellowtail con jalapeño. El más pedido.', price: '$325', category: 'sashimi', image: 'hamachi-jalap.jpg', isSignature: true },
  { id: 'hamachi-curry', name: 'Hamachi Curry', badge: 'Sashimi', description: 'Yellowtail con toque de curry japonés.', price: '$325', category: 'sashimi', image: 'hamachi-jalap2.jpg' },
  { id: 'serrano-sashimi', name: 'Serrano Sashimi', badge: 'Sashimi', description: 'Corte fino sobre serrano. Picante y fresco.', price: '$275', category: 'sashimi', image: 'sashimi-salmon.jpg' },
  { id: 'iwa-salad', name: 'IWA Salad', badge: 'Ensalada', description: 'Lechuga + atún + hamachi + pepino + aderezo de la casa.', price: '$235', category: 'sashimi', image: 'nigiri-platter.jpg' },

  // CURRICANES
  { id: 'curricanes-atun', name: 'Curricanes de Atún', badge: 'Curricanes · Firma', description: 'Maguro en cucharas. Fresco, intenso, imprescindible.', price: '$310', category: 'curricanes', image: 'curricanes-spoons.jpg', isSignature: true },
  { id: 'curricanes-atun-media', name: 'Curricanes Atún · Media Orden', badge: 'Curricanes', description: 'Porción media.', price: '$170', category: 'curricanes', image: 'curricanes-spoons2.jpg' },
  { id: 'curricanes-salmon', name: 'Curricanes de Salmón', badge: 'Curricanes · Firma', description: 'Salmón canadiense en cucharas. El favorito.', price: '$325', category: 'curricanes', image: 'curricanes-salmon.jpg', isSignature: true },
  { id: 'curricanes-salmon-media', name: 'Curricanes Salmón · Media Orden', badge: 'Curricanes', description: 'Media porción de salmón.', price: '$180', category: 'curricanes', image: 'curricanes-salmon2.jpg' },
  { id: 'curricanes-mixtos', name: 'Curricanes Mixtos', badge: 'Curricanes', description: 'Atún y salmón juntos.', price: '$320', category: 'curricanes', image: 'curricanes-logo.jpg' },
  { id: 'curricanes-mixtos-media', name: 'Curricanes Mixtos · Media Orden', badge: 'Curricanes', description: 'Media porción mixta.', price: '$175', category: 'curricanes', image: 'curricanes-spoons.jpg' },

  // NIGIRIS
  { id: 'nigiri-maguro', name: 'Maguro', badge: 'Nigiri · 1pz', description: 'Atún rojo.', price: '$75', category: 'nigiris', image: 'nigiri-selection.jpg' },
  { id: 'nigiri-hamachi', name: 'Hamachi', badge: 'Nigiri · 1pz', description: 'Yellowtail.', price: '$105', category: 'nigiris', image: 'nigiri-maguro.jpg' },
  { id: 'nigiri-salmon', name: 'Salmón (Canadá)', badge: 'Nigiri · 1pz', description: 'Salmón premium.', price: '$85', category: 'nigiris', image: 'nigiri-platter.jpg' },
  { id: 'nigiri-kanikama', name: 'Kanikama', badge: 'Nigiri · 1pz', description: 'Cangrejo.', price: '$78', category: 'nigiris', image: 'nigiri-mixed.jpg' },
  { id: 'nigiri-ikura', name: 'Ikura', badge: 'Nigiri · 1pz', description: 'Hueva de salmón.', price: '$125', category: 'nigiris', image: 'nigiri-selection.jpg' },
  { id: 'nigiri-unagui', name: 'Unagui (Anguila)', badge: 'Nigiri · 1pz', description: 'Anguila glaseada.', price: '$87', category: 'nigiris', image: 'unagui-roll.jpg' },
  { id: 'nigiri-salmon-curry', name: 'Salmón Curry', badge: 'Nigiri · 1pz', description: 'Salmón con curry.', price: '$85', category: 'nigiris', image: 'nigiri-salmon.jpg' },
  { id: 'nigiri-gunkan', name: 'Gunkan', badge: 'Nigiri · 1pz', description: 'Selección del chef.', price: '$125', category: 'nigiris', image: 'nigiri-platter.jpg' },

  // TEMAKI
  { id: 'temaki-spicy-tuna', name: 'Spicy Tuna', badge: 'Temaki', description: 'Atún spicy en cono de nori crujiente.', price: '$190', category: 'temaki', image: 'temaki-spicy.jpg' },
  { id: 'temaki-spicy-salmon', name: 'Spicy Salmon', badge: 'Temaki', description: 'Salmón spicy.', price: '$225', category: 'temaki', image: 'temaki-hold.jpg' },
  { id: 'temaki-spicy-hamachi', name: 'Spicy Hamachi', badge: 'Temaki', description: 'Yellowtail spicy.', price: '$245', category: 'temaki', image: 'temaki-sauce.jpg' },
  { id: 'temaki-unagui', name: 'Unagui (Anguila)', badge: 'Temaki', description: 'Anguila ahumada con salsa de anguila.', price: '$230', category: 'temaki', image: 'temaki-chef.jpg' },
  { id: 'temaki-baked-crab', name: 'Baked Crab Hand Roll', badge: 'Temaki', description: 'Cangrejo horneado en cono.', price: '$255', category: 'temaki', image: 'baked-crab.jpg' },
  { id: 'temaki-spicy-callo', name: 'Spicy Callo', badge: 'Temaki', description: 'Callo de hacha spicy.', price: '$245', category: 'temaki', image: 'crispy-rice.jpg' },

  // ROLLOS GF
  { id: 'iwa-roll', name: 'IWA Roll', badge: 'GF · Firma', description: 'Callo de hacha + aguacate + pasta de cangrejo, envuelto en lajas de atún.', price: '$310', category: 'rollos-gf', image: 'iwa-roll.jpg', isSignature: true, isGlutenFree: true },
  { id: 'fermedinas-roll', name: "Fermedina's Roll", badge: "GF · Chef's Pick", description: 'Spicy kanikama + atún + salmón + hamachi + aguacate, envuelto en pepino.', price: '$310', category: 'rollos-gf', image: 'fermedina.jpg', isGlutenFree: true, isChefPick: true },
  { id: 'no-name-roll', name: 'No Name Roll', badge: 'GF · Legendario', description: 'Aguacate + pepino + pasta de cangrejo, envuelto de salmón con topping de salmón spicy.', price: '$385', category: 'rollos-gf', image: 'no-name.jpg', isGlutenFree: true },
  { id: 'diegos-roll', name: "Diego's Roll", badge: 'GF · Especial', description: 'Aguacate + pasta de cangrejo + topping de spicy de calamar.', price: '$325', category: 'rollos-gf', image: 'diegos-roll.jpg', isGlutenFree: true },

  // ROLLOS ESPECIALES
  { id: 'spicy-atun', name: 'Spicy Roll · Atún', badge: 'Roll Especial', description: 'Atún spicy.', price: '$230', category: 'rollos-especiales', image: 'spicy-atun.jpg' },
  { id: 'spicy-salmon', name: 'Spicy Roll · Salmón', badge: 'Roll Especial', description: 'Salmón spicy.', price: '$245', category: 'rollos-especiales', image: 'spicy-salmon.jpg' },
  { id: 'spicy-hamachi', name: 'Spicy Roll · Hamachi', badge: 'Roll Especial', description: 'Yellowtail spicy.', price: '$280', category: 'rollos-especiales', image: 'spicy-hamachi.jpg' },
  { id: 'spicy-kanikama', name: 'Spicy Roll · Kanikama', badge: 'Roll Especial', description: 'Cangrejo spicy.', price: '$230', category: 'rollos-especiales', image: 'spicy-kanikama.jpg' },
  { id: 'spicy-callo', name: 'Spicy Roll · Callo de Hacha', badge: 'Roll Especial', description: 'Callo de hacha spicy.', price: '$270', category: 'rollos-especiales', image: 'spicy-callo.jpg' },
  { id: 'chef-roll', name: 'Chef Roll', badge: 'Roll Especial', description: 'Papel de soya + ebi tempura + cangrejo + atún + salmón + aguacate en salsa cilantro.', price: '$290', category: 'rollos-especiales', image: 'chef-roll.jpg' },
  { id: 'tropical-roll', name: 'Tropical Roll', badge: 'Roll Especial', description: 'Mango por fuera + ebi tempura + cangrejo + queso crema + aguacate + serrano + salsa de anguila.', price: '$245', category: 'rollos-especiales', image: 'tropical-roll.jpg' },
  { id: 'mashi-roll', name: 'Mashi Roll', badge: 'Roll Especial', description: 'Pasta de cangrejo y aguacate por dentro. Lajas de salmón flameado con spicy mayo + crunchy.', price: '$295', category: 'rollos-especiales', image: 'mashi-roll.jpg' },
  { id: 'taisa-roll', name: 'Taisa Roll', badge: "Roll · Chef's Pick", description: 'Calamar crujiente por dentro con topping de callo de hacha.', price: '$310', category: 'rollos-especiales', image: 'taisa-roll.jpg', isChefPick: true },
  { id: 'hamachi-roll', name: 'Hamachi Roll', badge: 'Roll Especial', description: 'Pasta de cangrejo + aguacate por dentro. Topping de lajas de hamachi con chile jalapeño.', price: '$310', category: 'rollos-especiales', image: 'hamachi-roll.jpg' },
  { id: 'rainbow-roll', name: 'Rainbow Roll', badge: 'Roll Especial', description: 'Camarón + aguacate + queso crema + cangrejo y pepino, cubierto con atún + aguacate + robalo y salmón.', price: '$275', category: 'rollos-especiales', image: 'rainbow-roll.jpg' },
  { id: 'unagui-roll', name: 'Unagui Roll', badge: 'Roll Especial', description: 'Aguacate + anguila ahumada + salsa de anguila.', price: '$295', category: 'rollos-especiales', image: 'unagui-roll.jpg' },
  { id: 'alcaparra-roll', name: 'Alcaparra Roll', badge: 'Roll Especial', description: 'Spicy de cangrejo y camarón tempura dentro, por arriba hamachi y alcaparra con limón amarilla.', price: '$295', category: 'rollos-especiales', image: 'alcaparra-roll.jpg' },
  { id: 'roca-roll', name: 'Roca Roll', badge: 'Roll Especial', description: 'Aguacate + arroz + pasta de cangrejo envuelto de papel de soya. Topping laja de hamachi + camarón roca.', price: '$325', category: 'rollos-especiales', image: 'roca-roll.jpg' },
  { id: 'baked-crab-roll', name: 'Baked Crab Roll', badge: 'Roll Especial', description: 'Hoja de papel + arroz + kanikama + tobiko + spicy mayo.', price: '$315', category: 'rollos-especiales', image: 'baked-crab.jpg' },

  // PLATOS FUERTES
  { id: 'yakimeshi-res', name: 'Yakimeshi · Res', badge: 'Yakimeshi', description: 'Arroz frito estilo japonés con res.', price: '$235', category: 'platos', image: 'yakimeshi.jpg' },
  { id: 'yakimeshi-camaron', name: 'Yakimeshi · Camarón', badge: 'Yakimeshi', description: 'Arroz frito con camarón fresco.', price: '$235', category: 'platos', image: 'yakimeshi2.jpg' },
  { id: 'yakimeshi-pollo', name: 'Yakimeshi · Pollo', badge: 'Yakimeshi', description: 'Arroz frito con pollo.', price: '$235', category: 'platos', image: 'yakimeshi.jpg' },
  { id: 'yakimeshi-mixto', name: 'Yakimeshi · Mixto', badge: 'Yakimeshi', description: 'Res, camarón y pollo juntos.', price: '$235', category: 'platos', image: 'yakimeshi2.jpg' },
  { id: 'camarones-salsa', name: 'Camarones en Salsa Especial', badge: 'Plato Fuerte', description: 'Camarones con la salsa especial de la casa.', price: '$290', category: 'platos', image: 'camarones-roca.jpg' },
  { id: 'pollo-teriyaki', name: 'Pollo Teriyaki a la Plancha', badge: 'Plato Fuerte', description: 'Pollo a la plancha con salsa teriyaki.', price: '$265', category: 'platos', image: 'yakimeshi.jpg' },
  { id: 'filete-res', name: 'Filete de Res · Salsa Teriyaki', badge: 'Plato Fuerte', description: 'Corte de res a la plancha con salsa teriyaki.', price: '$325', category: 'platos', image: 'yakimeshi2.jpg' },
  { id: 'salmon-plancha', name: 'Salmón a la Plancha', badge: 'Plato Fuerte', description: 'Salmón fresco a la plancha.', price: '$315', category: 'platos', image: 'salmon-plancha.jpg' },

  // POSTRES
  { id: 'pastel-chocolate', name: 'Pastel de Chocolate con Toffee', badge: 'Postre', description: 'Chocolate intenso con caramelo suave.', price: '$145', category: 'postres', image: 'mochis2.jpg' },
  { id: 'cheesecake', name: 'Cheesecake de Gloria', badge: 'Postre', description: 'Cremoso y suave.', price: '$145', category: 'postres', image: 'mochis.jpg' },
  { id: 'mochis', name: 'Mochis', badge: 'Postre', description: 'Vainilla · Chocolate · Taro · Coco · Mango · Fresa', price: '$85', category: 'postres', image: 'mochis.jpg' },
];

export const CATEGORY_META: Record<MenuCategory, { label: string; jp: string; desc: string }> = {
  entradas:            { label: 'Entradas',            jp: '\u524D\u83DC',       desc: 'Para comenzar la experiencia' },
  sashimi:             { label: 'Sashimi',             jp: '\u523A\u8EAB',       desc: 'Pescado premium en su forma m\u00E1s pura' },
  curricanes:          { label: 'Curricanes',          jp: '\u304F\u308A\u304B\u306D', desc: 'La firma de IWA. Hay que probarlos.' },
  nigiris:             { label: 'Nigiris',             jp: '\u63E1\u308A',       desc: 'Por pieza (1pz). Arroz templado.' },
  temaki:              { label: 'Temaki \u00B7 Conos', jp: '\u624B\u5DFB\u304D', desc: 'Rollos en cono de nori, hechos al momento' },
  'rollos-gf':         { label: 'Rollos Gluten Free',  jp: '\u30B0\u30EB\u30C6\u30F3\u30D5\u30EA\u30FC', desc: 'Envueltos en pepino o papel de arroz' },
  'rollos-especiales': { label: 'Rollos Especiales',   jp: '\u7279\u88FD\u30ED\u30FC\u30EB', desc: 'La creatividad del chef en cada pieza' },
  platos:              { label: 'Platos Fuertes',      jp: '\u30E1\u30A4\u30F3', desc: 'Para los que quieren algo m\u00E1s sustancioso' },
  postres:             { label: 'Postres',             jp: '\u30C7\u30B6\u30FC\u30C8', desc: '' },
};
