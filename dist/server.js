"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const dbFilePath = path_1.default.resolve(__dirname, 'db.json');
// Initialize DB file if not exists
if (!fs_1.default.existsSync(dbFilePath)) {
    fs_1.default.writeFileSync(dbFilePath, JSON.stringify([]));
}
// Read DB file
const readDb = () => {
    const data = fs_1.default.readFileSync(dbFilePath, 'utf-8');
    return JSON.parse(data);
};
// Write to DB file
const writeDb = (data) => {
    fs_1.default.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};
app.get('/read', (req, res) => {
    const index = parseInt(req.query.index, 10);
    const submissions = readDb();
    if (index >= 0 && index < submissions.length) {
        res.status(200).json({ ...submissions[index], total: submissions.length });
    }
    else {
        res.status(400).json({ message: 'Invalid index' });
    }
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
