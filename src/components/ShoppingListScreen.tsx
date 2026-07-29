import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Trash2, 
  Check, 
  AlertCircle, 
  BookOpen, 
  FileText, 
  Share2, 
  ChevronRight, 
  Plus, 
  ListChecks, 
  Sparkles 
} from 'lucide-react';
import { downloadShoppingListPDF, shareShoppingListWhatsApp } from '../utils/shoppingList';

export interface ShoppingListItem {
  id: string;
  text: string;
  checked: boolean;
  recipeCount?: number;
}

interface ShoppingListScreenProps {
  items: ShoppingListItem[];
  onToggleItem: (id: string) => void;
  onClearList: () => void;
  onRemoveItem: (id: string) => void;
  onBackToHome: () => void;
  onGoToLibrary: () => void;
}

// Ambient line-art illustration component (basket, bottle, shopping list, vegetables)
function AmbientGroceriesIllustration() {
  return (
    <div className="w-full max-w-xs mx-auto pt-2 pb-4 opacity-40 pointer-events-none flex justify-center">
      <svg
        viewBox="0 0 320 120"
        fill="none"
        stroke="currentColor"
        className="w-full h-auto text-amber-700/50"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Vegetable Basket */}
        <path d="M 20 80 L 100 80 L 92 110 L 28 110 Z" fill="none" />
        <path d="M 20 80 C 15 80, 10 70, 20 60 C 25 55, 35 60, 40 65" />
        <path d="M 35 65 C 30 50, 45 40, 55 50 C 60 55, 65 65, 60 75" />
        <path d="M 55 75 C 60 60, 75 55, 80 65 C 85 70, 85 80, 80 80" />
        <path d="M 75 80 C 80 70, 95 72, 95 80" />
        {/* Basket Grid Lines */}
        <path d="M 35 80 L 40 110" />
        <path d="M 50 80 L 52 110" />
        <path d="M 65 80 L 65 110" />
        <path d="M 80 80 L 78 110" />
        <path d="M 23 92 L 97 92" />
        <path d="M 26 102 L 94 102" />

        {/* Milk Bottle / Oil Jar */}
        <path d="M 125 110 L 125 75 C 125 70, 130 65, 132 60 L 132 50 L 148 50 L 148 60 C 150 65, 155 70, 155 75 L 155 110 Z" />
        <path d="M 130 50 L 150 50" />
        <path d="M 132 46 L 148 46 L 148 50 L 132 50 Z" />
        <path d="M 130 82 C 140 80, 145 88, 152 85" />
        <circle cx="132" cy="98" r="3" />
        <circle cx="145" cy="95" r="2" />

        {/* Shopping Checklist Clipboard */}
        <rect x="175" y="45" width="60" height="65" rx="6" />
        <path d="M 193 45 C 193 40, 217 40, 217 45 Z" fill="none" />
        <circle cx="205" cy="42" r="2" />
        {/* Checkmarks & Lines */}
        <path d="M 183 58 L 187 62 L 195 54" strokeWidth="1.5" />
        <line x1="200" y1="58" x2="225" y2="58" />
        <path d="M 183 73 L 187 77 L 195 69" strokeWidth="1.5" />
        <line x1="200" y1="73" x2="225" y2="73" />
        <path d="M 183 88 L 187 92 L 195 84" strokeWidth="1.5" />
        <line x1="200" y1="88" x2="225" y2="88" />

        {/* Decorative Leaves & Herb Sprig */}
        <path d="M 260 110 C 265 85, 280 60, 300 50" />
        <path d="M 270 90 C 260 82, 255 70, 268 70 C 275 75, 272 88, 270 90 Z" fill="none" />
        <path d="M 285 72 C 280 60, 280 50, 292 52 C 298 58, 290 70, 285 72 Z" fill="none" />
        <path d="M 295 56 C 295 45, 305 40, 308 48 C 308 55, 300 58, 295 56 Z" fill="none" />
      </svg>
    </div>
  );
}

export function ShoppingListScreen({
  items,
  onToggleItem,
  onClearList,
  onRemoveItem,
  onBackToHome,
  onGoToLibrary,
}: ShoppingListScreenProps) {
  const [showClearConfirmModal, setShowClearConfirmModal] = useState<boolean>(false);

  const totalCount = items.length;
  const checkedCount = items.filter((item) => item.checked).length;
  const progressPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  const handleConfirmClear = () => {
    onClearList();
    setShowClearConfirmModal(false);
  };

  return (
    <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full bg-[#FAF7F1] bg-gradient-to-b from-[#FAF7F1] via-[#FAF6EE] to-[#F5EFF3] min-h-full font-sans">
      {/* Top Header */}
      <div className="px-4 py-3.5 bg-transparent flex items-center justify-between gap-2 sticky top-0 z-20">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1.5 text-[#1F1A17] hover:text-[#FF5500] font-extrabold text-xs sm:text-sm bg-white hover:bg-orange-50 px-3.5 py-2 rounded-2xl border border-stone-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all cursor-pointer"
          id="shopping-list-back-btn"
        >
          <ArrowLeft className="w-4 h-4 text-[#FF5500]" />
          <span>Volver</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[#FEF3D6] border border-amber-200/80 flex items-center justify-center text-[#FF5500] shadow-2xs">
            <ShoppingCart className="w-4 h-4 text-[#FF5500]" />
          </div>
          <h1 className="text-base sm:text-lg font-extrabold text-[#1F1A17] font-display">
            Lista de Compras
          </h1>
        </div>

        {totalCount > 0 ? (
          <button
            onClick={() => setShowClearConfirmModal(true)}
            className="flex items-center gap-1 text-red-600 hover:text-red-700 bg-white hover:bg-red-50 font-extrabold text-xs px-3 py-2 rounded-2xl border border-red-200/80 shadow-2xs transition-colors cursor-pointer"
            id="clear-shopping-list-btn"
            title="Vaciar lista de compras"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Vaciar</span>
          </button>
        ) : (
          <div className="w-20"></div>
        )}
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-2 space-y-4 custom-scrollbar">
        {/* Total Summary & Progress Bar (when items exist) */}
        {totalCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-3xl border border-stone-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] space-y-3"
          >
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-[#1F1A17] flex items-center gap-1.5">
                <span>🛒 Total de ingredientes:</span>
                <span className="bg-[#FEF3D6] text-amber-950 px-2.5 py-0.5 rounded-full font-extrabold text-xs border border-amber-300/60">
                  {totalCount}
                </span>
              </span>
              <span className="text-amber-900 font-medium">
                {checkedCount} de {totalCount} listos ({progressPercent}%)
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden border border-stone-200/60">
              <motion.div
                className="bg-gradient-to-r from-[#FF5500] to-[#FF8A1A] h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Action Buttons: Download PDF & WhatsApp Share */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => downloadShoppingListPDF(items)}
                className="flex items-center justify-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-950 text-xs font-bold py-2 px-3 rounded-xl border border-amber-200/80 transition-colors cursor-pointer shadow-2xs"
                id="download-pdf-btn"
              >
                <FileText className="w-3.5 h-3.5 text-amber-700" />
                <span>Descargar PDF</span>
              </button>

              <button
                onClick={() => shareShoppingListWhatsApp(items)}
                className="flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 text-xs font-bold py-2 px-3 rounded-xl border border-emerald-200/80 transition-colors cursor-pointer shadow-2xs"
                id="share-whatsapp-btn"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Empty State Redesigned Card */}
        {totalCount === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {/* Elevated White Card */}
            <div className="bg-white border border-stone-200/80 rounded-[28px] sm:rounded-[32px] p-5 sm:p-7 text-center shadow-[0_12px_36px_rgba(0,0,0,0.03)] space-y-5 my-1">
              {/* Cart Illustration Circle with Sparkles */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-[#FEF3E2] rounded-full flex items-center justify-center mx-auto shadow-2xs">
                <ShoppingCart className="w-11 h-11 sm:w-13 sm:h-13 text-[#FF5500] stroke-[1.8]" />
                {/* Decorative Sparkles */}
                <Sparkles className="w-4 h-4 text-amber-400 absolute top-2 right-2 animate-pulse" />
                <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute bottom-3 left-2" />
                <div className="w-2 h-2 rounded-full bg-amber-400 absolute top-7 left-4 opacity-70"></div>
              </div>

              {/* Title & Explanatory Text */}
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1F1A17] font-display">
                  Tu lista de compras está vacía
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-medium max-w-xs mx-auto">
                  Explora nuestras 91 recetas y pulsa en{' '}
                  <strong className="text-[#FF5500] font-extrabold">
                    "Agregar a lista de compras"
                  </strong>{' '}
                  para ir guardando los ingredientes que necesitas.
                </p>
              </div>

              {/* Subtle Horizontal Divider */}
              <div className="border-t border-stone-100 pt-1"></div>

              {/* 3 Informational Benefits Columns in 1 Row */}
              <div className="grid grid-cols-3 gap-1 relative text-center">
                {/* Benefit 1 */}
                <div className="px-1 space-y-1.5">
                  <div className="w-9 h-9 rounded-full bg-orange-50 border border-orange-200/60 flex items-center justify-center mx-auto text-[#FF5500]">
                    <BookOpen className="w-4 h-4 text-[#FF5500]" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-[#1F1A17] block leading-tight">
                      Explora recetas
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium leading-tight block mt-0.5">
                      Encuentra platos deliciosos
                    </span>
                  </div>
                </div>

                {/* Benefit 2 (Center column with vertical subtle borders) */}
                <div className="px-1 space-y-1.5 border-x border-stone-100">
                  <div className="w-9 h-9 rounded-full bg-orange-50 border border-orange-200/60 flex items-center justify-center mx-auto text-[#FF5500]">
                    <Plus className="w-4 h-4 text-[#FF5500] stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-[#1F1A17] block leading-tight">
                      Agrega ingredientes
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium leading-tight block mt-0.5">
                      Guarda lo que necesitas
                    </span>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="px-1 space-y-1.5">
                  <div className="w-9 h-9 rounded-full bg-orange-50 border border-orange-200/60 flex items-center justify-center mx-auto text-[#FF5500]">
                    <ListChecks className="w-4 h-4 text-[#FF5500]" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-[#1F1A17] block leading-tight">
                      Compra fácil
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium leading-tight block mt-0.5">
                      Ten todo listo para cocinar
                    </span>
                  </div>
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="pt-2">
                <button
                  onClick={onGoToLibrary}
                  className="w-full bg-gradient-to-r from-[#FF4F00] via-[#FF6500] to-[#FF7A00] hover:from-[#FF6500] hover:to-[#FF8800] active:scale-[0.98] text-white font-extrabold py-3.5 px-4.5 rounded-2xl shadow-[0_10px_25px_rgba(255,79,0,0.28)] transition-all flex items-center justify-between text-xs sm:text-sm cursor-pointer border border-amber-300/30 group"
                  id="empty-list-explore-btn"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4.5 h-4.5 text-white group-hover:scale-110 transition-transform shrink-0" />
                    <span>Explorar biblioteca de recetas</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/90 shrink-0" />
                </button>
              </div>
            </div>

            {/* Bottom Ambient Line-Art Illustration */}
            <AmbientGroceriesIllustration />
          </motion.div>
        )}

        {/* Ingredients List (when totalCount > 0) */}
        {totalCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between text-xs font-bold text-stone-500 px-1">
              <span>Ingredientes agregados</span>
              <span>Toca para marcar como comprado</span>
            </div>

            <div className="space-y-2">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    onClick={() => onToggleItem(item.id)}
                    className={`flex items-start justify-between gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer shadow-2xs ${
                      item.checked
                        ? 'bg-stone-50/80 border-stone-200/80 text-stone-400'
                        : 'bg-white hover:bg-orange-50/30 border-stone-200/80 text-[#1F1A17]'
                    }`}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div
                        className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center border transition-colors flex-shrink-0 ${
                          item.checked
                            ? 'bg-[#FF5500] border-[#FF5500] text-white'
                            : 'border-stone-300 bg-white'
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <span
                        className={`text-sm font-semibold leading-snug break-words font-body ${
                          item.checked ? 'line-through text-stone-400 font-normal' : 'text-[#1F1A17]'
                        }`}
                      >
                        {item.text}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveItem(item.id);
                      }}
                      className="text-stone-400 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0 cursor-pointer"
                      title="Eliminar ingrediente"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </div>

      {/* Confirmation Modal for Clearing List */}
      <AnimatePresence>
        {showClearConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-6 max-w-xs w-full shadow-2xl border border-stone-200 text-center space-y-4"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600">
                <AlertCircle className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-stone-900 font-display">
                  ¿Vaciar lista de compras?
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Se eliminarán todos los {totalCount} ingredientes guardados en tu lista. Esta acción no se puede deshacer.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={() => setShowClearConfirmModal(false)}
                  className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-2.5 px-3 rounded-xl text-xs transition-colors cursor-pointer border border-stone-200"
                  id="cancel-clear-btn"
                >
                  Cancelar
                </button>

                <button
                  onClick={handleConfirmClear}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-colors cursor-pointer shadow-sm"
                  id="confirm-clear-btn"
                >
                  Sí, vaciar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

