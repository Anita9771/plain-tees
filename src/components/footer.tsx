import Link from "next/link";

const WHATSAPP_LINK = "https://wa.me/2345678909876";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-outline/60 bg-[#0B0C0E] py-10 text-subtext">
      <div className="container mx-auto flex flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-subtext/70">Plain Tee</p>
          <p className="text-sm text-subtext/80">Minimal everyday essentials.</p>
        </div>
        <div className="flex gap-6 text-sm">
          <Link href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="hover:text-text">
            WhatsApp
          </Link>
          <Link href="mailto:ieghonghon@gmail.com" className="hover:text-text">
            Email
          </Link>
        </div>
        <p className="text-xs text-subtext/60">© {year} Plain Tee Collective</p>
      </div>
    </footer>
  );
}

