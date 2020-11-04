import React, { useEffect, useState } from "react";
import { fetchTopStories, fetchStoriesInfo, fetchAuthorsInfo } from "../../api";
import { unique, randomInRange } from "../../helpers";

let AppContext;
const { Provider, Consumer } = (AppContext = React.createContext());

const AppProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [authors, setAuthors] = useState({});
  const [tenStories, setTenStories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const stories = await fetchTopStories();
        const storiesCount = stories.length;
        const storiesIndexesToFetch = new Set();

        do {
          storiesIndexesToFetch.add(randomInRange(0, storiesCount));
        } while (storiesIndexesToFetch.size < 10);

        const storiesIdsToFetch = [...storiesIndexesToFetch].map(
          (storyIndex) => stories[storyIndex]
        );

        const tenStories = await fetchStoriesInfo(storiesIdsToFetch);
        const authorIds = tenStories.map(({ by }) => by);

        const uniqueAuthorIds = unique(authorIds);

        const authors = await fetchAuthorsInfo(uniqueAuthorIds);

        setTenStories(
          tenStories.sort((storyA, stroyB) => storyA.score - stroyB.score)
        );
        setAuthors(authors);
        setLoading(false);
      } catch (err) {
        console.error(error);

        setError("Fatal error, dude");
      }
    };

    fetchData();
  }, []);

  return (
    <Provider value={{ isLoading, authors, tenStories, error }}>
      {children}
    </Provider>
  );
};

export { AppProvider, Consumer as AppConsumer, AppContext };
