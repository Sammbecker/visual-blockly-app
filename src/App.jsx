import React, { useState, useCallback } from 'react';
import BlocklyEditor from './BlocklyEditor.jsx';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import { textToDom, domToWorkspace } from './utils/blocklyXml.js';

const DEFAULT_XML = `<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="custom_print" x="20" y="20">
    <value name="TEXT">
      <block type="text">
        <field name="TEXT">Hello, Blockly!</field>
      </block>
    </value>
  </block>
</xml>`;

const App = () => {
  const [workspaceXML, setWorkspaceXML] = useState(DEFAULT_XML);
  const [generatedCode, setGeneratedCode] = useState('');

  // Generate code from XML
  const handleWorkspaceChange = useCallback((xml) => {
    setWorkspaceXML(xml);
    console.log('Blockly XML:', xml);
    if (!xml || !xml.trim().startsWith('<xml')) {
      setGeneratedCode('// No blocks in workspace');
      return;
    }
    try {
      const dom = textToDom(xml);
      const tempWorkspace = new Blockly.WorkspaceSvg();
      domToWorkspace(dom, tempWorkspace);
      const code = javascriptGenerator.workspaceToCode(tempWorkspace);
      setGeneratedCode(code);
      tempWorkspace.dispose();
    } catch (e) {
      console.error('Blockly code generation error:', e);
      setGeneratedCode('// Invalid blocks or XML');
    }
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Visual Blockly App</h1>
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 1, minWidth: 400 }}>
          <BlocklyEditor
            workspaceXML={workspaceXML}
            onWorkspaceChange={handleWorkspaceChange}
          />
        </div>
        <div style={{ flex: 1, minWidth: 300 }}>
          <h2>Code Preview</h2>
          <pre style={{ background: '#222', color: '#fff', padding: 16, borderRadius: 8, minHeight: 200 }}>
            {generatedCode}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default App; 