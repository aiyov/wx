import React, {Component} from 'react';
import './App.css';

import { Layout, Menu, Icon } from 'antd';

import { User } from './views/user/user'
import { MyEditor } from './views/edit/edit'

const SubMenu = Menu.SubMenu;

const { Header, Sider, Content } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout>
        <Sider
          theme="light"
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{ overflow: 'auto', height: '100vh'}}
        >
          <div className="logo" />
          <Menu mode="inline" defaultSelectedKeys={['1']}>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>用户管理</span></span>}
            >
              <Menu.Item key="3">用户编辑</Menu.Item>
              <Menu.Item key="4">黑名单</Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>素材管理</span></span>}
            >
              <Menu.Item key="3">新增素材</Menu.Item>
              <Menu.Item key="4">素材编辑</Menu.Item>
            </SubMenu>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
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
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {/*<User />*/}
            <MyEditor />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
