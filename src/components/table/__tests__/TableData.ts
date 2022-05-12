import {
  describe,
  it,
  expect,
  beforeEach,
} from 'vitest';
import { mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import { setActivePinia, createPinia } from 'pinia';
import TableData from '@/components/table/TableData.vue';
import TableDate from '@/components/table/utils/TableDate.vue';
import TableLabel from '@/components/table/utils/TableLabel.vue';

describe('TableData', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    setupLocales();
  });

  it('renders TableDate in slot when passed TableDate', () => {
    const wrapper = mount(TableData, {
      slots: {
        default: [TableDate],
      },
    });
    const tableDate = wrapper.findComponent(TableDate);
    expect(tableDate.exists()).toBe(true);
  });

  it('renders TableLabel in slot when passed TableLabel', () => {
    const wrapper = mount(TableData, {
      slots: {
        default: [TableLabel],
      },
    });
    const tableLabel = wrapper.findComponent(TableLabel);
    expect(tableLabel.exists()).toBe(true);
  });
});
