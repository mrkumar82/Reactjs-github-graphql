import React from 'react';

const Repo = ({ repos }) => {
  return (
    <div>
      {repos && (
        <ul className='list-group list-group-flush'>
          {repos.map((repo) => (
            <li className='list-group-item' key={repo.id}>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex flex-column px-5 ps-0'>
                  <a className='h5 mb-0 text-decoration-none' href={repo.url}>
                    {repo.name}
                  </a>
                  <p>{repo.description}</p>
                </div>
                <span
                  className={
                    'px-1 py-1 ms-1 d-inline-block btn btn-sm ' +
                    (repo.viewerSubscription === 'SUBSCRIBED'
                      ? 'btn-success '
                      : 'btn-outline-secondary')
                  }
                >
                  {repo.viewerSubscription}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Repo;
