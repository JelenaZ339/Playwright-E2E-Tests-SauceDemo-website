import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';
import { ProductsPage } from '../pageObjects/ProductsPage';
import { CartPage } from '../pageObjects/CartPage';
import { CheckoutPage } from '../pageObjects/CheckoutPage';

test.describe('E2E Purchase Flow - SauceDemo', () => {
  test('should complete a purchase successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // 1️. Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);

    // 2️. Add products
    await productsPage.addProducts(2);
    await productsPage.goToCart();

    // 3️. Go to checkout
    await cartPage.proceedToCheckout();

    // 4️. Fill checkout form and finish
    await checkoutPage.fillCheckoutForm('Jelena', 'Zivkovic', '11000');
    await checkoutPage.finishPurchase();
  });
});
