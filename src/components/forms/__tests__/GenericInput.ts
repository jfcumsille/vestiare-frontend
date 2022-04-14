import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { artificialWait } from '@/utils/tests';
import GenericInput from '@/components/forms/GenericInput.vue';

describe('GenericInput', () => {
  it('renders props.label when passed', () => {
    const labelText = 'This is an input label';
    const wrapper = mount(GenericInput, {
      props: { modelValue: '', label: labelText },
    });
    const label = wrapper.find('[data-test="label"]');

    expect(label.text()).toMatch(labelText);
  });

  it('doesn\'t render a label component when props.label isn\'t passed', () => {
    const wrapper = mount(GenericInput, {
      props: { modelValue: '' },
    });
    const label = wrapper.find('[data-test="label"]');

    expect(label.exists()).toBe(false);
  });

  it('renders props.placeholder when passed', () => {
    const placeholderText = 'This is an input placeholder';
    const wrapper = mount(GenericInput, {
      props: { modelValue: '', placeholder: placeholderText },
    });
    const input = wrapper.find('[data-test="input"]');

    expect(input.attributes().placeholder).toMatch(placeholderText);
  });

  it('renders props.modelValue when passed', () => {
    const inputText = 'This is the content of the input';
    const wrapper = mount(GenericInput, {
      props: { modelValue: inputText },
    });
    const input = wrapper.find('[data-test="input"]');

    expect((<HTMLInputElement>input.element).value).toMatch(inputText);
  });

  it('triggers an update event on the model value when it changes', () => {
    const originalInputText = 'This is the original content of the input';
    const updatedInputText = 'This is the updated content of the input';
    const wrapper = mount(GenericInput, {
      props: { modelValue: originalInputText },
    });
    const input = wrapper.find('[data-test="input"]');

    expect((<HTMLInputElement>input.element).value).toMatch(originalInputText);

    input.setValue(updatedInputText);

    const emitted = <Array<Array<unknown>>>wrapper.emitted('update:modelValue');
    expect(emitted).toHaveLength(1);
    expect(emitted[0][0]).toMatch(updatedInputText);
    expect((<HTMLInputElement>input.element).value).toMatch(updatedInputText);
  });

  it('triggers an update event every time the model value changes', () => {
    const wrapper = mount(GenericInput, {
      props: { modelValue: 'First Content' },
    });
    const input = wrapper.find('[data-test="input"]');

    input.setValue('Second Content');
    input.setValue('Third Content');
    input.setValue('Fourth Content');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(3);
  });

  it('starts rendering with no error', () => {
    const wrapper = mount(GenericInput, {
      props: {
        modelValue: '',
        validations: [
          (text: string) => !!text.trim() || 'EMPTY',
          (text: string) => text.includes('@') || '@ MISSING',
        ],
      },
    });
    const input = wrapper.find('[data-test="input"]');

    expect(input.classes().filter((cls) => cls.includes('red')).length).toBe(0);
  });

  it('starts validating when on blur', async () => {
    const wrapper = mount(GenericInput, {
      props: {
        modelValue: '',
        validations: [
          (text: string) => !!text.trim() || 'EMPTY',
          (text: string) => text.includes('@') || '@ MISSING',
        ],
      },
    });
    const input = wrapper.find('[data-test="input"]');
    input.trigger('blur');

    // The validation takes 1 millisecond, so the validity
    // may be wrong for that milisecond
    await artificialWait();

    expect(input.classes().some((cls) => cls.includes('red'))).toBe(true);
    expect(wrapper.vm.valid).toBe(false);
  });
});
