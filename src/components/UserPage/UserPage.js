import React from 'react';
import { connect } from 'react-redux';
// import LogOutButton from '../LogOutButton/LogOutButton';
import Nav from "../Nav/Nav"; 
// import TabsWrappedLabel from "../UserPageTabs/UserPageTabs";
import UserPageTabs from '../UserPageTabs/UserPageTabs';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const UserPage = (props) => (
  <section>
  <div>
    <Nav />
    <UserPageTabs /> 
  </div>

   </section>
);

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
