import React, {Component} from 'react';

export default class MediaComponent extends React.Component {
    render() {
        const {block, contentState} = this.props;
        const {foo} = this.props.blockProps;
        // const data = contentState.getEntity(block.getEntityAt(0)).getData();
        // Return a <figure> or some other content using this data.
        return (
          <div>
              <div>123456</div>
              {/*<img src="http://mmbiz.qpic.cn/mmbiz_png/7RiaH0xP4WYODukqwdsk9XnuiaagWUIGtMToNINy64ZMxtq5ETEHMnPqznlWH9uc7WbXQ5AiaQw59F6Ov9aFlu8sQ/0" />*/}
          </div>
        )
    }
}