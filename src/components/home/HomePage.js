import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
    <div className='jumbotron'>
        <h1>MQTT Monitor</h1>
        <hr />
        <Link to='about' className='btn btn-primary btn-lg'>
            Learn more
        </Link>
    </div>
);

export default HomePage;