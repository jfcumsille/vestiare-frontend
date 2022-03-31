import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import GenericTableHeader from '@/components/GenericTableHeader.vue';

describe('GenericTableHeader', () => {
  it('renders all props.headers', () => {
    const headers = ['header1', 'header2', 'header3'];
    const wrapper = mount(GenericTableHeader, {
      props: { headers },
    });
    headers.forEach((header) => expect(wrapper.text()).toContain(header));
  });
});
