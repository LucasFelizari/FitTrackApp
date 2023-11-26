import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
import { UserDTO } from "../dtos/UserDTO";
import { storageUserGet, storageUserRemove, storageUserSave } from "../storage/storageUser";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "../storage/storageAuthToken";

export type AuthContextDataProps = {
    user: UserDTO;
    signIn: (email: string, password: string) => Promise<void>;
    updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
    signOut: () => Promise<void>;
    isLoadingUserStorageData: boolean;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<UserDTO>({} as UserDTO);
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

    async function userAndTokenUpdate(userData: UserDTO, token: string) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setUser(userData);
    }

    async function storageuUserAndTokenSave(userData: UserDTO, token: string) {
      try {
          setIsLoadingUserStorageData(true);
          storageUserSave(userData); // Salva o usuário no AsyncStorage
          storageAuthTokenSave(token); // Salva o token no AsyncStorage
      } catch (error) {
          throw error;
      } finally {
          setIsLoadingUserStorageData(false);
      }
  }

  async function signIn(email: string, password: string) {
    try {
        const { data } = await api.post('/sessions', { email, password });
        if (data.user && data.token) {
            await storageuUserAndTokenSave(data.user, data.token);
            userAndTokenUpdate(data.user, data.token);
        }
    } catch (error) {
        throw error;
    } finally {
        setIsLoadingUserStorageData(false);
    }
}

      async function signOut() {
        try {
            setIsLoadingUserStorageData(true);
            setUser({} as UserDTO);
            await storageUserRemove();
            await storageAuthTokenRemove();
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }
      async function updateUserProfile(userUpdated: UserDTO) {
        try {
          setUser(userUpdated);
          await storageUserSave(userUpdated);
        } catch (error) {
          throw error;
        }
      }

      async function loadUserData() {
        try {
            setIsLoadingUserStorageData(true);
            const userLogged = await storageUserGet();
            const token = await storageAuthTokenGet();
            if (token && userLogged) {
                userAndTokenUpdate(userLogged, token);
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

      useEffect(() => {
        loadUserData()
      },[])

      return (
        <AuthContext.Provider value={{ 
          user, 
          signIn,
          updateUserProfile,
          signOut,
          isLoadingUserStorageData
        }}>
          {children}
        </AuthContext.Provider>
      )
}