interface Props {
  subtitle: string;
  description: string;
}

export function Subtitle({ subtitle, description }: Props) {
  return (
    <div
      style={{
        gap: "12px",
        display: "flex",
        alignItems: "baseline",
      }}
    >
      <h3>{subtitle}</h3>
      <p
        style={{
          opacity: 0.7,
        }}
      >
        {description}
      </p>
    </div>
  );
}
