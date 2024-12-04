import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';



vi.mock('next/font/local', () => ({
  __esModule: true,
  default: () => ({
    className: 'mock-font-class',
  }),
}));