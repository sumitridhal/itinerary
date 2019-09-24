var left = document.querySelector('.singleleftslide'),
    right = document.querySelector('.singlerightslide'),
    element = document.querySelector('.card.overlay-bt'),
    cards = document.querySelector('.ui.cards'),
    scrollEl = document.querySelector('.card-container'),
    circle = document.querySelectorAll('.st1');

var style = element.currentStyle || window.getComputedStyle(element),
    width = element.offsetWidth, // or use style.width
    margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight),
    padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
    border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth),
    total = (width + margin - padding + border);

cards.style.width = (total * 5) + 'px';
left.style.top = right.style.top = (width / 2) + 'px';
scrollEl.scrollLeft == 0 && (left.classList.add('removehover'));

left.addEventListener('click', function () {
    right.classList.remove('removehover');
    scrollLeft();
    setTimeout(() => {
        scrollEl.scrollLeft == 0 && (left.classList.add('removehover'));
    }, 200);
});

right.addEventListener('click', function () {
    left.classList.remove('removehover');
    scrollRight();
    setTimeout(() => {
        Math.floor((scrollEl.scrollWidth - scrollEl.clientWidth) / 100) == Math.floor(scrollEl.scrollLeft / 100) &&
            (right.classList.add('removehover'));
    }, 200);
});

circle.forEach((node) => {
    node.addEventListener('click', svgClick);
})


function scrollLeft() {
    scrollEl.scroll({ top: 0, left: -total, behavior: 'smooth' });
}

function scrollRight() {
    scrollEl.scroll({ top: 0, left: total, behavior: 'smooth' });
}

function svgClick(ev) {
    var x = ev.target.cx.baseVal.value,
        y = ev.target.cy.baseVal.value,
        r = ev.target.r.baseVal.value;
    removeST6();
    ev.target.setAttribute('r', (r * 2).toFixed(1));
    ev.target.classList.add('st6');
    appendCircle(ev.target.parentElement.id, x, y, r * 3, 'st7');
    appendCircle(ev.target.parentElement.id, x, y, r * 4, 'st8');
}

function appendCircle(id, x, y, r, cls) {
    d3.select('#' + id)
        .append('circle')
        .attr('cx', x.toFixed(1))
        .attr('cy', y.toFixed(1))
        .attr('r', r.toFixed(1))
        .classed(cls, true);
}

function removeST6() {
    var st6 = document.querySelector('.st6'),
        st6_r = st6.r.baseVal.value;
    st6.setAttribute('r', (st6_r / 2).toFixed(1));
    st6.classList.remove('st6');
    st6.parentNode.removeChild(st6.parentNode.querySelector('.st7'));
    st6.parentNode.removeChild(st6.parentNode.querySelector('.st8'));
}
