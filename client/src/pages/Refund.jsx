import React from "react";

const ReturnRefundPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-[#243654] px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-[#243654]">
          Return & Refund Policy
        </h1>


        <section className="text-left space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#243654]">
              1. Return Eligibility
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Returns are accepted within <strong>7 days</strong> of delivery if the item
              is damaged, defective, or incorrect. Items must be unused and in
              their original packaging.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#243654]">
              2. Non-returnable Items
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Perishable goods (like fresh fruits, vegetables, dairy, or frozen
              items) cannot be returned unless damaged or expired upon delivery.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#243654]">
              3. Refund Process
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Once your return is received and inspected, your refund will be
              processed to your original payment method within <strong>5–7 business days</strong>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#243654]">
              4. Exchanges
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We only replace items if they are defective or damaged. To request an
              exchange, please contact our support team.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#243654]">
              5. Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about our Return & Refund Policy, feel free
              to reach out at {" "}
              <a
                href="mailto:nishthagupta209@gmail.com"
                className="text-[var(--color-primary)] font-medium hover:underline"
              >
                support@freshkart.com
              </a>
              .
            </p>
          </div>
        </section>

       
      </div>
    </div>
  );
};

export default ReturnRefundPolicy;
