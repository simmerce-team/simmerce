import { Images } from "@/utils/constant";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Quick Links",
    links: [
      { name: "Verified Suppliers", href: "/sellers?filter=verified" },
      { name: "Become a Seller", href: process.env.NEXT_PUBLIC_SELLER_URL || "/seller/register" },
      { name: "Pricing Plans", href: "/pricing" },
      { name: "Success Stories", href: "/success-stories" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Terms and Conditions", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "/help" },
      { name: "Safety Guidelines", href: "/safety" },
      { name: "Report Issue", href: "/report" },
      { name: "Feedback", href: "/feedback" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "https://www.instagram.com/getsimmerce", label: "Instagram" },
  { icon: <FaFacebook className="size-5" />, href: "https://www.facebook.com/getsimmerce", label: "Facebook" },
  { icon: <FaTwitter className="size-5" />, href: "https://twitter.com/getsimmerce", label: "Twitter" },
  { icon: <FaLinkedin className="size-5" />, href: "https://www.linkedin.com/company/getsimmerce", label: "LinkedIn" },
  { icon: <FaYoutube className="size-5" />, href: "https://www.youtube.com/getsimmerce", label: "YouTube" },
];

export const Footer = ({
  sections = defaultSections,
  description = "Simmerce - B2B Marketplace for Businesses",
  socialLinks = defaultSocialLinks,
  copyright = `© ${new Date().getFullYear()} Simmerce. All rights reserved.`,
}: Footer7Props) => {
  return (
    <section className="pt-16 pb-8 bg-slate-50/30">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex w-full flex-col justify-between gap-12 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-8 lg:items-start lg:max-w-sm">
            {/* Logo */}
            <div className="flex items-center gap-3 lg:justify-start">
                <img
                  src={Images.logo512}
                  alt="Simmerce"
                  title="Simmerce"
                  className="h-10 rounded-lg shadow-sm"
                />
              <h2 className="text-xl font-medium text-slate-800 tracking-tight">Simmerce</h2>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {description}
            </p>
            <ul className="flex items-center space-x-4">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="text-slate-500 hover:text-red-600 transition-colors">
                  <a href={social.href} aria-label={social.label} className="block p-2 rounded-lg hover:bg-red-50 transition-all">
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-6 font-medium text-slate-800 text-sm uppercase tracking-wide">{section.title}</h3>
                <ul className="space-y-4 text-sm">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link href={link.href} className="text-slate-600 hover:text-red-600 transition-colors font-medium">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-6 border-t border-slate-200 pt-8 text-sm md:flex-row md:items-center">
          <p className="text-slate-500 order-2 lg:order-1">{copyright}</p>
        </div>
      </div>
    </section>
  );
};