/**
 * Simple landing page.
 * @returns Main section for home page
 */
function Home() {
    return (
        <section style={{
            display: "block", 
            width: "40%", 
            minWidth: "256px", 
            margin: "0 auto",
            lineHeight: "0.9"
            }} id="mainHome">
            <h1>Code-E</h1>

            <h2 style={{
                fontFamily: "kallisto, sans-serif", 
                fontWeight: "500", 
                fontSize: "3vw", 
                margin: "0", 
                padding: "0"
                }}>the Code Bot</h2>

            <h2 style={{
                fontWeight: "700", 
                fontSize: "2.25vw", 
                margin: "0", 
                padding: "2.15vw"
                }}>SIMPLIFY YOUR CODING JOURNEY</h2> 
        </section>
    );
}

export default Home;