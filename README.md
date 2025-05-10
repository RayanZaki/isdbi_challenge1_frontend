# Islamic Accounting Processor with Transaction Analysis

A React application for processing Islamic accounting transactions and analyzing their compliance with AAOIFI Financial Accounting Standards (FAS).

## Features

### Accounting Processor
- Process Islamic accounting transactions
- Pre-classification and classification of transactions
- Generate ledger entries with debit and credit accounts
- Extract key-value pairs from transaction descriptions

### Transaction Analysis
- Analyze transaction text for FAS applicability
- View transaction overview (primary financial event, key items, treatments)
- Visualize FAS standard applicability with confidence scores
- Browse relevant FAS document excerpts
- View processing steps and performance metrics

## Development

This project uses:
- React for the UI
- TypeScript for type safety
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests

### Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

## API Endpoints

### Accounting Processor API
- POST `/api/process-pipeline`
  - Takes a user prompt and use case
  - Returns classification, key-value pairs, and ledger entries

### Transaction Analysis API
- POST `/api/analyze-transaction`
  - Takes transaction_text
  - Returns analysis, FAS documents, applicability, and processing steps

## Configuration

API endpoints are configured in `src/services/api.ts`. The application connects directly to the API endpoints:

- Accounting Processor: `${API_URL}/api/process-pipeline`
- Transaction Analysis: `${API_URL}/api/analyze-transaction`
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
