import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, RefreshCw, ChefHat, Sparkles, Clock, Utensils } from 'lucide-react';
import { SAMPLE_RECIPES, SampleRecipe } from '../data/recipes';
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
    <div className="flex-1 flex flex-col justify-between p-5 space-y-4 max-w-md mx-auto w-full">
      {/* Top Bar Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between pt-1 border-b border-amber-200/60 pb-3"
      >
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1.5 text-stone-700 hover:text-orange-700 font-semibold text-xs sm:text-sm bg-white/80 px-3 py-1.5 rounded-full border border-amber-200/80 shadow-xs active:scale-95 transition-all cursor-pointer"
          id="rec-back-home-btn"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>Inicio</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold bg-amber-200/80 text-amber-950 px-2.5 py-1 rounded-full border border-amber-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-orange-600" />
            Recomendación para hoy
          </span>
          <img
            src={appLogo}
            alt="Logo"
            referrerPolicy="no-referrer"
            className="w-7 h-7 rounded-lg object-cover border border-amber-300"
          />
        </div>
      </motion.div>

      {/* Main Recommendation Card Container */}
      <div className="flex-1 flex flex-col justify-center my-auto py-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRecipe.id}
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl border border-amber-200/90 shadow-xl overflow-hidden flex flex-col"
          >
            {/* Large Recipe Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
              <img
                src={currentRecipe.image}
                alt={currentRecipe.nombre || currentRecipe.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-transparent to-black/10"></div>
              
              {/* Badge Tag */}
              <div className="absolute top-3 left-3 bg-amber-900/90 backdrop-blur-md text-amber-100 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30 shadow-md flex items-center gap-1.5">
                <ChefHat className="w-3.5 h-3.5 text-amber-300" />
                <span>{currentRecipe.categoria || currentRecipe.tag}</span>
              </div>

              {/* Prep time badge */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-stone-800 text-xs font-bold px-2.5 py-1 rounded-full border border-stone-200 shadow-md flex items-center gap-1">
                <Clock className="w-3 h-3 text-orange-600" />
                <span>{currentRecipe.prepTime || currentRecipe.tiempoTexto}</span>
              </div>

              {/* Title overlay on lower image edge for maximum visual impact */}
              <div className="absolute bottom-0 inset-x-0 p-4 pt-10 bg-gradient-to-t from-stone-950 via-stone-900/80 to-transparent">
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display leading-snug drop-shadow-sm">
                  {currentRecipe.nombre || currentRecipe.title}
                </h2>
              </div>
            </div>

            {/* Description Body */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-body">
                {currentRecipe.tiempoTexto || currentRecipe.description}
              </p>

              <div className="pt-2 border-t border-amber-100 flex items-center justify-between text-xs text-amber-900 font-medium">
                <span className="flex items-center gap-1 text-orange-700">
                  <Utensils className="w-3.5 h-3.5" />
                  Sugerencia especial del día
                </span>
                <span className="text-stone-400">Opción {currentIndex + 1} de {SAMPLE_RECIPES.length}</span>
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
        className="space-y-3 pt-1 pb-1"
      >
        {/* Primary Protagonist Button: Ver receta completa */}
        <button
          onClick={() => onViewFullRecipe(currentRecipe)}
          className="w-full bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-700 hover:to-amber-700 active:scale-[0.98] text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-orange-600/20 transition-all duration-200 flex items-center justify-center text-base sm:text-lg gap-2 cursor-pointer border border-orange-400/30"
          id="ver-receta-completa-btn"
        >
          <span>Ver receta completa</span>
        </button>

        {/* Secondary Button: Mostrar otra receta */}
        <button
          onClick={handleNextRecipe}
          disabled={isRefreshing}
          className="w-full bg-amber-100/90 hover:bg-amber-200/80 active:scale-[0.98] text-amber-950 font-bold py-3 px-5 rounded-2xl border border-amber-300/80 transition-all duration-200 flex items-center justify-center text-sm sm:text-base gap-2 cursor-pointer shadow-xs disabled:opacity-50"
          id="mostrar-otra-receta-btn"
        >
          <RefreshCw className={`w-4 h-4 text-orange-700 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Mostrar otra receta</span>
        </button>
      </motion.div>
    </div>
  );
}
