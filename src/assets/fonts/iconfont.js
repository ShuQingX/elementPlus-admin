!(function (t) {
  var e,
    c,
    n,
    o,
    i,
    a =
      '<svg><symbol id="icon-warning-circle" viewBox="0 0 1024 1024"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"  ></path><path d="M512 688m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z"  ></path><path d="M488 576h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"  ></path></symbol><symbol id="icon-component" viewBox="0 0 1024 1024"><path d="M1024 1024H0V0h1024zM83.186515 940.813485h857.62697V83.186515H83.186515z"  ></path><path d="M529.833109 522.320327h-343.53431V178.851007h343.53431z m-260.282806-83.186515h177.096291V262.037521h-177.16128z"  ></path><path d="M856.418167 838.429083H333.161991V573.12909h83.186515v182.113478h356.883146V398.346424H587.023838v-83.186514h269.394329v523.269173z"  ></path></symbol><symbol id="icon-dashboard" viewBox="0 0 1024 1024"><path d="M924.8 385.6c-22.6-53.4-54.9-101.3-96-142.4-41.1-41.1-89-73.4-142.4-96C631.1 123.8 572.5 112 512 112s-119.1 11.8-174.4 35.2c-53.4 22.6-101.3 54.9-142.4 96-41.1 41.1-73.4 89-96 142.4C75.8 440.9 64 499.5 64 560c0 132.7 58.3 257.7 159.9 343.1l1.7 1.4c5.8 4.8 13.1 7.5 20.6 7.5h531.7c7.5 0 14.8-2.7 20.6-7.5l1.7-1.4C901.7 817.7 960 692.7 960 560c0-60.5-11.9-119.1-35.2-174.4zM761.4 836H262.6C184.5 765.5 140 665.6 140 560c0-99.4 38.7-192.8 109-263 70.3-70.3 163.7-109 263-109 99.4 0 192.8 38.7 263 109 70.3 70.3 109 163.7 109 263 0 105.6-44.5 205.5-122.6 276z"  ></path><path d="M623.5 421.5c-3.1-3.1-8.2-3.1-11.3 0L527.7 506c-18.7-5-39.4-0.2-54.1 14.5-21.9 21.9-21.9 57.3 0 79.2 21.9 21.9 57.3 21.9 79.2 0 14.7-14.7 19.5-35.4 14.5-54.1l84.5-84.5c3.1-3.1 3.1-8.2 0-11.3l-28.3-28.3zM490 320h44c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8h-44c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8zM750 538v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8zM762.7 340.8l-31.1-31.1c-3.1-3.1-8.2-3.1-11.3 0l-56.6 56.6c-3.1 3.1-3.1 8.2 0 11.3l31.1 31.1c3.1 3.1 8.2 3.1 11.3 0l56.6-56.6c3.1-3.1 3.1-8.2 0-11.3zM304.1 309.7c-3.1-3.1-8.2-3.1-11.3 0l-31.1 31.1c-3.1 3.1-3.1 8.2 0 11.3l56.6 56.6c3.1 3.1 8.2 3.1 11.3 0l31.1-31.1c3.1-3.1 3.1-8.2 0-11.3l-56.6-56.6zM262 530h-80c-4.4 0-8 3.6-8 8v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8z"  ></path></symbol></svg>',
    d = (d = document.getElementsByTagName('script'))[d.length - 1].getAttribute('data-injectcss'),
    l = function (t, e) {
      e.parentNode.insertBefore(t, e);
    };
  if (d && !t.__iconfont__svg__cssinject__) {
    t.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
      );
    } catch (t) {
      console && console.log(t);
    }
  }
  function h() {
    i || ((i = !0), n());
  }
  function s() {
    try {
      o.documentElement.doScroll('left');
    } catch (t) {
      return void setTimeout(s, 50);
    }
    h();
  }
  (e = function () {
    var t,
      e = document.createElement('div');
    (e.innerHTML = a),
      (a = null),
      (e = e.getElementsByTagName('svg')[0]) &&
        (e.setAttribute('aria-hidden', 'true'),
        (e.style.position = 'absolute'),
        (e.style.width = 0),
        (e.style.height = 0),
        (e.style.overflow = 'hidden'),
        (e = e),
        (t = document.body).firstChild ? l(e, t.firstChild) : t.appendChild(e));
  }),
    document.addEventListener
      ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
        ? setTimeout(e, 0)
        : ((c = function () {
            document.removeEventListener('DOMContentLoaded', c, !1), e();
          }),
          document.addEventListener('DOMContentLoaded', c, !1))
      : document.attachEvent &&
        ((n = e),
        (o = t.document),
        (i = !1),
        s(),
        (o.onreadystatechange = function () {
          'complete' == o.readyState && ((o.onreadystatechange = null), h());
        }));
})(window);
