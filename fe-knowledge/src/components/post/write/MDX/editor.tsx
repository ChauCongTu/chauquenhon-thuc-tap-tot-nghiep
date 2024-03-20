import MarkdownIt from 'markdown-it';
import React from 'react';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

interface Props {
    content: string,
    setContent: Function,
    mdContent: string,
    setMdContent: Function
}

const mdParser = new MarkdownIt();

const MDXEditor: React.FC<Props> = ({ setContent, mdContent, setMdContent }) => {
    console.log(mdContent);
    function handleEditorChange({ html, text }: { html: string, text: string }) {
        setContent(html);
        setMdContent(text);
    }

    return (
        <div>
            <MdEditor value={mdContent} style={{ height: '100vh' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
        </div>
    );
}

export default MDXEditor;
