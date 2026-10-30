import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  Layers, 
  MessageSquareCheck, 
  ChevronDown, 
  Landmark, 
  ExternalLink 
} from 'lucide-react';

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  groupMembers, 
  totalResponsesCount 
}) {
  const [showRoster, setShowRoster] = useState(false);

  return (
    <header className="no-print bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          {/* Brand & Academic Identity */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gray-900 text-white flex items-center justify-center font-black tracking-wider text-sm shadow-xs">
              M
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold tracking-tight text-gray-900">
                  THE MONETS
                </span>
                <span className="text-xs text-gray-300">|</span>
                <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">
                  Uganda Budget FY 2027/28
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium">
                National Budget Design & Citizen Public Consultation Platform
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            
            {/* View Switcher: Clean Pill Tabs */}
            <div className="flex items-center p-1 rounded-xl bg-gray-100 border border-gray-200 text-xs font-medium">
              <button
                onClick={() => setCurrentTab('budget')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  currentTab === 'budget'
                    ? 'bg-white text-gray-900 shadow-xs font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Budget Allocations</span>
              </button>

              <button
                onClick={() => setCurrentTab('evidence')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all relative ${
                  currentTab === 'evidence'
                    ? 'bg-white text-gray-900 shadow-xs font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MessageSquareCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Evidence of Responses</span>
                <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full ml-1">
                  {totalResponsesCount}
                </span>
              </button>

              <button
                onClick={() => setCurrentTab('brief')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  currentTab === 'brief'
                    ? 'bg-white text-gray-900 shadow-xs font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Executive Brief (PDF)</span>
              </button>
            </div>

            {/* 5 Group Members Button */}
            <button
              onClick={() => setShowRoster(true)}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 transition-all shadow-xs"
              title="View 5 Group Members"
            >
              <Users className="w-3.5 h-3.5 text-gray-500" />
              <span>5 Members</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

          </div>
        </div>
      </div>

      {/* Group Members Modal */}
      {showRoster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-gray-200 rounded-2xl max-w-md w-full p-6 shadow-xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-base font-bold text-gray-900">THE MONETS — Group Roster</h3>
                <p className="text-xs text-gray-500">Design the National Budget for Uganda FY 2027/2028</p>
              </div>
              <button
                onClick={() => setShowRoster(false)}
                className="text-gray-400 hover:text-gray-700 text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            <div className="divide-y divide-gray-100 mt-2">
              {groupMembers.map((member, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-700 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                      <p className="text-[11px] text-gray-400">{member.role || 'Budget Analyst'}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-100">
                    Verified
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
              <span>Department of Economics & Public Finance</span>
              <button
                onClick={() => setShowRoster(false)}
                className="px-4 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-semibold hover:bg-black transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
