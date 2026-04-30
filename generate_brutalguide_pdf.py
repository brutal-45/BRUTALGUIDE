#!/usr/bin/env python3
"""
BRUTALGUIDE - Complete Guide to Engineering Streams in Maharashtra
High-Quality PDF Generator
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, cm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY 
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    Image, ListFlowable, ListItem
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
import os

# Register fonts for better text quality
pdfmetrics.registerFont(TTFont('Times New Roman', '/usr/share/fonts/truetype/english/Times-New-Roman.ttf'))
pdfmetrics.registerFont(TTFont('Calibri', '/usr/share/fonts/truetype/english/calibri-regular.ttf'))
pdfmetrics.registerFont(TTFont('Calibri Bold', '/usr/share/fonts/truetype/english/calibri-bold.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))

# Register font family for bold support
registerFontFamily('Times New Roman', normal='Times New Roman', bold='Times New Roman')
registerFontFamily('Calibri', normal='Calibri', bold='Calibri Bold')

# Color scheme
BRUTALGUIDE_DARK = colors.HexColor('#0f172a')
BRUTALGUIDE_EMERALD = colors.HexColor('#10b981')
BRUTALGUIDE_CYAN = colors.HexColor('#06b6d4')
BRUTALGUIDE_WHITE = colors.white
TABLE_HEADER_COLOR = colors.HexColor('#1F4E79')
TABLE_ROW_ODD = colors.HexColor('#F5F5F5')

def create_styles():
    """Create custom styles for better text rendering"""
    styles = getSampleStyleSheet()
    
    # Cover page styles
    styles.add(ParagraphStyle(
        name='CoverTitle',
        fontName='Calibri Bold',
        fontSize=36,
        leading=44,
        alignment=TA_CENTER,
        textColor=BRUTALGUIDE_DARK,
        spaceAfter=20
    ))
    
    styles.add(ParagraphStyle(
        name='CoverSubtitle',
        fontName='Times New Roman',
        fontSize=18,
        leading=24,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#334155'),
        spaceAfter=30
    ))
    
    styles.add(ParagraphStyle(
        name='CoverBranding',
        fontName='Calibri Bold',
        fontSize=16,
        leading=22,
        alignment=TA_CENTER,
        textColor=BRUTALGUIDE_EMERALD,
        spaceBefore=40,
        spaceAfter=20
    ))
    
    styles.add(ParagraphStyle(
        name='CoverInfo',
        fontName='Times New Roman',
        fontSize=14,
        leading=20,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#64748b')
    ))
    
    # Body text styles
    styles.add(ParagraphStyle(
        name='CustomBody',
        fontName='Times New Roman',
        fontSize=11,
        leading=16,
        alignment=TA_JUSTIFY,
        textColor=colors.HexColor('#1e293b'),
        spaceBefore=6,
        spaceAfter=8
    ))
    
    styles.add(ParagraphStyle(
        name='CustomHeading1',
        fontName='Calibri Bold',
        fontSize=20,
        leading=26,
        alignment=TA_LEFT,
        textColor=BRUTALGUIDE_DARK,
        spaceBefore=20,
        spaceAfter=12
    ))
    
    styles.add(ParagraphStyle(
        name='CustomHeading2',
        fontName='Calibri Bold',
        fontSize=16,
        leading=22,
        alignment=TA_LEFT,
        textColor=colors.HexColor('#1e40af'),
        spaceBefore=16,
        spaceAfter=10
    ))
    
    styles.add(ParagraphStyle(
        name='CustomHeading3',
        fontName='Calibri Bold',
        fontSize=13,
        leading=18,
        alignment=TA_LEFT,
        textColor=colors.HexColor('#0f766e'),
        spaceBefore=12,
        spaceAfter=8
    ))
    
    # Table styles
    styles.add(ParagraphStyle(
        name='TableHeader',
        fontName='Calibri Bold',
        fontSize=10,
        leading=14,
        alignment=TA_CENTER,
        textColor=colors.white
    ))
    
    styles.add(ParagraphStyle(
        name='TableCell',
        fontName='Times New Roman',
        fontSize=9,
        leading=13,
        alignment=TA_LEFT,
        textColor=colors.HexColor('#1e293b')
    ))
    
    styles.add(ParagraphStyle(
        name='TableCellCenter',
        fontName='Times New Roman',
        fontSize=9,
        leading=13,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#1e293b')
    ))
    
    # Caption style
    styles.add(ParagraphStyle(
        name='Caption',
        fontName='Times New Roman',
        fontSize=10,
        leading=14,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#64748b'),
        spaceBefore=6,
        spaceAfter=12
    ))
    
    # Bullet style
    styles.add(ParagraphStyle(
        name='BulletText',
        fontName='Times New Roman',
        fontSize=10,
        leading=15,
        alignment=TA_LEFT,
        textColor=colors.HexColor('#334155'),
        leftIndent=20,
        spaceBefore=3,
        spaceAfter=3
    ))
    
    return styles

def create_cover_page(story, styles):
    """Create an attractive cover page"""
    story.append(Spacer(1, 80))
    
    # Main title
    story.append(Paragraph("BRUTALGUIDE", styles['CoverTitle']))
    story.append(Spacer(1, 10))
    
    # Subtitle
    story.append(Paragraph(
        "Complete Guide to Engineering Streams in Maharashtra",
        styles['CoverSubtitle']
    ))
    story.append(Paragraph(
        "Degree & Diploma | Career Guidance After 10th & 12th",
        styles['CoverSubtitle']
    ))
    
    story.append(Spacer(1, 50))
    
    # Branding text
    story.append(Paragraph(
        "IT DEVELOPED UNDER BRUTALTOOLS",
        styles['CoverBranding']
    ))
    
    story.append(Spacer(1, 40))
    
    # Info section
    story.append(Paragraph("Edition 2026", styles['CoverInfo']))
    story.append(Paragraph("Comprehensive Engineering Branch Guide", styles['CoverInfo']))
    story.append(Paragraph("20+ Branches | Top Colleges | Career Paths", styles['CoverInfo']))
    
    story.append(Spacer(1, 60))
    
    # Features box
    features_data = [
        [Paragraph('<b>Key Features</b>', styles['TableHeader'])],
        [Paragraph('Comprehensive coverage of all engineering branches', styles['TableCell'])],
        [Paragraph('Top colleges in Maharashtra with rankings', styles['TableCell'])],
        [Paragraph('Career paths and salary expectations', styles['TableCell'])],
        [Paragraph('Entrance exam guidance (JEE, MHT-CET, GATE)', styles['TableCell'])],
        [Paragraph('Diploma engineering opportunities', styles['TableCell'])],
    ]
    
    features_table = Table(features_data, colWidths=[400])
    features_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), TABLE_HEADER_COLOR),
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#f8fafc')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e2e8f0')),
        ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ('LEFTPADDING', (0, 0), (-1, -1), 15),
        ('RIGHTPADDING', (0, 0), (-1, -1), 15),
    ]))
    story.append(features_table)
    
    story.append(PageBreak())

def create_introduction(story, styles):
    """Create introduction section"""
    story.append(Paragraph("1. Introduction", styles['CustomHeading1']))
    
    story.append(Paragraph(
        """Engineering education in Maharashtra represents one of the most significant pathways to professional 
        success in India. With a rich history of technical education dating back to the establishment of prestigious 
        institutions like the College of Engineering Pune (COEP) in 1854 and Veermata Jijabai Technological Institute 
        (VJTI) in 1887, Maharashtra has consistently been at the forefront of producing world-class engineers who have 
        contributed to nation-building and technological advancement globally.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph(
        """The state of Maharashtra hosts an impressive array of engineering institutions, ranging from the 
        internationally renowned Indian Institute of Technology Bombay (IIT Bombay) to numerous government and 
        private engineering colleges spread across cities like Pune, Mumbai, Nagpur, and Aurangabad. These 
        institutions collectively offer education in more than 20 different engineering disciplines, catering 
        to the diverse interests and career aspirations of students from across the country.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph("1.1 Why Engineering in Maharashtra?", styles['CustomHeading2']))
    
    story.append(Paragraph(
        """Maharashtra stands as one of India's most industrialized and economically developed states, providing 
        engineering graduates with exceptional opportunities for employment and entrepreneurship. The state houses 
        major industrial hubs in Mumbai, Pune, Nashik, and Aurangabad, hosting companies from diverse sectors 
        including information technology, automotive manufacturing, pharmaceuticals, petrochemicals, and aerospace. 
        This industrial ecosystem ensures that engineering graduates have access to quality internships, 
        placements, and career growth opportunities within the state itself.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph(
        """The presence of major IT companies like TCS, Infosys, Wipro, and Accenture in Mumbai and Pune, 
        automotive giants like Tata Motors and Mahindra & Mahindra, and pharmaceutical leaders like Serum 
        Institute of India makes Maharashtra an ideal destination for engineering aspirants seeking both 
        quality education and promising career prospects.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph("1.2 Scope of This Guide", styles['CustomHeading2']))
    
    story.append(Paragraph(
        """This comprehensive guide has been developed under BRUTALTOOLS to provide students and their parents 
        with detailed, accurate, and up-to-date information about engineering education in Maharashtra. The 
        guide covers all major engineering branches, providing insights into curriculum, career prospects, 
        top recruiting companies, expected salaries, and recommended colleges for each specialization. 
        Whether you are a student who has just completed 10th standard exploring diploma options, or a 
        12th standard student preparing for engineering admissions, this guide serves as your complete 
        reference for making informed decisions about your engineering career.""",
        styles['CustomBody']
    ))
    
    story.append(Spacer(1, 20))

def create_career_paths(story, styles):
    """Create career paths section"""
    story.append(Paragraph("2. Career Paths After 10th and 12th", styles['CustomHeading1']))
    
    story.append(Paragraph(
        """Students in Maharashtra have multiple pathways to pursue engineering education, each with its own 
        advantages and considerations. Understanding these pathways is crucial for making informed decisions 
        about one's educational journey and career trajectory.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph("2.1 After 10th Standard", styles['CustomHeading2']))
    
    story.append(Paragraph(
        """Students who have completed their 10th standard have two primary options for pursuing engineering 
        education. The first option is to continue with 11th and 12th standard in the science stream with 
        Physics, Chemistry, and Mathematics as core subjects, which is the traditional and most common 
        pathway for engineering aspirants. This route provides a strong theoretical foundation and keeps 
        multiple options open for various professional courses.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph(
        """The second option is to pursue a Diploma in Engineering (Polytechnic), which is a 3-year program 
        offered by various government and private polytechnics across Maharashtra. This vocational pathway 
        provides practical, hands-on training in engineering disciplines and allows students to enter the 
        workforce earlier. Diploma holders can later pursue degree engineering through lateral entry, 
        joining directly in the second year of B.Tech/B.E. programs.""",
        styles['CustomBody']
    ))
    
    # Pathway comparison table
    story.append(Paragraph("2.2 Pathway Comparison", styles['CustomHeading2']))
    
    pathway_data = [
        [
            Paragraph('<b>Aspect</b>', styles['TableHeader']),
            Paragraph('<b>Diploma (After 10th)</b>', styles['TableHeader']),
            Paragraph('<b>Degree (After 12th)</b>', styles['TableHeader'])
        ],
        [
            Paragraph('Duration', styles['TableCell']),
            Paragraph('3 Years Diploma + 3 Years Degree (Lateral Entry)', styles['TableCell']),
            Paragraph('4 Years B.Tech/B.E.', styles['TableCell'])
        ],
        [
            Paragraph('Entry Level', styles['TableCell']),
            Paragraph('After 10th (SSC)', styles['TableCell']),
            Paragraph('After 12th (HSC) with PCM', styles['TableCell'])
        ],
        [
            Paragraph('Entrance Exam', styles['TableCell']),
            Paragraph('Polytechnic CET', styles['TableCell']),
            Paragraph('JEE Main / MHT-CET', styles['TableCell'])
        ],
        [
            Paragraph('Focus', styles['TableCell']),
            Paragraph('Practical & Technical Skills', styles['TableCell']),
            Paragraph('Theoretical & Technical Knowledge', styles['TableCell'])
        ],
        [
            Paragraph('Early Employment', styles['TableCell']),
            Paragraph('Yes, after Diploma', styles['TableCell']),
            Paragraph('No, only after Degree', styles['TableCell'])
        ],
        [
            Paragraph('Cost', styles['TableCell']),
            Paragraph('Generally Lower', styles['TableCell']),
            Paragraph('Generally Higher', styles['TableCell'])
        ],
    ]
    
    pathway_table = Table(pathway_data, colWidths=[120, 180, 180])
    pathway_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), TABLE_HEADER_COLOR),
        ('BACKGROUND', (0, 1), (-1, 1), colors.white),
        ('BACKGROUND', (0, 2), (-1, 2), TABLE_ROW_ODD),
        ('BACKGROUND', (0, 3), (-1, 3), colors.white),
        ('BACKGROUND', (0, 4), (-1, 4), TABLE_ROW_ODD),
        ('BACKGROUND', (0, 5), (-1, 5), colors.white),
        ('BACKGROUND', (0, 6), (-1, 6), TABLE_ROW_ODD),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(pathway_table)
    story.append(Paragraph("Table 1: Comparison of Engineering Education Pathways", styles['Caption']))
    
    story.append(Paragraph("2.3 After 12th Standard", styles['CustomHeading2']))
    
    story.append(Paragraph(
        """Students completing 12th standard with Physics, Chemistry, and Mathematics (PCM) are eligible 
        for admission to four-year B.Tech/B.E. programs. The admission process primarily depends on 
        performance in entrance examinations such as JEE Main (conducted nationally) and MHT-CET 
        (Maharashtra Common Entrance Test). Some institutions also conduct their own entrance tests 
        or consider Class 12th marks for admission.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph(
        """It is important for students to secure a minimum of 45% marks (40% for reserved categories) 
        in their 12th standard board examinations to be eligible for engineering admissions. The 
        competition for seats in top colleges like COEP, VJTI, and IIT Bombay is intense, requiring 
        dedicated preparation and excellent performance in entrance examinations.""",
        styles['CustomBody']
    ))
    
    story.append(Spacer(1, 20))

def create_classification(story, styles):
    """Create engineering classification section"""
    story.append(Paragraph("3. Classification of Engineering Streams", styles['CustomHeading1']))
    
    story.append(Paragraph(
        """Engineering disciplines can be broadly classified into several categories based on their 
        core focus areas, application domains, and industry sectors. Understanding this classification 
        helps students identify their areas of interest and make informed choices about specialization.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph("3.1 Core Engineering Branches", styles['CustomHeading2']))
    
    story.append(Paragraph(
        """Core engineering branches form the foundation of engineering education and practice. These 
        disciplines have been established for centuries and continue to be fundamental to infrastructure 
        development, manufacturing, and technological advancement. The core branches include Civil 
        Engineering, Mechanical Engineering, Electrical Engineering, and Chemical Engineering. Each 
        of these branches offers diverse career opportunities and has maintained steady demand in 
        the job market over decades.""",
        styles['CustomBody']
    ))
    
    # Core branches table
    core_data = [
        [
            Paragraph('<b>Branch</b>', styles['TableHeader']),
            Paragraph('<b>Focus Area</b>', styles['TableHeader']),
            Paragraph('<b>Key Industries</b>', styles['TableHeader'])
        ],
        [
            Paragraph('Civil Engineering', styles['TableCell']),
            Paragraph('Infrastructure, Construction, Urban Planning', styles['TableCell']),
            Paragraph('Construction, Real Estate, Government', styles['TableCell'])
        ],
        [
            Paragraph('Mechanical Engineering', styles['TableCell']),
            Paragraph('Machines, Manufacturing, Design', styles['TableCell']),
            Paragraph('Automotive, Manufacturing, Aerospace', styles['TableCell'])
        ],
        [
            Paragraph('Electrical Engineering', styles['TableCell']),
            Paragraph('Power Systems, Electronics, Control', styles['TableCell']),
            Paragraph('Power Sector, Utilities, Manufacturing', styles['TableCell'])
        ],
        [
            Paragraph('Chemical Engineering', styles['TableCell']),
            Paragraph('Chemical Processes, Materials', styles['TableCell']),
            Paragraph('Petrochemicals, Pharma, FMCG', styles['TableCell'])
        ],
    ]
    
    core_table = Table(core_data, colWidths=[130, 170, 180])
    core_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), TABLE_HEADER_COLOR),
        ('BACKGROUND', (0, 1), (-1, 1), colors.white),
        ('BACKGROUND', (0, 2), (-1, 2), TABLE_ROW_ODD),
        ('BACKGROUND', (0, 3), (-1, 3), colors.white),
        ('BACKGROUND', (0, 4), (-1, 4), TABLE_ROW_ODD),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(core_table)
    story.append(Paragraph("Table 2: Core Engineering Branches Overview", styles['Caption']))
    
    story.append(Paragraph("3.2 Computer and IT Engineering", styles['CustomHeading2']))
    
    story.append(Paragraph(
        """Computer Science and Information Technology branches have witnessed exponential growth in 
        the past few decades, driven by the digital transformation of industries and the emergence 
        of new technologies. These branches include Computer Engineering, Information Technology, 
        Artificial Intelligence and Data Science, Cyber Security, Cloud Computing, and Internet 
        of Things (IoT). Graduates from these branches are in high demand across all sectors, 
        from technology companies to financial services, healthcare, and entertainment.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph("3.3 Electronics and Communication", styles['CustomHeading2']))
    
    story.append(Paragraph(
        """Electronics and Communication Engineering encompasses the study of electronic devices, 
        communication systems, and signal processing. This category includes Electronics and 
        Telecommunication Engineering, VLSI Design, and Instrumentation Engineering. With the 
        ongoing revolution in telecommunications (5G/6G), semiconductor manufacturing, and 
        automation, these branches offer excellent career prospects and opportunities for 
        innovation and research.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph("3.4 Specialized Engineering Fields", styles['CustomHeading2']))
    
    story.append(Paragraph(
        """Specialized engineering fields cater to specific industry sectors and emerging technological 
        domains. These include Aerospace Engineering, Biotechnology Engineering, Petroleum Engineering, 
        Environmental Engineering, Marine Engineering, Mining Engineering, Agricultural Engineering, 
        and Textile Engineering. While these fields may have narrower industry focus, they often offer 
        unique career opportunities with high specialization premiums and excellent growth prospects 
        in their respective sectors.""",
        styles['CustomBody']
    ))
    
    story.append(Spacer(1, 20))

def create_branch_details(story, styles):
    """Create detailed branch information"""
    story.append(Paragraph("4. Detailed Branch Information", styles['CustomHeading1']))
    
    story.append(Paragraph(
        """This section provides comprehensive information about each engineering branch, including 
        curriculum overview, required skills, career opportunities, top recruiters, salary 
        expectations, and recommended colleges. Students should carefully evaluate each branch 
        based on their interests, aptitude, and career goals.""",
        styles['CustomBody']
    ))
    
    # Civil Engineering
    story.append(Paragraph("4.1 Civil Engineering", styles['CustomHeading2']))
    
    story.append(Paragraph(
        """Civil Engineering is one of the oldest and most fundamental branches of engineering that 
        deals with the design, construction, and maintenance of infrastructure projects. This includes 
        buildings, roads, bridges, dams, airports, water supply systems, and other structures that 
        form the backbone of modern civilization. Civil engineers play a crucial role in urban 
        development, environmental protection, and sustainable construction practices.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph("Key Subjects:", styles['CustomHeading3']))
    subjects = "Structural Analysis, Geotechnical Engineering, Transportation Engineering, Hydraulics & Water Resources, Construction Management, Environmental Engineering, Surveying, Concrete Technology, Steel Structures, Foundation Engineering, Urban Planning, Bridge Engineering"
    story.append(Paragraph(subjects, styles['CustomBody']))
    
    story.append(Paragraph("Career Opportunities:", styles['CustomHeading3']))
    careers = "Structural Engineer, Construction Manager, Geotechnical Engineer, Transportation Planner, Water Resources Engineer, Urban Planner, Project Manager, Site Engineer, Design Engineer, Environmental Engineer"
    story.append(Paragraph(careers, styles['CustomBody']))
    
    story.append(Paragraph("Top Recruiters:", styles['CustomHeading3']))
    recruiters = "L&T Construction, Tata Projects, Gammon India, HCC, DLF, Shapoorji Pallonji, IRCON International, NBCC, Afcons Infrastructure, JMC Projects"
    story.append(Paragraph(recruiters, styles['CustomBody']))
    
    story.append(Paragraph("Salary Range: Rs.3-8 LPA (Entry Level), Rs.8-20 LPA (Experienced)", styles['CustomBody']))
    story.append(Paragraph("Top Colleges: COEP Pune, VJTI Mumbai, SPCE Mumbai, IIT Bombay, VNIT Nagpur", styles['CustomBody']))
    
    # Mechanical Engineering
    story.append(Paragraph("4.2 Mechanical Engineering", styles['CustomHeading2']))
    
    story.append(Paragraph(
        """Mechanical Engineering is a diverse and versatile branch that applies principles of physics, 
        mathematics, and material science to design, analyze, manufacture, and maintain mechanical 
        systems. It encompasses everything from small individual parts to large complex systems like 
        vehicles and industrial machinery. Mechanical engineers are essential in industries ranging 
        from automotive to aerospace, energy to manufacturing.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph("Key Subjects:", styles['CustomHeading3']))
    subjects = "Thermodynamics, Fluid Mechanics, Strength of Materials, Machine Design, Manufacturing Processes, Heat Transfer, Kinematics of Machines, CAD/CAM, Refrigeration & Air Conditioning, Automobile Engineering, Robotics, Industrial Engineering"
    story.append(Paragraph(subjects, styles['CustomBody']))
    
    story.append(Paragraph("Career Opportunities:", styles['CustomHeading3']))
    careers = "Design Engineer, Manufacturing Engineer, Automotive Engineer, HVAC Engineer, Quality Assurance Engineer, Project Engineer, R&D Engineer, Production Manager, Maintenance Engineer, Technical Consultant"
    story.append(Paragraph(careers, styles['CustomBody']))
    
    story.append(Paragraph("Top Recruiters:", styles['CustomHeading3']))
    recruiters = "Tata Motors, Mahindra & Mahindra, Maruti Suzuki, Bajaj Auto, L&T, Godrej, Thermax, BHEL, Hero MotoCorp, Hyundai"
    story.append(Paragraph(recruiters, styles['CustomBody']))
    
    story.append(Paragraph("Salary Range: Rs.3.5-8 LPA (Entry Level), Rs.8-25 LPA (Experienced)", styles['CustomBody']))
    story.append(Paragraph("Top Colleges: COEP Pune, VJTI Mumbai, IIT Bombay, VNIT Nagpur, MIT Pune", styles['CustomBody']))
    
    # Computer Engineering
    story.append(Paragraph("4.3 Computer Engineering", styles['CustomHeading2']))
    
    story.append(Paragraph(
        """Computer Engineering integrates electrical engineering and computer science to develop 
        computer systems and technological solutions. This field covers hardware design, software 
        development, and the integration of both to create innovative computing solutions. With 
        the digital transformation of all industries, computer engineering graduates are among 
        the most sought-after professionals in the job market.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph("Key Subjects:", styles['CustomHeading3']))
    subjects = "Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, Software Engineering, Computer Architecture, Web Technologies, Machine Learning, Cloud Computing, Cyber Security, Mobile Application Development, Artificial Intelligence"
    story.append(Paragraph(subjects, styles['CustomBody']))
    
    story.append(Paragraph("Career Opportunities:", styles['CustomHeading3']))
    careers = "Software Developer, Systems Engineer, Full Stack Developer, DevOps Engineer, Technical Architect, IT Consultant, Research Scientist, Cloud Engineer, Mobile App Developer, Technical Lead"
    story.append(Paragraph(careers, styles['CustomBody']))
    
    story.append(Paragraph("Top Recruiters:", styles['CustomHeading3']))
    recruiters = "Google, Microsoft, Amazon, TCS, Infosys, Wipro, Accenture, Cognizant, IBM, Oracle"
    story.append(Paragraph(recruiters, styles['CustomBody']))
    
    story.append(Paragraph("Salary Range: Rs.6-15 LPA (Entry Level), Rs.15-50 LPA (Experienced)", styles['CustomBody']))
    story.append(Paragraph("Top Colleges: IIT Bombay, VJTI Mumbai, COEP Pune, PICT Pune, SPIT Mumbai", styles['CustomBody']))
    
    # AI & Data Science
    story.append(Paragraph("4.4 Artificial Intelligence & Data Science", styles['CustomHeading2']))
    
    story.append(Paragraph(
        """AI & Data Science is an emerging field that combines machine learning, statistical analysis, 
        and big data technologies to extract insights from data and build intelligent systems. This 
        branch has gained tremendous importance with the adoption of AI across industries including 
        healthcare, finance, retail, and technology. Graduates in this field command premium salaries 
        and have opportunities to work on cutting-edge technologies.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph("Key Subjects:", styles['CustomHeading3']))
    subjects = "Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, Big Data Analytics, Statistical Methods, Neural Networks, Reinforcement Learning, Data Mining, Predictive Analytics, AI Ethics, MLOps"
    story.append(Paragraph(subjects, styles['CustomBody']))
    
    story.append(Paragraph("Career Opportunities:", styles['CustomHeading3']))
    careers = "Data Scientist, AI Engineer, Machine Learning Engineer, Data Analyst, Research Scientist, AI Product Manager, Deep Learning Engineer, NLP Engineer, Computer Vision Engineer, AI Architect"
    story.append(Paragraph(careers, styles['CustomBody']))
    
    story.append(Paragraph("Top Recruiters:", styles['CustomHeading3']))
    recruiters = "Google, Microsoft, Amazon, Flipkart, Swiggy, Zomato, Ola, PhonePe, NVIDIA, OpenAI"
    story.append(Paragraph(recruiters, styles['CustomBody']))
    
    story.append(Paragraph("Salary Range: Rs.8-20 LPA (Entry Level), Rs.20-60 LPA (Experienced)", styles['CustomBody']))
    story.append(Paragraph("Top Colleges: IIT Bombay, PICT Pune, COEP Pune, VJTI Mumbai, IIIT Pune", styles['CustomBody']))
    
    story.append(Spacer(1, 20))

def create_diploma_section(story, styles):
    """Create diploma engineering section"""
    story.append(Paragraph("5. Diploma Engineering", styles['CustomHeading1']))
    
    story.append(Paragraph(
        """Diploma in Engineering, also known as Polytechnic, is a three-year technical education program 
        that provides students with practical skills and knowledge in various engineering disciplines. 
        This pathway is particularly suitable for students who want to enter the workforce early or 
        prefer a more hands-on approach to learning engineering concepts.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph("5.1 Advantages of Diploma Engineering", styles['CustomHeading2']))
    
    story.append(Paragraph(
        """Diploma engineering offers several advantages for students. First, it provides early exposure 
        to practical engineering work, allowing students to gain industry experience sooner than their 
        degree-program counterparts. Second, the cost of diploma education is generally lower than 
        degree programs, making it more accessible to students from diverse economic backgrounds. 
        Third, diploma holders have the option of lateral entry into degree programs, joining directly 
        in the second year of B.Tech/B.E. courses, effectively completing their engineering education 
        in six years (3 years diploma + 3 years degree) instead of the typical four-year degree after 12th.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph("5.2 Popular Diploma Branches", styles['CustomHeading2']))
    
    diploma_data = [
        [
            Paragraph('<b>Branch</b>', styles['TableHeader']),
            Paragraph('<b>Duration</b>', styles['TableHeader']),
            Paragraph('<b>Job Opportunities</b>', styles['TableHeader'])
        ],
        [
            Paragraph('Civil Engineering', styles['TableCell']),
            Paragraph('3 Years', styles['TableCellCenter']),
            Paragraph('Junior Engineer, Site Supervisor, Draftsman', styles['TableCell'])
        ],
        [
            Paragraph('Mechanical Engineering', styles['TableCell']),
            Paragraph('3 Years', styles['TableCellCenter']),
            Paragraph('Technician, Quality Inspector, Production Assistant', styles['TableCell'])
        ],
        [
            Paragraph('Electrical Engineering', styles['TableCell']),
            Paragraph('3 Years', styles['TableCellCenter']),
            Paragraph('Junior Engineer, Maintenance Technician', styles['TableCell'])
        ],
        [
            Paragraph('Computer Technology', styles['TableCell']),
            Paragraph('3 Years', styles['TableCellCenter']),
            Paragraph('IT Support, Web Developer, Network Technician', styles['TableCell'])
        ],
        [
            Paragraph('Electronics & Telecom', styles['TableCell']),
            Paragraph('3 Years', styles['TableCellCenter']),
            Paragraph('Service Engineer, Technical Assistant', styles['TableCell'])
        ],
    ]
    
    diploma_table = Table(diploma_data, colWidths=[150, 100, 230])
    diploma_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), TABLE_HEADER_COLOR),
        ('BACKGROUND', (0, 1), (-1, 1), colors.white),
        ('BACKGROUND', (0, 2), (-1, 2), TABLE_ROW_ODD),
        ('BACKGROUND', (0, 3), (-1, 3), colors.white),
        ('BACKGROUND', (0, 4), (-1, 4), TABLE_ROW_ODD),
        ('BACKGROUND', (0, 5), (-1, 5), colors.white),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(diploma_table)
    story.append(Paragraph("Table 3: Popular Diploma Engineering Branches", styles['Caption']))
    
    story.append(Paragraph("5.3 Top Polytechnic Colleges in Maharashtra", styles['CustomHeading2']))
    
    story.append(Paragraph(
        """Maharashtra has numerous government and private polytechnic colleges offering quality diploma 
        education. Some of the most reputed institutions include Government Polytechnic Mumbai, 
        Government Polytechnic Pune, Government Polytechnic Nagpur, Government Polytechnic Aurangabad, 
        and Veermata Jijabai Technological Institute (VJTI) Polytechnic. These institutions have 
        excellent infrastructure, experienced faculty, and strong industry connections for placements.""",
        styles['CustomBody']
    ))
    
    story.append(Spacer(1, 20))

def create_rankings_section(story, styles):
    """Create college rankings section"""
    story.append(Paragraph("6. Engineering College Rankings 2026", styles['CustomHeading1']))
    
    story.append(Paragraph(
        """The following rankings are based on various parameters including academic excellence, 
        placement records, infrastructure, faculty quality, research output, and industry perception. 
        These rankings help students identify the best institutions for their engineering education 
        and make informed decisions during the admission process.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph("6.1 Top Engineering Colleges in Maharashtra", styles['CustomHeading2']))
    
    ranking_data = [
        [
            Paragraph('<b>Rank</b>', styles['TableHeader']),
            Paragraph('<b>College Name</b>', styles['TableHeader']),
            Paragraph('<b>Location</b>', styles['TableHeader']),
            Paragraph('<b>Type</b>', styles['TableHeader'])
        ],
        [
            Paragraph('1', styles['TableCellCenter']),
            Paragraph('IIT Bombay', styles['TableCell']),
            Paragraph('Mumbai', styles['TableCellCenter']),
            Paragraph('Institute of National Importance', styles['TableCell'])
        ],
        [
            Paragraph('2', styles['TableCellCenter']),
            Paragraph('VNIT Nagpur', styles['TableCell']),
            Paragraph('Nagpur', styles['TableCellCenter']),
            Paragraph('NIT', styles['TableCell'])
        ],
        [
            Paragraph('3', styles['TableCellCenter']),
            Paragraph('COEP Pune', styles['TableCell']),
            Paragraph('Pune', styles['TableCellCenter']),
            Paragraph('Government Autonomous', styles['TableCell'])
        ],
        [
            Paragraph('4', styles['TableCellCenter']),
            Paragraph('VJTI Mumbai', styles['TableCell']),
            Paragraph('Mumbai', styles['TableCellCenter']),
            Paragraph('Government Autonomous', styles['TableCell'])
        ],
        [
            Paragraph('5', styles['TableCellCenter']),
            Paragraph('SPCE Mumbai', styles['TableCell']),
            Paragraph('Mumbai', styles['TableCellCenter']),
            Paragraph('Government Aided', styles['TableCell'])
        ],
        [
            Paragraph('6', styles['TableCellCenter']),
            Paragraph('PICT Pune', styles['TableCell']),
            Paragraph('Pune', styles['TableCellCenter']),
            Paragraph('Private', styles['TableCell'])
        ],
        [
            Paragraph('7', styles['TableCellCenter']),
            Paragraph('VIT Pune', styles['TableCell']),
            Paragraph('Pune', styles['TableCellCenter']),
            Paragraph('Private', styles['TableCell'])
        ],
        [
            Paragraph('8', styles['TableCellCenter']),
            Paragraph('MIT Pune', styles['TableCell']),
            Paragraph('Pune', styles['TableCellCenter']),
            Paragraph('Private', styles['TableCell'])
        ],
        [
            Paragraph('9', styles['TableCellCenter']),
            Paragraph('SGGS Nanded', styles['TableCell']),
            Paragraph('Nanded', styles['TableCellCenter']),
            Paragraph('Government', styles['TableCell'])
        ],
        [
            Paragraph('10', styles['TableCellCenter']),
            Paragraph('DJSCE Mumbai', styles['TableCell']),
            Paragraph('Mumbai', styles['TableCellCenter']),
            Paragraph('Private', styles['TableCell'])
        ],
    ]
    
    ranking_table = Table(ranking_data, colWidths=[50, 180, 100, 150])
    ranking_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), TABLE_HEADER_COLOR),
        ('BACKGROUND', (0, 1), (-1, 1), colors.white),
        ('BACKGROUND', (0, 2), (-1, 2), TABLE_ROW_ODD),
        ('BACKGROUND', (0, 3), (-1, 3), colors.white),
        ('BACKGROUND', (0, 4), (-1, 4), TABLE_ROW_ODD),
        ('BACKGROUND', (0, 5), (-1, 5), colors.white),
        ('BACKGROUND', (0, 6), (-1, 6), TABLE_ROW_ODD),
        ('BACKGROUND', (0, 7), (-1, 7), colors.white),
        ('BACKGROUND', (0, 8), (-1, 8), TABLE_ROW_ODD),
        ('BACKGROUND', (0, 9), (-1, 9), colors.white),
        ('BACKGROUND', (0, 10), (-1, 10), TABLE_ROW_ODD),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(ranking_table)
    story.append(Paragraph("Table 4: Top 10 Engineering Colleges in Maharashtra 2026", styles['Caption']))
    
    story.append(Spacer(1, 20))

def create_comparison_section(story, styles):
    """Create comparison tables section"""
    story.append(Paragraph("7. Branch Comparison Tables", styles['CustomHeading1']))
    
    story.append(Paragraph(
        """The following comparison tables help students understand the differences between various 
        engineering branches in terms of difficulty level, average salary, job growth, and other 
        key parameters. This information assists in making informed decisions about branch selection 
        based on individual preferences and career goals.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph("7.1 Branch Comparison by Key Metrics", styles['CustomHeading2']))
    
    comparison_data = [
        [
            Paragraph('<b>Branch</b>', styles['TableHeader']),
            Paragraph('<b>Difficulty</b>', styles['TableHeader']),
            Paragraph('<b>Avg Package</b>', styles['TableHeader']),
            Paragraph('<b>Job Growth</b>', styles['TableHeader']),
            Paragraph('<b>Scope</b>', styles['TableHeader'])
        ],
        [
            Paragraph('Computer Engg', styles['TableCell']),
            Paragraph('Medium', styles['TableCellCenter']),
            Paragraph('Rs.10 LPA', styles['TableCellCenter']),
            Paragraph('25%+', styles['TableCellCenter']),
            Paragraph('Excellent', styles['TableCellCenter'])
        ],
        [
            Paragraph('AI & Data Science', styles['TableCell']),
            Paragraph('High', styles['TableCellCenter']),
            Paragraph('Rs.12 LPA', styles['TableCellCenter']),
            Paragraph('30%+', styles['TableCellCenter']),
            Paragraph('Excellent', styles['TableCellCenter'])
        ],
        [
            Paragraph('Mechanical Engg', styles['TableCell']),
            Paragraph('Medium', styles['TableCellCenter']),
            Paragraph('Rs.6 LPA', styles['TableCellCenter']),
            Paragraph('7%', styles['TableCellCenter']),
            Paragraph('Good', styles['TableCellCenter'])
        ],
        [
            Paragraph('Civil Engg', styles['TableCell']),
            Paragraph('Medium', styles['TableCellCenter']),
            Paragraph('Rs.5.5 LPA', styles['TableCellCenter']),
            Paragraph('8%', styles['TableCellCenter']),
            Paragraph('Good', styles['TableCellCenter'])
        ],
        [
            Paragraph('Electrical Engg', styles['TableCell']),
            Paragraph('Medium-High', styles['TableCellCenter']),
            Paragraph('Rs.5.5 LPA', styles['TableCellCenter']),
            Paragraph('10%', styles['TableCellCenter']),
            Paragraph('Good', styles['TableCellCenter'])
        ],
        [
            Paragraph('Electronics & Telecom', styles['TableCell']),
            Paragraph('Medium-High', styles['TableCellCenter']),
            Paragraph('Rs.6 LPA', styles['TableCellCenter']),
            Paragraph('12%', styles['TableCellCenter']),
            Paragraph('Very Good', styles['TableCellCenter'])
        ],
        [
            Paragraph('VLSI Design', styles['TableCell']),
            Paragraph('Very High', styles['TableCellCenter']),
            Paragraph('Rs.12 LPA', styles['TableCellCenter']),
            Paragraph('15%', styles['TableCellCenter']),
            Paragraph('Excellent', styles['TableCellCenter'])
        ],
        [
            Paragraph('Cyber Security', styles['TableCell']),
            Paragraph('High', styles['TableCellCenter']),
            Paragraph('Rs.8 LPA', styles['TableCellCenter']),
            Paragraph('20%', styles['TableCellCenter']),
            Paragraph('Excellent', styles['TableCellCenter'])
        ],
    ]
    
    comparison_table = Table(comparison_data, colWidths=[110, 80, 80, 80, 80])
    comparison_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), TABLE_HEADER_COLOR),
        ('BACKGROUND', (0, 1), (-1, 1), colors.white),
        ('BACKGROUND', (0, 2), (-1, 2), TABLE_ROW_ODD),
        ('BACKGROUND', (0, 3), (-1, 3), colors.white),
        ('BACKGROUND', (0, 4), (-1, 4), TABLE_ROW_ODD),
        ('BACKGROUND', (0, 5), (-1, 5), colors.white),
        ('BACKGROUND', (0, 6), (-1, 6), TABLE_ROW_ODD),
        ('BACKGROUND', (0, 7), (-1, 7), colors.white),
        ('BACKGROUND', (0, 8), (-1, 8), TABLE_ROW_ODD),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(comparison_table)
    story.append(Paragraph("Table 5: Engineering Branch Comparison by Key Metrics", styles['Caption']))
    
    story.append(Spacer(1, 20))

def create_entrance_exams(story, styles):
    """Create entrance exams section"""
    story.append(Paragraph("8. Entrance Examinations", styles['CustomHeading1']))
    
    story.append(Paragraph(
        """Admission to engineering colleges in Maharashtra is primarily through entrance examinations 
        conducted at national and state levels. Understanding the exam patterns, eligibility criteria, 
        and preparation strategies is essential for securing admission to desired colleges and branches.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph("8.1 Major Entrance Exams", styles['CustomHeading2']))
    
    exam_data = [
        [
            Paragraph('<b>Exam</b>', styles['TableHeader']),
            Paragraph('<b>Level</b>', styles['TableHeader']),
            Paragraph('<b>Purpose</b>', styles['TableHeader']),
            Paragraph('<b>Colleges</b>', styles['TableHeader'])
        ],
        [
            Paragraph('JEE Main', styles['TableCell']),
            Paragraph('National', styles['TableCellCenter']),
            Paragraph('B.Tech Admission', styles['TableCell']),
            Paragraph('NITs, IIITs, GFTIs', styles['TableCell'])
        ],
        [
            Paragraph('JEE Advanced', styles['TableCell']),
            Paragraph('National', styles['TableCellCenter']),
            Paragraph('IIT Admission', styles['TableCell']),
            Paragraph('IITs only', styles['TableCell'])
        ],
        [
            Paragraph('MHT-CET', styles['TableCell']),
            Paragraph('State', styles['TableCellCenter']),
            Paragraph('B.Tech Admission', styles['TableCell']),
            Paragraph('Maharashtra Colleges', styles['TableCell'])
        ],
        [
            Paragraph('GATE', styles['TableCell']),
            Paragraph('National', styles['TableCellCenter']),
            Paragraph('M.Tech Admission', styles['TableCell']),
            Paragraph('IITs, NITs, all colleges', styles['TableCell'])
        ],
        [
            Paragraph('Polytechnic CET', styles['TableCell']),
            Paragraph('State', styles['TableCellCenter']),
            Paragraph('Diploma Admission', styles['TableCell']),
            Paragraph('Polytechnics', styles['TableCell'])
        ],
    ]
    
    exam_table = Table(exam_data, colWidths=[100, 80, 150, 170])
    exam_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), TABLE_HEADER_COLOR),
        ('BACKGROUND', (0, 1), (-1, 1), colors.white),
        ('BACKGROUND', (0, 2), (-1, 2), TABLE_ROW_ODD),
        ('BACKGROUND', (0, 3), (-1, 3), colors.white),
        ('BACKGROUND', (0, 4), (-1, 4), TABLE_ROW_ODD),
        ('BACKGROUND', (0, 5), (-1, 5), colors.white),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(exam_table)
    story.append(Paragraph("Table 6: Major Engineering Entrance Examinations", styles['Caption']))
    
    story.append(Paragraph("8.2 MHT-CET Details", styles['CustomHeading2']))
    
    story.append(Paragraph(
        """MHT-CET (Maharashtra Common Entrance Test) is the primary entrance examination for admission 
        to engineering colleges in Maharashtra. The exam is conducted by the State Common Entrance Test 
        Cell, Government of Maharashtra. The exam pattern consists of two papers: Paper 1 (Physics and 
        Chemistry) and Paper 2 (Mathematics). Each paper carries 100 marks, making the total 200 marks. 
        There is no negative marking in MHT-CET, encouraging students to attempt all questions.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph(
        """For admission to Maharashtra state colleges, 85% seats are reserved for Maharashtra state 
        candidates, while 15% seats are available for candidates from other states through JEE Main 
        scores. This reservation policy makes MHT-CET crucial for students from Maharashtra seeking 
        admission to government and private engineering colleges in the state.""",
        styles['CustomBody']
    ))
    
    story.append(Spacer(1, 20))

def create_future_trends(story, styles):
    """Create future trends section"""
    story.append(Paragraph("9. Future Trends in Engineering", styles['CustomHeading1']))
    
    story.append(Paragraph(
        """The engineering landscape is rapidly evolving with technological advancements creating new 
        opportunities and transforming traditional disciplines. Students should be aware of these 
        emerging trends to position themselves for success in the future job market.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph("9.1 Emerging Technologies", styles['CustomHeading2']))
    
    story.append(Paragraph(
        """Several emerging technologies are reshaping the engineering industry. Artificial Intelligence 
        and Machine Learning are being integrated into all engineering disciplines, from structural 
        analysis in civil engineering to predictive maintenance in mechanical systems. The Internet 
        of Things (IoT) is enabling smart infrastructure and connected devices, creating demand for 
        engineers with interdisciplinary skills. Electric Vehicles (EVs) and sustainable energy 
        solutions are driving innovation in automotive and electrical engineering, while cybersecurity 
        has become critical across all sectors as digital transformation accelerates.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph("9.2 Industry 4.0 and Smart Manufacturing", styles['CustomHeading2']))
    
    story.append(Paragraph(
        """Industry 4.0 represents the fourth industrial revolution, characterized by the integration 
        of digital technologies into manufacturing processes. This includes automation, robotics, 
        artificial intelligence, and data analytics working together to create smart factories. 
        Engineers with skills in mechatronics, robotics, data analytics, and automation will be 
        in high demand as industries adopt these technologies. Maharashtra, with its strong 
        manufacturing base, is at the forefront of this transformation, creating excellent 
        opportunities for engineering graduates.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph("9.3 Sustainability and Green Engineering", styles['CustomHeading2']))
    
    story.append(Paragraph(
        """Environmental sustainability is becoming increasingly important in engineering practice. 
        Green building design, renewable energy systems, waste management, and environmental 
        protection are driving demand for engineers with knowledge of sustainable practices. 
        Civil engineers are needed for green infrastructure projects, mechanical engineers for 
        energy-efficient systems, and environmental engineers for pollution control and remediation. 
        This trend is expected to accelerate as governments and industries commit to carbon 
        neutrality and sustainable development goals.""",
        styles['CustomBody']
    ))
    
    story.append(Spacer(1, 20))

def create_conclusion(story, styles):
    """Create conclusion section"""
    story.append(Paragraph("10. Conclusion", styles['CustomHeading1']))
    
    story.append(Paragraph(
        """Engineering education in Maharashtra offers students a pathway to rewarding careers across 
        diverse industries. The state's robust educational infrastructure, featuring prestigious 
        institutions like IIT Bombay, COEP, and VJTI, combined with its thriving industrial ecosystem, 
        makes it an ideal destination for engineering aspirants. With over 20 engineering branches 
        to choose from, students have the opportunity to pursue their interests while building 
        careers in high-demand fields.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph(
        """This guide, developed under BRUTALTOOLS, has provided comprehensive information about 
        engineering education pathways, branch details, college rankings, entrance examinations, 
        and future trends. Students should use this information to make informed decisions about 
        their educational journey, considering their interests, aptitudes, and career aspirations. 
        Whether choosing diploma engineering after 10th or degree programs after 12th, the key to 
        success lies in careful planning, dedicated preparation, and continuous learning.""",
        styles['CustomBody']
    ))
    
    story.append(Paragraph(
        """As the engineering field continues to evolve with technological advancements, students 
        must remain adaptable and committed to lifelong learning. The future belongs to engineers 
        who can integrate knowledge across disciplines, embrace new technologies, and contribute 
        to solving the complex challenges facing society. We hope this guide serves as a valuable 
        resource in your engineering journey and wish you all the best for your future endeavors.""",
        styles['CustomBody']
    ))
    
    story.append(Spacer(1, 40))
    
    # Footer branding
    story.append(Paragraph(
        "Developed under BRUTALTOOLS",
        styles['CoverBranding']
    ))
    
    story.append(Paragraph(
        "For more information, visit: https://github.com/brutal-45/BRUTALGUIDE",
        styles['Caption']
    ))

def main():
    """Main function to generate the PDF"""
    output_path = "/home/z/my-project/public/download/Complete_Guide_Engineering_Streams_Maharashtra.pdf"
    
    # Create document with better quality settings
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=60,
        leftMargin=60,
        topMargin=60,
        bottomMargin=60,
        title="BRUTALGUIDE - Complete Guide to Engineering Streams in Maharashtra",
        author="BRUTALTOOLS",
        creator="BRUTALTOOLS",
        subject="Engineering Education Guide for Maharashtra - Degree & Diploma"
    )
    
    # Create styles
    styles = create_styles()
    
    # Build story
    story = []
    
    # Add all sections
    create_cover_page(story, styles)
    create_introduction(story, styles)
    create_career_paths(story, styles)
    create_classification(story, styles)
    create_branch_details(story, styles)
    create_diploma_section(story, styles)
    create_rankings_section(story, styles)
    create_comparison_section(story, styles)
    create_entrance_exams(story, styles)
    create_future_trends(story, styles)
    create_conclusion(story, styles)
    
    # Build PDF
    doc.build(story)
    
    print(f"PDF generated successfully at: {output_path}")
    return output_path

if __name__ == "__main__":
    main()
