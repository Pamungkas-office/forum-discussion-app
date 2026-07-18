/**
 * Skenario E2E Login
 *
 * - Login dengan credential yang salah menampilkan pesan error
 * - Register user baru, kemudian login dan redirect ke halaman utama
 */

describe('Login flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('harus menampilkan pesan error ketika login gagal', () => {
    cy.get('input[type="email"]').type('salah@test.com');
    cy.get('input[type="password"]').type('password_salah');

    cy.get('button[type="submit"]').click();

    cy.contains(/email or password/i).should('be.visible');
  });

  it('harus mengarahkan ke halaman utama ketika login berhasil', () => {
    const timestamp = Date.now();
    const email = `user${timestamp}@test.com`;
    const password = 'test123456';
    const name = 'Test User';

    cy.visit('/register');
    cy.get('#name').type(name);
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('include', '/login');

    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/');
  });
});
