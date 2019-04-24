import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import moment from 'moment';

import MapSiftedArray from "./MapSiftedArray";

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
    button: {
      margin: theme.spacing.unit,
    },
});

class DisplayEntries extends Component {

  state = {
    files: [],
  }

    formatDate = (date) => {
        let entryDate =  moment(date).format(); 
        return entryDate; 
    }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          title={this.props.entry.title}
          subheader={this.formatDate(this.props.entry.date)}
        />
        <CardMedia
          className={classes.media}
          // image={`https://s3.us-east-2.amazonaws.com/jvueproject1/${this.props.entry.file}`}
          title=""
        />
        <CardContent>
          <Typography component="p">
            {this.props.entry.description}
            {/* {this.props.entry.files} */}
            <MapSiftedArray /> 
          </Typography>
        </CardContent>
        <Button className={classes.button} variant="contained" color="secondary" > Edit Journal </Button>
      </Card>
    );
  }
}

DisplayEntries.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({
    reduxState,
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, null)
  )(DisplayEntries);