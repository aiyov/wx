import React from 'react';
import { List, Avatar, Icon } from 'antd';

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    time: '2018/05/06',
    coverImg: Math.random()>0.5?'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png':'',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

export default class ArticleList extends React.Component {
  constructor(props) {
    super()
  }
  render() {
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={listData}
        footer={<div><b>ant design</b> footer part</div>}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[<IconText type="like-o" text="156" />, <IconText type="message" text="2" />, <IconText type="date" text={item.time} />]}
            // extra={item.coverImg?(<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />):null}
          >
            <List.Item.Meta
              title={<a style={{fontSize: '18px'}} href={item.href}>{item.title}</a>}
            />
            <div style={{fontSize: '16px'}} dangerouslySetInnerHTML = {{ __html:item.content }}></div>
          </List.Item>
        )}
      />
    )
  }
}