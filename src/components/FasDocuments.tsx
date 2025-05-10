import { useState } from 'react';
import { Card } from './ui/card';
import type { FasDocument } from '../services/api';

interface FasDocumentsProps {
  data: Record<string, FasDocument[]>;
  summaries: Array<{ fas_id: string; summary: string }>;
}

export function FasDocuments({ data, summaries }: FasDocumentsProps) {
  const [activeTab, setActiveTab] = useState<string>(Object.keys(data)[0] || '');

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">FAS Documents</h2>
      
      <div className="mb-4 border-b border-slate-200 dark:border-slate-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          {Object.keys(data).map((fasId) => (
            <li className="mr-2" key={fasId}>
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === fasId
                    ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500'
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab(fasId)}
              >
                {fasId.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      {activeTab && (
        <div>
          {/* FAS Summary */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <p className="text-slate-700 dark:text-slate-300">
              {summaries.find((s) => s.fas_id === `FAS ${activeTab.split('_')[1]}`)?.summary.replace('Summary:', '') || 'No summary available.'}
            </p>
          </div>
          

          
        </div>
      )}
    </Card>
  );
}
