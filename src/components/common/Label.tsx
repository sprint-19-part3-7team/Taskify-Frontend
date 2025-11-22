import type { ComponentPropsWithoutRef } from 'react';

interface LabelProps extends ComponentPropsWithoutRef<'label'> {
  htmlFor?: string; // 연결할 input id
  children: React.ReactNode;
}

export default function Label({ htmlFor, children, className, ...props }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={className} {...props}>
      {children}
    </label>
  );
}
