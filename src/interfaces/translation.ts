export interface ITranslation {
  id: string,
  name: string,
  website: string,
  licenseUrl: string,
  licenseNotes: string,
  shortName: string,
  englishName: string,
  language: string,
  textDirection: string,
  sha256: string,
  availableFormats: string[],
  listOfBooksApiLink: string,
  completeTranslationApiLink: string,
  numberOfBooks: number,
  totalNumberOfChapters: number,
  totalNumberOfVerses: number,
  languageName: string,
  languageEnglishName: string
}

export interface ITranslationResponse {
  translations: ITranslation[];
}
