import React from 'react';
import { Layout, Menu, Icon } from 'antd';

const { Header, Sider, Content } = Layout;

import { MENU_DATA } from 'constants/menu_data';
import { createMenu } from './menu';

import { replace } from 'utils/historyUtil';

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    }
  }
  componentDidMount() {
    console.log(MENU_DATA, createMenu)
    replace('/')
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  onMenuItemClick = (route) => {
    replace(route)
  }
  render() {
    const menuCreatorProps = {
      onMenuItemClick: this.onMenuItemClick,
    };
    return (
      <Layout style={{height: '100%'}}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" style={{textAlign: 'center', lineHeight: '30px', color: '#ffffff'}}>demos</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['/']}>
          {
            createMenu(MENU_DATA, menuCreatorProps)
          }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
          >
            { this.props.children }
          </Content>
        </Layout>
      </Layout>
    );
  }
}
