import json
import boto3
import sqlite3
import tempfile
import os
from contextlib import contextmanager

class SQLExecutor:
    def __init__(self):
        self.dynamodb = boto3.resource('dynamodb')
        self.table = self.dynamodb.Table('sql-playground-website-data')

    def get_level_data(self, module_id, level_id):
        module_level_id = f"{module_id}{level_id}"
        try:
            response = self.table.get_item(
                Key={
                    'moduleLevelID': module_level_id
                }
            )
            return response.get('Item')
        except Exception as e:
            print(f"DynamoDB error: {str(e)}")
            raise

    @contextmanager
    def create_temp_db(self, schema):
        temp_dir = tempfile.gettempdir()
        db_path = os.path.join(temp_dir, f'sql_learning_{os.urandom(8).hex()}.db')
        
        conn = sqlite3.connect(db_path)
        try:
            conn.executescript(schema)
            yield conn
        finally:
            conn.close()
            if os.path.exists(db_path):
                os.remove(db_path)

    def execute_query(self, module_id, level_id, user_query):
        try:
            # Get level data from DynamoDB
            level_data = self.get_level_data(module_id, level_id)
            
            if not level_data:
                return {
                    'output': [],
                    'passed': False,
                    'error': 'Level not found'
                }

            schema = level_data.get('schema')
            solution_query = level_data.get('solution')
            
            if not schema or not solution_query:
                return {
                    'output': [],
                    'passed': False,
                    'error': 'Invalid level configuration'
                }

            with self.create_temp_db(schema) as conn:
                cursor = conn.cursor()
                
                try:
                    # Execute all user queries except the last one without fetching results
                    queries = [q.strip() for q in user_query.split(';') if q.strip()]
                    if not queries:
                        return {
                            'output': [],
                            'passed': False,
                            'error': 'No valid SQL statements found'
                        }
                    
                    # Execute all queries except the last one
                    for query in queries[:-1]:
                        cursor.execute(query)
                        conn.commit()  # Commit after each statement
                    
                    # Execute the final query and get its results
                    final_query = queries[-1]
                    user_results = cursor.execute(final_query).fetchall()
                    user_columns = [desc[0] for desc in cursor.description] if cursor.description else []
                    
                    # Execute solution query
                    solution_results = cursor.execute(solution_query).fetchall()
                    
                    # Compare results
                    passed = user_results == solution_results
                    
                    # Convert results to dictionary format
                    output = [
                        dict(zip(user_columns, row))
                        for row in user_results
                    ]
                    
                    response = {
                        'output': output,
                        'passed': passed,
                        'message': level_data.get('successMessage', '🎉 Spell perfectly cast!') if passed 
                                else level_data.get('hintMessage', 'Not quite right. Try again!')
                    }

                    # Only include hint if query failed but was valid SQL
                    if not passed:
                        response['hint'] = level_data.get('hintMessage')
                    
                    return response

                except sqlite3.Error as sql_error:
                    return {
                        'output': [],
                        'passed': False,
                        'error': f'SQL Error: {str(sql_error)}',
                        'hint': level_data.get('hintMessage'),
                        'showSolution': True  # Only show solution option on SQL errors
                    }
                
        except Exception as e:
            print(f"Unexpected error: {str(e)}")
            return {
                'output': [],
                'passed': False,
                'error': f'An unexpected error occurred: {str(e)}'
            }

def lambda_handler(event, context):
    try:
        body = json.loads(event.get('body', '{}'))
        module_id = int(body.get('moduleId'))
        level_id = int(body.get('levelId'))
        sql_code = body.get('sqlCode', '').strip()
        
        if not sql_code:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'output': [],
                    'passed': False,
                    'error': 'SQL query cannot be empty'
                })
            }
        
        executor = SQLExecutor()
        result = executor.execute_query(module_id, level_id, sql_code)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result)
        }
        
    except Exception as e:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'output': [],
                'passed': False,
                'error': f'Invalid input: {str(e)}'
            })
        }