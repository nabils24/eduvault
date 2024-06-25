import type {
  recentTrans,
  productPerformanceType,
  productsCards,
} from "@/types/dashboard/index";

/*--Recent Transaction--*/
const recentTransaction: recentTrans[] = [
  {
    title: "07.45",
    subtitle: "Bahasa Indonesia",
    textcolor: "primary",
    boldtext: false,
    line: true,
    link: "",
    url: "",
  },
  {
    title: "9.00",
    subtitle: "Matematika",
    textcolor: "primary",
    boldtext: false,
    line: true,
    link: "",
    url: "",
  },
  {
    title: "10.15",
    subtitle: "Bahasa Inggris",
    textcolor: "primary",
    boldtext: false,
    line: true,
    link: "",
    url: "",
  },
  {
    title: "11.30",
    subtitle: "Agama Islam",
    textcolor: "primary",
    boldtext: false,
    line: true,
    link: "",
    url: "",
  },
  {
    title: "13.00",
    subtitle: "IPA - Biologi",
    textcolor: "primary",
    boldtext: false,
    line: true,
    link: "",
    url: "",
  },
    {
        title: "14.15",
        subtitle: "IPS",
        textcolor: "primary",
        boldtext: false,
        line: true,
        link: "",
        url: "",
    },
    {
        title: "15.30",
        subtitle: "Seni Budaya",
        textcolor: "primary",
        boldtext: false,
        line: true,
        link: "",
        url: "",
    },
];

/*Basic Table 1*/
const productPerformance: productPerformanceType[] = [
  {
    id: 1,
    name: "Sunil Joshi",
    post: "Web Designer",
    pname: "Elite Admin",
    status: "Low",
    statuscolor: "primary",
    budget: "$3.9",
  },
  {
    id: 2,
    name: "Andrew McDownland",
    post: "Project Manager",
    pname: "Real Homes WP Theme",
    status: "Medium",
    statuscolor: "secondary",
    budget: "$24.5k",
  },
  {
    id: 3,
    name: "Christopher Jamil",
    post: "Project Manager",
    pname: "MedicalPro WP Theme",
    status: "High",
    statuscolor: "error",
    budget: "$12.8k",
  },
  {
    id: 4,
    name: "Nirav Joshi",
    post: "Frontend Engineer",
    pname: "Hosting Press HTML",
    status: "Critical",
    statuscolor: "success",
    budget: "$2.4k",
  },
];

/*--Products Cards--*/
import proimg1 from "/images/products/s4.jpg";
import proimg2 from "/images/products/s5.jpg";
import proimg3 from "/images/products/s7.jpg";
import proimg4 from "/images/products/s11.jpg";
const productsCard: productsCards[] = [
  {
    title: "Boat Headphone",
    link: "/",
    photo: proimg1,
    salesPrice: 375,
    price: 285,
    rating: 4,
  },
  {
    title: "MacBook Air Pro",
    link: "/",
    photo: proimg2,
    salesPrice: 650,
    price: 900,
    rating: 5,
  },
  {
    title: "Red Valvet Dress",
    link: "/",
    photo: proimg3,
    salesPrice: 150,
    price: 200,
    rating: 3,
  },
  {
    title: "Cute Soft Teddybear",
    link: "/",
    photo: proimg4,
    salesPrice: 285,
    price: 345,
    rating: 2,
  },
];

export { recentTransaction, productPerformance, productsCard };
