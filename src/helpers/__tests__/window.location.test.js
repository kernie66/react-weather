import { vi } from 'vitest';

// Test to check that window.location.reload can be mocked and tested
describe("test window location's reload function", () => {
  const original = window.location;

  const reloadFn = () => {
    window.location.reload();
  };

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: vi.fn() },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: original,
    });
  });

  it('mocks reload function', () => {
    expect(vi.isMockFunction(window.location.reload)).toBe(true);
  });

  it('calls reload function', () => {
    reloadFn(); // as defined above..
    expect(window.location.reload).toHaveBeenCalled();
  });
});
