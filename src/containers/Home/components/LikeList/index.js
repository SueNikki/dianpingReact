import React, { Component } from 'react';
import Loading from '../../../../components/Loading';
import LikeItem from '../LikeItem';
import "./style.css"

export default class LikeList extends Component {
  removeListener = false;

  myRef = React.createRef();

  componentDidMount() {
    if(this.props.pageCount < 3) {
      document.addEventListener("scroll", this.handleScroll);
    } else {
      this.removeListener = true
    }
    if(this.props.pageCount === 0) {
      this.props.fetchData();
    }
  }

  componentDidUpdate() {
    if(this.props.pageCount >= 3 && !this.removeListener) {
      document.removeEventListener("scroll", this.handleScroll);
      this.removeListener = true;
    }
  }

  componentWillUnmount() {
    if(!this.removeListener) {
      document.removeEventListener("scroll", this.handleScroll);
    }
  }
 
  // 处理屏幕滚动事件，实现加载更多的效果
  handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop  || document.body.scrollTop;
    const screenHeight = document.documentElement.clientHeight;
    const likeListTop = this.myRef.current.offsetTop;
    const likeListHeight = this.myRef.current.offsetHeight;
    if(scrollTop >= likeListHeight + likeListTop - screenHeight - 44) {
      this.props.fetchData();
    }
  }

  render() {
    const {data, pageCount} = this.props;

    return (
      <div ref={this.myRef} className="likeList">
        <div className="likeList__header">猜你喜欢</div>
        <div className="likeList__list">
          {
            data.map((item, index) => {
              return <LikeItem key={index} data={item}/>
            })
          }
        </div>
        {
          pageCount < 3 ?  (<Loading/>) : (
            <a className='likeList__viewAll'>
              查看更多
            </a>
          )
        }
      </div>
    );
  }
}
