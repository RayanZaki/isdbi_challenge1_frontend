import { Card } from './ui/card';

interface ProcessingStepsProps {
  data: Array<{
    step_name: string;
    status: string;
    data: any;
    message: string;
  }>;
  processingTime: number;
}

export function ProcessingSteps({ data, processingTime }: ProcessingStepsProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Processing Steps</h2>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Total processing time: {processingTime.toFixed(2)}s
        </span>
      </div>
      
      <ol className="relative border-l border-slate-300 dark:border-slate-700 ml-3">
        {data.map((step, index) => (
          <li className="mb-6 ml-6" key={index}>
            <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ${
              step.status === 'success' 
                ? 'bg-green-200 dark:bg-green-900 text-green-800 dark:text-green-300' 
                : 'bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-300'
            }`}>
              {step.status === 'success' ? (
                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
              )}
            </span>
            
            <h3 className={`font-semibold ${
              step.status === 'success' ? 'text-slate-900 dark:text-white' : 'text-red-600 dark:text-red-400'
            }`}>
              {step.step_name}
            </h3>
            
            {step.message && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {step.message}
              </p>
            )}
            
            {step.data && Object.keys(step.data).length > 0 && (
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {Object.entries(step.data).map(([key, value]) => (
                  typeof value !== 'object' && (
                    <div key={key} className="flex">
                      <span className="font-medium mr-2">{key.replace(/_/g, ' ')}:</span>
                      <span>{value as string}</span>
                    </div>
                  )
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </Card>
  );
}
