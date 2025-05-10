import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();
  
  return (
    <div className="border-b border-slate-200 dark:border-slate-800 mb-8">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-emerald-600">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span className="text-xl font-bold">Islamic Accounting Processor</span>
        </div>
        
        <nav className="flex space-x-6">
          <Link 
            to="/" 
            className={`py-2 border-b-2 ${
              location.pathname === '/' 
                ? 'border-emerald-600 text-emerald-600' 
                : 'border-transparent hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Accounting Processor
          </Link>
          <Link 
            to="/transaction-analysis" 
            className={`py-2 border-b-2 ${
              location.pathname === '/transaction-analysis' 
                ? 'border-emerald-600 text-emerald-600' 
                : 'border-transparent hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Transaction Analysis
          </Link>
        </nav>
      </div>
    </div>
  );
}
