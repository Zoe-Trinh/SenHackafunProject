import fs from 'fs';
import path from 'path';
import Equalizer from '../../utils/equalizer';

function parseCsv(filepath) {
    const data = fs.readFileSync(filepath, 'utf8');
    return data.split('\n').map(line => {
        const [freq, gain] = line.split(',').map(parseFloat);
        return [freq, gain];
    }).filter(pair => !isNaN(pair[0]) && !isNaN(pair[1]));
}

function formatFilters(filters) {
    const fixedPreamp = -10.0; // Fixed preamp value
    const lines = [`Preamp: ${fixedPreamp.toFixed(1)} dB`];
    filters.forEach((filter, index) => {
        lines.push(`Filter ${index + 1}: ON ${filter.type} Fc ${filter.freq} Hz Gain ${filter.gain.toFixed(1)} dB Q ${filter.q.toFixed(3)}`);
    });
    return lines.join('\n');
}

export default async function handler(req, res) {
    const { headphone } = req.query;
    const measurementsDir = path.join(process.cwd(), 'public/data/measurements');
    const targetsDir = path.join(process.cwd(), 'public/data/targets');
    const outputDir = path.join(process.cwd(), 'public/data/temp_eqs');


    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }


    const headphoneCsvPath = path.join(measurementsDir, `${headphone}.csv`);
    const headphoneFr = parseCsv(headphoneCsvPath);


    const targetFiles = fs.readdirSync(targetsDir).filter(filename => filename.endsWith('.csv'));
    const results = [];

    targetFiles.forEach(targetFile => {
        const targetName = targetFile.replace('.csv', '');
        const targetCsvPath = path.join(targetsDir, targetFile);
        const targetFr = parseCsv(targetCsvPath);


        const maxFilters = 10;
        const filters = Equalizer.autoeq(headphoneFr, targetFr, maxFilters);
        const output = formatFilters(filters);


        const outputFilePath = path.join(outputDir, `${headphone}-${targetName}.txt`);
        fs.writeFileSync(outputFilePath, output, 'utf8');

        results.push({ target: targetName, outputFilePath });
    });


    const blankTuning = {
        target: 'Blank Tuning',
        output: formatFilters([
            { type: 'PK', freq: 40, gain: 0.0, q: 1.000 }
        ])
    };
    const blankFilePath = path.join(outputDir, `${headphone}-blank.txt`);
    fs.writeFileSync(blankFilePath, blankTuning.output, 'utf8');
    results.push({ target: 'Blank Tuning', outputFilePath: blankFilePath });

    res.status(200).json(results);
}
