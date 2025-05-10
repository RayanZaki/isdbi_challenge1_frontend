import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { ApiResponse } from '../services/api';

interface LedgerEntriesProps {
  data: ApiResponse['result']['event_processing'];
}

export const LedgerEntries: React.FC<LedgerEntriesProps> = ({ data }) => {
  // Calculate totals for the ledger
  const totalDebit = data.entries.reduce((acc, entry) => acc + entry.debit, 0);
  const totalCredit = data.entries.reduce((acc, entry) => acc + entry.credit, 0);

  return (
    <Card className="w-full border-slate-800/50 bg-slate-900/50 backdrop-blur-sm shadow-xl">
      <CardHeader className="border-b border-slate-800/50">
        <CardTitle className="text-xl text-emerald-400 font-semibold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          Ledger Entries
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="bg-slate-800/50 rounded-md border border-slate-700/50 p-4 mb-4">
          <h3 className="font-medium text-slate-100 text-base mb-2">Journal Entry Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-slate-400">Transaction ID</p>
              <p className="font-medium text-slate-200">{data.transactionId}</p>
            </div>
            <div className="space-y-1">
              <p className="text-slate-400">Date</p>
              <p className="font-medium text-slate-200">{new Date(data.eventDate).toLocaleDateString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-slate-400">Description</p>
              <p className="font-medium text-slate-200">{data.description}</p>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow-md rounded-lg">
              <table className="min-w-full">
                <thead className="bg-slate-800/70">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Account
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Debit ({data.currency})
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
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
                  <tr className="bg-slate-800/80 font-medium">
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-100">
                      Total
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-right text-emerald-400 font-mono">
                      {totalDebit.toLocaleString()}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-right text-amber-400 font-mono">
                      {totalCredit.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {totalDebit === totalCredit ? (
          <div className="mt-4 px-3 py-2 bg-emerald-900/20 text-emerald-400 text-sm font-medium rounded border border-emerald-800/30 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Journal entry is balanced
          </div>
        ) : (
          <div className="mt-4 px-3 py-2 bg-red-900/20 text-red-400 text-sm font-medium rounded border border-red-800/30 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            Journal entry is not balanced
          </div>
        )}
      </CardContent>
    </Card>
  );
};