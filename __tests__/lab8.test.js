describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click('journal-entry');
    let url = await page.url();
    expect(url.includes("/#entry1")).toBeTruthy();
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    let expected = "Entry 1";
    let h1 = await page.$eval("body > header > h1", element => element.textContent);
    expect(h1).toBe(expected);
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    let expected = {
      title: 'You like jazz?',
      date: '4/25/2021',
      content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
      image: {
        src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
        alt: 'bee with sunglasses'
      }
    };
    const entries = await page.$$('journal-entry');
    const data = await entries[0].getProperty('entry');
    const entry1 = await data.jsonValue();
    expect(JSON.stringify(entry1)).toBe(JSON.stringify(expected));
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    let className = await page.$eval("body", element => element.className);
    let expected = "single-entry";
    expect(className).toBe(expected);
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('img');
    let url = await page.url();
    expect(url.includes("/#settings")).toBeTruthy();
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    let expected = "Settings";
    let h1 = await page.$eval("body > header > h1", element => element.textContent);
    expect(h1).toBe(expected);
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    let className = await page.$eval("body", element => element.className);
    let expected = "settings";
    expect(className).toBe(expected);
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    let url = await page.url();
    expect(url.includes("/#entry1")).toBeTruthy();
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button, new URL should be http://127.0.0.1:5500/', async () => {
    await page.goBack();
    let url = await page.url();
    expect(url).toBe("http://127.0.0.1:5500/");
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: On the homepage - checking the header title', async () => {
    let expected = "Journal Entries";
    let h1 = await page.$eval("body > header > h1", element => element.textContent);
    expect(h1).toBe(expected);
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On the Homepage - checking <body> element classes', async () => {
    let className = await page.$eval("body", element => element.className);
    let expected = "";
    expect(className).toBe(expected);
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Click second <journal-entry> see if URL is correct', async () => {
    const entries = await page.click('journal-entry:nth-child(2)');
    let url = await page.url();
    expect(url.includes("/#entry2")).toBeTruthy();
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15', async () => {
    let expected = "Entry 2";
    let h1 = await page.$eval("body > header > h1", element => element.textContent);
    expect(h1).toBe(expected);
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16', async () => {
    let expected = {
      title: 'Run, Forrest! Run!',
      date: '4/26/2021',
      content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
      image: {
        src: 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg',
        alt: 'forrest running'
      }
    };
    const entries = await page.$$('journal-entry');
    const data = await entries[1].getProperty('entry');
    const entry2 = await data.jsonValue();
    expect(JSON.stringify(entry2)).toBe(JSON.stringify(expected));
  });

  // create your own test 17
  it('Test17: Clicking the back button, the new URL should be http://127.0.0.1:5500/', async () => {
    await page.goBack();
    let url = await page.url();
    expect(url).toBe("http://127.0.0.1:5500/");
  });

  // create your own test 18
  it('Test18: Clicking the forward button, the new URL should have /#entry2', async () => {
    await page.goForward();
    let url = await page.url();
    expect(url.includes('/#entry2')).toBeTruthy();
  });

  // create your own test 19
  it('Test19: Clicking the header will take you to home page', async () => {
    await page.click('header > h1');
    let url = await page.url();
    expect(url).toBe("http://127.0.0.1:5500/");
  });

  // create your own test 20
  it('Test20: Click 5th <journal-entry> see if URL is correct', async () => {
    const entries = await page.click('journal-entry:nth-child(5)');
    let url = await page.url();
    expect(url.includes("/#entry5")).toBeTruthy();
  });

});
