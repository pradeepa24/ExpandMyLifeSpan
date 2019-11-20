import React, { Component } from 'react';
import './workout-plan.css';
import loadingIcon from '../../images/loading-icon.gif';
import homeIcon from '../../images/home-icon.jpg';
import {Link } from 'react-router-dom';

export default class WorkoutPlan extends Component {
    displayWorkoutVideoList = () => {
        return this.props.workoutVideos.map((video,ind) => {
            return (
                <div key ={ind} onClick={ () => this.props.handleVideoSelect(video)} className="workout-video">
                   <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
                   <div className='workout-video-description'>
                      <div className='header '>{video.snippet.title}</div>
                   </div>
                </div>
            )
        })
    }
    displayVideo = () => {
        if(this.props.selectedWorkoutVideo) {
            let videoSrc = `https://www.youtube.com/embed/${this.props.selectedWorkoutVideo.id.videoId}`;
            return (
                <div className="working-video">
                   <div className="video-play">
                    <iframe src={videoSrc} allowFullScreen title='Video player'/>
                   </div>
                   <br />
                   <div className="video-desc">
                    <h4 className="video-title">{this.props.selectedWorkoutVideo.snippet.title}</h4>
                    <p>{this.props.selectedWorkoutVideo.snippet.description}</p>
                   </div>
               </div>
            )
        } else {
            return (
                <span>Loading<img className="loading" src={loadingIcon} alt="loadingIcon"/></span>
            )
        }
        
    }
    render() {
        return (
            <div className="workout-plan-content">
              <Link to="/home" ><img className="home-icon" src={homeIcon} alt="homeIcon" /></Link>
              <div className="workout-plan">
                    <h3>WORKOUT FOR THE DAY</h3>
                    <div className="workout-video-content">
                        <div className="workout-video-disp">
                            {this.displayVideo()}
                        </div>
                        <div className="workout-video-section">
                            {this.displayWorkoutVideoList()}
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}
