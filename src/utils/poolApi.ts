interface ConnectionResult {
  success: boolean;
  message?: string;
}

export const testPoolConnection = async (
  poolAccount: string,
  serverAddress: string
): Promise<ConnectionResult> => {
  try {
    const response = await fetch('http://localhost:3001/api/test-connection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ poolAccount, serverAddress }),
    });

    if (!response.ok) {
      throw new Error('Failed to connect to backend service');
    }

    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
};