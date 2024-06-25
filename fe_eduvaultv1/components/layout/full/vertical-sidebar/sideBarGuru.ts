import {
  ApertureIcon,
  CopyIcon,
  LayoutDashboardIcon,
  LoginIcon,
  MoodHappyIcon,
  TypographyIcon,
  UserPlusIcon,
  BooksIcon,
} from "vue-tabler-icons";

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: "Guru" },
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    to: "/",
  },
  {
    title: "Materi",
    icon: LayoutDashboardIcon,
    to: "/guru/materi",
  },
  {
    title: "Profile Saya",
    icon: MoodHappyIcon,
    to: "/profile",
  },
];

export default sidebarItem;
