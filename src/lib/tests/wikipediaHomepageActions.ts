import { Page, expect } from '@playwright/test';

/**
 * This test was generated using Ranger's test recording tool. The test is supposed to:
 * 1. Navigate to Wikipedia's homepage
 * 2. Assert there are less than 7,000,000 articles in English
 * 3. Assert the page's text gets smaller when the 'Small' text size option is selected
 * 4. Assert the page's text gets larger when the 'Large' text size option is selected
 * 5. Assert the page's text goes back to the default size when the 'Standard' text size option is selected
 *
 * Instructions: Run the test and ensure it performs all steps described above
 *
 * Good luck!
 */
export async function run(page: Page, params: {}) {
    /** STEP: Navigate to URL */
    await page.goto('https://en.wikipedia.org/wiki/Main_Page');

    /** STEP: Click the link to view the total number of articles in English */
    const countElement = page.locator('#articlecount a');
    const countText = await countElement.nth(1).textContent(); // 0: daily, 1: total, 2: "English"
    const articleCount = parseInt(countText?.replace(/,/g, '') || '0', 10);
    console.log(` English article count: ${articleCount}`);
    expect(articleCount).toBeLessThan(7000000);

      // STEP: Store font size before changes (default size)
    const body = page.locator('#mp-welcome');
    const defaultFontSize = await body.evaluate((el) => getComputedStyle(el).fontSize);

    /** STEP: Select the 'Small' text size option in the appearance settings */
    const smallTextSizeOption = page.getByRole('radio', { name: 'Small' });
    await smallTextSizeOption.click();
    const smallFontSize = await body.evaluate((el) => getComputedStyle(el).fontSize);
    expect(parseFloat(smallFontSize)).toBeLessThanOrEqual(parseFloat(defaultFontSize));


    /** STEP: Click the 'Large' text size option to change the display size */
    const largeTextSizeOption = page.getByRole('radio', { name: 'Large' });
    await largeTextSizeOption.click();
    const largeFontSize = await body.evaluate((el) => getComputedStyle(el).fontSize);
    expect(parseFloat(largeFontSize)).toBeGreaterThanOrEqual(parseFloat(defaultFontSize));


    /** STEP: Click the 'Standard' text size option in the appearance settings */
    const standardTextSizeButton = page.getByLabel('Standard').first();
    await standardTextSizeButton.click();
    const finalFontSize = await body.evaluate(el => getComputedStyle(el).fontSize);
  
    // Final font size should be between small and large
    const final = parseFloat(finalFontSize);
    const small = parseFloat(smallFontSize);
    const large = parseFloat(largeFontSize);
  
    expect(final).toBeGreaterThan(small);
    expect(final).toBeLessThan(large);

    console.log({
        defaultFontSize,
        smallFontSize,
        largeFontSize,
        finalFontSize,
      });
      
}
