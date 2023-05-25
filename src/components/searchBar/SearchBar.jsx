import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchStyle } from './SerachBar.styled';
import { BiSearchAlt } from 'react-icons/bi';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    this.props.onSubmit(query);
    this.setState({ query: '' });
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  render() {
    const { query } = this.state;

    return (
      <SearchStyle.SearchBar>
        <SearchStyle.SearchForm onSubmit={this.handleSubmit}>
          <SearchStyle.SearchButton type="submit">
            <BiSearchAlt />
            <SearchStyle.SearchLabel>Search</SearchStyle.SearchLabel>
          </SearchStyle.SearchButton>
          <SearchStyle.SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.handleChange}
          />
        </SearchStyle.SearchForm>
      </SearchStyle.SearchBar>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
