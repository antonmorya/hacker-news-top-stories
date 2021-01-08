import React, { useEffect, useState } from "react";
import { fetchTopStories, fetchStoriesInfo, fetchAuthorsInfo } from "../../api";
import { unique, randomInRange } from "../../helpers";
import {
  StoriesIds,
  SingleStoryEntry,
  AuthorByKeyObj,
  AppContextInterface,
} from "../../helpers/interfaces";

let AppContext = React.createContext<AppContextInterface>({});
const { Provider, Consumer } = AppContext;

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const [isLoading, setLoading] = useState<Boolean>(false);
  const [authors, setAuthors] = useState<AuthorByKeyObj | {}>({});
  const [tenStories, setTenStories] = useState<SingleStoryEntry[] | []>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const stories = await fetchTopStories();
        const storiesCount = stories.length;
        const storiesIndexesToFetch: Set<number> = new Set();

        do {
          storiesIndexesToFetch.add(randomInRange(0, storiesCount));
        } while (storiesIndexesToFetch.size < 10);

        const storiesIdsToFetch: StoriesIds = [...storiesIndexesToFetch].map(
          (storyIndex) => stories[storyIndex]
        );

        const tenStories = await fetchStoriesInfo(storiesIdsToFetch);
        const authorIds = tenStories.map(({ by }) => by);

        const uniqueAuthorIds = unique(authorIds);

        const authors = await fetchAuthorsInfo(uniqueAuthorIds);

        const sortedStories = tenStories.sort(
          (storyA, stroyB) => storyA.score - stroyB.score
        );

        setTenStories(sortedStories);

        setAuthors(authors);
        setLoading(false);
      } catch (err) {
        console.error(error);

        setError("Fatal error, dude");
      }
    };

    fetchData();
  }, []);

  const providedContext: AppContextInterface = {
    isLoading,
    authors,
    tenStories,
    error,
  };

  return <Provider value={providedContext}>{children}</Provider>;
};

export { AppProvider, Consumer as AppConsumer, AppContext };
