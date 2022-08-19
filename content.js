window.addEventListener("mouseup", () => {
  document.getElementById("badge") && document.getElementById("badge").remove();

  let text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }

  if (text.trim() === "" || text.trim() === undefined || text.trim() === null)
    return;

  const popup = document.createElement("span");
  popup.id = "badge";
  popup.style.cssText = `
          display: flex;
          justify-content: center;
          align-items: center;
          max-width: 100px;
          font-size: 1rem;
          background-color: #222;
          color: #fff;
          padding: .5rem 1rem;
          border-radius: 5px;      
      `;

  chrome.storage.local.get(["select_value"], async (items) => {
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=en-GB|${items.select_value}`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    popup.textContent = data.responseData.translatedText;
  });

  window.getSelection().anchorNode.parentElement.appendChild(popup);
});
