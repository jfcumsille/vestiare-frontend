import { mount } from '@vue/test-utils';
import GenericInput from '@/components/GenericInput.vue';

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
});
