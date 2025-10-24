import React from 'react';

const ContactForm = () => (
  <section>
    <h2>Contact Me</h2>
    <form style={{
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '400px',
      gap: '10px'
    }}>
      <input type="text" placeholder="Your Name" required />
      <input type="email" placeholder="Your Email" required />
      <input type="text" placeholder="Subject" />
      <textarea placeholder="Your Message" rows="4"></textarea>
      <button type="submit" style={{
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>Send Message</button>
    </form>
  </section>
);

export default ContactForm;