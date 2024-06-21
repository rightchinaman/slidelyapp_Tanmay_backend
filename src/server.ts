import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbFilePath = path.resolve(__dirname, 'db.json');

interface Submission {
    name: string;
    email: string;
    phone: string;
    github_link: string;
}

// Initialize DB file if not exists
if (!fs.existsSync(dbFilePath)) {
    fs.writeFileSync(dbFilePath, JSON.stringify([]));
}

// Read DB file
const readDb = (): Submission[] => {
    const data = fs.readFileSync(dbFilePath, 'utf-8');
    return JSON.parse(data);
};

// Write to DB file
const writeDb = (data: Submission[]) => {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

app.get('/read', (req: Request, res: Response) => {
    const index = parseInt(req.query.index as string, 10);
    const submissions = readDb();
    if (index >= 0 && index < submissions.length) {
        res.status(200).json({ ...submissions[index], total: submissions.length });
    } else {
        res.status(400).json({ message: 'Invalid index' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

