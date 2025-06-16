const cards = document.querySelectorAll('.card-with-gradient[data-padding="md"]');

function getID(card, index) {
    return index + ". " + card.querySelector(".flex-grow h3.font-bold").textContent.trim();
}

cards.forEach((card, index) => {
    const ID = getID(card, index);
    const btn = document.createElement('button');
    btn.textContent = 'Hide';

    btn.style.position = 'absolute';
    btn.style.top = '20px';
    btn.style.left = '15px';
    btn.style.backgroundColor = 'rgba(224, 73, 27, 0.8)';
    btn.style.border = '1px solid #ccc';
    btn.style.borderRadius = '24px';
    btn.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    btn.style.color = '#FFF';


    btn.style.zIndex = '1000';
    btn.style.padding = '4px 8px';
    btn.style.fontSize = '12px';
    btn.style.cursor = 'pointer';

    card.style.position = card.style.position || 'relative';

    btn.addEventListener('click', async () => {
        const res = await browser.storage.sync.get(["shopHidden"]);
          

        if (!res) {
            browser.storage.sync.set({ shopHidden: [ID] }, () => {
                item.style.display = "none";
            });

            return;
        }

        const shopHidden = res.shopHidden || [];

        if (!shopHidden.includes(ID)) {
            shopHidden.push(ID);

            const _ = await browser.storage.sync.set({ shopHidden });
            card.style.display = "none";
        }
    });

    card.appendChild(btn);
});

console.log("Shop page detected. Setting up hide buttons.");
(async () => {
    const result = await browser.storage.sync.get(["shopHidden"]);
    if (!result) {
        browser.storage.sync.set({ shopHidden: [] }, () => {
            console.log("No hidden items found. Creating new list.");
        });

        return;
    }
    console.log(result)
    const shopHidden = result.shopHidden || [];
    console.log(shopHidden);
    const items = document.querySelectorAll('.card-with-gradient[data-padding="md"]');
    items.forEach((item, index) => {
        const ID = getID(item, index);

        if (shopHidden.includes(ID)) {
            item.style.display = "none";
        }
    });
    console.log("Hide buttons set up for shop items.");
    console.log("Shop items hidden based on stored preferences.");
})();

// (result) => {
//     if (!result) {
//         browser.storage.sync.set({shopHidden: []}, () => {
//             console.log("No hidden items found. Creating new list.");
//         });

//         return;
//     }

//     const shopHidden = result.shopHidden || [];
//     console.log(shopHidden)

//     Array.from(items).forEach((item, index) => {
//         const title =  index + ". " + item.querySelector(".tracking-tight").textContent.trim();

//         if (shopHidden.includes(title)) {
//             item.style.display = "none";
//         }
//     });
// }