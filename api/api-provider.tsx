import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { getCalendars } from 'expo-localization';
import { client, setHeaderToken, setHeaderTimezone } from 'api/client';
import { useUserStore } from 'core/stateHooks';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * (60 * 1000), // 10 mins
    },
  },
});

export function APIProvider({ children }: { children: React.ReactNode }) {
  const user = useUserStore((state) => state.user);
  useReactQueryDevTools(queryClient);
  if (!client.defaults.headers.common['Authorization'])
    setHeaderToken(user.token);
  if (!client.defaults.headers.common['X-Timezone']) {
    const tz = getCalendars()[0].timeZone;
    if (tz) setHeaderTimezone(tz);
  }
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
