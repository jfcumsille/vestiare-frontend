import {
  beforeAll, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { setActivePinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { mount, VueWrapper } from '@vue/test-utils';
import { setupLocales } from '@/locales';
import { mockCrypto } from '@/utils/tests/crypto';
import TablePagination from '@/components/table/TablePagination.vue';
import router from '@/router/index';

const testingPinia = createTestingPinia({ createSpy: vi.fn });

const getWrapper = (props: Record<string, unknown>) => {
  const wrapper = mount(TablePagination, {
    global: {
      plugins: [testingPinia, router],
    },
    props,
  });
  return wrapper;
};

describe('TablePagination', () => {
  beforeAll(() => {
    const { restore } = mockCrypto();

    return () => { restore(); };
  });

  beforeEach(() => {
    setActivePinia(testingPinia);
    setupLocales();
  });

  const getComponents = (wrapper: VueWrapper) => {
    const dropDown = wrapper.find('[data-test="pagination-dropdown"]');
    const resultText = wrapper.find('[data-test="pagination-result-text"]');
    const leftArrowButton = wrapper.find('[data-test="pagination-left-arrow-button"]');
    const firstPageButton = wrapper.find('[data-test="pagination-first-page-button"]');
    const leftEllipsis = wrapper.find('[data-test="pagination-left-ellipsis"]');
    const currentPageText = wrapper.find('[data-test="pagination-current-page"]');
    const rightEllipsis = wrapper.find('[data-test="pagination-right-ellipsis"]');
    const lastPageText = wrapper.find('[data-test="pagination-last-page"]');
    const rightArrowButton = wrapper.find('[data-test="pagination-right-arrow-button"]');
    return {
      dropDown,
      resultText,
      leftArrowButton,
      firstPageButton,
      leftEllipsis,
      currentPageText,
      rightEllipsis,
      lastPageText,
      rightArrowButton,
    };
  };

  describe('when currentPage starts at 1, pageSize is 30 and total results is 110', () => {
    const props = {
      loading: false,
      currentPage: 1,
      pageSize: 30,
      totalResults: 110,
      resultItemText: 'Links',
    };
    it('should show 30 on dropdown and \'of 110 Links\'', () => {
      const wrapper = getWrapper(props);
      const { dropDown, resultText } = getComponents(wrapper);
      expect(dropDown.exists()).toBe(true);
      expect(resultText.exists()).toBe(true);
      expect(dropDown.text()).toMatch('30');
      expect(resultText.text()).toMatch('of 110 Links');
    });
    it('shouldn\'t show first page button and left ellipsis', () => {
      const wrapper = getWrapper(props);
      const {
        leftArrowButton, firstPageButton, leftEllipsis,
        currentPageText, rightEllipsis, lastPageText, rightArrowButton,
      } = getComponents(wrapper);
      expect(leftArrowButton.exists()).toBe(true);
      expect(firstPageButton.exists()).toBe(false);
      expect(leftEllipsis.exists()).toBe(false);
      expect(currentPageText.exists()).toBe(true);
      expect(rightEllipsis.exists()).toBe(true);
      expect(lastPageText.exists()).toBe(true);
      expect(rightArrowButton.exists()).toBe(true);
    });
  });

  describe('when current page is 2, pageSize is 30 and total results is 110', () => {
    const props = {
      loading: false,
      currentPage: 2,
      pageSize: 30,
      totalResults: 110,
      resultItemText: 'Links',
    };
    it('shouldn\'t show left ellipsis (1 2 ... 4)', async () => {
      const wrapper = getWrapper(props);
      const {
        leftArrowButton, firstPageButton, leftEllipsis,
        currentPageText, rightEllipsis, lastPageText, rightArrowButton,
      } = getComponents(wrapper);
      expect(leftArrowButton.exists()).toBe(true);
      expect(firstPageButton.exists()).toBe(true);
      expect(firstPageButton.text()).toMatch('1');
      expect(leftEllipsis.exists()).toBe(false);
      expect(currentPageText.exists()).toBe(true);
      expect(currentPageText.text()).toMatch('2');
      expect(rightEllipsis.exists()).toBe(true);
      expect(lastPageText.exists()).toBe(true);
      expect(lastPageText.text()).toMatch('4');
      expect(rightArrowButton.exists()).toBe(true);
    });
  });

  describe('when current page is 3, pageSize is 30 and total results is 110', () => {
    const props = {
      loading: false,
      currentPage: 3,
      pageSize: 30,
      totalResults: 110,
      resultItemText: 'Links',
    };
    it('shouldn\'t show right ellipsis (1 ... 3 4)', async () => {
      const wrapper = getWrapper(props);
      const {
        leftArrowButton, firstPageButton, leftEllipsis,
        currentPageText, rightEllipsis, lastPageText, rightArrowButton,
      } = getComponents(wrapper);
      expect(leftArrowButton.exists()).toBe(true);
      expect(firstPageButton.exists()).toBe(true);
      expect(firstPageButton.text()).toMatch('1');
      expect(leftEllipsis.exists()).toBe(true);
      expect(currentPageText.exists()).toBe(true);
      expect(currentPageText.text()).toMatch('3');
      expect(rightEllipsis.exists()).toBe(false);
      expect(lastPageText.exists()).toBe(true);
      expect(lastPageText.text()).toMatch('4');
      expect(rightArrowButton.exists()).toBe(true);
    });
  });

  describe('when current page is 3, pageSize is 30 and total results is 140', () => {
    const props = {
      loading: false,
      currentPage: 3,
      pageSize: 30,
      totalResults: 140,
      resultItemText: 'Links',
    };
    it('should show all components (1 ... 3 ... 5)', async () => {
      const wrapper = getWrapper(props);
      const {
        leftArrowButton, firstPageButton, leftEllipsis,
        currentPageText, rightEllipsis, lastPageText, rightArrowButton,
      } = getComponents(wrapper);
      expect(leftArrowButton.exists()).toBe(true);
      expect(firstPageButton.exists()).toBe(true);
      expect(firstPageButton.text()).toMatch('1');
      expect(leftEllipsis.exists()).toBe(true);
      expect(currentPageText.exists()).toBe(true);
      expect(currentPageText.text()).toMatch('3');
      expect(rightEllipsis.exists()).toBe(true);
      expect(lastPageText.exists()).toBe(true);
      expect(lastPageText.text()).toMatch('5');
      expect(rightArrowButton.exists()).toBe(true);
    });
  });
});
