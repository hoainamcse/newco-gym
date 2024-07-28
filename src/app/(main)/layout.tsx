import React from "react";

import Nav from "./_components/nav";

function Dashboard({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Nav />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}

export default Dashboard;
