import { describe, it, expect } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { artificialWait } from '@/utils/tests/common';
import { SizeType } from '@/interfaces/utilities/enums';
import GenericTextArea from '@/components/forms/GenericTextArea.vue';

describe('GenericTextArea', () => {
  it('renders props.label when passed', () => {
    const labelText = 'This is a textarea label';
    const wrapper = mount(GenericTextArea, {
      props: { modelValue: '', label: labelText },
    });
    const label = wrapper.find('[data-test="label"]');

    expect(label.text()).toMatch(labelText);
  });

  it('doesn\'t render a label component when props.label isn\'t passed', () => {
    const wrapper = mount(GenericTextArea, {
      props: { modelValue: '' },
    });
    const label = wrapper.find('[data-test="label"]');

    expect(label.exists()).toBe(false);
  });

  it('renders props.placeholder when passed', () => {
    const placeholderText = 'This is a textarea placeholder';
    const wrapper = mount(GenericTextArea, {
      props: { modelValue: '', placeholder: placeholderText },
    });
    const textarea = wrapper.find('[data-test="textarea"]');

    expect(textarea.attributes().placeholder).toMatch(placeholderText);
  });

  it('renders props.modelValue when passed', () => {
    const textareaContent = 'This is the content of the textarea';
    const wrapper = mount(GenericTextArea, {
      props: { modelValue: textareaContent },
    });
    const textarea = wrapper.find('[data-test="textarea"]');

    expect((<HTMLInputElement>textarea.element).value).toMatch(textareaContent);
  });

  it('triggers an update event on the model value when it changes', () => {
    const originalTextareaContent = 'This is the original content of the textarea';
    const updatedTextareaContent = 'This is the updated content of the textarea';
    const wrapper = mount(GenericTextArea, {
      props: { modelValue: originalTextareaContent },
    });
    const textarea = wrapper.find('[data-test="textarea"]');

    expect((<HTMLInputElement>textarea.element).value).toMatch(originalTextareaContent);

    textarea.setValue(updatedTextareaContent);

    const emitted = <Array<Array<unknown>>>wrapper.emitted('update:modelValue');
    expect(emitted).toHaveLength(1);
    expect(emitted[0][0]).toMatch(updatedTextareaContent);
    expect((<HTMLInputElement>textarea.element).value).toMatch(updatedTextareaContent);
  });

  it('triggers an update event every time the model value changes', () => {
    const wrapper = mount(GenericTextArea, {
      props: { modelValue: 'First Content' },
    });
    const textarea = wrapper.find('[data-test="textarea"]');

    textarea.setValue('Second Content');
    textarea.setValue('Third Content');
    textarea.setValue('Fourth Content');

    expect(wrapper.emitted('update:modelValue')).toHaveLength(3);
  });

  it('starts rendering with no error', () => {
    const wrapper = mount(GenericTextArea, {
      props: {
        modelValue: '',
        validations: [
          (text: string) => !!text.trim() || 'EMPTY',
          (text: string) => text.includes('@') || '@ MISSING',
        ],
      },
    });
    const textarea = wrapper.find('[data-test="textarea"]');

    expect(textarea.classes().filter((cls) => cls.includes('danger')).length).toBe(0);
  });

  it('starts validating when on blur', async () => {
    const wrapper = mount(GenericTextArea, {
      props: {
        modelValue: '',
        validations: [
          (text: string) => !!text.trim() || 'EMPTY',
          (text: string) => text.includes('@') || '@ MISSING',
        ],
      },
    });
    const textarea = wrapper.find('[data-test="textarea"]');
    textarea.trigger('blur');

    // The validation takes 1 millisecond, so the validity
    // may be wrong for that milisecond
    await artificialWait();

    const textareaDiv = wrapper.find('[data-test="textarea-div"]');
    expect(textareaDiv.classes().some((cls) => cls.includes('danger'))).toBe(true);
    expect(wrapper.vm.valid).toBe(false);
  });

  const checkClasses = (wrapper: VueWrapper, classes: Array<string>) => {
    classes.forEach((className) => {
      expect(wrapper.classes()).toContain(className);
    });
  };

  const sizeTypes = {
    small: SizeType.Small,
    medium: SizeType.Medium,
    large: SizeType.Large,
    xlarge: SizeType.XLarge,
    inline: SizeType.Inline,
  } as Record<string, SizeType>;

  const sizeClasses = {
    small: ['max-w-50'],
    medium: ['max-w-80'],
    large: ['max-w-104'],
    xlarge: ['max-w-158'],
    inline: [],
  } as Record<string, string[]>;

  describe('renders correct size classes', () => {
    Object.keys(sizeClasses).forEach((key) => {
      const sizeType = sizeTypes[key];
      const wrapper = mount(GenericTextArea, {
        props: {
          size: sizeType,
        },
      });
      const buttonClasses = sizeClasses[key];
      it(`when SizeType is ${sizeType}`, () => {
        checkClasses(wrapper, buttonClasses);
      });
    });
  });
});
