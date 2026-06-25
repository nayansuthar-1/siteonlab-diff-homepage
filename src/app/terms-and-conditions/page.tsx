import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms and Conditions — SiteOnLab",
  description:
    "The terms and conditions governing the use of SiteOnLab's website and services.",
};

const sections: LegalSection[] = [
  {
    heading: "1. Acceptance of Terms",
    body: (
      <p>
        By accessing or using the SiteOnLab website and services, you agree to be
        bound by these Terms and Conditions and our Privacy Policy. If you do not
        agree with any part of these terms, please discontinue use of our website
        and services.
      </p>
    ),
  },
  {
    heading: "2. Services",
    body: (
      <p>
        SiteOnLab is a full-service digital marketing agency offering services
        including SEO, PPC management, website design and development, branding,
        and performance marketing. The scope, deliverables, and timelines of any
        engagement are defined in a separate written agreement or proposal.
      </p>
    ),
  },
  {
    heading: "3. Use of the Website",
    body: (
      <>
        <p>You agree that you will not:</p>
        <ul>
          <li>Use the website in any way that violates applicable laws or regulations.</li>
          <li>Attempt to gain unauthorized access to any part of the website or its systems.</li>
          <li>Reproduce, duplicate, or resell any part of the website without our prior written consent.</li>
          <li>Introduce malicious code or interfere with the website's normal operation.</li>
        </ul>
      </>
    ),
  },
  {
    heading: "4. Intellectual Property",
    body: (
      <p>
        All content on this website — including text, graphics, logos, images, and
        software — is the property of SiteOnLab or its licensors and is protected
        by applicable intellectual property laws. You may not use, copy, or
        distribute any content without our prior written permission.
      </p>
    ),
  },
  {
    heading: "5. Payments and Fees",
    body: (
      <p>
        Fees for services are outlined in the relevant proposal or agreement.
        Unless otherwise stated, invoices are payable within the terms specified.
        Late payments may result in suspension of services.
      </p>
    ),
  },
  {
    heading: "6. Limitation of Liability",
    body: (
      <p>
        SiteOnLab provides its website and services on an "as is" basis. To the
        fullest extent permitted by law, we shall not be liable for any indirect,
        incidental, or consequential damages arising from your use of, or
        inability to use, our website or services.
      </p>
    ),
  },
  {
    heading: "7. Third-Party Links",
    body: (
      <p>
        Our website may contain links to third-party websites. We are not
        responsible for the content, privacy practices, or accuracy of any
        third-party sites and do not endorse them.
      </p>
    ),
  },
  {
    heading: "8. Changes to These Terms",
    body: (
      <p>
        We may update these Terms and Conditions from time to time. Any changes
        will be posted on this page with an updated revision date. Your continued
        use of the website after changes are posted constitutes acceptance of the
        revised terms.
      </p>
    ),
  },
  {
    heading: "9. Contact Us",
    body: (
      <p>
        If you have any questions about these Terms and Conditions, please contact
        us at <a href="mailto:hello@siteonlab.com">hello@siteonlab.com</a> or visit
        our <a href="/contact">contact page</a>.
      </p>
    ),
  },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms and Conditions"
      lastUpdated="June 25, 2026"
      intro={
        <>
          Welcome to SiteOnLab. These Terms and Conditions outline the rules and
          regulations for the use of our website and services. Please read them
          carefully before engaging with us.
        </>
      }
      sections={sections}
    />
  );
}
