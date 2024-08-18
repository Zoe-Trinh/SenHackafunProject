import { useState, useEffect, useRef } from 'react';
import fs from 'fs';
import path from 'path';
import { useRouter } from 'next/router';

export default function HeadphoneTuning({ eqFiles }) {
    const [audioContext, setAudioContext] = useState(null);
    const [source, setSource] = useState(null);
    const [currentEQ, setCurrentEQ] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeEQ, setActiveEQ] = useState(null);
    const [round, setRound] = useState(1);
    const [pairs, setPairs] = useState([]);
    const [currentPair, setCurrentPair] = useState([]);
    const [winners, setWinners] = useState([]);
    const audioRef = useRef();
    const router = useRouter();

    const debuggingMode = true;

    useEffect(() => {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(context);

        const shuffledEQs = eqFiles.sort(() => Math.random() - 0.5);
        const initialPairs = [];
        for (let i = 0; i < shuffledEQs.length; i += 2) {
            initialPairs.push([shuffledEQs[i], shuffledEQs[i + 1]]);
        }
        setPairs(initialPairs);
        setCurrentPair(initialPairs[0]);

        const handleRouteChange = () => {
            handleStop();
        };

        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
            }
        };
    }, []);

    useEffect(() => {
        if (audioContext && source) {
            applyEQ(currentEQ);
        }
    }, [currentEQ]);

    useEffect(() => {
        if (round > 4 && winners.length > 1) {
            const newPairs = [];
            for (let i = 0; i < winners.length; i += 2) {
                newPairs.push([winners[i], winners[i + 1]]);
            }
            setPairs(newPairs);
            setCurrentPair(newPairs[0]);
        }
    }, [round]);

    const parseEQ = (eqData) => {
        const lines = eqData.split('\n');
        const filters = [];
        for (const line of lines) {
            if (line.startsWith('Filter')) {
                const [_, type, fc, gain, q] = line.match(
                    /Filter \d+: ON (\w+) Fc (\d+\.?\d*) Hz Gain ([+-]?\d+\.?\d*) dB Q (\d+\.?\d*)/
                );
                filters.push({ type, frequency: parseFloat(fc), gain: parseFloat(gain), q: parseFloat(q) });
            } else if (line.startsWith('Preamp')) {
                const preamp = parseFloat(line.match(/Preamp: ([+-]?\d+\.?\d*) dB/)[1]);
                filters.push({ type: 'Preamp', gain: preamp });
            }
        }
        return filters;
    };

    const applyEQ = (eqSettings) => {
        if (!audioContext || !source) return;

        source.disconnect();
        const gainNode = audioContext.createGain();
        const filterNodes = [];

        eqSettings.forEach((filter) => {
            if (filter.type === 'Preamp') {
                gainNode.gain.value = Math.pow(10, filter.gain / 20);
            } else {
                const biquadFilter = audioContext.createBiquadFilter();
                biquadFilter.type = filter.type === 'LS' ? 'lowshelf' : filter.type === 'HS' ? 'highshelf' : 'peaking';
                biquadFilter.frequency.value = filter.frequency;
                biquadFilter.gain.value = filter.gain;
                biquadFilter.Q.value = filter.q;
                filterNodes.push(biquadFilter);
            }
        });

        source.connect(gainNode);
        filterNodes.forEach((node, index) => {
            if (index === 0) {
                gainNode.connect(node);
            } else {
                filterNodes[index - 1].connect(node);
            }
        });
        if (filterNodes.length > 0) {
            filterNodes[filterNodes.length - 1].connect(audioContext.destination);
        } else {
            gainNode.connect(audioContext.destination);
        }
    };

    const handlePlay = (eqFile, eqType) => {
        if (!audioContext) return;

        if (!isPlaying || audioRef.current.ended) {
            const audio = audioRef.current || new Audio('/data/Barney.mp3');
            if (!audioRef.current) {
                audioRef.current = audio;
                const src = audioContext.createMediaElementSource(audio);
                setSource(src);
                src.connect(audioContext.destination);
            }
            audio.currentTime = 0;
            audio.play();
            setIsPlaying(true);
        }

        const eqSettings = parseEQ(eqFile.content);
        setCurrentEQ(eqSettings);
        setActiveEQ(eqType);
    };

    const handleStop = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
            setActiveEQ(null);
        }
    };

    const handleNextPage = (selectedEQ) => {
        const winner = currentPair[selectedEQ === 'A' ? 0 : 1];
        setWinners([...winners, winner]);
        handleStop();

        if (round === 7) {
            alert(`Your favorite EQ is: ${winner.name}`);

        } else {
            setRound(round + 1);
            const nextPairIndex = round < 4 ? round : round - 4;
            setCurrentPair(pairs[nextPairIndex]);
        }
    };

    return (
        <div>
            <h1 className='selectheadphone'>Headphone Tuning - Round {round} of 7</h1>
            {debuggingMode && currentPair.length === 2 && (
                <p>
                    A: {currentPair[0]?.name}, B: {currentPair[1]?.name}
                </p>
            )}
            {currentPair.length === 2 && (
                <>
                    <button
                        onClick={() => handlePlay(currentPair[0], 'A')}
                        style={{ backgroundColor: activeEQ === 'A' ? 'lightblue' : '' }}
                    >
                        Play with EQ A
                    </button>
                    <button
                        onClick={() => handlePlay(currentPair[1], 'B')}
                        style={{ backgroundColor: activeEQ === 'B' ? 'lightblue' : '' }}
                    >
                        Play with EQ B
                    </button>
                    <button onClick={handleStop}>&lt;&lt;&lt;</button>
                    <div>
                        <button onClick={() => handleNextPage('A')}>Select EQ A</button>
                        <button onClick={() => handleNextPage('B')}>Select EQ B</button>
                    </div>
                </>
            )}
        </div>
    );
}

export async function getServerSideProps(context) {
    const { headphone } = context.query;
    const eqDir = path.join(process.cwd(), 'public/data/temp_eqs');
    const eqFiles = fs.readdirSync(eqDir)
        .filter((file) => file.startsWith(`${headphone}-`))
        .map((file) => ({
            name: file,
            content: fs.readFileSync(path.join(eqDir, file), 'utf-8'),
        }));

    return {
        props: {
            eqFiles,
        },
    };
}

