import React, { Component } from 'react';
import { connect } from 'react-redux';
import DisplayEntries from "../DisplayEntries/DisplayEntries"; 

class EntriesList extends Component {

    state = {
      id: this.props.reduxState.user.id
    }

    componentDidMount = () => {
    this.props.dispatch({ type: 'GET_ENTRIES', payload: this.state })
    }

  render() {
    return (
      <div>
        <h2>Entries :  {JSON.stringify(this.props.reduxState.getUserEntries)}  </h2>
         {this.props.reduxState.getUserEntries.map( (entry, index) => {
          // return 
          return (
            <li key={index}> {entry.description} </li>
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