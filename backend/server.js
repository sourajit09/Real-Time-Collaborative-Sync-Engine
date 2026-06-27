import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import documentRoutes from './routes/documentRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', documentRoutes);
app.use('/api/getDocument', documentRoutes);
app.use('/api/createDocument', documentRoutes);
app.use('/api/updateDocument', documentRoutes);
// app.use('/api/deleteDocument', documentRoutes);

connectDB();

app.get('/', (req, res) => {
    res.send('API Running');
});

app.listen(process.env.PORT, () => {
    console.log('Server is running');
});