const BASE_URL = 'https://forum-api.dicoding.dev/v1';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function setAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

function getUsers() {
  return fetch(`${BASE_URL}/users`).then((res) => res.json());
}

function register({ name, email, password }) {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => res.json());
}

function login({ email, password }) {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
}

function getOwnProfile() {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }).then((res) => res.json());
}

function getAllThreads() {
  return fetch(`${BASE_URL}/threads`).then((res) => res.json());
}

function getThreadDetail(threadId) {
  return fetch(`${BASE_URL}/threads/${threadId}`).then((res) => res.json());
}

function createThread({ title, body, category }) {
  return fetch(`${BASE_URL}/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({ title, body, category }),
  }).then((res) => res.json());
}

function createComment({ threadId, content }) {
  return fetch(`${BASE_URL}/threads/${threadId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({ content }),
  }).then((res) => res.json());
}

function upVoteThread(threadId) {
  return fetch(`${BASE_URL}/threads/${threadId}/up-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }).then((res) => res.json());
}

function downVoteThread(threadId) {
  return fetch(`${BASE_URL}/threads/${threadId}/down-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }).then((res) => res.json());
}

function neutralizeVoteThread(threadId) {
  return fetch(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }).then((res) => res.json());
}

function upVoteComment({ threadId, commentId }) {
  return fetch(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }).then((res) => res.json());
}

function downVoteComment({ threadId, commentId }) {
  return fetch(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }).then((res) => res.json());
}

function neutralizeVoteComment({ threadId, commentId }) {
  return fetch(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }).then((res) => res.json());
}

function getLeaderboards() {
  return fetch(`${BASE_URL}/leaderboards`).then((res) => res.json());
}

const api = {
  getUsers,
  register,
  login,
  getOwnProfile,
  getAllThreads,
  getThreadDetail,
  createThread,
  createComment,
  upVoteThread,
  downVoteThread,
  neutralizeVoteThread,
  upVoteComment,
  downVoteComment,
  neutralizeVoteComment,
  getLeaderboards,
  setAccessToken,
  getAccessToken,
};

export default api;
