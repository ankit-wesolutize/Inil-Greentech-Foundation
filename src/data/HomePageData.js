import { Lightbulb, Target, Beaker, Droplets, Microscope, Recycle, Sprout, Users, ClipboardCheck, 
HeartHandshake, Rocket, BarChart3, Ear, GraduationCap, Handshake, Zap} from "lucide-react";
import researchImg from "../assets/images/research.png";
import agricultureImg from "../assets/images/agriculture.png";
import waterImg from "../assets/images/water.png";
import circularImg from "../assets/images/circular.png";
import agritechImg from "../assets/images/agritech.png";
import communityImg from "../assets/images/community.png";


export const panels = [
  {
    id: "mission",
    number: "01",
    eyebrow: "Our Mission",
    icon: Target,
    bg: "bg-lime-900",
    lines: [
      "To advance research-led, accessible environmental and agricultural solutions that strengthen communities and regenerate natural systems.",
    ],
  },
  {
    id: "vision",
    number: "02",
    eyebrow: "Our Vision",
    icon: Lightbulb,
    bg: "bg-blue-700",
    lines: [
      "A future where innovation, local knowledge and responsible development enable people and nature to flourish together.",
    ],
  },
];






export const focusAreas = [
  {
    number: "01",
    title: "Scientific Research & Development",
    description:
      "Data-driven research into climate-resilient seeds, smart farming tools and the effects of changing weather patterns.",
    icon: Microscope,
    image: researchImg,
    href: "/initiatives",
  },
  {
    number: "02",
    title: "Smart Agriculture & Training",
    description:
      "Technical coaching and precision farming techniques that help grassroots agricultural workers improve efficiency.",
    icon: Sprout,
    image: agricultureImg,
    href: "/initiatives",
  },
  {
    number: "03",
    title: "Water Management",
    description:
      "Micro-irrigation training and practical water recycling models designed for rural frameworks.",
    icon: Droplets,
    image: waterImg,
    href: "/initiatives",
  },
  {
    number: "04",
    title: "Circular Economy",
    description:
      "Turning agricultural by-products into reusable bio-energy and valuable organic materials.",
    icon: Recycle,
    image: circularImg,
    href: "/initiatives",
  },
  {
    number: "05",
    title: "Agri-Tech Advancement",
    description:
      "Technology integration that supports informed decisions, resilient crops and improved yields.",
    icon: Beaker,
    image: agritechImg,
    href: "/initiatives",
  },
  {
    // TODO: replace with the real title and description from Figma
    number: "06",
    title: "Community Capacity",
    description:
      "Locally owned knowledge and practical skills for stronger, more sustainable communities.",
    icon: Users,
    image: communityImg,
    href: "/initiatives",
  },
];






export const stats = [
  {
    number: "01",
    title: "Communities reached",
    description: "Villages and community groups engaged through our programmes.",
    icon: Users,
    value: null,
    suffix: "",
    clip: "clip-chevron-first",
    card: "bg-green-50",
    iconBox: "bg-stone-200 text-stone-600",
    label: "text-stone-500",
    heading: "text-slate-900",
    text: "text-slate-600",
    numberColor: "text-slate-500",
  },
  {
    number: "02",
    title: "People impacted",
    description: "Farmers, families and individuals benefiting from our work.",
    icon: HeartHandshake,
    value: null,
    suffix: "",
    clip: "clip-chevron-mid",
    card: "bg-green-100",
    iconBox: "bg-green-200 text-green-900",
    label: "text-green-800",
    heading: "text-slate-900",
    text: "text-slate-600",
    numberColor: "text-slate-500",
  },
  {
    number: "03",
    title: "Projects completed",
    description: "Field projects delivered from planning through to handover.",
    icon: ClipboardCheck,
    value: null,
    suffix: "",
    clip: "clip-chevron-mid",
    card: "bg-green-50",
    iconBox: "bg-green-100 text-green-900",
    label: "text-green-800",
    heading: "text-slate-900",
    text: "text-slate-600",
    numberColor: "text-slate-500",
  },
  {
    number: "04",
    title: "Initiatives conducted",
    description:
      "Training, research and outreach activities carried out on the ground.",
    icon: Rocket,
    value: null,
    suffix: "",
    clip: "clip-chevron-last",
    card: "bg-emerald-900",
    iconBox: "bg-white/10 text-white",
    label: "text-green-400",
    heading: "text-white",
    text: "text-white/70",
    numberColor: "text-white/60",
  },
];



export const projects = [
  {
    category: "Water Management",
    title: "Water-wise rural frameworks",
    description:
      "Micro-irrigation training and practical water recycling models designed for rural frameworks.",
    location: "Location pending verification",
    image: waterImg,
    href: "/projects",
  },
  {
    category: "Research & Development",
    title: "Climate-resilient crop research",
    description:
      "Data-driven research into climate-resilient seeds, smart farming tools and the effects of changing weather patterns.",
    location: "Location pending verification",
    image: researchImg,
    href: "/projects",
  },
  {
    category: "Smart Agriculture",
    title: "Precision farming skills",
    description:
      "Technical coaching and precision farming techniques that help grassroots agricultural workers improve efficiency.",
    location: "Location pending verification",
    image: agricultureImg,
    href: "/projects",
  },
];


export const steps = [
  {
    number: "01",
    title: "Understand",
    description: "Study the local ecosystem and listen to lived experience.",
    icon: Ear,
  },
  {
    number: "02",
    title: "Collaborate",
    description: "Bring communities, researchers and institutions together.",
    icon: Handshake,
  },
  {
    number: "03",
    title: "Act",
    description: "Pilot practical, evidence-led solutions in the field.",
    icon: Zap,
  },
  {
    number: "04",
    title: "Empower",
    description: "Transfer skills, tools and ownership to local people.",
    icon: GraduationCap,
  },
  {
    number: "05",
    title: "Measure",
    description: "Learn from outcomes and improve what works.",
    icon: BarChart3,
  },
];