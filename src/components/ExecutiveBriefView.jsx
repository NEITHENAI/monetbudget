import React, { useState } from 'react';
import { Download, ArrowLeft, Loader2, Check } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { 
  BUDGET_METADATA, 
  REVENUE_STREAMS, 
  EXPENDITURE_PROGRAMS 
} from '../data/budgetData';

export default function ExecutiveBriefView({ 
  groupMembers, 
  onBackToDashboard, 
  responsesCount 
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const formatTrillion = (billions) => (billions / 1000).toFixed(2);
  const formatBillions = (billions) => Number(billions).toLocaleString();

  const handleDownloadPDF = () => {
    const element = document.getElementById('budget-executive-brief-content');
    if (!element) return;

    setIsGenerating(true);

    const opt = {
      margin: [12, 12, 12, 12],
      filename: 'THE_MONETS_Uganda_National_Budget_FY2027_2028_Brief.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        setIsGenerating(false);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      })
      .catch((err) => {
        console.error('PDF export error:', err);
        setIsGenerating(false);
        window.print();
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6">
      
      {/* Top Action Toolbar */}
      <div className="no-print max-w-4xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-3 bg-white border border-gray-200 p-4 rounded-xl shadow-xs">
        <button
          onClick={onBackToDashboard}
          className="flex items-center space-x-2 text-xs font-semibold text-gray-700 hover:text-black px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Dashboard</span>
        </button>

        <div className="flex items-center space-x-3">
          <span className="text-xs text-gray-500 hidden sm:inline">
            Times New Roman • 12pt • 1.5 Spacing • Allocation Ledger
          </span>

          <button
            onClick={handleDownloadPDF}
            disabled={isGenerating}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-900 hover:bg-black text-white text-xs font-semibold transition-all shadow-sm disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Compiling Budget PDF...</span>
              </>
            ) : downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Executive Brief (PDF)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* The Printable Academic Document Container */}
      <article
        id="budget-executive-brief-content"
        className="academic-doc max-w-4xl mx-auto bg-white text-black p-8 sm:p-14 shadow-lg rounded-sm"
      >
        
        {/* Header */}
        <header className="border-b-2 border-black pb-5 mb-5 text-center">
          <div className="text-[11px] tracking-widest uppercase font-bold text-gray-700 mb-1">
            REPUBLIC OF UGANDA • NATIONAL BUDGET FRAMEWORK
          </div>
          <h1 className="text-xl font-bold uppercase tracking-tight my-2">
            NATIONAL BUDGET POLICY BRIEF & FISCAL FRAMEWORK (FY 2027/2028)
          </h1>
          <p className="text-xs italic text-gray-800">
            Design of the National Budget for Uganda for the Financial Year 2027/2028 • Project for Semester
          </p>

          <div className="mt-3 pt-2 border-t border-gray-300 flex justify-between items-center text-xs text-gray-700">
            <span><strong>Research Group:</strong> THE MONETS</span>
            <span><strong>Fiscal Envelope:</strong> UGX 88.50 Trillion</span>
            <span><strong>Date:</strong> October 2026</span>
          </div>
        </header>

        {/* 5-Student Sign-Off Table */}
        <section className="mb-6 border border-gray-400 p-4 bg-gray-50 avoid-break">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b border-gray-300 pb-1">
            Group Membership & Sign-Off (THE MONETS — 5 Students)
          </h2>
          <p className="text-[11px] text-gray-600 mb-2.5">
            Verified academic declaration and semester project presentation sign-off:
          </p>

          <table className="w-full text-xs text-left border-collapse border border-gray-400 mb-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 p-1.5 w-10 text-center">No.</th>
                <th className="border border-gray-400 p-1.5">Student Full Name</th>
                <th className="border border-gray-400 p-1.5 w-44 text-center">Student Signature</th>
                <th className="border border-gray-400 p-1.5 w-28 text-center">Date Signed</th>
              </tr>
            </thead>
            <tbody>
              {groupMembers.map((member, i) => (
                <tr key={i} className="border border-gray-300">
                  <td className="border border-gray-400 p-1.5 font-bold text-center">{i + 1}</td>
                  <td className="border border-gray-400 p-1.5 font-medium">{member.name}</td>
                  <td className="border border-gray-400 p-1.5 text-center">
                    <span className="inline-block border-b border-gray-500 w-36 h-5"></span>
                  </td>
                  <td className="border border-gray-400 p-1.5 text-center font-mono text-[11px]">
                    ___ / ___ / 2026
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center text-[10px] text-gray-500 mt-2">
            <span>Lecturer Signature: ________________________________</span>
            <span>Date Received: ____________________</span>
          </div>
        </section>

        {/* 1. Executive Summary & Policy Theme */}
        <section className="mb-6">
          <h2 className="text-sm font-bold mb-2">
            1. Executive Macroeconomic Summary & Fiscal Strategy
          </h2>
          <p className="text-xs text-justify leading-relaxed mb-3">
            The National Budget for the Financial Year 2027/2028 is designed around the strategic theme: 
            <em>"Full Monetization of the Economy through Commercial Oil Production, Agro-Industrialization, and Sustainable Debt Consolidation."</em> 
            The total proposed resource envelope is <strong>UGX 88,500 Billion (UGX 88.50 Trillion)</strong>, benchmarked against nominal GDP projected at UGX 245,000 Billion.
          </p>
          <p className="text-xs text-justify leading-relaxed mb-3">
            A defining milestone for FY 2027/28 is the inaugural commercial petroleum revenue inflow of <strong>UGX 8,500 Billion (UGX 8.50T)</strong> from the Albertine Graben (Tilenga and Kingfisher fields). In accordance with the Public Finance Management Act (PFMA), these resource revenues are ring-fenced within the Petroleum Fund strictly for long-term productive capital development, rather than consumable recurrent wage expenditures.
          </p>
        </section>

        {/* 2. DataFrame / Table 1: Revenue Streams & Deficit Financing */}
        <section className="mb-6 avoid-break">
          <h2 className="text-sm font-bold mb-2">
            2. Master Revenue & Financing Ledger (DataFrame 1: Money In)
          </h2>
          <p className="text-xs text-justify leading-relaxed mb-3">
            Uganda's traditional public finance framework relies on domestic resource mobilization complemented by responsible deficit financing. For FY 2027/28, projected domestic revenue covers <strong>62.15% (UGX 55,000 Billion)</strong>, while the remaining fiscal gap of <strong>UGX 33,500 Billion (37.85%)</strong> is funded through external concessional borrowing and domestic securities.
          </p>

          <table className="w-full text-xs text-center border-collapse border border-black mb-3">
            <thead>
              <tr className="bg-gray-100 font-bold">
                <th className="border border-black p-1.5 w-8">#</th>
                <th className="border border-black p-1.5 text-left">Revenue / Financing Stream</th>
                <th className="border border-black p-1.5">Classification</th>
                <th className="border border-black p-1.5 text-right">Amount (UGX Bn)</th>
                <th className="border border-black p-1.5 text-right">Amount (UGX Tn)</th>
                <th className="border border-black p-1.5 text-right">% Share</th>
              </tr>
            </thead>
            <tbody>
              {REVENUE_STREAMS.map((r, idx) => (
                <tr key={r.id}>
                  <td className="border border-black p-1 font-bold">{idx + 1}</td>
                  <td className="border border-black p-1 text-left font-medium">{r.name}</td>
                  <td className="border border-black p-1">{r.category}</td>
                  <td className="border border-black p-1 text-right font-mono">{formatBillions(r.amountUGX)}</td>
                  <td className="border border-black p-1 text-right font-mono">{formatTrillion(r.amountUGX)}T</td>
                  <td className="border border-black p-1 text-right font-bold">{r.percentage}%</td>
                </tr>
              ))}
              <tr className="bg-gray-200 font-bold">
                <td colSpan={3} className="border border-black p-1.5 text-left uppercase">Total Budget Resource Envelope</td>
                <td className="border border-black p-1.5 text-right font-mono">88,500</td>
                <td className="border border-black p-1.5 text-right font-mono">88.50T</td>
                <td className="border border-black p-1.5 text-right font-mono">100.0%</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 3. DataFrame / Table 2: Expenditure Program Allocations */}
        <section className="mb-6 avoid-break">
          <h2 className="text-sm font-bold mb-2">
            3. National Expenditure Program Ledger (DataFrame 2: Money Out)
          </h2>
          <p className="text-xs text-justify leading-relaxed mb-3">
            National expenditures are aligned to the National Development Plan (NDP IV), prioritizing social wellbeing, transport logistics, and wealth creation while maintaining debt discipline.
          </p>

          <table className="w-full text-xs text-center border-collapse border border-black mb-3">
            <thead>
              <tr className="bg-gray-100 font-bold">
                <th className="border border-black p-1.5 w-8">#</th>
                <th className="border border-black p-1.5 text-left">National Expenditure Program</th>
                <th className="border border-black p-1.5">Category</th>
                <th className="border border-black p-1.5 text-right">Amount (UGX Bn)</th>
                <th className="border border-black p-1.5 text-right">Amount (UGX Tn)</th>
                <th className="border border-black p-1.5 text-right">% Share</th>
              </tr>
            </thead>
            <tbody>
              {EXPENDITURE_PROGRAMS.map((e, idx) => (
                <tr key={e.id}>
                  <td className="border border-black p-1 font-bold">{idx + 1}</td>
                  <td className="border border-black p-1 text-left font-medium">{e.name}</td>
                  <td className="border border-black p-1">{e.category}</td>
                  <td className="border border-black p-1 text-right font-mono">{formatBillions(e.amountUGX)}</td>
                  <td className="border border-black p-1 text-right font-mono">{formatTrillion(e.amountUGX)}T</td>
                  <td className="border border-black p-1 text-right font-bold">{e.percentage}%</td>
                </tr>
              ))}
              <tr className="bg-gray-200 font-bold">
                <td colSpan={3} className="border border-black p-1.5 text-left uppercase">Total Program Allocations</td>
                <td className="border border-black p-1.5 text-right font-mono">88,500</td>
                <td className="border border-black p-1.5 text-right font-mono">88.50T</td>
                <td className="border border-black p-1.5 text-right font-mono">100.0%</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 4. Strategic Talking Points for Presentation */}
        <section className="mb-6">
          <h2 className="text-sm font-bold mb-2">
            4. Strategic Presentation Talking Points for Group Members
          </h2>

          <div className="space-y-3 text-xs text-justify leading-relaxed">
            <p>
              <strong>1. Managing the Debt Burden (UGX 22.80T / 25.76%):</strong> Debt servicing represents the single largest expenditure line. Our group proposes aggressive domestic debt reprofiling—swapping high-interest 18% commercial treasury bonds into lower-cost 25-year concessional borrowing, preventing debt from squeezing out social spending.
            </p>

            <p>
              <strong>2. Human Capital Transformation (UGX 17.20T / 19.44%):</strong> Investing in health and education directly creates the productive workforce required for industrialization. Funding is ring-fenced for sub-county Health Centre IVs and upgrading technical/vocational institutions.
            </p>

            <p>
              <strong>3. Infrastructure & SGR Acceleration (UGX 15.40T / 17.40%):</strong> Prioritizes completing the Standard Gauge Railway (Malaba to Kampala) and critical oil roads around Hoima, lowering the cost of freight transport by over 40%.
            </p>

            <p>
              <strong>4. Parish Development Model (UGX 9.20T / 10.40%):</strong> Direct capital injection into 10,594 parish SACCOs nationwide, transitioning remaining subsistence households into the cash economy.
            </p>
          </div>
        </section>

        {/* 5. Citizen Consultation & Evidence Summary */}
        <section className="mb-6 avoid-break">
          <h2 className="text-sm font-bold mb-2">
            5. Evidence of Citizen Consultation & Stakeholder Feedback
          </h2>
          <p className="text-xs text-justify leading-relaxed mb-2">
            In compliance with the semester project guidelines, our public consultation portal gathered verified feedback across academia, business leaders, and farmers. Overall consensus highlights:
          </p>
          <ul className="list-disc list-inside text-xs space-y-1 text-gray-800">
            <li><strong>Health Sector Funding:</strong> Consistent citizen demand for ring-fencing drug budgets at Sub-County Health Centre IVs.</li>
            <li><strong>Transport Logistics:</strong> Widespread commercial endorsement of the Standard Gauge Railway (SGR).</li>
            <li><strong>Debt Audit:</strong> Civil society consensus on auditing high-interest domestic debt charges.</li>
          </ul>
        </section>

        {/* Footer sign-off */}
        <footer className="mt-8 pt-4 border-t-2 border-black text-xs avoid-break">
          <div>
            <p className="font-bold uppercase text-gray-900">Submitted by: THE MONETS</p>
            <p className="text-[11px] text-gray-600">The Monets</p>
          </div>
        </footer>

      </article>

    </div>
  );
}
