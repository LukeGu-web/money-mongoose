import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import { setHeaderToken } from '../client';
import useLogin from './useLogin';
import useUserDetails from './useUserDetails';
import useGetBooks from '../book/useGetBooks';

const useLoginAndFetchData = () => {
  const loginMutation = useLogin();
  const userDetailsQuery = useUserDetails();
  const useGetBooksQuery = useGetBooks();

  const login = useCallback(
    async (
      username: string,
      password: string,
      onSuccess?: (token: string, userDetails: any, books: any[]) => void,
      onError?: (error: AxiosError) => void
    ) => {
      try {
        // Perform login
        const { token } = await loginMutation.mutateAsync({
          username,
          password,
        });

        setHeaderToken(token);

        // Fetch user details and books
        const [userDetails, books] = await Promise.all([
          userDetailsQuery.refetch(),
          useGetBooksQuery.refetch(),
        ]);

        if (userDetails.data && books.data && onSuccess) {
          onSuccess(token, userDetails.data, books.data);
        }
      } catch (error) {
        if (onError && error instanceof AxiosError) {
          onError(error);
        }
      }
    },
    [loginMutation, userDetailsQuery, useGetBooksQuery]
  );

  return {
    login,
    isLoading:
      loginMutation.isPending ||
      userDetailsQuery.isLoading ||
      useGetBooksQuery.isLoading,
    isError:
      loginMutation.isError ||
      userDetailsQuery.isError ||
      useGetBooksQuery.isError,
    error:
      loginMutation.error || userDetailsQuery.error || useGetBooksQuery.error,
    userDetails: userDetailsQuery.data,
    books: useGetBooksQuery.data,
  };
};

export default useLoginAndFetchData;
