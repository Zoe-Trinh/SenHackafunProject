import { YouTube } from 'pytubefix';
import { Search } from 'pytubefix';
import { on_progress } from 'pytubefix/cli';

export default function SearchTrack() {
    // downloads mp3 from url 
function download_mp3(link) {
    const yt = new YouTube(link, { on_progress_callback: on_progress });
    const ys = yt.streams.get_audio_only();
    ys.download({ mp3: true });
}

const url = "https://www.youtube.com/watch?v=gjzBJaD4NBI&pp=ygUKbWFya2lwbGllcg%3D%3D";
download_mp3(url);

// returns list of objects of found videos
const results = new Search("How I won");
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
        <>
<label className='text' htmlFor="headphone-search">Search your track:</label>
            <input
                type="text"
                id="track-search"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Type to search..."
            />
</>
    );
}
