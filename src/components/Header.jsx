import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  Layers, 
  MessageSquareCheck, 
  ChevronDown, 
  Lock, 
  Unlock, 
  ShieldCheck, 
  Check 
} from 'lucide-react';

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  groupMembers, 
  totalResponsesCount,
  isAdmin,
  setIsAdmin
}) {
  const [showRoster, setShowRoster] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handleMemberClick = (member) => {
    // Hidden Admin Trigger: If Kyeyune Neithen is clicked
    if (member.name.toLowerCase().includes('kyeyune neithen')) {
      if (isAdmin) {
        // Toggle off if already admin
        setIsAdmin(false);
      } else {
        setShowPasswordPrompt(true);
        setPasswordError(false);
        setPasswordInput('');
      }
    }
  };

  const handleVerifyPassword = (e) => {
    e.preventDefault();
    if (passwordInput === 'Kyeyuneneithen1$') {
      setIsAdmin(true);
      setShowPasswordPrompt(false);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

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
                {isAdmin && (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-amber-600" /> Admin Mode Active
                  </span>
                )}
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
                onClick={() => {
                  setShowRoster(false);
                  setShowPasswordPrompt(false);
                }}
                className="text-gray-400 hover:text-gray-700 text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            {/* Password Prompt Sub-view if Kyeyune Neithen was clicked */}
            {showPasswordPrompt ? (
              <form onSubmit={handleVerifyPassword} className="py-4 space-y-3">
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-1">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-gray-900">
                    <Lock className="w-3.5 h-3.5 text-gray-700" />
                    <span>Admin Authentication Required</span>
                  </div>
                  <p className="text-[11px] text-gray-600">
                    Enter administrator credentials for <strong>Kyeyune Neithen</strong> to manage and moderate public responses.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Password:
                  </label>
                  <input
                    type="password"
                    autoFocus
                    required
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setPasswordError(false);
                    }}
                    placeholder="Enter admin password..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                  />
                  {passwordError && (
                    <p className="text-[11px] text-rose-600 font-medium mt-1">
                      Incorrect password. Please verify and try again.
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPasswordPrompt(false)}
                    className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-1 px-4 py-1.5 rounded-lg bg-gray-900 hover:bg-black text-white text-xs font-semibold"
                  >
                    <Unlock className="w-3 h-3" />
                    <span>Unlock Admin</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="divide-y divide-gray-100 mt-2">
                {groupMembers.map((member, idx) => {
                  const isNeithen = member.name.toLowerCase().includes('kyeyune neithen');

                  return (
                    <div 
                      key={idx} 
                      onClick={() => handleMemberClick(member)}
                      className={`py-2.5 flex items-center justify-between transition-colors rounded-lg px-2 -mx-2 ${
                        isNeithen ? 'cursor-pointer hover:bg-gray-50' : ''
                      }`}
                      title={isNeithen ? (isAdmin ? 'Admin enabled. Click to disable.' : 'Admin verification') : undefined}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-700 text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                            <span>{member.name}</span>
                            {isNeithen && isAdmin && (
                              <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                                Admin
                              </span>
                            )}
                          </p>
                          <p className="text-[11px] text-gray-400">{member.role || 'Budget Analyst'}</p>
                        </div>
                      </div>
                      <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-100">
                        Verified
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Modal Footer */}
            <div className="mt-5 pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
              <span className="font-semibold text-gray-700">The Monets</span>
              <button
                onClick={() => {
                  setShowRoster(false);
                  setShowPasswordPrompt(false);
                }}
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
