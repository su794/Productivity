import React from 'react';
import type { IconType } from 'react-icons';

type FilterButtonProps = {
  text: React.ReactNode;
  onClick: () => any;
  className?: string;
};

export default function Button({ text, onClick, className }: FilterButtonProps) {
  return (
    <button className={className} onClick={onClick}>{text}</button>
  )
}
