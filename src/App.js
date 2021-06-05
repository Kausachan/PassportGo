import React, {Component} from 'react';
import SignIn_SignUp from './page/signin_signup/SignIn_SignUp.component';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import HomePage from './page/home/HomePage.component';
import Header from './components/header/Header.component';
import {auth, createUserProfile} from './firebase/Firebase.utils';
import {connect} from 'react-redux';
import {setUserAction} from './redux/user/user.actions';
import Register from './components/register/Register.component';
import Verification from './components/verification/Verification.component';
import CheckStatus from './components/checkstatus/CheckStatus.component';
import {Redirect, Link} from 'react-router-dom';

class App extends Component{

unsubscribe = null;
unsubscribe_snap = null;

componentDidMount(){
  const {setUserAction} = this.props;
  this.unsubscribe = auth.onAuthStateChanged(async userAuth => {
    if(userAuth)
    {
      const userRef = await createUserProfile(userAuth);
      this.unsubscribe_snap = userRef.onSnapshot(snapshot =>{
        setUserAction({
            id : snapshot.id,
          ...snapshot.data()
        })
      })
    }
    else setUserAction(userAuth);
  });
}

componentWillUnmount(){
  this.unsubscribe_snap();
  this.unsubscribe();
}

  render(){
    const {currentUser} = this.props
    return(
      <div>
        <Header currentUser = {this.props.currentUser}/>
        <Switch>
          <Route exact path = "/" render = {() => currentUser ? (<Redirect to = "/home"/>) : (<SignIn_SignUp/>) }/>
          <Route exact path = "/home" render = {() => currentUser ? (<HomePage/>) : (<SignIn_SignUp/>) }/>
          <Route exact path = "/home/registration" render = {() => 
            currentUser ?
              (currentUser.Registration ?
                (<h1> You've already Registered</h1>)
              :
                 (<Register/>)
              )
            :
            <Link to = "/"> Signin </Link> 
          }/>
          <Route exact path = "/home/verification" render = {() =>
            currentUser ?
              (currentUser.Verification ?
                (<h1> You've already Responded</h1>)
              :
                 (<Verification/>)
              )
            :
            <Link to = "/"> Signin </Link> 

          } />
          <Route exact path = "/home/checkStatus" component = {CheckStatus}/>
        </Switch>
      </div>
      )
  }
}

const mapStateToProps = ({user}) =>({
  currentUser : user.currentUser
})

const DispatchState = (dispatch) => ({
  setUserAction : user => dispatch(setUserAction(user))
})

export default connect(mapStateToProps, DispatchState)(App);
