import { Injectable, effect, signal } from '@angular/core';

export type Language = 'pt' | 'en';

const STORAGE_KEY = 'bible-compared-language';

const PT = {
  'brand.primary': 'Bíblia',
  'brand.secondary': 'Comparativa',
  'brand.full': 'Bíblia Comparativa',

  'nav.home': 'Início',
  'nav.about': 'Sobre o Projeto',

  'menu.open': 'Abrir menu',
  'menu.close': 'Fechar menu',
  'menu.language': 'Idioma',
  'menu.theme': 'Tema',

  'theme.select': 'Selecionar tema',
  'theme.light': 'Tema claro',
  'theme.dark': 'Tema escuro',
  'theme.system': 'Tema do sistema',

  'language.select': 'Selecionar idioma',
  'language.pt': 'Português',
  'language.en': 'English',

  'header.loadingVersions': 'Carregando versões...',

  'chapter.awaitingSelection': 'Aguardando seleção de livro',
  'chapter.loadError': 'Erro ao carregar',
  'chapter.placeholder': 'No princípio ...',

  'home.tips.title': 'Dicas',
  'home.tips.selectors':
    'Selecione o livro, o capítulo e as versões acima — o texto carrega automaticamente.',
  'home.tips.clickVerseStrong': 'clique em qualquer versículo',
  'home.tips.clickVerseRest': ' para centralizá-lo em ambas as colunas.',
  'home.tips.mobile': 'No celular, use as abas A e B para alternar entre as traduções.',
  'home.tips.dismiss': 'Entendi',
  'home.steps.choose': 'Escolha',
  'home.steps.compare': 'Compare',
  'home.steps.focus': 'Foque',
  'home.tabs.left': 'Tradução A',
  'home.tabs.right': 'Tradução B',

  'footer.description':
    'Uma ferramenta minimalista para o estudo profundo das Escrituras, permitindo a comparação direta entre diferentes traduções e idiomas.',
  'footer.privacy.title': 'Sua Privacidade',
  'footer.privacy.noData': 'Privacidade total: não coletamos dados',
  'footer.privacy.local': 'Processamento local no navegador',
  'footer.privacy.noCookies': 'Nenhum cookie de rastreamento é utilizado.',
  'footer.copyright': 'Bíblia Comparativa. Desenvolvido para a comunidade.',

  'about.eyebrow': 'Sobre o Projeto',
  'about.subtitle':
    'Uma ferramenta desenvolvida para facilitar o estudo exegético e a análise textual das Escrituras.',
  'about.tool.title': 'A Ferramenta',
  'about.tool.paragraphBefore':
    'A Bíblia Comparativa nasceu da necessidade de visualizar múltiplas traduções simultaneamente sem distrações. O foco aqui é o ',
  'about.tool.paragraphStrong': 'texto',
  'about.tool.paragraphAfter': '.',
  'about.tool.bullet1': 'Comparação lado a lado de versões em PT, EN, ES e Latim.',
  'about.tool.bullet2': 'Interface minimalista focada na leitura profunda.',
  'about.tool.bullet3': 'Privacidade total: processamento local e sem rastreamento.',
  'about.dev.title': 'O Desenvolvedor',
  'about.dev.introBefore': 'Olá, sou ',
  'about.dev.introAfter':
    '. Sou um desenvolvedor apaixonado por transformar lógica complexa em interfaces fluidas e performáticas.',
  'about.dev.point1':
    'Desenvolvedor web em ecossistemas modernos como Angular e Tailwind CSS.',
  'about.dev.point2': 'Focado na criação de ferramentas que agreguem valor real às pessoas.',
  'about.dev.link': 'Saiba mais sobre mim',
} as const;

export type TranslationKey = keyof typeof PT;

const EN: Record<TranslationKey, string> = {
  'brand.primary': 'Bible',
  'brand.secondary': 'Compared',
  'brand.full': 'Bible Compared',

  'nav.home': 'Home',
  'nav.about': 'About the Project',

  'menu.open': 'Open menu',
  'menu.close': 'Close menu',
  'menu.language': 'Language',
  'menu.theme': 'Theme',

  'theme.select': 'Select theme',
  'theme.light': 'Light theme',
  'theme.dark': 'Dark theme',
  'theme.system': 'System theme',

  'language.select': 'Select language',
  'language.pt': 'Portuguese',
  'language.en': 'English',

  'header.loadingVersions': 'Loading versions...',

  'chapter.awaitingSelection': 'Waiting for book selection',
  'chapter.loadError': 'Could not load chapter',
  'chapter.placeholder': 'In the beginning ...',

  'home.tips.title': 'Tips',
  'home.tips.selectors':
    'Select the book, chapter, and versions above — the text loads automatically.',
  'home.tips.clickVerseStrong': 'click any verse',
  'home.tips.clickVerseRest': ' to center it in both columns.',
  'home.tips.mobile': 'On mobile, use tabs A and B to switch between translations.',
  'home.tips.dismiss': 'Got it',
  'home.steps.choose': 'Choose',
  'home.steps.compare': 'Compare',
  'home.steps.focus': 'Focus',
  'home.tabs.left': 'Translation A',
  'home.tabs.right': 'Translation B',

  'footer.description':
    'A minimalist tool for deep study of the Scriptures, allowing direct comparison between different translations and languages.',
  'footer.privacy.title': 'Your Privacy',
  'footer.privacy.noData': "Complete privacy: we don't collect data",
  'footer.privacy.local': 'Local processing in your browser',
  'footer.privacy.noCookies': 'No tracking cookies are used.',
  'footer.copyright': 'Bible Compared. Built for the community.',

  'about.eyebrow': 'About the Project',
  'about.subtitle':
    'A tool built to make exegetical study and textual analysis of the Scriptures easier.',
  'about.tool.title': 'The Tool',
  'about.tool.paragraphBefore':
    'Bible Compared was born from the need to view multiple translations at once without distractions. The focus here is the ',
  'about.tool.paragraphStrong': 'text',
  'about.tool.paragraphAfter': '.',
  'about.tool.bullet1': 'Side-by-side comparison of versions in PT, EN, ES, and Latin.',
  'about.tool.bullet2': 'A minimalist interface focused on deep reading.',
  'about.tool.bullet3': 'Complete privacy: local processing and no tracking.',
  'about.dev.title': 'The Developer',
  'about.dev.introBefore': "Hi, I'm ",
  'about.dev.introAfter':
    ". I'm a developer passionate about turning complex logic into fluid, high-performance interfaces.",
  'about.dev.point1': 'Web developer in modern ecosystems such as Angular and Tailwind CSS.',
  'about.dev.point2': 'Focused on building tools that add real value to people’s lives.',
  'about.dev.link': 'Learn more about me',
};

const TRANSLATIONS: Record<Language, Record<TranslationKey, string>> = {
  pt: PT,
  en: EN,
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly selectedLanguage = signal<Language>(this.readStoredLanguage());

  readonly language = this.selectedLanguage.asReadonly();

  constructor() {
    effect(() => {
      const language = this.selectedLanguage();
      const htmlLang = language === 'pt' ? 'pt-BR' : 'en';

      document.documentElement.lang = htmlLang;
      document.title = TRANSLATIONS[language]['brand.full'];

      try {
        localStorage.setItem(STORAGE_KEY, language);
      } catch {
        // Storage may be unavailable; the selected language still applies in-session.
      }
    });
  }

  setLanguage(language: Language) {
    this.selectedLanguage.set(language);
  }

  t(key: TranslationKey, params?: Record<string, string | number>): string {
    let text = TRANSLATIONS[this.selectedLanguage()][key];

    if (params) {
      for (const [name, value] of Object.entries(params)) {
        text = text.replaceAll(`{${name}}`, String(value));
      }
    }

    return text;
  }

  private readStoredLanguage(): Language {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'pt' || stored === 'en') return stored;
    } catch {
      // Fall through to the browser language.
    }

    if (typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('pt')) {
      return 'pt';
    }

    return 'en';
  }
}
