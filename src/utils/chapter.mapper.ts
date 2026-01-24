import { IChapter } from "../interfaces/chapter";
import { IChapterResponse } from "../interfaces/external-chapter";

export class ChapterMapper {
  static toChapter(response: IChapterResponse): IChapter {
    return {
      versionTitle: response.translation.name.split('(')[0],
      languageCode: response.translation.language,
      verses: response.chapter.content
        .filter(item => item.type === 'verse')
        .map(verse => ({
          number: verse.number ?? 0,
          text: this.extractText(verse.content ?? [])
        }))
    };
  }

  private static extractText(contentArray: any[]): string {
    return contentArray
      .map(item => {
        if (typeof item === 'string') return item;
        if (item && typeof item === 'object' && item.text) return item.text;
        return '';
      })
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
}
