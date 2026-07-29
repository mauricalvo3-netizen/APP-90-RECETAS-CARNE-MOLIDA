import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, BookOpen, Filter, Clock, RotateCcw, Tag, ShoppingCart, Check, CheckSquare, Square, Sparkles } from 'lucide-react';
import { SAMPLE_RECIPES, SampleRecipe, getRecipeImageSrc, getRecipeMinutes } from '../data/recipes';

interface RecipeLibraryScreenProps {
  onSelectRecipe: (recipe: SampleRecipe) => void;
  onAddRecipesToShoppingList?: (recipes: SampleRecipe[]) => void;
  onOpenShoppingList?: () => void;
}

export function RecipeLibraryScreen({ 
  onSelectRecipe,
  onAddRecipesToShoppingList,
  onOpenShoppingList,
}: RecipeLibraryScreenProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>('');
  
  // Multi-recipe selection mode state
  const [isSelectMode, setIsSelectMode] = useState<boolean>(false);
  const [selectedRecipeIds, setSelectedRecipeIds] = useState<(number | string)[]>([]);
  const [showBatchToast, setShowBatchToast] = useState<boolean>(false);
  const [addedBatchCount, setAddedBatchCount] = useState<number>(0);

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

  const toggleSelectRecipe = (id: number | string) => {
    setSelectedRecipeIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCardClick = (recipe: SampleRecipe) => {
    if (isSelectMode) {
      toggleSelectRecipe(recipe.id);
    } else {
      onSelectRecipe(recipe);
    }
  };

  const handleAddSelectedToShoppingList = () => {
    if (selectedRecipeIds.length === 0) return;
    const selectedRecipes = SAMPLE_RECIPES.filter((r) => selectedRecipeIds.includes(r.id));
    
    if (onAddRecipesToShoppingList) {
      onAddRecipesToShoppingList(selectedRecipes);
      setAddedBatchCount(selectedRecipes.length);
      setShowBatchToast(true);
      setTimeout(() => setShowBatchToast(false), 4000);
      setSelectedRecipeIds([]);
      setIsSelectMode(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 sm:p-5 max-w-md mx-auto w-full bg-[#F8F6F2] bg-gradient-to-b from-[#FAF8F5] via-[#F8F6F2] to-[#F3EFEA] min-h-full font-sans relative">
      {/* Toast Notification when Batch Adding to Shopping List */}
      <AnimatePresence>
        {showBatchToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-3 left-3 right-3 z-50 bg-[#1A1412] text-white p-3.5 rounded-2xl shadow-2xl border border-amber-500/40 flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#FF5500] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-extrabold text-amber-300 block truncate">
                  ¡{addedBatchCount} {addedBatchCount === 1 ? 'receta agregada' : 'recetas agregadas'}!
                </span>
                <span className="text-[11px] text-stone-300 block leading-tight truncate">
                  Ingredientes sumados sin duplicados
                </span>
              </div>
            </div>
            {onOpenShoppingList && (
              <button
                onClick={onOpenShoppingList}
                className="bg-[#FF5500] hover:bg-[#FF6500] text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shrink-0 cursor-pointer shadow-xs"
                id="toast-view-shopping-list-btn"
              >
                Ver lista
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-3 pt-1 pb-1"
      >
        {/* Title & Multi-select Action Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#FF5500] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(255,85,0,0.3)] shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#1F1A17] font-display leading-tight tracking-tight">
                Todas las recetas
              </h1>
              <p className="text-xs text-stone-400 font-medium">
                {isSelectMode ? 'Selecciona recetas para sumar ingredientes' : 'Explora el recetario completo'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsSelectMode(!isSelectMode);
              if (isSelectMode) setSelectedRecipeIds([]);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-extrabold border transition-all cursor-pointer shadow-2xs ${
              isSelectMode
                ? 'bg-[#FF5500] text-white border-[#FF5500]'
                : 'bg-white text-stone-700 hover:text-[#FF5500] border-stone-200/80'
            }`}
            id="toggle-multi-select-mode-btn"
          >
            {isSelectMode ? (
              <>
                <X className="w-3.5 h-3.5" />
                <span>Cancelar</span>
              </>
            ) : (
              <>
                <CheckSquare className="w-3.5 h-3.5 text-[#FF5500]" />
                <span>Elegir varias</span>
              </>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mt-2.5">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4 text-stone-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre o ingrediente..."
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-stone-200/80 rounded-2xl text-[#1F1A17] text-xs sm:text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#FF5500] focus:border-transparent shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all font-sans font-medium"
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
        <div className="space-y-2 pt-0.5">
          <div className="grid grid-cols-2 gap-2">
            {/* Category Filter Dropdown */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-orange-500">
                <Tag className="w-3.5 h-3.5" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full pl-8 pr-6 py-2 bg-white border ${
                  selectedCategory ? 'border-[#FF5500] text-[#FF5500] font-bold' : 'border-stone-200/80 text-[#1F1A17] font-medium'
                } rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5500] shadow-2xs appearance-none truncate cursor-pointer transition-colors`}
                id="category-filter-select"
              >
                <option value="">Todas las categorías</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-stone-400 text-[10px]">
                ▼
              </div>
            </div>

            {/* Preparation Time Filter Dropdown */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-orange-500">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <select
                value={selectedTimeFilter}
                onChange={(e) => setSelectedTimeFilter(e.target.value)}
                className={`w-full pl-8 pr-6 py-2 bg-white border ${
                  selectedTimeFilter ? 'border-[#FF5500] text-[#FF5500] font-bold' : 'border-stone-200/80 text-[#1F1A17] font-medium'
                } rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#FF5500] shadow-2xs appearance-none truncate cursor-pointer transition-colors`}
                id="time-filter-select"
              >
                <option value="">Cualquier tiempo</option>
                <option value="under_30">Menos de 30 minutos</option>
                <option value="30_to_60">Entre 30 y 60 minutos</option>
                <option value="over_60">Más de 60 minutos</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-stone-400 text-[10px]">
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
              className="flex items-center justify-between bg-orange-50/90 border border-orange-200/80 rounded-2xl px-3 py-1.5 text-xs text-orange-950 shadow-2xs"
            >
              <div className="flex items-center gap-1.5 font-medium truncate pr-2">
                <Filter className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />
                <span className="truncate text-xs">
                  Filtros activos: {filteredRecipes.length} de {SAMPLE_RECIPES.length}
                </span>
              </div>
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-1 bg-[#FF5500] hover:bg-[#e04b00] text-white font-bold px-2.5 py-1 rounded-xl text-xs transition-colors shrink-0 cursor-pointer shadow-2xs"
                id="limpiar-filtros-btn"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Limpiar</span>
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Recipes Grid */}
      <div className="flex-1 overflow-y-auto pr-1 -mr-1 my-2 py-1 space-y-3 custom-scrollbar pb-16">
        {filteredRecipes.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-2 gap-3"
          >
            <AnimatePresence>
              {filteredRecipes.map((recipe) => {
                const isSelected = selectedRecipeIds.includes(recipe.id);
                return (
                  <motion.div
                    key={recipe.id}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => handleCardClick(recipe)}
                    className={`group bg-white rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden relative ${
                      isSelected
                        ? 'border-[#FF5500] ring-2 ring-[#FF5500]/30 shadow-md bg-orange-50/20'
                        : 'border-stone-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] active:scale-[0.98]'
                    }`}
                  >
                    {/* Multi-selection Checkbox Indicator */}
                    {isSelectMode && (
                      <div className="absolute top-2 left-2 z-20">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all shadow-sm ${
                          isSelected
                            ? 'bg-[#FF5500] text-white border border-[#FF5500]'
                            : 'bg-white/90 text-stone-400 border border-stone-300'
                        }`}>
                          {isSelected ? <Check className="w-4 h-4 stroke-[3]" /> : <Square className="w-4 h-4 opacity-50" />}
                        </div>
                      </div>
                    )}

                    {/* Recipe Photo */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                      <img
                        src={getRecipeImageSrc(recipe)}
                        alt={recipe.nombre || recipe.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.97] contrast-[1.03]"
                      />
                      {/* Time Badge */}
                      <div className="absolute bottom-1.5 right-1.5 bg-black/65 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs border border-white/10">
                        <Clock className="w-2.5 h-2.5 text-amber-300" />
                        <span>{getRecipeMinutes(recipe)} min</span>
                      </div>
                    </div>

                    {/* Recipe Name & Category */}
                    <div className="p-3 bg-white flex flex-col justify-between flex-1">
                      <h2 className="text-xs sm:text-sm font-extrabold text-[#1F1A17] font-display leading-snug line-clamp-2 group-hover:text-[#FF5500] transition-colors">
                        {recipe.nombre || recipe.title}
                      </h2>
                      <span className="text-[10px] sm:text-[11px] text-stone-400 font-medium truncate mt-1">
                        {recipe.categoria || recipe.tag}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 px-4 bg-white rounded-2xl border border-stone-200/80 shadow-2xs space-y-3"
          >
            <div className="w-10 h-10 mx-auto bg-amber-100/80 rounded-full flex items-center justify-center text-amber-800">
              <Filter className="w-5 h-5 text-[#FF5500]" />
            </div>
            <p className="text-stone-700 text-sm font-medium leading-relaxed">
              No se encontraron recetas con los filtros seleccionados.
            </p>
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1.5 bg-[#FF5500] hover:bg-[#e04b00] text-white font-bold py-2 px-4 rounded-xl text-xs transition-all shadow-2xs cursor-pointer"
              id="limpiar-filtros-empty-btn"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpiar filtros ({SAMPLE_RECIPES.length} recetas)</span>
            </button>
          </motion.div>
        )}
      </div>

      {/* Floating Bottom Action Bar for Multi-Select */}
      <AnimatePresence>
        {isSelectMode && selectedRecipeIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="absolute bottom-3 left-4 right-4 z-40"
          >
            <button
              onClick={handleAddSelectedToShoppingList}
              className="w-full bg-gradient-to-r from-[#FF4F00] via-[#FF6500] to-[#FF7A00] hover:from-[#FF6500] hover:to-[#FF8800] active:scale-[0.98] text-white font-extrabold py-3.5 px-4 rounded-2xl shadow-[0_12px_28px_rgba(255,79,0,0.35)] transition-all flex items-center justify-between text-xs sm:text-sm cursor-pointer border border-amber-300/40"
              id="batch-add-shopping-list-btn"
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4.5 h-4.5 text-white" />
                <span>Sumar ingredientes de {selectedRecipeIds.length} {selectedRecipeIds.length === 1 ? 'receta' : 'recetas'}</span>
              </div>
              <span className="bg-white/20 text-white font-extrabold px-2.5 py-0.5 rounded-full text-xs">
                + Lista
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

