export default function LogoIcon({ size = 96, ...props }: { size?: number; [key: string]: any }) {
  return (
    <img
      src="/assets/logo.png"
      alt="Logo"
      width={size}
      height={size}
      style={{ display: 'block' }}
      {...props}
    />
  );
}
