import React, {Component} from 'react';
import './App.css';

import {Layout, Menu, Icon, Row, Col} from 'antd';

import {User} from './views/user/user'
import {MyEditor} from './views/edit/edit'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const {Header, Sider, Content} = Layout;

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
      <Layout style={{background: '#fff'}}>
        <Header style={{background: 'rgb(245, 247,249)', padding: 0}}>
          <Row justify={'center'} type={"flex"}>
            <Col span={18} style={{display: 'flex'}}>
              <Icon
                type="ie"
                style={{display: 'flex', fontSize: '40px', alignItems: 'center',}}
              />
              <Menu
                style={{display: 'flex', flex: 1, borderBottom: 'none', justifyContent: 'flex-end',lineHeight: '64px', background: 'rgb(245, 247,249)'}}
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
              >
                <Menu.Item key="main" style={{borderBottom: 'none'}}>
                  <Icon type="home"/>首页
                </Menu.Item>
                <Menu.Item key="app" style={{borderBottom: 'none'}}>
                  <Icon type="folder"/>归档
                </Menu.Item>
                <Menu.Item key="type" style={{borderBottom: 'none'}}>
                  <Icon type="appstore"/>分类
                </Menu.Item>
                <Menu.Item key="about" style={{borderBottom: 'none'}}>
                  <Icon type="appstore"/>关于
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Row justify={'center'} type={"flex"}>
          <Col span={18} style={{display: 'flex'}}>
            <Content style={{padding: 24, background: '#fff', minHeight: 280}}>
              {/*<User />*/}
              <MyEditor/>
            </Content>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default App;
