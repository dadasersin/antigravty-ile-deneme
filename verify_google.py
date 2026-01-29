import asyncio
from playwright.async_api import async_playwright

async def verify_google_apps():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        await page.goto("http://0.0.0.0:3000")
        await page.wait_for_load_state("networkidle")
        
        # 1. Click on Google Apps in Sidebar
        print("Clicking on Google Uygulamaları sidebar item...")
        await page.click("button[data-module='google-apps']")
        await asyncio.sleep(2) # Wait for simulation delay
        
        # 2. Check for App Cards
        app_count = await page.locator(".app-card").count()
        print(f"Found {app_count} Google/AI apps.")
        
        if app_count > 0:
            print("Google Apps module rendered successfully.")
            # Check for specific app
            has_gemini = await page.locator("text=Gemini AI").count() > 0
            print(f"Gemini app found: {has_gemini}")
            
            # Check for the NEW Quantum Drive Project
            has_drive_project = await page.locator("text=Quantum Drive Projesi").count() > 0
            print(f"Quantum Drive Project found: {has_drive_project}")
        else:
            print("Google Apps module failed to render.")

        # 3. Test AI Command for Google Apps
        await page.fill("#ai-input", "Google ekosistemine git")
        await page.press("#ai-input", "Enter")
        await asyncio.sleep(2)
        
        module_title = await page.inner_text("#current-module-title")
        print(f"Current module after AI command: {module_title}")

        await page.screenshot(path="verify_google_apps_updated.png")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_google_apps())
