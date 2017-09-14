import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * A single option within the TypeaheadSelector
 */
class TypeaheadOption extends Component {
  propTypes = {
    customClasses: PropTypes.object,
    onClick: PropTypes.func,
    children: PropTypes.string,
  };

  getDefaultProps() {
    return {
      customClasses: {},
      onClick: function(event) {
        event.preventDefault();
      },
    };
  }

  state = {
    hover: false,
  };

  render() {
    var classes = {
      hover: this.props.hover,
    };
    classes[this.props.customClasses.listItem] = !!this.props.customClasses
      .listItem;

    return (
      <li className={classes} onClick={this._onClick}>
        <a href="#" className={this._getClasses()} ref="anchor">
          {this.props.children}
        </a>
      </li>
    );
  }

  _getClasses() {
    var classes = {
      'typeahead-option': true,
    };
    classes[this.props.customClasses.listAnchor] = !!this.props.customClasses
      .listAnchor;
    return classes;
  }

  _onClick() {
    return this.props.onClick();
  }
}

export default TypeaheadOption;
