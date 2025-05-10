import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { TransactionAnalysisForm } from '../components/TransactionAnalysisForm';
import { TransactionOverview } from '../components/TransactionOverview';
import { FasApplicabilityChart } from '../components/FasApplicabilityChart';
import { FasDocuments } from '../components/FasDocuments';
import { ProcessingSteps } from '../components/ProcessingSteps';
import { ApiService, type TransactionAnalysisRequest, type TransactionAnalysisResponse } from '../services/api'; 

export function TransactionAnalysisPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TransactionAnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: TransactionAnalysisRequest) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await ApiService.analyzeTransaction(data);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Error during transaction analysis:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <Navigation />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Transaction Analysis</h1>
        
        <div className="max-w-3xl mx-auto mb-8">
          <TransactionAnalysisForm 
            onSubmit={handleSubmit} 
            isLoading={isLoading}
          />
        </div>
        
        {error && (
          <div className="max-w-3xl mx-auto my-6 p-4 border border-red-600 text-red-600 bg-red-50/10 rounded-md">
            {error}
          </div>
        )}
        
        {result && (
          <div className="space-y-8 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TransactionOverview data={result.transaction_analysis} />
              <FasApplicabilityChart data={result.fas_applicability} />
            </div>
            
            <FasDocuments 
              data={result.fas_documents} 
              summaries={result.fas_summaries}
            />
            
            <ProcessingSteps 
              data={result.steps}
              processingTime={result.processing_time}
            />
          </div>
        )}
      </main>
      
      <footer className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>© {new Date().getFullYear()} Islamic Accounting Processor</p>
      </footer>
    </div>
  );
}
