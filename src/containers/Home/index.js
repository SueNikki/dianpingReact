import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Category from './components/Category';
import Headline from './components/Headline';
import Discount from './components/Discount';
import LikeList from './components/LikeList';
import HomeHeader from '../../components/Header';
import Footer from '../../components/Footer';
import Banner from './components/Banner';
import Activity from './components/Activity';
import { actions as homeActions, getLikes, getDiscounts, getPageCountOfLikes } from '../../redux/modules/home';

class Home extends Component {

  componentDidMount() {
    this.props.homeActions.loadDiscounts();
    console.log(this.props.likes,'likes');
  }

  fetchMoreLikes = () => {
    this.props.homeActions.loadLikes();
  }

  render() {
    const {likes, discounts, pageCount} = this.props;

    return (
      <div>
        <HomeHeader/>
        <Banner/>
        <Category/>
        <Headline/>
        <Activity/>
        <Discount data = {discounts}/>
        <LikeList data = {likes} pageCount = {pageCount} fetchData = {this.fetchMoreLikes}/>
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  console.log(state,'mapDispatchToProps')
  return {
    likes: getLikes(state),
    discount: getDiscounts(state),
    pageCount: getPageCountOfLikes(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    homeActions: bindActionCreators(homeActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);