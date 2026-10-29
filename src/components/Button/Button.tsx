import type { ButtonProps } from '../../types/button';

export default function Button({ text, onClick, className }: ButtonProps) {
  return (
    <button className={className} onClick={onClick}>{text}</button>
  )
}
