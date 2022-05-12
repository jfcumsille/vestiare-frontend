import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TableHeader from '@/components/table/TableHeader.vue';
import TableFilter from '@/components/table/utils/TableFilter.vue';

describe('TableHead', () => {
  it('renders TableHeader in slot when passed TableHeader', () => {
    const wrapper = mount(TableHeader, {
      slots: {
        default: [TableFilter],
      },
    });
    const tableFilter = wrapper.findComponent(TableFilter);
    expect(tableFilter.exists()).toBe(true);
  });
});
