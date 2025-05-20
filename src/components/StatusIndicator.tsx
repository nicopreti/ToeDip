import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface StatusIndicatorProps {
  status: boolean | null;
  error: string | null;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, error }) => {
  return (
    <div className={`rounded-lg p-4 ${status ? 'bg-green-50' : 'bg-red-50'} transition-all duration-500 animate-fadeIn`}>
      <div className="flex items-center">
        {status ? (
          <CheckCircle className="h-6 w-6 text-green-500 mr-3 animate-scaleIn" />
        ) : (
          <XCircle className="h-6 w-6 text-red-500 mr-3 animate-scaleIn" />
        )}
        <div>
          <h3 className={`text-sm font-medium ${status ? 'text-green-800' : 'text-red-800'}`}>
            {status ? 'Connection Successful' : 'Connection Failed'}
          </h3>
          <p className={`text-xs ${status ? 'text-green-600' : 'text-red-600'} mt-1`}>
            {status 
              ? `Successfully connected to pool account at ${error}` 
              : error || 'Could not establish connection to the pool server. Please check your credentials and try again.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusIndicator;