import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import $ from 'jquery';

window.React = React;

export class CommentList extends Component {
  render() {
    let eventNodes = this.props.data.map((event, index) => {
      return (
        <div key={index}>Date: {event.date} | Description: {event.description} | Language: {event.lang} | Category 1: {event.category1} | Category 2: {event.category2} | Granularity: {event.granularity}</div>
      );
    });

    return (
      <div id="eventList" className="eventList">
        <ul>
          {eventNodes}
        </ul>
      </div>
    );
  }
};

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      pageCount: 1,
      value: ''
    }
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
  }

  loadCommentsFromServer() {
    $.ajax({
      url: `http://localhost:3000/events?q=${this.state.value}&_page=${this.state.pageCount}&_limit=10`,
      dataType: 'json',
      type: 'GET',
      success: (data, textStatus, request) => {
        this.setState({
          data: data,
          pageCount: Math.ceil(Number(request.getResponseHeader('x-Total-Count')) / 10)
        });
      },
      error: (xhr, status, err) => {
        console.error(err.toString());
      }
    });
  }

  componentDidMount() {
    this.loadCommentsFromServer();
  }

  handlePageClick(data) {
    this.setState({pageCount: data.selected + 1}, () => {
      this.loadCommentsFromServer();
    });
  };

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className="eventBox">
        <form onSubmit={(event) => {this.handlePageClick({selected: 0}); event.preventDefault()}}>
          <label>
            Search:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <CommentList
          data={this.state.data}
        />
        <span className="paginateBar">
          <ReactPaginate 
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={<a href="">...</a>}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </span>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));
