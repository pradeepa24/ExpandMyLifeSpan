import React, { Component } from 'react';
import './workout-plan.css';
import loadingIcon from '../../images/loading-icon.gif';
import homeIcon from '../../images/home-icon.jpg';
import {Link } from 'react-router-dom';
import backButton from '../../images/back-button-icon.png';

export default class WorkoutPlan extends Component {
    displayWorkoutVideoList = () => {
        return this.props.workoutVideos.map((video,ind) => {
            return (
                <div key ={ind} onClick={ () => this.props.handleVideoSelect(video)} className="workout-video">
                   <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
                   <div className='workout-video-description'>
                      <div className='header-video'><p>{video.snippet.title}</p></div>
                   </div>
                </div>
            )
        })
    }
    reload = () =>{
        this.displayDropdown();
        this.props.reloadPlans();
        this.props.history.goBack();
       
    }
    displayVideo = () => {
        if(this.props.selectedWorkoutVideo) {
            let videoSrc = `https://www.youtube.com/embed/${this.props.selectedWorkoutVideo.id.videoId}`;
            return (
            <div className="working-video">
                   <div className="video-play">
                    <iframe src={videoSrc} allowFullScreen title='Video player'/>
                   </div>
                   {/* <br /> */}
                   <div className="video-desc">
                    <h4 className="video-title">{this.props.selectedWorkoutVideo.snippet.title}</h4>
                    <p>{this.props.selectedWorkoutVideo.snippet.description}</p>
                   </div>
               </div>
            )
        } else {
            return (
                <span className="loading-content">Loading<img className="loading" src={loadingIcon} alt="loadingIcon"/></span>
            )
        }
        
    }
    checkVal = (e) =>{
        console.log(e.target.checked);
        if(e.target.checked){
            this.props.setUserOptionWatchWorkout(e.target.value);
        }
    }
    displayDropdown = () => {
        let styleSettings;
        if(this.props.styleSettings.display === 'none') {
            styleSettings = {display:'flex'};
        } else {
            styleSettings = {display:'none'};
        }
       this.props.setStyleSettings(styleSettings);
    }
    logOut = () =>{
        this.props.logOutSession();
        setTimeout(()=>{
           if(!this.props.authenticatedFlag) {
               this.displayDropdown();
            this.props.history.push("/");
           }
        },250)
    }
    render() {
        return (
            <div className="workout-plan-content">
              <button className="account-icon" onClick={this.displayDropdown}>
                <img src={this.props.avatar} alt="femaleAvatar" /><span>{`Hey ${this.props.userName}!`}</span>
             </button>
             <div style={this.props.styleSettings} className="dropdown-content">
             <div><Link to="/home" ><img className="home-icon" src={homeIcon} alt="homeIcon" onClick={this.props.reloadPlans}/></Link></div>
                <div><img className="home-icon" src={backButton} alt="backButton" onClick={this.reload}/></div>  
                  <div><button onClick={this.logOut}>Log out</button></div>
                </div>
              <div className="workout-plan">
                    <h3>Workout for the day</h3>
                    <div className="user-options">
                <div className="work-fields">
                <input type="radio"
                          value="20min Workout"
                          name="userOptionWatchWorkout"
                          onChange={this.checkVal}
                     /><span>20min Workout</span>
                </div>
                   <div className="work-fields">
                   <input type="radio"
                          value="30min Workout"
                          name="userOptionWatchWorkout"
                          onChange={this.checkVal}
                     /><span>30min Workout</span>
                   </div>
                  <div className="work-fields">
                  <input type="radio"
                          value="45min workout"
                          name="userOptionWatchWorkout"
                          onChange={this.checkVal}
                     /><span>45min Workout</span>
                  </div>
                <div className="work-fields">
                <input type="radio"
                          value="Power yoga"
                          name="userOptionWatchWorkout"
                          onChange={this.checkVal}
                     /><span>Power Yoga</span>
                </div>
                <div className="work-fields">
                <input type="radio"
                          value="Zumba"
                          name="userOptionWatchWorkout"
                          onChange={this.checkVal}
                     /><span>Zumba</span>
                </div>
                </div>
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
