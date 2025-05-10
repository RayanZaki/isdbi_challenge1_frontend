import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface KeyValuePairsProps {
  data: Record<string, string>;
}

export const KeyValuePairs: React.FC<KeyValuePairsProps> = ({ data }) => {
  // Format the keys for better readability
  const formatKey = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
      .replace(/Id\b/g, 'ID') // Replace Id with ID
      .replace(/Mbt\b/g, 'MBT'); // Replace Mbt with MBT
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Transaction Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="flex flex-col p-3 border rounded-md bg-background">
              <span className="text-xs text-muted-foreground">{formatKey(key)}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};