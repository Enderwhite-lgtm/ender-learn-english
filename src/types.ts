
export enum WordType {
  NOUN = 'NOUN',
  VERB = 'VERB',
  ADJECTIVE = 'ADJECTIVE',
  ADVERB = 'ADVERB',
  LINKING_VERB = 'LINKING_VERB',
  NOTES = 'NOTES'
}

export interface RuleDetail {
  title: string;
  content: string[];
  examples?: string[];
  color: string;
}

export interface GrammarNode {
  type: WordType;
  label: string;
  shortLabel: string;
  description: string;
  details: RuleDetail[];
  position: { x: number; y: number };
}