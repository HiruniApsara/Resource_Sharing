import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    profileImage: 'https://via.placeholder.com/100',
    name: 'Hiruni Apsara',
    year: '3rd Year',
    degree: 'BICT'
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
