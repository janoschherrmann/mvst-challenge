import { useEffect, useState } from 'react';
import UserSelector from '../components/UserSelector';
import SingleRepository from '../components/SingleRepository';

import { GithubAPIUserRepoProps } from '../types';

const INITIAL_GITHUB_USER = 'janoschsworkspace';

export default function Home() {
  const [currentUser, setCurrentUser] = useState(INITIAL_GITHUB_USER);
  const [repos, setRepos] = useState<GithubAPIUserRepoProps[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch(`https://api.github.com/users/${currentUser}/repos`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    })
      .then((res) => res.json())
      .then((data) => setRepos(data))
      .catch((err) => console.error(err));
  }, [currentUser]);

  const filteredRepos = repos.filter((repo) => {
    return repo.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className='max-w-4xl mx-auto py-8 px-2'>
      <UserSelector onSelectUser={setCurrentUser} />
      <input
        placeholder={`Search through ${currentUser}'s repos`}
        className='mb-2 w-full bg-zinc-50 border border-zinc-200 rounded-md py-2 px-4 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent'
        onChange={(e) => setQuery(e.target.value)}
      />
      {filteredRepos?.length > 0 && (
        <div className='gap-y-1.5 flex flex-col'>
          {filteredRepos.map((repo) => (
            <SingleRepository {...repo} key={repo.id} />
          ))}
        </div>
      )}
      {filteredRepos?.length === 0 && (
        <div>
          <h3 className='font-semibold text-lg'>No repos found!</h3>
        </div>
      )}
    </div>
  );
}
