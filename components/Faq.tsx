"use client";

import { useRef, useState } from "react";

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList arrayy below.

interface FAQItemProps {
  question: string;
  answer: any;
}

const faqList: FAQItemProps[] = [
  {
    question: "How can I convert my AVIF images to PNG?",
    answer: <div className="space-y-2 leading-relaxed">First click the `Select the file` button, select your AVIF file to upload. Select any configuration options. When the AVIF to PNG conversion has completed, you can download your PNG file straight away.</div>,
  },
  {
    question: "Why Convert AVIF images to PNG?",
    answer: (
      <p>
        While AVIF offers superior compression and image quality, it is not universally supported by all browsers and image editing software. PNG remains a universally compatible format, making it a more reliable choice for various applications, especially where transparency and broad.
      </p>
    ),
  },
  {
    question: "What are the benefits of converting AVIF to PNG?",
    answer: (
      <div className="space-y-2 leading-relaxed">Converting AVIF to PNG can be beneficial if you need to use the images in applications that do not support AVIF format. PNG is widely supported across different platforms and browsers, making it a versatile choice for image sharing.</div>
    ),
  },
  {
    question: "Can I convert AVIF to PNG format?",
    answer: (
      <div className="space-y-2 leading-relaxed">Yes, you can convert AVIF to PNG format using our online converters. Keep in mind that the conversion may result in larger file sizes since PNG is a lossless format.</div>
    ),
  },
  {
    question: "What is AVIF?",
    answer: (
      <div className="space-y-2 leading-relaxed">AVIF, short for AV1 Image File Format, is a relatively new image format that offers high-quality images at smaller file sizes compared to traditional formats like JPEG and PNG. Developed from the AV1 video codec, AVIF supports advanced features such as High Dynamic Range (HDR) and Wide Color Gamut (WCG), making it ideal for vibrant and data-efficient web visuals</div>
    ),
  },
  {
    question: "What is PNG?",
    answer: (
      <div className="space-y-2 leading-relaxed">PNG, or Portable Network Graphics, is a widely-used image format known for its lossless compression, meaning it retains high image quality even after compression. It is especially popular for images requiring transparency, such as logos and graphics with anti-aliased edges.</div>
    ),
  },
];

const FaqItem = ({ item }: { item: FAQItemProps }) => {
  const accordion = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-base-content ${isOpen ? "text-primary" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section className="" id="faq">
      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="inline-block font-semibold text-primary mb-4">FAQ</p>
          <p className="sm:text-4xl text-3xl font-extrabold text-base-content">
            Frequently Asked Questions
          </p>
        </div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
