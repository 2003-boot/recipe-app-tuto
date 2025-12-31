import express from 'express';
import { ENV } from './config/env.js';
import routes from './routes/routes.js';
import job from './config/cron.js';  // ← ton cron job

const app = express();
const PORT = ENV.PORT || 3000;  // fallback au cas où

// Middleware pour parser le JSON
app.use(express.json());

// Route santé légère (idéalement en premier pour le keep-alive)
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is alive!' });
});

// Tes routes API
app.use('/api', routes);

// Démarrage du cron job
// Option 1 : toujours actif (recommandé pour tester en local aussi)
job.start();

// Option 2 : seulement en production (comme tu l'avais)
// if (ENV.NODE_ENV === 'production') {
//   job.start();
//   console.log('Keep-alive cron job started (production only)');
// } else {
//   console.log('Cron job disabled in development');
// }

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${ENV.NODE_ENV}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});