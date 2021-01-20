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
  onUpdate: () => void;
  onDelete: () => void;
  onClick: () => void;
};

const CollectionCard = ({ collection, onUpdate, onDelete, onClick }: Props) => (
  <>
    <Col key={collection._id} lg={3} xs={12} className="mt-3">
      <Card>
        <CardImg
          className="d-none d-sm-block"
          top
          width="100%"
          src="/assets/treasure.png"
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle tag="h5">{collection.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {collection.private ? 'Is Private' : 'Is Public'}
          </CardSubtitle>
          <CardText>{collection.description}</CardText>
          <div className="d-flex justify-content-around">
            <Button color="primary" onClick={onClick}>
              <i className="fas fa-eye" />
            </Button>
            <Button color="danger" onClick={onDelete}>
              <i className="fas fa-trash" />
            </Button>
            <Button color="warning" onClick={onUpdate}>
              <i className="fas fa-pen" />
            </Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  </>
);

export default CollectionCard;
