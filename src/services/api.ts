// filepath: /home/rayanzak/Desktop/Project/IDSBI/Challenge2_frontend/src/services/api.ts
import axios from 'axios';

// Define the API base URL - replace with your actual API endpoint
const API_URL = 'https://idsbi-use-case-ledger-entries.onrender.com';
const Transaction_API_URL = 'http://localhost:8000';
// Types for our API requests and responses
export interface ApiRequest {
  useCase: string;
  prompt: string;
}

export interface TransactionAnalysisRequest {
  transaction_text: string;
}

export interface FasDocumentMetadata {
  heading_path?: string[];
  main_section?: string;
  page_end?: string;
  page_start?: string;
  source_file?: string;
  standard_name?: string;
  standard_no?: string;
  text_snippet?: string;
}

export interface FasDocument {
  fas_id: string;
  text: string;
  relevance_score: number;
  metadata: FasDocumentMetadata;
}

export interface FasApplicability {
  fas_id: string;
  fas_name: string;
  probability: number;
  reasoning: string;
}

export interface TransactionAnalysisResponse {
  transaction_analysis: {
    primary_financial_event: string;
    key_financial_items: string[];
    accounting_treatments: string[];
    transaction_nature: string;
  };
  fas_documents: Record<string, FasDocument[]>;
  fas_summaries: Array<{
    fas_id: string;
    summary: string;
  }>;
  fas_applicability: FasApplicability[];
  steps: Array<{
    step_name: string;
    status: string;
    data: any;
    message: string;
  }>;
  processing_time: number;
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
  
  // Process transaction analysis
  analyzeTransaction: async (data: TransactionAnalysisRequest): Promise<TransactionAnalysisResponse> => {
    try {
      console.log('Sending transaction analysis request:', data);
      
      // Use the actual API endpoint
      const response = await axios.post<TransactionAnalysisResponse>(
        `${Transaction_API_URL}/api/analyze-transaction`, 
        data
      );
      
      return response.data;
    } catch (error) {
      console.error('Transaction analysis API error:', error);
      throw error;
    }
  }
};
