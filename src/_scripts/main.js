// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

var Gallery = function(domObject) {
    var self = this;

    // gallery image related elements
    self.$gallery = domObject;
    self.$images = self.$gallery.querySelectorAll('.screen-img');
    self.imageCount = self.$images.length;

    // return if no images
    if (self.imageCount < 1) {
        return false;
    }

    // gallery navigation elements
    self.$arrowPrev = self.$gallery.querySelector('.arrow-prev');
    self.$arrowNext = self.$gallery.querySelector('.arrow-next');
    self.$counter = self.$gallery.querySelector('.counter');
    self.$counterCurrent = self.$gallery.querySelector('.counter-current');
    self.$counterTotal = self.$gallery.querySelector('.counter-total');
    
    // set initial values
    self.currentImageIndex = 0;
    self.$counterTotal.innerHTML = self.imageCount;
};


