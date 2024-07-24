export const colorCombination: Record<string, string[]> = {
  Red: ["Black", "White", "Blue", "Green"],
  Blue: ["White", "Gray", "Red", "Black"],
  Black: ["White", "Gray", "Red", "Blue"],
  White: ["Black", "Blue", "Red", "Green"],
  Green: ["Black", "White", "Blue", "Red"],
  Gray: ["Black", "White", "Blue"],
  Pink: ["White", "Gray", "Blue"],
};

export const sizeMapping: Record<string, Record<string, string[]>> = {
  shirt: {
    XS: ["28", "29", "30", "31"],
    S: ["30", "31", "32", "33"],
    M: ["32", "33", "34", "35"],
    L: ["34", "35", "36", "37"],
    XL: ["36", "37", "38", "39"],
    XXL: ["38", "39", "40", "41"],
    XXXL: ["40", "41", "42", "43"],
  },
  pants: {
    "30": ["S", "31", "32", "33"],
    "31": ["S", "32", "33", "34"],
    "32": ["M", "33", "34", "35"],
    "33": ["M", "34", "35", "36"],
    "34": ["L", "35", "36", "37"],
    "35": ["L", "36", "37", "38"],
    "36": ["XL", "37", "38", "39"],
    "37": ["XL", "38", "39", "40"],
    "38": ["XXL", "39", "40", "41"],
    "39": ["XXL", "40", "41", "42"],
    "40": ["XXXL", "41", "42", "43"],
    "41": ["XXXL", "42", "43", "44"],
    "42": ["L", "43", "44", "45"],
    "43": ["L", "44", "45", "46"],
    "44": ["XL", "45", "46", "47"],
    "45": ["XL", "46", "47", "48"],
    "46": ["XXL", "47", "48", "49"],
    "47": ["XXL", "48", "49", "50"],
    "48": ["XXXL", "49", "50", "51"],
    "49": ["XXXL", "50", "51", "52"],
    "50": ["XXXL", "51", "52", "53"],
  },
  shoes: {
    "35": ["XS", "28", "29", "30"],
    "36": ["XS", "29", "30", "31"],
    "37": ["S", "30", "31", "32"],
    "38": ["S", "31", "32", "33"],
    "39": ["S", "32", "33", "34"],
    "40": ["M", "33", "34", "35"],
    "41": ["M", "34", "35", "36"],
    "42": ["L", "35", "36", "37"],
    "43": ["L", "36", "37", "38"],
    "44": ["XL", "37", "38", "39"],
    "45": ["XL", "38", "39", "40"],
    "46": ["XXL", "39", "40", "41"],
    "47": ["XXL", "40", "41", "42"],
    "48": ["XXXL", "41", "42", "43"],
  },
};
