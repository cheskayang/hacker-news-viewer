import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';

const PATH_SEARCH = '/search?';

const PARAM_SEARCH = 'query=';

// const isSearched = (query) => (item) => !query || item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;

const SearchInput = ({value, onChange, children, onSubmit}) =>
      <form onSubmit={onSubmit}>
        <input type="text" value={value} onChange={onChange} />
        <button type="submit">{children}</button>
      </form>;



const SearchTable = ({list, pattern}) =>
      <div className="table">
        {list.map(item =>
          <div key={item.objectID} className="table-row">
            <span><a href={item.url}>{item.title}</a></span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </div>
        )
        }
      </div>;


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      result: '',
      query: DEFAULT_QUERY
    };

    this.setTopStories = this.setTopStories.bind(this);
    this.fetchTopStories = this.fetchTopStories.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
  }

  setTopStories(result){
    this.setState({result})
  }

  fetchTopStories(query){
    fetch(`${PATH_BASE}${PATH_SEARCH}${PARAM_SEARCH}${query}`)
      .then(response => response.json())
      .then(result => this.setTopStories(result))
  }

  componentDidMount() {
    const { query } = this.state;
    this.fetchTopStories(query);
  }

  handleInput(e){
    this.setState({query: e.target.value})
  }

  onSearchSubmit(event) {
    const { query } = this.state;
    this.fetchTopStories(query);
    event.preventDefault();
  }

  render() {
    const {result, query} = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <SearchInput value={query} onChange={this.handleInput} onSubmit={this.onSearchSubmit}>Search</SearchInput>
        </div>
        {result? <SearchTable list={result.hits} pattern={query}/> : null}

      </div>
    );
  }
}

export default App;