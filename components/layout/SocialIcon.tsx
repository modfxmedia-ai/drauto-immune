type IconName = "facebook" | "tiktok" | "instagram";

const PATHS: Record<IconName, React.ReactNode> = {
  facebook: (
    <path d="M13.5 21v-7h2.3l.4-2.7h-2.7v-1.7c0-.8.2-1.3 1.4-1.3h1.4V5.9c-.7-.1-1.5-.2-2.4-.2-2.4 0-4 1.4-4 4.1v2.1H7.5V14.7h2.4v6.6a9 9 0 1 1 3.6-.3z" />
  ),
  tiktok: (
    <path d="M16.5 3h-2.7v11.4a2.6 2.6 0 1 1-1.8-2.5v-2.8a5.4 5.4 0 1 0 4.5 5.3V8.9a6.4 6.4 0 0 0 3.7 1.2V7.4c-1.9 0-3.7-1.6-3.7-4.4z" />
  ),
  instagram: (
    <path d="M12 8.3a3.7 3.7 0 1 0 0 7.4 3.7 3.7 0 0 0 0-7.4Zm0 6.1a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8ZM16.1 5H7.9A4.4 4.4 0 0 0 3.5 9.4v5.2A4.4 4.4 0 0 0 7.9 19h8.2a4.4 4.4 0 0 0 4.4-4.4V9.4A4.4 4.4 0 0 0 16.1 5Zm3.1 9.6a3.1 3.1 0 0 1-3.1 3.1H7.9a3.1 3.1 0 0 1-3.1-3.1V9.4a3.1 3.1 0 0 1 3.1-3.1h8.2a3.1 3.1 0 0 1 3.1 3.1v5.2ZM16.7 7.3a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z" />
  ),
};

export default function SocialIcon({ name, className = "h-4 w-4" }: { name: IconName; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      {PATHS[name]}
    </svg>
  );
}
