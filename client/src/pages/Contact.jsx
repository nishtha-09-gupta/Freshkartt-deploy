import React from "react";

const Contact = () => {
  return (
    <div className="mt-16 px-6 md:px-16 py-16 ">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold uppercase text-[var(--color-text-dark)] relative inline-block">
          Contact Us
          <span className="block h-1 bg-[var(--color-primary)] mt-3 rounded-full w-24 mx-auto"></span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Have a question, feedback, or need support? We’re always happy to hear from you! Reach out through any of the options below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
        <div className="space-y-8 text-left text-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text-dark)] mb-2">Our Address</h2>
            <p>FreshKart HQ, Sector 21, Gurgaon, Haryana, India</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text-dark)] mb-2">Email Us</h2>
            <a
              href="mailto:support@freshkart.com"
              className="text-[var(--color-primary)] hover:underline"
            >
              support@freshkart.com
            </a>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text-dark)] mb-2">Call Us</h2>
            <p>+91 90982 34675</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text-dark)] mb-2">Working Hours</h2>
            <p>Monday – Saturday: 9:00 AM – 9:00 PM</p>
            <p>Sunday: 10:00 AM – 6:00 PM</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7011.7395229046!2d77.06717374350187!3d28.513565902919535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19639b10e94d%3A0xde04584f400cbacc!2sSector%2021%2C%20Gurugram!5e0!3m2!1sen!2sin!4v1762419973609!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: "16px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="FreshKart Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
