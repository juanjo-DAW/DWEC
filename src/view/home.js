import React from "react";
import "../styles/app.css";

function Home() {
    const day = new Date().toLocaleDateString();

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
