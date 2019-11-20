import React, { Component } from 'react';
import './workout-plan.css';

export default class WorkoutPlan extends Component {
    displayWorkoutVideoList = () => {
        return this.props.workoutVideos.map((video,ind) => {
            return (
                <div key ={ind} onClick={ () => this.props.handleVideoSelect(video)} className=' video-item item'>
                   <img className='ui image' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
                   <div className='content'>
                      <div className='header '>{video.snippet.title}</div>
                   </div>
                </div>
            )
        })
    }
    render() {
        return (
            <div>
              <div className='ui grid'>
                    <div className="ui row">
                        {/* <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo}/>
                        </div> */}
                        <div className="five wide column">
                            {this.displayWorkoutVideoList()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
