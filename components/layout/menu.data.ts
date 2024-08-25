export interface ImenuItem {
  title: string;
  link: string;
  icon: string;
}

export const menuData: ImenuItem[] = [
  {
    title: "Home",
    link: "/",
    icon: "radix-icons:dashboard",
  },
  {
    title: "Products",
    link: "/products",
    icon: "ep:goods",
  },
  {
    title: "Payments",
    link: "/payments",
    icon: "ph:contactless-payment",
  },
  {
    title: "Orders",
    link: "/orders",
    icon: "fluent:receipt-28-regular",
  },
  {
    title: "Customers",
    link: "/customers",
    icon: "mingcute:group-line",
  },
  {
    title: "Feedback",
    link: "/feedback",
    icon: "fluent:person-feedback-48-regular",
  },
  {
    title: "Settings",
    link: "/settings",
    icon: "radix-icons:gear",
  },
  {
    title: "Help center",
    link: "/help",
    icon: "radix-icons:question-mark",
  },
];
