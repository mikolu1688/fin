document.addEventListener('DOMContentLoaded', () => {

    // --- 1. 行動（Movement）: 元素滾動動畫 ---
    const movingBox = document.getElementById('moving-box');

    /**
     * 處理頁面滾動事件，根據滾動位置調整元素樣式
     */
    function handleScrollMovement() {
        // window.scrollY 是頁面垂直滾動的像素數
        const scrollPosition = window.scrollY;

        // 計算水平偏移量: 讓方塊隨著滾動移動（例如：每滾動 10 像素，方塊移動 1 像素）
        const newX = scrollPosition * 0.2; // 0.2 是移動速度係數

        // 限制最大移動距離，防止它移出螢幕
        const maxMovement = 300; 
        const finalX = Math.min(newX, maxMovement);

        // 使用 CSS transform (性能優於直接修改 left/top)
        movingBox.style.transform = `translateX(${finalX}px) rotate(${finalX / 5}deg)`; 
        
        // 額外的互動：根據滾動位置改變顏色
        if (scrollPosition > 200) {
            movingBox.style.backgroundColor = '#2980b9';
        } else {
            movingBox.style.backgroundColor = '#e74c3c';
        }
    }

    // 監聽滾動事件
    window.addEventListener('scroll', handleScrollMovement);

    // 在頁面載入時執行一次，以確保初始位置正確
    handleScrollMovement();


    // --- 2. 通訊（Communication）: 表單處理 ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // 阻止表單的預設提交行為（防止頁面重新載入）

        // 取得表單欄位的值
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // 簡單的客戶端驗證 (在實際應用中，後端也必須驗證)
        if (name === '' || email === '' || message === '') {
            displayStatus('所有欄位都是必填的！', 'error');
            return;
        }

        // 簡單的 Email 格式檢查
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            displayStatus('請輸入有效的電子郵件地址！', 'error');
            return;
        }

        // --- 模擬通訊（假裝發送資料到伺服器） ---
        // 在一個真實的應用程式中，您會在這裡使用 fetch 或 XMLHttpRequest 
        // 將資料發送到後端 API。
        
        console.log('--- 模擬發送資料 ---');
        console.log('姓名:', name);
        console.log('Email:', email);
        console.log('訊息:', message);
        
        // 模擬伺服器響應時間
        setTimeout(() => {
            // 顯示成功訊息
            displayStatus(`感謝您的訊息，${name}！我們將盡快回覆您。`, 'success');

            // 清空表單
            contactForm.reset();

            // 實際通訊範例（使用 fetch API）：
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            })
            .then(response => response.json())
            .then(data => {
                // 處理成功或錯誤的響應
            })
            .catch(error => {
                // 處理網路錯誤
            });
            */

        }, 1000); // 延遲 1 秒模擬網路傳輸
    });

    /**
     * 顯示表單提交狀態訊息
     * @param {string} message - 要顯示的文字
     * @param {string} type - 訊息類型 ('success' 或 'error')
     */
    function displayStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `status-message ${type}`;
        
        // 訊息顯示一段時間後自動消失
        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = 'status-message';
        }, 5000);
    }
});
const form = document.getElementById("contact-form");
const statusMessage = document.getElementById("form-status");

form.addEventListener("submit", function (e) {
    e.preventDefault(); // 防止表單真的送出

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
        statusMessage.textContent = "✅ 訊息已成功送出！";
        statusMessage.style.color = "green";
        form.reset();
    })
    .catch(error => {
        statusMessage.textContent = "❌ 發送失敗，請稍後再試";
        statusMessage.style.color = "red";
    });
});

