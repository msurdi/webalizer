describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Shows login prompt in the home", () => {
    cy.contains("Please, sign in");
  });

  it("Shows the login page when clicking the sign in link", () => {
    cy.contains("Please, sign in").click();

    cy.location("pathname").should("equal", "/auth/signin");
  });

  it("Does not login with incorrect username", () => {
    cy.login("wrong", "testpassword");

    cy.contains("Oops...");
  });

  it("Does not login with incorrect password", () => {
    cy.login("testuser", "wrong");

    cy.contains("Oops...");
  });

  it("Logs in with correct username and password", () => {
    cy.login("testuser", "testpassword");

    cy.contains("Oops...").should("not.exist");
    cy.contains("Echo a word to a file");
  });
});
