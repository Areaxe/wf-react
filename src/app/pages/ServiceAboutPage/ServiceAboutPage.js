import React from 'react';
import ServiceHead from '../../components/ServerHead/ServerHead';
import { Tabs } from 'antd';
import DocumentTitle from 'react-document-title';
import style from './ServiceAboutPage.scss';

class ServiceAboutPage extends React.Component {
  render() {
    const TabPane = Tabs.TabPane;
    return (
      <DocumentTitle title='过去服务详情'>
            <div className="">
              <div className='service-tab'>
                  <Tabs>
                       <TabPane tab="新服务" key="1">
                          <ServiceHead></ServiceHead>
                       </TabPane>

                        <TabPane tab="历史服务" key="2">
                           <ServiceHead></ServiceHead>
                        </TabPane>
                  </Tabs>
              </div>
           </div>
      </DocumentTitle>
    );
  }
}

export default ServiceAboutPage;

