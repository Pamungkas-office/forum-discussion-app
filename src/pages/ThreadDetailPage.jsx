import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  asyncGetThreadDetail,
  clearThreadDetail,
  setThreadVote,
  setCommentVote,
} from '../states/threadsSlice';
import { asyncCreateComment } from '../states/commentsSlice';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
} from '../states/votesSlice';
import CommentItem from '../components/CommentItem';
import VoteButton from '../components/VoteButton';
import LoadingIndicator from '../components/LoadingIndicator';

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

function ThreadDetailPage() {
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { threadDetail, loading, error } = useSelector((state) => state.threads);
  const { token, user } = useSelector((state) => state.auth);
  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    dispatch(asyncGetThreadDetail(threadId));

    return () => {
      dispatch(clearThreadDetail());
    };
  }, [dispatch, threadId]);

  const handleCreateComment = (e) => {
    e.preventDefault();
    if (!token) {
      navigate('/login');
      return;
    }
    dispatch(asyncCreateComment({ threadId, content: commentContent })).then(
      (result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          dispatch(asyncGetThreadDetail(threadId));
        }
      },
    );
    setCommentContent('');
  };

  const handleUpVoteThread = () => {
    if (!user) return;
    dispatch(setThreadVote({ userId: user.id, voteType: 1 }));
    dispatch(asyncUpVoteThread(threadId));
  };

  const handleDownVoteThread = () => {
    if (!user) return;
    dispatch(setThreadVote({ userId: user.id, voteType: -1 }));
    dispatch(asyncDownVoteThread(threadId));
  };

  const handleNeutralizeVoteThread = () => {
    if (!user) return;
    dispatch(setThreadVote({ userId: user.id, voteType: 0 }));
    dispatch(asyncNeutralizeVoteThread(threadId));
  };

  const handleUpVoteComment = (commentId) => {
    if (!user) return;
    dispatch(setCommentVote({ userId: user.id, commentId, voteType: 1 }));
    dispatch(asyncUpVoteComment({ threadId, commentId }));
  };

  const handleDownVoteComment = (commentId) => {
    if (!user) return;
    dispatch(setCommentVote({ userId: user.id, commentId, voteType: -1 }));
    dispatch(asyncDownVoteComment({ threadId, commentId }));
  };

  const handleNeutralizeVoteComment = (commentId) => {
    if (!user) return;
    dispatch(setCommentVote({ userId: user.id, commentId, voteType: 0 }));
    dispatch(asyncNeutralizeVoteComment({ threadId, commentId }));
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!threadDetail) {
    return null;
  }

  return (
    <div className="container">
      <div className="card">
        <h2>{threadDetail.title}</h2>
        {threadDetail.category && (
          <span className="category-badge">{threadDetail.category}</span>
        )}
        <div className="thread-meta">
          <span>{formatDate(threadDetail.createdAt)}</span>
        </div>
        <div className="owner-info" style={{ margin: '1rem 0' }}>
          <img
            className="owner-avatar-large"
            src={threadDetail.owner?.avatar || `https://ui-avatars.com/api/?name=${threadDetail.owner?.name || 'U'}&background=random`}
            alt={threadDetail.owner?.name || 'User'}
          />
          <div>
            <div>{threadDetail.owner?.name || 'Unknown'}</div>
          </div>
        </div>
        <div className="thread-body">{threadDetail.body}</div>
        <VoteButton
          upVotesBy={threadDetail.upVotesBy}
          downVotesBy={threadDetail.downVotesBy}
          onUpVote={handleUpVoteThread}
          onDownVote={handleDownVoteThread}
          onNeutralize={handleNeutralizeVoteThread}
        />
      </div>

      <div className="card comment-section">
        <h3>
          Comments ({threadDetail.comments ? threadDetail.comments.length : 0})
        </h3>

        {token && (
          <form className="comment-form" onSubmit={handleCreateComment}>
            <input
              type="text"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Write a comment..."
              required
            />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        )}

        {threadDetail.comments && threadDetail.comments.length > 0 ? (
          threadDetail.comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              threadId={threadId}
              onUpVote={handleUpVoteComment}
              onDownVote={handleDownVoteComment}
              onNeutralize={handleNeutralizeVoteComment}
            />
          ))
        ) : (
          <div className="empty-state" style={{ padding: '1rem' }}>
            <p>No comments yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ThreadDetailPage;
