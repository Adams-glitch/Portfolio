import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSent(true);
      setSending(false);
      setForm({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <section className="contact section" id="contact" aria-label="Contact">
      <div className="container">
        <p className="section__label">Get in touch</p>
        <h2 className="section__title">Let's work together</h2>

        <div className="contact__grid">
          <div className="contact__info">
            <p className="contact__intro">
              I'm always open to new opportunities — whether it's a full-time
              role, freelance project, or just a conversation about tech. My
              inbox is always open.
            </p>

            <div className="contact__ways">
              <a href="mailto:adams.rabiul@email.com" className="contact__way">
                <div className="contact__way-icon" aria-hidden="true">✉️</div>
                <div>
                  <div className="contact__way-label">Email</div>
                  <div className="contact__way-value">adams.rabiul@email.com</div>
                </div>
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__way"
              >
                <div className="contact__way-icon" aria-hidden="true">🔗</div>
                <div>
                  <div className="contact__way-label">LinkedIn</div>
                  <div className="contact__way-value">linkedin.com/in/adams-rabiul</div>
                </div>
              </a>

              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__way"
              >
                <div className="contact__way-icon" aria-hidden="true">⌥</div>
                <div>
                  <div className="contact__way-label">GitHub</div>
                  <div className="contact__way-value">github.com/adams-rabiul</div>
                </div>
              </a>
            </div>
          </div>

          <div className="contact__form-wrap card">
            {sent ? (
              <div className="contact__success" role="status">
                <div className="contact__success-icon" aria-hidden="true">🎉</div>
                <h3>Message sent!</h3>
                <p>Thanks for reaching out. I'll get back to you soon.</p>
                <button className="btn btn--outline" onClick={() => setSent(false)}>
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact__form" noValidate>
                <div className="contact__field">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="contact__field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What's on your mind?"
                    rows={5}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn--primary contact__submit"
                  disabled={sending || !form.name || !form.email || !form.message}
                >
                  {sending ? 'Sending…' : 'Send message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;