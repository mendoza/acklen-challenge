import React, { useState } from 'react';
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
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import CollectionCard from '../components/CollectionCard';

const MyCollections = () => {
  const { user, isLoading } = useAuth0();
  const history = useHistory();
  if (isLoading) {
    return <Spinner color="primary" />;
  }

  if (!user) {
    history.push('/');
  }

  const [createModal, setCreateModal] = useState(false);

  return (
    <Row className="justify-content-center">
      <Modal isOpen={createModal} toggle={() => setCreateModal(!createModal)}>
        <ModalHeader toggle={() => setCreateModal(!createModal)}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setCreateModal(!createModal)}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={() => setCreateModal(!createModal)}>
            Cancel
          </Button>
        </ModalFooter>
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
      <Row>
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
      </Row>
    </Row>
  );
};

export default MyCollections;
