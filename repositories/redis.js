import { createClient } from 'redis';

// REFAZER PQ O REDIS CLOUD DELETOU A BD!! PEGAR NOVA CONEXAO EMBAIXO (COMENTADO)
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

// import { createClient } from 'redis';

// const client = createClient({
//     username: 'default',
//     password: 'TDqoCHBxBLPdjH1FHpImbJxDRLD691lC',
//     socket: {
//         host: 'redis-15592.c275.us-east-1-4.ec2.redns.redis-cloud.com',
//         port: 15592
//     }
// });

// client.on('error', err => console.log('Redis Client Error', err));

// await client.connect();

// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar
