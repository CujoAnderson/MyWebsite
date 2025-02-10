import React from 'react';
import { useStore } from '../../store';
import { UserRole, type User } from '../../types/auth';
import { Shield, Users } from 'lucide-react';

export default function UserManagement() {
  const { users, updateUserRole } = useStore();

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await updateUserRole(userId, newRole);
    } catch (error) {
      console.error('Failed to update user role:', error);
    }
  };

  return (
    <div className="ancient-panel p-6 rounded-lg">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="w-6 h-6 text-[#CFB53B]" />
        <h2 className="text-xl font-semibold text-[#CFB53B]">User Management</h2>
      </div>

      <div className="space-y-4">
        {users?.map((user: User) => (
          <div key={user.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-[#CFB53B]/30">
            <div>
              <p className="text-gray-200 font-medium">{user.name}</p>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-[#CFB53B]" />
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                className="ancient-input text-sm py-1"
              >
                {Object.values(UserRole).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}