import { motion } from 'motion/react';
import appLogo from '../assets/images/app_logo_1785213158777.jpg';
import heroImage from '../assets/images/ground_beef_hero_1785213144965.jpg';
import { Sparkles, Utensils, ChefHat, Heart, ShoppingCart } from 'lucide-react';

interface HomeScreenProps {
  onStartClick: () => void;
  onFavoritesClick: () => void;
  favoritesCount?: number;
  onShoppingListClick: () => void;
  shoppingListCount?: number;
}

export function HomeScreen({
  onStartClick,
  onFavoritesClick,
  favoritesCount = 0,
  onShoppingListClick,
  shoppingListCount = 0,
}: HomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col justify-between p-5 space-y-4 max-w-md mx-auto w-full overflow-y-auto custom-scrollbar">
      {/* Top Header & Logo Area */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center pt-1"
      >
        {/* App Logo */}
        <div className="relative mb-2 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition duration-300"></div>
          <img
            src={appLogo}
            alt="Logo 90 Recetas con Carne Molida"
            referrerPolicy="no-referrer"
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-md border-2 border-white"
          />
          <span className="absolute -bottom-1 -right-1 bg-orange-600 text-white text-xs p-1 rounded-full shadow-md">
            <ChefHat className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-display leading-tight">
          90 Recetas con Carne Molida
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm font-semibold text-orange-700 mt-1 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          Descubre en segundos qué cocinar hoy.
        </p>
      </motion.div>

      {/* Hero Visual Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative rounded-3xl overflow-hidden shadow-xl border border-amber-200/60 aspect-[4/3] group shrink-0"
      >
        <img
          src={heroImage}
          alt="Platillo con carne molida recién preparado"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/20 to-transparent"></div>
        
        {/* Subtle Assistant Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-900 shadow-sm flex items-center gap-1.5 border border-amber-200/50">
          <Utensils className="w-3.5 h-3.5 text-orange-600" />
          <span>Tu Asistente Culinario</span>
        </div>
      </motion.div>

      {/* Benefit Message Box */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="bg-amber-100/70 border border-amber-200/90 rounded-2xl p-3.5 text-center shadow-sm"
      >
        <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
          Deja de perder tiempo buscando recetas.
          <span className="block font-bold text-orange-950 mt-0.5">
            Nosotros te ayudamos a elegir la ideal para hoy.
          </span>
        </p>
      </motion.div>

      {/* Action Buttons Zone */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="space-y-2 pt-1 pb-2"
      >
        <button
          onClick={onStartClick}
          className="w-full bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-700 hover:to-amber-700 active:scale-[0.98] text-white font-bold py-3.5 px-5 rounded-2xl shadow-lg shadow-orange-600/25 transition-all duration-200 flex items-center justify-center text-base sm:text-lg gap-2 cursor-pointer border border-orange-400/30"
          id="main-decide-btn"
        >
          <span>🍽</span>
          <span>Ayúdame a elegir qué cocinar</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onFavoritesClick}
            className="w-full bg-white/95 hover:bg-amber-100/80 active:scale-[0.98] text-stone-800 font-bold py-3 px-3 rounded-2xl shadow-sm transition-all duration-200 flex items-center justify-center text-xs sm:text-sm gap-1.5 cursor-pointer border border-amber-200/90"
            id="main-favorites-btn"
          >
            <Heart className="w-4 h-4 text-red-500 fill-red-500 shrink-0" />
            <span>Favoritas</span>
            <span className="bg-red-100 text-red-700 text-[11px] font-extrabold px-1.5 py-0.5 rounded-full border border-red-200">
              {favoritesCount}
            </span>
          </button>

          <button
            onClick={onShoppingListClick}
            className="w-full bg-white/95 hover:bg-amber-100/80 active:scale-[0.98] text-stone-800 font-bold py-3 px-3 rounded-2xl shadow-sm transition-all duration-200 flex items-center justify-center text-xs sm:text-sm gap-1.5 cursor-pointer border border-amber-200/90"
            id="main-shopping-list-btn"
          >
            <ShoppingCart className="w-4 h-4 text-orange-600 shrink-0" />
            <span>Compras</span>
            <span className="bg-orange-100 text-orange-700 text-[11px] font-extrabold px-1.5 py-0.5 rounded-full border border-orange-200">
              {shoppingListCount}
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

