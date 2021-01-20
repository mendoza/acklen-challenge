import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'reactstrap';

type Props = {
  id: string;
  name: string;
  value: number;
  onUpdate: () => void;
  onDelete: () => void;
};

const API_KEY = process.env.REACT_APP_API_KEY || '';
const API_HOST = process.env.REACT_APP_API_HOST || '';

const ItemTableRow = ({ id, name, value, onDelete, onUpdate }: Props) => {
  const [coppied, setCoppied] = useState(false);
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{`$${(value || 0).toFixed(2)}`}</td>
      <td className="d-flex justify-content-around">
        <Button
          color="info"
          onClick={() => {
            if (!coppied)
              axios
                .post(
                  `${API_HOST}/api/items/share`,
                  {
                    itemId: id,
                  },
                  {
                    headers: {
                      'treasure-key': API_KEY,
                    },
                  },
                )
                .then(({ data }) => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/share/${data.shareItem._id}`,
                  );
                  setCoppied(true);
                });
          }}
        >
          <i className={`fas ${coppied ? 'fa-check' : 'fa-share-alt'}`} />
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
};

export default ItemTableRow;
