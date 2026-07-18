import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncGetAllThreads } from '../states/threadsSlice';
import { asyncGetAllUsers } from '../states/usersSlice';
import ThreadItem from '../components/ThreadItem';
import CategoryFilter from '../components/CategoryFilter';
import LoadingIndicator from '../components/LoadingIndicator';

function ThreadListPage() {
  const dispatch = useDispatch();
  const { threads, loading, error } = useSelector((state) => state.threads);
  const { token } = useSelector((state) => state.auth);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    dispatch(asyncGetAllThreads());
    dispatch(asyncGetAllUsers());
  }, [dispatch]);

  const categories = [...new Set(threads.map((t) => t.category).filter(Boolean))];

  const filteredThreads = activeCategory
    ? threads.filter((t) => t.category === activeCategory)
    : threads;

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h2>Threads</h2>
        {token && (
          <Link to="/threads/new" className="btn btn-primary">
            + New Thread
          </Link>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      )}

      {filteredThreads.length === 0 ? (
        <div className="empty-state">
          <h3>No threads found</h3>
          <p>
            {token
              ? 'Be the first to create a thread!'
              : 'No threads available at the moment.'}
          </p>
        </div>
      ) : (
        filteredThreads.map((thread) => (
          <ThreadItem key={thread.id} thread={thread} />
        ))
      )}
    </div>
  );
}

export default ThreadListPage;
