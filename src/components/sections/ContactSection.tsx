"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./ContactSection.module.css";

export default function ContactSection() {
  const [activeTab, setActiveTab] = useState<"project" | "cv">("project");

  return (
    <section className={styles.contactSection}>
      <div className={styles.bgPattern} />
      <div className={styles.glow} />

      <div className={styles.container}>
        {/* Left Column: Info */}
        <div className={styles.infoColumn}>
          <h2 className={styles.title}>
            Get in touch<br />whenever you&apos;re ready
          </h2>
          <p className={styles.description}>
            We would love to learn more about your project idea. Contact us and we will get back to you within a few business hours.
          </p>

          <div className={styles.locationSection}>
            <span className={styles.label}>Head Office</span>
            <h3 className={styles.city}>Ahmedabad, India</h3>
            <p className={styles.address}>
              F1, Bhagawati Complex, Vejalpur,<br />
              Ahmedabad, Gujarat 380051
            </p>

            <div className={styles.countries}>
              <div className={styles.country}>Mumbai</div>
              <div className={styles.country}>Hyderabad</div>
              <div className={styles.country}>Chennai</div>
              <div className={styles.country}>Bangalore</div>
              <div className={styles.country}>Pune</div>
            </div>
          </div>

          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
              </div>
              <div className={styles.contactDetails}>
                <span>Call us</span>
                <a href="tel:+14038799495">+1 (403) 879-9495</a>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className={styles.contactDetails}>
                <span>Send us an email</span>
                <a href="mailto:info@siteonlab.com">info@siteonlab.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className={styles.formColumn}>
          <div className={styles.formCard}>
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${activeTab === "project" ? styles.active : ""}`}
                onClick={() => setActiveTab("project")}
              >
                Discuss a project
              </button>
              <button
                className={`${styles.tab} ${activeTab === "cv" ? styles.active : ""}`}
                onClick={() => setActiveTab("cv")}
              >
                Send CV
              </button>
            </div>

            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.inputGrid}>
                <div className={styles.inputGroup}>
                  <label>Full Name<span>*</span></label>
                  <input type="text" className={styles.input} placeholder="Full Name" required />
                </div>

                <div className={styles.inputGroup}>
                  <label>Company<span>*</span></label>
                  <input type="text" className={styles.input} placeholder="Company" required />
                </div>

                <div className={styles.inputGroup}>
                  <label>E-mail<span>*</span></label>
                  <input type="email" className={styles.input} placeholder="e.g. name@domain.com" required />
                </div>

                <div className={styles.inputGroup}>
                  <label>Phone</label>
                  <div className={styles.phoneInput}>
                    <button type="button" className={styles.countryCode}>
                      🇮🇳
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    <input type="tel" className={styles.input} placeholder="+91" />
                  </div>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Tell us about your project</label>
                <textarea className={styles.textarea} placeholder="Description" />
              </div>

              <div className={styles.formFooter}>
                <button type="button" className={styles.attachBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                  </svg>
                  Attach files
                </button>

                <button type="submit" className={styles.submitBtn}>
                  Submit
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
