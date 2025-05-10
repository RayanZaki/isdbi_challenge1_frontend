import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface KeyValuePairsProps {
  data: Record<string, string>;
}

export const KeyValuePairs: React.FC<KeyValuePairsProps> = ({ data }) => {
  // Format the keys for better readability
  const formatKey = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
      .replace(/Id\b/g, 'ID') // Replace Id with ID
      .replace(/Mbt\b/g, 'MBT'); // Replace Mbt with MBT
  };

  // Group related fields for better organization
  const organizeData = () => {
    const groups: Record<string, Record<string, string>> = {
      "Transaction": {},
      "Entities": {},
      "Contract": {},
      "Financial": {},
      "Asset": {},
      "Options": {}
    };
    
    Object.entries(data).forEach(([key, value]) => {
      if (key.includes('transaction') || key.includes('event') || key.includes('Date')) {
        groups["Transaction"][key] = value;
      } else if (key.includes('lessor') || key.includes('lessee') || key.includes('journalFor')) {
        groups["Entities"][key] = value;
      } else if (key.includes('contract') || key.includes('ijarahType') || key.includes('Term')) {
        groups["Contract"][key] = value;
      } else if (key.includes('Amount') || key.includes('Price') || key.includes('currency') || key.includes('Value')) {
        groups["Financial"][key] = value;
      } else if (key.includes('asset') || key.includes('Asset')) {
        groups["Asset"][key] = value;
      } else {
        groups["Options"][key] = value;
      }
    });
    
    return Object.entries(groups).filter(([_, values]) => Object.keys(values).length > 0);
  };

  const groups = organizeData();

  return (
    <Card className="w-full border-slate-800/50 bg-slate-900/50 backdrop-blur-sm shadow-xl h-full flex flex-col">
      <CardHeader className="border-b border-slate-800/50 bg-slate-800/70">
        <CardTitle className="text-xl text-emerald-400 font-semibold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
          Transaction Details
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 overflow-y-auto">
        <div className="space-y-4">
          {groups.map(([groupName, values]) => (
            <div key={groupName} className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-200 flex items-center uppercase tracking-wider">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
                {groupName}
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(values).map(([key, value]) => (
                  <div 
                    key={key} 
                    className="flex p-2 border rounded-md bg-slate-800/50 border-slate-700/50 hover:border-emerald-500/50 transition-colors"
                  >
                    <span className="text-xs text-slate-400 w-1/2">{formatKey(key)}</span>
                    <span className="font-medium text-slate-200 w-1/2 text-right truncate" title={value}>
                      {key.toLowerCase().includes('date') 
                        ? new Date(value).toLocaleDateString() 
                        : value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}