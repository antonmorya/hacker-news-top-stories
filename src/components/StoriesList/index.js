import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Container, Grid, Loader, Dimmer } from "semantic-ui-react";
import storyCard from "../StoryCard";

const StoriesList = () => {
  const { isLoading, authors, tenStories } = useContext(AppContext);

  const renderCards = () =>
    tenStories.map(({ by, ...story }) =>
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
