import handler from '../util/handler';
import * as uuid from 'uuid';
import dynamoDb from '../util/dynamoDb';
// import AWS from 'aws-sdk';

// const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = handler(async evt => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(evt.body);

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      // The attributes of the item to be created
      userId: '123', // The id of the author
      noteId: uuid.v1(), // A unique uuid
      content: data.content, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
