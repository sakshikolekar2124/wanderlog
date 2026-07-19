var userAvatar = document.getElementById("user-avatar");
var userName = document.getElementById("user-name");
var userBio = document.getElementById("user-bio");
var statTripsCount = document.getElementById("stat-trips-count");
var statDaysCount = document.getElementById("stat-days-count");
var destinationsGrid = document.getElementById("profile-destinations-grid");
var emptyState = document.getElementById("profile-empty-state");
var dashboardBtn = document.getElementById("dashboard-btn");

var BEACH_IMAGE = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80";
var MOUNTAIN_IMAGE = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80";
var DEFAULT_IMAGE = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";

var defaultTrips = [
    {
        id: "trip_default_1",
        title: "Manali Winter Adventure",
        destination: "Manali, Himachal Pradesh, India",
        startDate: "2026-02-04",
        endDate: "2026-02-10",
        duration: 6,
        image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80",
        notes: "📌 Places to Visit: Solang Valley, Rohtang Pass, Hadimba Temple, Mall Road, Old Manali\n🍴 Food to Try: Maggi at snow points, Momos & Thukpa, Local Himachali food\n🎒 Packing List: Warm clothes (jackets, gloves), Boots, Sunglasses, Power bank\n💰 Budget: ₹10,000 – ₹15,000 (approx per person)"
    },
    {
        id: "trip_default_2",
        title: "Goa Beach Retreat",
        destination: "Goa, India",
        startDate: "2026-04-02",
        endDate: "2026-04-08",
        duration: 6,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        notes: "📌 Places to Visit: Baga Beach, Calangute, Fort Aguada, Dudhsagar Falls, Anjuna Market\n🍴 Food to Try: Fish Curry Rice, Bebinca, Feni, Prawn Balchão\n🎒 Packing List: Swimwear, Sunscreen, Sunglasses, Light cotton clothes\n💰 Budget: ₹8,000 – ₹12,000 (approx per person)"
    },
    {
        id: "trip_default_3",
        title: "Taj Mahal Heritage",
        destination: "Agra, Uttar Pradesh, India",
        startDate: "2026-05-12",
        endDate: "2026-05-14",
        duration: 2,
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80",
        notes: "📌 Places to Visit: Taj Mahal, Agra Fort, Fatehpur Sikri, Mehtab Bagh\n🍴 Food to Try: Petha (sweet), Bedai & Jalebi, Mughlai Cuisine\n🎒 Packing List: Comfortable walking shoes, Umbrella, Cotton clothes\n💰 Budget: ₹5,000 – ₹8,000 (approx per person)"
    }
];

var params = new URLSearchParams(window.location.search);
var username = params.get("user") || "sakshikolekar";

if (dashboardBtn) {
    dashboardBtn.href = "destination.html?user=" + username;
}
var logoLink = document.getElementById("logo-link");
if (logoLink) {
    logoLink.href = "index.html?user=" + username;
}

function formatDateDisplay(dateString) {
    if (!dateString) return "";
    var dateParts = dateString.split("-"); 
    if (dateParts.length === 3) {
        var year = parseInt(dateParts[0], 10);
        var monthIndex = parseInt(dateParts[1], 10) - 1;
        var day = parseInt(dateParts[2], 10);
        
        var months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return day + " " + months[monthIndex] + " " + year;
    }
    return dateString;
}

function getCoverImage(url, title, destination) {
    if (url && url.trim() !== "") {
        return url;
    }
    var searchText = (title + " " + destination).toLowerCase();
    if (searchText.indexOf("beach") !== -1 || searchText.indexOf("sea") !== -1 || searchText.indexOf("island") !== -1 || searchText.indexOf("goa") !== -1) {
        return BEACH_IMAGE;
    }
    if (searchText.indexOf("mountain") !== -1 || searchText.indexOf("hill") !== -1 || searchText.indexOf("trek") !== -1 || searchText.indexOf("manali") !== -1) {
        return MOUNTAIN_IMAGE;
    }
    return DEFAULT_IMAGE;
}

function loadProfile() {
    var profileData = localStorage.getItem("wandarlog_profile_" + username);
    if (profileData) {
        var profile = JSON.parse(profileData);
        userName.textContent = profile.name || "Traveler Profile";
        userBio.textContent = profile.bio || "Sharing travel journeys and itineraries on Wanderlog.";
        userAvatar.src = profile.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80";
    } else {
        if (username === "amit") {
            userName.textContent = "Amit Patel";
            userBio.textContent = "Mountain lover and trekking enthusiast. Exploring the Himalayas, one peak at a time.";
            userAvatar.src = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80";
        } else if (username === "priya") {
            userName.textContent = "Priya Sharma";
            userBio.textContent = "Beach lover & solo backpacker. Finding peace in coastal towns and heritage sites.";
            userAvatar.src = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80";
        } else {
            userName.textContent = "Sakshi Kolekar";
            userBio.textContent = "Avid traveler & frontend explorer. Documenting my journey across the beautiful landscapes of India.";
            userAvatar.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80";
        }
    }
}

function loadAndRenderTrips() {
    var storedData = localStorage.getItem("wandarlog_trips_" + username);
    var tripsArray = [];

    if (storedData) {
        tripsArray = JSON.parse(storedData);
    } else if (username === "sakshikolekar") {
        tripsArray = defaultTrips;
    } else if (username === "amit") {
        tripsArray = [
            {
                id: "trip_amit_1",
                title: "Kedarkantha Winter Summit",
                destination: "Uttarkashi, Uttarakhand, India",
                startDate: "2025-12-15",
                endDate: "2025-12-20",
                duration: 6,
                image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
                notes: "📌 Key Highlights: Trekking in deep snow, Camping under stars, 360-degree view of Himalayan peaks from summit.\n🎒 Packing: Heavy layers, crampons, trekking poles."
            },
            {
                id: "trip_amit_2",
                title: "Leh Ladakh Bike Expedition",
                destination: "Leh, Ladakh, India",
                startDate: "2026-06-10",
                endDate: "2026-06-20",
                duration: 11,
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
                notes: "📌 Sights: Khardung La Pass, Pangong Lake, Nubra Valley sand dunes.\n🏍️ Ride: Classic 500cc Royal Enfield."
            }
        ];
    } else if (username === "priya") {
        tripsArray = [
            {
                id: "trip_priya_1",
                title: "Kerala Backwater Houseboat Cruise",
                destination: "Alleppey, Kerala, India",
                startDate: "2026-01-05",
                endDate: "2026-01-09",
                duration: 5,
                image: "https://images.unsplash.com/photo-1516690561799-46d8f74f90f6?auto=format&fit=crop&w=600&q=80",
                notes: "📌 Sights: Houseboat stay, fresh coconut water, bird watching, spice village walk."
            },
            {
                id: "trip_priya_2",
                title: "Exploring Hampi Ancient Ruins",
                destination: "Hampi, Karnataka, India",
                startDate: "2026-11-22",
                endDate: "2026-11-25",
                duration: 4,
                image: "https://images.unsplash.com/photo-1600100397608-f010e42ec9a4?auto=format&fit=crop&w=600&q=80",
                notes: "📌 Highlights: Virupaksha Temple, stone chariot, sunset from Matanga Hill.\n🚲 Transit: Rented bicycle."
            }
        ];
    }

    destinationsGrid.innerHTML = "";

    if (tripsArray.length === 0) {
        emptyState.classList.remove("hidden");
        destinationsGrid.classList.add("hidden");
        statTripsCount.textContent = "0";
        statDaysCount.textContent = "0";
        return;
    }

    emptyState.classList.add("hidden");
    destinationsGrid.classList.remove("hidden");

    var totalTrips = tripsArray.length;
    var totalDays = 0;

    for (var i = 0; i < tripsArray.length; i++) {
        var trip = tripsArray[i];
        
        var durationNum = parseInt(trip.duration, 10);
        if (!isNaN(durationNum) && durationNum > 0) {
            totalDays += durationNum;
        }

        var coverImgUrl = getCoverImage(trip.image, trip.title, trip.destination);
        var cardArticle = document.createElement("article");
        cardArticle.className = "card";
        
        cardArticle.innerHTML = `
            <header class="card-header">
                <span class="badge text-mono">Travel Log #${String(i + 1).padStart(3, '0')}</span>
                <span class="coordinates text-mono" title="${trip.destination}">📍 ${trip.destination}</span>
            </header>
            <div class="card-image-container">
                <img class="card-image" src="${coverImgUrl}" alt="${trip.title}">
            </div>
            <h3 class="card-title">${trip.title}</h3>
            <div class="card-excerpt-container">
                <p class="card-excerpt" style="white-space: pre-line;">${trip.notes || "No additional logs entered."}</p>
            </div>
            <footer class="card-footer" style="display: flex; flex-direction: column; align-items: flex-start; gap: 8px; width: 100%;">
                <div style="text-align: left; font-size: 13px; line-height: 1.5; width: 100%;">
                    <div><span class="stat-label text-mono" style="font-weight:700;">Start Date:</span> <span class="stat-value text-mono" style="color:white; margin-left:5px;">${formatDateDisplay(trip.startDate)}</span></div>
                    <div><span class="stat-label text-mono" style="font-weight:700;">End Date:</span> <span class="stat-value text-mono" style="color:white; margin-left:5px;">${formatDateDisplay(trip.endDate)}</span></div>
                    <div><span class="stat-label text-mono" style="font-weight:700;">Duration:</span> <span class="stat-value text-mono" style="color:white; margin-left:5px;">${trip.duration} Days</span></div>
                </div>
            </footer>
        `;
        
        destinationsGrid.appendChild(cardArticle);
    }

    statTripsCount.textContent = totalTrips;
    statDaysCount.textContent = totalDays;
}

loadProfile();
loadAndRenderTrips();
