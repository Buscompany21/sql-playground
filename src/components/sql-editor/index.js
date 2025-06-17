// This is a more reliable export method
import SQLEditorContainer from './SQLEditorContainer';
import SQLEditorPanel from './SQLEditorPanel';
import ResultsPanel from './ResultsPanel';
import InstructionsPanel from './InstructionsPanel';
import FooterNavigation from './FooterNavigation';

// Re-export with needed aliases
export { 
  SQLEditorContainer as SQLEditor,
  SQLEditorPanel,
  ResultsPanel, 
  InstructionsPanel,
  FooterNavigation
};

// Individual components
export { Sidebar } from './Sidebar';
export { EditorHeader } from './EditorHeader';
export { LevelProgressIndicator } from './LevelProgressIndicator';
export { SuccessNotification } from './SuccessNotification'; 