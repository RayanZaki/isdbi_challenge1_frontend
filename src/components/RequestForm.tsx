import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import type { ApiRequest } from '../services/api';

// Define predefined use cases
interface PredefinedUseCase {
    title: string;
    useCase: string;
    prompt: string;
}

interface RequestFormProps {
    onSubmit: (data: ApiRequest) => void;
    isLoading: boolean;
}

export const RequestForm: React.FC<RequestFormProps> = ({ onSubmit, isLoading }) => {
    const [useCase, setUseCase] = useState('');
    const [prompt, setPrompt] = useState('');

    // Predefined use cases data
    const predefinedUseCases: PredefinedUseCase[] = [
        {
            title: "Ijarah MBT - Initial Recognition (Lessee)",
            useCase: "Ijarah MBT Accounting (in Lessee's books) On 1 January 2019 Alpha Islamic bank (Lessee) entered into an Ijarah MBT arrangement with Super Generators for Ijarah of a heavy-duty generator purchase by Super Generators at a price of USD 450,000. Super Generators has also paid USD 12,000 as import tax and US 30,000 for freight charges. The Ijarah Term is 02 years and expected residual value at the end USD 5,000. At the end of Ijarah Term, it is highly likely that the option of transfer of ownership of the underlying asset to the lessee shall be exercised through purchase at a price of USD 3,000. Alpha Islamic Bank will amortize the 'right of use' on yearly basis and it is required to pay yearly rental of USD 300,000.",
            prompt: "Provide the following accounting entry in the books of Alpha Islamic Bank: Initial Recognition at the time of commencement of Ijarah (using Underlying Asset Cost Method)"
        },
        {
            title: "Ijarah MBT - Initial Recognition (Lessee)",
            useCase: "Ijarah MBT Accounting (in Lessee's books) On 1 January 2019 Alpha Islamic bank (Lessee) entered into an Ijarah MBT arrangement with Super Generators for Ijarah of a heavy-duty generator purchase by Super Generators at a price of USD 450,000. Super Generators has also paid USD 12,000 as import tax and US 30,000 for freight charges. The Ijarah Term is 02 years and expected residual value at the end USD 5,000. At the end of Ijarah Term, it is highly likely that the option of transfer of ownership of the underlying asset to the lessee shall be exercised through purchase at a price of USD 3,000. Alpha Islamic Bank will amortize the 'right of use' on yearly basis and it is required to pay yearly rental of USD 300,000.",
            prompt: `Provide the accounting entries in the books of Alpha Islamic Bank at the end of Year 1 (31 December 2019) for:
a) Amortization of the 'Right-of-Use' asset.
b) Recognition of the finance cost related to the Ijarah liability (assuming an implicit interest rate needs to be determined or is provided, e.g., X%)."
(Self-note: For (b), you'd typically need to calculate the implicit rate first, or be given one. The prompt could also be "Calculate the implicit interest rate and provide the entry for finance cost...`
        },
        {
            title: "Ijarah MBT - Initial Recognition (Lessee)",
            useCase: "Ijarah MBT Accounting (in Lessee's books) On 1 January 2019 Alpha Islamic bank (Lessee) entered into an Ijarah MBT arrangement with Super Generators for Ijarah of a heavy-duty generator purchase by Super Generators at a price of USD 450,000. Super Generators has also paid USD 12,000 as import tax and US 30,000 for freight charges. The Ijarah Term is 02 years and expected residual value at the end USD 5,000. At the end of Ijarah Term, it is highly likely that the option of transfer of ownership of the underlying asset to the lessee shall be exercised through purchase at a price of USD 3,000. Alpha Islamic Bank will amortize the 'right of use' on yearly basis and it is required to pay yearly rental of USD 300,000.",
            prompt: `Provide all necessary accounting entries in the books of Alpha Islamic Bank for the first year (2019) of the Ijarah MBT arrangement, including:
a) Initial recognition (using Underlying Asset Cost Method).
b) Payment of the first yearly rental.
c) Amortization of the 'Right-of-Use' asset.
d) Recognition of the finance cost (you may need to state assumptions for calculating this or assume a provided rate).`
        },

    ];

    const selectPredefinedUseCase = (selectedCase: PredefinedUseCase) => {
        setUseCase(selectedCase.useCase);
        setPrompt(selectedCase.prompt);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ useCase, prompt });
    };

    const handleClear = () => {
        setUseCase('');
        setPrompt('');
    };

    return (
        <Card className="w-full border-slate-800/50 bg-slate-900/50 backdrop-blur-sm shadow-xl">
            <CardHeader className="space-y-1 pb-4 border-b border-slate-800/50 bg-slate-800/70">
                <CardTitle className="text-2xl text-center text-emerald-400 font-semibold">Islamic Accounting Ledger</CardTitle>
                <CardDescription className="text-center text-slate-400">
                    Enter a use case and prompt to generate ledger entries
                </CardDescription>
            </CardHeader>

            <div className="px-6 pt-4 pb-2 border-b border-slate-800/30">
                <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
                    Predefined Use Cases
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {predefinedUseCases.map((predefCase, index) => (
                        <Button
                            key={index}
                            onClick={() => selectPredefinedUseCase(predefCase)}
                            variant="outline"
                            className="flex flex-col items-start text-left h-auto p-3 bg-slate-800/50 border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-800/80"
                        >
                            <span className="font-medium text-emerald-400 mb-1 text-sm">{predefCase.title}</span>
                            <span className="text-xs text-slate-400 line-clamp-2">
                                {predefCase.useCase.substring(0, 100)}...
                            </span>
                        </Button>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6 pt-6">
                    <div className="space-y-2">
                        <label htmlFor="useCase" className="text-sm font-medium text-slate-300 flex items-center">
                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
                            Use Case
                        </label>
                        <Textarea
                            id="useCase"
                            placeholder="e.g. FAS32_IJARAH"
                            value={useCase}
                            onChange={(e) => setUseCase(e.target.value)}
                            className="min-h-[150px] border-slate-800 bg-slate-950/70 text-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20 resize-none"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="prompt" className="text-sm font-medium text-slate-300 flex items-center">
                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
                            Prompt
                        </label>
                        <Input
                            id="prompt"
                            placeholder="Enter your accounting scenario details..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            required
                            className="border-slate-800 bg-slate-950/70 text-slate-300 focus:border-emerald-500 focus:ring-emerald-500/20"
                        />
                    </div>
                </CardContent>
                <CardFooter className="pt-2 pb-6 flex justify-between">
                    <Button
                        type="button"
                        onClick={handleClear}
                        variant="outline"
                        className="border-slate-700 hover:bg-slate-800 text-slate-300"
                    >
                        Clear Form
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium px-8 py-2 h-auto transition-all duration-300 shadow-md shadow-emerald-900/30 hover:shadow-lg hover:shadow-emerald-900/40"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </div>
                        ) : 'Generate Ledger Entries'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};