import listeningImg from "../assets/images/stories_bg.png";
import futureImg from "../assets/images/future-grows-locally.png";
import learningImg from "../assets/images/learning-becomes-action.png";
import { BookOpen, Ear, Sprout } from "lucide-react";

import communityFieldwork from "../assets/images/community.png";
import farmLearning from "../assets/images/about-people.png";
import harvestingKnowledge from "../assets/images/agritech.png";
import waterSmart from "../assets/images/water.png";
import collectiveAction from "../assets/images/circular.png";
import womenInAgriculture from "../assets/images/agriculture.png";

const placeholder = (topic) =>
  `Approved information about ${topic} will be added by INIL. This placeholder keeps the final layout clear while protecting organisational accuracy.`;


const defaultContent = {
  overviewHeading: "A complete framework, ready for the real story.",
  overviewIntro:
    "This page is intentionally structured without invented claims, statistics, locations or beneficiaries.",
  context: placeholder("the context"),
  response: placeholder("our response"),
  activities: placeholder("activities"),
  activityPoints: [
    "Activity placeholder 01",
    "Activity placeholder 02",
    "Activity placeholder 03",
    "Activity placeholder 04",
  ],
  outcomes: placeholder("outcomes"),
  gallery: [
    communityFieldwork,
    farmLearning,
    harvestingKnowledge,
    waterSmart,
    collectiveAction,
    womenInAgriculture,
  ],
};

export const stories = [
  {
    number: "01",
    slug: "listening-before-leading",
    title: "Listening before leading",
    description:
      "Why meaningful change begins with time, trust and local knowledge.",
    icon: Ear,
    image: listeningImg,
    ...defaultContent,
  },
  {
    number: "02",
    slug: "the-future-grows-locally",
    title: "The future grows locally",
    description:
      "Exploring the relationship between livelihoods and healthy landscapes.",
    icon: Sprout,
    image: futureImg,
    ...defaultContent,
  },
  {
    number: "03",
    slug: "learning-becomes-action",
    title: "Learning becomes action",
    description:
      "How shared environmental learning can inspire participation.",
    icon: BookOpen,
    image: learningImg,
    ...defaultContent,
  },
];