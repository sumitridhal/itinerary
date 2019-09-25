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
    node.parentElement.querySelector('.st0').addEventListener('click', svgClick);
})


function scrollLeft() {
    scrollEl.scroll({ top: 0, left: -total, behavior: 'smooth' });
}

function scrollRight() {
    scrollEl.scroll({ top: 0, left: total, behavior: 'smooth' });
}

function svgClick(ev) {
    var g = Snap("#svgElem"),
        ball = g.select('#ball'),
        path = g.select('#path'),
        lenPath = Snap.path.getTotalLength(path.attr("d")),
        path0Pos = path.getPointAtLength(0);

    ballPosition(ball, path0Pos);
    removeST6();
    Snap.animate(0, lenPath, function (val) {
        var pos = path.getPointAtLength(val);
        ball.attr({
            transform: 't' + [pos.x, pos.y] +
                'r' + (pos.alpha - 90),
            fill: '#DCB66D'
        });
    }, 4000, mina.easeinout, function () {
        var targetNode = (ev.target.nodeName === 'text') ?
            ev.target.parentElement.querySelector('.st1')
            : ev.target;
        addCircles(targetNode);
    });
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


function ballPosition(ball, path0Pos) {
    ball.attr({
        transform: 't' + [path0Pos.x, path0Pos.y] +
            'r' + (path0Pos.alpha - 90),
            fill: '#DCB66D'
    });
}

function addCircles(targetNode) {
    var x = targetNode.cx.baseVal.value,
        y = targetNode.cy.baseVal.value,
        r = targetNode.r.baseVal.value;
    targetNode.setAttribute('r', (r * 2).toFixed(1));
    targetNode.classList.add('st6');
    appendCircle(targetNode.parentElement.id, x, y, r * 3, 'st7');
    appendCircle(targetNode.parentElement.id, x, y, r * 4, 'st8');
}

