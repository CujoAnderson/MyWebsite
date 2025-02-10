import Dexie from 'dexie';
import type { WritingPiece } from '../types/writing';
import type { User } from '../types/auth';
import type { SharedAccess } from '../features/sharing/types';

class WritingDatabase extends Dexie {
  users!: Table<User>;
  writingPieces!: Table<WritingPiece>;
  sharedAccess!: Table<SharedAccess>;

  constructor() {
    super('WritingDatabase');
    
    this.version(1).stores({
      users: 'id, email',
      writingPieces: 'id, userId, title, visibility',
      sharedAccess: 'id, writingId, userId, recipientEmail'
    });
  }
}

export const db = new WritingDatabase();