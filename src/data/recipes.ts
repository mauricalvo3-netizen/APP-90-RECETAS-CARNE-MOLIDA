import heroImage from '../assets/images/ground_beef_hero_1785213144965.jpg';
import albondigasImage from '../assets/images/albondigas_salsa_1785213717363.jpg';
import tacosImage from '../assets/images/tacos_carne_1785213730848.jpg';
import pastelImage from '../assets/images/pastel_carne_1785213743876.jpg';

export interface SampleRecipe {
  id: number | string;
  categoria: string;
  nombre: string;
  tiempoTexto: string;
  tiempoMinutos: number | null;
  ingredientes: string[];
  preparacion: string[];
  imagen: string;
  
  // Mapped/helper properties for existing UI components
  title: string;
  description: string;
  prepTime: string;
  servings?: string;
  tag: string;
  image: string;
  ingredients: string[];
  steps: string[];
}

export const SAMPLE_RECIPES: SampleRecipe[] = [
  {
    id: 1,
    categoria: "Rollos y rollitos",
    nombre: "Rollito clásico de carne molida",
    tiempoTexto: "20 min de preparación + 40 min en el horno = 60 min en total",
    tiempoMinutos: 60,
    ingredientes: [
      "500 g de carne molida (pato)",
      "1 huevo",
      "3 cucharadas de pan molido",
      "1 cebolla picada",
      "2 dientes de ajo machacados",
      "Sal, pimienta negra y nuez moscada al gusto",
      "200 g de jamón en rebanadas",
      "200 g de queso mozzarella en rebanadas",
      "2 huevos cocidos (opcional)",
      "Aceite de oliva para untar"
    ],
    preparacion: [
      "Mezcla la carne molida con el huevo, el pan molido, la cebolla, el ajo, la sal, la pimienta y la nuez moscada hasta obtener una masa homogénea.",
      "Extienda la masa sobre papel para hornear untado con aceite, formando un rectángulo de aproximadamente 30 x 25 cm.",
      "Cubre con rebanadas de jamón y mozzarella, dejando 2 cm libres en los bordes.",
      "Enrolla con cuidado usando el papel como guía, presionando bien para que no se abra.",
      "Colócalo en una bandeja para hornear untada con aceite de oliva.",
      "Hornea en horno precalentado a 180 °C durante 35–40 minutos, hasta que se dore.",
      "Déjalo reposar 5 minutos antes de cortarlo en rebanadas."
    ],
    imagen: "001.jpg",
    title: "Rollito clásico de carne molida",
    description: "20 min de preparación + 40 min en el horno = 60 min en total",
    prepTime: "60 min",
    servings: "4 a 6 porciones",
    tag: "Rollos y rollitos",
    image: pastelImage,
    ingredients: [
      "500 g de carne molida (pato)",
      "1 huevo",
      "3 cucharadas de pan molido",
      "1 cebolla picada",
      "2 dientes de ajo machacados",
      "Sal, pimienta negra y nuez moscada al gusto",
      "200 g de jamón en rebanadas",
      "200 g de queso mozzarella en rebanadas",
      "2 huevos cocidos (opcional)",
      "Aceite de oliva para untar"
    ],
    steps: [
      "Mezcla la carne molida con el huevo, el pan molido, la cebolla, el ajo, la sal, la pimienta y la nuez moscada hasta obtener una masa homogénea.",
      "Extienda la masa sobre papel para hornear untado con aceite, formando un rectángulo de aproximadamente 30 x 25 cm.",
      "Cubre con rebanadas de jamón y mozzarella, dejando 2 cm libres en los bordes.",
      "Enrolla con cuidado usando el papel como guía, presionando bien para que no se abra.",
      "Colócalo en una bandeja para hornear untada con aceite de oliva.",
      "Hornea en horno precalentado a 180 °C durante 35–40 minutos, hasta que se dore.",
      "Déjalo reposar 5 minutos antes de cortarlo en rebanadas."
    ]
  },
  {
    id: 2,
    categoria: "Rollos y rollitos",
    nombre: "Rollito relleno de tocino y queso",
    tiempoTexto: "25 min de preparación + 45 min en el horno = 70 min en total",
    tiempoMinutos: 70,
    ingredientes: [
      "600 g de carne molida (patito + fraldinha)",
      "1 huevo",
      "4 cucharadas de pan molido",
      "1 cebolla rallada",
      "2 dientes de ajo",
      "Sal, pimienta y orégano al gusto",
      "150 g de tocino en rebanadas",
      "200 g de queso prato en rebanadas",
      "1 chile rojo cortado en tiras",
      "Salsa de tomate para cubrir"
    ],
    preparacion: [
      "Sazona la carne con huevo, pan molido, cebolla, ajo, sal, pimienta y orégano.",
      "Extiende la masa en forma de rectángulo sobre papel para hornear.",
      "Distribuye el tocino, el queso prato y las tiras de pimiento.",
      "Enrolla con firmeza y cierra los extremos.",
      "Colócalo en una bandeja para hornear y cúbrelo con salsa de tomate.",
      "Hornea a 180 °C durante 40–45 minutos.",
      "En los últimos 10 minutos, retira el papel de aluminio para que se dore.",
      "Sírvelo en rebanadas con arroz blanco."
    ],
    imagen: "002.jpg",
    title: "Rollito relleno de tocino y queso",
    description: "25 min de preparación + 45 min en el horno = 70 min en total",
    prepTime: "70 min",
    servings: "4 a 6 porciones",
    tag: "Rollos y rollitos",
    image: albondigasImage,
    ingredients: [
      "600 g de carne molida (patito + fraldinha)",
      "1 huevo",
      "4 cucharadas de pan molido",
      "1 cebolla rallada",
      "2 dientes de ajo",
      "Sal, pimienta y orégano al gusto",
      "150 g de tocino en rebanadas",
      "200 g de queso prato en rebanadas",
      "1 chile rojo cortado en tiras",
      "Salsa de tomate para cubrir"
    ],
    steps: [
      "Sazona la carne con huevo, pan molido, cebolla, ajo, sal, pimienta y orégano.",
      "Extiende la masa en forma de rectángulo sobre papel para hornear.",
      "Distribuye el tocino, el queso prato y las tiras de pimiento.",
      "Enrolla con firmeza y cierra los extremos.",
      "Colócalo en una bandeja para hornear y cúbrelo con salsa de tomate.",
      "Hornea a 180 °C durante 40–45 minutos.",
      "En los últimos 10 minutos, retira el papel de aluminio para que se dore.",
      "Sírvelo en rebanadas con arroz blanco."
    ]
  },
  {
    id: 3,
    categoria: "Rollos y rollitos",
    nombre: "Rollito de carne con espinacas y ricotta",
    tiempoTexto: "30 min de preparación + 40 min en el horno = 70 min en total",
    tiempoMinutos: 70,
    ingredientes: [
      "500 g de carne molida",
      "1 huevo",
      "3 cucharadas de pan molido",
      "Sal, pimienta y nuez moscada al gusto",
      "1 manojo de espinacas salteadas y escurridas",
      "200 g de ricotta machacada",
      "1 diente de ajo",
      "Aceite de oliva al gusto"
    ],
    preparacion: [
      "Mezcla la carne con el huevo, el pan molido, la sal, la pimienta y la nuez moscada.",
      "Rehoga las espinacas con ajo y aceite de oliva, escúrrelas bien y mézclalas con la ricotta.",
      "Extiende la masa de carne en forma de rectángulo sobre papel para hornear.",
      "Esparce el relleno de espinacas y ricotta de manera uniforme.",
      "Enróllalo con cuidado y colócalo en una bandeja para hornear engrasada.",
      "Hornea a 180 °C durante 35–40 minutos.",
      "Sírvelo con salsa blanca o con salsa de tomate."
    ],
    imagen: "003.jpg",
    title: "Rollito de carne con espinacas y ricotta",
    description: "30 min de preparación + 40 min en el horno = 70 min en total",
    prepTime: "70 min",
    servings: "4 porciones",
    tag: "Rollos y rollitos",
    image: heroImage,
    ingredients: [
      "500 g de carne molida",
      "1 huevo",
      "3 cucharadas de pan molido",
      "Sal, pimienta y nuez moscada al gusto",
      "1 manojo de espinacas salteadas y escurridas",
      "200 g de ricotta machacada",
      "1 diente de ajo",
      "Aceite de oliva al gusto"
    ],
    steps: [
      "Mezcla la carne con el huevo, el pan molido, la sal, la pimienta y la nuez moscada.",
      "Rehoga las espinacas con ajo y aceite de oliva, escúrrelas bien y mézclalas con la ricotta.",
      "Extiende la masa de carne en forma de rectángulo sobre papel para hornear.",
      "Esparce el relleno de espinacas y ricotta de manera uniforme.",
      "Enróllalo con cuidado y colócalo en una bandeja para hornear engrasada.",
      "Hornea a 180 °C durante 35–40 minutos.",
      "Sírvelo con salsa blanca o con salsa de tomate."
    ]
  },
  {
    id: 4,
    categoria: "Rollos y rollitos",
    nombre: "Rollitos de carne molida con zanahoria",
    tiempoTexto: "25 min de preparación + 30 min en el horno = 55 min en total",
    tiempoMinutos: 55,
    ingredientes: [
      "400 g de carne molida",
      "1 huevo",
      "2 cucharadas de pan molido",
      "1 cebolla picada",
      "Sal, pimienta y perejil al gusto",
      "2 zanahorias cortadas en palitos",
      "100 g de queso prato en tiras",
      "Aceite de oliva para untar"
    ],
    preparacion: [
      "Mezcla la carne con el huevo, la harina, la cebolla, la sal, la pimienta y el perejil.",
      "Divide la masa en 8 porciones iguales.",
      "Extiende cada porción hasta formar un rectángulo pequeño.",
      "Coloca 1 palito de zanahoria y 1 tira de queso en el centro.",
      "Enróllalos y cierra bien los extremos presionando con fuerza.",
      "Colócalos en una bandeja para hornear engrasada.",
      "Hornea a 200 °C durante 25–30 minutos hasta que se doren.",
      "Sírvelos como entrada o plato principal."
    ],
    imagen: "004.jpg",
    title: "Rollitos de carne molida con zanahoria",
    description: "25 min de preparación + 30 min en el horno = 55 min en total",
    prepTime: "55 min",
    servings: "8 rollitos",
    tag: "Rollos y rollitos",
    image: tacosImage,
    ingredients: [
      "400 g de carne molida",
      "1 huevo",
      "2 cucharadas de pan molido",
      "1 cebolla picada",
      "Sal, pimienta y perejil al gusto",
      "2 zanahorias cortadas en palitos",
      "100 g de queso prato en tiras",
      "Aceite de oliva para untar"
    ],
    steps: [
      "Mezcla la carne con el huevo, la harina, la cebolla, la sal, la pimienta y el perejil.",
      "Divide la masa en 8 porciones iguales.",
      "Extiende cada porción hasta formar un rectángulo pequeño.",
      "Coloca 1 palito de zanahoria y 1 tira de queso en el centro.",
      "Enróllalos y cierra bien los extremos presionando con fuerza.",
      "Colócalos en una bandeja para hornear engrasada.",
      "Hornea a 200 °C durante 25–30 minutos hasta que se doren.",
      "Sírvelos como entrada o plato principal."
    ]
  },
  {
    id: 5,
    categoria: "Rollos y rollitos",
    nombre: "Rollito de carne con palmito",
    tiempoTexto: "25 min de preparación + 40 min en el horno = 65 min en total",
    tiempoMinutos: 65,
    ingredientes: [
      "500 g de carne molida",
      "1 huevo",
      "3 cucharadas de pan molido",
      "1 cebolla picada",
      "2 dientes de ajo",
      "Sal, pimienta y perejil al gusto",
      "1 lata de palmito picado y escurrido",
      "150 g de queso mozzarella rallado",
      "Salsa de tomate para cubrir"
    ],
    preparacion: [
      "Mezcla la carne con el huevo, la harina, la cebolla, el ajo, la sal, la pimienta y el perejil.",
      "Extiende la masa en forma de rectángulo sobre papel para hornear.",
      "Esparza el palmito picado y el queso mozzarella rallado.",
      "Enrolla con cuidado y coloca en una bandeja para hornear.",
      "Cúbrelo con salsa de tomate.",
      "Hornea a 180 °C durante 35–40 minutos.",
      "Sírvelo con arroz blanco y ensalada verde."
    ],
    imagen: "005.jpg",
    title: "Rollito de carne con palmito",
    description: "25 min de preparación + 40 min en el horno = 65 min en total",
    prepTime: "65 min",
    servings: "4 porciones",
    tag: "Rollos y rollitos",
    image: pastelImage,
    ingredients: [
      "500 g de carne molida",
      "1 huevo",
      "3 cucharadas de pan molido",
      "1 cebolla picada",
      "2 dientes de ajo",
      "Sal, pimienta y perejil al gusto",
      "1 lata de palmito picado y escurrido",
      "150 g de queso mozzarella rallado",
      "Salsa de tomate para cubrir"
    ],
    steps: [
      "Mezcla la carne con el huevo, la harina, la cebolla, el ajo, la sal, la pimienta y el perejil.",
      "Extiende la masa en forma de rectángulo sobre papel para hornear.",
      "Esparza el palmito picado y el queso mozzarella rallado.",
      "Enrolla con cuidado y coloca en una bandeja para hornear.",
      "Cúbrelo con salsa de tomate.",
      "Hornea a 180 °C durante 35–40 minutos.",
      "Sírvelo con arroz blanco y ensalada verde."
    ]
  },
  {
    id: 6,
    categoria: "Rollos y rollitos",
    nombre: "Rollito navideño con farofa",
    tiempoTexto: "40 min de preparación + 50 min en el horno = 90 min en total",
    tiempoMinutos: 90,
    ingredientes: [
      "700 g de carne molida",
      "2 huevos",
      "5 cucharadas de pan molido",
      "1 cebolla rallada",
      "3 dientes de ajo",
      "Sal, pimienta, nuez moscada y tomillo al gusto",
      "Relleno de farofa:",
      "2 cucharadas de mantequilla",
      "1 cebolla picada",
      "100 g de tocino picado",
      "1 taza de harina de yuca tostada",
      "Perejil y cebollín al gusto"
    ],
    preparacion: [
      "Prepara la farofa: rehoga el tocino en la mantequilla, agrega la cebolla, dora, mezcla la harina y las hierbas.",
      "Sazona la carne y extiéndela en forma de rectángulo.",
      "Esparce la farofa sobre la carne.",
      "Enróllala bien apretada y colócala en una bandeja para hornear.",
      "Úntala con mantequilla derretida.",
      "Hornea a 180 °C durante 45–50 minutos.",
      "Ideal para fiestas y almuerzos especiales."
    ],
    imagen: "006.jpg",
    title: "Rollito navideño con farofa",
    description: "40 min de preparación + 50 min en el horno = 90 min en total",
    prepTime: "90 min",
    servings: "6 porciones",
    tag: "Rollos y rollitos",
    image: heroImage,
    ingredients: [
      "700 g de carne molida",
      "2 huevos",
      "5 cucharadas de pan molido",
      "1 cebolla rallada",
      "3 dientes de ajo",
      "Sal, pimienta, nuez moscada y tomillo al gusto",
      "Relleno de farofa:",
      "2 cucharadas de mantequilla",
      "1 cebolla picada",
      "100 g de tocino picado",
      "1 taza de harina de yuca tostada",
      "Perejil y cebollín al gusto"
    ],
    steps: [
      "Prepara la farofa: rehoga el tocino en la mantequilla, agrega la cebolla, dora, mezcla la harina y las hierbas.",
      "Sazona la carne y extiéndela en forma de rectángulo.",
      "Esparce la farofa sobre la carne.",
      "Enróllala bien apretada y colócala en una bandeja para hornear.",
      "Úntala con mantequilla derretida.",
      "Hornea a 180 °C durante 45–50 minutos.",
      "Ideal para fiestas y almuerzos especiales."
    ]
  },
  {
    id: 7,
    categoria: "Rollos y rollitos",
    nombre: "Rollito de carne con huevo cocido",
    tiempoTexto: "20 min de preparación + 40 min en el horno = 60 min en total",
    tiempoMinutos: 60,
    ingredientes: [
      "500 g de carne molida",
      "1 huevo crudo para la masa",
      "3 cucharadas de pan molido",
      "1 cebolla picada",
      "2 dientes de ajo",
      "Sal, pimienta y perejil al gusto",
      "3 huevos cocidos enteros",
      "150 g de jamón en rebanadas",
      "100 g de queso mozzarella en rebanadas"
    ],
    preparacion: [
      "Mezcla la carne con huevo, harina, cebolla, ajo, sal, pimienta y perejil.",
      "Extiende la masa en forma de rectángulo sobre papel para hornear.",
      "Cúbrela con jamón y queso mozzarella.",
      "Coloca los huevos cocidos en fila en el centro.",
      "Enróllalo con cuidado para que los huevos queden en el centro.",
      "Cierra bien los extremos y colócalo en una bandeja para hornear engrasada.",
      "Hornea a 180 °C durante 35–40 minutos.",
      "Al cortarlo en rebanadas, cada trozo revelará el huevo en el centro."
    ],
    imagen: "007.jpg",
    title: "Rollito de carne con huevo cocido",
    description: "20 min de preparación + 40 min en el horno = 60 min en total",
    prepTime: "60 min",
    servings: "4 a 5 porciones",
    tag: "Rollos y rollitos",
    image: albondigasImage,
    ingredients: [
      "500 g de carne molida",
      "1 huevo crudo para la masa",
      "3 cucharadas de pan molido",
      "1 cebolla picada",
      "2 dientes de ajo",
      "Sal, pimienta y perejil al gusto",
      "3 huevos cocidos enteros",
      "150 g de jamón en rebanadas",
      "100 g de queso mozzarella en rebanadas"
    ],
    steps: [
      "Mezcla la carne con huevo, harina, cebolla, ajo, sal, pimienta y perejil.",
      "Extiende la masa en forma de rectángulo sobre papel para hornear.",
      "Cúbrela con jamón y queso mozzarella.",
      "Coloca los huevos cocidos en fila en el centro.",
      "Enróllalo con cuidado para que los huevos queden en el centro.",
      "Cierra bien los extremos y colócalo en una bandeja para hornear engrasada.",
      "Hornea a 180 °C durante 35–40 minutos.",
      "Al cortarlo en rebanadas, cada trozo revelará el huevo en el centro."
    ]
  },
  {
    id: 8,
    categoria: "Rollos y rollitos",
    nombre: "Rollito de carne con queso coalho",
    tiempoTexto: "20 min de preparación + 20 min en la parrilla = 40 min en total",
    tiempoMinutos: 40,
    ingredientes: [
      "400 g de carne molida",
      "1 huevo",
      "2 cucharadas de pan molido",
      "1 cebolla picada",
      "Sal, pimienta, comino y cilantro al gusto",
      "200 g de queso coalho en palitos",
      "Aceite de oliva para asar"
    ],
    preparacion: [
      "Mezcla la carne con el huevo, el pan molido, la cebolla y los condimentos.",
      "Divídela en 8 porciones.",
      "Envuelve cada palito de queso coalho con la masa de carne.",
      "Dale forma de rollito.",
      "Ásalos en una sartén con aceite de oliva a fuego medio.",
      "Dale la vuelta con cuidado cada 4–5 minutos.",
      "Cocínalas durante 18–20 minutos en total.",
      "Sírvelo con salsa de chile y limón."
    ],
    imagen: "008.jpg",
    title: "Rollito de carne con queso coalho",
    description: "20 min de preparación + 20 min en la parrilla = 40 min en total",
    prepTime: "40 min",
    servings: "8 rollitos",
    tag: "Rollos y rollitos",
    image: tacosImage,
    ingredients: [
      "400 g de carne molida",
      "1 huevo",
      "2 cucharadas de pan molido",
      "1 cebolla picada",
      "Sal, pimienta, comino y cilantro al gusto",
      "200 g de queso coalho en palitos",
      "Aceite de oliva para untar"
    ],
    steps: [
      "Mezcla la carne con el huevo, el pan molido, la cebolla y los condimentos.",
      "Divídela en 8 porciones.",
      "Envuelve cada palito de queso coalho con la masa de carne.",
      "Dale forma de rollito.",
      "Ásalos en una sartén con aceite de oliva a fuego medio.",
      "Dale la vuelta con cuidado cada 4–5 minutos.",
      "Cocínalas durante 18–20 minutos en total.",
      "Sírvelo con salsa de chile y limón."
    ]
  },
  {
    id: 9,
    categoria: "Rollos y rollitos",
    nombre: "Rollito de carne con salsa de Madeira",
    tiempoTexto: "30 min de preparación + 45 min en el horno = 75 min en total",
    tiempoMinutos: 75,
    ingredientes: [
      "600 g de carne molida",
      "2 huevos",
      "4 cucharadas de pan molido",
      "1 cebolla rallada",
      "3 dientes de ajo",
      "Sal, pimienta y tomillo al gusto",
      "200 g de jamón y queso mozzarella en rebanadas",
      "Salsa Madeira:",
      "1 cebolla picada",
      "2 cucharadas de mantequilla",
      "200 g de champiñones en rebanadas",
      "1 taza de vino de Madeira (o tinto seco)",
      "1 taza de caldo de carne",
      "1 cucharada de maicena",
      "Sal y pimienta al gusto"
    ],
    preparacion: [
      "Mezcla la carne con los huevos, la harina, la cebolla, el ajo y los condimentos.",
      "Extienda la masa en forma de rectángulo, rellene con jamón y queso mozzarella.",
      "Enróllalo y hornéalo a 180 °C durante 40–45 minutos.",
      "Para la salsa: rehogar la cebolla en mantequilla, agregar los champiñones.",
      "Agrega el vino y deja que se reduzca a la mitad.",
      "Agrega el caldo de carne y la maicena disuelta en agua fría.",
      "Cocínalo hasta que espese y rectifica la sal.",
      "Sirve el rollo cortado en rebanadas y cubierto con la salsa Madeira."
    ],
    imagen: "009.jpg",
    title: "Rollito de carne con salsa de Madeira",
    description: "30 min de preparación + 45 min en el horno = 75 min en total",
    prepTime: "75 min",
    servings: "5 porciones",
    tag: "Rollos y rollitos",
    image: pastelImage,
    ingredients: [
      "600 g de carne molida",
      "2 huevos",
      "4 cucharadas de pan molido",
      "1 cebolla rallada",
      "3 dientes de ajo",
      "Sal, pimienta y tomillo al gusto",
      "200 g de jamón y queso mozzarella en rebanadas",
      "Salsa Madeira:",
      "1 cebolla picada",
      "2 cucharadas de mantequilla",
      "200 g de champiñones en rebanadas",
      "1 taza de vino de Madeira (o tinto seco)",
      "1 taza de caldo de carne",
      "1 cucharada de maicena",
      "Sal y pimienta al gusto"
    ],
    steps: [
      "Mezcla la carne con los huevos, la harina, la cebolla, el ajo y los condimentos.",
      "Extienda la masa en forma de rectángulo, rellene con jamón y queso mozzarella.",
      "Enróllalo y hornéalo a 180 °C durante 40–45 minutos.",
      "Para la salsa: rehogar la cebolla en mantequilla, agregar los champiñones.",
      "Agrega el vino y deja que se reduzca a la mitad.",
      "Agrega el caldo de carne y la maicena disuelta en agua fría.",
      "Cocínalo hasta que espese y rectifica la sal.",
      "Sirve el rollo cortado en rebanadas y cubierto con la salsa Madeira."
    ]
  },

  // CAPÍTULO 2: Quibes y Kaftas (Recetas 10 a 18)
  {
    id: 10,
    categoria: "Quibes y Kaftas",
    nombre: "Kibbeh frito tradicional",
    tiempoTexto: "30 min de preparación + 2 h de reposo + 20 min de fritura = 2 h 50 min en total",
    tiempoMinutos: 170,
    ingredientes: [
      "500 g de carne molida (pato)",
      "2 tazas de trigo para kibbeh (remojado durante 30 min)",
      "1 cebolla grande rallada",
      "Sal, pimienta negra, canela y menta seca al gusto",
      "Aceite para freír",
      "Relleno:",
      "200 g de carne molida salteada",
      "1 cebolla picada",
      "50 g de piñones o nueces picadas",
      "Sal y pimienta al gusto"
    ],
    preparacion: [
      "Remoja el trigo en agua fría durante 30 minutos, escúrrelo y exprímelo bien.",
      "Mezcla el trigo con la carne cruda, la cebolla rallada y los condimentos hasta obtener una masa homogénea.",
      "Prepara el relleno: saltea la carne con la cebolla, agrega los piñones, la sal y la pimienta.",
      "Da forma a los quibes: toma una porción de masa, extiéndela en la palma de la mano, coloca el relleno y ciérrala en forma ovalada.",
      "Fríelos en aceite caliente (180 °C) durante 6–8 minutos hasta que se doren.",
      "Escúrrelos sobre papel absorbente y sírvelos con limón y cuajada."
    ],
    imagen: "010.jpg",
    title: "Kibbeh frito tradicional",
    description: "30 min de preparación + 2 h de reposo + 20 min de fritura = 2 h 50 min en total",
    prepTime: "2 h 50 min",
    servings: "4 porciones",
    tag: "Quibes y Kaftas",
    image: albondigasImage,
    ingredients: [
      "500 g de carne molida (pato)",
      "2 tazas de trigo para kibbeh (remojado durante 30 min)",
      "1 cebolla grande rallada",
      "Sal, pimienta negra, canela y menta seca al gusto",
      "Aceite para freír",
      "Relleno:",
      "200 g de carne molida salteada",
      "1 cebolla picada",
      "50 g de piñones o nueces picadas",
      "Sal y pimienta al gusto"
    ],
    steps: [
      "Remoja el trigo en agua fría durante 30 minutos, escúrrelo y exprímelo bien.",
      "Mezcla el trigo con la carne cruda, la cebolla rallada y los condimentos hasta obtener una masa homogénea.",
      "Prepara el relleno: saltea la carne con la cebolla, agrega los piñones, la sal y la pimienta.",
      "Da forma a los quibes: toma una porción de masa, extiéndela en la palma de la mano, coloca el relleno y ciérrala en forma ovalada.",
      "Fríelos en aceite caliente (180 °C) durante 6–8 minutos hasta que se doren.",
      "Escúrrelos sobre papel absorbente y sírvelos con limón y cuajada."
    ]
  },
  {
    id: 11,
    categoria: "Quibes y Kaftas",
    nombre: "Quibe al horno relleno de queso",
    tiempoTexto: "30 min de preparación + 40 min en el horno = 70 min en total",
    tiempoMinutos: 70,
    ingredientes: [
      "500 g de carne molida",
      "2 tazas de trigo para kibbeh remojado",
      "1 cebolla rallada",
      "Sal, pimienta, canela y menta al gusto",
      "200 g de mozzarella en rebanadas",
      "100 g de queso cremoso",
      "Aceite de oliva para untar"
    ],
    preparacion: [
      "Mezcla el trigo escurrido con la carne, la cebolla y los condimentos.",
      "Engrasa un molde para hornear con aceite de oliva.",
      "Extiende la mitad de la masa en la bandeja.",
      "Cubre con mozzarella y queso cremoso.",
      "Extiende el resto de la masa por encima.",
      "Haz cortes diagonales en la superficie y rocía con aceite de oliva.",
      "Hornea a 180 °C durante 35–40 minutos hasta que se dore.",
      "Sírvelo con ensalada de tomate y menta."
    ],
    imagen: "011.jpg",
    title: "Quibe al horno relleno de queso",
    description: "30 min de preparación + 40 min en el horno = 70 min en total",
    prepTime: "70 min",
    servings: "6 porciones",
    tag: "Quibes y Kaftas",
    image: pastelImage,
    ingredients: [
      "500 g de carne molida",
      "2 tazas de trigo para kibbeh remojado",
      "1 cebolla rallada",
      "Sal, pimienta, canela y menta al gusto",
      "200 g de mozzarella en rebanadas",
      "100 g de queso cremoso",
      "Aceite de oliva para untar"
    ],
    steps: [
      "Mezcla el trigo escurrido con la carne, la cebolla y los condimentos.",
      "Engrasa un molde para hornear con aceite de oliva.",
      "Extiende la mitad de la masa en la bandeja.",
      "Cubre con mozzarella y queso cremoso.",
      "Extiende el resto de la masa por encima.",
      "Haz cortes diagonales en la superficie y rocía con aceite de oliva.",
      "Hornea a 180 °C durante 35–40 minutos hasta que se dore.",
      "Sírvelo con ensalada de tomate y menta."
    ]
  },
  {
    id: 12,
    categoria: "Quibes y Kaftas",
    nombre: "Kafta a la brasa",
    tiempoTexto: "20 min de preparación + 1 h de reposo + 15 min en la parrilla = 1 h 35 min en total",
    tiempoMinutos: 95,
    ingredientes: [
      "500 g de carne molida (patito + falda)",
      "1 cebolla grande rallada y escurrida",
      "2 dientes de ajo machacados",
      "1 cucharada de perejil picado",
      "1 cucharada de menta picada",
      "1 cucharada de pimentón dulce",
      "Sal, pimienta negra y comino al gusto",
      "Brochetas de metal o bambú"
    ],
    preparacion: [
      "Mezcla todos los ingredientes y amasa bien durante 5 minutos.",
      "Cubre la mezcla y déjala reposar en el refrigerador durante 1 hora para que se endurezca.",
      "Moldee la carne alrededor de los pinchos dándole una forma alargada.",
      "Ásalas a la brasa o en la parrilla durante 6–8 minutos por cada lado.",
      "Dale la vuelta solo una vez para que se mantenga jugosa.",
      "Sírvela con pan de pita, hummus, tabulé y cuajada seca."
    ],
    imagen: "012.jpg",
    title: "Kafta a la brasa",
    description: "20 min de preparación + 1 h de reposo + 15 min en la parrilla = 1 h 35 min en total",
    prepTime: "1 h 35 min",
    servings: "4 porciones",
    tag: "Quibes y Kaftas",
    image: tacosImage,
    ingredients: [
      "500 g de carne molida (patito + falda)",
      "1 cebolla grande rallada y escurrida",
      "2 dientes de ajo machacados",
      "1 cucharada de perejil picado",
      "1 cucharada de menta picada",
      "1 cucharada de pimentón dulce",
      "Sal, pimienta negra y comino al gusto",
      "Brochetas de metal o bambú"
    ],
    steps: [
      "Mezcla todos los ingredientes y amasa bien durante 5 minutos.",
      "Cubre la mezcla y déjala reposar en el refrigerador durante 1 hora para que se endurezca.",
      "Moldee la carne alrededor de los pinchos dándole una forma alargada.",
      "Ásalas a la brasa o en la parrilla durante 6–8 minutos por cada lado.",
      "Dale la vuelta solo una vez para que se mantenga jugosa.",
      "Sírvela con pan de pita, hummus, tabulé y cuajada seca."
    ]
  },
  {
    id: 13,
    categoria: "Quibes y Kaftas",
    nombre: "Kafta al horno con salsa de tomate",
    tiempoTexto: "20 min de preparación + 35 min en el horno = 55 min en total",
    tiempoMinutos: 55,
    ingredientes: [
      "500 g de carne molida",
      "1 cebolla rallada",
      "2 dientes de ajo",
      "Perejil, menta, sal, pimienta y pimentón al gusto",
      "Salsa:",
      "1 lata de tomate pelado",
      "1 cebolla picada",
      "2 dientes de ajo",
      "Aceite de oliva, sal, azúcar y orégano al gusto"
    ],
    preparacion: [
      "Mezcla la carne con la cebolla, el ajo y los condimentos.",
      "Forma bolitas aplanadas o con forma de kafta.",
      "Prepara la salsa: rehoga la cebolla y el ajo en aceite de oliva, agrega el tomate, la sal, el azúcar y el orégano.",
      "Cocina la salsa durante 10 minutos.",
      "Coloca las kaftas en una bandeja para hornear y cúbrelas con la salsa.",
      "Hornea a 200 °C durante 30–35 minutos.",
      "Sírvelo con arroz blanco o pan de pita."
    ],
    imagen: "013.jpg",
    title: "Kafta al horno con salsa de tomate",
    description: "20 min de preparación + 35 min en el horno = 55 min en total",
    prepTime: "55 min",
    servings: "4 porciones",
    tag: "Quibes y Kaftas",
    image: heroImage,
    ingredients: [
      "500 g de carne molida",
      "1 cebolla rallada",
      "2 dientes de ajo",
      "Perejil, menta, sal, pimienta y pimentón al gusto",
      "Salsa:",
      "1 lata de tomate pelado",
      "1 cebolla picada",
      "2 dientes de ajo",
      "Aceite de oliva, sal, azúcar y orégano al gusto"
    ],
    steps: [
      "Mezcla la carne con la cebolla, el ajo y los condimentos.",
      "Forma bolitas aplanadas o con forma de kafta.",
      "Prepara la salsa: rehoga la cebolla y el ajo en aceite de oliva, agrega el tomate, la sal, el azúcar y el orégano.",
      "Cocina la salsa durante 10 minutos.",
      "Coloca las kaftas en una bandeja para hornear y cúbrelas con la salsa.",
      "Hornea a 200 °C durante 30–35 minutos.",
      "Sírvelo con arroz blanco o pan de pita."
    ]
  },
  {
    id: 14,
    categoria: "Quibes y Kaftas",
    nombre: "Kibbeh en bandeja (grande al horno)",
    tiempoTexto: "30 min de preparación + 45 min en el horno = 75 min en total",
    tiempoMinutos: 75,
    ingredientes: [
      "1 kg de carne molida",
      "3 tazas de trigo para kibbeh remojado",
      "2 cebollas ralladas",
      "Sal, pimienta, canela, menta y pimienta siria al gusto",
      "Aceite de oliva para rociar",
      "Relleno:",
      "300 g de carne molida salteada con cebolla",
      "100 g de nueces o piñones picados",
      "Sal y pimienta al gusto"
    ],
    preparacion: [
      "Mezcla el trigo escurrido con la carne cruda, la cebolla y los condimentos.",
      "Engrasa un molde grande para hornear con aceite de oliva.",
      "Extiende la mitad de la masa.",
      "Distribuye el relleno de carne salteada con nueces.",
      "Cubre con el resto de la masa.",
      "Haz cortes en forma de rombo en la superficie.",
      "Rocía generosamente con aceite de oliva.",
      "Hornea a 180 °C durante 40–45 minutos hasta que se dore."
    ],
    imagen: "014.jpg",
    title: "Kibbeh en bandeja (grande al horno)",
    description: "30 min de preparación + 45 min en el horno = 75 min en total",
    prepTime: "75 min",
    servings: "8 a 10 porciones",
    tag: "Quibes y Kaftas",
    image: pastelImage,
    ingredients: [
      "1 kg de carne molida",
      "3 tazas de trigo para kibbeh remojado",
      "2 cebollas ralladas",
      "Sal, pimienta, canela, menta y pimienta siria al gusto",
      "Aceite de oliva para rociar",
      "Relleno:",
      "300 g de carne molida salteada con cebolla",
      "100 g de nueces o piñones picados",
      "Sal y pimienta al gusto"
    ],
    steps: [
      "Mezcla el trigo escurrido con la carne cruda, la cebolla y los condimentos.",
      "Engrasa un molde grande para hornear con aceite de oliva.",
      "Extiende la mitad de la masa.",
      "Distribuye el relleno de carne salteada con nueces.",
      "Cubre con el resto de la masa.",
      "Haz cortes en forma de rombo en la superficie.",
      "Rocía generosamente con aceite de oliva.",
      "Hornea a 180 °C durante 40–45 minutos hasta que se dore."
    ]
  },
  {
    id: 15,
    categoria: "Quibes y Kaftas",
    nombre: "Kibbeh crudo (Kibbeh Nayyeh)",
    tiempoTexto: "30 min de preparación + 1 h en el refrigerador = 1 h 30 min en total",
    tiempoMinutos: 90,
    ingredientes: [
      "300 g de carne molida fresca (pato, molida dos veces)",
      "1 taza de trigo para kibbeh remojado y bien escurrido",
      "1 cebolla pequeña rallada",
      "Sal, pimienta negra, canela y pimienta siria al gusto",
      "Aceite de oliva extra virgen para terminar",
      "Menta fresca y cebolla morada para servir"
    ],
    preparacion: [
      "Utiliza carne fresca de buena procedencia, molida al momento.",
      "Remoja el trigo durante 20 minutos, escúrrelo y exprímelo muy bien.",
      "Mezcla la carne cruda con el trigo, la cebolla rallada y los condimentos.",
      "Amasa bien hasta obtener una textura homogénea y lisa.",
      "Extiéndela en un plato llano y haz surcos con el tenedor.",
      "Rocía con aceite de oliva extra virgen.",
      "Sírvelo frío con menta, cebolla morada y pan de pita."
    ],
    imagen: "015.jpg",
    title: "Kibbeh crudo (Kibbeh Nayyeh)",
    description: "30 min de preparación + 1 h en el refrigerador = 1 h 30 min en total",
    prepTime: "1 h 30 min",
    servings: "4 porciones",
    tag: "Quibes y Kaftas",
    image: albondigasImage,
    ingredients: [
      "300 g de carne molida fresca (pato, molida dos veces)",
      "1 taza de trigo para kibbeh remojado y bien escurrido",
      "1 cebolla pequeña rallada",
      "Sal, pimienta negra, canela y pimienta siria al gusto",
      "Aceite de oliva extra virgen para terminar",
      "Menta fresca y cebolla morada para servir"
    ],
    steps: [
      "Utiliza carne fresca de buena procedencia, molida al momento.",
      "Remoja el trigo durante 20 minutos, escúrrelo y exprímelo muy bien.",
      "Mezcla la carne cruda con el trigo, la cebolla rallada y los condimentos.",
      "Amasa bien hasta obtener una textura homogénea y lisa.",
      "Extiéndela en un plato llano y haz surcos con el tenedor.",
      "Rocía con aceite de oliva extra virgen.",
      "Sírvelo frío con menta, cebolla morada y pan de pita."
    ]
  },
  {
    id: 16,
    categoria: "Quibes y Kaftas",
    nombre: "Kibbeh de calabaza (vegetariano con carne)",
    tiempoTexto: "40 min de preparación + 40 min en el horno = 80 min en total",
    tiempoMinutos: 80,
    ingredientes: [
      "300 g de calabaza cocida y machacada",
      "300 g de carne molida",
      "1 taza de trigo para kibbeh remojado",
      "1 cebolla rallada",
      "Sal, pimienta, canela y menta al gusto",
      "Aceite de oliva para untar",
      "Relleno:",
      "200 g de carne molida salteada",
      "1 cebolla picada",
      "Sal y pimienta"
    ],
    preparacion: [
      "Mezcla el puré de calabaza con la carne cruda, el trigo escurrido, la cebolla y los condimentos.",
      "Engrasa un molde para hornear con aceite de oliva.",
      "Extiende la mitad de la masa.",
      "Distribuye el relleno de carne salteada.",
      "Cubre con el resto de la masa.",
      "Haz cortes en forma de rombo y rocía con aceite de oliva.",
      "Hornea a 180 °C durante 35–40 minutos.",
      "Sírvelo con cuajada y ensalada."
    ],
    imagen: "016.jpg",
    title: "Kibbeh de calabaza (vegetariano con carne)",
    description: "40 min de preparación + 40 min en el horno = 80 min en total",
    prepTime: "80 min",
    servings: "4 a 6 porciones",
    tag: "Quibes y Kaftas",
    image: heroImage,
    ingredients: [
      "300 g de calabaza cocida y machacada",
      "300 g de carne molida",
      "1 taza de trigo para kibbeh remojado",
      "1 cebolla rallada",
      "Sal, pimienta, canela y menta al gusto",
      "Aceite de oliva para untar",
      "Relleno:",
      "200 g de carne molida salteada",
      "1 cebolla picada",
      "Sal y pimienta"
    ],
    steps: [
      "Mezcla el puré de calabaza con la carne cruda, el trigo escurrido, la cebolla y los condimentos.",
      "Engrasa un molde para hornear con aceite de oliva.",
      "Extiende la mitad de la masa.",
      "Distribuye el relleno de carne salteada.",
      "Cubre con el resto de la masa.",
      "Haz cortes en forma de rombo y rocía con aceite de oliva.",
      "Hornea a 180 °C durante 35–40 minutos.",
      "Sírvelo con cuajada y ensalada."
    ]
  },
  {
    id: 17,
    categoria: "Quibes y Kaftas",
    nombre: "Kafta a la plancha en sartén",
    tiempoTexto: "15 min de preparación + 30 min de reposo + 15 min en el horno = 60 min en total",
    tiempoMinutos: 60,
    ingredientes: [
      "500 g de carne molida",
      "1 cebolla rallada y escurrida",
      "2 dientes de ajo",
      "Perejil, menta, sal, pimienta y pimentón ahumado al gusto",
      "1 cucharada de aceite de oliva"
    ],
    preparacion: [
      "Mezcla todos los ingredientes y amasa bien.",
      "Deja reposar en el refrigerador durante 30 minutos.",
      "Forma bolitas alargadas o aplanadas.",
      "Calienta una sartén antiadherente con un chorrito de aceite de oliva.",
      "Cocínalas a fuego medio-alto durante 4–5 minutos por cada lado.",
      "No las presiones durante la cocción para que se mantengan jugosas.",
      "Sírvelas con arroz, ensalada y salsa de yogur con pepino."
    ],
    imagen: "017.jpg",
    title: "Kafta a la plancha en sartén",
    description: "15 min de preparación + 30 min de reposo + 15 min en el horno = 60 min en total",
    prepTime: "60 min",
    servings: "4 porciones",
    tag: "Quibes y Kaftas",
    image: tacosImage,
    ingredients: [
      "500 g de carne molida",
      "1 cebolla rallada y escurrida",
      "2 dientes de ajo",
      "Perejil, menta, sal, pimienta y pimentón ahumado al gusto",
      "1 cucharada de aceite de oliva"
    ],
    steps: [
      "Mezcla todos los ingredientes y amasa bien.",
      "Deja reposar en el refrigerador durante 30 minutos.",
      "Forma bolitas alargadas o aplanadas.",
      "Calienta una sartén antiadherente con un chorrito de aceite de oliva.",
      "Cocínalas a fuego medio-alto durante 4–5 minutos por cada lado.",
      "No las presiones durante la cocción para que se mantengan jugosas.",
      "Sírvelas con arroz, ensalada y salsa de yogur con pepino."
    ]
  },
  {
    id: 18,
    categoria: "Quibes y Kaftas",
    nombre: "Kibbeh al horno con tahini",
    tiempoTexto: "30 min de preparación + 40 min en el horno = 70 min en total",
    tiempoMinutos: 70,
    ingredientes: [
      "500 g de carne molida",
      "2 tazas de trigo para kibbeh remojado",
      "1 cebolla rallada",
      "Sal, pimienta, canela y menta al gusto",
      "Salsa de tahini:",
      "4 cucharadas de tahini (pasta de ajonjolí)",
      "Jugo de 2 limones",
      "1 diente de ajo machacado",
      "Sal y agua para ajustar la consistencia"
    ],
    preparacion: [
      "Mezcla el trigo con la carne, la cebolla y los condimentos.",
      "Extiende la mezcla en una bandeja para hornear untada con aceite de oliva.",
      "Haz cortes en forma de rombo en la superficie.",
      "Hornea a 180 °C durante 35–40 minutos.",
      "Prepara la salsa: bate el tahini con limón, ajo y sal, y agrega agua poco a poco hasta que quede cremosa.",
      "Sirve el kibbeh cubierto con la salsa de tahini.",
      "Decora con perejil picado y piñones tostados."
    ],
    imagen: "018.jpg",
    title: "Kibbeh al horno con tahini",
    description: "30 min de preparación + 40 min en el horno = 70 min en total",
    prepTime: "70 min",
    servings: "4 a 6 porciones",
    tag: "Quibes y Kaftas",
    image: pastelImage,
    ingredients: [
      "500 g de carne molida",
      "2 tazas de trigo para kibbeh remojado",
      "1 cebolla rallada",
      "Sal, pimienta, canela y menta al gusto",
      "Salsa de tahini:",
      "4 cucharadas de tahini (pasta de ajonjolí)",
      "Jugo de 2 limones",
      "1 diente de ajo machacado",
      "Sal y agua para ajustar la consistencia"
    ],
    steps: [
      "Mezcla el trigo con la carne, la cebolla y los condimentos.",
      "Extiende la mezcla en una bandeja para hornear untada con aceite de oliva.",
      "Haz cortes en forma de rombo en la superficie.",
      "Hornea a 180 °C durante 35–40 minutos.",
      "Prepara la salsa: bate el tahini con limón, ajo y sal, y agrega agua poco a poco hasta que quede cremosa.",
      "Sirve el kibbeh cubierto con la salsa de tahini.",
      "Decora con perejil picado y piñones tostados."
    ]
  }
];
