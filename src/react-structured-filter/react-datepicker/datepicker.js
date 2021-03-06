import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Popover from './popover.js';
import Calendar from './calendar.js';
import DateInput from './date_input.js';

class DatePicker extends Component {
  propTypes = {
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
  };

  getInitialState() {
    return {
      focus: true,
    };
  }

  handleFocus() {
    this.setState({
      focus: true,
    });
  }

  hideCalendar() {
    this.setState({
      focus: false,
    });
  }

  handleSelect(date) {
    this.hideCalendar();
    this.setSelected(date);
  }

  setSelected(date) {
    this.props.onChange(date.moment());
  }

  onInputClick() {
    this.setState({
      focus: true,
    });
  }

  calendar() {
    if (this.state.focus) {
      return (
        <Popover>
          <Calendar
            selected={this.props.selected}
            onSelect={this.handleSelect}
            hideCalendar={this.hideCalendar}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
          />
        </Popover>
      );
    }
  }

  render() {
    return (
      <div>
        <DateInput
          ref="dateinput"
          date={this.props.selected}
          dateFormat={this.props.dateFormat}
          focus={this.state.focus}
          onFocus={this.handleFocus}
          onKeyDown={this.props.onKeyDown}
          handleClick={this.onInputClick}
          handleEnter={this.hideCalendar}
          setSelected={this.setSelected}
          hideCalendar={this.hideCalendar}
          placeholderText={this.props.placeholderText}
        />
        {this.calendar()}
      </div>
    );
  }
}

export default DatePicker;
