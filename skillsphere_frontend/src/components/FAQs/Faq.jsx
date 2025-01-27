import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Expand/collapse icons

const Faq = () => {
  // FAQs Data
  const faqData = [
    {
      question: "How do I create a gig?",
      answer:
        "To create a gig, navigate to the 'Create Gig' page, fill in the required details, and submit the form. Once approved, your gig will be live.",
    },
    {
      question: "How can freelancers apply to my gigs?",
      answer:
        "Freelancers can view your gigs on the 'Available Gigs' page and apply by uploading their cover letter and submitting their application.",
    },
    {
      question: "How do I track applications for my gigs?",
      answer:
        "Go to the 'My Gigs' section and select a specific gig. You can view all applicants along with their details and uploaded cover letters.",
    },
    {
      question: "How can I edit or delete a gig?",
      answer:
        "Navigate to the 'My Gigs' section, select the gig you want to edit or delete, and use the available options to make changes.",
    },
    {
      question: "What is the process for freelancers to find gigs?",
      answer:
        "Freelancers can browse available gigs on the 'View Gigs' page and filter them based on budget, deadline, or category. They can then apply directly from the gig details page.",
    },
    {
      question: "Can I post multiple gigs simultaneously?",
      answer:
        "Yes, you can post as many gigs as you need. Each gig will appear individually for freelancers to view and apply to.",
    },
    {
      question: "How do I update my profile as a freelancer?",
      answer:
        "Go to the 'Profile' section from the menu and update your details, such as your resume, skills, or contact information.",
    },
    {
      question: "Can I reject or accept applications for my gigs?",
      answer:
        "Yes. In the 'View Applicants' section, you can review each application and decide whether to accept or reject it.",
    },
    {
      question: "How do I contact a freelancer who applied to my gig?",
      answer:
        "You can view the freelancer's email in the 'View Applicants' section of the respective gig. Use their email to contact them directly.",
    },
    {
      question: "What file types are allowed for cover letters and resumes?",
      answer:
        "We accept cover letters and resumes in PDF, DOC, and DOCX formats. Ensure your files adhere to these formats for successful uploads.",
    },
  ];

  // State to track the open FAQ index
  const [openIndex, setOpenIndex] = useState(null);

  // Function to toggle FAQ answer
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      style={{
        backgroundColor: "#F9F9F9",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <section
        style={{
          width: "90%",
          maxWidth: "1000px",
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.15)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "1.6rem",
            color: "#333",
            marginBottom: "30px",
          }}
        >
          Frequently Asked Questions
        </h2>

        <div>
          {faqData.map((faq, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
                marginBottom: "20px",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
            >
              {/* Question Section */}
              <div
                onClick={() => toggleFaq(index)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 25px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  background: "#C6D6C6",
                  borderRadius: "12px",
                  color: "#666464",
                }}
              >
                <span>{faq.question}</span>
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {/* Answer Section (Collapsible) */}
              {openIndex === index && (
                <div
                  style={{
                    backgroundColor: "#F5F5F5",
                    padding: "18px 25px",
                    fontSize: "1rem",
                    color: "#444",
                    borderTop: "1px solid #ddd",
                    textAlign: "left",
                  }}
                >
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Faq;
