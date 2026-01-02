import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SERVICES = [
    {
        title: "Payment Gateway",
        icon: "💳",
        description: "Secure, fast, and reliable payment processing solutions. Accept payments seamlessly with industry-leading security standards and instant settlement.",
        features: [
            "Multi-Currency Support",
            "Instant Settlements",
            "Advanced Fraud Detection",
            "Easy Integration APIs"
        ],
    },
    {
        title: "Web Development",
        icon: "🌐",
        description: "We engineer high-performance, scalable web applications using cutting-edge technologies like Next.js and React tailored to your specific business needs.",
        features: [
            "Custom Next.js Applications",
            "Enterprise SaaS Platforms",
            "Progressive Web Apps (PWA)",
            "API Integration & Design"
        ],
    },
    {
        title: "App Development",
        icon: "📱",
        description: "Create impactful mobile experiences with our native and cross-platform development services. We deliver seamless UX across iOS and Android.",
        features: [
            "iOS & Android Native",
            "Cross-Platform (Flutter)",
            "Mobile UI/UX Design",
            "App Store Optimization"
        ],
    },
    {
        title: "ERP Solutions",
        icon: "💼",
        description: "Streamline your entire business operation. We unify critical functions like finance, HR, and supply chain into a single, automated ecosystem.",
        features: [
            "Custom ERP Modules",
            "Real-time Analytics",
            "Supply Chain Automation",
            "CRM Integration"
        ],
    },
    {
        title: "Digital Marketing",
        icon: "📢",
        description: "Accelerate brand growth with data-driven strategies. We combine technical SEO, social media management, and targeted PPC campaigns.",
        features: [
            "SEO & Content Strategy",
            "Social Media Growth",
            "PPC & Paid Ads",
            "Email Marketing Automation"
        ],
    },
    {
        title: "Custom Software",
        icon: "⚙️",
        description: "Solve unique business challenges with bespoke software. We build secure, API-first, and highly scalable applications tailored to your workflow.",
        features: [
            "Bespoke Software Design",
            "Legacy System Modernization",
            "API Development",
            "Cloud Migration"
        ],
    },
    {
        title: "Tech Consulting",
        icon: "💡",
        description: "Navigate the complex technology landscape. We provide strategic advisory, technical audits, and governance frameworks to align IT with business goals.",
        features: [
            "Digital Transformation",
            "IT Infrastructure Audits",
            "Security Governance",
            "Product Roadmapping"
        ],
    },
];

async function main() {
    console.log('Starting to seed services...');

    for (const service of SERVICES) {
        const existingService = await prisma.service.findFirst({
            where: { title: service.title }
        });

        if (existingService) {
            console.log(`Service "${service.title}" already exists, skipping...`);
            continue;
        }

        const created = await prisma.service.create({
            data: service,
        });

        console.log(`✓ Created service: ${created.title}`);
    }

    console.log('Seeding completed!');
}

main()
    .catch((e) => {
        console.error('Error seeding services:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
