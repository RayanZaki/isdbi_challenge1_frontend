import { Card } from './ui/card';

interface TransactionOverviewProps {
  data: {
    primary_financial_event: string;
    key_financial_items: string[];
    accounting_treatments: string[];
    transaction_nature: string;
  };
}

export function TransactionOverview({ data }: TransactionOverviewProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Transaction Overview</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Primary Financial Event
          </h3>
          <p className="text-slate-700 dark:text-slate-300">
            {data.primary_financial_event.replace(/\*/g, '')}
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Key Financial Items
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {data.key_financial_items.map((item, index) => (
              <li key={index} className="text-slate-700 dark:text-slate-300">
                {item.replace(/\*/g, '')}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Accounting Treatments
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {data.accounting_treatments.map((treatment, index) => (
              <li key={index} className="text-slate-700 dark:text-slate-300">
                {treatment.replace(/\*/g, '')}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
            Transaction Nature
          </h3>
          <div 
            className="text-slate-700 dark:text-slate-300"
            dangerouslySetInnerHTML={{ 
              __html: data.transaction_nature
                .replace(/\*/g, '')
                .replace(/\n/g, '<br>')
            }}
          />
        </div>
      </div>
    </Card>
  );
}
