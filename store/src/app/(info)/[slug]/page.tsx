import Link from "next/link";
import { notFound } from "next/navigation";

type InfoPageContent = {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
};

const INFO_PAGES: Record<string, InfoPageContent> = {
  faq: {
    title: "Frequently Asked Questions",
    intro:
      "Answers to common shopping, delivery, and account questions to help you quickly find what you need.",
    sections: [
      {
        heading: "Order support",
        body: "After placing an order, you’ll receive a confirmation email and regular tracking updates. If you need help, our support team is available Monday–Saturday.",
      },
      {
        heading: "Payments",
        body: "We accept major cards, UPI, and popular wallets. All transactions are encrypted and securely processed.",
      },
      {
        heading: "Returns & exchanges",
        body: "Eligible items can be returned or exchanged within the return window in original condition with tags attached.",
      },
    ],
  },
  "shipping-returns": {
    title: "Shipping & Returns",
    intro:
      "Everything you need to know about delivery timelines, shipping charges, and how returns are handled.",
    sections: [
      {
        heading: "Shipping timelines",
        body: "Orders are typically dispatched within 24–48 hours. Metro deliveries usually arrive in 2–4 business days, with longer timelines for remote locations.",
      },
      {
        heading: "Shipping charges",
        body: "Standard shipping is free above minimum order value thresholds. Exact charges are shown at checkout before payment.",
      },
      {
        heading: "Returns process",
        body: "Initiate a return from your order details page. Once the return is picked up and verified, refunds are processed to the original payment method.",
      },
    ],
  },
  "size-guide": {
    title: "Size Guide",
    intro:
      "Use this guide to choose your best fit across tees, hoodies, bottoms, and outerwear.",
    sections: [
      {
        heading: "How to measure",
        body: "Measure chest, waist, and hips with a flexible tape while wearing light clothing for the most accurate fit.",
      },
      {
        heading: "Fit recommendations",
        body: "Prefer a relaxed look? Size up for oversized silhouettes. For a closer fit, choose your regular size based on measurements.",
      },
      {
        heading: "Need help deciding?",
        body: "Contact our team with your measurements and preferred fit style, and we’ll suggest the right size before you place your order.",
      },
    ],
  },
  "track-order": {
    title: "Track Order",
    intro:
      "Track shipment progress in real time from dispatch to doorstep.",
    sections: [
      {
        heading: "Where to find tracking",
        body: "You can find your tracking link in your shipping confirmation email and in your order history when logged in.",
      },
      {
        heading: "Status updates",
        body: "Tracking statuses update at each delivery checkpoint, including dispatch, in transit, out for delivery, and delivered.",
      },
      {
        heading: "Delivery delays",
        body: "If a package is delayed, please allow additional transit time and contact support with your order ID for immediate assistance.",
      },
    ],
  },
  about: {
    title: "About NOIR",
    intro:
      "We build premium streetwear with modern silhouettes, elevated fabrics, and an obsessive focus on comfort and craft.",
    sections: [
      {
        heading: "Our design philosophy",
        body: "Every collection is designed to be wearable across seasons, with timeless color palettes and utility-focused detailing.",
      },
      {
        heading: "Built for everyday expression",
        body: "From essential layers to statement pieces, our products are made to move with your lifestyle.",
      },
      {
        heading: "Community-first",
        body: "We collaborate with creators, photographers, and local talent to shape campaigns and stories that feel authentic.",
      },
    ],
  },
  sustainability: {
    title: "Sustainability",
    intro:
      "We’re committed to responsible sourcing, durable products, and reducing waste across the lifecycle of each collection.",
    sections: [
      {
        heading: "Responsible materials",
        body: "We prioritize lower-impact fabrics and trims where possible while maintaining durability and performance.",
      },
      {
        heading: "Longer product life",
        body: "Our garments are designed for repeated wear and care, helping reduce overconsumption and premature disposal.",
      },
      {
        heading: "Continuous progress",
        body: "Sustainability is an ongoing effort; we regularly review production and logistics practices to improve outcomes.",
      },
    ],
  },
  careers: {
    title: "Careers",
    intro:
      "Join a team that blends design, technology, and commerce to shape the next generation of streetwear experiences.",
    sections: [
      {
        heading: "Who we hire",
        body: "We hire across design, operations, marketing, engineering, and customer experience roles.",
      },
      {
        heading: "How we work",
        body: "We value ownership, craftsmanship, and clear communication with a bias for action and thoughtful iteration.",
      },
      {
        heading: "Apply",
        body: "Send your resume and portfolio to careers@noir.example with the role title in the subject line.",
      },
    ],
  },
  contact: {
    title: "Contact Us",
    intro:
      "Need help with an order or product question? We’re here to assist.",
    sections: [
      {
        heading: "Support hours",
        body: "Customer support is available Monday to Saturday, 10:00 AM to 7:00 PM IST.",
      },
      {
        heading: "Email",
        body: "Reach us at support@noir.example and include your order number for faster assistance.",
      },
      {
        heading: "Response time",
        body: "Most queries are answered within one business day, with priority support for active delivery issues.",
      },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    intro:
      "This policy explains what data we collect, why we collect it, and how we protect your information.",
    sections: [
      {
        heading: "Information collected",
        body: "We collect basic account, order, and device information needed to process purchases and improve your experience.",
      },
      {
        heading: "Use of information",
        body: "Data is used for order fulfillment, support, fraud prevention, and service improvements.",
      },
      {
        heading: "Your choices",
        body: "You can request data access or deletion by contacting support, subject to legal and operational requirements.",
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    intro:
      "These terms govern your use of our website, products, and services.",
    sections: [
      {
        heading: "Using the site",
        body: "By accessing the site, you agree to use it lawfully and in accordance with applicable regulations.",
      },
      {
        heading: "Orders and pricing",
        body: "Product availability, prices, and promotions may change at any time. We reserve the right to cancel orders when necessary.",
      },
      {
        heading: "Liability",
        body: "Our liability is limited to the extent permitted by law for issues arising from use of the site or products.",
      },
    ],
  },
};

type InfoPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function InfoPage({ params }: InfoPageProps) {
  const { slug } = await params;
  const page = INFO_PAGES[slug];

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1
          className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          {page.title}
        </h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">{page.intro}</p>

        <div className="mt-10 space-y-6">
          {page.sections.map((section) => (
            <section key={section.heading} className="rounded-lg border border-border bg-secondary/20 p-6">
              <h2 className="text-lg font-semibold text-foreground">{section.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/shop"
            className="inline-flex items-center rounded-sm border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    </main>
  );
}
