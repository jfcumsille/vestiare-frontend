import { ComponentPublicInstance } from 'vue';

import Spinner from '@/components/LoadingSpinner.vue';
import CopyIcon from '@/assets/svg/CopyIcon.vue';
import ChevronDown from '@/assets/svg/ChevronDown.vue';
import ChevronLeft from '@/assets/svg/ChevronLeft.vue';
import ChevronRight from '@/assets/svg/ChevronRight.vue';
import CrossIcon from '@/assets/svg/CrossIcon.vue';
import EyeIcon from '@/assets/svg/EyeIcon.vue';
import EyeClosedIcon from '@/assets/svg/EyeClosedIcon.vue';
import FilterIcon from '@/assets/svg/FilterIcon.vue';
import GoogleLogo from '@/assets/svg/auth/GoogleLogo.vue';
import GithubLogo from '@/assets/svg/auth/GithubLogo.vue';
import MailIcon from '@/assets/svg/MailIcon.vue';
import MenuIcon from '@/assets/svg/MenuIcon.vue';
import ThreeDots from '@/assets/svg/ThreeDots.vue';
import AddIcon from '@/assets/svg/AddIcon.vue';
import LogOutIcon from '@/assets/svg/LogOutIcon.vue';
import { Nullable } from '@/interfaces/common';

export const icons = {
  copy: CopyIcon,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  cross: CrossIcon,
  menu: MenuIcon,
  'auth-google': GoogleLogo,
  'auth-github': GithubLogo,
  mail: MailIcon,
  'three-dots': ThreeDots,
  filter: FilterIcon,
  eye: EyeIcon,
  'eye-closed': EyeClosedIcon,
  add: AddIcon,
  logout: LogOutIcon,
  loading: Spinner,
} as unknown as Record<string, ComponentPublicInstance>;

export const findIcon = (iconName: string): Nullable<ComponentPublicInstance> => {
  if (iconName && (iconName in icons)) {
    return icons[iconName];
  }
  return null;
};
