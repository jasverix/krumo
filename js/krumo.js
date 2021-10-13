// Command to generate minified JS:
// curl -X POST -s --data-urlencode 'input@krumo.js' https://javascript-minifier.com/raw

/**
 * JavaScript routines for Krumo
 *
 * @version $Id: krumo.js 22 2007-12-02 07:38:18Z Mrasnika $
 */

/////////////////////////////////////////////////////////////////////////////

/**
 * Krumo JS Class
 */
function krumo() {
}

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

/**
 * Add a CSS class to an HTML element
 *
 * @param {HTMLElement} el
 * @param {string} className
 * @return void
 */
krumo.reclass = function (el, className) {
    if (el.className.indexOf(className) < 0) {
        el.className += (' ' + className);
    }
}

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

/**
 * Remove a CSS class to an HTML element
 *
 * @param {HTMLElement} el
 * @param {string} className
 * @return void
 */
krumo.unclass = function (el, className) {
    if (el.className.indexOf(className) > -1) {
        el.className = el.className.replace(className, '');
    }
}

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

/**
 * Toggle the nodes connected to an HTML element
 *
 * @param {MouseEvent} event
 * @return void
 */
krumo.toggle = function (event) {
    var elem = event.target.closest(".krumo-expand");
    var ctrl = event.ctrlKey;
    var is_expanded = !elem.classList.contains("krumo-opened");

    // Adding a control to you click does an expand/collapse all
    if (ctrl) {
        if (is_expanded) {
            krumo.expand_all(elem);
        } else {
            krumo.collapse_all(elem);
        }
    } else {
        if (is_expanded) {
            krumo.expand(elem);
        } else {
            krumo.collapse(elem);
        }
    }

    event.stopPropagation();
}

krumo.expand = function (el) {
    var paren = el.parentNode;
    var nest = paren.querySelector(".krumo-nest");
    var exp = paren.querySelector(".krumo-expand");

    nest.style.display = 'block';
    krumo.reclass(exp, "krumo-opened");
}

krumo.collapse = function (el) {
    var paren = el.parentNode;
    var nest = paren.querySelector(".krumo-nest");
    var exp = paren.querySelector(".krumo-expand");

    nest.style.display = 'none';
    krumo.unclass(exp, "krumo-opened");
}

krumo.expand_all = function (el) {
    var paren = el.parentNode;
    var nest = paren.querySelectorAll(".krumo-nest");
    var exp = paren.querySelectorAll(".krumo-expand");

    nest.forEach(function (item) {
        item.style.display = 'block';
    });

    exp.forEach(function (item) {
        krumo.reclass(item, "krumo-opened");
    });
}

krumo.collapse_all = function (el) {
    var paren = el.parentNode;
    var nest = paren.querySelectorAll(".krumo-nest");
    var exp = paren.querySelectorAll(".krumo-expand");

    nest.forEach(function (item) {
        item.style.display = 'none';
    });

    exp.forEach(function (item) {
        krumo.unclass(item, "krumo-opened");
    });
}

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

/**
 * Hover over an HTML element
 *
 * @param {HTMLElement} el
 * @return void
 */
krumo.over = function (el) {
    krumo.reclass(el, 'krumo-hover');
}

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

/**
 * Hover out an HTML element
 *
 * @param HtmlElement el
 * @return void
 */

krumo.out = function (el) {
    krumo.unclass(el, 'krumo-hover');
}

/////////////////////////////////////////////////////////////////////////////

function qsa(search) {
    return document.querySelectorAll(search);
}

function init_click() {
    var elems = qsa('.krumo-expand');

    // Add a click item to everything that's expandable
    elems.forEach(function (el) {
        el.parentNode.removeEventListener('click', krumo.toggle);
        el.parentNode.addEventListener("click", krumo.toggle);
    });
}

init_click();

// Equivalent to $(document).ready() in JQUery
// https://stackoverflow.com/questions/2304941/what-is-the-non-jquery-equivalent-of-document-ready
document.addEventListener("DOMContentLoaded", function () {
    init_click();
    setTimeout(function () {
        init_click();
    }, 10);
});
