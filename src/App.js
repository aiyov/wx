import React, {Component} from 'react';
import './App.css';

import {Layout, Menu, Icon, Row, Col, Input } from 'antd';

import {User} from './views/user/user';
import {MyEditor} from './views/edit/edit';
import MyTag from './component/tag/tag';
import ArticleList from './component/list/list';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const {Header, Sider, Content} = Layout;

const Search = Input.Search;

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
            <Col span={16} style={{display: 'flex'}}>
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
          <Col span={12} style={{display: 'flex'}}>
            <Content style={{padding: '40px 10px', background: '#fff', minHeight: 280}}>
              <ArticleList />
            </Content>
          </Col>
          <Col span={4} style={{display: 'flex'}}>
            <Content style={{padding: '55px 0 40px 40px', background: '#fff', minHeight: 280}}>
              <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
              />

              <div style={{display: 'flex',margin:'30px 0 15px',padding:'10px 0',borderBottom: '1px solid #ccc',alignItems:'center'}}>
                <Icon style={{marginRight:'5px',fontSize: '24px'}} type="folder"/>分类
              </div>
              <div>
                <MyTag> All </MyTag>
                <MyTag> HTML </MyTag>
                <MyTag> CSS </MyTag>
                <MyTag> Javascript </MyTag>
                <MyTag> 前端 </MyTag>
                <MyTag> 后端 </MyTag>
              </div>
            </Content>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default App;
