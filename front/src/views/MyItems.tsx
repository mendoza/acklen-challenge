import React, { useContext, useEffect, useState } from 'react';
import {
  Col,
  Row,
  Spinner,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Alert,
} from 'reactstrap';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosRequestConfig } from 'axios';
import { UserContext } from '../context/userContext';
import Collection from '../Interfaces/Collection';
import Item from '../Interfaces/item';

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
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [error, setError] = useState({
    show: false,
    message: '',
  });
  const [updateAndCreateModal, setUpdateAndCreateModal] = useState(false);
  const [collection, setCollection] = useState<Collection>({} as Collection);
  const [items, setItems] = useState<Item[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const clearData = () => {
    setIsUpdate(false);
    setName('');
    setPrice(0);
  };
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
      <Modal
        isOpen={updateAndCreateModal}
        toggle={() => setUpdateAndCreateModal(!updateAndCreateModal)}
      >
        <ModalHeader toggle={() => setUpdateAndCreateModal(!updateAndCreateModal)}>{`${
          isUpdate ? 'Update' : 'Create'
        } an Item`}</ModalHeader>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            e.persist();
            const options = {
              method: isUpdate ? 'put' : 'post',
              url: `${API_HOST}/api/items`,
              headers: {
                'treasure-key': API_KEY,
              },
              data: { name, value: price, collectionId: params.collectionId },
            } as AxiosRequestConfig;
            axios(options)
              .then(() => {
                getItems();
                setUpdateAndCreateModal(!updateAndCreateModal);
                clearData();
              })
              .catch((err) => {
                setError({ show: true, message: err.message });
                clearData();
              });
          }}
        >
          <ModalBody>
            <FormGroup>
              <Label for="itemName">Name</Label>
              <Input
                type="text"
                name="itemName"
                value={name}
                onChange={(e) => {
                  const { value } = e.target;
                  setName(value);
                }}
                placeholder="Rock, Coin..."
              />
            </FormGroup>
            <FormGroup>
              <Label for="itemValue">Name</Label>
              <Input
                type="number"
                min="0"
                name="itemValue"
                value={price}
                onChange={(e) => {
                  const { value } = e.target;
                  setPrice(parseFloat(value));
                }}
                placeholder="100"
              />
            </FormGroup>
            <Alert color="danger" isOpen={error.show}>
              {error.message}
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">
              {`${isUpdate ? 'Update' : 'Create'}`}
            </Button>{' '}
            <Button color="danger" onClick={() => setUpdateAndCreateModal(!updateAndCreateModal)}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
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
              <Button
                color="success"
                onClick={() => setUpdateAndCreateModal(!updateAndCreateModal)}
              >
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
