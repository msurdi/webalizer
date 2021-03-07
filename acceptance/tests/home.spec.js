describe("Home view", () => {
  beforeEach(() => {
    cy.login("testuser", "testpassword");
    cy.visit("/");
  });

  it("Lists available scripts", () => {
    cy.contains("Echo command");
    cy.contains("Run command");
  });
});
