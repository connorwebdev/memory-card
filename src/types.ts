export interface CardData {
  name: string;
  url: string;
}

export type CardClickFunction = (cardId: string) => void;
