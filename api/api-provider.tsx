import { useEffect, useState, useCallback } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { getCalendars } from 'expo-localization';
import { client, setHeaderToken, setHeaderTimezone } from 'api/client';
import { useUserStore } from 'core/stateHooks';
import log from 'core/logger';

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10 * 60 * 1000, // 10 mins
        gcTime: 15 * 60 * 1000, // 15 mins (formerly cacheTime)
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: process.env.NODE_ENV === 'production',
        refetchOnReconnect: true,
      },
      mutations: {
        retry: 2,
      },
    },
  });

export const queryClient = createQueryClient();

export function APIProvider({ children }: { children: React.ReactNode }) {
  const user = useUserStore((state) => state.user);
  const [isInitialized, setIsInitialized] = useState(false);

  useReactQueryDevTools(queryClient);

  useEffect(() => {
    const initializeHeaders = async () => {
      try {
        // Set auth token if not present
        if (!client.defaults.headers.common['Authorization'] && user?.token) {
          setHeaderToken(user.token);
        }

        // Set timezone if not present
        if (!client.defaults.headers.common['X-Timezone']) {
          const calendars = getCalendars();
          const tz = calendars?.[0]?.timeZone;
          if (tz) {
            setHeaderTimezone(tz);
          } else {
            log.warn('No timezone found in device calendars');
          }
        }

        setIsInitialized(true);
      } catch (error) {
        log.error('Failed to initialize API headers:', error);
        setIsInitialized(true);
      }
    };

    initializeHeaders();
  }, [user?.token]);

  // Show loading state while initializing
  if (!isInitialized) {
    return null; // Or return a loading component
  }

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

// reset query client
export const useResetQueryClient = () => {
  return useCallback(() => {
    queryClient.clear();
  }, []);
};
