import {
  afterEach, describe, it, expect, vi,
} from 'vitest';
import { SetupContext } from 'vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { useRegistration } from '@/composables/registration';

const register = vi.fn();

const RegisteringComponent = {
  name: 'RegisteringComponent',
  setup() {
    useRegistration();
  },
};

const ValidParentComponent = {
  name: 'ValidParentComponent',
  template: '<slot />',
  setup(_: unknown, context: SetupContext) {
    context.expose({ register });
  },
};

const InvalidParentComponent = {
  name: 'InvalidParentComponent',
  template: '<slot />',
};

const mountTo = (
  parent: Record<string, unknown>,
  child: Record<string, unknown> | VueWrapper,
) => mount(parent, {
  slots: {
    default: child,
  },
});

describe('useRegistration', () => {
  afterEach(() => {
    register.mockClear();
  });

  describe('when a registering parent exists', () => {
    it('calls the register method when is the direct child', () => {
      mountTo(ValidParentComponent, RegisteringComponent);
      expect(register).toHaveBeenCalledTimes(1);
    });
  });

  describe('when a registering parent doesn\'t exist', () => {
    it('doesn\'t call the register method', () => {
      mountTo(InvalidParentComponent, RegisteringComponent);
      expect(register).toHaveBeenCalledTimes(0);
    });
  });
});
