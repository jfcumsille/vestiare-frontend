import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { BadgeStatus } from '@/interfaces/utilities/enums';
import GenericBadge from '@/components/GenericBadge.vue';

describe('GenericBadge', () => {
  it('renders props.text when passed', () => {
    const text = 'This is a badge';
    const wrapper = mount(GenericBadge, {
      props: { text, status: BadgeStatus.Success },
    });

    expect(wrapper.text()).toMatch(text);
  });

  it('renders a badge with no classes when status prop is invalid', () => {
    const invalidStatus = 'this is absolutely invalid as a status';
    const wrapper = mount(GenericBadge, {
      props: { text: 'Something', status: invalidStatus },
    });

    expect(wrapper.classes().some((cls) => cls.includes('bg-'))).toBe(false);
  });

  const testStatusClassRendering = (status: BadgeStatus, result: string) => {
    it(`renders a ${result} badge when status is ${status}`, () => {
      const wrapper = mount(GenericBadge, {
        props: { text: 'Something', status },
      });

      expect(wrapper.classes().filter((cls) => cls.includes(result)).length).toBe(2);
    });
  };

  const statusClassNames = [
    [BadgeStatus.Danger, 'danger'],
    [BadgeStatus.Success, 'success'],
    [BadgeStatus.Warning, 'warning'],
    [BadgeStatus.Main, 'primary'],
  ];

  statusClassNames.forEach(([status, result]) => testStatusClassRendering(status, result));
});
