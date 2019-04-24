import React, { Component } from 'react';
import { connect } from 'react-redux';
import DisplayEntries from "../DisplayEntries/DisplayEntries"; 

class EntriesList extends Component {

    componentDidMount = () => {
    this.props.dispatch({ type: 'GET_ENTRIES' })
    }

  render() {
    return (
      <div>
        <h2>Entries :  {JSON.stringify(this.props.reduxState.getUserEntries)}  </h2>
         {this.props.reduxState.getUserEntries.map( entry => {
          return <DisplayEntries item={entry}/>
        })}  
      </div>
    )
  };
}

const mapStateToProps = reduxState => ({
  reduxState,
});

export default connect(mapStateToProps)(EntriesList);