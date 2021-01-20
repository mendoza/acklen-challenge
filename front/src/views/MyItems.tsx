import React, { useContext, useEffect, useState } from 'react';
import { Col, Row, Spinner, Input, InputGroup, InputGroupAddon, Button, Table } from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import Collection from '../Interfaces/Collection';

const API_KEY = process.env.REACT_APP_API_KEY || '';
const API_HOST = process.env.REACT_APP_API_HOST || '';

const MyItems = () => {
  const { user, isLoading } = useAuth0();
  const history = useHistory();
  const params = useParams<any>();

  if (isLoading) {
    return <Spinner color="primary" />;
  }

  if (!user) {
    history.push('/');
  }
  const [query, setQuery] = useState('');
  const [collection, setCollection] = useState<Collection>({} as Collection);
  const [items, setItems] = useState([]);
  const { user: realUser } = useContext(UserContext);
  const getItems = () => {
    axios
      .post(
        `${API_HOST}/api/collections/items`,
        {
          user: realUser.id,
          collectionId: params.collectionId,
        },
        {
          headers: {
            'treasure-key': API_KEY,
          },
        },
      )
      .then(({ data }) => {
        setCollection(data.collection);
        setItems(data.items);
        console.log(collection);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (realUser.id && items.length === 0) getItems();
  }, [realUser]);

  return (
    <Row className="justify-content-center">
      <Row className="w-100">
        <Col>
          <InputGroup>
            <Input
              placeholder="Search by Item Name"
              value={query}
              type="text"
              onChange={(e) => {
                const { value } = e.target;
                setQuery(value);
              }}
            />
            <InputGroupAddon addonType="append">
              <Button color="success">
                <i className="fas fa-plus" />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
      <Row className="w-100">
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Row>
    </Row>
  );
};

export default MyItems;
