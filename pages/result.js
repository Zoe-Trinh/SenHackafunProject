import { useRouter } from 'next/router';

export default function Result() {
    const router = useRouter();
    const { winner } = router.query;

    return (
        <div>
            <h1>Congratulations!</h1>
            <p>Your preferred EQ is: {winner}</p>
        </div>
    );
}
