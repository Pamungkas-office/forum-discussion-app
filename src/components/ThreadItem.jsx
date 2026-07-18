import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setThreadListVote } from '../states/threadsSlice';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
} from '../states/votesSlice';
import VoteButton from './VoteButton';

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function ThreadItem({ thread }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const { user, token } = useSelector((state) => state.auth);
  const owner = users.find((u) => u.id === thread.ownerId);

  const handleUpVote = () => {
    if (!token) {
      navigate('/login');
      return;
    }
    dispatch(setThreadListVote({ threadId: thread.id, userId: user.id, voteType: 1 }));
    dispatch(asyncUpVoteThread(thread.id));
  };

  const handleDownVote = () => {
    if (!token) {
      navigate('/login');
      return;
    }
    dispatch(setThreadListVote({ threadId: thread.id, userId: user.id, voteType: -1 }));
    dispatch(asyncDownVoteThread(thread.id));
  };

  const handleNeutralize = () => {
    if (!token) {
      navigate('/login');
      return;
    }
    dispatch(setThreadListVote({ threadId: thread.id, userId: user.id, voteType: 0 }));
    dispatch(asyncNeutralizeVoteThread(thread.id));
  };

  const handleNavigate = () => {
    navigate(`/threads/${thread.id}`);
  };

  return (
    <div className="card thread-item">
      <div
        role="button"
        tabIndex={0}
        onClick={handleNavigate}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleNavigate();
        }}
      >
        <h3>{thread.title}</h3>
        {thread.body && (
          <p>
            {thread.body.length > 150
              ? `${thread.body.substring(0, 150)}...`
              : thread.body}
          </p>
        )}
        <div className="thread-meta">
          <span>{formatDate(thread.createdAt)}</span>
          {thread.category && (
            <span className="category-badge">{thread.category}</span>
          )}
          <span>
            {thread.totalComments || 0} comment
            {(thread.totalComments || 0) !== 1 ? 's' : ''}
          </span>
          <span>
            {thread.upVotesBy ? thread.upVotesBy.length : 0} upvotes
          </span>
        </div>
        <div className="owner-info" style={{ marginTop: '0.5rem' }}>
          <img
            className="owner-avatar"
            src={owner?.avatar || `https://ui-avatars.com/api/?name=${owner?.name || 'U'}&background=random`}
            alt={owner?.name || 'User'}
          />
          <span>{owner?.name || 'Unknown'}</span>
        </div>
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        <VoteButton
          upVotesBy={thread.upVotesBy}
          downVotesBy={thread.downVotesBy}
          onUpVote={handleUpVote}
          onDownVote={handleDownVote}
          onNeutralize={handleNeutralize}
        />
      </div>
    </div>
  );
}

export default ThreadItem;
