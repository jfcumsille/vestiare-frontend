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
        textColor: 'something2',
        showName: true,
        bgColor: 'something',
        bgHoverColor: 'something',
        focusRingColor: 'something',
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
        textColor: 'something2',
        showName: true,
        bgColor: 'something',
        bgHoverColor: 'something',
        focusRingColor: 'something',
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
        textColor: 'something2',
        showName: true,
        bgColor: 'something',
        bgHoverColor: 'something',
        focusRingColor: 'something',
      },
    });

    const list = wrapper.find('[data-test="dropDownList"]');
    optionsText.forEach((option) => expect(list.text()).toContain(option));
  });

  it('renders name in button text if showName is true', () => {
    const textColor = 'white';
    const wrapper = mount(GenericDropDown, {
      props: {
        textColor,
        name: 'something',
        selected: 'something',
        options: ['something1', 'something2'],
        showName: true,
        bgColor: 'something',
        bgHoverColor: 'something',
        focusRingColor: 'something',
      },
    });

    const name = wrapper.find('[data-test="dropDownName"]');
    expect(name).toBeDefined();
  });

  it('doesnt renders name in button text if showName is false', () => {
    const textColor = 'white';
    const wrapper = mount(GenericDropDown, {
      props: {
        textColor,
        name: 'something',
        selected: 'something',
        options: ['something1', 'something2'],
        showName: false,
        bgColor: 'something',
        bgHoverColor: 'something',
        focusRingColor: 'something',
      },
    });

    const name = wrapper.find('[data-test="dropDownName"]');
    expect(name.exists()).toBe(false);
  });

  it('renders text color white when textColor is white', () => {
    const textColor = 'white';
    const wrapper = mount(GenericDropDown, {
      props: {
        textColor,
        name: 'something',
        selected: 'something',
        options: ['something1', 'something2'],
        showName: true,
        bgColor: 'something',
        bgHoverColor: 'something',
        focusRingColor: 'something',
      },
    });

    const button = wrapper.find('[data-test="dropDownButton"]');
    expect(button.classes().find((cls) => cls.includes('text-white'))).not.toBeUndefined();
  });

  it('renders background color blue-700 when bgColor is blue-700', () => {
    const bgColor = 'blue-700';
    const wrapper = mount(GenericDropDown, {
      props: {
        bgColor,
        name: 'something',
        selected: 'something',
        options: ['something1', 'something2'],
        showName: true,
        textColor: 'something',
        bgHoverColor: 'something',
        focusRingColor: 'something',
      },
    });

    const button = wrapper.find('[data-test="dropDownButton"]');
    expect(button.classes().find((cls) => cls.includes('bg-blue-700'))).not.toBeUndefined();
  });

  it('renders bg hover color blue-800 when bgColor is blue-800', () => {
    const bgHoverColor = 'blue-800';
    const wrapper = mount(GenericDropDown, {
      props: {
        bgHoverColor,
        name: 'something',
        selected: 'something',
        options: ['something1', 'something2'],
        showName: true,
        textColor: 'something',
        bgColor: 'something',
        focusRingColor: 'something',
      },
    });

    const button = wrapper.find('[data-test="dropDownButton"]');
    expect(button.classes().find((cls) => cls.includes('bg-blue-800'))).not.toBeUndefined();
  });

  it('renders focus ring color blue-300 when ring color is blue-300', () => {
    const focusRingColor = 'blue-300';
    const wrapper = mount(GenericDropDown, {
      props: {
        focusRingColor,
        name: 'something',
        selected: 'something',
        options: ['something1', 'something2'],
        showName: true,
        textColor: 'something',
        bgColor: 'something',
        bgHoverColor: 'something',
      },
    });

    const button = wrapper.find('[data-test="dropDownButton"]');
    expect(button.classes().find((cls) => cls.includes('ring-blue-300'))).not.toBeUndefined();
  });
});
