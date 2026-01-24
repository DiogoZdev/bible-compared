export interface IChapter {
  versionTitle: string
  languageCode:string
  verses: {
    number: number,
    text: string
  }[]
}
