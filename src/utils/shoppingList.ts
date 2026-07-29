import jsPDF from 'jspdf';

export interface ShoppingListItem {
  id: string;
  text: string;
  checked: boolean;
  recipeCount?: number;
}

interface ParsedIngredient {
  quantity: number | null;
  unit: string | null; // 'g', 'kg', 'ml', 'l', 'taza', 'cda', 'cdta', 'diente', 'unidad', null
  unitType: 'weight' | 'volume' | 'taza' | 'cda' | 'cdta' | 'diente' | 'count' | 'al_gusto' | 'unknown';
  coreKey: string;
  displayName: string;
  originalText: string;
  hasAlGusto: boolean;
}

// Convert fractions and string numbers to floats
function parseQuantityNumber(str: string): number | null {
  if (!str) return null;
  const s = str.trim().toLowerCase();

  // Handle composite fractions like "1 1/2"
  const compMatch = s.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (compMatch) {
    const whole = parseFloat(compMatch[1]);
    const num = parseFloat(compMatch[2]);
    const den = parseFloat(compMatch[3]);
    if (den !== 0) return whole + num / den;
  }

  // Handle simple fractions like "1/2", "3/4", "1/4", "1/3", "2/3"
  const fracMatch = s.match(/^(\d+)\/(\d+)$/);
  if (fracMatch) {
    const num = parseFloat(fracMatch[1]);
    const den = parseFloat(fracMatch[2]);
    if (den !== 0) return num / den;
  }

  // Handle standard decimals or integers e.g. "500", "1.5", "0,5"
  const numMatch = s.match(/^(\d+([.,]\d+)?)/);
  if (numMatch) {
    return parseFloat(numMatch[1].replace(',', '.'));
  }

  return null;
}

// Standardize core ingredient keys for smart matching
function extractCoreKey(text: string): { key: string; displayName: string } {
  const clean = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents for key matching
    .replace(/\(.*?\)/g, '') // remove parentheses content
    .replace(/\b(aprox|aprox\.|aproximadamente)\b/gi, '')
    .trim();

  // Known key mapping for Spanish recipes
  if (clean.includes('carne molida')) return { key: 'carne_molida', displayName: 'carne molida' };
  if (clean.includes('huevo')) return { key: 'huevo', displayName: 'huevos' };
  if (clean.includes('cebolla')) return { key: 'cebolla', displayName: 'cebolla' };
  if (clean.includes('ajo')) return { key: 'ajo', displayName: 'dientes de ajo' };
  if (clean.includes('pan molido')) return { key: 'pan_molido', displayName: 'pan molido' };
  if (clean.includes('mozzarella')) return { key: 'queso_mozzarella', displayName: 'queso mozzarella' };
  if (clean.includes('queso rallado')) return { key: 'queso_rallado', displayName: 'queso rallado' };
  if (clean.includes('queso')) return { key: 'queso', displayName: 'queso' };
  if (clean.includes('jamon')) return { key: 'jamon', displayName: 'jamón' };
  if (clean.includes('aceite de oliva')) return { key: 'aceite_oliva', displayName: 'aceite de oliva' };
  if (clean.includes('aceite')) return { key: 'aceite', displayName: 'aceite vegetal' };
  if (clean.includes('sal y pimienta') || (clean.includes('sal') && clean.includes('pimienta'))) return { key: 'sal_pimienta', displayName: 'sal y pimienta' };
  if (clean.includes('sal')) return { key: 'sal', displayName: 'sal' };
  if (clean.includes('pimienta')) return { key: 'pimienta', displayName: 'pimienta negra' };
  if (clean.includes('salsa de tomate') || clean.includes('pure de tomate')) return { key: 'salsa_tomate', displayName: 'salsa de tomate' };
  if (clean.includes('tomate') || clean.includes('jitomate')) return { key: 'tomate', displayName: 'tomate' };
  if (clean.includes('mantequilla') || clean.includes('manteca')) return { key: 'mantequilla', displayName: 'mantequilla' };
  if (clean.includes('leche')) return { key: 'leche', displayName: 'leche' };
  if (clean.includes('crema')) return { key: 'crema', displayName: 'crema' };
  if (clean.includes('harina')) return { key: 'harina', displayName: 'harina de trigo' };
  if (clean.includes('papita') || clean.includes('papa')) return { key: 'papa', displayName: 'papas' };
  if (clean.includes('zanahoria')) return { key: 'zanahoria', displayName: 'zanahorias' };
  if (clean.includes('tocino') || clean.includes('tocineta')) return { key: 'tocino', displayName: 'tocino' };
  if (clean.includes('pimiento') || clean.includes('pimenton')) return { key: 'pimiento', displayName: 'pimiento' };
  if (clean.includes('comino')) return { key: 'comino', displayName: 'comino' };
  if (clean.includes('oregano')) return { key: 'oregano', displayName: 'orégano' };
  if (clean.includes('perejil')) return { key: 'perejil', displayName: 'perejil' };
  if (clean.includes('cilantro')) return { key: 'cilantro', displayName: 'cilantro' };
  if (clean.includes('caldo')) return { key: 'caldo', displayName: 'caldo' };

  // Generic fallback key: strip numbers, units, common words
  const genericKey = clean
    .replace(/^\d+(\.\d+)?\s*/, '')
    .replace(/\b(g|gr|kg|kilo|kilos|ml|l|taza|tazas|cda|cdas|cucharada|cucharadas|cdta|cdtas|cucharadita|cucharaditas|diente|dientes|unidades|unidad|piezas|pieza|de|del|al|gusto|picado|picada|rallado|rallada|machacado|machacados)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return {
    key: genericKey || clean,
    displayName: text.replace(/^\d+(\.\d+)?\s*(g|gr|kg|ml|l|taza|cda|cdta|diente)?\s*(de|del)?\s*/i, '').trim() || text,
  };
}

// Parse a single raw ingredient string into structured components
export function parseIngredient(rawText: string): ParsedIngredient {
  let text = rawText.trim();
  // Clean leading "Aprox." or "Aproximadamente"
  text = text.replace(/^(aprox|aprox\.|aproximadamente)\s*/i, '').trim();
  
  const lower = text.toLowerCase();
  const hasAlGusto = lower.includes('al gusto');

  // Match leading quantity + unit
  // e.g. "500 g de carne molida", "1/2 kg de carne", "3 cucharadas de pan molido", "2 dientes de ajo", "1 cebolla"
  const qtyUnitMatch = text.match(/^(\d+(?:\s+\d+\/\d+|\/\d+|[.,]\d+)?)\s*([a-zA-Záéíóúñ]+)?\s*(?:de|del)?\s*(.*)$/i);

  if (!qtyUnitMatch) {
    const { key, displayName } = extractCoreKey(text);
    return {
      quantity: null,
      unit: null,
      unitType: hasAlGusto ? 'al_gusto' : 'unknown',
      coreKey: key,
      displayName,
      originalText: text,
      hasAlGusto,
    };
  }

  const rawQty = qtyUnitMatch[1];
  const rawUnitCandidate = (qtyUnitMatch[2] || '').toLowerCase();
  const restText = qtyUnitMatch[3] || text;

  const quantity = parseQuantityNumber(rawQty);
  let unit: string | null = null;
  let unitType: ParsedIngredient['unitType'] = 'unknown';

  // Identify unit and category
  if (/^(g|gr|gramo|gramos)$/i.test(rawUnitCandidate)) {
    unit = 'g';
    unitType = 'weight';
  } else if (/^(kg|kilo|kilos|kilogramo|kilogramos)$/i.test(rawUnitCandidate)) {
    unit = 'kg';
    unitType = 'weight';
  } else if (/^(ml|mililitro|mililitros)$/i.test(rawUnitCandidate)) {
    unit = 'ml';
    unitType = 'volume';
  } else if (/^(l|lt|lts|litro|litros)$/i.test(rawUnitCandidate)) {
    unit = 'l';
    unitType = 'volume';
  } else if (/^(taza|tazas|tz|tzs)$/i.test(rawUnitCandidate)) {
    unit = 'taza';
    unitType = 'taza';
  } else if (/^(cda|cdas|cucharada|cucharadas)$/i.test(rawUnitCandidate)) {
    unit = 'cda';
    unitType = 'cda';
  } else if (/^(cdta|cdtas|cucharadita|cucharaditas)$/i.test(rawUnitCandidate)) {
    unit = 'cdta';
    unitType = 'cdta';
  } else if (/^(diente|dientes)$/i.test(rawUnitCandidate)) {
    unit = 'diente';
    unitType = 'diente';
  } else if (/^(huevo|huevos|cebolla|cebollas|tomate|tomates|unidad|unidades|pieza|piezas|rebanada|rebanadas|lata|latas)$/i.test(rawUnitCandidate)) {
    unit = 'unidad';
    unitType = 'count';
  }

  const { key, displayName } = extractCoreKey(restText || text);

  return {
    quantity,
    unit,
    unitType: unit ? unitType : (quantity !== null ? 'count' : 'unknown'),
    coreKey: key,
    displayName,
    originalText: text,
    hasAlGusto,
  };
}

// Main Consolidation Function
export function consolidateShoppingList(rawItems: (string | ShoppingListItem)[]): ShoppingListItem[] {
  // Map inputs to clean string & checked state
  const itemsToProcess = rawItems.map((item) => {
    if (typeof item === 'string') {
      return { text: item, checked: false, originalId: undefined };
    }
    return { text: item.text, checked: item.checked, originalId: item.id };
  });

  // Group by coreKey
  const groups: Record<string, typeof itemsToProcess> = {};

  itemsToProcess.forEach((item) => {
    const parsed = parseIngredient(item.text);
    const key = parsed.coreKey || item.text.toLowerCase().trim();
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  });

  const consolidatedList: ShoppingListItem[] = [];

  Object.entries(groups).forEach(([key, groupItems]) => {
    // If all items in this group were checked, result is checked
    const isChecked = groupItems.every((gi) => gi.checked);
    const recipeCount = groupItems.length;

    // Single item in group -> return as is (or cleaned)
    if (groupItems.length === 1) {
      const originalText = groupItems[0].text;
      consolidatedList.push({
        id: groupItems[0].originalId || `ing-${key}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        text: originalText,
        checked: isChecked,
        recipeCount: 1,
      });
      return;
    }

    // Multiple items for the same core ingredient -> consolidate!
    const parsedList = groupItems.map((gi) => parseIngredient(gi.text));

    // Check weight consolidation (e.g. 500 g + 400 g + 600 g = 1500 g = 1.5 kg)
    const allWeight = parsedList.every((p) => p.unitType === 'weight' && p.quantity !== null);
    if (allWeight) {
      let totalGrams = 0;
      parsedList.forEach((p) => {
        if (p.unit === 'kg') {
          totalGrams += (p.quantity || 0) * 1000;
        } else {
          totalGrams += p.quantity || 0;
        }
      });

      let formattedQty = '';
      if (totalGrams >= 1000) {
        const kg = Math.round((totalGrams / 1000) * 10) / 10;
        formattedQty = `Aprox. ${kg} kg`;
      } else {
        formattedQty = `Aprox. ${Math.round(totalGrams)} g`;
      }

      const coreName = parsedList[0].displayName || 'carne molida';
      const text = `${formattedQty} de ${coreName}`;

      consolidatedList.push({
        id: `ing-${key}-${totalGrams}`,
        text,
        checked: isChecked,
        recipeCount,
      });
      return;
    }

    // Check volume consolidation (e.g. ml / l)
    const allVolume = parsedList.every((p) => p.unitType === 'volume' && p.quantity !== null);
    if (allVolume) {
      let totalMl = 0;
      parsedList.forEach((p) => {
        if (p.unit === 'l') {
          totalMl += (p.quantity || 0) * 1000;
        } else {
          totalMl += p.quantity || 0;
        }
      });

      let formattedQty = '';
      if (totalMl >= 1000) {
        const l = Math.round((totalMl / 1000) * 10) / 10;
        formattedQty = `Aprox. ${l} L`;
      } else {
        formattedQty = `Aprox. ${Math.round(totalMl)} ml`;
      }

      const coreName = parsedList[0].displayName || 'líquido';
      const text = `${formattedQty} de ${coreName}`;

      consolidatedList.push({
        id: `ing-${key}-${totalMl}`,
        text,
        checked: isChecked,
        recipeCount,
      });
      return;
    }

    // Check same unit types (e.g. all tazas, all cdas, all cdtas, all dientes, all counts)
    const firstUnit = parsedList[0].unitType;
    const sameUnitType = parsedList.every((p) => p.unitType === firstUnit && p.quantity !== null);

    if (sameUnitType && (firstUnit === 'taza' || firstUnit === 'cda' || firstUnit === 'cdta' || firstUnit === 'diente' || firstUnit === 'count')) {
      const totalSum = parsedList.reduce((acc, p) => acc + (p.quantity || 0), 0);
      const roundedSum = Math.round(totalSum * 10) / 10;

      let unitLabel = '';
      let coreName = parsedList[0].displayName;

      if (firstUnit === 'taza') {
        unitLabel = roundedSum === 1 ? 'taza' : 'tazas';
        coreName = `de ${coreName}`;
      } else if (firstUnit === 'cda') {
        unitLabel = roundedSum === 1 ? 'cucharada' : 'cucharadas';
        coreName = `de ${coreName}`;
      } else if (firstUnit === 'cdta') {
        if (roundedSum >= 3) {
          const cdas = Math.round((roundedSum / 3) * 10) / 10;
          unitLabel = cdas === 1 ? 'cucharada' : 'cucharadas';
          coreName = `de ${coreName}`;
          consolidatedList.push({
            id: `ing-${key}-${totalSum}`,
            text: `Aprox. ${cdas} ${unitLabel} ${coreName}`.replace(/\s+/g, ' ').trim(),
            checked: isChecked,
            recipeCount,
          });
          return;
        }
        unitLabel = roundedSum === 1 ? 'cucharadita' : 'cucharaditas';
        coreName = `de ${coreName}`;
      } else if (firstUnit === 'diente') {
        unitLabel = roundedSum === 1 ? 'diente de ajo' : 'dientes de ajo';
        coreName = '';
      } else if (firstUnit === 'count') {
        unitLabel = '';
      }

      const text = `Aprox. ${roundedSum} ${unitLabel} ${coreName}`.replace(/\s+/g, ' ').trim();

      consolidatedList.push({
        id: `ing-${key}-${totalSum}`,
        text,
        checked: isChecked,
        recipeCount,
      });
      return;
    }

    // Fallback: If quantities cannot be summed with exact precision (Requirement 4)
    // Show a single line with an approximate combined description rather than repeating lines
    const coreDisplayName = parsedList[0].displayName || key;
    const hasAlGustoAny = parsedList.some((p) => p.hasAlGusto);

    let text = '';
    if (hasAlGustoAny) {
      text = `${coreDisplayName} (al gusto / varias recetas)`;
    } else {
      text = `Aprox. ${coreDisplayName} (para ${recipeCount} recetas)`;
    }

    consolidatedList.push({
      id: `ing-${key}-approx`,
      text,
      checked: isChecked,
      recipeCount,
    });
  });

  return consolidatedList;
}

// Generate PDF for the Shopping List
export function downloadShoppingListPDF(items: ShoppingListItem[]) {
  const doc = new jsPDF();
  const title = 'Lista de Compras - 90 Recetas con Carne Molida';
  const total = items.length;
  const bought = items.filter((i) => i.checked).length;
  const pending = total - bought;

  // Header Banner
  doc.setFillColor(249, 115, 22); // Orange header
  doc.rect(0, 0, 210, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 14, 16);

  // Subtitle / Date
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const dateStr = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  doc.text(`Fecha: ${dateStr} | Total: ${total} ingredientes | Pendientes: ${pending} | Comprados: ${bought}`, 14, 32);

  // Line separator
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.5);
  doc.line(14, 36, 196, 36);

  let y = 46;
  doc.setFontSize(11);

  items.forEach((item, index) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    // Draw checkbox box
    doc.setDrawColor(150, 150, 150);
    doc.rect(14, y - 4, 4, 4);

    if (item.checked) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(34, 197, 94); // Green check mark
      doc.text('X', 14.8, y - 0.7);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(140, 140, 140);
      doc.text(`${index + 1}. ${item.text} (Comprado)`, 22, y);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(30, 30, 30);
      doc.text(`${index + 1}. ${item.text}`, 22, y);
    }

    y += 8;
  });

  // Footer note
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text('Generado automáticamente por la app 90 Recetas con Carne Molida', 14, 285);

  doc.save('Lista_de_Compras_Carne_Molida.pdf');
}

// Share via WhatsApp
export function shareShoppingListWhatsApp(items: ShoppingListItem[]) {
  if (items.length === 0) return;

  const total = items.length;
  const bought = items.filter((i) => i.checked).length;

  let message = `🛒 *Lista de Compras - 90 Recetas con Carne Molida*\n`;
  message += `📊 ${bought} de ${total} comprados\n\n`;

  items.forEach((item) => {
    const symbol = item.checked ? '✅' : '▫️';
    const text = item.checked ? `~${item.text}~` : item.text;
    message += `${symbol} ${text}\n`;
  });

  message += `\n_Generado desde la app 90 Recetas con Carne Molida_`;

  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}
