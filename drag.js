const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("fileInput");
const fileInfo = document.getElementById("file-info");
const errorMsg = document.getElementById("error-msg");
const browse = document.getElementById("browse");

// Handle browse click
browse.addEventListener("click", () => fileInput.click());

// Handle file input change
fileInput.addEventListener("change", handleFiles);

// Handle drag-over effect
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.style.background = "rgba(255, 255, 255, 0.3)";
});

dropArea.addEventListener("dragleave", () => {
    dropArea.style.background = "rgba(255, 255, 255, 0.1)";
});

// Handle file drop
dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    dropArea.style.background = "rgba(255, 255, 255, 0.1)";

    let files = event.dataTransfer.files;
    handleFiles({ target: { files } });
});

// Handle file selection
function handleFiles(event) {
    const file = event.target.files[0];

    if (file && file.type === "application/pdf") {
        fileInfo.textContent = `✅ ${file.name}`;
        errorMsg.textContent = "";
    } else {
        fileInfo.textContent = "";
        errorMsg.textContent = "❌ Only PDF files are allowed!";
    }
}
