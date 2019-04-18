import React from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

export const createMenu = (menuData, props) => {
  const { onMenuItemClick } = props;
  return menuData.reduce((pre, item) => {
    if (item.routes) {
      return [
        ...pre,
        <SubMenu key={item.key}
          className={item.depth == 1 ? "sub" : ""}
          title={
            item.icontype ?
            <div style={{display: 'flex'}}>
              <Icon type={item.icontype} />
              <span>
                {item.title}
              </span>
            </div>
            :
            item.title
          }>
          {this.createMenu(item.routes, props)}
        </SubMenu>
      ]
    } else {
      return [
        ...pre,
        <Menu.Item key={item.key} className={item.depth == 2 ? "subitem" : ""}>
          <div onClick={onMenuItemClick.bind(null, (item.route ? item.route : '/'))}>
            {
              item.icontype ?
              <div style={{display: 'flex'}}>
                <Icon type={item.icontype} />
                <span>
                  {item.title}
                </span>
              </div>
              :
              item.title
            }
          </div>
        </Menu.Item>
      ]
    }
  }, [])
}
