(function() {
    var guestName = getQueryValue("to") || "Tamu Undangan";
    var guestTarget = document.getElementById("kepada");
    var openButton = document.getElementById("btn-open-undangan");
    var coverPanel = document.querySelector(".cover__panel");

    if (guestTarget) {
        guestTarget.textContent = guestName;
    }

    if (openButton) {
        openButton.href = "./isi-undangan.html?to=" + encodeURIComponent(guestName);
    }

    localStorage.setItem("audio", "true");

    if (coverPanel && !prefersReducedMotion()) {
        document.addEventListener("mousemove", function(event) {
            var x = (event.clientX / window.innerWidth - 0.5) * 8;
            var y = (event.clientY / window.innerHeight - 0.5) * 8;

            coverPanel.style.transform = "translate(" + x + "px, " + y + "px)";
        });
    }

    function getQueryValue(name) {
        var query = window.location.search.substring(1);
        var pairs = query.split("&");
        var i;
        var pair;

        for (i = 0; i < pairs.length; i += 1) {
            pair = pairs[i].split("=");

            if (decodeURIComponent(pair[0]) === name) {
                return decodeURIComponent((pair[1] || "").replace(/\+/g, " "));
            }
        }

        return "";
    }

    function prefersReducedMotion() {
        return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
})();
