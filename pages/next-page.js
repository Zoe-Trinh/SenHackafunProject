import { useRouter } from 'next/router';

export default function NextPage() {
    const router = useRouter();
    const { eq } = router.query;

    return (
        <div>
            <h1>Next Page</h1>
            <p>You selected EQ {eq}</p>
            {/* Placeholder for further implementation */}
        </div>
    );
}
