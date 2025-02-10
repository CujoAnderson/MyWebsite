import { useState } from 'react';
import { db } from '../../../lib/db';
import type { SharePermission } from '../types';
import { useStore } from '../../../store';

export function useSharing() {
  const [isSharing, setIsSharing] = useState(false);
  const user = useStore(state => state.user);

  const shareWriting = async (
    writingId: string,
    recipientEmail: string,
    permission: SharePermission
  ) => {
    if (!user) throw new Error('Must be logged in to share');
    
    setIsSharing(true);
    try {
      await db.execute({
        sql: `INSERT INTO shared_access (id, writing_id, user_id, recipient_email, permission)
              VALUES (?, ?, ?, ?, ?)`,
        args: [crypto.randomUUID(), writingId, user.id, recipientEmail, permission]
      });

      // Send email notification to recipient
      await sendSharingNotification(recipientEmail, writingId, permission);
    } finally {
      setIsSharing(false);
    }
  };

  return {
    shareWriting,
    isSharing
  };
}