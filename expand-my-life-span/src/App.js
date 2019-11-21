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
import leafIcon from './images/leaf-icon.png';
const KEY = 'AIzaSyAEjrWBTS0fzNvmx9JTdBBNYEVs460G0SU';
const rapidKey = "4f90ef96b0msh246f6e054afbdd1p14c2ffjsn4e4ab27d80f1";
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
    // mealPlan:{
    //   "nutrients":{
    //   "protein":90.62,
    //   "fat":56.21,
    //   "carbohydrates":309.43,
    //   "calories":1997.07,
    //   },
    //   "meals":[
    //   {
    //   "id":47200,
    //   "title":"Post Grape-nuts Carb Bars",
    //   "image":"post_grape-nuts_carb_bars-47200.jpg",
    //   },
    //   {
    //   "id":223009,
    //   "title":"Lemon-spiced chicken with chickpeas",
    //   "image":"Lemon-spiced-chicken-with-chickpeas-223009.jpg"
    //   },
    //   {
    //   "id":302815,
    //   "title":"Grilled Peanut Butter and Banana Sandwich",
    //   "image":"Grilled-Peanut-Butter-and-Banana-Sandwich-302815.jpg"
    //   }
    //   ]
    //   },
    searchText:"",
    authenticatedFlag: false,
    workoutVideos: [],
    selectedWorkoutVideo: null,
    styleSettings:{display:'none'},
    bmiObj:{
          "weight":{"value":"","unit":"kg"},
          "height":{"value":"","unit":"cm"},
          "sex":"m",
          "age":"",
          "waist":"",
          "hip":""
    },
    bmiResult:{},
    bmiLoaderFlag:false
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

         //to avoid more call to api
    Axios.get("https://webknox-recipes.p.rapidapi.com/recipes/mealplans/generate?targetCalories=2000&timeFrame=day",{headers:{
          "x-rapidapi-host": "webknox-recipes.p.rapidapi.com",
          "x-rapidapi-key": rapidKey}
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
    // Axios.put("https://ironrest.herokuapp.com/pradeepa/5dd43ede7b55290017a2b1a8",{scores:['asdfsdf']})
    // .then(res=>console.log(res))
    // .catch(err=>console.log(err))
    
  }

  setBmiObject = (obj) => {
     this.setState({
       bmiObj:obj
     })
  }
  getBmi = () => {
    this.setState({
      bmiLoaderFlag: true
    })
    Axios.post("https://bmi.p.rapidapi.com/",this.state.bmiObj,{headers:{
      "x-rapidapi-host": "bmi.p.rapidapi.com",
	    "x-rapidapi-key": rapidKey,
	    "content-type": "application/json",
	    "accept": "application/json"
      }
    })
    .then((res)=>{
      console.log(res);
      this.setState({
        bmiResult:res.data,
        bmiObj:{
          "weight":{"value":"","unit":"kg"},
          "height":{"value":"","unit":"cm"},
          "sex":"m",
          "age":"",
          "waist":"",
          "hip":""
    },
       bmiLoaderFlag:false
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }
  setStyleSettings = (styleObj) => {
    this.setState({
      styleSettings: styleObj
    });
  }
  handleSubmit = () => {
    Axios.get('https://www.googleapis.com/youtube/v3/search',{params: {
      part: "snippet",
      maxResults: 3,
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
  logOutSession = () => {
    this.setState({
      authenticatedFlag:false,
      loggerInfo:{
        userName:"",
        password:""
    }
    })
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
           <img src={leafIcon} alt="leafIcon" />
          <h1>Aarokya</h1>
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
            <Route exact path="/home" render = { (props) => <Home {...props} styleSettings = {this.state.styleSettings}
                                                                             setStyleSettings = {this.setStyleSettings}
                                                                              logOutSession = {this.logOutSession}      
                                                                              authenticatedFlag = {this.state.authenticatedFlag}       
            /> }  />
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
            <Route exact path="/health-check" render = { (props) => <HealthCheck {...props} bmiObj = {this.state.bmiObj}
                                                                                            setBmiObject = {this.setBmiObject}
                                                                                            getBmi = {this.getBmi}
                                                                                            bmiResult = {this.state.bmiResult}
                                                                                            bmiLoaderFlag = {this.state.bmiLoaderFlag}
            /> } />
          </Switch>
        </div>
      </div>
    );
  }
 
}

export default App;
