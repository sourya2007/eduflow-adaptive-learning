import { vi, test, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StudentDashboard from '../StudentDashboard';
import { ThemeProvider } from '../ThemeProvider';
import { ToastProvider } from '../ToastProvider';

// Mock driver.js as it uses document.body directly and might cause issues in jsdom
vi.mock('driver.js', () => ({
  driver: vi.fn(() => ({
    drive: vi.fn()
  }))
}));

// Mock recharts as ResizeObserver is not available in jsdom
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  LineChart: () => <div data-testid="line-chart" />,
  Line: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  CartesianGrid: () => <div />,
  Tooltip: () => <div />
}));

test('renders StudentDashboard', () => {
  render(
    <BrowserRouter>
      <ThemeProvider defaultTheme="system">
        <ToastProvider>
          <StudentDashboard />
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
  expect(screen.getByRole('main')).toBeInTheDocument();
});
