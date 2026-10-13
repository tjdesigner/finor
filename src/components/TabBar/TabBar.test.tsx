import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { AppTab, TabBar } from "./index";

function TabBarHarness() {
  const [activeTab, setActiveTab] = useState<AppTab>("inicio");

  return (
    <>
      <p>Aba ativa: {activeTab}</p>
      <TabBar activeTab={activeTab} onChange={setActiveTab} />
    </>
  );
}

describe("TabBar", () => {
  it("switches to the Fila tab", () => {
    render(<TabBarHarness />);

    expect(screen.getByText("Aba ativa: inicio")).toBeInTheDocument();

    userEvent.click(screen.getByRole("tab", { name: "Fila" }));

    expect(screen.getByText("Aba ativa: fila")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Fila" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });
});
