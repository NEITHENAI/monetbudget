import React, { useState } from 'react';
import { X, Send, MessageSquarePlus, Sparkles, CheckCircle2 } from 'lucide-react';
import { REVENUE_STREAMS, EXPENDITURE_PROGRAMS } from '../data/budgetData';

export default function ReactionModal({ 
  isOpen, 
  onClose, 
  initialMetric, 
  onSubmitReaction 
}) {
  if (!isOpen) return null;

  // Combine all metrics for selectable dropdown
  const allMetrics = [
    ...REVENUE_STREAMS.map(r => ({ id: r.id, name: r.name, type: 'Revenue' })),
    ...EXPENDITURE_PROGRAMS.map(e => ({ id: e.id, name: e.name, type: 'Expenditure' })),
    { id: 'general_fiscal', name: 'Overall National Fiscal Strategy', type: 'General Policy' }
  ];

  const [name, setName] = useState('');
  const [role, setRole] = useState('Citizen / Student');
  const [selectedMetricId, setSelectedMetricId] = useState(
    initialMetric ? initialMetric.id : 'general_fiscal'
  );
  const [stance, setStance] = useState('Needs Higher Allocation');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const matched = allMetrics.find(m => m.id === selectedMetricId);

    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newResponse = {
      id: `resp_${Date.now()}`,
      name: name.trim(),
      role: role.trim(),
      targetMetricId: selectedMetricId,
      metricName: matched ? matched.name : 'National Budget Policy',
      stance: stance,
      priorityRank: 'High',
      comment: comment.trim(),
      timestamp: dateStr
    };

    onSubmitReaction(newResponse);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setComment('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border border-gray-200 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-xl bg-blue-50 text-blue-600">
              <MessageSquarePlus className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Submit Public Consultation Reaction
              </h3>
              <p className="text-xs text-gray-500">
                FY 2027/2028 Uganda National Budget Framework
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-gray-900">Reaction Recorded!</h4>
            <p className="text-xs text-gray-600">
              Your response has been permanently added to the public consultation evidence ledger.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
            
            {/* Target Metric Selector */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Target Budget Program / Metric:
              </label>
              <select
                value={selectedMetricId}
                onChange={(e) => setSelectedMetricId(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-medium focus:outline-none focus:ring-1 focus:ring-gray-900"
              >
                {allMetrics.map((m) => (
                  <option key={m.id} value={m.id}>
                    [{m.type}] {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Respondent Name & Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Your Full Name: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. David Okello"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Stakeholder Capacity / Occupation:
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Student, Farmer, Trader, Economist"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900"
                />
              </div>
            </div>

            {/* Stance Buttons */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                Your Fiscal Recommendation:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Needs Higher Allocation', badge: 'Increase' },
                  { label: 'Just Right', badge: 'Endorsed' },
                  { label: 'Too High', badge: 'Reduce / Cut' }
                ].map((s) => (
                  <button
                    type="button"
                    key={s.label}
                    onClick={() => setStance(s.label)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                      stance === s.label
                        ? 'bg-gray-900 text-white border-gray-900 shadow-xs'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span>{s.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recommendation Comment */}
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Your Reaction / Policy Justification: <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your specific thoughts on why this allocation should be adjusted or how funds should be utilized..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 leading-relaxed"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] text-gray-500">
                Permanently recorded in evidence ledger
              </span>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-semibold transition-all shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Reaction</span>
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
