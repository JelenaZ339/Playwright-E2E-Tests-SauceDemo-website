import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';
import { ProductsPage } from '../pageObjects/ProductsPage';
import { CartPage } from '../pageObjects/CartPage';
import { CheckoutPage } from '../pageObjects/CheckoutPage';

test.describe('Negative Checkout Tests', () => {

test('should show error when checkout fields are empty', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login and add a product
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.addProducts(1);
  await productsPage.goToCart();
  await cartPage.proceedToCheckout();

  // Submit checkout with empty fields
  await checkoutPage.fillCheckoutForm('', '', '');

  // Check error message
  await expect(checkoutPage.errorMessage).toBeVisible();
  await expect(checkoutPage.errorMessage).toHaveText(/First Name is required/); 
});

test('should handle nonsense input in checkout fields', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.addProducts(1);
  await productsPage.goToCart();
  await cartPage.proceedToCheckout();

  await checkoutPage.fillCheckoutForm('12345', '@!#$', 'abcd');
  await checkoutPage.finishPurchase();
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    });
    
});