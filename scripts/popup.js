const func = () => {
  const shippingItems = document.querySelectorAll(".shipping-item");
  if (shippingItems && shippingItems.length) {
    let itemCount = 0;
    let total = 0;
    for (const entry of shippingItems.values()) {
      const amount = entry.innerText.split(" ")[1];
      total += parseFloat(amount);
      itemCount += 1;
    }
    let popup;
    popup = document.getElementById("floatingInfoBox");
    if (!popup) {
      popup = document.createElement("div");
      popup.id = "floatingInfoBox";
      popup.style.position = "fixed";
      popup.style.top = "0";
      popup.style.right = "0";
      popup.style.padding = "5px";
      popup.style.backgroundColor = "#fff";
      popup.style.border = "1px solid #000";
    } else {
      popup.innerHTML = "";
    }

    const transactionsCount = document.createElement("p");
    const transactionsTotal = document.createElement("p");
    transactionsCount.innerText = "Item Count: " + itemCount.toFixed(2);
    transactionsTotal.innerText = "Item Total: " + total.toFixed(2);
    popup.appendChild(transactionsCount);
    popup.appendChild(transactionsTotal);
    document.body.appendChild(popup);
  }
};

document.getElementById("button").onclick = () => {
  console.log("popup");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: func,
    });
  });
};
