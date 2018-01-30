import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { withStyles } from 'material-ui/styles';

import moment from 'moment';
import Button from 'material-ui/Button';
import DateRange from 'material-ui-icons/DateRange';

import 'react-datepicker/dist/react-datepicker.css';

class CustomInput extends Component {
  render () {
    let formattedDate = moment(this.props.value).format("MMM Do");

    return (
      <div onClick={this.props.onClick}>
        <Button 
          aria-label="Delete"
          onClick={this.props.onClick}
        >
          <DateRange style={{marginRight:5}}/>
          {formattedDate}
        </Button>
      </div>
    )
  }
}

class IconDatePicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
  
  render() {
    return (
      <DatePicker
        customInput={<CustomInput />}
        selected={this.state.startDate}
        onChange={this.handleChange} />
    );
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

export default withStyles(styles)(IconDatePicker);