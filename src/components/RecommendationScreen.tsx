import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, RefreshCw, ChefHat, Sparkles, Clock, Utensils } from 'lucide-react';
import { SAMPLE_RECIPES, SampleRecipe, getRecipeImageSrc } from '../data/recipes';
import appLogo from '../assets/images/app_logo_1785213158777.jpg';

interface RecommendationScreenProps {
  onBackToHome: () => void;
  onViewFullRecipe: (recipe: SampleRecipe) => void;
}

export function RecommendationScreen({ onBackToHome, onViewFullRecipe }: RecommendationScreenProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const currentRecipe = SAMPLE_RECIPES[currentIndex];

  const handleNextRecipe = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SAMPLE_RECIPES.length);
      setIsRefreshing(false);
    }, 200);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 sm:p-5 space-y-4 w-full m-0 rounded-none overflow-x-hidden overflow-y-auto custom-scrollbar relative bg-[#0D0D0D] text-stone-100">
      {/* Subtle ambient orange lighting glow behind main card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-orange-600/20 via-amber-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Top Bar Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 flex items-center justify-between pt-1 border-b border-orange-500/20 pb-3"
      >
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1.5 text-stone-200 hover:text-white font-semibold text-xs sm:text-sm bg-[#171311]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-orange-500/30 shadow-md active:scale-95 transition-all cursor-pointer"
          id="rec-back-home-btn"
        >
          <ArrowLeft className="w-4 h-4 text-orange-400" />
          <span>Inicio</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold bg-[#171311]/90 backdrop-blur-md text-amber-300 px-3 py-1 rounded-full border border-orange-500/30 shadow-md flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Recomendación para hoy</span>
          </span>
          <img
            src={appLogo}
            alt="Logo"
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-xl object-cover border border-amber-500/40 shadow-lg p-0.5 bg-stone-900"
          />
        </div>
      </motion.div>

      {/* Main Recommendation Card Container */}
      <div className="flex-1 flex flex-col justify-center my-auto py-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRecipe.id}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.35 }}
            className="bg-[#171311]/90 backdrop-blur-md rounded-3xl border border-orange-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col relative group"
          >
            <div className="absolute inset-0 ring-1 ring-inset ring-amber-500/20 rounded-3xl pointer-events-none z-20"></div>

            {/* Large Recipe Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
              <img
                src={getRecipeImageSrc(currentRecipe)}
                alt={currentRecipe.nombre || currentRecipe.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.95] contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171311] via-[#171311]/30 to-transparent"></div>
              
              {/* Badge Tag */}
              <div className="absolute top-3 left-3 bg-[#171311]/90 backdrop-blur-md text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full border border-orange-500/30 shadow-lg flex items-center gap-1.5">
                <ChefHat className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentRecipe.categoria || currentRecipe.tag}</span>
              </div>

              {/* Prep time badge */}
              <div className="absolute top-3 right-3 bg-[#171311]/90 backdrop-blur-md text-stone-200 text-xs font-bold px-2.5 py-1.5 rounded-full border border-orange-500/30 shadow-lg flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                <span>{currentRecipe.prepTime || currentRecipe.tiempoTexto}</span>
              </div>

              {/* Title overlay on lower image edge */}
              <div className="absolute bottom-0 inset-x-0 p-4 pt-10 bg-gradient-to-t from-[#171311] via-[#171311]/80 to-transparent">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white font-display leading-snug drop-shadow-md">
                  {currentRecipe.nombre || currentRecipe.title}
                </h2>
              </div>
            </div>

            {/* Description Body */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-normal">
                {currentRecipe.tiempoTexto || currentRecipe.description}
              </p>

              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-1.5 text-orange-400 font-semibold">
                  <Utensils className="w-3.5 h-3.5 text-orange-400" />
                  Sugerencia especial del día
                </span>
                <span className="text-stone-400 font-medium">
                  Opción {currentIndex + 1} de {SAMPLE_RECIPES.length}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Buttons Section */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="space-y-3 pt-1 pb-1 relative z-10"
      >
        {/* Primary Protagonist Button: Ver receta completa */}
        <button
          onClick={() => onViewFullRecipe(currentRecipe)}
          className="w-full bg-gradient-to-r from-[#FF6500] via-[#FF7500] to-[#FF8A1A] hover:from-[#FF7500] hover:to-[#FF9A2A] active:scale-[0.98] text-white font-extrabold py-3.5 sm:py-4 px-6 rounded-2xl shadow-[0_12px_32px_rgba(255,101,0,0.45)] transition-all duration-300 flex items-center justify-center text-base sm:text-lg gap-2.5 cursor-pointer border border-amber-300/40 relative overflow-hidden group"
          id="ver-receta-completa-btn"
        >
          <div className="absolute inset-x-0 top-0 h-[1px] bg-white/30"></div>
          <ChefHat className="w-5 h-5 text-white shrink-0 group-hover:rotate-12 transition-transform duration-300" />
          <span className="tracking-wide">Ver receta completa</span>
        </button>

        {/* Secondary Button: Mostrar otra receta */}
        <button
          onClick={handleNextRecipe}
          disabled={isRefreshing}
          className="w-full bg-[#171311]/90 hover:bg-stone-900 active:scale-[0.98] text-stone-200 font-bold py-3 sm:py-3.5 px-5 rounded-2xl border border-orange-500/30 transition-all duration-200 flex items-center justify-center text-sm sm:text-base gap-2 cursor-pointer shadow-lg disabled:opacity-50"
          id="mostrar-otra-receta-btn"
        >
          <RefreshCw className={`w-4 h-4 text-orange-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Mostrar otra receta</span>
        </button>
      </motion.div>
    </div>
  );
}

