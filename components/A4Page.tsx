import type { ReactNode } from "react";

type A4PageProps = {
  children?: ReactNode;
};

export function A4Page({ children }: A4PageProps) {
  return <article className="a4">{children}</article>;
}
