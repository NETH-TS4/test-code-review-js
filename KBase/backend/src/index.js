import express from 'express';
import cors from 'cors';
import articlesRouter from './routes/articles.js';
import tagsRouter from './routes/tags.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/articles', articlesRouter);
app.use('/api/tags', tagsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on :${PORT}`));