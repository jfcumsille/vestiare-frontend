import {
  beforeEach, describe, it, expect, vi,
} from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import TableHead from '@/components/table/TableHead.vue';
import TableHeader from '@/components/table/TableHeader.vue';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const getWrapper = () => {
  const wrapper = mount(TableHead, {
    global: {
      plugins: [testingPinia],
    },
    slots: {
      default: [TableHeader],
    },
  });
  return wrapper;
};

describe('TableHead', () => {
  beforeEach(() => {
    setActivePinia(testingPinia);
  });

  it('renders TableHeader in slot when passed TableHeader', () => {
    const wrapper = getWrapper();
    const tableHeader = wrapper.findComponent(TableHeader);
    expect(tableHeader.exists()).toBe(true);
  });
});
