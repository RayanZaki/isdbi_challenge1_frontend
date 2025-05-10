import { Card } from './ui/card';
import type { FasApplicability } from '../services/api';

interface FasApplicabilityChartProps {
  data: FasApplicability[];
}

export function FasApplicabilityChart({ data }: FasApplicabilityChartProps) {
  // Sort by probability in descending order
  const sortedData = [...data].sort((a, b) => b.probability - a.probability);

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">FAS Applicability</h2>
      
      <div className="space-y-6">
        {sortedData.map((item) => (
          <div key={item.fas_id} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">
                {item.fas_id} - {item.fas_name}
              </h3>
              <span className="font-semibold">{Math.round(item.probability * 100)}%</span>
            </div>
            
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
              <div 
                className="bg-emerald-500 h-2.5 rounded-full" 
                style={{ width: `${item.probability * 100}%` }}
              ></div>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {item.reasoning}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
