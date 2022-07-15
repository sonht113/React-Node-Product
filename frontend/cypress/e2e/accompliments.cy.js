describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
  it('Does not do much!', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Ô Tô').click()
    cy.url().should('include', '?category=car')
    cy.get('input').type('a').should('have.value', 'a')
  })
})