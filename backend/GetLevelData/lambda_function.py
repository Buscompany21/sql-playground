import json
import boto3
from boto3.dynamodb.conditions import Key

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('sql-playground-website-data')  # Replace with your DynamoDB table name

def lambda_handler(event, context):
    try:
        # Parse the moduleLevelID from the event body
        body = json.loads(event['body'])
        moduleLevelID = body.get('moduleLevelID')

        if not moduleLevelID:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'moduleLevelID is required.'})
            }

        # Query the DynamoDB table using moduleLevelID as the key
        response = table.get_item(
            Key={
                'moduleLevelID': moduleLevelID
            }
        )

        # Check if the item exists in the DynamoDB table
        if 'Item' not in response:
            return {
                'statusCode': 404,
                'body': json.dumps({'error': 'Level data not found.'})
            }

        # Return the retrieved item
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*'  # CORS support
            },
            'body': json.dumps(response['Item'])
        }

    except Exception as e:
        # Log the exception and return a 500 error response
        print(f"Error fetching data from DynamoDB: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Could not retrieve level data.'})
        }
