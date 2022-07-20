import { ComponentPublicInstance } from 'vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { ButtonType, SizeType, HorizontalPositionType } from '@/interfaces/utilities/enums';
import GenericButton from '@/components/GenericButton.vue';
import CopyIcon from '@/assets/svg/CopyIcon.vue';
import ChevronIcon from '@/assets/svg/ChevronIcon.vue';
import CrossIcon from '@/assets/svg/CrossIcon.vue';
import EyeIcon from '@/assets/svg/EyeIcon.vue';
import EyeClosedIcon from '@/assets/svg/EyeClosedIcon.vue';
import GoogleLogo from '@/assets/svg/auth/GoogleLogo.vue';
import GithubLogo from '@/assets/svg/auth/GithubLogo.vue';
import MailIcon from '@/assets/svg/MailIcon.vue';
import MenuIcon from '@/assets/svg/MenuIcon.vue';
import ThreeDots from '@/assets/svg/ThreeDots.vue';
import Spinner from '@/components/LoadingSpinner.vue';

describe('GenericButton', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const buttonIcons = {
    copy: CopyIcon,
    chevron: ChevronIcon,
    cross: CrossIcon,
    menu: MenuIcon,
    'auth-google': GoogleLogo,
    'auth-github': GithubLogo,
    mail: MailIcon,
    'three-dots': ThreeDots,
    eye: EyeIcon,
    'eye-closed': EyeClosedIcon,
    loading: Spinner,
  } as unknown as Record<string, ComponentPublicInstance>;

  const buttonTypes = {
    primary: ButtonType.Primary,
    secondary: ButtonType.Secondary,
    outline: ButtonType.Outline,
    text: ButtonType.Text,
    danger: ButtonType.Danger,
  } as Record<string, ButtonType>;

  const sizeTypes = {
    small: SizeType.Small,
    medium: SizeType.Medium,
    large: SizeType.Large,
    inline: SizeType.Inline,
  } as Record<string, SizeType>;

  const checkComponent = (
    props: Record<string, unknown>,
    component: ComponentPublicInstance,
  ) => {
    const wrapper = mount(GenericButton, { props });
    expect(wrapper.findComponent(component).exists()).toBe(true);
  };

  const checkClasses = (wrapper: VueWrapper, classes: Array<string>) => {
    classes.forEach((className) => {
      expect(wrapper.classes()).toContain(className);
    });
  };

  const colorClasses = {
    primary: [
      'bg-primary-main',
      'text-white',
      'hover:bg-primary-hover',
      'focus:ring',
      'focus:ring-primary-focus',
      'active:bg-primary-pressed',
      'active:ring-0',
      'disabled:bg-light-gray',
    ],
    secondary: [
      'bg-primary-surface',
      'text-primary-main',
      'hover:text-primary-hover',
      'focus:ring',
      'focus:ring-primary-focus',
      'focus:text-primary-hover',
      'active:text-primary-pressed',
      'disabled:bg-light-gray',
    ],
    outline: [
      'bg-transparent',
      'border-border-color',
      'border-1',
      'text-primary-main',
      'hover:text-primary-hover',
      'focus:ring',
      'focus:ring-primary-focus',
      'focus:text-primary-hover',
      'active:text-primary-pressed',
      'active:ring-0',
      'disabled:bg-light-gray',
    ],
    text: [
      'bg-transparent',
      'text-primary-main',
      'hover:text-primary-hover',
      'focus:ring',
      'focus:ring-primary-focus',
      'focus:text-primary-hover',
      'active:text-primary-pressed',
      'active:ring-0',
      'disabled:bg-transparent',
    ],
    danger: [
      'bg-danger-main',
      'text-white',
      'hover:bg-danger-hover',
      'focus:bg-danger-main',
      'focus:ring',
      'focus:ring-danger-focus',
      'active:bg-danger-pressed',
      'active:ring-0',
      'disabled:bg-light-gray',
    ],
  } as Record<string, string[]>;

  const sizeClassesText = {
    inline: [
      'text-base',
      'inline-block',
    ],
    small: [
      'flex',
      'py-2',
      'px-3',
      'h-7.5',
      'text-sm',
    ],
    medium: [
      'flex',
      'px-5',
      'py-4',
      'text-base',
      'h-11',
    ],
    large: [
      'flex',
      'py-4',
      'px-6',
      'text-lg',
      'h-12.5',
    ],
  } as Record<string, string[]>;

  const sizeClassesIcon = {
    inline: [
      'text-base',
      'inline-block',
    ],
    small: [
      'flex',
      'py-2',
      'px-3',
      'w-7.5',
      'h-7.5',
    ],
    medium: [
      'flex',
      'p-3.5',
      'w-11',
      'h-11',
    ],
    large: [
      'flex',
      'p-4',
      'w-12.5',
      'h-12.5',
    ],
  } as Record<string, string[]>;

  describe('renders correct icon component', () => {
    Object.keys(buttonIcons).forEach((key) => {
      const buttonIcon = buttonIcons[key];
      const props = {
        type: ButtonType.Primary,
        iconName: key,
      };
      it(`name: ${key} returns ${buttonIcon}`, () => {
        checkComponent(props, buttonIcon);
      });
    });
  });

  describe('renders correct color classes', () => {
    Object.keys(colorClasses).forEach((key) => {
      const buttonType = buttonTypes[key];
      const wrapper = mount(GenericButton, {
        props: { type: buttonType },
      });
      const buttonClasses = colorClasses[key];
      it(`when ButtonType is ${buttonType}`, () => {
        checkClasses(wrapper, buttonClasses);
      });
    });
  });

  describe('renders correct size classes if button has text', () => {
    Object.keys(sizeClassesText).forEach((key) => {
      const sizeType = sizeTypes[key];
      const wrapper = mount(GenericButton, {
        props: {
          type: ButtonType.Primary,
          size: sizeType,
          text: 'button text',
        },
      });
      const buttonClasses = sizeClassesText[key];
      it(`when SizeType is ${sizeType}`, () => {
        checkClasses(wrapper, buttonClasses);
      });
    });
  });

  describe('renders correct size classes if button has no text and an icon', () => {
    Object.keys(sizeClassesText).forEach((key) => {
      const sizeType = sizeTypes[key];
      const wrapper = mount(GenericButton, {
        props: {
          type: ButtonType.Primary,
          size: sizeType,
          iconName: 'copy',
        },
      });
      const buttonClasses = sizeClassesIcon[key];
      it(`when SizeType is ${sizeType}`, () => {
        checkClasses(wrapper, buttonClasses);
      });
    });
  });

  describe('when text is passed as a prop and no icon name', () => {
    it('returns correct components', () => {
      const wrapper = mount(GenericButton, {
        props: {
          type: ButtonType.Primary,
          text: 'button text',
        },
      });
      const text = wrapper.find('[data-test="generic-button-text"]');
      const iconLeft = wrapper.find('[data-test="generic-button-icon-left"]');
      const iconRight = wrapper.find('[data-test="generic-button-icon-right"]');
      const onlyIcon = wrapper.find('[data-test="generic-button-only-icon"]');
      const spinner = wrapper.findComponent(Spinner);
      expect(text.exists()).toBe(true);
      expect(iconLeft.exists()).toBe(false);
      expect(iconRight.exists()).toBe(false);
      expect(onlyIcon.exists()).toBe(false);
      expect(spinner.exists()).toBe(false);
    });
  });

  describe('when text, a valid icon name, and no icon position is passed as a prop', () => {
    it('returns correct components', () => {
      const wrapper = mount(GenericButton, {
        props: {
          type: ButtonType.Primary,
          text: 'button text',
          iconName: 'copy',
        },
      });
      const text = wrapper.find('[data-test="generic-button-text"]');
      const iconLeft = wrapper.find('[data-test="generic-button-icon-left"]');
      const iconRight = wrapper.find('[data-test="generic-button-icon-right"]');
      const onlyIcon = wrapper.find('[data-test="generic-button-only-icon"]');
      const spinner = wrapper.findComponent(Spinner);
      expect(text.exists()).toBe(true);
      expect(iconLeft.exists()).toBe(true);
      expect(iconRight.exists()).toBe(false);
      expect(onlyIcon.exists()).toBe(false);
      expect(spinner.exists()).toBe(false);
    });
  });

  describe('when text, a valid icon name, and left icon position is passed as a prop', () => {
    it('returns correct components', () => {
      const wrapper = mount(GenericButton, {
        props: {
          type: ButtonType.Primary,
          text: 'button text',
          iconName: 'copy',
          iconPosition: HorizontalPositionType.Left,
        },
      });
      const text = wrapper.find('[data-test="generic-button-text"]');
      const iconLeft = wrapper.find('[data-test="generic-button-icon-left"]');
      const iconRight = wrapper.find('[data-test="generic-button-icon-right"]');
      const onlyIcon = wrapper.find('[data-test="generic-button-only-icon"]');
      const spinner = wrapper.findComponent(Spinner);
      expect(text.exists()).toBe(true);
      expect(iconLeft.exists()).toBe(true);
      expect(iconRight.exists()).toBe(false);
      expect(onlyIcon.exists()).toBe(false);
      expect(spinner.exists()).toBe(false);
    });
  });

  describe('when text, a valid icon name, and right icon position is passed as a prop', () => {
    it('returns correct components', () => {
      const wrapper = mount(GenericButton, {
        props: {
          type: ButtonType.Primary,
          text: 'button text',
          iconName: 'copy',
          iconPosition: HorizontalPositionType.Right,
        },
      });
      const text = wrapper.find('[data-test="generic-button-text"]');
      const iconLeft = wrapper.find('[data-test="generic-button-icon-left"]');
      const iconRight = wrapper.find('[data-test="generic-button-icon-right"]');
      const onlyIcon = wrapper.find('[data-test="generic-button-only-icon"]');
      const spinner = wrapper.findComponent(Spinner);
      expect(text.exists()).toBe(true);
      expect(iconLeft.exists()).toBe(false);
      expect(iconRight.exists()).toBe(true);
      expect(onlyIcon.exists()).toBe(false);
      expect(spinner.exists()).toBe(false);
    });
  });

  describe('when no text, a valid icon name is passed as a prop', () => {
    it('returns correct components', () => {
      const wrapper = mount(GenericButton, {
        props: {
          type: ButtonType.Primary,
          iconName: 'copy',
        },
      });
      const text = wrapper.find('[data-test="generic-button-text"]');
      const iconLeft = wrapper.find('[data-test="generic-button-icon-left"]');
      const iconRight = wrapper.find('[data-test="generic-button-icon-right"]');
      const onlyIcon = wrapper.find('[data-test="generic-button-only-icon"]');
      const spinner = wrapper.findComponent(Spinner);
      expect(text.exists()).toBe(false);
      expect(iconLeft.exists()).toBe(false);
      expect(iconRight.exists()).toBe(false);
      expect(onlyIcon.exists()).toBe(true);
      expect(spinner.exists()).toBe(false);
    });
  });

  describe('when no text and loading true is passed as a prop', () => {
    it('returns correct components', () => {
      const wrapper = mount(GenericButton, {
        props: {
          type: ButtonType.Primary,
          loading: true,
        },
      });
      const text = wrapper.find('[data-test="generic-button-text"]');
      const iconLeft = wrapper.find('[data-test="generic-button-icon-left"]');
      const iconRight = wrapper.find('[data-test="generic-button-icon-right"]');
      const onlyIcon = wrapper.find('[data-test="generic-button-only-icon"]');
      const spinner = wrapper.findComponent(Spinner);
      expect(text.exists()).toBe(false);
      expect(iconLeft.exists()).toBe(false);
      expect(iconRight.exists()).toBe(false);
      expect(onlyIcon.exists()).toBe(true);
      expect(spinner.exists()).toBe(true);
    });
  });

  describe('when text and loading true is passed as a prop and no icon name', () => {
    it('returns correct components', () => {
      const wrapper = mount(GenericButton, {
        props: {
          type: ButtonType.Primary,
          text: 'button text',
          loading: true,
        },
      });
      const text = wrapper.find('[data-test="generic-button-text"]');
      const iconLeft = wrapper.find('[data-test="generic-button-icon-left"]');
      const iconRight = wrapper.find('[data-test="generic-button-icon-right"]');
      const onlyIcon = wrapper.find('[data-test="generic-button-only-icon"]');
      const spinner = wrapper.findComponent(Spinner);
      expect(text.exists()).toBe(true);
      expect(iconLeft.exists()).toBe(true);
      expect(iconRight.exists()).toBe(false);
      expect(onlyIcon.exists()).toBe(false);
      expect(spinner.exists()).toBe(true);
    });
  });

  describe('when text, a valid icon name, a right icon position, and loading true is passed as a prop', () => {
    it('returns correct components', () => {
      const wrapper = mount(GenericButton, {
        props: {
          type: ButtonType.Primary,
          text: 'button text',
          iconName: 'copy',
          iconPosition: HorizontalPositionType.Right,
          loading: true,
        },
      });
      const text = wrapper.find('[data-test="generic-button-text"]');
      const iconLeft = wrapper.find('[data-test="generic-button-icon-left"]');
      const iconRight = wrapper.find('[data-test="generic-button-icon-right"]');
      const onlyIcon = wrapper.find('[data-test="generic-button-only-icon"]');
      const spinner = wrapper.findComponent(Spinner);
      expect(text.exists()).toBe(true);
      expect(iconLeft.exists()).toBe(false);
      expect(iconRight.exists()).toBe(true);
      expect(onlyIcon.exists()).toBe(false);
      expect(spinner.exists()).toBe(true);
    });
  });
});
