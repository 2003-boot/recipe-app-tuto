import express from 'express';
import { ENV } from './config/env.js';
import routes from './routes/routes.js';
import job from './config/cron.js';



const app = express();
const PORT = ENV.PORT;
if(ENV.NODE_ENV == "production") job.start();
app.use(express.json());
app.use('/api', routes);

app.get('/api/health',  (req, res)=>{
    res.json({success: true});
})
app.listen(3000, ()=>{
    console.log(`server is running on port ${PORT}`);
})