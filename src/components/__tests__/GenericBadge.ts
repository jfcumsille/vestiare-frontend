import { mount } from '@vue/test-utils';
import GenericBadge from '@/components/GenericBadge.vue';

describe('GenericBadge', () => {
  it('renders props.text when passed', () => {
    const text = 'This is a badge';
    const wrapper = mount(GenericBadge, {
      props: { text, color: 'blue' },
    });

    expect(wrapper.text()).toMatch(text);
  });

  it('renders a badge with no color when color prop is invalid', () => {
    const invalidColor = 'this is absolutely invalid as a color';
    const wrapper = mount(GenericBadge, {
      props: { text: 'Something', color: invalidColor },
    });

    expect(wrapper.classes().some((cls) => cls.includes('bg-'))).toBe(false);
  });

  const testColorRendering = (color: string) => {
    it(`renders a ${color} badge when color is ${color}`, () => {
      const wrapper = mount(GenericBadge, {
        props: { text: 'Something', color },
      });

      expect(wrapper.classes().filter((cls) => cls.includes(color)).length).toBe(2);
    });
  };

  const colors = [
    'blue', 'gray', 'red', 'green', 'yellow', 'indigo', 'purple', 'pink',
  ];

  colors.forEach((color) => testColorRendering(color));
});
