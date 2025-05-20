import { useState } from 'react';
import { testPoolConnection } from '../utils/poolApi';

export const usePoolConnection = () => {
  const [poolAccount, setPoolAccount] = useState('');
  const [serverAddress, setServerAddress] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    if (!poolAccount.trim() || !serverAddress.trim()) {
      setError('Please provide both pool account and server address');
      setConnectionStatus(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await testPoolConnection(poolAccount, serverAddress);
      setConnectionStatus(result.success);
      
      if (!result.success) {
        setError(result.message || 'Connection failed');
      } else {
        setError(serverAddress); // We're using the error field to store the server address for successful connections
      }
    } catch (err) {
      setConnectionStatus(false);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    poolAccount,
    setPoolAccount,
    serverAddress,
    setServerAddress,
    connectionStatus,
    error,
    testConnection,
    isLoading
  };
};