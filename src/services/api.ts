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
    pre_classification: Array<{
      category: string;
      confidence: number;
      reasoning: string;
    }>;
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
  getMockResponse: (): ApiResponse => {
    return {
      success: true,
      message: "Successfully processed FAS32_IJARAH - INITIAL_RECOGNITION_LESSEE",
      result: {
        pre_classification: [
          {
            category: "FAS32_IJARAH",
            confidence: 0.95,
            reasoning: "The description explicitly mentions 'Ijarah MBT arrangement,' which falls under Ijarah Muntahia Bittamleek. The scenario involves a lessee (Alpha Islamic Bank) and lessor (Super Generators), rental payments, and a transfer of ownership option at the end of the lease term. These are key indicators of Ijarah transactions covered by FAS32."
          }
        ],
        classification: {
          category: "INITIAL_RECOGNITION_LESSEE",
          confidence: 0.95,
          reasoning: "The prompt explicitly asks for the accounting entry for the initial recognition of the Ijarah in the lessee's books, which aligns directly with the INITIAL_RECOGNITION_LESSEE event as defined in FAS 32."
        },
        key_value_pairs: {
          transactionId: "IMBT-L-001",
          eventDate: "2019-01-01",
          eventType: "INITIAL_RECOGNITION",
          currency: "USD",
          journalFor: "LESSEE",
          lessorId: "Super Generators",
          lesseeId: "Alpha Islamic Bank",
          contractId: "IMBT-C-2019-001",
          ijarahType: "Ijarah MBT",
          commencementDate: "2019-01-01",
          ijarahTermYears: "2",
          annualRentalAmount: "300000.00",
          underlyingAssetId: "HD-Generator-001",
          assetPurchasePrice: "450000.00",
          importTaxPaid: "12000.00",
          freightChargesPaid: "30000.00",
          expectedResidualValue: "5000.00",
          purchasePriceAtEndOfTerm: "3000.00",
          lesseeAppliesRecognitionExemption: "false",
          exemptionType: "NONE",
          ownershipTransferOption: "Purchase",
          purchaseOptionLikelyToExercise: "true"
        },
        event_processing: {
          transactionId: "IMBT-L-001",
          eventDate: "2019-01-01",
          description: "Initial Recognition of Ijarah MBT (Lessee)",
          currency: "USD",
          entries: [
            {
              account: "Right of Use Asset (ROU)",
              debit: 489000,
              credit: 0
            },
            {
              account: "Deferred Ijarah Cost",
              debit: 111000,
              credit: 0
            },
            {
              account: "Ijarah Liability",
              debit: 0,
              credit: 600000
            }
          ]
        }
      },
      errors: []
    };
  }
};