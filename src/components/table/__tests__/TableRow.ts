import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TableRow from '@/components/table/TableRow.vue';
import TableData from '@/components/table/TableData.vue';

describe('TableRow', () => {
  it('renders TablaData in slot when passed TablaData', () => {
    const wrapper = mount(TableRow, {
      slots: {
        default: [TableData],
      },
    });
    const tableData = wrapper.findComponent(TableData);
    expect(tableData.exists()).toBe(true);
  });
});
