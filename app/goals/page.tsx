'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Target } from 'lucide-react';
import { goals as initialGoals, Goal } from '@/lib/data';

export default function GoalsPage() {
  const [goals, setGoals] = useState(initialGoals);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    category: 'career' as const,
    targetDate: '',
  });

  const categories = [
    { value: 'career', label: 'Career', color: 'bg-blue-500/20 text-blue-500' },
    { value: 'wealth', label: 'Wealth', color: 'bg-green-500/20 text-green-500' },
    { value: 'health', label: 'Health', color: 'bg-red-500/20 text-red-500' },
    { value: 'family', label: 'Family', color: 'bg-yellow-500/20 text-yellow-500' },
  ];

  const addGoal = () => {
    if (!newGoal.title) return;
    
    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      category: newGoal.category,
      status: 'active',
      progress: 0,
      targetDate: newGoal.targetDate,
      createdAt: new Date().toISOString(),
    };
    
    setGoals([...goals, goal]);
    setNewGoal({ title: '', category: 'career', targetDate: '' });
    setShowAddForm(false);
  };

  const updateProgress = (id: string, progress: number) => {
    setGoals(goals.map(g => g.id === id ? { ...g, progress: Math.min(100, Math.max(0, progress)) } : g));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Goals</h1>
          <p className="text-gray-400 mt-1">Track your progress towards what matters</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="neo-button flex items-center gap-2"
        >
          <Plus size={20} />
          Add Goal
        </button>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <div className="neo-card">
          <h3 className="text-lg font-bold text-white mb-4">New Goal</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Goal title..."
              className="neo-input"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            />
            <select
              className="neo-input"
              value={newGoal.category}
              onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as any })}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            <input
              type="date"
              className="neo-input"
              value={newGoal.targetDate}
              onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button onClick={addGoal} className="neo-button">Save Goal</button>
            <button onClick={() => setShowAddForm(false)} className="neo-button bg-neo-gray">Cancel</button>
          </div>
        </div>
      )}

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const category = categories.find(c => c.value === goal.category);
          const daysLeft = Math.ceil((new Date(goal.targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
          
          return (
            <div key={goal.id} className="neo-card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`neo-badge ${category?.color}`}>{category?.label}</span>
                  {goal.status === 'completed' && (
                    <span className="neo-badge neo-badge-green">Completed</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-neo-gray rounded-lg transition-colors">
                    <Edit2 size={16} className="text-gray-400" />
                  </button>
                  <button 
                    onClick={() => setGoals(goals.filter(g => g.id !== goal.id))}
                    className="p-2 hover:bg-neo-gray rounded-lg transition-colors"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{goal.title}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">{goal.progress}%</span>
                </div>
                <div className="h-2 bg-neo-gray rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neo-green rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={goal.progress}
                  onChange={(e) => updateProgress(goal.id, parseInt(e.target.value))}
                  className="w-24 accent-neo-green"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
