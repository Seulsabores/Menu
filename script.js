const menuData = [
    {
        category: "🔥 Promoções (até 20/09)",
        items: [
            { id: "promo_1", name: "Hot dog meio meio + Refrigerante Laranja", price: 9.50, description: "Hot dog meio meio e Refrigerante Laranja (250ml).", image: "img/promo_hotdog_laranja.jpg" },
            { id: "promo_2", name: "Sanduíche + Refrigerante Laranja", price: 13.50, description: "Sanduíche estilo da coreia e Refrigerante Laranja (250ml).", image: "img/promo_sanduiche_laranja.jpg" },
            { id: "promo_3", name: "Hot dog meio meio + Tokoti + Refrigerante Laranja", price: 13.00, description: "Hot dog meio meio, Tokoti e Refrigerante Laranja (250ml).", image: "img/promo_hotdog_tokoti_laranja.jpg" },
            { id: "promo_4", name: "Sanduíche + Tokoti + Refrigerante Laranja", price: 17.00, description: "Sanduíche estilo da coreia, Tokoti e Refrigerante Laranja (250ml).", image: "img/promo_sanduiche_tokoti_laranja.jpg" }
        ]
    },
    {
        category: "🌭 Hot dog",
        items: [
            { id: "hotdog_1", name: "Meio meio", price: 8.00, description: "Queijo, Salsicha.", image: "img/hotdog_meiomeio.jpg" },
            { id: "hotdog_2", name: "Super queijo", price: 9.00, description: "Com dobro de queijo.", image: "img/hotdog_superqueijo.jpg" },
            { id: "hotdog_3", name: "Meio meio c/ batata", price: 10.00, description: "Queijo, Salsicha e empanado em cubos de Batata.", image: "img/hotdog_meiomeiocbatata.jpg" },
            { id: "hotdog_4", name: "Super queijo c/ batata", price: 11.00, description: "Com dobro de queijo e empanado em cubos de Batata.", image: "img/hotdog_superqueijocbatata.jpg" }
        ]
    },
    {
        category: "🥟 Pastel",
        items: [
            { id: "pastel_1", name: "Pastel de Queijo", price: 7.50, description: "Pastel recheado com Queijo.", image: "img/pastel_queijo.jpg" },
            { id: "pastel_2", name: "Pastel de Misto", price: 7.50, description: "Queijo e Presunto.", image: "img/pastel_misto.jpg" },
            { id: "pastel_3", name: "Pastel de Mistão", price: 10.00, description: "Queijo, Presunto e Carne.", image: "img/pastel_mistao.jpg" }
        ]
    },
    {
        category: "🍔 Outros",
        items: [
            { id: "other_1", name: "Sanduíche", price: 12.00, description: "Sanduíche estilo da coreia.", image: "img/sanduiche.jpg" },
            { id: "other_2", name: "Palito de queijo", price: 4.00, description: "Palito de Queijo empanado.", image: "img/palito_queijo.jpg" },
            { id: "other_3", name: "Coxinha de frango", price: 2.50, description: "Coxinha de frango com catupiry.", image: "img/coxinha_frango.jpg" },
            { id: "other_4", name: "Batata espiral", price: 5.00, description: "Batata no palito em formato espiral.", image: "img/batata_espiral.jpg" },
            { id: "other_5", name: "Tokoti", price: 4.50, description: "Mini-rolinhos com molho coreano.", image: "img/tokoti.jpg" },
            { id: "other_6", name: "Batata frita", price: 5.00, description: "Batata frita.", image: "img/batata_frita.jpg" }
        ]
    },
    {
        category: "🍱 Combo",
        items: [
            { id: "combo_1", name: "Sanduíche + batata frita", price: 17.00, description: "Acompanha sanduíche e batata frita.", image: "img/combo_sanduiche.jpg" }
        ]
    },
    {
        category: "🥤 Bebidas",
        items: [
            { id: "drink_1", name: "Guaraná", price: 2.50, description: "250ml.", image: "img/guarana.jpg" },
            { id: "drink_2", name: "Laranja", price: 2.50, description: "250ml.", image: "img/laranja.jpg" }
        ]
    }
];

const whatsappNumber = "5585996287458";
let cart = {};

function initMenu() {
    const container = document.getElementById("menu-container");
    
    menuData.forEach((cat) => {
        const catTitle = document.createElement("div");
        catTitle.className = "category-title";
        catTitle.innerText = cat.category;
        container.appendChild(catTitle);

        cat.items.forEach(item => {
            cart[item.id] = {
                name: item.name,
                price: item.price,
                qty: 0
            };

            const card = document.createElement("div");
            card.className = "item-card";

            let descHtml = item.description ? `<div class="item-desc">${item.description}</div>` : "";

            card.innerHTML = `
                <div class="item-header">
                    <img src="${item.image}" alt="${item.name}" class="item-img" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'70\\' height=\\'70\\' viewBox=\\'0 0 24 24\\'><rect width=\\'24\\' height=\\'24\\' fill=\\'%23e9ecef\\'/><text x=\\'50%\\' y=\\'50%\\' dominant-baseline=\\'middle\\' text-anchor=\\'middle\\' font-size=\\'10\\' fill=\\'%236c757d\\'>Sem Foto</text></svg>'">
                    <div class="item-info">
                        <h3>${item.name}</h3>
                        ${descHtml}
                        <div class="price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                    </div>
                    <div class="item-controls">
                        <button class="qty-btn" onclick="updateQty('${item.id}', -1)">-</button>
                        <span class="qty-display" id="qty-${item.id}">0</span>
                        <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    });
}

function updateQty(id, change) {
    if (cart[id]) {
        cart[id].qty = Math.max(0, cart[id].qty + change);
        document.getElementById(`qty-${id}`).innerText = cart[id].qty;
        updateTotal();
    }
}

function updateTotal() {
    let total = 0;
    for (let id in cart) {
        total += cart[id].price * cart[id].qty;
    }
    
    let orderTypeInput = document.querySelector('input[name="orderType"]:checked');
    let orderType = orderTypeInput ? orderTypeInput.value : "Retirada";
    
    let priceText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    
    if (orderType === "Entrega") {
        priceText += ` <span style="font-size: 0.8rem; font-weight: normal; opacity: 0.8;">(+ taxa de entrega)</span>`;
    }
    
    document.getElementById("total-price").innerHTML = priceText;
}

function toggleOrderType() {
    const orderType = document.querySelector('input[name="orderType"]:checked').value;
    const addressBox = document.getElementById("address-box");
    const paymentOptionsContainer = document.getElementById("payment-options-container");

    if (orderType === "Entrega") {
        addressBox.style.display = "block";
        paymentOptionsContainer.innerHTML = `
            <label style="opacity: 0.8; cursor: not-allowed;">
                <input type="radio" name="payment" value="Pix" checked disabled> Pix (Obrigatório para entrega)
            </label>
        `;
    } else {
        addressBox.style.display = "none";
        document.getElementById("delivery-address").value = "";
        paymentOptionsContainer.innerHTML = `
            <label>
                <input type="radio" name="payment" value="Pix" checked> Pix
            </label>
            <label>
                <input type="radio" name="payment" value="Dinheiro"> Dinheiro
            </label>
        `;
    }
    updateTotal();
}

function sendWhatsAppOrder() {
    let total = 0;
    let hasItems = false;
    let message = "Olá! Gostaria de fazer um pedido:\n\n";

    for (let id in cart) {
        let item = cart[id];
        if (item.qty > 0) {
            hasItems = true;
            total += item.price * item.qty;
            message += `🔵 ${item.name} x${item.qty}\n`;
        }
    }

    if (!hasItems) {
        alert("Por favor, selecione ao menos um item para fazer o pedido.");
        return;
    }

    message += `\n💰 Total: R$ ${total.toFixed(2).replace('.', ',')}\n`;

    let orderType = document.querySelector('input[name="orderType"]:checked').value;
    let orderTypeText = orderType === "Retirada" ? "Retirada na Loja" : "Entrega";
    message += `📍 Tipo: ${orderTypeText}\n`;

    if (orderType === "Entrega") {
        let address = document.getElementById("delivery-address").value.trim();
        if (!address) {
            alert("Por favor, informe o endereço de entrega.");
            document.getElementById("delivery-address").focus();
            return;
        }
        message += `🏠 Endereço: ${address}\n`;
    }

    let selectedPayment = "Pix";
    let paymentInput = document.querySelector('input[name="payment"]:checked');
    if (paymentInput) {
        selectedPayment = paymentInput.value;
    }
    message += `💳 Pagamento: ${selectedPayment}\n`;

    let notes = document.getElementById("order-notes").value.trim();
    if (notes) {
        message += `\nObservação:\n${notes}\n`;
    }

    message += "\nObrigado!";

    let url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

window.onload = initMenu;
