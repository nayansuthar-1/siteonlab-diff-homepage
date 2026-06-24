"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./ContactSection.module.css";

interface ContactSectionProps {
  hideLocation?: boolean;
}

export default function ContactSection({ hideLocation = false }: ContactSectionProps) {
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

          {!hideLocation && (
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
          )}

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
                <a href="mailto:hello@siteonlab.com">hello@siteonlab.com</a>
                <a href="mailto:hitesh@siteonlab.com">hitesh@siteonlab.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className={styles.formColumn}>
          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>Discuss a project</h3>
            <form 
              className={styles.form} 
              onSubmit={(e) => {
                e.preventDefault();
                
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                
                const name = String(formData.get("fullName") || "");
                const company = String(formData.get("company") || "");
                const email = String(formData.get("email") || "");
                const countryCode = String(formData.get("countryCode") || "");
                const phone = String(formData.get("phone") || "");
                const service = String(formData.get("service") || "");
                const description = String(formData.get("description") || "").substring(0, 1000);

                const subject = `Project Inquiry from ${name}`;
                const bodyLines = [
                  `Full Name: ${name}`,
                  `Company: ${company}`,
                  `Email: ${email}`,
                  `Phone: ${countryCode} ${phone}`,
                  `Service Interested: ${service}`,
                  "",
                  "Project Details:",
                  description
                ];
                const body = bodyLines.join("\r\n");

                // Use Gmail's direct compose URL for a more reliable "Open Gmail" experience
                const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=hello@siteonlab.com,hitesh@siteonlab.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                
                window.open(gmailLink, '_blank');
              }}
            >
              <div className={styles.inputGrid}>
                <div className={styles.inputGroup}>
                  <label>Full Name<span>*</span></label>
                  <input name="fullName" type="text" className={styles.input} placeholder="Full Name" required />
                </div>

                <div className={styles.inputGroup}>
                  <label>Company<span>*</span></label>
                  <input name="company" type="text" className={styles.input} placeholder="Company Name" required />
                </div>

                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label>E-mail<span>*</span></label>
                  <input name="email" type="email" className={styles.input} placeholder="e.g. name@domain.com" required />
                </div>

                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label>Phone<span>*</span></label>
                  <div className={styles.phoneInput}>
                    <select name="countryCode" className={styles.countrySelect} defaultValue="+91">
                      <option value="+91">🇮🇳 India (+91)</option>
                      <option value="+1">🇺🇸 USA (+1)</option>
                      <option value="+44">🇬🇧 UK (+44)</option>
                      <option value="+971">🇦🇪 UAE (+971)</option>
                      <option value="+61">🇦🇺 Australia (+61)</option>
                      <option value="+65">🇸🇬 Singapore (+65)</option>
                      <option value="+49">🇩🇪 Germany (+49)</option>
                      <option value="+33">🇫🇷 France (+33)</option>
                      <option value="+81">🇯🇵 Japan (+81)</option>
                      <option value="+1">🇨🇦 Canada (+1)</option>
                      <option value="+92">🇵🇰 Pakistan (+92)</option>
                      <option value="+880">🇧🇩 Bangladesh (+880)</option>
                      <option value="+94">🇱🇰 Sri Lanka (+94)</option>
                      <option value="+977">🇳🇵 Nepal (+977)</option>
                      <option value="+60">🇲🇾 Malaysia (+60)</option>
                      <option value="+66">🇹🇭 Thailand (+66)</option>
                      <option value="+62">🇮🇩 Indonesia (+62)</option>
                      <option value="+86">🇨🇳 China (+86)</option>
                      <option value="+82">🇰🇷 South Korea (+82)</option>
                      <option value="+34">🇪🇸 Spain (+34)</option>
                      <option value="+39">🇮🇹 Italy (+39)</option>
                      <option value="+7">🇷🇺 Russia (+7)</option>
                      <option value="+55">🇧🇷 Brazil (+55)</option>
                      <option value="+52">🇲🇽 Mexico (+52)</option>
                      <option value="+27">🇿🇦 South Africa (+27)</option>
                      <option value="+234">🇳🇬 Nigeria (+234)</option>
                      <option value="+20">🇪🇬 Egypt (+2 Egyptian)</option>
                      <option value="+966">🇸🇦 Saudi Arabia (+966)</option>
                      <option value="+90">🇹🇷 Turkey (+9 Turkey)</option>
                      <option value="+31">🇳🇱 Netherlands (+31)</option>
                      <option value="+41">🇨🇭 Switzerland (+41)</option>
                      <option value="+46">🇸🇪 Sweden (+46)</option>
                    </select>
                    <input 
                      name="phone" 
                      type="tel" 
                      className={styles.input} 
                      placeholder="Phone Number" 
                      required
                      onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.value = target.value.replace(/[^0-9]/g, '');
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Service Interested<span>*</span></label>
                <select name="service" className={`${styles.input} ${styles.selectInput}`} required>
                  <option value="">Select a service</option>
                  <option value="SEO">SEO Services</option>
                  <option value="PPC">PPC Management</option>
                  <option value="Branding">Branding & Design</option>
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                  <option value="Social Media">Social Media Marketing</option>
                  <option value="White Label">White Label Services</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label>Tell us about your project<span>*</span></label>
                <textarea name="description" className={styles.textarea} placeholder="Describe your goals, timeline, and requirements..." required />
              </div>

              <div className={styles.formFooter}>
                <button type="submit" className={styles.submitBtn}>
                  Send Message
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
