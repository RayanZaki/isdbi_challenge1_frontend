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
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Islamic Accounting Processor</h1>
        
        <div className="max-w-3xl mx-auto mb-8">
          <RequestForm 
            onSubmit={handleSubmit} 
            isLoading={isLoading}
          />
        </div>
        
        {error && (
          <div className="max-w-3xl mx-auto my-6 p-4 border border-red-600 text-red-600 bg-red-50/10 rounded-md">
            {error}
          </div>
        )}
        
        {response?.success && response.result && (
          <div className="space-y-8 max-w-7xl mx-auto">
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
      
      <footer className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>© {new Date().getFullYear()} Islamic Accounting Processor</p>
      </footer>
    </div>
  );
}

export default App;
