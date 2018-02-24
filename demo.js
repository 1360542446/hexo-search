((nodeClassName) => {
    let node = document.createElement('div');
    node.className = 'search-popup';
    document.body.appendChild(node);
    let temp = document.querySelector('.search-popup');
    temp.innerHTML = `<div class="search-popup-content-temp"><div class="search-popup-content"><div style="width:100%;height:100%;overflow:auto"><div class="search-popup-content-header">
    <input /> <button>Search</button></div><hr><div class="search-popup-content-body">hello world</div></div></div></div>`;

    const contains = (root, el) => {
        if (root.compareDocumentPosition)
            return root === el || !!(root.compareDocumentPosition(el) & 16);
        if (root.contains && el.nodeType === 1) {
            return root.contains(el) && root !== el;
        }
        while ((el = el.parentNode))
            if (el === root) return true;
        return false;
    }

    document.querySelector('.search-popup-content-temp').classList.remove('search-popup-content-visible-true');
    document.querySelector('.search-popup-content-temp').classList.add('search-popup-content-visible-false');
    document.addEventListener('mouseover', e => {
        if (e.target.className === nodeClassName) {
            document.querySelector('.search-popup-content-body').innerHTML = null;
            document.querySelector('.search-popup-content-header>input').value = e.target.textContent;
            let node = document.querySelector('.search-popup-content-temp');
            node.classList.remove('search-popup-content-visible-false');
            node.classList.add('search-popup-content-visible-true');
            let temp = e.target;
            let [left, top] = [0, 0];
            while (temp != document) {
                left = left + temp.offsetLeft;
                top = top + temp.offsetTop;
                temp = temp.parentNode;
            }
            if (window.innerHeight > top + node.offsetHeight) {
                node.classList.remove('search-popup-content-bottom');
                node.classList.add('search-popup-content-up');
                top = top + e.target.offsetHeight;
            } else {
                node.classList.remove('search-popup-content-up');
                node.classList.add('search-popup-content-bottom');
            }
            if (window.innerWidth < left + node.offsetWidth) {
                left = left + e.target.offsetWidth;
                node.classList.add('search-popup-content-right');
                if (node.classList.contains('search-popup-content-bottom')) {
                    node.classList.add('search-popup-content-right-bottom');
                }
            } else {
                node.classList.remove('search-popup-content-right');
                node.classList.remove('search-popup-content-right-bottom');
            }
            node.style.left = left + 'px';
            node.style.top = top + 'px';
            document.querySelector('.search-popup-content-header>button').click();   
            return;
        }
        node.classList.remove('search-popup-content-visible-false');
        node.classList.add('search-popup-content-visible-true');
    })

    document.addEventListener('mouseout', e => {
        if (!e.toElement || contains(document.querySelector('.search-popup'), e.toElement)) {
            return;
        }
        document.querySelector('.search-popup-content-temp').classList.remove('search-popup-content-visible-true');
        document.querySelector('.search-popup-content-temp').classList.add('search-popup-content-visible-false');
    });

    document.querySelector('.search-popup-content-header>button').addEventListener('click', e => {
        let value = document.querySelector('.search-popup-content-header>input').value;
        if (value) {
            fetch('https://5g2vk5o7si.execute-api.ap-northeast-1.amazonaws.com/api/wd_sketch/' + value).then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                      }
                      const error = new Error(response.statusText);
                      error.response = response;
                      throw error;
            }).
            then(data => {
                let paragraph_div = '';
                for (let key in data) {
                    let item_span = '';
                    for (let val of data[key]) {
                        item_span = item_span + '<span>' + val + '</span>';
                    }
                    let value_div = `<div class="val">${item_span}</div>`;
                    paragraph_div = paragraph_div + `<div class="paragraph"><div class="key">${key}<hr></div>${value_div}</div>`;
                }
                console.log(paragraph_div)
                document.querySelector('.search-popup-content-body').innerHTML = paragraph_div;
            })
        }
    })

})('test');