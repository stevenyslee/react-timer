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
      offset: 0,
      pageCount: 0
    }
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  loadCommentsFromServer() {
    $.ajax({
      url: `http://localhost:3000/events?q=orange&_page=${this.state.offset}&_limit=10`,
      // data: {
        // limit: 10,
        // offset: this.state.offset
        // page: 1
      // },
      dataType: 'json',
      type: 'GET',
      success: (data, textStatus, request) => {
        // this.setState({
        //   data: data
        //   pageCount: Math.ceil(data.length / 10)
        // });
        // $.ajax({
        //   url: `http://localhost:3000/events?_page=${this.state.offset}&_limit=10`,
        //   dataType: 'json',
        //   type: 'GET',
        //   success: (data) => {
        //     console.log(data);
        //     this.setState({
        //       data: data
        //     });
        //   },
        //   error: (xhr, status, err) => {
        //     console.error(err.toString());
        //   }
        // });

        console.log('data', data);
        console.log('textStatus', textStatus);
        console.log('request', request);
        this.setState({
          data: data
          // pageCount: Math.ceil(data.length / 10)
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
    let selected = data.selected;
    let offset = Math.ceil(selected * 20);

    this.setState({offset: offset}, () => {
      this.loadCommentsFromServer();
    });
  };

  render() {
    return (
      <div className="eventBox">
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
