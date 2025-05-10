import { Button } from './ui/button';

interface PredefinedExampleProps {
  onSelect: (text: string) => void;
}

export function PredefinedExample({ onSelect }: PredefinedExampleProps) {
  const exampleText = `Context: GreenTech exits in Year 3, and Al Baraka Bank buys out its stake.

Adjustments:
Buyout Price: $1,750,000
Bank Ownership: 100%

Accounting Treatment:
- Derecognition of GreenTech's equity
- Recognition of acquisition expense

Journal Entry for Buyout:
Dr. GreenTech Equity    $1,750,000
Cr. Cash                $1,750,000

Challenge:
Can you identify the AAOIFI FAS applicable to these entries? If more than one is possible, include weighted probability and reason`;

  return (
    <div className="mb-4 border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/10 dark:to-blue-900/10">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-md font-medium">Predefined Example</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Use this template to test the transaction analysis feature</p>
        </div>
        <Button 
          onClick={() => onSelect(exampleText)}
          variant="outline"
          size="sm"
          className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/20"
        >
          Use This Example
        </Button>
      </div>
      <div className="relative">
        <pre className="text-sm bg-white/80 dark:bg-slate-800/80 p-3 rounded whitespace-pre-wrap overflow-auto max-h-40 border border-slate-200 dark:border-slate-700">
          {exampleText}
        </pre>
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white dark:from-slate-800 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
