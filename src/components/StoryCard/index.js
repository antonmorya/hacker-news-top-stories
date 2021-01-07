import * as React from "react";
import PropTypes from "prop-types";
import { Card, Icon, Grid } from "semantic-ui-react";

const StoryCard = ({ author, story }) => {
  const { karma } = author;
  const { by, id, score, time, title, type, url } = story;

  const postCreateDate = new Date(time * 1000);
  const dateString = `${postCreateDate.getDate()}/${
    postCreateDate.getMonth() + 1
  }/${postCreateDate.getFullYear()}`;

  return (
    <Card key={id}>
      <Card.Content>
        <Card.Header>
          <a href={url} target="_blank" rel="noreferrer">
            {title}
          </a>
        </Card.Header>
        <Card.Description>{type}</Card.Description>
        <Grid>
          <Grid.Column width={11} textAlign="left">
            <Icon color="grey" name="clock outline" />
            {dateString}
          </Grid.Column>
          <Grid.Column width={5} textAlign="right">
            <Icon color="yellow" name="star" />
            {score}
          </Grid.Column>
        </Grid>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" color="blue" />
        {by}
        &nbsp; (
        <Icon color="yellow" name="star" />
        {karma})
      </Card.Content>
    </Card>
  );
};

StoryCard.propTypes = {
  author: PropTypes.shape({
    karma: PropTypes.number,
  }),
  story: PropTypes.shape({
    by: PropTypes.string,
    id: PropTypes.number,
    score: PropTypes.number,
    time: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.string,
    url: PropTypes.string,
  }),
};

StoryCard.defaultProps = {
  author: {
    karma: 0,
  },
  story: PropTypes.shape({
    by: "",
    id: 0,
    score: 0,
    time: 0,
    title: "",
    type: "",
    url: "",
  }),
};

export default StoryCard;
