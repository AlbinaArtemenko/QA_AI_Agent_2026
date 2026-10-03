import { test, expect } from '@playwright/test';

test('guest can add a car to Garage', async ({ page }) => {
  // Preparation: reuse the verified guest login flow from tests/guest-garage.spec.ts (baseline).
  await page.goto('/');
  await page.getByRole('button', { name: /guest log in/i }).click();
  await expect(page).toHaveURL(/panel\/garage/);
  await expect(page.getByRole('heading', { name: /garage/i })).toBeVisible();

  // Main scenario: Add car -> Audi -> TT -> Mileage 12000.
  // Locators confirmed via Playwright CLI generate-locator against the live UI:
  //   e122/e136 -> getByRole('button', { name: 'Add car' })
  //   e149      -> getByLabel('Brand')
  //   e152      -> getByLabel('Model')
  //   e156      -> getByRole('spinbutton', { name: 'Mileage' })
  //   e161      -> getByRole('button', { name: 'Add' })
  await page.getByRole('button', { name: 'Add car' }).click();
  await page.getByLabel('Brand').selectOption('Audi');
  await page.getByLabel('Model').selectOption('TT');
  await page.getByRole('spinbutton', { name: 'Mileage' }).fill('12000');
  await page.getByRole('button', { name: 'Add' }).click();

  // Main result: Audi TT appears in Garage.
  await expect(page).toHaveURL(/panel\/garage/);
  await expect(page.getByText('Audi TT')).toBeVisible();
});
