'use client';

import { useState } from 'react';
import { opportunities as initialOpportunities, Opportunity, Plus, TrendingUp, Target, ArrowRight } from 'lucide-react';

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newOpp, setNewOpp] = useState({
    title: '',
    source: '',
    status: 'lead' as const,
    value: 0,
    probability: 50,
  });

  const totalValue = opportunities.reduce((sum, o) => sum + o.value, 0);
  const weightedValue = opportunities.reduce((sum, o) => sum + (o.value * o.probability / 100), 0);
  const wonValue = opportunities.filter(o => o.status === 'won').reduce((sum, o) => sum + o.value, 0);

  const statusColors = {
    lead: 'neo-badge-red',
    negotiation: 'neo-badge-yellow',
    conversation: 'bg-blue-500/20 text-blue-500',
    won: 'neo-badge-green',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Opportunities</h1>
          <p className="text-gray-400 mt-1">Your consulting pipeline and business opportunities</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="neo-button flex items-center gap-2"
        >
          <Plus size={20} />
          Add Opportunity
        </button>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="neo-card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-neo-green/10 rounded-lg">
              <Target className="w-6 h-6 text-neo-green" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Pipeline Value</p>
              <p className="text-2xl font-bold text-white">
                {(totalValue / 1000).toFixed(0)}K SEK
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
              <p className="text-gray-400 text-sm">Weighted Value</p>
              <p className="text-2xl font-bold text-white">
                {(weightedValue / 1000).toFixed(0)}K SEK
              </p>
            </div>
          </div>
        </div>

        <div className="neo-card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <ArrowRight className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Won Deals</p>
              <p className="text-2xl font-bold text-white">
                {(wonValue / 1000).toFixed(0)}K SEK
              </p>
            </div>
          </div>
        </div>

        <div className="neo-card">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Target className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Active Deals</p>
              <p className="text-2xl font-bold text-white">
                {opportunities.filter(o => o.status !== 'won').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="neo-card">
          <h3 className="text-lg font-bold text-white mb-4">New Opportunity</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Title..."
              className="neo-input md:col-span-2"
              value={newOpp.title}
              onChange={(e) => setNewOpp({ ...newOpp, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Source..."
              className="neo-input"
              value={newOpp.source}
              onChange={(e) => setNewOpp({ ...newOpp, source: e.target.value })}
            />
            <select
              className="neo-input"
              value={newOpp.status}
              onChange={(e) => setNewOpp({ ...newOpp, status: e.target.value as any })}
            >
              <option value="lead">Lead</option>
              <option value="conversation">Conversation</option>
              <option value="negotiation">Negotiation</option>
              <option value="won">Won</option>
            </select>
            <input
              type="number"
              placeholder="Value..."
              className="neo-input"
              onChange={(e) => setNewOpp({ ...newOpp, value: parseFloat(e.target.value) })}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button 
              onClick={() => {
                if (newOpp.title && newOpp.value) {
                  setOpportunities([...opportunities, {
                    ...newOpp,
                    id: Date.now().toString(),
                    probability: newOpp.status === 'won' ? 100 : newOpp.probability,
                    createdAt: new Date().toISOString(),
                  }]);
                  setNewOpp({ title: '', source: '', status: 'lead', value: 0, probability: 50 });
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

      {/* Pipeline Funnel Visualization */}
      <div className="neo-card">
        <h2 className="text-lg font-bold text-white mb-6">Pipeline Funnel</h2>
        <div className="grid grid-cols-4 gap-4">
          {['lead', 'conversation', 'negotiation', 'won'].map((status, index) => {
            const count = opportunities.filter(o => o.status === status).length;
            const value = opportunities.filter(o => o.status === status).reduce((sum, o) => sum + o.value, 0);
            const width = Math.max(20, 100 - (index * 15));
            
            return (
              <div key={status} className="text-center">
                <div 
                  className="bg-neo-gray rounded-lg p-4 mb-2"
                  style={{ width: `${width}%`, margin: '0 auto' }}
                >
                  <p className="text-2xl font-bold text-white">{count}</p>
                  <p className="text-gray-400 text-sm capitalize">{status}</p>
                </div>
                <p className="text-neo-green text-sm font-mono">{(value / 1000).toFixed(0)}K</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {opportunities.map((opp) => (
          <div key={opp.id} className="neo-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={`neo-badge ${statusColors[opp.status]}`}>
                  {opp.status}
                </span>
                <div>
                  <h3 className="font-bold text-white">{opp.title}</h3>
                  <p className="text-gray-400 text-sm">{opp.source}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-white font-bold">{(opp.value / 1000).toFixed(0)}K SEK</p>
                  <p className="text-gray-400 text-sm">{opp.probability}% probability</p>
                </div>
                <div className="w-24">
                  <div className="h-2 bg-neo-gray rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        opp.status === 'won' ? 'bg-neo-green' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${opp.probability}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
