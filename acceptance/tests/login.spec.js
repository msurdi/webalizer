describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Logs in with correct username and password", () => {
    // Shows login prompt in the home
    cy.contains("Please, sign in");

    // Shows the login page when clicking the sign in link
    cy.contains("Please, sign in").click();
    cy.location("pathname").should("equal", "/auth/signin");

    // Does not login with incorrect username
    cy.login("wrong", "testpassword");
    cy.contains("Oops...");

    // Does not login with incorrect password
    cy.login("testuser", "wrong");
    cy.contains("Oops...");

    // Login succeeds with correct username and password
    cy.login("testuser", "testpassword");
    cy.contains("Oops...").should("not.exist");
    cy.contains("Echo command");
  });
});
