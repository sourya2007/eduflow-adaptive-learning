import React, { useEffect } from 'react';
import { X, Printer, Download } from 'lucide-react';
import clsx from 'clsx';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface PrintReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  chartData: any[];
}

export function PrintReportModal({ isOpen, onClose, chartData }: PrintReportModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="print-modal-title"
        className="bg-surface w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        <div className="flex justify-between items-center p-4 border-b border-outline-variant bg-surface-container-lowest shrink-0">
          <h2 id="print-modal-title" className="text-[18px] font-bold text-on-surface">Export Class Report</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => window.print()} 
              className="bg-primary hover:bg-primary/90 text-on-primary px-4 py-2 rounded-lg text-[14px] font-bold flex items-center gap-2 shadow-sm transition-colors print:hidden"
            >
              <Printer className="w-4 h-4" /> Print PDF
            </button>
            <button aria-label="Close modal" onClick={onClose} className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant print:hidden">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 print:p-0 print:overflow-visible print:h-auto" id="printable-report">
          <div className="print:block">
            <div className="flex justify-between items-end border-b-2 border-primary pb-4 mb-8">
              <div>
                <h1 className="text-[32px] font-bold text-on-surface tracking-tight">Math 101 Performance Report</h1>
                <p className="text-[16px] text-on-surface-variant mt-1">Period 3 • Fall Semester 2026</p>
              </div>
              <div className="text-right">
                <div className="text-[14px] font-bold text-primary">EduFlow AI</div>
                <div className="text-[12px] text-on-surface-variant">Generated: {new Date().toLocaleDateString()}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
                <div className="text-[14px] font-semibold text-outline">Class Average</div>
                <div className="text-[36px] font-bold text-primary">82%</div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
                <div className="text-[14px] font-semibold text-outline">Active Students</div>
                <div className="text-[36px] font-bold text-on-surface">28</div>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4">
                <div className="text-[14px] font-semibold text-outline">At Risk</div>
                <div className="text-[36px] font-bold text-error">3</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-[20px] font-bold text-on-surface mb-4">Performance Trend</h3>
              <div className="h-[250px] w-full bg-surface-container-lowest border border-outline-variant p-4 rounded-xl">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} domain={[0, 100]} />
                    <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="text-[20px] font-bold text-on-surface mb-4">Action Items</h3>
              <ul className="list-disc pl-5 space-y-2 text-[14px] text-on-surface-variant">
                <li>Schedule 1-on-1 interventions with Alex Chen, Jordan Davis, and Casey Wilson.</li>
                <li>Review "Factoring Polynomials" module, as average score dropped to 72% this week.</li>
                <li>Assign advanced practice material for the top 10% of students.</li>
              </ul>
            </div>
            
            <div className="mt-12 text-center text-[12px] text-outline-variant pt-4 border-t border-outline-variant">
              End of Report
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-report, #printable-report * {
            visibility: visible;
          }
          #printable-report {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          /* Hide scrollbars during print */
          ::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
