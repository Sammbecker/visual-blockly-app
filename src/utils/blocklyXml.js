// Minimal Blockly XML utilities for ESM/npm setups
// Adapted from Blockly's source (Apache 2.0)

import * as Blockly from 'blockly';

export function textToDom(text) {
  const parser = new DOMParser();
  const dom = parser.parseFromString(text, 'text/xml');
  // Check for parsing errors
  if (dom.getElementsByTagName('parsererror').length) {
    throw new Error('Error parsing XML: ' + text);
  }
  return dom.documentElement;
}

export function domToWorkspace(dom, workspace) {
  if (!workspace) throw new Error('No workspace provided');
  if (Blockly.Xml && typeof Blockly.Xml.domToWorkspace === 'function') {
    Blockly.Xml.domToWorkspace(dom, workspace);
    return;
  }
  // Try the import method (for ESM workspaces)
  if (typeof workspace['import'] === 'function') {
    workspace['import'](dom);
    return;
  }
  // As a last resort, try domToWorkspace on the workspace itself
  if (typeof workspace.domToWorkspace === 'function') {
    workspace.domToWorkspace(dom);
    return;
  }
  throw new Error('No compatible domToWorkspace found.');
} 