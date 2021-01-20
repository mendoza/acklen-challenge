import React from 'react';

type Props = {
  id: string;
  name: string;
  value: number;

};

const ItemTableRow = ({}:Props) => {
  return (
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
  );
};

export default ItemTableRow;
