import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return <div className="flex-col px-8">{children}</div>;
}
