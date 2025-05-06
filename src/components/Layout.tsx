import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
