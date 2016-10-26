import React, {Component} from 'react';
import NewsItem from '../NewsItem/NewsItem';

class NewsList extends Component {
  render() {
    let items = this.props.items;
    
    return (
      <div>
        {
          items.map(function(item,index){
            if(item.type === 'big'){
              return <NewsItem key={index} item={item} newsType="big" />
            }else{
              return <NewsItem key={index} item={item} newsType="small" />
            }
          })
        }
      </div>
    );
  }
}

export default NewsList;


