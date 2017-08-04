"use strict"

import React, {Component} from 'react';
import {
  FeedBack,
  MenuItem,
  InputGroup,
  DropdownButton,
  Image,
  Col,
  Row,
  Well,
  Panel,
  FormControl,
  FormGroup,
  ControlLabel,
  Button
} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postBooks, deleteBooks, getBooks, resetButton} from '../../actions/bookActions';
import axios from 'axios';

class BooksForm extends Component {
  constructor(){
    super();
    this.state = {
      images:[{}],
      img:''
    }
  }
  componentDidMount(){
    this.props.getBooks();
    axios.get('/api/images')
    .then((res)=>{
      this.setState({images:res.data})
    }).catch(err=>{
      this.setState({images: 'Error',img:''})
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    const book = [
      {

        title: findDOMNode(this.refs.title).value,
        description: findDOMNode(this.refs.description).value,
        images: findDOMNode(this.refs.image).value,
        price: findDOMNode(this.refs.price).value
      }
    ];
    this.props.postBooks(book);
  }
  onDelete(_id) {
    let bookId = findDOMNode(this.refs.delete).value;
    this.props.deleteBooks(bookId);
  }

  handleSelect(image){
    this.setState({
      img: '/assets/images/'+image
    });
  }
  resetForm(){
    //Reset Button
    this.props.resetButton();
     findDOMNode(this.refs.title).value="";
     findDOMNode(this.refs.description).value="";
     findDOMNode(this.refs.image).value="";
    findDOMNode(this.refs.price).value ="";
    this.setState({img:""})
  }

  render() {
    const booksList = this.props.books.map(book => {
      return (
        <option key={book._id}>
          {book._id}
        </option>
      )
    });
    const imgList = this.state.images.map((image,i)=>{
      return (
        <MenuItem onClick={this.handleSelect.bind(this, image.name)} key={i} eventKey={image.name}>{image.name}</MenuItem>
      )
    }, this)
    return (
      <Well>
        <Row>
          <Col xs={12} sm={6}>
            <Panel>
              <InputGroup>
                <FormControl type="text" ref="image" value={this.state.img}/>
              <DropdownButton componentClass={InputGroup.Button} id="input-dropdown-addon" title="Select an image" bsStyle="primary">
                  {imgList}
                </DropdownButton>
              </InputGroup>
              <Image src={this.state.img} responsive />
            </Panel>
          </Col>


          <Col xs={12} sm={6}>
            <Panel>
              <FormGroup controlId="title" validationState={this.props.validation}>
                <ControlLabel>Title</ControlLabel>
                <FormControl type="text" placeholder="Enter Title" ref="title"/>
              <FormControl.Feedback/>
              </FormGroup>

              <FormGroup controlId="description" validationState={this.props.validation}>
                <ControlLabel>Description</ControlLabel>
                <FormControl type="text" placeholder="Enter Description" ref="description"/>
                  <FormControl.Feedback/>
              </FormGroup>

              <FormGroup controlId="price" validationState={this.props.validation}>
                <ControlLabel>Price</ControlLabel>
                <FormControl type="text" placeholder="Enter Price" ref="price"/>
                  <FormControl.Feedback/>
              </FormGroup>
              <Button onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))} bsStyle={(!this.props.style)?("primary"):(this.props.style)}>

                {(!this.props.msg)?("Save book"):(this.props.msg)}


              </Button>
            </Panel>
            <Panel style={{
              marginTop: '25px'
            }}>
              <FormGroup controlId="delete">
                <ControlLabel>Select a book id to delete</ControlLabel>
                <FormControl ref="delete" componentClass="select" placeholder="select">
                  <option value="select">select</option>
                  {booksList}
                </FormControl>
              </FormGroup>
              <Button onClick={this.onDelete.bind(this)} bsStyle="danger">Delete Book</Button>
            </Panel>
          </Col>
        </Row>

      </Well>
    )
  }
}
function mapStateToProps(state) {
  return {
    books: state.books.books,
    msg: state.books.msg,
    style: state.books.style,
    validation: state.books.validation
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postBooks: postBooks,
    deleteBooks: deleteBooks,
    getBooks: getBooks,
    resetButton: resetButton
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);
