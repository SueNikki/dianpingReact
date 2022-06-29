import React, { Component } from 'react';
import ProductOverview from './components/ProductOverview';
import Header from '../../components/Header';
import ShopInfo from './components/ShopInfo';
import Detail from './components/Detail';
import Remark from './components/Remark';
import BuyButton from './components/BuyButton';

export default class ProductDetail extends Component {
  handleBack = () => {
    
  }
  render() {
    return (
      <div>
        <Header title="团购详情" onBack={this.handleBack}/>
        <ProductOverview/>
        <ShopInfo/>
        <Detail/>
        <Remark/>
        <BuyButton/>
      </div>
    )
  }
}
