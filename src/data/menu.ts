export interface MenuItem {
  id: string;
  name: string;
  badge: string;
  desc: string;
  price: string;
  category: MenuCategory;
  image: string;
  isSignature?: boolean;
  isGlutenFree?: boolean;
  isChefPick?: boolean;
}

export type MenuCategory =
  | 'entradas' | 'sashimi' | 'curricanes' | 'nigiris'
  | 'temaki' | 'rollos-gf' | 'rollos-esp'
  | 'platos' | 'postres';

export const MENU_ITEMS: MenuItem[] = [
  // ── ENTRADAS ──
  { id: 'camarones-roca', name: 'Camarones Roca', badge: 'Entrada', desc: 'Camarones en salsa especial de la casa.', price: '$285', category: 'entradas', image: 'camarones-roca.jpg' },
  { id: 'sopa-miso', name: 'Sopa Miso', badge: 'Entrada', desc: 'Miso tradicional japonés.', price: '$145', category: 'entradas', image: 'bar.jpg' },
  { id: 'tostada-atun', name: 'Tostada de Atún', badge: 'Entrada · 1pz', desc: 'Tostada crujiente con atún fresco.', price: '$95', category: 'entradas', image: 'tostada-atun.jpg' },
  { id: 'crispy-rice', name: 'Crispy Rice Spicy Tuna', badge: 'Entrada · 4pz', desc: 'Arroz crocante con atún spicy.', price: '$245', category: 'entradas', image: 'crispy-rice.jpg' },
  { id: 'edamames', name: 'Edamames', badge: 'Acompañamiento', desc: 'Frijoles de soya al vapor. Frescos y ligeros.', price: '$125', category: 'entradas', image: 'edamames.jpg' },
  { id: 'seaweed-salad', name: 'Seaweed Salad', badge: 'Ensalada', desc: 'Alga marina fresca con aderezo japonés.', price: '$160', category: 'entradas', image: 'sashimi-mix.jpg' },

  // ── SASHIMI ──
  { id: 'sashimi-atun', name: 'Atún', badge: 'Sashimi', desc: 'Maguro fresco.', price: '$240', category: 'sashimi', image: 'sashimi-atun.jpg' },
  { id: 'sashimi-salmon', name: 'Salmón', badge: 'Sashimi', desc: 'Salmón canadiense de primera calidad.', price: '$265', category: 'sashimi', image: 'nigiri-salmon.jpg' },
  { id: 'sashimi-hamachi', name: 'Hamachi', badge: 'Sashimi', desc: 'Yellowtail fresco. Suave y delicado.', price: '$325', category: 'sashimi', image: 'nigiri-maguro.jpg' },
  { id: 'sashimi-mixto', name: 'Mixto', badge: 'Sashimi', desc: 'Selección del día: atún, salmón, hamachi.', price: '$330', category: 'sashimi', image: 'sashimi-mix.jpg' },
  { id: 'hamachi-jalap', name: 'Hamachi Jalapeño Sashimi', badge: 'Sashimi · Firma', desc: 'Yellowtail con jalapeño. El más pedido.', price: '$325', category: 'sashimi', image: 'hamachi-jalap.jpg', isSignature: true },
  { id: 'hamachi-curry', name: 'Hamachi Curry', badge: 'Sashimi', desc: 'Yellowtail con toque de curry japonés.', price: '$325', category: 'sashimi', image: 'hamachi-jalap2.jpg' },
  { id: 'serrano-sashimi', name: 'Serrano Sashimi', badge: 'Sashimi', desc: 'Corte fino sobre serrano. Picante y fresco.', price: '$275', category: 'sashimi', image: 'sashimi-salmon.jpg' },
  { id: 'iwa-salad', name: 'IWA Salad', badge: 'Ensalada', desc: 'Lechuga + atún + hamachi + pepino + aderezo de la casa.', price: '$235', category: 'sashimi', image: 'nigiri-platter.jpg' },

  // ── CURRICANES ──
  { id: 'curricanes-atun', name: 'Curricanes de Atún', badge: 'Curricanes · Firma', desc: 'Maguro en cucharas. Fresco, intenso, imprescindible.', price: '$310', category: 'curricanes', image: 'curricanes-spoons.jpg', isSignature: true },
  { id: 'curricanes-atun-media', name: 'Curricanes Atún · Media Orden', badge: 'Curricanes', desc: 'Porción media.', price: '$170', category: 'curricanes', image: 'curricanes-spoons2.jpg' },
  { id: 'curricanes-salmon', name: 'Curricanes de Salmón', badge: 'Curricanes · Firma', desc: 'Salmón canadiense en cucharas. El favorito.', price: '$325', category: 'curricanes', image: 'curricanes-salmon.jpg', isSignature: true },
  { id: 'curricanes-salmon-media', name: 'Curricanes Salmón · Media Orden', badge: 'Curricanes', desc: 'Media porción de salmón.', price: '$180', category: 'curricanes', image: 'curricanes-salmon2.jpg' },
  { id: 'curricanes-mixtos', name: 'Curricanes Mixtos', badge: 'Curricanes', desc: 'Atún y salmón juntos. La experiencia completa.', price: '$320', category: 'curricanes', image: 'curricanes-logo.jpg' },
  { id: 'curricanes-mixtos-media', name: 'Curricanes Mixtos · Media Orden', badge: 'Curricanes', desc: 'Media porción mixta.', price: '$175', category: 'curricanes', image: 'curricanes-spoons.jpg' },

  // ── NIGIRIS ──
  { id: 'nigiri-maguro', name: 'Maguro', badge: 'Nigiri · 1pz', desc: 'Atún rojo', price: '$75', category: 'nigiris', image: 'nigiri-selection.jpg' },
  { id: 'nigiri-hamachi', name: 'Hamachi', badge: 'Nigiri · 1pz', desc: 'Yellowtail', price: '$105', category: 'nigiris', image: 'nigiri-maguro.jpg' },
  { id: 'nigiri-salmon', name: 'Salmón (Canadá)', badge: 'Nigiri · 1pz', desc: 'Salmón premium', price: '$85', category: 'nigiris', image: 'nigiri-platter.jpg' },
  { id: 'nigiri-kanikama', name: 'Kanikama', badge: 'Nigiri · 1pz', desc: 'Cangrejo', price: '$78', category: 'nigiris', image: 'nigiri-mixed.jpg' },
  { id: 'nigiri-ikura', name: 'Ikura', badge: 'Nigiri · 1pz', desc: 'Hueva de salmón', price: '$125', category: 'nigiris', image: 'nigiri-selection.jpg' },
  { id: 'nigiri-unagui', name: 'Unagui (Anguila)', badge: 'Nigiri · 1pz', desc: 'Anguila glaseada', price: '$87', category: 'nigiris', image: 'unagui-roll.jpg' },
  { id: 'nigiri-salmon-curry', name: 'Salmón Curry', badge: 'Nigiri · 1pz', desc: 'Salmón con curry', price: '$85', category: 'nigiris', image: 'nigiri-salmon.jpg' },
  { id: 'nigiri-gunkan', name: 'Gunkan', badge: 'Nigiri · 1pz', desc: 'Selección del chef', price: '$125', category: 'nigiris', image: 'nigiri-platter.jpg' },

  // ── TEMAKI ──
  { id: 'temaki-spicy-tuna', name: 'Spicy Tuna', badge: 'Temaki', desc: 'Atún spicy en cono de nori crujiente.', price: '$190', category: 'temaki', image: 'temaki-spicy.jpg' },
  { id: 'temaki-spicy-salmon', name: 'Spicy Salmon', badge: 'Temaki', desc: 'Salmón spicy. Una de las más pedidas.', price: '$225', category: 'temaki', image: 'temaki-hold.jpg' },
  { id: 'temaki-spicy-hamachi', name: 'Spicy Hamachi', badge: 'Temaki', desc: 'Yellowtail spicy.', price: '$245', category: 'temaki', image: 'temaki-sauce.jpg' },
  { id: 'temaki-unagui', name: 'Unagui (Anguila)', badge: 'Temaki', desc: 'Anguila ahumada con salsa de anguila.', price: '$230', category: 'temaki', image: 'temaki-chef.jpg' },
  { id: 'temaki-baked-crab', name: 'Baked Crab Hand Roll', badge: 'Temaki', desc: 'Cangrejo horneado en cono.', price: '$255', category: 'temaki', image: 'baked-crab.jpg' },
  { id: 'temaki-spicy-callo', name: 'Spicy Callo', badge: 'Temaki', desc: 'Callo de hacha spicy. Elegante y delicado.', price: '$245', category: 'temaki', image: 'crispy-rice.jpg' },

  // ── ROLLOS GF ──
  { id: 'iwa-roll', name: 'IWA Roll', badge: 'GF · Firma', desc: 'Callo de hacha + aguacate + pasta de cangrejo, envuelto en lajas de atún.', price: '$310', category: 'rollos-gf', image: 'iwa-roll.jpg', isSignature: true, isGlutenFree: true },
  { id: 'fermedinas-roll', name: "Fermedina's Roll", badge: "GF · Chef's Pick", desc: 'Spicy kanikama + atún + salmón + hamachi + aguacate, envuelto en pepino.', price: '$310', category: 'rollos-gf', image: 'fermedina.jpg', isGlutenFree: true, isChefPick: true },
  { id: 'no-name-roll', name: 'No Name Roll', badge: 'GF · Legendario', desc: 'Aguacate + pepino + pasta de cangrejo, envuelto de salmón con topping de salmón spicy.', price: '$385', category: 'rollos-gf', image: 'no-name.jpg', isGlutenFree: true },
  { id: 'diegos-roll', name: "Diego's Roll", badge: 'GF · Especial', desc: 'Aguacate + pasta de cangrejo + topping de spicy de calamar.', price: '$325', category: 'rollos-gf', image: 'diegos-roll.jpg', isGlutenFree: true },

  // ── ROLLOS ESPECIALES ──
  { id: 'spicy-atun', name: 'Spicy Roll · Atún', badge: 'Roll Especial', desc: 'Atún spicy.', price: '$230', category: 'rollos-esp', image: 'spicy-atun.jpg' },
  { id: 'spicy-salmon', name: 'Spicy Roll · Salmón', badge: 'Roll Especial', desc: 'Salmón spicy.', price: '$245', category: 'rollos-esp', image: 'spicy-salmon.jpg' },
  { id: 'spicy-hamachi', name: 'Spicy Roll · Hamachi', badge: 'Roll Especial', desc: 'Yellowtail spicy.', price: '$280', category: 'rollos-esp', image: 'spicy-hamachi.jpg' },
  { id: 'spicy-kanikama', name: 'Spicy Roll · Kanikama', badge: 'Roll Especial', desc: 'Cangrejo spicy.', price: '$230', category: 'rollos-esp', image: 'spicy-kanikama.jpg' },
  { id: 'spicy-callo', name: 'Spicy Roll · Callo de Hacha', badge: 'Roll Especial', desc: 'Callo de hacha spicy.', price: '$270', category: 'rollos-esp', image: 'spicy-callo.jpg' },
  { id: 'chef-roll', name: 'Chef Roll', badge: 'Roll Especial', desc: 'Papel de soya + ebi tempura + cangrejo + atún + salmón + aguacate en salsa cilantro.', price: '$290', category: 'rollos-esp', image: 'chef-roll.jpg' },
  { id: 'tropical-roll', name: 'Tropical Roll', badge: 'Roll Especial', desc: 'Mango por fuera + ebi tempura + cangrejo + queso crema + aguacate + serrano + salsa de anguila.', price: '$245', category: 'rollos-esp', image: 'tropical-roll.jpg' },
  { id: 'mashi-roll', name: 'Mashi Roll', badge: 'Roll Especial', desc: 'Pasta de cangrejo y aguacate por dentro. Lajas de salmón flameado con spicy mayo + crunchy.', price: '$295', category: 'rollos-esp', image: 'mashi-roll.jpg' },
  { id: 'taisa-roll', name: 'Taisa Roll', badge: "Roll · Chef's Pick", desc: 'Calamar crujiente por dentro con topping de callo de hacha.', price: '$310', category: 'rollos-esp', image: 'taisa-roll.jpg', isChefPick: true },
  { id: 'hamachi-roll', name: 'Hamachi Roll', badge: 'Roll Especial', desc: 'Pasta de cangrejo + aguacate por dentro. Topping de lajas de hamachi con chile jalapeño.', price: '$310', category: 'rollos-esp', image: 'hamachi-roll.jpg' },
  { id: 'rainbow-roll', name: 'Rainbow Roll', badge: 'Roll Especial', desc: 'Camarón + aguacate + queso crema + cangrejo y pepino, cubierto con atún + aguacate + robalo y salmón.', price: '$275', category: 'rollos-esp', image: 'rainbow-roll.jpg' },
  { id: 'unagui-roll', name: 'Unagui Roll', badge: 'Roll Especial', desc: 'Aguacate + anguila ahumada + salsa de anguila.', price: '$295', category: 'rollos-esp', image: 'unagui-roll.jpg' },
  { id: 'alcaparra-roll', name: 'Alcaparra Roll', badge: 'Roll Especial', desc: 'Spicy de cangrejo y camarón tempura dentro, por arriba hamachi y alcaparra con limón amarilla.', price: '$295', category: 'rollos-esp', image: 'alcaparra-roll.jpg' },
  { id: 'roca-roll', name: 'Roca Roll', badge: 'Roll Especial', desc: 'Aguacate + arroz + pasta de cangrejo envuelto de papel de soya. Topping laja de hamachi + camarón roca.', price: '$325', category: 'rollos-esp', image: 'roca-roll.jpg' },
  { id: 'baked-crab-roll', name: 'Baked Crab Roll', badge: 'Roll Especial', desc: 'Hoja de papel + arroz + kanikama + tobiko + spicy mayo.', price: '$315', category: 'rollos-esp', image: 'baked-crab.jpg' },

  // ── PLATOS FUERTES ──
  { id: 'yakimeshi-res', name: 'Yakimeshi · Res', badge: 'Yakimeshi', desc: 'Arroz frito estilo japonés con res.', price: '$235', category: 'platos', image: 'yakimeshi.jpg' },
  { id: 'yakimeshi-camaron', name: 'Yakimeshi · Camarón', badge: 'Yakimeshi', desc: 'Arroz frito con camarón fresco.', price: '$235', category: 'platos', image: 'yakimeshi2.jpg' },
  { id: 'yakimeshi-pollo', name: 'Yakimeshi · Pollo', badge: 'Yakimeshi', desc: 'Arroz frito con pollo.', price: '$235', category: 'platos', image: 'yakimeshi.jpg' },
  { id: 'yakimeshi-mixto', name: 'Yakimeshi · Mixto', badge: 'Yakimeshi', desc: 'Res, camarón y pollo juntos.', price: '$235', category: 'platos', image: 'yakimeshi2.jpg' },
  { id: 'camarones-salsa', name: 'Camarones en Salsa Especial', badge: 'Plato Fuerte', desc: 'Camarones con la salsa especial de la casa.', price: '$290', category: 'platos', image: 'camarones-roca.jpg' },
  { id: 'pollo-teriyaki', name: 'Pollo Teriyaki a la Plancha', badge: 'Plato Fuerte', desc: 'Pollo a la plancha con salsa teriyaki.', price: '$265', category: 'platos', image: 'yakimeshi.jpg' },
  { id: 'filete-res', name: 'Filete de Res · Salsa Teriyaki', badge: 'Plato Fuerte', desc: 'Corte de res a la plancha con salsa teriyaki.', price: '$325', category: 'platos', image: 'yakimeshi2.jpg' },
  { id: 'salmon-plancha', name: 'Salmón a la Plancha', badge: 'Plato Fuerte', desc: 'Salmón fresco a la plancha.', price: '$315', category: 'platos', image: 'salmon-plancha.jpg' },

  // ── POSTRES ──
  { id: 'pastel-chocolate', name: 'Pastel de Chocolate con Toffee', badge: 'Postre', desc: 'Chocolate intenso con caramelo suave.', price: '$145', category: 'postres', image: 'mochis2.jpg' },
  { id: 'cheesecake', name: 'Cheesecake de Gloria', badge: 'Postre', desc: 'Cremoso y suave.', price: '$145', category: 'postres', image: 'mochis.jpg' },
  { id: 'mochis', name: 'Mochis', badge: 'Postre', desc: 'Vainilla · Chocolate · Taro · Coco · Mango · Fresa', price: '$85', category: 'postres', image: 'mochis.jpg' },
];

export interface CategoryMeta {
  num: string;
  jp: string;
  label: string;
  desc: string;
  divider: string;
  cols?: number; // grid columns override (2 for GF/postres)
  layout?: 'nigiri'; // special layout
}

export const CATEGORIES: Record<MenuCategory, CategoryMeta> = {
  entradas:     { num: '01', jp: '前菜',         label: 'Entradas',                  desc: 'Para comenzar la experiencia', divider: '一' },
  sashimi:      { num: '02', jp: '刺身',         label: 'Sashimi',                   desc: 'Pescado premium en su forma más pura', divider: '二' },
  curricanes:   { num: '03', jp: 'くりかね',      label: 'Curricanes',                desc: 'La firma de IWA. Servidos en cucharas. Hay que probarlos.', divider: '三' },
  nigiris:      { num: '04', jp: '握り',         label: 'Nigiris',                   desc: 'Por pieza (1pz). Arroz templado, pescado del día.', divider: '四', layout: 'nigiri' },
  temaki:       { num: '05', jp: '手巻き',       label: 'Temaki · Conos',            desc: 'Rollos en cono de nori, hechos al momento', divider: '五' },
  'rollos-gf':  { num: '06', jp: 'グルテンフリー', label: 'Rollos Gluten Free · Sin Arroz', desc: 'Envueltos en pepino o papel de arroz', divider: '六', cols: 2 },
  'rollos-esp': { num: '07', jp: '特製ロール',    label: 'Rollos Especiales',         desc: 'La creatividad del chef en cada pieza', divider: '七' },
  platos:       { num: '08', jp: 'メイン',       label: 'Platos Fuertes',            desc: '', divider: '八' },
  postres:      { num: '09', jp: 'デザート',     label: 'Postres',                   desc: '', divider: '九' },
};

export const CATEGORY_ORDER: MenuCategory[] = [
  'entradas', 'sashimi', 'curricanes', 'nigiris', 'temaki',
  'rollos-gf', 'rollos-esp', 'platos', 'postres',
];

/* ── DRINKS DATA (list-style, no images) ── */
export interface DrinkItem { name: string; sub?: string; price: string; }
export interface DrinkGroup { label: string; items: DrinkItem[]; }
export interface DrinkSection { id: string; num: string; jp: string; title: string; divider: string; cols: [DrinkGroup[], DrinkGroup[]]; }

export const DRINKS: DrinkSection[] = [
  {
    id: 'sake', num: '10', jp: '日本酒', title: 'Sake & Vinos', divider: '酒',
    cols: [
      [
        { label: 'Sake', items: [
          { name: 'Jarra Hattori Hanzo', sub: '275ml', price: '$700' },
          { name: 'Jarra Nami Junmai', sub: '275ml', price: '$435' },
          { name: 'Jarra Junmai Ginjo', sub: '275ml', price: '$525' },
          { name: 'Nami Junmai Botella', price: '$1,110' },
          { name: 'Nami Ginjo Botella', price: '$1,350' },
        ]},
        { label: 'Vinos Tinto', items: [
          { name: 'Casa Madero 3V', sub: 'por copeo', price: '$255' },
          { name: 'Botella Casa Madero 3V', price: '$1,100' },
          { name: 'Botella Maria Tinto', price: '$1,300' },
        ]},
        { label: 'Vino Blanco', items: [
          { name: 'Casa Madero 2V', sub: 'por copeo', price: '$215' },
          { name: 'Botella Casa Madero 2V', price: '$850' },
        ]},
      ],
      [
        { label: 'Vino Rosado', items: [
          { name: 'Casa Madero V', sub: 'por copeo', price: '$215' },
          { name: 'Botella Casa Madero 2V', price: '$850' },
        ]},
        { label: 'Cervezas Nacionales', items: [
          { name: 'Tecate Light', price: '$55' },
          { name: 'XX Lager', price: '$55' },
          { name: 'Bohemia Oscura', price: '$65' },
          { name: 'Michelada', price: '$25' },
        ]},
        { label: 'Cervezas Internacionales', items: [
          { name: 'Heineken', price: '$65' },
          { name: 'Amstel Ultra', price: '$65' },
          { name: 'Sapporo', price: '$210' },
          { name: 'Asahi', price: '$95' },
        ]},
      ],
    ],
  },
  {
    id: 'bebidas', num: '11', jp: '飲み物', title: 'Bebidas & Drinks', divider: '飲',
    cols: [
      [
        { label: 'Bebidas', items: [
          { name: 'Coca Cola', price: '$45' },
          { name: 'Coca Cola Light', price: '$45' },
          { name: 'Coca Cola Zero', price: '$45' },
          { name: 'Sprite', price: '$45' },
          { name: 'Fresca', price: '$45' },
          { name: 'Agua Natural', price: '$50' },
          { name: 'Agua Mineral', price: '$50' },
          { name: 'Limonada', price: '$65' },
          { name: 'Naranjada', price: '$65' },
          { name: 'Limonada + Pepino', price: '$65' },
          { name: 'Limonada Frutos Rojos', price: '$70' },
          { name: 'Té frío / caliente', price: '$45' },
          { name: 'Carajillo', price: '$155' },
          { name: 'Espresso Doble', price: '$85' },
        ]},
        { label: 'Drinks', items: [
          { name: 'Gin & Tonic', price: '$175' },
          { name: 'Clericot', price: '$140' },
          { name: 'Mojito', price: '$130' },
          { name: 'Sangria', price: '$130' },
          { name: 'Aperol', price: '$170' },
          { name: 'Clamato Preparado', price: '$75' },
          { name: 'Vaso de Clamato', price: '$70' },
        ]},
      ],
      [
        { label: 'Destilados', items: [
          { name: 'Bacardi', price: '$120' },
          { name: 'Jose Cuervo Tradicional', price: '$120' },
          { name: 'Dobel Diamante', price: '$165' },
          { name: 'Don Julio 70', price: '$165' },
          { name: 'Etiqueta Negra', price: '$175' },
          { name: 'Whisky Suntory Toki', price: '$175' },
          { name: 'Sapporo', price: '$190' },
          { name: 'Bailys', price: '$140' },
          { name: 'Mezcal', price: '$145' },
        ]},
      ],
    ],
  },
];
