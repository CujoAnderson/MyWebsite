import React from 'react';
import { useForm } from 'react-hook-form';
import { User, Target, Heart, Swords } from 'lucide-react';
import type { Character } from '../types/analysis';

export default function CharacterForm() {
  const { register, handleSubmit } = useForm<Character>();

  const onSubmit = (data: Character) => {
    // Handle character data submission
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-indigo-600" />
          <input
            {...register('name')}
            placeholder="Character Name"
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
              <Target className="w-4 h-4" />
              <span>Goals</span>
            </label>
            <textarea
              {...register('goals')}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              rows={4}
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
              <Swords className="w-4 h-4" />
              <span>Conflicts</span>
            </label>
            <textarea
              {...register('conflicts')}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              rows={4}
            />
          </div>
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
            <Heart className="w-4 h-4" />
            <span>Character Arc</span>
          </label>
          <textarea
            {...register('arc')}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            rows={4}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Save Character
      </button>
    </form>
  );
}