"use strict"


import React, {Component} from 'react';
import Menu from './components/menu';
import Footer from './components/footer';
import{connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCart} from '../src/actions/cartActions';

class Main extends Component {
  componentDidMount(){
    this.props.getCart();
  }
  render(){
    return (
      <div>
        <Menu cartItemsNumber={this.props.totalQty}/>
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    totalQty: state.cart.totalQty
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({getCart: getCart},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
