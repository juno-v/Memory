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



const styles = theme => ({
  card: {
    maxWidth: 200,
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
        let entryDate =  moment(date).format("MMM Do YY"); 
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
          image="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/450/s300/prime-20logo-20color.png"
          title=""
        />
        <CardContent>
          <Typography component="p">
            {this.props.entry.description}
          </Typography>
        </CardContent>
        <Button className={classes.button} variant="contained" color="primary" > Edit Journal </Button>
        <Button className={classes.button} variant="contained" color="secondary" > DELETE </Button>
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