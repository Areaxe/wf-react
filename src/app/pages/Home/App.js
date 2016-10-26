import React from 'react';
import Styles from './App.scss';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import ActivityList from '../../components/ActivityList/ActivityList';
import Menu from '../../components/Menu/Menu';
import Logo from '../../components/logo/logo';
import DocumentTitle from 'react-document-title';
import NewsList from '../../components/NewsList/NewsList'
import DetailHead from '../../components/DetailHead/DetailHead.js';
import fwc from '../../images/xinwenyan_36@3x.png';
import { Affix } from 'antd';
import { Link } from 'react-router';
import Loading from '../../components/Shade/Loading'


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isfirst: true,
    }
  }

  componentWillMount() {
    let states = this.props.states;
    if (states.project.region && !states.project.news && states.project.token) {
      this.props.actions.newsFetch(states.project.region, 'all', '-praise')
    }
  }

  componentWillReceiveProps(nextProps) {
    let states = nextProps.states;
    if (states.project.region && !states.project.news && states.project.token && this.state.isfirst) {
      this.props.actions.newsFetch(states.project.region, 'all', '-praise')
    }
    this.setState({
      isfirst: false,
    })
  }

  _serviceDetail(serviceId) {
    localStorage.setItem('curService', serviceId)
    this.props.actions.serviceDetail(serviceId)
  }


  render() {
    let news = this.props.states.project.news ? this.props.states.project.news : this.props.states.news.newsInfo
    let bannerList = this.props.states.project.banner
    let newsList = news.map((val, i) => {
      return {
        title: val.title,
        imgUrl: val.cover.url ? `${val.cover.url}@68h_100w_1e_1c` : exampleImage,
        owner: val.newsType.name,                      // val.author
        like: val.praise + '赞',
        time: val.date,
        newsType: 'small',
        newsId: val._id,
      }
    })
    let detailHeadSetting = {
      tip: '新闻窗',
      imgLink: fwc,
    };
    let imgStyle = {
      width: '1.8rem',
      height: '1.8rem',
      verticalAlign: 'middle',
      marginRight: '.4rem',
    }
    if (news) {
      return (
        <DocumentTitle title='从化区妇女联合会'>
          <div>
            <div className='home'>
              <Logo></Logo>
              <ImageGallery banner={bannerList}></ImageGallery>
              <ActivityList></ActivityList>
              <DetailHead info={detailHeadSetting} sheet={imgStyle}></DetailHead>
              <div className="index-newsList"><NewsList items={newsList}></NewsList></div>
            </div>
            <Affix offsetBottom={0}>
              <Menu index="0"></Menu>
            </Affix>
          </div>
        </DocumentTitle>
      );
    } else {
      return (
        <DocumentTitle title="从化区妇女联合会">
          <Loading />
        </DocumentTitle>
      )
    }
  }
}

export default App;

