/* eslint-disable */
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
	({ request, url} : any) => {
		if (
			request.mode !== 'navigate' ||
			url.pathname.startsWith('/_') ||
			url.pathname.match(fileExtensionRegexp)
		) {
			return false;
		}
		return true;
	},
	createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

registerRoute(
	({ url} : any) =>
		url.origin === self.location.origin && url.pathname.endsWith('.png'),
	new StaleWhileRevalidate({
		cacheName: 'images',
		plugins: [new ExpirationPlugin({ maxEntries: 50} : any)]
	})
);

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});
// Any other custom service worker logic can go here.
