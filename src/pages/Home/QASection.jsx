// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

const questions = [
  {
    question: "How do I add a new book to my bookshelf?",
    answer:
      "Go to your Dashboard, click on 'Add Book', fill in the details like title, author, category, and upload a cover image.",
  },
  {
    question: "Can I edit or delete a book after adding it?",
    answer:
      "Yes. From your profile or bookshelf, find the book card and click the edit or delete icon.",
  },
  {
    question: "What do the reading statuses mean?",
    answer:
      "'Want-to-Read' means you've saved it for later, 'Reading' means you're currently reading it, and 'Read' marks it as completed.",
  },
  {
    question: "How is the 'Popular Books' section calculated?",
    answer:
      "It's based on total upvotes. Books with more community appreciation appear there.",
  },
];

const QASection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 py-16"
    >
      <h2 className="text-3xl font-bold text-primary text-center mb-10 flex items-center justify-center gap-2">
        <HelpCircle size={28} /> Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {questions.map((item, idx) => (
          <div
            key={idx}
            className="collapse collapse-arrow bg-base-100 border border-base-300 shadow-md"
          >
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium text-primary">
              {item.question}
            </div>
            <div className="collapse-content text-sm text-gray-600">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default QASection;
