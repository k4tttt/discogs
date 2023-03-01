/*------------------- COLOR CHANGER ------------------*/
/**
 * Change the color of the header and footer to a random rgb color.
 */
function changeColor() {
    r = Math.floor((Math.random()*256));
    g = Math.floor((Math.random()*256));
    b = Math.floor((Math.random()*256));
    document.getElementsByClassName("footer")[0].style.backgroundColor = "rgb("+r+","+g+","+b+")";
    document.getElementsByClassName("header")[0].style.backgroundColor = "rgb("+r+","+g+","+b+")";
    document.getElementById("reset").style.display = "inline-block";
}

/**
 * Reset the color of the header and footer to the original color.
 */
function resetColor() {
    document.getElementsByClassName("footer")[0].style.backgroundColor = "#8888FF";
    document.getElementsByClassName("header")[0].style.backgroundColor = "#8888FF";
    document.getElementById("reset").style.display = "none";
}


/*------------------- RESPONSIVE TOP NAVIGATION ------------------*/
/**
 * Toggle between displaying and hiding the responsive dropdown
 * menu in the header. 
 */
$(document).ready(function() {
    $(document.getElementsByClassName("hamburger")[0]).click(function() {
        var x = document.getElementsByClassName("topnav1")[0];
        var y = document.getElementsByClassName("topnav2")[0];
        $(x).slideToggle();
        $(y).slideToggle();

        if (x.className == "topnav1") {
            x.className += " responsive";
            y.className += " responsive";
        } else {
            x.className = "topnav1";
            y.className = "topnav2";
        }
    });
});

/**
 * Toggle between displaying and hiding the top navigation elements, 
 * depending on the screen width.
 * Also toggle the placeholder text in the search bar.
 */
window.addEventListener('resize', toggleTopnav);

function toggleTopnav() {
    if (document.documentElement.clientWidth > 1150) {
        $(document.getElementsByClassName("topnav1")[0]).show();
        $(document.getElementsByClassName("topnav2")[0]).show();
    }

    if (document.documentElement.clientWidth <= 1150) {
        $(document.getElementsByClassName("topnav1")[0]).hide();
        $(document.getElementsByClassName("topnav2")[0]).hide();
    }

    if (document.documentElement.clientWidth <= 520) {
        $(document.getElementById("searchbar")).attr("placeholder", "Search...");
    }

    if (document.documentElement.clientWidth > 520) {
        $(document.getElementById("searchbar")).attr("placeholder", "Search artists, albums and more...");
    }
}


/*------------------- bullshit som inte funkar ------------------*/
var imgsrcs = ["images/apple_vs_7g.jpg", "images/apple.jpg", "images/7g.jpg"];

let i = 0;
function cycleImages(img) {
    img.src = imgsrcs[i];
    img.style.boxShadow = "10px 10px 5px #aaa";
    i = i + 1 < imgsrcs.length ? i + 1 : 0;
}

let repeat;
function albumHover(img) {
    repeat = setInterval(cycleImages(img), 500);
}

function albumHoverOut(img) {
    clearInterval(repeat);
    img.src = "images/albums.png";
    img.style.boxShadow = "none";
}

/*
$(document).ready(function() {
    $(document.getElementById("albums")).addEventListener("mouseover", () => {
        repeat = setInterval(cycleImages, 100);
    });
});


$(document).ready(function() {
    $(document.getElementById("albums")).addEventListener("mouseover", () => {
        clearInterval(repeat);
        img.src = "images/albums.png";
        img.style.boxShadow = "none";
    });
});*/


/*------------------- SLIDESHOW ------------------*/
let slideIndex = 1;
let numItemsPerSlide;



$(document).ready(function() {
    if (document.getElementById("apple")) {
        window.addEventListener('resize', itemsPerSlide);
        itemsPerSlide();
    }
});

/**
 * Determine the number of items per slide, depending on
 * the screen width.
 */
function itemsPerSlide() {
    if (document.documentElement.clientWidth >= 1150) {
        numItemsPerSlide = 5;
    } else {
        if (document.documentElement.clientWidth < 1150) {
            numItemsPerSlide = 4;
        }
        if (document.documentElement.clientWidth < 930) {
            numItemsPerSlide = 3;
        }
        if (document.documentElement.clientWidth < 720) {
            numItemsPerSlide = 2;
        }
        if (document.documentElement.clientWidth < 510) {
            numItemsPerSlide = 1;
        }
    }
    
    showSlides(slideIndex);
}

/**
 * Change which slide is showing in the slideshow.
 * @param {*} n indicates how many steps the slideshow should move.
 */
function plusSlides(n) {
    showSlides(slideIndex += n);
}

/**
 * Set which slide to be shown, and hide the remaining ones. 
 * @param {*} n index of slide to be shown.
 */
function showSlides(n) {
    let allSlides = Array.from(document.getElementsByClassName("slide"));
    let slides = new Array;

    // Split all slides into sections with correct number of items
    for (let i = 0; i < (allSlides.length)/numItemsPerSlide; i++) {
        let currentItems = allSlides.slice(i*numItemsPerSlide, i*numItemsPerSlide+numItemsPerSlide);
        slides.push(currentItems);
    }
    
    // Make the slideshow loopable
    if (n > slides.length) {slideIndex = 1;}    
    if (n < 1) {slideIndex = slides.length;}

    // Set all items to hidden
    for (let i = 0; i < slides.length; i++) {
        let currentSlide = slides[i];
        
        for (let j = 0; j < currentSlide.length; j++) {
            currentSlide[j].style.display = "none";
        }
    }

    // Display only the correct slide
    let displaySlide = slides[slideIndex - 1];
    
    for (let i = 0; i < displaySlide.length; i++) {
        displaySlide[i].style.display = "inline-block";
    }

    // Set the correct width for the slide container
    document.getElementById("slides").style.width = numItemsPerSlide*190 + "px";
}


/*------------------- DRAGGABLE ------------------*/
/**
 * Make the elements in the footer draggable.
 */
$(document).ready(function() {
    $(document.getElementsByClassName("draggable")).draggable({containment: ".footer"});
});
