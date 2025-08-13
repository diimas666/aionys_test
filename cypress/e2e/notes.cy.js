describe('Notes E2E (web)', () => {
  it('creates, edits (verifies changes) and deletes note by id', () => {
    cy.intercept('GET', '**/notes').as('getNotes');
    cy.intercept('POST', '**/notes').as('createNote');
    cy.intercept('PUT', '**/notes/*').as('updateNote');
    cy.intercept('DELETE', '**/notes/*').as('deleteNote');

    cy.visit('/');
    cy.wait('@getNotes');

    const title = `Note ${Date.now()}`;
    const content = `Body ${Date.now()}`;

    cy.get('[data-testid="add-btn"]').click();
    cy.get('[data-testid="title-input"]').should('be.visible').clear();
    cy.get('[data-testid="title-input"]').type(title);
    cy.get('[data-testid="content-input"]').should('be.visible').clear();
    cy.get('[data-testid="content-input"]').type(content);
    cy.get('[data-testid="save-btn"]').click();

    cy.wait('@createNote').then(({ response }) => {
      const id = response.body.id;
      expect(id, 'created note id').to.be.a('string');

      cy.get(`[data-testid="note-${id}"]`).as('card');

      cy.get('@card').within(() => {
        cy.get('[data-testid="note-title"]').should('have.text', title);
        cy.contains(content).should('exist');
      });

      const newTitle = `Edited ${Date.now()}`;
      const newContent = `Updated body ${Date.now()}`;

      cy.get('@card').find('[data-testid="edit-btn"]').click();

      cy.get('[data-testid="title-input"]').should('be.visible').clear();
      cy.get('[data-testid="title-input"]').type(newTitle);
      cy.get('[data-testid="content-input"]').should('be.visible').clear();
      cy.get('[data-testid="content-input"]').type(newContent);

      cy.get('[data-testid="save-btn"]').click();
      cy.wait('@updateNote');

      cy.get('@card').within(() => {
        cy.get('[data-testid="note-title"]').should('have.text', newTitle);
        cy.contains(newContent).should('exist');
      });

      cy.get('@card').find('[data-testid="delete-btn"]').click();
      cy.wait('@deleteNote');
      cy.get('@card').should('not.exist');
    });
  });
});
