import { useState } from 'react';
import './App.css';
import { RequestForm } from './components/RequestForm';
import { ClassificationInfo } from './components/ClassificationInfo';
import { KeyValuePairs } from './components/KeyValuePairs';
import { LedgerEntries } from './components/LedgerEntries';
import { ApiService } from './services/api';
import type { ApiRequest, ApiResponse } from './services/api';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: ApiRequest) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Using the real API call instead of mock response
      const result = await ApiService.processRequest(data);
      
      setResponse(result);
      
      if (!result.success) {
        setError(result.message || 'An error occurred while processing your request.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none"></div>
      <main className="container mx-auto py-12 px-4 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-white tracking-tight">
          <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">Islamic Accounting</span> Processor
        </h1>
        
        <div className="max-w-3xl mx-auto mb-10">
          <RequestForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
        
        {error && (
          <div className="max-w-3xl mx-auto my-6 p-4 border border-red-600 text-red-600 bg-red-950/20 rounded-md">
            {error}
          </div>
        )}
        
        {response?.success && response.result && (
          <div className="space-y-8  mx-auto animate-in fade-in duration-700">
            {/* Ledger entries first */}
            <LedgerEntries data={response.result.event_processing} />
            
            {/* Two-column layout for classification and key-value pairs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ClassificationInfo 
                preClassification={response.result.pre_classification[0]} 
                classification={response.result.classification} 
              />
              
              <KeyValuePairs data={response.result.key_value_pairs} />
            </div>
          </div>
        )}
      </main>
      
      <footer className="py-6 text-center text-sm text-slate-500 relative z-10">
        <p>© {new Date().getFullYear()} Islamic Accounting Processor</p>
      </footer>
    </div>
  );
}

export default App;
