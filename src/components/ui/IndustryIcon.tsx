export type IndustryIconName =
  | "travel"
  | "retail"
  | "healthcare"
  | "law"
  | "jewellery";

type IndustryIconProps = {
  name: IndustryIconName;
  className?: string;
};

export default function IndustryIcon({ name, className }: IndustryIconProps) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      {name === "travel" && (
        <>
          <path {...common} d="M3 11l18-8-8 18-2-8-8-2Z" />
          <path {...common} d="M13 13l-4 4" />
        </>
      )}
      {name === "retail" && (
        <>
          <path {...common} d="M6 7h12l1 14H5L6 7Z" />
          <path {...common} d="M9 7a3 3 0 0 1 6 0" />
          <path {...common} d="M9 13h6" />
        </>
      )}
      {name === "healthcare" && (
        <>
          <path {...common} d="M12 21s-8-4.8-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 6.2-8 11-8 11Z" />
          <path {...common} d="M12 8v6" />
          <path {...common} d="M9 11h6" />
        </>
      )}
      {name === "law" && (
        <>
          <path {...common} d="M12 3v18" />
          <path {...common} d="M5 7h14" />
          <path {...common} d="M7 7l-4 7h8L7 7Z" />
          <path {...common} d="M17 7l-4 7h8l-4-7Z" />
          <path {...common} d="M8 21h8" />
        </>
      )}
      {name === "jewellery" && (
        <>
          <path {...common} d="M6.5 4h11L21 9l-9 11L3 9l3.5-5Z" />
          <path {...common} d="M3 9h18" />
          <path {...common} d="M8 4l4 16 4-16" />
          <path {...common} d="M6.5 4L8 9l4-5 4 5 1.5-5" />
        </>
      )}
    </svg>
  );
}
