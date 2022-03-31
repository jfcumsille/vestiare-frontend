import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import GenericDropDown from '@/components/GenericDropDown.vue';

describe('GenericDropDown', () => {
  it('renders props.selected when passed', () => {
    const selectedText = 'Chile';
    const wrapper = mount(GenericDropDown, {
      props: {
        selected: selectedText,
        textPrefix: 'something',
        options: ['something1', 'something2'],
        isColorPrimary: true,
      },
    });

    expect(wrapper.text()).toMatch(selectedText);
  });

  it('renders props.options when passed', () => {
    const optionsText = ['Chile', 'México'];
    const wrapper = mount(GenericDropDown, {
      props: {
        options: optionsText,
        textPrefix: 'something',
        selected: 'something',
        isColorPrimary: true,
      },
    });

    const list = wrapper.find('[data-test="drop-down-list"]');
    optionsText.forEach((option) => expect(list.text()).toContain(option));
  });

  it('renders props.textPrefix when passed', () => {
    const wrapper = mount(GenericDropDown, {
      props: {
        textPrefix: 'something',
        selected: 'something',
        options: ['something1', 'something2'],
        isColorPrimary: true,
      },
    });

    const textPrefix = wrapper.find('[data-test="drop-down-text-prefix"]');
    expect(textPrefix).toBeDefined();
  });

  it('doesn\'t render prefix when props.textPrefix is not passed', () => {
    const wrapper = mount(GenericDropDown, {
      props: {
        selected: 'something',
        options: ['something1', 'something2'],
        isColorPrimary: true,
      },
    });

    const textPrefix = wrapper.find('[data-test="drop-down-text-prefix"]');
    expect(textPrefix.exists()).toBe(false);
  });

  it('renders default white colors for button when isPrimaryColor is false', () => {
    const wrapper = mount(GenericDropDown, {
      props: {
        textPrefix: 'something',
        selected: 'something',
        options: ['something1', 'something2'],
        isColorPrimary: false,
      },
    });

    const button = wrapper.find('[data-test="drop-down-button"]');
    expect(button.classes().find((cls) => cls.includes('text-body-txt-color'))).not.toBeUndefined();
    expect(button.classes().find((cls) => cls.includes('bg-white'))).not.toBeUndefined();
    expect(button.classes().find((cls) => cls.includes('bg-gray-100'))).not.toBeUndefined();
    expect(button.classes().find((cls) => cls.includes('bg-gray-300'))).not.toBeUndefined();
    expect(button.classes().find((cls) => cls.includes('border-slate-300'))).not.toBeUndefined();
  });

  it('renders primary colors for button when isPrimaryColor is true', () => {
    const wrapper = mount(GenericDropDown, {
      props: {
        textPrefix: 'something',
        selected: 'something',
        options: ['something1', 'something2'],
        isColorPrimary: true,
      },
    });

    const button = wrapper.find('[data-test="drop-down-button"]');
    expect(button.classes().find((cls) => cls.includes('text-white'))).not.toBeUndefined();
    expect(button.classes().find((cls) => cls.includes('bg-primary-main'))).not.toBeUndefined();
    expect(button.classes().find((cls) => cls.includes('bg-primary-main-hover'))).not.toBeUndefined();
    expect(button.classes().find((cls) => cls.includes('ring-primary-border'))).not.toBeUndefined();
    expect(button.classes().find((cls) => cls.includes('border-primary-border'))).not.toBeUndefined();
  });
});
