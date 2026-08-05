'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge' 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  GraduationCap,
  BookOpen,
  Briefcase,
  TrendingUp,
  Building2,
  Award,
  Users,
  Target,
  ChevronRight,
  Menu,
  X,
  Globe,
  Cpu,
  Wrench,
  Zap,
  FlaskConical,
  Plane,
  Ship,
  Factory,
  Leaf,
  Code,
  Database,
  Shield,
  Cloud,
  Radio,
  CircuitBoard,
  Bot,
  Car,
  TestTube,
  Layers,
  Star,
  CheckCircle2,
  ArrowRight,
  FileText,
  Calendar,
  MapPin,
  DollarSign,
  Clock,
  BarChart3,
  Github,
  Download,
  Brain,
  Network,
  Gauge,
  Fuel,
  Mountain,
  Wheat,
  Package,
  LucideIcon,
  Home,
  Compass,
  School,
  Trophy,
  Scale,
  PenTool,
  Lightbulb,
  Archive
} from 'lucide-react'

// Navigation Items
const navItems = [
  { id: 'introduction', label: 'Introduction', icon: BookOpen },
  { id: 'career-paths', label: 'Career After 10th/12th', icon: Target },
  { id: 'classification', label: 'Classification', icon: Layers },
  { id: 'branches', label: 'All Branches', icon: Compass },
  { id: 'diploma', label: 'Diploma Engineering', icon: Award },
  { id: 'rankings', label: 'Rankings 2026', icon: Trophy },
  { id: 'comparison', label: 'Comparison Tables', icon: Scale },
  { id: 'colleges', label: 'Top Colleges', icon: School },
  { id: 'exams', label: 'Entrance Exams', icon: FileText },
  { id: 'future-trends', label: 'Future Trends', icon: Lightbulb },
  { id: 'conclusion', label: 'Conclusion', icon: CheckCircle2 },
]

// Extended Branch Data
interface BranchData {
  name: string
  icon: LucideIcon
  category: string
  definition: string
  subjects: string[]
  skills: string[]
  careers: string[]
  recruiters: string[]
  salary: string
  scope: string
  difficulty: string
  duration: string
  eligibility: string
  topColleges: string[]
  certifications: string[]
  higherStudies: string[]
  averagePackage: string
  highestPackage: string
  jobGrowth: string
}

const allBranches: BranchData[] = [
  // Core Engineering
  {
    name: 'Civil Engineering',
    icon: Building2,
    category: 'Core Engineering',
    definition: 'Civil Engineering is one of the oldest and most fundamental branches of engineering that deals with the design, construction, and maintenance of infrastructure projects. This includes buildings, roads, bridges, dams, airports, water supply systems, and other structures that form the backbone of modern civilization.',
    subjects: ['Structural Analysis', 'Geotechnical Engineering', 'Transportation Engineering', 'Hydraulics & Water Resources', 'Construction Management', 'Environmental Engineering', 'Surveying', 'Concrete Technology', 'Steel Structures', 'Foundation Engineering', 'Urban Planning', 'Bridge Engineering'],
    skills: ['Technical Drawing & CAD', 'Project Management', 'Structural Analysis', 'Problem Solving', 'Communication Skills', 'Site Management', 'Mathematical Proficiency', 'GIS Software', 'BIM', 'Cost Estimation'],
    careers: ['Structural Engineer', 'Construction Manager', 'Geotechnical Engineer', 'Transportation Planner', 'Water Resources Engineer', 'Urban Planner', 'Project Manager', 'Site Engineer', 'Design Engineer', 'Environmental Engineer'],
    recruiters: ['L&T Construction', 'Tata Projects', 'Gammon India', 'HCC', 'DLF', 'Shapoorji Pallonji', 'IRCON International', 'NBCC', 'Afcons Infrastructure', 'JMC Projects'],
    salary: '₹3-8 LPA (Entry), ₹8-20 LPA (Experienced)',
    scope: 'Excellent growth in infrastructure development, smart cities, and sustainable construction projects.',
    difficulty: 'Medium',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, Mathematics (45% minimum)',
    topColleges: ['COEP Pune', 'VJTI Mumbai', 'SPCE Mumbai', 'IIT Bombay', 'VNIT Nagpur', 'Government Engineering College Aurangabad'],
    certifications: ['AutoCAD Certification', 'STAAD Pro', 'Primavera P6', 'LEED Certification', 'PMP', 'Revit Architecture'],
    higherStudies: ['M.Tech in Structural Engineering', 'M.Tech in Geotechnical Engineering', 'M.Tech in Transportation', 'MBA in Construction Management', 'Ph.D.'],
    averagePackage: '₹5.5 LPA',
    highestPackage: '₹25 LPA',
    jobGrowth: '8% annually'
  },
  {
    name: 'Mechanical Engineering',
    icon: Wrench,
    category: 'Core Engineering',
    definition: 'Mechanical Engineering is a diverse and versatile branch that applies principles of physics, mathematics, and material science to design, analyze, manufacture, and maintain mechanical systems. It encompasses everything from small individual parts to large complex systems like vehicles and industrial machinery.',
    subjects: ['Thermodynamics', 'Fluid Mechanics', 'Strength of Materials', 'Machine Design', 'Manufacturing Processes', 'Heat Transfer', 'Kinematics of Machines', 'CAD/CAM', 'Refrigeration & Air Conditioning', 'Automobile Engineering', 'Robotics', 'Industrial Engineering'],
    skills: ['Technical Drawing', 'Problem Analysis', 'Computer-Aided Design', 'Mathematical Skills', 'Innovation & Creativity', 'Team Collaboration', 'Analytical Thinking', 'MATLAB', 'ANSYS', '3D Modeling'],
    careers: ['Design Engineer', 'Manufacturing Engineer', 'Automotive Engineer', 'HVAC Engineer', 'Quality Assurance Engineer', 'Project Engineer', 'R&D Engineer', 'Production Manager', 'Maintenance Engineer', 'Technical Consultant'],
    recruiters: ['Tata Motors', 'Mahindra & Mahindra', 'Maruti Suzuki', 'Bajaj Auto', 'L&T', 'Godrej', 'Thermax', 'BHEL', 'Hero MotoCorp', 'Hyundai'],
    salary: '₹3.5-8 LPA (Entry), ₹8-25 LPA (Experienced)',
    scope: 'Strong demand in manufacturing, automotive, aerospace, and energy sectors with growing opportunities in automation.',
    difficulty: 'Medium',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, Mathematics (45% minimum)',
    topColleges: ['COEP Pune', 'VJTI Mumbai', 'IIT Bombay', 'VNIT Nagpur', 'MIT Pune', 'PICT Pune'],
    certifications: ['AutoCAD', 'SolidWorks', 'CATIA', 'ANSYS', 'Six Sigma Green Belt', 'PMP'],
    higherStudies: ['M.Tech in Design', 'M.Tech in Thermal Engineering', 'M.Tech in Manufacturing', 'MBA in Operations', 'MS Abroad'],
    averagePackage: '₹6 LPA',
    highestPackage: '₹30 LPA',
    jobGrowth: '7% annually'
  },
  {
    name: 'Electrical Engineering',
    icon: Zap,
    category: 'Core Engineering',
    definition: 'Electrical Engineering focuses on the study, design, and application of electrical systems, equipment, and devices. It covers a wide range of areas including power generation and distribution, control systems, telecommunications, and signal processing.',
    subjects: ['Electrical Machines', 'Power Systems', 'Control Systems', 'Electrical Measurements', 'Power Electronics', 'High Voltage Engineering', 'Switchgear & Protection', 'Renewable Energy Systems', 'Electric Drives', 'Signal Processing', 'Microprocessors', 'Embedded Systems'],
    skills: ['Circuit Analysis', 'Programming Skills', 'Technical Documentation', 'Problem Solving', 'Project Management', 'Safety Awareness', 'MATLAB/Simulink', 'PLC Programming', 'PCB Design', 'Testing & Commissioning'],
    careers: ['Electrical Design Engineer', 'Power Systems Engineer', 'Control Engineer', 'Project Manager', 'Research Engineer', 'Technical Consultant', 'Maintenance Engineer', 'Testing Engineer', 'Grid Operations Engineer', 'Renewable Energy Engineer'],
    recruiters: ['BHEL', 'NTPC', 'Power Grid Corporation', 'Siemens', 'ABB', 'Schneider Electric', 'Havells', 'Tata Power', 'Adani Power', 'GE'],
    salary: '₹3.5-7 LPA (Entry), ₹7-20 LPA (Experienced)',
    scope: 'Growing demand in power sector, renewable energy, smart grids, and electric vehicles.',
    difficulty: 'Medium-High',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, Mathematics (45% minimum)',
    topColleges: ['COEP Pune', 'VJTI Mumbai', 'SPCE Mumbai', 'Government Engineering College Jalgaon', 'VNIT Nagpur', 'SGGS Nanded'],
    certifications: ['Licensed Electrical Engineer', 'AutoCAD Electrical', 'PLC/SCADA', 'MATLAB', 'Etap', 'PSCAD'],
    higherStudies: ['M.Tech in Power Systems', 'M.Tech in Control Systems', 'M.Tech in Power Electronics', 'MBA', 'Ph.D.'],
    averagePackage: '₹5.5 LPA',
    highestPackage: '₹28 LPA',
    jobGrowth: '10% annually'
  },
  {
    name: 'Chemical Engineering',
    icon: FlaskConical,
    category: 'Core Engineering',
    definition: 'Chemical Engineering combines principles of chemistry, physics, mathematics, and economics to design, operate, and optimize processes for producing chemicals, materials, and energy. It plays a crucial role in industries ranging from pharmaceuticals to petrochemicals.',
    subjects: ['Chemical Reaction Engineering', 'Mass Transfer', 'Heat Transfer', 'Fluid Mechanics', 'Process Control', 'Thermodynamics', 'Chemical Process Technology', 'Biochemical Engineering', 'Petroleum Refining', 'Polymer Technology', 'Environmental Engineering', 'Process Design'],
    skills: ['Process Simulation', 'Laboratory Skills', 'Data Analysis', 'Safety Management', 'Environmental Awareness', 'Technical Writing', 'Problem Solving', 'Aspen Plus', 'HYSYS', 'Process Optimization'],
    careers: ['Process Engineer', 'Chemical Plant Manager', 'Research Scientist', 'Quality Control Engineer', 'Environmental Engineer', 'Petroleum Engineer', 'Pharmaceutical Engineer', 'Safety Engineer', 'Process Design Engineer', 'Technical Consultant'],
    recruiters: ['Reliance Industries', 'IOCL', 'BPCL', 'HPCL', 'ONGC', 'GAIL', 'L&T Hydrocarbon', 'Dr. Reddy\'s', 'Cipla', 'Sun Pharma'],
    salary: '₹4-9 LPA (Entry), ₹9-25 LPA (Experienced)',
    scope: 'Strong demand in petrochemicals, pharmaceuticals, and specialty chemicals with growing focus on sustainable processes.',
    difficulty: 'High',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, Mathematics (45% minimum)',
    topColleges: ['ICT Mumbai', 'UICT Jalgaon', 'COEP Pune', 'VJTI Mumbai', 'VNIT Nagpur', 'LIT Nagpur'],
    certifications: ['Aspen Plus Certification', 'HYSYS', 'PMP', 'Six Sigma', 'Safety Engineering Certification', 'Piping Design'],
    higherStudies: ['M.Tech in Chemical Engineering', 'M.Tech in Biotechnology', 'M.Tech in Environmental Engineering', 'MBA', 'Ph.D.'],
    averagePackage: '₹6.5 LPA',
    highestPackage: '₹32 LPA',
    jobGrowth: '8% annually'
  },
  // Computer & IT
  {
    name: 'Computer Engineering',
    icon: Code,
    category: 'Computer & IT',
    definition: 'Computer Engineering integrates electrical engineering and computer science to develop computer systems and technological solutions. This field covers hardware design, software development, and the integration of both to create innovative computing solutions.',
    subjects: ['Data Structures & Algorithms', 'Operating Systems', 'Database Management Systems', 'Computer Networks', 'Software Engineering', 'Computer Architecture', 'Web Technologies', 'Machine Learning', 'Cloud Computing', 'Cyber Security', 'Mobile Application Development', 'Artificial Intelligence'],
    skills: ['Programming Languages (C, C++, Java, Python)', 'Problem Solving', 'System Design', 'Algorithm Design', 'Debugging Skills', 'Version Control (Git)', 'Communication Skills', 'Full Stack Development', 'Cloud Platforms', 'Agile Methodology'],
    careers: ['Software Developer', 'Systems Engineer', 'Full Stack Developer', 'DevOps Engineer', 'Technical Architect', 'IT Consultant', 'Research Scientist', 'Cloud Engineer', 'Mobile App Developer', 'Technical Lead'],
    recruiters: ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant', 'IBM', 'Oracle'],
    salary: '₹6-15 LPA (Entry), ₹15-50 LPA (Experienced)',
    scope: 'Exceptional growth in all sectors with high demand for skilled developers and architects.',
    difficulty: 'Medium',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, Mathematics (45% minimum)',
    topColleges: ['IIT Bombay', 'VJTI Mumbai', 'COEP Pune', 'PICT Pune', 'SPIT Mumbai', 'DJSCE Mumbai'],
    certifications: ['AWS Solutions Architect', 'Azure Developer', 'Google Cloud', 'Kubernetes', 'Docker', 'Scrum Master'],
    higherStudies: ['M.Tech in Computer Science', 'MS Abroad', 'MBA in IT', 'Ph.D.', 'Specialized Certifications'],
    averagePackage: '₹10 LPA',
    highestPackage: '₹1 Crore+ (IITs)',
    jobGrowth: '25%+ annually'
  },
  {
    name: 'Information Technology',
    icon: Database,
    category: 'Computer & IT',
    definition: 'Information Technology focuses on the application of computers and telecommunications equipment to store, retrieve, transmit, and manipulate data. IT professionals work on implementing and managing computer-based information systems.',
    subjects: ['Web Programming', 'Information Security', 'Cloud Computing', 'Data Warehousing', 'Mobile Application Development', 'Enterprise Resource Planning', 'Business Intelligence', 'IT Project Management', 'Software Testing', 'Network Administration', 'Database Administration', 'IT Service Management'],
    skills: ['Programming Skills', 'Database Management', 'Network Administration', 'Problem Solving', 'Project Management', 'Communication', 'Technical Documentation', 'Business Analysis', 'IT Service Management', 'Cloud Technologies'],
    careers: ['IT Manager', 'Systems Administrator', 'Database Administrator', 'Network Engineer', 'IT Consultant', 'Business Analyst', 'Project Manager', 'IT Director', 'Chief Information Officer', 'IT Architect'],
    recruiters: ['TCS', 'Infosys', 'Wipro', 'HCL', 'Tech Mahindra', 'Capgemini', 'IBM', 'HP', 'Dell', 'Accenture'],
    salary: '₹4-10 LPA (Entry), ₹10-30 LPA (Experienced)',
    scope: 'Strong demand across all industries with focus on digital transformation and cloud adoption.',
    difficulty: 'Medium',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, Mathematics (45% minimum)',
    topColleges: ['PICT Pune', 'VIT Pune', 'MIT Pune', 'DJSCE Mumbai', 'SIES Mumbai', 'KJ Somaiya Mumbai'],
    certifications: ['ITIL', 'PMP', 'AWS', 'Azure', 'CISSP', 'Cisco CCNA'],
    higherStudies: ['M.Tech in IT', 'MBA in Systems', 'MS Abroad', 'Ph.D.', 'Specialized Certifications'],
    averagePackage: '₹7 LPA',
    highestPackage: '₹45 LPA',
    jobGrowth: '15%+ annually'
  },
  {
    name: 'Artificial Intelligence & Data Science',
    icon: Brain,
    category: 'Computer & IT',
    definition: 'AI & Data Science is an emerging field that combines machine learning, statistical analysis, and big data technologies to extract insights from data and build intelligent systems.',
    subjects: ['Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Big Data Analytics', 'Statistical Methods', 'Neural Networks', 'Reinforcement Learning', 'Data Mining', 'Predictive Analytics', 'AI Ethics', 'MLOps'],
    skills: ['Python/R Programming', 'Statistical Analysis', 'Machine Learning', 'Data Visualization', 'Deep Learning Frameworks', 'Big Data Technologies', 'Critical Thinking', 'Mathematical Modeling', 'Cloud ML Services', 'Model Deployment'],
    careers: ['Data Scientist', 'AI Engineer', 'Machine Learning Engineer', 'Data Analyst', 'Research Scientist', 'AI Product Manager', 'Deep Learning Engineer', 'NLP Engineer', 'Computer Vision Engineer', 'AI Architect'],
    recruiters: ['Google', 'Microsoft', 'Amazon', 'Flipkart', 'Swiggy', 'Zomato', 'Ola', 'PhonePe', 'NVIDIA', 'OpenAI'],
    salary: '₹8-20 LPA (Entry), ₹20-60 LPA (Experienced)',
    scope: 'Explosive growth with applications across all industries including healthcare, finance, retail, and technology.',
    difficulty: 'High',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, Mathematics (50% minimum)',
    topColleges: ['IIT Bombay', 'PICT Pune', 'COEP Pune', 'VJTI Mumbai', 'IIIT Pune', 'SPIT Mumbai'],
    certifications: ['TensorFlow Developer', 'AWS Machine Learning', 'Google AI', 'Azure AI', 'Databricks', 'Kaggle Competitions'],
    higherStudies: ['M.Tech in AI', 'M.Tech in Data Science', 'MS Abroad (AI/ML)', 'Ph.D.', 'Research Positions'],
    averagePackage: '₹12 LPA',
    highestPackage: '₹80 LPA',
    jobGrowth: '30%+ annually'
  },
  {
    name: 'Cyber Security',
    icon: Shield,
    category: 'Computer & IT',
    definition: 'Cyber Security focuses on protecting computer systems, networks, and data from unauthorized access, attacks, and damage. With increasing digitalization, this field has become critical for organizations.',
    subjects: ['Network Security', 'Cryptography', 'Ethical Hacking', 'Digital Forensics', 'Information Security Management', 'Cloud Security', 'Malware Analysis', 'Security Policies', 'Penetration Testing', 'Security Operations', 'Incident Response', 'Cyber Law'],
    skills: ['Network Security', 'Penetration Testing', 'Security Analysis', 'Incident Response', 'Programming (Python, Bash)', 'Risk Assessment', 'Communication', 'Security Tools', 'SIEM', 'Threat Intelligence'],
    careers: ['Security Analyst', 'Penetration Tester', 'Security Architect', 'CISO', 'Security Consultant', 'Incident Responder', 'Forensic Analyst', 'Security Engineer', 'Threat Hunter', 'SOC Analyst'],
    recruiters: ['Palo Alto Networks', 'CrowdStrike', 'McAfee', 'Symantec', 'Quick Heal', 'TCS Cyber Security', 'Wipro Cyber Security', 'Infosys Security', 'Deloitte', 'KPMG'],
    salary: '₹5-12 LPA (Entry), ₹12-40 LPA (Experienced)',
    scope: 'Critical demand across all sectors with increasing cyber threats and regulatory requirements.',
    difficulty: 'High',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, Mathematics (45% minimum)',
    topColleges: ['IIT Bombay', 'VJTI Mumbai', 'COEP Pune', 'PICT Pune', 'SPIT Mumbai', 'MIT Pune'],
    certifications: ['CISSP', 'CEH', 'CompTIA Security+', 'CISM', 'OSCP', 'GCIH'],
    higherStudies: ['M.Tech in Cyber Security', 'MS Abroad', 'MBA in IT Security', 'Ph.D.', 'Specialized Certifications'],
    averagePackage: '₹8 LPA',
    highestPackage: '₹50 LPA',
    jobGrowth: '20%+ annually'
  },
  {
    name: 'Cloud Computing',
    icon: Cloud,
    category: 'Computer & IT',
    definition: 'Cloud Computing engineering involves designing, implementing, and managing cloud-based systems and services. This specialization covers various cloud platforms and distributed computing concepts.',
    subjects: ['Cloud Architecture', 'Virtualization', 'Container Technologies', 'DevOps Practices', 'Cloud Security', 'Microservices', 'Serverless Computing', 'Multi-Cloud Strategies', 'Infrastructure as Code', 'CI/CD Pipelines', 'Cloud Migration', 'Cost Optimization'],
    skills: ['Cloud Platforms (AWS/Azure/GCP)', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Infrastructure as Code (Terraform)', 'Scripting Languages', 'System Administration', 'Problem Solving', 'Monitoring & Logging', 'Security Best Practices', 'Cost Management'],
    careers: ['Cloud Architect', 'Cloud Engineer', 'DevOps Engineer', 'Cloud Consultant', 'Site Reliability Engineer', 'Cloud Security Specialist', 'Solutions Architect', 'Cloud Operations Engineer', 'Platform Engineer', 'Cloud Developer'],
    recruiters: ['Amazon AWS', 'Microsoft Azure', 'Google Cloud', 'IBM Cloud', 'Oracle Cloud', 'VMware', 'Red Hat', 'HashiCorp', 'Snowflake', 'Databricks'],
    salary: '₹6-14 LPA (Entry), ₹14-45 LPA (Experienced)',
    scope: 'Explosive growth as organizations migrate to cloud and adopt cloud-native technologies.',
    difficulty: 'Medium-High',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, Mathematics (45% minimum)',
    topColleges: ['IIT Bombay', 'COEP Pune', 'VJTI Mumbai', 'PICT Pune', 'VIT Pune', 'MIT Pune'],
    certifications: ['AWS Solutions Architect', 'Azure Administrator', 'Google Cloud Professional', 'Kubernetes (CKA)', 'Terraform Associate', 'Docker Certified'],
    higherStudies: ['M.Tech in Cloud Computing', 'MS Abroad', 'MBA in IT', 'Specialized Cloud Certifications'],
    averagePackage: '₹9 LPA',
    highestPackage: '₹55 LPA',
    jobGrowth: '22%+ annually'
  },
  {
    name: 'Internet of Things (IoT)',
    icon: Network,
    category: 'Computer & IT',
    definition: 'IoT Engineering focuses on designing and developing interconnected smart devices and systems that collect and exchange data over the internet.',
    subjects: ['Embedded Systems', 'Sensor Networks', 'IoT Architecture', 'Wireless Communication', 'Edge Computing', 'IoT Security', 'Data Analytics', 'Industrial IoT', 'MQTT & Protocols', 'Cloud Integration', 'IoT Platforms', 'Smart Cities'],
    skills: ['Embedded Programming (C/C++)', 'Sensor Integration', 'Wireless Protocols', 'Data Analysis', 'Python/C Programming', 'Cloud Integration', 'Problem Solving', 'PCB Design', 'Edge Computing', 'IoT Security'],
    careers: ['IoT Developer', 'Embedded Systems Engineer', 'IoT Solutions Architect', 'Smart City Engineer', 'Industrial IoT Specialist', 'IoT Security Expert', 'Research Engineer', 'IoT Product Manager', 'Edge Computing Engineer', 'Connected Devices Engineer'],
    recruiters: ['Bosch', 'Siemens', 'Honeywell', 'Samsung', 'Intel', 'Cisco', 'IBM', 'TCS IoT Division', 'Infosys IoT', 'Wipro IoT'],
    salary: '₹5-12 LPA (Entry), ₹12-35 LPA (Experienced)',
    scope: 'Rapid growth in smart cities, industrial automation, healthcare, and consumer electronics.',
    difficulty: 'Medium-High',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, Mathematics (45% minimum)',
    topColleges: ['IIT Bombay', 'COEP Pune', 'VJTI Mumbai', 'PICT Pune', 'VIT Pune', 'SPIT Mumbai'],
    certifications: ['AWS IoT', 'Azure IoT', 'Google Cloud IoT', 'Cisco IoT', 'ARM IoT', 'Certified IoT Professional'],
    higherStudies: ['M.Tech in IoT', 'M.Tech in Embedded Systems', 'MS Abroad', 'Ph.D.'],
    averagePackage: '₹7 LPA',
    highestPackage: '₹40 LPA',
    jobGrowth: '18%+ annually'
  },
  // Electronics & Communication
  {
    name: 'Electronics & Telecommunication',
    icon: Radio,
    category: 'Electronics & Communication',
    definition: 'Electronics & Telecommunication Engineering combines electronics engineering with telecommunication technologies for communication systems and networking infrastructure.',
    subjects: ['Analog & Digital Communication', 'Signal Processing', 'Antenna Theory', 'Optical Communication', 'Mobile Communication', 'Satellite Communication', 'Network Analysis', 'VLSI Design', 'Wireless Networks', 'RF Engineering', 'Microwave Engineering', 'Image Processing'],
    skills: ['Circuit Design', 'Signal Processing', 'Communication Protocols', 'MATLAB/Simulink', 'PCB Design', 'Network Analysis', 'Testing & Debugging', 'RF Design', 'Antenna Design', 'FPGA Programming'],
    careers: ['Telecom Engineer', 'RF Engineer', 'Network Planning Engineer', 'Communication Systems Engineer', 'Signal Processing Engineer', 'Project Manager', 'Research Engineer', 'Antenna Engineer', 'Microwave Engineer', 'Satellite Communication Engineer'],
    recruiters: ['Ericsson', 'Nokia', 'Huawei', 'Qualcomm', 'Airtel', 'Jio', 'BSNL', 'BEL', 'ISRO', 'DRDO'],
    salary: '₹4-9 LPA (Entry), ₹9-25 LPA (Experienced)',
    scope: 'Strong demand in telecom sector, 5G/6G development, and satellite communication.',
    difficulty: 'Medium-High',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, Mathematics (45% minimum)',
    topColleges: ['COEP Pune', 'VJTI Mumbai', 'SPCE Mumbai', 'PICT Pune', 'Government Engineering College Aurangabad', 'VNIT Nagpur'],
    certifications: ['Cisco CCNA/CCNP', 'Huawei Certification', 'RF Engineering', 'MATLAB', 'LabVIEW', 'Antenna Design'],
    higherStudies: ['M.Tech in Communication Systems', 'M.Tech in Signal Processing', 'M.Tech in VLSI', 'MBA', 'Ph.D.'],
    averagePackage: '₹6 LPA',
    highestPackage: '₹35 LPA',
    jobGrowth: '12%+ annually'
  },
  {
    name: 'VLSI Design',
    icon: Cpu,
    category: 'Electronics & Communication',
    definition: 'VLSI (Very Large Scale Integration) Design focuses on creating integrated circuits by combining millions of transistors into a single chip.',
    subjects: ['VLSI Design', 'Digital System Design', 'CMOS Technology', 'Verilog/VHDL', 'Physical Design', 'ASIC Design', 'FPGA Programming', 'Semiconductor Physics', 'Testing & Verification', 'Low Power Design', 'Mixed Signal Design', 'SoC Design'],
    skills: ['HDL Programming (Verilog/VHDL)', 'Digital Design', 'Physical Design Tools (Cadence, Synopsys)', 'Verification Methods', 'Circuit Simulation', 'Layout Design', 'Timing Analysis', 'Scripting (Tcl, Python)', 'Problem Solving', 'Team Collaboration'],
    careers: ['VLSI Design Engineer', 'ASIC Engineer', 'FPGA Engineer', 'Verification Engineer', 'Physical Design Engineer', 'Layout Engineer', 'CAD Engineer', 'Design for Test Engineer', 'SoC Architect', 'Technical Lead'],
    recruiters: ['Intel', 'AMD', 'Qualcomm', 'NVIDIA', 'Samsung Semiconductor', 'MediaTek', 'Broadcom', 'Apple', 'Google Silicon', 'Microsoft Silicon'],
    salary: '₹6-15 LPA (Entry), ₹15-50 LPA (Experienced)',
    scope: 'High demand with semiconductor boom and government push for chip manufacturing in India.',
    difficulty: 'Very High',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, Mathematics (50% minimum)',
    topColleges: ['IIT Bombay', 'IIT Delhi', 'IIIT Bangalore', 'BITS Pilani', 'COEP Pune', 'VJTI Mumbai'],
    certifications: ['Cadence Certification', 'Synopsys Certification', 'FPGA Design', 'ARM Architecture', 'ASIC Design Flow', 'TCL Scripting'],
    higherStudies: ['M.Tech in VLSI', 'MS Abroad (VLSI)', 'Ph.D.', 'Research Positions'],
    averagePackage: '₹12 LPA',
    highestPackage: '₹60 LPA',
    jobGrowth: '15%+ annually'
  },
  {
    name: 'Instrumentation Engineering',
    icon: Gauge,
    category: 'Electronics & Communication',
    definition: 'Instrumentation Engineering deals with the design, development, and maintenance of instruments and control systems used in industrial processes.',
    subjects: ['Process Control', 'Industrial Instrumentation', 'Biomedical Instrumentation', 'Analytical Instrumentation', 'Control Theory', 'PLC & SCADA', 'Sensors & Transducers', 'Robotics', 'Automation', 'Signal Conditioning', 'Measurement Systems', 'Process Automation'],
    skills: ['Control Systems Design', 'PLC Programming', 'SCADA Systems', 'Sensor Calibration', 'Process Optimization', 'Technical Documentation', 'Troubleshooting', 'DCS Systems', 'Field Instruments', 'PID Tuning'],
    careers: ['Instrumentation Engineer', 'Control Systems Engineer', 'Automation Engineer', 'Process Control Engineer', 'Project Engineer', 'Maintenance Engineer', 'Technical Consultant', 'SCADA Engineer', 'DCS Engineer', 'Calibration Engineer'],
    recruiters: ['ABB', 'Siemens', 'Emerson', 'Honeywell', 'Yokogawa', 'Rockwell Automation', 'Schneider Electric', 'GE', 'TCS Automation', 'Infosys Process Automation'],
    salary: '₹4-8 LPA (Entry), ₹8-20 LPA (Experienced)',
    scope: 'Steady demand in manufacturing, oil & gas, pharmaceuticals, and process industries.',
    difficulty: 'Medium',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, Mathematics (45% minimum)',
    topColleges: ['COEP Pune', 'VJTI Mumbai', 'Government Engineering College Jalgaon', 'VNIT Nagpur', 'SGGS Nanded', 'MIT Pune'],
    certifications: ['PLC Programming', 'SCADA Systems', 'DCS', 'ISA Certification', 'Siemens TIA Portal', 'ABB Automation'],
    higherStudies: ['M.Tech in Control Systems', 'M.Tech in Instrumentation', 'MBA in Operations', 'Ph.D.'],
    averagePackage: '₹5.5 LPA',
    highestPackage: '₹25 LPA',
    jobGrowth: '8%+ annually'
  },
  // Mechanical & Automation
  {
    name: 'Mechatronics Engineering',
    icon: Bot,
    category: 'Mechanical & Automation',
    definition: 'Mechatronics Engineering is an interdisciplinary field that combines mechanical engineering, electronics, computer science, and control engineering.',
    subjects: ['Mechatronics System Design', 'Robotics', 'Embedded Systems', 'Control Systems', 'Digital Electronics', 'Computer Programming', 'Sensors & Actuators', 'Industrial Automation', 'Machine Vision', 'PLC Programming', 'Motion Control', 'Smart Manufacturing'],
    skills: ['Mechanical Design', 'Electronics Knowledge', 'Programming Skills (C, Python)', 'Control Systems', 'CAD/CAM', 'Problem Solving', 'System Integration', 'PLC Programming', 'Robotics', 'IoT'],
    careers: ['Mechatronics Engineer', 'Automation Engineer', 'Robotics Engineer', 'Systems Engineer', 'Control Engineer', 'R&D Engineer', 'Technical Consultant', 'Smart Manufacturing Engineer', 'Industrial Automation Specialist', 'Product Development Engineer'],
    recruiters: ['Siemens', 'ABB', 'Bosch', 'Fanuc', 'KUKA', 'Yaskawa', 'Rockwell Automation', 'Schneider Electric', 'Tata Technologies', 'Mahindra'],
    salary: '₹4-9 LPA (Entry), ₹9-28 LPA (Experienced)',
    scope: 'Growing demand with Industry 4.0 adoption and smart manufacturing initiatives.',
    difficulty: 'Medium-High',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, Mathematics (45% minimum)',
    topColleges: ['COEP Pune', 'VJTI Mumbai', 'MIT Pune', 'VIT Pune', 'Government Engineering College Aurangabad', 'KJ Somaiya Mumbai'],
    certifications: ['PLC Programming', 'Robotics', 'IoT', 'Six Sigma', 'CAD/CAM', 'Industrial Automation'],
    higherStudies: ['M.Tech in Mechatronics', 'M.Tech in Robotics', 'MS Abroad', 'MBA in Operations', 'Ph.D.'],
    averagePackage: '₹6 LPA',
    highestPackage: '₹35 LPA',
    jobGrowth: '12%+ annually'
  },
  {
    name: 'Robotics Engineering',
    icon: Bot,
    category: 'Mechanical & Automation',
    definition: 'Robotics Engineering involves the design, construction, operation, and use of robots for various applications.',
    subjects: ['Robot Kinematics', 'Robot Dynamics', 'Artificial Intelligence', 'Computer Vision', 'Control Systems', 'Machine Learning', 'Sensor Technologies', 'Human-Robot Interaction', 'Motion Planning', 'Robotic Perception', 'Embedded Systems', 'Autonomous Systems'],
    skills: ['Programming (Python, C++, ROS)', 'Machine Learning', 'CAD Design', 'Sensor Integration', 'Control Systems', 'Problem Solving', 'Team Collaboration', 'Computer Vision', 'Motion Planning', 'Deep Learning'],
    careers: ['Robotics Engineer', 'Automation Specialist', 'AI/ML Engineer', 'Research Scientist', 'Robotics Software Developer', 'Systems Engineer', 'Technical Lead', 'RPA Engineer', 'Autonomous Vehicle Engineer', 'Drone Engineer'],
    recruiters: ['Boston Dynamics', 'ABB Robotics', 'Fanuc', 'Universal Robots', 'Tesla', 'Amazon Robotics', 'Google X', 'NASA', 'ISRO', 'DRDO'],
    salary: '₹6-14 LPA (Entry), ₹14-45 LPA (Experienced)',
    scope: 'Explosive growth in manufacturing automation, healthcare robotics, and autonomous vehicles.',
    difficulty: 'High',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, Mathematics (50% minimum)',
    topColleges: ['IIT Bombay', 'COEP Pune', 'IIT Madras', 'IIIT Hyderabad', 'BITS Pilani', 'VJTI Mumbai'],
    certifications: ['ROS (Robot Operating System)', 'Computer Vision', 'Machine Learning', 'Autonomous Systems', 'Industrial Robotics', 'Motion Planning'],
    higherStudies: ['M.Tech in Robotics', 'MS Abroad (Robotics)', 'Ph.D.', 'Research Positions'],
    averagePackage: '₹9 LPA',
    highestPackage: '₹50 LPA',
    jobGrowth: '18%+ annually'
  },
  {
    name: 'Automobile Engineering',
    icon: Car,
    category: 'Mechanical & Automation',
    definition: 'Automobile Engineering deals with the design, development, manufacturing, and maintenance of automobiles including electric vehicles.',
    subjects: ['Automotive Engines', 'Vehicle Dynamics', 'Automotive Electrical Systems', 'Manufacturing Technology', 'Electric Vehicles', 'Automotive Electronics', 'Quality Control', 'Automotive Design', 'Chassis Systems', 'Powertrain Engineering', 'Alternative Fuels', 'Autonomous Vehicles'],
    skills: ['CAD Software (CATIA, NX)', 'Engine Diagnostics', 'Vehicle Testing', 'Manufacturing Processes', 'Problem Analysis', 'Team Collaboration', 'Technical Communication', 'Electric Vehicle Systems', 'Battery Technology', 'Autonomous Systems'],
    careers: ['Automobile Engineer', 'Design Engineer', 'Testing Engineer', 'Quality Engineer', 'R&D Engineer', 'Production Engineer', 'Electric Vehicle Engineer', 'Powertrain Engineer', 'Vehicle Dynamics Engineer', 'Autonomous Vehicle Engineer'],
    recruiters: ['Tata Motors', 'Mahindra', 'Maruti Suzuki', 'Hyundai', 'Honda', 'Bajaj Auto', 'Hero MotoCorp', 'Tesla India', 'Ather Energy', 'Ola Electric'],
    salary: '₹4-8 LPA (Entry), ₹8-25 LPA (Experienced)',
    scope: 'Transformational growth with electric vehicles and autonomous driving technologies.',
    difficulty: 'Medium',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, Mathematics (45% minimum)',
    topColleges: ['COEP Pune', 'VJTI Mumbai', 'MIT Pune', 'Government Engineering College Aurangabad', 'VNIT Nagpur', 'PCCOE Pune'],
    certifications: ['Automotive Design (CATIA)', 'Electric Vehicle Technology', 'AUTOSAR', 'ADAS', 'Battery Management Systems', 'Vehicle Testing'],
    higherStudies: ['M.Tech in Automobile Engineering', 'M.Tech in EV Technology', 'MS Abroad', 'MBA', 'Ph.D.'],
    averagePackage: '₹6 LPA',
    highestPackage: '₹35 LPA',
    jobGrowth: '10%+ annually'
  },
  // Specialized Fields
  {
    name: 'Biotechnology Engineering',
    icon: TestTube,
    category: 'Specialized Fields',
    definition: 'Biotechnology Engineering combines biological sciences with engineering principles for healthcare, agriculture, and environmental applications.',
    subjects: ['Genetic Engineering', 'Bioprocess Engineering', 'Molecular Biology', 'Bioinformatics', 'Immunology', 'Enzyme Technology', 'Bioreactor Design', 'Environmental Biotechnology', 'Plant Biotechnology', 'Animal Biotechnology', 'Medical Biotechnology', 'Biosafety & Bioethics'],
    skills: ['Laboratory Techniques', 'Data Analysis', 'Research Methods', 'Bioinformatics Tools', 'Problem Solving', 'Scientific Writing', 'Regulatory Knowledge', 'Cell Culture', 'PCR & Sequencing', 'Biostatistics'],
    careers: ['Biotech Researcher', 'Process Development Engineer', 'Quality Control Engineer', 'Clinical Research Associate', 'Bioinformatics Specialist', 'Regulatory Affairs Manager', 'R&D Scientist', 'Biomanufacturing Engineer', 'Genetic Engineer', 'Medical Biotechnologist'],
    recruiters: ['Biocon', 'Serum Institute of India', 'Bharat Biotech', 'Dr. Reddy\'s', 'Cipla', 'Sun Pharma', 'Baxter', 'Johnson & Johnson', 'Zydus Cadila', 'Panacea Biotec'],
    salary: '₹4-9 LPA (Entry), ₹9-25 LPA (Experienced)',
    scope: 'Excellent growth in healthcare, vaccines, and biopharmaceuticals post-pandemic.',
    difficulty: 'High',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, Mathematics/Biology (45% minimum)',
    topColleges: ['ICT Mumbai', 'UICT Jalgaon', 'IIT Bombay', 'LIT Nagpur', 'COEP Pune', 'VJTI Mumbai'],
    certifications: ['Clinical Research', 'Bioinformatics', 'GMP Certification', 'Quality Assurance', 'Biostatistics', 'Regulatory Affairs'],
    higherStudies: ['M.Tech in Biotechnology', 'M.Sc in Biotechnology', 'MS Abroad', 'Ph.D.', 'Research Positions'],
    averagePackage: '₹5.5 LPA',
    highestPackage: '₹30 LPA',
    jobGrowth: '10%+ annually'
  },
  {
    name: 'Aerospace Engineering',
    icon: Plane,
    category: 'Specialized Fields',
    definition: 'Aerospace Engineering involves the design, development, testing, and production of aircraft, spacecraft, and related systems.',
    subjects: ['Aerodynamics', 'Propulsion Systems', 'Flight Mechanics', 'Aircraft Structures', 'Avionics', 'Spacecraft Design', 'Computational Fluid Dynamics', 'Control Systems', 'Aircraft Materials', 'Orbital Mechanics', 'Satellite Communication', 'Aircraft Maintenance'],
    skills: ['CAD/CAE Software (CATIA, ANSYS)', 'Mathematical Modeling', 'Structural Analysis', 'Aerodynamic Analysis', 'Programming (MATLAB, Python)', 'Problem Solving', 'Attention to Detail', 'CFD Analysis', 'Systems Engineering', 'Testing & Validation'],
    careers: ['Aerospace Engineer', 'Aircraft Designer', 'Propulsion Engineer', 'Avionics Engineer', 'Flight Test Engineer', 'Systems Engineer', 'Research Scientist', 'Satellite Engineer', 'Spacecraft Designer', 'Aerodynamics Engineer'],
    recruiters: ['ISRO', 'DRDO', 'HAL', 'NAL', 'Tata Advanced Systems', 'Boeing India', 'Airbus India', 'GE Aviation', 'Rolls Royce', 'Mahindra Aerospace'],
    salary: '₹5-12 LPA (Entry), ₹12-35 LPA (Experienced)',
    scope: 'Growing with private space sector and government push for aerospace manufacturing.',
    difficulty: 'Very High',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, Mathematics (50% minimum)',
    topColleges: ['IIT Bombay', 'IIT Madras', 'IIT Kanpur', 'IIST Thiruvananthapuram', 'MIT Pune', 'RVCE Bangalore'],
    certifications: ['CATIA', 'ANSYS Fluent', 'Aircraft Maintenance', 'Systems Engineering', 'Avionics', 'Space Systems'],
    higherStudies: ['M.Tech in Aerospace Engineering', 'MS Abroad', 'Ph.D.', 'Research Positions at ISRO/NASA'],
    averagePackage: '₹8 LPA',
    highestPackage: '₹45 LPA',
    jobGrowth: '10%+ annually'
  },
  {
    name: 'Petroleum Engineering',
    icon: Fuel,
    category: 'Specialized Fields',
    definition: 'Petroleum Engineering focuses on the exploration, extraction, and production of oil and natural gas.',
    subjects: ['Reservoir Engineering', 'Drilling Technology', 'Production Engineering', 'Petroleum Geology', 'Well Logging', 'Enhanced Oil Recovery', 'Natural Gas Engineering', 'Offshore Technology', 'Petroleum Refining', 'Pipeline Engineering', 'Reservoir Simulation', 'Health Safety & Environment'],
    skills: ['Technical Analysis', 'Geological Knowledge', 'Drilling Operations', 'Reservoir Simulation', 'Safety Management', 'Problem Solving', 'Project Management', 'Software (Petrel, Eclipse)', 'Well Testing', 'Production Optimization'],
    careers: ['Petroleum Engineer', 'Drilling Engineer', 'Reservoir Engineer', 'Production Engineer', 'Well Engineer', 'Offshore Engineer', 'Technical Consultant', 'Reservoir Geologist', 'Petrophysicist', 'HSE Manager'],
    recruiters: ['ONGC', 'IOCL', 'BPCL', 'HPCL', 'Reliance Petroleum', 'Cairn India', 'GAIL', 'Shell India', 'Schlumberger', 'Halliburton'],
    salary: '₹6-15 LPA (Entry), ₹15-40 LPA (Experienced)',
    scope: 'High-paying niche field with opportunities in upstream oil & gas and energy transition.',
    difficulty: 'High',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, Mathematics (50% minimum)',
    topColleges: ['IIT Bombay', 'IIT Madras', 'IIT Dhanbad (ISM)', 'Pandit Deendayal Energy University', 'MIT Pune', 'Dibrugarh University'],
    certifications: ['Well Control', 'Reservoir Engineering', 'Drilling Technology', 'HSE Certification', 'Petrel', 'Eclipse'],
    higherStudies: ['M.Tech in Petroleum Engineering', 'MS Abroad', 'MBA in Energy Management', 'Ph.D.'],
    averagePackage: '₹10 LPA',
    highestPackage: '₹50 LPA',
    jobGrowth: '5%+ annually'
  },
  {
    name: 'Environmental Engineering',
    icon: Leaf,
    category: 'Specialized Fields',
    definition: 'Environmental Engineering applies scientific and engineering principles to protect and improve the environment.',
    subjects: ['Environmental Chemistry', 'Water Supply Engineering', 'Wastewater Treatment', 'Air Pollution Control', 'Solid Waste Management', 'Environmental Impact Assessment', 'Environmental Laws', 'Ecology', 'Hazardous Waste Management', 'Noise Control', 'Environmental Monitoring', 'Climate Change Mitigation'],
    skills: ['Technical Analysis', 'Environmental Laws', 'Project Management', 'Data Analysis', 'GIS Applications', 'Problem Solving', 'Communication', 'Environmental Modeling', 'Risk Assessment', 'Sustainability Planning'],
    careers: ['Environmental Engineer', 'Water Resources Engineer', 'Air Quality Engineer', 'Waste Management Specialist', 'Environmental Consultant', 'Sustainability Manager', 'EHS Manager', 'Environmental Scientist', 'Climate Change Analyst', 'Green Building Engineer'],
    recruiters: ['Tata Projects', 'L&T Environment', 'Ramky Group', 'IL&FS Environment', 'NEERI', 'CPCB', 'SPCB', 'UNEP', 'World Bank', 'UNDP'],
    salary: '₹4-8 LPA (Entry), ₹8-20 LPA (Experienced)',
    scope: 'Growing with increasing environmental regulations and sustainability initiatives.',
    difficulty: 'Medium',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, Mathematics (45% minimum)',
    topColleges: ['IIT Bombay', 'IIT Madras', 'COEP Pune', 'VNIT Nagpur', 'Delhi Technological University', 'Jadavpur University'],
    certifications: ['Environmental Impact Assessment', 'ISO 14001', 'Water Treatment', 'Air Quality Management', 'GIS', 'Sustainability Certification'],
    higherStudies: ['M.Tech in Environmental Engineering', 'M.Sc in Environmental Science', 'MBA in Sustainability', 'Ph.D.'],
    averagePackage: '₹5 LPA',
    highestPackage: '₹25 LPA',
    jobGrowth: '8%+ annually'
  }
]

// Colleges Data
const collegesData = {
  'University of Mumbai': [
    { name: 'Veermata Jijabai Technological Institute (VJTI)', type: 'Autonomous', rating: '★★★★★' },
    { name: 'Sardar Patel Institute of Technology (SPIT)', type: 'Government', rating: '★★★★★' },
    { name: 'Dwarkadas J. Sanghvi College of Engineering (DJSCE)', type: 'Private', rating: '★★★★☆' },
    { name: 'Thadomal Shahani Engineering College (TSEC)', type: 'Private', rating: '★★★★☆' },
    { name: 'K. J. Somaiya College of Engineering', type: 'Private', rating: '★★★★☆' },
    { name: 'SIES Graduate School of Technology', type: 'Private', rating: '★★★★☆' },
    { name: 'Fr. Conceicao Rodrigues College of Engineering', type: 'Private', rating: '★★★★☆' },
    { name: 'Rajiv Gandhi Institute of Technology', type: 'Government', rating: '★★★☆☆' },
    { name: 'Vivekanand Education Society\'s Institute of Technology', type: 'Private', rating: '★★★★☆' },
    { name: 'Atharva College of Engineering', type: 'Private', rating: '★★★☆☆' },
    { name: 'St. Francis Institute of Technology', type: 'Private', rating: '★★★☆☆' },
    { name: 'Xavier Institute of Engineering', type: 'Private', rating: '★★★☆☆' },
  ],
  'Savitribai Phule Pune University': [
    { name: 'College of Engineering, Pune (COEP)', type: 'Autonomous', rating: '★★★★★' },
    { name: 'Pune Institute of Computer Technology (PICT)', type: 'Private', rating: '★★★★★' },
    { name: 'Vishwakarma Institute of Technology (VIT)', type: 'Private', rating: '★★★★☆' },
    { name: 'Maharashtra Institute of Technology (MIT)', type: 'Private', rating: '★★★★☆' },
    { name: 'Sinhgad College of Engineering', type: 'Private', rating: '★★★★☆' },
    { name: 'DY Patil College of Engineering', type: 'Private', rating: '★★★★☆' },
    { name: 'AISSMS College of Engineering', type: 'Private', rating: '★★★☆☆' },
    { name: 'Government College of Engineering & Research, Avasari', type: 'Government', rating: '★★★☆☆' },
    { name: 'Pimpri Chinchwad College of Engineering (PCCOE)', type: 'Private', rating: '★★★★☆' },
    { name: 'Modern Education Society\'s College of Engineering', type: 'Private', rating: '★★★☆☆' },
    { name: 'JSPM\'s Rajarshi Shahu College of Engineering', type: 'Private', rating: '★★★☆☆' },
    { name: 'G.H. Raisoni College of Engineering', type: 'Private', rating: '★★★☆☆' },
  ],
  'Other Premier Institutes': [
    { name: 'IIT Bombay', type: 'Institute of National Importance', rating: '★★★★★' },
    { name: 'VNIT Nagpur', type: 'NIT', rating: '★★★★★' },
    { name: 'IIIT Pune', type: 'IIIT', rating: '★★★★★' },
    { name: 'ICT Mumbai', type: 'Institute of Eminence', rating: '★★★★★' },
    { name: 'SGGS Institute of Engineering & Technology, Nanded', type: 'Autonomous', rating: '★★★★☆' },
    { name: 'Government Engineering College, Aurangabad', type: 'Government', rating: '★★★★☆' },
  ]
}

// Tier Rankings
const tierRankings = [
  { tier: 'Tier 1', branches: ['Computer Engineering', 'AI & Data Science', 'VLSI Design'], demand: 'Extremely High', salary: 'Highest', futureScope: 'Excellent', color: 'bg-emerald-500' },
  { tier: 'Tier 2', branches: ['IT Engineering', 'Electronics & Telecom', 'Robotics', 'Cyber Security', 'Cloud Computing', 'IoT'], demand: 'High', salary: 'High', futureScope: 'Very Good', color: 'bg-blue-500' },
  { tier: 'Tier 3', branches: ['Mechanical', 'Electrical', 'Civil', 'Instrumentation', 'Electronics', 'Mechatronics'], demand: 'Moderate-High', salary: 'Moderate', futureScope: 'Good', color: 'bg-yellow-500' },
  { tier: 'Tier 4', branches: ['Chemical', 'Automobile', 'Production', 'Petroleum', 'Aerospace'], demand: 'Moderate', salary: 'Moderate', futureScope: 'Good', color: 'bg-orange-500' },
  { tier: 'Tier 5', branches: ['Mining', 'Textile', 'Agricultural', 'Polymer', 'Marine', 'Environmental'], demand: 'Niche', salary: 'Variable', futureScope: 'Specialized', color: 'bg-gray-500' }
]

// Diploma Branches
const diplomaBranches = [
  'Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 
  'Electronics & Telecommunication', 'Computer Engineering', 'Information Technology',
  'Chemical Engineering', 'Automobile Engineering', 'Production Engineering',
  'Instrumentation Engineering', 'Mining Engineering', 'Textile Technology',
  'Architecture Assistantship', 'Medical Electronics', 'Biomedical Engineering', 'Mechatronics'
]

// Branch Detail Modal
function BranchDetailModal({ branch, isOpen, onClose }: { branch: BranchData | null, isOpen: boolean, onClose: () => void }) {
  if (!branch || !isOpen) return null
  const IconComponent = branch.icon

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3 text-white">
            <IconComponent className="h-8 w-8 text-emerald-400" />
            {branch.name}
          </DialogTitle>
          <DialogDescription>
            <Badge variant="secondary" className="mt-2">{branch.category}</Badge>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-4">
                <p className="text-sm text-emerald-400">Average Package</p>
                <p className="text-xl font-bold text-white">{branch.averagePackage}</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-4">
                <p className="text-sm text-emerald-400">Highest Package</p>
                <p className="text-xl font-bold text-white">{branch.highestPackage}</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-4">
                <p className="text-sm text-emerald-400">Difficulty</p>
                <p className="text-xl font-bold text-white">{branch.difficulty}</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-4">
                <p className="text-sm text-emerald-400">Job Growth</p>
                <p className="text-xl font-bold text-white">{branch.jobGrowth}</p>
              </CardContent>
            </Card>
          </div>

          {/* Definition */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Definition & Overview</h3>
            <p className="text-slate-300 leading-relaxed">{branch.definition}</p>
          </div>

          {/* Scope */}
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              Future Scope
            </h3>
            <p className="text-slate-300">{branch.scope}</p>
          </div>

          {/* Course Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Course Details</h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <strong>Duration:</strong> {branch.duration}
                </li>
                <li className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-slate-500" />
                  <strong>Eligibility:</strong> {branch.eligibility}
                </li>
                <li className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-slate-500" />
                  <strong>Salary:</strong> {branch.salary}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Higher Studies</h3>
              <div className="flex flex-wrap gap-2">
                {branch.higherStudies.map((hs, i) => (
                  <Badge key={i} variant="outline" className="border-purple-500 text-purple-300">{hs}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Key Subjects */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-400" />
              Key Subjects
            </h3>
            <div className="flex flex-wrap gap-2">
              {branch.subjects.map((subject, i) => (
                <Badge key={i} variant="secondary">{subject}</Badge>
              ))}
            </div>
          </div>

          {/* Skills Required */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <Target className="h-5 w-5 text-emerald-400" />
              Skills Required
            </h3>
            <div className="flex flex-wrap gap-2">
              {branch.skills.map((skill, i) => (
                <Badge key={i} variant="outline" className="border-emerald-500 text-emerald-300">{skill}</Badge>
              ))}
            </div>
          </div>

          {/* Career Opportunities */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-400" />
              Career Opportunities
            </h3>
            <div className="flex flex-wrap gap-2">
              {branch.careers.map((career, i) => (
                <Badge key={i} variant="outline" className="border-blue-500 text-blue-300">{career}</Badge>
              ))}
            </div>
          </div>

          {/* Top Recruiters */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-orange-400" />
              Top Recruiters in India
            </h3>
            <div className="flex flex-wrap gap-2">
              {branch.recruiters.map((recruiter, i) => (
                <Badge key={i} variant="outline" className="border-orange-500 text-orange-300">{recruiter}</Badge>
              ))}
            </div>
          </div>

          {/* Top Colleges */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <School className="h-5 w-5 text-purple-400" />
              Top Colleges in Maharashtra
            </h3>
            <div className="flex flex-wrap gap-2">
              {branch.topColleges.map((college, i) => (
                <Badge key={i} variant="outline" className="border-purple-500 text-purple-300">{college}</Badge>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <Award className="h-5 w-5 text-teal-400" />
              Recommended Certifications
            </h3>
            <div className="flex flex-wrap gap-2">
              {branch.certifications.map((cert, i) => (
                <Badge key={i} variant="outline" className="border-teal-500 text-teal-300">{cert}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={() => onClose()} className="bg-emerald-600 hover:bg-emerald-700">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function BRUTALGUIDE() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState<BranchData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('introduction')

  const handleBranchClick = (branch: BranchData) => {
    setSelectedBranch(branch)
    setIsModalOpen(true)
  }

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch('/download/Complete_Guide_Engineering_Streams_Maharashtra.pdf')
      if (!response.ok) throw new Error('Failed to download PDF')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'BRUTALGUIDE_Engineering_Guide_Maharashtra.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
      // Fallback: open in new tab
      window.open('/download/Complete_Guide_Engineering_Streams_Maharashtra.pdf', '_blank')
    }
  }

  const handleDownloadZIP = async () => {
    try {
      const response = await fetch('/download/BRUTALGUIDE_Complete.zip')
      if (!response.ok) throw new Error('Failed to download ZIP')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'BRUTALGUIDE_Complete.zip'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
      // Fallback: open in new tab
      window.open('/download/BRUTALGUIDE_Complete.zip', '_blank')
    }
  }

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const categories = [...new Set(allBranches.map(b => b.category))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Left Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-72 bg-slate-900 border-r border-slate-700 z-50
        transform transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="BRUTALGUIDE Logo" className="w-10 h-10 rounded-lg object-cover" />
            <div>
              <h1 className="text-lg font-bold text-white">BRUTALGUIDE</h1>
              <p className="text-xs text-slate-400">Engineering Guide Maharashtra</p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 hover:bg-slate-700 rounded-lg"
          >
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        {/* Navigation */}
        <ScrollArea className="h-[calc(100vh-140px)]">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all
                  ${activeSection === item.id
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
                `}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </ScrollArea>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700 bg-slate-900">
          <Button onClick={handleDownloadPDF} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mb-2" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download PDF Guide
          </Button>
          <Button onClick={handleDownloadZIP} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white mb-3" size="sm">
            <Archive className="h-4 w-4 mr-2" />
            Download All Files (ZIP)
          </Button>
          <a 
            href="https://github.com/brutal-45/BRUTALGUIDE" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full border-slate-600 bg-slate-800 hover:bg-slate-700 hover:border-emerald-500 text-white transition-all"
            >
              <Github className="h-5 w-5 mr-2 text-emerald-400" />
              <span>Star on GitHub</span>
              <ChevronRight className="h-4 w-4 ml-auto text-slate-400" />
            </Button>
          </a>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-700 lg:hidden">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 hover:bg-slate-700 rounded-lg"
            >
              <Menu className="h-6 w-6 text-white" />
            </button>
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="BRUTALGUIDE" className="w-8 h-8 rounded-lg object-cover" />
              <span className="font-bold text-white">BRUTALGUIDE</span>
            </div>
            <div className="flex gap-2">
              <a href="https://github.com/brutal-45/BRUTALGUIDE" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:bg-slate-800">
                  <Github className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto p-6 lg:p-8 space-y-12">
          
          {/* Hero Section */}
          <section className="text-center py-12 bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl border border-slate-600">
            <div className="flex justify-center mb-4">
              <img src="/logo.png" alt="BRUTALGUIDE Logo" className="w-16 h-16 rounded-xl object-cover shadow-lg" />
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              Complete Guide to<br />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Engineering Streams
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-2">Maharashtra • Degree & Diploma • 2026</p>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Your comprehensive resource for choosing the right engineering branch. Explore branches, compare salaries, find colleges.
            </p>
          </section>

          {/* Section 1: Introduction */}
          <section id="introduction" className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <BookOpen className="h-7 w-7 text-emerald-400" />
              1. Introduction
            </h2>
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-lg font-semibold text-white">Overview of Engineering Education in Maharashtra</h3>
                <p className="text-slate-300 leading-relaxed">
                  Maharashtra stands as one of India's premier destinations for engineering education, boasting a rich heritage of technical institutions. The state is home to over 3,500 engineering colleges, including prestigious institutes like IIT Bombay, VNIT Nagpur, and numerous other esteemed institutions. Mumbai, Pune, and Nagpur serve as major educational hubs.
                </p>
                <h3 className="text-lg font-semibold text-white pt-4">Importance of Choosing the Right Branch</h3>
                <p className="text-slate-300 leading-relaxed">
                  Selecting the appropriate engineering specialization is one of the most crucial decisions in a student's academic journey. The choice should be based on a careful assessment of individual interests, aptitudes, market demands, and long-term career goals.
                </p>
                <h3 className="text-lg font-semibold text-white pt-4">Scope of Engineering in India and Globally</h3>
                <p className="text-slate-300 leading-relaxed">
                  Engineering continues to offer immense scope both within India and globally. The IT sector alone employs over 4.5 million professionals. Emerging fields such as AI, Robotics, Renewable Energy, and Biotechnology are creating new avenues for engineering graduates.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Section 2: Career Paths */}
          <section id="career-paths" className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Target className="h-7 w-7 text-emerald-400" />
              2. Career Paths After 10th & 12th
            </h2>
            <Tabs defaultValue="after-10th" className="w-full">
              <TabsList className="bg-slate-800 border-slate-700">
                <TabsTrigger value="after-10th" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">After 10th</TabsTrigger>
                <TabsTrigger value="after-12th" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">After 12th</TabsTrigger>
              </TabsList>
              
              <TabsContent value="after-10th" className="space-y-4 mt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Award className="h-5 w-5 text-emerald-400" />
                        Diploma (Polytechnic)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-slate-300 space-y-2">
                      <p>• Duration: 3 Years</p>
                      <p>• Eligibility: 10th pass (35% min)</p>
                      <p>• Early industry exposure</p>
                      <p>• Lateral entry to degree</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-blue-400" />
                        11th-12th Science (PCM)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-slate-300 space-y-2">
                      <p>• Duration: 2 Years</p>
                      <p>• Subjects: Physics, Chemistry, Math</p>
                      <p>• Broader career options</p>
                      <p>• Path to B.Tech/B.E.</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="after-12th" className="space-y-4 mt-4">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Degree Programs After 12th</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-700">
                          <TableHead className="text-slate-300">Program</TableHead>
                          <TableHead className="text-slate-300">Duration</TableHead>
                          <TableHead className="text-slate-300">Entrance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="border-slate-700">
                          <TableCell className="text-slate-300">B.Tech/B.E.</TableCell>
                          <TableCell className="text-slate-300">4 Years</TableCell>
                          <TableCell className="text-slate-300">JEE Main, MHT-CET</TableCell>
                        </TableRow>
                        <TableRow className="border-slate-700">
                          <TableCell className="text-slate-300">B.Arch</TableCell>
                          <TableCell className="text-slate-300">5 Years</TableCell>
                          <TableCell className="text-slate-300">NATA, JEE Paper 2</TableCell>
                        </TableRow>
                        <TableRow className="border-slate-700">
                          <TableCell className="text-slate-300">Integrated M.Tech</TableCell>
                          <TableCell className="text-slate-300">5 Years</TableCell>
                          <TableCell className="text-slate-300">JEE Advanced</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>

          {/* Section 3: Classification */}
          <section id="classification" className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Layers className="h-7 w-7 text-emerald-400" />
              3. Classification of Engineering Streams
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Core Engineering', icon: Building2, branches: ['Civil', 'Mechanical', 'Electrical', 'Chemical'], color: 'from-blue-500/20 to-blue-600/20' },
                { title: 'Computer & IT', icon: Code, branches: ['Computer', 'IT', 'AI & DS', 'Cyber Security', 'Cloud', 'IoT'], color: 'from-emerald-500/20 to-emerald-600/20' },
                { title: 'Electronics & Comm', icon: Radio, branches: ['EXTC', 'Electronics', 'VLSI', 'Instrumentation'], color: 'from-purple-500/20 to-purple-600/20' },
                { title: 'Mechanical & Auto', icon: Bot, branches: ['Mechatronics', 'Robotics', 'Automobile', 'Production'], color: 'from-orange-500/20 to-orange-600/20' },
                { title: 'Specialized Fields', icon: Leaf, branches: ['Biotech', 'Aerospace', 'Petroleum', 'Environmental'], color: 'from-teal-500/20 to-teal-600/20' },
              ].map((cat, i) => (
                <Card key={i} className={`bg-gradient-to-br ${cat.color} bg-slate-800 border-slate-700`}>
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <cat.icon className="h-5 w-5 text-emerald-400" />
                      {cat.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {cat.branches.map((b, j) => (
                        <Badge key={j} variant="secondary" className="text-xs">{b}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Section 4: All Branches */}
          <section id="branches" className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Compass className="h-7 w-7 text-emerald-400" />
              4. All Engineering Branches
            </h2>
            <p className="text-slate-400">Click on any branch to view complete details</p>
            
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-lg font-semibold text-slate-300 mb-3">
                  <Badge variant="outline" className="border-emerald-500 text-emerald-400">{category}</Badge>
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allBranches.filter(b => b.category === category).map((branch, i) => {
                    const IconComp = branch.icon
                    return (
                      <Card
                        key={i}
                        className="bg-slate-800 border-slate-700 hover:border-emerald-500 cursor-pointer transition-all hover:scale-105"
                        onClick={() => handleBranchClick(branch)}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                              <IconComp className="h-5 w-5 text-emerald-400" />
                            </div>
                            <div>
                              <CardTitle className="text-white text-sm">{branch.name}</CardTitle>
                              <CardDescription className="text-slate-400 text-xs">{branch.difficulty}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-2">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-xs text-slate-500">Avg Package</p>
                              <p className="text-emerald-400 font-semibold text-sm">{branch.averagePackage}</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-slate-500" />
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </section>

          {/* Section 5: Diploma */}
          <section id="diploma" className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Award className="h-7 w-7 text-emerald-400" />
              5. Diploma Engineering (Polytechnic)
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Available Diploma Branches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {diplomaBranches.map((branch, i) => (
                      <div key={i} className="bg-slate-700/50 px-3 py-2 rounded text-slate-300 text-sm">
                        {branch}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    Advantages of Diploma
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-slate-300 space-y-2">
                  <p>• Early industry exposure and practical skills</p>
                  <p>• Lower cost compared to degree programs</p>
                  <p>• Job-ready in 3 years after 10th</p>
                  <p>• Lateral entry to degree (direct 2nd year)</p>
                  <p>• Better hands-on experience</p>
                  <p>• Multiple career paths available</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 6: Rankings */}
          <section id="rankings" className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Trophy className="h-7 w-7 text-emerald-400" />
              6. Branch Rankings 2026
            </h2>
            <div className="space-y-4">
              {tierRankings.map((tier, i) => (
                <Card key={i} className="bg-slate-800 border-slate-700 overflow-hidden">
                  <div className={`${tier.color} p-4`}>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      {tier.tier}
                    </h3>
                  </div>
                  <CardContent className="pt-4">
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-slate-500">Branches</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {tier.branches.map((b, j) => (
                            <Badge key={j} variant="secondary" className="text-xs">{b}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Demand</p>
                        <p className="text-white font-semibold">{tier.demand}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Salary</p>
                        <p className="text-white font-semibold">{tier.salary}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Future Scope</p>
                        <p className="text-white font-semibold">{tier.futureScope}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Section 7: Comparison */}
          <section id="comparison" className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Scale className="h-7 w-7 text-emerald-400" />
              7. Comparison Tables
            </h2>
            <Card className="bg-slate-800 border-slate-700 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700 bg-slate-700/50">
                    <TableHead className="text-slate-300 font-semibold">Branch</TableHead>
                    <TableHead className="text-slate-300 font-semibold">Avg Package</TableHead>
                    <TableHead className="text-slate-300 font-semibold">Difficulty</TableHead>
                    <TableHead className="text-slate-300 font-semibold">Job Growth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allBranches.slice(0, 10).map((branch, i) => (
                    <TableRow key={i} className="border-slate-700">
                      <TableCell className="text-slate-300 font-medium">{branch.name}</TableCell>
                      <TableCell className="text-emerald-400">{branch.averagePackage}</TableCell>
                      <TableCell>
                        <Badge variant={branch.difficulty === 'Very High' ? 'destructive' : branch.difficulty === 'High' ? 'secondary' : 'outline'}>
                          {branch.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-blue-400">{branch.jobGrowth}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </section>

          {/* Section 8: Colleges */}
          <section id="colleges" className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <School className="h-7 w-7 text-emerald-400" />
              8. Top Colleges in Maharashtra
            </h2>
            <Tabs defaultValue="mumbai" className="w-full">
              <TabsList className="bg-slate-800 border-slate-700">
                <TabsTrigger value="mumbai" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Mumbai University</TabsTrigger>
                <TabsTrigger value="pune" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Pune University</TabsTrigger>
                <TabsTrigger value="other" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Other Institutes</TabsTrigger>
              </TabsList>
              {Object.entries(collegesData).map(([uni, colleges]) => (
                <TabsContent key={uni} value={uni.includes('Mumbai') ? 'mumbai' : uni.includes('Pune') ? 'pune' : 'other'} className="mt-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {colleges.map((college, i) => (
                      <Card key={i} className="bg-slate-800 border-slate-700">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-white text-sm">{college.name}</CardTitle>
                            <span className="text-yellow-400 text-xs">{college.rating}</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Badge variant={college.type.includes('Autonomous') || college.type.includes('Institute') ? 'default' : college.type.includes('Government') ? 'secondary' : 'outline'}>
                            {college.type}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>

          {/* Section 9: Entrance Exams */}
          <section id="exams" className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <FileText className="h-7 w-7 text-emerald-400" />
              9. Entrance Exams
            </h2>
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">MHT-CET 2026</CardTitle>
                <CardDescription>Maharashtra Common Entrance Test</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Eligibility</h4>
                    <ul className="space-y-1 text-slate-300 text-sm">
                      <li>• 10+2 with Physics, Chemistry, Mathematics</li>
                      <li>• Minimum 45% marks (40% for reserved)</li>
                      <li>• Maharashtra domicile for state quota</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Exam Pattern</h4>
                    <ul className="space-y-1 text-slate-300 text-sm">
                      <li>• Mode: Computer-Based Test</li>
                      <li>• Duration: 3 Hours</li>
                      <li>• Total Questions: 150 (50 each PCM)</li>
                      <li>• Total Marks: 300 (No negative marking)</li>
                    </ul>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-700">
                  <h4 className="font-semibold text-white mb-2">Other Important Exams</h4>
                  <div className="flex flex-wrap gap-2">
                    {['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'SRMJEEE'].map((exam, i) => (
                      <Badge key={i} variant="outline" className="border-emerald-500 text-emerald-400">{exam}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 10: Future Trends */}
          <section id="future-trends" className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Lightbulb className="h-7 w-7 text-emerald-400" />
              10. Future Trends in Engineering
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: 'AI & Automation', desc: 'AI transforming industries, RPA, autonomous vehicles, healthcare AI', icon: Brain, color: 'from-blue-500/20 to-blue-600/20' },
                { title: 'Green Energy', desc: 'Solar, wind, EV technology, sustainable construction, hydrogen fuel', icon: Leaf, color: 'from-emerald-500/20 to-emerald-600/20' },
                { title: 'Digital Transformation', desc: 'Industry 4.0, 5G/6G, IoT expansion, blockchain, quantum computing', icon: Globe, color: 'from-purple-500/20 to-purple-600/20' },
              ].map((trend, i) => (
                <Card key={i} className={`bg-gradient-to-br ${trend.color} bg-slate-800 border-slate-700`}>
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <trend.icon className="h-5 w-5 text-emerald-400" />
                      {trend.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-slate-300 text-sm">
                    {trend.desc}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Section 11: Conclusion */}
          <section id="conclusion" className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <CheckCircle2 className="h-7 w-7 text-emerald-400" />
              11. Conclusion
            </h2>
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-lg font-semibold text-white">Final Advice on Choosing the Right Branch</h3>
                <p className="text-slate-300 leading-relaxed">
                  Choosing the right engineering branch requires careful consideration of multiple factors. Students should conduct thorough self-assessment of interests, strengths, and aptitudes. Research the curriculum, career prospects, and industry trends before making a decision.
                </p>
                <h3 className="text-lg font-semibold text-white pt-4">Importance of Interest + Skills + Future Demand</h3>
                <p className="text-slate-300 leading-relaxed">
                  The ideal choice lies at the intersection of personal interest, inherent skills, and future market demand. Interest drives motivation, skills determine capability, and market demand ensures career opportunities. Continuous learning and adaptability are essential for long-term success.
                </p>
                <div className="grid md:grid-cols-3 gap-4 pt-4">
                  {['Research thoroughly before deciding', 'Consider long-term career goals', 'Build strong fundamentals', 'Stay adaptable to new technologies', 'Seek guidance from professionals', 'Focus on continuous learning'].map((tip, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Footer */}
          <footer className="border-t border-slate-700 pt-8 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="BRUTALGUIDE Logo" className="w-8 h-8 rounded-lg object-cover" />
                <span className="text-white font-bold">BRUTALGUIDE</span>
              </div>
              <div className="flex items-center gap-4">
                <a href="https://github.com/brutal-45/BRUTALGUIDE" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                  <Github className="h-5 w-5" />
                </a>
                <Button onClick={handleDownloadPDF} variant="outline" size="sm" className="border-slate-600 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
                <Button onClick={handleDownloadZIP} variant="outline" size="sm" className="border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-white">
                  <Archive className="h-4 w-4 mr-2" />
                  ZIP
                </Button>
              </div>
              <p className="text-slate-400 text-sm">
                © 2026 BRUTALGUIDE. Engineering Guide Maharashtra.
              </p>
            </div>
          </footer>
        </div>
      </main>

      {/* Branch Detail Modal */}
      <BranchDetailModal
        branch={selectedBranch}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
