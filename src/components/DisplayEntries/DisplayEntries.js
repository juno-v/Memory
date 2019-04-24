import React, { Component } from 'react';
import { connect } from 'react-redux';

class DisplayEntries extends Component {
    render() {
        return (
            <div>
                 {JSON.stringify(this.props.reduxState.getUserEntries)} 
                 {/* {entry.description} */}
            </div>
        );
    }
}



const mapStateToProps = reduxState => ({
    reduxState,
});
  
export default connect(mapStateToProps)(DisplayEntries);