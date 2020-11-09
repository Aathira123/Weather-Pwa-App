const CACHE_NAME="version-1";
const urlsToCache=['index.html','offline.html'];

// Install
self.addEventListener('install',(event)=>{

    event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
             
            // Open a cache and cache our files
            return cache.addAll(urlsToCache);
          })
      );

})
//listen req
self.addEventListener('fetch',(event)=>{
event.respondWith(
caches.match(event.request)
.then(()=>{
return fetch(event.request)
.catch(()=> caches.match('offline.html'))


})

)


})
//activate SW
self.addEventListener('activate',(event)=>{

const cachewhitelist=[];
cachewhitelist.push(CACHE_NAME);
event.waitUntil(

    caches.keys()
    .then((cachenames)=>{
        Promise.all(
            cachenames.map((cnm)=>{
                if(!cachewhitelist.includes(cnm)){
                    return caches.delete(cnm);
                }
            })

        )
    })
)
})