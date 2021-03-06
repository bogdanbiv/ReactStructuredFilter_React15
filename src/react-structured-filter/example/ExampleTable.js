import React, { Component } from 'react';
import GriddleWithCallback from './GriddleWithCallback.js';
import StructuredFilter from '../main.js';

import ExampleData from './ExampleData.js';

class ExampleTable extends Component {
  state = { filter: '', ExampleData: [] };

  getJsonData(
    filterString,
    sortColumn,
    sortAscending,
    page,
    pageSize,
    callback
  ) {
    if (filterString === undefined) {
      filterString = '';
    }

    if (sortColumn === undefined) {
      sortColumn = '';
    }

      if (!this.ExampleData) return;

    // Normally you would make a Reqwest here to the server
    var results = this.ExampleData.filter(
      filterString,
      sortColumn,
      sortAscending,
      page,
      pageSize
    );
    callback(results);
  }

  updateFilter(filter) {
    // Set our filter to json data of the current filter tokens
    this.setState({ filter: JSON.stringify(filter) });
  }

  getSymbolOptions() {
    return this.ExampleData.getSymbolOptions();
  }

  getSectorOptions() {
    return this.ExampleData.getSectorOptions();
  }

  getIndustryOptions() {
    return this.ExampleData.getIndustryOptions();
  }

  render() {
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
  }
}

export default ExampleTable;
