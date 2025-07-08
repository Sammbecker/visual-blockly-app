import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import 'blockly/blocks';
import { javascriptGenerator } from 'blockly/javascript';
import { BlocklyWorkspace } from 'react-blockly';

const toolbox = {
  "kind": "flyoutToolbox",
  "contents": [
    {
      "kind": "block",
      "type": "custom_print"
    },
    {
      "kind": "block",
      "type": "text"
    }
  ]
};

// Register the custom print block ONCE at module scope
if (!Blockly.Blocks['custom_print']) {
  Blockly.Blocks['custom_print'] = {
    init: function() {
      this.appendValueInput('TEXT')
        .setCheck('String')
        .appendField('print');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip('Prints text to the output');
      this.setHelpUrl('');
    }
  };
  javascriptGenerator['custom_print'] = function(block) {
    var value_text = javascriptGenerator.valueToCode(block, 'TEXT', javascriptGenerator.ORDER_ATOMIC);
    return 'console.log(' + value_text + ');\n';
  };
}

javascriptGenerator['custom_print'] = function(block) {
  var value_text = javascriptGenerator.valueToCode(block, 'TEXT', javascriptGenerator.ORDER_ATOMIC);
  return 'console.log(' + value_text + ');\n';
};

Blockly.JavaScript = Blockly.JavaScript || {};
Blockly.JavaScript['custom_print'] = javascriptGenerator['custom_print'];

export default function BlocklyEditor({ workspaceXML, onWorkspaceChange }) {
  return (
    <BlocklyWorkspace
      toolboxConfiguration={toolbox}
      initialXml={workspaceXML}
      className="blockly-workspace"
      workspaceConfiguration={{
        grid: {
          spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: true
        },
        zoom: {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2
        },
        trashcan: true
      }}
      onXmlChange={onWorkspaceChange}
    />
  );
} 