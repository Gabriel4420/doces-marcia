export interface LogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const Logo = ({ className = '', width = 64, height = 64 }: LogoProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ width, height }}>
      <img
        src="/logo.svg"
        alt="Logo Doces da Márcia"
        width={width}
        height={height}
        className="object-contain"
        draggable={false}
      />
    </div>
  );
};
