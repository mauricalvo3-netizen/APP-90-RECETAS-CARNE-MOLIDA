import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import appLogo from '../assets/images/app_logo_1785213158777.jpg';
import heroImage from '../assets/images/ground_beef_hero_premium_1785345636835.jpg';
import { Sparkles, Utensils, ChefHat, Heart, ShoppingCart, ArrowDown, X, Download } from 'lucide-react';

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
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    // Check if running as standalone PWA
    const standaloneCheck =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as any).standalone === true;

    if (standaloneCheck) {
      setIsStandalone(true);
    }

    if (sessionStorage.getItem('install_banner_dismissed') === 'true') {
      setIsDismissed(true);
    }

    // Capture early beforeinstallprompt if triggered before React mounted
    if ((window as any).__pwaDeferredPrompt) {
      setDeferredPrompt((window as any).__pwaDeferredPrompt);
    }

    // Global callback listener
    (window as any).__onPwaInstallable = (e: any) => {
      setDeferredPrompt(e);
    };

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      (window as any).__pwaDeferredPrompt = e;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Auto-prompt if opened with autoinstall flag from iframe
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('autoinstall') === '1' || urlParams.get('install') === '1') {
      const attemptAutoPrompt = async () => {
        const p = (window as any).__pwaDeferredPrompt;
        if (p) {
          try {
            await p.prompt();
          } catch (err) {
            console.log('Auto prompt waiting for gesture:', err);
          }
        }
      };
      attemptAutoPrompt();
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      delete (window as any).__onPwaInstallable;
    };
  }, []);

  const handleInstallClick = async () => {
    const isInIframe = window.self !== window.top;

    if (isInIframe) {
      // Browsers block native PWA install prompts inside preview iframes.
      // Opening in top-level window allows the browser to trigger 1-click PWA installation.
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('autoinstall', '1');
      window.open(newUrl.toString(), '_blank');
      return;
    }

    const prompt = deferredPrompt || (window as any).__pwaDeferredPrompt;
    if (prompt) {
      try {
        await prompt.prompt();
        const choiceResult = await prompt.userChoice;
        if (choiceResult && choiceResult.outcome === 'accepted') {
          setIsDismissed(true);
          setDeferredPrompt(null);
          (window as any).__pwaDeferredPrompt = null;
        }
      } catch (err) {
        console.error('PWA install prompt error:', err);
      }
    } else {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      if (isIOS) {
        alert('Para instalar en tu iPhone/iPad:\n1. Toca el botón Compartir en Safari (abajo).\n2. Selecciona "Agregar a inicio".');
      } else {
        alert('Para instalar en tu dispositivo:\nAbre el menú de tu navegador (⋮) y selecciona "Instalar aplicación" o "Agregar a pantalla principal".');
      }
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem('install_banner_dismissed', 'true');
    } catch (e) {
      console.error('Error guardando estado de descarte:', e);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 sm:p-5 space-y-4 w-full m-0 rounded-none overflow-x-hidden overflow-y-auto custom-scrollbar relative bg-[#0D0D0D] text-stone-100">
      {/* Subtle ambient warm lighting background effect for top section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-72 bg-gradient-to-b from-orange-600/20 via-amber-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Top Header & Logo Area */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center text-center pt-1"
      >
        {/* App Logo */}
        <div className="relative mb-3 group">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-600/50 to-amber-500/50 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition duration-500"></div>
          <img
            src="/icon.png"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = appLogo;
            }}
            alt="Logo 90 Recetas"
            referrerPolicy="no-referrer"
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-2xl border border-amber-500/40 p-0.5 bg-stone-900"
          />
          <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs p-1 rounded-full shadow-lg border border-amber-400/40">
            <ChefHat className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display leading-tight drop-shadow-md">
          90 Recetas con Carne Molida
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm font-medium text-amber-400 mt-1.5 flex items-center justify-center gap-1.5 tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
          <span>Descubre en segundos qué cocinar hoy.</span>
        </p>
      </motion.div>

      {/* Hero Visual Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-amber-500/30 aspect-[4/3] group shrink-0 z-10"
      >
        <img
          src="https://lh3.googleusercontent.com/d/1W8lVHTsK-VTyghks9x4Cv-1nrQ5E6-i1"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = heroImage;
          }}
          alt="Rollito de carne molida gourmet"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.95] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent"></div>
        <div className="absolute inset-0 ring-1 ring-inset ring-amber-500/20 rounded-3xl pointer-events-none"></div>
        
        {/* Subtle Assistant Badge */}
        <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-300 shadow-xl flex items-center gap-1.5 border border-amber-500/30">
          <Utensils className="w-3.5 h-3.5 text-orange-400" />
          <span>Tu Asistente Culinario</span>
        </div>
      </motion.div>



      {/* Action Buttons Zone */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="space-y-3 pt-1 pb-2"
      >
        <button
          onClick={onStartClick}
          className="w-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-500 hover:to-amber-500 active:scale-[0.98] text-white font-bold py-3.5 px-5 rounded-2xl shadow-[0_12px_32px_rgba(234,88,12,0.45)] transition-all duration-300 flex items-center justify-center text-base sm:text-lg gap-2.5 cursor-pointer border border-amber-400/40 relative overflow-hidden group"
          id="main-decide-btn"
        >
          <div className="absolute inset-x-0 top-0 h-[1px] bg-white/30"></div>
          <Utensils className="w-5 h-5 text-white shrink-0 group-hover:rotate-12 transition-transform duration-300" />
          <span className="tracking-wide">Ayúdame a elegir qué cocinar</span>
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onFavoritesClick}
            className="w-full bg-[#171311]/90 hover:bg-stone-900 active:scale-[0.98] text-white font-bold py-3 px-4 rounded-2xl shadow-lg transition-all duration-200 flex items-center justify-between text-xs sm:text-sm cursor-pointer border border-orange-500/25 group"
            id="main-favorites-btn"
          >
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500 fill-red-500 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-stone-100 font-bold">Favoritas</span>
            </div>
            <span className="bg-red-950/80 text-red-300 text-[11px] font-extrabold w-6 h-6 rounded-full flex items-center justify-center border border-red-500/40 shadow-inner">
              {favoritesCount}
            </span>
          </button>

          <button
            onClick={onShoppingListClick}
            className="w-full bg-[#171311]/90 hover:bg-stone-900 active:scale-[0.98] text-white font-bold py-3 px-4 rounded-2xl shadow-lg transition-all duration-200 flex items-center justify-between text-xs sm:text-sm cursor-pointer border border-orange-500/25 group"
            id="main-shopping-list-btn"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-orange-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="text-stone-100 font-bold">Compras</span>
            </div>
            <span className="bg-amber-950/80 text-amber-300 text-[11px] font-extrabold w-6 h-6 rounded-full flex items-center justify-center border border-amber-500/40 shadow-inner">
              {shoppingListCount}
            </span>
          </button>
        </div>

        {/* PWA Direct 1-Click Installation Button */}
        <AnimatePresence>
          {!isStandalone && !isDismissed && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="mt-3 relative rounded-2xl bg-[#14100E] border-2 border-[#FF5500]/70 shadow-[0_8px_30px_rgba(255,85,0,0.35)] p-3 sm:p-4 flex items-center justify-between gap-3 overflow-hidden group"
            >
              {/* Glowing Background Ambiance */}
              <div className="absolute -left-10 -top-10 w-36 h-36 bg-[#FF5500]/30 rounded-full blur-2xl pointer-events-none animate-pulse"></div>
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none"></div>

              {/* Clean App Icon + Direct 1-Click Big Button */}
              <div className="flex items-center gap-3 relative z-10 min-w-0">
                <img
                  src="/icon.png"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = appLogo;
                  }}
                  alt="90 Recetas"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover shadow-md border border-amber-400/50 bg-stone-900 shrink-0"
                />
              </div>

              {/* Big Direct Install Button (No overlapping text) */}
              <button
                onClick={handleInstallClick}
                className="flex-1 bg-gradient-to-r from-[#FF5500] via-[#FF6500] to-[#FF7A00] hover:from-[#FF6500] hover:to-[#FF8800] active:scale-95 text-white text-sm sm:text-base font-extrabold py-3 px-4 rounded-xl shadow-[0_4px_20px_rgba(255,85,0,0.5)] transition-all cursor-pointer border border-amber-300/40 flex items-center justify-center gap-2 relative z-10"
                id="pwa-install-banner-btn"
              >
                <Download className="w-5 h-5 text-white stroke-[2.5]" />
                <span className="tracking-wide">INSTALAR AHORA</span>
              </button>

              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="w-8 h-8 rounded-full bg-stone-800/90 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition-colors text-xs cursor-pointer border border-stone-700/60 z-20 shrink-0"
                id="pwa-install-banner-close-btn"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

