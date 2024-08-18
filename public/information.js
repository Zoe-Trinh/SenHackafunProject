export default function InformationPage() {

    return (
        <>
            <div className="topnav">
                <a href="/hackafun">Homepage</a>
            </div>
                <div className="tab">
            <button class="tablinks" onclick={openContent(evt, 'Different Targets')}>Different Targets </button>
            <button class="tablinks" onclick={openContent(evt, 'How EQ Works')}>How EQ Works</button>
            <button class="tablinks" onclick={openContent(evt, 'Applying System EQ')}>Applying System EQ</button>
            </div>

            <div id="Different Targets" class="tabcontent">
            <h3>Different Targets</h3>
            <p>London is the capital city of England.</p>
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
        <h1 style="color: rgb(44, 243, 44);">Equalizer (EQ) Info</h1>
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
            <div>
                <a href="https://blog.landr.com/eq-basics-everything-musicians-need-know-eq/">image source</a>
            </div>
        </div>
    </div>
            </div>

            <div id="Applying System EQ" class="tabcontent">
            <h3>Applying System EQ</h3>
            <p>Tokyo is the capital of Japan.</p>
            function
            </div>
        </>
    );


    function openContent(evt, tablinks) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementsByClassName(title).style.display = "block";
        evt.currentTarget.className += " active";
      }
}
