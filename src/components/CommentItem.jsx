import React from 'react';
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

function CommentItem({ comment, threadId, onUpVote, onDownVote, onNeutralize }) {
  return (
    <div className="comment-item">
      <div className="owner-info">
        <img
          className="owner-avatar"
          src={comment.owner?.avatar || `https://ui-avatars.com/api/?name=${comment.owner?.name || 'U'}&background=random`}
          alt={comment.owner?.name || 'User'}
        />
        <span>{comment.owner?.name || 'Unknown'}</span>
      </div>
      <div className="comment-content">{comment.content}</div>
      <div className="comment-meta">
        <span>{formatDate(comment.createdAt)}</span>
      </div>
      <VoteButton
        upVotesBy={comment.upVotesBy}
        downVotesBy={comment.downVotesBy}
        onUpVote={() => onUpVote(comment.id)}
        onDownVote={() => onDownVote(comment.id)}
        onNeutralize={() => onNeutralize(comment.id)}
      />
    </div>
  );
}

export default CommentItem;
