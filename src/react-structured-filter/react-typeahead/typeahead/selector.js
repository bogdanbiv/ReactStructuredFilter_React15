import TypeaheadOption from './option.js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Container for the options rendered as part of the autocompletion process
 * of the typeahead
 */
class TypeaheadSelector extends Component {
  propTypes = {
    options: PropTypes.array,
    header: PropTypes.string,
    customClasses: PropTypes.object,
    selectionIndex: PropTypes.number,
    onOptionSelected: PropTypes.func,
  };

  getDefaultProps() {
    return {
      selectionIndex: null,
      customClasses: {},
      onOptionSelected: function(option) {},
    };
  }

  getInitialState() {
    return {
      selectionIndex: this.props.selectionIndex,
      selection: this.getSelectionForIndex(this.props.selectionIndex),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ selectionIndex: null });
  }

  render() {
    var classes = {
      'typeahead-selector': true,
    };
    classes[
      this.props.customClasses.results
    ] = this.props.customClasses.results;

    var results = this.props.options.map(function(result, i) {
      return (
        <TypeaheadOption
          ref={result}
          key={result}
          hover={this.state.selectionIndex === i}
          customClasses={this.props.customClasses}
          onClick={this._onClick.bind(this, result)}>
          {result}
        </TypeaheadOption>
      );
    }, this);
    return (
      <ul className={classes}>
        <li className="header">{this.props.header}</li>
        {results}
      </ul>
    );
  }

  setSelectionIndex(index) {
    this.setState({
      selectionIndex: index,
      selection: this.getSelectionForIndex(index),
    });
  }

  getSelectionForIndex(index) {
    if (index === null) {
      return null;
    }

    return this.props.options[index];
  }

  _onClick(result) {
    this.props.onOptionSelected(result);
  }

  _nav(delta) {
    if (!this.props.options) {
      return;
    }
    var newIndex;
    if (this.state.selectionIndex === null) {
      if (delta === 1) {
        newIndex = 0;
      } else {
        newIndex = delta;
      }
    } else {
      newIndex = this.state.selectionIndex + delta;
    }
    if (newIndex < 0) {
      newIndex += this.props.options.length;
    } else if (newIndex >= this.props.options.length) {
      newIndex -= this.props.options.length;
    }
    var newSelection = this.getSelectionForIndex(newIndex);
    this.setState({
      selectionIndex: newIndex,
      selection: newSelection,
    });
  }

  navDown() {
    this._nav(1);
  }

  navUp() {
    this._nav(-1);
  }
}

export default TypeaheadSelector;
