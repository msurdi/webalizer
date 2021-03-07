describe("Run a command", () => {
  beforeEach(() => {
    cy.login("testuser", "testpassword");
    cy.visit("/");
  });

  it("Lists available scripts", () => {
    cy.contains("Echo command");
    cy.contains("Run command");
  });

  it("Runs the echo command", () => {
    // Does not show clear button by default
    cy.contains("Clear").should("not.exist");

    // Does not show output by default
    cy.contains("Exit code").should("not.exist");

    // Setup confirmation dialog response
    const stub = cy.stub();
    stub.onFirstCall().returns(true);
    cy.once("window:confirm", stub);

    // Click button to run the command
    cy.contains("button", "Echo button")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("Run echo?");
      });

    // Verify output is as expected
    cy.contains("Exit status code: 0");
    cy.contains("this is the command output");

    // Clear output
    cy.contains("Clear").click();

    // Verify clearing the output worked as expected
    cy.contains("Clear").should("not.exist");
    cy.contains("Exit status code: 0").should("not.exist");
    cy.contains("this is the command output").should("not.exist");
  });
});
