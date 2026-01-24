export type BOOK_OPT =
"GEN" |
"EXO" |
"LEV" |
"NUM" |
"DEU" |
"JOS" |
"JDG" |
"RUT" |
"1SA" |
"2SA" |
"1KI" |
"2KI" |
"1CH" |
"2CH" |
"EZR" |
"NEH" |
"EST" |
"JOB" |
"PSA" |
"PRO" |
"ECC" |
"SNG" |
"ISA" |
"JER" |
"LAM" |
"EZK" |
"DAN" |
"HOS" |
"JOL" |
"AMO" |
"OBA" |
"JON" |
"MIC" |
"NAM" |
"HAB" |
"ZEP" |
"HAG" |
"ZEC" |
"MAL" |
"MAT" |
"MRK" |
"LUK" |
"JHN" |
"ACT" |
"ROM" |
"1CO" |
"2CO" |
"GAL" |
"EPH" |
"PHP" |
"COL" |
"1TH" |
"2TH" |
"1TI" |
"2TI" |
"TIT" |
"PHM" |
"HEB" |
"JAS" |
"1PE" |
"2PE" |
"1JN" |
"2JN" |
"3JN" |
"JUD" |
"REV";


export interface IBook {
  acr: BOOK_OPT;
  name: string;
  chapters: number;
}

export const BOOKS: Array<IBook> = [
  { acr: "GEN", name: "Gênesis", chapters: 50 },
  { acr: "EXO", name: "Êxodo", chapters: 40 },
  { acr: "LEV", name: "Levítico", chapters: 27 },
  { acr: "NUM", name: "Números", chapters: 36 },
  { acr: "DEU", name: "Deuteronômio", chapters: 34 },
  { acr: "JOS", name: "Josué", chapters: 24 },
  { acr: "JDG", name: "Juízes", chapters: 21 },
  { acr: "RUT", name: "Rute", chapters: 4 },
  { acr: "1SA", name: "1 Samuel", chapters: 31 },
  { acr: "2SA", name: "2 Samuel", chapters: 24 },
  { acr: "1KI", name: "1 Reis", chapters: 22 },
  { acr: "2KI", name: "2 Reis", chapters: 25 },
  { acr: "1CH", name: "1 Crônicas", chapters: 29 },
  { acr: "2CH", name: "2 Crônicas", chapters: 36 },
  { acr: "EZR", name: "Esdras", chapters: 10 },
  { acr: "NEH", name: "Neemias", chapters: 13 },
  { acr: "EST", name: "Ester", chapters: 10 },
  { acr: "JOB", name: "Jó", chapters: 42 },
  { acr: "PSA", name: "Salmos", chapters: 150 },
  { acr: "PRO", name: "Provérbios", chapters: 31 },
  { acr: "ECC", name: "Eclesiastes", chapters: 12 },
  { acr: "SNG", name: "Cantares", chapters: 8 },
  { acr: "ISA", name: "Isaías", chapters: 66 },
  { acr: "JER", name: "Jeremias", chapters: 52 },
  { acr: "LAM", name: "Lamentações", chapters: 5 },
  { acr: "EZK", name: "Ezequiel", chapters: 48 },
  { acr: "DAN", name: "Daniel", chapters: 12 },
  { acr: "HOS", name: "Oseias", chapters: 14 },
  { acr: "JOL", name: "Joel", chapters: 3 },
  { acr: "AMO", name: "Amós", chapters: 9 },
  { acr: "OBA", name: "Obadias", chapters: 1 },
  { acr: "JON", name: "Jonas", chapters: 4 },
  { acr: "MIC", name: "Miqueias", chapters: 7 },
  { acr: "NAM", name: "Naum", chapters: 3 },
  { acr: "HAB", name: "Habacuque", chapters: 3 },
  { acr: "ZEP", name: "Sofonias", chapters: 3 },
  { acr: "HAG", name: "Ageu", chapters: 2 },
  { acr: "ZEC", name: "Zacarias", chapters: 14 },
  { acr: "MAL", name: "Malaquias", chapters: 4 },
  { acr: "MAT", name: "Mateus", chapters: 28 },
  { acr: "MRK", name: "Marcos", chapters: 16 },
  { acr: "LUK", name: "Lucas", chapters: 24 },
  { acr: "JHN", name: "João", chapters: 21 },
  { acr: "ACT", name: "Atos", chapters: 28 },
  { acr: "ROM", name: "Romanos", chapters: 16 },
  { acr: "1CO", name: "1 Coríntios", chapters: 16 },
  { acr: "2CO", name: "2 Coríntios", chapters: 13 },
  { acr: "GAL", name: "Gálatas", chapters: 6 },
  { acr: "EPH", name: "Efésios", chapters: 6 },
  { acr: "PHP", name: "Filipenses", chapters: 4 },
  { acr: "COL", name: "Colossenses", chapters: 4 },
  { acr: "1TH", name: "1 Tessalonicenses", chapters: 5 },
  { acr: "2TH", name: "2 Tessalonicenses", chapters: 3 },
  { acr: "1TI", name: "1 Timóteo", chapters: 6 },
  { acr: "2TI", name: "2 Timóteo", chapters: 4 },
  { acr: "TIT", name: "Tito", chapters: 3 },
  { acr: "PHM", name: "Filemon", chapters: 1 },
  { acr: "HEB", name: "Hebreus", chapters: 13 },
  { acr: "JAS", name: "Tiago", chapters: 5 },
  { acr: "1PE", name: "1 Pedro", chapters: 5 },
  { acr: "2PE", name: "2 Pedro", chapters: 3 },
  { acr: "1JN", name: "1 João", chapters: 5 },
  { acr: "2JN", name: "2 João", chapters: 1 },
  { acr: "3JN", name: "3 João", chapters: 1 },
  { acr: "JUD", name: "Judas", chapters: 1 },
  { acr: "REV", name: "Apocalipse", chapters: 22 },
];
