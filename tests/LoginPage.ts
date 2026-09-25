import { test ,Page } from '@playwright/test';

export class LoginPage 
{
    username;
    password;
    loginButton;

    constructor (page : Page)
    {
        this.username = page.locator("#username");
        this.password = page.locator("#password");
        this.loginButton = page.locator("#loginbtn")
    }

    async login(username : string , password : string ){
        await this.username.fill(username);
        await this.password.fill(password);  
        await this.loginButton.click();  
    }

}

