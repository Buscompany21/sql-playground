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
                    'error': 'Level not found'  # Changed from message to error
                }

            schema = level_data.get('schema')
            solution_query = level_data.get('solution')
            
            if not schema or not solution_query:
                return {
                    'output': [],
                    'passed': False,
                    'error': 'Invalid level configuration'  # Changed from message to error
                }

            with self.create_temp_db(schema) as conn:
                cursor = conn.cursor()
                
                try:
                    # Execute user's query
                    user_results = cursor.execute(user_query).fetchall()
                    user_columns = [desc[0] for desc in cursor.description]
                    
                    # Execute solution query
                    solution_results = cursor.execute(solution_query).fetchall()
                    
                    # Compare results
                    passed = user_results == solution_results
                    
                    # Convert results to dictionary format
                    output = [
                        dict(zip(user_columns, row))
                        for row in user_results
                    ]
                    
                    return {
                        'output': output,
                        'passed': passed,
                        'message': level_data.get('successMessage', '🎉 Spell perfectly cast!') if passed 
                                else level_data.get('hintMessage', 'Not quite right. Try again!')
                    }
                except sqlite3.Error as sql_error:
                    return {
                        'output': [],
                        'passed': False,
                        'error': f'SQL Error: {str(sql_error)}'  # Changed from message to error
                    }
                
        except Exception as e:
            print(f"Unexpected error: {str(e)}")
            return {
                'output': [],
                'passed': False,
                'error': f'An unexpected error occurred: {str(e)}'  # Changed from message to error
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
                    'error': 'SQL query cannot be empty'  # Changed from message to error
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
                'error': f'Invalid input: {str(e)}'  # Changed from message to error
            })
        }