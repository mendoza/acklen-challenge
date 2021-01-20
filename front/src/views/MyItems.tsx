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
import Item from '../Interfaces/item';
import ItemTableRow from '../components/ItemTableRow';

const API_KEY = process.env.REACT_APP_API_KEY || '';
const API_HOST = process.env.REACT_APP_API_HOST || '';

const MyItems = () => {
  const { user, isLoading } = useAuth0();
  const history = useHistory();
  const params = useParams<any>();
  const [query, setQuery] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [price, setPrice] = useState(0);
  const [error, setError] = useState({
    show: false,
    message: '',
  });
  const [updateAndCreateModal, setUpdateAndCreateModal] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [myCollection, setMyCollection] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const clearData = () => {
    setIsUpdate(false);
    setName('');
    setPrice(0);
    setError({
      show: false,
      message: '',
    });
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
        if (data.collection === null) {
          setMyCollection(false);
        }
        setItems(data.items);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (!isLoading && realUser.id && items.length === 0) getItems();
  }, [realUser]);

  if (isLoading) {
    return (
      <div className="d-flex w-100 justify-content-center">
        <Spinner color="primary" />
      </div>
    );
  }

  if (!user) {
    history.push('/');
  }

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
              data: { name, value: price, collectionId: params.collectionId, id },
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

      <Modal isOpen={confirmation} toggle={() => setConfirmation(!confirmation)}>
        <ModalHeader
          toggle={() => setConfirmation(!confirmation)}
        >{`Are you sure you want to delete the item ${name}?`}</ModalHeader>
        <ModalBody>
          Take in mind this change is permanent 😢
          <Alert color="danger" isOpen={error.show}>
            {error.message}
          </Alert>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-center">
          <Button
            color="danger"
            onClick={() => {
              axios
                .delete(`${API_HOST}/api/items/`, {
                  data: { id },
                  headers: {
                    'treasure-key': API_KEY,
                  },
                })
                .then(() => {
                  setConfirmation(!confirmation);
                  getItems();
                  clearData();
                })
                .catch((err) => {
                  setError({ show: true, message: err.message });
                });
            }}
          >
            Yes I&apos;m sure!
          </Button>{' '}
          <Button color="success" onClick={() => setConfirmation(!confirmation)}>
            take me back!
          </Button>
        </ModalFooter>
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
        {!myCollection ? <h1 className="w-100 text-center"> </h1> : null}
        {items.length === 0 ? (
          <h1 className="w-100 text-center">
            {!myCollection ? 'Is this even yours? 👀' : 'Wow, much empty 🐕'}
          </h1>
        ) : (
          <div className="w-100">
            <h2>A little about your collection</h2>
            <p>{`Right now it has ${items.length} items`}</p>
            <p>{`Its worth aroud $${items.reduce((p, v) => p + v.value, 0).toFixed(2)}`}</p>
          </div>
        )}
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>Unique Id</th>
              <th>Name</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items
              .filter((item) => {
                if (query.length === 0) return true;
                const searchRegex = new RegExp(
                  query
                    .toLowerCase()
                    .split(/ /)
                    .filter((l) => l !== '')
                    .join('|'),
                  'i',
                );
                return item.name.toLowerCase().search(searchRegex) !== -1;
              })
              .map((item) => (
                <ItemTableRow
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  value={item.value}
                  onDelete={() => {
                    setConfirmation(true);
                    setId(item._id);
                    setName(item.name);
                    setPrice(item.value);
                  }}
                  onUpdate={() => {
                    setIsUpdate(true);
                    setId(item._id);
                    setName(item.name);
                    setPrice(item.value);
                    setUpdateAndCreateModal(true);
                  }}
                />
              ))}
          </tbody>
        </Table>
      </Row>
    </Row>
  );
};

export default MyItems;
