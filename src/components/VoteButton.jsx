import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function VoteButton({
  upVotesBy,
  downVotesBy,
  onUpVote,
  onDownVote,
  onNeutralize,
}) {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth.user?.id);
  const isUpVoted = upVotesBy?.includes(userId);
  const isDownVoted = downVotesBy?.includes(userId);
  const voteCount = (upVotesBy?.length || 0) - (downVotesBy?.length || 0);

  const handleVote = (voteType) => {
    if (!token) {
      navigate('/login');
      return;
    }

    if (voteType === 'up') {
      if (isUpVoted) {
        onNeutralize();
      } else {
        onUpVote();
      }
    } else if (voteType === 'down') {
      if (isDownVoted) {
        onNeutralize();
      } else {
        onDownVote();
      }
    }
  };

  return (
    <div className="vote-section">
      <button
        type="button"
        className={`vote-btn ${isUpVoted ? 'upvoted' : ''}`}
        onClick={() => handleVote('up')}
      >
        &#9650;
      </button>
      <span className="vote-count">{voteCount}</span>
      <button
        type="button"
        className={`vote-btn ${isDownVoted ? 'downvoted' : ''}`}
        onClick={() => handleVote('down')}
      >
        &#9660;
      </button>
    </div>
  );
}

export default VoteButton;
