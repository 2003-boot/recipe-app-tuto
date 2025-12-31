import express from 'express';
import { ENV } from './config/env.js';
import routes from './routes/routes.js';



const app = express();
const PORT = ENV.PORT;
app.use(express.json());
app.use('/api', routes);


app.listen(3000, ()=>{
    console.log(`server is running on port ${PORT}`);
})