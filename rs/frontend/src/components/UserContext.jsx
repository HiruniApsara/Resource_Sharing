import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null until loaded
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = 'http://localhost:3001';
const formatImagePath = (path) => {
  if (!path) return 'https://via.placeholder.com/100';

  // If full path already included from DB
  if (path.startsWith('uploads/')) {
    return `${baseURL}/${path}`;
  }

  // Else, it's just a filename
  return `${baseURL}/uploads/profile_images/${path}`;
};


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const username = localStorage.getItem('username'); // Or use JWT-based auth instead

        if (!username) {
          setLoading(false);
          return;
        }

        const response = await axios.get(`${baseURL}/api/users/${username}`);

        const data = response.data;

        setUser({
          name: data.displayName || '',
          degree: data.course || '',
          year: data.year ? `${data.year} Year` : '',
          profileImage: formatImagePath(data.profileImage),
        });
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(err.message || 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;