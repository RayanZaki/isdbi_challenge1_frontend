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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ledger Entries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="text-sm mb-4">
            <p><span className="font-semibold">Transaction ID:</span> {data.transactionId}</p>
            <p><span className="font-semibold">Date:</span> {data.eventDate}</p>
            <p><span className="font-semibold">Description:</span> {data.description}</p>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left border">Account</th>
                <th className="p-2 text-right border">Debit ({data.currency})</th>
                <th className="p-2 text-right border">Credit ({data.currency})</th>
              </tr>
            </thead>
            <tbody>
              {data.entries.map((entry, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 border">{entry.account}</td>
                  <td className="p-2 text-right border">
                    {entry.debit > 0 ? entry.debit.toLocaleString() : ''}
                  </td>
                  <td className="p-2 text-right border">
                    {entry.credit > 0 ? entry.credit.toLocaleString() : ''}
                  </td>
                </tr>
              ))}
              <tr className="font-bold bg-secondary/50">
                <td className="p-2 border">Total</td>
                <td className="p-2 text-right border">{totalDebit.toLocaleString()}</td>
                <td className="p-2 text-right border">{totalCredit.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};