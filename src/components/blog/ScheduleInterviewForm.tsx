"use client";

import { useState } from "react";
import styles from "./ScheduleInterviewForm.module.css";

export default function ScheduleInterviewForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "").substring(0, 1000);

    const subject = `Developer Interview Request from ${name}`;
    const body = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\r\n");

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=hello@siteonlab.com&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(gmailLink, "_blank");
    setSent(true);
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>
        Schedule A Developer Interview And Get 15 Days Risk-Free Trial
      </h3>
      <p className={styles.desc}>
        Feel free to ask, discuss, interview, and evaluate our top-notch engineers. Verify their
        competencies yourself.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input name="name" className={styles.input} placeholder="Name" required />
        <input
          name="phone"
          type="tel"
          className={styles.input}
          placeholder="Phone"
          required
          onInput={(e) => {
            const t = e.target as HTMLInputElement;
            t.value = t.value.replace(/[^0-9+\s-]/g, "");
          }}
        />
        <input name="email" type="email" className={styles.input} placeholder="Email" required />
        <textarea name="message" className={styles.textarea} placeholder="Message" />
        <button type="submit" className={styles.submit}>Submit</button>
        {sent && <p className={styles.sent}>Opening your email client…</p>}
      </form>
    </div>
  );
}
