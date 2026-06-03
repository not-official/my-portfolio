import SectionHeader from "./SectionHeader";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./SocialIcons";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-10 px-4 pb-8 pt-16 sm:px-6 md:px-12 md:pt-20"
    >
      <div className="mx-auto w-full max-w-6xl border-t border-black/20 pt-12 md:pt-14">
        <SectionHeader label="Contact" title="Let's Connect" />

        <div className="relative border-b border-black/30 pb-10 md:min-h-[270px] md:pb-0">
          <div className="flex flex-col items-end gap-4 md:block">
            <a
              href="https://github.com/not-official"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rotate-[-2deg] items-center gap-3 border border-black/70 bg-[#faf9f4] px-6 py-3 font-mono text-lg lowercase tracking-[-0.04em] transition hover:-translate-y-1 hover:border-[#2563eb] hover:text-[#2563eb] md:absolute md:right-24 md:top-0 md:rotate-[-7deg] md:px-8 md:text-xl"
            >
              <GitHubIcon />
              github
            </a>

            <a
              href="https://www.linkedin.com/in/aman-ck-1655bb410/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rotate-[2deg] items-center gap-3 border border-black/70 bg-[#faf9f4] px-6 py-3 font-mono text-lg lowercase tracking-[-0.04em] transition hover:-translate-y-1 hover:border-[#2563eb] hover:text-[#2563eb] md:absolute md:right-0 md:top-16 md:rotate-[3deg] md:px-8 md:text-xl"
            >
              <LinkedInIcon />
              linkedin
            </a>

            <a
              href="mailto:ckaman108@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rotate-[-2deg] items-center gap-3 border border-black/70 bg-[#faf9f4] px-6 py-3 font-mono text-lg lowercase tracking-[-0.04em] transition hover:-translate-y-1 hover:border-[#2563eb] hover:text-[#2563eb] md:absolute md:right-44 md:top-24 md:rotate-[-4deg] md:px-8 md:text-xl"
            >
              <MailIcon />
              email
            </a>
          </div>

          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-[#777] md:absolute md:bottom-8 md:left-0 md:mt-0 md:text-[11px] md:tracking-[0.22em]">
            © Aman CK
          </p>
        </div>
      </div>
    </section>
  );
}