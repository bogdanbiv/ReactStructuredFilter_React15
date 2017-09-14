import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Encapsulates the rendering of an option that has been "selected" in a
 * TypeaheadTokenizer
 */
class Token extends Component {
  propTypes = {
    children: PropTypes.object,
    onRemove: PropTypes.func,
  };

  render() {
    return (
      <div {...this.props} className="typeahead-token">
        {this.props.children['category']} {this.props.children['operator']} "{this.props.children['value']}"
        {this._makeCloseButton()}
      </div>
    );
  }

  _makeCloseButton() {
    if (!this.props.onRemove) {
      return '';
    }
    return (
      <a
        className="typeahead-token-close"
        href="#"
        onClick={function(event) {
          this.props.onRemove(this.props.children);
          event.preventDefault();
        }.bind(this)}>
        &#x00d7;
      </a>
    );
  }
}

export default Token;
