import {
  StoriesIds,
  SingleStoryEntry,
  AuthorByKeyObj,
  SingleStoryByField,
} from "../helpers/interfaces";

const OPTIONS: RequestInit = {
  method: "GET",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
  },
};

const fetchTopStories = async (): Promise<StoriesIds | []> => {
  try {
    const response = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json",
      OPTIONS
    );

    return response.json();
  } catch (error) {
    console.error("fetchTopStories: fatal error, dude!");

    return [];
  }
};

const fetchStoriesInfo = async (
  storiesIds: StoriesIds
): Promise<SingleStoryEntry[]> => {
  try {
    if (!Array.isArray(storiesIds) || !storiesIds.length) {
      throw Error;
    }

    const requests = storiesIds.map((articleId) =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${articleId}.json`)
    );

    return Promise.all(requests)
      .then((responses) => responses)
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      );
  } catch (error) {
    console.error("fetchStoriesInfo: fatal error, dude!");

    return [];
  }
};

const fetchAuthorsInfo = async (
  authorIds: SingleStoryByField[]
): Promise<AuthorByKeyObj | {}> => {
  try {
    if (!Array.isArray(authorIds) || !authorIds.length) {
      throw Error;
    }

    const requests = authorIds.map((authorId) =>
      fetch(`https://hacker-news.firebaseio.com/v0/user/${authorId}.json`)
    );

    return Promise.all(requests)
      .then((responses) => responses)
      .then((responses) => Promise.all(responses.map((r) => r.json())))
      .then((authors) =>
        authors.reduce((acc, author) => {
          const { created, id, karma, about } = author;

          return {
            ...acc,
            [id]: {
              created,
              karma,
              about,
            },
          };
        }, {})
      );
  } catch (error) {
    console.error("fetchAuthorsInfo: fatal error, dude!");

    return {};
  }
};

export { fetchTopStories, fetchStoriesInfo, fetchAuthorsInfo };
