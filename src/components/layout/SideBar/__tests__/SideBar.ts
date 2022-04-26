import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { useConfigStore } from '@/stores/config';
import { setupLocales } from '@/locales';
import router from '@/router/index';
import { Mode } from '@/interfaces/utilities/enums';
import SideBar from '@/components/layout/SideBar/SideBar.vue';

const getWrapper = () => {
  const wrapper = mount(SideBar, {
    global: {
      plugins: [router],
    },
  });
  return wrapper;
};

describe('SideBar', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    setupLocales();
  });

  const testModeDropdown = (mode: Mode) => {
    it('shows correct label on mode dropdown', () => {
      const wrapper = getWrapper();
      const modeDropdown = wrapper.find('[data-test="mode-dropdown"]');
      expect(modeDropdown.exists()).toBe(true);
      const dropdownValue = modeDropdown.find('[data-test="drop-down-value"]');
      expect(dropdownValue.text()).toBe(mode);
    });
  };

  const testSideBarLinks = () => {
    const testLinksRendering = (dataTest: string, href: string) => {
      it(`shows ${dataTest} with href: ${href}`, () => {
        const wrapper = getWrapper();
        const linksLink = wrapper.find(`[data-test="${dataTest}"]`);
        expect(linksLink.exists()).toBe(true);
        expect(linksLink.attributes('href')).toEqual(href);
      });
    };

    const linksToRender = [['links-link', '/links'], ['api-keys-link', '/api-keys'], ['webhook-endpoints-link', '/webhook-endpoints']];
    linksToRender.forEach(([dataTest, href]) => testLinksRendering(dataTest, href));
  };

  describe('when live mode', () => {
    let configStore;
    beforeEach(() => {
      configStore = useConfigStore();
      configStore.mode = Mode.Live;
    });
    testModeDropdown(Mode.Live);
    testSideBarLinks();
  });

  describe('when test mode', () => {
    let configStore;
    beforeEach(() => {
      configStore = useConfigStore();
      configStore.mode = Mode.Test;
    });
    testModeDropdown(Mode.Test);
    testSideBarLinks();
  });
});
