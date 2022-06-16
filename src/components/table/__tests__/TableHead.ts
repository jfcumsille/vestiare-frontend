import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TableHead from '@/components/table/TableHead.vue';
import TableHeader from '@/components/table/TableHeader.vue';

describe('TableHead', () => {
  it('renders TableHeader in slot when passed TableHeader', () => {
    const wrapper = mount(TableHead, {
      slots: {
        default: [TableHeader],
      },
    });
    const tableHeader = wrapper.findComponent(TableHeader);
    expect(tableHeader.exists()).toBe(true);
  });
});
