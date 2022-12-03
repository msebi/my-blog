const { Octokit } = require("@octokit/rest");
const { createTokenAuth } = require("@octokit/auth-token");
const md = require("markdown-it")();
const sanitizeHtml = require("sanitize-html");
const dayjs = require("dayjs");
const dayjsRelativeTimePlugin = require("dayjs/plugin/relativeTime");

dayjs.extend(dayjsRelativeTimePlugin);

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

    const response = await octokitClient.issues.listComments({
      owner: process.env.GITHUB_USER_NAME,
      repo: process.env.GITHUB_REPO,
      issue_number: issueNumber,
    });

    const comments = response.data
      // Show comments in chronological order (oldest comments first)
      .sort((comment1, comment2) =>
        comment1.created_at.localeCompare(comment2.created_at)
      )
      // Restructure the data so the client-side JS doesn't have to do this
      .map((comment) => {
        return {
          user: {
            avatarUrl: comment.user.avatar_url,
            name: sanitizeHtml(comment.user.login),
          },
          datePosted: dayjs(comment.created_at).fromNow(),
          isEdited: comment.created_at !== comment.updated_at,
          isAuthor: comment.author_association === "OWNER",
          body: sanitizeHtml(md.render(comment.body)),
        };
      });

    return {
      statusCode: response.status,
      body: JSON.stringify({ data: comments }),
    };
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
