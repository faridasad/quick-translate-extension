/* function getOffset( el ) {
  var _x = 0;
  var _y = 0;
  while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
      _x += el.offsetLeft - el.scrollLeft;
      _y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
  }
  return { top: _y, left: _x };
} */

window.addEventListener("mouseup", (e) => {
  document.getElementById("badge") && document.getElementById("badge").remove();

  text = "";

  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }

  if (text.trim() === "" || text.trim() === undefined || text.trim() === null) return;

/* 
  let _left = getOffset(e.target).left
  let _top = getOffset(e.target).top */

  
  const popup = document.createElement("span");
  popup.id = "badge";
  popup.style.cssText = `
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          max-width: 100px;
          font-size: 1rem;
          background-color: #222;
          color: #fff;
          padding: .5rem 1rem;
          border-radius: 5px;    
          position: absolute;
          z-index: 999;   
      `;
    

  chrome.storage.local.get(["select_value"], async (items) => {
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=en-GB|${items.select_value}`;
    
    try {
      const res = await fetch(apiUrl);
      if(!res.ok){
        popup.textContent = "ENOUGH FOR TODAY, TIME TO GO TO BED"
        return
      }
      
      const data = await res.json();
      popup.textContent = data.responseData.translatedText;
    } catch (error) {
      console.log(error);
    }
    
  });

  window.getSelection().anchorNode.parentElement.appendChild(popup);
  
});
