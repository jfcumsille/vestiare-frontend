import { mount } from '@vue/test-utils';
import GenericDropDown from '@/components/GenericDropDown.vue';

describe('GenericDropDown', () => {
  it('renders props.name when passed', () => {
    const name = 'Country';
    const wrapper = mount(GenericDropDown, {
      props: {
        name,
        selected: 'something',
        options: ['something1', 'something2'],
        showName: true,
        isColorPrimary: true,
      },
    });

    expect(wrapper.text()).toMatch(name);
  });

  it('renders props.selected when passed', () => {
    const selectedText = 'Chile';
    const wrapper = mount(GenericDropDown, {
      props: {
        selected: selectedText,
        name: 'something',
        options: ['something1', 'something2'],
        showName: true,
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
        name: 'something',
        selected: 'something',
        showName: true,
        isColorPrimary: true,
      },
    });

    const list = wrapper.find('[data-test="dropDownList"]');
    optionsText.forEach((option) => expect(list.text()).toContain(option));
  });

  it('renders name in button text if showName is true', () => {
    const wrapper = mount(GenericDropDown, {
      props: {
        name: 'something',
        selected: 'something',
        options: ['something1', 'something2'],
        showName: true,
        isColorPrimary: true,
      },
    });

    const name = wrapper.find('[data-test="dropDownName"]');
    expect(name).toBeDefined();
  });

  it('doesnt renders name in button text if showName is false', () => {
    const wrapper = mount(GenericDropDown, {
      props: {
        name: 'something',
        selected: 'something',
        options: ['something1', 'something2'],
        showName: false,
        isColorPrimary: true,
      },
    });

    const name = wrapper.find('[data-test="dropDownName"]');
    expect(name.exists()).toBe(false);
  });

  it('renders default white colors for button when isPrimaryColor is false', () => {
    const wrapper = mount(GenericDropDown, {
      props: {
        name: 'something',
        selected: 'something',
        options: ['something1', 'something2'],
        showName: true,
        isColorPrimary: false,
      },
    });

    const button = wrapper.find('[data-test="dropDownButton"]');
    expect(button.classes().find((cls) => cls.includes('text-txt-body'))).not.toBeUndefined();
    expect(button.classes().find((cls) => cls.includes('bg-white'))).not.toBeUndefined();
    expect(button.classes().find((cls) => cls.includes('bg-gray-100'))).not.toBeUndefined();
    expect(button.classes().find((cls) => cls.includes('bg-gray-300'))).not.toBeUndefined();
    expect(button.classes().find((cls) => cls.includes('border-slate-300'))).not.toBeUndefined();
  });

  it('renders primary colors for button when isPrimaryColor is true', () => {
    const wrapper = mount(GenericDropDown, {
      props: {
        name: 'something',
        selected: 'something',
        options: ['something1', 'something2'],
        showName: true,
        isColorPrimary: true,
      },
    });

    const button = wrapper.find('[data-test="dropDownButton"]');
    expect(button.classes().find((cls) => cls.includes('text-white'))).not.toBeUndefined();
    expect(button.classes().find((cls) => cls.includes('bg-primary-main'))).not.toBeUndefined();
    expect(button.classes().find((cls) => cls.includes('bg-primary-main-hover'))).not.toBeUndefined();
    expect(button.classes().find((cls) => cls.includes('ring-primary-border'))).not.toBeUndefined();
    expect(button.classes().find((cls) => cls.includes('border-primary-border'))).not.toBeUndefined();
  });
});
