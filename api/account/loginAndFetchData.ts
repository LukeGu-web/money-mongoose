import { setHeaderToken } from '../client';
import useLogin from './useLogin';
import useUserDetails from './useUserDetails';
import useGetBooks from '../book/useGetBooks';

const loginAndFetchData = async (username: string, password: string) => {
  try {
    // Login
    const loginMutation = useLogin();
    const { token } = await loginMutation.mutateAsync({ username, password });

    // Set token in header
    setHeaderToken(token);

    // Fetch user details and books in parallel
    const [userDetails, books] = await Promise.all([
      useUserDetails(),
      useGetBooks(),
    ]);

    return { userDetails, books };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default loginAndFetchData;
