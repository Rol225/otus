describe('Работа с корзиной', () => {
    afterEach(() => {
        cy.screenshot();
    });

    it('Добавление товара в корзину', () => {
        cy.intercept('POST', 'https://fakestoreapi.com/auth/login').as('getUserToken');
        cy.intercept('GET', 'https://fakestoreapi.com/products').as('getProducts');
        cy.visit("http://localhost:5173/authorization");

        cy.get('.mainView form').should('be.visible');
        cy.get('input[name="login"]').type("mor_2314");
        cy.get('input[name="password"]').type("83r5^_");
        cy.get('button[type="submit"]').click();

        cy.wait('@getUserToken');
        cy.wait('@getProducts');

        let price_1 = 0;
        let price_2 = 0;

        cy.get('.card[data-id="1"]').filter(':visible').within(() => {
            cy.get('.price').invoke('text').then((priceText) => {
                price_1 = parseFloat(priceText.replace("$", "")) * 2;
            });
            cy.get('.addToBasket').click();
            cy.get('.addToBasket').click();
        });

        cy.get('.card[data-id="2"]').filter(':visible').within(() => {
            cy.get('.price').invoke('text').then((priceText) => {
                price_2 = parseFloat(priceText.replace("$", ""));
            });
            cy.get('.addToBasket').click();
        });

        cy.get('.user .inner').click();
        cy.get('.user .basket').click();

        cy.wrap(null).then(() => {
            const totalPrice = price_1 + price_2;
            cy.contains(totalPrice.toFixed(2)).should('be.visible');
        });
    });
});
