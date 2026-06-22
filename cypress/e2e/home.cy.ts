describe("Home page", () => {
  it("loads successfully", () => {
    cy.visit("/");
    cy.get("main").should("exist");
  });
});
