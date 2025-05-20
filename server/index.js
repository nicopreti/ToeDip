import express from 'express';
import cors from 'cors';
import net from 'net';

const app = express();
app.use(cors());
app.use(express.json());

const testPoolConnection = async (poolAccount, serverAddress) => {
  try {
    const parsed = serverAddress.match(/^stratum\+(tcp|ssl):\/\/([^:]+):(\d+)$/);
    if (!parsed) {
      throw new Error('Invalid server address format. Use stratum+tcp://host:port');
    }

    const host = parsed[2];
    const port = parseInt(parsed[3], 10);

    return new Promise((resolve) => {
      const socket = net.createConnection(port, host, () => {
        // Send mining.subscribe
        socket.write(JSON.stringify({
          id: 1,
          method: "mining.subscribe",
          params: []
        }) + '\n');
      });

      let stage = 0;
      let buffer = '';

      socket.on('data', (data) => {
        buffer += data.toString();
        
        try {
          if (stage === 0) {
            const response = JSON.parse(buffer);
            if (response.id === 1) {
              // After subscribe, send authorize
              socket.write(JSON.stringify({
                id: 2,
                method: "mining.authorize",
                params: [poolAccount, "x"]
              }) + '\n');
              stage = 1;
              buffer = '';
            }
          } else if (stage === 1) {
            const response = JSON.parse(buffer);
            if (response.id === 2) {
              if (response.result === true) {
                resolve({ success: true, message: 'Successfully connected and authorized!' });
              } else {
                resolve({ success: false, message: 'Authorization failed. Invalid pool account.' });
              }
              socket.end();
            }
          }
        } catch (e) {
          // Incomplete JSON, wait for more data
        }
      });

      socket.on('error', (err) => {
        resolve({ success: false, message: `Connection failed: ${err.message}` });
      });

      socket.setTimeout(7000, () => {
        resolve({ success: false, message: 'Connection timed out' });
        socket.end();
      });
    });
  } catch (err) {
    return { success: false, message: err.message };
  }
};

app.post('/api/test-connection', async (req, res) => {
  const { poolAccount, serverAddress } = req.body;
  const result = await testPoolConnection(poolAccount, serverAddress);
  res.json(result);
});

const PORT = 3001;
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Pool Connection Tester</h1>
    <p>Use POST /api/test-connection with JSON { poolAccount, serverAddress }</p>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});