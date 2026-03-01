import express, { Application } from "express";
import cors from "cors";
import routes from "./routes/routes";
const app: Application = express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', routes)
app.get('/', (_req, res) => {
    res.send('TYPESCRIPT')
})

export default app;