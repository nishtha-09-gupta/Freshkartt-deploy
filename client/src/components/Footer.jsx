import { assets, footerLinks } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-[var(--color-primary-light)]/25 rounded-t-3xl">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-12 border-b border-[var(--color-gray-soft)]">
        <div>
          <img className="w-36 md:w-40" src={assets.logo} alt="logo" />
          <p className="max-w-[420px] mt-6 text-[var(--color-text-dark)]/70 leading-relaxed">
            Your trusted store for fresh groceries, lightning-fast delivery,
            and the best prices every day. Making your daily shopping
            seamless and smarter.
          </p>
        </div>

        <div className="flex flex-wrap justify-between w-full md:w-[50%] gap-8">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-[var(--color-text-dark)] text-lg mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm text-[var(--color-text-dark)]/70">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      className="hover:text-[var(--color-primary)] transition"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="py-5 text-center text-sm md:text-base text-[var(--color-text-dark)]/60">
        © {new Date().getFullYear()} FreshKart • All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
