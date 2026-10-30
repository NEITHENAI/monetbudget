import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  PieChart, 
  Pie, 
  Legend 
} from 'recharts';
import { 
  Coins, 
  MessageSquarePlus, 
  BarChart2, 
  PieChart as PieChartIcon 
} from 'lucide-react';
import { REVENUE_STREAMS } from '../data/budgetData';

export default function RevenueSection({ onReactToMetric, metricReactionsCount }) {
  const [chartType, setChartType] = useState('bar'); // 'bar' | 'pie'

  const formatTrillion = (billions) => (billions / 1000).toFixed(2);

  // Custom clean tooltip for Bar
  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 p-3 rounded-xl shadow-lg max-w-xs text-xs">
          <p className="font-bold text-gray-900">{data.name}</p>
          <p className="font-extrabold text-blue-600 font-mono mt-1 text-sm">
            UGX {formatTrillion(data.amountUGX)} Trillion ({data.percentage}%)
          </p>
          <p className="text-gray-500 mt-0.5">{data.category}</p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for Pie
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white border border-gray-200 p-3 rounded-xl shadow-lg text-xs">
          <p className="font-bold text-gray-900">{data.name}</p>
          <p className="font-extrabold text-blue-600 font-mono mt-1 text-sm">
            UGX {formatTrillion(data.value)} Trillion ({data.payload.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Overview Intro Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50/50 border border-blue-100 rounded-2xl p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
              <Coins className="w-4 h-4" />
              <span>Projected National Revenues & Financing Strategy</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
              Where the Money Comes From (UGX 88.50 Trillion)
            </h3>
            <p className="text-xs text-gray-600 mt-1 max-w-3xl leading-relaxed">
              Uganda's FY 2027/28 revenue blends <strong>Domestic Tax Mobilization (URA)</strong>, inaugural commercial <strong>Petroleum Revenues</strong>, and disciplined <strong>Concessional Deficit Financing</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3 shrink-0">
            <div className="bg-white border border-blue-200 rounded-xl p-2.5 sm:px-4 sm:py-2 text-center shadow-xs">
              <span className="text-[10px] text-gray-500 uppercase font-semibold block">Domestic Revenue</span>
              <span className="text-sm sm:text-base font-extrabold text-blue-700 font-mono">UGX 55.00T</span>
            </div>
            <div className="bg-white border border-purple-200 rounded-xl p-2.5 sm:px-4 sm:py-2 text-center shadow-xs">
              <span className="text-[10px] text-gray-500 uppercase font-semibold block">Borrowing & Grants</span>
              <span className="text-sm sm:text-base font-extrabold text-purple-700 font-mono">UGX 33.50T</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Chart with Toggle: Bar Chart vs Pie Chart */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-gray-900">
              Revenue Stream Breakdown
            </h4>
            <p className="text-xs text-gray-500">
              {chartType === 'bar' ? 'Distribution by volume in UGX Trillions' : 'Proportional percentage share'}
            </p>
          </div>

          {/* Chart Type Switcher: Bar vs Pie */}
          <div className="flex items-center space-x-1.5 p-1 bg-gray-100 border border-gray-200 rounded-xl self-start sm:self-center">
            <button
              onClick={() => setChartType('bar')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                chartType === 'bar'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Bar Chart</span>
            </button>

            <button
              onClick={() => setChartType('pie')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                chartType === 'pie'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <PieChartIcon className="w-3.5 h-3.5" />
              <span>Pie Chart</span>
            </button>
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-72 sm:h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart
                data={REVENUE_STREAMS}
                margin={{ top: 10, right: 10, left: -20, bottom: 35 }}
              >
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#4b5563', fontSize: 9 }} 
                  interval={0}
                  tickFormatter={(val) => val.split(' ')[0]}
                  angle={-25}
                  textAnchor="end"
                />
                <YAxis 
                  tick={{ fill: '#4b5563', fontSize: 10 }}
                  tickFormatter={(val) => `${(val/1000).toFixed(0)}T`}
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar dataKey="amountUGX" radius={[6, 6, 0, 0]} maxBarSize={42}>
                  {REVENUE_STREAMS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            ) : (
              <PieChart>
                <Pie
                  data={REVENUE_STREAMS}
                  dataKey="amountUGX"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={window.innerWidth < 640 ? 75 : 95}
                  innerRadius={window.innerWidth < 640 ? 35 : 45}
                  paddingAngle={3}
                >
                  {REVENUE_STREAMS.map((entry, index) => (
                    <Cell key={`cell-pie-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
                <Legend 
                  wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                  formatter={(value) => <span className="text-gray-700">{value}</span>}
                />
              </PieChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid of Revenue Stream Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {REVENUE_STREAMS.map((item) => {
          const reactionsForThis = metricReactionsCount[item.id] || 0;

          return (
            <div 
              key={item.id}
              className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-gray-300 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span 
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.category}
                  </span>
                  
                  {reactionsForThis > 0 && (
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span>💬</span> {reactionsForThis}
                    </span>
                  )}
                </div>

                <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                  {item.name}
                </h4>

                <div className="my-2 flex items-baseline justify-between pt-1.5 border-t border-gray-100">
                  <span className="text-lg sm:text-xl font-black text-gray-900 font-mono">
                    UGX {formatTrillion(item.amountUGX)}T
                  </span>
                  <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md font-mono">
                    {item.percentage}%
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed mb-2.5">
                  {item.description}
                </p>

                <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-[11px] text-gray-700 mb-3 leading-relaxed">
                  <span className="font-semibold text-gray-900 block mb-0.5">Policy Rationale:</span>
                  {item.insight}
                </div>
              </div>

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
                  className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-black text-white transition-all shadow-xs shrink-0"
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
