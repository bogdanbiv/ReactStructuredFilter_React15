import React, { Component } from 'react';
import Token from './token.js';
import KeyEvent from '../keyevent.js';
import Typeahead from '../typeahead/index.js';
import PropTypes from 'prop-types';

/**
 * A typeahead that, when an option is selected, instead of simply filling
 * the text entry widget, prepends a renderable "token", that may be deleted
 * by pressing backspace on the beginning of the line with the keyboard.
 */
class TypeaheadTokenizer extends Component {
  static propTypes = {
    options: PropTypes.array,
    customClasses: PropTypes.object,
    defaultSelected: PropTypes.array,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    onTokenRemove: PropTypes.func,
    onTokenAdd: PropTypes.func,
  };

  componentWillReceiveProps() {
    this.setState({
      selected: this.props.defaultSelected,
    });
  }

  state = {
    selected: { map: () => {} },
    category: '',
    operator: '',
  };

  defaultProps = {
    options: [],
    defaultSelected: [],
    customClasses: {},
    defaultValue: '',
    placeholder: '',
    onTokenAdd: function() {},
    onTokenRemove: function() {},
  };

  // TODO: Support initialized tokens
  //
  _renderTokens() {
    var tokenClasses = {};
    tokenClasses[this.props.customClasses.token] = !!this.props.customClasses
      .token;
    var result = this.state.selected.map(function(selected) {
      let mykey = selected.category + selected.operator + selected.value;

      return (
        <Token
          key={mykey}
          className={tokenClasses}
          onRemove={this._removeTokenForValue}>
          {selected}
        </Token>
      );
    }, this);

    return result;
  }

  _getOptionsForTypeahead() {
    if (this.state.category === '') {
      var categories = [];
      for (var i = 0; i < this.props.options.length; i++) {
        categories.push(this.props.options[i].category);
      }
      return categories;
    } else if (this.state.operator === '') {
      let categoryType = this._getCategoryType();

      if (categoryType === 'text') {
        return ['==', '!=', 'contains', '!contains'];
      } else if (categoryType === 'textoptions') {
        return ['==', '!='];
      } else if (categoryType === 'number' || categoryType === 'date') {
        return ['==', '!=', '<', '<=', '>', '>='];
      } else {
        console.log('WARNING: Unknown category type in tokenizer');
      }
    } else {
      var options = this._getCategoryOptions();
      if (options == null) return [];
      else return options();
    }

    return this.props.options;
  }

  _getHeader() {
    if (this.state.category === '') {
      return 'Category';
    } else if (this.state.operator === '') {
      return 'Operator';
    }

    return 'Value';
  }

  _getCategoryType() {
    for (var i = 0; i < this.props.options.length; i++) {
      if (this.props.options[i].category === this.state.category) {
        let categoryType = this.props.options[i].type;
        return categoryType;
      }
    }
  }

  _getCategoryOptions() {
    for (var i = 0; i < this.props.options.length; i++) {
      if (this.props.options[i].category === this.state.category) {
        return this.props.options[i].options;
      }
    }
  }

  _onKeyDown(event) {
    // We only care about intercepting backspaces
    if (event.keyCode !== KeyEvent.DOM_VK_BACK_SPACE) {
      return;
    }

    // Remove token ONLY when bksp pressed at beginning of line
    // without a selection
    var entry = this.refs.typeahead.inputRef();
    if (
      entry.selectionStart === entry.selectionEnd &&
      entry.selectionStart === 0
    ) {
      if (this.state.operator !== '') {
        this.setState({ operator: '' });
      } else if (this.state.category !== '') {
        this.setState({ category: '' });
      } else {
        // No tokens
        if (!this.state.selected.length) {
          return;
        }

        this._removeTokenForValue(
          this.state.selected[this.state.selected.length - 1]
        );
      }

      event.preventDefault();
    }
  }

  _removeTokenForValue(value) {
    var index = this.state.selected.indexOf(value);

    if (index === -1) {
      return;
    }

    this.state.selected.splice(index, 1);
    this.setState({ selected: this.state.selected });
    this.props.onTokenRemove(this.state.selected);

    return;
  }

  _addTokenForValue(value) {
    if (this.state.category === '') {
      this.setState({ category: value });
      this.refs.typeahead.setEntryText('');
      return;
    }

    if (this.state.operator === '') {
      this.setState({ operator: value });
      this.refs.typeahead.setEntryText('');
      return;
    }

    value = {
      category: this.state.category,
      operator: this.state.operator,
      value: value,
    };

    this.state.selected.push(value);
    this.setState({ selected: this.state.selected });
    this.refs.typeahead.setEntryText('');
    this.props.onTokenAdd(this.state.selected);

    this.setState({ category: '', operator: '' });

    return;
  }

  /***
   * Returns the data type the input should use ("date" or "text")
   */
  _getInputType() {
    if (this.state.category !== '' && this.state.operator !== '') {
      return this._getCategoryType();
    } else {
      return 'text';
    }
  }

  render() {
    var classes = {};
    classes[this.props.customClasses.typeahead] = !!this.props.customClasses
      .typeahead;

    return (
      <div className="filter-tokenizer">
        <span className="input-group-addon">
          <i className="fa fa-search" />
        </span>
        <div className="token-collection">
          {this._renderTokens()}

          <div className="filter-input-group">
            <div className="filter-category">{this.state.category} </div>
            <div className="filter-operator">{this.state.operator} </div>

            <Typeahead
              ref="typeahead"
              className={classes}
              placeholder={this.props.placeholder}
              customClasses={this.props.customClasses}
              options={this._getOptionsForTypeahead()}
              header={this._getHeader()}
              datatype={this._getInputType()}
              defaultValue={this.props.defaultValue}
              onOptionSelected={this._addTokenForValue}
              onKeyDown={this._onKeyDown}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TypeaheadTokenizer;
