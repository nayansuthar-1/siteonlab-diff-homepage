export type ServiceIconName =
  | "megaphone"
  | "spark"
  | "pen"
  | "cart"
  | "chart"
  | "search"
  | "bag"
  | "share"
  | "layout"
  | "code"
  | "wordpress";

type ServiceIconProps = {
  name: ServiceIconName;
  className?: string;
};

export default function ServiceIcon({ name, className }: ServiceIconProps) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      {name === "megaphone" && (
        <>
          <path {...common} d="M3 11v2a2 2 0 0 0 2 2h2l4 5v-5l8 3V6l-8 3H5a2 2 0 0 0-2 2Z" />
          <path {...common} d="M19 9a3 3 0 0 1 0 6" />
        </>
      )}
      {name === "spark" && (
        <>
          <path {...common} d="M12 2l1.8 5.1L19 9l-5.2 1.9L12 16l-1.8-5.1L5 9l5.2-1.9L12 2Z" />
          <path {...common} d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
        </>
      )}
      {name === "pen" && (
        <>
          <path {...common} d="M12 20h9" />
          <path {...common} d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
        </>
      )}
      {name === "cart" && (
        <>
          <path {...common} d="M3 3h2l2.3 11.2A2 2 0 0 0 9.2 16H18a2 2 0 0 0 1.9-1.4L22 7H6" />
          <circle cx="9" cy="20" r="1.4" fill="currentColor" />
          <circle cx="18" cy="20" r="1.4" fill="currentColor" />
        </>
      )}
      {name === "chart" && (
        <>
          <path {...common} d="M4 19V5" />
          <path {...common} d="M4 19h16" />
          <path {...common} d="M8 15l3-4 3 2 5-7" />
        </>
      )}
      {name === "search" && (
        <>
          <circle {...common} cx="10.5" cy="10.5" r="6.5" />
          <path {...common} d="M16 16l5 5" />
          <path {...common} d="M8 10.5h5" />
        </>
      )}
      {name === "bag" && (
        <>
          <path {...common} d="M6 7h12l1 14H5L6 7Z" />
          <path {...common} d="M9 7a3 3 0 0 1 6 0" />
        </>
      )}
      {name === "share" && (
        <>
          <circle {...common} cx="18" cy="5" r="3" />
          <circle {...common} cx="6" cy="12" r="3" />
          <circle {...common} cx="18" cy="19" r="3" />
          <path {...common} d="M8.6 10.5l6.8-4" />
          <path {...common} d="M8.6 13.5l6.8 4" />
        </>
      )}
      {name === "layout" && (
        <>
          <rect {...common} x="3" y="4" width="18" height="16" rx="2" />
          <path {...common} d="M3 9h18" />
          <path {...common} d="M9 9v11" />
        </>
      )}
      {name === "code" && (
        <>
          <path {...common} d="M8 9l-4 3 4 3" />
          <path {...common} d="M16 9l4 3-4 3" />
          <path {...common} d="M14 5l-4 14" />
        </>
      )}
      {name === "wordpress" && (
        <>
          <circle {...common} cx="12" cy="12" r="9" />
          <path {...common} d="M7 8c1.4 4 2.8 8 4.2 12" />
          <path {...common} d="M17 8l-3.7 12" />
          <path {...common} d="M6.5 8h3.5" />
          <path {...common} d="M13.5 8H18" />
        </>
      )}
    </svg>
  );
}
