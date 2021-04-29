import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import { Homepage } from './pages/Homepage';
import { ContactDetails } from './pages/ContactDetails';
import { ContactEdit } from './pages/ContactEdit';
import { Contacts } from './pages/Contacts';
import { connect, useSelector } from 'react-redux';
import { Statistics } from './pages/Statistics';
import { AppHeader } from './cmps/AppHeader';
import { Signup } from './pages/Signup/Signup';
import { userService } from './services/userService';
import { useEffect } from 'react';

export const App = (props) => {
  const user = userService.getLoggedinUser();

  // useEffect(()=>{
  //   let user = userService.getLoggedinUser()
  //   // if(!user)

  // },[])

  const PrivateRoute = (props) => {
    return user ? (
      <Route component={props.component} path={props.path} />
    ) : (
      <Redirect to='/signup' />
    );
  };

  return (
    <Router>
      <div className='app'>
        <AppHeader />
        <Switch>
          <PrivateRoute
            component={ContactEdit}
            user={user}
            path='/contact/edit/:id?'
          />
          {/* <Route component={ContactEdit} path='/contact/edit/:id?' /> */}
          <Route component={ContactDetails} path='/contact/:id' />
          <Route component={Statistics} path='/statistics' />
          <Route component={Contacts} path='/contacts' />
          <Route component={Signup} path='/signup' />
          <Route component={Homepage} path='/' />
          {/* <BitcoinApp /> */}
        </Switch>
      </div>
    </Router>
  );
};
// const mapStateToProps = (state) => {
//   return {
//     user: state.userReducer.currUser,
//   };
// };
// export const App = connect(mapStateToProps)(_App);
