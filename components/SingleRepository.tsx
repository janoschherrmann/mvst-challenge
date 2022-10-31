import Link from 'next/link';
import { GithubAPIUserRepoProps } from '../types';

import { StarIcon, ClockIcon } from '@heroicons/react/24/solid';

const SingleRepository = ({
  id,
  name,
  html_url,
  description,
  stargazers_count,
  updated_at,
}: GithubAPIUserRepoProps) => {
  return (
    <div
      className='px-4 py-2 border border-gray-200 rounded-md hover:border-gray-400 '
      key={id}
    >
      <Link href={html_url}>
        <h3 className='font-semibold text-lg'>{name}</h3>
        <p className='text-base text-gray-400'>{description}</p>
        <div className='flex gap-x-1 pt-1'>
          <span className='rounded-lg px-2 bg-yellow-50 text-yellow-500 py-0.5 really-small-text sm:small-text mr-1 flex flex-row place-items-center font-medium'>
            <StarIcon className='mr-1 h-4 w-4' />
            {stargazers_count}
          </span>
          <span className='really-small-text bg-gray-50 text-gray-700 sm:small-text mr-1 flex flex-row place-items-center px-1 font-medium rounded-lg'>
            <ClockIcon className='mr-1 h-4 w-4' />
            {new Date(updated_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default SingleRepository;
