// This is a mock response for development and testing purposes
export const mockTransactionAnalysisResponse = {
  "transaction_analysis": {
    "primary_financial_event": "Murabaha Financing Agreement",
    "key_financial_items": [
      "Principal amount: 100,000 USD",
      "Profit rate: 5% per annum",
      "Tenure: 5 years",
      "Asset being financed: Property"
    ],
    "accounting_treatments": [
      "Initial recognition of the asset at cost (100,000 USD)",
      "Recording of the Murabaha receivable (Asset)",
      "Recognition of deferred profit over the contract period",
      "Periodic profit recognition using effective profit rate method"
    ],
    "transaction_nature": "This transaction is a Murabaha (cost-plus) financing arrangement where the bank purchases the property and sells it to the customer at a marked-up price. The customer will pay in installments over 5 years. This transaction falls under FAS 28 (Murabaha and Other Deferred Payment Sales)."
  },
  "fas_documents": {
    "fas_28": [
      {
        "fas_id": "fas_28",
        "text": "5.1 The Bank shall recognize the assets acquired for Murabaha at their historical cost. Assets available for Murabaha are measured at the lower of cost or cash equivalent value.",
        "relevance_score": 0.95,
        "metadata": {
          "standard_no": "28",
          "standard_name": "Murabaha and Other Deferred Payment Sales",
          "source_file": "FAS28_Murabaha.pdf",
          "page_start": "4",
          "page_end": "4",
          "main_section": "Recognition and Measurement"
        }
      },
      {
        "fas_id": "fas_28",
        "text": "5.6 At the time of concluding a Murabaha, the Murabaha receivable shall be recognized at its nominal value, and the difference between the nominal value and the cost of the asset sold shall be recognized as deferred profit.",
        "relevance_score": 0.92,
        "metadata": {
          "standard_no": "28",
          "standard_name": "Murabaha and Other Deferred Payment Sales",
          "source_file": "FAS28_Murabaha.pdf",
          "page_start": "5",
          "page_end": "5",
          "main_section": "Deferred Profit Recognition"
        }
      }
    ],
    "fas_30": [
      {
        "fas_id": "fas_30",
        "text": "4.3 Impairment assessment shall be carried out for each Murabaha receivable individually in accordance with FAS 30: Impairment and Credit Losses.",
        "relevance_score": 0.65,
        "metadata": {
          "standard_no": "30",
          "standard_name": "Impairment and Credit Losses",
          "source_file": "FAS30_Impairment.pdf",
          "page_start": "7",
          "page_end": "7",
          "main_section": "Impairment of Financial Assets"
        }
      }
    ]
  },
  "fas_summaries": [
    {
      "fas_id": "FAS 28",
      "summary": "FAS 28 deals with Murabaha and Other Deferred Payment Sales. It covers recognition, measurement, and disclosure requirements for Murabaha transactions where an Islamic financial institution purchases an asset and sells it to a customer at a marked-up price, with payment deferred over time."
    },
    {
      "fas_id": "FAS 30",
      "summary": "FAS 30 addresses Impairment and Credit Losses. It establishes principles for the classification of exposures and measurement of impairment provisions for financial assets, including those arising from Shariah-compliant financing and investment activities."
    }
  ],
  "fas_applicability": [
    {
      "fas_id": "FAS 28",
      "fas_name": "Murabaha and Other Deferred Payment Sales",
      "probability": 0.92,
      "reasoning": "The transaction clearly describes a Murabaha arrangement where an asset is being sold at a marked-up price with deferred payment, which is the core subject of FAS 28."
    },
    {
      "fas_id": "FAS 30",
      "fas_name": "Impairment and Credit Losses",
      "probability": 0.35,
      "reasoning": "While not directly applicable to the initial recognition, FAS 30 would be relevant for subsequent measurement and impairment assessment of the Murabaha receivable."
    },
    {
      "fas_id": "FAS 1",
      "fas_name": "General Presentation and Disclosure",
      "probability": 0.20,
      "reasoning": "As a general standard, FAS 1 applies to all financial statements, but has low specific relevance to this particular Murabaha transaction."
    }
  ],
  "steps": [
    {
      "step_name": "Transaction Text Analysis",
      "status": "success",
      "data": {
        "processing_time": 0.85
      },
      "message": "Successfully extracted transaction details"
    },
    {
      "step_name": "FAS Document Retrieval",
      "status": "success",
      "data": {
        "documents_retrieved": 8,
        "processing_time": 1.2
      },
      "message": "Retrieved relevant FAS documents from knowledge base"
    },
    {
      "step_name": "Applicability Analysis",
      "status": "success",
      "data": {
        "processing_time": 1.5
      },
      "message": "Determined applicability of FAS standards to the transaction"
    }
  ],
  "processing_time": 3.55
};
