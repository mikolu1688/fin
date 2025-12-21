/* ========= 行動要素：捲動互動 ========= */
const box = document.getElementById("moving-box");
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    box.style.transform = `translateX(${scrollY * 0.3}px)`;
});

/* ========= 裝置互動要素：相機 + 麥克風 ========= */
const btnDevice = document.getElementById('btn-device');
const video = document.getElementById('video');
const deviceStatus = document.getElementById('device-status');

btnDevice.onclick = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
        video.srcObject = stream;
        deviceStatus.textContent = "✅ 相機與麥克風已啟用";

        // 同時用 Fetch API 傳送裝置啟用狀態（通訊示範）
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                device: "camera & microphone",
                status: "enabled"
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("裝置狀態已送出:", data);
        })
        .catch(err => {
            console.warn("裝置狀態送出失敗", err);
        });

    } catch (err) {
        console.error(err);
        alert("無法取得相機或麥克風權限");
    }
};

/* ========= 通訊要素：表單 + Fetch API ========= */
const form = document.getElementById("contact-form");
const statusMessage = document.getElementById("form-status");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {
        statusMessage.textContent = "✅ 訊息已成功送出（Fetch API）";
        statusMessage.style.color = "green";
        form.reset();
    })
    .catch(error => {
        statusMessage.textContent = "❌ 傳送失敗，請稍後再試";
        statusMessage.style.color = "red";
    });
});
