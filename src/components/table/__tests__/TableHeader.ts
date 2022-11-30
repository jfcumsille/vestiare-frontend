import {
  beforeEach, describe, it, expect, vi,
} from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { shallowMount } from '@vue/test-utils';
import TableHeader from '@/components/table/TableHeader.vue';
import TableFilter from '@/components/table/utils/TableFilter.vue';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const getWrapper = () => {
  const wrapper = shallowMount(TableHeader, {
    global: {
      plugins: [testingPinia],
    },
    slots: {
      default: [TableFilter],
    },
  });
  return wrapper;
};

describe('TableHeader', () => {
  beforeEach(() => {
    setActivePinia(testingPinia);
  });

  it('renders TableFilter in slot when passed TableFilter', () => {
    const wrapper = getWrapper();
    const tableFilter = wrapper.findComponent(TableFilter);
    expect(tableFilter.exists()).toBe(true);
  });
});
