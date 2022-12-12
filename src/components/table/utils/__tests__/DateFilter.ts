import {
  beforeEach, describe, it, expect, vi,
} from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import DateFilter from '@/components/table/utils/DateFilter.vue';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const getWrapper = () => {
  const wrapper = mount(DateFilter, {
    global: {
      plugins: [testingPinia],
    },
    props: { label: 'Date is:', opened: true },
  });
  return wrapper;
};

describe('DateFilter', () => {
  beforeEach(() => {
    setActivePinia(testingPinia);
    setupLocales();
  });

  it('isDisabled is false when since and until dates are valid', () => {
    const wrapper = getWrapper();

    const date = new Date(2022, 1, 10, 1);
    vi.setSystemTime(date);

    wrapper.vm.sinceDay = '01';
    wrapper.vm.sinceMonth = '01';
    wrapper.vm.sinceYear = '2022';
    wrapper.vm.sinceHour = '00:00';
    wrapper.vm.untilDay = '01';
    wrapper.vm.untilMonth = '08';
    wrapper.vm.untilYear = '2022';
    wrapper.vm.untilHour = '00:00';

    expect(wrapper.vm.isDisabled).toBe(false);
  });

  it('isDisabled is true because sinceDateTime is bigger than untilDateTime', () => {
    const wrapper = getWrapper();

    const date = new Date(2022, 1, 10, 1);
    vi.setSystemTime(date);

    wrapper.vm.sinceDay = '01';
    wrapper.vm.sinceMonth = '06';
    wrapper.vm.sinceYear = '2022';
    wrapper.vm.sinceHour = '00:00';
    wrapper.vm.untilDay = '01';
    wrapper.vm.untilMonth = '04';
    wrapper.vm.untilYear = '2022';
    wrapper.vm.untilHour = '00:00';

    expect(wrapper.vm.isDisabled).toBe(true);
  });

  it('isDisabled is true because untilDateTime is bigger than currentDate', () => {
    const wrapper = getWrapper();

    const date = new Date(2022, 1, 10, 1);
    vi.setSystemTime(date);

    wrapper.vm.sinceDay = '01';
    wrapper.vm.sinceMonth = '01';
    wrapper.vm.sinceYear = '2022';
    wrapper.vm.sinceHour = '00:00';
    wrapper.vm.untilDay = '01';
    wrapper.vm.untilMonth = '11';
    wrapper.vm.untilYear = '2022';
    wrapper.vm.untilHour = '00:00';

    expect(wrapper.vm.isDisabled).toBe(true);
  });

  it('isDisabled is true because any datetime is NaN', () => {
    const wrapper = getWrapper();

    const date = new Date(2022, 1, 10, 1);
    vi.setSystemTime(date);

    wrapper.vm.sinceDay = 'xx';
    wrapper.vm.sinceMonth = 'xx';
    wrapper.vm.sinceYear = 'xx';
    wrapper.vm.sinceHour = '00:00';
    wrapper.vm.untilDay = 'xx';
    wrapper.vm.untilMonth = 'xx';
    wrapper.vm.untilYear = 'xx';
    wrapper.vm.untilHour = '00:00';

    expect(wrapper.vm.isDisabled).toBe(true);
  });
});
