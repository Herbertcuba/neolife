'use client';

import { 
  Target, 
  Activity, 
  DollarSign, 
  TrendingUp,
  Brain,
  Calendar,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { 
  goals, 
  habits, 
  finances, 
  opportunities, 
  insights,
  calculateNetWorth,
  calculateMonthlyIncome,
  getOpportunityPipelineValue,
  getHabitCompletionRate
} from '@/lib/data';

export default function Dashboard() {
  const netWorth = calculateNetWorth();
  const monthlyIncome = calculateMonthlyIncome();
  const pipelineValue = getOpportunityPipelineValue();
  const habitRate = getHabitCompletionRate();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Good Evening, Herbert</h1>
          <p className="text-gray-400 mt-1">{new Date().toLocaleDateString('sv-SE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div className="neo-badge neo-badge-green">
          <Zap size={14} className="inline mr-1" />
          AI Active
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="neo-card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-neo-green/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-neo-green" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Net Worth</p>
              <p className="text-2xl font-bold text-white">
                {(netWorth / 1000000).toFixed(1)}M SEK
              </p>
            </div>
          </div>
        </div>

        <div className="neo-card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Monthly Income</p>
              <p className="text-2xl font-bold text-white">
                {monthlyIncome.toLocaleString()} SEK
              </p>
            </div>
          </div>
        </div>

        <div className="neo-card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <Target className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Pipeline Value</p>
              <p className="text-2xl font-bold text-white">
                {(pipelineValue / 1000).toFixed(0)}K SEK
              </p>
            </div>
          </div>
        </div>

        <div className="neo-card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Activity className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Habits This Week</p>
              <p className="text-2xl font-bold text-white">{habitRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="neo-card ai-pulse border-neo-green/30">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-neo-green" />
          <h2 className="text-lg font-bold text-white">AI Insights</h2>
        </div>
        <div className="space-y-4">
          {insights.filter(i => i.priority === 'high').slice(0, 3).map((insight) => (
            <div key={insight.id} className="flex items-start gap-4 p-4 bg-neo-gray/50 rounded-lg">
              <div className={`
                p-2 rounded-lg
                ${insight.type === 'health' ? 'bg-red-500/10' : ''}
                ${insight.type === 'career' ? 'bg-blue-500/10' : ''}
                ${insight.type === 'wealth' ? 'bg-green-500/10' : ''}
                ${insight.type === 'opportunity' ? 'bg-yellow-500/10' : ''}
              `}>
                <Zap className={`
                  w-4 h-4
                  ${insight.type === 'health' ? 'text-red-500' : ''}
                  ${insight.type === 'career' ? 'text-blue-500' : ''}
                  ${insight.type === 'wealth' ? 'text-green-500' : ''}
                  ${insight.type === 'opportunity' ? 'text-yellow-500' : ''}
                `} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-white">{insight.title}</p>
                <p className="text-gray-400 text-sm mt-1">{insight.message}</p>
                <p className="text-neo-green text-sm mt-2 font-mono">→ {insight.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals Progress */}
      <div className="neo-card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-yellow-500" />
            <h2 className="text-lg font-bold text-white">Active Goals</h2>
          </div>
          <Link href="/goals" className="text-neo-green text-sm hover:underline">
            View All →
          </Link>
        </div>
        <div className="space-y-4">
          {goals.filter(g => g.status === 'active').slice(0, 4).map((goal) => (
            <div key={goal.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white text-sm">{goal.title}</span>
                <span className="text-gray-400 text-sm">{goal.progress}%</span>
              </div>
              <div className="h-2 bg-neo-gray rounded-full overflow-hidden">
                <div 
                  className="h-full bg-neo-green rounded-full transition-all duration-500"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Habits & Opportunities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Habits */}
        <div className="neo-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-500" />
              <h2 className="text-lg font-bold text-white">Today's Habits</h2>
            </div>
            <Link href="/habits" className="text-neo-green text-sm hover:underline">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {habits.slice(0, 4).map((habit) => (
              <div key={habit.id} className="flex items-center justify-between p-3 bg-neo-gray/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${habit.completedThisWeek >= habit.targetPerWeek 
                      ? 'bg-neo-green border-neo-green' 
                      : 'border-gray-500'
                    }
                  `}>
                    {habit.completedThisWeek >= habit.targetPerWeek && (
                      <span className="text-neo-black text-xs">✓</span>
                    )}
                  </div>
                  <span className="text-white text-sm">{habit.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs">{habit.completedThisWeek}/{habit.targetPerWeek}/week</p>
                  <p className="text-neo-green text-xs">{habit.streak} day streak</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Opportunities */}
        <div className="neo-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-neo-green" />
              <h2 className="text-lg font-bold text-white">Top Opportunities</h2>
            </div>
            <Link href="/opportunities" className="text-neo-green text-sm hover:underline">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {opportunities.slice(0, 4).map((opp) => (
              <div key={opp.id} className="p-3 bg-neo-gray/50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-sm font-medium">{opp.title}</span>
                  <span className={`
                    neo-badge
                    ${opp.status === 'won' ? 'neo-badge-green' : ''}
                    ${opp.status === 'negotiation' ? 'neo-badge-yellow' : ''}
                    ${opp.status === 'conversation' ? 'bg-blue-500/20 text-blue-500' : ''}
                    ${opp.status === 'lead' ? 'neo-badge-red' : ''}
                  `}>
                    {opp.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{opp.source}</span>
                  <span className="text-neo-green">{(opp.value * opp.probability / 1000).toFixed(0)}K SEK expected</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="neo-card">
        <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/goals" className="neo-button text-center text-sm">
            + Add Goal
          </Link>
          <Link href="/habits" className="neo-button text-center text-sm">
            + Log Habit
          </Link>
          <Link href="/finances" className="neo-button text-center text-sm">
            + Add Transaction
          </Link>
          <Link href="/opportunities" className="neo-button text-center text-sm">
            + Add Opportunity
          </Link>
        </div>
      </div>
    </div>
  );
}
