import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import TableHeader from '@/components/table/TableHeader.vue';
import TableFilter from '@/components/table/utils/TableFilter.vue';

describe('TableHeader', () => {
  it('renders TableFilter in slot when passed TableFilter', () => {
    const wrapper = shallowMount(TableHeader, {
      slots: {
        default: [TableFilter],
      },
    });
    const tableFilter = wrapper.findComponent(TableFilter);
    expect(tableFilter.exists()).toBe(true);
  });
});
