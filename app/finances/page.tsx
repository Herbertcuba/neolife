'use client';

import { useState } from 'react';
import { 
  finances as initialFinances, 
  Finance, 
  Plus, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  PieChart,
  Wallet
} from 'lucide-react';
import { calculateTotalAssets, calculateTotalLiabilities, calculateNetWorth, calculateMonthlyIncome } from '@/lib/data';

export default function FinancesPage() {
  const [finances, setFinances] = useState(initialFinances);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    category: '',
    name: '',
    amount: 0,
    type: 'asset' as const,
  });

  const totalAssets = calculateTotalAssets();
  const totalLiabilities = calculateTotalLiabilities();
  const netWorth = calculateNetWorth();
  const monthlyIncome = calculateMonthlyIncome();

  const assets = finances.filter(f => f.type === 'asset');
  const liabilities = finances.filter(f => f.type === 'liability');
  const income = finances.filter(f => f.type === 'income');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Finances</h1>
          <p className="text-gray-400 mt-1">Your complete financial overview</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="neo-button flex items-center gap-2"
        >
          <Plus size={20} />
          Add Item
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="neo-card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Wallet className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Net Worth</p>
              <p className="text-2xl font-bold text-white">
                {(netWorth / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>
        </div>

        <div className="neo-card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-neo-green/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-neo-green" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Assets</p>
              <p className="text-2xl font-bold text-white">
                {(totalAssets / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>
        </div>

        <div className="neo-card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-500/10 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Liabilities</p>
              <p className="text-2xl font-bold text-white">
                {(totalLiabilities / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>
        </div>

        <div className="neo-card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Monthly Income</p>
              <p className="text-2xl font-bold text-white">
                {(monthlyIncome / 1000).toFixed(0)}K
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Net Worth Chart (Visual) */}
      <div className="neo-card">
        <h2 className="text-lg font-bold text-white mb-6">Net Worth Breakdown</h2>
        <div className="h-8 bg-neo-gray rounded-full overflow-hidden flex">
          <div 
            className="h-full bg-green-500"
            style={{ width: `${(totalAssets / (totalAssets + totalLiabilities)) * 100}%` }}
          />
          <div 
            className="h-full bg-red-500"
            style={{ width: `${(totalLiabilities / (totalAssets + totalLiabilities)) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-green-500">Assets: {formatCurrency(totalAssets)}</span>
          <span className="text-red-500">Liabilities: {formatCurrency(totalLiabilities)}</span>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="neo-card">
          <h3 className="text-lg font-bold text-white mb-4">Add Financial Item</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              className="neo-input"
              value={newItem.type}
              onChange={(e) => setNewItem({ ...newItem, type: e.target.value as any })}
            >
              <option value="asset">Asset</option>
              <option value="liability">Liability</option>
              <option value="income">Income</option>
            </select>
            <input
              type="text"
              placeholder="Category..."
              className="neo-input"
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            />
            <input
              type="text"
              placeholder="Name..."
              className="neo-input"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount..."
              className="neo-input"
              onChange={(e) => setNewItem({ ...newItem, amount: parseFloat(e.target.value) })}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button 
              onClick={() => {
                if (newItem.name && newItem.amount) {
                  setFinances([...finances, { ...newItem, id: Date.now().toString(), currency: 'SEK' }]);
                  setNewItem({ category: '', name: '', amount: 0, type: 'asset' });
                  setShowAddForm(false);
                }
              }} 
              className="neo-button"
            >
              Save
            </button>
            <button onClick={() => setShowAddForm(false)} className="neo-button bg-neo-gray">Cancel</button>
          </div>
        </div>
      )}

      {/* Assets */}
      <div className="neo-card">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <TrendingUp className="text-neo-green" size={20} />
          Assets
        </h2>
        <div className="space-y-3">
          {assets.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-neo-gray/50 rounded-lg">
              <div>
                <p className="font-medium text-white">{item.name}</p>
                <p className="text-gray-500 text-sm">{item.category}</p>
              </div>
              <p className="text-xl font-bold text-neo-green">{formatCurrency(item.amount)}</p>
            </div>
          ))}
          <div className="flex items-center justify-between p-4 bg-neo-green/10 rounded-lg border border-neo-green/30">
            <p className="font-bold text-white">Total Assets</p>
            <p className="text-xl font-bold text-neo-green">{formatCurrency(totalAssets)}</p>
          </div>
        </div>
      </div>

      {/* Liabilities */}
      <div className="neo-card">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <TrendingDown className="text-red-500" size={20} />
          Liabilities
        </h2>
        <div className="space-y-3">
          {liabilities.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-neo-gray/50 rounded-lg">
              <div>
                <p className="font-medium text-white">{item.name}</p>
                <p className="text-gray-500 text-sm">{item.category}</p>
              </div>
              <p className="text-xl font-bold text-red-500">{formatCurrency(item.amount)}</p>
            </div>
          ))}
          <div className="flex items-center justify-between p-4 bg-red-500/10 rounded-lg border border-red-500/30">
            <p className="font-bold text-white">Total Liabilities</p>
            <p className="text-xl font-bold text-red-500">{formatCurrency(totalLiabilities)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
