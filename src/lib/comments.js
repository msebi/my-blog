exports.handler = async (event, context) => {
  const issueNumber = event.queryStringParameters.id;

  return {
    statusCode: 200,
    body: JSON.stringify({ issueNumber }),
  };
};
