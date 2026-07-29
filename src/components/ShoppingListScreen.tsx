import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ShoppingCart, Trash2, Check, AlertCircle, BookOpen, FileText, Share2, Layers } from 'lucide-react';
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
    <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full bg-gradient-to-b from-amber-50/90 via-orange-50/30 to-amber-100/60 min-h-full">
      {/* Top Header */}
      <div className="p-4 bg-white/90 backdrop-blur-md border-b border-amber-200/80 flex items-center justify-between gap-2 shadow-xs sticky top-0 z-20">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-1.5 text-stone-800 hover:text-orange-700 font-bold text-xs sm:text-sm bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition-all cursor-pointer"
          id="shopping-list-back-btn"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600" />
          <span>Volver</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-orange-100 rounded-xl text-orange-600">
            <ShoppingCart className="w-4 h-4" />
          </div>
          <h1 className="text-base sm:text-lg font-bold text-stone-900 font-display">
            Lista de Compras
          </h1>
        </div>

        {totalCount > 0 ? (
          <button
            onClick={() => setShowClearConfirmModal(true)}
            className="flex items-center gap-1 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 font-bold text-xs px-2.5 py-1.5 rounded-xl border border-red-200 transition-colors cursor-pointer"
            id="clear-shopping-list-btn"
            title="Vaciar lista de compras"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Vaciar</span>
          </button>
        ) : (
          <div className="w-16"></div>
        )}
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-4 custom-scrollbar">
        {/* Total Summary & Progress Bar */}
        {totalCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 backdrop-blur-xs p-4 rounded-2xl border border-amber-200/90 shadow-sm space-y-2.5"
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-stone-800 flex items-center gap-1.5">
                <span>🛒 Total de ingredientes:</span>
                <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-extrabold text-xs">
                  {totalCount}
                </span>
              </span>
              <span className="text-amber-800 font-mono">
                {checkedCount} de {totalCount} listos ({progressPercent}%)
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden border border-amber-200/60">
              <motion.div
                className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Action Buttons: Download PDF & WhatsApp Share */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => downloadShoppingListPDF(items)}
                className="flex items-center justify-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold py-2 px-3 rounded-xl border border-amber-300/80 transition-colors cursor-pointer shadow-2xs"
                id="download-pdf-btn"
              >
                <FileText className="w-3.5 h-3.5 text-amber-700" />
                <span>Descargar PDF</span>
              </button>

              <button
                onClick={() => shareShoppingListWhatsApp(items)}
                className="flex items-center justify-center gap-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold py-2 px-3 rounded-xl border border-emerald-300/80 transition-colors cursor-pointer shadow-2xs"
                id="share-whatsapp-btn"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>WhatsApp</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {totalCount === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-xs border border-amber-200/80 rounded-3xl p-6 sm:p-8 text-center shadow-sm my-6 space-y-4"
          >
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-orange-600 shadow-inner">
              <ShoppingCart className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 font-display">
                Tu lista de compras está vacía
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xs mx-auto">
                Explora nuestras 90 recetas y pulsa en <strong className="text-orange-700 font-semibold">"Agregar a lista de compras"</strong> para ir guardando los ingredientes que necesitas.
              </p>
            </div>

            <button
              onClick={onGoToLibrary}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-3 px-5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer border border-orange-400/30"
              id="empty-list-explore-btn"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explorar biblioteca de recetas</span>
            </button>
          </motion.div>
        )}

        {/* Ingredients List */}
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
                        ? 'bg-amber-50/60 border-amber-200/80 text-stone-400'
                        : 'bg-white/95 hover:bg-amber-50/80 border-amber-200/90 text-stone-800'
                    }`}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div
                        className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center border transition-colors flex-shrink-0 ${
                          item.checked
                            ? 'bg-orange-600 border-orange-600 text-white'
                            : 'border-stone-300 bg-white'
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <span
                        className={`text-sm font-medium leading-snug break-words font-body ${
                          item.checked ? 'line-through text-stone-400' : 'text-stone-800'
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
              className="bg-white rounded-3xl p-6 max-w-xs w-full shadow-2xl border border-amber-200 text-center space-y-4"
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
