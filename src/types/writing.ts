export interface WritingPiece {
  id?: number;
  userId: string;
  title: string;
  content: string;
  visibility: 'private' | 'public' | 'shared';
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id?: number;
  writingPieceId: number;
  userId: string;
  content: string;
  createdAt: Date;
}