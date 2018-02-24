'use strict';

(function (nodeClassName) {
    var node = document.createElement('div');
    node.className = 'search-popup';
    document.body.appendChild(node);
    var temp = document.querySelector('.search-popup');
    temp.innerHTML = '<div class="search-popup-content-temp"><div class="search-popup-content"><div class="search-popup-content-temp1"><div class="search-popup-content-header">\n    <div class="input-group mb-3">\n  <input type="text" class="form-control" placeholder="Recipient\'s username" aria-label="Recipient\'s username" aria-describedby="basic-addon2">\n  <div class="input-group-append">\n    <button class="btn btn-outline-secondary" type="button">Search</button>\n  </div>\n</div></div><div class="search-popup-content-body">hello world</div></div></div></div>';

    var contains = function contains(root, el) {
        if (root.compareDocumentPosition) return root === el || !!(root.compareDocumentPosition(el) & 16);
        if (root.contains && el.nodeType === 1) {
            return root.contains(el) && root !== el;
        }
        while (el = el.parentNode) {
            if (el === root) return true;
        }
        return false;
    };

    document.querySelector('.search-popup-content-temp').classList.remove('search-popup-content-visible-true');
    document.querySelector('.search-popup-content-temp').classList.add('search-popup-content-visible-false');
    document.addEventListener('mouseover', function (e) {
        if (e.target.className === nodeClassName) {
            document.querySelector('.search-popup-content-body').innerHTML = null;
            document.querySelector('.search-popup-content-header input').value = e.target.textContent.replace(/\s/, '');
            var _node = document.querySelector('.search-popup-content-temp');
            _node.classList.remove('search-popup-content-visible-false');
            _node.classList.add('search-popup-content-visible-true');
            var _temp = e.target;
            var left = 0,
                top = 0;

            while (_temp) {
                left = left + _temp.offsetLeft;
                top = top + _temp.offsetTop;
                _temp = _temp.offsetParent;
            }
            if (window.innerHeight > top + _node.offsetHeight - window.scrollY) {
                _node.classList.remove('search-popup-content-bottom');
                _node.classList.add('search-popup-content-up');
                top = top + e.target.offsetHeight;
            } else {
                _node.classList.remove('search-popup-content-up');
                _node.classList.add('search-popup-content-bottom');
            }
            if (window.innerWidth < left + _node.offsetWidth - window.screenX) {
                left = left + e.target.offsetWidth;
                _node.classList.add('search-popup-content-right');
                if (_node.classList.contains('search-popup-content-bottom')) {
                    _node.classList.add('search-popup-content-right-bottom');
                }
            } else {
                _node.classList.remove('search-popup-content-right');
                _node.classList.remove('search-popup-content-right-bottom');
            }
            _node.style.left = left + 'px';
            _node.style.top = top + 'px';
            document.querySelector('.search-popup-content-header button').click();
            return;
        }
        node.classList.remove('search-popup-content-visible-false');
        node.classList.add('search-popup-content-visible-true');
    });

    document.addEventListener('mouseout', function (e) {
        if (!e.toElement || contains(document.querySelector('.search-popup'), e.toElement)) {
            return;
        }
        document.querySelector('.search-popup-content-temp').classList.remove('search-popup-content-visible-true');
        document.querySelector('.search-popup-content-temp').classList.add('search-popup-content-visible-false');
    });

    document.querySelector('.search-popup-content-header button').addEventListener('click', function (e) {
        var value = document.querySelector('.search-popup-content-header input').value;
        document.querySelector('.search-popup-content-body').innerHTML = '<span style="display: block;width: fit-content;margin: 0 auto;">searching...</span>';
        if (value) {
            var xmlhttp;
            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
            } else {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var data = JSON.parse(xmlhttp.responseText);
                        var paragraph_div = '';
                        for (var key in data) {
                            var item_span = '';
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;

                            try {
                                for (var _iterator = data[key][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    var val = _step.value;

                                    item_span = item_span + '<span data-word="' + val + '">' + val + '</span>';
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return) {
                                        _iterator.return();
                                    }
                                } finally {
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }
                            var value_div = '<div class="val">' + item_span + '</div>';
                            paragraph_div = paragraph_div + ('<div class="paragraph"><hr><div class="key">' + key + '</div>' + value_div + '</div>');
                        }
                        document.querySelector('.search-popup-content-body').innerHTML = paragraph_div;
                    } else {
                        document.querySelector('.search-popup-content-body').innerHTML = '<span style="color:red;display: block;width: fit-content;margin: 0 auto;">no result</span>';
                        var error = new Error(response.statusText);
                        error.response = response;
                        throw error;
                    }
                }
            }
            xmlhttp.open("GET", "https://5g2vk5o7si.execute-api.ap-northeast-1.amazonaws.com/api/wd_sketch/" + value, true);
            xmlhttp.send();
        }
    });
})('height-lighted-word');