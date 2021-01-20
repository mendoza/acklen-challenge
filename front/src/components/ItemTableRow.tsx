import React from 'react';
import { Button } from 'reactstrap';

type Props = {
  id: string;
  name: string;
  value: number;
  onUpdate: () => void;
  onDelete: () => void;
};

const ItemTableRow = ({ id, name, value, onDelete, onUpdate }: Props) => (
  <tr>
    <td>{id}</td>
    <td>{name}</td>
    <td>{(value || 0).toFixed(2)}</td>
    <td className="d-flex justify-content-around">
      <Button color="info" onClick={onDelete}>
        <i className="fas fa-share-alt" />
      </Button>
      <Button color="warning" onClick={onUpdate}>
        <i className="fas fa-pen" />
      </Button>
      <Button color="danger" onClick={onDelete}>
        <i className="fas fa-trash" />
      </Button>
    </td>
  </tr>
);

export default ItemTableRow;
