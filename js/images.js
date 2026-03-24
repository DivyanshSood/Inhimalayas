// Destination image galleries — 5 curated photos each
// Using verified Unsplash photo IDs for reliable loading
const DEST_IMAGES = {
  manali: [
    'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop'
  ],
  shimla: [
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&auto=format&fit=crop'
  ],
  spiti: [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop'
  ],
  dharamshala: [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&auto=format&fit=crop'
  ],
  kasol: [
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&auto=format&fit=crop'
  ],
  kinnaur: [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop'
  ],
  dalhousie: [
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&auto=format&fit=crop'
  ],
  bir: [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&auto=format&fit=crop'
  ],
  chamba: [
    'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop'
  ],
  kullu: [
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&auto=format&fit=crop'
  ]
};

// Inject images into DESTINATIONS on load
// IMPORTANT: This file MUST be loaded after data.js. All HTML pages use
// <script src="js/data.js" defer> followed by <script src="js/images.js" defer>,
// and the HTML spec guarantees defer scripts execute in document order.
if (typeof DESTINATIONS !== 'undefined') {
  DESTINATIONS.forEach(d => {
    if (DEST_IMAGES[d.id]) {
      d.images = DEST_IMAGES[d.id];
      d.image = DEST_IMAGES[d.id][0];
    }
  });
} else {
  console.warn('[images.js] DESTINATIONS not found — data.js must load before images.js.');
}
