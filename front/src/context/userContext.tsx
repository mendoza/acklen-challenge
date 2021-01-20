import React, { createContext, useState, Dispatch, SetStateAction } from 'react';
import User from '../Interfaces/User';

const UserContext = createContext({
  user: {} as Partial<User>,
  setUser: {} as Dispatch<SetStateAction<Partial<User>>>,
});

type Props = {
  children: React.ReactNode;
  value: any;
};
const UserProvider = ({ children, value }: Props) => {
  const [user, setUser] = useState(value);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
