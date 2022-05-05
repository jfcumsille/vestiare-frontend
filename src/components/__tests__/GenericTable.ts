import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import GenericTable from '@/components/table/GenericTable.vue';

describe('GenericTable', () => {
  it('renders header and content slots when passed both', () => {
    const wrapper = mount(GenericTable, {
      slots: {
        header: '<div>Header</div>',
        content: '<div>Content</div>',
      },
    });
    expect(wrapper.html()).toContain('<div>Header</div>');
    expect(wrapper.html()).toContain('<div>Content</div>');
  });

  it('only renders header slot when only passed <template #header>', () => {
    const wrapper = mount(GenericTable, {
      slots: {
        header: '<div>Header</div>',
      },
    });
    expect(wrapper.html()).toContain('<div>Header</div>');
    expect(wrapper.html()).not.toContain('<div>Content</div>');
  });

  it('only renders content slot when only passed <template #content>', () => {
    const wrapper = mount(GenericTable, {
      slots: {
        content: '<div>Content</div>',
      },
    });
    expect(wrapper.html()).not.toContain('<div>Header</div>');
    expect(wrapper.html()).toContain('<div>Content</div>');
  });
});
