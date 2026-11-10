/**
 * Utilitaire de conversion des montants et nombres en toutes lettres en français
 * Adapté aux devises Ouest-Africaines (Francs CFA) et aux métriques industrielles.
 */

export function numberToFrenchWords(n) {
  if (n === null || n === undefined || isNaN(n)) return '';
  n = Math.floor(Math.abs(Number(n)));
  if (n === 0) return 'zéro';

  const units = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
  const teens = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
  const tens = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt'];

  function convertUnder100(num, scaleIndex = 0) {
    if (num < 10) return units[num];
    if (num >= 10 && num < 20) return teens[num - 10];
    const t = Math.floor(num / 10);
    const u = num % 10;
    if (t === 7) {
      if (u === 1) return 'soixante et onze';
      return 'soixante-' + teens[u];
    }
    if (t === 9) {
      return 'quatre-vingt-' + teens[u];
    }
    if (t === 8 && u === 0) return (scaleIndex === 1) ? 'quatre-vingt' : 'quatre-vingts';
    if (u === 0) return tens[t];
    if (u === 1 && t < 8) return tens[t] + ' et un';
    return tens[t] + '-' + units[u];
  }

  function convertUnder1000(num, scaleIndex = 0) {
    if (num === 0) return '';
    const h = Math.floor(num / 100);
    const r = num % 100;
    let hStr = '';
    if (h === 1) hStr = 'cent';
    else if (h > 1) {
      const takesS = r === 0 && scaleIndex !== 1;
      hStr = units[h] + ' cent' + (takesS ? 's' : '');
    }
    const rStr = convertUnder100(r, scaleIndex);
    if (!hStr) return rStr;
    if (!rStr) return hStr;
    return hStr + ' ' + rStr;
  }

  const chunks = [];
  let temp = n;
  while (temp > 0) {
    chunks.push(temp % 1000);
    temp = Math.floor(temp / 1000);
  }

  const scales = [
    { singular: '', plural: '' },
    { singular: 'mille', plural: 'mille' },
    { singular: 'million', plural: 'millions' },
    { singular: 'milliard', plural: 'milliards' },
    { singular: 'billion', plural: 'billions' }
  ];

  const words = [];
  for (let i = chunks.length - 1; i >= 0; i--) {
    const chunk = chunks[i];
    if (chunk === 0) continue;
    if (i === 1 && chunk === 1) {
      words.push('mille');
    } else {
      const chunkStr = convertUnder1000(chunk, i);
      if (i > 0) {
        const scaleStr = chunk > 1 ? scales[i].plural : scales[i].singular;
        words.push(chunkStr + ' ' + scaleStr);
      } else {
        words.push(chunkStr);
      }
    }
  }

  return words.join(' ').trim();
}

/**
 * Convertit un montant numérique en FCFA en toutes lettres
 * Exemples :
 * 50000000 -> "Cinquante millions de francs CFA"
 * 25000000 -> "Vingt-cinq millions de francs CFA"
 * 1250000 -> "Un million deux cent cinquante mille francs CFA"
 * 1000 -> "Mille francs CFA"
 */
export function amountToWordsFCFA(num) {
  if (!num && num !== 0) return '';
  const val = Number(num);
  if (isNaN(val) || val <= 0) return '';
  
  const words = numberToFrenchWords(val);
  if (!words) return '';
  
  const capitalized = words.charAt(0).toUpperCase() + words.slice(1);
  
  // Règle française : "million(s) de", "milliard(s) de" quand c'est un multiple pur de millions
  const isPureScale = val >= 1000000 && val % 1000 === 0 && (val % 1000000 === 0 || val % 1000000000 === 0);
  const prep = isPureScale ? ' de' : '';
  const currencyUnit = val === 1 ? 'franc CFA' : 'francs CFA';
  
  return `${capitalized}${prep} ${currencyUnit}`;
}

/**
 * Convertit une quantité numérique avec son unité en toutes lettres
 * Exemples :
 * (2400000, 'kWh / an') -> "Deux millions quatre cent mille kWh / an"
 */
export function quantityToWords(num, unit = '') {
  if (!num && num !== 0) return '';
  const val = Number(num);
  if (isNaN(val) || val <= 0) return '';

  const words = numberToFrenchWords(val);
  if (!words) return '';

  const capitalized = words.charAt(0).toUpperCase() + words.slice(1);
  return unit ? `${capitalized} ${unit}` : capitalized;
}
