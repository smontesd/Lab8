# Lab8_Starter

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)  

A  

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.  

I would write a unit test to see if the message is being sent properly and received.  

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters  

I would not write a unit test to see if the max message length feature of a messaging application is working since this seems like something I should test manually to see if it is working as intended.  

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?  

I would expect some tests to fail if it use the Browser UI to be able to perform its tests  

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?  

If we can't navigate by calling goTo() we can have our page click on the settings icon with:  
`await page.click('header > img');`
