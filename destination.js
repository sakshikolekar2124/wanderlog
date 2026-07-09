
var addTripBtn = document.getElementById("add-trip-btn");
var tripModal = document.getElementById("trip-modal");
var closeModalBtn = document.getElementById("close-btn");
var tripForm = document.getElementById("trip-form");


var tripIdInput = document.getElementById("trip-id");
var titleInput = document.getElementById("trip-title");
var destinationInput = document.getElementById("trip-destination");
var startDateInput = document.getElementById("trip-start-date");
var endDateInput = document.getElementById("trip-end-date");
var imageInput = document.getElementById("trip-image");
var notesInput = document.getElementById("trip-notes");
var modalTitle = document.getElementById("modal-title");
var saveBtn = document.getElementById("save-btn");
var durationDisplay = document.getElementById("trip-duration-display");

var titleError = document.getElementById("title-error");
var destinationError = document.getElementById("destination-error");
var startDateError = document.getElementById("start-date-error");
var endDateError = document.getElementById("end-date-error");
var imageError = document.getElementById("image-error");


var emptyState = document.getElementById("empty-state");
var destinationsGrid = document.getElementById("destinations-grid");


var deleteModal = document.getElementById("delete-modal");
var deleteTripName = document.getElementById("delete-trip-name");
var confirmDeleteBtn = document.getElementById("confirm-delete-btn");
var cancelDeleteBtn = document.getElementById("cancel-delete-btn");


var tripsArray = [];
var selectedTripIdForDelete = null;


var BEACH_IMAGE = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80";
var MOUNTAIN_IMAGE = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80";
var CITY_IMAGE = "https://i.pinimg.com/1200x/b5/d6/01/b5d60173028061dfb8c58a2cc8c0a2d4.jpg";
var DEFAULT_IMAGE = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";

// Original Week 1 Destination cards as default starter data (Indian Places)
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
    },
    {
        id: "trip_default_4",
        title: "Jaipur Royal Palace",
        destination: "Jaipur, Rajasthan, India",
        startDate: "2026-06-20",
        endDate: "2026-06-25",
        duration: 5,
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
        notes: "📌 Places to Visit: Hawa Mahal, Amer Fort, City Palace, Jantar Mantar\n🍴 Food to Try: Dal Baati Churma, Pyaaz Kachori, Laal Maas\n🎒 Packing List: Hat, Sunglasses, Camera, Light ethnic wear\n💰 Budget: ₹12,000 – ₹16,000 (approx per person)"
    },
    {
        id: "trip_default_5",
        title: "Kerala Backwaters",
        destination: "Alleppey, Kerala, India",
        startDate: "2026-07-01",
        endDate: "2026-07-04",
        duration: 3,
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80",
        notes: "📌 Places to Visit: Alleppey Backwaters, Marari Beach, Pathiramanal Island\n🍴 Food to Try: Karimeen Pollichathu, Malabar Parotta, Banana Chips\n🎒 Packing List: Insect repellent, Light clothes, Sandals\n💰 Budget: ₹15,000 – ₹20,000 (approx per person)"
    },
    {
        id: "trip_default_6",
        title: "Munnar Tea Hills",
        destination: "Munnar, Kerala, India",
        startDate: "2026-07-08",
        endDate: "2026-07-11",
        duration: 3,
        image: "https://images.unsplash.com/photo-1516690561799-46d8f74f90f6?auto=format&fit=crop&w=600&q=80",
        notes: "📌 Places to Visit: Eravikulam National Park, Mattupetty Dam, Tea Museum\n🍴 Food to Try: Kerala Sadya, Kappa & Meen Curry, Spiced Tea\n🎒 Packing List: Light sweater, Rain jacket, Trekking shoes\n💰 Budget: ₹10,000 – ₹14,000 (approx per person)"
    }
];

function loadTripsFromStorage() {
    var storedData = localStorage.getItem("wandarlog_trips");
    if (storedData) {
        tripsArray = JSON.parse(storedData);
    } else {
        tripsArray = defaultTrips;
        saveTripsToStorage();
    }
}

function saveTripsToStorage() {
    localStorage.setItem("wandarlog_trips", JSON.stringify(tripsArray));
}

function getCoverImage(url, title, destination) {
    if (url && url.trim() !== "") {
        return url;
    }
    
    var searchText = (title + " " + destination).toLowerCase();
    
    if (searchText.indexOf("beach") !== -1 || searchText.indexOf("sea") !== -1 || searchText.indexOf("island") !== -1 || searchText.indexOf("bali") !== -1 || searchText.indexOf("goa") !== -1 || searchText.indexOf("maldives") !== -1) {
        return BEACH_IMAGE;
    }
    if (searchText.indexOf("mountain") !== -1 || searchText.indexOf("hill") !== -1 || searchText.indexOf("trek") !== -1 || searchText.indexOf("himalayan") !== -1 || searchText.indexOf("forest") !== -1 || searchText.indexOf("lake") !== -1) {
        return MOUNTAIN_IMAGE;
    }
    if (searchText.indexOf("city") !== -1 || searchText.indexOf("tokyo") !== -1 || searchText.indexOf("paris") !== -1 || searchText.indexOf("dubai") !== -1 || searchText.indexOf("london") !== -1) {
        return CITY_IMAGE;
    }
    
    return DEFAULT_IMAGE;
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

function renderTrips() {
    destinationsGrid.innerHTML = "";
    
    if (tripsArray.length === 0) {
        emptyState.classList.remove("hidden");
        destinationsGrid.classList.add("hidden");
        return;
    }
    
    emptyState.classList.add("hidden");
    destinationsGrid.classList.remove("hidden");
    
    for (var i = 0; i < tripsArray.length; i++) {
        var trip = tripsArray[i];
        
        var coverImgUrl = getCoverImage(trip.image, trip.title, trip.destination);
        
        var logNum = tripsArray.length - i;
        var paddedLogNum = logNum < 10 ? "00" + logNum : (logNum < 100 ? "0" + logNum : logNum);
        
        var cardArticle = document.createElement("article");
        cardArticle.className = "glass-card destination-card";
        
        cardArticle.innerHTML = `
            <div class="card-image" style="background-image: url('${coverImgUrl}');"></div>
            <div>
                <header class="card-header">
                    <span class="badge text-mono">Travel Log #${paddedLogNum}</span>
                    <span class="coordinates text-mono">📍 ${escapeHtml(trip.destination)}</span>
                </header>
                <h3 class="card-title">${escapeHtml(trip.title)}</h3>
                <p class="card-excerpt">
                    ${trip.notes ? escapeHtml(trip.notes) : 'No extra notes or travel plans details added.'}
                </p>
            </div>
            <footer class="card-footer" style="display: flex; flex-direction: column; align-items: flex-start; gap: 8px; width: 100%;">
                <div style="text-align: left; font-size: 13px; line-height: 1.5; width: 100%;">
                    <div><span class="stat-label text-mono" style="font-weight:700;">Start Date:</span> <span class="stat-value text-mono" style="color:white; margin-left:5px;">${formatDateDisplay(trip.startDate)}</span></div>
                    <div><span class="stat-label text-mono" style="font-weight:700;">End Date:</span> <span class="stat-value text-mono" style="color:white; margin-left:5px;">${formatDateDisplay(trip.endDate)}</span></div>
                    <div><span class="stat-label text-mono" style="font-weight:700;">Duration:</span> <span class="stat-value text-mono" style="color:white; margin-left:5px;">${trip.duration} Days</span></div>
                </div>
                <div class="card-actions" style="width: 100%; justify-content: flex-end; margin-top: 10px; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 10px;">
                    <button class="edit-btn text-mono" onclick="openEditForm('${trip.id}')">Edit</button>
                    <button class="delete-btn text-mono" onclick="openDeleteConfirm('${trip.id}', '${trip.title.replace(/'/g, "\\'")}')">Delete</button>
                </div>
            </footer>
        `;
        
        destinationsGrid.appendChild(cardArticle);
    }
}

function escapeHtml(text) {
    if (!text) return "";
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function openAddForm() {
    tripIdInput.value = "";
    titleInput.value = "";
    destinationInput.value = "";
    startDateInput.value = "";
    endDateInput.value = "";
    durationDisplay.value = "0 Days";
    imageInput.value = "";
    notesInput.value = "";
    
    clearErrors();
    
    modalTitle.textContent = "Plan Your Next Trip";
    saveBtn.textContent = "Save Adventure";
    
    tripModal.classList.remove("hidden");
}

function closeFormModal() {
    tripModal.classList.add("hidden");
    clearErrors();
}

function clearErrors() {
    titleInput.classList.remove("invalid");
    destinationInput.classList.remove("invalid");
    startDateInput.classList.remove("invalid");
    endDateInput.classList.remove("invalid");
    imageInput.classList.remove("invalid");
    
    titleError.classList.remove("show");
    destinationError.classList.remove("show");
    startDateError.classList.remove("show");
    endDateError.classList.remove("show");
    imageError.classList.remove("show");
}

function parseLocalDate(dateStr) {
    if (!dateStr) return null;
    var parts = dateStr.split("-");
    if (parts.length !== 3) return null;
    // year, monthIndex (0-11), day
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
}

function updateDurationDisplay() {
    if (startDateInput.value && endDateInput.value) {
        var startObj = parseLocalDate(startDateInput.value);
        var endObj = parseLocalDate(endDateInput.value);
        if (startObj && endObj) {
            var diffTime = endObj.getTime() - startObj.getTime();
            var diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays >= 0) {
                durationDisplay.value = diffDays;
            } else {
                durationDisplay.value = "0";
            }
        }
    } else {
        durationDisplay.value = "";
    }
}

function onFormSubmit(event) {
    event.preventDefault(); // Stop page refresh
    
    clearErrors();
    
    var hasError = false;
    
    if (titleInput.value.trim() === "") {
        titleInput.classList.add("invalid");
        titleError.classList.add("show");
        hasError = true;
    }
    
    if (destinationInput.value.trim() === "") {
        destinationInput.classList.add("invalid");
        destinationError.classList.add("show");
        hasError = true;
    }
    
    if (startDateInput.value === "") {
        startDateInput.classList.add("invalid");
        startDateError.classList.add("show");
        hasError = true;
    }
    
    if (endDateInput.value === "") {
        endDateInput.classList.add("invalid");
        endDateError.classList.add("show");
        hasError = true;
    } else if (startDateInput.value !== "") {
        var startObj = new Date(startDateInput.value);
        var endObj = new Date(endDateInput.value);
        if (endObj < startObj) {
            endDateInput.classList.add("invalid");
            endDateError.textContent = "End date cannot be before start date.";
            endDateError.classList.add("show");
            hasError = true;
        } else {
            endDateError.textContent = "Date is required.";
        }
    }
    
    var imgVal = imageInput.value.trim();
    if (imgVal !== "") {
        if (imgVal.indexOf("http://") !== 0 && imgVal.indexOf("https://") !== 0) {
            imageInput.classList.add("invalid");
            imageError.classList.add("show");
            hasError = true;
        }
    }
    
    if (hasError) {
        return;
    }
    
    var startObj = parseLocalDate(startDateInput.value);
    var endObj = parseLocalDate(endDateInput.value);
    var diffTime = endObj.getTime() - startObj.getTime();
    var diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) diffDays = 0;
    
    var tripId = tripIdInput.value;
    var currentTripData = {
        title: titleInput.value.trim(),
        destination: destinationInput.value.trim(),
        startDate: startDateInput.value,
        endDate: endDateInput.value,
        duration: durationDisplay.value.trim() || diffDays,
        image: imageInput.value.trim(),
        notes: notesInput.value.trim()
    };
    
    if (tripId === "") {
        currentTripData.id = "trip_" + Date.now();
        tripsArray.unshift(currentTripData); 
    } else {
        for (var i = 0; i < tripsArray.length; i++) {
            if (tripsArray[i].id === tripId) {
                currentTripData.id = tripId;
                tripsArray[i] = currentTripData;
                break;
            }
        }
    }
    
    saveTripsToStorage();
    renderTrips();
    closeFormModal();
}

window.openEditForm = function(id) {
    var selectedTrip = null;
    for (var i = 0; i < tripsArray.length; i++) {
        if (tripsArray[i].id === id) {
            selectedTrip = tripsArray[i];
            break;
        }
    }
    
    if (selectedTrip) {
        tripIdInput.value = selectedTrip.id;
        titleInput.value = selectedTrip.title;
        destinationInput.value = selectedTrip.destination;
        startDateInput.value = selectedTrip.startDate || selectedTrip.date || "";
        endDateInput.value = selectedTrip.endDate || selectedTrip.date || "";
        imageInput.value = selectedTrip.image;
        notesInput.value = selectedTrip.notes;
        
        clearErrors();
        
        updateDurationDisplay();
        if (selectedTrip.duration !== undefined && selectedTrip.duration !== null) {
            durationDisplay.value = selectedTrip.duration;
        }
        
        modalTitle.textContent = "Edit Travel Adventure";
        saveBtn.textContent = "Save Changes";
        
        tripModal.classList.remove("hidden");
    }
};

window.openDeleteConfirm = function(id, title) {
    selectedTripIdForDelete = id;
    deleteTripName.textContent = title;
    
    deleteModal.classList.remove("hidden");
};

function closeDeleteModal() {
    deleteModal.classList.add("hidden");
    selectedTripIdForDelete = null;
}

function executeDelete() {
    if (selectedTripIdForDelete) {
        var updatedList = [];
        for (var i = 0; i < tripsArray.length; i++) {
            if (tripsArray[i].id !== selectedTripIdForDelete) {
                updatedList.push(tripsArray[i]);
            }
        }
        tripsArray = updatedList;
        
        saveTripsToStorage();
        renderTrips();
        closeDeleteModal();
    }
}

addTripBtn.addEventListener("click", openAddForm);
closeModalBtn.addEventListener("click", closeFormModal);
tripForm.addEventListener("submit", onFormSubmit);

startDateInput.addEventListener("change", updateDurationDisplay);
startDateInput.addEventListener("input", updateDurationDisplay);
endDateInput.addEventListener("change", updateDurationDisplay);
endDateInput.addEventListener("input", updateDurationDisplay);

cancelDeleteBtn.addEventListener("click", closeDeleteModal);
confirmDeleteBtn.addEventListener("click", executeDelete);

window.addEventListener("click", function(event) {
    if (event.target === tripModal) {
        closeFormModal();
    }
    if (event.target === deleteModal) {
        closeDeleteModal();
    }
});

window.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeFormModal();
        closeDeleteModal();
    }
});

loadTripsFromStorage();
renderTrips();

// Week 2: Implemented local storage save and retrieve functions
