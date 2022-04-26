<script setup lang="ts">
import { computed, ComponentPublicInstance } from 'vue';
import { ButtonType, SizeType, HorizontalPositionType } from '@/interfaces/utilities/enums';
import CopyIcon from '@/assets/svg/CopyIcon.vue';
import ChevronDown from '@/assets/svg/ChevronDown.vue';
import CrossIcon from '@/assets/svg/CrossIcon.vue';
import EyeIcon from '@/assets/svg/EyeIcon.vue';
import EyeClosedIcon from '@/assets/svg/EyeClosedIcon.vue';
import GoogleLogo from '@/assets/svg/auth/GoogleLogo.vue';
import GithubLogo from '@/assets/svg/auth/GithubLogo.vue';
import MenuIcon from '@/assets/svg/MenuIcon.vue';
import ThreeDots from '@/assets/svg/ThreeDots.vue';
import { Nullable } from '@/interfaces/common';

const props = withDefaults(defineProps<{
  type: ButtonType,
  size?: SizeType,
  text?: string,
  imageName?: string,
  imagePosition?: HorizontalPositionType,
  loading?: boolean,
  justify?: string
}>(), {
  loading: false,
  imagePosition: HorizontalPositionType.Left,
  justify: 'justify-center',
  size: SizeType.Regular,
});

const emit = defineEmits<{(e: 'click'): void }>();

const onClick = () => {
  if (!props.loading) {
    emit('click');
  }
};

const colorClasses = computed(() => {
  if (props.type === ButtonType.Primary) {
    if (props.loading) {
      return 'bg-primary-surface text-primary-main';
    }
    return `
      bg-primary-main text-white
      hover:bg-primary-hover
      focus:bg-primary-main focus:ring focus:ring-primary-focus
      active:bg-primary-pressed active:ring-0`;
  }
  if (props.type === ButtonType.Secondary) {
    if (props.loading) {
      return 'bg-primary-surface text-primary-main';
    }
    return `
      bg-primary-surface text-primary-main
      hover:bg-primary-surface hover:text-primary-hover
      focus:bg-primary-surface focus:ring focus:ring-primary-focus focus:text-primary-hover
      active:bg-primary-surface active:text-primary-pressed`;
  }
  if (props.type === ButtonType.Outline) {
    if (props.loading) {
      return 'bg-transparent border-border-color border-1 text-primary-main';
    }
    return `
      bg-transparent border-border-color border-1 text-primary-main
      hover:bg-transparent hover:text-primary-hover
      focus:bg-transparent focus:ring focus:ring-primary-focus focus:text-primary-hover
      active:bg-transparent active:text-primary-pressed active:ring-0`;
  }
  if (props.type === ButtonType.Text) {
    if (props.loading) {
      return 'bg-transparent text-primary-main';
    }
    return `
      bg-transparent text-primary-main
      hover:bg-transparent hover:text-primary-hover
      focus:bg-transparent focus:ring focus:ring-primary-focus focus:text-primary-hover
      active:bg-transparent active:text-primary-pressed active:ring-0`;
  }
  if (props.type === ButtonType.Danger) {
    if (props.loading) {
      return 'bg-danger-surface text-danger-main';
    }
    return `
      bg-danger-main text-white
      hover:bg-danger-hover
      focus:bg-danger-main focus:ring focus:ring-danger-focus
      active:bg-danger-pressed active:ring-0`;
  }
  return '';
});

const buttonImages = {
  copy: CopyIcon,
  chevron_down: ChevronDown,
  cross: CrossIcon,
  menu: MenuIcon,
  auth_google: GoogleLogo,
  auth_github: GithubLogo,
  three_dots: ThreeDots,
  eye: EyeIcon,
  eye_closed: EyeClosedIcon,
} as Record<string, ComponentPublicInstance>;

const imageComponent = computed((): Nullable<ComponentPublicInstance> => {
  if (props.imageName && (props.imageName in buttonImages)) {
    return buttonImages[props.imageName];
  }
  return null;
});

const showLeftImage = computed(() => {
  const isImagePositionLeftText = props.imagePosition === HorizontalPositionType.Left;
  return props.text && imageComponent && isImagePositionLeftText;
});

const showRightImage = computed(() => {
  const isImagePositionRightText = props.imagePosition === HorizontalPositionType.Right;
  return props.text && imageComponent && isImagePositionRightText;
});

const showOnlyImage = computed(() => !props.text && imageComponent);

const imageSizeClasses = computed(() => {
  if (props.size === SizeType.Small) {
    return 'w-3.5 h-3.5';
  }
  if (props.size === SizeType.Regular) {
    if (showOnlyImage.value) {
      return 'w-5 h-5';
    }
    return 'w-4 h-4';
  }
  if (props.size === SizeType.Large) {
    return 'w-4.5 h-4.5';
  }
  return 'w-4 h-4';
});

const sizeClasses = computed(() => {
  if (props.size === SizeType.Inline) {
    return 'text-base inline-block disabled:bg-transparent';
  }
  if (props.size === SizeType.Small) {
    if (showOnlyImage.value) {
      return 'flex py-2 px-3 h-7.5 w-7.5';
    }
    return 'flex py-2 px-3 h-7.5 text-sm';
  }
  if (props.size === SizeType.Regular) {
    if (showOnlyImage.value) {
      return 'flex p-3.5 w-10 h-11';
    }
    return 'flex p-3.5 text-base h-11';
  }
  if (props.size === SizeType.Large) {
    if (showOnlyImage.value) {
      return 'flex p-4 w-12.5 h-12.5';
    }
    return 'flex py-4 px-6 text-lg h-12.5';
  }
  return 'flex py-4 px-5 text-base';
});

const isJustifyBetween = computed(() => props.justify === 'justify-between');
</script>

<template>
  <button
    data-test="generic-button"
    :class="`
      items-center ${props.justify} rounded-lg font-medium min-w-max
      disabled:bg-light-gray disabled:text-disabled-color
      ${colorClasses} ${sizeClasses}`
    "
    @click="onClick"
  >
    <div>
      <component
        :is="imageComponent"
        v-if="showLeftImage"
        data-test="generic-button-image-left"
        class="mr-1.5"
        :class="imageSizeClasses"
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
        :is="imageComponent"
        v-if="showRightImage"
        data-test="generic-button-image-right"
        class="ml-1.5"
        :class="imageSizeClasses"
      />
    </div>
    <div class="flex items-center justify-center">
      <component
        :is="imageComponent"
        v-if="showOnlyImage"
        data-test="generic-button-only-image"
        :class="imageSizeClasses"
      />
    </div>
  </button>
</template>
