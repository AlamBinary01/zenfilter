function fetchBlockedUrlsAndStore(){chrome.storage.local.get(["token"],(function(e){const o=e.token;o?fetch("http://localhost:5000/getBlockedUrls",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`}}).then((e=>e.json())).then((e=>{"ok"===e.status&&e.blockedUrls&&chrome.storage.local.set({blockedUrls:e.blockedUrls})})).catch((e=>console.error("Error fetching blocked URLs:",e))):console.log("No token found in storage.")}))}function fetchCustomPreferencesAndStore(){chrome.storage.local.get(["token"],(function(e){const o=e.token;o?fetch("http://localhost:5000/getCustomPreferences",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`}}).then((e=>e.json())).then((e=>{"ok"===e.status&&e.customPreferences&&chrome.storage.local.set({customPreferences:e.customPreferences})})).catch((e=>console.error("Error fetching custom preferences:",e))):console.log("No token found in storage.")}))}chrome.runtime.onInstalled.addListener((()=>{fetchBlockedUrlsAndStore()})),chrome.runtime.onStartup.addListener((()=>{fetchBlockedUrlsAndStore()})),setInterval(fetchBlockedUrlsAndStore,3e4),chrome.tabs.onUpdated.addListener(((e,o,t)=>{"complete"===o.status&&t.url&&chrome.storage.local.get(["blockedUrls","customPreferences"],(o=>{const{blockedUrls:r=[],customPreferences:c=[]}=o,s=r.some((e=>t.url.includes(e))),n=c.some((e=>t.url.includes(e)));(s||n)&&chrome.tabs.update(e,{url:"./dashboard.html"})}))}));