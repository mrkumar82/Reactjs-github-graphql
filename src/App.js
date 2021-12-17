import './App.css';
import github from './db';
import { useEffect, useState, useCallback, useRef } from 'react';
import { gitQuerySearch } from './Query';
import Repo from './components/Repo';

function App() {
  const [user, setUser] = useState('');
  const [repos, setRepo] = useState([]);
  const [search, setSearch] = useState('React');
  const [count, setCount] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const searchvalue = useRef(null);

  const fetchData = useCallback(() => {
    fetch(github.baseURL, {
      method: 'POST',
      headers: github.headers,
      body: JSON.stringify(gitQuerySearch(search, count)),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.data);
        const viewer = data.data.viewer;
        const repo = data.data.search.nodes;
        const totalCount = data.data.search.repositoryCount;
        setTotalCount(totalCount);
        setUser(viewer);
        setRepo(repo);
      })
      .catch((error) => console.log(error));
  }, [search, count]);

  const searchHandler = () => {
    setSearch(searchvalue.current.value);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className='container mt-5'>
      <h1>Github Graphql </h1>
      <div className='d-flex mb-5'>
        <img className='px-md-2' src={user.avatarUrl} alt={user.name} />

        <div>
          <p>{user.name}</p>
          <p>{user.bio}</p>
          <p>{user.url}</p>
        </div>
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex flex-column'>
          <div className='d-flex'>
            <input type='text' className='form-control' ref={searchvalue} />
            <button className='btn btn-primary' onClick={searchHandler}>
              Search
            </button>
          </div>
          <div>
            <p>
              <strong>Search for</strong> : {search} ||{' '}
              <strong>Total count : </strong>
              {totalCount}
            </p>
          </div>
        </div>
        <Repo repos={repos} />
      </div>
    </div>
  );
}

export default App;
