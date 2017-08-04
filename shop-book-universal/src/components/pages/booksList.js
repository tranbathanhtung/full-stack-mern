"use strict"

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/bookActions';
import {Carousel, Grid, Col, Row, Button} from 'react-bootstrap';
import BookItem from './bookItem';
import BooksForm from './booksForm';
import Cart from './cart';

class BooksList extends Component {
  componentDidMount() {
    //Dispatch an action
    this.props.getBooks();
  }

  render() {
    const bookList = this.props.books.map(book => {
      return (
        <Col xs={12} sm={6} md={4} key={book._id}>
          <BookItem _id={book._id} title={book.title} description={book.description} images={book.images} price={book.price}/>
        </Col>
      )
    });
    return (
      <Grid>
        <Row>
          <Carousel>
            <Carousel.Item>
              <img width={900} height={500} alt="900x300" src="/assets/images/home1.jpg"/>
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img width={900} height={500} alt="900x300" src="/assets/images/home2.png"/>
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>

          </Carousel>
        </Row>
        <Row>
          <Cart/>
        </Row>
        <Row style={{marginTop: '15px'}}>

          {bookList}
        </Row>
      </Grid>
    )
  }
}
function mapStateToProps(state) {
  return {books: state.books.books}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getBooks: getBooks
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList)
