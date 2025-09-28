frappe.ui.form.on('POS Invoice', {
    onload: function(frm) {
        const convertCardsToTextElements = () => {
            const cards = document.querySelectorAll("div[data-item-code]");

            cards.forEach(card => {
                if (card.classList.contains("converted-text")) return;

                const item_code = card.getAttribute("data-item-code");
                const item_text = card.innerText.trim().replace(/\n+/g, " | ").split(" | ")[2];

                // إنشاء عنصر نصي بدلاً من الرابط
                const textElement = document.createElement("div");
                textElement.innerText = item_text;
                
                // تنسيقات العنصر النصي (نفس تنسيقات الرابط السابق)
                textElement.style.cssText = `
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 110%;
                    padding: 1px;
                    margin: 0;
                    color: #000;
                    font-weight: bold;
                    font-size: 15px;
                    text-align: center;
                    border: 1px solid #ccc;
                    border-radius: 0.5px;
                    background: #e6edff;
                    box-sizing: border-box;
                    white-space: normal;
                    word-break: break-word;
                    overflow-wrap: break-word;
                    cursor: pointer;
                `;

                // إضافة حدث النقر (نفس وظيفة الرابط)
                textElement.onclick = () => {
                    if (frappe?.pos?.app?.add_new_item_to_cart) {
                        frappe.pos.app.add_new_item_to_cart(item_code);
                }
            };

            card.innerHTML = "";
            card.appendChild(textElement);
            card.classList.add("converted-text");
                
            card.style.cssText = `
                    width: 110%;
                    height: auto;
                    min-height: 40px;
                    padding: 0px;
                    margin: 0;
                `;
        });
    };

const observer = new MutationObserver(() => {
    convertCardsToTextElements();
});

setTimeout(() => {
    const target = document.querySelector(".item-list") || document.querySelector("div.grid") || document.body;
    if (target) {
        target.style.gap = "2px";
        observer.observe(target, {childList: true, subtree: true});
        convertCardsToTextElements();
    }
}, 1500);
}
});