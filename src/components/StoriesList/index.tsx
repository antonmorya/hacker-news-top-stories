import * as React from "react";
import { AppContext } from "../../context/AppContext";
import { Container, Grid, Loader, Dimmer, Message } from "semantic-ui-react";
import storyCard from "../StoryCard";

import {
  AppContextInterface,
  SingleStoryByField,
  SingleStoryEntry,
} from "../../helpers/interfaces";

const StoriesList = () => {
  const {
    isLoading,
    authors,
    tenStories,
    error,
  } = React.useContext<AppContextInterface>(AppContext);

  if (error) {
    return (
      <Container fluid>
        <Grid centered padded>
          <Message color="red">{error}</Message>
        </Grid>
      </Container>
    );
  }

  const renderCards = () =>
    tenStories.map(
      ({ by, ...story }: { by: SingleStoryByField; story: SingleStoryEntry }) =>
        storyCard({ story: { ...story, by }, author: authors[by] })
    );

  const renderLoader = () => (
    <Dimmer active inverted>
      <Loader>Loading.....</Loader>
    </Dimmer>
  );

  return (
    <Container fluid>
      <Grid centered padded>
        {isLoading ? renderLoader() : renderCards()}
      </Grid>
    </Container>
  );
};

export default StoriesList;
