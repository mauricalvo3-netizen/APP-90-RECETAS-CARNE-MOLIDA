import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Clock, Users, ChefHat, Check, Sparkles, Heart, Flame, ChevronLeft, ChevronRight, X, ListChecks, ShoppingCart } from 'lucide-react';
import { SampleRecipe, getRecipeImageSrc } from '../data/recipes';

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
  const timeText = recipe.tiempoTexto || recipe.prepTime;
  const ingredientsList = recipe.ingredientes || recipe.ingredients || [];
  const stepsList = recipe.preparacion || recipe.steps || [];
  const tagText = recipe.categoria || recipe.tag || 'Rollos y rollitos';

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

    return (
      <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full bg-stone-900 text-stone-100 min-h-full relative overflow-hidden">
        {/* Header Bar */}
        <div className="p-4 bg-stone-950/90 border-b border-stone-800 flex items-center justify-between gap-3 shadow-md">
          <button
            onClick={handleExitCookingMode}
            className="flex items-center gap-1.5 text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 font-bold text-xs px-3 py-2 rounded-xl transition-colors cursor-pointer border border-stone-700"
            id="exit-cooking-mode-btn"
          >
            <X className="w-4 h-4 text-orange-400" />
            <span>Salir</span>
          </button>

          <div className="flex-1 text-center truncate px-1">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-orange-500 block">
              Modo cocina
            </span>
            <h2 className="text-sm font-bold text-white truncate font-display">
              {name}
            </h2>
          </div>

          <button
            onClick={() => setShowIngredientsModal(!showIngredientsModal)}
            className="flex items-center gap-1.5 text-amber-300 bg-amber-950/80 hover:bg-amber-900/80 border border-amber-700/60 font-bold text-xs px-2.5 py-2 rounded-xl transition-colors cursor-pointer"
            id="cooking-mode-ingredients-btn"
            title="Ver ingredientes"
          >
            <ListChecks className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Ingredientes</span>
            <span className="text-[10px] bg-amber-800 text-amber-100 px-1.5 py-0.5 rounded-full font-mono">
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
              className="absolute top-16 left-3 right-3 z-30 bg-stone-950 border border-amber-500/40 rounded-2xl p-4 shadow-2xl max-h-[70vh] flex flex-col space-y-3"
            >
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <h3 className="text-sm font-bold text-amber-400 font-display flex items-center gap-2">
                  <span>🥗 Ingredientes ({ingredientsList.length})</span>
                </h3>
                <button
                  onClick={() => setShowIngredientsModal(false)}
                  className="text-stone-400 hover:text-white p-1 rounded-lg bg-stone-800"
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
                          ? 'bg-stone-900 border-stone-800 text-stone-500 line-through'
                          : 'bg-stone-900/90 border-stone-800 text-stone-200'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded-md flex items-center justify-center border transition-colors flex-shrink-0 ${
                        isChecked ? 'bg-orange-600 border-orange-600 text-white' : 'border-stone-600 bg-stone-800'
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
        <div className="flex-1 flex flex-col justify-between p-5 space-y-4 overflow-y-auto custom-scrollbar">
          {/* Progress Indicator */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs font-bold text-stone-400">
              <span className="text-orange-400 font-mono text-sm">
                Paso {currentStepIndex + 1} de {totalSteps}
              </span>
              <span className="text-stone-500">
                {Math.round(((currentStepIndex + 1) / totalSteps) * 100)}% completado
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Current Active Step Highlighted Card */}
          <motion.div
            key={currentStepIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex-1 bg-stone-950/80 border-2 border-orange-500/80 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-4 my-2"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-orange-600 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-xs">
                <Flame className="w-3.5 h-3.5 fill-white" />
                <span>Paso {currentStepIndex + 1}</span>
              </div>

              {/* Large Step Description */}
              <p className="text-lg sm:text-xl font-medium text-stone-100 leading-relaxed font-body">
                {currentStepText}
              </p>
            </div>

            <div className="text-[11px] text-stone-500 italic pt-2 border-t border-stone-800/80">
              Usa los botones de abajo para navegar entre los pasos de preparación.
            </div>
          </motion.div>

          {/* Steps Carousel Dots Preview */}
          <div className="flex items-center justify-center gap-1.5 py-1">
            {stepsList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentStepIndex
                    ? 'w-6 bg-orange-500'
                    : 'w-2 bg-stone-700 hover:bg-stone-600'
                }`}
                title={`Ir al paso ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Step Navigation Bar */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 grid grid-cols-2 gap-3">
          <button
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            className={`flex items-center justify-center gap-2 font-bold py-3.5 px-4 rounded-2xl text-sm transition-all cursor-pointer ${
              currentStepIndex === 0
                ? 'bg-stone-800 text-stone-600 cursor-not-allowed opacity-50'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-100 border border-stone-700 active:scale-95'
            }`}
            id="cooking-mode-prev-btn"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Anterior</span>
          </button>

          <button
            onClick={handleNextStep}
            disabled={currentStepIndex === totalSteps - 1}
            className={`flex items-center justify-center gap-2 font-bold py-3.5 px-4 rounded-2xl text-sm transition-all cursor-pointer ${
              currentStepIndex === totalSteps - 1
                ? 'bg-amber-600/50 text-amber-200 cursor-not-allowed opacity-60'
                : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-md active:scale-95'
            }`}
            id="cooking-mode-next-btn"
          >
            <span>{currentStepIndex === totalSteps - 1 ? 'Último paso' : 'Siguiente'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // STANDARD RECIPE DETAIL VIEW
  return (
    <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full bg-gradient-to-b from-amber-50/90 via-orange-50/30 to-amber-100/60 min-h-full">
      {/* Scrollable Recipe Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-6 custom-scrollbar pb-6">
        
        {/* Top Floating Back Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between gap-2"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-stone-800 hover:text-orange-700 font-bold text-xs sm:text-sm bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-amber-200 shadow-xs active:scale-95 transition-all cursor-pointer"
            id="detail-top-back-btn"
          >
            <ArrowLeft className="w-4 h-4 text-orange-600" />
            <span>Volver</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Heart Favorite Button in Header */}
            {onToggleFavorite && (
              <button
                onClick={onToggleFavorite}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-xs active:scale-90 transition-all cursor-pointer font-bold text-xs ${
                  isFavorite
                    ? 'bg-red-50 border-red-200 text-red-600'
                    : 'bg-white/90 backdrop-blur-md border-amber-200 text-stone-700 hover:text-red-500'
                }`}
                id="detail-favorite-btn"
                title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                <Heart
                  className={`w-4 h-4 transition-transform ${
                    isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-stone-500'
                  }`}
                />
                <span className="hidden sm:inline">{isFavorite ? 'Favorita' : 'Favorito'}</span>
              </button>
            )}

            <span className="text-xs font-bold bg-amber-200/90 text-amber-950 px-3 py-1.5 rounded-full border border-amber-300 flex items-center gap-1 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              {tagText}
            </span>
          </div>
        </motion.div>

        {/* 1. Large Recipe Photo with rounded corners */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-3xl overflow-hidden shadow-lg border border-amber-200/80 aspect-[4/3] bg-stone-100 group"
        >
          <img
            src={getRecipeImageSrc(recipe)}
            alt={name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-black/10"></div>
          
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-900 shadow-sm flex items-center gap-1.5 border border-amber-200/50">
            <ChefHat className="w-3.5 h-3.5 text-orange-600" />
            <span>{tagText}</span>
          </div>

          {/* Heart Favorite Button Overlay on Photo */}
          {onToggleFavorite && (
            <button
              onClick={onToggleFavorite}
              className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-md border border-amber-200/50 active:scale-90 transition-transform cursor-pointer"
              id="detail-photo-favorite-btn"
              title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-stone-600 hover:text-red-500'
                }`}
              />
            </button>
          )}
        </motion.div>

        {/* 2. Recipe Title & Modo Cocina Hero Button */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-3 text-left"
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display leading-tight tracking-tight">
            {name}
          </h1>

          {/* Prominent "Modo cocina" Action Button */}
          {stepsList.length > 0 && (
            <button
              onClick={handleStartCookingMode}
              className="w-full bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-700 hover:to-amber-700 active:scale-[0.98] text-white font-bold py-3 px-5 rounded-2xl shadow-md shadow-orange-600/20 transition-all flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer border border-orange-400/30"
              id="start-modo-cocina-btn"
            >
              <ChefHat className="w-5 h-5 text-amber-200" />
              <span>Modo cocina</span>
              <span className="text-[10px] bg-amber-200/30 font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider ml-1">
                Paso a paso
              </span>
            </button>
          )}
        </motion.div>

        {/* 3. Available Recipe Info (Prep Time & Servings) - Only if available */}
        {(timeText || recipe.servings) && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-col sm:flex-row sm:items-center gap-3 p-3.5 bg-white/90 backdrop-blur-xs rounded-2xl border border-amber-200/90 shadow-xs"
          >
            {timeText && (
              <div className="flex-1 flex items-center gap-2.5 px-2">
                <div className="p-2 bg-orange-100 rounded-xl text-orange-600 flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Tiempo</span>
                  <span className="text-xs sm:text-sm font-bold text-stone-800 leading-snug">{timeText}</span>
                </div>
              </div>
            )}

            {timeText && recipe.servings && (
              <div className="hidden sm:block w-[1px] h-8 bg-amber-200/80"></div>
            )}

            {recipe.servings && (
              <div className="flex-1 flex items-center gap-2.5 px-2">
                <div className="p-2 bg-amber-100 rounded-xl text-amber-700 flex-shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Porciones</span>
                  <span className="text-xs sm:text-sm font-bold text-stone-800">{recipe.servings}</span>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* 4. Section: Ingredientes */}
        {ingredientsList.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-xs rounded-3xl p-5 border border-amber-200/90 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h2 className="text-lg font-bold text-stone-900 font-display flex items-center gap-2">
                <span className="text-xl">🥗</span>
                <span>Ingredientes</span>
              </h2>
              <span className="text-xs font-semibold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                {ingredientsList.length} elementos
              </span>
            </div>

            <ul className="space-y-2.5">
              {ingredientsList.map((ingredient, idx) => {
                const isChecked = !!checkedIngredients[idx];
                return (
                  <li
                    key={idx}
                    onClick={() => toggleIngredient(idx)}
                    className={`flex items-start gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-amber-50/50 border-amber-200 text-stone-400 line-through'
                        : 'bg-stone-50/80 hover:bg-amber-50/80 border-stone-200/70 text-stone-800'
                    }`}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center border transition-colors flex-shrink-0 ${
                      isChecked
                        ? 'bg-orange-600 border-orange-600 text-white'
                        : 'border-stone-300 bg-white'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className="text-sm font-medium leading-snug font-body">
                      {ingredient}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* "Agregar a lista de compras" Action Button */}
            {onAddToShoppingList && (
              <div className="pt-2 border-t border-amber-100">
                <button
                  onClick={handleAddToShoppingListClick}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 active:scale-[0.98] text-white font-bold py-3 px-4 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer border border-orange-400/30"
                  id="add-ingredients-to-shopping-list-btn"
                >
                  <ShoppingCart className="w-5 h-5 text-amber-100" />
                  <span>Agregar a lista de compras</span>
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* 5. Section: Preparación */}
        {stepsList.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="bg-white/95 backdrop-blur-xs rounded-3xl p-5 border border-amber-200/90 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h2 className="text-lg font-bold text-stone-900 font-display flex items-center gap-2">
                <span className="text-xl">🍳</span>
                <span>Preparación paso a paso</span>
              </h2>
              
              <button
                onClick={handleStartCookingMode}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-100 hover:bg-orange-200 px-2.5 py-1 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                id="prep-modo-cocina-btn"
              >
                <ChefHat className="w-3.5 h-3.5" />
                <span>Modo cocina</span>
              </button>
            </div>

            <div className="space-y-4 pt-1">
              {stepsList.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 bg-amber-50/60 rounded-2xl border border-amber-200/70"
                >
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white font-extrabold text-xs flex items-center justify-center shadow-xs flex-shrink-0 mt-0.5 font-display">
                    {idx + 1}
                  </div>
                  <p className="text-sm sm:text-base text-stone-800 font-medium leading-relaxed font-body">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 6. Return Button at bottom of content */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="pt-2 pb-4"
        >
          <button
            onClick={onBack}
            className="w-full bg-stone-900 hover:bg-stone-800 active:scale-[0.98] text-amber-100 font-bold py-3.5 px-6 rounded-2xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base border border-stone-700"
            id="detail-bottom-back-btn"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
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
            className="absolute bottom-4 left-4 right-4 z-40 bg-stone-900/95 text-stone-100 p-3.5 rounded-2xl shadow-2xl border border-amber-500/50 flex items-center justify-between gap-3 backdrop-blur-md"
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

