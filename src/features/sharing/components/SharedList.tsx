import React from 'react';
import { Users, Trash2 } from 'lucide-react';
import { db } from '../../../lib/db';
import type { SharedAccess } from '../types';

interface SharedListProps {
  writingId: string;
}

export default function SharedList({ writingId }: SharedListProps) {
  const [sharedWith, setSharedWith] = React.useState<SharedAccess[]>([]);

  React.useEffect(() => {
    loadSharedUsers();
  }, [writingId]);

  const loadSharedUsers = async () => {
    try {
      const shares = await db.sharedAccess
        .where('writingId')
        .equals(writingId)
        .toArray();
      setSharedWith(shares);
    } catch (error) {
      console.error('Failed to load shared users:', error);
    }
  };

  const removeAccess = async (accessId: string) => {
    try {
      await db.sharedAccess.delete(accessId);
      await loadSharedUsers();
    } catch (error) {
      console.error('Failed to remove access:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Users className="w-5 h-5 text-[#CFB53B]" />
        <h3 className="text-lg font-semibold text-[#CFB53B]">Shared With</h3>
      </div>

      {sharedWith.length === 0 ? (
        <p className="text-gray-400 text-sm">Not shared with anyone yet</p>
      ) : (
        <ul className="space-y-2">
          {sharedWith.map((access) => (
            <li key={access.id} className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg">
              <div>
                <p className="text-gray-200">{access.recipientEmail}</p>
                <p className="text-sm text-gray-400 capitalize">Can {access.permission}</p>
              </div>
              <button
                onClick={() => removeAccess(access.id)}
                className="p-1 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}