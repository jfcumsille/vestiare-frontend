import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import GenericModal from '@/components/GenericModal.vue';

describe('GenericModal', () => {
  it('renders props.title when passed', () => {
    const title = 'This is a title';
    const wrapper = mount(GenericModal, {
      props: { title },
    });
    const modalTitle = wrapper.find('[data-test="modal-title"]');

    expect(modalTitle.text()).toMatch(title);
  });
});
