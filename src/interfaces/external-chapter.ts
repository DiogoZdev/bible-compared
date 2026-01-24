export interface IChapterResponse {
  translation: Translation
  book: Book
  chapter: Chapter
  thisChapterLink: string
  thisChapterAudioLinks: ThisChapterAudioLinks
  nextChapterApiLink: string
  nextChapterAudioLinks: NextChapterAudioLinks
  previousChapterApiLink: any
  previousChapterAudioLinks: any
  numberOfVerses: number
}

export interface Translation {
  id: string
  name: string
  website: string
  licenseUrl: string
  licenseNotes: any
  shortName: string
  englishName: string
  language: string
  textDirection: string
  sha256: string
  availableFormats: string[]
  listOfBooksApiLink: string
  completeTranslationApiLink: string
  numberOfBooks: number
  totalNumberOfChapters: number
  totalNumberOfVerses: number
  languageName: string
  languageEnglishName: string
}

export interface Book {
  id: string
  translationId: string
  name: string
  commonName: string
  title: string
  order: number
  numberOfChapters: number
  sha256: string
  firstChapterNumber: number
  firstChapterApiLink: string
  lastChapterNumber: number
  lastChapterApiLink: string
  totalNumberOfVerses: number
}

export interface Chapter {
  number: number
  content: Content[]
  footnotes: Footnote[]
}

export interface Content {
  type: string
  content?: any[]
  number?: number
}

export interface Footnote {
  noteId: number
  caller: string
  text: string
  reference: Reference
}

export interface Reference {
  chapter: number
  verse: number
}

export interface ThisChapterAudioLinks {
  gilbert: string
  hays: string
  souer: string
}

export interface NextChapterAudioLinks {
  gilbert: string
  hays: string
  souer: string
}
