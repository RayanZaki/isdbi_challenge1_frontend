import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

// Define the interface locally to match App.tsx's UseCaseData interface
interface UseCaseExample {
  title: string;
  useCase: string;
  prompt: string;
}

interface PredefinedUseCasesProps {
  onSelectUseCase: (useCase: UseCaseExample) => void;
}

export const PredefinedUseCases: React.FC<PredefinedUseCasesProps> = ({ onSelectUseCase }) => {
  const predefinedUseCases: UseCaseExample[] = [
    {
      title: "Ijarah MBT - Initial Recognition (Lessee)",
      useCase: "Ijarah MBT Accounting (in Lessee's books) On 1 January 2019 Alpha Islamic bank (Lessee) entered into an Ijarah MBT arrangement with Super Generators for Ijarah of a heavy-duty generator purchase by Super Generators at a price of USD 450,000. Super Generators has also paid USD 12,000 as import tax and US 30,000 for freight charges. The Ijarah Term is 02 years and expected residual value at the end USD 5,000. At the end of Ijarah Term, it is highly likely that the option of transfer of ownership of the underlying asset to the lessee shall be exercised through purchase at a price of USD 3,000. Alpha Islamic Bank will amortize the 'right of use' on yearly basis and it is required to pay yearly rental of USD 300,000.",
      prompt: "Provide the following accounting entry in the books of Alpha Islamic Bank: Initial Recognition at the time of commencement of Ijarah (using Underlying Asset Cost Method)"
    },
    {
      title: "Murabaha - Initial Recognition",
      useCase: "FAS28_MURABAHA",
      prompt: "On 1 January 2022, ABC Islamic Bank entered into a Murabaha contract with XYZ Corporation. ABC Bank purchased goods for $100,000 and sold them to XYZ for $110,000 to be paid in installments over 12 months. Provide the accounting entry for the initial recognition of this Murabaha transaction in ABC Islamic Bank's books."
    },
    {
      title: "Musharaka - Profit Distribution",
      useCase: "FAS27_MUSHARAKA",
      prompt: "Islamic Bank A and Company B entered into a Musharaka partnership with capital contributions of $700,000 and $300,000 respectively. The Musharaka agreement states that profits will be distributed at a ratio of 60:40 regardless of capital contribution, while losses are absorbed strictly according to capital contribution ratio. At the end of the year, the Musharaka generated a profit of $200,000. Provide the accounting entries for the profit distribution in Islamic Bank A's books."
    }
  ];

  return (
    <Card className="w-full border-slate-800/50 bg-slate-900/50 backdrop-blur-sm shadow-xl mb-6">
      <CardHeader className="border-b border-slate-800/50 bg-slate-800/70 pb-3">
        <CardTitle className="text-lg text-emerald-400 font-semibold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
            <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
          </svg>
          Predefined Use Cases
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3 py-4">
        {predefinedUseCases.map((useCase, index) => (
          <Button
            key={index}
            onClick={() => onSelectUseCase(useCase)}
            variant="outline"
            className="flex flex-col items-start text-left h-auto p-4 bg-slate-800/50 border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-800/80"
          >
            <span className="font-medium text-emerald-400 mb-1">{useCase.title}</span>
            <span className="text-xs text-slate-400 line-clamp-2">{useCase.useCase.substring(0, 100)}...</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};