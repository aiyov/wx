import React, {Component} from 'react';

import { Upload, Icon, message } from 'antd';

const Dragger = Upload.Dragger;

const props = {
  name: 'media',
  multiple: true,
  action: '/cgi-bin/media/uploadimg?access_token=14_I45y7DAhgMGHLwdVHL9AJt1XflM67VW_fiBrBX1haGuoxAfSPknP9WEiksi_1pw8Q3fqocoO0-VXRusoTcsOFgaAl4s6-uY4vB_SXGf2L5WzF7xkeO7YATu0f8YZKW3bMsQsJteNTmLmNa46PLGdABAXTO',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default class UploadFile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
      </Dragger>
    )
  }
}