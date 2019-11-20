import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Switch,Route} from 'react-router-dom';
import Login from './components/login-component/login';
import SignUp from './components/sign-up-component/sign-up';
import Home from './components/home-component/home';
import MealPlan from './components/meal-plan-component/meal-plan';
import WorkoutPlan from './components/workout-plan-component/workout-plan';
import HealthCheck from './components/health-check-component/health-check';
import Axios from 'axios';
const KEY = 'AIzaSyAEjrWBTS0fzNvmx9JTdBBNYEVs460G0SU';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready:false,
      credential:{},
      loginCredentials:[],
      loggerInfo:{
        userName:"",
        password:""
    },
    mealPlan:{},
    searchText:"",
    authenticatedFlag: false,
    workoutVideos: [],
    selectedWorkoutVideo: null
    }
  }
  componentDidMount(){
    Axios.get("https://ironrest.herokuapp.com/pradeepa")
         .then((data) => {
           console.log(data);
           let credentials = data.data.filter(cred => cred._id === '5dd440ae7b55290017a2b1bc');
           this.setState({
               ready:true,
               credential: data.data,
               loginCredentials: credentials[0].loggers 
           })
         })
         .catch((err)=>{
           console.log(err);
         })
    Axios.get("https://webknox-recipes.p.rapidapi.com/recipes/mealplans/generate?targetCalories=2000&timeFrame=day",{headers:{
          "x-rapidapi-host": "webknox-recipes.p.rapidapi.com",
          "x-rapidapi-key": "4f90ef96b0msh246f6e054afbdd1p14c2ffjsn4e4ab27d80f1"}
        })
             .then((meals)=>{
               console.log(meals.data);
               this.setState({
                    mealPlan:meals.data,
                    ready:true
               })
             })
             .catch((err)=>{
               console.log(err);
             })
    this.handleSubmit();
  }
  handleSubmit = async () => {
    // const response = await youtube.get('/search', {
    //     params: {
    //         q: "workout"
    //     }
    // })
    // console.log(response);
    // this.setState({
    //     workoutVideos: response.data.items
    // })
    Axios.get('https://www.googleapis.com/youtube/v3/search',{params: {
      part: "snippet",
      maxResults: 5,
      key: KEY,
      q:"workout"
  }
  })
       .then((res)=>{
          console.log(res);
          this.setState({
        workoutVideos: res.data.items
           })
       })
       .catch((err) => {
         console.log(err);
       })
    
}
handleVideoSelect = (video) => {
  this.setState({selectedWorkoutVideo: video})
}

  setLogin = (login) => {
    this.setState({
      loggerInfo: login
    })
  }
  authenticateUser = () => {
    let logger = this.state.loginCredentials.filter(user => user.userName === this.state.loggerInfo.userName);
    if(this.state.loggerInfo.password === logger[0].password) {
       this.setState({
         authenticatedFlag:true
       })
    }
  }
  setSearch = (str) => {
    this.setState({
      searchText:str
    })
  }
  callMeals = ()=> {
    let str = this.state.searchText;
    let replacedStr = str.replace(/ /gi,'%20');
   
  }
  createAccount = () => {
    let loggersTemp = {...this.state.credential}
    
    loggersTemp[4].loggers.push(this.state.loggerInfo);
    console.log(loggersTemp);
    Axios.put("https://ironrest.herokuapp.com/pradeepa/5dd440ae7b55290017a2b1bc",{data:loggersTemp})
         .then((res) => {
           console.log(res)
         })
         .catch((err)=>{
           console.log(err);
         })
  }
  render() {
    return (
      <div className="content">
        <header>
          <h1>AAROKYA</h1>
        </header>
        <div className="main-content">
          <Switch>
            <Route exact path="/" render = { (props) => <Login {...props} loggerInfo = {this.state.loggerInfo}
                                                                          setLogin = {this.setLogin}
                                                                          authenticateUser = {this.authenticateUser}
                                                                          authenticatedFlag = {this.state.authenticatedFlag}
            /> } />
            <Route exact path="/sign-up" render = { (props) => <SignUp {...props} loggerInfo = {this.state.loggerInfo}
                                                                                  setLogin = {this.setLogin}
                                                                                  createAccount = {this.createAccount}
                                                                                  authenticateUser = {this.authenticateUser}
                                                                                  authenticatedFlag = {this.state.authenticatedFlag}
            /> } />
            <Route exact path="/home" component={Home} />
            <Route exact path="/meal-plan" render = { (props) => <MealPlan {...props} searchText = {this.state.searchText}
                                                                                      setSearch = {this.setSearch}
                                                                                      callMeals = {this.callMeals}
                                                                                      mealPlan = {this.state.mealPlan}
                                                                                      ready = {this.state.ready}
            /> } />
            <Route exact path="/workout-plan" render = { (props) => <WorkoutPlan {...props} workoutVideos = {this.state.workoutVideos}
                                                                                            selectedWorkoutVideo = {this.state.selectedWorkoutVideo}
                                                                                            handleVideoSelect = {this.handleVideoSelect}
            /> } />
            <Route exact path="/health-check" component={HealthCheck} />
          </Switch>
        </div>
      </div>
    );
  }
 
}

export default App;
