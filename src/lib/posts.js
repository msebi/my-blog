const load = async () => {
  const fetchedPosts = import.meta.glob("../pages/posts/*.md", { eager: true });

  const getPost = async (key) => {
    const url = key.replace("../pages/", "/").replace(".md", "/");
    const awaitedPost = await fetchedPosts[key].default();
    const item = { ...awaitedPost.props.frontmatter, url, key };
    return item;
  };

  const mappedPosts = Object.keys(fetchedPosts).map((key) => {
    const awaitedPost = getPost(key);
    return awaitedPost;
  });

  const results = await Promise.all(mappedPosts);
  return results;
};

let _posts;

export const getAllPosts = async () => {
  _posts = _posts || load();

  return await _posts;
};
