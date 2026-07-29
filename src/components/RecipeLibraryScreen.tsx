import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, BookOpen, Filter, Clock, RotateCcw, Tag } from 'lucide-react';
import { SAMPLE_RECIPES, SampleRecipe, getRecipeImageSrc, getRecipeMinutes } from '../data/recipes';

interface RecipeLibraryScreenProps {
  onSelectRecipe: (recipe: SampleRecipe) => void;
}

export function RecipeLibraryScreen({ onSelectRecipe }: RecipeLibraryScreenProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>('');

  // Automatically extract unique categories from existing recipe data
  const categories = useMemo(() => {
    const cats = new Set<string>();
    SAMPLE_RECIPES.forEach((recipe) => {
      const cat = recipe.categoria || recipe.tag;
      if (cat) cats.add(cat.trim());
    });
    return Array.from(cats).sort();
  }, []);

  // Filter recipes based on combined search query (name & ingredients), category, and preparation time
  const filteredRecipes = useMemo(() => {
    return SAMPLE_RECIPES.filter((recipe) => {
      // 1. Search by name OR ingredients
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const recipeName = (recipe.nombre || recipe.title || '').toLowerCase();
        const nameMatches = recipeName.includes(query);

        const ingredientList = recipe.ingredientes || recipe.ingredients || [];
        const ingredientMatches = ingredientList.some((ing) =>
          ing.toLowerCase().includes(query)
        );

        if (!nameMatches && !ingredientMatches) {
          return false;
        }
      }

      // 2. Filter by category
      if (selectedCategory) {
        const recipeCat = recipe.categoria || recipe.tag || '';
        if (recipeCat !== selectedCategory) {
          return false;
        }
      }

      // 3. Filter by preparation time
      if (selectedTimeFilter) {
        const minutes = getRecipeMinutes(recipe);
        if (selectedTimeFilter === 'under_30' && minutes >= 30) {
          return false;
        }
        if (selectedTimeFilter === '30_to_60' && (minutes < 30 || minutes > 60)) {
          return false;
        }
        if (selectedTimeFilter === 'over_60' && minutes <= 60) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedTimeFilter]);

  const hasActiveFilters = Boolean(searchQuery || selectedCategory || selectedTimeFilter);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedTimeFilter('');
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 sm:p-5 max-w-md mx-auto w-full">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-3 pt-1 pb-1"
      >
        {/* Title & Count Badge */}
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
          <span className="text-xs font-bold text-amber-900 bg-amber-200/80 px-2.5 py-1 rounded-full border border-amber-300 shadow-xs">
            {filteredRecipes.length} {filteredRecipes.length === 1 ? 'receta' : 'recetas'}
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
            placeholder="Buscar por nombre o ingrediente..."
            className="w-full pl-10 pr-9 py-2.5 bg-white/90 backdrop-blur-xs border border-amber-200/90 rounded-2xl text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-xs transition-all font-body"
            id="search-recipe-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 cursor-pointer"
              id="clear-search-btn"
              title="Borrar búsqueda"
            >
              <X className="w-4 h-4 bg-stone-200 rounded-full p-0.5" />
            </button>
          )}
        </div>

        {/* Filters Controls Grid */}
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-2 gap-2">
            {/* Category Filter Dropdown */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-orange-600">
                <Tag className="w-3.5 h-3.5" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-8 pr-6 py-2 bg-white/90 border border-amber-200/90 rounded-xl text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-xs appearance-none truncate cursor-pointer"
                id="category-filter-select"
              >
                <option value="">Todas las categorías</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none text-stone-400 text-xs">
                ▼
              </div>
            </div>

            {/* Preparation Time Filter Dropdown */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-orange-600">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <select
                value={selectedTimeFilter}
                onChange={(e) => setSelectedTimeFilter(e.target.value)}
                className="w-full pl-8 pr-6 py-2 bg-white/90 border border-amber-200/90 rounded-xl text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-xs appearance-none truncate cursor-pointer"
                id="time-filter-select"
              >
                <option value="">Cualquier tiempo</option>
                <option value="under_30">Menos de 30 minutos</option>
                <option value="30_to_60">Entre 30 y 60 minutos</option>
                <option value="over_60">Más de 60 minutos</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none text-stone-400 text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Active Filters Bar & "Limpiar filtros" Button */}
          {hasActiveFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-between bg-orange-100/80 border border-orange-200/90 rounded-xl px-3 py-1.5 text-xs text-orange-950"
            >
              <div className="flex items-center gap-1.5 font-medium truncate pr-2">
                <Filter className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span className="truncate">
                  Filtros activos: {filteredRecipes.length} de {SAMPLE_RECIPES.length}
                </span>
              </div>
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-1 bg-orange-600 hover:bg-orange-700 text-white font-bold px-2.5 py-1 rounded-lg text-xs transition-colors shrink-0 cursor-pointer shadow-xs"
                id="limpiar-filtros-btn"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Limpiar filtros</span>
              </button>
            </motion.div>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 px-4 bg-white/80 rounded-2xl border border-amber-200/80 shadow-xs space-y-3"
          >
            <div className="w-10 h-10 mx-auto bg-amber-100 rounded-full flex items-center justify-center text-amber-800">
              <Filter className="w-5 h-5" />
            </div>
            <p className="text-stone-700 text-sm font-medium leading-relaxed">
              No se encontraron recetas con los filtros seleccionados.
            </p>
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition-all shadow-sm cursor-pointer"
              id="limpiar-filtros-empty-btn"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar filtros ({SAMPLE_RECIPES.length} recetas)</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
