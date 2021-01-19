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

const CollectionCard = () => (
  <>
    <Col xs={3} className="mt-3">
      <Card>
        <CardImg top width="100%" src="/assets/treasure.png" alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">Card title</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Card subtitle
          </CardSubtitle>
          <CardText>
            Some quick example text to build on the card title and make up the bulk of the
            card&apos;s content.
          </CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </Col>
  </>
);

export default CollectionCard;
