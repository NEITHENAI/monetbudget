import React from 'react';
import { 
  Landmark, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  Scale, 
  UsersRound, 
  Coins 
} from 'lucide-react';
import { BUDGET_METADATA } from '../data/budgetData';

export default function PermanentAnchorBar({ totalResponsesCount, onOpenGeneralFeedback }) {
  const formatTrillion = (billions) => (billions / 1000).toFixed(2);

  return (
    <div className="mb-8">
      {/* Small Context Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Official Draft Fiscal Framework • FY {BUDGET_METADATA.fiscalYear}
          </span>
        </div>
        <div className="text-xs text-gray-500 font-medium">
          Uganda National Vision 2040 & NDP IV Benchmark
        </div>
      </div>

      {/* 5 Permanent Top Anchors (Never disappear when toggling Revenue vs Expenditure) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        
        {/* Card 1: Total Budget Envelope */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs hover:border-gray-300 transition-all">
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold mb-2">
            <span>TOTAL ENVELOPE</span>
            <span className="p-1.5 rounded-lg bg-gray-100 text-gray-700">
              <Landmark className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight font-mono">
              UGX {formatTrillion(BUDGET_METADATA.totalEnvelopeUGX)}T
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-100">
            <span>Overall Spending Target</span>
            <span className="font-semibold text-gray-800">100% Allocation</span>
          </div>
        </div>

        {/* Card 2: Projected Total Revenue */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs hover:border-blue-200 transition-all relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-blue-500" />
          <div className="flex items-center justify-between text-xs text-blue-700 font-semibold mb-2">
            <span>PROJECTED REVENUE</span>
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Coins className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight font-mono">
              UGX {formatTrillion(BUDGET_METADATA.totalRevenueUGX)}T
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-100">
            <span>Domestic + Petroleum</span>
            <span className="font-semibold text-blue-600">62.1% Funded</span>
          </div>
        </div>

        {/* Card 3: Total Planned Expenditure */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs hover:border-emerald-200 transition-all relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-emerald-500" />
          <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold mb-2">
            <span>TOTAL EXPENDITURE</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Wallet className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight font-mono">
              UGX {formatTrillion(BUDGET_METADATA.totalExpenditureUGX)}T
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-100">
            <span>Recurrent + Development</span>
            <span className="font-semibold text-emerald-700">7 Core Programs</span>
          </div>
        </div>

        {/* Card 4: Fiscal Deficit & Financing Gap */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs hover:border-purple-200 transition-all relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-purple-500" />
          <div className="flex items-center justify-between text-xs text-purple-700 font-semibold mb-2">
            <span>DEFICIT FINANCING GAP</span>
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <Scale className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-extrabold text-purple-900 tracking-tight font-mono">
              UGX {formatTrillion(BUDGET_METADATA.fiscalDeficitUGX)}T
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-100">
            <span>Funded by Loans/Grants</span>
            <span className="font-semibold text-purple-600">37.9% of Budget</span>
          </div>
        </div>

        {/* Card 5: Live Citizen Evidence Responses */}
        <button
          onClick={onOpenGeneralFeedback}
          className="text-left bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-4 shadow-xs hover:shadow-md transition-all group relative overflow-hidden"
          title="Click to Submit Citizen Reaction"
        >
          <div className="flex items-center justify-between text-xs text-gray-300 font-semibold mb-2">
            <span>CITIZEN FEEDBACK</span>
            <span className="p-1.5 rounded-lg bg-gray-700 text-yellow-400 group-hover:scale-110 transition-transform">
              <UsersRound className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-extrabold text-white tracking-tight font-mono">
              {totalResponsesCount}
            </span>
            <span className="text-xs text-gray-300">Responses</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-700">
            <span>Live Consultation</span>
            <span className="text-yellow-400 font-semibold underline underline-offset-2">
              + Add Feedback
            </span>
          </div>
        </button>

      </div>
    </div>
  );
}
