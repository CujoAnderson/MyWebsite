export type SharePermission = 'view' | 'comment' | 'edit';

export interface SharedAccess {
  id: string;
  writingId: string;
  userId: string;
  recipientEmail: string;
  permission: SharePermission;
  createdAt: Date;
}

export interface SharingSettings {
  isPublic: boolean;
  allowComments: boolean;
  allowSharing: boolean;
}