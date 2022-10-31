import { ChangeEvent, useEffect, useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';
import clsx from 'clsx';
import { GithubUserProps } from '../types';

const UserSelector = ({ onSelectUser }: { onSelectUser: (e: any) => void }) => {
  const GITHUB_USER_SEARCH_ENDPOINT = 'https://api.github.com/search/users';

  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<GithubUserProps[]>([]);
  const [selectedUser, setSelectedUser] =
    useState<GithubUserProps | null>(null);

  useEffect(() => {
    // This query should be checked for
    const normalizedQuery = query.trim().toLowerCase();

    const fetchUsers = async () => {
      fetch(`${GITHUB_USER_SEARCH_ENDPOINT}?q=${normalizedQuery}`)
        .then((res) => res.json())
        .then((data) => setUsers(data.items))
        .catch((err) => console.error(err));
    };
    fetchUsers();
  }, [query]);

  const filteredUsers =
    query === ''
      ? users
      : users?.filter((user) => {
          return user.login.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as='div'
      value={selectedUser || ''}
      onChange={(e: GithubUserProps) => {
        setSelectedUser(e);
        onSelectUser(e.login);
      }}
      className='py-2'
    >
      <Combobox.Label className='block text-md font-semibold text-zinc-900'>
        Select a user
      </Combobox.Label>
      <div className='relative mt-1'>
        <Combobox.Input
          className='mb-1 w-full bg-zinc-50 border border-zinc-200 rounded-md py-2 px-4 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent'
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(user: GithubUserProps) => user?.login}
          placeholder='Search for a user'
        />
        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none'>
          <ChevronUpDownIcon
            className='h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
        </Combobox.Button>

        {filteredUsers?.length > 0 && (
          <Combobox.Options className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {filteredUsers.map((user) => (
              <Combobox.Option
                key={user.id}
                value={user}
                className={({ active }) =>
                  clsx(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-gray-50 text-gray-700' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className='flex items-center'>
                      <span
                        className={clsx(
                          'ml-3 truncate',
                          selected && 'font-semibold'
                        )}
                      >
                        {user.login}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={clsx(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-gray-700'
                        )}
                      >
                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};

export default UserSelector;
