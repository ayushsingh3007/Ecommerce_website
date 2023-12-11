import React from 'react';
import "../comp/about.css"

function About() {
  return (
    <div className="about-container">
      <section className="about-section">
        <h1>About Us</h1>

        <div className="about-content">
          <h2>Who We Are</h2>
          <p>
            At [Your Website Name], we are passionate about [your website's main focus or mission]. Our team is dedicated
            to providing [brief description of your products or services] that [highlight the value or uniqueness of your
            offerings].
          </p>
        </div>

        <div className="about-content">
          <h2>Our Mission</h2>
          <p>
            Our mission is to [state the primary goal or purpose of your website]. Whether you're [mention your target
            audience] or [describe another aspect of your target audience], we aim to [describe the impact or value you
            want to create].
          </p>
        </div>

        <div className="about-content">
          <h2>What Sets Us Apart</h2>
          <ul>
            <li>
              <strong>Quality:</strong> We pride ourselves on delivering top-notch [products/services] that meet the
              highest standards.
            </li>
            <li>
              <strong>Innovation:</strong> Constantly pushing boundaries, we strive to bring you the latest [industry-related
              innovations or trends].
            </li>
            <li>
              <strong>Customer-Centric:</strong> Your satisfaction is our priority. We are committed to providing
              exceptional customer service and building lasting relationships.
            </li>
          </ul>
        </div>
      </section>

      <section className="about-section">
        <h2>Our Story</h2>
        <p>
          [Share a brief history of your website or company. Highlight key milestones, challenges, and successes that have
          shaped your journey.]
        </p>
      </section>

      <section className="about-section">
        <h2>Meet the Team</h2>
        <p>
          [Include brief bios and photos of key team members. Highlight their expertise and roles in contributing to the
          success of your website.]
        </p>
      </section>

      <section className="about-section">
        <h2>Contact Us</h2>
        <p>
          Have questions or want to get in touch? We'd love to hear from you! [Include a link to your contact page or a
          contact form.]
        </p>
      </section>

      <section className="about-section">
        <h2>Stay Connected</h2>
        <p>
          Follow us on [social media platforms] to stay updated on the latest [industry-related news, updates, or
          promotions].
        </p>
      </section>
    </div>
  );
}

export default About;
