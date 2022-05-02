<script setup lang="ts">
import { computed, ComponentPublicInstance } from 'vue';
import {
  ButtonType,
  SizeType,
  HorizontalPositionType,
  JustifyType,
} from '@/interfaces/utilities/enums';
import Spinner from '@/components/LoadingSpinner.vue';
import CopyIcon from '@/assets/svg/CopyIcon.vue';
import ChevronDown from '@/assets/svg/ChevronDown.vue';
import CrossIcon from '@/assets/svg/CrossIcon.vue';
import EyeIcon from '@/assets/svg/EyeIcon.vue';
import EyeClosedIcon from '@/assets/svg/EyeClosedIcon.vue';
import GoogleLogo from '@/assets/svg/auth/GoogleLogo.vue';
import GithubLogo from '@/assets/svg/auth/GithubLogo.vue';
import MenuIcon from '@/assets/svg/MenuIcon.vue';
import ThreeDots from '@/assets/svg/ThreeDots.vue';
import LogOutIcon from '@/assets/svg/LogOutIcon.vue';
import AddIcon from '@/assets/svg/AddIcon.vue';
import { Nullable } from '@/interfaces/common';

const props = withDefaults(defineProps<{
  type: ButtonType,
  size?: SizeType,
  text?: string,
  iconName?: string,
  iconPosition?: HorizontalPositionType,
  loading?: boolean,
  justify?: JustifyType
  isWidthFull?: boolean,
}>(), {
  loading: false,
  iconPosition: HorizontalPositionType.Left,
  justify: JustifyType.Center,
  size: SizeType.Regular,
  isWidthFull: false,
});

const emit = defineEmits<{(e: 'click'): void }>();

const onClick = () => {
  if (!props.loading) {
    emit('click');
  }
};

const colorClasses = computed(() => {
  switch (props.type) {
    case ButtonType.Primary:
      if (props.loading) {
        return 'bg-primary-surface text-primary-main';
      }
      return `
        bg-primary-main text-white
        hover:bg-primary-hover
        focus:ring focus:ring-primary-focus
        active:bg-primary-pressed active:ring-0`;
    case ButtonType.Secondary:
      if (props.loading) {
        return 'bg-primary-surface text-primary-main';
      }
      return `
        bg-primary-surface text-primary-main
        hover:text-primary-hover
        focus:ring focus:ring-primary-focus focus:text-primary-hover
        active:text-primary-pressed`;
    case ButtonType.Outline:
      if (props.loading) {
        return 'bg-transparent border-border-color border-1 text-primary-main';
      }
      return `
        bg-transparent border-border-color border-1 text-primary-main
        hover:text-primary-hover
        focus:ring focus:ring-primary-focus focus:text-primary-hover
        active:text-primary-pressed active:ring-0`;
    case ButtonType.Text:
      if (props.loading) {
        return 'bg-transparent text-primary-main';
      }
      return `
        bg-transparent text-primary-main
        hover:text-primary-hover
        focus:ring focus:ring-primary-focus focus:text-primary-hover
        active:text-primary-pressed active:ring-0`;
    case ButtonType.Danger:
      if (props.loading) {
        return 'bg-danger-surface text-danger-main';
      }
      return `
        bg-danger-main text-white
        hover:bg-danger-hover
        focus:bg-danger-main focus:ring focus:ring-danger-focus
        active:bg-danger-pressed active:ring-0`;
    default:
      return '';
  }
});

const buttonIcons = {
  copy: CopyIcon,
  chevron_down: ChevronDown,
  cross: CrossIcon,
  menu: MenuIcon,
  auth_google: GoogleLogo,
  auth_github: GithubLogo,
  three_dots: ThreeDots,
  eye: EyeIcon,
  eye_closed: EyeClosedIcon,
  loading: Spinner,
  logout: LogOutIcon,
  add: AddIcon,
} as Record<string, ComponentPublicInstance>;

const iconComponent = computed((): Nullable<ComponentPublicInstance> => {
  if (props.loading) {
    return buttonIcons.loading;
  }
  if (props.iconName && (props.iconName in buttonIcons)) {
    return buttonIcons[props.iconName];
  }
  return null;
});

const showOnlyIcon = computed(() => {
  const showLoading = props.loading && props.iconPosition === null;
  return (!props.text && iconComponent) || showLoading;
});

const showLeftIcon = computed(() => {
  const isIconPositionLeft = props.iconPosition === HorizontalPositionType.Left;
  const isIconPositionRight = props.iconPosition === HorizontalPositionType.Right;
  const showLoadingLeft = props.loading && !showOnlyIcon.value && !isIconPositionRight;
  return (props.text && iconComponent && isIconPositionLeft) || showLoadingLeft;
});

const showRightIcon = computed(() => {
  const isIconPositionRight = props.iconPosition === HorizontalPositionType.Right;
  const showLoadingRight = props.loading && isIconPositionRight;
  return (props.text && iconComponent && isIconPositionRight) || showLoadingRight;
});

const iconSizeClasses = computed(() => {
  switch (props.size) {
    case SizeType.Inline:
      return 'w-3 h-3';
    case SizeType.Small:
      return 'w-3.5 h-3.5';
    case SizeType.Regular:
      if (showOnlyIcon.value) {
        return 'w-5 h-5';
      }
      return 'w-4 h-4';
    case SizeType.Large:
      return 'w-4.5 h-4.5';
    default:
      return 'w-4 h-4';
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case SizeType.Inline:
      return 'text-base inline-block disabled:bg-transparent';
    case SizeType.Small:
      if (showOnlyIcon.value) {
        return 'flex py-2 px-3 h-7.5 w-7.5';
      }
      return 'flex py-2 px-3 h-7.5 text-sm';
    case SizeType.Regular:
      if (showOnlyIcon.value) {
        return 'flex p-3.5 w-11 h-11';
      }
      return 'flex p-3.5 text-base h-11';
    case SizeType.Large:
      if (showOnlyIcon.value) {
        return 'flex p-4 w-12.5 h-12.5';
      }
      return 'flex py-4 px-6 text-lg h-12.5';
    default:
      return 'flex p-3.5 text-base h-11';
  }
});

const isJustifyBetween = computed(() => props.justify === JustifyType.Between);
const width = computed(() => (props.isWidthFull ? 'w-full' : ''));
</script>

<template>
  <button
    data-test="generic-button"
    :class="`
      items-center ${props.justify} rounded-lg font-medium min-w-max
      disabled:bg-light-gray disabled:text-disabled-color
      ${colorClasses} ${sizeClasses} ${width}`
    "
    @click="onClick"
  >
    <div>
      <component
        :is="iconComponent"
        v-if="showLeftIcon"
        data-test="generic-button-icon-left"
        class="mr-1.5"
        :class="iconSizeClasses"
      />
    </div>
    <div
      v-if="props.text"
      data-test="generic-button-text"
      :class="{ 'w-full text-left': isJustifyBetween }"
    >
      {{ props.text }}
    </div>
    <div>
      <component
        :is="iconComponent"
        v-if="showRightIcon"
        data-test="generic-button-icon-right"
        class="ml-1.5"
        :class="iconSizeClasses"
      />
    </div>
    <div class="flex items-center justify-center">
      <component
        :is="iconComponent"
        v-if="showOnlyIcon"
        data-test="generic-button-only-icon"
        :class="iconSizeClasses"
      />
    </div>
  </button>
</template>