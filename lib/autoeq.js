import Equalizer from './equalizer';

export function runAutoEQ(frData, targetData) {
    const fr = parseCsvData(frData);
    const target = parseCsvData(targetData);

    const maxFilters = 10;
    const filters = Equalizer.autoeq(fr, target, maxFilters);

    const preamp = Equalizer.calc_preamp(fr, Equalizer.apply(fr, filters));

    return formatFilters(filters, preamp);
}

function parseCsvData(csvData) {
    return csvData
        .split('\n')
        .map(line => {
            const [freq, gain] = line.split(',').map(parseFloat);
            return [freq, gain];
        })
        .filter(pair => !isNaN(pair[0]) && !isNaN(pair[1]));
}

function formatFilters(filters, preamp) {
    const lines = [`Preamp: ${preamp.toFixed(1)} dB`];
    filters.forEach((filter, index) => {
        lines.push(`Filter ${index + 1}: ON PK Fc ${filter.freq} Hz Gain ${filter.gain.toFixed(1)} dB Q ${filter.q.toFixed(3)}`);
    });
    return lines.join('\n');
}
