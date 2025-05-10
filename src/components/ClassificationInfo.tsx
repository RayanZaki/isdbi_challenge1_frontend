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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Classification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Pre-Classification</h3>
          <div className="p-3 bg-secondary/30 rounded-md">
            <div className="flex justify-between mb-1">
              <span className="font-medium">{preClassification.category}</span>
              <span className="text-primary font-medium">{formatConfidence(preClassification.confidence)}</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full mb-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${preClassification.confidence * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground">
              {preClassification.reasoning}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Final Classification</h3>
          <div className="p-3 bg-secondary/30 rounded-md">
            <div className="flex justify-between mb-1">
              <span className="font-medium">{classification.category}</span>
              <span className="text-primary font-medium">{formatConfidence(classification.confidence)}</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full mb-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${classification.confidence * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground">
              {classification.reasoning}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};