import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PermanentAnchorBar from './components/PermanentAnchorBar';
import RevenueSection from './components/RevenueSection';
import ExpenditureSection from './components/ExpenditureSection';
import EvidenceSection from './components/EvidenceSection';
import ReactionModal from './components/ReactionModal';
import ExecutiveBriefView from './components/ExecutiveBriefView';
import { 
  Coins, 
  Wallet, 
  MessageSquareCheck, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { 
  BUDGET_METADATA, 
  INITIAL_CITIZEN_RESPONSES, 
  REVENUE_STREAMS, 
  EXPENDITURE_PROGRAMS 
} from './data/budgetData';

export default function App() {
  // Navigation tabs: 'budget' | 'evidence' | 'brief'
  const [currentTab, setCurrentTab] = useState('budget');

  // Budget Sub-toggle: 'revenue' | 'expenditure' (they never appear simultaneously)
  const [budgetMode, setBudgetMode] = useState('expenditure'); // default to expenditure as most people look at spend first

  // Exact 5 Group Members for THE MONETS
  const [groupMembers] = useState([
    { name: 'Kyeyune Neithen', role: 'Lead Fiscal Modeler' },
    { name: 'Nankunda Angel', role: 'Revenue & Tax Analyst' },
    { name: 'Natuhwera Hellen', role: 'Expenditure & Social Policy' },
    { name: 'Namuswa Viola Christine', role: 'Public Debt Specialist' },
    { name: 'Tugumisirize Bruce', role: 'Consultation & Stakeholder Lead' },
  ]);

  // Citizen Responses state (stored in localStorage so reactions never disappear across refreshes!)
  const [responses, setResponses] = useState(() => {
    try {
      const saved = localStorage.getItem('THE_MONETS_BUDGET_RESPONSES');
      return saved ? JSON.parse(saved) : INITIAL_CITIZEN_RESPONSES;
    } catch {
      return INITIAL_CITIZEN_RESPONSES;
    }
  });

  // Save to localStorage whenever responses change
  useEffect(() => {
    try {
      localStorage.setItem('THE_MONETS_BUDGET_RESPONSES', JSON.stringify(responses));
    } catch (e) {
      console.error('Error saving responses:', e);
    }
  }, [responses]);

  // Metric Reaction Modal state
  const [isReactionModalOpen, setIsReactionModalOpen] = useState(false);
  const [activeReactionMetric, setActiveReactionMetric] = useState(null);

  const handleOpenMetricReaction = (metric) => {
    setActiveReactionMetric(metric);
    setIsReactionModalOpen(true);
  };

  const handleOpenGeneralFeedback = () => {
    setActiveReactionMetric(null);
    setIsReactionModalOpen(true);
  };

  const handleAddResponse = (newResponse) => {
    setResponses((prev) => [newResponse, ...prev]);
  };

  // Reactions count by target metric ID
  const metricReactionsCount = responses.reduce((acc, r) => {
    if (r.targetMetricId) {
      acc[r.targetMetricId] = (acc[r.targetMetricId] || 0) + 1;
    }
    return acc;
  }, {});

  // If in Executive Brief / PDF view:
  if (currentTab === 'brief') {
    return (
      <ExecutiveBriefView
        groupMembers={groupMembers}
        onBackToDashboard={() => setCurrentTab('budget')}
        responsesCount={responses.length}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] text-gray-900 flex flex-col justify-between selection:bg-gray-200">
      
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        groupMembers={groupMembers}
        totalResponsesCount={responses.length}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 w-full">
        
        {/* Permanent Top Key Anchor Figures (Always Visible) */}
        <PermanentAnchorBar
          totalResponsesCount={responses.length}
          onOpenGeneralFeedback={handleOpenGeneralFeedback}
        />

        {/* View 1: Main Budget Visualizer (with Switcher) */}
        {currentTab === 'budget' && (
          <div className="space-y-6">
            
            {/* The Interactive Switcher: REVENUE vs EXPENDITURE (Never simultaneous) */}
            <div className="bg-white border border-gray-200 rounded-2xl p-2 sm:p-2.5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-1.5 w-full sm:w-auto">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2">
                  Select Dimension:
                </span>

                <div className="flex p-1 rounded-xl bg-gray-100 border border-gray-200 w-full sm:w-auto">
                  <button
                    onClick={() => setBudgetMode('expenditure')}
                    className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                      budgetMode === 'expenditure'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Wallet className="w-3.5 h-3.5" />
                    <span>EXPENDITURE (Where Money Goes)</span>
                  </button>

                  <button
                    onClick={() => setBudgetMode('revenue')}
                    className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                      budgetMode === 'revenue'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Coins className="w-3.5 h-3.5" />
                    <span>REVENUE (Where Money Comes From)</span>
                  </button>
                </div>
              </div>

              {/* Quick Action Badges */}
              <div className="flex items-center space-x-2 self-end sm:self-center">
                <button
                  onClick={() => setCurrentTab('brief')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-gray-600" />
                  <span>Executive Briefing</span>
                </button>

                <button
                  onClick={() => setCurrentTab('evidence')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-900 hover:bg-black text-white transition-all shadow-xs"
                >
                  <MessageSquareCheck className="w-3.5 h-3.5 text-yellow-400" />
                  <span>View Evidence ({responses.length})</span>
                </button>
              </div>
            </div>

            {/* Display Either Revenue OR Expenditure */}
            {budgetMode === 'revenue' ? (
              <RevenueSection
                onReactToMetric={handleOpenMetricReaction}
                metricReactionsCount={metricReactionsCount}
              />
            ) : (
              <ExpenditureSection
                onReactToMetric={handleOpenMetricReaction}
                metricReactionsCount={metricReactionsCount}
              />
            )}

            {/* Citizen Feedback Callout Bar */}
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-yellow-400 block mb-1">
                  Public Participation Requirement
                </span>
                <h4 className="text-lg font-bold">Have your say on Uganda's FY 2027/2028 Priorities</h4>
                <p className="text-xs text-gray-300 mt-1 max-w-2xl">
                  Your feedback is permanently recorded in our public consultation evidence ledger for presentation to the academic panel.
                </p>
              </div>
              <button
                onClick={handleOpenGeneralFeedback}
                className="shrink-0 px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold transition-all shadow-sm"
              >
                + Submit Citizen Feedback
              </button>
            </div>

          </div>
        )}

        {/* View 2: Evidence of Responses Received */}
        {currentTab === 'evidence' && (
          <EvidenceSection
            responses={responses}
            onOpenGeneralFeedback={handleOpenGeneralFeedback}
          />
        )}

      </main>

      {/* Reactive Submission Modal */}
      <ReactionModal
        isOpen={isReactionModalOpen}
        onClose={() => setIsReactionModalOpen(false)}
        initialMetric={activeReactionMetric}
        onSubmitReaction={handleAddResponse}
      />

      {/* Clean Airbnb Footer */}
      <footer className="no-print border-t border-gray-200 bg-white py-6 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-gray-800">THE MONETS</span>
            <span> • </span>
            <span>Uganda National Budget FY 2027/2028 Consultation</span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <span>Offline Localhost Safe</span>
            <span>•</span>
            <button
              onClick={() => setCurrentTab('brief')}
              className="text-gray-900 font-medium hover:underline"
            >
              Executive Brief (PDF)
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentTab('evidence')}
              className="text-blue-600 font-medium hover:underline"
            >
              Evidence Ledger ({responses.length})
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
