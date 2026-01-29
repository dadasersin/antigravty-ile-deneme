import asyncio
from playwright.async_api import async_playwright

async def verify_everything():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        await page.goto("http://0.0.0.0:3000")
        await page.wait_for_load_state("networkidle")
        
        # 1. AI Commands
        await page.fill("#ai-input", "Temayı yeşil yap")
        await page.press("#ai-input", "Enter")
        await asyncio.sleep(2)
        is_green = await page.evaluate("document.body.classList.contains('theme-green')")
        print(f"AI Theme Change (Green): {'Success' if is_green else 'Failed'}")
        
        # Close AI chat to avoid interception
        await page.click(".chat-header .btn-icon") 
        await asyncio.sleep(1)

        # 2. Navigation & Modules
        # App Builder
        await page.click("button[data-module='app-builder']")
        await asyncio.sleep(1)
        await page.click("text=Buton")
        await page.click("text=Resim")
        has_components = await page.locator("#builder-canvas .glass").count() == 2
        print(f"App Builder (Add): {'Success' if has_components else 'Failed'}")
        
        # Crypto Bot
        await page.click("button[data-module='crypto-bot']")
        await asyncio.sleep(1)
        await page.click("text=Stratejiyi Başlat")
        has_log = await page.locator("#crypto-logs div").count() > 1
        print(f"Crypto Bot (Start): {'Success' if has_log else 'Failed'}")
        
        # Requests
        await page.click("button[data-module='requests']")
        await asyncio.sleep(1)
        await page.click("text=Yeni İstek")
        await page.fill("#request-form input", "Test İstek")
        await page.click("button[type='submit']")
        await asyncio.sleep(1)
        has_new_request = await page.locator("td:has-text('Test İstek')").count() > 0
        print(f"Requests (Submit): {'Success' if has_new_request else 'Failed'}")

        await page.screenshot(path="verify_all_final.png")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_everything())
