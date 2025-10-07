import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly addToCartButtons: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButtons = page.locator('button:has-text("Add to cart")');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async addProducts(count: number) {
    const buttons = await this.addToCartButtons.elementHandles();
    for (let i = 0; i < count && i < buttons.length; i++) {
      await buttons[i].click();
    }
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}
