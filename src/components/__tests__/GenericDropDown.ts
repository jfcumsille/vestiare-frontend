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
      },
    });

    const list = wrapper.find('[data-test="drop-down-list"]');
    optionsText.forEach((option) => expect(list.text()).toContain(option));
  });

  it('renders props.options when is DropdownOption', () => {
    const options = [{ value: 'cl', label: 'Chile' }, { value: 'mx', label: 'México' }];
    const wrapper = mount(GenericDropDown, {
      props: {
        options,
        textPrefix: 'something',
        selected: 'something',
      },
    });

    const list = wrapper.find('[data-test="drop-down-list"]');
    options.forEach((option) => expect(list.text()).toContain(option.label));
  });

  it('renders props.textPrefix when passed', () => {
    const wrapper = mount(GenericDropDown, {
      props: {
        textPrefix: 'something',
        selected: 'something',
        options: ['something1', 'something2'],
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
      },
    });

    const textPrefix = wrapper.find('[data-test="drop-down-text-prefix"]');
    expect(textPrefix.exists()).toBe(false);
  });

  it('disabled button when props.disabled is true', () => {
    const wrapper = mount(GenericDropDown, {
      props: {
        selected: 'something',
        options: ['something1', 'something2'],
        disabled: true,
      },
    });

    const dropdownButton = wrapper.find('[data-test="drop-down-button"]');
    const dropdownLockIcon = wrapper.find('[data-test="drop-down-lock-icon"]');
    expect(dropdownLockIcon.exists()).toBe(true);
    expect(dropdownButton.classes()).toContain('disabled:bg-light-gray');
  });
});
