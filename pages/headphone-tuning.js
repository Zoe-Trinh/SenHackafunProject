import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';

export default function HeadphoneTuning({ csvData }) {
    const router = useRouter();
    const { headphone } = router.query;

    return (
        <div>
            <h1>Tuning for {headphone}</h1>
            <pre>{csvData}</pre>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { headphone } = context.query;
    const filePath = path.join(process.cwd(), 'public/data/measurements', `${headphone}.csv`);
    const csvData = fs.readFileSync(filePath, 'utf-8');

    return {
        props: {
            csvData,
        },
    };
}
