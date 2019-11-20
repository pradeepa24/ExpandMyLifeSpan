import React, { Component } from 'react';
import './health-check.css';
import {Link} from 'react-router-dom';
import homeIcon from '../../images/home-icon.jpg';

export default class HealthCheck extends Component {
    render() {
        return (
            <div>
               <Link to="/home" ><img className="home-icon" src={homeIcon} alt="homeIcon" /></Link> 
            </div>
        )
    }
}
