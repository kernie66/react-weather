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

export function render(ui) {
  const queryClient = new QueryClient();
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }) => (
      <MantineProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </MantineProvider>
    ),
  });
}
