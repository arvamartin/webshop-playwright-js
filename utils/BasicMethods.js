
class BasicMethods {
    static async navigate(page, url) {
      await page.goto(url, {
         waitUntil: "networkidle"
      });
    }
  
    static async confirm(page) {
      await page.once('dialog', async dialog => {
        await dialog.accept();
      });
    }
  }
  
  export default BasicMethods;
  