let divEle = document.querySelector(".container");


function display(userId) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://dummyjson.com/products`);
    request.send();

    request.addEventListener('load', function () {
        let data = JSON.parse(this.responseText);

        data.products.forEach((user, index) => {

            let divEl = `<div class="slider-wrapper">
            <button id="prev-slide" class="slide-button material-symbols-rounded"> chevron_left</button>
                <div class="image-list" style="display: flex">`;

                for (let i = 1; i <= 4; i++) {
                    divEl += `<img src="https://i.dummyjson.com/data/products/1/thumbnail.jpg">
                    <img src="https://i.dummyjson.com/data/products/2/thumbnail.jpg">
                    <img src="https://i.dummyjson.com/data/products/3/thumbnail.jpg">
                    <img src="https://i.dummyjson.com/data/products/4/thumbnail.jpg">`;
                }
                divEl += `</div>
                <button id="next-slide" class="slide-button material-symbols-rounded"> chevron_right</button>
            </div>
            <div class="slider-scrollbar">
                <div class="scrollbar-track">
                    <div class="scrollbar-thumb"></div>
                </div>
            </div>`;
        
            divEle.insertAdjacentHTML('beforeend', divEl);
        });
        initSlider();
    });
}

const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth; 
    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        };

        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Slide images according to the slide button click
    slideButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    };

    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = maxScrollLeft === 0 ? 0 : (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    };
    
    // Call these two functions when the image list scrolls
    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    });

    // Initial setup
    handleSlideButtons();
    updateScrollThumbPosition();
};

// Add event listener for window resize
window.addEventListener("resize", initSlider);

// Add event listener for window load
window.addEventListener("load", () => {
    display(1);
    initSlider();
});
