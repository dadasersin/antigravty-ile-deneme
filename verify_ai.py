import asyncio
from playwright.async_api import async_playwright

async def verify_ai_features():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        # Go to the local server
        await page.goto("http://0.0.0.0:3000")
        await page.wait_for_load_state("networkidle")
        
        # Verify AI Chat is visible
        await page.wait_for_selector("#floating-chat:not(.hidden)")
        await page.screenshot(path="verify_ai_visible.png")
        print("AI Chat is visible by default.")
        
        # Test AI Command (Theme change)
        await page.fill("#ai-input", "Temayı kırmızı yap")
        await page.press("#ai-input", "Enter")
        
        # Wait for AI response (typing indicator then message)
        await asyncio.sleep(2)
        await page.wait_for_selector(".ai-message:has-text('kırmızı')")
        
        # Verify theme class
        is_red = await page.evaluate("document.body.classList.contains('theme-red')")
        if is_red:
            print("AI Command: Theme changed to red successfully.")
        else:
            print("AI Command: Theme change failed.")
        
        await page.screenshot(path="verify_ai_command_red.png")
        
        # Test Search simulation
        await page.fill("#ai-input", "Bitcoin nedir?")
        await page.press("#ai-input", "Enter")
        await asyncio.sleep(3)
        await page.wait_for_selector(".ai-message:has-text('İnternet üzerinde')")
        print("AI Search: Search simulation verified.")
        
        await page.screenshot(path="verify_ai_search.png")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_ai_features())
