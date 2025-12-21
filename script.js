document.addEventListener('DOMContentLoaded', () => {

    /* ========= 1. Movement：滾動動畫 ========= */
    const movingBox = document.getElementById('moving-box');

    function handleScrollMovement() {
        const scrollPosition = window.scrollY;
        const newX = scrollPosition * 0.2;
        const maxMovement = 300;
        const finalX = Math.min(newX, maxMovement);

        movingBox.style.transform = `translateX(${finalX}px) rotate(${finalX / 5}deg)`;

        movingBox.style.backgroundColor =
            scrollPosition > 200 ? '#2980b9' : '#e74c3c';
    }

    window.addEventListener('scroll', handleScrollMovement);
    handleScrollMovement();


    /* ========= 2. Communication：表單送出 + fetch ========= */
    const form = document.getElementById('contact-form');
    const statusMessage = document.getElementById('form-status');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // 基本驗證
        if (!name || !email || !message) {
            showStatus('❌ 所有欄位皆為必填', 'error');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showStatus('❌ Email 格式不正確', 'error');
            return;
        }

        showStatus('⏳ 傳送中，請稍候...', 'loading');

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });

            if (!response.ok) throw new Error('Network error');

            showStatus('✅ 訊息已成功送出！', 'success');
            form.reset();

        } catch (error) {
            console.error(error);
            showStatus('❌ 發送失敗，請稍後再試', 'error');
        }
    });

    function showStatus(text, type) {
        statusMessage.textContent = text;
        statusMessage.className = `status-message ${type}`;
    }

});
