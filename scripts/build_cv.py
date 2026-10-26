"""Regenerate Osama Khan's CV from the portfolio record."""
from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    HRFlowable,
    KeepTogether,
    ListFlowable,
    ListItem,
)

OUT = r"e:\My-Portfolio\public\Osama_Khan_MERN.pdf"

INK = HexColor("#131a22")
MUTED = HexColor("#3d4a59")
ACCENT = HexColor("#1d6f93")
RULE = HexColor("#d5dde4")

styles = {
    "name": ParagraphStyle("name", fontName="Times-Bold", fontSize=22, leading=26, textColor=INK, spaceAfter=1),
    "role": ParagraphStyle("role", fontName="Times-Italic", fontSize=11, leading=14, textColor=ACCENT, spaceAfter=4),
    "contact": ParagraphStyle("contact", fontName="Times-Roman", fontSize=9, leading=12, textColor=MUTED, spaceAfter=8),
    "h": ParagraphStyle("h", fontName="Times-Bold", fontSize=12, leading=15, textColor=ACCENT, spaceBefore=8, spaceAfter=3),
    "job": ParagraphStyle("job", fontName="Times-Bold", fontSize=11, leading=13, textColor=INK, spaceBefore=4, spaceAfter=0),
    "meta": ParagraphStyle("meta", fontName="Times-Italic", fontSize=9, leading=12, textColor=MUTED, spaceAfter=2),
    "body": ParagraphStyle("body", fontName="Times-Roman", fontSize=9.5, leading=12.5, textColor=INK, alignment=TA_JUSTIFY, spaceAfter=2),
    "bullet": ParagraphStyle("bullet", fontName="Times-Roman", fontSize=9.5, leading=12.2, textColor=INK, leftIndent=0),
    "proj": ParagraphStyle("proj", fontName="Times-Bold", fontSize=10, leading=13, textColor=INK, spaceBefore=4, spaceAfter=1),
    "small": ParagraphStyle("small", fontName="Times-Roman", fontSize=9, leading=11.6, textColor=INK, alignment=TA_LEFT),
}


def bullets(items):
    flow = []
    for item in items:
        flow.append(ListItem(Paragraph(item, styles["bullet"]), leftIndent=10, bulletColor=ACCENT))
    return ListFlowable(flow, bulletType="bullet", start="•", leftIndent=12, bulletFontName="Times-Roman", bulletFontSize=9, spaceBefore=1, spaceAfter=2)


def block(title, meta, items):
    return KeepTogether([
        Paragraph(title, styles["job"]),
        Paragraph(meta, styles["meta"]),
        bullets(items),
    ])


story = []
story.append(Paragraph("Osama Khan", styles["name"]))
story.append(Paragraph("Full Stack Developer  |  Node.js, NestJS, Next.js", styles["role"]))
story.append(Paragraph(
    "House 1006-B, Street 1, Block C, National Police Foundation, O-9, Islamabad<br/>"
    "0321 5271247  |  osamakhan99@hotmail.com  |  linkedin.com/in/osamakhan999  |  github.com/osama999x",
    styles["contact"],
))
story.append(HRFlowable(width="100%", thickness=1, color=ACCENT, spaceAfter=6))

story.append(Paragraph("PROFILE", styles["h"]))
story.append(Paragraph(
    "Backend and full stack developer with 3+ years of industrial experience in Node.js, NestJS, Express, "
    "and the MERN stack. I design REST and WebSocket APIs, integrate third-party services, and run "
    "PostgreSQL, MySQL, MongoDB, and MSSQL in production. Recent delivery covers property and tenancy "
    "products, a broker portal, a digital rishta platform, and a multi-market trading backend. "
    "I lead a team of 4-5 engineers, deploy on AWS with Nginx and PM2, and stay responsible for both "
    "the codebase and the conversation with clients.",
    styles["body"],
))

story.append(Paragraph("EXPERIENCE", styles["h"]))
story.append(block(
    "Full Stack Developer — Leo's International",
    "October 2025 - Present  |  Islamabad, Pakistan",
    [
        "Technical lead for a team of 4-5. Coordinate delivery, clear technical blockers, and keep clients and management aligned with the build.",
        "Design REST APIs with JWT authentication and role-based access, on PostgreSQL and MongoDB.",
        "Operate Linux production servers with Nginx and PM2, and manage AWS instances and load balancing.",
        "Shipped the LEOS broker portal (Zoho CRM and WhatsApp for onboarding and leads) and the public LEOS Developments website for UAE and UK communities.",
        "Built Leos app backend flows for unit purchases, installment tracking, and payments, and supported the Prive community platform.",
        "Real-time features with Socket.IO, integrated with the frontend teams consuming the APIs.",
    ],
))
story.append(block(
    "Backend Engineer — Fexen Smart Solutions, Extsy",
    "May 2025 - October 2025  |  Islamabad, Pakistan",
    [
        "Backend services for Extsy, a trading platform with spot, futures, demo, and copy trading.",
        "Multi-wallet system across Ethereum, Arbitrum, Optimism, and Bitcoin, using third-party providers for transaction handling.",
        "Binance WebSocket and REST for live market data, charts, and order execution. Sumsub KYC with JWT, MFA, and 2FA.",
        "Socket.IO for live trading and wallet updates, plus crypto-backed virtual card transactions.",
        "NestJS, PostgreSQL, and MongoDB services deployed on AWS. Stepped in as technical lead on complex integrations.",
    ],
))
story.append(block(
    "MERN Stack Developer — App In Snap",
    "May 2023 - May 2025  |  Islamabad, Pakistan",
    [
        "Designed and maintained backend systems in Node.js, NestJS, and Express, including REST and SOAP integrations.",
        "Worked across PostgreSQL, MySQL, MSSQL, and MongoDB, with React on the client and JWT for authentication.",
        "Socket.IO for live updates. Delivered banking, railway, ride-sharing, agriculture, e-commerce, and government products that are in use.",
    ],
))

story.append(Paragraph("EDUCATION", styles["h"]))
story.append(Paragraph("Bachelors in Computer Science — Bahria University", styles["job"]))
story.append(Paragraph("January 2019 - February 2023  |  Islamabad, Pakistan", styles["meta"]))

story.append(Paragraph("SKILLS", styles["h"]))
story.append(Paragraph(
    "<b>Languages &amp; UI.</b> JavaScript (ES6), TypeScript, React.js, Next.js, HTML5, CSS3, SCSS, Tailwind CSS.<br/>"
    "<b>Backend.</b> Node.js, NestJS, Express.js, REST, SOAP, WebSockets, Socket.IO, JWT, OAuth, MFA, microservices, Redis, cron jobs, rate limiting.<br/>"
    "<b>Data.</b> PostgreSQL, MongoDB, MySQL, MSSQL, Oracle DB, Prisma, TypeORM, Sequelize.<br/>"
    "<b>Integrations.</b> Stripe, PayPal, Zindigi, Binance API, Sumsub, Zoho CRM, WhatsApp, Google Maps, FCM.<br/>"
    "<b>Delivery.</b> AWS, Linux, Nginx, PM2, Git, GitHub Actions, Azure DevOps, Microsoft Azure.",
    styles["small"],
))

story.append(Paragraph("SELECTED PROJECTS", styles["h"]))

projects = [
    ("Air Rental — Full Stack",
     "Next.js  |  http://179.236.65.153:3001/",
     "Monthly tenancy product for homes, shops, offices, rooms, and warehouses in Karachi, Lahore, Islamabad, and Rawalpindi. Owners, tenants, and managers share one record for the agreement, rent, bills, inspections, and maintenance."),
    ("LEOS Developments — Full Stack",
     "WordPress  |  https://leosdevelopments.com/",
     "Public website for a luxury developer in the UAE and the UK. Development catalogue, 360 tours, construction updates, news, enquiries, broker registration, and payments."),
    ("LEOS Broker Portal — Full Stack",
     "Next.js, PostgreSQL, MongoDB, Zoho, WhatsApp  |  https://agency.leosdevelopments.com/",
     "Broker onboarding and pipeline management, with JWT, role-based access, Zoho CRM, and WhatsApp for lead handling."),
    ("VE Live — Full Stack",
     "Next.js  |  https://velive.co.uk/",
     "Developer-led property management. Rent and sale search by location, category, beds, and furnishing, plus services and the client journey."),
    ("Rishta Nagar — Full Stack",
     "Next.js  |  https://rishtanagar.com/",
     "Digital rishta platform: registration, complete profiles, preference matching, verified profiles, private chat, and Android and iOS entry points."),
    ("Extsy — Backend",
     "NestJS, PostgreSQL, MongoDB, Binance API, Socket.IO",
     "Trading backend for spot, futures, demo, and copy trading. Multi-network wallets, live market data, Sumsub KYC, and crypto-backed virtual cards."),
    ("J-ACE — Backend Lead",
     "Node.js, TypeScript, Oracle DB",
     "JS Bank remittance system for doorstep cash delivery. Officer portal, rider app with VBS checks, third-party fund transfer, and live tracking."),
    ("Rahper — Full Stack",
     "Node.js, Socket.IO, Google Maps  |  https://rahper.com/",
     "Ride sharing with live requests, chat, maps, and an admin portal."),
    ("Farmkar — Backend",
     "Node.js, MongoDB, Zindigi Gateway",
     "Connects farmers, lenders, and customers for equipment trade, with in-product payments."),
    ("Autocar — Full Stack",
     "Node.js, MongoDB  |  https://car2parts.com/",
     "Automobile parts listings with an admin portal for quotations, cash flow, and payments."),
    ("Further delivery at App In Snap",
     "Node.js, NestJS, React, MySQL, MongoDB",
     "NCS Railway ticketing, JS Wall (JS Bank), invoice and HR management, hotel budgeting, WhatsApp bots for government and customer support, HEC degree attestation, CDA survey portal, Xtreme Gym, MSAFA e-commerce, MeeramTech, EU-Studio, and Organization Health Solutions."),
]

for title, meta, text in projects:
    story.append(KeepTogether([
        Paragraph(title, styles["proj"]),
        Paragraph(meta, styles["meta"]),
        Paragraph(text, styles["small"]),
    ]))

doc = SimpleDocTemplate(
    OUT,
    pagesize=A4,
    leftMargin=16 * mm,
    rightMargin=16 * mm,
    topMargin=14 * mm,
    bottomMargin=14 * mm,
    title="Osama Khan — Full Stack Developer",
    author="Osama Khan",
)
doc.build(story)
print("wrote", OUT)
