export interface GitHubUser {
  login: string;
  avatar_url: string;
  public_repos: number;
  name: string;
  bio: string;
}

export interface GitHubRepo {
  id: string;
  name: string;
  description: string;
  language: string;
  //  El dueño del repo
  owner: {
    login: string;
  };
}