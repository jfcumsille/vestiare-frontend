import { expect, vi } from 'vitest';

type MockFunction = () => void;

export const expectToTrackWithAnalytics = (
  mockFunction: MockFunction,
  name: string,
  properties: Record<string, unknown> = {},
) => {
  expect(mockFunction).toHaveBeenLastCalledWith(name, properties);
};

export const mockPageAndTrackAnalytics = (page?: MockFunction, track?: MockFunction) => {
  const analyticsIdentifyMock = () => ('identify');
  const analyticsAliasMock = () => ('alias');
  const dummyPage = !page ? vi.fn() : page;
  const dummyTrack = !track ? vi.fn() : track;
  window.analytics = {
    identify: analyticsIdentifyMock,
    page: dummyPage,
    track: dummyTrack,
    alias: analyticsAliasMock,
    use: vi.fn(),
    init: vi.fn(),
    addIntegration: vi.fn(),
    load: vi.fn(),
    setAnonymousId: vi.fn(),
    group: vi.fn(),
    trackLink: vi.fn(),
    trackForm: vi.fn(),
    ready: vi.fn(),
    reset: vi.fn(),
    user: vi.fn(),
    debug: vi.fn(),
    timeout: vi.fn(),
    on: vi.fn(),
  };
};
