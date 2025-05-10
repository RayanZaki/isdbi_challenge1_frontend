import axios from 'axios';

// Define the API base URL - replace with your actual API endpoint
const API_URL = 'https://idsbi-use-case-ledger-entries.onrender.com';
// const API_URL = 'http://localhost:8000';
// Types for our API requests and responses
export interface ApiRequest {
  useCase: string;
  prompt: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  result?: {
    pre_classification: {
      category: string;
      confidence: number;
      reasoning: string;
    };
    classification: {
      category: string;
      confidence: number;
      reasoning: string;
    };
    key_value_pairs: Record<string, string>;
    event_processing: {
      transactionId: string;
      eventDate: string;
      description: string;
      currency: string;
      entries: Array<{
        account: string;
        debit: number;
        credit: number;
      }>;
    };
  };
  errors: string[];
}

// Main API service class
export const ApiService = {
  // Process the accounting request
  processRequest: async (data: ApiRequest): Promise<ApiResponse> => {
    try {
      // Format the request according to the backend requirements
      const formattedRequest = {
          user_prompt: `USE CASE: ${data.useCase}\n\nPROMPT: ${data.prompt}`
      };
      
      console.log('Sending request to backend:', formattedRequest);
      
      const response = await axios.post<ApiResponse>(
        `${API_URL}/api/process-pipeline`, 
        formattedRequest
      );
      
      return response.data;
    } catch (error) {
      console.error('API request error:', error);
      
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as ApiResponse;
      }
      
      // Return a fallback error response if something unexpected happens
      return {
        success: false,
        message: 'An unexpected error occurred',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      };
    }
  },

  // For development/testing: simulate a response when server isn't available
 
};