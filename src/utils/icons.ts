import { ComponentPublicInstance } from 'vue';

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
import { Nullable } from '@/interfaces/common';

export const icons = {
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
} as Record<string, ComponentPublicInstance>;

export const findIcon = (iconName: string): Nullable<ComponentPublicInstance> => {
  if (iconName && (iconName in icons)) {
    return icons[iconName];
  }
  return null;
};
