import { useState, useCallback } from 'react';
import { setHeaderToken } from '../client';
import useLogin from './useLogin';
import useUserDetails from './useUserDetails';
import useGetBooks from '../book/useGetBooks';

const useLoginAndFetchData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loginMutation = useLogin();
  const userDetailsQuery = useUserDetails();
  const useGetBooksQuery = useGetBooks();

  const loginAndFetchData = useCallback(
    async (username: string, password: string) => {
      setIsLoading(true);
      try {
        const { token } = await loginMutation.mutateAsync({
          username,
          password,
        });
        setHeaderToken(token);

        const [userDetails, books] = await Promise.all([
          userDetailsQuery,
          useGetBooksQuery,
        ]);

        return { userDetails, books };
      } catch (error) {
        console.error('Error:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [loginMutation, userDetailsQuery, useGetBooksQuery]
  );

  return {
    loginAndFetchData,
    isLoading,
    isError:
      loginMutation.isError ||
      userDetailsQuery.isError ||
      useGetBooksQuery.isError,
    error:
      loginMutation.error || userDetailsQuery.error || useGetBooksQuery.error,
  };
};

export default useLoginAndFetchData;
