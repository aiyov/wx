import React, {Component} from 'react';

import Immutable from 'immutable';

import {Editor, EditorState, RichUtils} from 'draft-js';

import MediaComponent from '../../component/mediaComponent/mediaComponent';

import './edit.css';

const blockRenderMap = Immutable.Map({
    'my-section': {
        element: 'section'
    },
});

const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);

export class MyEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
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

    _toggleBlockType() {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'header-one'));
    }

    _onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }

    myBlockStyleFn(contentBlock) {
        const type = contentBlock.getType();
        console.log(type)
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

    render() {
        return (
            <div>
                <button onClick={this._onBoldClick.bind(this)}>Bold</button>
                <button onClick={this._toggleBlockType.bind(this)}>H1</button>
                <Editor
                    blockRenderMap={extendedBlockRenderMap}
                    blockRendererFn={this.myBlockRenderer}
                    blockStyleFn={this.myBlockStyleFn}
                    editorState={this.state.editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}