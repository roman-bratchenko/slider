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

    if (self.imageCount > 1) {
        // if more then one image -- show navigation
        self.$arrowPrev.style.visibility = "visible";
        self.$arrowNext.style.visibility = "visible";
        self.$counter.style.visibility = "visible";
        
        // preload previous and next image
        self._loadImage(self._getPrevImageIndex());
        self._loadImage(self._getNextImageIndex());
    }

    // handle arrow events
    self.$arrowPrev.addEventListener('click', function(){
      self._loadImage(self._getPrevImageIndex());
      self._activateImage(self._getPrevImageIndex());
      self._refreshCounter();
    });

    self.$arrowNext.addEventListener('click', function(){
      self._loadImage(self._getNextImageIndex());
      self._activateImage(self._getNextImageIndex());
      self._refreshCounter();
    });
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

Gallery.prototype._getNextImageIndex = function(){
    if (this.currentImageIndex === this.imageCount - 1) {
        return 0;
    }
    return this.currentImageIndex + 1;
};

Gallery.prototype._getPrevImageIndex = function(){
    if (this.currentImageIndex === 0) {
        return this.imageCount - 1;
    }
    return this.currentImageIndex - 1;
};

Gallery.prototype._refreshCounter = function(){
    this.$counterCurrent.innerHTML = this.currentImageIndex + 1;
};


var gallery = new Gallery(document.querySelector('.gallery'));