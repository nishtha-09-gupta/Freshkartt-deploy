import React, { useState } from "react";
import { Plus, Minus } from "lucide-react"; 

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Simply browse through our products, add items to your cart, and proceed to checkout. You can choose your preferred payment method and delivery address during checkout.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major payment options including UPI, debit/credit cards, and cash on delivery (COD) for eligible orders.",
  },
  {
    question: "How can I track my order?",
    answer:
      "You can track your order by visiting the My Orders page after logging in. Real-time delivery updates will also be shared via email and SMS.",
    link: "/my-orders",
  },
  {
    question: "Can I modify or cancel my order after placing it?",
    answer:
      "Orders can be modified or canceled within 15 minutes of placing them, provided they haven’t been dispatched yet. Visit My Orders to manage your order.",
    link: "/my-orders",
  },
  {
    question: "What is your return policy?",
    answer:
      "Returns are accepted within 7 days of delivery for eligible items. For details, check our Return & Refund Policy.",
    link: "/refund",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach us at support@freshkart.com or call us at +91 90982 34675. Our support hours are 9 AM – 9 PM, Monday to Saturday.",
    actualEmail:  "support@freshkart.com", 
    displayEmail: "support@freshkart.com",    
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-5 px-6 py-16 flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold uppercase text-[#243654] relative inline-block">
          FAQ's
          <span className="block h-0.5 bg-[var(--color-primary)] mt-2 rounded-full w-full"></span>
        </h1>
      </div>

      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-lg border border-[var(--color-primary)]/20 p-10 space-y-6">
        <p className="text-gray-600 text-center mb-6 leading-relaxed">
          Have questions? We’ve got answers!  
          Here are some of the most common queries about{" "}
          <span className="text-[var(--color-primary-dull)] font-medium">
            FreshKart
          </span>.
        </p>

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-4 last:border-b-0"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left focus:outline-none"
            >
              <h2 className="text-lg font-semibold text-[#243654]">
                {index + 1}. {faq.question}
              </h2>
              {openIndex === index ? (
                <Minus className="text-[var(--color-primary)]" size={20} />
              ) : (
                <Plus className="text-[var(--color-primary)]" size={20} />
              )}
            </button>

            {openIndex === index && (
              <div className="mt-3 text-gray-700 leading-relaxed">
                <p>
                  {faq.answer.split("My Orders")[0]}
                  {faq.link && faq.link === "/my-orders" && (
                    <a
                      href="/my-orders"
                      className="text-[var(--color-primary)] hover:underline font-medium"
                    >
                      My Orders
                    </a>
                  )}
                  {faq.answer.includes("Return & Refund Policy") && (
                    <a
                      href="/refund"
                      className="text-[var(--color-primary)] hover:underline font-medium"
                    >
                      Return & Refund Policy
                    </a>
                  )}
                  {faq.actualEmail && (
                    <a
                      href={`mailto:${faq.actualEmail}`}
                      className="text-[var(--color-primary)] hover:underline font-medium ml-1"
                    >
                      {faq.displayEmail}
                    </a>
                  )}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
