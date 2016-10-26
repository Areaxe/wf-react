import React from 'react'
import { Icon } from 'antd'
import { Link } from 'react-router'
import './Select.scss'
import ReactDOM, { findDOMNode } from 'react-dom';
import {ButtonGroup, Button, DropdownButton, MenuItem, mountNode } from 'react-bootstrap';

export default class Select extends React.Component {

    _handleClick(e) {
        console.log(e)
        this.props.callbackParent(e.key)
    }

    render() {
        let datas = this.props.items
        let MenuItems = []
        datas.subs.map((val, i) => {
            MenuItems.push(
                <MenuItem eventKey="1" key={'item-'+i}><div onClick={this._handleClick.bind(this,val)} >{val.title}</div></MenuItem>
            )
        })
        let buttonGroupInstance = (
            <ButtonGroup>
                <DropdownButton title={datas.title} id="bg-nested-dropdown">
                    {MenuItems}
                </DropdownButton>
            </ButtonGroup>
        );
        return (
            <div className="select-card">
                { buttonGroupInstance }
            </div>
        )

    }
}

