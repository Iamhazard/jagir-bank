import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return <div className="flex flex-1 mx-auto">{children}</div>;
}
