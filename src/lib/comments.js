const { Octokit } = require("@octokit/rest");
const { createTokenAuth } = require("@octokit/auth-token");

exports.handler = async (event) => {
  const issueNumber = event.queryStringParameters.id;

  try {
    const auth = createTokenAuth(process.env.GITHUB_COMMENTS_TOKEN);
    const { token } = await auth();
    const octokitClient = new Octokit({ auth: token });

    const { data: rateLimitInfo } = await octokitClient.rateLimit.get();
    const remainingCalls = rateLimitInfo.resources.core.remaining;

    console.log(`GitHub API requests remaining: ${remainingCalls}`);

    if (remainingCalls === 0) {
      return {
        statusCode: 429,
        body: JSON.stringify({
          error: "Unable to fetch comments at this time. Check back later.",
        }),
      };
    }
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Unable to fetch comments for this post.",
      }),
    };
  }
};
