const { 
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
  Header, Footer, AlignmentType, LevelFormat, TableOfContents, HeadingLevel, 
  BorderStyle, WidthType, ShadingType, VerticalAlign, PageNumber, PageBreak 
} = require('docx');
const fs = require('fs');

// Color Palette - Midnight Code
const colors = {
  primary: "020617",
  bodyText: "1E293B",
  secondary: "64748B",
  accent: "94A3B8",
  tableBg: "F8FAFC"
};

// Table border style
const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: colors.secondary };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

// Helper function to create a table cell
function createCell(text, options = {}) {
  const { bold = false, header = false, align = AlignmentType.LEFT, width = 2000 } = options;
  return new TableCell({
    borders: cellBorders,
    width: { size: width, type: WidthType.DXA },
    shading: header ? { fill: colors.tableBg, type: ShadingType.CLEAR } : undefined,
    verticalAlign: VerticalAlign.CENTER,
    children: [
      new Paragraph({
        alignment: align,
        spacing: { before: 80, after: 80 },
        children: [
          new TextRun({
            text: text,
            bold: bold || header,
            size: header ? 24 : 22,
            font: "Arial",
            color: header ? colors.primary : colors.bodyText
          })
        ]
      })
    ]
  });
}

// Helper function to create heading paragraph
function createHeading(text, level) {
  return new Paragraph({
    heading: level,
    spacing: { before: 300, after: 200 },
    children: [
      new TextRun({
        text: text,
        bold: true,
        font: "Arial",
        size: level === HeadingLevel.HEADING_1 ? 36 : level === HeadingLevel.HEADING_2 ? 30 : 26,
        color: colors.primary
      })
    ]
  });
}

// Helper function to create body paragraph
function createParagraph(text, options = {}) {
  const { indent = true, spacing = { before: 120, after: 120 } } = options;
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: spacing,
    indent: indent ? { firstLine: 480 } : undefined,
    children: [
      new TextRun({
        text: text,
        font: "Arial",
        size: 24,
        color: colors.bodyText
      })
    ]
  });
}

// Helper function to create bullet list
function createBulletItem(text, reference = "main-list") {
  return new Paragraph({
    numbering: { reference: reference, level: 0 },
    spacing: { before: 80, after: 80 },
    children: [
      new TextRun({
        text: text,
        font: "Arial",
        size: 24,
        color: colors.bodyText
      })
    ]
  });
}

// Engineering branches data
const coreBranches = [
  {
    name: "Civil Engineering",
    definition: "Civil Engineering is one of the oldest and most fundamental branches of engineering that deals with the design, construction, and maintenance of infrastructure projects. This includes buildings, roads, bridges, dams, airports, water supply systems, and other structures that form the backbone of modern civilization. Civil engineers play a crucial role in shaping the physical environment around us, ensuring that structures are safe, sustainable, and efficient.",
    subjects: ["Structural Analysis", "Geotechnical Engineering", "Transportation Engineering", "Hydraulics & Water Resources", "Construction Management", "Environmental Engineering", "Surveying", "Concrete Technology"],
    skills: ["Technical Drawing & CAD", "Project Management", "Structural Analysis", "Problem Solving", "Communication Skills", "Site Management"],
    careers: ["Structural Engineer", "Construction Manager", "Geotechnical Engineer", "Transportation Planner", "Water Resources Engineer", "Urban Planner"],
    recruiters: ["L&T Construction", "Tata Projects", "Gammon India", "HCC", "DLF", "Shapoorji Pallonji"],
    salary: "Rs. 3-8 LPA (Entry), Rs. 8-20 LPA (Experienced)"
  },
  {
    name: "Mechanical Engineering",
    definition: "Mechanical Engineering is a diverse and versatile branch that applies principles of physics, mathematics, and material science to design, analyze, manufacture, and maintain mechanical systems. It encompasses everything from small individual parts to large complex systems like vehicles and industrial machinery. Mechanical engineers work across industries including automotive, aerospace, energy, manufacturing, and robotics.",
    subjects: ["Thermodynamics", "Fluid Mechanics", "Strength of Materials", "Machine Design", "Manufacturing Processes", "Heat Transfer", "Kinematics of Machines", "CAD/CAM"],
    skills: ["Technical Drawing", "Problem Analysis", "Computer-Aided Design", "Mathematical Skills", "Innovation & Creativity", "Team Collaboration"],
    careers: ["Design Engineer", "Manufacturing Engineer", "Automotive Engineer", "HVAC Engineer", "Quality Assurance Engineer", "R&D Engineer"],
    recruiters: ["Tata Motors", "Mahindra & Mahindra", "Maruti Suzuki", "Bajaj Auto", "L&T", "Godrej", "BHEL"],
    salary: "Rs. 3.5-8 LPA (Entry), Rs. 8-25 LPA (Experienced)"
  },
  {
    name: "Electrical Engineering",
    definition: "Electrical Engineering focuses on the study, design, and application of electrical systems, equipment, and devices. It covers a wide range of areas including power generation and distribution, control systems, telecommunications, and signal processing. Electrical engineers are essential in developing and maintaining the electrical infrastructure that powers modern society.",
    subjects: ["Electrical Machines", "Power Systems", "Control Systems", "Electrical Measurements", "Power Electronics", "High Voltage Engineering", "Switchgear & Protection", "Renewable Energy Systems"],
    skills: ["Circuit Analysis", "Programming Skills", "Technical Documentation", "Problem Solving", "Project Management", "Safety Awareness"],
    careers: ["Electrical Design Engineer", "Power Systems Engineer", "Control Engineer", "Project Manager", "Research Engineer", "Maintenance Engineer"],
    recruiters: ["BHEL", "NTPC", "Power Grid Corporation", "Siemens", "ABB", "Schneider Electric", "Havells", "Tata Power"],
    salary: "Rs. 3.5-7 LPA (Entry), Rs. 7-20 LPA (Experienced)"
  },
  {
    name: "Chemical Engineering",
    definition: "Chemical Engineering combines principles of chemistry, physics, mathematics, and economics to design, operate, and optimize processes for producing chemicals, materials, and energy. It plays a crucial role in industries ranging from pharmaceuticals to petrochemicals, contributing to the development of new materials, fuels, and consumer products.",
    subjects: ["Chemical Reaction Engineering", "Mass Transfer", "Heat Transfer", "Fluid Mechanics", "Process Control", "Thermodynamics", "Chemical Process Technology", "Biochemical Engineering"],
    skills: ["Process Simulation", "Laboratory Skills", "Data Analysis", "Safety Management", "Environmental Awareness", "Problem Solving"],
    careers: ["Process Engineer", "Chemical Plant Manager", "Research Scientist", "Quality Control Engineer", "Environmental Engineer", "Pharmaceutical Engineer"],
    recruiters: ["Reliance Industries", "IOCL", "BPCL", "HPCL", "ONGC", "GAIL", "L&T Hydrocarbon", "Dr. Reddy's"],
    salary: "Rs. 4-9 LPA (Entry), Rs. 9-25 LPA (Experienced)"
  }
];

const computerBranches = [
  {
    name: "Computer Engineering",
    definition: "Computer Engineering integrates electrical engineering and computer science to develop computer systems and technological solutions. This field covers hardware design, software development, and the integration of both to create innovative computing solutions. Computer engineers work on everything from embedded systems to large-scale distributed systems.",
    subjects: ["Data Structures & Algorithms", "Operating Systems", "Database Management Systems", "Computer Networks", "Software Engineering", "Computer Architecture", "Web Technologies", "Machine Learning"],
    skills: ["Programming Languages", "Problem Solving", "System Design", "Algorithm Design", "Debugging Skills", "Version Control"],
    careers: ["Software Developer", "Systems Engineer", "Full Stack Developer", "DevOps Engineer", "Technical Architect", "IT Consultant"],
    recruiters: ["Google", "Microsoft", "Amazon", "TCS", "Infosys", "Wipro", "Accenture", "Cognizant"],
    salary: "Rs. 6-15 LPA (Entry), Rs. 15-50 LPA (Experienced)"
  },
  {
    name: "Information Technology",
    definition: "Information Technology focuses on the application of computers and telecommunications equipment to store, retrieve, transmit, and manipulate data. IT professionals work on implementing and managing computer-based information systems that support business operations and decision-making processes.",
    subjects: ["Web Programming", "Information Security", "Cloud Computing", "Data Warehousing", "Mobile Application Development", "Enterprise Resource Planning", "Business Intelligence", "IT Project Management"],
    skills: ["Programming Skills", "Database Management", "Network Administration", "Problem Solving", "Project Management", "Technical Documentation"],
    careers: ["IT Manager", "Systems Administrator", "Database Administrator", "Network Engineer", "IT Consultant", "Business Analyst"],
    recruiters: ["TCS", "Infosys", "Wipro", "HCL", "Tech Mahindra", "Capgemini", "IBM", "HP"],
    salary: "Rs. 4-10 LPA (Entry), Rs. 10-30 LPA (Experienced)"
  },
  {
    name: "Artificial Intelligence & Data Science",
    definition: "AI & Data Science is an emerging field that combines machine learning, statistical analysis, and big data technologies to extract insights from data and build intelligent systems. This specialization focuses on developing algorithms and models that enable computers to learn from data and make predictions or decisions.",
    subjects: ["Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision", "Big Data Analytics", "Statistical Methods", "Neural Networks", "Reinforcement Learning"],
    skills: ["Python/R Programming", "Statistical Analysis", "Machine Learning", "Data Visualization", "Deep Learning Frameworks", "Big Data Technologies"],
    careers: ["Data Scientist", "AI Engineer", "Machine Learning Engineer", "Data Analyst", "Research Scientist", "AI Product Manager"],
    recruiters: ["Google", "Microsoft", "Amazon", "Flipkart", "Swiggy", "Zomato", "Ola", "PhonePe"],
    salary: "Rs. 8-20 LPA (Entry), Rs. 20-60 LPA (Experienced)"
  },
  {
    name: "Cyber Security",
    definition: "Cyber Security focuses on protecting computer systems, networks, and data from unauthorized access, attacks, and damage. With increasing digitalization, this field has become critical for organizations to safeguard their digital assets and maintain privacy. Cyber security professionals design and implement security measures to protect information systems.",
    subjects: ["Network Security", "Cryptography", "Ethical Hacking", "Digital Forensics", "Information Security Management", "Cloud Security", "Malware Analysis", "Security Policies"],
    skills: ["Network Security", "Penetration Testing", "Security Analysis", "Incident Response", "Programming Skills", "Risk Assessment"],
    careers: ["Security Analyst", "Penetration Tester", "Security Architect", "CISO", "Security Consultant", "Forensic Analyst"],
    recruiters: ["Palo Alto Networks", "CrowdStrike", "McAfee", "Symantec", "Quick Heal", "TCS Cyber Security"],
    salary: "Rs. 5-12 LPA (Entry), Rs. 12-40 LPA (Experienced)"
  }
];

const electronicsBranches = [
  {
    name: "Electronics & Telecommunication",
    definition: "Electronics & Telecommunication Engineering combines electronics engineering with telecommunication technologies. This field covers the design, development, and maintenance of communication systems, satellite communication, and networking infrastructure that enable modern connectivity.",
    subjects: ["Analog & Digital Communication", "Signal Processing", "Antenna Theory", "Optical Communication", "Mobile Communication", "Satellite Communication", "Network Analysis", "VLSI Design"],
    skills: ["Circuit Design", "Signal Processing", "Communication Protocols", "MATLAB/Simulink", "PCB Design", "Network Analysis"],
    careers: ["Telecom Engineer", "RF Engineer", "Network Planning Engineer", "Communication Systems Engineer", "Signal Processing Engineer"],
    recruiters: ["Ericsson", "Nokia", "Huawei", "Qualcomm", "Airtel", "Jio", "BSNL", "BEL"],
    salary: "Rs. 4-9 LPA (Entry), Rs. 9-25 LPA (Experienced)"
  },
  {
    name: "Electronics Engineering",
    definition: "Electronics Engineering focuses on the design and development of electronic circuits, devices, and systems. This field covers areas such as microprocessors, embedded systems, and consumer electronics. Electronics engineers work on developing innovative electronic products and systems.",
    subjects: ["Electronic Devices & Circuits", "Digital Electronics", "Microprocessors", "Control Systems", "Electronic Measurements", "Consumer Electronics", "Power Electronics", "Integrated Circuits"],
    skills: ["Circuit Design", "PCB Layout", "Microcontroller Programming", "Testing & Debugging", "Technical Documentation", "Problem Solving"],
    careers: ["Electronics Engineer", "Embedded Systems Engineer", "Hardware Designer", "Test Engineer", "Applications Engineer"],
    recruiters: ["Samsung", "LG", "Sony", "Philips", "Toshiba", "Bosch", "Honeywell", "Texas Instruments"],
    salary: "Rs. 3.5-8 LPA (Entry), Rs. 8-22 LPA (Experienced)"
  },
  {
    name: "VLSI Design",
    definition: "VLSI (Very Large Scale Integration) Design focuses on creating integrated circuits by combining millions of transistors into a single chip. This specialized field involves chip design, verification, and testing for various applications including processors, memory chips, and custom ASICs.",
    subjects: ["VLSI Design", "Digital System Design", "CMOS Technology", "Verilog/VHDL", "Physical Design", "ASIC Design", "FPGA Programming", "Semiconductor Physics"],
    skills: ["HDL Programming", "Digital Design", "Physical Design Tools", "Verification Methods", "Circuit Simulation", "Layout Design"],
    careers: ["VLSI Design Engineer", "ASIC Engineer", "FPGA Engineer", "Verification Engineer", "Physical Design Engineer", "CAD Engineer"],
    recruiters: ["Intel", "AMD", "Qualcomm", "NVIDIA", "Samsung Semiconductor", "MediaTek", "Broadcom", "Apple"],
    salary: "Rs. 6-15 LPA (Entry), Rs. 15-50 LPA (Experienced)"
  }
];

const specializedBranches = [
  {
    name: "Biotechnology Engineering",
    definition: "Biotechnology Engineering combines biological sciences with engineering principles to develop products and technologies for healthcare, agriculture, and environmental applications. This field involves genetic engineering, bioprocessing, and pharmaceutical development.",
    subjects: ["Genetic Engineering", "Bioprocess Engineering", "Molecular Biology", "Bioinformatics", "Immunology", "Enzyme Technology", "Bioreactor Design"],
    skills: ["Laboratory Techniques", "Data Analysis", "Research Methods", "Bioinformatics Tools", "Scientific Writing"],
    careers: ["Biotech Researcher", "Process Development Engineer", "Quality Control Engineer", "Clinical Research Associate"],
    recruiters: ["Biocon", "Serum Institute", "Bharat Biotech", "Dr. Reddy's", "Cipla", "Sun Pharma"],
    salary: "Rs. 4-9 LPA (Entry), Rs. 9-25 LPA (Experienced)"
  },
  {
    name: "Aerospace Engineering",
    definition: "Aerospace Engineering involves the design, development, testing, and production of aircraft, spacecraft, and related systems. This highly specialized field covers aerodynamics, propulsion systems, and avionics, contributing to both aviation and space exploration.",
    subjects: ["Aerodynamics", "Propulsion Systems", "Flight Mechanics", "Aircraft Structures", "Avionics", "Spacecraft Design", "Computational Fluid Dynamics"],
    skills: ["CAD/CAE Software", "Mathematical Modeling", "Structural Analysis", "Aerodynamic Analysis", "Programming Skills"],
    careers: ["Aerospace Engineer", "Aircraft Designer", "Propulsion Engineer", "Avionics Engineer", "Flight Test Engineer"],
    recruiters: ["ISRO", "DRDO", "HAL", "NAL", "Tata Advanced Systems", "Boeing India", "Airbus India"],
    salary: "Rs. 5-12 LPA (Entry), Rs. 12-35 LPA (Experienced)"
  },
  {
    name: "Automobile Engineering",
    definition: "Automobile Engineering deals with the design, development, manufacturing, and maintenance of automobiles. This field covers various aspects including vehicle dynamics, engine systems, electrical systems, and emerging technologies like electric vehicles.",
    subjects: ["Automotive Engines", "Vehicle Dynamics", "Automotive Electrical Systems", "Manufacturing Technology", "Electric Vehicles", "Automotive Electronics"],
    skills: ["CAD Software", "Engine Diagnostics", "Vehicle Testing", "Manufacturing Processes", "Problem Analysis"],
    careers: ["Automobile Engineer", "Design Engineer", "Testing Engineer", "Quality Engineer", "Electric Vehicle Engineer"],
    recruiters: ["Tata Motors", "Mahindra", "Maruti Suzuki", "Hyundai", "Honda", "Bajaj Auto", "Hero MotoCorp"],
    salary: "Rs. 4-8 LPA (Entry), Rs. 8-25 LPA (Experienced)"
  }
];

// Create the document
const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 24 }
      }
    },
    paragraphStyles: [
      {
        id: "Title",
        name: "Title",
        basedOn: "Normal",
        run: { size: 64, bold: true, color: colors.primary, font: "Arial" },
        paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER }
      },
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 36, bold: true, color: colors.primary, font: "Arial" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 30, bold: true, color: colors.primary, font: "Arial" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 }
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 26, bold: true, color: colors.bodyText, font: "Arial" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 }
      }
    ]
  },
  numbering: {
    config: [
      {
        reference: "main-list",
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: "•",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      },
      {
        reference: "numbered-list-1",
        levels: [{
          level: 0,
          format: LevelFormat.DECIMAL,
          text: "%1.",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      }
    ]
  },
  sections: [
    // Cover Page Section
    {
      properties: {
        page: {
          margin: { top: 0, right: 0, bottom: 0, left: 0 }
        }
      },
      children: [
        new Paragraph({ spacing: { before: 2000 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 600, after: 300 },
          children: [
            new TextRun({
              text: "COMPLETE GUIDE TO",
              bold: true,
              size: 40,
              font: "Arial",
              color: colors.secondary
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 200 },
          children: [
            new TextRun({
              text: "ENGINEERING STREAMS",
              bold: true,
              size: 64,
              font: "Arial",
              color: colors.primary
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 200 },
          children: [
            new TextRun({
              text: "IN MAHARASHTRA",
              bold: true,
              size: 52,
              font: "Arial",
              color: colors.primary
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400, after: 600 },
          children: [
            new TextRun({
              text: "(Degree & Diploma)",
              size: 36,
              font: "Arial",
              color: colors.bodyText
            })
          ]
        }),
        new Paragraph({ spacing: { before: 600 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
              size: 28,
              color: colors.accent
            })
          ]
        }),
        new Paragraph({ spacing: { before: 400 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200 },
          children: [
            new TextRun({
              text: "A Comprehensive Academic Report",
              italics: true,
              size: 30,
              font: "Arial",
              color: colors.secondary
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 },
          children: [
            new TextRun({
              text: "Academic Year 2026",
              size: 26,
              font: "Arial",
              color: colors.bodyText
            })
          ]
        }),
        new Paragraph({ spacing: { before: 1200 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
              size: 28,
              color: colors.accent
            })
          ]
        }),
        new Paragraph({ spacing: { before: 400 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200 },
          children: [
            new TextRun({
              text: "IT DEVELOPED UNDER BRUTALTOOLS",
              bold: true,
              size: 28,
              font: "Arial",
              color: "059669"
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100 },
          children: [
            new TextRun({
              text: "https://github.com/brutal-45/BRUTALGUIDE",
              size: 20,
              font: "Arial",
              color: colors.secondary
            })
          ]
        }),
        new Paragraph({ spacing: { before: 600 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "For College Submission",
              size: 24,
              font: "Arial",
              color: colors.secondary
            })
          ]
        }),
        new Paragraph({ children: [new PageBreak()] })
      ]
    },
    // Main Content Section
    {
      properties: {
        page: {
          margin: { top: 1800, right: 1440, bottom: 1440, left: 1440 }
        }
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: "Complete Guide to Engineering Streams in Maharashtra",
                  size: 20,
                  font: "Arial",
                  color: colors.secondary,
                  italics: true
                })
              ]
            })
          ]
        })
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "Page ", size: 20, font: "Arial", color: colors.secondary }),
                new TextRun({ children: [PageNumber.CURRENT], size: 20, font: "Arial", color: colors.secondary }),
                new TextRun({ text: " of ", size: 20, font: "Arial", color: colors.secondary }),
                new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 20, font: "Arial", color: colors.secondary })
              ]
            })
          ]
        })
      },
      children: [
        // Table of Contents
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "Table of Contents", bold: true })]
        }),
        new TableOfContents("Table of Contents", {
          hyperlink: true,
          headingStyleRange: "1-3"
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200 },
          children: [
            new TextRun({
              text: "Note: Right-click and select 'Update Field' to refresh page numbers.",
              size: 20,
              font: "Arial",
              color: colors.secondary,
              italics: true
            })
          ]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // Section 1: Introduction
        createHeading("1. Introduction", HeadingLevel.HEADING_1),
        createHeading("1.1 Overview of Engineering Education in Maharashtra", HeadingLevel.HEADING_2),
        createParagraph("Maharashtra stands as one of India's premier destinations for engineering education, boasting a rich heritage of technical institutions that have shaped the nation's industrial and technological landscape. The state is home to over 3,500 engineering colleges, including prestigious institutes like the Indian Institute of Technology (IIT) Bombay, Visvesvaraya National Institute of Technology (VNIT) Nagpur, and numerous other esteemed institutions. Mumbai, Pune, and Nagpur serve as major educational hubs, attracting students from across the country and abroad."),
        createParagraph("The engineering curriculum in Maharashtra follows the guidelines set by the All India Council for Technical Education (AICTE) and is implemented through state universities including the University of Mumbai, Savitribai Phule Pune University, and RTM Nagpur University. These institutions offer a wide range of undergraduate and postgraduate programs across various engineering disciplines, ensuring students have access to quality education in their chosen fields. The state government has also established numerous polytechnics offering diploma programs, providing alternative pathways for technical education."),
        createParagraph("The engineering education landscape in Maharashtra has evolved significantly over the decades, adapting to technological advancements and industry requirements. Modern engineering programs incorporate practical training, industry internships, and project-based learning to ensure graduates are well-prepared for professional challenges. The presence of major industrial hubs in Mumbai, Pune, and Nashik provides excellent opportunities for industrial training and placements."),

        createHeading("1.2 Importance of Choosing the Right Engineering Branch", HeadingLevel.HEADING_2),
        createParagraph("Selecting the appropriate engineering specialization is one of the most crucial decisions in a student's academic journey, as it directly influences their career trajectory, professional growth, and personal satisfaction. The choice should be based on a careful assessment of individual interests, aptitudes, market demands, and long-term career goals. A well-informed decision can lead to a fulfilling career with excellent growth opportunities."),
        createParagraph("Students must consider multiple factors when choosing their engineering branch. Personal interest in the subject matter is paramount, as it drives motivation and engagement throughout the four-year program and beyond. Students should reflect on their strengths in mathematics and science, their preference for hands-on work versus theoretical concepts, and their desire for innovation and problem-solving. Additionally, understanding the job market, growth prospects, and salary potential of different branches helps in making an informed decision."),
        createParagraph("The rapidly evolving technological landscape means that some engineering fields may see significant changes in demand and scope over time. Therefore, students should also consider the future-proofing aspects of their chosen field, looking at emerging technologies and industry trends. Consulting with professionals, attending career counseling sessions, and researching thoroughly can help students make choices aligned with their aspirations and the market reality."),

        createHeading("1.3 Scope of Engineering in India and Globally", HeadingLevel.HEADING_2),
        createParagraph("Engineering continues to offer immense scope both within India and on the global stage. In India, the government's push for initiatives like Make in India, Digital India, Smart Cities, and the National Infrastructure Pipeline has created unprecedented demand for skilled engineers across various domains. The IT sector alone employs over 4.5 million professionals and continues to grow at a significant pace."),
        createParagraph("Globally, Indian engineers are highly sought after, with countries like the USA, Germany, Canada, Australia, and the Middle East offering lucrative opportunities. Emerging fields such as Artificial Intelligence, Robotics, Renewable Energy, and Biotechnology are creating new avenues for engineering graduates. The World Economic Forum estimates that by 2025, automation and AI will create 97 million new jobs globally, many of which will require engineering expertise."),
        createParagraph("Furthermore, the transition to sustainable technologies and the global push for carbon neutrality are generating demand for engineers in renewable energy, electric vehicles, and green infrastructure projects. India's commitment to achieving net-zero emissions by 2070 opens tremendous opportunities for engineers specializing in clean energy, environmental engineering, and sustainable development. The startup ecosystem also provides exciting opportunities for engineering graduates to innovate and create their own ventures."),

        // Section 2: Career After 10th and 12th
        createHeading("2. Career Pathways After 10th and 12th Standard", HeadingLevel.HEADING_1),
        createHeading("2.1 Options After 10th Standard", HeadingLevel.HEADING_2),
        createParagraph("After completing the 10th standard, students interested in engineering have two primary pathways to consider. Each pathway has its own advantages and leads to different career opportunities. Understanding these options helps students make informed decisions aligned with their interests and circumstances."),

        createHeading("Diploma in Engineering (Polytechnic)", HeadingLevel.HEADING_3),
        createParagraph("The Diploma in Engineering is a three-year technical program offered by polytechnics across Maharashtra. Students who have passed the 10th standard with a minimum of 35% marks are eligible for admission. The admission process is typically based on 10th standard marks or through entrance examinations conducted by the state technical education board."),
        createBulletItem("Duration: 3 Years"),
        createBulletItem("Eligibility: 10th pass with minimum 35% marks"),
        createBulletItem("Admission: Based on 10th marks or entrance exam"),
        createBulletItem("Advantage: Early industry exposure and practical skills"),
        createBulletItem("Future: Lateral entry to degree programs (direct 2nd year)"),
        createBulletItem("Initial Salary Range: Rs. 1.5-3.5 LPA after diploma"),

        createHeading("11th-12th Science (PCM)", HeadingLevel.HEADING_3),
        createParagraph("Students can also opt for the traditional route of completing 11th and 12th standard with Physics, Chemistry, and Mathematics (PCM) as core subjects. This pathway provides a broader educational foundation and opens doors to various engineering and non-engineering programs."),
        createBulletItem("Duration: 2 Years for 11th-12th, plus 4 years for degree"),
        createBulletItem("Subjects: Physics, Chemistry, Mathematics, and English"),
        createBulletItem("Advantage: Broader career options including research and higher studies"),
        createBulletItem("Future: B.Tech/B.E. through JEE Main, MHT-CET, or other entrance exams"),

        createHeading("2.2 Options After 12th Standard", HeadingLevel.HEADING_2),
        createParagraph("After completing 12th standard with Science (PCM), students have multiple options to pursue engineering education. The most common path is through a four-year Bachelor of Technology (B.Tech) or Bachelor of Engineering (B.E.) program. Admission to these programs is primarily through entrance examinations."),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [3000, 3000, 3000],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              children: [
                createCell("Program", { header: true, width: 3000 }),
                createCell("Duration", { header: true, width: 3000, align: AlignmentType.CENTER }),
                createCell("Entrance Exams", { header: true, width: 3000 })
              ]
            }),
            new TableRow({
              children: [
                createCell("B.Tech/B.E.", { width: 3000 }),
                createCell("4 Years", { width: 3000, align: AlignmentType.CENTER }),
                createCell("JEE Main, MHT-CET", { width: 3000 })
              ]
            }),
            new TableRow({
              children: [
                createCell("B.Arch", { width: 3000 }),
                createCell("5 Years", { width: 3000, align: AlignmentType.CENTER }),
                createCell("NATA, JEE Paper 2", { width: 3000 })
              ]
            }),
            new TableRow({
              children: [
                createCell("Integrated M.Tech", { width: 3000 }),
                createCell("5 Years", { width: 3000, align: AlignmentType.CENTER }),
                createCell("JEE Advanced", { width: 3000 })
              ]
            }),
            new TableRow({
              children: [
                createCell("Diploma (Lateral Entry)", { width: 3000 }),
                createCell("3 Years", { width: 3000, align: AlignmentType.CENTER }),
                createCell("Based on 10th/12th marks", { width: 3000 })
              ]
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "Table 1: Engineering Programs After 12th Standard", size: 20, font: "Arial", italics: true, color: colors.secondary })]
        }),

        // Section 3: Classification of Engineering Streams
        createHeading("3. Classification of Engineering Streams", HeadingLevel.HEADING_1),
        createParagraph("Engineering disciplines can be broadly classified into five main categories based on their focus areas, industry applications, and skill requirements. Understanding this classification helps students identify which category aligns best with their interests and career goals."),

        createHeading("3.1 Core Engineering Branches", HeadingLevel.HEADING_2),
        createParagraph("Core engineering branches form the foundation of engineering education and practice. These traditional disciplines have been instrumental in building modern civilization and continue to be essential for infrastructure development and industrial growth."),
        createBulletItem("Civil Engineering: Design and construction of infrastructure"),
        createBulletItem("Mechanical Engineering: Design and manufacturing of mechanical systems"),
        createBulletItem("Electrical Engineering: Power systems and electrical equipment"),
        createBulletItem("Chemical Engineering: Chemical processes and manufacturing"),

        createHeading("3.2 Computer and IT Fields", HeadingLevel.HEADING_2),
        createParagraph("Computer and IT engineering fields have seen tremendous growth in the digital age. These disciplines focus on software development, data management, and emerging technologies that drive digital transformation across industries."),
        createBulletItem("Computer Engineering: Hardware and software systems"),
        createBulletItem("Information Technology: IT systems and applications"),
        createBulletItem("Artificial Intelligence & Data Science: Machine learning and analytics"),
        createBulletItem("Cyber Security: Information security and threat protection"),
        createBulletItem("Cloud Computing: Cloud infrastructure and services"),
        createBulletItem("Internet of Things (IoT): Connected devices and systems"),

        createHeading("3.3 Electronics and Communication", HeadingLevel.HEADING_2),
        createParagraph("Electronics and communication engineering encompasses the design and development of electronic devices, communication systems, and integrated circuits. This field is crucial for telecommunications, consumer electronics, and semiconductor industries."),
        createBulletItem("Electronics & Telecommunication: Communication systems"),
        createBulletItem("Electronics Engineering: Electronic devices and circuits"),
        createBulletItem("Instrumentation Engineering: Measurement and control systems"),
        createBulletItem("VLSI Design: Integrated circuit design"),
        createBulletItem("Embedded Systems: Embedded software and hardware"),

        createHeading("3.4 Mechanical and Automation", HeadingLevel.HEADING_2),
        createParagraph("Mechanical and automation engineering combines traditional mechanical engineering with modern automation technologies. These fields are essential for manufacturing, automotive, and robotics industries."),
        createBulletItem("Mechatronics: Integration of mechanical and electronic systems"),
        createBulletItem("Robotics Engineering: Design and development of robots"),
        createBulletItem("Automobile Engineering: Vehicle design and manufacturing"),
        createBulletItem("Production Engineering: Manufacturing process optimization"),

        createHeading("3.5 Specialized Fields", HeadingLevel.HEADING_2),
        createParagraph("Specialized engineering fields cater to specific industry sectors and niche applications. These disciplines often require focused expertise and offer unique career opportunities in targeted industries."),
        createBulletItem("Biotechnology Engineering: Biological systems and processes"),
        createBulletItem("Aerospace Engineering: Aircraft and spacecraft design"),
        createBulletItem("Marine Engineering: Ship systems and marine technology"),
        createBulletItem("Mining Engineering: Mineral extraction and processing"),
        createBulletItem("Textile Engineering: Textile manufacturing and technology"),
        createBulletItem("Agricultural Engineering: Farm machinery and systems"),
        createBulletItem("Petroleum Engineering: Oil and gas exploration"),
        createBulletItem("Polymer Engineering: Plastics and polymer materials"),

        // Section 4: Detailed Branch Explanations
        createHeading("4. Detailed Explanation of Each Branch", HeadingLevel.HEADING_1),
        
        // Core Branches
        createHeading("4.1 Core Engineering Branches", HeadingLevel.HEADING_2),
        ...coreBranches.flatMap(branch => [
          createHeading(branch.name, HeadingLevel.HEADING_3),
          createParagraph("Definition: " + branch.definition),
          new Paragraph({
            spacing: { before: 150, after: 100 },
            children: [new TextRun({ text: "Key Subjects: ", bold: true, size: 24, font: "Arial", color: colors.bodyText })]
          }),
          ...branch.subjects.map(s => createBulletItem(s)),
          new Paragraph({
            spacing: { before: 150, after: 100 },
            children: [new TextRun({ text: "Skills Required: ", bold: true, size: 24, font: "Arial", color: colors.bodyText })]
          }),
          ...branch.skills.map(s => createBulletItem(s)),
          new Paragraph({
            spacing: { before: 150, after: 100 },
            children: [new TextRun({ text: "Career Opportunities: ", bold: true, size: 24, font: "Arial", color: colors.bodyText })]
          }),
          ...branch.careers.map(c => createBulletItem(c)),
          new Paragraph({
            spacing: { before: 150, after: 100 },
            children: [new TextRun({ text: "Top Recruiters: ", bold: true, size: 24, font: "Arial", color: colors.bodyText })]
          }),
          ...branch.recruiters.map(r => createBulletItem(r)),
          new Paragraph({
            spacing: { before: 150, after: 200 },
            children: [
              new TextRun({ text: "Average Salary Range: ", bold: true, size: 24, font: "Arial", color: colors.bodyText }),
              new TextRun({ text: branch.salary, size: 24, font: "Arial", color: colors.bodyText })
            ]
          })
        ]),

        // Computer Branches
        createHeading("4.2 Computer and IT Engineering Branches", HeadingLevel.HEADING_2),
        ...computerBranches.flatMap(branch => [
          createHeading(branch.name, HeadingLevel.HEADING_3),
          createParagraph("Definition: " + branch.definition),
          new Paragraph({
            spacing: { before: 150, after: 100 },
            children: [new TextRun({ text: "Key Subjects: ", bold: true, size: 24, font: "Arial", color: colors.bodyText })]
          }),
          ...branch.subjects.map(s => createBulletItem(s)),
          new Paragraph({
            spacing: { before: 150, after: 100 },
            children: [new TextRun({ text: "Skills Required: ", bold: true, size: 24, font: "Arial", color: colors.bodyText })]
          }),
          ...branch.skills.map(s => createBulletItem(s)),
          new Paragraph({
            spacing: { before: 150, after: 100 },
            children: [new TextRun({ text: "Career Opportunities: ", bold: true, size: 24, font: "Arial", color: colors.bodyText })]
          }),
          ...branch.careers.map(c => createBulletItem(c)),
          new Paragraph({
            spacing: { before: 150, after: 100 },
            children: [new TextRun({ text: "Top Recruiters: ", bold: true, size: 24, font: "Arial", color: colors.bodyText })]
          }),
          ...branch.recruiters.map(r => createBulletItem(r)),
          new Paragraph({
            spacing: { before: 150, after: 200 },
            children: [
              new TextRun({ text: "Average Salary Range: ", bold: true, size: 24, font: "Arial", color: colors.bodyText }),
              new TextRun({ text: branch.salary, size: 24, font: "Arial", color: colors.bodyText })
            ]
          })
        ]),

        // Electronics Branches
        createHeading("4.3 Electronics and Communication Branches", HeadingLevel.HEADING_2),
        ...electronicsBranches.flatMap(branch => [
          createHeading(branch.name, HeadingLevel.HEADING_3),
          createParagraph("Definition: " + branch.definition),
          new Paragraph({
            spacing: { before: 150, after: 100 },
            children: [new TextRun({ text: "Key Subjects: ", bold: true, size: 24, font: "Arial", color: colors.bodyText })]
          }),
          ...branch.subjects.map(s => createBulletItem(s)),
          new Paragraph({
            spacing: { before: 150, after: 100 },
            children: [new TextRun({ text: "Skills Required: ", bold: true, size: 24, font: "Arial", color: colors.bodyText })]
          }),
          ...branch.skills.map(s => createBulletItem(s)),
          new Paragraph({
            spacing: { before: 150, after: 100 },
            children: [new TextRun({ text: "Career Opportunities: ", bold: true, size: 24, font: "Arial", color: colors.bodyText })]
          }),
          ...branch.careers.map(c => createBulletItem(c)),
          new Paragraph({
            spacing: { before: 150, after: 100 },
            children: [new TextRun({ text: "Top Recruiters: ", bold: true, size: 24, font: "Arial", color: colors.bodyText })]
          }),
          ...branch.recruiters.map(r => createBulletItem(r)),
          new Paragraph({
            spacing: { before: 150, after: 200 },
            children: [
              new TextRun({ text: "Average Salary Range: ", bold: true, size: 24, font: "Arial", color: colors.bodyText }),
              new TextRun({ text: branch.salary, size: 24, font: "Arial", color: colors.bodyText })
            ]
          })
        ]),

        // Specialized Branches
        createHeading("4.4 Specialized Engineering Branches", HeadingLevel.HEADING_2),
        ...specializedBranches.flatMap(branch => [
          createHeading(branch.name, HeadingLevel.HEADING_3),
          createParagraph("Definition: " + branch.definition),
          new Paragraph({
            spacing: { before: 150, after: 100 },
            children: [new TextRun({ text: "Key Subjects: ", bold: true, size: 24, font: "Arial", color: colors.bodyText })]
          }),
          ...branch.subjects.map(s => createBulletItem(s)),
          new Paragraph({
            spacing: { before: 150, after: 100 },
            children: [new TextRun({ text: "Skills Required: ", bold: true, size: 24, font: "Arial", color: colors.bodyText })]
          }),
          ...branch.skills.map(s => createBulletItem(s)),
          new Paragraph({
            spacing: { before: 150, after: 100 },
            children: [new TextRun({ text: "Career Opportunities: ", bold: true, size: 24, font: "Arial", color: colors.bodyText })]
          }),
          ...branch.careers.map(c => createBulletItem(c)),
          new Paragraph({
            spacing: { before: 150, after: 100 },
            children: [new TextRun({ text: "Top Recruiters: ", bold: true, size: 24, font: "Arial", color: colors.bodyText })]
          }),
          ...branch.recruiters.map(r => createBulletItem(r)),
          new Paragraph({
            spacing: { before: 150, after: 200 },
            children: [
              new TextRun({ text: "Average Salary Range: ", bold: true, size: 24, font: "Arial", color: colors.bodyText }),
              new TextRun({ text: branch.salary, size: 24, font: "Arial", color: colors.bodyText })
            ]
          })
        ]),

        // Section 5: Diploma Engineering
        createHeading("5. Diploma Engineering (Polytechnic)", HeadingLevel.HEADING_1),
        createHeading("5.1 List of Diploma Branches", HeadingLevel.HEADING_2),
        createParagraph("Maharashtra offers diploma programs in various engineering disciplines through government and private polytechnics. These programs provide practical-oriented technical education that prepares students for immediate employment or further studies."),
        createBulletItem("Civil Engineering"),
        createBulletItem("Mechanical Engineering"),
        createBulletItem("Electrical Engineering"),
        createBulletItem("Electronics & Telecommunication"),
        createBulletItem("Computer Engineering"),
        createBulletItem("Information Technology"),
        createBulletItem("Chemical Engineering"),
        createBulletItem("Automobile Engineering"),
        createBulletItem("Production Engineering"),
        createBulletItem("Instrumentation Engineering"),
        createBulletItem("Mining Engineering"),
        createBulletItem("Textile Technology"),
        createBulletItem("Architecture Assistantship"),
        createBulletItem("Medical Electronics"),
        createBulletItem("Biomedical Engineering"),
        createBulletItem("Mechatronics"),

        createHeading("5.2 Advantages of Diploma Programs", HeadingLevel.HEADING_2),
        createParagraph("Diploma programs offer several advantages for students seeking technical education. These programs provide a practical, industry-oriented approach that can lead to immediate employment opportunities or serve as a stepping stone to degree programs."),
        createBulletItem("Early industry exposure and hands-on practical skills development"),
        createBulletItem("Lower cost compared to degree programs, making education more accessible"),
        createBulletItem("Job-ready in 3 years after completing 10th standard"),
        createBulletItem("Option for lateral entry to degree programs (direct admission to 2nd year)"),
        createBulletItem("Better understanding of practical applications and hands-on experience with machines"),
        createBulletItem("Easier admission process based on 10th standard marks"),
        createBulletItem("Multiple career paths: immediate employment, higher studies, or entrepreneurship"),
        createBulletItem("Strong foundation for technical careers with practical skills"),

        createHeading("5.3 Career Path After Diploma", HeadingLevel.HEADING_2),
        createParagraph("After completing a diploma in engineering, students have multiple pathways to build their careers. They can choose to enter the workforce directly, pursue higher education, or explore entrepreneurship opportunities."),
        createParagraph("Direct Employment: Diploma holders can find employment as Junior Engineers, Technical Supervisors, Maintenance Technicians, CAD Operators, or Lab Technicians in various industries. The initial salary typically ranges from Rs. 1.5 to 3.5 LPA."),
        createParagraph("Lateral Entry to Degree: Diploma holders can gain direct admission to the second year of B.Tech/B.E. programs through the DSE (Diploma to Degree) counseling process. This pathway saves one year compared to the regular degree program and provides a strong practical foundation."),
        createParagraph("Higher Studies Options: Diploma holders can also pursue AMIE (Associate Member of Institution of Engineers) certification, specialized certification courses in their field, or entrepreneurship programs to start their own ventures."),

        // Section 6: Rankings
        createHeading("6. Ranking of Engineering Branches (2026)", HeadingLevel.HEADING_1),
        createHeading("6.1 Tier-wise Ranking System", HeadingLevel.HEADING_2),
        createParagraph("The following ranking system categorizes engineering branches based on current market demand, salary potential, and future growth prospects. This classification helps students understand the relative positioning of different branches in terms of career opportunities."),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [1500, 3500, 2000, 2000],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              children: [
                createCell("Tier", { header: true, width: 1500, align: AlignmentType.CENTER }),
                createCell("Branches", { header: true, width: 3500 }),
                createCell("Demand", { header: true, width: 2000, align: AlignmentType.CENTER }),
                createCell("Salary", { header: true, width: 2000, align: AlignmentType.CENTER })
              ]
            }),
            new TableRow({
              children: [
                createCell("Tier 1", { width: 1500, align: AlignmentType.CENTER, bold: true }),
                createCell("Computer Engg, AI & DS, VLSI Design", { width: 3500 }),
                createCell("Extremely High", { width: 2000, align: AlignmentType.CENTER }),
                createCell("Highest", { width: 2000, align: AlignmentType.CENTER })
              ]
            }),
            new TableRow({
              children: [
                createCell("Tier 2", { width: 1500, align: AlignmentType.CENTER, bold: true }),
                createCell("IT, EXTC, Robotics, Cyber Security, Cloud", { width: 3500 }),
                createCell("High", { width: 2000, align: AlignmentType.CENTER }),
                createCell("High", { width: 2000, align: AlignmentType.CENTER })
              ]
            }),
            new TableRow({
              children: [
                createCell("Tier 3", { width: 1500, align: AlignmentType.CENTER, bold: true }),
                createCell("Mechanical, Electrical, Civil, Instrumentation", { width: 3500 }),
                createCell("Moderate-High", { width: 2000, align: AlignmentType.CENTER }),
                createCell("Moderate", { width: 2000, align: AlignmentType.CENTER })
              ]
            }),
            new TableRow({
              children: [
                createCell("Tier 4", { width: 1500, align: AlignmentType.CENTER, bold: true }),
                createCell("Chemical, Automobile, Mechatronics, Production", { width: 3500 }),
                createCell("Moderate", { width: 2000, align: AlignmentType.CENTER }),
                createCell("Moderate", { width: 2000, align: AlignmentType.CENTER })
              ]
            }),
            new TableRow({
              children: [
                createCell("Tier 5", { width: 1500, align: AlignmentType.CENTER, bold: true }),
                createCell("Mining, Textile, Agricultural, Polymer, Marine", { width: 3500 }),
                createCell("Niche", { width: 2000, align: AlignmentType.CENTER }),
                createCell("Variable", { width: 2000, align: AlignmentType.CENTER })
              ]
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "Table 2: Engineering Branch Rankings 2026", size: 20, font: "Arial", italics: true, color: colors.secondary })]
        }),

        createHeading("6.2 Ranking Methodology", HeadingLevel.HEADING_2),
        createParagraph("The rankings are determined based on a comprehensive analysis of multiple factors that influence the career prospects and long-term potential of each engineering branch. The methodology considers both quantitative metrics and qualitative assessments to provide students with actionable guidance."),
        createParagraph("Market Demand (40%): Current job openings, hiring trends, industry growth rate, and skill demand analysis from job portals and industry reports form the primary basis for this criterion."),
        createParagraph("Salary Potential (35%): Starting salaries, growth trajectory, highest packages offered, and compensation trends across experience levels are analyzed to determine the financial prospects of each branch."),
        createParagraph("Future Scope (25%): Industry outlook, technological disruption potential, global opportunities, and alignment with future skill requirements are considered to assess long-term career sustainability."),

        // Section 7: Comparison Tables
        createHeading("7. Comparison Tables", HeadingLevel.HEADING_1),
        createHeading("7.1 Branch vs Salary and Job Opportunities", HeadingLevel.HEADING_2),

        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [2500, 2000, 2000, 2500],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              children: [
                createCell("Branch", { header: true, width: 2500 }),
                createCell("Starting Salary", { header: true, width: 2000, align: AlignmentType.CENTER }),
                createCell("Difficulty", { header: true, width: 2000, align: AlignmentType.CENTER }),
                createCell("Job Opportunities", { header: true, width: 2500, align: AlignmentType.CENTER })
              ]
            }),
            new TableRow({
              children: [
                createCell("Computer Engineering", { width: 2500 }),
                createCell("Rs. 6-15 LPA", { width: 2000, align: AlignmentType.CENTER }),
                createCell("Medium", { width: 2000, align: AlignmentType.CENTER }),
                createCell("Very High", { width: 2500, align: AlignmentType.CENTER })
              ]
            }),
            new TableRow({
              children: [
                createCell("AI & Data Science", { width: 2500 }),
                createCell("Rs. 8-20 LPA", { width: 2000, align: AlignmentType.CENTER }),
                createCell("High", { width: 2000, align: AlignmentType.CENTER }),
                createCell("High", { width: 2500, align: AlignmentType.CENTER })
              ]
            }),
            new TableRow({
              children: [
                createCell("VLSI Design", { width: 2500 }),
                createCell("Rs. 6-15 LPA", { width: 2000, align: AlignmentType.CENTER }),
                createCell("Very High", { width: 2000, align: AlignmentType.CENTER }),
                createCell("Medium-High", { width: 2500, align: AlignmentType.CENTER })
              ]
            }),
            new TableRow({
              children: [
                createCell("IT Engineering", { width: 2500 }),
                createCell("Rs. 4-10 LPA", { width: 2000, align: AlignmentType.CENTER }),
                createCell("Medium", { width: 2000, align: AlignmentType.CENTER }),
                createCell("Very High", { width: 2500, align: AlignmentType.CENTER })
              ]
            }),
            new TableRow({
              children: [
                createCell("Electronics & Telecom", { width: 2500 }),
                createCell("Rs. 4-9 LPA", { width: 2000, align: AlignmentType.CENTER }),
                createCell("Medium-High", { width: 2000, align: AlignmentType.CENTER }),
                createCell("High", { width: 2500, align: AlignmentType.CENTER })
              ]
            }),
            new TableRow({
              children: [
                createCell("Mechanical Engineering", { width: 2500 }),
                createCell("Rs. 3.5-8 LPA", { width: 2000, align: AlignmentType.CENTER }),
                createCell("Medium", { width: 2000, align: AlignmentType.CENTER }),
                createCell("High", { width: 2500, align: AlignmentType.CENTER })
              ]
            }),
            new TableRow({
              children: [
                createCell("Electrical Engineering", { width: 2500 }),
                createCell("Rs. 3.5-7 LPA", { width: 2000, align: AlignmentType.CENTER }),
                createCell("Medium-High", { width: 2000, align: AlignmentType.CENTER }),
                createCell("High", { width: 2500, align: AlignmentType.CENTER })
              ]
            }),
            new TableRow({
              children: [
                createCell("Civil Engineering", { width: 2500 }),
                createCell("Rs. 3-8 LPA", { width: 2000, align: AlignmentType.CENTER }),
                createCell("Medium", { width: 2000, align: AlignmentType.CENTER }),
                createCell("Medium-High", { width: 2500, align: AlignmentType.CENTER })
              ]
            }),
            new TableRow({
              children: [
                createCell("Chemical Engineering", { width: 2500 }),
                createCell("Rs. 4-9 LPA", { width: 2000, align: AlignmentType.CENTER }),
                createCell("High", { width: 2000, align: AlignmentType.CENTER }),
                createCell("Medium", { width: 2500, align: AlignmentType.CENTER })
              ]
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "Table 3: Branch-wise Salary and Job Opportunities Comparison", size: 20, font: "Arial", italics: true, color: colors.secondary })]
        }),

        createHeading("7.2 Branch vs Industry Sector", HeadingLevel.HEADING_2),
        new Table({
          alignment: AlignmentType.CENTER,
          columnWidths: [3000, 6000],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              children: [
                createCell("Branch", { header: true, width: 3000 }),
                createCell("Industry Sectors", { header: true, width: 6000 })
              ]
            }),
            new TableRow({
              children: [
                createCell("Computer/IT", { width: 3000 }),
                createCell("IT Services, Product Companies, Startups, FinTech", { width: 6000 })
              ]
            }),
            new TableRow({
              children: [
                createCell("Mechanical", { width: 3000 }),
                createCell("Manufacturing, Automotive, Defense, Aerospace", { width: 6000 })
              ]
            }),
            new TableRow({
              children: [
                createCell("Electrical", { width: 3000 }),
                createCell("Power, Utilities, Manufacturing, Renewable Energy", { width: 6000 })
              ]
            }),
            new TableRow({
              children: [
                createCell("Civil", { width: 3000 }),
                createCell("Construction, Infrastructure, Real Estate, Government", { width: 6000 })
              ]
            }),
            new TableRow({
              children: [
                createCell("Electronics", { width: 3000 }),
                createCell("Semiconductors, Telecom, Consumer Electronics, Defense", { width: 6000 })
              ]
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 200 },
          children: [new TextRun({ text: "Table 4: Branch-wise Industry Sector Mapping", size: 20, font: "Arial", italics: true, color: colors.secondary })]
        }),

        // Section 8: Top Colleges
        createHeading("8. Top Colleges in Maharashtra", HeadingLevel.HEADING_1),
        createHeading("8.1 University of Mumbai", HeadingLevel.HEADING_2),
        createParagraph("The University of Mumbai is one of the oldest and most prestigious universities in India. Its affiliated engineering colleges are known for their academic excellence, industry connections, and placement records."),
        createBulletItem("Veermata Jijabai Technological Institute (VJTI) - Autonomous"),
        createBulletItem("Sardar Patel Institute of Technology (SPIT) - Government"),
        createBulletItem("Dwarkadas J. Sanghvi College of Engineering (DJSCE) - Private"),
        createBulletItem("Thadomal Shahani Engineering College (TSEC) - Private"),
        createBulletItem("K. J. Somaiya College of Engineering - Private"),
        createBulletItem("SIES Graduate School of Technology - Private"),
        createBulletItem("Fr. Conceicao Rodrigues College of Engineering - Private"),
        createBulletItem("Rajiv Gandhi Institute of Technology - Government"),

        createHeading("8.2 Savitribai Phule Pune University", HeadingLevel.HEADING_2),
        createParagraph("Savitribai Phule Pune University is renowned for its engineering programs and research facilities. The university's affiliated colleges are spread across Pune and neighboring districts, offering quality technical education."),
        createBulletItem("College of Engineering, Pune (COEP) - Autonomous"),
        createBulletItem("Pune Institute of Computer Technology (PICT) - Private"),
        createBulletItem("Vishwakarma Institute of Technology (VIT) - Private"),
        createBulletItem("Maharashtra Institute of Technology (MIT) - Private"),
        createBulletItem("Sinhgad College of Engineering - Private"),
        createBulletItem("DY Patil College of Engineering - Private"),
        createBulletItem("AISSMS College of Engineering - Private"),
        createBulletItem("Government College of Engineering & Research, Avasari - Government"),

        createHeading("8.3 Other Premier Institutes", HeadingLevel.HEADING_2),
        createParagraph("Maharashtra is home to several institutes of national importance and premier technical institutions that attract students from across the country."),
        createBulletItem("IIT Bombay, Mumbai - Institute of National Importance"),
        createBulletItem("VNIT Nagpur - National Institute of Technology"),
        createBulletItem("IIIT Pune - Indian Institute of Information Technology"),
        createBulletItem("COEP Tech University, Pune - State University"),
        createBulletItem("SPCE Mumbai - Government Aided"),

        // Section 9: Entrance Exams
        createHeading("9. Entrance Exams", HeadingLevel.HEADING_1),
        createHeading("9.1 MHT-CET (Maharashtra Common Entrance Test)", HeadingLevel.HEADING_2),
        createParagraph("MHT-CET is the state-level entrance examination conducted by the State Common Entrance Test Cell, Maharashtra, for admission to undergraduate engineering programs in colleges across Maharashtra. It is one of the most important exams for students seeking admission to state engineering colleges."),

        createHeading("Eligibility Criteria", HeadingLevel.HEADING_3),
        createBulletItem("10+2 (HSC) or equivalent examination with Physics, Chemistry, and Mathematics"),
        createBulletItem("Minimum 45% marks (40% for reserved categories) in the qualifying examination"),
        createBulletItem("Domicile of Maharashtra for state quota seats"),
        createBulletItem("No age limit for appearing in MHT-CET"),

        createHeading("Exam Pattern", HeadingLevel.HEADING_3),
        createBulletItem("Mode: Computer-Based Test (CBT)"),
        createBulletItem("Duration: 3 hours (Physics + Chemistry: 90 minutes, Mathematics: 90 minutes)"),
        createBulletItem("Total Questions: 150 (50 each in Physics, Chemistry, and Mathematics)"),
        createBulletItem("Marking Scheme: 2 marks per correct answer, no negative marking"),
        createBulletItem("Total Marks: 300"),

        createHeading("9.2 Admission Process", HeadingLevel.HEADING_2),
        createParagraph("The admission process for engineering programs in Maharashtra follows a centralized counseling procedure known as the Centralized Admission Process (CAP). This process ensures transparent and merit-based allocation of seats across colleges."),
        createBulletItem("Step 1: Online registration on CET Cell website"),
        createBulletItem("Step 2: Appear for MHT-CET examination in April/May"),
        createBulletItem("Step 3: Declaration of results and rank list"),
        createBulletItem("Step 4: CAP registration and document verification"),
        createBulletItem("Step 5: Choice filling (selecting colleges and branches)"),
        createBulletItem("Step 6: Seat allotment through multiple rounds"),
        createBulletItem("Step 7: Admission confirmation through fee payment"),

        createHeading("9.3 Other Important Entrance Exams", HeadingLevel.HEADING_2),
        createBulletItem("JEE Main: National level exam for NITs, IIITs, and GFTIs"),
        createBulletItem("JEE Advanced: For IIT admissions (only for JEE Main qualified candidates)"),
        createBulletItem("BITSAT: For BITS Pilani campuses"),
        createBulletItem("VITEEE: For VIT University"),
        createBulletItem("SRMJEEE: For SRM Institute of Science and Technology"),

        // Section 10: Future Trends
        createHeading("10. Future Trends in Engineering", HeadingLevel.HEADING_1),
        createHeading("10.1 AI, Automation, and Robotics", HeadingLevel.HEADING_2),
        createParagraph("Artificial Intelligence and automation are transforming industries across the globe. From healthcare diagnostics to manufacturing processes, AI is enabling new levels of efficiency and innovation. The robotics industry is experiencing unprecedented growth with collaborative robots (cobots) becoming increasingly common in manufacturing and service sectors."),
        createParagraph("Key growth areas include autonomous vehicles, drones, robotic process automation (RPA), and AI-powered healthcare solutions. The global AI market is expected to reach $1.5 trillion by 2030, creating millions of job opportunities for engineers with expertise in these technologies. Engineers who combine traditional engineering knowledge with AI and machine learning skills will be highly sought after."),

        createHeading("10.2 Green Energy and Sustainability", HeadingLevel.HEADING_2),
        createParagraph("The global transition to sustainable energy sources is creating significant opportunities for engineers. Solar and wind energy infrastructure development, electric vehicle technology, and green building design are seeing massive investments worldwide. Engineers specializing in renewable energy, environmental engineering, and sustainable technologies will play crucial roles in addressing climate change."),
        createParagraph("India's commitment to achieving net-zero emissions by 2070 is driving investments in clean energy infrastructure. The renewable energy sector alone is expected to create 24 million jobs globally by 2030. Engineers with expertise in energy systems, power electronics, and environmental technologies will find excellent career prospects."),

        createHeading("10.3 Digital Transformation", HeadingLevel.HEADING_2),
        createParagraph("Digital transformation is reshaping every industry, from manufacturing to healthcare to finance. Industry 4.0 and smart factories are leveraging IoT, edge computing, and advanced analytics to create more efficient and responsive production systems. The rollout of 5G and development of 6G telecommunications will enable new applications and business models."),
        createParagraph("Emerging technologies like quantum computing, blockchain, and extended reality (AR/VR/XR) are creating new engineering challenges and opportunities. Engineers who understand these technologies and can integrate them into practical solutions will be at the forefront of innovation. The digital economy is expected to account for over 25% of global GDP by 2030."),

        // Section 11: Conclusion
        createHeading("11. Conclusion", HeadingLevel.HEADING_1),
        createHeading("11.1 Final Advice on Choosing the Right Branch", HeadingLevel.HEADING_2),
        createParagraph("Choosing the right engineering branch is a significant decision that requires careful consideration of multiple factors. Students should begin by conducting a thorough self-assessment of their interests, strengths, and aptitudes. Consider which subjects you enjoyed most in school, whether you prefer working with your hands or with abstract concepts, and whether you thrive in collaborative environments or prefer independent work."),
        createParagraph("While current market trends and salary potential are important considerations, they should not be the sole determinants. The job market evolves rapidly, and today's hot field might become saturated tomorrow. Instead, focus on building a strong foundation in fundamental engineering principles that remain relevant across industries. Consider the long-term career trajectory, opportunities for higher education, and the potential for career pivots in the future."),

        createHeading("11.2 Importance of Interest + Skills + Future Demand", HeadingLevel.HEADING_2),
        createParagraph("The ideal engineering branch choice lies at the intersection of three critical factors: personal interest, inherent skills, and future market demand. Interest drives the motivation needed to excel through challenging coursework and continue learning throughout your career. Natural aptitudes and developed skills determine how quickly you can grasp concepts and contribute meaningfully to projects."),
        createParagraph("Market demand ensures that your expertise will be valued and rewarded in the professional world. However, it's important to remember that the intersection of these three factors may shift over time. Continuous learning, adaptability, and willingness to embrace new technologies are essential for long-term career success in engineering."),

        createHeading("11.3 Key Takeaways", HeadingLevel.HEADING_2),
        createBulletItem("Research thoroughly before making a decision about your engineering specialization"),
        createBulletItem("Consider your long-term career goals and personal interests"),
        createBulletItem("Do not follow trends blindly; analyze the underlying factors driving demand"),
        createBulletItem("Build a strong foundation in fundamental engineering principles"),
        createBulletItem("Develop skills beyond your core branch to remain adaptable"),
        createBulletItem("Stay updated with changing technologies and industry requirements"),
        createBulletItem("Seek guidance from professionals, mentors, and career counselors"),
        createBulletItem("Focus on continuous learning throughout your engineering career"),

        new Paragraph({ spacing: { before: 400 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200 },
          children: [
            new TextRun({
              text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
              size: 24,
              color: colors.accent
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200 },
          children: [
            new TextRun({
              text: "End of Document",
              size: 20,
              font: "Arial",
              color: colors.secondary,
              italics: true
            })
          ]
        })
      ]
    }
  ]
});

// Generate and save the document
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/Complete_Guide_Engineering_Streams_Maharashtra.docx", buffer);
  console.log("Document created successfully: Complete_Guide_Engineering_Streams_Maharashtra.docx");
}).catch(err => {
  console.error("Error creating document:", err);
});
