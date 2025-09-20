/**
 * Simple in-memory data store.
 * Exports methods to manipulate users and posts.
 */
let users = [];
let posts = [];
let userId = 1;
let postId = 1;

function reset() {
  users = [];
  posts = [];
  userId = 1;
  postId = 1;
}

function createUser({ name, email }) {
  const u = { id: String(userId++), name, email };
  users.push(u);
  return u;
}

function getUsers() { return users.slice(); }
function getUser(id) { return users.find(u => u.id === String(id)); }
function updateUser(id, data) {
  const u = getUser(id);
  if (!u) return null;
  Object.assign(u, data);
  return u;
}
function deleteUser(id) {
  const idx = users.findIndex(u => u.id === String(id));
  if (idx === -1) return false;
  users.splice(idx,1);
  return true;
}

function createPost({ title, body, authorId }) {
  const p = { id: String(postId++), title, body, authorId: String(authorId) };
  posts.push(p);
  return p;
}
function getPosts() { return posts.slice(); }
function getPost(id) { return posts.find(p => p.id === String(id)); }
function updatePost(id, data) {
  const p = getPost(id);
  if (!p) return null;
  Object.assign(p, data);
  return p;
}
function deletePost(id) {
  const idx = posts.findIndex(p => p.id === String(id));
  if (idx === -1) return false;
  posts.splice(idx,1);
  return true;
}

function search(q) {
  if (!q) return [];
  const term = q.toLowerCase();
  const userMatches = users.filter(u => (u.name||'').toLowerCase().includes(term) || (u.email||'').toLowerCase().includes(term));
  const postMatches = posts.filter(p => (p.title||'').toLowerCase().includes(term) || (p.body||'').toLowerCase().includes(term));
  return { users: userMatches, posts: postMatches };
}

module.exports = {
  reset,
  createUser, getUsers, getUser, updateUser, deleteUser,
  createPost, getPosts, getPost, updatePost, deletePost,
  search
};
