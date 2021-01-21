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
import axios, { AxiosRequestConfig } from 'axios';
import CollectionCard from '../components/CollectionCard';
import { UserContext } from '../context/userContext';
import { CollectionsContext } from '../context/collectionsContext';
import Collection from '../Interfaces/Collection';

const API_KEY = process.env.REACT_APP_API_KEY || '';
const API_HOST = process.env.REACT_APP_API_HOST || '';
const MyCollections = () => {
  const { user, isLoading } = useAuth0();
  const history = useHistory();
  const { user: realUser } = useContext(UserContext);
  const { collections, setCollections } = useContext(CollectionsContext);

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [description, setDescription] = useState('');
  const [query, setQuery] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);
  const [updateAndCreateModal, setUpdateAndCreateModal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [isPrivate, setIsPrivate] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState({ show: false, message: '' });

  const getCollections = () => {
    axios
      .get(`${API_HOST}/api/collections/${realUser.id}`, {
        headers: {
          'treasure-key': API_KEY,
        },
      })
      .then(({ data }) => {
        setIsEmpty(false);
        setCollections(data.collections);
      });
  };
  useEffect(() => {
    if (!isLoading && realUser.id && collections.length === 0) getCollections();
    else setIsEmpty(collections.length === 0);
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

  const clearData = () => {
    setIsPrivate(true);
    setIsUpdate(false);
    setName('');
    setDescription('');
  };
  return (
    <Row className="justify-content-center">
      <Modal
        isOpen={updateAndCreateModal}
        toggle={() => setUpdateAndCreateModal(!updateAndCreateModal)}
      >
        <ModalHeader toggle={() => setUpdateAndCreateModal(!updateAndCreateModal)}>{`${
          isUpdate ? 'Update' : 'Create'
        } a Collection`}</ModalHeader>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            e.persist();
            const options = {
              method: isUpdate ? 'put' : 'post',
              url: `${API_HOST}/api/collections`,
              headers: {
                'treasure-key': API_KEY,
              },
              data: { name, description, isPrivate, user: realUser.id, id },
            } as AxiosRequestConfig;
            axios(options)
              .then(() => {
                getCollections();
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
        >{`Are you sure you want to delete the collection ${name}?`}</ModalHeader>
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
                .delete(`${API_HOST}/api/collections/`, {
                  data: { id },
                  headers: {
                    'treasure-key': API_KEY,
                  },
                })
                .then(() => {
                  setConfirmation(!confirmation);
                  getCollections();
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
              placeholder="Search by Collection Name"
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
      {isEmpty ? (
        <div className="w-100 d-flex justify-content-center mt-5">
          <Spinner color="primary" />
        </div>
      ) : (
        <Row className="w-100">
          {collections
            .filter((item) => {
              if (query.length === 0) return true;
              const coll = item as Collection;
              const searchRegex = new RegExp(
                query
                  .toLowerCase()
                  .split(/ /)
                  .filter((l) => l !== '')
                  .join('|'),
                'i',
              );
              return coll.name.toLowerCase().search(searchRegex) !== -1;
            })
            .map((item: any) => {
              const coll = item as Collection;
              return (
                <CollectionCard
                  onClick={() => {
                    history.push(`/items/${coll._id}`);
                  }}
                  key={coll._id}
                  collection={coll}
                  onDelete={() => {
                    setConfirmation(true);
                    setId(coll._id);
                    setName(coll.name);
                    setDescription(coll.description);
                    setIsPrivate(coll.private);
                  }}
                  onUpdate={() => {
                    setId(coll._id);
                    setIsUpdate(true);
                    setName(coll.name);
                    setDescription(coll.description);
                    setIsPrivate(coll.private);
                    setUpdateAndCreateModal(true);
                  }}
                />
              );
            })}
        </Row>
      )}
    </Row>
  );
};

export default MyCollections;
