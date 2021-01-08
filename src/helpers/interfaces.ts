export type TopStoryEntryId = number;
export interface StoriesIds extends Array<TopStoryEntryId> {}

export type SingleStoryByField = string;
export interface SingleStoryEntry {
  by: SingleStoryByField;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

type AuthorId = number;
export interface AuthorsIds extends Array<AuthorId> {}

export interface SingleAuthorEntry {
  about: string;
  created: number;
  id: string;
  karma: number;
  submitted: StoriesIds;
}

export type AuthorByKeyObj = {
  [key: string]: SingleAuthorEntry;
};

export interface AppContextInterface {
  isLoading: Boolean;
  tenStories: SingleStoryEntry[] | [];
  authors: AuthorByKeyObj;
  error: string | null;
}
