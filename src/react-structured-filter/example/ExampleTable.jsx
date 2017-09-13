var React = require('react');
var Griddle = require('griddle-react');
var GriddleWithCallback = require('./GriddleWithCallback.jsx');
var StructuredFilter = require('../main.js');

var ExampleData = require('./ExampleData.jsx');

var ExampleTable = React.createClass({
  getInitialState: function() {
    return {
      filter: '',
    };
  },

  getJsonData: function(
    filterString,
    sortColumn,
    sortAscending,
    page,
    pageSize,
    callback
  ) {
    let thisComponent = this;

    if (filterString == undefined) {
      filterString = '';
    }
    if (sortColumn == undefined) {
      sortColumn = '';
    }

    // Normally you would make a Reqwest here to the server
    var results = this.ExampleData.filter(
      filterString,
      sortColumn,
      sortAscending,
      page,
      pageSize
    );
    callback(results);
  },

  updateFilter: function(filter) {
    // Set our filter to json data of the current filter tokens
    this.setState({ filter: JSON.stringify(filter) });
  },

  getSymbolOptions: function() {
    return this.ExampleData.getSymbolOptions();
  },

  getSectorOptions: function() {
    return this.ExampleData.getSectorOptions();
  },

  getIndustryOptions: function() {
    return this.ExampleData.getIndustryOptions();
  },

  render: function() {
    return (
      <div>
        <StructuredFilter
          placeholder=""
          options={[
            {
              category: 'Symbol',
              type: 'textoptions',
              options: this.getSymbolOptions,
            },
            { category: 'Name', type: 'text' },
            { category: 'Price', type: 'number' },
            { category: 'MarketCap', type: 'number' },
            { category: 'IPO', type: 'date' },
            {
              category: 'Sector',
              type: 'textoptions',
              options: this.getSectorOptions,
            },
            {
              category: 'Industry',
              type: 'textoptions',
              options: this.getIndustryOptions,
            },
          ]}
          customClasses={{
            input: 'filter-tokenizer-text-input',
            results: 'filter-tokenizer-list__container',
            listItem: 'filter-tokenizer-list__item',
          }}
          onTokenAdd={this.updateFilter}
          onTokenRemove={this.updateFilter}
        />

        <GriddleWithCallback
          getExternalResults={this.getJsonData}
          filter={this.state.filter}
          resultsPerPage={10}
        />

        <ExampleData
          myData={ExampleData => {
            console.log(ExampleData);
            this.ExampleData = ExampleData;
          }}
        />
      </div>
    );
  },
});
module.exports = ExampleTable;
