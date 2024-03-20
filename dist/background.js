function fetchBlockedUrlsAndStore(){chrome.storage.local.get(["token"],(function(e){const t=e.token;t?fetch("http://localhost:5000/getBlockedUrls",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}}).then((e=>e.json())).then((e=>{"ok"===e.status&&e.blockedUrls&&chrome.storage.local.set({blockedUrls:e.blockedUrls})})).catch((e=>console.error("Error fetching blocked URLs:",e))):console.log("No token found in storage.")}))}function fetchCustomPreferencesAndStore(){chrome.storage.local.get(["token"],(function(e){const t=e.token;t?fetch("http://localhost:5000/getCustomPreferences",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}}).then((e=>e.json())).then((e=>{"ok"===e.status&&e.customPreferences&&chrome.storage.local.set({customPreferences:e.customPreferences})})).catch((e=>console.error("Error fetching custom preferences:",e))):console.log("No token found in storage.")}))}function fetchBrowserHistory(){const e=Date.now()-6048e5;chrome.history.search({text:"",startTime:e,maxResults:1e3},(function(e){const t={};e.forEach((e=>{try{const o=new URL(e.url).hostname;t[o]?t[o]++:t[o]=1}catch(t){console.error("Error processing URL:",e.url,t)}}));const o=Object.keys(t).sort(((e,o)=>t[o]-t[e])).slice(0,7).map((e=>({url:e,visits:t[e]})));chrome.storage.local.set({topSites:o})}))}chrome.runtime.onInstalled.addListener((()=>{fetchBlockedUrlsAndStore(),fetchCustomPreferencesAndStore(),fetchBrowserHistory()})),chrome.runtime.onStartup.addListener((()=>{fetchBlockedUrlsAndStore(),fetchCustomPreferencesAndStore(),fetchBrowserHistory()})),setInterval(fetchBlockedUrlsAndStore,3e4),setInterval(fetchCustomPreferencesAndStore,3e4),setInterval(fetchBrowserHistory,6e4),chrome.tabs.onUpdated.addListener(((e,t,o)=>{"complete"===t.status&&o.url&&chrome.storage.local.get(["blockedUrls","customPreferences"],(t=>{const{blockedUrls:r=[],customPreferences:s=[]}=t,c=r.some((e=>o.url.includes(e))),n=s.some((e=>o.url.includes(e)));(c||n)&&chrome.tabs.update(e,{url:"./dashboard.html"})}))})),chrome.runtime.onMessage.addListener(((e,t,o)=>{"redirect"===e.action&&t.tab&&chrome.tabs.update(t.tab.id,{url:e.url})}));