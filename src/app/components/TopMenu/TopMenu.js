import React from 'react'
import { Icon, Menu, Select } from 'antd'
import './TopMenu.scss';
const Option = Select.Option;

const SubMenu = Menu.SubMenu;

const MenuItemGroup = Menu.ItemGroup;
function handleChange(value) {
  console.log(`selected ${value}`);
}
export default class TopMenu extends React.Component {
    _handleClick(e) {
        console.log(e)
        this.props.callbackParent(e.key)
    }
  render() {
    let datas = this.props.items
    console.log(datas)
        let MenuItems = []
        datas.subs.map((val, i) => {
            MenuItems.push(
              <Option key={'item-'+i} onClick={this._handleClick.bind(val)} value={val.title}>{val.title}</Option>
            )
        })
    return (<div className="menu-select" >
      <Select showSearch
        placeholder={datas.title}
        optionFilterProp="children"
        notFoundContent="Nothing found"
        >
        {MenuItems}
      </Select>

    </div>)
  }

}






