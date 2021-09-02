// https://github.com/andrejewski/himalaya/blob/master/text/ast-spec-v1.md

type Type = 'element' | 'comment' | 'text';

export interface Node {
  type: Type;
  position?: {
    start: Position;
    end: Position;
  };
}

export interface Attribute {
  key: string;
  value?: string;
}

export interface Comment extends Node {
  type: 'comment';
  content: string;
}

export interface Text extends Node {
  type: 'text';
  content: string;
}

export interface Element extends Node {
  type: 'element';
  tagName: string;
  children: Element[]; // This needs to be improved to handle all node types
  attributes: Attribute[];
}

export interface Position {
  index: number;
  line: number;
  column: number;
}
