import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const measurementsDir = path.join(process.cwd(), 'public/data/targets');
    const filenames = fs.readdirSync(measurementsDir)
        .filter(filename => filename !== '.DS_Store');

    const targets = filenames.map(filename => filename.replace('.csv', ''));
    res.status(200).json(targets);
}
