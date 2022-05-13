import { describe, it, expect } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { artificialWait } from '@/utils/tests/common';
import { SizeType } from '@/interfaces/utilities/enums';
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

    expect(input.classes().filter((cls) => cls.includes('danger')).length).toBe(0);
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

    const inputDiv = wrapper.find('[data-test="input-div"]');
    expect(inputDiv.classes().some((cls) => cls.includes('danger'))).toBe(true);
    expect(wrapper.vm.valid).toBe(false);

    const hint = wrapper.find('[data-test="input-hint"]');
    expect(hint.exists()).toBe(true);
  });

  describe('when a valid left icon name is passed as a prop', () => {
    it('returns correct components', () => {
      const wrapper = mount(GenericInput, {
        props: {
          leftIconName: 'eye',
        },
      });
      const iconLeft = wrapper.find('[data-test="generic-input-icon-left"]');
      const iconRight = wrapper.find('[data-test="generic-input-icon-right"]');
      expect(iconLeft.exists()).toBe(true);
      expect(iconRight.exists()).toBe(false);
    });
  });

  describe('when a valid right icon name is passed as a prop', () => {
    it('returns correct components', () => {
      const wrapper = mount(GenericInput, {
        props: {
          rightIconName: 'eye',
        },
      });
      const iconLeft = wrapper.find('[data-test="generic-input-icon-left"]');
      const iconRight = wrapper.find('[data-test="generic-input-icon-right"]');
      expect(iconLeft.exists()).toBe(false);
      expect(iconRight.exists()).toBe(true);
    });
  });

  describe('when a hint is passed as a prop', () => {
    it('returns correct components', () => {
      const wrapper = mount(GenericInput, {
        props: {
          hint: 'this is a hint',
        },
      });
      const hint = wrapper.find('[data-test="input-hint"]');
      expect(hint.exists()).toBe(true);
    });
  });

  describe('when a right link is passed as a prop', () => {
    it('returns correct components', () => {
      const wrapper = mount(GenericInput, {
        props: {
          rightText: 'this is the right text',
          rightHref: 'this is the right href',
        },
      });
      const rightHref = wrapper.find('[data-test="input-right-href"]');
      expect(rightHref.exists()).toBe(true);
    });
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
      const wrapper = mount(GenericInput, {
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
