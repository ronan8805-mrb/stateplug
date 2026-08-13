import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-line bg-void">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <img src="/logo.webp" alt="STATE PLUG" className="h-16 w-auto" />
          <p className="mt-4 max-w-sm text-sm text-fog">
            Los Angeles based. Globally recognized. The only plug you'll
            ever need.
          </p>
          <p className="mt-3 font-display text-sm tracking-[0.2em] text-neon">
            Plug in. Power up. Stay charged.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:col-span-4">
          <div>
            <p className="font-display text-[11px] tracking-[0.28em] text-dim">
              Navigate
            </p>
            <ul className="mt-3 space-y-2 text-sm text-fog">
              <li>
                <Link to="/shop" className="hover:text-neon">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/lookbook" className="hover:text-neon">
                  Lookbook
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-neon">
                  The Plug
                </Link>
              </li>
              <li>
                <Link to="/find" className="hover:text-neon">
                  Find your plug
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display text-[11px] tracking-[0.28em] text-dim">
              Connect
            </p>
            <ul className="mt-3 space-y-2 text-sm text-fog">
              <li>
                <Link to="/contact" className="hover:text-neon">
                  Request a connect
                </Link>
              </li>
              <li>
                <a
                  href="https://instagram.com/stateplug"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-neon"
                >
                  <Instagram className="size-3.5" />
                  @stateplug
                </a>
              </li>
              <li>
                <Link to="/login" className="hover:text-neon">
                  Account
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="flex items-start gap-3 rounded-lg border border-line bg-surface p-4">
            <span
              className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-sm border border-warn text-[10px] font-bold text-warn"
              aria-hidden="true"
            >
              21+
            </span>
            <p className="text-[11px] leading-relaxed text-dim">
              For use only by adults 21 years of age and older. Keep out of
              reach of children and animals. Please consume responsibly.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-[11px] leading-relaxed text-dim sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} STATE PLUG. Los Angeles.</p>
          <p className="max-w-xl sm:text-right">
            GOVERNMENT WARNING: THIS PRODUCT CONTAINS CANNABIS, A SCHEDULE I
            CONTROLLED SUBSTANCE. CANNABIS PRODUCTS MAY ONLY BE POSSESSED OR
            CONSUMED BY PERSONS 21 YEARS OF AGE OR OLDER UNLESS THE PERSON IS A
            QUALIFIED PATIENT.
          </p>
        </div>
      </div>
    </footer>
  );
}
