import React from 'react';
import ConnectionForm from './ConnectionForm';
import StatusIndicator from './StatusIndicator';
import { usePoolConnection } from '../hooks/usePoolConnection';

const PoolConnectionTester: React.FC = () => {
  const { 
    poolAccount, 
    setPoolAccount, 
    serverAddress, 
    setServerAddress, 
    connectionStatus, 
    error, 
    testConnection, 
    isLoading 
  } = usePoolConnection();

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="px-8 py-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Pool Connection Tester</h1>
          <p className="text-sm text-gray-500 mt-2">
            Verify if a pool account exists at the specified server
          </p>
        </div>

        <ConnectionForm 
          poolAccount={poolAccount}
          setPoolAccount={setPoolAccount}
          serverAddress={serverAddress}
          setServerAddress={setServerAddress}
          onSubmit={testConnection}
          isLoading={isLoading}
        />

        {(connectionStatus !== null || error) && (
          <div className="mt-6 border-t border-gray-100 pt-6">
            <StatusIndicator 
              status={connectionStatus} 
              error={error} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PoolConnectionTester;