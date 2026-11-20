import { BookOpen, Microscope, Sprout, Users,  } from "lucide-react";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import rajeevImg from "../assets/images/rajeev-kalaskar.png";
import saurabhImg from "../assets/images/saurabh-bagdate.png";

export const values = [
  {
    number: "01",
    title: "Evidence before assumption",
    description:
      "Decisions grounded in research and field data, not guesswork.",
    icon: Microscope,
  },
  {
    number: "02",
    title: "Community before intervention",
    description:
      "Local voices lead, and solutions are built with people, not simply delivered to them.",
    icon: Users,
  },
  {
    number: "03",
    title: "Stewardship before extraction",
    description:
      "Care for land, water and resources so they thrive for the next generation.",
    icon: Sprout,
  },
  {
    number: "04",
    title: "Learning before scale",
    description:
      "We test, measure and improve what works before we grow it further.",
    icon: BookOpen,
  },
];





export const team = [
  {
    name: "Rajeev Kalaskar",
    role: "Founder & Director",
    tag: "Foundation Leadership",
    image: rajeevImg,
    socials: [
      { label: "Facebook", icon: FaFacebook, href: "#" },
      { label: "Instagram", icon: FaInstagram, href: "#" },
      { label: "X", icon: FaXTwitter, href: "#" },
    ],
  },
  {
    name: "Saurabh Bagdate",
    role: "Field Specialist",
    tag: "Field Team",
    image: saurabhImg,
    socials: [
      { label: "Facebook", icon: FaFacebook, href: "#" },
      { label: "Instagram", icon: FaInstagram, href: "#" },
      { label: "X", icon: FaXTwitter, href: "#" },
    ],
  },
];