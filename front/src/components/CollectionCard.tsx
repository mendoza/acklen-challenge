import React from 'react';
import {
  Card,
  Col,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from 'reactstrap';
import Collections from '../Interfaces/Collection';

type Props = {
  collection: Collections;
};

const CollectionCard = ({ collection }: Props) => (
  <>
    <Col xs={3} className="mt-3">
      <Card>
        <CardImg top width="100%" src="/assets/treasure.png" alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{collection.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {collection.private ? 'Is Private' : 'Is Public'}
          </CardSubtitle>
          <CardText>{collection.description}</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </Col>
  </>
);

export default CollectionCard;
