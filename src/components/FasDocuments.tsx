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
          
          {/* FAS Documents */}
          {/* <div className="space-y-4">
            <h3 className="text-lg font-semibold">Relevant Excerpts</h3>
            
            {data[activeTab].map((doc) => (
              <div 
                key={doc.fas_id}
                className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg"
              >
                <div className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                  {doc.metadata.source_file && (
                    <span className="mr-3">Source: {doc.metadata.source_file}</span>
                  )}
                  {doc.metadata.page_start && doc.metadata.page_end && (
                    <span>Pages: {doc.metadata.page_start}-{doc.metadata.page_end}</span>
                  )}
                </div>
                
                {doc.metadata.main_section && (
                  <h4 className="text-md font-medium mb-1">
                    {doc.metadata.main_section}
                  </h4>
                )}
                
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line">
                  {doc.text}
                </p>
                
                <div className="mt-2 text-right">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Relevance: {Math.round(doc.relevance_score * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      )}
    </Card>
  );
}
