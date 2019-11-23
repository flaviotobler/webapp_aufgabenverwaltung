var cacheName = 'webapp_aufgabenverwaltung';

importScripts('./idb-keyval.js');

self.addEventListener('install', event => {
	self.skipWaiting();
	event.waitUntil(
	caches.open(cacheName)
	.then(cache => cache.addAll([
		'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css',
		'./Aufgabenverwaltung.css',
		'./index.html',
		'./Aufgabenverwaltung.js',
		'./ServiceWorker.js',
		'./idb-keyval.js',
		'./selectionT',
		'./selectionD',
		'https://code.jquery.com/jquery-3.2.1.slim.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js',
		'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js'
		]))
	);
});

self.addEventListener('fetch', event => {
    console.log("fetchEvent");
	if(event.request.method ==='GET' && /selection/.test(event.request.url)){
		event.respondWith(
            fetch(event.request)
                .then(function(response){
                    caches.open(cacheName)
                        .then(function(cache){
                            cache.put(event.request.url, response);
                        });
                    return response.clone();
                })
                .catch(function(){
                    return caches.match(event.request.url, {ignoreSearch: true});
                })
		);
	} else {
		event.respondWith(
		    caches.open(cacheName).then(function(cache) {
                return cache.match(event.request,{ignoreSearch: true}).then(function (response) {
                    return response || fetch(event.request).then(function(response) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
            })
		);
	}
});


self.addEventListener('sync', event => {
    console.log("syncevent");
	if(event.tag === 'addTask'){
		event.waitUntil(
			idbKeyval.get('addTask').then(value =>{
                console.log(value);
                console.log(typeof value);
                console.log(JSON.stringify(value));
                var payload = {name: value}
                console.log(payload);
                console.log(typeof payload);
                console.log(JSON.stringify(payload));
				fetch('/addTask/', {
					method: 'POST',
					headers: new Headers({ 'content-type': 'application/json'}),
					body: JSON.stringify(payload)
				})
			})
		);
		idbKeyval.delete(event.tag);
	}

});