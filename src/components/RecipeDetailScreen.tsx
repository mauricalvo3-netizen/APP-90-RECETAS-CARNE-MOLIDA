import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, Users, ChefHat, Check, Sparkles, Heart, ChevronLeft, ChevronRight, X, ListChecks, ShoppingCart, Star, BarChart3, BookOpen, UtensilsCrossed } from 'lucide-react';
import { SampleRecipe, getRecipeImageSrc } from '../data/recipes';

// Helper to extract ingredient details & assign an appropriate food emoji
function parseIngredientDetails(ingredient: string) {
  const lower = ingredient.toLowerCase();
  let emoji = '🥗';
  let qtySubtext = 'Porción adecuada';

  if (lower.includes('carne') || lower.includes('pato') || lower.includes('pollo') || lower.includes('ternera') || lower.includes('cerdo')) {
    emoji = '🥩';
    const match = ingredient.match(/(\d+\s*(?:g|kg|gramos|kilos)?)/i);
    qtySubtext = match ? `${match[1]} gramos` : 'Proteína fresca';
  } else if (lower.includes('huevo')) {
    emoji = '🥚';
    const match = ingredient.match(/(\d+)/);
    qtySubtext = match ? `${match[1]} ${parseInt(match[1]) === 1 ? 'unidad' : 'unidades'}` : '1 unidad';
  } else if (lower.includes('pan') || lower.includes('harina') || lower.includes('migas')) {
    emoji = '🥣';
    if (lower.includes('cucharad')) {
      const match = ingredient.match(/(\d+)/);
      qtySubtext = match ? `${match[1]} cucharadas` : '3 cucharadas';
    } else {
      qtySubtext = 'Ingrediente seco';
    }
  } else if (lower.includes('cebolla')) {
    emoji = '🧅';
    qtySubtext = '1 unidad mediana';
  } else if (lower.includes('ajo')) {
    emoji = '🧄';
    const match = ingredient.match(/(\d+)/);
    qtySubtext = match ? `${match[1]} dientes` : '2 dientes';
  } else if (lower.includes('sal') || lower.includes('pimienta') || lower.includes('nuez') || lower.includes('especia') || lower.includes('hierba')) {
    emoji = '🧂';
    qtySubtext = 'Al gusto';
  } else if (lower.includes('jamón') || lower.includes('tocino') || lower.includes('panceta')) {
    emoji = '🥓';
    const match = ingredient.match(/(\d+\s*(?:g|gramos)?)/i);
    qtySubtext = match ? `${match[1]} gramos` : 'Rebanadas frescas';
  } else if (lower.includes('queso') || lower.includes('mozzarella') || lower.includes('parmesano')) {
    emoji = '🧀';
    const match = ingredient.match(/(\d+\s*(?:g|gramos)?)/i);
    qtySubtext = match ? `${match[1]} gramos` : 'En rebanadas';
  } else if (lower.includes('aceite') || lower.includes('oliva') || lower.includes('mantequilla')) {
    emoji = '🫒';
    qtySubtext = 'Al gusto';
  } else if (lower.includes('tomate') || lower.includes('salsa')) {
    emoji = '🍅';
    qtySubtext = 'Fresco picado';
  } else if (lower.includes('limón') || lower.includes('lima')) {
    emoji = '🍋';
    qtySubtext = 'Al gusto';
  }

  return { emoji, qtySubtext };
}

// Helper to assign a miniature emoji to step preparation
function getStepMiniatureEmoji(step: string, idx: number) {
  const lower = step.toLowerCase();
  if (lower.includes('mezcla') || lower.includes('integra') || lower.includes('revuelve') || lower.includes('tazón')) return '🥣';
  if (lower.includes('extienda') || lower.includes('estira') || lower.includes('masa') || lower.includes('papel')) return '🫓';
  if (lower.includes('cubre') || lower.includes('jamón') || lower.includes('queso') || lower.includes('rellen')) return '🧀';
  if (lower.includes('enrolla') || lower.includes('dobla') || lower.includes('forma')) return '🌀';
  if (lower.includes('colócalo') || lower.includes('bandeja') || lower.includes('horno') || lower.includes('hornea')) return '🍳';
  if (lower.includes('sirva') || lower.includes('corta') || lower.includes('decora')) return '🍽️';
  
  const defaultEmojis = ['🥣', '🫓', '🧀', '🌀', '🍳', '⏲️'];
  return defaultEmojis[idx % defaultEmojis.length];
}

interface RecipeDetailScreenProps {
  recipe: SampleRecipe;
  onBack: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onAddToShoppingList?: (recipe: SampleRecipe) => void;
  shoppingListCount?: number;
  onOpenShoppingList?: () => void;
}

export function RecipeDetailScreen({
  recipe,
  onBack,
  isFavorite = false,
  onToggleFavorite,
  onAddToShoppingList,
  shoppingListCount = 0,
  onOpenShoppingList,
}: RecipeDetailScreenProps) {
  // Track checked ingredients so the user can easily tick them off while cooking
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  
  // Cooking Mode state
  const [isCookingMode, setIsCookingMode] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [showIngredientsModal, setShowIngredientsModal] = useState<boolean>(false);

  // Added Toast state
  const [showAddedToast, setShowAddedToast] = useState<boolean>(false);

  const handleAddToShoppingListClick = () => {
    if (onAddToShoppingList) {
      onAddToShoppingList(recipe);
      setShowAddedToast(true);
      setTimeout(() => setShowAddedToast(false), 3500);
    }
  };

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const name = recipe.nombre || recipe.title;
  const timeText = recipe.tiempoTexto || recipe.prepTime || '20 min de preparación + 40 min en el horno = 60 min en total';
  const ingredientsList = recipe.ingredientes || recipe.ingredients || [];
  const stepsList = recipe.preparacion || recipe.steps || [];
  const tagText = recipe.categoria || recipe.tag || 'Rollos y rollitos';
  const servingsText = recipe.servings || '4 a 6 porciones';

  const handleStartCookingMode = () => {
    setCurrentStepIndex(0);
    setIsCookingMode(true);
  };

  const handleExitCookingMode = () => {
    setIsCookingMode(false);
    setShowIngredientsModal(false);
  };

  const handlePrevStep = () => {
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextStep = () => {
    setCurrentStepIndex((prev) => Math.min(stepsList.length - 1, prev + 1));
  };

  // COOKING MODE VIEW
  if (isCookingMode) {
    const totalSteps = stepsList.length;
    const currentStepText = stepsList[currentStepIndex] || '';
    const tipsList = [
      'Usa las manos limpias para integrar mejor los ingredientes sin apelmazar.',
      'Asegúrate de cocinar a fuego medio constante para mantener los jugos.',
      'Sazona suavemente en cada etapa para lograr un sabor equilibrado y profundo.',
      'Deja reposar un par de minutos al finalizar para potenciar todos los aromas.',
      'Puedes acompañar con tu guarnición preferida o salsa fresca de la casa.'
    ];

    return (
      <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full bg-[#0B0B0B] text-stone-100 min-h-full relative overflow-hidden font-sans">
        {/* Subtle Ambient Orange Glow Background */}
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-80 h-80 bg-orange-600/15 blur-[100px] pointer-events-none rounded-full" />

        {/* Header Bar */}
        <div className="p-3.5 sm:p-4 bg-[#120E0D]/90 border-b border-orange-500/20 flex items-center justify-between gap-2.5 shadow-md backdrop-blur-md relative z-10">
          <button
            onClick={handleExitCookingMode}
            className="flex items-center gap-1.5 text-stone-300 hover:text-white bg-[#1C1816] hover:bg-[#26201D] font-bold text-xs px-3.5 py-1.5 rounded-full transition-colors cursor-pointer border border-stone-800 shadow-2xs"
            id="exit-cooking-mode-btn"
          >
            <X className="w-3.5 h-3.5 text-orange-400" />
            <span>Salir</span>
          </button>

          <div className="flex-1 text-center truncate px-1">
            <h2 className="text-xs sm:text-sm font-bold text-stone-100 truncate font-display tracking-tight">
              {name}
            </h2>
          </div>

          <button
            onClick={() => setShowIngredientsModal(!showIngredientsModal)}
            className="flex items-center gap-1.5 text-amber-200 bg-[#1C1816] hover:bg-[#26201D] border border-amber-500/30 font-bold text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer shadow-2xs"
            id="cooking-mode-ingredients-btn"
            title="Ver ingredientes"
          >
            <ListChecks className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-xs font-semibold">Ingredientes</span>
            <span className="text-[10px] bg-[#FF5500] text-white px-1.5 py-0.2 rounded-full font-bold ml-0.5">
              {ingredientsList.length}
            </span>
          </button>
        </div>

        {/* Ingredients Quick View Drawer / Modal */}
        <AnimatePresence>
          {showIngredientsModal && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-3 right-3 z-30 bg-[#14100E] border border-orange-500/40 rounded-2xl p-4 shadow-2xl max-h-[70vh] flex flex-col space-y-3"
            >
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <h3 className="text-sm font-bold text-amber-400 font-display flex items-center gap-2">
                  <span>🥗 Ingredientes ({ingredientsList.length})</span>
                </h3>
                <button
                  onClick={() => setShowIngredientsModal(false)}
                  className="text-stone-400 hover:text-white p-1 rounded-lg bg-[#1C1816]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-y-auto space-y-2 pr-1 custom-scrollbar text-xs">
                {ingredientsList.map((ing, idx) => {
                  const isChecked = !!checkedIngredients[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleIngredient(idx)}
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-[#1C1816]/50 border-stone-800 text-stone-500 line-through'
                          : 'bg-[#1C1816] border-stone-800/80 text-stone-200'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded-md flex items-center justify-center border transition-colors flex-shrink-0 ${
                        isChecked ? 'bg-[#FF5500] border-[#FF5500] text-white' : 'border-stone-600 bg-stone-800'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="leading-snug font-medium">{ing}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cooking Step Main Content */}
        <div className="flex-1 flex flex-col justify-between p-4 sm:p-5 space-y-3 sm:space-y-4 overflow-y-auto custom-scrollbar relative z-10">
          {/* Progress Indicator */}
          <div className="space-y-2 pt-1 px-0.5">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-[#FF6500] font-bold text-xs sm:text-sm tracking-wide">
                Paso {currentStepIndex + 1} de {totalSteps}
              </span>
              <span className="text-stone-400 font-medium text-xs">
                {Math.round(((currentStepIndex + 1) / totalSteps) * 100)}% completado
              </span>
            </div>
            {/* Progress Track */}
            <div className="w-full bg-[#1C1816] h-2 rounded-full overflow-hidden border border-stone-800/80 p-[1px]">
              <motion.div
                className="bg-gradient-to-r from-[#FF5500] to-[#FF8A1A] h-full rounded-full shadow-[0_0_12px_rgba(255,85,0,0.6)]"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Current Active Step Highlighted Card */}
          <motion.div
            key={currentStepIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex-1 bg-[#14100E] border border-orange-500/35 rounded-[28px] p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between space-y-4 my-1 relative overflow-hidden"
          >
            <div className="space-y-4">
              {/* Paso Badge */}
              <div>
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#FF5500] to-[#FF7700] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-[0_4px_14px_rgba(255,85,0,0.35)]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>Paso {currentStepIndex + 1}</span>
                </div>
              </div>

              {/* Step Description Text - High Contrast, SemiBold */}
              <p className="text-base sm:text-lg font-semibold text-stone-100 leading-relaxed font-sans tracking-wide">
                {currentStepText}
              </p>

              {/* Step Gastronomic Image */}
              <div className="rounded-2xl overflow-hidden border border-stone-800/80 shadow-lg aspect-[16/9] sm:aspect-[16/10] bg-stone-900 group relative">
                <img
                  src={getRecipeImageSrc(recipe)}
                  alt={`Paso ${currentStepIndex + 1}`}
                  className="w-full h-full object-cover brightness-[0.95] contrast-[1.05] group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              {/* Chef Tip Card */}
              <div className="bg-[#0A0807] border border-stone-800/80 rounded-2xl p-3.5 space-y-1.5 shadow-inner">
                <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Consejo del chef</span>
                </div>
                <p className="text-stone-400 text-xs leading-relaxed font-medium">
                  {tipsList[currentStepIndex % tipsList.length]}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Steps Carousel Dots Preview */}
          <div className="flex items-center justify-center gap-2 py-1">
            {stepsList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentStepIndex
                    ? 'w-7 bg-gradient-to-r from-[#FF5500] to-[#FF8A1A] shadow-[0_0_8px_rgba(255,85,0,0.6)]'
                    : 'w-2 bg-[#221D1B] hover:bg-stone-700'
                }`}
                title={`Ir al paso ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Step Navigation Bar */}
        <div className="p-4 bg-[#120E0D] border-t border-stone-800/80 grid grid-cols-2 gap-3 relative z-10">
          <button
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            className={`flex items-center justify-center gap-2 font-bold py-3.5 px-4 rounded-2xl text-sm transition-all cursor-pointer ${
              currentStepIndex === 0
                ? 'bg-[#1A1614] text-stone-600 border border-stone-900 cursor-not-allowed opacity-40'
                : 'bg-[#1C1816] hover:bg-[#26201D] text-stone-200 border border-stone-800 active:scale-98 shadow-sm'
            }`}
            id="cooking-mode-prev-btn"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <button
            onClick={handleNextStep}
            disabled={currentStepIndex === totalSteps - 1}
            className={`flex items-center justify-center gap-2 font-extrabold py-3.5 px-4 rounded-2xl text-sm transition-all cursor-pointer relative overflow-hidden ${
              currentStepIndex === totalSteps - 1
                ? 'bg-amber-900/40 text-amber-200/50 cursor-not-allowed opacity-50 border border-amber-900/30'
                : 'bg-gradient-to-r from-[#FF5500] via-[#FF6600] to-[#FF8A1A] hover:from-[#FF6600] hover:to-[#FF9525] text-white shadow-[0_8px_20px_rgba(255,85,0,0.35)] active:scale-98 border-t border-white/20'
            }`}
            id="cooking-mode-next-btn"
          >
            <span>{currentStepIndex === totalSteps - 1 ? 'Último paso' : 'Siguiente'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // STANDARD PREMIUM RECIPE DETAIL VIEW (WARM CREAM CANVASES AS PER REFERENCE IMAGE)
  return (
    <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full bg-[#FAF7F2] min-h-full">
      {/* Scrollable Recipe Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-5 custom-scrollbar pb-6">
        
        {/* Top Header Controls Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between gap-2"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-stone-900 hover:text-orange-600 font-extrabold text-xs sm:text-sm bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-stone-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)] active:scale-95 transition-all cursor-pointer"
            id="detail-top-back-btn"
          >
            <ArrowLeft className="w-4 h-4 text-orange-600" />
            <span>Volver</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Favorita Badge */}
            {isFavorite && (
              <span className="bg-white/95 text-red-600 font-extrabold px-3 py-1.5 rounded-full border border-red-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center gap-1.5 text-xs">
                <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                <span>Favorita</span>
              </span>
            )}

            {/* Category Tag Pill */}
            <span className="text-xs font-extrabold bg-[#FEF3D6] text-amber-950 px-3.5 py-1.5 rounded-full border border-amber-300/70 flex items-center gap-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <ChefHat className="w-3.5 h-3.5 text-orange-600" />
              <span>{tagText}</span>
            </span>

            {/* Heart Favorite Floating Circle */}
            {onToggleFavorite && (
              <button
                onClick={onToggleFavorite}
                className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-md border border-stone-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
                id="detail-favorite-btn"
                title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                <Heart
                  className={`w-4 h-4 transition-transform ${
                    isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-stone-400 hover:text-red-500'
                  }`}
                />
              </button>
            )}
          </div>
        </motion.div>

        {/* 1. Photography Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.12)] border border-stone-200/60 aspect-[4/3] bg-stone-900 group"
        >
          <img
            src={getRecipeImageSrc(recipe)}
            alt={name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.98] contrast-[1.06]"
          />
          {/* Subtle bottom gradient mask for smooth text integration */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-black/10"></div>
        </motion.div>

        {/* 2. Recipe Title & Rating */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-1.5 text-left pt-1"
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F1A17] font-display leading-tight tracking-tight">
            {name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800 pt-0.5">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-extrabold text-[#1F1A17]">4.9</span>
            <span className="text-stone-400 font-normal">(120)</span>
          </div>
        </motion.div>

        {/* 3. Modo Cocina Hero Button */}
        {stepsList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <button
              onClick={handleStartCookingMode}
              className="w-full bg-gradient-to-r from-[#FF5500] via-[#FF6500] to-[#FF8A1A] hover:from-[#FF6500] hover:to-[#FF9525] active:scale-[0.98] text-white font-extrabold py-3.5 px-5 rounded-2xl shadow-[0_12px_28px_rgba(255,85,0,0.35)] transition-all flex items-center justify-between text-base cursor-pointer border border-amber-300/40 relative overflow-hidden group"
              id="start-modo-cocina-btn"
            >
              <div className="absolute inset-x-0 top-0 h-[1px] bg-white/30"></div>
              <div className="flex items-center gap-2.5">
                <ChefHat className="w-5 h-5 text-white shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                <span className="tracking-wide text-lg">Modo cocina</span>
              </div>
              <div className="bg-orange-800/40 border border-white/20 text-white text-[11px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1 tracking-wider uppercase backdrop-blur-xs">
                <span>PASO A PASO</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </button>
          </motion.div>
        )}

        {/* 4. Single Combined Info Card (Tiempo y Porciones arriba, Dificultad abajo) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-3xl border border-stone-200/70 shadow-[0_10px_30px_rgba(0,0,0,0.03)] overflow-hidden divide-y divide-stone-100/80"
        >
          {/* Top Grid: Tiempo & Porciones */}
          <div className="grid grid-cols-2 divide-x divide-stone-100 p-4 sm:p-5 gap-2">
            {/* TIEMPO */}
            <div className="flex items-start gap-2.5 sm:gap-3 pr-2 sm:pr-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-orange-100/80 text-orange-600 flex items-center justify-center shrink-0 border border-orange-200/40 mt-0.5">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-widest block mb-1">TIEMPO</span>
                <p className="text-xs sm:text-sm font-bold text-[#1F1A17] leading-relaxed">
                  {timeText}
                </p>
              </div>
            </div>

            {/* PORCIONES */}
            <div className="flex items-start gap-2.5 sm:gap-3 pl-3 sm:pl-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-100/80 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200/40 mt-0.5">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-widest block mb-1">PORCIONES</span>
                <p className="text-xs sm:text-sm font-bold text-[#1F1A17] leading-relaxed">
                  {servingsText}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Banner: Dificultad */}
          <div className="bg-[#FAF7F2]/80 px-4 py-3 sm:px-5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-100/80 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/40">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">DIFICULTAD:</span>
                <span className="text-xs sm:text-sm font-bold text-[#1F1A17]">Fácil</span>
              </div>
            </div>
            <span className="bg-emerald-100/80 text-emerald-800 text-[11px] font-extrabold px-3 py-1 rounded-full border border-emerald-200/60 shadow-2xs">
              Ideal para todos
            </span>
          </div>
        </motion.div>

        {/* 5. Section: Ingredientes */}
        {ingredientsList.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-4"
          >
            {/* Card Header with Title, Subtitle, and Element Count */}
            <div className="border-b border-stone-100 pb-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1F1A17] font-display flex items-center gap-2.5">
                  <span className="text-2xl sm:text-3xl">🧺</span>
                  <span>Ingredientes</span>
                </h2>
                <span className="text-xs font-extrabold text-amber-950 bg-[#FEF3D6] px-3.5 py-1 rounded-full border border-amber-300/60 shadow-2xs">
                  {ingredientsList.length} elementos
                </span>
              </div>
              <p className="text-stone-400 text-xs sm:text-sm font-medium pl-0.5">
                Organiza y prepara cada ingrediente para una receta perfecta.
              </p>
            </div>

            {/* Interactive Checkable Ingredients List */}
            <ul className="space-y-2.5 pt-0.5">
              {ingredientsList.map((ingredient, idx) => {
                const isChecked = !!checkedIngredients[idx];
                const { emoji, qtySubtext } = parseIngredientDetails(ingredient);

                return (
                  <li
                    key={idx}
                    onClick={() => toggleIngredient(idx)}
                    className={`flex items-center gap-3.5 p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-stone-50/80 border-stone-200/80 text-stone-400'
                        : 'bg-white hover:bg-orange-50/30 border-stone-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] text-[#1F1A17]'
                    }`}
                  >
                    {/* Rounded Circular Checkbox */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all flex-shrink-0 ${
                      isChecked
                        ? 'bg-[#FF5500] border-[#FF5500] text-white shadow-2xs'
                        : 'border-orange-400/80 bg-white hover:border-orange-500'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    {/* Food Miniature Circle */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FAF7F2] border border-amber-200/60 flex items-center justify-center text-xl shrink-0 shadow-2xs">
                      {emoji}
                    </div>

                    {/* Title and Quantity Subtext */}
                    <div className="flex-1 min-w-0">
                      <span className={`text-sm sm:text-base font-extrabold leading-tight block ${
                        isChecked ? 'line-through text-stone-400 font-medium' : 'text-[#1F1A17]'
                      }`}>
                        {ingredient}
                      </span>
                      <span className="text-xs text-stone-400 font-medium block mt-0.5">
                        {qtySubtext}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* "Agregar a lista de compras" Action Button */}
            {onAddToShoppingList && (
              <div className="pt-2 border-t border-stone-100">
                <button
                  onClick={handleAddToShoppingListClick}
                  className="w-full bg-gradient-to-r from-[#FF5500] via-[#FF6500] to-[#FF8A1A] hover:from-[#FF6500] hover:to-[#FF9525] active:scale-[0.98] text-white font-extrabold py-3.5 px-5 rounded-2xl shadow-[0_10px_25px_rgba(255,85,0,0.32)] transition-all flex items-center justify-between text-sm sm:text-base cursor-pointer border border-amber-300/40 relative overflow-hidden group"
                  id="add-ingredients-to-shopping-list-btn"
                >
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-white/30"></div>
                  <div className="flex items-center gap-2.5">
                    <ShoppingCart className="w-5 h-5 text-white shrink-0 group-hover:scale-110 transition-transform" />
                    <span>Agregar a lista de compras</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/90" />
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* 6. Section: Descripción */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] space-y-2.5"
        >
          <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
            <h2 className="text-lg font-extrabold text-[#1F1A17] font-display flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-amber-100/80 flex items-center justify-center text-amber-700">
                <BookOpen className="w-4 h-4" />
              </div>
              <span>Descripción</span>
            </h2>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </div>

          <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-normal">
            {recipe.description || 'Jugoso rollo de carne molida relleno de queso derretido, vegetales y especias caseras. Perfecto para compartir en familia.'}
          </p>
        </motion.div>

        {/* 7. Section: Preparación Paso a Paso (Expanded View) */}
        {stepsList.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-4"
          >
            {/* Title & Modo Cocina Header */}
            <div className="border-b border-stone-100 pb-3.5 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100/80 border border-amber-200/60 flex items-center justify-center text-amber-700 shrink-0">
                    <UtensilsCrossed className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#1F1A17] font-display">
                      Preparación paso a paso
                    </h2>
                  </div>
                </div>
                
                <button
                  onClick={handleStartCookingMode}
                  className="text-xs font-extrabold text-[#FF5500] hover:text-[#e04b00] bg-orange-50 hover:bg-orange-100 px-3.5 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5 border border-orange-200/70 shadow-2xs shrink-0"
                  id="prep-modo-cocina-btn"
                >
                  <ChefHat className="w-4 h-4 text-[#FF5500]" />
                  <span>Modo cocina</span>
                </button>
              </div>
              <p className="text-stone-400 text-xs sm:text-sm font-medium pl-0.5">
                Sigue cada paso para lograr un resultado perfecto.
              </p>
            </div>

            {/* List of Step Cards */}
            <div className="space-y-3 pt-0.5">
              {stepsList.map((step, idx) => {
                const words = step.trim().split(' ');
                const firstWord = words[0];
                const restText = words.slice(1).join(' ');
                const emoji = getStepMiniatureEmoji(step, idx);

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setCurrentStepIndex(idx);
                      setIsCookingMode(true);
                    }}
                    className="flex items-center gap-3 sm:gap-3.5 p-3.5 sm:p-4 bg-white hover:bg-orange-50/30 rounded-2xl border border-stone-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all cursor-pointer group"
                  >
                    {/* Step Number Badge */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FF5500] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center shadow-2xs flex-shrink-0">
                      {idx + 1}
                    </div>

                    {/* Step Food Miniature Circle */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FAF7F2] border border-amber-200/60 flex items-center justify-center text-xl shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                      {emoji}
                    </div>

                    {/* Step Description Text with Bold Action Verb */}
                    <p className="text-xs sm:text-sm text-[#1F1A17] leading-relaxed font-medium flex-1 min-w-0">
                      <strong className="font-extrabold text-[#1F1A17]">{firstWord}</strong> {restText}
                    </p>

                    {/* Lateral Arrow */}
                    <ChevronRight className="w-4 h-4 text-orange-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>
                );
              })}
            </div>

            {/* Chef Tip Card */}
            <div className="bg-[#FEF8EB] border border-amber-200/80 rounded-2xl p-3.5 sm:p-4 flex items-center gap-3 relative overflow-hidden shadow-2xs mt-2">
              <div className="w-9 h-9 rounded-full bg-amber-400/20 text-amber-600 border border-amber-300/50 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-extrabold text-amber-900 block mb-0.5">
                  Consejo del chef:
                </span>
                <p className="text-xs text-amber-800/90 font-medium leading-normal">
                  Deja reposar 5 minutos antes de cortar para que los jugos se redistribuyan.
                </p>
              </div>
              <ChefHat className="w-12 h-12 text-amber-200/40 absolute -right-2 -bottom-2 pointer-events-none stroke-1" />
            </div>
          </motion.div>
        )}

        {/* 8. Return Button */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="pt-2 pb-4"
        >
          <button
            onClick={onBack}
            className="w-full bg-[#1F1A17] hover:bg-black active:scale-[0.98] text-stone-100 font-extrabold py-3.5 px-6 rounded-2xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base border border-stone-800"
            id="detail-bottom-back-btn"
          >
            <ArrowLeft className="w-4 h-4 text-orange-400" />
            <span>Regresar a la pantalla anterior</span>
          </button>
        </motion.div>

      </div>

      {/* Floating Shopping List Toast Banner */}
      <AnimatePresence>
        {showAddedToast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="absolute bottom-4 left-4 right-4 z-40 bg-[#1F1A17] text-stone-100 p-3.5 rounded-2xl shadow-2xl border border-orange-500/40 flex items-center justify-between gap-3 backdrop-blur-md"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-orange-600 rounded-xl text-white flex-shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">
                  ¡Ingredientes agregados!
                </p>
                <p className="text-[11px] text-amber-300/90 font-medium">
                  Añadidos a tu lista de compras
                </p>
              </div>
            </div>

            {onOpenShoppingList && (
              <button
                onClick={onOpenShoppingList}
                className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-extrabold text-xs px-3 py-2 rounded-xl transition-colors shrink-0 shadow-xs cursor-pointer flex items-center gap-1"
                id="toast-view-shopping-list-btn"
              >
                <span>Ver lista</span>
                <span className="bg-stone-900 text-amber-300 text-[10px] px-1.5 py-0.5 rounded-full font-mono">
                  {shoppingListCount}
                </span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

