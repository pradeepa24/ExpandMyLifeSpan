import React, { Component } from 'react';
import './health-tip.css';
import loadingIcon from '../../images/loading-icon.gif';
import homeIcon from '../../images/home-icon.jpg';
import backButton from '../../images/back-button-icon.png';
import {Link } from 'react-router-dom';

export default class HealthTip extends Component {
    displayDropdown = () => {
        let styleSettings;
        if(this.props.styleSettings.display === 'none') {
            styleSettings = {display:'flex'};
        } else {
            styleSettings = {display:'none'};
        }
       this.props.setStyleSettings(styleSettings);
    }
    reload = () =>{
        this.displayDropdown();
        this.props.reloadPlans();
        this.props.history.goBack();
       
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
    displayHealthVideoList = () => {
        return this.props.healthVideoList.map((video,ind) => {
            return (
                <div key ={ind} onClick={ () => this.props.handleHealthVideoSelect(video)} className="health-video">
                   <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
                   <div className='health-video-description'>
                      <div className='header-health-video'><p>{video.snippet.title}</p></div>
                   </div>
                </div>
            )
        })
    }
    displayHealthVideo = () => {
        if(this.props.selectedHealthVideo) {
            let videoSrc = `https://www.youtube.com/embed/${this.props.selectedHealthVideo.id.videoId}`;
            return (
            <div className="health-disp-video">
                   <div className="health-disp-video-play">
                    <iframe src={videoSrc} allowFullScreen title='Video player'/>
                   </div>
                   {/* <br /> */}
                   <div className="health-disp-video-desc">
                    <h4 className="health-disp-video-title">{this.props.selectedHealthVideo.snippet.title}</h4>
                    <p>{this.props.selectedHealthVideo.snippet.description}</p>
                   </div>
               </div>
            )
        } else {
            return (
                <span className="loading-content">Loading<img className="loading" src={loadingIcon} alt="loadingIcon"/></span>
            )
        }
        
    }
    render() {
        // console.log(this.props.HealthTip)
        return (
            <div className="health-tip-main">
              <div className="health-tip-content">
              <div className="header-health-tip">
              <button className="account-icon" onClick={this.displayDropdown}>
                <img src={this.props.avatar} alt="femaleAvatar" /><span>{`Hey ${this.props.userName}!`}</span>
             </button>
             <div style={this.props.styleSettings} className="dropdown-content">
             <div><Link to="/home" ><img className="home-icon" src={homeIcon} alt="homeIcon" onClick={this.props.reloadPlans}/></Link></div>
                 <div><img className="home-icon" src={backButton} alt="backButton" onClick={this.reload}/></div> 
                 <div><button onClick={this.logOut}>Log out</button></div> 
                </div>
                <h2>Diet Tip</h2>
              </div>
                <h3>Fact to know: </h3><h4>{this.props.healthTip.text}</h4>
                <div className="health-video-content">
                        <div className="health-video-section">
                            {this.displayHealthVideoList()}
                        </div>
                        <div className="health-video-disp">
                            {this.displayHealthVideo()}
                        </div>
                       
                    </div>
            </div>
            </div>
           
        )
    }
}
