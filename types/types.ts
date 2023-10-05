export type OpenAIModel = 'gpt-3.5-turbo' | 'gpt-4';

export interface TranslateBody {
  inputLanguage: string;
  // outputLanguage: string;
  keyWords: string;
  model: OpenAIModel;
  type: string;
  // apiKey: string;
}

export interface TranslateResponse {
  code: string;
}
