const OPTIONS = {
  method: "GET",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
  },
};

const fetchTopStories = async () => {
  try {
    const response = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json",
      OPTIONS
    );

    return response.json();
  } catch (error) {
    alert("fatal error, dude!");
  }
};

const fetchStoriesInfo = async (storiesIds) => {
  try {
    if (!Array.isArray(storiesIds) || !storiesIds.length) {
      throw Error;
    }

    const requests = storiesIds.map((articleId) =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${articleId}.json`)
    );

    return Promise.all(requests)
      .then((responses) => responses)
      .then((responses) => Promise.all(responses.map((r) => r.json())));
  } catch (error) {
    alert("fetchStoriesInfo: fatal error, dude!");
  }
};

const fetchAuthorsInfo = async (authorIds) => {
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
    alert("fetchStoriesInfo: fatal error, dude!");
  }
};

export { fetchTopStories, fetchStoriesInfo, fetchAuthorsInfo };
