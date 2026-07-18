import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetLeaderboards } from '../states/leaderboardSlice';
import LoadingIndicator from '../components/LoadingIndicator';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const { leaderboards, loading, error } = useSelector(
    (state) => state.leaderboard,
  );

  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h2>Leaderboard</h2>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="card">
        {leaderboards.length === 0 ? (
          <div className="empty-state">
            <h3>No leaderboard data available</h3>
          </div>
        ) : (
          leaderboards.map((item, index) => (
            <div key={item.user.id} className="leaderboard-item">
              <div className={`leaderboard-rank ${index < 3 ? 'top-three' : ''}`}>
                {index + 1}
              </div>
              <img
                className="owner-avatar"
                src={item.user.avatar || `https://ui-avatars.com/api/?name=${item.user.name}&background=random`}
                alt={item.user.name}
              />
              <div>
                <div>{item.user.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#888' }}>
                  {item.user.email}
                </div>
              </div>
              <div className="leaderboard-score">{item.score} pts</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LeaderboardPage;
