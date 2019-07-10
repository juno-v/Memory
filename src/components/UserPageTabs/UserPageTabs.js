import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CreateEntryForm from "../CreateEntryForm/CreateEntryForm";
import EntriesList from "../EntriesList/EntriesList";
import {withRouter} from 'react-router-dom';


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function LinkTab(props) {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class NavTabs extends React.Component {
  state = {
    value: 0,
    change: 1
  };

  handleChange = (event, value) => {
    this.setState({ 
      value: value, 
      // change: this.state.change, 
    });
  };
  
  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <NoSsr>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs variant="fullWidth" value={value} onChange={this.handleChange}>
            <LinkTab label= "View All Entries"href="page1" />
            <LinkTab label= "Create Entry" href="page2" />
          </Tabs>
        </AppBar>
        {value === 1 && <TabContainer> {<CreateEntryForm />} </TabContainer>}
        {value === 0 && <TabContainer> {<EntriesList />} </TabContainer>}
      </div>
    </NoSsr>
    );
  }
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(NavTabs));