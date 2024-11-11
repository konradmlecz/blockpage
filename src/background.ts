chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    console.log("Tab activated", tab.url, activeInfo);
    if (!tab.url) return;

    // Execute script when tab is activated
    await chrome.scripting.executeScript({
      target: { tabId: activeInfo.tabId },
      func: () => {
        // Your script logic here
        console.log("Tab script executed!", tab.url);
      },
    });
  } catch (error) {
    console.error("Error executing script:", error);
  }
});

// Optional: Also listen for tab updates
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log("Tab updated", tab, changeInfo);
  if (changeInfo.status === "complete" && tab.url) {
    await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        // Your script logic here
        console.log("Tab updated script executed!", tab.url);
      },
    });
  }
});
