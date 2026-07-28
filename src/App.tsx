import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HomeScreen } from './components/HomeScreen';
import { RecommendationScreen } from './components/RecommendationScreen';
import { RecipeLibraryScreen } from './components/RecipeLibraryScreen';
import { RecipeDetailScreen } from './components/RecipeDetailScreen';
import { SampleRecipe, SAMPLE_RECIPES } from './data/recipes';
import { Smartphone, Sparkles, Home, BookOpen, Utensils } from 'lucide-react';

type Screen = 'home' | 'recommendations' | 'library' | 'recipe_detail';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [previousScreen, setPreviousScreen] = useState<Screen>('home');
  const [selectedRecipe, setSelectedRecipe] = useState<SampleRecipe>(SAMPLE_RECIPES[0]);
  const [deviceFrame, setDeviceFrame] = useState<boolean>(true);

  const handleStartRecommendation = () => {
    setPreviousScreen(currentScreen);
    setCurrentScreen('recommendations');
  };

  const handleViewFullRecipe = (recipe: SampleRecipe) => {
    setSelectedRecipe(recipe);
    setPreviousScreen(currentScreen);
    setCurrentScreen('recipe_detail');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const handleBackToPrevious = () => {
    setCurrentScreen(previousScreen === 'recipe_detail' ? 'home' : previousScreen);
  };

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center p-0 sm:p-4 md:p-6 font-sans">
      {/* Optional top bar controls for preview frame */}
      <header className="hidden sm:flex items-center justify-between w-full max-w-md mb-3 px-2 text-xs text-amber-200/80">
        <div className="flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {currentScreen === 'home' && 'Módulo 1: Inicio'}
            {currentScreen === 'recommendations' && 'Módulo 2: Asistente'}
            {currentScreen === 'library' && 'Módulo 3: Biblioteca'}
            {currentScreen === 'recipe_detail' && 'Módulo 4: Detalle de Receta'}
          </span>
        </div>
        <button
          onClick={() => setDeviceFrame(!deviceFrame)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors border border-stone-700 cursor-pointer"
          title="Alternar marco de teléfono"
          id="toggle-frame-btn"
        >
          <Smartphone className="w-3 h-3" />
          <span>{deviceFrame ? 'Vista expandida' : 'Vista móvil'}</span>
        </button>
      </header>

      {/* Main Mobile App Container */}
      <main
        className={`w-full transition-all duration-300 flex flex-col justify-between overflow-hidden relative ${
          deviceFrame
            ? 'max-w-md min-h-[92vh] sm:min-h-[820px] sm:max-h-[880px] sm:rounded-[2.5rem] sm:border-[8px] sm:border-stone-800 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]'
            : 'max-w-md min-h-screen'
        } bg-gradient-to-b from-amber-50/90 via-orange-50/40 to-amber-100/70 text-stone-800`}
      >
        {/* Subtle Decorative Warm Radial Background Elements */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-orange-300/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -left-28 w-56 h-56 bg-amber-300/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 right-0 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Dynamic Screen Transition Layer */}
        <div className="flex-1 flex flex-col overflow-hidden relative z-10">
          <AnimatePresence mode="wait">
            {currentScreen === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col h-full"
              >
                <HomeScreen onStartClick={handleStartRecommendation} />
              </motion.div>
            )}

            {currentScreen === 'recommendations' && (
              <motion.div
                key="recommendations"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col h-full"
              >
                <RecommendationScreen
                  onBackToHome={handleBackToHome}
                  onViewFullRecipe={handleViewFullRecipe}
                />
              </motion.div>
            )}

            {currentScreen === 'library' && (
              <motion.div
                key="library"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col h-full overflow-hidden"
              >
                <RecipeLibraryScreen onSelectRecipe={handleViewFullRecipe} />
              </motion.div>
            )}

            {currentScreen === 'recipe_detail' && (
              <motion.div
                key="recipe_detail"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="flex-1 flex flex-col h-full overflow-hidden"
              >
                <RecipeDetailScreen
                  recipe={selectedRecipe}
                  onBack={handleBackToPrevious}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Mobile Navigation Bar */}
        <nav className="bg-white/90 backdrop-blur-md border-t border-amber-200/80 px-6 py-2 relative z-20 flex items-center justify-around shadow-lg">
          <button
            onClick={() => setCurrentScreen('home')}
            className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all cursor-pointer ${
              currentScreen === 'home'
                ? 'text-orange-600 font-bold scale-105'
                : 'text-stone-400 hover:text-stone-600 font-medium'
            }`}
            id="nav-home-btn"
          >
            <Home className="w-5 h-5" />
            <span className="text-[11px]">Inicio</span>
          </button>

          <button
            onClick={handleStartRecommendation}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
              currentScreen === 'recommendations'
                ? 'text-orange-600 font-bold scale-105'
                : 'text-stone-400 hover:text-stone-600 font-medium'
            }`}
            id="nav-assistant-btn"
          >
            <Utensils className="w-5 h-5" />
            <span className="text-[11px]">Asistente</span>
          </button>

          <button
            onClick={() => setCurrentScreen('library')}
            className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all cursor-pointer ${
              currentScreen === 'library'
                ? 'text-orange-600 font-bold scale-105'
                : 'text-stone-400 hover:text-stone-600 font-medium'
            }`}
            id="nav-library-btn"
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[11px]">Biblioteca</span>
          </button>
        </nav>
      </main>
    </div>
  );
}
