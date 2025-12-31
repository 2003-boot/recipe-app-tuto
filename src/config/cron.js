import cron from 'cron';
import https from 'https';

// Toutes les 14 minutes
// Format : minute heure jour mois jour-de-semaine
const job = cron.schedule('* * * * *', () => {
  if (!process.env.API_URL) {
    console.error('API_URL is not defined in environment variables');
    return;
  }

  https
    .get(process.env.API_URL, (res) => {
      if (res.statusCode === 200) {
        console.log(`Keep-alive ping successful at ${new Date().toISOString()}`);
      } else {
        console.log(`Ping failed with status: ${res.statusCode}`);
      }
    })
    .on('error', (e) => {
      console.error('Error during keep-alive request:', e.message);
    });
});

// Important : démarrer le job !
job.start();

console.log('Keep-alive cron job started: ping every 14 minutes');

export default job;