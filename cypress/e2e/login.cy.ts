describe("Login and Logout", () => {
  beforeEach(() => {
    cy.visit('https://practicetestautomation.com/')
  })


  context("Home Page validation", () => {
    it('the logo is shown', () => {
      // logo
      cy.get('.custom-logo').should('exist')
//      cy.get('.custom-logo').invoke('attr', 'alt')
//          .contains('Practice Test Automation')
//        cy.get('.custom-logo').invoke('attr', 'src')
//          .contains("Logo-1.png")
      //cy.get('ul[id="menu-primary-items"]').find("li").eq(1).click()
    })

    it("menu is in place", () => {
      // menu_bar
      cy.get('#menu-primary-items').should('exist')
      cy.get('ul[id="menu-primary-items"]').find("li").eq(0).should('exist').find('a').contains("Home")
      cy.get('ul[id="menu-primary-items"]').find("li").eq(1).should('exist').find('a').contains("Practice")
      cy.get('ul[id="menu-primary-items"]').find("li").eq(2).should('exist').find('a').contains("Courses")
      cy.get('ul[id="menu-primary-items"]').find("li").eq(3).should('exist').find('a').contains("Blog")
      cy.get('ul[id="menu-primary-items"]').find("li").eq(4).should('exist').find('a').contains("Contact")
      cy.get('ul[id="menu-primary-items"]').find("li").eq(5).should('not.exist')
    })
  })

  context("Practice page validation", () => {
    it("Navigating to Practice page", () => {
      cy.get('ul[id="menu-primary-items"]').find("li").eq(1).click()
      cy.get("h1").contains("Practice")
      cy.location("pathname").should("eq", "/practice/")
    })

    it("Verifying practice options", () => {
      cy.get('ul[id="menu-primary-items"]').find("li").eq(1).click()
      
      cy.get('div[class="post-content"]')
        .get("div").eq(0).should('exist')
        .get("div").eq(0).should('exist')
        .get('p').should('exist')
        .get('a').should('exist').contains('Test Login Page')
      
      cy.get('div[class="post-content"]')
        .get("div").eq(1).should('exist')
        .get("div").eq(0).should('exist')
        .get('p').should('exist')
        .get('a').should('exist').contains('Test Exceptions')
    })
  })

  context("Testing Successful Login and Logout", () => {
    it.only("Navigating to Login page", () => {
      cy.get('ul[id="menu-primary-items"]').find("li").eq(1).click()
      cy.get('.wp-container-core-columns-is-layout-1 > [style="flex-basis:33.33%"] > p > a').click()
      cy.get("h2").contains("Test login")
      cy.location("pathname").should("eq", "/practice-test-login/")
    })

    it.only("Successful Login action", () => {
      cy.get('ul[id="menu-primary-items"]').find("li").eq(1).click()
      cy.get('.wp-container-core-columns-is-layout-1 > [style="flex-basis:33.33%"] > p > a').click()

      cy.get('#username').should('exist')
      cy.get('#password').should('exist')
      cy.get('#submit').should('exist')

      cy.get('#username').type('student')
      cy.get('#password').type('Password123')

      cy.get('#submit').click()
      cy.location("pathname").should("eq", "/logged-in-successfully/")
      cy.get('#error').should('not.exist')

      cy.get('.post-title').should('exist').contains("Logged In Successfully")
      cy.get('strong').should('exist').contains("Congratulations student. You successfully logged in!")
      cy.get('.wp-block-button__link').should('exist').contains("Log out")
    })

    it.only("Successful Logout action", () => {
      cy.get('ul[id="menu-primary-items"]').find("li").eq(1).click()
      cy.get('.wp-container-core-columns-is-layout-1 > [style="flex-basis:33.33%"] > p > a').click()

      cy.get('#username').should('exist').type('student')
      cy.get('#password').should('exist').type('Password123')
      cy.get('#submit').should('exist').click()

      cy.location("pathname").should("eq", "/logged-in-successfully/")
      cy.get('#error').should('not.exist')
      cy.get('.post-title').should('exist').contains("Logged In Successfully")
      cy.get('strong').should('exist').contains("Congratulations student. You successfully logged in!")
      cy.get('.wp-block-button__link').should('exist').contains("Log out").click()

      cy.location("pathname").should("eq", "/practice-test-login/")
    })

    it.only("Login action - username / password error", () => {
      cy.get('ul[id="menu-primary-items"]').find("li").eq(1).click()
      cy.get('.wp-container-core-columns-is-layout-1 > [style="flex-basis:33.33%"] > p > a').click()

      cy.get('#username').should('exist').type('student1')
      cy.get('#password').should('exist').type('Password123')
      cy.get('#submit').should('exist').click()

      cy.location("pathname").should("eq", "/practice-test-login/")
      cy.get('#error').should('exist').contains("Your username is invalid!")

      cy.get('#username').should('exist').type('student')
      cy.get('#password').should('exist').type('Password1234')
      cy.get('#submit').should('exist').click()

      cy.location("pathname").should("eq", "/practice-test-login/")
      cy.get('#error').should('exist').contains("Your password is invalid!")
    })
  })
})