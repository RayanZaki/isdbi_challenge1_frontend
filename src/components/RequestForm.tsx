import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import type { ApiRequest } from '../services/api';

interface RequestFormProps {
  onSubmit: (data: ApiRequest) => void;
  isLoading: boolean;
}

export const RequestForm: React.FC<RequestFormProps> = ({ onSubmit, isLoading }) => {
  const [useCase, setUseCase] = useState('');
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ useCase, prompt });
  };

  return (
    <Card className="w-full border-slate-800/50 bg-slate-900/50 backdrop-blur-sm shadow-xl">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl text-center text-emerald-400 font-semibold">Islamic Accounting Ledger</CardTitle>
        <CardDescription className="text-center text-slate-400">
          Enter a use case and prompt to generate ledger entries
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="useCase" className="text-sm font-medium text-slate-300 flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
              Use Case
            </label>
            
                      <Textarea
                          id="useCase"
                          placeholder="e.g. FAS32_IJARAH"
                          value={useCase}
                          onChange={(e) => setPrompt(e.target.value)}
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
        <CardFooter className="pt-2 pb-6 flex justify-center">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium px-8 py-6 h-auto w-full sm:w-auto transition-all duration-300 shadow-md shadow-emerald-900/30 hover:shadow-lg hover:shadow-emerald-900/40"
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