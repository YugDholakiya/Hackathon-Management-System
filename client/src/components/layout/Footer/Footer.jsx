import React from "react";

const FooterLinkSection = ({ title, links }) => (
  <div>
    <p className="font-bold text-gray-900 text-xl">{title}</p>
    <ul className="mt-6 space-y-4 text-base">
      {links.map((link) => (
        <li key={link}>
          <a
            href="#"
            className="text-gray-700 font-semibold transition hover:opacity-75"
          >
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

function Footer() {
  const sections = [
    {
      title: "Community",
      links: [
        "1on1 Coaching",
        "Company Review",
        "Accounts Review",
        "HR Consulting",
        "SEO Optimisation",
      ],
    },
    { title: "Company", links: ["About", "Meet the Team", "Accounts Review"] },
    { title: "Support", links: ["Contact", "FAQs", "Live Chat"] },
  ];

  return (
    <footer className="bg-zinc-200  w-full">
      <div className="flex flex-col items-center justify-center   px-8 pt-8 pb-4    ">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:space-x-96">
          <div className="w-full">
            <div className=" text-4xl font-bold">
              Hackfolic<span className="text-blue-500">.</span>
              <span className="text-green-500">.</span>
              <span className="text-gray-400">.</span>
            </div>
            <p className="mt-4 max-w-xs text-gray-700 text-3xl font-bold  ">
              We love <span className="text-blue-500">software</span> and the{" "}
              <span className="text-green-500">people</span> who build them.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:col-span-2 lg:grid-cols-3 lg:space-x-10 ">
            {sections.map((section) => (
              <FooterLinkSection
                key={section.title}
                title={section.title}
                links={section.links}
              />
            ))}
          </div>
        </div>
        <hr className="w-full mt-5 bg-green-500 h-[0.1rem]" />
        <div className="text-xs text-gray-700 mt-4 text-center">
          © 2022. Company Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
