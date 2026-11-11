export type ButtonProps = {
  text: string | React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Made optional with '?'
}