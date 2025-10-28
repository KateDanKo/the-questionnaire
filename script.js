const form = document.querySelector(".form");
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const secondName = document.getElementById("secondName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phoneValue = document.getElementById("phone").value.trim();
    const agree = document.getElementById("agree").checked;


    if (!name || !secondName || !email || !phoneValue || !agree) {
        showNotification("Пожалуйста, заполните все обязательные поля и согласитесь с обработкой данных.", "error");
        return;
    }

    const data = {
        name,
        secondName,
        phone: phoneValue,
        email,
        agree
    };

    try {
        
        const response = await fetch("https://polinashneider.space/user", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer: KateDanKo' 
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            showNotification("Данные успешно отправлены! Спасибо за участие.", "success");
            form.reset();
        } else {
            showNotification("Ошибка при отправке данных. Попробуйте еще раз.", "error");
        }
    } catch (error) {
        showNotification("Произошла ошибка при отправке данных. Проверьте подключение к интернету.", "error");
    }
});

function showNotification(message, type) {
    const existing = document.querySelector(".notification");
    if (existing) existing.remove();

    const notification = document.createElement("div");
    notification.className = `notification ${type}`; 
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}
