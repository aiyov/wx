import React, {Component} from 'react';

import Immutable from 'immutable';

import {Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap, Modifier} from 'draft-js';

import MediaComponent from '../../component/mediaComponent/mediaComponent';

import UploadFile from '../../component/fileUpload/fileUpload'

import {ColorControls,colorStyleMap, styles} from '../../component/colorControl/colorControl'

import './edit.css';

const blockRenderMap = Immutable.Map({
  'my-section': {
    element: 'section'
  },
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

export class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.focus = () => this.refs.editor.focus();
    this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _toggleBlockType(type) { /*标签 类型*/
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, type));
  }

  _onBoldClick() { /*font-weight*/
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onItalicClick() { /*font-weight*/
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'italic'));
  }

  _toggleColor(toggledColor) {
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(colorStyleMap)
      .reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color)
      }, editorState.getCurrentContent());
    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );
    const currentStyle = editorState.getCurrentInlineStyle();
    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }
    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }
    console.log(nextEditorState)
    this.onChange(nextEditorState);
  }

  myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    const obj = {
      "unstyled": "unstyled",
      "blockquote": "blockquote",
      "paragraph": "paragraph",
      "header-one": "header-one",
      "header-five": "header-five",
      "header-three": "header-three",
      "header-four": "header-four",
      "header-two": "header-two",
      "header-six": "header-six",
      "unordered-list-item": "unordered-list-item",
      "ordered-list-item": "ordered-list-item",
      "blockquote": "blockquote",
      "code-block": "code-block",
      "atomic": "atomic",
    }
    return obj[type]
  }

  myBlockRenderer(contentBlock) {
    const type = contentBlock.getType();
    if (type === 'atomic') {
      return {
        component: MediaComponent,
        editable: false,
        props: {
          foo: 'bar',
        },
      };
    }
  }

  _promptForMedia(type) {
    const {editorState} = this.state;
    this.setState({
      showURLInput: true,
      urlValue: '',
      urlType: type,
    }, () => {
      setTimeout(() => this.refs.url.focus(), 0);
    });
  }

  _addImage() {
    this._promptForMedia('image');
  }

  render() {
    return (
      <div>
        <UploadFile />
        <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <button onClick={this._toggleBlockType.bind(this, 'header-one')}>H1</button>
        <button onClick={this._toggleBlockType.bind(this, 'atomic')}>Section</button>
        <button onMouseDown={this._addImage}>Add Image</button>
        <ColorControls
          editorState={this.state.editorState}
          onToggle={this.toggleColor}
        />
        <div style={styles.editor} onClick={this.focus}>
          <Editor
            customStyleMap={colorStyleMap}
            blockRenderMap={extendedBlockRenderMap}
            blockRendererFn={this.myBlockRenderer}
            blockStyleFn={this.myBlockStyleFn}
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            ref="editor"
          />
        </div>
      </div>
    );
  }
}