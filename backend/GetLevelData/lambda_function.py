import json
import boto3
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('sql-playground-website-data')

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        moduleLevelID = body.get('moduleLevelID')
        getSolution = body.get('getSolution', False)

        if not moduleLevelID:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'moduleLevelID is required.'})
            }

        response = table.get_item(
            Key={
                'moduleLevelID': moduleLevelID
            }
        )

        if 'Item' not in response:
            return {
                'statusCode': 404,
                'body': json.dumps({'error': 'Level data not found.'})
            }

        item = response['Item']
        
        # If requesting solution, only return that
        if getSolution:
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'solution': item.get('solution')
                })
            }

        # Remove solution from regular response
        if 'solution' in item:
            del item['solution']

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(item)
        }

    except Exception as e:
        print(f"Error fetching data from DynamoDB: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Could not retrieve level data.'})
        }
