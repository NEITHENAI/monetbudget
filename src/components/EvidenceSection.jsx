import React, { useState } from 'react';
import { 
  UsersRound, 
  MessageSquareCheck, 
  Download, 
  Sparkles, 
  Search, 
  Filter, 
  ThumbsUp, 
  ThumbsDown, 
  Minus, 
  CheckCircle2, 
  Calendar 
} from 'lucide-react';

export default function EvidenceSection({ responses, onOpenGeneralFeedback }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStance, setFilterStance] = useState('all');

  const filteredResponses = responses.filter(r => {
    const matchesSearch = 
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.metricName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStance === 'all' || r.stance === filterStance;

    return matchesSearch && matchesFilter;
  });

  // Calculate sentiment summary
  const stanceCounts = responses.reduce((acc, r) => {
    acc[r.stance] = (acc[r.stance] || 0) + 1;
    return acc;
  }, {});

  const downloadCSV = () => {
    const headers = "Respondent Name,Role/Stakeholder,Budget Metric,Stance,Priority Rank,Comment,Timestamp\n";
    const rows = responses.map(r => 
      `"${r.name}","${r.role || 'Citizen'}","${r.metricName}","${r.stance}","${r.priorityRank || 'Normal'}","${r.comment.replace(/"/g, '""')}","${r.timestamp}"`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'UGANDA_BUDGET_2027_28_CITIZEN_EVIDENCE.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Evidence Banner */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <MessageSquareCheck className="w-4 h-4" />
              <span>Project Semester Requirement Evidence</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Evidence of Responses Received (Public Consultation)
            </h3>
            <p className="text-xs text-gray-600 mt-1 max-w-3xl leading-relaxed">
              In strict accordance with the semester instructions (<em>"Design a Web site on the Internet for your results and show evidence of the responses received"</em>), this ledger transparently displays citizen submissions, stakeholder sentiments, and policy recommendations for the FY 2027/2028 budget draft.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenGeneralFeedback}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-semibold transition-all shadow-xs"
            >
              <span>+ Submit Your Reaction</span>
            </button>

            <button
              onClick={downloadCSV}
              className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-all border border-gray-200"
              title="Download verified responses as CSV"
            >
              <Download className="w-3.5 h-3.5 text-gray-600" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Evidence Summary Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-gray-100">
          <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
            <span className="text-[10px] text-gray-500 uppercase font-semibold block">Total Submissions</span>
            <span className="text-xl font-bold text-gray-900 font-mono">{responses.length}</span>
            <span className="text-[10px] text-emerald-600 font-medium block mt-0.5">● Active Ledger</span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
            <span className="text-[10px] text-emerald-700 uppercase font-semibold block">Needs More Funds</span>
            <span className="text-xl font-bold text-emerald-800 font-mono">{stanceCounts['Needs Higher Allocation'] || 0}</span>
            <span className="text-[10px] text-emerald-600 block mt-0.5">Health, PDM & Solar</span>
          </div>

          <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100">
            <span className="text-[10px] text-blue-700 uppercase font-semibold block">Endorsed / Just Right</span>
            <span className="text-xl font-bold text-blue-800 font-mono">{stanceCounts['Just Right'] || 0}</span>
            <span className="text-[10px] text-blue-600 block mt-0.5">SGR, Roads & Oil Fund</span>
          </div>

          <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-100">
            <span className="text-[10px] text-rose-700 uppercase font-semibold block">Advised Cut / Too High</span>
            <span className="text-xl font-bold text-rose-800 font-mono">{stanceCounts['Too High'] || 0}</span>
            <span className="text-[10px] text-rose-600 block mt-0.5">Debt Service, Data Tax</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by respondent, metric, or keyword..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-gray-500 font-medium">Filter Stance:</span>
          <select
            value={filterStance}
            onChange={(e) => setFilterStance(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-700 font-medium focus:outline-none"
          >
            <option value="all">All Stances ({responses.length})</option>
            <option value="Needs Higher Allocation">Needs Higher Allocation</option>
            <option value="Just Right">Just Right / Endorsed</option>
            <option value="Too High">Too High / Cut Advised</option>
          </select>
        </div>
      </div>

      {/* The Evidence Response Feed (Persistent and Never Disappears) */}
      <div className="space-y-3">
        {filteredResponses.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center text-gray-500 text-xs">
            No responses match your search filter. Click "+ Submit Your Reaction" to add one!
          </div>
        ) : (
          filteredResponses.map((item) => {
            const isIncrease = item.stance === 'Needs Higher Allocation';
            const isNeutral = item.stance === 'Just Right';
            const isCut = item.stance === 'Too High';

            return (
              <div 
                key={item.id}
                className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-gray-300 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  {/* Top Metadata Header */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                      {item.role || 'Citizen / Stakeholder'}
                    </span>
                    <span className="text-xs text-gray-300">|</span>
                    <span className="text-[11px] text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md font-semibold">
                      Metric: {item.metricName}
                    </span>
                  </div>

                  {/* Comment Body */}
                  <p className="text-xs text-gray-700 leading-relaxed pt-1">
                    "{item.comment}"
                  </p>

                  <div className="flex items-center space-x-3 text-[10px] text-gray-400 pt-1">
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      {item.timestamp}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Submission Evidence
                    </span>
                  </div>
                </div>

                {/* Stance Pill */}
                <div className="shrink-0 self-start sm:self-center">
                  <span className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${
                    isIncrease 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                      : isNeutral
                      ? 'bg-blue-50 text-blue-800 border-blue-200'
                      : 'bg-rose-50 text-rose-800 border-rose-200'
                  }`}>
                    {isIncrease && <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />}
                    {isNeutral && <Minus className="w-3.5 h-3.5 text-blue-600" />}
                    {isCut && <ThumbsDown className="w-3.5 h-3.5 text-rose-600" />}
                    <span>{item.stance}</span>
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
