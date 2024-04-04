import { createClient } from 'redis';

// Redis connection to the rediscloud
const client = createClient({
  password: process.env.REDIS_PASS,
  socket: {
    host: 'redis-17402.c308.sa-east-1-1.ec2.cloud.redislabs.com',
    port: 17402,
  },
});

(async () => {
  client.on('error', (err) => console.log('Redis Client Error', err));
  client.on('ready', () => console.log('Redis is  ready'));
  // console.log('test');
  await client.connect();
})();

export default client;
