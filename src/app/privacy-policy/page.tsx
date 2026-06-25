import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — SiteOnLab",
  description:
    "How SiteOnLab collects, uses, and protects your personal information.",
};

const sections: LegalSection[] = [
  {
    heading: "1. Information We Collect",
    body: (
      <>
        <p>We may collect the following types of information:</p>
        <ul>
          <li><strong>Contact details</strong> such as your name, email address, and phone number when you fill out a form or reach out to us.</li>
          <li><strong>Business information</strong> you share with us as part of a project enquiry or engagement.</li>
          <li><strong>Usage data</strong> such as your IP address, browser type, pages visited, and time spent on our website.</li>
          <li><strong>Cookies and tracking data</strong> collected through analytics and similar technologies.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "2. How We Use Your Information",
    body: (
      <>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Respond to your enquiries and provide our services.</li>
          <li>Improve and personalize your experience on our website.</li>
          <li>Send you relevant updates, proposals, or marketing communications (where permitted).</li>
          <li>Analyze website performance and usage trends.</li>
          <li>Comply with legal obligations.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "3. Cookies",
    body: (
      <p>
        We use cookies and similar technologies to enhance your browsing
        experience and analyze traffic. You can control or disable cookies through
        your browser settings, though some features of the website may not function
        properly as a result.
      </p>
    ),
  },
  {
    heading: "4. Sharing Your Information",
    body: (
      <p>
        We do not sell your personal information. We may share it with trusted
        third-party service providers who assist us in operating our website and
        delivering services, provided they agree to keep your information
        confidential. We may also disclose information when required by law.
      </p>
    ),
  },
  {
    heading: "5. Data Security",
    body: (
      <p>
        We implement reasonable technical and organizational measures to protect
        your personal information against unauthorized access, loss, or misuse.
        However, no method of transmission over the internet is completely secure,
        and we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    heading: "6. Data Retention",
    body: (
      <p>
        We retain your personal information only for as long as necessary to
        fulfill the purposes outlined in this policy, or as required by applicable
        law.
      </p>
    ),
  },
  {
    heading: "7. Your Rights",
    body: (
      <p>
        Depending on your location, you may have the right to access, correct, or
        delete your personal information, or to object to or restrict its
        processing. To exercise these rights, please contact us using the details
        below.
      </p>
    ),
  },
  {
    heading: "8. Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page with an updated revision date. We encourage you to
        review this policy periodically.
      </p>
    ),
  },
  {
    heading: "9. Contact Us",
    body: (
      <p>
        If you have any questions about this Privacy Policy or how we handle your
        data, please contact us at{" "}
        <a href="mailto:hello@siteonlab.com">hello@siteonlab.com</a> or visit our{" "}
        <a href="/contact">contact page</a>.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="June 25, 2026"
      intro={
        <>
          At SiteOnLab, we value your privacy. This Privacy Policy explains how we
          collect, use, and safeguard your personal information when you visit our
          website or use our services.
        </>
      }
      sections={sections}
    />
  );
}
