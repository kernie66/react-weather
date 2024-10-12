// ./test-utils/render.tsx
import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
// Import your theme object
import { createTheme } from '@mantine/core';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const theme = createTheme({});

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });

export const testQueryClient = createTestQueryClient();

export function render(ui) {
  console.log('testQueryClient', testQueryClient);
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }) => (
      <MantineProvider theme={theme}>
        <QueryClientProvider client={testQueryClient}>
          {children}
        </QueryClientProvider>
      </MantineProvider>
    ),
  });
}
