export default function HomePage() {
    return (
        <>
            <header>
                <p>Sen Hackafun 2024</p>
                <h1 className="homeh1">Homepage</h1>
            </header>
            <div className="dropdown">
                <a href="/information">
                    <button>Information page</button>
                </a>
                <a href="/select-headphones">
                    <button>Tuning headphone</button>
                </a>
                <a href="/headphone-demos">
                    <button>Headphone demos</button>
                </a>
            </div>
        </>
    );
}
