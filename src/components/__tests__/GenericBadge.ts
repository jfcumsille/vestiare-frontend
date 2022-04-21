import { describe, it, expect } from 'vitest';
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

  const testColorRendering = (color: string, result: string) => {
    it(`renders a ${result} badge when color is ${color}`, () => {
      const wrapper = mount(GenericBadge, {
        props: { text: 'Something', color },
      });

      expect(wrapper.classes().filter((cls) => cls.includes(result)).length).toBe(2);
    });
  };

  const colors = [
    ['red', 'danger'], ['green', 'success'], ['yellow', 'yellow'],
  ];

  colors.forEach(([color, result]) => testColorRendering(color, result));
});
