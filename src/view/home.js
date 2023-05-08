import React from "react";

function Home() {
    const now = new Date();
    const day = now.toLocaleDateString();

    return (
        <div>
            <h1>{day}</h1>
            <ul>
                <li>Objetivo 1: 33%</li>
                <li>Objetivo 2: 19%</li>
                <li>Objetivo 3: 70%</li>
            </ul>
        </div>
    );
}

export default Home;
