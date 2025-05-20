import React from 'react';
import { Loader2 } from 'lucide-react';

interface ConnectionFormProps {
  poolAccount: string;
  setPoolAccount: (value: string) => void;
  serverAddress: string;
  setServerAddress: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const ConnectionForm: React.FC<ConnectionFormProps> = ({
  poolAccount,
  setPoolAccount,
  serverAddress,
  setServerAddress,
  onSubmit,
  isLoading
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="poolAccount" className="block text-sm font-medium text-gray-700 mb-1">
            Pool Account Name (username.worker)
          </label>
          <input
            type="text"
            id="poolAccount"
            value={poolAccount}
            onChange={(e) => setPoolAccount(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="e.g., myusername.worker1"
            required
          />
        </div>

        <div>
          <label htmlFor="serverAddress" className="block text-sm font-medium text-gray-700 mb-1">
            Pool Server Address
          </label>
          <input
            type="text"
            id="serverAddress"
            value={serverAddress}
            onChange={(e) => setServerAddress(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="e.g., stratum+tcp://btc.pool.com:3333"
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Format: stratum+tcp://hostname:port (default port: 3333)
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              Testing Connection...
            </span>
          ) : (
            'Test Connection'
          )}
        </button>
      </div>
    </form>
  );
};

export default ConnectionForm;