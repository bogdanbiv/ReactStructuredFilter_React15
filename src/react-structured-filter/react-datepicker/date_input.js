import React, { Component } from 'react';
import moment from 'moment';
import DateUtil from './util/date.js';
import PropTypes from 'prop-types';

class DateInput extends Component {
  propTypes = {
    onKeyDown: PropTypes.func,
  };

  getDefaultProps() {
    return {
      dateFormat: 'YYYY-MM-DD',
    };
  }

  getInitialState() {
    return {
      value: this.safeDateFormat(this.props.date),
    };
  }

  componentDidMount() {
    this.toggleFocus(this.props.focus);
  }

  componentWillReceiveProps(newProps) {
    this.toggleFocus(newProps.focus);

    this.setState({
      value: this.safeDateFormat(newProps.date),
    });
  }

  toggleFocus(focus) {
    if (focus) {
      this.refs.entry.focus();
    } else {
      this.refs.entry.blur();
    }
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  safeDateFormat(date) {
    return !!date ? date.format(this.props.dateFormat) : null;
  }

  isValueAValidDate(event) {
    var date = moment(event.target.value, this.props.dateFormat, true);

    return date.isValid();
  }

  handleEnter(event) {
    if (this.isValueAValidDate()) {
      var date = moment(event.target.value, this.props.dateFormat, true);
      this.props.setSelected(new DateUtil(date));
    }
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleEnter(event);
    }

    if (event.key === 'Backspace') {
      this.props.onKeyDown(event);
    }
  }

  handleClick(event) {
    this.props.handleClick(event);
  }

  render() {
    return (
      <input
        ref="entry"
        type="text"
        value={this.state.value}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        onFocus={this.props.onFocus}
        onChange={this.handleChange}
        className="datepicker__input"
        placeholder={this.props.placeholderText}
      />
    );
  }
}

export default DateInput;
