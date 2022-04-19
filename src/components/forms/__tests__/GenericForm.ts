import { SetupContext } from 'vue';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { useRegistration } from '@/composables/registration';
import GenericForm from '@/components/forms/GenericForm.vue';

const ExposedValid = {
  name: 'ExposedValid',
  setup(_: unknown, context: SetupContext) {
    context.expose({ valid: true });
  },
};

const ExposedInvalid = {
  name: 'ExposedInvalid',
  setup(_: unknown, context: SetupContext) {
    useRegistration();
    context.expose({ valid: false });
  },
};

describe('GenericForm', () => {
  it('shows as valid when everything inside it is valid', () => {
    const wrapper = mount(GenericForm, {
      slots: {
        default: [ExposedValid, ExposedValid],
      },
    });

    expect(wrapper.vm.valid).toBe(true);
  });

  it('shows as invalid when something inside it is invalid', () => {
    const wrapper = mount(GenericForm, {
      slots: {
        default: [ExposedValid, ExposedInvalid],
      },
    });

    expect(wrapper.vm.valid).toBe(false);
  });
});
