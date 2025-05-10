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
      // In a real application, use processRequest instead of getMockResponse
      // const result = await ApiService.processRequest(data);
      
      // For demo/development, we'll use the mock response
      const result = ApiService.getMockResponse();
      
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
          <RequestForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
        
        {error && (
          <div className="max-w-3xl mx-auto my-6 p-4 border border-red-600 text-red-600 bg-red-50/10 rounded-md">
            {error}
          </div>
        )}
        
        {response?.success && response.result && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <ClassificationInfo 
              preClassification={response.result.pre_classification[0]} 
              classification={response.result.classification} 
            />
            
            <KeyValuePairs data={response.result.key_value_pairs} />
            
            <LedgerEntries data={response.result.event_processing} />
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
