document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        var loadingAnimation = document.createElement("div");
        loadingAnimation.id = "loading-animation";
        document.getElementById("terminal").appendChild(loadingAnimation);

        setTimeout(function() {
            window.location.href = "home.html";
            setTimeout(function() {
                playBackgroundMusic();
            }, 3000);
        }, 4000);
    }
});


var audio;

document.addEventListener("DOMContentLoaded", function() {
    playBackgroundMusic();
    var muteToggle = document.getElementById("mute-toggle");
    var isMuted = localStorage.getItem("musicMuted");

    if (isMuted === "true") {
        toggleMute();
        muteToggle.innerHTML = "Unmute";
    }

    // Add event listener to handle navigation clicks
    var navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            var targetPage = this.getAttribute("href");
            loadPage(targetPage);
        });
    });
});

function loadPage(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = xhr.responseText;
            var parser = new DOMParser();
            var newDocument = parser.parseFromString(response, "text/html");

            // Update the content on the current page
            var currentPageContent = document.getElementById("page-content");
            var newPageContent = newDocument.getElementById("page-content");
            if (currentPageContent && newPageContent) {
                currentPageContent.innerHTML = newPageContent.innerHTML;

                // Update the page title
                var newTitle = newDocument.querySelector("title").textContent;
                document.title = newTitle;

                // Play background music if not muted
                if (!audio.paused) {
                    playBackgroundMusic();
                }
            } else {
                // Reload the entire page
                window.location.href = url;
            }
        }
    };
    xhr.send();
}

function playBackgroundMusic() {
    if (!audio) {
        audio = new Audio("background.mp3");
        audio.loop = true;
        audio.volume = 0.5;
    }
    audio.play();
}

function toggleMute() {
    if (audio.paused) {
        audio.play();
        localStorage.setItem("musicMuted", "false");
        document.getElementById("mute-toggle").innerHTML = "Mute";
    } else {
        audio.pause();
        localStorage.setItem("musicMuted", "true");
        document.getElementById("mute-toggle").innerHTML = "Unmute";
    }
}

