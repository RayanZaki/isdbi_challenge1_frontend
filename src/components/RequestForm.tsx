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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Islamic Accounting Ledger</CardTitle>
        <CardDescription>
          Enter a use case and prompt to generate ledger entries
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="useCase" className="text-sm font-medium">
              Use Case
            </label>
            <Input
              id="useCase"
              placeholder="e.g. FAS32_IJARAH"
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="prompt" className="text-sm font-medium">
              Prompt
            </label>
            <Textarea
              id="prompt"
              placeholder="Enter your accounting scenario details..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px]"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Generate Ledger Entries'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};