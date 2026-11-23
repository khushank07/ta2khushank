export interface SyllabusTopic {
  id: string;
  title: string;
  group?: string;
}

export interface SyllabusUnit {
  id: 'unit-1' | 'unit-2' | 'unit-3' | 'unit-4';
  code: string;
  roman: string;
  subtitle: string;
  teachingHours: number;
  verbatimText: string;
  topics: SyllabusTopic[];
}

export const COURSE_META = {
  code: 'FSMS23 SIII SP-V P1',
  title: 'Cyber Law, Risk and Compliance',
  fullTitle: 'FSMS23 SIII SP-V P1: CYBER LAW, RISK AND COMPLIANCE',
  schemeHeading: 'Teaching and Examination Scheme',
  totalCredits: 4,
  totalHours: 60,
  totalMarks: 200,
};

export const TEACHING_AND_EXAM_SCHEME = {
  teaching: {
    L: 4,
    T: 0,
    P: 0,
    C: 4,
    TCH: 4,
  },
  examination: {
    theory: {
      internal: {
        ta: { marks: '50', hrs: '01:30' },
        mse: { marks: '50', hrs: '01:30' },
      },
      university: { marks: '100', hrs: '03:00' },
    },
    practical: {
      universityLpw: { marks: '-', hrs: '-' },
    },
    total: '200',
  },
  notes: [
    '*Note: L- Lecture; T- Tutorial, P- Practical & C- Credit',
    '1 C = 1 Hour of Lecture / Tutorial and 1 C = 2 Hours of Practical / Project.',
    'TA-2 will be in the form of assignments or workshops.',
  ],
};

export const COURSE_OBJECTIVE =
  'The primary objective of this course is to learn Security Audit and Compliance. Understand the process of security audit, the industry standard practice for auditing, the risk and continuity planning and the legal aspects.';

export const COURSE_LEARNING_OUTCOMES = [
  'Security assessment and its compliance.',
  'Different network infrastructure and its components.',
  'Risk Analysis, Identification, response and mitigation management concepts.',
  'Cybercrime, cyber law and disaster recovery fundamentals.',
];

export const SYLLABUS_UNITS: SyllabusUnit[] = [
  {
    id: 'unit-1',
    code: 'UNIT-I',
    roman: 'I',
    subtitle: 'IT Security Assessment, Governance, Audit Process & CAATs',
    teachingHours: 15,
    verbatimText:
      'What is IT security assessment? What is an IT security audit? What is compliance? How does an audit differ from an assessment? Why are governance and compliance important? What if an organization does not comply with compliance Laws? What is the scope of an IT Compliance audit?, Defining the scope for audit, Identifying critical requirements for audit, assessing IT security, Understanding Audit Plan, Audit Process, Types of IT Audits, Computer Assisted Audit Techniques, CAATs for Sampling, CAATs for Application Reviews, CAATs for Auditing Application Controls',
    topics: [
      { id: 'u1-1', title: 'What is IT security assessment?', group: 'Foundations & Governance' },
      { id: 'u1-2', title: 'What is an IT security audit?', group: 'Foundations & Governance' },
      { id: 'u1-3', title: 'What is compliance?', group: 'Foundations & Governance' },
      { id: 'u1-4', title: 'How does an audit differ from an assessment?', group: 'Foundations & Governance' },
      { id: 'u1-5', title: 'Why are governance and compliance important?', group: 'Foundations & Governance' },
      { id: 'u1-6', title: 'What if an organization does not comply with compliance Laws?', group: 'Foundations & Governance' },
      { id: 'u1-7', title: 'What is the scope of an IT Compliance audit?', group: 'Audit Scoping & Execution' },
      { id: 'u1-8', title: 'Defining the scope for audit', group: 'Audit Scoping & Execution' },
      { id: 'u1-9', title: 'Identifying critical requirements for audit', group: 'Audit Scoping & Execution' },
      { id: 'u1-10', title: 'Assessing IT security', group: 'Audit Scoping & Execution' },
      { id: 'u1-11', title: 'Understanding Audit Plan', group: 'Audit Scoping & Execution' },
      { id: 'u1-12', title: 'Audit Process', group: 'Audit Scoping & Execution' },
      { id: 'u1-13', title: 'Types of IT Audits', group: 'Audit Scoping & Execution' },
      { id: 'u1-14', title: 'Computer Assisted Audit Techniques', group: 'CAATs' },
      { id: 'u1-15', title: 'CAATs for Sampling', group: 'CAATs' },
      { id: 'u1-16', title: 'CAATs for Application Reviews', group: 'CAATs' },
      { id: 'u1-17', title: 'CAATs for Auditing Application Controls', group: 'CAATs' },
    ],
  },
  {
    id: 'unit-2',
    code: 'UNIT-II',
    roman: 'II',
    subtitle: 'Seven Domains of IT Infrastructure & Domain Compliance',
    teachingHours: 15,
    verbatimText:
      'Identifying the minimum Acceptable Level of Risk and Appropriate Security Baseline Definitions, Seven Domains of a Typical IT infrastructure, Writing the IT Infrastructure Audit Report, Compliance within User Domain: Compliance law requirements and business drivers, Items commonly found in the user domain, Compliance within the workstation domain: Compliance law requirements and business drivers, devices and components commonly found in the workstation domain, Maximizing C-I-A, Compliance within LAN Domain: Compliance law requirements and business drivers, devices and components commonly found in the LAN domain, Compliance within WAN Domain: Devices and Components Commonly Found in the Domain, Penetration Testing and Validating Configurations, Compliance within Remote Access and Application Domain: Devices and Components Commonly Found in the Domain, Application Server Vulnerability Management, Application Patch Management',
    topics: [
      {
        id: 'u2-1',
        title: 'Identifying the minimum Acceptable Level of Risk and Appropriate Security Baseline Definitions',
        group: 'Baselines & Reporting',
      },
      { id: 'u2-2', title: 'Seven Domains of a Typical IT infrastructure', group: 'Baselines & Reporting' },
      { id: 'u2-3', title: 'Writing the IT Infrastructure Audit Report', group: 'Baselines & Reporting' },
      {
        id: 'u2-4',
        title: 'Compliance within User Domain: Compliance law requirements and business drivers',
        group: 'User & Workstation Domains',
      },
      { id: 'u2-5', title: 'Items commonly found in the user domain', group: 'User & Workstation Domains' },
      {
        id: 'u2-6',
        title: 'Compliance within the workstation domain: Compliance law requirements and business drivers',
        group: 'User & Workstation Domains',
      },
      {
        id: 'u2-7',
        title: 'Devices and components commonly found in the workstation domain',
        group: 'User & Workstation Domains',
      },
      { id: 'u2-8', title: 'Maximizing C-I-A', group: 'User & Workstation Domains' },
      {
        id: 'u2-9',
        title: 'Compliance within LAN Domain: Compliance law requirements and business drivers',
        group: 'LAN & WAN Domains',
      },
      { id: 'u2-10', title: 'Devices and components commonly found in the LAN domain', group: 'LAN & WAN Domains' },
      {
        id: 'u2-11',
        title: 'Compliance within WAN Domain: Devices and Components Commonly Found in the Domain',
        group: 'LAN & WAN Domains',
      },
      { id: 'u2-12', title: 'Penetration Testing and Validating Configurations', group: 'LAN & WAN Domains' },
      {
        id: 'u2-13',
        title: 'Compliance within Remote Access and Application Domain: Devices and Components Commonly Found in the Domain',
        group: 'Remote Access & Application Domain',
      },
      { id: 'u2-14', title: 'Application Server Vulnerability Management', group: 'Remote Access & Application Domain' },
      { id: 'u2-15', title: 'Application Patch Management', group: 'Remote Access & Application Domain' },
    ],
  },
  {
    id: 'unit-3',
    code: 'UNIT-III',
    roman: 'III',
    subtitle: 'Risk Management & Business Continuity Planning (BCP)',
    teachingHours: 15,
    verbatimText:
      'Introduction to Risk Analysis, Risk Identification, Risk Assessment, Risk Response and Mitigation, Risk Reporting, Introduction to Business Continuity Planning (BCP), Overview of BCP Life Cycle, Need for BCP, Identifying and Selecting Business Continuity Strategies',
    topics: [
      { id: 'u3-1', title: 'Introduction to Risk Analysis', group: 'Risk Management' },
      { id: 'u3-2', title: 'Risk Identification', group: 'Risk Management' },
      { id: 'u3-3', title: 'Risk Assessment', group: 'Risk Management' },
      { id: 'u3-4', title: 'Risk Response and Mitigation', group: 'Risk Management' },
      { id: 'u3-5', title: 'Risk Reporting', group: 'Risk Management' },
      { id: 'u3-6', title: 'Introduction to Business Continuity Planning (BCP)', group: 'Business Continuity Planning' },
      { id: 'u3-7', title: 'Overview of BCP Life Cycle', group: 'Business Continuity Planning' },
      { id: 'u3-8', title: 'Need for BCP', group: 'Business Continuity Planning' },
      { id: 'u3-9', title: 'Identifying and Selecting Business Continuity Strategies', group: 'Business Continuity Planning' },
    ],
  },
  {
    id: 'unit-4',
    code: 'UNIT-IV',
    roman: 'IV',
    subtitle: 'Disaster Recovery, Cyber Law, Ethics & Auditing Frameworks',
    teachingHours: 15,
    verbatimText:
      'Introduction to Disaster Recovery (DR) planning, Identification of potential disaster status, DR Strategies, Plans for Business Resumption, Category to Cyber-crime, Cyber Law, IT Act 2000 and its amendments, International Cyber Laws, Cyber Ethics, Child Sexual Abuse Material related to cyber domain, various acts related to social media, privacy and security on cyber domain, Auditing Standards and Frameworks: ISO/IEC 27001/2, COBIT, SOC Compliance, HIPAA, Case Studies.',
    topics: [
      { id: 'u4-1', title: 'Introduction to Disaster Recovery (DR) planning', group: 'Disaster Recovery' },
      { id: 'u4-2', title: 'Identification of potential disaster status', group: 'Disaster Recovery' },
      { id: 'u4-3', title: 'DR Strategies', group: 'Disaster Recovery' },
      { id: 'u4-4', title: 'Plans for Business Resumption', group: 'Disaster Recovery' },
      { id: 'u4-5', title: 'Category to Cyber-crime', group: 'Cyber Law & Ethics' },
      { id: 'u4-6', title: 'Cyber Law', group: 'Cyber Law & Ethics' },
      { id: 'u4-7', title: 'IT Act 2000 and its amendments', group: 'Cyber Law & Ethics' },
      { id: 'u4-8', title: 'International Cyber Laws', group: 'Cyber Law & Ethics' },
      { id: 'u4-9', title: 'Cyber Ethics', group: 'Cyber Law & Ethics' },
      { id: 'u4-10', title: 'Child Sexual Abuse Material related to cyber domain', group: 'Cyber Law & Ethics' },
      { id: 'u4-11', title: 'Various acts related to social media, privacy and security on cyber domain', group: 'Cyber Law & Ethics' },
      {
        id: 'u4-12',
        title: 'Auditing Standards and Frameworks: ISO/IEC 27001/2, COBIT, SOC Compliance, HIPAA',
        group: 'Standards & Case Studies',
      },
      { id: 'u4-13', title: 'Case Studies', group: 'Standards & Case Studies' },
    ],
  },
];

export const SOURCE_SCAN_IMAGES = [
  {
    id: 'page-1',
    label: 'Page 1 — Scheme, Objective, Outcomes & Unit I',
    src: '/assets/aistudio/image_9843e1d1.png',
    alt: 'Original syllabus page 1 showing FSMS23 SIII SP-V P1 Teaching and Examination Scheme, Course Objective, Learning Outcomes, and Unit I',
  },
  {
    id: 'page-2',
    label: 'Page 2 — Units II, III & IV',
    src: '/assets/aistudio/image_68ef90c5.png',
    alt: 'Original syllabus page 2 showing Unit II, Unit III, and Unit IV topics and teaching hours',
  },
];
