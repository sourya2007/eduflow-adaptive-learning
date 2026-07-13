import { vi, test, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TeacherDashboard from '../TeacherDashboard';
import { ThemeProvider } from '../ThemeProvider';
import { ToastProvider } from '../ToastProvider';

// Mock recharts
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  LineChart: () => <div data-testid="line-chart" />,
  Line: () => <div />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  CartesianGrid: () => <div />,
  Tooltip: () => <div />
}));

test('renders TeacherDashboard', () => {
  render(
    <BrowserRouter>
      <ThemeProvider defaultTheme="system">
        <ToastProvider>
          <TeacherDashboard />
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
  expect(screen.getByRole('main')).toBeInTheDocument();
});
