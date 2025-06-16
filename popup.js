document.querySelectorAll('.tabs button').forEach(bt => {
    bt.addEventListener('click', () => {
        const url = `https://summer.hackclub.com${bt.dataset.url}`;
        console.log(`Opening URL: ${url}`);

        browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
            const currentTab = tabs[0];
            if (currentTab.url === url) {
                console.log('URL is already open in the current tab.');
            } else {
                browser.tabs.update(currentTab.id, { url: url });
            }
        }).catch(err => console.error('Error querying tabs:', err));

        document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.content').forEach(tab => tab.classList.remove('active'));
        bt.classList.add('active');
        document.querySelector(`#${bt.dataset.tab}`).classList.add('active');
    });
});