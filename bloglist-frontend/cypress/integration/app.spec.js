describe('App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('opens frontpage', function() {
    cy.contains('Bloglist')
  })

  it('log in', function() {
    cy.get('input:first').type('test')
    cy.get('input:last').type('test')
    cy.contains('Sign In').click()
    cy.contains('Test User')
  })

  it('add new blog', function() {
    cy.get('input:first').type('test')
    cy.get('input:last').type('test')
    cy.contains('Sign In').click()
    cy.contains('Test User')
    cy.get('div#newBlog > button').click()
    cy.get('input#author').type('Cypress user')
    cy.get('input#title').type('Best Practices')
    cy.get('input#url').type(
      'https://docs.cypress.io/guides/references/best-practices.html'
    )
    cy.contains('Submit').click()
    cy.contains('Best Practices')
  })
})
