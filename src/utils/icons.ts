import { ComponentPublicInstance } from 'vue';

import Spinner from '@/components/LoadingSpinner.vue';
import CopyIcon from '@/assets/svg/CopyIcon.vue';
import ChevronIcon from '@/assets/svg/ChevronIcon.vue';
import CircleCheckIcon from '@/assets/svg/CircleCheckIcon.vue';
import CircleCrossIcon from '@/assets/svg/CircleCrossIcon.vue';
import CrossIcon from '@/assets/svg/CrossIcon.vue';
import EditIcon from '@/assets/svg/EditIcon.vue';
import EyeIcon from '@/assets/svg/EyeIcon.vue';
import EyeClosedIcon from '@/assets/svg/EyeClosedIcon.vue';
import FilterIcon from '@/assets/svg/FilterIcon.vue';
import GoogleLogo from '@/assets/svg/auth/GoogleLogo.vue';
import GithubLogo from '@/assets/svg/auth/GithubLogo.vue';
import LockIcon from '@/assets/svg/LockIcon.vue';
import MailIcon from '@/assets/svg/MailIcon.vue';
import MenuIcon from '@/assets/svg/MenuIcon.vue';
import ThreeDots from '@/assets/svg/ThreeDots.vue';
import AddIcon from '@/assets/svg/AddIcon.vue';
import LogOutIcon from '@/assets/svg/LogOutIcon.vue';
import SearchIcon from '@/assets/svg/SearchIcon.vue';
import TrashIcon from '@/assets/svg/TrashIcon.vue';
import BanIcon from '@/assets/svg/BanIcon.vue';
import CheckIcon from '@/assets/svg/CheckIcon.vue';
import { Nullable } from '@/interfaces/common';

export const icons = {
  copy: CopyIcon,
  chevron: ChevronIcon,
  'circle-check': CircleCheckIcon,
  'circle-cross': CircleCrossIcon,
  cross: CrossIcon,
  mail: MailIcon,
  menu: MenuIcon,
  'auth-google': GoogleLogo,
  'auth-github': GithubLogo,
  'three-dots': ThreeDots,
  filter: FilterIcon,
  edit: EditIcon,
  eye: EyeIcon,
  'eye-closed': EyeClosedIcon,
  add: AddIcon,
  log_out: LogOutIcon,
  lock: LockIcon,
  loading: Spinner,
  search: SearchIcon,
  trash: TrashIcon,
  ban: BanIcon,
  check: CheckIcon,
} as unknown as Record<string, ComponentPublicInstance>;

export const findIcon = (iconName: string): Nullable<ComponentPublicInstance> => {
  if (iconName && (iconName in icons)) {
    return icons[iconName];
  }
  return null;
};
