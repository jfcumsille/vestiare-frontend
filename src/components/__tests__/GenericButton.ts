import { mount, VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { ButtonType, SizeType, HorizontalPositionType } from '@/interfaces/utilities/enums';
import GenericButton from '@/components/GenericButton.vue';
import CopyIcon from '@/assets/svg/CopyIcon.vue';
import ChevronDown from '@/assets/svg/ChevronDown.vue';
import CrossIcon from '@/assets/svg/CrossIcon.vue';
import EyeIcon from '@/assets/svg/EyeIcon.vue';
import EyeClosedIcon from '@/assets/svg/EyeClosedIcon.vue';
import GoogleLogo from '@/assets/svg/auth/GoogleLogo.vue';
import GithubLogo from '@/assets/svg/auth/GithubLogo.vue';
import MenuIcon from '@/assets/svg/MenuIcon.vue';
import ThreeDots from '@/assets/svg/ThreeDots.vue';

describe('GenericButton', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('when image name is \'copy\'', () => {
    it('returns CopyIcon', () => {
      const wrapper = mount(GenericButton, {
        props: { imageName: 'copy' },
      });
      expect(wrapper.findComponent(CopyIcon).exists()).toBe(true);
    });
  });

  describe('when image name is \'chevron_down\'', () => {
    it('returns ChevronDown', () => {
      const wrapper = mount(GenericButton, {
        props: { imageName: 'chevron_down' },
      });
      expect(wrapper.findComponent(ChevronDown).exists()).toBe(true);
    });
  });

  describe('when image name is \'cross\'', () => {
    it('returns CrossIcon', () => {
      const wrapper = mount(GenericButton, {
        props: { imageName: 'cross' },
      });
      expect(wrapper.findComponent(CrossIcon).exists()).toBe(true);
    });
  });

  describe('when image name is \'menu\'', () => {
    it('returns MenuIcon', () => {
      const wrapper = mount(GenericButton, {
        props: { imageName: 'menu' },
      });
      expect(wrapper.findComponent(MenuIcon).exists()).toBe(true);
    });
  });

  describe('when image name is \'auth_google\'', () => {
    it('returns GoogleLogo', () => {
      const wrapper = mount(GenericButton, {
        props: { imageName: 'auth_google' },
      });
      expect(wrapper.findComponent(GoogleLogo).exists()).toBe(true);
    });
  });

  describe('when image name is \'auth_github\'', () => {
    it('returns GithubLogo', () => {
      const wrapper = mount(GenericButton, {
        props: { imageName: 'auth_github' },
      });
      expect(wrapper.findComponent(GithubLogo).exists()).toBe(true);
    });
  });

  describe('when image name is \'three_dots\'', () => {
    it('returns ThreeDots', () => {
      const wrapper = mount(GenericButton, {
        props: { imageName: 'three_dots' },
      });
      expect(wrapper.findComponent(ThreeDots).exists()).toBe(true);
    });
  });

  describe('when image name is \'eye\'', () => {
    it('returns EyeIcon', () => {
      const wrapper = mount(GenericButton, {
        props: { imageName: 'eye' },
      });
      expect(wrapper.findComponent(EyeIcon).exists()).toBe(true);
    });
  });

  describe('when image name is \'eye_closed\'', () => {
    it('returns EyeClosedIcon', () => {
      const wrapper = mount(GenericButton, {
        props: { imageName: 'eye_closed' },
      });
      expect(wrapper.findComponent(EyeClosedIcon).exists()).toBe(true);
    });
  });

  const checkClasses = (wrapper: VueWrapper, classes: Array<string>) => {
    classes.forEach((className) => {
      expect(wrapper.classes()).toContain(className);
    });
  };

  describe('when ButtonType is \'Primary\'', () => {
    it('returns correct classes', () => {
      const wrapper = mount(GenericButton, {
        props: { type: ButtonType.Primary },
      });
      const colorClasses = [
        'bg-primary-main',
        'text-white',
        'hover:bg-primary-hover',
        'focus:bg-primary-main',
        'focus:ring',
        'focus:ring-primary-focus',
        'active:bg-primary-pressed',
        'active:ring-0',
      ];
      checkClasses(wrapper, colorClasses);
    });
  });

  describe('when ButtonType is \'Secondary\'', () => {
    it('returns correct classes', () => {
      const wrapper = mount(GenericButton, {
        props: { type: ButtonType.Secondary },
      });
      const colorClasses = [
        'bg-primary-surface',
        'text-primary-main',
        'hover:bg-primary-surface',
        'hover:text-primary-hover',
        'focus:bg-primary-surface',
        'focus:ring',
        'focus:ring-primary-focus',
        'focus:text-primary-hover',
        'active:bg-primary-surface',
        'active:text-primary-pressed',
      ];
      checkClasses(wrapper, colorClasses);
    });
  });

  describe('when ButtonType is \'Outline\'', () => {
    it('returns correct classes', () => {
      const wrapper = mount(GenericButton, {
        props: { type: ButtonType.Outline },
      });
      const colorClasses = [
        'bg-transparent',
        'border-border-color',
        'border-1',
        'text-primary-main',
        'hover:bg-transparent',
        'hover:text-primary-hover',
        'focus:bg-transparent',
        'focus:ring',
        'focus:ring-primary-focus',
        'focus:text-primary-hover',
        'active:bg-transparent',
        'active:text-primary-pressed',
        'active:ring-0',
      ];
      checkClasses(wrapper, colorClasses);
    });
  });

  describe('when ButtonType is \'Outline\'', () => {
    it('returns correct classes', () => {
      const wrapper = mount(GenericButton, {
        props: { type: ButtonType.Outline },
      });
      const colorClasses = [
        'bg-transparent',
        'text-primary-main',
        'hover:bg-transparent',
        'hover:text-primary-hover',
        'focus:bg-transparent',
        'focus:ring',
        'focus:ring-primary-focus',
        'focus:text-primary-hover',
        'active:bg-transparent',
        'active:text-primary-pressed',
        'active:ring-0',
      ];
      checkClasses(wrapper, colorClasses);
    });
  });

  describe('when ButtonType is \'Danger\'', () => {
    it('returns correct classes', () => {
      const wrapper = mount(GenericButton, {
        props: { type: ButtonType.Danger },
      });
      const colorClasses = [
        'bg-danger-main',
        'text-white',
        'hover:bg-danger-hover',
        'focus:bg-danger-main',
        'focus:ring',
        'focus:ring-danger-focus',
        'active:bg-danger-pressed',
        'active:ring-0',
      ];
      checkClasses(wrapper, colorClasses);
    });
  });

  describe('when SizeType is \'Inline\'', () => {
    it('returns correct classes', () => {
      const wrapper = mount(GenericButton, {
        props: {
          size: SizeType.Inline,
          text: 'button text',
        },
      });
      const sizeClasses = [
        'text-base',
        'inline-block',
        'disabled:bg-transparent',
      ];
      checkClasses(wrapper, sizeClasses);
    });
  });

  describe('when SizeType is \'Small\'', () => {
    it('returns correct classes', () => {
      const wrapper = mount(GenericButton, {
        props: {
          size: SizeType.Small,
          text: 'button text',
        },
      });
      const sizeClasses = [
        'flex',
        'py-2',
        'px-3',
        'h-7.5',
        'text-sm',
      ];
      checkClasses(wrapper, sizeClasses);
    });
  });

  describe('when SizeType is \'Regular\'', () => {
    it('returns correct classes', () => {
      const wrapper = mount(GenericButton, {
        props: {
          size: SizeType.Regular,
          text: 'button text',
        },
      });
      const sizeClasses = [
        'flex',
        'p-3.5',
        'text-base',
        'h-11',
      ];
      checkClasses(wrapper, sizeClasses);
    });
  });

  describe('when SizeType is \'Large\'', () => {
    it('returns correct classes', () => {
      const wrapper = mount(GenericButton, {
        props: {
          size: SizeType.Large,
          text: 'button text',
        },
      });
      const sizeClasses = [
        'flex',
        'py-4',
        'px-6',
        'text-lg',
        'h-12.5',
      ];
      checkClasses(wrapper, sizeClasses);
    });
  });

  describe('when text is passed as a prop and no image name', () => {
    it('returns correct classes', () => {
      const wrapper = mount(GenericButton, {
        props: {
          type: ButtonType.Primary,
          text: 'button text',
        },
      });
      const text = wrapper.find('[data-test="generic-button-text"]');
      const imageLeft = wrapper.find('[data-test="generic-button-image-left"]');
      const imageRight = wrapper.find('[data-test="generic-button-image-right"]');
      const onlyImage = wrapper.find('[data-test="generic-button-only-image"]');
      expect(text.exists()).toBe(true);
      expect(imageLeft.exists()).toBe(false);
      expect(imageRight.exists()).toBe(false);
      expect(onlyImage.exists()).toBe(false);
    });
  });

  describe('when text, a valid image name, and no image position is passed as a prop', () => {
    it('returns correct classes', () => {
      const wrapper = mount(GenericButton, {
        props: {
          type: ButtonType.Primary,
          text: 'button text',
          imageName: 'copy',
        },
      });
      const text = wrapper.find('[data-test="generic-button-text"]');
      const imageLeft = wrapper.find('[data-test="generic-button-image-left"]');
      const imageRight = wrapper.find('[data-test="generic-button-image-right"]');
      const onlyImage = wrapper.find('[data-test="generic-button-only-image"]');
      expect(text.exists()).toBe(true);
      expect(imageLeft.exists()).toBe(true);
      expect(imageRight.exists()).toBe(false);
      expect(onlyImage.exists()).toBe(false);
    });
  });

  describe('when text, a valid image name, and left image position is passed as a prop', () => {
    it('returns correct classes', () => {
      const wrapper = mount(GenericButton, {
        props: {
          type: ButtonType.Primary,
          text: 'button text',
          imageName: 'copy',
          imagePosition: HorizontalPositionType.Left,
        },
      });
      const text = wrapper.find('[data-test="generic-button-text"]');
      const imageLeft = wrapper.find('[data-test="generic-button-image-left"]');
      const imageRight = wrapper.find('[data-test="generic-button-image-right"]');
      const onlyImage = wrapper.find('[data-test="generic-button-only-image"]');
      expect(text.exists()).toBe(true);
      expect(imageLeft.exists()).toBe(true);
      expect(imageRight.exists()).toBe(false);
      expect(onlyImage.exists()).toBe(false);
    });
  });

  describe('when text, a valid image name, and right image position is passed as a prop', () => {
    it('returns correct classes', () => {
      const wrapper = mount(GenericButton, {
        props: {
          type: ButtonType.Primary,
          text: 'button text',
          imageName: 'copy',
          imagePosition: HorizontalPositionType.Right,
        },
      });
      const text = wrapper.find('[data-test="generic-button-text"]');
      const imageLeft = wrapper.find('[data-test="generic-button-image-left"]');
      const imageRight = wrapper.find('[data-test="generic-button-image-right"]');
      const onlyImage = wrapper.find('[data-test="generic-button-only-image"]');
      expect(text.exists()).toBe(true);
      expect(imageLeft.exists()).toBe(false);
      expect(imageRight.exists()).toBe(true);
      expect(onlyImage.exists()).toBe(false);
    });
  });

  describe('when no text, a valid image name is passed as a prop', () => {
    it('returns correct classes', () => {
      const wrapper = mount(GenericButton, {
        props: {
          type: ButtonType.Primary,
          imageName: 'copy',
        },
      });
      const text = wrapper.find('[data-test="generic-button-text"]');
      const imageLeft = wrapper.find('[data-test="generic-button-image-left"]');
      const imageRight = wrapper.find('[data-test="generic-button-image-right"]');
      const onlyImage = wrapper.find('[data-test="generic-button-only-image"]');
      expect(text.exists()).toBe(false);
      expect(imageLeft.exists()).toBe(false);
      expect(imageRight.exists()).toBe(false);
      expect(onlyImage.exists()).toBe(true);
    });
  });
});
