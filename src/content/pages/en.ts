import type { PagesContent } from "./types";

// Inner pages in English. es.ts must have the same pages, sections and question ids.
// Facts checked on Medicare.gov, HealthCare.gov and Texas HHS on 2026-10-10. Recheck dates every year.
// Rules: educational tone, no promises of eligibility, savings, benefits or "best" plans,
// and no claim that the office offers a service unless site.scope confirms it (use a "scope" block).

const MEDICARE = "https://www.medicare.gov";

export const enPages: PagesContent = {
  medicare: {
    metaTitle: "Medicare Help in El Paso, TX: Parts A, B, C and D Explained",
    metaDescription:
      "Medicare in plain words: Parts A, B, C and D, Original Medicare vs. Medicare Advantage, and when you can sign up or make changes. Talk to our El Paso office.",
    label: "Medicare",
    title: "Medicare, explained in plain words",
    intro:
      "Medicare is the federal health insurance program for people 65 and older and for some younger people with disabilities. Here are the basics, so you can ask better questions and make your own decision.",
    sections: [
      {
        id: "who",
        heading: "Who can get Medicare?",
        blocks: [
          { type: "p", text: "In general, Medicare is for:" },
          {
            type: "list",
            items: [
              "People 65 or older who meet the citizenship or residency requirements.",
              "People under 65 who get Social Security disability benefits. Usually Medicare starts automatically after 24 months of disability benefits.",
              "People with ALS (Lou Gehrig's disease) or with End-Stage Renal Disease (permanent kidney failure).",
            ],
          },
          { type: "note", text: "Every case is different. Social Security and Medicare decide eligibility, not our office." },
          {
            type: "image",
            image: "medicareCard",
            alt: "Illustration of a blank Medicare card: a blue band with the word MEDICARE at the top, empty lines in the middle and a red band at the bottom",
            caption: "Illustration of a Medicare card. It has no personal information.",
          },
        ],
      },
      {
        id: "parts",
        heading: "The parts of Medicare",
        blocks: [
          {
            type: "list",
            items: [
              "Part A (hospital insurance): helps pay for hospital stays, care in a skilled nursing facility, hospice and some home health care.",
              "Part B (medical insurance): helps pay for doctor visits, outpatient care, preventive services and some medical equipment.",
              "Part C (Medicare Advantage): another way to get Part A and Part B, through a private company approved by Medicare.",
              "Part D (drug coverage): helps pay for prescription drugs. It comes as a separate drug plan or inside many Medicare Advantage plans.",
            ],
          },
        ],
      },
      {
        id: "two-ways",
        heading: "Two ways to get your Medicare",
        blocks: [
          {
            type: "p",
            text: "Original Medicare is Part A and Part B, run by the federal government. You can add a separate drug plan (Part D), and you may be able to buy a Medicare Supplement (Medigap) policy to help with costs that Original Medicare doesn't pay.",
          },
          {
            type: "p",
            text: "Medicare Advantage (Part C) plans come from private companies approved by Medicare. They cover everything Part A and Part B cover, most include drug coverage, and some offer extra benefits. They usually have a network of doctors and their own rules.",
          },
          {
            type: "table",
            caption: "Original Medicare and Medicare Advantage: general differences (source: Medicare.gov)",
            headers: ["Topic", "Original Medicare", "Medicare Advantage"],
            rows: [
              [
                "Doctors and hospitals",
                "Any doctor or hospital in the U.S. that takes Medicare.",
                "You may need to use doctors in the plan's network and service area (except emergencies).",
              ],
              [
                "Yearly limit on what you pay",
                "No yearly limit, unless you have extra coverage such as Medigap.",
                "Plans have a yearly limit on what you pay for covered Medicare services.",
              ],
              [
                "Monthly premium",
                "You pay the Part B premium, plus a premium for a drug plan if you join one.",
                "You pay the Part B premium and may also pay a premium for the plan.",
              ],
              [
                "Prescription drugs",
                "You can join a separate drug plan (Part D).",
                "Most plans include drug coverage.",
              ],
              [
                "Extra benefits (dental, vision, hearing)",
                "Most of these are not covered.",
                "Some plans offer extra benefits. They vary by plan.",
              ],
              [
                "Approvals and referrals",
                "In most cases, no prior approval or referral is needed.",
                "You may need approval before some services, or a referral to see a specialist.",
              ],
              [
                "Medigap",
                "You may be able to buy a Medigap policy.",
                "You can't use a Medigap policy with a Medicare Advantage plan.",
              ],
            ],
          },
          {
            type: "note",
            text: "Neither option is the best for everyone. What fits you depends on your doctors, your medicines, your budget and how you like to get care. Plans, costs and benefits change every year and depend on where you live.",
          },
        ],
      },
      {
        id: "compare",
        heading: "What to check when you compare coverage",
        blocks: [
          {
            type: "list",
            items: [
              "Are your doctors, specialists and hospital in the plan's network?",
              "Are your medicines covered, and how much would they cost?",
              "Which pharmacy do you use, and is it in the network?",
              "What would you pay each month, and what is the most you could pay in a year?",
              "Do you need a referral or an approval for the care you use most?",
              "Do you travel or spend part of the year outside the plan's area?",
            ],
          },
        ],
      },
      {
        id: "dates",
        heading: "When can you sign up or make changes?",
        blocks: [
          {
            type: "list",
            items: [
              "Initial Enrollment Period: usually 7 months around your 65th birthday. It starts 3 months before the month you turn 65 and ends 3 months after it.",
              "Open Enrollment: every year from October 15 to December 7. Changes start on January 1.",
              "Medicare Advantage Open Enrollment: January 1 to March 31, only if you already have a Medicare Advantage plan. You can switch plans or go back to Original Medicare.",
              "Special Enrollment Periods: for certain life changes, for example if you move, lose other coverage, or get Medicaid or Extra Help.",
            ],
          },
          {
            type: "note",
            text: "If you miss your first chance to sign up, you may have to wait and may pay a late enrollment penalty. Always confirm your dates on Medicare.gov or with Social Security.",
          },
        ],
      },
      {
        id: "office",
        heading: "How our office can help",
        blocks: [
          {
            type: "p",
            text: "{agentFirst} can explain these choices in plain words, in person or by phone, and answer your questions before you decide.",
          },
          { type: "scope", items: ["medicareAdvantage", "partD", "medigap"] },
        ],
      },
      {
        id: "sources",
        heading: "Official information",
        blocks: [
          {
            type: "links",
            items: [
              { label: "Medicare.gov: Get started with Medicare", href: `${MEDICARE}/basics/get-started-with-medicare`, text: "Who is eligible and how to sign up." },
              {
                label: "Medicare.gov: Compare Original Medicare and Medicare Advantage",
                href: `${MEDICARE}/basics/get-started-with-medicare/get-more-coverage/your-coverage-options/compare-original-medicare-medicare-advantage`,
                text: "The official comparison this page is based on.",
              },
              { label: "Medicare.gov: Joining a plan", href: `${MEDICARE}/basics/get-started-with-medicare/get-more-coverage/joining-a-plan`, text: "Enrollment periods and dates." },
              { label: "Medicare Plan Finder", href: `${MEDICARE}/plan-compare/`, text: "Every plan available in your area." },
              { label: "1-800-MEDICARE (1-800-633-4227)", href: `${MEDICARE}/talk-to-someone`, text: "Open 24 hours a day, 7 days a week. TTY: 1-877-486-2048." },
            ],
          },
        ],
      },
    ],
    related: ["dual", "firstVisit", "faq"],
  },

  medicaid: {
    metaTitle: "Medicaid in El Paso, TX: What It Is and How to Apply",
    metaDescription:
      "What Medicaid is, who decides eligibility in Texas, and where to apply. Plain-language guidance for seniors and people with disabilities in El Paso.",
    label: "Medicaid",
    title: "Medicaid in Texas: the basics",
    intro:
      "Medicaid is a health coverage program for people with limited income and resources. In Texas it is run by Texas Health and Human Services (HHS), which decides who qualifies.",
    sections: [
      {
        id: "what",
        heading: "What is Medicaid?",
        blocks: [
          {
            type: "p",
            text: "Medicaid is run together by the federal government and each state. Each state sets its own rules about who qualifies and what is covered, so the rules in Texas may be different from other states.",
          },
          {
            type: "p",
            text: "In Texas, Medicaid has programs for children and families, for seniors, and for adults with disabilities. Some programs help with long-term care or care at home.",
          },
          {
            type: "image",
            image: "texasMedicaidCard",
            alt: "Blank Texas Medicaid ID card with the Your Texas Benefits and Health and Human Services Commission logo, and empty fields for the member name and Medicaid ID",
            caption: "Example of a Texas Medicaid ID card (Your Texas Benefits), shown blank, with no personal information.",
          },
        ],
      },
      {
        id: "who",
        heading: "Who decides if you qualify?",
        blocks: [
          {
            type: "p",
            text: "Only Texas HHS can decide if you qualify. It looks at things like your income, your resources, your age or disability, and where you live. Our office can't tell you whether you will be approved.",
          },
          {
            type: "note",
            text: "Be careful with anyone who promises that you will qualify or get a benefit. Only the state can make that decision.",
          },
        ],
      },
      {
        id: "apply",
        heading: "How to apply in Texas",
        blocks: [
          {
            type: "steps",
            items: [
              { title: "Apply online", text: "Go to YourTexasBenefits.com to learn about programs, apply and check your case." },
              { title: "Get local help", text: "You can dial 2-1-1 or visit 211texas.org to find help near you." },
              { title: "Answer the state's letters", text: "Texas HHS may ask for documents. Keep copies and answer before the date in the letter." },
            ],
          },
        ],
      },
      {
        id: "medicare",
        heading: "If you also have Medicare",
        blocks: [
          {
            type: "p",
            text: "Some people qualify for Medicare and Medicaid at the same time. Medicaid can also help some people pay their Medicare costs. Read our page about having both programs.",
          },
        ],
      },
      {
        id: "office",
        heading: "How our office can help",
        blocks: [
          {
            type: "p",
            text: "We can explain how Medicaid works with other coverage and what the application usually asks for, so you know what to expect.",
          },
          { type: "scope", items: ["medicaidApplications"] },
        ],
      },
      {
        id: "sources",
        heading: "Official information",
        blocks: [
          {
            type: "links",
            items: [
              { label: "YourTexasBenefits.com", href: "https://www.yourtexasbenefits.com/Learn/Home", text: "Apply for Medicaid and other Texas benefits." },
              { label: "Texas HHS: Medicaid and CHIP", href: "https://www.hhs.texas.gov/services/health/medicaid-chip", text: "Programs for seniors, people with disabilities and families." },
              { label: "2-1-1 Texas", href: "https://www.211texas.org/", text: "Find local help. Dial 2-1-1." },
            ],
          },
        ],
      },
    ],
    related: ["dual", "firstVisit", "resources"],
  },

  dual: {
    metaTitle: "Medicare and Medicaid Together (Dual Eligibility) in El Paso, TX",
    metaDescription:
      "Can you have Medicare and Medicaid at the same time? How the two work together, help with Medicare costs, and where to check your options in Texas.",
    label: "Medicare and Medicaid",
    title: "Having Medicare and Medicaid at the same time",
    intro:
      "Some people qualify for both programs. They are often called “dual eligible.” Having both can lower what you pay for care, but the rules are detailed, so it helps to understand the basics.",
    sections: [
      {
        id: "how",
        heading: "How the two programs work together",
        blocks: [
          {
            type: "list",
            items: [
              "Medicare pays first for the services it covers.",
              "Medicaid pays last, after Medicare and any other insurance you have.",
              "Medicaid may cover some things Medicare doesn't, depending on the program you qualify for.",
            ],
          },
        ],
      },
      {
        id: "costs",
        heading: "Help with Medicare costs",
        blocks: [
          {
            type: "list",
            items: [
              "Medicare Savings Programs: run by the state. They can help pay Medicare Part A and Part B premiums, and in some cases other costs.",
              "Extra Help: a program that lowers prescription drug costs. People with full Medicaid get it automatically.",
            ],
          },
          { type: "note", text: "Texas decides who qualifies for Medicaid and for Medicare Savings Programs. Ask the state to review your case." },
        ],
      },
      {
        id: "plans",
        heading: "Plans for people with both",
        blocks: [
          {
            type: "p",
            text: "There are Medicare plans designed for people who have both Medicare and Medicaid, called Dual Eligible Special Needs Plans (D-SNPs). Whether one is available, and whether it fits you, depends on where you live and on your Medicaid coverage.",
          },
          {
            type: "p",
            text: "If you have both programs, you may also have more chances during the year to change your Medicare coverage. Check your options on Medicare.gov.",
          },
        ],
      },
      {
        id: "office",
        heading: "How our office can help",
        blocks: [
          {
            type: "p",
            text: "Bring your Medicare and Medicaid letters or cards, and we can help you understand what you have now and what questions to ask.",
          },
          { type: "scope", items: ["dsnp", "medicaidApplications"] },
        ],
      },
      {
        id: "sources",
        heading: "Official information",
        blocks: [
          {
            type: "links",
            items: [
              { label: "Medicare.gov: Medicaid", href: `${MEDICARE}/basics/costs/help/medicaid`, text: "How Medicare and Medicaid work together." },
              { label: "Medicare.gov: Medicare Savings Programs", href: `${MEDICARE}/basics/costs/help/medicare-savings-programs`, text: "Help paying Medicare premiums." },
              { label: "Medicare.gov: Extra Help", href: `${MEDICARE}/basics/costs/help/drug-costs`, text: "Help with prescription drug costs." },
              {
                label: "Texas HHS: Medicare and Medicaid dual coverage",
                href: "https://www.hhs.texas.gov/services/health/medicaid-chip/medicaid-chip-programs-services/options-medicare-medicaid-dual-coverage",
                text: "Options in Texas for people with both.",
              },
              { label: "YourTexasBenefits.com", href: "https://www.yourtexasbenefits.com/Learn/Home", text: "Apply for Texas programs." },
            ],
          },
        ],
      },
    ],
    related: ["medicare", "medicaid", "firstVisit"],
  },

  aca: {
    metaTitle: "Health Insurance Marketplace (ACA / Obamacare) Help in El Paso, TX",
    metaDescription:
      "What the Health Insurance Marketplace is, who it is for, help with costs, open enrollment dates, and what changes when you get Medicare.",
    label: "ACA Marketplace",
    title: "The Health Insurance Marketplace (ACA / Obamacare)",
    intro:
      "The Marketplace is where people can shop for private health insurance. The law that created it is the Affordable Care Act (ACA), which many people call “Obamacare.” In Texas, the Marketplace is HealthCare.gov.",
    sections: [
      {
        id: "who",
        heading: "Who is it for?",
        blocks: [
          {
            type: "list",
            items: [
              "People and families who don't get health insurance through a job, Medicare or Medicaid.",
              "People who are losing other coverage, for example after leaving a job.",
            ],
          },
          { type: "p", text: "Marketplace plans are generally not for people who already have Medicare." },
        ],
      },
      {
        id: "costs",
        heading: "Help with the cost",
        blocks: [
          {
            type: "p",
            text: "Depending on your household income and size, you may qualify for savings on your monthly premium and, in some plans, on what you pay when you get care. The Marketplace decides this when you apply.",
          },
          { type: "note", text: "No one can promise a price or a savings amount before your application is reviewed." },
        ],
      },
      {
        id: "dates",
        heading: "When can you sign up?",
        blocks: [
          {
            type: "list",
            items: [
              "Open Enrollment for 2027 coverage: November 1, 2026 to January 15, 2027.",
              "Sign up by December 15 for coverage that starts January 1.",
              "Outside those dates, you may be able to sign up after certain life events, like losing coverage, moving or having a baby.",
            ],
          },
          { type: "p", text: "Dates can change each year. Check HealthCare.gov for the current dates." },
        ],
      },
      {
        id: "medicare",
        heading: "If you are turning 65 or getting Medicare",
        blocks: [
          {
            type: "list",
            items: [
              "Your Marketplace plan does not end on its own when Medicare starts. You need to end it yourself.",
              "Once you are eligible for Medicare Part A, you can't keep getting savings on a Marketplace plan.",
              "You can report your Medicare start date up to 3 months ahead, so your Marketplace plan ends the day before Medicare begins.",
              "Don't wait to sign up for Medicare: missing your enrollment period can mean penalties and delays.",
            ],
          },
        ],
      },
      {
        id: "office",
        heading: "How our office can help",
        blocks: [
          { type: "p", text: "We can explain how the Marketplace works and what changes when you turn 65." },
          { type: "scope", items: ["acaEnrollment"] },
        ],
      },
      {
        id: "sources",
        heading: "Official information",
        blocks: [
          {
            type: "links",
            items: [
              { label: "HealthCare.gov", href: "https://www.healthcare.gov/", text: "The official Marketplace. Call 1-800-318-2596 (TTY: 1-855-889-4325)." },
              { label: "HealthCare.gov: Dates and deadlines", href: "https://www.healthcare.gov/quick-guide/dates-and-deadlines/", text: "Open Enrollment dates for this year." },
              { label: "HealthCare.gov: Lower costs", href: "https://www.healthcare.gov/lower-costs/", text: "How savings are calculated." },
              {
                label: "HealthCare.gov: Changing from the Marketplace to Medicare",
                href: "https://www.healthcare.gov/medicare/changing-from-marketplace-to-medicare/",
                text: "What to do when you become eligible for Medicare.",
              },
            ],
          },
        ],
      },
    ],
    related: ["medicare", "medicaid", "faq"],
  },

  firstVisit: {
    metaTitle: "Your First Appointment: What to Expect and What to Bring",
    metaDescription:
      "How to prepare for your first conversation with our El Paso office: what to bring, what we'll talk about, and what you should never send online.",
    label: "Your first appointment",
    title: "Your first appointment: what to expect",
    intro:
      "Talking about health coverage can feel like a lot. Here is how to prepare, so the conversation is calm and useful. If you're not sure about anything, just call and ask.",
    sections: [
      {
        id: "steps",
        heading: "How it works",
        blocks: [
          {
            type: "steps",
            items: [
              { title: "Call the office", text: "Tell us what you need help with. We'll tell you how we can help and how to get ready." },
              { title: "Talk with {agentFirst}", text: "We listen to your situation and explain your options in plain words." },
              { title: "You decide", text: "You can take your time, ask more questions or talk it over with your family. There is no pressure." },
            ],
          },
        ],
      },
      {
        id: "bring",
        heading: "What may be useful to have with you",
        blocks: [
          { type: "p", text: "You don't need all of this. When you call, ask which items are useful for your case." },
          {
            type: "list",
            items: [
              "Your Medicare card, if you have one.",
              "Your current health insurance cards, including Medicaid if you have it.",
              "A list of your medicines, with the dose and how often you take them.",
              "The names of your doctors, specialists and pharmacy.",
              "Letters from Medicare, Social Security, Medicaid or your plan that you have questions about.",
              "Your questions, written down so you don't forget them.",
            ],
          },
        ],
      },
      {
        id: "family",
        heading: "Bringing a family member",
        blocks: [
          {
            type: "p",
            text: "Many people like to have a son, daughter or caregiver with them. Let us know when you call. You decide what information is shared and who takes part in the decision.",
          },
        ],
      },
      {
        id: "medicare-rule",
        heading: "A Medicare rule you may notice",
        blocks: [
          {
            type: "p",
            text: "Before talking about specific Medicare plans, a licensed agent has to confirm with you which types of plans you want to discuss. This is called a Scope of Appointment and is required by Medicare. It does not sign you up for anything.",
          },
        ],
      },
      {
        id: "privacy",
        heading: "Keep your information safe",
        blocks: [
          {
            type: "note",
            text: "Never send your Social Security number, Medicare number, medical records or bank details by website form, text message, email or social media. Bring your documents to the appointment instead.",
          },
        ],
      },
    ],
    related: ["faq", "medicare", "resources"],
  },

  faq: {
    metaTitle: "Questions About Medicare, Medicaid and the Marketplace",
    metaDescription:
      "Plain answers to common questions about Medicare, Medicaid, the ACA Marketplace, enrollment dates and appointments, including for family members and caregivers.",
    label: "Questions",
    title: "Frequently asked questions",
    intro: "Short answers to the questions we hear most. Every situation is different, so call us if your question isn't here.",
    sections: [
      {
        id: "medicare",
        heading: "Medicare",
        blocks: [
          {
            type: "faq",
            items: [
              {
                id: "what-is-medicare",
                question: "What is Medicare?",
                answer: [
                  "Medicare is the federal health insurance program for people 65 and older, and for some younger people with disabilities, ALS or permanent kidney failure.",
                  "It has four parts: A (hospital), B (medical), C (Medicare Advantage) and D (prescription drugs).",
                ],
              },
              {
                id: "original-vs-advantage",
                question: "What is the difference between Original Medicare and Medicare Advantage?",
                answer: [
                  "Original Medicare is run by the federal government and lets you use any doctor in the U.S. who takes Medicare. Medicare Advantage plans come from private companies approved by Medicare. They usually have a doctor network, most include drug coverage, and they have a yearly limit on what you pay.",
                  "Neither is the best for everyone. It depends on your doctors, your medicines and your budget.",
                ],
              },
              {
                id: "already-insured",
                question: "What if I already have health insurance?",
                answer: [
                  "It depends on the type of coverage, for example insurance from a job, a retiree plan or a Marketplace plan. Some coverage works with Medicare and some does not. Ask your employer or plan, and call us so we can look at your situation together.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "medicaid",
        heading: "Medicaid",
        blocks: [
          {
            type: "faq",
            items: [
              {
                id: "what-is-medicaid",
                question: "What is Medicaid?",
                answer: [
                  "Medicaid is a program for people with limited income and resources. In Texas it is run by Texas Health and Human Services, which decides who qualifies. You can apply at YourTexasBenefits.com.",
                ],
              },
              {
                id: "both",
                question: "Can I have Medicare and Medicaid at the same time?",
                answer: [
                  "Yes, some people qualify for both. Medicare pays first and Medicaid pays last. Some programs also help pay Medicare premiums or drug costs.",
                  "Texas decides who qualifies for Medicaid, so each case has to be reviewed.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "marketplace",
        heading: "ACA Marketplace",
        blocks: [
          {
            type: "faq",
            items: [
              {
                id: "what-is-marketplace",
                question: "What is the Marketplace (Obamacare)?",
                answer: [
                  "It is where people without job-based coverage, Medicare or Medicaid can shop for health insurance. In Texas it is HealthCare.gov. You may get help with the cost depending on your household income and size.",
                ],
              },
              {
                id: "marketplace-to-medicare",
                question: "I have a Marketplace plan and I'm turning 65. What should I do?",
                answer: [
                  "Sign up for Medicare during your Initial Enrollment Period, then end your Marketplace plan. It doesn't end on its own, and you can't keep getting Marketplace savings once you are eligible for Medicare Part A.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "enrollment",
        heading: "Signing up and dates",
        blocks: [
          {
            type: "faq",
            items: [
              {
                id: "turning-65",
                question: "I'm turning 65 soon. What should I do?",
                answer: [
                  "Your first chance to sign up is usually a 7-month period: 3 months before the month you turn 65, that month, and 3 months after. If you already get Social Security benefits, you are usually enrolled in Part A and Part B automatically.",
                  "Signing up late can mean penalties, so it's a good idea to start early. We can help you understand the steps.",
                ],
              },
              {
                id: "change-plan",
                question: "When can I change my Medicare plan?",
                answer: [
                  "Every year from October 15 to December 7, with changes starting January 1. If you have a Medicare Advantage plan, you can also make one change from January 1 to March 31. Some life changes give you other chances during the year.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "contact",
        heading: "Appointments and contact",
        blocks: [
          {
            type: "faq",
            items: [
              {
                id: "how-contact",
                question: "How can I contact the office?",
                answer: ["Call us during office hours or visit one of our offices. You'll find the phone number, hours and addresses at the bottom of this page."],
              },
              {
                id: "can-you-help",
                question: "Can the office help me understand my options?",
                answer: [
                  "Yes. We explain how Medicare, Medicaid and the Marketplace work and answer your questions in plain words. If something is outside what we do, we'll tell you where to find official help.",
                ],
              },
              {
                id: "bring",
                question: "What documents should I bring?",
                answer: [
                  "It may help to bring your Medicare card if you have one, your current insurance cards, a list of your medicines and the names of your doctors. Call us to ask what is useful in your case.",
                  "Please don't send your Social Security or Medicare number online.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "family",
        heading: "Family members and caregivers",
        blocks: [
          {
            type: "faq",
            items: [
              {
                id: "family-member",
                question: "Can a family member come with me?",
                answer: ["Yes, you can bring a family member or caregiver. Just let us know when you call."],
              },
              {
                id: "call-for-parent",
                question: "Can I call for my mother or father?",
                answer: [
                  "Yes, you can call to ask general questions. To talk about the details of their coverage or make decisions, your parent will usually need to take part or give permission.",
                ],
              },
            ],
          },
        ],
      },
    ],
    related: ["firstVisit", "medicare", "resources"],
  },

  resources: {
    metaTitle: "Official Medicare, Medicaid and Marketplace Resources",
    metaDescription:
      "Official phone numbers and websites for Medicare, Social Security, Texas Medicaid, free Medicare counseling in Texas and the Health Insurance Marketplace.",
    label: "Resources",
    title: "Official resources",
    intro: "These official programs can also answer your questions, at no cost. We're happy to help you use them.",
    sections: [
      {
        id: "medicare",
        heading: "Medicare and Social Security",
        blocks: [
          {
            type: "links",
            items: [
              { label: "Medicare.gov", href: MEDICARE, text: "Official Medicare website, with the Plan Finder." },
              { label: "1-800-MEDICARE (1-800-633-4227)", href: `${MEDICARE}/talk-to-someone`, text: "24 hours a day, 7 days a week. TTY: 1-877-486-2048." },
              { label: "Social Security: Medicare", href: "https://www.ssa.gov/medicare/", text: "Sign up for Part A and Part B. Phone: 1-800-772-1213." },
            ],
          },
        ],
      },
      {
        id: "counseling",
        heading: "Free Medicare counseling in Texas",
        blocks: [
          {
            type: "links",
            items: [
              {
                label: "Texas HICAP: 1-800-252-9240",
                href: "https://www.tdi.texas.gov/consumer/hicap/",
                text: "Health Information, Counseling and Advocacy Program: free, unbiased help with Medicare (Texas's State Health Insurance Assistance Program, SHIP).",
              },
            ],
          },
        ],
      },
      {
        id: "texas",
        heading: "Texas Medicaid and benefits",
        blocks: [
          {
            type: "links",
            items: [
              { label: "YourTexasBenefits.com", href: "https://www.yourtexasbenefits.com/Learn/Home", text: "Apply for Medicaid and other benefits." },
              { label: "Texas HHS: Medicaid and CHIP", href: "https://www.hhs.texas.gov/services/health/medicaid-chip", text: "Programs for seniors and people with disabilities." },
              { label: "2-1-1 Texas", href: "https://www.211texas.org/", text: "Local help with health, food, housing and more." },
            ],
          },
        ],
      },
      {
        id: "marketplace",
        heading: "Health Insurance Marketplace",
        blocks: [
          {
            type: "links",
            items: [{ label: "HealthCare.gov", href: "https://www.healthcare.gov/", text: "Phone: 1-800-318-2596 (TTY: 1-855-889-4325)." }],
          },
        ],
      },
      {
        id: "words",
        heading: "Words you may hear",
        blocks: [{ type: "glossary" }],
      },
    ],
    related: ["medicare", "faq", "firstVisit"],
  },
};
