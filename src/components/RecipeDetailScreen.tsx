import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Users, ChefHat, Check, Sparkles } from 'lucide-react';
import { SampleRecipe, getRecipeImageSrc } from '../data/recipes';

interface RecipeDetailScreenProps {
  recipe: SampleRecipe;
  onBack: () => void;
}

export function RecipeDetailScreen({ recipe, onBack }: RecipeDetailScreenProps) {
  // Track checked ingredients so the user can easily tick them off while cooking
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

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

  return (
    <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full bg-gradient-to-b from-amber-50/90 via-orange-50/30 to-amber-100/60 min-h-full">
      {/* Scrollable Recipe Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-6 custom-scrollbar pb-6">
        
        {/* Top Floating Back Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-stone-800 hover:text-orange-700 font-bold text-xs sm:text-sm bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-amber-200 shadow-xs active:scale-95 transition-all cursor-pointer"
            id="detail-top-back-btn"
          >
            <ArrowLeft className="w-4 h-4 text-orange-600" />
            <span>Volver</span>
          </button>

          <span className="text-xs font-bold bg-amber-200/90 text-amber-950 px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            {tagText}
          </span>
        </motion.div>

        {/* 1. Large Recipe Photo with rounded corners */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-3xl overflow-hidden shadow-lg border border-amber-200/80 aspect-[4/3] bg-stone-100"
        >
          <img
            src={getRecipeImageSrc(recipe)}
            alt={name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-black/10"></div>
          
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-900 shadow-sm flex items-center gap-1.5 border border-amber-200/50">
            <ChefHat className="w-3.5 h-3.5 text-orange-600" />
            <span>Capítulo 1: Rollos y rollitos</span>
          </div>
        </motion.div>

        {/* 2. Recipe Title */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-2 text-left"
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display leading-tight tracking-tight">
            {name}
          </h1>
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
            <div className="border-b border-amber-100 pb-3">
              <h2 className="text-lg font-bold text-stone-900 font-display flex items-center gap-2">
                <span className="text-xl">🍳</span>
                <span>Preparación paso a paso</span>
              </h2>
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
    </div>
  );
}
