import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { ApiResponse } from '../services/api';

interface ClassificationInfoProps {
  preClassification: ApiResponse['result']['pre_classification'][0];
  classification: ApiResponse['result']['classification'];
}

export const ClassificationInfo: React.FC<ClassificationInfoProps> = ({
  preClassification,
  classification,
}) => {
  // Helper function to format confidence as percentage
  const formatConfidence = (confidence: number) => `${(confidence * 100).toFixed(1)}%`;

  return (
    <Card className="w-full border-slate-800/50 bg-slate-900/50 backdrop-blur-sm shadow-xl">
      <CardHeader className="border-b border-slate-800/50">
        <CardTitle className="text-xl text-emerald-400 font-semibold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
          </svg>
          Classification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-200 flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
            Pre-Classification
          </h3>
          <div className="p-4 bg-slate-800/50 rounded-md border border-slate-700/50">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-slate-300 text-sm">{preClassification.category}</span>
              <span className="text-emerald-400 font-medium text-sm bg-emerald-400/10 px-2 py-0.5 rounded-full">
                {formatConfidence(preClassification.confidence)}
              </span>
            </div>
            <div className="w-full bg-slate-700/50 h-2 rounded-full mb-3">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                style={{ width: `${preClassification.confidence * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-slate-400 italic border-l-2 border-emerald-500/30 pl-3">
              "{preClassification.reasoning}"
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-200 flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
            Final Classification
          </h3>
          <div className="p-4 bg-slate-800/50 rounded-md border border-slate-700/50">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-slate-300 text-sm">{classification.category}</span>
              <span className="text-emerald-400 font-medium text-sm bg-emerald-400/10 px-2 py-0.5 rounded-full">
                {formatConfidence(classification.confidence)}
              </span>
            </div>
            <div className="w-full bg-slate-700/50 h-2 rounded-full mb-3">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                style={{ width: `${classification.confidence * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-slate-400 italic border-l-2 border-emerald-500/30 pl-3">
              "{classification.reasoning}"
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};