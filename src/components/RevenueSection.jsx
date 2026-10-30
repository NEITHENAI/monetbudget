import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  PieChart, 
  Pie 
} from 'recharts';
import { 
  TrendingUp, 
  MessageSquarePlus, 
  Coins, 
  Info, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';
import { REVENUE_STREAMS } from '../data/budgetData';

export default function RevenueSection({ onReactToMetric, metricReactionsCount }) {
  const formatTrillion = (billions) => (billions / 1000).toFixed(2);

  // Custom clean tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 p-3 rounded-xl shadow-lg max-w-xs">
          <p className="text-xs font-bold text-gray-900">{data.name}</p>
          <p className="text-sm font-extrabold text-blue-600 font-mono mt-1">
            UGX {formatTrillion(data.amountUGX)} Trillion ({data.percentage}%)
          </p>
          <p className="text-[11px] text-gray-500 mt-1 leading-tight">{data.category}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Overview Intro Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50/50 border border-blue-100 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
              <Coins className="w-4 h-4" />
              <span>Projected National Revenues & Financing Strategy</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Where the Money Comes From (UGX 88.50 Trillion)
            </h3>
            <p className="text-xs text-gray-600 mt-1 max-w-3xl leading-relaxed">
              Uganda's FY 2027/28 revenue structure blends <strong>Domestic Tax Mobilization (URA)</strong>, first-ever commercial <strong>Albertine Graben Petroleum Revenues</strong>, and disciplined <strong>Concessional Deficit Financing</strong> to balance the national ledger.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white border border-blue-200 rounded-xl px-4 py-2 text-center shadow-xs">
              <span className="text-[10px] text-gray-500 uppercase font-semibold block">Domestic Revenue</span>
              <span className="text-base font-extrabold text-blue-700 font-mono">UGX 55.00T</span>
            </div>
            <div className="bg-white border border-purple-200 rounded-xl px-4 py-2 text-center shadow-xs">
              <span className="text-[10px] text-gray-500 uppercase font-semibold block">Borrowing & Grants</span>
              <span className="text-base font-extrabold text-purple-700 font-mono">UGX 33.50T</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Chart of Revenue Distribution */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
          <div>
            <h4 className="text-base font-bold text-gray-900">Revenue Stream Allocation & Proportions</h4>
            <p className="text-xs text-gray-500">Amounts shown in UGX Trillions & percentage contribution to the national budget</p>
          </div>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            7 Official Revenue Channels
          </span>
        </div>

        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={REVENUE_STREAMS}
              margin={{ top: 10, right: 10, left: -15, bottom: 25 }}
            >
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#4b5563', fontSize: 10 }} 
                interval={0}
                tickFormatter={(val) => val.split(' ')[0] + ' ' + (val.split(' ')[1] || '')}
                angle={-15}
                textAnchor="end"
              />
              <YAxis 
                tick={{ fill: '#4b5563', fontSize: 11 }}
                tickFormatter={(val) => `${(val/1000).toFixed(0)}T`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amountUGX" radius={[6, 6, 0, 0]} maxBarSize={48}>
                {REVENUE_STREAMS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid of Revenue Stream Cards with Inline "React / Suggest Allocation" Button */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {REVENUE_STREAMS.map((item) => {
          const reactionsForThis = metricReactionsCount[item.id] || 0;

          return (
            <div 
              key={item.id}
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs hover:border-gray-300 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                {/* Card Top Category & Reaction Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span 
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.category}
                  </span>
                  
                  {reactionsForThis > 0 && (
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span>💬</span> {reactionsForThis} {reactionsForThis === 1 ? 'Reaction' : 'Reactions'}
                    </span>
                  )}
                </div>

                {/* Title & Amount */}
                <h4 className="text-base font-bold text-gray-900 leading-snug">
                  {item.name}
                </h4>

                <div className="my-2.5 flex items-baseline justify-between pt-2 border-t border-gray-100">
                  <span className="text-xl font-black text-gray-900 font-mono">
                    UGX {formatTrillion(item.amountUGX)}T
                  </span>
                  <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md font-mono">
                    {item.percentage}% Share
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  {item.description}
                </p>

                {/* Economic Policy Insight */}
                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-[11px] text-gray-700 mb-3 leading-relaxed">
                  <span className="font-semibold text-gray-900 block mb-0.5">Policy Rationale:</span>
                  {item.insight}
                </div>
              </div>

              {/* Bottom Action: React to This Specific Revenue Stream */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onReactToMetric(item)}
                  className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-black text-white transition-all shadow-xs"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5" />
                  <span>React</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
