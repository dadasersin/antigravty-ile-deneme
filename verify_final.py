import asyncio
from playwright.async_api import async_playwright
import os

async def verify_ui():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()
        
        # Open the local file
        file_path = f"file://{os.getcwd()}/index.html"
        await page.goto(file_path)
        
        # Dashboard
        await page.wait_for_timeout(1000)
        await page.screenshot(path="verify_dashboard.png")
        
        # Crypto
        await page.click("button[data-module='crypto-bot']")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="verify_crypto.png")
        
        # App Builder
        await page.click("button[data-module='app-builder']")
        await page.wait_for_timeout(1000)
        await page.click("text=Buton")
        await page.wait_for_timeout(500)
        await page.screenshot(path="verify_builder.png")
        
        # Requests & Modal
        await page.click("button[data-module='requests']")
        await page.wait_for_timeout(1000)
        await page.click("text=Yeni İstek")
        await page.wait_for_timeout(500)
        await page.screenshot(path="verify_modal_open.png")
        
        # Close Modal
        await page.click("text=İptal")
        await page.wait_for_timeout(500)
        
        # AI Chat
        await page.click(".ai-toggle-btn")
        await page.wait_for_timeout(500)
        await page.screenshot(path="verify_ai_open.png")
        
        await browser.close()
        print("Verification completed successfully.")

if __name__ == "__main__":
    asyncio.run(verify_ui())
