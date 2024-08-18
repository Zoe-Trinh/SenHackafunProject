import Link from "next/link";

export default function InformationPage() {
    return (
        <>
            <div className="topnav">
                <Link href="/">Homepage</Link>
            </div>
            <div id="How EQ Works" class="tabcontent">
            <h3>How EQ Works</h3>
            <nav id="infonav">
        <br />
        RETURN TO: <br />
        <div id="infodiv1">
            <ul id="infoNavBar">
                <li id="infoNav"><a href="" id="infoLinkHome">Home</a></li><br/>
                <br/>
                <li id="infoNav"><a href="" id="infoLinkHome">Tuning</a></li><br/>
                <br/>
                <li id="infoNav"><a href="" id="infoLinkHome">Safe Volume <br/> Calculator</a></li><br/>
                <br/>
                <br/>
                <br/>
                <li id="infoNav"><a href="" id="infoLinkHome">Headphone Demo</a></li>
            </ul>
        </div>
        <br />
        <br/>
        <br/>
        MORE INFO: <br />
        <div id="infodiv1">
            <ul id="infoNavBar">
                <li id="infoNav"><a href="https://blog.landr.com/eq-basics-everything-musicians-need-know-eq/" id="infoLinkHome" target="_blank">EQ Explained</a></li><br/>
            </ul>
        </div>
    </nav>
    <div id="howeqdiv1">
        <h1>Equalizer (EQ) Info</h1>
        <p>An equalizer (EQ) is a device or software used to adjust the the balance of different frequency components in an audio system.</p>
    
        <h2>How EQ Works</h2>
        <p>EQs usually feature knobs or sliders to adjust various frequency bands. You can amplify or lessen particular sounds by adjusting these bands. This is done to balance the sounds so they blend smoothly together by either enhancing or reducing undesired frequencies.</p>
        
        <div id="howeqdiv2">
            <div>
                <h2>Types of EQs</h2>
                <ul>
                    <li>Graphic EQ: Multiple fixed frequency bands with sliders.</li>
                    <li>Parametric EQ: Adjustable frequency, gain, and Q (bandwidth).</li>
                    <li>Shelving EQ: Affects frequencies above or below a certain point.</li>
                </ul>
                
                <h2>Some EQ Frequencies</h2>
                <p>(approximate)</p>
                <ul>
                    <li>Sub Bass: ranging from 20Hz to 60Hz</li>
                    <li>Bass: 60Hz to 250Hz</li>
                    <li>Low Mids: 250Hz to 1500Hz</li>
                    <li>High Mids: 1500Hz to 4kHz</li>
                    <li>Presence: 4kHz to 7kHz</li>
                    <li>Brilliance or Noise: 7kHz to 20kHz</li>
                </ul>
            </div>
        </div>
        </div>
            </div>
        </>
    ); 
}
