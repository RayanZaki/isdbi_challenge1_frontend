import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

// Define explicit types for ledger entries data
interface LedgerEntry {
  account: string;
  debit: number;
  credit: number;
}

interface EventProcessing {
  transactionId: string;
  eventDate: string;
  description: string;
  currency: string;
  entries: LedgerEntry[];
}

interface LedgerEntriesProps {
  data: EventProcessing;
}

export const LedgerEntries: React.FC<LedgerEntriesProps> = ({ data }) => {
  // Calculate totals for the ledger
  const totalDebit = data.entries.reduce((acc: number, entry: LedgerEntry) => acc + entry.debit, 0);
  const totalCredit = data.entries.reduce((acc: number, entry: LedgerEntry) => acc + entry.credit, 0);

  return (
    <Card className="w-full border-slate-800/50 bg-slate-900/50 backdrop-blur-sm shadow-xl">
      <CardHeader className="border-b border-slate-800/50 bg-slate-800/70">
        <CardTitle className="text-xl text-emerald-400 font-semibold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          Journal Entry: {data.description}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 bg-slate-800/50 rounded-md border border-slate-700/50 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <h3 className="font-medium text-slate-100 text-base">Transaction Details</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <p className="text-slate-400">Transaction ID</p>
                <p className="font-medium text-slate-200">{data.transactionId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-400">Date</p>
                <p className="font-medium text-slate-200">{new Date(data.eventDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 bg-slate-800/50 rounded-md border border-slate-700/50 p-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              <h3 className="font-medium text-slate-100 text-base">Balance Status</h3>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-slate-400">Currency</p>
                <p className="font-medium text-slate-200">{data.currency}</p>
              </div>
              
              {totalDebit === totalCredit ? (
                <div className="px-3 py-2 bg-emerald-900/20 text-emerald-400 text-sm font-medium rounded border border-emerald-800/30 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Journal entry is balanced
                </div>
              ) : (
                <div className="px-3 py-2 bg-red-900/20 text-red-400 text-sm font-medium rounded border border-red-800/30 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Journal entry is not balanced
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow-lg rounded-lg border border-slate-700/50">
              <table className="min-w-full">
                <thead className="bg-slate-800/70">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider w-1/2">
                      Account
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider w-1/4">
                      Debit ({data.currency})
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider w-1/4">
                      Credit ({data.currency})
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-slate-800/20 divide-y divide-slate-700/50">
                  {data.entries.map((entry, index) => (
                    <tr key={index} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-200">
                        {entry.account}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-mono">
                        {entry.debit > 0 ? (
                          <span className="text-emerald-400">{entry.debit.toLocaleString()}</span>
                        ) : "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-mono">
                        {entry.credit > 0 ? (
                          <span className="text-amber-400">{entry.credit.toLocaleString()}</span>
                        ) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-800/90 font-medium border-t-2 border-slate-700">
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-100">
                      Total
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-right text-emerald-400 font-mono font-bold">
                      {totalDebit.toLocaleString()}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-right text-amber-400 font-mono font-bold">
                      {totalCredit.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};