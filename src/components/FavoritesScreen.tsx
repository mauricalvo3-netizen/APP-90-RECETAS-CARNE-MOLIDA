import { motion, AnimatePresence } from 'motion/react';
import { Heart, ArrowLeft, Clock, BookOpen } from 'lucide-react';
import { SampleRecipe, getRecipeImageSrc, getRecipeMinutes } from '../data/recipes';

interface FavoritesScreenProps {
  favoriteRecipes: SampleRecipe[];
  onSelectRecipe: (recipe: SampleRecipe) => void;
  onBackToHome: () => void;
  onGoToLibrary: () => void;
}

export function FavoritesScreen({
  favoriteRecipes,
  onSelectRecipe,
  onBackToHome,
  onGoToLibrary,
}: FavoritesScreenProps) {
  return (
    <div className="flex-1 flex flex-col justify-between p-4 sm:p-5 max-w-md mx-auto w-full">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-3 pt-1 pb-2"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onBackToHome}
              className="p-2 bg-white/90 backdrop-blur-md rounded-xl text-stone-700 hover:text-orange-600 border border-amber-200 shadow-xs cursor-pointer transition-colors"
              id="favorites-back-btn"
              title="Volver a Inicio"
            >
              <ArrowLeft className="w-5 h-5 text-orange-600" />
            </button>
            <div>
              <h1 className="text-2xl font-extrabold text-stone-900 font-display leading-tight flex items-center gap-2">
                <span>Mis favoritas</span>
                <Heart className="w-5 h-5 text-red-500 fill-red-500 shrink-0" />
              </h1>
              <p className="text-xs text-amber-900 font-medium">
                Tus recetas guardadas para cocinar
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-red-700 bg-red-100 px-2.5 py-1 rounded-full border border-red-200 shadow-xs">
            {favoriteRecipes.length} {favoriteRecipes.length === 1 ? 'receta' : 'recetas'}
          </span>
        </div>
      </motion.div>

      {/* Recipes Grid or Empty State */}
      <div className="flex-1 overflow-y-auto pr-1 -mr-1 my-2 py-1 space-y-3 custom-scrollbar">
        {favoriteRecipes.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-2 gap-3"
          >
            <AnimatePresence>
              {favoriteRecipes.map((recipe) => (
                <motion.div
                  key={recipe.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => onSelectRecipe(recipe)}
                  className="group bg-white/95 backdrop-blur-xs rounded-2xl border border-amber-200/90 shadow-sm overflow-hidden hover:shadow-md active:scale-[0.97] transition-all cursor-pointer flex flex-col justify-between"
                >
                  {/* Recipe Photo */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                    <img
                      src={getRecipeImageSrc(recipe)}
                      alt={recipe.nombre || recipe.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Time Badge */}
                    <div className="absolute bottom-1.5 right-1.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-amber-300" />
                      <span>{getRecipeMinutes(recipe)} min</span>
                    </div>

                    {/* Favorite Heart Badge */}
                    <div className="absolute top-1.5 right-1.5 bg-white/90 backdrop-blur-md p-1 rounded-full shadow-xs">
                      <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    </div>
                  </div>

                  {/* Recipe Name */}
                  <div className="p-3 bg-white flex flex-col justify-between flex-1">
                    <h2 className="text-xs sm:text-sm font-bold text-stone-900 font-display leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {recipe.nombre || recipe.title}
                    </h2>
                    <span className="text-[10px] text-stone-500 font-medium truncate mt-1">
                      {recipe.categoria || recipe.tag}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 px-5 bg-white/90 rounded-3xl border border-amber-200/90 shadow-sm space-y-4 my-auto"
          >
            <div className="w-14 h-14 mx-auto bg-red-50 rounded-2xl flex items-center justify-center text-red-500 border border-red-100 shadow-xs">
              <Heart className="w-7 h-7 text-red-400" />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-stone-900 font-bold text-base font-display">
                Sin recetas favoritas
              </h3>
              <p className="text-stone-600 text-sm font-medium leading-relaxed max-w-xs mx-auto">
                Aún no has agregado recetas a Favoritos.
              </p>
            </div>

            <button
              onClick={onGoToLibrary}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 active:scale-95 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-all shadow-md cursor-pointer"
              id="favorites-empty-explore-btn"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explorar las 90 recetas</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
