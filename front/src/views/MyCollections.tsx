import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Spinner,
  Row,
  Col,
  InputGroup,
  Button,
  Input,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Alert,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import CollectionCard from '../components/CollectionCard';
import { UserContext } from '../context/userContext';
import { CollectionsContext } from '../context/collectionsContext';
import Collection from '../Interfaces/Collection';

const API_KEY = process.env.REACT_APP_API_KEY || '';
const API_HOST = process.env.REACT_APP_API_HOST || '';
const MyCollections = () => {
  const { user, isLoading } = useAuth0();
  const history = useHistory();
  if (isLoading) {
    return <Spinner color="primary" />;
  }

  if (!user) {
    history.push('/');
  }

  const { user: realUser } = useContext(UserContext);
  const { collections, setCollections } = useContext(CollectionsContext);
  const getCollections = () => {
    axios
      .get(`${API_HOST}/api/collections/${realUser.id}`, {
        headers: {
          'treasure-key': API_KEY,
        },
      })
      .then(({ data }) => {
        setCollections(data.collections);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCollections();
  }, []);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [createModal, setCreateModal] = useState(false);
  const [isPrivate, setIsPrivate] = useState(true);
  const [error, setError] = useState({ show: false, message: '' });

  return (
    <Row className="justify-content-center">
      <Modal isOpen={createModal} toggle={() => setCreateModal(!createModal)}>
        <ModalHeader toggle={() => setCreateModal(!createModal)}>Create a Collection</ModalHeader>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            e.persist();
            axios
              .post(
                `${API_HOST}/api/collections`,
                { name, description, isPrivate, user: realUser.id },
                {
                  headers: {
                    'treasure-key': API_KEY,
                  },
                },
              )
              .then(() => {
                getCollections();
                setCreateModal(!createModal);
              })
              .catch((err) => {
                console.log(err);
                setError(err);
              });
          }}
        >
          <ModalBody>
            <FormGroup>
              <Label for="collectionName">Name</Label>
              <Input
                type="text"
                name="collectionName"
                value={name}
                onChange={(e) => {
                  const { value } = e.target;
                  setName(value);
                }}
                placeholder="Rocks, Coins..."
              />
            </FormGroup>
            <FormGroup>
              <Label for="collectionDescription">Description</Label>
              <Input
                type="textarea"
                name="collectionDescription"
                value={description}
                onChange={(e) => {
                  const { value } = e.target;
                  setDescription(value);
                }}
                placeholder="includes coins from 1930 until 2000"
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  checked={isPrivate}
                  onChange={(e) => {
                    const { checked } = e.target;
                    console.log(checked);
                    setIsPrivate(checked);
                  }}
                />
                Is Private
              </Label>
            </FormGroup>
            <Alert color="danger" isOpen={error.show}>
              {error.message}
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" onClick={() => setCreateModal(!createModal)}>
              Create
            </Button>{' '}
            <Button color="danger" onClick={() => setCreateModal(!createModal)}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      <Row className="w-100">
        <Col>
          <InputGroup>
            <Input placeholder="Collection Name" />
            <InputGroupAddon addonType="append">
              <Button color="primary">
                <i className="fas fa-search" />
              </Button>
              <Button color="success" onClick={() => setCreateModal(!createModal)}>
                <i className="fas fa-plus" />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
      <Row className="w-100">
        {collections.map((item: any) => {
          const coll = item as Collection;
          return <CollectionCard key={coll.id} collection={coll} />;
        })}
      </Row>
    </Row>
  );
};

export default MyCollections;
