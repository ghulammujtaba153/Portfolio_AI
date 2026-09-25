import { profile } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line section-pad py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
          <p className="text-sm text-subtle">
            {profile.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
