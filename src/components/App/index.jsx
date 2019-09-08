import React, { Component } from 'react';
import './index.css';
import Table from '../Table';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
console.log(url);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };

    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  onDismiss(id) {
    // console.log(id);
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    console.log(updatedHits);
    this.setState({
      result: Object.assign({}, this.state.result, { hits: updatedHits })
    });
  }

  render() {
    const { result, searchTerm } = this.state;
    console.log(result);

    if (!result) {
      // console.log('bingo', !result);
      return null;
    }

    return (
      <div className="App page">
        <h1>Hacker News</h1>
        {/* {result.hits.map((news, i) => (
          <a href={news.url}>News {i + 1}</a>
        ))} */}
        <Table
          list={result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

export default App;
