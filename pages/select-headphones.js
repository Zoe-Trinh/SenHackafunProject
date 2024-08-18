import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function SelectHeadphones() {
    const [headphones, setHeadphones] = useState([]);
    const [filteredHeadphones, setFilteredHeadphones] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetch('/api/get-headphones')
            .then((response) => response.json())
            .then((data) => {
                setHeadphones(data);
                setFilteredHeadphones(data);
            });
    }, []);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = headphones.filter((headphone) =>
            headphone.toLowerCase().includes(term)
        );
        setFilteredHeadphones(filtered);
    };

    const handleSelect = (event) => {
        const selectedHeadphone = event.target.value;
        router.push(`/headphone-tuning?headphone=${selectedHeadphone}`);
    };

    return (
        <div className='selectheadphone'>
            <h1>Select Your Headphones</h1>
            <label className='text' htmlFor="headphone-search">Search your headphones:</label>
            <input
                type="text"
                id="headphone-search"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Type to search..."
            />
            <br />
            <label className= 'text' htmlFor="headphones">Choose your headphones:</label>
            <select id="headphones" name="headphones" onChange={handleSelect}>
                <option value="">--Select a headphone--</option>
                {filteredHeadphones.map((headphone, index) => (
                    <option key={index} value={headphone}>
                        {headphone}
                    </option>
                ))}
            </select>
        </div>
    );
}
