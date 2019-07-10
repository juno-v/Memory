import React, { Component } from 'react';
import { connect } from 'react-redux';
import DisplayEntries from "../DisplayEntries/DisplayEntries"; 
import './Entries.css'
import SearchBy from "./SearchBy";

class EntriesList extends Component {

    state = {
      id: this.props.reduxState.user.id,
      
    }

    componentDidMount = () => {
    this.props.dispatch({ type: 'GET_ENTRIES', payload: this.state })
    }

  render() {

    return (
      <div>
        <center>
          <SearchBy /> 
        </center>
        <h2> Most recent entries below (Please delete entries when done with demo, there is a limit on database creations with Heroku)</h2> <hr /> 
        {/* <h2>Entries :  {JSON.stringify(this.props.reduxState.getUserEntries)}  </h2> */}
         {this.props.reduxState.getUserEntries.map( (entry, index) => {
          return (
           <section key={index} className="cards" > 
            <DisplayEntries entry={entry} /> 
           </section> 
          )
        })}  
      </div>
    )
  };
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(EntriesList);