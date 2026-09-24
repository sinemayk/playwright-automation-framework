import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe("Login", () => {
    test("gecerli kullanici ile giris yapar ve urun listesini gorur", async({page}) =>{
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.open();
        await loginPage.login(
            process.env.SAUCE_USERNAME!,
            process.env.SAUCE_PASSWORD!
        );
        await inventoryPage.expectItemCount(6);

    });

    test("gecersiz sifre ile hata mesaji gorunur", async({page}) =>{
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await loginPage.login(process.env.SAUCE_USERNAME!, "yanlis_sifre");
        await loginPage.expectErrorVisible();
     });
})