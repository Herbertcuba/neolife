'use client';

import { useState } from 'react';
import { habits as initialHabits, Habit, Plus, Flame, Calendar, Check } from 'lucide-react';

export default function HabitsPage() {
  const [habits, setHabits] = useState(initialHabits);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHabit, setNewHabit] = useState({
    name: '',
    frequency: '',
    targetPerWeek: 1,
  });

  const completeHabit = (id: string) => {
    setHabits(habits.map(h => {
      if (h.id === id) {
        const updated = { 
          ...h, 
          completedThisWeek: h.completedThisWeek + 1,
          streak: h.lastCompleted === new Date().toISOString().split('T')[0] ? h.streak : h.streak + 1,
          lastCompleted: new Date().toISOString().split('T')[0]
        };
        return updated;
      }
      return h;
    }));
  };

  const addHabit = () => {
    if (!newHabit.name) return;
    
    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit.name,
      frequency: newHabit.frequency || 'Daily',
      streak: 0,
      lastCompleted: '',
      targetPerWeek: newHabit.targetPerWeek,
      completedThisWeek: 0,
    };
    
    setHabits([...habits, habit]);
    setNewHabit({ name: '', frequency: '', targetPerWeek: 1 });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Habits</h1>
          <p className="text-gray-400 mt-1">Consistency is what builds results</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="neo-button flex items-center gap-2"
        >
          <Plus size={20} />
          Add Habit
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="neo-card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/10 rounded-lg">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Longest Streak</p>
              <p className="text-2xl font-bold text-white">
                {Math.max(...habits.map(h => h.streak))} days
              </p>
            </div>
          </div>
        </div>
        <div className="neo-card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Check className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">This Week</p>
              <p className="text-2xl font-bold text-white">
                {habits.reduce((sum, h) => sum + h.completedThisWeek, 0)} / {
                  habits.reduce((sum, h) => sum + h.targetPerWeek, 0)
                }
              </p>
            </div>
          </div>
        </div>
        <div className="neo-card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-neo-green/10 rounded-lg">
              <Calendar className="w-6 h-6 text-neo-green" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Completion Rate</p>
              <p className="text-2xl font-bold text-white">
                {Math.round(
                  (habits.reduce((sum, h) => sum + h.completedThisWeek, 0) / 
                   habits.reduce((sum, h) => sum + h.targetPerWeek, 0)) * 100
                )}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Habit Form */}
      {showAddForm && (
        <div className="neo-card">
          <h3 className="text-lg font-bold text-white mb-4">New Habit</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Habit name..."
              className="neo-input"
              value={newHabit.name}
              onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Frequency (e.g., 3x per week)"
              className="neo-input"
              value={newHabit.frequency}
              onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value })}
            />
            <input
              type="number"
              min="1"
              max="7"
              className="neo-input"
              value={newHabit.targetPerWeek}
              onChange={(e) => setNewHabit({ ...newHabit, targetPerWeek: parseInt(e.target.value) })}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button onClick={addHabit} className="neo-button">Save Habit</button>
            <button onClick={() => setShowAddForm(false)} className="neo-button bg-neo-gray">Cancel</button>
          </div>
        </div>
      )}

      {/* Habits List */}
      <div className="space-y-4">
        {habits.map((habit) => {
          const isComplete = habit.completedThisWeek >= habit.targetPerWeek;
          const progress = (habit.completedThisWeek / habit.targetPerWeek) * 100;
          
          return (
            <div key={habit.id} className="neo-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => completeHabit(habit.id)}
                    disabled={isComplete}
                    className={`
                      w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all
                      ${isComplete 
                        ? 'bg-neo-green border-neo-green' 
                        : 'border-gray-500 hover:border-neo-green'
                      }
                      ${isComplete ? 'cursor-default' : 'cursor-pointer'}
                    `}
                  >
                    {isComplete ? (
                      <Check size={24} className="text-neo-black" />
                    ) : (
                      <span className="text-gray-500 text-lg">{habit.completedThisWeek}</span>
                    )}
                  </button>
                  <div>
                    <h3 className="text-lg font-bold text-white">{habit.name}</h3>
                    <p className="text-gray-400 text-sm">{habit.frequency}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-orange-500">
                      <Flame size={16} />
                      <span className="font-bold">{habit.streak}</span>
                    </div>
                    <p className="text-xs text-gray-500">streak</p>
                  </div>
                  
                  <div className="w-32">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Week</span>
                      <span className={isComplete ? 'text-neo-green' : 'text-gray-400'}>
                        {habit.completedThisWeek}/{habit.targetPerWeek}
                      </span>
                    </div>
                    <div className="h-2 bg-neo-gray rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          isComplete ? 'bg-neo-green' : 'bg-gray-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
