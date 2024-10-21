"use client";

import { SqlEditor } from '../../../../components/sql-editor';

export default function LevelPage({ params }) {
    console.log('Rendering LevelPage component');
    console.log('Params:', params);
    console.log('SqlEditor:', SqlEditor);
    console.log('SqlEditor type:', typeof SqlEditor);
  
    const { moduleId, levelId } = params;
  
    console.log('moduleId:', moduleId);
    console.log('levelId:', levelId);
  
    if (typeof SqlEditor !== 'function') {
      console.error('SqlEditor is not a valid component:', SqlEditor);
      return <div>Error: SqlEditor component is not valid</div>;
    }
  
    return <SqlEditor moduleId={moduleId} levelId={levelId} />;
  }
