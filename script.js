var weddingDate = new Date("Aug 06, 2022 11:00:00").getTime();
var countdownTimer = setInterval(updateCountdown, 1000);
var audio = document.getElementById("audio-wedding");
var audioButton = document.getElementById("btn-audio-wedding");
var audioIcon = document.getElementById("icon-music");
var formMessage = document.getElementById("form-message");
var guestNameTarget = document.getElementById("guest-name");
var firebaseApi = null;
var db = null;

var firebaseConfig = {
    apiKey: "AIzaSyDKZ4fsXlgK3hIomnI5t9fddUqdZvddVt0",
    authDomain: "test-firebase-js-89045.firebaseapp.com",
    databaseURL: "https://test-firebase-js-89045-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "test-firebase-js-89045",
    storageBucket: "test-firebase-js-89045.appspot.com",
    messagingSenderId: "112701827337",
    appId: "1:112701827337:web:88be1fe964a85910ce4bd8"
};

updateCountdown();
setGuestName();
initAudio();
initRevealAnimation();
initFirebaseWishes();

function updateCountdown() {
    var now = new Date().getTime();
    var timeLeft = weddingDate - now;

    if (timeLeft <= 0) {
        clearInterval(countdownTimer);
        setText("days", "0");
        setText("hours", "0");
        setText("mins", "0");
        setText("secs", "0");
        setText("countdown-message", "Hari bahagia ini telah terlaksana. Terima kasih atas doa dan restunya.");
        return;
    }

    setText("days", Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
    setText("hours", Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setText("mins", Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)));
    setText("secs", Math.floor((timeLeft % (1000 * 60)) / 1000));
}

function initAudio() {
    if (!audio || !audioButton) {
        return;
    }

    localStorage.setItem("audio", localStorage.getItem("audio") || "true");
    updateAudioIcon();

    audioButton.addEventListener("click", function() {
        if (localStorage.getItem("audio") === "true") {
            playAudio();
        } else {
            pauseAudio();
        }
    });
}

function playAudio() {
    if (!audio) {
        return;
    }

    audio.play().then(function() {
        localStorage.setItem("audio", "false");
        updateAudioIcon();
    }).catch(function() {
        localStorage.setItem("audio", "true");
        updateAudioIcon();
    });
}

function pauseAudio() {
    if (!audio) {
        return;
    }

    audio.pause();
    localStorage.setItem("audio", "true");
    updateAudioIcon();
}

function updateAudioIcon() {
    if (!audioIcon) {
        return;
    }

    audioIcon.src = localStorage.getItem("audio") === "true" ? "./assets/icon/silent.png" : "./assets/icon/volume.png";
}

function initFirebaseWishes() {
    Promise.all([
        import("https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js"),
        import("https://www.gstatic.com/firebasejs/9.9.1/firebase-database.js")
    ]).then(function(modules) {
        var appModule = modules[0];
        var databaseModule = modules[1];
        var app = appModule.initializeApp(firebaseConfig);

        firebaseApi = databaseModule;
        db = databaseModule.getDatabase(app);

        initWishForm();
        loadWishes();
    }).catch(function() {
        var wishContainer = document.getElementById("ucp-user");

        if (wishContainer) {
            wishContainer.textContent = "Ucapan online belum bisa dimuat.";
        }

        disableWishForm();
    });
}

function initWishForm() {
    var form = document.getElementById("frmPesan");

    if (!form || !firebaseApi || !db) {
        return;
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        var nama = trimValue("nama");
        var pesan = trimValue("pesan");

        if (nama === "" || pesan === "") {
            showFormMessage("Nama dan pesan wajib diisi.");
            return;
        }

        firebaseApi.set(firebaseApi.ref(db, "users/" + Math.random().toString(36).slice(2, 9)), {
            nama: nama,
            pesan: pesan
        }).then(function() {
            form.reset();
            showFormMessage("Ucapan berhasil dikirim. Terima kasih.");
            loadWishes();
        }).catch(function() {
            showFormMessage("Ucapan belum terkirim. Coba beberapa saat lagi.");
        });
    });
}

function loadWishes() {
    var wishContainer = document.getElementById("ucp-user");

    if (!wishContainer || !firebaseApi || !db) {
        return;
    }

    wishContainer.textContent = "Memuat ucapan...";

    firebaseApi.get(firebaseApi.child(firebaseApi.ref(db), "users/")).then(function(snapshot) {
        wishContainer.textContent = "";

        if (!snapshot.exists()) {
            wishContainer.textContent = "Belum ada ucapan.";
            return;
        }

        Object.keys(snapshot.val()).forEach(function(key) {
            appendWish(wishContainer, snapshot.val()[key].nama, snapshot.val()[key].pesan);
        });
    }).catch(function() {
        wishContainer.textContent = "Ucapan belum bisa dimuat.";
    });
}

function appendWish(container, nama, pesan) {
    var item = document.createElement("div");
    var nameElement = document.createElement("strong");
    var messageElement = document.createElement("span");

    item.className = "wish-item";
    nameElement.textContent = nama || "Tamu";
    messageElement.textContent = pesan || "";

    item.appendChild(nameElement);
    item.appendChild(messageElement);
    container.appendChild(item);
}

function showFormMessage(message) {
    if (formMessage) {
        formMessage.textContent = message;
    }
}

function disableWishForm() {
    var form = document.getElementById("frmPesan");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        showFormMessage("Koneksi ucapan online belum tersedia.");
    });
}

function setText(id, value) {
    var target = document.getElementById(id);

    if (target) {
        target.textContent = value;
    }
}

function trimValue(id) {
    var target = document.getElementById(id);

    if (!target) {
        return "";
    }

    return target.value.replace(/^\s+|\s+$/g, "");
}

function setGuestName() {
    if (guestNameTarget) {
        guestNameTarget.textContent = getQueryValue("to") || "Tamu Undangan";
    }
}

function initRevealAnimation() {
    var targets = document.querySelectorAll(".section-heading, .countdown, .person-card, .quote-box, .event-card, .qr-image, .gallery-grid img, .health-grid div, .wish-form, .wish-list");
    var i;

    for (i = 0; i < targets.length; i += 1) {
        targets[i].className += " reveal reveal-delay-" + (i % 4);
    }

    if (!("IntersectionObserver" in window)) {
        for (i = 0; i < targets.length; i += 1) {
            targets[i].className += " is-visible";
        }
        return;
    }

    var observer = new IntersectionObserver(function(entries) {
        var index;

        for (index = 0; index < entries.length; index += 1) {
            if (entries[index].isIntersecting) {
                entries[index].target.className += " is-visible";
                observer.unobserve(entries[index].target);
            }
        }
    }, {
        threshold: 0.16
    });

    for (i = 0; i < targets.length; i += 1) {
        observer.observe(targets[i]);
    }
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
