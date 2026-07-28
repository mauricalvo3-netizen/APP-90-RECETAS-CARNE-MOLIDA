import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, BookOpen } from 'lucide-react';
import { SAMPLE_RECIPES, SampleRecipe } from '../data/recipes';

interface RecipeLibraryScreenProps {
  onSelectRecipe: (recipe: SampleRecipe) => void;
}

export function RecipeLibraryScreen({ onSelectRecipe }: RecipeLibraryScreenProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredRecipes = SAMPLE_RECIPES.filter((recipe) => {
    const query = searchQuery.toLowerCase().trim();
    const recipeName = (recipe.nombre || recipe.title || '').toLowerCase();
    const recipeCat = (recipe.categoria || recipe.tag || '').toLowerCase();
    return recipeName.includes(query) || recipeCat.includes(query);
  });

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
            <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl text-white shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-stone-900 font-display leading-tight">
                Todas las recetas
              </h1>
              <p className="text-xs text-amber-900 font-medium">
                Explora el recetario completo
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-900 bg-amber-200/80 px-2.5 py-1 rounded-full border border-amber-300">
            {filteredRecipes.length} opciones
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative mt-2">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4 text-orange-600" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar receta..."
            className="w-full pl-10 pr-9 py-3 bg-white/90 backdrop-blur-xs border border-amber-200/90 rounded-2xl text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-xs transition-all font-body"
            id="search-recipe-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 cursor-pointer"
              id="clear-search-btn"
            >
              <X className="w-4 h-4 bg-stone-200 rounded-full p-0.5" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Recipes Grid */}
      <div className="flex-1 overflow-y-auto pr-1 -mr-1 my-2 py-1 space-y-3 custom-scrollbar">
        {filteredRecipes.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-2 gap-3"
          >
            <AnimatePresence>
              {filteredRecipes.map((recipe) => (
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
                  {/* Recipe Photo Only */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                    <img
                      src={recipe.image}
                      alt={recipe.nombre || recipe.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Recipe Name Only */}
                  <div className="p-3 bg-white">
                    <h2 className="text-xs sm:text-sm font-bold text-stone-900 font-display leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {recipe.nombre || recipe.title}
                    </h2>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 px-4 bg-white/80 rounded-2xl border border-amber-200/80 shadow-xs"
          >
            <p className="text-stone-600 text-sm font-medium">
              No se encontraron recetas con "<span className="font-bold text-amber-900">{searchQuery}</span>".
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-3 text-xs text-orange-600 hover:text-orange-700 font-bold underline cursor-pointer"
            >
              Ver todas las recetas
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
