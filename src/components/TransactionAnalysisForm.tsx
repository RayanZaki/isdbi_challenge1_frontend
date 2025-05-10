import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';

interface TransactionAnalysisFormProps {
  onSubmit: (data: { transaction_text: string }) => void;
  isLoading: boolean;
}

export function TransactionAnalysisForm({ onSubmit, isLoading }: TransactionAnalysisFormProps) {
  const [transactionText, setTransactionText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transactionText.trim()) {
      return;
    }
    
    onSubmit({ transaction_text: transactionText });
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Transaction Analysis</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Enter a transaction text to analyze its AAOIFI FAS applicability and get a detailed breakdown.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="transaction_text" className="block font-medium">
            Transaction Text
          </label>
          <Textarea
            id="transaction_text"
            value={transactionText}
            onChange={(e) => setTransactionText(e.target.value)}
            placeholder="Enter the transaction text for analysis..."
            className="min-h-[200px]"
            required
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Analyzing...' : 'Analyze Transaction'}
        </Button>
      </form>
    </Card>
  );
}
