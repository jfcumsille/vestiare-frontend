import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import GenericToggle from '@/components/GenericToggle.vue';

describe('GenericToggle', () => {
  it('renders ball to the right when props.active is true', () => {
    const wrapper = mount(GenericToggle, {
      props: { active: true },
    });
    const ball = wrapper.find('[data-test="ball"]');

    expect(ball.classes('translate-x-full')).toBe(true);
  });

  it('renders pill blue when props.active is true', () => {
    const wrapper = mount(GenericToggle, {
      props: { active: true },
    });
    const pill = wrapper.find('[data-test="pill"]');

    expect(pill.classes().find((cls) => cls.includes('bg-blue'))).not.toBeUndefined();
  });

  it('renders ball to the left when props.active is true', () => {
    const wrapper = mount(GenericToggle, {
      props: { active: false },
    });
    const ball = wrapper.find('[data-test="ball"]');

    expect(ball.classes('translate-x-full')).toBe(false);
  });

  it('renders pill blue when props.active is true', () => {
    const wrapper = mount(GenericToggle, {
      props: { active: false },
    });
    const pill = wrapper.find('[data-test="pill"]');

    expect(pill.classes().find((cls) => cls.includes('bg-blue'))).toBeUndefined();
  });

  it('triggers an event when the component is clicked while not loading', () => {
    const wrapper = mount(GenericToggle, {
      props: { active: true, loading: false },
    });

    wrapper.trigger('click');

    expect(wrapper.emitted('toggle')).toHaveLength(1);
  });

  it('renders component opaque and with no cursor feedback when loading', () => {
    const wrapper = mount(GenericToggle, {
      props: { active: true, loading: true },
    });

    expect(wrapper.classes('cursor-default')).toBe(true);
    expect(wrapper.classes().find((cls) => cls.includes('opacity'))).not.toBeUndefined();
  });

  it('doesn\'t trigger an event when the component is clicked while loading', () => {
    const wrapper = mount(GenericToggle, {
      props: { active: true, loading: true },
    });

    wrapper.trigger('click');

    expect(wrapper.emitted('toggle')).toBeUndefined();
  });
});
