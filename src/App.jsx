function App() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand">Rima Creates</div>
        <nav>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div>
            <p className="eyebrow">Personal Tech Developer</p>
            <h1>Designing digital products that make ideas feel real.</h1>
            <p className="hero-copy">
              Website design, web apps, mobile apps, UI/UX and consulting for
              startups, small businesses and ambitious founders.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#contact">
                Request a quote
              </a>
              <a className="button secondary" href="#services">
                Explore services
              </a>
            </div>
          </div>
          <div className="hero-panel">
            <div className="panel-card">
              <strong>Fast launch</strong>
              <p>Clear web and mobile experiences ready to show clients and users.</p>
            </div>
            <div className="panel-card accent">
              <strong>Custom process</strong>
              <p>Design, development and delivery tailored to your product goals.</p>
            </div>
          </div>
        </section>

        <section id="services" className="section services-section">
          <div className="section-heading">
            <p className="eyebrow">Services</p>
            <h2>What I build for you</h2>
          </div>
          <div className="service-grid">
            <article>
              <h3>Website Design</h3>
              <p>Beautiful landing pages and brand-first websites built to convert.</p>
            </article>
            <article>
              <h3>Web App Development</h3>
              <p>Interactive apps with clean UX, speedy performance and modern tools.</p>
            </article>
            <article>
              <h3>Mobile App Development</h3>
              <p>Cross-platform mobile experiences for iOS and Android users.</p>
            </article>
            <article>
              <h3>UI/UX Design</h3>
              <p>User-centered interfaces that feel intuitive and polished.</p>
            </article>
            <article>
              <h3>Consulting</h3>
              <p>Product advice, roadmaps, design reviews and launch strategies.</p>
            </article>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="section-heading">
            <p className="eyebrow">About</p>
            <h2>Work with someone who makes tech feel approachable.</h2>
          </div>
          <p>
            I help ambitious creators turn digital ideas into live products.
            From fast prototypes to polished websites and mobile apps, I focus on
            clarity, speed, and meaningful results.
          </p>
        </section>

        <section id="contact" className="section contact-section">
          <div className="section-heading">
            <p className="eyebrow">Contact</p>
            <h2>Let’s talk about your next project.</h2>
          </div>
          <div className="contact-grid">
            <div className="contact-details">
              <p>
                <strong>Email:</strong> <a href="mailto:amirditamo@gmail.com">amirditamo@gmail.com</a>
              </p>
              <p>
                <strong>Phone / Text:</strong> <a href="tel:+1234567890">+1 234 567 890</a>
              </p>
              <p>
                <strong>Ready to start?</strong> Use the form and I’ll reply fast.
              </p>
            </div>
            <form
              className="contact-form"
              action="https://formsubmit.co/amirditamo@gmail.com"
              method="POST"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="New contact request from website" />
              <label>
                Name
                <input type="text" name="name" placeholder="Your name" required />
              </label>
              <label>
                Email
                <input type="email" name="email" placeholder="you@example.com" required />
              </label>
              <label>
                Project details
                <textarea name="message" placeholder="Tell me about your project" rows="5" required />
              </label>
              <button type="submit" className="button primary">
                Send request
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Rima Creates — web design, apps, and digital experiences.</p>
      </footer>
    </div>
  );
}

export default App;
