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
  { header: "Home" },
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    to: "/",
  },
  { header: "Materi" },
  {
    title: "Bahasa Indonesia",
    icon: BooksIcon,
    to: "/materi/1",
  },
  {
    title: "Matematika",
    icon: BooksIcon,
    to: "/materi/4",
  },
  {
    title: "Bahasa Inggris",
    icon: BooksIcon,
    to: "/materi/2",
  },
  {
    title: "Bahasa Jawa",
    icon: BooksIcon,
    to: "/materi/3",
  },
  {
    title: "IPA - Biologi",
    icon: BooksIcon,
    to: "/materi/5",
  },
  {
    title: "IPA - Fisika",
    icon: BooksIcon,
    to: "/materi/6",
  },
  {
    title: "IPS",
    icon: BooksIcon,
    to: "/materi/7",
  },
  {
    title: "Seni Budaya",
    icon: BooksIcon,
    to: "/materi/8",
  },
  {
    title: "Agama Islam",
    icon: BooksIcon,
    to: "/materi/9",
  },
  {
    title: "Agama Kristen",
    icon: BooksIcon,
    to: "/materi/10",
  },
  {
    title: "Penjaskes",
    icon: BooksIcon,
    to: "/materi/12",
  },
  {
    title: "BK",
    icon: BooksIcon,
    to: "/materi/13",
  },
  {
    title: "PPKN",
    icon: BooksIcon,
    to: "/materi/11",
  },
  {
    title: "Informatika",
    icon: BooksIcon,
    to: "/materi/14",
  },

  { header: "Profile" },
  {
    title: "Profile Saya",
    icon: MoodHappyIcon,
    to: "/profile",
  },
];

export default sidebarItem;
