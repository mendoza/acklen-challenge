import React, { createContext, useState, Dispatch, SetStateAction } from 'react';
import Collection from '../Interfaces/Collection';

const CollectionsContext = createContext({
  collections: {} as Partial<Collection[]>,
  setCollections: {} as Dispatch<SetStateAction<Collection[]>>,
});

type Props = {
  children: React.ReactNode;
};
const CollectionsProvider = ({ children }: Props) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  return (
    <CollectionsContext.Provider value={{ collections, setCollections }}>
      {children}
    </CollectionsContext.Provider>
  );
};

export { CollectionsContext, CollectionsProvider };
