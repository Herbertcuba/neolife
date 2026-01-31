// Herbert's real data for NeoLife Dashboard

export interface Goal {
  id: string;
  title: string;
  category: 'career' | 'wealth' | 'health' | 'family';
  status: 'active' | 'completed' | 'paused';
  progress: number;
  targetDate: string;
  createdAt: string;
}

export interface Habit {
  id: string;
  name: string;
  frequency: string;
  streak: number;
  lastCompleted: string;
  targetPerWeek: number;
  completedThisWeek: number;
}

export interface Finance {
  id: string;
  category: string;
  name: string;
  amount: number;
  type: 'asset' | 'income' | 'expense' | 'liability';
  currency: string;
}

export interface Opportunity {
  id: string;
  title: string;
  source: string;
  status: 'lead' | 'conversation' | 'negotiation' | 'won';
  value: number;
  probability: number;
  createdAt: string;
}

export interface Insight {
  id: string;
  type: 'career' | 'wealth' | 'health' | 'opportunity';
  title: string;
  message: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
}

// Herbert's Real Goals
export const goals: Goal[] = [
  {
    id: '1',
    title: 'Build independent consulting practice',
    category: 'career',
    status: 'active',
    progress: 15,
    targetDate: '2026-06-30',
    createdAt: '2026-01-15',
  },
  {
    id: '2',
    title: 'Flip Kruthubacken apartment for 200-400K profit',
    category: 'wealth',
    status: 'active',
    progress: 10,
    targetDate: '2027-01-01',
    createdAt: '2026-01-10',
  },
  {
    id: '3',
    title: 'Reach 10,000 LinkedIn followers',
    category: 'career',
    status: 'active',
    progress: 50,
    targetDate: '2026-06-01',
    createdAt: '2026-01-01',
  },
  {
    id: '4',
    title: 'Improve sleep (bed by 23:00)',
    category: 'health',
    status: 'active',
    progress: 20,
    targetDate: '2026-03-01',
    createdAt: '2026-01-01',
  },
  {
    id: '5',
    title: 'Lose 10kg, improve physique',
    category: 'health',
    status: 'active',
    progress: 5,
    targetDate: '2026-06-01',
    createdAt: '2026-01-01',
  },
  {
    id: '6',
    title: 'Gym 3x/week consistently',
    category: 'health',
    status: 'active',
    progress: 60,
    targetDate: '2026-12-31',
    createdAt: '2026-01-01',
  },
  {
    id: '7',
    title: 'Launch AI Newsletter',
    category: 'career',
    status: 'active',
    progress: 25,
    targetDate: '2026-04-01',
    createdAt: '2026-01-15',
  },
  {
    id: '8',
    title: 'Secure 2-3 Fractional CTO clients',
    category: 'career',
    status: 'active',
    progress: 0,
    targetDate: '2026-09-01',
    createdAt: '2026-01-20',
  },
];

// Herbert's Real Habits
export const habits: Habit[] = [
  {
    id: '1',
    name: 'Gym session',
    frequency: '3x per week',
    streak: 4,
    lastCompleted: '2026-01-30',
    targetPerWeek: 3,
    completedThisWeek: 2,
  },
  {
    id: '2',
    name: 'Running',
    frequency: '1x per week',
    streak: 2,
    lastCompleted: '2026-01-28',
    targetPerWeek: 1,
    completedThisWeek: 1,
  },
  {
    id: '3',
    name: 'LinkedIn post',
    frequency: '3x per week',
    streak: 1,
    lastCompleted: '2026-01-31',
    targetPerWeek: 3,
    completedThisWeek: 1,
  },
  {
    id: '4',
    name: 'Sleep before 23:00',
    frequency: 'Daily',
    streak: 0,
    lastCompleted: '2026-01-25',
    targetPerWeek: 7,
    completedThisWeek: 2,
  },
  {
    id: '5',
    name: 'Reading (30 min)',
    frequency: 'Daily',
    streak: 3,
    lastCompleted: '2026-01-31',
    targetPerWeek: 7,
    completedThisWeek: 5,
  },
];

// Herbert's Real Finances
export const finances: Finance[] = [
  // Assets
  { id: '1', category: 'Investments', name: 'AI Stocks (Avanza)', amount: 250000, type: 'asset', currency: 'SEK' },
  { id: '2', category: 'Pension', name: 'Pension Fund', amount: 700000, type: 'asset', currency: 'SEK' },
  { id: '3', category: 'Real Estate', name: 'Villa (Lövgatan 15)', amount: 14000000, type: 'asset', currency: 'SEK' },
  { id: '4', category: 'Real Estate', name: 'Apartment (Kruthubacken 80)', amount: 2450000, type: 'asset', currency: 'SEK' },
  { id: '5', category: 'Investments', name: 'Eidra Partnership', amount: 800000, type: 'asset', currency: 'SEK' },
  
  // Income
  { id: '6', category: 'Salary', name: 'Herbert (Umain)', amount: 89000, type: 'income', currency: 'SEK' },
  { id: '7', category: 'Salary', name: 'Camilla (Tax Lawyer)', amount: 96000, type: 'income', currency: 'SEK' },
  
  // Liabilities
  { id: '8', category: 'Mortgage', name: 'Villa Mortgage', amount: -7000000, type: 'liability', currency: 'SEK' },
];

// Herbert's Real Opportunities
export const opportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Marbella Consulting Practice',
    source: 'Self-identification',
    status: 'lead',
    value: 200000,
    probability: 30,
    createdAt: '2026-01-31',
  },
  {
    id: '2',
    title: 'Fractional CTO Client #1',
    source: 'LinkedIn Outreach',
    status: 'conversation',
    value: 250000,
    probability: 50,
    createdAt: '2026-01-25',
  },
  {
    id: '3',
    title: 'Fractional CTO Client #2',
    source: 'Network',
    status: 'lead',
    value: 200000,
    probability: 20,
    createdAt: '2026-01-28',
  },
  {
    id: '4',
    title: 'Startup OLÉ Speaking',
    source: 'Event',
    status: 'lead',
    value: 50000,
    probability: 15,
    createdAt: '2026-01-30',
  },
  {
    id: '5',
    title: 'AI Newsletter Paid Subscribers',
    source: 'Content Strategy',
    status: 'lead',
    value: 120000,
    probability: 40,
    createdAt: '2026-01-20',
  },
];

// AI-Generated Insights
export const insights: Insight[] = [
  {
    id: '1',
    type: 'health',
    title: 'Sleep Crisis Detected',
    message: 'Your average bedtime is 01:00 - this is affecting your gym performance and decision-making.',
    action: 'Try the 23:00 bedtime challenge for 7 days',
    priority: 'high',
  },
  {
    id: '2',
    type: 'career',
    title: 'LinkedIn Growth Opportunity',
    message: 'With 5,000 followers and strategic posts, you could reach 10K by June. Your "Why I\'m Leaving Corporate" post concept is strong.',
    action: 'Launch the LinkedIn Sprint tomorrow',
    priority: 'high',
  },
  {
    id: '3',
    type: 'wealth',
    title: 'Apartment Flip Window',
    message: 'Kruthubacken apartment could flip for 200-400K profit in late 2026/early 2027. Start preparing now.',
    action: 'Research renovation costs and timeline',
    priority: 'medium',
  },
  {
    id: '4',
    type: 'opportunity',
    title: 'Marbella Market Timing',
    message: 'Spain\'s tech ecosystem growing 29.7% YoY. Your AI + CMS expertise is highly marketable there.',
    action: 'Reach out to Marbella Business Club',
    priority: 'medium',
  },
  {
    id: '5',
    type: 'career',
    title: 'Consulting Pipeline Building',
    message: 'You need 3-4 clients for €45-100K/month income. Start outreach now for Q2 launch.',
    action: 'Send 10 personalized emails to target companies',
    priority: 'high',
  },
];

// Helper functions
export function calculateTotalAssets(): number {
  return finances
    .filter(f => f.type === 'asset')
    .reduce((sum, f) => sum + f.amount, 0);
}

export function calculateTotalLiabilities(): number {
  return Math.abs(finances
    .filter(f => f.type === 'liability')
    .reduce((sum, f) => sum + f.amount, 0));
}

export function calculateNetWorth(): number {
  return calculateTotalAssets() - calculateTotalLiabilities();
}

export function calculateMonthlyIncome(): number {
  return finances
    .filter(f => f.type === 'income')
    .reduce((sum, f) => sum + f.amount, 0);
}

export function getOpportunityPipelineValue(): number {
  return opportunities.reduce((sum, o) => sum + (o.value * o.probability / 100), 0);
}

export function getHabitCompletionRate(): number {
  const total = habits.reduce((sum, h) => sum + h.targetPerWeek, 0);
  const completed = habits.reduce((sum, h) => sum + h.completedThisWeek, 0);
  return Math.round((completed / total) * 100);
}
