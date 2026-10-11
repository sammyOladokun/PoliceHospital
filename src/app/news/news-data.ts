import type { StaticImageData } from "next/image";

import dentalImg from "../../../assets/dental.jpeg";
import labImg from "../../../assets/area.jpeg";
import xrayImg from "../../../assets/lab-subject-2.jpeg";

export type NewsStory = {
  slug: string;
  title: string;
  summary: string;
  image: StaticImageData;
  category: string;
  date: string;
  readTime: string;
  body: string[];
};

export const newsStories: NewsStory[] = [
  {
    slug: "patient-services-guide-for-specialist-appointments",
    title: "Patient Services Guide for Specialist Appointments",
    summary: "A clear guide to referrals, records, and the information that can help make a specialist visit more productive.",
    image: dentalImg,
    category: "Patient Notice",
    date: "Service information",
    readTime: "4 min read",
    body: [
      "A specialist appointment is most useful when the care team has a clear picture of a patient's current concerns, previous care, and treatment goals. Patients can prepare by bringing referral notes, previous test results, and a current list of medicines.",
      "At the appointment, the clinician may ask about symptoms, medical history, and changes since the last visit. This helps the team decide whether further tests, treatment, or follow-up are appropriate.",
      "Patients are encouraged to ask questions, take note of their care plan, and confirm the next step before leaving the hospital. Clear communication supports safer, more coordinated care."
    ]
  },
  {
    slug: "diagnostic-services-what-to-expect-before-your-test",
    title: "Diagnostic Services: What to Expect Before Your Test",
    summary: "Helpful preparation guidance for patients visiting the laboratory, radiology, ultrasound, or other diagnostic services.",
    image: xrayImg,
    category: "Clinical Update",
    date: "Service information",
    readTime: "5 min read",
    body: [
      "Diagnostic tests give clinical teams useful information to support diagnosis, treatment decisions, and follow-up care. Preparation varies depending on the type of test requested.",
      "Before visiting a diagnostic department, patients should confirm whether they need to fast, drink water, bring an imaging request form, or share information about current medicines and previous results.",
      "The care team can explain what to expect, how results are reviewed, and whether a follow-up consultation is needed. Patients should ask for clarification whenever an instruction is unclear."
    ]
  },
  {
    slug: "understanding-referrals-and-follow-up-care",
    title: "Understanding Referrals and Follow-Up Care",
    summary: "How referrals, result reviews, and follow-up appointments help keep a patient's care connected across services.",
    image: labImg,
    category: "Care Coordination",
    date: "Patient guide",
    readTime: "4 min read",
    body: [
      "A referral helps connect a patient with the right clinician or service for a particular concern. It may be recommended after an assessment, a diagnostic test, or when more specialised review is needed.",
      "Follow-up appointments allow clinicians to review progress, discuss results, adjust treatment, and answer questions that arise after an initial visit. The timing of follow-up depends on the individual care plan.",
      "Keeping referral notes, prescriptions, and test results together can make each stage of care easier to coordinate. Patients should contact the hospital if they need help understanding their next appointment."
    ]
  }
];
