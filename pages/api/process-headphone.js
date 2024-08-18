import fs from 'fs';
import path from 'path';
import Equalizer from '../../utils/equalizer';

// Function to parse CSV file into an array of [frequency, gain] pairs
function parseCsv(filepath) {
    const data = fs.readFileSync(filepath, 'utf8');
    return data.split('\n').map(line => {
        const [freq, gain] = line.split(',').map(parseFloat);
        return [freq, gain];
    }).filter(pair => !isNaN(pair[0]) && !isNaN(pair[1]));
}

// Function to format the filters into the desired output format
function formatFilters(filters) {
    const fixedPreamp = -10.0; // Fixed preamp value
    const lines = [`Preamp: ${fixedPreamp.toFixed(1)} dB`];
    filters.forEach((filter, index) => {
        lines.push(`Filter ${index + 1}: ON ${filter.type} Fc ${filter.freq} Hz Gain ${filter.gain.toFixed(1)} dB Q ${filter.q.toFixed(3)}`);
    });
    return lines.join('\n');
}


export default function handler(req, res) {
    const { headphone } = req.query;

    // Path to the headphone and target CSV files
    const headphoneCsvPath = path.join(process.cwd(), 'public/data/measurements', `${headphone}.csv`);
    const targetsDir = path.join(process.cwd(), 'public/data/targets');

    const headphoneData = parseCsv(headphoneCsvPath);
    const targetFiles = fs.readdirSync(targetsDir).filter(filename => filename.endsWith('.csv'));

    const results = targetFiles.map(targetFile => {
        const targetData = parseCsv(path.join(targetsDir, targetFile));
        const filters = Equalizer.autoeq(headphoneData, targetData, 10);
        const preamp = Equalizer.calc_preamp(headphoneData, Equalizer.apply(headphoneData, filters));
        const output = formatFilters(filters, preamp);
        
        return {
            target: targetFile.replace('.csv', ''),
            output
        };
    });

    res.status(200).json(results);
}
