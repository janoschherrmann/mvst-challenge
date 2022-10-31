export type GithubAPIUserRepoProps = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
};

export type GithubUserProps = {
  login: string;
  id: number;
};
