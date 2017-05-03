"use strict"
function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function handleInstall(){return getCurrentInsalledVersion().then((function(e){if("UNKNOWN"!==e&&!isNaN(parseInt(e,10))&&e>self.version)throw new Error("Cannot install a service worker lower than the current installed version")
return self.skipWaiting()}))}function getCurrentInsalledVersion(){return DB.open().then((function(){return DB.getSwVersion()}))}function handleActivate(){return DB.open().then((function(){return DB.setSwVersion(self.version)})).then((function(){return self.clients.claim()}))}var _createClass=(function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t]
r.enumerable=r.enumerable||!1
r.configurable=!0
"value"in r&&(r.writable=!0)
Object.defineProperty(e,r.key,r)}}return function(n,t,r){t&&e(n.prototype,t)
r&&e(n,r)
return n}})(),SWIDatabase=(function(){function e(){_classCallCheck(this,e)
this.indexedDB="undefined"!=typeof window&&(window.indexedDB||window.webkitIndexedDB)||indexedDB
this.db=null}_createClass(e,[{key:"open",value:function e(){var e=this.indexedDB.open("ServiceWorkerDB",1),n=this
return new Promise(function(t,r){e.onupgradeneeded=function(e){var n=e.target.result
n.createObjectStore("SWStore")}
e.onsuccess=function(e){n.db=e.target.result
t()}
e.onerror=function(e){r(e)}})}},{key:"setSwVersion",value:function(e){return this._setValueForKey("version",e,{csrfToken:"",parentAppId:""})}},{key:"setCsrf",value:function(e){return this._setValueForKey("csrfToken",e,{version:"",parentAppId:""})}},{key:"setParentAppId",value:function(e){return this._setValueForKey("parentAppId",e,{csrfToken:"",version:""})}},{key:"_setValueForKey",value:function(e,n,t){var r=this.db.transaction("SWStore","readwrite"),o=r.objectStore("SWStore")
return new Promise(function(r,i){var s=void 0
if(o){s=o.get(1)
s.onerror=function(e){i(e)}
s.onsuccess=function(a){var u=s.result,c=void 0
u=u||t
u[e]=n
c=o.put(u,1)
c.onsuccess=function(e){r()}
c.onerror=function(e){i(e)}}}else i(new Error("Cannot open Object Store"))})}},{key:"getSwVersion",value:function(){return this._getValueForKey("version")||"UNKNOWN"}},{key:"getCsrf",value:function(){return this._getValueForKey("csrfToken")}},{key:"getParentAppId",value:function(){return this._getValueForKey("parentAppId")}},{key:"_getValueForKey",value:function(e){var n=this
return new Promise(function(t,r){var o=n.db.transaction("SWStore","readwrite"),i=o.objectStore("SWStore"),s=i.get(1)
s.onsuccess=function(n){var r=""
s.result&&s.result.hasOwnProperty(e)&&(r=s.result[e])
t(r)}
s.onerror=function(e){r(e)}})}}])
return e})(),DB=new SWIDatabase
self.version="1485899309418"
self.importScripts("service-worker-push.js")
self.addEventListener("install",(function(e){e.waitUntil(handleInstall())}))
self.addEventListener("activate",(function(e){e.waitUntil(handleActivate())}))

//# sourceMappingURL=service-worker.map