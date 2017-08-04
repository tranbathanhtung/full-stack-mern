"use strict"

import React, {Component} from 'react';
import {Modal, Well, Panel,Row,Col, Button, ButtonGroup, Label} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteCart,updateCart, getCart} from '../../actions/cartActions';

class Cart extends Component {
  componentDidMount(){
    this.props.getCart();
  }
  onDelete(_id){
    const currentBook = this.props.carts;
    const indexToDelete = currentBook.findIndex(cart=>cart._id===_id);

    let cartAffterDelete = [...currentBook.slice(0,indexToDelete),...currentBook.slice(indexToDelete+1)]

    this.props.deleteCart(cartAffterDelete);
  }


  onIncrement(_id){
    this.props.updateCart(_id,1,this.props.carts);
  }
  onDecrement(_id,quantity){
    if(quantity > 1){
      this.props.updateCart(_id,-1,this.props.carts);
    }


  }
  constructor(){
    super();
    this.state = {
      showModal:false
    }
  }
  open(){
    this.setState({showModal:true})
  }
  close(){
      this.setState({showModal:false})
  }

  render(){

      if(this.props.carts[0]){
        return this.renderCart();
      }
      else{
         return this.renderEmpty();
      }

  }
  renderEmpty(){
    return(<div></div>)
  }
  renderCart(){
    const cartItemList = this.props.carts.map((cart)=>{
      return (
        <Panel key={cart._id}>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{cart.title}</h6><span></span>
            </Col>
            <Col xs={12} sm={2}>
              <h6>${cart.price}</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>qty. <Label bsStyle="success">{cart.quantity}</Label></h6>
            </Col>
            <Col xs={6} sm={4}>
            <ButtonGroup style={{minWidth:'300px'}}>
              <Button  onClick={this.onDecrement.bind(this,cart._id,cart.quantity)}bsStyle="default" bsSize="small">-</Button>
            <Button onClick={this.onIncrement.bind(this,cart._id)} bsStyle="default" bsSize="small">+</Button>
          <span>   </span>
        <Button onClick={this.onDelete.bind(this,cart._id)} bsStyle="danger" bsSize="small">DELETE</Button>
            </ButtonGroup>
            </Col>

          </Row>
        </Panel>
      )
    }, this)
    return (
      <Panel header="Cart" bsStyle="primary">
        {cartItemList}
        <Row>
          <Col xs={12}>
            <h6>Total amount:{this.props.totalAmount}</h6>
          <Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">
            PROCEED TO CHECKOUT
          </Button>
          </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Thank you!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Your order has been saved</h6>
          <p>You will receive an email confirmation</p>
          </Modal.Body>
          <Modal.Footer>
            <Col xs={6}>
              <h6>Total $:{this.props.totalAmount}</h6>
            </Col>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Panel>
    )
  }
}

function mapStateToProps(state){
  return {
    carts: state.cart.cart,
    totalAmount: state.cart.totalAmount,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({deleteCart:deleteCart,updateCart:updateCart,getCart: getCart},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Cart);
