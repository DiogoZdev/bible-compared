export type BOOK_OPT =
// OLD TESTAMENT
"GEN" | "EXO" | "LEV" | "NUM" | "DEU" | "JOS" | "JDG" | "RUT" | "1SA" | "2SA" | "1KI" | "2KI" | "1CH" | "2CH" | "EZR" |
"NEH" | "EST" | "JOB" | "PSA" | "PRO" | "ECC" | "SNG" | "ISA" | "JER" | "LAM" | "EZK" | "DAN" | "HOS" | "JOL" | "AMO" |
"OBA" | "JON" | "MIC" | "NAM" | "HAB" | "ZEP" | "HAG" | "ZEC" | "MAL" |
// NEW TESTAMENT
"MAT" | "MRK" | "LUK" | "JHN" | "ACT" | "ROM" | "1CO" | "2CO" | "GAL" | "EPH" | "PHP" | "COL" | "1TH" | "2TH" | "1TI" |
"2TI" | "TIT" | "PHM" | "HEB" | "JAS" | "1PE" | "2PE" | "1JN" | "2JN" | "3JN" | "JUD" | "REV";


export interface IBook {
  acr: BOOK_OPT;
  name: string;
  nameEn: string;
  chapters: number;
}

export const BOOKS: Array<IBook> = [
  { acr: "GEN", name: "Gênesis", nameEn: "Genesis", chapters: 50 },
  { acr: "EXO", name: "Êxodo", nameEn: "Exodus", chapters: 40 },
  { acr: "LEV", name: "Levítico", nameEn: "Leviticus", chapters: 27 },
  { acr: "NUM", name: "Números", nameEn: "Numbers", chapters: 36 },
  { acr: "DEU", name: "Deuteronômio", nameEn: "Deuteronomy", chapters: 34 },
  { acr: "JOS", name: "Josué", nameEn: "Joshua", chapters: 24 },
  { acr: "JDG", name: "Juízes", nameEn: "Judges", chapters: 21 },
  { acr: "RUT", name: "Rute", nameEn: "Ruth", chapters: 4 },
  { acr: "1SA", name: "1 Samuel", nameEn: "1 Samuel", chapters: 31 },
  { acr: "2SA", name: "2 Samuel", nameEn: "2 Samuel", chapters: 24 },
  { acr: "1KI", name: "1 Reis", nameEn: "1 Kings", chapters: 22 },
  { acr: "2KI", name: "2 Reis", nameEn: "2 Kings", chapters: 25 },
  { acr: "1CH", name: "1 Crônicas", nameEn: "1 Chronicles", chapters: 29 },
  { acr: "2CH", name: "2 Crônicas", nameEn: "2 Chronicles", chapters: 36 },
  { acr: "EZR", name: "Esdras", nameEn: "Ezra", chapters: 10 },
  { acr: "NEH", name: "Neemias", nameEn: "Nehemiah", chapters: 13 },
  { acr: "EST", name: "Ester", nameEn: "Esther", chapters: 10 },
  { acr: "JOB", name: "Jó", nameEn: "Job", chapters: 42 },
  { acr: "PSA", name: "Salmos", nameEn: "Psalms", chapters: 150 },
  { acr: "PRO", name: "Provérbios", nameEn: "Proverbs", chapters: 31 },
  { acr: "ECC", name: "Eclesiastes", nameEn: "Ecclesiastes", chapters: 12 },
  { acr: "SNG", name: "Cantares", nameEn: "Song of Songs", chapters: 8 },
  { acr: "ISA", name: "Isaías", nameEn: "Isaiah", chapters: 66 },
  { acr: "JER", name: "Jeremias", nameEn: "Jeremiah", chapters: 52 },
  { acr: "LAM", name: "Lamentações", nameEn: "Lamentations", chapters: 5 },
  { acr: "EZK", name: "Ezequiel", nameEn: "Ezekiel", chapters: 48 },
  { acr: "DAN", name: "Daniel", nameEn: "Daniel", chapters: 12 },
  { acr: "HOS", name: "Oseias", nameEn: "Hosea", chapters: 14 },
  { acr: "JOL", name: "Joel", nameEn: "Joel", chapters: 3 },
  { acr: "AMO", name: "Amós", nameEn: "Amos", chapters: 9 },
  { acr: "OBA", name: "Obadias", nameEn: "Obadiah", chapters: 1 },
  { acr: "JON", name: "Jonas", nameEn: "Jonah", chapters: 4 },
  { acr: "MIC", name: "Miqueias", nameEn: "Micah", chapters: 7 },
  { acr: "NAM", name: "Naum", nameEn: "Nahum", chapters: 3 },
  { acr: "HAB", name: "Habacuque", nameEn: "Habakkuk", chapters: 3 },
  { acr: "ZEP", name: "Sofonias", nameEn: "Zephaniah", chapters: 3 },
  { acr: "HAG", name: "Ageu", nameEn: "Haggai", chapters: 2 },
  { acr: "ZEC", name: "Zacarias", nameEn: "Zechariah", chapters: 14 },
  { acr: "MAL", name: "Malaquias", nameEn: "Malachi", chapters: 4 },
  { acr: "MAT", name: "Mateus", nameEn: "Matthew", chapters: 28 },
  { acr: "MRK", name: "Marcos", nameEn: "Mark", chapters: 16 },
  { acr: "LUK", name: "Lucas", nameEn: "Luke", chapters: 24 },
  { acr: "JHN", name: "João", nameEn: "John", chapters: 21 },
  { acr: "ACT", name: "Atos", nameEn: "Acts", chapters: 28 },
  { acr: "ROM", name: "Romanos", nameEn: "Romans", chapters: 16 },
  { acr: "1CO", name: "1 Coríntios", nameEn: "1 Corinthians", chapters: 16 },
  { acr: "2CO", name: "2 Coríntios", nameEn: "2 Corinthians", chapters: 13 },
  { acr: "GAL", name: "Gálatas", nameEn: "Galatians", chapters: 6 },
  { acr: "EPH", name: "Efésios", nameEn: "Ephesians", chapters: 6 },
  { acr: "PHP", name: "Filipenses", nameEn: "Philippians", chapters: 4 },
  { acr: "COL", name: "Colossenses", nameEn: "Colossians", chapters: 4 },
  { acr: "1TH", name: "1 Tessalonicenses", nameEn: "1 Thessalonians", chapters: 5 },
  { acr: "2TH", name: "2 Tessalonicenses", nameEn: "2 Thessalonians", chapters: 3 },
  { acr: "1TI", name: "1 Timóteo", nameEn: "1 Timothy", chapters: 6 },
  { acr: "2TI", name: "2 Timóteo", nameEn: "2 Timothy", chapters: 4 },
  { acr: "TIT", name: "Tito", nameEn: "Titus", chapters: 3 },
  { acr: "PHM", name: "Filemon", nameEn: "Philemon", chapters: 1 },
  { acr: "HEB", name: "Hebreus", nameEn: "Hebrews", chapters: 13 },
  { acr: "JAS", name: "Tiago", nameEn: "James", chapters: 5 },
  { acr: "1PE", name: "1 Pedro", nameEn: "1 Peter", chapters: 5 },
  { acr: "2PE", name: "2 Pedro", nameEn: "2 Peter", chapters: 3 },
  { acr: "1JN", name: "1 João", nameEn: "1 John", chapters: 5 },
  { acr: "2JN", name: "2 João", nameEn: "2 John", chapters: 1 },
  { acr: "3JN", name: "3 João", nameEn: "3 John", chapters: 1 },
  { acr: "JUD", name: "Judas", nameEn: "Jude", chapters: 1 },
  { acr: "REV", name: "Revelações", nameEn: "Revelation", chapters: 22 },
];
