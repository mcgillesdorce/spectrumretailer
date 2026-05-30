"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Do I need prior telecom or sales experience?",
    answer:
      "No prior telecom experience is required. We provide full product training as part of onboarding. A background in sales, customer service, or community engagement is helpful but not a prerequisite. We've successfully onboarded people from all walks of life.",
  },
  {
    question: "Is there a cost to become an Authorized Retailer?",
    answer:
      "There is no franchise fee or startup cost to partner with HIWS. You won't need to purchase inventory, maintain a physical storefront, or pay for our training program. Your investment is your time and effort.",
  },
  {
    question: "How quickly can I start selling after applying?",
    answer:
      "Most applicants complete the onboarding process and are actively selling within 1–2 weeks of applying. The timeline depends on how quickly you complete training and certification steps.",
  },
  {
    question: "How do I get paid and how often?",
    answer:
      "Commissions are paid on a regular schedule (details confirmed during your intro call). You can track your activations and commission history through the HIWS agent portal. Payments are issued after Spectrum confirms and processes each activation.",
  },
  {
    question: "Can I operate in multiple states or territories?",
    answer:
      "Yes. If Spectrum services are available in multiple areas where you plan to operate, we can discuss a multi-territory arrangement. This is especially common for businesses with multiple locations or independent agents who travel.",
  },
  {
    question: "Am I an employee or an independent contractor?",
    answer:
      "HIWS Authorized Retailers operate as independent contractors. You are your own business — you set your own schedule, choose your sales approach, and are responsible for your own taxes and expenses. This gives you flexibility but also means earnings depend on your effort.",
  },
  {
    question: "What happens if a customer cancels after I get credit for the sale?",
    answer:
      "Our commission policy is designed to be fair. We only apply chargebacks in cases of fraud or violations of Spectrum's terms of service — not normal customer cancellations. Exact chargeback policies are reviewed during onboarding.",
  },
  {
    question: "Can I recruit other agents and earn on their sales?",
    answer:
      "Yes. As your operation grows, you may be eligible to recruit sub-agents and earn override commissions on their activations. This is discussed during the partnership expansion stage and depends on your production history.",
  },
  {
    question: "What marketing materials are available to me?",
    answer:
      "HIWS provides authorized marketing materials including digital assets, product one-pagers, and guidance on compliant sales messaging. You are required to use approved materials to ensure compliance with Spectrum's brand standards.",
  },
  {
    question: "Who do I contact if I have questions during the partnership?",
    answer:
      "You'll have a dedicated account manager at HIWS who is your first point of contact for any questions — from order submission issues to commission inquiries. We're reachable at (888) 510-4882 or hiwsinternet@gmail.com.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-20 bg-gray-50 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-spectrum-blue font-semibold text-sm uppercase tracking-wider mb-2">
            Common Questions
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Still have questions? Reach us at{" "}
            <a
              href="mailto:hiwsinternet@gmail.com"
              className="text-spectrum-blue hover:underline"
            >
              hiwsinternet@gmail.com
            </a>{" "}
            or call{" "}
            <a href="tel:8885104882" className="text-spectrum-blue hover:underline">
              (888) 510-4882
            </a>
            .
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
              >
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-gray-900 text-sm sm:text-base">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-spectrum-blue flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
