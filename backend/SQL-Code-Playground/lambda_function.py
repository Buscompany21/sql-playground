import json

def lambda_handler(event, context):
    # Parse the incoming request body
    try:
        body = json.loads(event.get('body', '{}'))
        module_id = int(body.get('moduleId'))
        level_id = int(body.get('levelId'))
        sql_code = body.get('sqlCode')
    except Exception as e:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': f'Invalid input: {str(e)}'})
        }

    # Mock responses based on moduleId and levelId
    responses = {
        (1, 1): {
            'output': [
                { 'id': 1, 'name': 'Lumos', 'effect': 'Creates light' },
                { 'id': 2, 'name': 'Alohomora', 'effect': 'Unlocks doors' },
                { 'id': 3, 'name': 'Wingardium Leviosa', 'effect': 'Levitates objects' }
            ],
            'passed': True,
            'message': 'OMG, you did it! 🎉 Your SQL spell was totally perfect!'
        },
        (1, 2): {
            'output': [
                { 'id': 1, 'name': 'Dragon', 'type': 'Reptile', 'can_fly': True },
                { 'id': 3, 'name': 'Phoenix', 'type': 'Bird', 'can_fly': True }
            ],
            'passed': True,
            'message': 'Awesome! You found all the creatures that can fly! 🦋'
        },
        # Add more mock responses for other levels as needed
    }

    key = (module_id, level_id)
    response_data = responses.get(key, {
        'output': [],
        'passed': False,
        'message': 'Level not found or incomplete data.'
    })

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': json.dumps(response_data)  # Convert to a JSON string as required
    }
