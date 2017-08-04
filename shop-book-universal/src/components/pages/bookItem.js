import React, {Component} from 'react';
import {Image,Row, Col, Well, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCart} from '../../actions/cartActions';
class BookItem extends Component {
  constructor(){
    super();
    this.state = {
      isClicked: false
    };
  }
  handleCart(e){
    e.preventDefault();
    const cart =[...this.props.carts,{
      _id:this.props._id,
      title:this.props.title,
      description:this.props.description,
      images: this.props.images,
      price:this.props.price,
      quantity:1
    }]
    console.log(cart);
    if(this.props.carts.length >0){
      //Cart IS NOT EMPTY
      let _id = this.props._id;
      let cartIndex = this.props.carts.findIndex(cart=> cart._id === _id);
      //IF RETURN -1 THERE ARE NO ITEM SAME ID
      if(cartIndex === -1){
        this.props.addToCart(cart)
      }
      else {
        //WE NEED UPDATE QUANTITY
        this.props.updateCart(_id,1,this.props.carts);
      }

    }else{
      //CART IS EMPTY
      this.props.addToCart(cart);
    }

  }

  onReadMore(){
    this.setState({
      isClicked:true
    })
  }
  render(){
    return(
      <Well>
        <Row>
          <Col xs={12} sm={4}>
            <Image src={this.props.images} responsive/>
          </Col>
          <Col xs={6} sm={8}>
            <h6>{this.props.title}</h6>
          <p>{(this.props.description.length>50 && this.state.isClicked===false)?(this.props.description.substring(0,50)):(this.props.description)}
              <button className='link' onClick={this.onReadMore.bind(this)}>
                {(this.state.isClicked === false && this.props.description !== null && this.props.description.length > 50)?('...Read More'):('')}
              </button>

          </p>
        <h6>$ {this.props.price}</h6>
      <Button onClick={this.handleCart.bind(this)} bsStyle='primary'>Buy now</Button>
          </Col>
        </Row>
      </Well>
    )
  }
}

function mapStateToProps(state){
  return {
    carts: state.cart.cart
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({addToCart:addToCart,updateCart: updateCart},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(BookItem);
