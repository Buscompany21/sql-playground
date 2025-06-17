import { useState, useCallback } from 'react';

export function useSqlExecution(sqlSpellApiUrl) {
  const [sqlCode, setSqlCode] = useState('');
  const [queryResults, setQueryResults] = useState([]);
  const [sqlError, setSqlError] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const executeQuery = useCallback(async (moduleId, levelId, onSuccess) => {
    setIsExecuting(true);
    setSqlError(null);
  
    try {
      const payload = {
        moduleId,
        levelId,
        sqlCode,
      };
  
      const response = await fetch(sqlSpellApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const responseData = await response.json();
      const result = responseData.body ? JSON.parse(responseData.body) : responseData;
  
      if (result.error) {
        setSqlError(result.error);
        setQueryResults([]);
      } else {
        const { output, passed, message } = result;
        setQueryResults(output);
        
        if (passed && onSuccess) {
          onSuccess(message);
        }
      }
    } catch (error) {
      console.error('Error executing query:', error);
      setSqlError(`Error executing query: ${error.message}`);
      setQueryResults([]);
    } finally {
      setIsExecuting(false);
    }
  }, [sqlCode, sqlSpellApiUrl]);

  return {
    sqlCode,
    setSqlCode,
    queryResults,
    sqlError,
    isExecuting,
    executeQuery
  };
} 