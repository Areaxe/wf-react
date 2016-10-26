import React from 'react'
import NewsList from '../../components/NewsList/NewsList'
import DocumentTitle from 'react-document-title'
import TopMenu from '../../components/SelectCard/SelectCard'
import { Affix } from 'antd'
import style from './News.scss'
import exampleImage from '../../images/800-cat.jpg'
import Loading from '../../components/Shade/Loading'

class News extends React.Component {
  
  componentWillMount() {
    let states = this.props.states;
    if (!states.news.newsInfo && states.project.token) {
      this.props.actions.newsFetch(states.project.region._id, 'all', 'date')
    }
  }
  componentWillReceiveProps(nextProps) {
    let states = nextProps.states;
    if (!states.news.newsInfo) {
      this.props.actions.newsFetch(states.project.region._id, 'all', 'date')
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isFirst: true,
      sort: 'date',
      type: 'all',
    };
    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick(key) {
    this.setState({
      isFirst: false,
    })
    if (key === '-date' || key === 'visit_count') {
      this.setState({
        sort: key,
      })
      this.props.actions.newsFetch(this.props.states.project.region._id, this.state.type, key)
    } else {
      this.setState({
        type: key,
      })
      this.props.actions.newsFetch(this.props.states.project.region._id, key, this.state.sort)
    }
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  displayNews() {
  }

  render() {
    let leftItems =
      {
        title: '新闻列表',
        subs: [
          {
            title: '全部新闻',
            key: 'all',
          },
        ],
      }
    let rightItems = {
      title: '智能排序',
      subs: [
        {
          title: '最新发布',
          key: '-date',
        },
        {
          title: '人气最高',
          key: 'visit_count',
        },
      ],
    }
    let newsList = []
    if (this.props.states.project.newsTypes.length > 0) {
      for (let t of this.props.states.project.newsTypes) {
        leftItems.subs.push({
          title: t.name,
          key: t._id,
        })
      }
    }
    if (this.props.states.news.newsInfo) {
      let news = this.props.states.news.newsInfo
      newsList = news.map((val, i) => {
        return {
          title: val.title,
          imgUrl: i === 0 && val.cover.url ? `${val.cover.url}@186h_328w_1e_1c` : `${val.cover.url}@68h_100w_1e_1c`,
          owner: val.newsType.name,                      // val.author
          like: val.praise + '赞',
          time: val.date,
          newsType: i === 0 ? 'big' : 'small',
          newsId: val._id,
        }
      })
      return (
        <DocumentTitle title='新闻眼'>
          <div>
            <Affix>
              <div className='news-top-menu'>
                <TopMenu items={leftItems} callbackParent={this._handleClick}></TopMenu>
              </div>
              <div className='news-top-menu'>
                <TopMenu items={rightItems} callbackParent={this._handleClick}></TopMenu>
              </div>
            </Affix>
            <NewsList items={newsList}></NewsList>
          </div>
        </DocumentTitle>
      );
    } else {
      return <DocumentTitle title='新闻眼'>
        <div className="loadding-text-common">
          <Loading />
        </div>
      </DocumentTitle>
    }
  }
}

export default News;

