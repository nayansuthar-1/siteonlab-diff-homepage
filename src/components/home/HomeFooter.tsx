import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

// Old footer options, pointed at real pages.
const services = [
  { label: 'Branding', href: '/services/branding-services' },
  { label: 'SEO Services', href: '/services/seo-service' },
  { label: 'PPC Management', href: '/services/ppc-management' },
  { label: 'Social Media Marketing', href: '/services/social-media-marketing' },
  { label: 'Advertising Services', href: '/services/advertising-services' },
  { label: 'Website Design', href: '/services/website-design' },
  { label: 'Website Development', href: '/services/website-development' },
  { label: 'WordPress Development', href: '/services/wordpress-development' },
  { label: 'Shopify Development', href: '/services/shopify-development' },
  { label: 'eCommerce Development', href: '/services/ecommerce-development' },
  { label: 'Content Writing', href: '/services' },
];

const industries = [
  { label: 'Healthcare', href: '/industries/healthcare' },
  { label: 'Travel & Hospitality', href: '/industries/travel-hospitality' },
  { label: 'Law Firms', href: '/industries/law-firms' },
  { label: 'E-commerce & Retail', href: '/industries/ecommerce-retail' },
  { label: 'Jewellery', href: '/industries/jewellery' },
];

const locations = [
  { label: 'Mumbai', href: '/locations/mumbai' },
  { label: 'Delhi', href: '/locations/delhi' },
  { label: 'Bangalore', href: '/locations/bangalore' },
  { label: 'Hyderabad', href: '/locations/hyderabad' },
  { label: 'Chennai', href: '/locations/chennai' },
  { label: 'Kolkata', href: '/locations/kolkata' },
  { label: 'Pune', href: '/locations/pune' },
  { label: 'Jaipur', href: '/locations/jaipur' },
];

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Company', href: '/company' },
  { label: 'Contact us', href: '/contact' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Case Studies', href: '/case-studies' },
];

export default function HomeFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#05060a] border-t border-white/[0.03] pt-20 pb-8 text-gray-400 font-sans selection:bg-orange-500/30">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Five columns layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col items-start gap-6 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl tracking-wider text-white">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
              SiteOnLab
            </Link>
            <p className="text-sm text-gray-400/90 leading-relaxed font-light font-sans">
              SiteOnLab is a full-service digital marketing agency helping businesses grow with SEO, PPC, website development, and performance marketing.
            </p>
            {/* Social media icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded bg-[#0c0e16] border border-white/[0.05] hover:border-orange-500/40 hover:text-orange-500 flex items-center justify-center transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded bg-[#0c0e16] border border-white/[0.05] hover:border-orange-500/40 hover:text-orange-500 flex items-center justify-center transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded bg-[#0c0e16] border border-white/[0.05] hover:border-orange-500/40 hover:text-orange-500 flex items-center justify-center transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Our Services */}
          <div>
            <h4 className="text-white font-semibold font-display text-sm tracking-wide mb-6">Our Services</h4>
            <ul className="flex flex-col gap-3 text-xs font-light">
              {services.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-orange-400 transition-colors duration-200 block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Industries */}
          <div>
            <h4 className="text-white font-semibold font-display text-sm tracking-wide mb-6">Industries</h4>
            <ul className="flex flex-col gap-3 text-xs font-light">
              {industries.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-orange-400 transition-colors duration-200 block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Locations */}
          <div>
            <h4 className="text-white font-semibold font-display text-sm tracking-wide mb-6">Locations</h4>
            <ul className="flex flex-col gap-3 text-xs font-light">
              {locations.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-orange-400 transition-colors duration-200 block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Quick Links */}
          <div>
            <h4 className="text-white font-semibold font-display text-sm tracking-wide mb-6">Quick Links</h4>
            <ul className="flex flex-col gap-3 text-xs font-light">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-orange-400 transition-colors duration-200 block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact credentials mid-row */}
        <div className="border-t border-white/[0.04] py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1: Phone 1 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white/[0.015] border border-white/[0.04] flex items-center justify-center shrink-0 text-orange-500">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <a href="tel:+447441466959" className="text-white font-semibold font-display text-sm hover:text-orange-400 transition-colors duration-200 block">
                +447441466959
              </a>
              <p className="text-[11px] text-gray-500 leading-normal mt-1 font-light">
                Call us for the best solutions for your business to grow more.
              </p>
            </div>
          </div>

          {/* Card 2: Phone 2 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white/[0.015] border border-white/[0.04] flex items-center justify-center shrink-0 text-orange-500">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <a href="tel:+918799001675" className="text-white font-semibold font-display text-sm hover:text-orange-400 transition-colors duration-200 block">
                +91 87990 01675
              </a>
              <p className="text-[11px] text-gray-500 leading-normal mt-1 font-light">
                Call us for the best solutions for your business to grow more.
              </p>
            </div>
          </div>

          {/* Card 3: Email */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white/[0.015] border border-white/[0.04] flex items-center justify-center shrink-0 text-orange-500">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <a href="mailto:hello@siteonlab.com" className="text-white font-semibold font-display text-sm hover:text-orange-400 transition-colors duration-200 block">
                hello@siteonlab.com
              </a>
              <a href="mailto:hitesh@siteonlab.com" className="text-white font-semibold font-display text-sm hover:text-orange-400 transition-colors duration-200 block">
                hitesh@siteonlab.com
              </a>
              <p className="text-[11px] text-gray-500 leading-normal mt-1 font-light">
                Get quote via email
              </p>
            </div>
          </div>

          {/* Card 4: Address */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white/[0.015] border border-white/[0.04] flex items-center justify-center shrink-0 text-orange-500">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white font-semibold font-display text-sm block">
                Address
              </span>
              <p className="text-[11px] text-gray-500 leading-normal mt-1 font-light">
                F1, Bhagwati Complex, Near But Mata Mandir, Vejalpur, Ahmedabad, 380051
              </p>
            </div>
          </div>
        </div>

        {/* Bottom micro line */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-gray-500 font-light">
            &copy; {currentYear} SiteOnLab. All Rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
