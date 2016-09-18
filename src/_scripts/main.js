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

    // load first (current) image
    self._loadImage(self.currentImageIndex);
    self._activateImage(self.currentImageIndex);

    // check images number and toggle nav visibility
    if (self.imageCount > 1) {
        // if one image -- hide navigation
        self.$arrowPrev.style.visibility = "visible";
        self.$arrowNext.style.visibility = "visible";
        self.$counter.style.visibility = "visible";        
    }
};

Gallery.prototype._loadImage = function (index) {
    var $image = this.$images[index];
    if ($image.classList.value.indexOf('loaded') < 0) {
        var self = this;
        $image.onload = function(event){
            $image.classList.add('loaded');
        }
        $image.setAttribute('src', $image.getAttribute('data-src'));
    }
};

Gallery.prototype._activateImage = function(index) {
    [].forEach.call(this.$images, function(el){
        el.classList.remove('is-shown');
    });
    this.$images[index].classList.add('is-shown');
    this.currentImageIndex = index;
};

var gallery = new Gallery(document.querySelector('.gallery'));


