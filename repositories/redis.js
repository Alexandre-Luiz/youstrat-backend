import { createClient } from 'redis';

// Redis connection to the rediscloud
const client = createClient({
  username: 'default',
  password: process.env.REDIS_PASS,
  socket: {
    host: 'redis-16514.crce207.sa-east-1-2.ec2.redns.redis-cloud.com',
    port: 16514,
  },
});

(async () => {
  client.on('error', (err) => console.log('Redis Client Error', err));
  client.on('ready', () => console.log('Redis is  ready'));
  await client.connect();
})();

export default client;
