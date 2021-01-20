import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Jumbotron, Row } from 'reactstrap';
import Collection from '../Interfaces/Collection';
import Item from '../Interfaces/item';

const API_KEY = process.env.REACT_APP_API_KEY || '';
const API_HOST = process.env.REACT_APP_API_HOST || '';
const ShareItem = () => {
  const params = useParams<any>();
  const [item, setItem] = useState<Item>({} as Item);
  const [collection, setCollection] = useState<Collection>({} as Collection);

  useEffect(() => {
    axios
      .put(
        `${API_HOST}/api/items/share`,
        {
          shareId: params.id,
        },
        {
          headers: {
            'treasure-key': API_KEY,
          },
        },
      )
      .then(({ data }) => {
        setItem(data.sharedItem);
        setCollection(data.collection);
      });
  }, []);

  return (
    <Row>
      <Col>
        <Jumbotron>
          <h1 className="display-3">{item.name}</h1>
          <p className="lead">{`From the collection ${collection.name}`}</p>
          <hr className="my-2" />
          <p>{`It's valued around $${(item.value || 0).toFixed(
            2,
          )} (Remember the user set this price).`}</p>
        </Jumbotron>
      </Col>
    </Row>
  );
};

export default ShareItem;
