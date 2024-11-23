import {createContext, useContext, useEffect, useState} from 'react';
import {User, onAuthStateChanged} from 'firebase/auth';
import {auth} from '../../config/firebaseConfig';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({user: null, loading: true});

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      console.log('User state changed:', user);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{user, loading}}>{!loading && children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
