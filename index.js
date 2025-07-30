var pg = Object.defineProperty;
var mg = (e, t, n) =>
  t in e
    ? pg(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n,
      })
    : (e[t] = n);
var Re = (e, t, n) => (mg(e, typeof t != 'symbol' ? t + '' : t, n), n);
(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const i of s) if (i.type === 'childList') for (const a of i.addedNodes) a.tagName === 'LINK' && a.rel === 'modulepreload' && r(a);
  }).observe(document, {
    childList: !0,
    subtree: !0,
  });
  function n(s) {
    const i = {};
    return (
      s.integrity && (i.integrity = s.integrity),
      s.referrerPolicy && (i.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === 'use-credentials' ? (i.credentials = 'include') : s.crossOrigin === 'anonymous' ? (i.credentials = 'omit') : (i.credentials = 'same-origin'),
      i
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const i = n(s);
    fetch(s.href, i);
  }
})();
function Vu(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (s) {
        return Object.getOwnPropertyDescriptor(e, s).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function oe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Vu(Object(n), !0).forEach(function (r) {
          Qe(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Vu(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function ga(e) {
  '@babel/helpers - typeof';
  return (
    (ga =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == 'function' && t.constructor === Symbol && t !== Symbol.prototype ? 'symbol' : typeof t;
          }),
    ga(e)
  );
}
function gg(e, t) {
  if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
}
function Fu(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function vg(e, t, n) {
  return (
    t && Fu(e.prototype, t),
    n && Fu(e, n),
    Object.defineProperty(e, 'prototype', {
      writable: !1,
    }),
    e
  );
}
function Qe(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function mc(e, t) {
  return _g(e) || wg(e, t) || Yh(e, t) || xg();
}
function di(e) {
  return bg(e) || yg(e) || Yh(e) || Eg();
}
function bg(e) {
  if (Array.isArray(e)) return ll(e);
}
function _g(e) {
  if (Array.isArray(e)) return e;
}
function yg(e) {
  if ((typeof Symbol < 'u' && e[Symbol.iterator] != null) || e['@@iterator'] != null) return Array.from(e);
}
function wg(e, t) {
  var n = e == null ? null : (typeof Symbol < 'u' && e[Symbol.iterator]) || e['@@iterator'];
  if (n != null) {
    var r = [],
      s = !0,
      i = !1,
      a,
      o;
    try {
      for (n = n.call(e); !(s = (a = n.next()).done) && (r.push(a.value), !(t && r.length === t)); s = !0);
    } catch (l) {
      (i = !0), (o = l);
    } finally {
      try {
        !s && n.return != null && n.return();
      } finally {
        if (i) throw o;
      }
    }
    return r;
  }
}
function Yh(e, t) {
  if (e) {
    if (typeof e == 'string') return ll(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === 'Object' && e.constructor && (n = e.constructor.name), n === 'Map' || n === 'Set')) return Array.from(e);
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ll(e, t);
  }
}
function ll(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function Eg() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function xg() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Bu = function () {},
  gc = {},
  Xh = {},
  Qh = null,
  Jh = {
    mark: Bu,
    measure: Bu,
  };
try {
  typeof window < 'u' && (gc = window), typeof document < 'u' && (Xh = document), typeof MutationObserver < 'u' && (Qh = MutationObserver), typeof performance < 'u' && (Jh = performance);
} catch {}
var Sg = gc.navigator || {},
  ju = Sg.userAgent,
  Wu = ju === void 0 ? '' : ju,
  Hn = gc,
  je = Xh,
  Uu = Qh,
  Li = Jh;
Hn.document;
var yn = !!je.documentElement && !!je.head && typeof je.addEventListener == 'function' && typeof je.createElement == 'function',
  Zh = ~Wu.indexOf('MSIE') || ~Wu.indexOf('Trident/'),
  Pi,
  Ii,
  Mi,
  Ni,
  Ri,
  hn = '___FONT_AWESOME___',
  cl = 16,
  e1 = 'fa',
  t1 = 'svg-inline--fa',
  vr = 'data-fa-i2svg',
  ul = 'data-fa-pseudo-element',
  Ag = 'data-fa-pseudo-element-pending',
  vc = 'data-prefix',
  bc = 'data-icon',
  qu = 'fontawesome-i2svg',
  Cg = 'async',
  Tg = ['HTML', 'HEAD', 'STYLE', 'SCRIPT'],
  n1 = (function () {
    try {
      return !0;
    } catch {
      return !1;
    }
  })(),
  Be = 'classic',
  qe = 'sharp',
  _c = [Be, qe];
function hi(e) {
  return new Proxy(e, {
    get: function (n, r) {
      return r in n ? n[r] : n[Be];
    },
  });
}
var Ks = hi(
    ((Pi = {}),
    Qe(Pi, Be, {
      'fa': 'solid',
      'fas': 'solid',
      'fa-solid': 'solid',
      'far': 'regular',
      'fa-regular': 'regular',
      'fal': 'light',
      'fa-light': 'light',
      'fat': 'thin',
      'fa-thin': 'thin',
      'fad': 'duotone',
      'fa-duotone': 'duotone',
      'fab': 'brands',
      'fa-brands': 'brands',
      'fak': 'kit',
      'fa-kit': 'kit',
    }),
    Qe(Pi, qe, {
      'fa': 'solid',
      'fass': 'solid',
      'fa-solid': 'solid',
      'fasr': 'regular',
      'fa-regular': 'regular',
      'fasl': 'light',
      'fa-light': 'light',
    }),
    Pi),
  ),
  Gs = hi(
    ((Ii = {}),
    Qe(Ii, Be, {
      solid: 'fas',
      regular: 'far',
      light: 'fal',
      thin: 'fat',
      duotone: 'fad',
      brands: 'fab',
      kit: 'fak',
    }),
    Qe(Ii, qe, {
      solid: 'fass',
      regular: 'fasr',
      light: 'fasl',
    }),
    Ii),
  ),
  Ys = hi(
    ((Mi = {}),
    Qe(Mi, Be, {
      fab: 'fa-brands',
      fad: 'fa-duotone',
      fak: 'fa-kit',
      fal: 'fa-light',
      far: 'fa-regular',
      fas: 'fa-solid',
      fat: 'fa-thin',
    }),
    Qe(Mi, qe, {
      fass: 'fa-solid',
      fasr: 'fa-regular',
      fasl: 'fa-light',
    }),
    Mi),
  ),
  kg = hi(
    ((Ni = {}),
    Qe(Ni, Be, {
      'fa-brands': 'fab',
      'fa-duotone': 'fad',
      'fa-kit': 'fak',
      'fa-light': 'fal',
      'fa-regular': 'far',
      'fa-solid': 'fas',
      'fa-thin': 'fat',
    }),
    Qe(Ni, qe, {
      'fa-solid': 'fass',
      'fa-regular': 'fasr',
      'fa-light': 'fasl',
    }),
    Ni),
  ),
  $g = /fa(s|r|l|t|d|b|k|ss|sr|sl)?[\-\ ]/,
  r1 = 'fa-layers-text',
  Og = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,
  Lg = hi(
    ((Ri = {}),
    Qe(Ri, Be, {
      900: 'fas',
      400: 'far',
      normal: 'far',
      300: 'fal',
      100: 'fat',
    }),
    Qe(Ri, qe, {
      900: 'fass',
      400: 'fasr',
      300: 'fasl',
    }),
    Ri),
  ),
  s1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  Pg = s1.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
  Ig = ['class', 'data-prefix', 'data-icon', 'data-fa-transform', 'data-fa-mask'],
  cr = {
    GROUP: 'duotone-group',
    SWAP_OPACITY: 'swap-opacity',
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
  },
  Xs = new Set();
Object.keys(Gs[Be]).map(Xs.add.bind(Xs));
Object.keys(Gs[qe]).map(Xs.add.bind(Xs));
var Mg = []
    .concat(_c, di(Xs), [
      '2xs',
      'xs',
      'sm',
      'lg',
      'xl',
      '2xl',
      'beat',
      'border',
      'fade',
      'beat-fade',
      'bounce',
      'flip-both',
      'flip-horizontal',
      'flip-vertical',
      'flip',
      'fw',
      'inverse',
      'layers-counter',
      'layers-text',
      'layers',
      'li',
      'pull-left',
      'pull-right',
      'pulse',
      'rotate-180',
      'rotate-270',
      'rotate-90',
      'rotate-by',
      'shake',
      'spin-pulse',
      'spin-reverse',
      'spin',
      'stack-1x',
      'stack-2x',
      'stack',
      'ul',
      cr.GROUP,
      cr.SWAP_OPACITY,
      cr.PRIMARY,
      cr.SECONDARY,
    ])
    .concat(
      s1.map(function (e) {
        return ''.concat(e, 'x');
      }),
    )
    .concat(
      Pg.map(function (e) {
        return 'w-'.concat(e);
      }),
    ),
  Ls = Hn.FontAwesomeConfig || {};
function Ng(e) {
  var t = je.querySelector('script[' + e + ']');
  if (t) return t.getAttribute(e);
}
function Rg(e) {
  return e === '' ? !0 : e === 'false' ? !1 : e === 'true' ? !0 : e;
}
if (je && typeof je.querySelector == 'function') {
  var Dg = [
    ['data-family-prefix', 'familyPrefix'],
    ['data-css-prefix', 'cssPrefix'],
    ['data-family-default', 'familyDefault'],
    ['data-style-default', 'styleDefault'],
    ['data-replacement-class', 'replacementClass'],
    ['data-auto-replace-svg', 'autoReplaceSvg'],
    ['data-auto-add-css', 'autoAddCss'],
    ['data-auto-a11y', 'autoA11y'],
    ['data-search-pseudo-elements', 'searchPseudoElements'],
    ['data-observe-mutations', 'observeMutations'],
    ['data-mutate-approach', 'mutateApproach'],
    ['data-keep-original-source', 'keepOriginalSource'],
    ['data-measure-performance', 'measurePerformance'],
    ['data-show-missing-icons', 'showMissingIcons'],
  ];
  Dg.forEach(function (e) {
    var t = mc(e, 2),
      n = t[0],
      r = t[1],
      s = Rg(Ng(n));
    s != null && (Ls[r] = s);
  });
}
var i1 = {
  styleDefault: 'solid',
  familyDefault: 'classic',
  cssPrefix: e1,
  replacementClass: t1,
  autoReplaceSvg: !0,
  autoAddCss: !0,
  autoA11y: !0,
  searchPseudoElements: !1,
  observeMutations: !0,
  mutateApproach: 'async',
  keepOriginalSource: !0,
  measurePerformance: !1,
  showMissingIcons: !0,
};
Ls.familyPrefix && (Ls.cssPrefix = Ls.familyPrefix);
var Xr = oe(oe({}, i1), Ls);
Xr.autoReplaceSvg || (Xr.observeMutations = !1);
var ue = {};
Object.keys(i1).forEach(function (e) {
  Object.defineProperty(ue, e, {
    enumerable: !0,
    set: function (n) {
      (Xr[e] = n),
        Ps.forEach(function (r) {
          return r(ue);
        });
    },
    get: function () {
      return Xr[e];
    },
  });
});
Object.defineProperty(ue, 'familyPrefix', {
  enumerable: !0,
  set: function (t) {
    (Xr.cssPrefix = t),
      Ps.forEach(function (n) {
        return n(ue);
      });
  },
  get: function () {
    return Xr.cssPrefix;
  },
});
Hn.FontAwesomeConfig = ue;
var Ps = [];
function zg(e) {
  return (
    Ps.push(e),
    function () {
      Ps.splice(Ps.indexOf(e), 1);
    }
  );
}
var An = cl,
  Zt = {
    size: 16,
    x: 0,
    y: 0,
    rotate: 0,
    flipX: !1,
    flipY: !1,
  };
function Hg(e) {
  if (!(!e || !yn)) {
    var t = je.createElement('style');
    t.setAttribute('type', 'text/css'), (t.innerHTML = e);
    for (var n = je.head.childNodes, r = null, s = n.length - 1; s > -1; s--) {
      var i = n[s],
        a = (i.tagName || '').toUpperCase();
      ['STYLE', 'LINK'].indexOf(a) > -1 && (r = i);
    }
    return je.head.insertBefore(t, r), e;
  }
}
var Vg = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function Qs() {
  for (var e = 12, t = ''; e-- > 0; ) t += Vg[(Math.random() * 62) | 0];
  return t;
}
function ls(e) {
  for (var t = [], n = (e || []).length >>> 0; n--; ) t[n] = e[n];
  return t;
}
function yc(e) {
  return e.classList
    ? ls(e.classList)
    : (e.getAttribute('class') || '').split(' ').filter(function (t) {
        return t;
      });
}
function a1(e) {
  return ''.concat(e).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function Fg(e) {
  return Object.keys(e || {})
    .reduce(function (t, n) {
      return t + ''.concat(n, '="').concat(a1(e[n]), '" ');
    }, '')
    .trim();
}
function Da(e) {
  return Object.keys(e || {}).reduce(function (t, n) {
    return t + ''.concat(n, ': ').concat(e[n].trim(), ';');
  }, '');
}
function wc(e) {
  return e.size !== Zt.size || e.x !== Zt.x || e.y !== Zt.y || e.rotate !== Zt.rotate || e.flipX || e.flipY;
}
function Bg(e) {
  var t = e.transform,
    n = e.containerWidth,
    r = e.iconWidth,
    s = {
      transform: 'translate('.concat(n / 2, ' 256)'),
    },
    i = 'translate('.concat(t.x * 32, ', ').concat(t.y * 32, ') '),
    a = 'scale('.concat((t.size / 16) * (t.flipX ? -1 : 1), ', ').concat((t.size / 16) * (t.flipY ? -1 : 1), ') '),
    o = 'rotate('.concat(t.rotate, ' 0 0)'),
    l = {
      transform: ''.concat(i, ' ').concat(a, ' ').concat(o),
    },
    u = {
      transform: 'translate('.concat((r / 2) * -1, ' -256)'),
    };
  return {
    outer: s,
    inner: l,
    path: u,
  };
}
function jg(e) {
  var t = e.transform,
    n = e.width,
    r = n === void 0 ? cl : n,
    s = e.height,
    i = s === void 0 ? cl : s,
    a = e.startCentered,
    o = a === void 0 ? !1 : a,
    l = '';
  return (
    o && Zh
      ? (l += 'translate('.concat(t.x / An - r / 2, 'em, ').concat(t.y / An - i / 2, 'em) '))
      : o
        ? (l += 'translate(calc(-50% + '.concat(t.x / An, 'em), calc(-50% + ').concat(t.y / An, 'em)) '))
        : (l += 'translate('.concat(t.x / An, 'em, ').concat(t.y / An, 'em) ')),
    (l += 'scale('.concat((t.size / An) * (t.flipX ? -1 : 1), ', ').concat((t.size / An) * (t.flipY ? -1 : 1), ') ')),
    (l += 'rotate('.concat(t.rotate, 'deg) ')),
    l
  );
}
var Wg = `:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;
function o1() {
  var e = e1,
    t = t1,
    n = ue.cssPrefix,
    r = ue.replacementClass,
    s = Wg;
  if (n !== e || r !== t) {
    var i = new RegExp('\\.'.concat(e, '\\-'), 'g'),
      a = new RegExp('\\--'.concat(e, '\\-'), 'g'),
      o = new RegExp('\\.'.concat(t), 'g');
    s = s.replace(i, '.'.concat(n, '-')).replace(a, '--'.concat(n, '-')).replace(o, '.'.concat(r));
  }
  return s;
}
var Ku = !1;
function Ao() {
  ue.autoAddCss && !Ku && (Hg(o1()), (Ku = !0));
}
var Ug = {
    mixout: function () {
      return {
        dom: {
          css: o1,
          insertCss: Ao,
        },
      };
    },
    hooks: function () {
      return {
        beforeDOMElementCreation: function () {
          Ao();
        },
        beforeI2svg: function () {
          Ao();
        },
      };
    },
  },
  pn = Hn || {};
pn[hn] || (pn[hn] = {});
pn[hn].styles || (pn[hn].styles = {});
pn[hn].hooks || (pn[hn].hooks = {});
pn[hn].shims || (pn[hn].shims = []);
var Ht = pn[hn],
  l1 = [],
  qg = function e() {
    je.removeEventListener('DOMContentLoaded', e),
      (va = 1),
      l1.map(function (t) {
        return t();
      });
  },
  va = !1;
yn && ((va = (je.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(je.readyState)), va || je.addEventListener('DOMContentLoaded', qg));
function Kg(e) {
  yn && (va ? setTimeout(e, 0) : l1.push(e));
}
function pi(e) {
  var t = e.tag,
    n = e.attributes,
    r = n === void 0 ? {} : n,
    s = e.children,
    i = s === void 0 ? [] : s;
  return typeof e == 'string' ? a1(e) : '<'.concat(t, ' ').concat(Fg(r), '>').concat(i.map(pi).join(''), '</').concat(t, '>');
}
function Gu(e, t, n) {
  if (e && e[t] && e[t][n])
    return {
      prefix: t,
      iconName: n,
      icon: e[t][n],
    };
}
var Gg = function (t, n) {
    return function (r, s, i, a) {
      return t.call(n, r, s, i, a);
    };
  },
  Co = function (t, n, r, s) {
    var i = Object.keys(t),
      a = i.length,
      o = s !== void 0 ? Gg(n, s) : n,
      l,
      u,
      c;
    for (r === void 0 ? ((l = 1), (c = t[i[0]])) : ((l = 0), (c = r)); l < a; l++) (u = i[l]), (c = o(c, t[u], u, t));
    return c;
  };
function Yg(e) {
  for (var t = [], n = 0, r = e.length; n < r; ) {
    var s = e.charCodeAt(n++);
    if (s >= 55296 && s <= 56319 && n < r) {
      var i = e.charCodeAt(n++);
      (i & 64512) == 56320 ? t.push(((s & 1023) << 10) + (i & 1023) + 65536) : (t.push(s), n--);
    } else t.push(s);
  }
  return t;
}
function fl(e) {
  var t = Yg(e);
  return t.length === 1 ? t[0].toString(16) : null;
}
function Xg(e, t) {
  var n = e.length,
    r = e.charCodeAt(t),
    s;
  return r >= 55296 && r <= 56319 && n > t + 1 && ((s = e.charCodeAt(t + 1)), s >= 56320 && s <= 57343) ? (r - 55296) * 1024 + s - 56320 + 65536 : r;
}
function Yu(e) {
  return Object.keys(e).reduce(function (t, n) {
    var r = e[n],
      s = !!r.icon;
    return s ? (t[r.iconName] = r.icon) : (t[n] = r), t;
  }, {});
}
function dl(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
    r = n.skipHooks,
    s = r === void 0 ? !1 : r,
    i = Yu(t);
  typeof Ht.hooks.addPack == 'function' && !s ? Ht.hooks.addPack(e, Yu(t)) : (Ht.styles[e] = oe(oe({}, Ht.styles[e] || {}), i)), e === 'fas' && dl('fa', t);
}
var Di,
  zi,
  Hi,
  Br = Ht.styles,
  Qg = Ht.shims,
  Jg = ((Di = {}), Qe(Di, Be, Object.values(Ys[Be])), Qe(Di, qe, Object.values(Ys[qe])), Di),
  Ec = null,
  c1 = {},
  u1 = {},
  f1 = {},
  d1 = {},
  h1 = {},
  Zg = ((zi = {}), Qe(zi, Be, Object.keys(Ks[Be])), Qe(zi, qe, Object.keys(Ks[qe])), zi);
function e0(e) {
  return ~Mg.indexOf(e);
}
function t0(e, t) {
  var n = t.split('-'),
    r = n[0],
    s = n.slice(1).join('-');
  return r === e && s !== '' && !e0(s) ? s : null;
}
var p1 = function () {
  var t = function (i) {
    return Co(
      Br,
      function (a, o, l) {
        return (a[l] = Co(o, i, {})), a;
      },
      {},
    );
  };
  (c1 = t(function (s, i, a) {
    if ((i[3] && (s[i[3]] = a), i[2])) {
      var o = i[2].filter(function (l) {
        return typeof l == 'number';
      });
      o.forEach(function (l) {
        s[l.toString(16)] = a;
      });
    }
    return s;
  })),
    (u1 = t(function (s, i, a) {
      if (((s[a] = a), i[2])) {
        var o = i[2].filter(function (l) {
          return typeof l == 'string';
        });
        o.forEach(function (l) {
          s[l] = a;
        });
      }
      return s;
    })),
    (h1 = t(function (s, i, a) {
      var o = i[2];
      return (
        (s[a] = a),
        o.forEach(function (l) {
          s[l] = a;
        }),
        s
      );
    }));
  var n = 'far' in Br || ue.autoFetchSvg,
    r = Co(
      Qg,
      function (s, i) {
        var a = i[0],
          o = i[1],
          l = i[2];
        return (
          o === 'far' && !n && (o = 'fas'),
          typeof a == 'string' &&
            (s.names[a] = {
              prefix: o,
              iconName: l,
            }),
          typeof a == 'number' &&
            (s.unicodes[a.toString(16)] = {
              prefix: o,
              iconName: l,
            }),
          s
        );
      },
      {
        names: {},
        unicodes: {},
      },
    );
  (f1 = r.names),
    (d1 = r.unicodes),
    (Ec = za(ue.styleDefault, {
      family: ue.familyDefault,
    }));
};
zg(function (e) {
  Ec = za(e.styleDefault, {
    family: ue.familyDefault,
  });
});
p1();
function xc(e, t) {
  return (c1[e] || {})[t];
}
function n0(e, t) {
  return (u1[e] || {})[t];
}
function ur(e, t) {
  return (h1[e] || {})[t];
}
function m1(e) {
  return (
    f1[e] || {
      prefix: null,
      iconName: null,
    }
  );
}
function r0(e) {
  var t = d1[e],
    n = xc('fas', e);
  return (
    t ||
    (n
      ? {
          prefix: 'fas',
          iconName: n,
        }
      : null) || {
      prefix: null,
      iconName: null,
    }
  );
}
function Vn() {
  return Ec;
}
var Sc = function () {
  return {
    prefix: null,
    iconName: null,
    rest: [],
  };
};
function za(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    n = t.family,
    r = n === void 0 ? Be : n,
    s = Ks[r][e],
    i = Gs[r][e] || Gs[r][s],
    a = e in Ht.styles ? e : null;
  return i || a || null;
}
var Xu = ((Hi = {}), Qe(Hi, Be, Object.keys(Ys[Be])), Qe(Hi, qe, Object.keys(Ys[qe])), Hi);
function Ha(e) {
  var t,
    n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = n.skipLookups,
    s = r === void 0 ? !1 : r,
    i = ((t = {}), Qe(t, Be, ''.concat(ue.cssPrefix, '-').concat(Be)), Qe(t, qe, ''.concat(ue.cssPrefix, '-').concat(qe)), t),
    a = null,
    o = Be;
  (e.includes(i[Be]) ||
    e.some(function (u) {
      return Xu[Be].includes(u);
    })) &&
    (o = Be),
    (e.includes(i[qe]) ||
      e.some(function (u) {
        return Xu[qe].includes(u);
      })) &&
      (o = qe);
  var l = e.reduce(function (u, c) {
    var f = t0(ue.cssPrefix, c);
    if (
      (Br[c]
        ? ((c = Jg[o].includes(c) ? kg[o][c] : c), (a = c), (u.prefix = c))
        : Zg[o].indexOf(c) > -1
          ? ((a = c),
            (u.prefix = za(c, {
              family: o,
            })))
          : f
            ? (u.iconName = f)
            : c !== ue.replacementClass && c !== i[Be] && c !== i[qe] && u.rest.push(c),
      !s && u.prefix && u.iconName)
    ) {
      var h = a === 'fa' ? m1(u.iconName) : {},
        m = ur(u.prefix, u.iconName);
      h.prefix && (a = null), (u.iconName = h.iconName || m || u.iconName), (u.prefix = h.prefix || u.prefix), u.prefix === 'far' && !Br.far && Br.fas && !ue.autoFetchSvg && (u.prefix = 'fas');
    }
    return u;
  }, Sc());
  return (
    (e.includes('fa-brands') || e.includes('fab')) && (l.prefix = 'fab'),
    (e.includes('fa-duotone') || e.includes('fad')) && (l.prefix = 'fad'),
    !l.prefix && o === qe && (Br.fass || ue.autoFetchSvg) && ((l.prefix = 'fass'), (l.iconName = ur(l.prefix, l.iconName) || l.iconName)),
    (l.prefix === 'fa' || a === 'fa') && (l.prefix = Vn() || 'fas'),
    l
  );
}
var s0 = (function () {
    function e() {
      gg(this, e), (this.definitions = {});
    }
    return (
      vg(e, [
        {
          key: 'add',
          value: function () {
            for (var n = this, r = arguments.length, s = new Array(r), i = 0; i < r; i++) s[i] = arguments[i];
            var a = s.reduce(this._pullDefinitions, {});
            Object.keys(a).forEach(function (o) {
              (n.definitions[o] = oe(oe({}, n.definitions[o] || {}), a[o])), dl(o, a[o]);
              var l = Ys[Be][o];
              l && dl(l, a[o]), p1();
            });
          },
        },
        {
          key: 'reset',
          value: function () {
            this.definitions = {};
          },
        },
        {
          key: '_pullDefinitions',
          value: function (n, r) {
            var s =
              r.prefix && r.iconName && r.icon
                ? {
                    0: r,
                  }
                : r;
            return (
              Object.keys(s).map(function (i) {
                var a = s[i],
                  o = a.prefix,
                  l = a.iconName,
                  u = a.icon,
                  c = u[2];
                n[o] || (n[o] = {}),
                  c.length > 0 &&
                    c.forEach(function (f) {
                      typeof f == 'string' && (n[o][f] = u);
                    }),
                  (n[o][l] = u);
              }),
              n
            );
          },
        },
      ]),
      e
    );
  })(),
  Qu = [],
  jr = {},
  Ur = {},
  i0 = Object.keys(Ur);
function a0(e, t) {
  var n = t.mixoutsTo;
  return (
    (Qu = e),
    (jr = {}),
    Object.keys(Ur).forEach(function (r) {
      i0.indexOf(r) === -1 && delete Ur[r];
    }),
    Qu.forEach(function (r) {
      var s = r.mixout ? r.mixout() : {};
      if (
        (Object.keys(s).forEach(function (a) {
          typeof s[a] == 'function' && (n[a] = s[a]),
            ga(s[a]) === 'object' &&
              Object.keys(s[a]).forEach(function (o) {
                n[a] || (n[a] = {}), (n[a][o] = s[a][o]);
              });
        }),
        r.hooks)
      ) {
        var i = r.hooks();
        Object.keys(i).forEach(function (a) {
          jr[a] || (jr[a] = []), jr[a].push(i[a]);
        });
      }
      r.provides && r.provides(Ur);
    }),
    n
  );
}
function hl(e, t) {
  for (var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), s = 2; s < n; s++) r[s - 2] = arguments[s];
  var i = jr[e] || [];
  return (
    i.forEach(function (a) {
      t = a.apply(null, [t].concat(r));
    }),
    t
  );
}
function br(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
  var s = jr[e] || [];
  s.forEach(function (i) {
    i.apply(null, n);
  });
}
function mn() {
  var e = arguments[0],
    t = Array.prototype.slice.call(arguments, 1);
  return Ur[e] ? Ur[e].apply(null, t) : void 0;
}
function pl(e) {
  e.prefix === 'fa' && (e.prefix = 'fas');
  var t = e.iconName,
    n = e.prefix || Vn();
  if (t) return (t = ur(n, t) || t), Gu(g1.definitions, n, t) || Gu(Ht.styles, n, t);
}
var g1 = new s0(),
  o0 = function () {
    (ue.autoReplaceSvg = !1), (ue.observeMutations = !1), br('noAuto');
  },
  l0 = {
    i2svg: function () {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return yn ? (br('beforeI2svg', t), mn('pseudoElements2svg', t), mn('i2svg', t)) : Promise.reject('Operation requires a DOM of some kind.');
    },
    watch: function () {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
        n = t.autoReplaceSvgRoot;
      ue.autoReplaceSvg === !1 && (ue.autoReplaceSvg = !0),
        (ue.observeMutations = !0),
        Kg(function () {
          u0({
            autoReplaceSvgRoot: n,
          }),
            br('watch', t);
        });
    },
  },
  c0 = {
    icon: function (t) {
      if (t === null) return null;
      if (ga(t) === 'object' && t.prefix && t.iconName)
        return {
          prefix: t.prefix,
          iconName: ur(t.prefix, t.iconName) || t.iconName,
        };
      if (Array.isArray(t) && t.length === 2) {
        var n = t[1].indexOf('fa-') === 0 ? t[1].slice(3) : t[1],
          r = za(t[0]);
        return {
          prefix: r,
          iconName: ur(r, n) || n,
        };
      }
      if (typeof t == 'string' && (t.indexOf(''.concat(ue.cssPrefix, '-')) > -1 || t.match($g))) {
        var s = Ha(t.split(' '), {
          skipLookups: !0,
        });
        return {
          prefix: s.prefix || Vn(),
          iconName: ur(s.prefix, s.iconName) || s.iconName,
        };
      }
      if (typeof t == 'string') {
        var i = Vn();
        return {
          prefix: i,
          iconName: ur(i, t) || t,
        };
      }
    },
  },
  At = {
    noAuto: o0,
    config: ue,
    dom: l0,
    parse: c0,
    library: g1,
    findIconDefinition: pl,
    toHtml: pi,
  },
  u0 = function () {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      n = t.autoReplaceSvgRoot,
      r = n === void 0 ? je : n;
    (Object.keys(Ht.styles).length > 0 || ue.autoFetchSvg) &&
      yn &&
      ue.autoReplaceSvg &&
      At.dom.i2svg({
        node: r,
      });
  };
function Va(e, t) {
  return (
    Object.defineProperty(e, 'abstract', {
      get: t,
    }),
    Object.defineProperty(e, 'html', {
      get: function () {
        return e.abstract.map(function (r) {
          return pi(r);
        });
      },
    }),
    Object.defineProperty(e, 'node', {
      get: function () {
        if (yn) {
          var r = je.createElement('div');
          return (r.innerHTML = e.html), r.children;
        }
      },
    }),
    e
  );
}
function f0(e) {
  var t = e.children,
    n = e.main,
    r = e.mask,
    s = e.attributes,
    i = e.styles,
    a = e.transform;
  if (wc(a) && n.found && !r.found) {
    var o = n.width,
      l = n.height,
      u = {
        x: o / l / 2,
        y: 0.5,
      };
    s.style = Da(
      oe(
        oe({}, i),
        {},
        {
          'transform-origin': ''.concat(u.x + a.x / 16, 'em ').concat(u.y + a.y / 16, 'em'),
        },
      ),
    );
  }
  return [
    {
      tag: 'svg',
      attributes: s,
      children: t,
    },
  ];
}
function d0(e) {
  var t = e.prefix,
    n = e.iconName,
    r = e.children,
    s = e.attributes,
    i = e.symbol,
    a = i === !0 ? ''.concat(t, '-').concat(ue.cssPrefix, '-').concat(n) : i;
  return [
    {
      tag: 'svg',
      attributes: {
        style: 'display: none;',
      },
      children: [
        {
          tag: 'symbol',
          attributes: oe(
            oe({}, s),
            {},
            {
              id: a,
            },
          ),
          children: r,
        },
      ],
    },
  ];
}
function Ac(e) {
  var t = e.icons,
    n = t.main,
    r = t.mask,
    s = e.prefix,
    i = e.iconName,
    a = e.transform,
    o = e.symbol,
    l = e.title,
    u = e.maskId,
    c = e.titleId,
    f = e.extra,
    h = e.watchable,
    m = h === void 0 ? !1 : h,
    g = r.found ? r : n,
    d = g.width,
    p = g.height,
    _ = s === 'fak',
    v = [ue.replacementClass, i ? ''.concat(ue.cssPrefix, '-').concat(i) : '']
      .filter(function (R) {
        return f.classes.indexOf(R) === -1;
      })
      .filter(function (R) {
        return R !== '' || !!R;
      })
      .concat(f.classes)
      .join(' '),
    C = {
      children: [],
      attributes: oe(
        oe({}, f.attributes),
        {},
        {
          'data-prefix': s,
          'data-icon': i,
          'class': v,
          'role': f.attributes.role || 'img',
          'xmlns': 'http://www.w3.org/2000/svg',
          'viewBox': '0 0 '.concat(d, ' ').concat(p),
        },
      ),
    },
    S =
      _ && !~f.classes.indexOf('fa-fw')
        ? {
            width: ''.concat((d / p) * 16 * 0.0625, 'em'),
          }
        : {};
  m && (C.attributes[vr] = ''),
    l &&
      (C.children.push({
        tag: 'title',
        attributes: {
          id: C.attributes['aria-labelledby'] || 'title-'.concat(c || Qs()),
        },
        children: [l],
      }),
      delete C.attributes.title);
  var P = oe(
      oe({}, C),
      {},
      {
        prefix: s,
        iconName: i,
        main: n,
        mask: r,
        maskId: u,
        transform: a,
        symbol: o,
        styles: oe(oe({}, S), f.styles),
      },
    ),
    N =
      r.found && n.found
        ? mn('generateAbstractMask', P) || {
            children: [],
            attributes: {},
          }
        : mn('generateAbstractIcon', P) || {
            children: [],
            attributes: {},
          },
    D = N.children,
    k = N.attributes;
  return (P.children = D), (P.attributes = k), o ? d0(P) : f0(P);
}
function Ju(e) {
  var t = e.content,
    n = e.width,
    r = e.height,
    s = e.transform,
    i = e.title,
    a = e.extra,
    o = e.watchable,
    l = o === void 0 ? !1 : o,
    u = oe(
      oe(
        oe({}, a.attributes),
        i
          ? {
              title: i,
            }
          : {},
      ),
      {},
      {
        class: a.classes.join(' '),
      },
    );
  l && (u[vr] = '');
  var c = oe({}, a.styles);
  wc(s) &&
    ((c.transform = jg({
      transform: s,
      startCentered: !0,
      width: n,
      height: r,
    })),
    (c['-webkit-transform'] = c.transform));
  var f = Da(c);
  f.length > 0 && (u.style = f);
  var h = [];
  return (
    h.push({
      tag: 'span',
      attributes: u,
      children: [t],
    }),
    i &&
      h.push({
        tag: 'span',
        attributes: {
          class: 'sr-only',
        },
        children: [i],
      }),
    h
  );
}
function h0(e) {
  var t = e.content,
    n = e.title,
    r = e.extra,
    s = oe(
      oe(
        oe({}, r.attributes),
        n
          ? {
              title: n,
            }
          : {},
      ),
      {},
      {
        class: r.classes.join(' '),
      },
    ),
    i = Da(r.styles);
  i.length > 0 && (s.style = i);
  var a = [];
  return (
    a.push({
      tag: 'span',
      attributes: s,
      children: [t],
    }),
    n &&
      a.push({
        tag: 'span',
        attributes: {
          class: 'sr-only',
        },
        children: [n],
      }),
    a
  );
}
var To = Ht.styles;
function ml(e) {
  var t = e[0],
    n = e[1],
    r = e.slice(4),
    s = mc(r, 1),
    i = s[0],
    a = null;
  return (
    Array.isArray(i)
      ? (a = {
          tag: 'g',
          attributes: {
            class: ''.concat(ue.cssPrefix, '-').concat(cr.GROUP),
          },
          children: [
            {
              tag: 'path',
              attributes: {
                class: ''.concat(ue.cssPrefix, '-').concat(cr.SECONDARY),
                fill: 'currentColor',
                d: i[0],
              },
            },
            {
              tag: 'path',
              attributes: {
                class: ''.concat(ue.cssPrefix, '-').concat(cr.PRIMARY),
                fill: 'currentColor',
                d: i[1],
              },
            },
          ],
        })
      : (a = {
          tag: 'path',
          attributes: {
            fill: 'currentColor',
            d: i,
          },
        }),
    {
      found: !0,
      width: t,
      height: n,
      icon: a,
    }
  );
}
var p0 = {
  found: !1,
  width: 512,
  height: 512,
};
function m0(e, t) {
  !n1 && !ue.showMissingIcons && e && console.error('Icon with name "'.concat(e, '" and prefix "').concat(t, '" is missing.'));
}
function gl(e, t) {
  var n = t;
  return (
    t === 'fa' && ue.styleDefault !== null && (t = Vn()),
    new Promise(function (r, s) {
      if ((mn('missingIconAbstract'), n === 'fa')) {
        var i = m1(e) || {};
        (e = i.iconName || e), (t = i.prefix || t);
      }
      if (e && t && To[t] && To[t][e]) {
        var a = To[t][e];
        return r(ml(a));
      }
      m0(e, t),
        r(
          oe(
            oe({}, p0),
            {},
            {
              icon: ue.showMissingIcons && e ? mn('missingIconAbstract') || {} : {},
            },
          ),
        );
    })
  );
}
var Zu = function () {},
  vl =
    ue.measurePerformance && Li && Li.mark && Li.measure
      ? Li
      : {
          mark: Zu,
          measure: Zu,
        },
  Ts = 'FA "6.4.2"',
  g0 = function (t) {
    return (
      vl.mark(''.concat(Ts, ' ').concat(t, ' begins')),
      function () {
        return v1(t);
      }
    );
  },
  v1 = function (t) {
    vl.mark(''.concat(Ts, ' ').concat(t, ' ends')), vl.measure(''.concat(Ts, ' ').concat(t), ''.concat(Ts, ' ').concat(t, ' begins'), ''.concat(Ts, ' ').concat(t, ' ends'));
  },
  Cc = {
    begin: g0,
    end: v1,
  },
  sa = function () {};
function ef(e) {
  var t = e.getAttribute ? e.getAttribute(vr) : null;
  return typeof t == 'string';
}
function v0(e) {
  var t = e.getAttribute ? e.getAttribute(vc) : null,
    n = e.getAttribute ? e.getAttribute(bc) : null;
  return t && n;
}
function b0(e) {
  return e && e.classList && e.classList.contains && e.classList.contains(ue.replacementClass);
}
function _0() {
  if (ue.autoReplaceSvg === !0) return ia.replace;
  var e = ia[ue.autoReplaceSvg];
  return e || ia.replace;
}
function y0(e) {
  return je.createElementNS('http://www.w3.org/2000/svg', e);
}
function w0(e) {
  return je.createElement(e);
}
function b1(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    n = t.ceFn,
    r = n === void 0 ? (e.tag === 'svg' ? y0 : w0) : n;
  if (typeof e == 'string') return je.createTextNode(e);
  var s = r(e.tag);
  Object.keys(e.attributes || []).forEach(function (a) {
    s.setAttribute(a, e.attributes[a]);
  });
  var i = e.children || [];
  return (
    i.forEach(function (a) {
      s.appendChild(
        b1(a, {
          ceFn: r,
        }),
      );
    }),
    s
  );
}
function E0(e) {
  var t = ' '.concat(e.outerHTML, ' ');
  return (t = ''.concat(t, 'Font Awesome fontawesome.com ')), t;
}
var ia = {
  replace: function (t) {
    var n = t[0];
    if (n.parentNode)
      if (
        (t[1].forEach(function (s) {
          n.parentNode.insertBefore(b1(s), n);
        }),
        n.getAttribute(vr) === null && ue.keepOriginalSource)
      ) {
        var r = je.createComment(E0(n));
        n.parentNode.replaceChild(r, n);
      } else n.remove();
  },
  nest: function (t) {
    var n = t[0],
      r = t[1];
    if (~yc(n).indexOf(ue.replacementClass)) return ia.replace(t);
    var s = new RegExp(''.concat(ue.cssPrefix, '-.*'));
    if ((delete r[0].attributes.id, r[0].attributes.class)) {
      var i = r[0].attributes.class.split(' ').reduce(
        function (o, l) {
          return l === ue.replacementClass || l.match(s) ? o.toSvg.push(l) : o.toNode.push(l), o;
        },
        {
          toNode: [],
          toSvg: [],
        },
      );
      (r[0].attributes.class = i.toSvg.join(' ')), i.toNode.length === 0 ? n.removeAttribute('class') : n.setAttribute('class', i.toNode.join(' '));
    }
    var a = r.map(function (o) {
      return pi(o);
    }).join(`
`);
    n.setAttribute(vr, ''), (n.innerHTML = a);
  },
};
function tf(e) {
  e();
}
function _1(e, t) {
  var n = typeof t == 'function' ? t : sa;
  if (e.length === 0) n();
  else {
    var r = tf;
    ue.mutateApproach === Cg && (r = Hn.requestAnimationFrame || tf),
      r(function () {
        var s = _0(),
          i = Cc.begin('mutate');
        e.map(s), i(), n();
      });
  }
}
var Tc = !1;
function y1() {
  Tc = !0;
}
function bl() {
  Tc = !1;
}
var ba = null;
function nf(e) {
  if (Uu && ue.observeMutations) {
    var t = e.treeCallback,
      n = t === void 0 ? sa : t,
      r = e.nodeCallback,
      s = r === void 0 ? sa : r,
      i = e.pseudoElementsCallback,
      a = i === void 0 ? sa : i,
      o = e.observeMutationsRoot,
      l = o === void 0 ? je : o;
    (ba = new Uu(function (u) {
      if (!Tc) {
        var c = Vn();
        ls(u).forEach(function (f) {
          if (
            (f.type === 'childList' && f.addedNodes.length > 0 && !ef(f.addedNodes[0]) && (ue.searchPseudoElements && a(f.target), n(f.target)),
            f.type === 'attributes' && f.target.parentNode && ue.searchPseudoElements && a(f.target.parentNode),
            f.type === 'attributes' && ef(f.target) && ~Ig.indexOf(f.attributeName))
          )
            if (f.attributeName === 'class' && v0(f.target)) {
              var h = Ha(yc(f.target)),
                m = h.prefix,
                g = h.iconName;
              f.target.setAttribute(vc, m || c), g && f.target.setAttribute(bc, g);
            } else b0(f.target) && s(f.target);
        });
      }
    })),
      yn &&
        ba.observe(l, {
          childList: !0,
          attributes: !0,
          characterData: !0,
          subtree: !0,
        });
  }
}
function x0() {
  ba && ba.disconnect();
}
function S0(e) {
  var t = e.getAttribute('style'),
    n = [];
  return (
    t &&
      (n = t.split(';').reduce(function (r, s) {
        var i = s.split(':'),
          a = i[0],
          o = i.slice(1);
        return a && o.length > 0 && (r[a] = o.join(':').trim()), r;
      }, {})),
    n
  );
}
function A0(e) {
  var t = e.getAttribute('data-prefix'),
    n = e.getAttribute('data-icon'),
    r = e.innerText !== void 0 ? e.innerText.trim() : '',
    s = Ha(yc(e));
  return (
    s.prefix || (s.prefix = Vn()),
    t && n && ((s.prefix = t), (s.iconName = n)),
    (s.iconName && s.prefix) ||
      (s.prefix && r.length > 0 && (s.iconName = n0(s.prefix, e.innerText) || xc(s.prefix, fl(e.innerText))),
      !s.iconName && ue.autoFetchSvg && e.firstChild && e.firstChild.nodeType === Node.TEXT_NODE && (s.iconName = e.firstChild.data)),
    s
  );
}
function C0(e) {
  var t = ls(e.attributes).reduce(function (s, i) {
      return s.name !== 'class' && s.name !== 'style' && (s[i.name] = i.value), s;
    }, {}),
    n = e.getAttribute('title'),
    r = e.getAttribute('data-fa-title-id');
  return ue.autoA11y && (n ? (t['aria-labelledby'] = ''.concat(ue.replacementClass, '-title-').concat(r || Qs())) : ((t['aria-hidden'] = 'true'), (t.focusable = 'false'))), t;
}
function T0() {
  return {
    iconName: null,
    title: null,
    titleId: null,
    prefix: null,
    transform: Zt,
    symbol: !1,
    mask: {
      iconName: null,
      prefix: null,
      rest: [],
    },
    maskId: null,
    extra: {
      classes: [],
      styles: {},
      attributes: {},
    },
  };
}
function rf(e) {
  var t =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : {
            styleParser: !0,
          },
    n = A0(e),
    r = n.iconName,
    s = n.prefix,
    i = n.rest,
    a = C0(e),
    o = hl('parseNodeAttributes', {}, e),
    l = t.styleParser ? S0(e) : [];
  return oe(
    {
      iconName: r,
      title: e.getAttribute('title'),
      titleId: e.getAttribute('data-fa-title-id'),
      prefix: s,
      transform: Zt,
      mask: {
        iconName: null,
        prefix: null,
        rest: [],
      },
      maskId: null,
      symbol: !1,
      extra: {
        classes: i,
        styles: l,
        attributes: a,
      },
    },
    o,
  );
}
var k0 = Ht.styles;
function w1(e) {
  var t =
    ue.autoReplaceSvg === 'nest'
      ? rf(e, {
          styleParser: !1,
        })
      : rf(e);
  return ~t.extra.classes.indexOf(r1) ? mn('generateLayersText', e, t) : mn('generateSvgReplacementMutation', e, t);
}
var Fn = new Set();
_c.map(function (e) {
  Fn.add('fa-'.concat(e));
});
Object.keys(Ks[Be]).map(Fn.add.bind(Fn));
Object.keys(Ks[qe]).map(Fn.add.bind(Fn));
Fn = di(Fn);
function sf(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  if (!yn) return Promise.resolve();
  var n = je.documentElement.classList,
    r = function (f) {
      return n.add(''.concat(qu, '-').concat(f));
    },
    s = function (f) {
      return n.remove(''.concat(qu, '-').concat(f));
    },
    i = ue.autoFetchSvg
      ? Fn
      : _c
          .map(function (c) {
            return 'fa-'.concat(c);
          })
          .concat(Object.keys(k0));
  i.includes('fa') || i.push('fa');
  var a = ['.'.concat(r1, ':not([').concat(vr, '])')]
    .concat(
      i.map(function (c) {
        return '.'.concat(c, ':not([').concat(vr, '])');
      }),
    )
    .join(', ');
  if (a.length === 0) return Promise.resolve();
  var o = [];
  try {
    o = ls(e.querySelectorAll(a));
  } catch {}
  if (o.length > 0) r('pending'), s('complete');
  else return Promise.resolve();
  var l = Cc.begin('onTree'),
    u = o.reduce(function (c, f) {
      try {
        var h = w1(f);
        h && c.push(h);
      } catch (m) {
        n1 || (m.name === 'MissingIcon' && console.error(m));
      }
      return c;
    }, []);
  return new Promise(function (c, f) {
    Promise.all(u)
      .then(function (h) {
        _1(h, function () {
          r('active'), r('complete'), s('pending'), typeof t == 'function' && t(), l(), c();
        });
      })
      .catch(function (h) {
        l(), f(h);
      });
  });
}
function $0(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  w1(e).then(function (n) {
    n && _1([n], t);
  });
}
function O0(e) {
  return function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      r = (t || {}).icon ? t : pl(t || {}),
      s = n.mask;
    return (
      s && (s = (s || {}).icon ? s : pl(s || {})),
      e(
        r,
        oe(
          oe({}, n),
          {},
          {
            mask: s,
          },
        ),
      )
    );
  };
}
var L0 = function (t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      r = n.transform,
      s = r === void 0 ? Zt : r,
      i = n.symbol,
      a = i === void 0 ? !1 : i,
      o = n.mask,
      l = o === void 0 ? null : o,
      u = n.maskId,
      c = u === void 0 ? null : u,
      f = n.title,
      h = f === void 0 ? null : f,
      m = n.titleId,
      g = m === void 0 ? null : m,
      d = n.classes,
      p = d === void 0 ? [] : d,
      _ = n.attributes,
      v = _ === void 0 ? {} : _,
      C = n.styles,
      S = C === void 0 ? {} : C;
    if (t) {
      var P = t.prefix,
        N = t.iconName,
        D = t.icon;
      return Va(
        oe(
          {
            type: 'icon',
          },
          t,
        ),
        function () {
          return (
            br('beforeDOMElementCreation', {
              iconDefinition: t,
              params: n,
            }),
            ue.autoA11y && (h ? (v['aria-labelledby'] = ''.concat(ue.replacementClass, '-title-').concat(g || Qs())) : ((v['aria-hidden'] = 'true'), (v.focusable = 'false'))),
            Ac({
              icons: {
                main: ml(D),
                mask: l
                  ? ml(l.icon)
                  : {
                      found: !1,
                      width: null,
                      height: null,
                      icon: {},
                    },
              },
              prefix: P,
              iconName: N,
              transform: oe(oe({}, Zt), s),
              symbol: a,
              title: h,
              maskId: c,
              titleId: g,
              extra: {
                attributes: v,
                styles: S,
                classes: p,
              },
            })
          );
        },
      );
    }
  },
  P0 = {
    mixout: function () {
      return {
        icon: O0(L0),
      };
    },
    hooks: function () {
      return {
        mutationObserverCallbacks: function (n) {
          return (n.treeCallback = sf), (n.nodeCallback = $0), n;
        },
      };
    },
    provides: function (t) {
      (t.i2svg = function (n) {
        var r = n.node,
          s = r === void 0 ? je : r,
          i = n.callback,
          a = i === void 0 ? function () {} : i;
        return sf(s, a);
      }),
        (t.generateSvgReplacementMutation = function (n, r) {
          var s = r.iconName,
            i = r.title,
            a = r.titleId,
            o = r.prefix,
            l = r.transform,
            u = r.symbol,
            c = r.mask,
            f = r.maskId,
            h = r.extra;
          return new Promise(function (m, g) {
            Promise.all([
              gl(s, o),
              c.iconName
                ? gl(c.iconName, c.prefix)
                : Promise.resolve({
                    found: !1,
                    width: 512,
                    height: 512,
                    icon: {},
                  }),
            ])
              .then(function (d) {
                var p = mc(d, 2),
                  _ = p[0],
                  v = p[1];
                m([
                  n,
                  Ac({
                    icons: {
                      main: _,
                      mask: v,
                    },
                    prefix: o,
                    iconName: s,
                    transform: l,
                    symbol: u,
                    maskId: f,
                    title: i,
                    titleId: a,
                    extra: h,
                    watchable: !0,
                  }),
                ]);
              })
              .catch(g);
          });
        }),
        (t.generateAbstractIcon = function (n) {
          var r = n.children,
            s = n.attributes,
            i = n.main,
            a = n.transform,
            o = n.styles,
            l = Da(o);
          l.length > 0 && (s.style = l);
          var u;
          return (
            wc(a) &&
              (u = mn('generateAbstractTransformGrouping', {
                main: i,
                transform: a,
                containerWidth: i.width,
                iconWidth: i.width,
              })),
            r.push(u || i.icon),
            {
              children: r,
              attributes: s,
            }
          );
        });
    },
  },
  I0 = {
    mixout: function () {
      return {
        layer: function (n) {
          var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
            s = r.classes,
            i = s === void 0 ? [] : s;
          return Va(
            {
              type: 'layer',
            },
            function () {
              br('beforeDOMElementCreation', {
                assembler: n,
                params: r,
              });
              var a = [];
              return (
                n(function (o) {
                  Array.isArray(o)
                    ? o.map(function (l) {
                        a = a.concat(l.abstract);
                      })
                    : (a = a.concat(o.abstract));
                }),
                [
                  {
                    tag: 'span',
                    attributes: {
                      class: [''.concat(ue.cssPrefix, '-layers')].concat(di(i)).join(' '),
                    },
                    children: a,
                  },
                ]
              );
            },
          );
        },
      };
    },
  },
  M0 = {
    mixout: function () {
      return {
        counter: function (n) {
          var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
            s = r.title,
            i = s === void 0 ? null : s,
            a = r.classes,
            o = a === void 0 ? [] : a,
            l = r.attributes,
            u = l === void 0 ? {} : l,
            c = r.styles,
            f = c === void 0 ? {} : c;
          return Va(
            {
              type: 'counter',
              content: n,
            },
            function () {
              return (
                br('beforeDOMElementCreation', {
                  content: n,
                  params: r,
                }),
                h0({
                  content: n.toString(),
                  title: i,
                  extra: {
                    attributes: u,
                    styles: f,
                    classes: [''.concat(ue.cssPrefix, '-layers-counter')].concat(di(o)),
                  },
                })
              );
            },
          );
        },
      };
    },
  },
  N0 = {
    mixout: function () {
      return {
        text: function (n) {
          var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
            s = r.transform,
            i = s === void 0 ? Zt : s,
            a = r.title,
            o = a === void 0 ? null : a,
            l = r.classes,
            u = l === void 0 ? [] : l,
            c = r.attributes,
            f = c === void 0 ? {} : c,
            h = r.styles,
            m = h === void 0 ? {} : h;
          return Va(
            {
              type: 'text',
              content: n,
            },
            function () {
              return (
                br('beforeDOMElementCreation', {
                  content: n,
                  params: r,
                }),
                Ju({
                  content: n,
                  transform: oe(oe({}, Zt), i),
                  title: o,
                  extra: {
                    attributes: f,
                    styles: m,
                    classes: [''.concat(ue.cssPrefix, '-layers-text')].concat(di(u)),
                  },
                })
              );
            },
          );
        },
      };
    },
    provides: function (t) {
      t.generateLayersText = function (n, r) {
        var s = r.title,
          i = r.transform,
          a = r.extra,
          o = null,
          l = null;
        if (Zh) {
          var u = parseInt(getComputedStyle(n).fontSize, 10),
            c = n.getBoundingClientRect();
          (o = c.width / u), (l = c.height / u);
        }
        return (
          ue.autoA11y && !s && (a.attributes['aria-hidden'] = 'true'),
          Promise.resolve([
            n,
            Ju({
              content: n.innerHTML,
              width: o,
              height: l,
              transform: i,
              title: s,
              extra: a,
              watchable: !0,
            }),
          ])
        );
      };
    },
  },
  R0 = new RegExp('"', 'ug'),
  af = [1105920, 1112319];
function D0(e) {
  var t = e.replace(R0, ''),
    n = Xg(t, 0),
    r = n >= af[0] && n <= af[1],
    s = t.length === 2 ? t[0] === t[1] : !1;
  return {
    value: fl(s ? t[0] : t),
    isSecondary: r || s,
  };
}
function of(e, t) {
  var n = ''.concat(Ag).concat(t.replace(':', '-'));
  return new Promise(function (r, s) {
    if (e.getAttribute(n) !== null) return r();
    var i = ls(e.children),
      a = i.filter(function (D) {
        return D.getAttribute(ul) === t;
      })[0],
      o = Hn.getComputedStyle(e, t),
      l = o.getPropertyValue('font-family').match(Og),
      u = o.getPropertyValue('font-weight'),
      c = o.getPropertyValue('content');
    if (a && !l) return e.removeChild(a), r();
    if (l && c !== 'none' && c !== '') {
      var f = o.getPropertyValue('content'),
        h = ~['Sharp'].indexOf(l[2]) ? qe : Be,
        m = ~['Solid', 'Regular', 'Light', 'Thin', 'Duotone', 'Brands', 'Kit'].indexOf(l[2]) ? Gs[h][l[2].toLowerCase()] : Lg[h][u],
        g = D0(f),
        d = g.value,
        p = g.isSecondary,
        _ = l[0].startsWith('FontAwesome'),
        v = xc(m, d),
        C = v;
      if (_) {
        var S = r0(d);
        S.iconName && S.prefix && ((v = S.iconName), (m = S.prefix));
      }
      if (v && !p && (!a || a.getAttribute(vc) !== m || a.getAttribute(bc) !== C)) {
        e.setAttribute(n, C), a && e.removeChild(a);
        var P = T0(),
          N = P.extra;
        (N.attributes[ul] = t),
          gl(v, m)
            .then(function (D) {
              var k = Ac(
                  oe(
                    oe({}, P),
                    {},
                    {
                      icons: {
                        main: D,
                        mask: Sc(),
                      },
                      prefix: m,
                      iconName: C,
                      extra: N,
                      watchable: !0,
                    },
                  ),
                ),
                R = je.createElementNS('http://www.w3.org/2000/svg', 'svg');
              t === '::before' ? e.insertBefore(R, e.firstChild) : e.appendChild(R),
                (R.outerHTML = k.map(function (M) {
                  return pi(M);
                }).join(`
`)),
                e.removeAttribute(n),
                r();
            })
            .catch(s);
      } else r();
    } else r();
  });
}
function z0(e) {
  return Promise.all([of(e, '::before'), of(e, '::after')]);
}
function H0(e) {
  return e.parentNode !== document.head && !~Tg.indexOf(e.tagName.toUpperCase()) && !e.getAttribute(ul) && (!e.parentNode || e.parentNode.tagName !== 'svg');
}
function lf(e) {
  if (yn)
    return new Promise(function (t, n) {
      var r = ls(e.querySelectorAll('*')).filter(H0).map(z0),
        s = Cc.begin('searchPseudoElements');
      y1(),
        Promise.all(r)
          .then(function () {
            s(), bl(), t();
          })
          .catch(function () {
            s(), bl(), n();
          });
    });
}
var V0 = {
    hooks: function () {
      return {
        mutationObserverCallbacks: function (n) {
          return (n.pseudoElementsCallback = lf), n;
        },
      };
    },
    provides: function (t) {
      t.pseudoElements2svg = function (n) {
        var r = n.node,
          s = r === void 0 ? je : r;
        ue.searchPseudoElements && lf(s);
      };
    },
  },
  cf = !1,
  F0 = {
    mixout: function () {
      return {
        dom: {
          unwatch: function () {
            y1(), (cf = !0);
          },
        },
      };
    },
    hooks: function () {
      return {
        bootstrap: function () {
          nf(hl('mutationObserverCallbacks', {}));
        },
        noAuto: function () {
          x0();
        },
        watch: function (n) {
          var r = n.observeMutationsRoot;
          cf
            ? bl()
            : nf(
                hl('mutationObserverCallbacks', {
                  observeMutationsRoot: r,
                }),
              );
        },
      };
    },
  },
  uf = function (t) {
    var n = {
      size: 16,
      x: 0,
      y: 0,
      flipX: !1,
      flipY: !1,
      rotate: 0,
    };
    return t
      .toLowerCase()
      .split(' ')
      .reduce(function (r, s) {
        var i = s.toLowerCase().split('-'),
          a = i[0],
          o = i.slice(1).join('-');
        if (a && o === 'h') return (r.flipX = !0), r;
        if (a && o === 'v') return (r.flipY = !0), r;
        if (((o = parseFloat(o)), isNaN(o))) return r;
        switch (a) {
          case 'grow':
            r.size = r.size + o;
            break;
          case 'shrink':
            r.size = r.size - o;
            break;
          case 'left':
            r.x = r.x - o;
            break;
          case 'right':
            r.x = r.x + o;
            break;
          case 'up':
            r.y = r.y - o;
            break;
          case 'down':
            r.y = r.y + o;
            break;
          case 'rotate':
            r.rotate = r.rotate + o;
            break;
        }
        return r;
      }, n);
  },
  B0 = {
    mixout: function () {
      return {
        parse: {
          transform: function (n) {
            return uf(n);
          },
        },
      };
    },
    hooks: function () {
      return {
        parseNodeAttributes: function (n, r) {
          var s = r.getAttribute('data-fa-transform');
          return s && (n.transform = uf(s)), n;
        },
      };
    },
    provides: function (t) {
      t.generateAbstractTransformGrouping = function (n) {
        var r = n.main,
          s = n.transform,
          i = n.containerWidth,
          a = n.iconWidth,
          o = {
            transform: 'translate('.concat(i / 2, ' 256)'),
          },
          l = 'translate('.concat(s.x * 32, ', ').concat(s.y * 32, ') '),
          u = 'scale('.concat((s.size / 16) * (s.flipX ? -1 : 1), ', ').concat((s.size / 16) * (s.flipY ? -1 : 1), ') '),
          c = 'rotate('.concat(s.rotate, ' 0 0)'),
          f = {
            transform: ''.concat(l, ' ').concat(u, ' ').concat(c),
          },
          h = {
            transform: 'translate('.concat((a / 2) * -1, ' -256)'),
          },
          m = {
            outer: o,
            inner: f,
            path: h,
          };
        return {
          tag: 'g',
          attributes: oe({}, m.outer),
          children: [
            {
              tag: 'g',
              attributes: oe({}, m.inner),
              children: [
                {
                  tag: r.icon.tag,
                  children: r.icon.children,
                  attributes: oe(oe({}, r.icon.attributes), m.path),
                },
              ],
            },
          ],
        };
      };
    },
  },
  ko = {
    x: 0,
    y: 0,
    width: '100%',
    height: '100%',
  };
function ff(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return e.attributes && (e.attributes.fill || t) && (e.attributes.fill = 'black'), e;
}
function j0(e) {
  return e.tag === 'g' ? e.children : [e];
}
var W0 = {
    hooks: function () {
      return {
        parseNodeAttributes: function (n, r) {
          var s = r.getAttribute('data-fa-mask'),
            i = s
              ? Ha(
                  s.split(' ').map(function (a) {
                    return a.trim();
                  }),
                )
              : Sc();
          return i.prefix || (i.prefix = Vn()), (n.mask = i), (n.maskId = r.getAttribute('data-fa-mask-id')), n;
        },
      };
    },
    provides: function (t) {
      t.generateAbstractMask = function (n) {
        var r = n.children,
          s = n.attributes,
          i = n.main,
          a = n.mask,
          o = n.maskId,
          l = n.transform,
          u = i.width,
          c = i.icon,
          f = a.width,
          h = a.icon,
          m = Bg({
            transform: l,
            containerWidth: f,
            iconWidth: u,
          }),
          g = {
            tag: 'rect',
            attributes: oe(
              oe({}, ko),
              {},
              {
                fill: 'white',
              },
            ),
          },
          d = c.children
            ? {
                children: c.children.map(ff),
              }
            : {},
          p = {
            tag: 'g',
            attributes: oe({}, m.inner),
            children: [
              ff(
                oe(
                  {
                    tag: c.tag,
                    attributes: oe(oe({}, c.attributes), m.path),
                  },
                  d,
                ),
              ),
            ],
          },
          _ = {
            tag: 'g',
            attributes: oe({}, m.outer),
            children: [p],
          },
          v = 'mask-'.concat(o || Qs()),
          C = 'clip-'.concat(o || Qs()),
          S = {
            tag: 'mask',
            attributes: oe(
              oe({}, ko),
              {},
              {
                id: v,
                maskUnits: 'userSpaceOnUse',
                maskContentUnits: 'userSpaceOnUse',
              },
            ),
            children: [g, _],
          },
          P = {
            tag: 'defs',
            children: [
              {
                tag: 'clipPath',
                attributes: {
                  id: C,
                },
                children: j0(h),
              },
              S,
            ],
          };
        return (
          r.push(P, {
            tag: 'rect',
            attributes: oe(
              {
                'fill': 'currentColor',
                'clip-path': 'url(#'.concat(C, ')'),
                'mask': 'url(#'.concat(v, ')'),
              },
              ko,
            ),
          }),
          {
            children: r,
            attributes: s,
          }
        );
      };
    },
  },
  U0 = {
    provides: function (t) {
      var n = !1;
      Hn.matchMedia && (n = Hn.matchMedia('(prefers-reduced-motion: reduce)').matches),
        (t.missingIconAbstract = function () {
          var r = [],
            s = {
              fill: 'currentColor',
            },
            i = {
              attributeType: 'XML',
              repeatCount: 'indefinite',
              dur: '2s',
            };
          r.push({
            tag: 'path',
            attributes: oe(
              oe({}, s),
              {},
              {
                d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z',
              },
            ),
          });
          var a = oe(
              oe({}, i),
              {},
              {
                attributeName: 'opacity',
              },
            ),
            o = {
              tag: 'circle',
              attributes: oe(
                oe({}, s),
                {},
                {
                  cx: '256',
                  cy: '364',
                  r: '28',
                },
              ),
              children: [],
            };
          return (
            n ||
              o.children.push(
                {
                  tag: 'animate',
                  attributes: oe(
                    oe({}, i),
                    {},
                    {
                      attributeName: 'r',
                      values: '28;14;28;28;14;28;',
                    },
                  ),
                },
                {
                  tag: 'animate',
                  attributes: oe(
                    oe({}, a),
                    {},
                    {
                      values: '1;0;1;1;0;1;',
                    },
                  ),
                },
              ),
            r.push(o),
            r.push({
              tag: 'path',
              attributes: oe(
                oe({}, s),
                {},
                {
                  opacity: '1',
                  d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z',
                },
              ),
              children: n
                ? []
                : [
                    {
                      tag: 'animate',
                      attributes: oe(
                        oe({}, a),
                        {},
                        {
                          values: '1;0;0;0;0;1;',
                        },
                      ),
                    },
                  ],
            }),
            n ||
              r.push({
                tag: 'path',
                attributes: oe(
                  oe({}, s),
                  {},
                  {
                    opacity: '0',
                    d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z',
                  },
                ),
                children: [
                  {
                    tag: 'animate',
                    attributes: oe(
                      oe({}, a),
                      {},
                      {
                        values: '0;0;1;1;0;0;',
                      },
                    ),
                  },
                ],
              }),
            {
              tag: 'g',
              attributes: {
                class: 'missing',
              },
              children: r,
            }
          );
        });
    },
  },
  q0 = {
    hooks: function () {
      return {
        parseNodeAttributes: function (n, r) {
          var s = r.getAttribute('data-fa-symbol'),
            i = s === null ? !1 : s === '' ? !0 : s;
          return (n.symbol = i), n;
        },
      };
    },
  },
  K0 = [Ug, P0, I0, M0, N0, V0, F0, B0, W0, U0, q0];
a0(K0, {
  mixoutsTo: At,
});
At.noAuto;
var G0 = At.config;
At.library;
At.dom;
var _l = At.parse;
At.findIconDefinition;
At.toHtml;
var Y0 = At.icon;
At.layer;
At.text;
At.counter;
function kc(e, t) {
  const n = Object.create(null),
    r = e.split(',');
  for (let s = 0; s < r.length; s++) n[r[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
const Fe = {},
  qr = [],
  Ft = () => {},
  X0 = () => !1,
  Q0 = /^on[^a-z]/,
  Fa = (e) => Q0.test(e),
  $c = (e) => e.startsWith('onUpdate:'),
  Ge = Object.assign,
  Oc = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  J0 = Object.prototype.hasOwnProperty,
  Oe = (e, t) => J0.call(e, t),
  me = Array.isArray,
  Kr = (e) => Ba(e) === '[object Map]',
  E1 = (e) => Ba(e) === '[object Set]',
  we = (e) => typeof e == 'function',
  Ue = (e) => typeof e == 'string',
  Lc = (e) => typeof e == 'symbol',
  ze = (e) => e !== null && typeof e == 'object',
  x1 = (e) => ze(e) && we(e.then) && we(e.catch),
  S1 = Object.prototype.toString,
  Ba = (e) => S1.call(e),
  Z0 = (e) => Ba(e).slice(8, -1),
  A1 = (e) => Ba(e) === '[object Object]',
  Pc = (e) => Ue(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
  aa = kc(',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'),
  ja = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  e3 = /-(\w)/g,
  rn = ja((e) => e.replace(e3, (t, n) => (n ? n.toUpperCase() : ''))),
  t3 = /\B([A-Z])/g,
  Sr = ja((e) => e.replace(t3, '-$1').toLowerCase()),
  Wa = ja((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  oa = ja((e) => (e ? `on${Wa(e)}` : '')),
  Js = (e, t) => !Object.is(e, t),
  la = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  _a = (e, t, n) => {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !1,
      value: n,
    });
  },
  yl = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  n3 = (e) => {
    const t = Ue(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let df;
const wl = () => df || (df = typeof globalThis < 'u' ? globalThis : typeof self < 'u' ? self : typeof window < 'u' ? window : typeof global < 'u' ? global : {});
function mi(e) {
  if (me(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = Ue(r) ? a3(r) : mi(r);
      if (s) for (const i in s) t[i] = s[i];
    }
    return t;
  } else {
    if (Ue(e)) return e;
    if (ze(e)) return e;
  }
}
const r3 = /;(?![^(]*\))/g,
  s3 = /:([^]+)/,
  i3 = /\/\*[^]*?\*\//g;
function a3(e) {
  const t = {};
  return (
    e
      .replace(i3, '')
      .split(r3)
      .forEach((n) => {
        if (n) {
          const r = n.split(s3);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function le(e) {
  let t = '';
  if (Ue(e)) t = e;
  else if (me(e))
    for (let n = 0; n < e.length; n++) {
      const r = le(e[n]);
      r && (t += r + ' ');
    }
  else if (ze(e)) for (const n in e) e[n] && (t += n + ' ');
  return t.trim();
}
function o3(e) {
  if (!e) return null;
  let { class: t, style: n } = e;
  return t && !Ue(t) && (e.class = le(t)), n && (e.style = mi(n)), e;
}
const l3 = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
  c3 = kc(l3);
function C1(e) {
  return !!e || e === '';
}
const G = (e) => (Ue(e) ? e : e == null ? '' : me(e) || (ze(e) && (e.toString === S1 || !we(e.toString))) ? JSON.stringify(e, T1, 2) : String(e)),
  T1 = (e, t) =>
    t && t.__v_isRef
      ? T1(e, t.value)
      : Kr(t)
        ? {
            [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, s]) => ((n[`${r} =>`] = s), n), {}),
          }
        : E1(t)
          ? {
              [`Set(${t.size})`]: [...t.values()],
            }
          : ze(t) && !me(t) && !A1(t)
            ? String(t)
            : t;
let bt;
class k1 {
  constructor(t = !1) {
    (this.detached = t), (this._active = !0), (this.effects = []), (this.cleanups = []), (this.parent = bt), !t && bt && (this.index = (bt.scopes || (bt.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = bt;
      try {
        return (bt = this), t();
      } finally {
        bt = n;
      }
    }
  }
  on() {
    bt = this;
  }
  off() {
    bt = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes) for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s && s !== this && ((this.parent.scopes[this.index] = s), (s.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function $1(e) {
  return new k1(e);
}
function u3(e, t = bt) {
  t && t.active && t.effects.push(e);
}
function Ic() {
  return bt;
}
function O1(e) {
  bt && bt.cleanups.push(e);
}
const Mc = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  L1 = (e) => (e.w & Bn) > 0,
  P1 = (e) => (e.n & Bn) > 0,
  f3 = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Bn;
  },
  d3 = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const s = t[r];
        L1(s) && !P1(s) ? s.delete(e) : (t[n++] = s), (s.w &= ~Bn), (s.n &= ~Bn);
      }
      t.length = n;
    }
  },
  ya = new WeakMap();
let ks = 0,
  Bn = 1;
const El = 30;
let zt;
const pr = Symbol(''),
  xl = Symbol('');
class Nc {
  constructor(t, n = null, r) {
    (this.fn = t), (this.scheduler = n), (this.active = !0), (this.deps = []), (this.parent = void 0), u3(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = zt,
      n = Nn;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (this.parent = zt), (zt = this), (Nn = !0), (Bn = 1 << ++ks), ks <= El ? f3(this) : hf(this), this.fn();
    } finally {
      ks <= El && d3(this), (Bn = 1 << --ks), (zt = this.parent), (Nn = n), (this.parent = void 0), this.deferStop && this.stop();
    }
  }
  stop() {
    zt === this ? (this.deferStop = !0) : this.active && (hf(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function hf(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let Nn = !0;
const I1 = [];
function cs() {
  I1.push(Nn), (Nn = !1);
}
function us() {
  const e = I1.pop();
  Nn = e === void 0 ? !0 : e;
}
function vt(e, t, n) {
  if (Nn && zt) {
    let r = ya.get(e);
    r || ya.set(e, (r = new Map()));
    let s = r.get(n);
    s || r.set(n, (s = Mc())), M1(s);
  }
}
function M1(e, t) {
  let n = !1;
  ks <= El ? P1(e) || ((e.n |= Bn), (n = !L1(e))) : (n = !e.has(zt)), n && (e.add(zt), zt.deps.push(e));
}
function gn(e, t, n, r, s, i) {
  const a = ya.get(e);
  if (!a) return;
  let o = [];
  if (t === 'clear') o = [...a.values()];
  else if (n === 'length' && me(e)) {
    const l = Number(r);
    a.forEach((u, c) => {
      (c === 'length' || c >= l) && o.push(u);
    });
  } else
    switch ((n !== void 0 && o.push(a.get(n)), t)) {
      case 'add':
        me(e) ? Pc(n) && o.push(a.get('length')) : (o.push(a.get(pr)), Kr(e) && o.push(a.get(xl)));
        break;
      case 'delete':
        me(e) || (o.push(a.get(pr)), Kr(e) && o.push(a.get(xl)));
        break;
      case 'set':
        Kr(e) && o.push(a.get(pr));
        break;
    }
  if (o.length === 1) o[0] && Sl(o[0]);
  else {
    const l = [];
    for (const u of o) u && l.push(...u);
    Sl(Mc(l));
  }
}
function Sl(e, t) {
  const n = me(e) ? e : [...e];
  for (const r of n) r.computed && pf(r);
  for (const r of n) r.computed || pf(r);
}
function pf(e, t) {
  (e !== zt || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
function h3(e, t) {
  var n;
  return (n = ya.get(e)) == null ? void 0 : n.get(t);
}
const p3 = kc('__proto__,__v_isRef,__isVue'),
  N1 = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== 'arguments' && e !== 'caller')
      .map((e) => Symbol[e])
      .filter(Lc),
  ),
  m3 = Ua(),
  g3 = Ua(!1, !0),
  v3 = Ua(!0),
  b3 = Ua(!0, !0),
  mf = _3();
function _3() {
  const e = {};
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      e[t] = function (...n) {
        const r = $e(this);
        for (let i = 0, a = this.length; i < a; i++) vt(r, 'get', i + '');
        const s = r[t](...n);
        return s === -1 || s === !1 ? r[t](...n.map($e)) : s;
      };
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      e[t] = function (...n) {
        cs();
        const r = $e(this)[t].apply(this, n);
        return us(), r;
      };
    }),
    e
  );
}
function y3(e) {
  const t = $e(this);
  return vt(t, 'has', e), t.hasOwnProperty(e);
}
function Ua(e = !1, t = !1) {
  return function (r, s, i) {
    if (s === '__v_isReactive') return !e;
    if (s === '__v_isReadonly') return e;
    if (s === '__v_isShallow') return t;
    if (s === '__v_raw' && i === (e ? (t ? B1 : F1) : t ? V1 : H1).get(r)) return r;
    const a = me(r);
    if (!e) {
      if (a && Oe(mf, s)) return Reflect.get(mf, s, i);
      if (s === 'hasOwnProperty') return y3;
    }
    const o = Reflect.get(r, s, i);
    return (Lc(s) ? N1.has(s) : p3(s)) || (e || vt(r, 'get', s), t) ? o : We(o) ? (a && Pc(s) ? o : o.value) : ze(o) ? (e ? zc(o) : un(o)) : o;
  };
}
const w3 = R1(),
  E3 = R1(!0);
function R1(e = !1) {
  return function (n, r, s, i) {
    let a = n[r];
    if (Qr(a) && We(a) && !We(s)) return !1;
    if (!e && (!wa(s) && !Qr(s) && ((a = $e(a)), (s = $e(s))), !me(n) && We(a) && !We(s))) return (a.value = s), !0;
    const o = me(n) && Pc(r) ? Number(r) < n.length : Oe(n, r),
      l = Reflect.set(n, r, s, i);
    return n === $e(i) && (o ? Js(s, a) && gn(n, 'set', r, s) : gn(n, 'add', r, s)), l;
  };
}
function x3(e, t) {
  const n = Oe(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && gn(e, 'delete', t, void 0), r;
}
function S3(e, t) {
  const n = Reflect.has(e, t);
  return (!Lc(t) || !N1.has(t)) && vt(e, 'has', t), n;
}
function A3(e) {
  return vt(e, 'iterate', me(e) ? 'length' : pr), Reflect.ownKeys(e);
}
const D1 = {
    get: m3,
    set: w3,
    deleteProperty: x3,
    has: S3,
    ownKeys: A3,
  },
  z1 = {
    get: v3,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  C3 = Ge({}, D1, {
    get: g3,
    set: E3,
  }),
  T3 = Ge({}, z1, {
    get: b3,
  }),
  Rc = (e) => e,
  qa = (e) => Reflect.getPrototypeOf(e);
function Vi(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = $e(e),
    i = $e(t);
  n || (t !== i && vt(s, 'get', t), vt(s, 'get', i));
  const { has: a } = qa(s),
    o = r ? Rc : n ? Hc : Zs;
  if (a.call(s, t)) return o(e.get(t));
  if (a.call(s, i)) return o(e.get(i));
  e !== s && e.get(t);
}
function Fi(e, t = !1) {
  const n = this.__v_raw,
    r = $e(n),
    s = $e(e);
  return t || (e !== s && vt(r, 'has', e), vt(r, 'has', s)), e === s ? n.has(e) : n.has(e) || n.has(s);
}
function Bi(e, t = !1) {
  return (e = e.__v_raw), !t && vt($e(e), 'iterate', pr), Reflect.get(e, 'size', e);
}
function gf(e) {
  e = $e(e);
  const t = $e(this);
  return qa(t).has.call(t, e) || (t.add(e), gn(t, 'add', e, e)), this;
}
function vf(e, t) {
  t = $e(t);
  const n = $e(this),
    { has: r, get: s } = qa(n);
  let i = r.call(n, e);
  i || ((e = $e(e)), (i = r.call(n, e)));
  const a = s.call(n, e);
  return n.set(e, t), i ? Js(t, a) && gn(n, 'set', e, t) : gn(n, 'add', e, t), this;
}
function bf(e) {
  const t = $e(this),
    { has: n, get: r } = qa(t);
  let s = n.call(t, e);
  s || ((e = $e(e)), (s = n.call(t, e))), r && r.call(t, e);
  const i = t.delete(e);
  return s && gn(t, 'delete', e, void 0), i;
}
function _f() {
  const e = $e(this),
    t = e.size !== 0,
    n = e.clear();
  return t && gn(e, 'clear', void 0, void 0), n;
}
function ji(e, t) {
  return function (r, s) {
    const i = this,
      a = i.__v_raw,
      o = $e(a),
      l = t ? Rc : e ? Hc : Zs;
    return !e && vt(o, 'iterate', pr), a.forEach((u, c) => r.call(s, l(u), l(c), i));
  };
}
function Wi(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      i = $e(s),
      a = Kr(i),
      o = e === 'entries' || (e === Symbol.iterator && a),
      l = e === 'keys' && a,
      u = s[e](...r),
      c = n ? Rc : t ? Hc : Zs;
    return (
      !t && vt(i, 'iterate', l ? xl : pr),
      {
        next() {
          const { value: f, done: h } = u.next();
          return h
            ? {
                value: f,
                done: h,
              }
            : {
                value: o ? [c(f[0]), c(f[1])] : c(f),
                done: h,
              };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Cn(e) {
  return function (...t) {
    return e === 'delete' ? !1 : this;
  };
}
function k3() {
  const e = {
      get(i) {
        return Vi(this, i);
      },
      get size() {
        return Bi(this);
      },
      has: Fi,
      add: gf,
      set: vf,
      delete: bf,
      clear: _f,
      forEach: ji(!1, !1),
    },
    t = {
      get(i) {
        return Vi(this, i, !1, !0);
      },
      get size() {
        return Bi(this);
      },
      has: Fi,
      add: gf,
      set: vf,
      delete: bf,
      clear: _f,
      forEach: ji(!1, !0),
    },
    n = {
      get(i) {
        return Vi(this, i, !0);
      },
      get size() {
        return Bi(this, !0);
      },
      has(i) {
        return Fi.call(this, i, !0);
      },
      add: Cn('add'),
      set: Cn('set'),
      delete: Cn('delete'),
      clear: Cn('clear'),
      forEach: ji(!0, !1),
    },
    r = {
      get(i) {
        return Vi(this, i, !0, !0);
      },
      get size() {
        return Bi(this, !0);
      },
      has(i) {
        return Fi.call(this, i, !0);
      },
      add: Cn('add'),
      set: Cn('set'),
      delete: Cn('delete'),
      clear: Cn('clear'),
      forEach: ji(!0, !0),
    };
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((i) => {
      (e[i] = Wi(i, !1, !1)), (n[i] = Wi(i, !0, !1)), (t[i] = Wi(i, !1, !0)), (r[i] = Wi(i, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [$3, O3, L3, P3] = k3();
function Ka(e, t) {
  const n = t ? (e ? P3 : L3) : e ? O3 : $3;
  return (r, s, i) => (s === '__v_isReactive' ? !e : s === '__v_isReadonly' ? e : s === '__v_raw' ? r : Reflect.get(Oe(n, s) && s in r ? n : r, s, i));
}
const I3 = {
    get: Ka(!1, !1),
  },
  M3 = {
    get: Ka(!1, !0),
  },
  N3 = {
    get: Ka(!0, !1),
  },
  R3 = {
    get: Ka(!0, !0),
  },
  H1 = new WeakMap(),
  V1 = new WeakMap(),
  F1 = new WeakMap(),
  B1 = new WeakMap();
function D3(e) {
  switch (e) {
    case 'Object':
    case 'Array':
      return 1;
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2;
    default:
      return 0;
  }
}
function z3(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : D3(Z0(e));
}
function un(e) {
  return Qr(e) ? e : Ga(e, !1, D1, I3, H1);
}
function Dc(e) {
  return Ga(e, !1, C3, M3, V1);
}
function zc(e) {
  return Ga(e, !0, z1, N3, F1);
}
function YO(e) {
  return Ga(e, !0, T3, R3, B1);
}
function Ga(e, t, n, r, s) {
  if (!ze(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const i = s.get(e);
  if (i) return i;
  const a = z3(e);
  if (a === 0) return e;
  const o = new Proxy(e, a === 2 ? r : n);
  return s.set(e, o), o;
}
function Rn(e) {
  return Qr(e) ? Rn(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Qr(e) {
  return !!(e && e.__v_isReadonly);
}
function wa(e) {
  return !!(e && e.__v_isShallow);
}
function j1(e) {
  return Rn(e) || Qr(e);
}
function $e(e) {
  const t = e && e.__v_raw;
  return t ? $e(t) : e;
}
function gi(e) {
  return _a(e, '__v_skip', !0), e;
}
const Zs = (e) => (ze(e) ? un(e) : e),
  Hc = (e) => (ze(e) ? zc(e) : e);
function Vc(e) {
  Nn && zt && ((e = $e(e)), M1(e.dep || (e.dep = Mc())));
}
function Fc(e, t) {
  e = $e(e);
  const n = e.dep;
  n && Sl(n);
}
function We(e) {
  return !!(e && e.__v_isRef === !0);
}
function ce(e) {
  return U1(e, !1);
}
function W1(e) {
  return U1(e, !0);
}
function U1(e, t) {
  return We(e) ? e : new H3(e, t);
}
class H3 {
  constructor(t, n) {
    (this.__v_isShallow = n), (this.dep = void 0), (this.__v_isRef = !0), (this._rawValue = n ? t : $e(t)), (this._value = n ? t : Zs(t));
  }
  get value() {
    return Vc(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || wa(t) || Qr(t);
    (t = n ? t : $e(t)), Js(t, this._rawValue) && ((this._rawValue = t), (this._value = n ? t : Zs(t)), Fc(this));
  }
}
function E(e) {
  return We(e) ? e.value : e;
}
function et(e) {
  return we(e) ? e() : E(e);
}
const V3 = {
  get: (e, t, n) => E(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return We(s) && !We(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function q1(e) {
  return Rn(e) ? e : new Proxy(e, V3);
}
class F3 {
  constructor(t) {
    (this.dep = void 0), (this.__v_isRef = !0);
    const { get: n, set: r } = t(
      () => Vc(this),
      () => Fc(this),
    );
    (this._get = n), (this._set = r);
  }
  get value() {
    return this._get();
  }
  set value(t) {
    this._set(t);
  }
}
function B3(e) {
  return new F3(e);
}
function j3(e) {
  const t = me(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = K1(e, n);
  return t;
}
class W3 {
  constructor(t, n, r) {
    (this._object = t), (this._key = n), (this._defaultValue = r), (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return h3($e(this._object), this._key);
  }
}
class U3 {
  constructor(t) {
    (this._getter = t), (this.__v_isRef = !0), (this.__v_isReadonly = !0);
  }
  get value() {
    return this._getter();
  }
}
function q3(e, t, n) {
  return We(e) ? e : we(e) ? new U3(e) : ze(e) && arguments.length > 1 ? K1(e, t, n) : ce(e);
}
function K1(e, t, n) {
  const r = e[t];
  return We(r) ? r : new W3(e, t, n);
}
class K3 {
  constructor(t, n, r, s) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new Nc(t, () => {
        this._dirty || ((this._dirty = !0), Fc(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = $e(this);
    return Vc(t), (t._dirty || !t._cacheable) && ((t._dirty = !1), (t._value = t.effect.run())), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
function G3(e, t, n = !1) {
  let r, s;
  const i = we(e);
  return i ? ((r = e), (s = Ft)) : ((r = e.get), (s = e.set)), new K3(r, s, i || !s, n);
}
function Dn(e, t, n, r) {
  let s;
  try {
    s = r ? e(...r) : e();
  } catch (i) {
    Ya(i, t, n);
  }
  return s;
}
function Lt(e, t, n, r) {
  if (we(e)) {
    const i = Dn(e, t, n, r);
    return (
      i &&
        x1(i) &&
        i.catch((a) => {
          Ya(a, t, n);
        }),
      i
    );
  }
  const s = [];
  for (let i = 0; i < e.length; i++) s.push(Lt(e[i], t, n, r));
  return s;
}
function Ya(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let i = t.parent;
    const a = t.proxy,
      o = n;
    for (; i; ) {
      const u = i.ec;
      if (u) {
        for (let c = 0; c < u.length; c++) if (u[c](e, a, o) === !1) return;
      }
      i = i.parent;
    }
    const l = t.appContext.config.errorHandler;
    if (l) {
      Dn(l, null, 10, [e, a, o]);
      return;
    }
  }
  Y3(e, n, s, r);
}
function Y3(e, t, n, r = !0) {
  console.error(e);
}
let ei = !1,
  Al = !1;
const it = [];
let Qt = 0;
const Gr = [];
let ln = null,
  ar = 0;
const G1 = Promise.resolve();
let Bc = null;
function Gn(e) {
  const t = Bc || G1;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function X3(e) {
  let t = Qt + 1,
    n = it.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    ti(it[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function jc(e) {
  (!it.length || !it.includes(e, ei && e.allowRecurse ? Qt + 1 : Qt)) && (e.id == null ? it.push(e) : it.splice(X3(e.id), 0, e), Y1());
}
function Y1() {
  !ei && !Al && ((Al = !0), (Bc = G1.then(Q1)));
}
function Q3(e) {
  const t = it.indexOf(e);
  t > Qt && it.splice(t, 1);
}
function J3(e) {
  me(e) ? Gr.push(...e) : (!ln || !ln.includes(e, e.allowRecurse ? ar + 1 : ar)) && Gr.push(e), Y1();
}
function yf(e, t = ei ? Qt + 1 : 0) {
  for (; t < it.length; t++) {
    const n = it[t];
    n && n.pre && (it.splice(t, 1), t--, n());
  }
}
function X1(e) {
  if (Gr.length) {
    const t = [...new Set(Gr)];
    if (((Gr.length = 0), ln)) {
      ln.push(...t);
      return;
    }
    for (ln = t, ln.sort((n, r) => ti(n) - ti(r)), ar = 0; ar < ln.length; ar++) ln[ar]();
    (ln = null), (ar = 0);
  }
}
const ti = (e) => (e.id == null ? 1 / 0 : e.id),
  Z3 = (e, t) => {
    const n = ti(e) - ti(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Q1(e) {
  (Al = !1), (ei = !0), it.sort(Z3);
  const t = Ft;
  try {
    for (Qt = 0; Qt < it.length; Qt++) {
      const n = it[Qt];
      n && n.active !== !1 && Dn(n, null, 14);
    }
  } finally {
    (Qt = 0), (it.length = 0), X1(), (ei = !1), (Bc = null), (it.length || Gr.length) && Q1();
  }
}
function ev(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || Fe;
  let s = n;
  const i = t.startsWith('update:'),
    a = i && t.slice(7);
  if (a && a in r) {
    const c = `${a === 'modelValue' ? 'model' : a}Modifiers`,
      { number: f, trim: h } = r[c] || Fe;
    h && (s = n.map((m) => (Ue(m) ? m.trim() : m))), f && (s = n.map(yl));
  }
  let o,
    l = r[(o = oa(t))] || r[(o = oa(rn(t)))];
  !l && i && (l = r[(o = oa(Sr(t)))]), l && Lt(l, e, 6, s);
  const u = r[o + 'Once'];
  if (u) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[o]) return;
    (e.emitted[o] = !0), Lt(u, e, 6, s);
  }
}
function J1(e, t, n = !1) {
  const r = t.emitsCache,
    s = r.get(e);
  if (s !== void 0) return s;
  const i = e.emits;
  let a = {},
    o = !1;
  if (!we(e)) {
    const l = (u) => {
      const c = J1(u, t, !0);
      c && ((o = !0), Ge(a, c));
    };
    !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !i && !o ? (ze(e) && r.set(e, null), null) : (me(i) ? i.forEach((l) => (a[l] = null)) : Ge(a, i), ze(e) && r.set(e, a), a);
}
function Xa(e, t) {
  return !e || !Fa(t) ? !1 : ((t = t.slice(2).replace(/Once$/, '')), Oe(e, t[0].toLowerCase() + t.slice(1)) || Oe(e, Sr(t)) || Oe(e, t));
}
let Je = null,
  Qa = null;
function Ea(e) {
  const t = Je;
  return (Je = e), (Qa = (e && e.type.__scopeId) || null), t;
}
function vi(e) {
  Qa = e;
}
function bi() {
  Qa = null;
}
const tv = (e) => ve;
function ve(e, t = Je, n) {
  if (!t || e._n) return e;
  const r = (...s) => {
    r._d && Mf(-1);
    const i = Ea(t);
    let a;
    try {
      a = e(...s);
    } finally {
      Ea(i), r._d && Mf(1);
    }
    return a;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function $o(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: s,
    props: i,
    propsOptions: [a],
    slots: o,
    attrs: l,
    emit: u,
    render: c,
    renderCache: f,
    data: h,
    setupState: m,
    ctx: g,
    inheritAttrs: d,
  } = e;
  let p, _;
  const v = Ea(e);
  try {
    if (n.shapeFlag & 4) {
      const S = s || r;
      (p = Yt(c.call(S, S, f, i, m, h, g))), (_ = l);
    } else {
      const S = t;
      (p = Yt(
        S.length > 1
          ? S(i, {
              attrs: l,
              slots: o,
              emit: u,
            })
          : S(i, null),
      )),
        (_ = t.props ? l : nv(l));
    }
  } catch (S) {
    (Rs.length = 0), Ya(S, e, 1), (p = F(Pt));
  }
  let C = p;
  if (_ && d !== !1) {
    const S = Object.keys(_),
      { shapeFlag: P } = C;
    S.length && P & 7 && (a && S.some($c) && (_ = rv(_, a)), (C = jn(C, _)));
  }
  return n.dirs && ((C = jn(C)), (C.dirs = C.dirs ? C.dirs.concat(n.dirs) : n.dirs)), n.transition && (C.transition = n.transition), (p = C), Ea(v), p;
}
const nv = (e) => {
    let t;
    for (const n in e) (n === 'class' || n === 'style' || Fa(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  rv = (e, t) => {
    const n = {};
    for (const r in e) (!$c(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function sv(e, t, n) {
  const { props: r, children: s, component: i } = e,
    { props: a, children: o, patchFlag: l } = t,
    u = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && l >= 0) {
    if (l & 1024) return !0;
    if (l & 16) return r ? wf(r, a, u) : !!a;
    if (l & 8) {
      const c = t.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        const h = c[f];
        if (a[h] !== r[h] && !Xa(u, h)) return !0;
      }
    }
  } else return (s || o) && (!o || !o.$stable) ? !0 : r === a ? !1 : r ? (a ? wf(r, a, u) : !0) : !!a;
  return !1;
}
function wf(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < r.length; s++) {
    const i = r[s];
    if (t[i] !== e[i] && !Xa(n, i)) return !0;
  }
  return !1;
}
function iv({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const av = (e) => e.__isSuspense;
function ov(e, t) {
  t && t.pendingBranch ? (me(e) ? t.effects.push(...e) : t.effects.push(e)) : J3(e);
}
function lv(e, t) {
  return Ja(e, null, t);
}
function cv(e, t) {
  return Ja(e, null, {
    flush: 'post',
  });
}
const Ui = {};
function Ze(e, t, n) {
  return Ja(e, t, n);
}
function Ja(e, t, { immediate: n, deep: r, flush: s, onTrack: i, onTrigger: a } = Fe) {
  var o;
  const l = Ic() === ((o = Xe) == null ? void 0 : o.scope) ? Xe : null;
  let u,
    c = !1,
    f = !1;
  if (
    (We(e)
      ? ((u = () => e.value), (c = wa(e)))
      : Rn(e)
        ? ((u = () => e), (r = !0))
        : me(e)
          ? ((f = !0),
            (c = e.some((S) => Rn(S) || wa(S))),
            (u = () =>
              e.map((S) => {
                if (We(S)) return S.value;
                if (Rn(S)) return fr(S);
                if (we(S)) return Dn(S, l, 2);
              })))
          : we(e)
            ? t
              ? (u = () => Dn(e, l, 2))
              : (u = () => {
                  if (!(l && l.isUnmounted)) return h && h(), Lt(e, l, 3, [m]);
                })
            : (u = Ft),
    t && r)
  ) {
    const S = u;
    u = () => fr(S());
  }
  let h,
    m = (S) => {
      h = v.onStop = () => {
        Dn(S, l, 4);
      };
    },
    g;
  if (si)
    if (((m = Ft), t ? n && Lt(t, l, 3, [u(), f ? [] : void 0, m]) : u(), s === 'sync')) {
      const S = n4();
      g = S.__watcherHandles || (S.__watcherHandles = []);
    } else return Ft;
  let d = f ? new Array(e.length).fill(Ui) : Ui;
  const p = () => {
    if (v.active)
      if (t) {
        const S = v.run();
        (r || c || (f ? S.some((P, N) => Js(P, d[N])) : Js(S, d))) && (h && h(), Lt(t, l, 3, [S, d === Ui ? void 0 : f && d[0] === Ui ? [] : d, m]), (d = S));
      } else v.run();
  };
  p.allowRecurse = !!t;
  let _;
  s === 'sync' ? (_ = p) : s === 'post' ? (_ = () => pt(p, l && l.suspense)) : ((p.pre = !0), l && (p.id = l.uid), (_ = () => jc(p)));
  const v = new Nc(u, _);
  t ? (n ? p() : (d = v.run())) : s === 'post' ? pt(v.run.bind(v), l && l.suspense) : v.run();
  const C = () => {
    v.stop(), l && l.scope && Oc(l.scope.effects, v);
  };
  return g && g.push(C), C;
}
function uv(e, t, n) {
  const r = this.proxy,
    s = Ue(e) ? (e.includes('.') ? Z1(r, e) : () => r[e]) : e.bind(r, r);
  let i;
  we(t) ? (i = t) : ((i = t.handler), (n = t));
  const a = Xe;
  Jr(this);
  const o = Ja(s, i.bind(r), n);
  return a ? Jr(a) : mr(), o;
}
function Z1(e, t) {
  const n = t.split('.');
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++) r = r[n[s]];
    return r;
  };
}
function fr(e, t) {
  if (!ze(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), We(e))) fr(e.value, t);
  else if (me(e)) for (let n = 0; n < e.length; n++) fr(e[n], t);
  else if (E1(e) || Kr(e))
    e.forEach((n) => {
      fr(n, t);
    });
  else if (A1(e)) for (const n in e) fr(e[n], t);
  return e;
}
function Za(e, t) {
  const n = Je;
  if (n === null) return e;
  const r = ao(n) || n.proxy,
    s = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [a, o, l, u = Fe] = t[i];
    a &&
      (we(a) &&
        (a = {
          mounted: a,
          updated: a,
        }),
      a.deep && fr(o),
      s.push({
        dir: a,
        instance: r,
        value: o,
        oldValue: void 0,
        arg: l,
        modifiers: u,
      }));
  }
  return e;
}
function er(e, t, n, r) {
  const s = e.dirs,
    i = t && t.dirs;
  for (let a = 0; a < s.length; a++) {
    const o = s[a];
    i && (o.oldValue = i[a].value);
    let l = o.dir[r];
    l && (cs(), Lt(l, n, 8, [e.el, o, e, t]), us());
  }
}
function fv() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    on(() => {
      e.isMounted = !0;
    }),
    ap(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const Tt = [Function, Array],
  ep = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: Tt,
    onEnter: Tt,
    onAfterEnter: Tt,
    onEnterCancelled: Tt,
    onBeforeLeave: Tt,
    onLeave: Tt,
    onAfterLeave: Tt,
    onLeaveCancelled: Tt,
    onBeforeAppear: Tt,
    onAppear: Tt,
    onAfterAppear: Tt,
    onAppearCancelled: Tt,
  },
  dv = {
    name: 'BaseTransition',
    props: ep,
    setup(e, { slots: t }) {
      const n = _i(),
        r = fv();
      let s;
      return () => {
        const i = t.default && np(t.default(), !0);
        if (!i || !i.length) return;
        let a = i[0];
        if (i.length > 1) {
          for (const d of i)
            if (d.type !== Pt) {
              a = d;
              break;
            }
        }
        const o = $e(e),
          { mode: l } = o;
        if (r.isLeaving) return Oo(a);
        const u = Ef(a);
        if (!u) return Oo(a);
        const c = Cl(u, o, r, n);
        Tl(u, c);
        const f = n.subTree,
          h = f && Ef(f);
        let m = !1;
        const { getTransitionKey: g } = u.type;
        if (g) {
          const d = g();
          s === void 0 ? (s = d) : d !== s && ((s = d), (m = !0));
        }
        if (h && h.type !== Pt && (!or(u, h) || m)) {
          const d = Cl(h, o, r, n);
          if ((Tl(h, d), l === 'out-in'))
            return (
              (r.isLeaving = !0),
              (d.afterLeave = () => {
                (r.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              Oo(a)
            );
          l === 'in-out' &&
            u.type !== Pt &&
            (d.delayLeave = (p, _, v) => {
              const C = tp(r, h);
              (C[String(h.key)] = h),
                (p._leaveCb = () => {
                  _(), (p._leaveCb = void 0), delete c.delayedLeave;
                }),
                (c.delayedLeave = v);
            });
        }
        return a;
      };
    },
  },
  hv = dv;
function tp(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || ((r = Object.create(null)), n.set(t.type, r)), r;
}
function Cl(e, t, n, r) {
  const {
      appear: s,
      mode: i,
      persisted: a = !1,
      onBeforeEnter: o,
      onEnter: l,
      onAfterEnter: u,
      onEnterCancelled: c,
      onBeforeLeave: f,
      onLeave: h,
      onAfterLeave: m,
      onLeaveCancelled: g,
      onBeforeAppear: d,
      onAppear: p,
      onAfterAppear: _,
      onAppearCancelled: v,
    } = t,
    C = String(e.key),
    S = tp(n, e),
    P = (k, R) => {
      k && Lt(k, r, 9, R);
    },
    N = (k, R) => {
      const M = R[1];
      P(k, R), me(k) ? k.every((ee) => ee.length <= 1) && M() : k.length <= 1 && M();
    },
    D = {
      mode: i,
      persisted: a,
      beforeEnter(k) {
        let R = o;
        if (!n.isMounted)
          if (s) R = d || o;
          else return;
        k._leaveCb && k._leaveCb(!0);
        const M = S[C];
        M && or(e, M) && M.el._leaveCb && M.el._leaveCb(), P(R, [k]);
      },
      enter(k) {
        let R = l,
          M = u,
          ee = c;
        if (!n.isMounted)
          if (s) (R = p || l), (M = _ || u), (ee = v || c);
          else return;
        let Q = !1;
        const te = (k._enterCb = (fe) => {
          Q || ((Q = !0), fe ? P(ee, [k]) : P(M, [k]), D.delayedLeave && D.delayedLeave(), (k._enterCb = void 0));
        });
        R ? N(R, [k, te]) : te();
      },
      leave(k, R) {
        const M = String(e.key);
        if ((k._enterCb && k._enterCb(!0), n.isUnmounting)) return R();
        P(f, [k]);
        let ee = !1;
        const Q = (k._leaveCb = (te) => {
          ee || ((ee = !0), R(), te ? P(g, [k]) : P(m, [k]), (k._leaveCb = void 0), S[M] === e && delete S[M]);
        });
        (S[M] = e), h ? N(h, [k, Q]) : Q();
      },
      clone(k) {
        return Cl(k, t, n, r);
      },
    };
  return D;
}
function Oo(e) {
  if (eo(e)) return (e = jn(e)), (e.children = null), e;
}
function Ef(e) {
  return eo(e) ? (e.children ? e.children[0] : void 0) : e;
}
function Tl(e, t) {
  e.shapeFlag & 6 && e.component
    ? Tl(e.component.subTree, t)
    : e.shapeFlag & 128
      ? ((e.ssContent.transition = t.clone(e.ssContent)), (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t);
}
function np(e, t = !1, n) {
  let r = [],
    s = 0;
  for (let i = 0; i < e.length; i++) {
    let a = e[i];
    const o = n == null ? a.key : String(n) + String(a.key != null ? a.key : i);
    a.type === Ke
      ? (a.patchFlag & 128 && s++, (r = r.concat(np(a.children, t, o))))
      : (t || a.type !== Pt) &&
        r.push(
          o != null
            ? jn(a, {
                key: o,
              })
            : a,
        );
  }
  if (s > 1) for (let i = 0; i < r.length; i++) r[i].patchFlag = -2;
  return r;
}
function Wc(e, t) {
  return we(e)
    ? (() =>
        Ge(
          {
            name: e.name,
          },
          t,
          {
            setup: e,
          },
        ))()
    : e;
}
const Is = (e) => !!e.type.__asyncLoader,
  eo = (e) => e.type.__isKeepAlive;
function rp(e, t) {
  ip(e, 'a', t);
}
function sp(e, t) {
  ip(e, 'da', t);
}
function ip(e, t, n = Xe) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n;
      for (; s; ) {
        if (s.isDeactivated) return;
        s = s.parent;
      }
      return e();
    });
  if ((to(t, r, n), n)) {
    let s = n.parent;
    for (; s && s.parent; ) eo(s.parent.vnode) && pv(r, t, n, s), (s = s.parent);
  }
}
function pv(e, t, n, r) {
  const s = to(t, e, r, !0);
  fs(() => {
    Oc(r[t], s);
  }, n);
}
function to(e, t, n = Xe, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      i =
        t.__weh ||
        (t.__weh = (...a) => {
          if (n.isUnmounted) return;
          cs(), Jr(n);
          const o = Lt(t, n, e, a);
          return mr(), us(), o;
        });
    return r ? s.unshift(i) : s.push(i), i;
  }
}
const wn =
    (e) =>
    (t, n = Xe) =>
      (!si || e === 'sp') && to(e, (...r) => t(...r), n),
  mv = wn('bm'),
  on = wn('m'),
  gv = wn('bu'),
  vv = wn('u'),
  ap = wn('bum'),
  fs = wn('um'),
  bv = wn('sp'),
  _v = wn('rtg'),
  yv = wn('rtc');
function wv(e, t = Xe) {
  to('ec', e, t);
}
const Uc = 'components',
  Ev = 'directives';
function gt(e, t) {
  return qc(Uc, e, !0, t) || e;
}
const op = Symbol.for('v-ndc');
function xf(e) {
  return Ue(e) ? qc(Uc, e, !1) || e : e || op;
}
function lp(e) {
  return qc(Ev, e);
}
function qc(e, t, n = !0, r = !1) {
  const s = Je || Xe;
  if (s) {
    const i = s.type;
    if (e === Uc) {
      const o = Zv(i, !1);
      if (o && (o === t || o === rn(t) || o === Wa(rn(t)))) return i;
    }
    const a = Sf(s[e] || i[e], t) || Sf(s.appContext[e], t);
    return !a && r ? i : a;
  }
}
function Sf(e, t) {
  return e && (e[t] || e[rn(t)] || e[Wa(rn(t))]);
}
function no(e, t, n, r) {
  let s;
  const i = n && n[r];
  if (me(e) || Ue(e)) {
    s = new Array(e.length);
    for (let a = 0, o = e.length; a < o; a++) s[a] = t(e[a], a, void 0, i && i[a]);
  } else if (typeof e == 'number') {
    s = new Array(e);
    for (let a = 0; a < e; a++) s[a] = t(a + 1, a, void 0, i && i[a]);
  } else if (ze(e))
    if (e[Symbol.iterator]) s = Array.from(e, (a, o) => t(a, o, void 0, i && i[o]));
    else {
      const a = Object.keys(e);
      s = new Array(a.length);
      for (let o = 0, l = a.length; o < l; o++) {
        const u = a[o];
        s[o] = t(e[u], u, o, i && i[o]);
      }
    }
  else s = [];
  return n && (n[r] = s), s;
}
function ct(e, t, n = {}, r, s) {
  if (Je.isCE || (Je.parent && Is(Je.parent) && Je.parent.isCE)) return t !== 'default' && (n.name = t), F('slot', n, r && r());
  let i = e[t];
  i && i._c && (i._d = !1), be();
  const a = i && cp(i(n)),
    o = sn(
      Ke,
      {
        key: n.key || (a && a.key) || `_${t}`,
      },
      a || (r ? r() : []),
      a && e._ === 1 ? 64 : -2,
    );
  return !s && o.scopeId && (o.slotScopeIds = [o.scopeId + '-s']), i && i._c && (i._d = !0), o;
}
function cp(e) {
  return e.some((t) => (Sa(t) ? !(t.type === Pt || (t.type === Ke && !cp(t.children))) : !0)) ? e : null;
}
function xv(e, t) {
  const n = {};
  for (const r in e) n[t && /[A-Z]/.test(r) ? `on:${r}` : oa(r)] = e[r];
  return n;
}
const kl = (e) => (e ? (Ep(e) ? ao(e) || e.proxy : kl(e.parent)) : null),
  Ms = Ge(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => kl(e.parent),
    $root: (e) => kl(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Kc(e),
    $forceUpdate: (e) => e.f || (e.f = () => jc(e.update)),
    $nextTick: (e) => e.n || (e.n = Gn.bind(e.proxy)),
    $watch: (e) => uv.bind(e),
  }),
  Lo = (e, t) => e !== Fe && !e.__isScriptSetup && Oe(e, t),
  Sv = {
    get({ _: e }, t) {
      const { ctx: n, setupState: r, data: s, props: i, accessCache: a, type: o, appContext: l } = e;
      let u;
      if (t[0] !== '$') {
        const m = a[t];
        if (m !== void 0)
          switch (m) {
            case 1:
              return r[t];
            case 2:
              return s[t];
            case 4:
              return n[t];
            case 3:
              return i[t];
          }
        else {
          if (Lo(r, t)) return (a[t] = 1), r[t];
          if (s !== Fe && Oe(s, t)) return (a[t] = 2), s[t];
          if ((u = e.propsOptions[0]) && Oe(u, t)) return (a[t] = 3), i[t];
          if (n !== Fe && Oe(n, t)) return (a[t] = 4), n[t];
          $l && (a[t] = 0);
        }
      }
      const c = Ms[t];
      let f, h;
      if (c) return t === '$attrs' && vt(e, 'get', t), c(e);
      if ((f = o.__cssModules) && (f = f[t])) return f;
      if (n !== Fe && Oe(n, t)) return (a[t] = 4), n[t];
      if (((h = l.config.globalProperties), Oe(h, t))) return h[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: i } = e;
      return Lo(s, t) ? ((s[t] = n), !0) : r !== Fe && Oe(r, t) ? ((r[t] = n), !0) : Oe(e.props, t) || (t[0] === '$' && t.slice(1) in e) ? !1 : ((i[t] = n), !0);
    },
    has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: s, propsOptions: i } }, a) {
      let o;
      return !!n[a] || (e !== Fe && Oe(e, a)) || Lo(t, a) || ((o = i[0]) && Oe(o, a)) || Oe(r, a) || Oe(Ms, a) || Oe(s.config.globalProperties, a);
    },
    defineProperty(e, t, n) {
      return n.get != null ? (e._.accessCache[t] = 0) : Oe(n, 'value') && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
    },
  };
function Af(e) {
  return me(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let $l = !0;
function Av(e) {
  const t = Kc(e),
    n = e.proxy,
    r = e.ctx;
  ($l = !1), t.beforeCreate && Cf(t.beforeCreate, e, 'bc');
  const {
    data: s,
    computed: i,
    methods: a,
    watch: o,
    provide: l,
    inject: u,
    created: c,
    beforeMount: f,
    mounted: h,
    beforeUpdate: m,
    updated: g,
    activated: d,
    deactivated: p,
    beforeDestroy: _,
    beforeUnmount: v,
    destroyed: C,
    unmounted: S,
    render: P,
    renderTracked: N,
    renderTriggered: D,
    errorCaptured: k,
    serverPrefetch: R,
    expose: M,
    inheritAttrs: ee,
    components: Q,
    directives: te,
    filters: fe,
  } = t;
  if ((u && Cv(u, r, null), a))
    for (const de in a) {
      const Se = a[de];
      we(Se) && (r[de] = Se.bind(n));
    }
  if (s) {
    const de = s.call(n, n);
    ze(de) && (e.data = un(de));
  }
  if ((($l = !0), i))
    for (const de in i) {
      const Se = i[de],
        Ce = we(Se) ? Se.bind(n, n) : we(Se.get) ? Se.get.bind(n, n) : Ft,
        Ye = !we(Se) && we(Se.set) ? Se.set.bind(n) : Ft,
        tt = xe({
          get: Ce,
          set: Ye,
        });
      Object.defineProperty(r, de, {
        enumerable: !0,
        configurable: !0,
        get: () => tt.value,
        set: (He) => (tt.value = He),
      });
    }
  if (o) for (const de in o) up(o[de], r, n, de);
  if (l) {
    const de = we(l) ? l.call(n) : l;
    Reflect.ownKeys(de).forEach((Se) => {
      Yr(Se, de[Se]);
    });
  }
  c && Cf(c, e, 'c');
  function ae(de, Se) {
    me(Se) ? Se.forEach((Ce) => de(Ce.bind(n))) : Se && de(Se.bind(n));
  }
  if ((ae(mv, f), ae(on, h), ae(gv, m), ae(vv, g), ae(rp, d), ae(sp, p), ae(wv, k), ae(yv, N), ae(_v, D), ae(ap, v), ae(fs, S), ae(bv, R), me(M)))
    if (M.length) {
      const de = e.exposed || (e.exposed = {});
      M.forEach((Se) => {
        Object.defineProperty(de, Se, {
          get: () => n[Se],
          set: (Ce) => (n[Se] = Ce),
        });
      });
    } else e.exposed || (e.exposed = {});
  P && e.render === Ft && (e.render = P), ee != null && (e.inheritAttrs = ee), Q && (e.components = Q), te && (e.directives = te);
}
function Cv(e, t, n = Ft) {
  me(e) && (e = Ol(e));
  for (const r in e) {
    const s = e[r];
    let i;
    ze(s) ? ('default' in s ? (i = wt(s.from || r, s.default, !0)) : (i = wt(s.from || r))) : (i = wt(s)),
      We(i)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (a) => (i.value = a),
          })
        : (t[r] = i);
  }
}
function Cf(e, t, n) {
  Lt(me(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function up(e, t, n, r) {
  const s = r.includes('.') ? Z1(n, r) : () => n[r];
  if (Ue(e)) {
    const i = t[e];
    we(i) && Ze(s, i);
  } else if (we(e)) Ze(s, e.bind(n));
  else if (ze(e))
    if (me(e)) e.forEach((i) => up(i, t, n, r));
    else {
      const i = we(e.handler) ? e.handler.bind(n) : t[e.handler];
      we(i) && Ze(s, i, e);
    }
}
function Kc(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: s,
      optionsCache: i,
      config: { optionMergeStrategies: a },
    } = e.appContext,
    o = i.get(t);
  let l;
  return o ? (l = o) : !s.length && !n && !r ? (l = t) : ((l = {}), s.length && s.forEach((u) => xa(l, u, a, !0)), xa(l, t, a)), ze(t) && i.set(t, l), l;
}
function xa(e, t, n, r = !1) {
  const { mixins: s, extends: i } = t;
  i && xa(e, i, n, !0), s && s.forEach((a) => xa(e, a, n, !0));
  for (const a in t)
    if (!(r && a === 'expose')) {
      const o = Tv[a] || (n && n[a]);
      e[a] = o ? o(e[a], t[a]) : t[a];
    }
  return e;
}
const Tv = {
  data: Tf,
  props: kf,
  emits: kf,
  methods: $s,
  computed: $s,
  beforeCreate: ot,
  created: ot,
  beforeMount: ot,
  mounted: ot,
  beforeUpdate: ot,
  updated: ot,
  beforeDestroy: ot,
  beforeUnmount: ot,
  destroyed: ot,
  unmounted: ot,
  activated: ot,
  deactivated: ot,
  errorCaptured: ot,
  serverPrefetch: ot,
  components: $s,
  directives: $s,
  watch: $v,
  provide: Tf,
  inject: kv,
};
function Tf(e, t) {
  return t
    ? e
      ? function () {
          return Ge(we(e) ? e.call(this, this) : e, we(t) ? t.call(this, this) : t);
        }
      : t
    : e;
}
function kv(e, t) {
  return $s(Ol(e), Ol(t));
}
function Ol(e) {
  if (me(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ot(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function $s(e, t) {
  return e ? Ge(Object.create(null), e, t) : t;
}
function kf(e, t) {
  return e ? (me(e) && me(t) ? [...new Set([...e, ...t])] : Ge(Object.create(null), Af(e), Af(t ?? {}))) : t;
}
function $v(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Ge(Object.create(null), e);
  for (const r in t) n[r] = ot(e[r], t[r]);
  return n;
}
function fp() {
  return {
    app: null,
    config: {
      isNativeTag: X0,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Ov = 0;
function Lv(e, t) {
  return function (r, s = null) {
    we(r) || (r = Ge({}, r)), s != null && !ze(s) && (s = null);
    const i = fp(),
      a = new Set();
    let o = !1;
    const l = (i.app = {
      _uid: Ov++,
      _component: r,
      _props: s,
      _container: null,
      _context: i,
      _instance: null,
      version: r4,
      get config() {
        return i.config;
      },
      set config(u) {},
      use(u, ...c) {
        return a.has(u) || (u && we(u.install) ? (a.add(u), u.install(l, ...c)) : we(u) && (a.add(u), u(l, ...c))), l;
      },
      mixin(u) {
        return i.mixins.includes(u) || i.mixins.push(u), l;
      },
      component(u, c) {
        return c ? ((i.components[u] = c), l) : i.components[u];
      },
      directive(u, c) {
        return c ? ((i.directives[u] = c), l) : i.directives[u];
      },
      mount(u, c, f) {
        if (!o) {
          const h = F(r, s);
          return (h.appContext = i), c && t ? t(h, u) : e(h, u, f), (o = !0), (l._container = u), (u.__vue_app__ = l), ao(h.component) || h.component.proxy;
        }
      },
      unmount() {
        o && (e(null, l._container), delete l._container.__vue_app__);
      },
      provide(u, c) {
        return (i.provides[u] = c), l;
      },
      runWithContext(u) {
        ni = l;
        try {
          return u();
        } finally {
          ni = null;
        }
      },
    });
    return l;
  };
}
let ni = null;
function Yr(e, t) {
  if (Xe) {
    let n = Xe.provides;
    const r = Xe.parent && Xe.parent.provides;
    r === n && (n = Xe.provides = Object.create(r)), (n[e] = t);
  }
}
function wt(e, t, n = !1) {
  const r = Xe || Je;
  if (r || ni) {
    const s = r ? (r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides) : ni._context.provides;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && we(t) ? t.call(r && r.proxy) : t;
  }
}
function Pv() {
  return !!(Xe || Je || ni);
}
function Iv(e, t, n, r = !1) {
  const s = {},
    i = {};
  _a(i, so, 1), (e.propsDefaults = Object.create(null)), dp(e, t, s, i);
  for (const a in e.propsOptions[0]) a in s || (s[a] = void 0);
  n ? (e.props = r ? s : Dc(s)) : e.type.props ? (e.props = s) : (e.props = i), (e.attrs = i);
}
function Mv(e, t, n, r) {
  const {
      props: s,
      attrs: i,
      vnode: { patchFlag: a },
    } = e,
    o = $e(s),
    [l] = e.propsOptions;
  let u = !1;
  if ((r || a > 0) && !(a & 16)) {
    if (a & 8) {
      const c = e.vnode.dynamicProps;
      for (let f = 0; f < c.length; f++) {
        let h = c[f];
        if (Xa(e.emitsOptions, h)) continue;
        const m = t[h];
        if (l)
          if (Oe(i, h)) m !== i[h] && ((i[h] = m), (u = !0));
          else {
            const g = rn(h);
            s[g] = Ll(l, o, g, m, e, !1);
          }
        else m !== i[h] && ((i[h] = m), (u = !0));
      }
    }
  } else {
    dp(e, t, s, i) && (u = !0);
    let c;
    for (const f in o) (!t || (!Oe(t, f) && ((c = Sr(f)) === f || !Oe(t, c)))) && (l ? n && (n[f] !== void 0 || n[c] !== void 0) && (s[f] = Ll(l, o, f, void 0, e, !0)) : delete s[f]);
    if (i !== o) for (const f in i) (!t || !Oe(t, f)) && (delete i[f], (u = !0));
  }
  u && gn(e, 'set', '$attrs');
}
function dp(e, t, n, r) {
  const [s, i] = e.propsOptions;
  let a = !1,
    o;
  if (t)
    for (let l in t) {
      if (aa(l)) continue;
      const u = t[l];
      let c;
      s && Oe(s, (c = rn(l))) ? (!i || !i.includes(c) ? (n[c] = u) : ((o || (o = {}))[c] = u)) : Xa(e.emitsOptions, l) || ((!(l in r) || u !== r[l]) && ((r[l] = u), (a = !0)));
    }
  if (i) {
    const l = $e(n),
      u = o || Fe;
    for (let c = 0; c < i.length; c++) {
      const f = i[c];
      n[f] = Ll(s, l, f, u[f], e, !Oe(u, f));
    }
  }
  return a;
}
function Ll(e, t, n, r, s, i) {
  const a = e[n];
  if (a != null) {
    const o = Oe(a, 'default');
    if (o && r === void 0) {
      const l = a.default;
      if (a.type !== Function && !a.skipFactory && we(l)) {
        const { propsDefaults: u } = s;
        n in u ? (r = u[n]) : (Jr(s), (r = u[n] = l.call(null, t)), mr());
      } else r = l;
    }
    a[0] && (i && !o ? (r = !1) : a[1] && (r === '' || r === Sr(n)) && (r = !0));
  }
  return r;
}
function hp(e, t, n = !1) {
  const r = t.propsCache,
    s = r.get(e);
  if (s) return s;
  const i = e.props,
    a = {},
    o = [];
  let l = !1;
  if (!we(e)) {
    const c = (f) => {
      l = !0;
      const [h, m] = hp(f, t, !0);
      Ge(a, h), m && o.push(...m);
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!i && !l) return ze(e) && r.set(e, qr), qr;
  if (me(i))
    for (let c = 0; c < i.length; c++) {
      const f = rn(i[c]);
      $f(f) && (a[f] = Fe);
    }
  else if (i)
    for (const c in i) {
      const f = rn(c);
      if ($f(f)) {
        const h = i[c],
          m = (a[f] =
            me(h) || we(h)
              ? {
                  type: h,
                }
              : Ge({}, h));
        if (m) {
          const g = Pf(Boolean, m.type),
            d = Pf(String, m.type);
          (m[0] = g > -1), (m[1] = d < 0 || g < d), (g > -1 || Oe(m, 'default')) && o.push(f);
        }
      }
    }
  const u = [a, o];
  return ze(e) && r.set(e, u), u;
}
function $f(e) {
  return e[0] !== '$';
}
function Of(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? 'null' : '';
}
function Lf(e, t) {
  return Of(e) === Of(t);
}
function Pf(e, t) {
  return me(t) ? t.findIndex((n) => Lf(n, e)) : we(t) && Lf(t, e) ? 0 : -1;
}
const pp = (e) => e[0] === '_' || e === '$stable',
  Gc = (e) => (me(e) ? e.map(Yt) : [Yt(e)]),
  Nv = (e, t, n) => {
    if (t._n) return t;
    const r = ve((...s) => Gc(t(...s)), n);
    return (r._c = !1), r;
  },
  mp = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
      if (pp(s)) continue;
      const i = e[s];
      if (we(i)) t[s] = Nv(s, i, r);
      else if (i != null) {
        const a = Gc(i);
        t[s] = () => a;
      }
    }
  },
  gp = (e, t) => {
    const n = Gc(t);
    e.slots.default = () => n;
  },
  Rv = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = $e(t)), _a(t, '_', n)) : mp(t, (e.slots = {}));
    } else (e.slots = {}), t && gp(e, t);
    _a(e.slots, so, 1);
  },
  Dv = (e, t, n) => {
    const { vnode: r, slots: s } = e;
    let i = !0,
      a = Fe;
    if (r.shapeFlag & 32) {
      const o = t._;
      o ? (n && o === 1 ? (i = !1) : (Ge(s, t), !n && o === 1 && delete s._)) : ((i = !t.$stable), mp(t, s)), (a = t);
    } else
      t &&
        (gp(e, t),
        (a = {
          default: 1,
        }));
    if (i) for (const o in s) !pp(o) && !(o in a) && delete s[o];
  };
function Pl(e, t, n, r, s = !1) {
  if (me(e)) {
    e.forEach((h, m) => Pl(h, t && (me(t) ? t[m] : t), n, r, s));
    return;
  }
  if (Is(r) && !s) return;
  const i = r.shapeFlag & 4 ? ao(r.component) || r.component.proxy : r.el,
    a = s ? null : i,
    { i: o, r: l } = e,
    u = t && t.r,
    c = o.refs === Fe ? (o.refs = {}) : o.refs,
    f = o.setupState;
  if ((u != null && u !== l && (Ue(u) ? ((c[u] = null), Oe(f, u) && (f[u] = null)) : We(u) && (u.value = null)), we(l))) Dn(l, o, 12, [a, c]);
  else {
    const h = Ue(l),
      m = We(l);
    if (h || m) {
      const g = () => {
        if (e.f) {
          const d = h ? (Oe(f, l) ? f[l] : c[l]) : l.value;
          s ? me(d) && Oc(d, i) : me(d) ? d.includes(i) || d.push(i) : h ? ((c[l] = [i]), Oe(f, l) && (f[l] = c[l])) : ((l.value = [i]), e.k && (c[e.k] = l.value));
        } else h ? ((c[l] = a), Oe(f, l) && (f[l] = a)) : m && ((l.value = a), e.k && (c[e.k] = a));
      };
      a ? ((g.id = -1), pt(g, n)) : g();
    }
  }
}
const pt = ov;
function zv(e) {
  return Hv(e);
}
function Hv(e, t) {
  const n = wl();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: s,
      patchProp: i,
      createElement: a,
      createText: o,
      createComment: l,
      setText: u,
      setElementText: c,
      parentNode: f,
      nextSibling: h,
      setScopeId: m = Ft,
      insertStaticContent: g,
    } = e,
    d = (b, y, x, L = null, $ = null, z = null, j = !1, H = null, X = !!y.dynamicChildren) => {
      if (b === y) return;
      b && !or(b, y) && ((L = A(b)), He(b, $, z, !0), (b = null)), y.patchFlag === -2 && ((X = !1), (y.dynamicChildren = null));
      const { type: V, ref: se, shapeFlag: K } = y;
      switch (V) {
        case ro:
          p(b, y, x, L);
          break;
        case Pt:
          _(b, y, x, L);
          break;
        case ca:
          b == null && v(y, x, L, j);
          break;
        case Ke:
          Q(b, y, x, L, $, z, j, H, X);
          break;
        default:
          K & 1 ? P(b, y, x, L, $, z, j, H, X) : K & 6 ? te(b, y, x, L, $, z, j, H, X) : (K & 64 || K & 128) && V.process(b, y, x, L, $, z, j, H, X, T);
      }
      se != null && $ && Pl(se, b && b.ref, z, y || b, !y);
    },
    p = (b, y, x, L) => {
      if (b == null) r((y.el = o(y.children)), x, L);
      else {
        const $ = (y.el = b.el);
        y.children !== b.children && u($, y.children);
      }
    },
    _ = (b, y, x, L) => {
      b == null ? r((y.el = l(y.children || '')), x, L) : (y.el = b.el);
    },
    v = (b, y, x, L) => {
      [b.el, b.anchor] = g(b.children, y, x, L, b.el, b.anchor);
    },
    C = ({ el: b, anchor: y }, x, L) => {
      let $;
      for (; b && b !== y; ) ($ = h(b)), r(b, x, L), (b = $);
      r(y, x, L);
    },
    S = ({ el: b, anchor: y }) => {
      let x;
      for (; b && b !== y; ) (x = h(b)), s(b), (b = x);
      s(y);
    },
    P = (b, y, x, L, $, z, j, H, X) => {
      (j = j || y.type === 'svg'), b == null ? N(y, x, L, $, z, j, H, X) : R(b, y, $, z, j, H, X);
    },
    N = (b, y, x, L, $, z, j, H) => {
      let X, V;
      const { type: se, props: K, shapeFlag: re, transition: Z, dirs: he } = b;
      if (
        ((X = b.el = a(b.type, z, K && K.is, K)),
        re & 8 ? c(X, b.children) : re & 16 && k(b.children, X, null, L, $, z && se !== 'foreignObject', j, H),
        he && er(b, null, L, 'created'),
        D(X, b, b.scopeId, j, L),
        K)
      ) {
        for (const Ee in K) Ee !== 'value' && !aa(Ee) && i(X, Ee, null, K[Ee], z, b.children, L, $, ne);
        'value' in K && i(X, 'value', null, K.value), (V = K.onVnodeBeforeMount) && Kt(V, L, b);
      }
      he && er(b, null, L, 'beforeMount');
      const ge = (!$ || ($ && !$.pendingBranch)) && Z && !Z.persisted;
      ge && Z.beforeEnter(X),
        r(X, y, x),
        ((V = K && K.onVnodeMounted) || ge || he) &&
          pt(() => {
            V && Kt(V, L, b), ge && Z.enter(X), he && er(b, null, L, 'mounted');
          }, $);
    },
    D = (b, y, x, L, $) => {
      if ((x && m(b, x), L)) for (let z = 0; z < L.length; z++) m(b, L[z]);
      if ($) {
        let z = $.subTree;
        if (y === z) {
          const j = $.vnode;
          D(b, j, j.scopeId, j.slotScopeIds, $.parent);
        }
      }
    },
    k = (b, y, x, L, $, z, j, H, X = 0) => {
      for (let V = X; V < b.length; V++) {
        const se = (b[V] = H ? Pn(b[V]) : Yt(b[V]));
        d(null, se, y, x, L, $, z, j, H);
      }
    },
    R = (b, y, x, L, $, z, j) => {
      const H = (y.el = b.el);
      let { patchFlag: X, dynamicChildren: V, dirs: se } = y;
      X |= b.patchFlag & 16;
      const K = b.props || Fe,
        re = y.props || Fe;
      let Z;
      x && tr(x, !1), (Z = re.onVnodeBeforeUpdate) && Kt(Z, x, y, b), se && er(y, b, x, 'beforeUpdate'), x && tr(x, !0);
      const he = $ && y.type !== 'foreignObject';
      if ((V ? M(b.dynamicChildren, V, H, x, L, he, z) : j || Se(b, y, H, null, x, L, he, z, !1), X > 0)) {
        if (X & 16) ee(H, y, K, re, x, L, $);
        else if ((X & 2 && K.class !== re.class && i(H, 'class', null, re.class, $), X & 4 && i(H, 'style', K.style, re.style, $), X & 8)) {
          const ge = y.dynamicProps;
          for (let Ee = 0; Ee < ge.length; Ee++) {
            const Me = ge[Ee],
              nt = K[Me],
              Te = re[Me];
            (Te !== nt || Me === 'value') && i(H, Me, nt, Te, $, b.children, x, L, ne);
          }
        }
        X & 1 && b.children !== y.children && c(H, y.children);
      } else !j && V == null && ee(H, y, K, re, x, L, $);
      ((Z = re.onVnodeUpdated) || se) &&
        pt(() => {
          Z && Kt(Z, x, y, b), se && er(y, b, x, 'updated');
        }, L);
    },
    M = (b, y, x, L, $, z, j) => {
      for (let H = 0; H < y.length; H++) {
        const X = b[H],
          V = y[H],
          se = X.el && (X.type === Ke || !or(X, V) || X.shapeFlag & 70) ? f(X.el) : x;
        d(X, V, se, null, L, $, z, j, !0);
      }
    },
    ee = (b, y, x, L, $, z, j) => {
      if (x !== L) {
        if (x !== Fe) for (const H in x) !aa(H) && !(H in L) && i(b, H, x[H], null, j, y.children, $, z, ne);
        for (const H in L) {
          if (aa(H)) continue;
          const X = L[H],
            V = x[H];
          X !== V && H !== 'value' && i(b, H, V, X, j, y.children, $, z, ne);
        }
        'value' in L && i(b, 'value', x.value, L.value);
      }
    },
    Q = (b, y, x, L, $, z, j, H, X) => {
      const V = (y.el = b ? b.el : o('')),
        se = (y.anchor = b ? b.anchor : o(''));
      let { patchFlag: K, dynamicChildren: re, slotScopeIds: Z } = y;
      Z && (H = H ? H.concat(Z) : Z),
        b == null
          ? (r(V, x, L), r(se, x, L), k(y.children, x, se, $, z, j, H, X))
          : K > 0 && K & 64 && re && b.dynamicChildren
            ? (M(b.dynamicChildren, re, x, $, z, j, H), (y.key != null || ($ && y === $.subTree)) && Yc(b, y, !0))
            : Se(b, y, x, se, $, z, j, H, X);
    },
    te = (b, y, x, L, $, z, j, H, X) => {
      (y.slotScopeIds = H), b == null ? (y.shapeFlag & 512 ? $.ctx.activate(y, x, L, j, X) : fe(y, x, L, $, z, j, X)) : ye(b, y, X);
    },
    fe = (b, y, x, L, $, z, j) => {
      const H = (b.component = Gv(b, L, $));
      if ((eo(b) && (H.ctx.renderer = T), Yv(H), H.asyncDep)) {
        if (($ && $.registerDep(H, ae), !b.el)) {
          const X = (H.subTree = F(Pt));
          _(null, X, y, x);
        }
        return;
      }
      ae(H, b, y, x, $, z, j);
    },
    ye = (b, y, x) => {
      const L = (y.component = b.component);
      if (sv(b, y, x))
        if (L.asyncDep && !L.asyncResolved) {
          de(L, y, x);
          return;
        } else (L.next = y), Q3(L.update), L.update();
      else (y.el = b.el), (L.vnode = y);
    },
    ae = (b, y, x, L, $, z, j) => {
      const H = () => {
          if (b.isMounted) {
            let { next: se, bu: K, u: re, parent: Z, vnode: he } = b,
              ge = se,
              Ee;
            tr(b, !1), se ? ((se.el = he.el), de(b, se, j)) : (se = he), K && la(K), (Ee = se.props && se.props.onVnodeBeforeUpdate) && Kt(Ee, Z, se, he), tr(b, !0);
            const Me = $o(b),
              nt = b.subTree;
            (b.subTree = Me),
              d(nt, Me, f(nt.el), A(nt), b, $, z),
              (se.el = Me.el),
              ge === null && iv(b, Me.el),
              re && pt(re, $),
              (Ee = se.props && se.props.onVnodeUpdated) && pt(() => Kt(Ee, Z, se, he), $);
          } else {
            let se;
            const { el: K, props: re } = y,
              { bm: Z, m: he, parent: ge } = b,
              Ee = Is(y);
            if ((tr(b, !1), Z && la(Z), !Ee && (se = re && re.onVnodeBeforeMount) && Kt(se, ge, y), tr(b, !0), K && J)) {
              const Me = () => {
                (b.subTree = $o(b)), J(K, b.subTree, b, $, null);
              };
              Ee ? y.type.__asyncLoader().then(() => !b.isUnmounted && Me()) : Me();
            } else {
              const Me = (b.subTree = $o(b));
              d(null, Me, x, L, b, $, z), (y.el = Me.el);
            }
            if ((he && pt(he, $), !Ee && (se = re && re.onVnodeMounted))) {
              const Me = y;
              pt(() => Kt(se, ge, Me), $);
            }
            (y.shapeFlag & 256 || (ge && Is(ge.vnode) && ge.vnode.shapeFlag & 256)) && b.a && pt(b.a, $), (b.isMounted = !0), (y = x = L = null);
          }
        },
        X = (b.effect = new Nc(H, () => jc(V), b.scope)),
        V = (b.update = () => X.run());
      (V.id = b.uid), tr(b, !0), V();
    },
    de = (b, y, x) => {
      y.component = b;
      const L = b.vnode.props;
      (b.vnode = y), (b.next = null), Mv(b, y.props, L, x), Dv(b, y.children, x), cs(), yf(), us();
    },
    Se = (b, y, x, L, $, z, j, H, X = !1) => {
      const V = b && b.children,
        se = b ? b.shapeFlag : 0,
        K = y.children,
        { patchFlag: re, shapeFlag: Z } = y;
      if (re > 0) {
        if (re & 128) {
          Ye(V, K, x, L, $, z, j, H, X);
          return;
        } else if (re & 256) {
          Ce(V, K, x, L, $, z, j, H, X);
          return;
        }
      }
      Z & 8 ? (se & 16 && ne(V, $, z), K !== V && c(x, K)) : se & 16 ? (Z & 16 ? Ye(V, K, x, L, $, z, j, H, X) : ne(V, $, z, !0)) : (se & 8 && c(x, ''), Z & 16 && k(K, x, L, $, z, j, H, X));
    },
    Ce = (b, y, x, L, $, z, j, H, X) => {
      (b = b || qr), (y = y || qr);
      const V = b.length,
        se = y.length,
        K = Math.min(V, se);
      let re;
      for (re = 0; re < K; re++) {
        const Z = (y[re] = X ? Pn(y[re]) : Yt(y[re]));
        d(b[re], Z, x, null, $, z, j, H, X);
      }
      V > se ? ne(b, $, z, !0, !1, K) : k(y, x, L, $, z, j, H, X, K);
    },
    Ye = (b, y, x, L, $, z, j, H, X) => {
      let V = 0;
      const se = y.length;
      let K = b.length - 1,
        re = se - 1;
      for (; V <= K && V <= re; ) {
        const Z = b[V],
          he = (y[V] = X ? Pn(y[V]) : Yt(y[V]));
        if (or(Z, he)) d(Z, he, x, null, $, z, j, H, X);
        else break;
        V++;
      }
      for (; V <= K && V <= re; ) {
        const Z = b[K],
          he = (y[re] = X ? Pn(y[re]) : Yt(y[re]));
        if (or(Z, he)) d(Z, he, x, null, $, z, j, H, X);
        else break;
        K--, re--;
      }
      if (V > K) {
        if (V <= re) {
          const Z = re + 1,
            he = Z < se ? y[Z].el : L;
          for (; V <= re; ) d(null, (y[V] = X ? Pn(y[V]) : Yt(y[V])), x, he, $, z, j, H, X), V++;
        }
      } else if (V > re) for (; V <= K; ) He(b[V], $, z, !0), V++;
      else {
        const Z = V,
          he = V,
          ge = new Map();
        for (V = he; V <= re; V++) {
          const at = (y[V] = X ? Pn(y[V]) : Yt(y[V]));
          at.key != null && ge.set(at.key, V);
        }
        let Ee,
          Me = 0;
        const nt = re - he + 1;
        let Te = !1,
          Le = 0;
        const Sn = new Array(nt);
        for (V = 0; V < nt; V++) Sn[V] = 0;
        for (V = Z; V <= K; V++) {
          const at = b[V];
          if (Me >= nt) {
            He(at, $, z, !0);
            continue;
          }
          let dt;
          if (at.key != null) dt = ge.get(at.key);
          else
            for (Ee = he; Ee <= re; Ee++)
              if (Sn[Ee - he] === 0 && or(at, y[Ee])) {
                dt = Ee;
                break;
              }
          dt === void 0 ? He(at, $, z, !0) : ((Sn[dt - he] = V + 1), dt >= Le ? (Le = dt) : (Te = !0), d(at, y[dt], x, null, $, z, j, H, X), Me++);
        }
        const Ct = Te ? Vv(Sn) : qr;
        for (Ee = Ct.length - 1, V = nt - 1; V >= 0; V--) {
          const at = he + V,
            dt = y[at],
            Hu = at + 1 < se ? y[at + 1].el : L;
          Sn[V] === 0 ? d(null, dt, x, Hu, $, z, j, H, X) : Te && (Ee < 0 || V !== Ct[Ee] ? tt(dt, x, Hu, 2) : Ee--);
        }
      }
    },
    tt = (b, y, x, L, $ = null) => {
      const { el: z, type: j, transition: H, children: X, shapeFlag: V } = b;
      if (V & 6) {
        tt(b.component.subTree, y, x, L);
        return;
      }
      if (V & 128) {
        b.suspense.move(y, x, L);
        return;
      }
      if (V & 64) {
        j.move(b, y, x, T);
        return;
      }
      if (j === Ke) {
        r(z, y, x);
        for (let K = 0; K < X.length; K++) tt(X[K], y, x, L);
        r(b.anchor, y, x);
        return;
      }
      if (j === ca) {
        C(b, y, x);
        return;
      }
      if (L !== 2 && V & 1 && H)
        if (L === 0) H.beforeEnter(z), r(z, y, x), pt(() => H.enter(z), $);
        else {
          const { leave: K, delayLeave: re, afterLeave: Z } = H,
            he = () => r(z, y, x),
            ge = () => {
              K(z, () => {
                he(), Z && Z();
              });
            };
          re ? re(z, he, ge) : ge();
        }
      else r(z, y, x);
    },
    He = (b, y, x, L = !1, $ = !1) => {
      const { type: z, props: j, ref: H, children: X, dynamicChildren: V, shapeFlag: se, patchFlag: K, dirs: re } = b;
      if ((H != null && Pl(H, null, x, b, !0), se & 256)) {
        y.ctx.deactivate(b);
        return;
      }
      const Z = se & 1 && re,
        he = !Is(b);
      let ge;
      if ((he && (ge = j && j.onVnodeBeforeUnmount) && Kt(ge, y, b), se & 6)) q(b.component, x, L);
      else {
        if (se & 128) {
          b.suspense.unmount(x, L);
          return;
        }
        Z && er(b, null, y, 'beforeUnmount'),
          se & 64 ? b.type.remove(b, y, x, $, T, L) : V && (z !== Ke || (K > 0 && K & 64)) ? ne(V, y, x, !1, !0) : ((z === Ke && K & 384) || (!$ && se & 16)) && ne(X, y, x),
          L && W(b);
      }
      ((he && (ge = j && j.onVnodeUnmounted)) || Z) &&
        pt(() => {
          ge && Kt(ge, y, b), Z && er(b, null, y, 'unmounted');
        }, x);
    },
    W = (b) => {
      const { type: y, el: x, anchor: L, transition: $ } = b;
      if (y === Ke) {
        O(x, L);
        return;
      }
      if (y === ca) {
        S(b);
        return;
      }
      const z = () => {
        s(x), $ && !$.persisted && $.afterLeave && $.afterLeave();
      };
      if (b.shapeFlag & 1 && $ && !$.persisted) {
        const { leave: j, delayLeave: H } = $,
          X = () => j(x, z);
        H ? H(b.el, z, X) : X();
      } else z();
    },
    O = (b, y) => {
      let x;
      for (; b !== y; ) (x = h(b)), s(b), (b = x);
      s(y);
    },
    q = (b, y, x) => {
      const { bum: L, scope: $, update: z, subTree: j, um: H } = b;
      L && la(L),
        $.stop(),
        z && ((z.active = !1), He(j, b, y, x)),
        H && pt(H, y),
        pt(() => {
          b.isUnmounted = !0;
        }, y),
        y && y.pendingBranch && !y.isUnmounted && b.asyncDep && !b.asyncResolved && b.suspenseId === y.pendingId && (y.deps--, y.deps === 0 && y.resolve());
    },
    ne = (b, y, x, L = !1, $ = !1, z = 0) => {
      for (let j = z; j < b.length; j++) He(b[j], y, x, L, $);
    },
    A = (b) => (b.shapeFlag & 6 ? A(b.component.subTree) : b.shapeFlag & 128 ? b.suspense.next() : h(b.anchor || b.el)),
    I = (b, y, x) => {
      b == null ? y._vnode && He(y._vnode, null, null, !0) : d(y._vnode || null, b, y, null, null, null, x), yf(), X1(), (y._vnode = b);
    },
    T = {
      p: d,
      um: He,
      m: tt,
      r: W,
      mt: fe,
      mc: k,
      pc: Se,
      pbc: M,
      n: A,
      o: e,
    };
  let B, J;
  return (
    t && ([B, J] = t(T)),
    {
      render: I,
      hydrate: B,
      createApp: Lv(I, B),
    }
  );
}
function tr({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Yc(e, t, n = !1) {
  const r = e.children,
    s = t.children;
  if (me(r) && me(s))
    for (let i = 0; i < r.length; i++) {
      const a = r[i];
      let o = s[i];
      o.shapeFlag & 1 && !o.dynamicChildren && ((o.patchFlag <= 0 || o.patchFlag === 32) && ((o = s[i] = Pn(s[i])), (o.el = a.el)), n || Yc(a, o)), o.type === ro && (o.el = a.el);
    }
}
function Vv(e) {
  const t = e.slice(),
    n = [0];
  let r, s, i, a, o;
  const l = e.length;
  for (r = 0; r < l; r++) {
    const u = e[r];
    if (u !== 0) {
      if (((s = n[n.length - 1]), e[s] < u)) {
        (t[r] = s), n.push(r);
        continue;
      }
      for (i = 0, a = n.length - 1; i < a; ) (o = (i + a) >> 1), e[n[o]] < u ? (i = o + 1) : (a = o);
      u < e[n[i]] && (i > 0 && (t[r] = n[i - 1]), (n[i] = r));
    }
  }
  for (i = n.length, a = n[i - 1]; i-- > 0; ) (n[i] = a), (a = t[a]);
  return n;
}
const Fv = (e) => e.__isTeleport,
  Ns = (e) => e && (e.disabled || e.disabled === ''),
  If = (e) => typeof SVGElement < 'u' && e instanceof SVGElement,
  Il = (e, t) => {
    const n = e && e.to;
    return Ue(n) ? (t ? t(n) : null) : n;
  },
  Bv = {
    __isTeleport: !0,
    process(e, t, n, r, s, i, a, o, l, u) {
      const {
          mc: c,
          pc: f,
          pbc: h,
          o: { insert: m, querySelector: g, createText: d, createComment: p },
        } = u,
        _ = Ns(t.props);
      let { shapeFlag: v, children: C, dynamicChildren: S } = t;
      if (e == null) {
        const P = (t.el = d('')),
          N = (t.anchor = d(''));
        m(P, n, r), m(N, n, r);
        const D = (t.target = Il(t.props, g)),
          k = (t.targetAnchor = d(''));
        D && (m(k, D), (a = a || If(D)));
        const R = (M, ee) => {
          v & 16 && c(C, M, ee, s, i, a, o, l);
        };
        _ ? R(n, N) : D && R(D, k);
      } else {
        t.el = e.el;
        const P = (t.anchor = e.anchor),
          N = (t.target = e.target),
          D = (t.targetAnchor = e.targetAnchor),
          k = Ns(e.props),
          R = k ? n : N,
          M = k ? P : D;
        if (((a = a || If(N)), S ? (h(e.dynamicChildren, S, R, s, i, a, o), Yc(e, t, !0)) : l || f(e, t, R, M, s, i, a, o, !1), _)) k || qi(t, n, P, u, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const ee = (t.target = Il(t.props, g));
          ee && qi(t, ee, null, u, 0);
        } else k && qi(t, N, D, u, 1);
      }
      bp(t);
    },
    remove(e, t, n, r, { um: s, o: { remove: i } }, a) {
      const { shapeFlag: o, children: l, anchor: u, targetAnchor: c, target: f, props: h } = e;
      if ((f && i(c), (a || !Ns(h)) && (i(u), o & 16)))
        for (let m = 0; m < l.length; m++) {
          const g = l[m];
          s(g, t, n, !0, !!g.dynamicChildren);
        }
    },
    move: qi,
    hydrate: jv,
  };
function qi(e, t, n, { o: { insert: r }, m: s }, i = 2) {
  i === 0 && r(e.targetAnchor, t, n);
  const { el: a, anchor: o, shapeFlag: l, children: u, props: c } = e,
    f = i === 2;
  if ((f && r(a, t, n), (!f || Ns(c)) && l & 16)) for (let h = 0; h < u.length; h++) s(u[h], t, n, 2);
  f && r(o, t, n);
}
function jv(e, t, n, r, s, i, { o: { nextSibling: a, parentNode: o, querySelector: l } }, u) {
  const c = (t.target = Il(t.props, l));
  if (c) {
    const f = c._lpa || c.firstChild;
    if (t.shapeFlag & 16)
      if (Ns(t.props)) (t.anchor = u(a(e), t, o(e), n, r, s, i)), (t.targetAnchor = f);
      else {
        t.anchor = a(e);
        let h = f;
        for (; h; )
          if (((h = a(h)), h && h.nodeType === 8 && h.data === 'teleport anchor')) {
            (t.targetAnchor = h), (c._lpa = t.targetAnchor && a(t.targetAnchor));
            break;
          }
        u(f, t, c, n, r, s, i);
      }
    bp(t);
  }
  return t.anchor && a(t.anchor);
}
const vp = Bv;
function bp(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n !== e.targetAnchor; ) n.nodeType === 1 && n.setAttribute('data-v-owner', t.uid), (n = n.nextSibling);
    t.ut();
  }
}
const Ke = Symbol.for('v-fgt'),
  ro = Symbol.for('v-txt'),
  Pt = Symbol.for('v-cmt'),
  ca = Symbol.for('v-stc'),
  Rs = [];
let Vt = null;
function be(e = !1) {
  Rs.push((Vt = e ? null : []));
}
function Wv() {
  Rs.pop(), (Vt = Rs[Rs.length - 1] || null);
}
let ri = 1;
function Mf(e) {
  ri += e;
}
function _p(e) {
  return (e.dynamicChildren = ri > 0 ? Vt || qr : null), Wv(), ri > 0 && Vt && Vt.push(e), e;
}
function ke(e, t, n, r, s, i) {
  return _p(w(e, t, n, r, s, i, !0));
}
function sn(e, t, n, r, s) {
  return _p(F(e, t, n, r, s, !0));
}
function Sa(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function or(e, t) {
  return e.type === t.type && e.key === t.key;
}
const so = '__vInternal',
  yp = ({ key: e }) => e ?? null,
  ua = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == 'number' && (e = '' + e),
    e != null
      ? Ue(e) || We(e) || we(e)
        ? {
            i: Je,
            r: e,
            k: t,
            f: !!n,
          }
        : e
      : null
  );
function w(e, t = null, n = null, r = 0, s = null, i = e === Ke ? 0 : 1, a = !1, o = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && yp(t),
    ref: t && ua(t),
    scopeId: Qa,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: Je,
  };
  return o ? (Xc(l, n), i & 128 && e.normalize(l)) : n && (l.shapeFlag |= Ue(n) ? 8 : 16), ri > 0 && !a && Vt && (l.patchFlag > 0 || i & 6) && l.patchFlag !== 32 && Vt.push(l), l;
}
const F = Uv;
function Uv(e, t = null, n = null, r = 0, s = null, i = !1) {
  if (((!e || e === op) && (e = Pt), Sa(e))) {
    const o = jn(e, t, !0);
    return n && Xc(o, n), ri > 0 && !i && Vt && (o.shapeFlag & 6 ? (Vt[Vt.indexOf(e)] = o) : Vt.push(o)), (o.patchFlag |= -2), o;
  }
  if ((e4(e) && (e = e.__vccOpts), t)) {
    t = wp(t);
    let { class: o, style: l } = t;
    o && !Ue(o) && (t.class = le(o)), ze(l) && (j1(l) && !me(l) && (l = Ge({}, l)), (t.style = mi(l)));
  }
  const a = Ue(e) ? 1 : av(e) ? 128 : Fv(e) ? 64 : ze(e) ? 4 : we(e) ? 2 : 0;
  return w(e, t, n, r, s, a, i, !0);
}
function wp(e) {
  return e ? (j1(e) || so in e ? Ge({}, e) : e) : null;
}
function jn(e, t, n = !1) {
  const { props: r, ref: s, patchFlag: i, children: a } = e,
    o = t ? io(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: o,
    key: o && yp(o),
    ref: t && t.ref ? (n && s ? (me(s) ? s.concat(ua(t)) : [s, ua(t)]) : ua(t)) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: a,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Ke ? (i === -1 ? 16 : i | 16) : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && jn(e.ssContent),
    ssFallback: e.ssFallback && jn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function _e(e = ' ', t = 0) {
  return F(ro, null, e, t);
}
function yt(e = '', t = !1) {
  return t ? (be(), sn(Pt, null, e)) : F(Pt, null, e);
}
function Yt(e) {
  return e == null || typeof e == 'boolean' ? F(Pt) : me(e) ? F(Ke, null, e.slice()) : typeof e == 'object' ? Pn(e) : F(ro, null, String(e));
}
function Pn(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : jn(e);
}
function Xc(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (me(t)) n = 16;
  else if (typeof t == 'object')
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Xc(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(so in t) ? (t._ctx = Je) : s === 3 && Je && (Je.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    we(t)
      ? ((t = {
          default: t,
          _ctx: Je,
        }),
        (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [_e(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function io(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === 'class') t.class !== r.class && (t.class = le([t.class, r.class]));
      else if (s === 'style') t.style = mi([t.style, r.style]);
      else if (Fa(s)) {
        const i = t[s],
          a = r[s];
        a && i !== a && !(me(i) && i.includes(a)) && (t[s] = i ? [].concat(i, a) : a);
      } else s !== '' && (t[s] = r[s]);
  }
  return t;
}
function Kt(e, t, n, r = null) {
  Lt(e, t, 7, [n, r]);
}
const qv = fp();
let Kv = 0;
function Gv(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || qv,
    i = {
      uid: Kv++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new k1(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: hp(r, s),
      emitsOptions: J1(r, s),
      emit: null,
      emitted: null,
      propsDefaults: Fe,
      inheritAttrs: r.inheritAttrs,
      ctx: Fe,
      data: Fe,
      props: Fe,
      attrs: Fe,
      slots: Fe,
      refs: Fe,
      setupState: Fe,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (i.ctx = {
      _: i,
    }),
    (i.root = t ? t.root : i),
    (i.emit = ev.bind(null, i)),
    e.ce && e.ce(i),
    i
  );
}
let Xe = null;
const _i = () => Xe || Je;
let Qc,
  Pr,
  Nf = '__VUE_INSTANCE_SETTERS__';
(Pr = wl()[Nf]) || (Pr = wl()[Nf] = []),
  Pr.push((e) => (Xe = e)),
  (Qc = (e) => {
    Pr.length > 1 ? Pr.forEach((t) => t(e)) : Pr[0](e);
  });
const Jr = (e) => {
    Qc(e), e.scope.on();
  },
  mr = () => {
    Xe && Xe.scope.off(), Qc(null);
  };
function Ep(e) {
  return e.vnode.shapeFlag & 4;
}
let si = !1;
function Yv(e, t = !1) {
  si = t;
  const { props: n, children: r } = e.vnode,
    s = Ep(e);
  Iv(e, n, s, t), Rv(e, r);
  const i = s ? Xv(e, t) : void 0;
  return (si = !1), i;
}
function Xv(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = gi(new Proxy(e.ctx, Sv)));
  const { setup: r } = n;
  if (r) {
    const s = (e.setupContext = r.length > 1 ? Jv(e) : null);
    Jr(e), cs();
    const i = Dn(r, e, 0, [e.props, s]);
    if ((us(), mr(), x1(i))) {
      if ((i.then(mr, mr), t))
        return i
          .then((a) => {
            Rf(e, a, t);
          })
          .catch((a) => {
            Ya(a, e, 0);
          });
      e.asyncDep = i;
    } else Rf(e, i, t);
  } else xp(e, t);
}
function Rf(e, t, n) {
  we(t) ? (e.type.__ssrInlineRender ? (e.ssrRender = t) : (e.render = t)) : ze(t) && (e.setupState = q1(t)), xp(e, n);
}
let Df;
function xp(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && Df && !r.render) {
      const s = r.template || Kc(e).template;
      if (s) {
        const { isCustomElement: i, compilerOptions: a } = e.appContext.config,
          { delimiters: o, compilerOptions: l } = r,
          u = Ge(
            Ge(
              {
                isCustomElement: i,
                delimiters: o,
              },
              a,
            ),
            l,
          );
        r.render = Df(s, u);
      }
    }
    e.render = r.render || Ft;
  }
  Jr(e), cs(), Av(e), us(), mr();
}
function Qv(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return vt(e, 'get', '$attrs'), t[n];
      },
    }))
  );
}
function Jv(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Qv(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function ao(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(q1(gi(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Ms) return Ms[n](e);
        },
        has(t, n) {
          return n in t || n in Ms;
        },
      }))
    );
}
function Zv(e, t = !0) {
  return we(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function e4(e) {
  return we(e) && '__vccOpts' in e;
}
const xe = (e, t) => G3(e, t, si);
function ds(e, t, n) {
  const r = arguments.length;
  return r === 2 ? (ze(t) && !me(t) ? (Sa(t) ? F(e, null, [t]) : F(e, t)) : F(e, null, t)) : (r > 3 ? (n = Array.prototype.slice.call(arguments, 2)) : r === 3 && Sa(n) && (n = [n]), F(e, t, n));
}
const t4 = Symbol.for('v-scx'),
  n4 = () => wt(t4),
  r4 = '3.3.4',
  s4 = 'http://www.w3.org/2000/svg',
  lr = typeof document < 'u' ? document : null,
  zf = lr && lr.createElement('template'),
  i4 = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const s = t
        ? lr.createElementNS(s4, e)
        : lr.createElement(
            e,
            n
              ? {
                  is: n,
                }
              : void 0,
          );
      return e === 'select' && r && r.multiple != null && s.setAttribute('multiple', r.multiple), s;
    },
    createText: (e) => lr.createTextNode(e),
    createComment: (e) => lr.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => lr.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, '');
    },
    insertStaticContent(e, t, n, r, s, i) {
      const a = n ? n.previousSibling : t.lastChild;
      if (s && (s === i || s.nextSibling)) for (; t.insertBefore(s.cloneNode(!0), n), !(s === i || !(s = s.nextSibling)); );
      else {
        zf.innerHTML = r ? `<svg>${e}</svg>` : e;
        const o = zf.content;
        if (r) {
          const l = o.firstChild;
          for (; l.firstChild; ) o.appendChild(l.firstChild);
          o.removeChild(l);
        }
        t.insertBefore(o, n);
      }
      return [a ? a.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
    },
  };
function a4(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(' ')), t == null ? e.removeAttribute('class') : n ? e.setAttribute('class', t) : (e.className = t);
}
function o4(e, t, n) {
  const r = e.style,
    s = Ue(n);
  if (n && !s) {
    if (t && !Ue(t)) for (const i in t) n[i] == null && Ml(r, i, '');
    for (const i in n) Ml(r, i, n[i]);
  } else {
    const i = r.display;
    s ? t !== n && (r.cssText = n) : t && e.removeAttribute('style'), '_vod' in e && (r.display = i);
  }
}
const Hf = /\s*!important$/;
function Ml(e, t, n) {
  if (me(n)) n.forEach((r) => Ml(e, t, r));
  else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n);
  else {
    const r = l4(e, t);
    Hf.test(n) ? e.setProperty(Sr(r), n.replace(Hf, ''), 'important') : (e[r] = n);
  }
}
const Vf = ['Webkit', 'Moz', 'ms'],
  Po = {};
function l4(e, t) {
  const n = Po[t];
  if (n) return n;
  let r = rn(t);
  if (r !== 'filter' && r in e) return (Po[t] = r);
  r = Wa(r);
  for (let s = 0; s < Vf.length; s++) {
    const i = Vf[s] + r;
    if (i in e) return (Po[t] = i);
  }
  return t;
}
const Ff = 'http://www.w3.org/1999/xlink';
function c4(e, t, n, r, s) {
  if (r && t.startsWith('xlink:')) n == null ? e.removeAttributeNS(Ff, t.slice(6, t.length)) : e.setAttributeNS(Ff, t, n);
  else {
    const i = c3(t);
    n == null || (i && !C1(n)) ? e.removeAttribute(t) : e.setAttribute(t, i ? '' : n);
  }
}
function u4(e, t, n, r, s, i, a) {
  if (t === 'innerHTML' || t === 'textContent') {
    r && a(r, s, i), (e[t] = n ?? '');
    return;
  }
  const o = e.tagName;
  if (t === 'value' && o !== 'PROGRESS' && !o.includes('-')) {
    e._value = n;
    const u = o === 'OPTION' ? e.getAttribute('value') : e.value,
      c = n ?? '';
    u !== c && (e.value = c), n == null && e.removeAttribute(t);
    return;
  }
  let l = !1;
  if (n === '' || n == null) {
    const u = typeof e[t];
    u === 'boolean' ? (n = C1(n)) : n == null && u === 'string' ? ((n = ''), (l = !0)) : u === 'number' && ((n = 0), (l = !0));
  }
  try {
    e[t] = n;
  } catch {}
  l && e.removeAttribute(t);
}
function Rr(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function f4(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function d4(e, t, n, r, s = null) {
  const i = e._vei || (e._vei = {}),
    a = i[t];
  if (r && a) a.value = r;
  else {
    const [o, l] = h4(t);
    if (r) {
      const u = (i[t] = g4(r, s));
      Rr(e, o, u, l);
    } else a && (f4(e, o, a, l), (i[t] = void 0));
  }
}
const Bf = /(?:Once|Passive|Capture)$/;
function h4(e) {
  let t;
  if (Bf.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(Bf)); ) (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ':' ? e.slice(3) : Sr(e.slice(2)), t];
}
let Io = 0;
const p4 = Promise.resolve(),
  m4 = () => Io || (p4.then(() => (Io = 0)), (Io = Date.now()));
function g4(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    Lt(v4(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = m4()), n;
}
function v4(e, t) {
  if (me(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (s) => !s._stopped && r && r(s))
    );
  } else return t;
}
const jf = /^on[a-z]/,
  b4 = (e, t, n, r, s = !1, i, a, o, l) => {
    t === 'class'
      ? a4(e, r, s)
      : t === 'style'
        ? o4(e, n, r)
        : Fa(t)
          ? $c(t) || d4(e, t, n, r, a)
          : (t[0] === '.' ? ((t = t.slice(1)), !0) : t[0] === '^' ? ((t = t.slice(1)), !1) : _4(e, t, r, s))
            ? u4(e, t, r, i, a, o, l)
            : (t === 'true-value' ? (e._trueValue = r) : t === 'false-value' && (e._falseValue = r), c4(e, t, r, s));
  };
function _4(e, t, n, r) {
  return r
    ? !!(t === 'innerHTML' || t === 'textContent' || (t in e && jf.test(t) && we(n)))
    : t === 'spellcheck' || t === 'draggable' || t === 'translate' || t === 'form' || (t === 'list' && e.tagName === 'INPUT') || (t === 'type' && e.tagName === 'TEXTAREA') || (jf.test(t) && Ue(n))
      ? !1
      : t in e;
}
function XO(e) {
  const t = _i();
  if (!t) return;
  const n = (t.ut = (s = e(t.proxy)) => {
      Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((i) => Rl(i, s));
    }),
    r = () => {
      const s = e(t.proxy);
      Nl(t.subTree, s), n(s);
    };
  cv(r),
    on(() => {
      const s = new MutationObserver(r);
      s.observe(t.subTree.el.parentNode, {
        childList: !0,
      }),
        fs(() => s.disconnect());
    });
}
function Nl(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    (e = n.activeBranch),
      n.pendingBranch &&
        !n.isHydrating &&
        n.effects.push(() => {
          Nl(n.activeBranch, t);
        });
  }
  for (; e.component; ) e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el) Rl(e.el, t);
  else if (e.type === Ke) e.children.forEach((n) => Nl(n, t));
  else if (e.type === ca) {
    let { el: n, anchor: r } = e;
    for (; n && (Rl(n, t), n !== r); ) n = n.nextSibling;
  }
}
function Rl(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    for (const r in t) n.setProperty(`--${r}`, t[r]);
  }
}
const Tn = 'transition',
  bs = 'animation',
  Jc = (e, { slots: t }) => ds(hv, y4(e), t);
Jc.displayName = 'Transition';
const Sp = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0,
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
Jc.props = Ge({}, ep, Sp);
const nr = (e, t = []) => {
    me(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  Wf = (e) => (e ? (me(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function y4(e) {
  const t = {};
  for (const Q in e) Q in Sp || (t[Q] = e[Q]);
  if (e.css === !1) return t;
  const {
      name: n = 'v',
      type: r,
      duration: s,
      enterFromClass: i = `${n}-enter-from`,
      enterActiveClass: a = `${n}-enter-active`,
      enterToClass: o = `${n}-enter-to`,
      appearFromClass: l = i,
      appearActiveClass: u = a,
      appearToClass: c = o,
      leaveFromClass: f = `${n}-leave-from`,
      leaveActiveClass: h = `${n}-leave-active`,
      leaveToClass: m = `${n}-leave-to`,
    } = e,
    g = w4(s),
    d = g && g[0],
    p = g && g[1],
    { onBeforeEnter: _, onEnter: v, onEnterCancelled: C, onLeave: S, onLeaveCancelled: P, onBeforeAppear: N = _, onAppear: D = v, onAppearCancelled: k = C } = t,
    R = (Q, te, fe) => {
      rr(Q, te ? c : o), rr(Q, te ? u : a), fe && fe();
    },
    M = (Q, te) => {
      (Q._isLeaving = !1), rr(Q, f), rr(Q, m), rr(Q, h), te && te();
    },
    ee = (Q) => (te, fe) => {
      const ye = Q ? D : v,
        ae = () => R(te, Q, fe);
      nr(ye, [te, ae]),
        Uf(() => {
          rr(te, Q ? l : i), kn(te, Q ? c : o), Wf(ye) || qf(te, r, d, ae);
        });
    };
  return Ge(t, {
    onBeforeEnter(Q) {
      nr(_, [Q]), kn(Q, i), kn(Q, a);
    },
    onBeforeAppear(Q) {
      nr(N, [Q]), kn(Q, l), kn(Q, u);
    },
    onEnter: ee(!1),
    onAppear: ee(!0),
    onLeave(Q, te) {
      Q._isLeaving = !0;
      const fe = () => M(Q, te);
      kn(Q, f),
        S4(),
        kn(Q, h),
        Uf(() => {
          Q._isLeaving && (rr(Q, f), kn(Q, m), Wf(S) || qf(Q, r, p, fe));
        }),
        nr(S, [Q, fe]);
    },
    onEnterCancelled(Q) {
      R(Q, !1), nr(C, [Q]);
    },
    onAppearCancelled(Q) {
      R(Q, !0), nr(k, [Q]);
    },
    onLeaveCancelled(Q) {
      M(Q), nr(P, [Q]);
    },
  });
}
function w4(e) {
  if (e == null) return null;
  if (ze(e)) return [Mo(e.enter), Mo(e.leave)];
  {
    const t = Mo(e);
    return [t, t];
  }
}
function Mo(e) {
  return n3(e);
}
function kn(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e._vtc || (e._vtc = new Set())).add(t);
}
function rr(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function Uf(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let E4 = 0;
function qf(e, t, n, r) {
  const s = (e._endId = ++E4),
    i = () => {
      s === e._endId && r();
    };
  if (n) return setTimeout(i, n);
  const { type: a, timeout: o, propCount: l } = x4(e, t);
  if (!a) return r();
  const u = a + 'end';
  let c = 0;
  const f = () => {
      e.removeEventListener(u, h), i();
    },
    h = (m) => {
      m.target === e && ++c >= l && f();
    };
  setTimeout(() => {
    c < l && f();
  }, o + 1),
    e.addEventListener(u, h);
}
function x4(e, t) {
  const n = window.getComputedStyle(e),
    r = (g) => (n[g] || '').split(', '),
    s = r(`${Tn}Delay`),
    i = r(`${Tn}Duration`),
    a = Kf(s, i),
    o = r(`${bs}Delay`),
    l = r(`${bs}Duration`),
    u = Kf(o, l);
  let c = null,
    f = 0,
    h = 0;
  t === Tn
    ? a > 0 && ((c = Tn), (f = a), (h = i.length))
    : t === bs
      ? u > 0 && ((c = bs), (f = u), (h = l.length))
      : ((f = Math.max(a, u)), (c = f > 0 ? (a > u ? Tn : bs) : null), (h = c ? (c === Tn ? i.length : l.length) : 0));
  const m = c === Tn && /\b(transform|all)(,|$)/.test(r(`${Tn}Property`).toString());
  return {
    type: c,
    timeout: f,
    propCount: h,
    hasTransform: m,
  };
}
function Kf(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, r) => Gf(n) + Gf(e[r])));
}
function Gf(e) {
  return Number(e.slice(0, -1).replace(',', '.')) * 1e3;
}
function S4() {
  return document.body.offsetHeight;
}
const Yf = (e) => {
  const t = e.props['onUpdate:modelValue'] || !1;
  return me(t) ? (n) => la(t, n) : t;
};
function A4(e) {
  e.target.composing = !0;
}
function Xf(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event('input')));
}
const QO = {
    created(e, { modifiers: { lazy: t, trim: n, number: r } }, s) {
      e._assign = Yf(s);
      const i = r || (s.props && s.props.type === 'number');
      Rr(e, t ? 'change' : 'input', (a) => {
        if (a.target.composing) return;
        let o = e.value;
        n && (o = o.trim()), i && (o = yl(o)), e._assign(o);
      }),
        n &&
          Rr(e, 'change', () => {
            e.value = e.value.trim();
          }),
        t || (Rr(e, 'compositionstart', A4), Rr(e, 'compositionend', Xf), Rr(e, 'change', Xf));
    },
    mounted(e, { value: t }) {
      e.value = t ?? '';
    },
    beforeUpdate(e, { value: t, modifiers: { lazy: n, trim: r, number: s } }, i) {
      if (((e._assign = Yf(i)), e.composing || (document.activeElement === e && e.type !== 'range' && (n || (r && e.value.trim() === t) || ((s || e.type === 'number') && yl(e.value) === t))))) return;
      const a = t ?? '';
      e.value !== a && (e.value = a);
    },
  },
  C4 = ['ctrl', 'shift', 'alt', 'meta'],
  T4 = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => 'button' in e && e.button !== 0,
    middle: (e) => 'button' in e && e.button !== 1,
    right: (e) => 'button' in e && e.button !== 2,
    exact: (e, t) => C4.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  Qf =
    (e, t) =>
    (n, ...r) => {
      for (let s = 0; s < t.length; s++) {
        const i = T4[t[s]];
        if (i && i(n, t)) return;
      }
      return e(n, ...r);
    },
  k4 = {
    esc: 'escape',
    space: ' ',
    up: 'arrow-up',
    left: 'arrow-left',
    right: 'arrow-right',
    down: 'arrow-down',
    delete: 'backspace',
  },
  No = (e, t) => (n) => {
    if (!('key' in n)) return;
    const r = Sr(n.key);
    if (t.some((s) => s === r || k4[s] === r)) return e(n);
  },
  Ap = {
    beforeMount(e, { value: t }, { transition: n }) {
      (e._vod = e.style.display === 'none' ? '' : e.style.display), n && t ? n.beforeEnter(e) : _s(e, t);
    },
    mounted(e, { value: t }, { transition: n }) {
      n && t && n.enter(e);
    },
    updated(e, { value: t, oldValue: n }, { transition: r }) {
      !t != !n &&
        (r
          ? t
            ? (r.beforeEnter(e), _s(e, !0), r.enter(e))
            : r.leave(e, () => {
                _s(e, !1);
              })
          : _s(e, t));
    },
    beforeUnmount(e, { value: t }) {
      _s(e, t);
    },
  };
function _s(e, t) {
  e.style.display = t ? e._vod : 'none';
}
const $4 = Ge(
  {
    patchProp: b4,
  },
  i4,
);
let Jf;
function O4() {
  return Jf || (Jf = zv($4));
}
const L4 = (...e) => {
  const t = O4().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (r) => {
      const s = P4(r);
      if (!s) return;
      const i = t._component;
      !we(i) && !i.render && !i.template && (i.template = s.innerHTML), (s.innerHTML = '');
      const a = n(s, !1, s instanceof SVGElement);
      return s instanceof Element && (s.removeAttribute('v-cloak'), s.setAttribute('data-v-app', '')), a;
    }),
    t
  );
};
function P4(e) {
  return Ue(e) ? document.querySelector(e) : e;
}
function Zf(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (s) {
        return Object.getOwnPropertyDescriptor(e, s).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function cn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Zf(Object(n), !0).forEach(function (r) {
          ht(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
        : Zf(Object(n)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return e;
}
function Aa(e) {
  '@babel/helpers - typeof';
  return (
    (Aa =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == 'function' && t.constructor === Symbol && t !== Symbol.prototype ? 'symbol' : typeof t;
          }),
    Aa(e)
  );
}
function ht(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function I4(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    s,
    i;
  for (i = 0; i < r.length; i++) (s = r[i]), !(t.indexOf(s) >= 0) && (n[s] = e[s]);
  return n;
}
function M4(e, t) {
  if (e == null) return {};
  var n = I4(e, t),
    r,
    s;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (s = 0; s < i.length; s++) (r = i[s]), !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
var N4 = typeof globalThis < 'u' ? globalThis : typeof window < 'u' ? window : typeof global < 'u' ? global : typeof self < 'u' ? self : {},
  Cp = {
    exports: {},
  };
(function (e) {
  (function (t) {
    var n = function (_, v, C) {
        if (!u(v) || f(v) || h(v) || m(v) || l(v)) return v;
        var S,
          P = 0,
          N = 0;
        if (c(v)) for (S = [], N = v.length; P < N; P++) S.push(n(_, v[P], C));
        else {
          S = {};
          for (var D in v) Object.prototype.hasOwnProperty.call(v, D) && (S[_(D, C)] = n(_, v[D], C));
        }
        return S;
      },
      r = function (_, v) {
        v = v || {};
        var C = v.separator || '_',
          S = v.split || /(?=[A-Z])/;
        return _.split(S).join(C);
      },
      s = function (_) {
        return g(_)
          ? _
          : ((_ = _.replace(/[\-_\s]+(.)?/g, function (v, C) {
              return C ? C.toUpperCase() : '';
            })),
            _.substr(0, 1).toLowerCase() + _.substr(1));
      },
      i = function (_) {
        var v = s(_);
        return v.substr(0, 1).toUpperCase() + v.substr(1);
      },
      a = function (_, v) {
        return r(_, v).toLowerCase();
      },
      o = Object.prototype.toString,
      l = function (_) {
        return typeof _ == 'function';
      },
      u = function (_) {
        return _ === Object(_);
      },
      c = function (_) {
        return o.call(_) == '[object Array]';
      },
      f = function (_) {
        return o.call(_) == '[object Date]';
      },
      h = function (_) {
        return o.call(_) == '[object RegExp]';
      },
      m = function (_) {
        return o.call(_) == '[object Boolean]';
      },
      g = function (_) {
        return (_ = _ - 0), _ === _;
      },
      d = function (_, v) {
        var C = v && 'process' in v ? v.process : v;
        return typeof C != 'function'
          ? _
          : function (S, P) {
              return C(S, _, P);
            };
      },
      p = {
        camelize: s,
        decamelize: a,
        pascalize: i,
        depascalize: a,
        camelizeKeys: function (_, v) {
          return n(d(s, v), _);
        },
        decamelizeKeys: function (_, v) {
          return n(d(a, v), _, v);
        },
        pascalizeKeys: function (_, v) {
          return n(d(i, v), _);
        },
        depascalizeKeys: function () {
          return this.decamelizeKeys.apply(this, arguments);
        },
      };
    e.exports ? (e.exports = p) : (t.humps = p);
  })(N4);
})(Cp);
var R4 = Cp.exports,
  D4 = ['class', 'style'];
function z4(e) {
  return e
    .split(';')
    .map(function (t) {
      return t.trim();
    })
    .filter(function (t) {
      return t;
    })
    .reduce(function (t, n) {
      var r = n.indexOf(':'),
        s = R4.camelize(n.slice(0, r)),
        i = n.slice(r + 1).trim();
      return (t[s] = i), t;
    }, {});
}
function H4(e) {
  return e.split(/\s+/).reduce(function (t, n) {
    return (t[n] = !0), t;
  }, {});
}
function Tp(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (typeof e == 'string') return e;
  var r = (e.children || []).map(function (l) {
      return Tp(l);
    }),
    s = Object.keys(e.attributes || {}).reduce(
      function (l, u) {
        var c = e.attributes[u];
        switch (u) {
          case 'class':
            l.class = H4(c);
            break;
          case 'style':
            l.style = z4(c);
            break;
          default:
            l.attrs[u] = c;
        }
        return l;
      },
      {
        attrs: {},
        class: {},
        style: {},
      },
    );
  n.class;
  var i = n.style,
    a = i === void 0 ? {} : i,
    o = M4(n, D4);
  return ds(
    e.tag,
    cn(
      cn(
        cn({}, t),
        {},
        {
          class: s.class,
          style: cn(cn({}, s.style), a),
        },
        s.attrs,
      ),
      o,
    ),
    r,
  );
}
var kp = !1;
try {
  kp = !0;
} catch {}
function V4() {
  if (!kp && console && typeof console.error == 'function') {
    var e;
    (e = console).error.apply(e, arguments);
  }
}
function Ro(e, t) {
  return (Array.isArray(t) && t.length > 0) || (!Array.isArray(t) && t) ? ht({}, e, t) : {};
}
function F4(e) {
  var t,
    n =
      ((t = {
        'fa-spin': e.spin,
        'fa-pulse': e.pulse,
        'fa-fw': e.fixedWidth,
        'fa-border': e.border,
        'fa-li': e.listItem,
        'fa-inverse': e.inverse,
        'fa-flip': e.flip === !0,
        'fa-flip-horizontal': e.flip === 'horizontal' || e.flip === 'both',
        'fa-flip-vertical': e.flip === 'vertical' || e.flip === 'both',
      }),
      ht(t, 'fa-'.concat(e.size), e.size !== null),
      ht(t, 'fa-rotate-'.concat(e.rotation), e.rotation !== null),
      ht(t, 'fa-pull-'.concat(e.pull), e.pull !== null),
      ht(t, 'fa-swap-opacity', e.swapOpacity),
      ht(t, 'fa-bounce', e.bounce),
      ht(t, 'fa-shake', e.shake),
      ht(t, 'fa-beat', e.beat),
      ht(t, 'fa-fade', e.fade),
      ht(t, 'fa-beat-fade', e.beatFade),
      ht(t, 'fa-flash', e.flash),
      ht(t, 'fa-spin-pulse', e.spinPulse),
      ht(t, 'fa-spin-reverse', e.spinReverse),
      t);
  return Object.keys(n)
    .map(function (r) {
      return n[r] ? r : null;
    })
    .filter(function (r) {
      return r;
    });
}
function ed(e) {
  if (e && Aa(e) === 'object' && e.prefix && e.iconName && e.icon) return e;
  if (_l.icon) return _l.icon(e);
  if (e === null) return null;
  if (Aa(e) === 'object' && e.prefix && e.iconName) return e;
  if (Array.isArray(e) && e.length === 2)
    return {
      prefix: e[0],
      iconName: e[1],
    };
  if (typeof e == 'string')
    return {
      prefix: 'fas',
      iconName: e,
    };
}
var $p = Wc({
    name: 'FontAwesomeIcon',
    props: {
      border: {
        type: Boolean,
        default: !1,
      },
      fixedWidth: {
        type: Boolean,
        default: !1,
      },
      flip: {
        type: [Boolean, String],
        default: !1,
        validator: function (t) {
          return [!0, !1, 'horizontal', 'vertical', 'both'].indexOf(t) > -1;
        },
      },
      icon: {
        type: [Object, Array, String],
        required: !0,
      },
      mask: {
        type: [Object, Array, String],
        default: null,
      },
      listItem: {
        type: Boolean,
        default: !1,
      },
      pull: {
        type: String,
        default: null,
        validator: function (t) {
          return ['right', 'left'].indexOf(t) > -1;
        },
      },
      pulse: {
        type: Boolean,
        default: !1,
      },
      rotation: {
        type: [String, Number],
        default: null,
        validator: function (t) {
          return [90, 180, 270].indexOf(Number.parseInt(t, 10)) > -1;
        },
      },
      swapOpacity: {
        type: Boolean,
        default: !1,
      },
      size: {
        type: String,
        default: null,
        validator: function (t) {
          return ['2xs', 'xs', 'sm', 'lg', 'xl', '2xl', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'].indexOf(t) > -1;
        },
      },
      spin: {
        type: Boolean,
        default: !1,
      },
      transform: {
        type: [String, Object],
        default: null,
      },
      symbol: {
        type: [Boolean, String],
        default: !1,
      },
      title: {
        type: String,
        default: null,
      },
      inverse: {
        type: Boolean,
        default: !1,
      },
      bounce: {
        type: Boolean,
        default: !1,
      },
      shake: {
        type: Boolean,
        default: !1,
      },
      beat: {
        type: Boolean,
        default: !1,
      },
      fade: {
        type: Boolean,
        default: !1,
      },
      beatFade: {
        type: Boolean,
        default: !1,
      },
      flash: {
        type: Boolean,
        default: !1,
      },
      spinPulse: {
        type: Boolean,
        default: !1,
      },
      spinReverse: {
        type: Boolean,
        default: !1,
      },
    },
    setup: function (t, n) {
      var r = n.attrs,
        s = xe(function () {
          return ed(t.icon);
        }),
        i = xe(function () {
          return Ro('classes', F4(t));
        }),
        a = xe(function () {
          return Ro('transform', typeof t.transform == 'string' ? _l.transform(t.transform) : t.transform);
        }),
        o = xe(function () {
          return Ro('mask', ed(t.mask));
        }),
        l = xe(function () {
          return Y0(
            s.value,
            cn(
              cn(cn(cn({}, i.value), a.value), o.value),
              {},
              {
                symbol: t.symbol,
                title: t.title,
              },
            ),
          );
        });
      Ze(
        l,
        function (c) {
          if (!c) return V4('Could not find one or more icon(s)', s.value, o.value);
        },
        {
          immediate: !0,
        },
      );
      var u = xe(function () {
        return l.value ? Tp(l.value.abstract[0], {}, r) : null;
      });
      return function () {
        return u.value;
      };
    },
  }),
  ut = 'top',
  Et = 'bottom',
  xt = 'right',
  ft = 'left',
  oo = 'auto',
  hs = [ut, Et, xt, ft],
  _r = 'start',
  Zr = 'end',
  Op = 'clippingParents',
  Zc = 'viewport',
  Dr = 'popper',
  Lp = 'reference',
  Dl = hs.reduce(function (e, t) {
    return e.concat([t + '-' + _r, t + '-' + Zr]);
  }, []),
  eu = [].concat(hs, [oo]).reduce(function (e, t) {
    return e.concat([t, t + '-' + _r, t + '-' + Zr]);
  }, []),
  Pp = 'beforeRead',
  Ip = 'read',
  Mp = 'afterRead',
  Np = 'beforeMain',
  Rp = 'main',
  Dp = 'afterMain',
  zp = 'beforeWrite',
  Hp = 'write',
  Vp = 'afterWrite',
  Fp = [Pp, Ip, Mp, Np, Rp, Dp, zp, Hp, Vp];
function an(e) {
  return e ? (e.nodeName || '').toLowerCase() : null;
}
function St(e) {
  if (e == null) return window;
  if (e.toString() !== '[object Window]') {
    var t = e.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return e;
}
function yr(e) {
  var t = St(e).Element;
  return e instanceof t || e instanceof Element;
}
function It(e) {
  var t = St(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function tu(e) {
  if (typeof ShadowRoot > 'u') return !1;
  var t = St(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function B4(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function (n) {
    var r = t.styles[n] || {},
      s = t.attributes[n] || {},
      i = t.elements[n];
    !It(i) ||
      !an(i) ||
      (Object.assign(i.style, r),
      Object.keys(s).forEach(function (a) {
        var o = s[a];
        o === !1 ? i.removeAttribute(a) : i.setAttribute(a, o === !0 ? '' : o);
      }));
  });
}
function j4(e) {
  var t = e.state,
    n = {
      popper: {
        position: t.options.strategy,
        left: '0',
        top: '0',
        margin: '0',
      },
      arrow: {
        position: 'absolute',
      },
      reference: {},
    };
  return (
    Object.assign(t.elements.popper.style, n.popper),
    (t.styles = n),
    t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
    function () {
      Object.keys(t.elements).forEach(function (r) {
        var s = t.elements[r],
          i = t.attributes[r] || {},
          a = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]),
          o = a.reduce(function (l, u) {
            return (l[u] = ''), l;
          }, {});
        !It(s) ||
          !an(s) ||
          (Object.assign(s.style, o),
          Object.keys(i).forEach(function (l) {
            s.removeAttribute(l);
          }));
      });
    }
  );
}
const nu = {
  name: 'applyStyles',
  enabled: !0,
  phase: 'write',
  fn: B4,
  effect: j4,
  requires: ['computeStyles'],
};
function nn(e) {
  return e.split('-')[0];
}
var gr = Math.max,
  Ca = Math.min,
  es = Math.round;
function zl() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands)
    ? e.brands
        .map(function (t) {
          return t.brand + '/' + t.version;
        })
        .join(' ')
    : navigator.userAgent;
}
function Bp() {
  return !/^((?!chrome|android).)*safari/i.test(zl());
}
function ts(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(),
    s = 1,
    i = 1;
  t && It(e) && ((s = (e.offsetWidth > 0 && es(r.width) / e.offsetWidth) || 1), (i = (e.offsetHeight > 0 && es(r.height) / e.offsetHeight) || 1));
  var a = yr(e) ? St(e) : window,
    o = a.visualViewport,
    l = !Bp() && n,
    u = (r.left + (l && o ? o.offsetLeft : 0)) / s,
    c = (r.top + (l && o ? o.offsetTop : 0)) / i,
    f = r.width / s,
    h = r.height / i;
  return {
    width: f,
    height: h,
    top: c,
    right: u + f,
    bottom: c + h,
    left: u,
    x: u,
    y: c,
  };
}
function ru(e) {
  var t = ts(e),
    n = e.offsetWidth,
    r = e.offsetHeight;
  return (
    Math.abs(t.width - n) <= 1 && (n = t.width),
    Math.abs(t.height - r) <= 1 && (r = t.height),
    {
      x: e.offsetLeft,
      y: e.offsetTop,
      width: n,
      height: r,
    }
  );
}
function jp(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (n && tu(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r)) return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function vn(e) {
  return St(e).getComputedStyle(e);
}
function W4(e) {
  return ['table', 'td', 'th'].indexOf(an(e)) >= 0;
}
function Yn(e) {
  return ((yr(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function lo(e) {
  return an(e) === 'html' ? e : e.assignedSlot || e.parentNode || (tu(e) ? e.host : null) || Yn(e);
}
function td(e) {
  return !It(e) || vn(e).position === 'fixed' ? null : e.offsetParent;
}
function U4(e) {
  var t = /firefox/i.test(zl()),
    n = /Trident/i.test(zl());
  if (n && It(e)) {
    var r = vn(e);
    if (r.position === 'fixed') return null;
  }
  var s = lo(e);
  for (tu(s) && (s = s.host); It(s) && ['html', 'body'].indexOf(an(s)) < 0; ) {
    var i = vn(s);
    if (
      i.transform !== 'none' ||
      i.perspective !== 'none' ||
      i.contain === 'paint' ||
      ['transform', 'perspective'].indexOf(i.willChange) !== -1 ||
      (t && i.willChange === 'filter') ||
      (t && i.filter && i.filter !== 'none')
    )
      return s;
    s = s.parentNode;
  }
  return null;
}
function yi(e) {
  for (var t = St(e), n = td(e); n && W4(n) && vn(n).position === 'static'; ) n = td(n);
  return n && (an(n) === 'html' || (an(n) === 'body' && vn(n).position === 'static')) ? t : n || U4(e) || t;
}
function su(e) {
  return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y';
}
function Ds(e, t, n) {
  return gr(e, Ca(t, n));
}
function q4(e, t, n) {
  var r = Ds(e, t, n);
  return r > n ? n : r;
}
function Wp() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };
}
function Up(e) {
  return Object.assign({}, Wp(), e);
}
function qp(e, t) {
  return t.reduce(function (n, r) {
    return (n[r] = e), n;
  }, {});
}
var K4 = function (t, n) {
  return (
    (t =
      typeof t == 'function'
        ? t(
            Object.assign({}, n.rects, {
              placement: n.placement,
            }),
          )
        : t),
    Up(typeof t != 'number' ? t : qp(t, hs))
  );
};
function G4(e) {
  var t,
    n = e.state,
    r = e.name,
    s = e.options,
    i = n.elements.arrow,
    a = n.modifiersData.popperOffsets,
    o = nn(n.placement),
    l = su(o),
    u = [ft, xt].indexOf(o) >= 0,
    c = u ? 'height' : 'width';
  if (!(!i || !a)) {
    var f = K4(s.padding, n),
      h = ru(i),
      m = l === 'y' ? ut : ft,
      g = l === 'y' ? Et : xt,
      d = n.rects.reference[c] + n.rects.reference[l] - a[l] - n.rects.popper[c],
      p = a[l] - n.rects.reference[l],
      _ = yi(i),
      v = _ ? (l === 'y' ? _.clientHeight || 0 : _.clientWidth || 0) : 0,
      C = d / 2 - p / 2,
      S = f[m],
      P = v - h[c] - f[g],
      N = v / 2 - h[c] / 2 + C,
      D = Ds(S, N, P),
      k = l;
    n.modifiersData[r] = ((t = {}), (t[k] = D), (t.centerOffset = D - N), t);
  }
}
function Y4(e) {
  var t = e.state,
    n = e.options,
    r = n.element,
    s = r === void 0 ? '[data-popper-arrow]' : r;
  s != null && ((typeof s == 'string' && ((s = t.elements.popper.querySelector(s)), !s)) || (jp(t.elements.popper, s) && (t.elements.arrow = s)));
}
const Kp = {
  name: 'arrow',
  enabled: !0,
  phase: 'main',
  fn: G4,
  effect: Y4,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow'],
};
function ns(e) {
  return e.split('-')[1];
}
var X4 = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto',
};
function Q4(e, t) {
  var n = e.x,
    r = e.y,
    s = t.devicePixelRatio || 1;
  return {
    x: es(n * s) / s || 0,
    y: es(r * s) / s || 0,
  };
}
function nd(e) {
  var t,
    n = e.popper,
    r = e.popperRect,
    s = e.placement,
    i = e.variation,
    a = e.offsets,
    o = e.position,
    l = e.gpuAcceleration,
    u = e.adaptive,
    c = e.roundOffsets,
    f = e.isFixed,
    h = a.x,
    m = h === void 0 ? 0 : h,
    g = a.y,
    d = g === void 0 ? 0 : g,
    p =
      typeof c == 'function'
        ? c({
            x: m,
            y: d,
          })
        : {
            x: m,
            y: d,
          };
  (m = p.x), (d = p.y);
  var _ = a.hasOwnProperty('x'),
    v = a.hasOwnProperty('y'),
    C = ft,
    S = ut,
    P = window;
  if (u) {
    var N = yi(n),
      D = 'clientHeight',
      k = 'clientWidth';
    if ((N === St(n) && ((N = Yn(n)), vn(N).position !== 'static' && o === 'absolute' && ((D = 'scrollHeight'), (k = 'scrollWidth'))), (N = N), s === ut || ((s === ft || s === xt) && i === Zr))) {
      S = Et;
      var R = f && N === P && P.visualViewport ? P.visualViewport.height : N[D];
      (d -= R - r.height), (d *= l ? 1 : -1);
    }
    if (s === ft || ((s === ut || s === Et) && i === Zr)) {
      C = xt;
      var M = f && N === P && P.visualViewport ? P.visualViewport.width : N[k];
      (m -= M - r.width), (m *= l ? 1 : -1);
    }
  }
  var ee = Object.assign(
      {
        position: o,
      },
      u && X4,
    ),
    Q =
      c === !0
        ? Q4(
            {
              x: m,
              y: d,
            },
            St(n),
          )
        : {
            x: m,
            y: d,
          };
  if (((m = Q.x), (d = Q.y), l)) {
    var te;
    return Object.assign(
      {},
      ee,
      ((te = {}),
      (te[S] = v ? '0' : ''),
      (te[C] = _ ? '0' : ''),
      (te.transform = (P.devicePixelRatio || 1) <= 1 ? 'translate(' + m + 'px, ' + d + 'px)' : 'translate3d(' + m + 'px, ' + d + 'px, 0)'),
      te),
    );
  }
  return Object.assign({}, ee, ((t = {}), (t[S] = v ? d + 'px' : ''), (t[C] = _ ? m + 'px' : ''), (t.transform = ''), t));
}
function J4(e) {
  var t = e.state,
    n = e.options,
    r = n.gpuAcceleration,
    s = r === void 0 ? !0 : r,
    i = n.adaptive,
    a = i === void 0 ? !0 : i,
    o = n.roundOffsets,
    l = o === void 0 ? !0 : o,
    u = {
      placement: nn(t.placement),
      variation: ns(t.placement),
      popper: t.elements.popper,
      popperRect: t.rects.popper,
      gpuAcceleration: s,
      isFixed: t.options.strategy === 'fixed',
    };
  t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      nd(
        Object.assign({}, u, {
          offsets: t.modifiersData.popperOffsets,
          position: t.options.strategy,
          adaptive: a,
          roundOffsets: l,
        }),
      ),
    )),
    t.modifiersData.arrow != null &&
      (t.styles.arrow = Object.assign(
        {},
        t.styles.arrow,
        nd(
          Object.assign({}, u, {
            offsets: t.modifiersData.arrow,
            position: 'absolute',
            adaptive: !1,
            roundOffsets: l,
          }),
        ),
      )),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      'data-popper-placement': t.placement,
    }));
}
const iu = {
  name: 'computeStyles',
  enabled: !0,
  phase: 'beforeWrite',
  fn: J4,
  data: {},
};
var Ki = {
  passive: !0,
};
function Z4(e) {
  var t = e.state,
    n = e.instance,
    r = e.options,
    s = r.scroll,
    i = s === void 0 ? !0 : s,
    a = r.resize,
    o = a === void 0 ? !0 : a,
    l = St(t.elements.popper),
    u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
    i &&
      u.forEach(function (c) {
        c.addEventListener('scroll', n.update, Ki);
      }),
    o && l.addEventListener('resize', n.update, Ki),
    function () {
      i &&
        u.forEach(function (c) {
          c.removeEventListener('scroll', n.update, Ki);
        }),
        o && l.removeEventListener('resize', n.update, Ki);
    }
  );
}
const au = {
  name: 'eventListeners',
  enabled: !0,
  phase: 'write',
  fn: function () {},
  effect: Z4,
  data: {},
};
var eb = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom',
};
function fa(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return eb[t];
  });
}
var tb = {
  start: 'end',
  end: 'start',
};
function rd(e) {
  return e.replace(/start|end/g, function (t) {
    return tb[t];
  });
}
function ou(e) {
  var t = St(e),
    n = t.pageXOffset,
    r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r,
  };
}
function lu(e) {
  return ts(Yn(e)).left + ou(e).scrollLeft;
}
function nb(e, t) {
  var n = St(e),
    r = Yn(e),
    s = n.visualViewport,
    i = r.clientWidth,
    a = r.clientHeight,
    o = 0,
    l = 0;
  if (s) {
    (i = s.width), (a = s.height);
    var u = Bp();
    (u || (!u && t === 'fixed')) && ((o = s.offsetLeft), (l = s.offsetTop));
  }
  return {
    width: i,
    height: a,
    x: o + lu(e),
    y: l,
  };
}
function rb(e) {
  var t,
    n = Yn(e),
    r = ou(e),
    s = (t = e.ownerDocument) == null ? void 0 : t.body,
    i = gr(n.scrollWidth, n.clientWidth, s ? s.scrollWidth : 0, s ? s.clientWidth : 0),
    a = gr(n.scrollHeight, n.clientHeight, s ? s.scrollHeight : 0, s ? s.clientHeight : 0),
    o = -r.scrollLeft + lu(e),
    l = -r.scrollTop;
  return (
    vn(s || n).direction === 'rtl' && (o += gr(n.clientWidth, s ? s.clientWidth : 0) - i),
    {
      width: i,
      height: a,
      x: o,
      y: l,
    }
  );
}
function cu(e) {
  var t = vn(e),
    n = t.overflow,
    r = t.overflowX,
    s = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + s + r);
}
function Gp(e) {
  return ['html', 'body', '#document'].indexOf(an(e)) >= 0 ? e.ownerDocument.body : It(e) && cu(e) ? e : Gp(lo(e));
}
function zs(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = Gp(e),
    s = r === ((n = e.ownerDocument) == null ? void 0 : n.body),
    i = St(r),
    a = s ? [i].concat(i.visualViewport || [], cu(r) ? r : []) : r,
    o = t.concat(a);
  return s ? o : o.concat(zs(lo(a)));
}
function Hl(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function sb(e, t) {
  var n = ts(e, !1, t === 'fixed');
  return (
    (n.top = n.top + e.clientTop),
    (n.left = n.left + e.clientLeft),
    (n.bottom = n.top + e.clientHeight),
    (n.right = n.left + e.clientWidth),
    (n.width = e.clientWidth),
    (n.height = e.clientHeight),
    (n.x = n.left),
    (n.y = n.top),
    n
  );
}
function sd(e, t, n) {
  return t === Zc ? Hl(nb(e, n)) : yr(t) ? sb(t, n) : Hl(rb(Yn(e)));
}
function ib(e) {
  var t = zs(lo(e)),
    n = ['absolute', 'fixed'].indexOf(vn(e).position) >= 0,
    r = n && It(e) ? yi(e) : e;
  return yr(r)
    ? t.filter(function (s) {
        return yr(s) && jp(s, r) && an(s) !== 'body';
      })
    : [];
}
function ab(e, t, n, r) {
  var s = t === 'clippingParents' ? ib(e) : [].concat(t),
    i = [].concat(s, [n]),
    a = i[0],
    o = i.reduce(
      function (l, u) {
        var c = sd(e, u, r);
        return (l.top = gr(c.top, l.top)), (l.right = Ca(c.right, l.right)), (l.bottom = Ca(c.bottom, l.bottom)), (l.left = gr(c.left, l.left)), l;
      },
      sd(e, a, r),
    );
  return (o.width = o.right - o.left), (o.height = o.bottom - o.top), (o.x = o.left), (o.y = o.top), o;
}
function Yp(e) {
  var t = e.reference,
    n = e.element,
    r = e.placement,
    s = r ? nn(r) : null,
    i = r ? ns(r) : null,
    a = t.x + t.width / 2 - n.width / 2,
    o = t.y + t.height / 2 - n.height / 2,
    l;
  switch (s) {
    case ut:
      l = {
        x: a,
        y: t.y - n.height,
      };
      break;
    case Et:
      l = {
        x: a,
        y: t.y + t.height,
      };
      break;
    case xt:
      l = {
        x: t.x + t.width,
        y: o,
      };
      break;
    case ft:
      l = {
        x: t.x - n.width,
        y: o,
      };
      break;
    default:
      l = {
        x: t.x,
        y: t.y,
      };
  }
  var u = s ? su(s) : null;
  if (u != null) {
    var c = u === 'y' ? 'height' : 'width';
    switch (i) {
      case _r:
        l[u] = l[u] - (t[c] / 2 - n[c] / 2);
        break;
      case Zr:
        l[u] = l[u] + (t[c] / 2 - n[c] / 2);
        break;
    }
  }
  return l;
}
function rs(e, t) {
  t === void 0 && (t = {});
  var n = t,
    r = n.placement,
    s = r === void 0 ? e.placement : r,
    i = n.strategy,
    a = i === void 0 ? e.strategy : i,
    o = n.boundary,
    l = o === void 0 ? Op : o,
    u = n.rootBoundary,
    c = u === void 0 ? Zc : u,
    f = n.elementContext,
    h = f === void 0 ? Dr : f,
    m = n.altBoundary,
    g = m === void 0 ? !1 : m,
    d = n.padding,
    p = d === void 0 ? 0 : d,
    _ = Up(typeof p != 'number' ? p : qp(p, hs)),
    v = h === Dr ? Lp : Dr,
    C = e.rects.popper,
    S = e.elements[g ? v : h],
    P = ab(yr(S) ? S : S.contextElement || Yn(e.elements.popper), l, c, a),
    N = ts(e.elements.reference),
    D = Yp({
      reference: N,
      element: C,
      strategy: 'absolute',
      placement: s,
    }),
    k = Hl(Object.assign({}, C, D)),
    R = h === Dr ? k : N,
    M = {
      top: P.top - R.top + _.top,
      bottom: R.bottom - P.bottom + _.bottom,
      left: P.left - R.left + _.left,
      right: R.right - P.right + _.right,
    },
    ee = e.modifiersData.offset;
  if (h === Dr && ee) {
    var Q = ee[s];
    Object.keys(M).forEach(function (te) {
      var fe = [xt, Et].indexOf(te) >= 0 ? 1 : -1,
        ye = [ut, Et].indexOf(te) >= 0 ? 'y' : 'x';
      M[te] += Q[ye] * fe;
    });
  }
  return M;
}
function ob(e, t) {
  t === void 0 && (t = {});
  var n = t,
    r = n.placement,
    s = n.boundary,
    i = n.rootBoundary,
    a = n.padding,
    o = n.flipVariations,
    l = n.allowedAutoPlacements,
    u = l === void 0 ? eu : l,
    c = ns(r),
    f = c
      ? o
        ? Dl
        : Dl.filter(function (g) {
            return ns(g) === c;
          })
      : hs,
    h = f.filter(function (g) {
      return u.indexOf(g) >= 0;
    });
  h.length === 0 && (h = f);
  var m = h.reduce(function (g, d) {
    return (
      (g[d] = rs(e, {
        placement: d,
        boundary: s,
        rootBoundary: i,
        padding: a,
      })[nn(d)]),
      g
    );
  }, {});
  return Object.keys(m).sort(function (g, d) {
    return m[g] - m[d];
  });
}
function lb(e) {
  if (nn(e) === oo) return [];
  var t = fa(e);
  return [rd(e), t, rd(t)];
}
function cb(e) {
  var t = e.state,
    n = e.options,
    r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (
      var s = n.mainAxis,
        i = s === void 0 ? !0 : s,
        a = n.altAxis,
        o = a === void 0 ? !0 : a,
        l = n.fallbackPlacements,
        u = n.padding,
        c = n.boundary,
        f = n.rootBoundary,
        h = n.altBoundary,
        m = n.flipVariations,
        g = m === void 0 ? !0 : m,
        d = n.allowedAutoPlacements,
        p = t.options.placement,
        _ = nn(p),
        v = _ === p,
        C = l || (v || !g ? [fa(p)] : lb(p)),
        S = [p].concat(C).reduce(function (O, q) {
          return O.concat(
            nn(q) === oo
              ? ob(t, {
                  placement: q,
                  boundary: c,
                  rootBoundary: f,
                  padding: u,
                  flipVariations: g,
                  allowedAutoPlacements: d,
                })
              : q,
          );
        }, []),
        P = t.rects.reference,
        N = t.rects.popper,
        D = new Map(),
        k = !0,
        R = S[0],
        M = 0;
      M < S.length;
      M++
    ) {
      var ee = S[M],
        Q = nn(ee),
        te = ns(ee) === _r,
        fe = [ut, Et].indexOf(Q) >= 0,
        ye = fe ? 'width' : 'height',
        ae = rs(t, {
          placement: ee,
          boundary: c,
          rootBoundary: f,
          altBoundary: h,
          padding: u,
        }),
        de = fe ? (te ? xt : ft) : te ? Et : ut;
      P[ye] > N[ye] && (de = fa(de));
      var Se = fa(de),
        Ce = [];
      if (
        (i && Ce.push(ae[Q] <= 0),
        o && Ce.push(ae[de] <= 0, ae[Se] <= 0),
        Ce.every(function (O) {
          return O;
        }))
      ) {
        (R = ee), (k = !1);
        break;
      }
      D.set(ee, Ce);
    }
    if (k)
      for (
        var Ye = g ? 3 : 1,
          tt = function (q) {
            var ne = S.find(function (A) {
              var I = D.get(A);
              if (I)
                return I.slice(0, q).every(function (T) {
                  return T;
                });
            });
            if (ne) return (R = ne), 'break';
          },
          He = Ye;
        He > 0;
        He--
      ) {
        var W = tt(He);
        if (W === 'break') break;
      }
    t.placement !== R && ((t.modifiersData[r]._skip = !0), (t.placement = R), (t.reset = !0));
  }
}
const Xp = {
  name: 'flip',
  enabled: !0,
  phase: 'main',
  fn: cb,
  requiresIfExists: ['offset'],
  data: {
    _skip: !1,
  },
};
function id(e, t, n) {
  return (
    n === void 0 &&
      (n = {
        x: 0,
        y: 0,
      }),
    {
      top: e.top - t.height - n.y,
      right: e.right - t.width + n.x,
      bottom: e.bottom - t.height + n.y,
      left: e.left - t.width - n.x,
    }
  );
}
function ad(e) {
  return [ut, xt, Et, ft].some(function (t) {
    return e[t] >= 0;
  });
}
function ub(e) {
  var t = e.state,
    n = e.name,
    r = t.rects.reference,
    s = t.rects.popper,
    i = t.modifiersData.preventOverflow,
    a = rs(t, {
      elementContext: 'reference',
    }),
    o = rs(t, {
      altBoundary: !0,
    }),
    l = id(a, r),
    u = id(o, s, i),
    c = ad(l),
    f = ad(u);
  (t.modifiersData[n] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: u,
    isReferenceHidden: c,
    hasPopperEscaped: f,
  }),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      'data-popper-reference-hidden': c,
      'data-popper-escaped': f,
    }));
}
const Qp = {
  name: 'hide',
  enabled: !0,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: ub,
};
function fb(e, t, n) {
  var r = nn(e),
    s = [ft, ut].indexOf(r) >= 0 ? -1 : 1,
    i =
      typeof n == 'function'
        ? n(
            Object.assign({}, t, {
              placement: e,
            }),
          )
        : n,
    a = i[0],
    o = i[1];
  return (
    (a = a || 0),
    (o = (o || 0) * s),
    [ft, xt].indexOf(r) >= 0
      ? {
          x: o,
          y: a,
        }
      : {
          x: a,
          y: o,
        }
  );
}
function db(e) {
  var t = e.state,
    n = e.options,
    r = e.name,
    s = n.offset,
    i = s === void 0 ? [0, 0] : s,
    a = eu.reduce(function (c, f) {
      return (c[f] = fb(f, t.rects, i)), c;
    }, {}),
    o = a[t.placement],
    l = o.x,
    u = o.y;
  t.modifiersData.popperOffsets != null && ((t.modifiersData.popperOffsets.x += l), (t.modifiersData.popperOffsets.y += u)), (t.modifiersData[r] = a);
}
const Jp = {
  name: 'offset',
  enabled: !0,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: db,
};
function hb(e) {
  var t = e.state,
    n = e.name;
  t.modifiersData[n] = Yp({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: 'absolute',
    placement: t.placement,
  });
}
const uu = {
  name: 'popperOffsets',
  enabled: !0,
  phase: 'read',
  fn: hb,
  data: {},
};
function pb(e) {
  return e === 'x' ? 'y' : 'x';
}
function mb(e) {
  var t = e.state,
    n = e.options,
    r = e.name,
    s = n.mainAxis,
    i = s === void 0 ? !0 : s,
    a = n.altAxis,
    o = a === void 0 ? !1 : a,
    l = n.boundary,
    u = n.rootBoundary,
    c = n.altBoundary,
    f = n.padding,
    h = n.tether,
    m = h === void 0 ? !0 : h,
    g = n.tetherOffset,
    d = g === void 0 ? 0 : g,
    p = rs(t, {
      boundary: l,
      rootBoundary: u,
      padding: f,
      altBoundary: c,
    }),
    _ = nn(t.placement),
    v = ns(t.placement),
    C = !v,
    S = su(_),
    P = pb(S),
    N = t.modifiersData.popperOffsets,
    D = t.rects.reference,
    k = t.rects.popper,
    R =
      typeof d == 'function'
        ? d(
            Object.assign({}, t.rects, {
              placement: t.placement,
            }),
          )
        : d,
    M =
      typeof R == 'number'
        ? {
            mainAxis: R,
            altAxis: R,
          }
        : Object.assign(
            {
              mainAxis: 0,
              altAxis: 0,
            },
            R,
          ),
    ee = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    Q = {
      x: 0,
      y: 0,
    };
  if (N) {
    if (i) {
      var te,
        fe = S === 'y' ? ut : ft,
        ye = S === 'y' ? Et : xt,
        ae = S === 'y' ? 'height' : 'width',
        de = N[S],
        Se = de + p[fe],
        Ce = de - p[ye],
        Ye = m ? -k[ae] / 2 : 0,
        tt = v === _r ? D[ae] : k[ae],
        He = v === _r ? -k[ae] : -D[ae],
        W = t.elements.arrow,
        O =
          m && W
            ? ru(W)
            : {
                width: 0,
                height: 0,
              },
        q = t.modifiersData['arrow#persistent'] ? t.modifiersData['arrow#persistent'].padding : Wp(),
        ne = q[fe],
        A = q[ye],
        I = Ds(0, D[ae], O[ae]),
        T = C ? D[ae] / 2 - Ye - I - ne - M.mainAxis : tt - I - ne - M.mainAxis,
        B = C ? -D[ae] / 2 + Ye + I + A + M.mainAxis : He + I + A + M.mainAxis,
        J = t.elements.arrow && yi(t.elements.arrow),
        b = J ? (S === 'y' ? J.clientTop || 0 : J.clientLeft || 0) : 0,
        y = (te = ee == null ? void 0 : ee[S]) != null ? te : 0,
        x = de + T - y - b,
        L = de + B - y,
        $ = Ds(m ? Ca(Se, x) : Se, de, m ? gr(Ce, L) : Ce);
      (N[S] = $), (Q[S] = $ - de);
    }
    if (o) {
      var z,
        j = S === 'x' ? ut : ft,
        H = S === 'x' ? Et : xt,
        X = N[P],
        V = P === 'y' ? 'height' : 'width',
        se = X + p[j],
        K = X - p[H],
        re = [ut, ft].indexOf(_) !== -1,
        Z = (z = ee == null ? void 0 : ee[P]) != null ? z : 0,
        he = re ? se : X - D[V] - k[V] - Z + M.altAxis,
        ge = re ? X + D[V] + k[V] - Z - M.altAxis : K,
        Ee = m && re ? q4(he, X, ge) : Ds(m ? he : se, X, m ? ge : K);
      (N[P] = Ee), (Q[P] = Ee - X);
    }
    t.modifiersData[r] = Q;
  }
}
const Zp = {
  name: 'preventOverflow',
  enabled: !0,
  phase: 'main',
  fn: mb,
  requiresIfExists: ['offset'],
};
function gb(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop,
  };
}
function vb(e) {
  return e === St(e) || !It(e) ? ou(e) : gb(e);
}
function bb(e) {
  var t = e.getBoundingClientRect(),
    n = es(t.width) / e.offsetWidth || 1,
    r = es(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function _b(e, t, n) {
  n === void 0 && (n = !1);
  var r = It(t),
    s = It(t) && bb(t),
    i = Yn(t),
    a = ts(e, s, n),
    o = {
      scrollLeft: 0,
      scrollTop: 0,
    },
    l = {
      x: 0,
      y: 0,
    };
  return (
    (r || (!r && !n)) && ((an(t) !== 'body' || cu(i)) && (o = vb(t)), It(t) ? ((l = ts(t, !0)), (l.x += t.clientLeft), (l.y += t.clientTop)) : i && (l.x = lu(i))),
    {
      x: a.left + o.scrollLeft - l.x,
      y: a.top + o.scrollTop - l.y,
      width: a.width,
      height: a.height,
    }
  );
}
function yb(e) {
  var t = new Map(),
    n = new Set(),
    r = [];
  e.forEach(function (i) {
    t.set(i.name, i);
  });
  function s(i) {
    n.add(i.name);
    var a = [].concat(i.requires || [], i.requiresIfExists || []);
    a.forEach(function (o) {
      if (!n.has(o)) {
        var l = t.get(o);
        l && s(l);
      }
    }),
      r.push(i);
  }
  return (
    e.forEach(function (i) {
      n.has(i.name) || s(i);
    }),
    r
  );
}
function wb(e) {
  var t = yb(e);
  return Fp.reduce(function (n, r) {
    return n.concat(
      t.filter(function (s) {
        return s.phase === r;
      }),
    );
  }, []);
}
function Eb(e) {
  var t;
  return function () {
    return (
      t ||
        (t = new Promise(function (n) {
          Promise.resolve().then(function () {
            (t = void 0), n(e());
          });
        })),
      t
    );
  };
}
function xb(e) {
  var t = e.reduce(function (n, r) {
    var s = n[r.name];
    return (
      (n[r.name] = s
        ? Object.assign({}, s, r, {
            options: Object.assign({}, s.options, r.options),
            data: Object.assign({}, s.data, r.data),
          })
        : r),
      n
    );
  }, {});
  return Object.keys(t).map(function (n) {
    return t[n];
  });
}
var od = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute',
};
function ld() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  return !t.some(function (r) {
    return !(r && typeof r.getBoundingClientRect == 'function');
  });
}
function co(e) {
  e === void 0 && (e = {});
  var t = e,
    n = t.defaultModifiers,
    r = n === void 0 ? [] : n,
    s = t.defaultOptions,
    i = s === void 0 ? od : s;
  return function (o, l, u) {
    u === void 0 && (u = i);
    var c = {
        placement: 'bottom',
        orderedModifiers: [],
        options: Object.assign({}, od, i),
        modifiersData: {},
        elements: {
          reference: o,
          popper: l,
        },
        attributes: {},
        styles: {},
      },
      f = [],
      h = !1,
      m = {
        state: c,
        setOptions: function (_) {
          var v = typeof _ == 'function' ? _(c.options) : _;
          d(),
            (c.options = Object.assign({}, i, c.options, v)),
            (c.scrollParents = {
              reference: yr(o) ? zs(o) : o.contextElement ? zs(o.contextElement) : [],
              popper: zs(l),
            });
          var C = wb(xb([].concat(r, c.options.modifiers)));
          return (
            (c.orderedModifiers = C.filter(function (S) {
              return S.enabled;
            })),
            g(),
            m.update()
          );
        },
        forceUpdate: function () {
          if (!h) {
            var _ = c.elements,
              v = _.reference,
              C = _.popper;
            if (ld(v, C)) {
              (c.rects = {
                reference: _b(v, yi(C), c.options.strategy === 'fixed'),
                popper: ru(C),
              }),
                (c.reset = !1),
                (c.placement = c.options.placement),
                c.orderedModifiers.forEach(function (M) {
                  return (c.modifiersData[M.name] = Object.assign({}, M.data));
                });
              for (var S = 0; S < c.orderedModifiers.length; S++) {
                if (c.reset === !0) {
                  (c.reset = !1), (S = -1);
                  continue;
                }
                var P = c.orderedModifiers[S],
                  N = P.fn,
                  D = P.options,
                  k = D === void 0 ? {} : D,
                  R = P.name;
                typeof N == 'function' &&
                  (c =
                    N({
                      state: c,
                      options: k,
                      name: R,
                      instance: m,
                    }) || c);
              }
            }
          }
        },
        update: Eb(function () {
          return new Promise(function (p) {
            m.forceUpdate(), p(c);
          });
        }),
        destroy: function () {
          d(), (h = !0);
        },
      };
    if (!ld(o, l)) return m;
    m.setOptions(u).then(function (p) {
      !h && u.onFirstUpdate && u.onFirstUpdate(p);
    });
    function g() {
      c.orderedModifiers.forEach(function (p) {
        var _ = p.name,
          v = p.options,
          C = v === void 0 ? {} : v,
          S = p.effect;
        if (typeof S == 'function') {
          var P = S({
              state: c,
              name: _,
              instance: m,
              options: C,
            }),
            N = function () {};
          f.push(P || N);
        }
      });
    }
    function d() {
      f.forEach(function (p) {
        return p();
      }),
        (f = []);
    }
    return m;
  };
}
var Sb = co(),
  Ab = [au, uu, iu, nu],
  Cb = co({
    defaultModifiers: Ab,
  }),
  Tb = [au, uu, iu, nu, Jp, Xp, Zp, Kp, Qp],
  fu = co({
    defaultModifiers: Tb,
  });
const e2 = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      afterMain: Dp,
      afterRead: Mp,
      afterWrite: Vp,
      applyStyles: nu,
      arrow: Kp,
      auto: oo,
      basePlacements: hs,
      beforeMain: Np,
      beforeRead: Pp,
      beforeWrite: zp,
      bottom: Et,
      clippingParents: Op,
      computeStyles: iu,
      createPopper: fu,
      createPopperBase: Sb,
      createPopperLite: Cb,
      detectOverflow: rs,
      end: Zr,
      eventListeners: au,
      flip: Xp,
      hide: Qp,
      left: ft,
      main: Rp,
      modifierPhases: Fp,
      offset: Jp,
      placements: eu,
      popper: Dr,
      popperGenerator: co,
      popperOffsets: uu,
      preventOverflow: Zp,
      read: Ip,
      reference: Lp,
      right: xt,
      start: _r,
      top: ut,
      variationPlacements: Dl,
      viewport: Zc,
      write: Hp,
    },
    Symbol.toStringTag,
    {
      value: 'Module',
    },
  ),
);
/*!
 * Bootstrap v5.3.2 (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
const $n = new Map(),
  Do = {
    set(e, t, n) {
      $n.has(e) || $n.set(e, new Map());
      const r = $n.get(e);
      if (!r.has(t) && r.size !== 0) {
        console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`);
        return;
      }
      r.set(t, n);
    },
    get(e, t) {
      return ($n.has(e) && $n.get(e).get(t)) || null;
    },
    remove(e, t) {
      if (!$n.has(e)) return;
      const n = $n.get(e);
      n.delete(t), n.size === 0 && $n.delete(e);
    },
  },
  kb = 1e6,
  $b = 1e3,
  Vl = 'transitionend',
  t2 = (e) => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (t, n) => `#${CSS.escape(n)}`)), e),
  Ob = (e) =>
    e == null
      ? `${e}`
      : Object.prototype.toString
          .call(e)
          .match(/\s([a-z]+)/i)[1]
          .toLowerCase(),
  Lb = (e) => {
    do e += Math.floor(Math.random() * kb);
    while (document.getElementById(e));
    return e;
  },
  Pb = (e) => {
    if (!e) return 0;
    let { transitionDuration: t, transitionDelay: n } = window.getComputedStyle(e);
    const r = Number.parseFloat(t),
      s = Number.parseFloat(n);
    return !r && !s ? 0 : ((t = t.split(',')[0]), (n = n.split(',')[0]), (Number.parseFloat(t) + Number.parseFloat(n)) * $b);
  },
  n2 = (e) => {
    e.dispatchEvent(new Event(Vl));
  },
  fn = (e) => (!e || typeof e != 'object' ? !1 : (typeof e.jquery < 'u' && (e = e[0]), typeof e.nodeType < 'u')),
  Wn = (e) => (fn(e) ? (e.jquery ? e[0] : e) : typeof e == 'string' && e.length > 0 ? document.querySelector(t2(e)) : null),
  ps = (e) => {
    if (!fn(e) || e.getClientRects().length === 0) return !1;
    const t = getComputedStyle(e).getPropertyValue('visibility') === 'visible',
      n = e.closest('details:not([open])');
    if (!n) return t;
    if (n !== e) {
      const r = e.closest('summary');
      if ((r && r.parentNode !== n) || r === null) return !1;
    }
    return t;
  },
  Un = (e) =>
    !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains('disabled') ? !0 : typeof e.disabled < 'u' ? e.disabled : e.hasAttribute('disabled') && e.getAttribute('disabled') !== 'false',
  r2 = (e) => {
    if (!document.documentElement.attachShadow) return null;
    if (typeof e.getRootNode == 'function') {
      const t = e.getRootNode();
      return t instanceof ShadowRoot ? t : null;
    }
    return e instanceof ShadowRoot ? e : e.parentNode ? r2(e.parentNode) : null;
  },
  Ta = () => {},
  wi = (e) => {
    e.offsetHeight;
  },
  s2 = () => (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery') ? window.jQuery : null),
  zo = [],
  Ib = (e) => {
    document.readyState === 'loading'
      ? (zo.length ||
          document.addEventListener('DOMContentLoaded', () => {
            for (const t of zo) t();
          }),
        zo.push(e))
      : e();
  },
  Nt = () => document.documentElement.dir === 'rtl',
  Dt = (e) => {
    Ib(() => {
      const t = s2();
      if (t) {
        const n = e.NAME,
          r = t.fn[n];
        (t.fn[n] = e.jQueryInterface), (t.fn[n].Constructor = e), (t.fn[n].noConflict = () => ((t.fn[n] = r), e.jQueryInterface));
      }
    });
  },
  mt = (e, t = [], n = e) => (typeof e == 'function' ? e(...t) : n),
  i2 = (e, t, n = !0) => {
    if (!n) {
      mt(e);
      return;
    }
    const r = 5,
      s = Pb(t) + r;
    let i = !1;
    const a = ({ target: o }) => {
      o === t && ((i = !0), t.removeEventListener(Vl, a), mt(e));
    };
    t.addEventListener(Vl, a),
      setTimeout(() => {
        i || n2(t);
      }, s);
  },
  du = (e, t, n, r) => {
    const s = e.length;
    let i = e.indexOf(t);
    return i === -1 ? (!n && r ? e[s - 1] : e[0]) : ((i += n ? 1 : -1), r && (i = (i + s) % s), e[Math.max(0, Math.min(i, s - 1))]);
  },
  Mb = /[^.]*(?=\..*)\.|.*/,
  Nb = /\..*/,
  Rb = /::\d+$/,
  Ho = {};
let cd = 1;
const a2 = {
    mouseenter: 'mouseover',
    mouseleave: 'mouseout',
  },
  Db = new Set([
    'click',
    'dblclick',
    'mouseup',
    'mousedown',
    'contextmenu',
    'mousewheel',
    'DOMMouseScroll',
    'mouseover',
    'mouseout',
    'mousemove',
    'selectstart',
    'selectend',
    'keydown',
    'keypress',
    'keyup',
    'orientationchange',
    'touchstart',
    'touchmove',
    'touchend',
    'touchcancel',
    'pointerdown',
    'pointermove',
    'pointerup',
    'pointerleave',
    'pointercancel',
    'gesturestart',
    'gesturechange',
    'gestureend',
    'focus',
    'blur',
    'change',
    'reset',
    'select',
    'submit',
    'focusin',
    'focusout',
    'load',
    'unload',
    'beforeunload',
    'resize',
    'move',
    'DOMContentLoaded',
    'readystatechange',
    'error',
    'abort',
    'scroll',
  ]);
function o2(e, t) {
  return (t && `${t}::${cd++}`) || e.uidEvent || cd++;
}
function l2(e) {
  const t = o2(e);
  return (e.uidEvent = t), (Ho[t] = Ho[t] || {}), Ho[t];
}
function zb(e, t) {
  return function n(r) {
    return (
      hu(r, {
        delegateTarget: e,
      }),
      n.oneOff && U.off(e, r.type, t),
      t.apply(e, [r])
    );
  };
}
function Hb(e, t, n) {
  return function r(s) {
    const i = e.querySelectorAll(t);
    for (let { target: a } = s; a && a !== this; a = a.parentNode)
      for (const o of i)
        if (o === a)
          return (
            hu(s, {
              delegateTarget: a,
            }),
            r.oneOff && U.off(e, s.type, t, n),
            n.apply(a, [s])
          );
  };
}
function c2(e, t, n = null) {
  return Object.values(e).find((r) => r.callable === t && r.delegationSelector === n);
}
function u2(e, t, n) {
  const r = typeof t == 'string',
    s = r ? n : t || n;
  let i = f2(e);
  return Db.has(i) || (i = e), [r, s, i];
}
function ud(e, t, n, r, s) {
  if (typeof t != 'string' || !e) return;
  let [i, a, o] = u2(t, n, r);
  t in a2 &&
    (a = ((g) =>
      function (d) {
        if (!d.relatedTarget || (d.relatedTarget !== d.delegateTarget && !d.delegateTarget.contains(d.relatedTarget))) return g.call(this, d);
      })(a));
  const l = l2(e),
    u = l[o] || (l[o] = {}),
    c = c2(u, a, i ? n : null);
  if (c) {
    c.oneOff = c.oneOff && s;
    return;
  }
  const f = o2(a, t.replace(Mb, '')),
    h = i ? Hb(e, n, a) : zb(e, a);
  (h.delegationSelector = i ? n : null), (h.callable = a), (h.oneOff = s), (h.uidEvent = f), (u[f] = h), e.addEventListener(o, h, i);
}
function Fl(e, t, n, r, s) {
  const i = c2(t[n], r, s);
  i && (e.removeEventListener(n, i, !!s), delete t[n][i.uidEvent]);
}
function Vb(e, t, n, r) {
  const s = t[n] || {};
  for (const [i, a] of Object.entries(s)) i.includes(r) && Fl(e, t, n, a.callable, a.delegationSelector);
}
function f2(e) {
  return (e = e.replace(Nb, '')), a2[e] || e;
}
const U = {
  on(e, t, n, r) {
    ud(e, t, n, r, !1);
  },
  one(e, t, n, r) {
    ud(e, t, n, r, !0);
  },
  off(e, t, n, r) {
    if (typeof t != 'string' || !e) return;
    const [s, i, a] = u2(t, n, r),
      o = a !== t,
      l = l2(e),
      u = l[a] || {},
      c = t.startsWith('.');
    if (typeof i < 'u') {
      if (!Object.keys(u).length) return;
      Fl(e, l, a, i, s ? n : null);
      return;
    }
    if (c) for (const f of Object.keys(l)) Vb(e, l, f, t.slice(1));
    for (const [f, h] of Object.entries(u)) {
      const m = f.replace(Rb, '');
      (!o || t.includes(m)) && Fl(e, l, a, h.callable, h.delegationSelector);
    }
  },
  trigger(e, t, n) {
    if (typeof t != 'string' || !e) return null;
    const r = s2(),
      s = f2(t),
      i = t !== s;
    let a = null,
      o = !0,
      l = !0,
      u = !1;
    i && r && ((a = r.Event(t, n)), r(e).trigger(a), (o = !a.isPropagationStopped()), (l = !a.isImmediatePropagationStopped()), (u = a.isDefaultPrevented()));
    const c = hu(
      new Event(t, {
        bubbles: o,
        cancelable: !0,
      }),
      n,
    );
    return u && c.preventDefault(), l && e.dispatchEvent(c), c.defaultPrevented && a && a.preventDefault(), c;
  },
};
function hu(e, t = {}) {
  for (const [n, r] of Object.entries(t))
    try {
      e[n] = r;
    } catch {
      Object.defineProperty(e, n, {
        configurable: !0,
        get() {
          return r;
        },
      });
    }
  return e;
}
function fd(e) {
  if (e === 'true') return !0;
  if (e === 'false') return !1;
  if (e === Number(e).toString()) return Number(e);
  if (e === '' || e === 'null') return null;
  if (typeof e != 'string') return e;
  try {
    return JSON.parse(decodeURIComponent(e));
  } catch {
    return e;
  }
}
function Vo(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const dn = {
  setDataAttribute(e, t, n) {
    e.setAttribute(`data-bs-${Vo(t)}`, n);
  },
  removeDataAttribute(e, t) {
    e.removeAttribute(`data-bs-${Vo(t)}`);
  },
  getDataAttributes(e) {
    if (!e) return {};
    const t = {},
      n = Object.keys(e.dataset).filter((r) => r.startsWith('bs') && !r.startsWith('bsConfig'));
    for (const r of n) {
      let s = r.replace(/^bs/, '');
      (s = s.charAt(0).toLowerCase() + s.slice(1, s.length)), (t[s] = fd(e.dataset[r]));
    }
    return t;
  },
  getDataAttribute(e, t) {
    return fd(e.getAttribute(`data-bs-${Vo(t)}`));
  },
};
class Ei {
  static get Default() {
    return {};
  }
  static get DefaultType() {
    return {};
  }
  static get NAME() {
    throw new Error('You have to implement the static method "NAME", for each component!');
  }
  _getConfig(t) {
    return (t = this._mergeConfigObj(t)), (t = this._configAfterMerge(t)), this._typeCheckConfig(t), t;
  }
  _configAfterMerge(t) {
    return t;
  }
  _mergeConfigObj(t, n) {
    const r = fn(n) ? dn.getDataAttribute(n, 'config') : {};
    return {
      ...this.constructor.Default,
      ...(typeof r == 'object' ? r : {}),
      ...(fn(n) ? dn.getDataAttributes(n) : {}),
      ...(typeof t == 'object' ? t : {}),
    };
  }
  _typeCheckConfig(t, n = this.constructor.DefaultType) {
    for (const [r, s] of Object.entries(n)) {
      const i = t[r],
        a = fn(i) ? 'element' : Ob(i);
      if (!new RegExp(s).test(a)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${r}" provided type "${a}" but expected type "${s}".`);
    }
  }
}
const Fb = '5.3.2';
class Ut extends Ei {
  constructor(t, n) {
    super(), (t = Wn(t)), t && ((this._element = t), (this._config = this._getConfig(n)), Do.set(this._element, this.constructor.DATA_KEY, this));
  }
  dispose() {
    Do.remove(this._element, this.constructor.DATA_KEY), U.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this)) this[t] = null;
  }
  _queueCallback(t, n, r = !0) {
    i2(t, n, r);
  }
  _getConfig(t) {
    return (t = this._mergeConfigObj(t, this._element)), (t = this._configAfterMerge(t)), this._typeCheckConfig(t), t;
  }
  static getInstance(t) {
    return Do.get(Wn(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, n = {}) {
    return this.getInstance(t) || new this(t, typeof n == 'object' ? n : null);
  }
  static get VERSION() {
    return Fb;
  }
  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
  static eventName(t) {
    return `${t}${this.EVENT_KEY}`;
  }
}
const Fo = (e) => {
    let t = e.getAttribute('data-bs-target');
    if (!t || t === '#') {
      let n = e.getAttribute('href');
      if (!n || (!n.includes('#') && !n.startsWith('.'))) return null;
      n.includes('#') && !n.startsWith('#') && (n = `#${n.split('#')[1]}`), (t = n && n !== '#' ? t2(n.trim()) : null);
    }
    return t;
  },
  pe = {
    find(e, t = document.documentElement) {
      return [].concat(...Element.prototype.querySelectorAll.call(t, e));
    },
    findOne(e, t = document.documentElement) {
      return Element.prototype.querySelector.call(t, e);
    },
    children(e, t) {
      return [].concat(...e.children).filter((n) => n.matches(t));
    },
    parents(e, t) {
      const n = [];
      let r = e.parentNode.closest(t);
      for (; r; ) n.push(r), (r = r.parentNode.closest(t));
      return n;
    },
    prev(e, t) {
      let n = e.previousElementSibling;
      for (; n; ) {
        if (n.matches(t)) return [n];
        n = n.previousElementSibling;
      }
      return [];
    },
    next(e, t) {
      let n = e.nextElementSibling;
      for (; n; ) {
        if (n.matches(t)) return [n];
        n = n.nextElementSibling;
      }
      return [];
    },
    focusableChildren(e) {
      const t = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map((n) => `${n}:not([tabindex^="-"])`).join(',');
      return this.find(t, e).filter((n) => !Un(n) && ps(n));
    },
    getSelectorFromElement(e) {
      const t = Fo(e);
      return t && pe.findOne(t) ? t : null;
    },
    getElementFromSelector(e) {
      const t = Fo(e);
      return t ? pe.findOne(t) : null;
    },
    getMultipleElementsFromSelector(e) {
      const t = Fo(e);
      return t ? pe.find(t) : [];
    },
  },
  uo = (e, t = 'hide') => {
    const n = `click.dismiss${e.EVENT_KEY}`,
      r = e.NAME;
    U.on(document, n, `[data-bs-dismiss="${r}"]`, function (s) {
      if ((['A', 'AREA'].includes(this.tagName) && s.preventDefault(), Un(this))) return;
      const i = pe.getElementFromSelector(this) || this.closest(`.${r}`);
      e.getOrCreateInstance(i)[t]();
    });
  },
  Bb = 'alert',
  jb = 'bs.alert',
  d2 = `.${jb}`,
  Wb = `close${d2}`,
  Ub = `closed${d2}`,
  qb = 'fade',
  Kb = 'show';
class fo extends Ut {
  static get NAME() {
    return Bb;
  }
  close() {
    if (U.trigger(this._element, Wb).defaultPrevented) return;
    this._element.classList.remove(Kb);
    const n = this._element.classList.contains(qb);
    this._queueCallback(() => this._destroyElement(), this._element, n);
  }
  _destroyElement() {
    this._element.remove(), U.trigger(this._element, Ub), this.dispose();
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = fo.getOrCreateInstance(this);
      if (typeof t == 'string') {
        if (n[t] === void 0 || t.startsWith('_') || t === 'constructor') throw new TypeError(`No method named "${t}"`);
        n[t](this);
      }
    });
  }
}
uo(fo, 'close');
Dt(fo);
const Gb = 'button',
  Yb = 'bs.button',
  Xb = `.${Yb}`,
  Qb = '.data-api',
  Jb = 'active',
  dd = '[data-bs-toggle="button"]',
  Zb = `click${Xb}${Qb}`;
class ho extends Ut {
  static get NAME() {
    return Gb;
  }
  toggle() {
    this._element.setAttribute('aria-pressed', this._element.classList.toggle(Jb));
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = ho.getOrCreateInstance(this);
      t === 'toggle' && n[t]();
    });
  }
}
U.on(document, Zb, dd, (e) => {
  e.preventDefault();
  const t = e.target.closest(dd);
  ho.getOrCreateInstance(t).toggle();
});
Dt(ho);
const e_ = 'swipe',
  ms = '.bs.swipe',
  t_ = `touchstart${ms}`,
  n_ = `touchmove${ms}`,
  r_ = `touchend${ms}`,
  s_ = `pointerdown${ms}`,
  i_ = `pointerup${ms}`,
  a_ = 'touch',
  o_ = 'pen',
  l_ = 'pointer-event',
  c_ = 40,
  u_ = {
    endCallback: null,
    leftCallback: null,
    rightCallback: null,
  },
  f_ = {
    endCallback: '(function|null)',
    leftCallback: '(function|null)',
    rightCallback: '(function|null)',
  };
class ka extends Ei {
  constructor(t, n) {
    super(), (this._element = t), !(!t || !ka.isSupported()) && ((this._config = this._getConfig(n)), (this._deltaX = 0), (this._supportPointerEvents = !!window.PointerEvent), this._initEvents());
  }
  static get Default() {
    return u_;
  }
  static get DefaultType() {
    return f_;
  }
  static get NAME() {
    return e_;
  }
  dispose() {
    U.off(this._element, ms);
  }
  _start(t) {
    if (!this._supportPointerEvents) {
      this._deltaX = t.touches[0].clientX;
      return;
    }
    this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX);
  }
  _end(t) {
    this._eventIsPointerPenTouch(t) && (this._deltaX = t.clientX - this._deltaX), this._handleSwipe(), mt(this._config.endCallback);
  }
  _move(t) {
    this._deltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[0].clientX - this._deltaX;
  }
  _handleSwipe() {
    const t = Math.abs(this._deltaX);
    if (t <= c_) return;
    const n = t / this._deltaX;
    (this._deltaX = 0), n && mt(n > 0 ? this._config.rightCallback : this._config.leftCallback);
  }
  _initEvents() {
    this._supportPointerEvents
      ? (U.on(this._element, s_, (t) => this._start(t)), U.on(this._element, i_, (t) => this._end(t)), this._element.classList.add(l_))
      : (U.on(this._element, t_, (t) => this._start(t)), U.on(this._element, n_, (t) => this._move(t)), U.on(this._element, r_, (t) => this._end(t)));
  }
  _eventIsPointerPenTouch(t) {
    return this._supportPointerEvents && (t.pointerType === o_ || t.pointerType === a_);
  }
  static isSupported() {
    return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
  }
}
const d_ = 'carousel',
  h_ = 'bs.carousel',
  Xn = `.${h_}`,
  h2 = '.data-api',
  p_ = 'ArrowLeft',
  m_ = 'ArrowRight',
  g_ = 500,
  ys = 'next',
  Ir = 'prev',
  zr = 'left',
  da = 'right',
  v_ = `slide${Xn}`,
  Bo = `slid${Xn}`,
  b_ = `keydown${Xn}`,
  __ = `mouseenter${Xn}`,
  y_ = `mouseleave${Xn}`,
  w_ = `dragstart${Xn}`,
  E_ = `load${Xn}${h2}`,
  x_ = `click${Xn}${h2}`,
  p2 = 'carousel',
  Gi = 'active',
  S_ = 'slide',
  A_ = 'carousel-item-end',
  C_ = 'carousel-item-start',
  T_ = 'carousel-item-next',
  k_ = 'carousel-item-prev',
  m2 = '.active',
  g2 = '.carousel-item',
  $_ = m2 + g2,
  O_ = '.carousel-item img',
  L_ = '.carousel-indicators',
  P_ = '[data-bs-slide], [data-bs-slide-to]',
  I_ = '[data-bs-ride="carousel"]',
  M_ = {
    [p_]: da,
    [m_]: zr,
  },
  N_ = {
    interval: 5e3,
    keyboard: !0,
    pause: 'hover',
    ride: !1,
    touch: !0,
    wrap: !0,
  },
  R_ = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    pause: '(string|boolean)',
    ride: '(boolean|string)',
    touch: 'boolean',
    wrap: 'boolean',
  };
class xi extends Ut {
  constructor(t, n) {
    super(t, n),
      (this._interval = null),
      (this._activeElement = null),
      (this._isSliding = !1),
      (this.touchTimeout = null),
      (this._swipeHelper = null),
      (this._indicatorsElement = pe.findOne(L_, this._element)),
      this._addEventListeners(),
      this._config.ride === p2 && this.cycle();
  }
  static get Default() {
    return N_;
  }
  static get DefaultType() {
    return R_;
  }
  static get NAME() {
    return d_;
  }
  next() {
    this._slide(ys);
  }
  nextWhenVisible() {
    !document.hidden && ps(this._element) && this.next();
  }
  prev() {
    this._slide(Ir);
  }
  pause() {
    this._isSliding && n2(this._element), this._clearInterval();
  }
  cycle() {
    this._clearInterval(), this._updateInterval(), (this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval));
  }
  _maybeEnableCycle() {
    if (this._config.ride) {
      if (this._isSliding) {
        U.one(this._element, Bo, () => this.cycle());
        return;
      }
      this.cycle();
    }
  }
  to(t) {
    const n = this._getItems();
    if (t > n.length - 1 || t < 0) return;
    if (this._isSliding) {
      U.one(this._element, Bo, () => this.to(t));
      return;
    }
    const r = this._getItemIndex(this._getActive());
    if (r === t) return;
    const s = t > r ? ys : Ir;
    this._slide(s, n[t]);
  }
  dispose() {
    this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
  }
  _configAfterMerge(t) {
    return (t.defaultInterval = t.interval), t;
  }
  _addEventListeners() {
    this._config.keyboard && U.on(this._element, b_, (t) => this._keydown(t)),
      this._config.pause === 'hover' && (U.on(this._element, __, () => this.pause()), U.on(this._element, y_, () => this._maybeEnableCycle())),
      this._config.touch && ka.isSupported() && this._addTouchEventListeners();
  }
  _addTouchEventListeners() {
    for (const r of pe.find(O_, this._element)) U.on(r, w_, (s) => s.preventDefault());
    const n = {
      leftCallback: () => this._slide(this._directionToOrder(zr)),
      rightCallback: () => this._slide(this._directionToOrder(da)),
      endCallback: () => {
        this._config.pause === 'hover' &&
          (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), (this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), g_ + this._config.interval)));
      },
    };
    this._swipeHelper = new ka(this._element, n);
  }
  _keydown(t) {
    if (/input|textarea/i.test(t.target.tagName)) return;
    const n = M_[t.key];
    n && (t.preventDefault(), this._slide(this._directionToOrder(n)));
  }
  _getItemIndex(t) {
    return this._getItems().indexOf(t);
  }
  _setActiveIndicatorElement(t) {
    if (!this._indicatorsElement) return;
    const n = pe.findOne(m2, this._indicatorsElement);
    n.classList.remove(Gi), n.removeAttribute('aria-current');
    const r = pe.findOne(`[data-bs-slide-to="${t}"]`, this._indicatorsElement);
    r && (r.classList.add(Gi), r.setAttribute('aria-current', 'true'));
  }
  _updateInterval() {
    const t = this._activeElement || this._getActive();
    if (!t) return;
    const n = Number.parseInt(t.getAttribute('data-bs-interval'), 10);
    this._config.interval = n || this._config.defaultInterval;
  }
  _slide(t, n = null) {
    if (this._isSliding) return;
    const r = this._getActive(),
      s = t === ys,
      i = n || du(this._getItems(), r, s, this._config.wrap);
    if (i === r) return;
    const a = this._getItemIndex(i),
      o = (m) =>
        U.trigger(this._element, m, {
          relatedTarget: i,
          direction: this._orderToDirection(t),
          from: this._getItemIndex(r),
          to: a,
        });
    if (o(v_).defaultPrevented || !r || !i) return;
    const u = !!this._interval;
    this.pause(), (this._isSliding = !0), this._setActiveIndicatorElement(a), (this._activeElement = i);
    const c = s ? C_ : A_,
      f = s ? T_ : k_;
    i.classList.add(f), wi(i), r.classList.add(c), i.classList.add(c);
    const h = () => {
      i.classList.remove(c, f), i.classList.add(Gi), r.classList.remove(Gi, f, c), (this._isSliding = !1), o(Bo);
    };
    this._queueCallback(h, r, this._isAnimated()), u && this.cycle();
  }
  _isAnimated() {
    return this._element.classList.contains(S_);
  }
  _getActive() {
    return pe.findOne($_, this._element);
  }
  _getItems() {
    return pe.find(g2, this._element);
  }
  _clearInterval() {
    this._interval && (clearInterval(this._interval), (this._interval = null));
  }
  _directionToOrder(t) {
    return Nt() ? (t === zr ? Ir : ys) : t === zr ? ys : Ir;
  }
  _orderToDirection(t) {
    return Nt() ? (t === Ir ? zr : da) : t === Ir ? da : zr;
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = xi.getOrCreateInstance(this, t);
      if (typeof t == 'number') {
        n.to(t);
        return;
      }
      if (typeof t == 'string') {
        if (n[t] === void 0 || t.startsWith('_') || t === 'constructor') throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
}
U.on(document, x_, P_, function (e) {
  const t = pe.getElementFromSelector(this);
  if (!t || !t.classList.contains(p2)) return;
  e.preventDefault();
  const n = xi.getOrCreateInstance(t),
    r = this.getAttribute('data-bs-slide-to');
  if (r) {
    n.to(r), n._maybeEnableCycle();
    return;
  }
  if (dn.getDataAttribute(this, 'slide') === 'next') {
    n.next(), n._maybeEnableCycle();
    return;
  }
  n.prev(), n._maybeEnableCycle();
});
U.on(window, E_, () => {
  const e = pe.find(I_);
  for (const t of e) xi.getOrCreateInstance(t);
});
Dt(xi);
const D_ = 'collapse',
  z_ = 'bs.collapse',
  Si = `.${z_}`,
  H_ = '.data-api',
  V_ = `show${Si}`,
  F_ = `shown${Si}`,
  B_ = `hide${Si}`,
  j_ = `hidden${Si}`,
  W_ = `click${Si}${H_}`,
  jo = 'show',
  Wr = 'collapse',
  Yi = 'collapsing',
  U_ = 'collapsed',
  q_ = `:scope .${Wr} .${Wr}`,
  K_ = 'collapse-horizontal',
  G_ = 'width',
  Y_ = 'height',
  X_ = '.collapse.show, .collapse.collapsing',
  Bl = '[data-bs-toggle="collapse"]',
  Q_ = {
    parent: null,
    toggle: !0,
  },
  J_ = {
    parent: '(null|element)',
    toggle: 'boolean',
  };
class ii extends Ut {
  constructor(t, n) {
    super(t, n), (this._isTransitioning = !1), (this._triggerArray = []);
    const r = pe.find(Bl);
    for (const s of r) {
      const i = pe.getSelectorFromElement(s),
        a = pe.find(i).filter((o) => o === this._element);
      i !== null && a.length && this._triggerArray.push(s);
    }
    this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
  }
  static get Default() {
    return Q_;
  }
  static get DefaultType() {
    return J_;
  }
  static get NAME() {
    return D_;
  }
  toggle() {
    this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (this._isTransitioning || this._isShown()) return;
    let t = [];
    if (
      (this._config.parent &&
        (t = this._getFirstLevelChildren(X_)
          .filter((o) => o !== this._element)
          .map((o) =>
            ii.getOrCreateInstance(o, {
              toggle: !1,
            }),
          )),
      (t.length && t[0]._isTransitioning) || U.trigger(this._element, V_).defaultPrevented)
    )
      return;
    for (const o of t) o.hide();
    const r = this._getDimension();
    this._element.classList.remove(Wr), this._element.classList.add(Yi), (this._element.style[r] = 0), this._addAriaAndCollapsedClass(this._triggerArray, !0), (this._isTransitioning = !0);
    const s = () => {
        (this._isTransitioning = !1), this._element.classList.remove(Yi), this._element.classList.add(Wr, jo), (this._element.style[r] = ''), U.trigger(this._element, F_);
      },
      a = `scroll${r[0].toUpperCase() + r.slice(1)}`;
    this._queueCallback(s, this._element, !0), (this._element.style[r] = `${this._element[a]}px`);
  }
  hide() {
    if (this._isTransitioning || !this._isShown() || U.trigger(this._element, B_).defaultPrevented) return;
    const n = this._getDimension();
    (this._element.style[n] = `${this._element.getBoundingClientRect()[n]}px`), wi(this._element), this._element.classList.add(Yi), this._element.classList.remove(Wr, jo);
    for (const s of this._triggerArray) {
      const i = pe.getElementFromSelector(s);
      i && !this._isShown(i) && this._addAriaAndCollapsedClass([s], !1);
    }
    this._isTransitioning = !0;
    const r = () => {
      (this._isTransitioning = !1), this._element.classList.remove(Yi), this._element.classList.add(Wr), U.trigger(this._element, j_);
    };
    (this._element.style[n] = ''), this._queueCallback(r, this._element, !0);
  }
  _isShown(t = this._element) {
    return t.classList.contains(jo);
  }
  _configAfterMerge(t) {
    return (t.toggle = !!t.toggle), (t.parent = Wn(t.parent)), t;
  }
  _getDimension() {
    return this._element.classList.contains(K_) ? G_ : Y_;
  }
  _initializeChildren() {
    if (!this._config.parent) return;
    const t = this._getFirstLevelChildren(Bl);
    for (const n of t) {
      const r = pe.getElementFromSelector(n);
      r && this._addAriaAndCollapsedClass([n], this._isShown(r));
    }
  }
  _getFirstLevelChildren(t) {
    const n = pe.find(q_, this._config.parent);
    return pe.find(t, this._config.parent).filter((r) => !n.includes(r));
  }
  _addAriaAndCollapsedClass(t, n) {
    if (t.length) for (const r of t) r.classList.toggle(U_, !n), r.setAttribute('aria-expanded', n);
  }
  static jQueryInterface(t) {
    const n = {};
    return (
      typeof t == 'string' && /show|hide/.test(t) && (n.toggle = !1),
      this.each(function () {
        const r = ii.getOrCreateInstance(this, n);
        if (typeof t == 'string') {
          if (typeof r[t] > 'u') throw new TypeError(`No method named "${t}"`);
          r[t]();
        }
      })
    );
  }
}
U.on(document, W_, Bl, function (e) {
  (e.target.tagName === 'A' || (e.delegateTarget && e.delegateTarget.tagName === 'A')) && e.preventDefault();
  for (const t of pe.getMultipleElementsFromSelector(this))
    ii.getOrCreateInstance(t, {
      toggle: !1,
    }).toggle();
});
Dt(ii);
const hd = 'dropdown',
  Z_ = 'bs.dropdown',
  Ar = `.${Z_}`,
  pu = '.data-api',
  ey = 'Escape',
  pd = 'Tab',
  ty = 'ArrowUp',
  md = 'ArrowDown',
  ny = 2,
  ry = `hide${Ar}`,
  sy = `hidden${Ar}`,
  iy = `show${Ar}`,
  ay = `shown${Ar}`,
  v2 = `click${Ar}${pu}`,
  b2 = `keydown${Ar}${pu}`,
  oy = `keyup${Ar}${pu}`,
  Hr = 'show',
  ly = 'dropup',
  cy = 'dropend',
  uy = 'dropstart',
  fy = 'dropup-center',
  dy = 'dropdown-center',
  dr = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
  hy = `${dr}.${Hr}`,
  ha = '.dropdown-menu',
  py = '.navbar',
  my = '.navbar-nav',
  gy = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)',
  vy = Nt() ? 'top-end' : 'top-start',
  by = Nt() ? 'top-start' : 'top-end',
  _y = Nt() ? 'bottom-end' : 'bottom-start',
  yy = Nt() ? 'bottom-start' : 'bottom-end',
  wy = Nt() ? 'left-start' : 'right-start',
  Ey = Nt() ? 'right-start' : 'left-start',
  xy = 'top',
  Sy = 'bottom',
  Ay = {
    autoClose: !0,
    boundary: 'clippingParents',
    display: 'dynamic',
    offset: [0, 2],
    popperConfig: null,
    reference: 'toggle',
  },
  Cy = {
    autoClose: '(boolean|string)',
    boundary: '(string|element)',
    display: 'string',
    offset: '(array|string|function)',
    popperConfig: '(null|object|function)',
    reference: '(string|element|object)',
  };
class Mt extends Ut {
  constructor(t, n) {
    super(t, n),
      (this._popper = null),
      (this._parent = this._element.parentNode),
      (this._menu = pe.next(this._element, ha)[0] || pe.prev(this._element, ha)[0] || pe.findOne(ha, this._parent)),
      (this._inNavbar = this._detectNavbar());
  }
  static get Default() {
    return Ay;
  }
  static get DefaultType() {
    return Cy;
  }
  static get NAME() {
    return hd;
  }
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (Un(this._element) || this._isShown()) return;
    const t = {
      relatedTarget: this._element,
    };
    if (!U.trigger(this._element, iy, t).defaultPrevented) {
      if ((this._createPopper(), 'ontouchstart' in document.documentElement && !this._parent.closest(my))) for (const r of [].concat(...document.body.children)) U.on(r, 'mouseover', Ta);
      this._element.focus(), this._element.setAttribute('aria-expanded', !0), this._menu.classList.add(Hr), this._element.classList.add(Hr), U.trigger(this._element, ay, t);
    }
  }
  hide() {
    if (Un(this._element) || !this._isShown()) return;
    const t = {
      relatedTarget: this._element,
    };
    this._completeHide(t);
  }
  dispose() {
    this._popper && this._popper.destroy(), super.dispose();
  }
  update() {
    (this._inNavbar = this._detectNavbar()), this._popper && this._popper.update();
  }
  _completeHide(t) {
    if (!U.trigger(this._element, ry, t).defaultPrevented) {
      if ('ontouchstart' in document.documentElement) for (const r of [].concat(...document.body.children)) U.off(r, 'mouseover', Ta);
      this._popper && this._popper.destroy(),
        this._menu.classList.remove(Hr),
        this._element.classList.remove(Hr),
        this._element.setAttribute('aria-expanded', 'false'),
        dn.removeDataAttribute(this._menu, 'popper'),
        U.trigger(this._element, sy, t);
    }
  }
  _getConfig(t) {
    if (((t = super._getConfig(t)), typeof t.reference == 'object' && !fn(t.reference) && typeof t.reference.getBoundingClientRect != 'function'))
      throw new TypeError(`${hd.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return t;
  }
  _createPopper() {
    if (typeof e2 > 'u') throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    let t = this._element;
    this._config.reference === 'parent'
      ? (t = this._parent)
      : fn(this._config.reference)
        ? (t = Wn(this._config.reference))
        : typeof this._config.reference == 'object' && (t = this._config.reference);
    const n = this._getPopperConfig();
    this._popper = fu(t, this._menu, n);
  }
  _isShown() {
    return this._menu.classList.contains(Hr);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(cy)) return wy;
    if (t.classList.contains(uy)) return Ey;
    if (t.classList.contains(fy)) return xy;
    if (t.classList.contains(dy)) return Sy;
    const n = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
    return t.classList.contains(ly) ? (n ? by : vy) : n ? yy : _y;
  }
  _detectNavbar() {
    return this._element.closest(py) !== null;
  }
  _getOffset() {
    const { offset: t } = this._config;
    return typeof t == 'string' ? t.split(',').map((n) => Number.parseInt(n, 10)) : typeof t == 'function' ? (n) => t(n, this._element) : t;
  }
  _getPopperConfig() {
    const t = {
      placement: this._getPlacement(),
      modifiers: [
        {
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary,
          },
        },
        {
          name: 'offset',
          options: {
            offset: this._getOffset(),
          },
        },
      ],
    };
    return (
      (this._inNavbar || this._config.display === 'static') &&
        (dn.setDataAttribute(this._menu, 'popper', 'static'),
        (t.modifiers = [
          {
            name: 'applyStyles',
            enabled: !1,
          },
        ])),
      {
        ...t,
        ...mt(this._config.popperConfig, [t]),
      }
    );
  }
  _selectMenuItem({ key: t, target: n }) {
    const r = pe.find(gy, this._menu).filter((s) => ps(s));
    r.length && du(r, n, t === md, !r.includes(n)).focus();
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = Mt.getOrCreateInstance(this, t);
      if (typeof t == 'string') {
        if (typeof n[t] > 'u') throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
  static clearMenus(t) {
    if (t.button === ny || (t.type === 'keyup' && t.key !== pd)) return;
    const n = pe.find(hy);
    for (const r of n) {
      const s = Mt.getInstance(r);
      if (!s || s._config.autoClose === !1) continue;
      const i = t.composedPath(),
        a = i.includes(s._menu);
      if (
        i.includes(s._element) ||
        (s._config.autoClose === 'inside' && !a) ||
        (s._config.autoClose === 'outside' && a) ||
        (s._menu.contains(t.target) && ((t.type === 'keyup' && t.key === pd) || /input|select|option|textarea|form/i.test(t.target.tagName)))
      )
        continue;
      const o = {
        relatedTarget: s._element,
      };
      t.type === 'click' && (o.clickEvent = t), s._completeHide(o);
    }
  }
  static dataApiKeydownHandler(t) {
    const n = /input|textarea/i.test(t.target.tagName),
      r = t.key === ey,
      s = [ty, md].includes(t.key);
    if ((!s && !r) || (n && !r)) return;
    t.preventDefault();
    const i = this.matches(dr) ? this : pe.prev(this, dr)[0] || pe.next(this, dr)[0] || pe.findOne(dr, t.delegateTarget.parentNode),
      a = Mt.getOrCreateInstance(i);
    if (s) {
      t.stopPropagation(), a.show(), a._selectMenuItem(t);
      return;
    }
    a._isShown() && (t.stopPropagation(), a.hide(), i.focus());
  }
}
U.on(document, b2, dr, Mt.dataApiKeydownHandler);
U.on(document, b2, ha, Mt.dataApiKeydownHandler);
U.on(document, v2, Mt.clearMenus);
U.on(document, oy, Mt.clearMenus);
U.on(document, v2, dr, function (e) {
  e.preventDefault(), Mt.getOrCreateInstance(this).toggle();
});
Dt(Mt);
const _2 = 'backdrop',
  Ty = 'fade',
  gd = 'show',
  vd = `mousedown.bs.${_2}`,
  ky = {
    className: 'modal-backdrop',
    clickCallback: null,
    isAnimated: !1,
    isVisible: !0,
    rootElement: 'body',
  },
  $y = {
    className: 'string',
    clickCallback: '(function|null)',
    isAnimated: 'boolean',
    isVisible: 'boolean',
    rootElement: '(element|string)',
  };
class y2 extends Ei {
  constructor(t) {
    super(), (this._config = this._getConfig(t)), (this._isAppended = !1), (this._element = null);
  }
  static get Default() {
    return ky;
  }
  static get DefaultType() {
    return $y;
  }
  static get NAME() {
    return _2;
  }
  show(t) {
    if (!this._config.isVisible) {
      mt(t);
      return;
    }
    this._append();
    const n = this._getElement();
    this._config.isAnimated && wi(n),
      n.classList.add(gd),
      this._emulateAnimation(() => {
        mt(t);
      });
  }
  hide(t) {
    if (!this._config.isVisible) {
      mt(t);
      return;
    }
    this._getElement().classList.remove(gd),
      this._emulateAnimation(() => {
        this.dispose(), mt(t);
      });
  }
  dispose() {
    this._isAppended && (U.off(this._element, vd), this._element.remove(), (this._isAppended = !1));
  }
  _getElement() {
    if (!this._element) {
      const t = document.createElement('div');
      (t.className = this._config.className), this._config.isAnimated && t.classList.add(Ty), (this._element = t);
    }
    return this._element;
  }
  _configAfterMerge(t) {
    return (t.rootElement = Wn(t.rootElement)), t;
  }
  _append() {
    if (this._isAppended) return;
    const t = this._getElement();
    this._config.rootElement.append(t),
      U.on(t, vd, () => {
        mt(this._config.clickCallback);
      }),
      (this._isAppended = !0);
  }
  _emulateAnimation(t) {
    i2(t, this._getElement(), this._config.isAnimated);
  }
}
const Oy = 'focustrap',
  Ly = 'bs.focustrap',
  $a = `.${Ly}`,
  Py = `focusin${$a}`,
  Iy = `keydown.tab${$a}`,
  My = 'Tab',
  Ny = 'forward',
  bd = 'backward',
  Ry = {
    autofocus: !0,
    trapElement: null,
  },
  Dy = {
    autofocus: 'boolean',
    trapElement: 'element',
  };
class w2 extends Ei {
  constructor(t) {
    super(), (this._config = this._getConfig(t)), (this._isActive = !1), (this._lastTabNavDirection = null);
  }
  static get Default() {
    return Ry;
  }
  static get DefaultType() {
    return Dy;
  }
  static get NAME() {
    return Oy;
  }
  activate() {
    this._isActive ||
      (this._config.autofocus && this._config.trapElement.focus(),
      U.off(document, $a),
      U.on(document, Py, (t) => this._handleFocusin(t)),
      U.on(document, Iy, (t) => this._handleKeydown(t)),
      (this._isActive = !0));
  }
  deactivate() {
    this._isActive && ((this._isActive = !1), U.off(document, $a));
  }
  _handleFocusin(t) {
    const { trapElement: n } = this._config;
    if (t.target === document || t.target === n || n.contains(t.target)) return;
    const r = pe.focusableChildren(n);
    r.length === 0 ? n.focus() : this._lastTabNavDirection === bd ? r[r.length - 1].focus() : r[0].focus();
  }
  _handleKeydown(t) {
    t.key === My && (this._lastTabNavDirection = t.shiftKey ? bd : Ny);
  }
}
const _d = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
  yd = '.sticky-top',
  Xi = 'padding-right',
  wd = 'margin-right';
class jl {
  constructor() {
    this._element = document.body;
  }
  getWidth() {
    const t = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - t);
  }
  hide() {
    const t = this.getWidth();
    this._disableOverFlow(), this._setElementAttributes(this._element, Xi, (n) => n + t), this._setElementAttributes(_d, Xi, (n) => n + t), this._setElementAttributes(yd, wd, (n) => n - t);
  }
  reset() {
    this._resetElementAttributes(this._element, 'overflow'), this._resetElementAttributes(this._element, Xi), this._resetElementAttributes(_d, Xi), this._resetElementAttributes(yd, wd);
  }
  isOverflowing() {
    return this.getWidth() > 0;
  }
  _disableOverFlow() {
    this._saveInitialAttribute(this._element, 'overflow'), (this._element.style.overflow = 'hidden');
  }
  _setElementAttributes(t, n, r) {
    const s = this.getWidth(),
      i = (a) => {
        if (a !== this._element && window.innerWidth > a.clientWidth + s) return;
        this._saveInitialAttribute(a, n);
        const o = window.getComputedStyle(a).getPropertyValue(n);
        a.style.setProperty(n, `${r(Number.parseFloat(o))}px`);
      };
    this._applyManipulationCallback(t, i);
  }
  _saveInitialAttribute(t, n) {
    const r = t.style.getPropertyValue(n);
    r && dn.setDataAttribute(t, n, r);
  }
  _resetElementAttributes(t, n) {
    const r = (s) => {
      const i = dn.getDataAttribute(s, n);
      if (i === null) {
        s.style.removeProperty(n);
        return;
      }
      dn.removeDataAttribute(s, n), s.style.setProperty(n, i);
    };
    this._applyManipulationCallback(t, r);
  }
  _applyManipulationCallback(t, n) {
    if (fn(t)) {
      n(t);
      return;
    }
    for (const r of pe.find(t, this._element)) n(r);
  }
}
const zy = 'modal',
  Hy = 'bs.modal',
  Rt = `.${Hy}`,
  Vy = '.data-api',
  Fy = 'Escape',
  By = `hide${Rt}`,
  jy = `hidePrevented${Rt}`,
  E2 = `hidden${Rt}`,
  x2 = `show${Rt}`,
  Wy = `shown${Rt}`,
  Uy = `resize${Rt}`,
  qy = `click.dismiss${Rt}`,
  Ky = `mousedown.dismiss${Rt}`,
  Gy = `keydown.dismiss${Rt}`,
  Yy = `click${Rt}${Vy}`,
  Ed = 'modal-open',
  Xy = 'fade',
  xd = 'show',
  Wo = 'modal-static',
  Qy = '.modal.show',
  Jy = '.modal-dialog',
  Zy = '.modal-body',
  e6 = '[data-bs-toggle="modal"]',
  t6 = {
    backdrop: !0,
    focus: !0,
    keyboard: !0,
  },
  n6 = {
    backdrop: '(boolean|string)',
    focus: 'boolean',
    keyboard: 'boolean',
  };
let ai = class S2 extends Ut {
  constructor(t, n) {
    super(t, n),
      (this._dialog = pe.findOne(Jy, this._element)),
      (this._backdrop = this._initializeBackDrop()),
      (this._focustrap = this._initializeFocusTrap()),
      (this._isShown = !1),
      (this._isTransitioning = !1),
      (this._scrollBar = new jl()),
      this._addEventListeners();
  }
  static get Default() {
    return t6;
  }
  static get DefaultType() {
    return n6;
  }
  static get NAME() {
    return zy;
  }
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    this._isShown ||
      this._isTransitioning ||
      U.trigger(this._element, x2, {
        relatedTarget: t,
      }).defaultPrevented ||
      ((this._isShown = !0), (this._isTransitioning = !0), this._scrollBar.hide(), document.body.classList.add(Ed), this._adjustDialog(), this._backdrop.show(() => this._showElement(t)));
  }
  hide() {
    !this._isShown ||
      this._isTransitioning ||
      U.trigger(this._element, By).defaultPrevented ||
      ((this._isShown = !1),
      (this._isTransitioning = !0),
      this._focustrap.deactivate(),
      this._element.classList.remove(xd),
      this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
  }
  dispose() {
    U.off(window, Rt), U.off(this._dialog, Rt), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  handleUpdate() {
    this._adjustDialog();
  }
  _initializeBackDrop() {
    return new y2({
      isVisible: !!this._config.backdrop,
      isAnimated: this._isAnimated(),
    });
  }
  _initializeFocusTrap() {
    return new w2({
      trapElement: this._element,
    });
  }
  _showElement(t) {
    document.body.contains(this._element) || document.body.append(this._element),
      (this._element.style.display = 'block'),
      this._element.removeAttribute('aria-hidden'),
      this._element.setAttribute('aria-modal', !0),
      this._element.setAttribute('role', 'dialog'),
      (this._element.scrollTop = 0);
    const n = pe.findOne(Zy, this._dialog);
    n && (n.scrollTop = 0), wi(this._element), this._element.classList.add(xd);
    const r = () => {
      this._config.focus && this._focustrap.activate(),
        (this._isTransitioning = !1),
        U.trigger(this._element, Wy, {
          relatedTarget: t,
        });
    };
    this._queueCallback(r, this._dialog, this._isAnimated());
  }
  _addEventListeners() {
    U.on(this._element, Gy, (t) => {
      if (t.key === Fy) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        this._triggerBackdropTransition();
      }
    }),
      U.on(window, Uy, () => {
        this._isShown && !this._isTransitioning && this._adjustDialog();
      }),
      U.on(this._element, Ky, (t) => {
        U.one(this._element, qy, (n) => {
          if (!(this._element !== t.target || this._element !== n.target)) {
            if (this._config.backdrop === 'static') {
              this._triggerBackdropTransition();
              return;
            }
            this._config.backdrop && this.hide();
          }
        });
      });
  }
  _hideModal() {
    (this._element.style.display = 'none'),
      this._element.setAttribute('aria-hidden', !0),
      this._element.removeAttribute('aria-modal'),
      this._element.removeAttribute('role'),
      (this._isTransitioning = !1),
      this._backdrop.hide(() => {
        document.body.classList.remove(Ed), this._resetAdjustments(), this._scrollBar.reset(), U.trigger(this._element, E2);
      });
  }
  _isAnimated() {
    return this._element.classList.contains(Xy);
  }
  _triggerBackdropTransition() {
    if (U.trigger(this._element, jy).defaultPrevented) return;
    const n = this._element.scrollHeight > document.documentElement.clientHeight,
      r = this._element.style.overflowY;
    r === 'hidden' ||
      this._element.classList.contains(Wo) ||
      (n || (this._element.style.overflowY = 'hidden'),
      this._element.classList.add(Wo),
      this._queueCallback(() => {
        this._element.classList.remove(Wo),
          this._queueCallback(() => {
            this._element.style.overflowY = r;
          }, this._dialog);
      }, this._dialog),
      this._element.focus());
  }
  _adjustDialog() {
    const t = this._element.scrollHeight > document.documentElement.clientHeight,
      n = this._scrollBar.getWidth(),
      r = n > 0;
    if (r && !t) {
      const s = Nt() ? 'paddingLeft' : 'paddingRight';
      this._element.style[s] = `${n}px`;
    }
    if (!r && t) {
      const s = Nt() ? 'paddingRight' : 'paddingLeft';
      this._element.style[s] = `${n}px`;
    }
  }
  _resetAdjustments() {
    (this._element.style.paddingLeft = ''), (this._element.style.paddingRight = '');
  }
  static jQueryInterface(t, n) {
    return this.each(function () {
      const r = S2.getOrCreateInstance(this, t);
      if (typeof t == 'string') {
        if (typeof r[t] > 'u') throw new TypeError(`No method named "${t}"`);
        r[t](n);
      }
    });
  }
};
U.on(document, Yy, e6, function (e) {
  const t = pe.getElementFromSelector(this);
  ['A', 'AREA'].includes(this.tagName) && e.preventDefault(),
    U.one(t, x2, (s) => {
      s.defaultPrevented ||
        U.one(t, E2, () => {
          ps(this) && this.focus();
        });
    });
  const n = pe.findOne(Qy);
  n && ai.getInstance(n).hide(), ai.getOrCreateInstance(t).toggle(this);
});
uo(ai);
Dt(ai);
const r6 = 'offcanvas',
  s6 = 'bs.offcanvas',
  En = `.${s6}`,
  A2 = '.data-api',
  i6 = `load${En}${A2}`,
  a6 = 'Escape',
  Sd = 'show',
  Ad = 'showing',
  Cd = 'hiding',
  o6 = 'offcanvas-backdrop',
  C2 = '.offcanvas.show',
  l6 = `show${En}`,
  c6 = `shown${En}`,
  u6 = `hide${En}`,
  Td = `hidePrevented${En}`,
  T2 = `hidden${En}`,
  f6 = `resize${En}`,
  d6 = `click${En}${A2}`,
  h6 = `keydown.dismiss${En}`,
  p6 = '[data-bs-toggle="offcanvas"]',
  m6 = {
    backdrop: !0,
    keyboard: !0,
    scroll: !1,
  },
  g6 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    scroll: 'boolean',
  };
class bn extends Ut {
  constructor(t, n) {
    super(t, n), (this._isShown = !1), (this._backdrop = this._initializeBackDrop()), (this._focustrap = this._initializeFocusTrap()), this._addEventListeners();
  }
  static get Default() {
    return m6;
  }
  static get DefaultType() {
    return g6;
  }
  static get NAME() {
    return r6;
  }
  toggle(t) {
    return this._isShown ? this.hide() : this.show(t);
  }
  show(t) {
    if (
      this._isShown ||
      U.trigger(this._element, l6, {
        relatedTarget: t,
      }).defaultPrevented
    )
      return;
    (this._isShown = !0),
      this._backdrop.show(),
      this._config.scroll || new jl().hide(),
      this._element.setAttribute('aria-modal', !0),
      this._element.setAttribute('role', 'dialog'),
      this._element.classList.add(Ad);
    const r = () => {
      (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(),
        this._element.classList.add(Sd),
        this._element.classList.remove(Ad),
        U.trigger(this._element, c6, {
          relatedTarget: t,
        });
    };
    this._queueCallback(r, this._element, !0);
  }
  hide() {
    if (!this._isShown || U.trigger(this._element, u6).defaultPrevented) return;
    this._focustrap.deactivate(), this._element.blur(), (this._isShown = !1), this._element.classList.add(Cd), this._backdrop.hide();
    const n = () => {
      this._element.classList.remove(Sd, Cd), this._element.removeAttribute('aria-modal'), this._element.removeAttribute('role'), this._config.scroll || new jl().reset(), U.trigger(this._element, T2);
    };
    this._queueCallback(n, this._element, !0);
  }
  dispose() {
    this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
  }
  _initializeBackDrop() {
    const t = () => {
        if (this._config.backdrop === 'static') {
          U.trigger(this._element, Td);
          return;
        }
        this.hide();
      },
      n = !!this._config.backdrop;
    return new y2({
      className: o6,
      isVisible: n,
      isAnimated: !0,
      rootElement: this._element.parentNode,
      clickCallback: n ? t : null,
    });
  }
  _initializeFocusTrap() {
    return new w2({
      trapElement: this._element,
    });
  }
  _addEventListeners() {
    U.on(this._element, h6, (t) => {
      if (t.key === a6) {
        if (this._config.keyboard) {
          this.hide();
          return;
        }
        U.trigger(this._element, Td);
      }
    });
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = bn.getOrCreateInstance(this, t);
      if (typeof t == 'string') {
        if (n[t] === void 0 || t.startsWith('_') || t === 'constructor') throw new TypeError(`No method named "${t}"`);
        n[t](this);
      }
    });
  }
}
U.on(document, d6, p6, function (e) {
  const t = pe.getElementFromSelector(this);
  if ((['A', 'AREA'].includes(this.tagName) && e.preventDefault(), Un(this))) return;
  U.one(t, T2, () => {
    ps(this) && this.focus();
  });
  const n = pe.findOne(C2);
  n && n !== t && bn.getInstance(n).hide(), bn.getOrCreateInstance(t).toggle(this);
});
U.on(window, i6, () => {
  for (const e of pe.find(C2)) bn.getOrCreateInstance(e).show();
});
U.on(window, f6, () => {
  for (const e of pe.find('[aria-modal][class*=show][class*=offcanvas-]')) getComputedStyle(e).position !== 'fixed' && bn.getOrCreateInstance(e).hide();
});
uo(bn);
Dt(bn);
const v6 = /^aria-[\w-]*$/i,
  k2 = {
    '*': ['class', 'dir', 'id', 'lang', 'role', v6],
    'a': ['target', 'href', 'title', 'rel'],
    'area': [],
    'b': [],
    'br': [],
    'col': [],
    'code': [],
    'div': [],
    'em': [],
    'hr': [],
    'h1': [],
    'h2': [],
    'h3': [],
    'h4': [],
    'h5': [],
    'h6': [],
    'i': [],
    'img': ['src', 'srcset', 'alt', 'title', 'width', 'height'],
    'li': [],
    'ol': [],
    'p': [],
    'pre': [],
    's': [],
    'small': [],
    'span': [],
    'sub': [],
    'sup': [],
    'strong': [],
    'u': [],
    'ul': [],
  },
  b6 = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']),
  _6 = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
  y6 = (e, t) => {
    const n = e.nodeName.toLowerCase();
    return t.includes(n) ? (b6.has(n) ? !!_6.test(e.nodeValue) : !0) : t.filter((r) => r instanceof RegExp).some((r) => r.test(n));
  };
function w6(e, t, n) {
  if (!e.length) return e;
  if (n && typeof n == 'function') return n(e);
  const s = new window.DOMParser().parseFromString(e, 'text/html'),
    i = [].concat(...s.body.querySelectorAll('*'));
  for (const a of i) {
    const o = a.nodeName.toLowerCase();
    if (!Object.keys(t).includes(o)) {
      a.remove();
      continue;
    }
    const l = [].concat(...a.attributes),
      u = [].concat(t['*'] || [], t[o] || []);
    for (const c of l) y6(c, u) || a.removeAttribute(c.nodeName);
  }
  return s.body.innerHTML;
}
const E6 = 'TemplateFactory',
  x6 = {
    allowList: k2,
    content: {},
    extraClass: '',
    html: !1,
    sanitize: !0,
    sanitizeFn: null,
    template: '<div></div>',
  },
  S6 = {
    allowList: 'object',
    content: 'object',
    extraClass: '(string|function)',
    html: 'boolean',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    template: 'string',
  },
  A6 = {
    entry: '(string|element|function|null)',
    selector: '(string|element)',
  };
class C6 extends Ei {
  constructor(t) {
    super(), (this._config = this._getConfig(t));
  }
  static get Default() {
    return x6;
  }
  static get DefaultType() {
    return S6;
  }
  static get NAME() {
    return E6;
  }
  getContent() {
    return Object.values(this._config.content)
      .map((t) => this._resolvePossibleFunction(t))
      .filter(Boolean);
  }
  hasContent() {
    return this.getContent().length > 0;
  }
  changeContent(t) {
    return (
      this._checkContent(t),
      (this._config.content = {
        ...this._config.content,
        ...t,
      }),
      this
    );
  }
  toHtml() {
    const t = document.createElement('div');
    t.innerHTML = this._maybeSanitize(this._config.template);
    for (const [s, i] of Object.entries(this._config.content)) this._setContent(t, i, s);
    const n = t.children[0],
      r = this._resolvePossibleFunction(this._config.extraClass);
    return r && n.classList.add(...r.split(' ')), n;
  }
  _typeCheckConfig(t) {
    super._typeCheckConfig(t), this._checkContent(t.content);
  }
  _checkContent(t) {
    for (const [n, r] of Object.entries(t))
      super._typeCheckConfig(
        {
          selector: n,
          entry: r,
        },
        A6,
      );
  }
  _setContent(t, n, r) {
    const s = pe.findOne(r, t);
    if (s) {
      if (((n = this._resolvePossibleFunction(n)), !n)) {
        s.remove();
        return;
      }
      if (fn(n)) {
        this._putElementInTemplate(Wn(n), s);
        return;
      }
      if (this._config.html) {
        s.innerHTML = this._maybeSanitize(n);
        return;
      }
      s.textContent = n;
    }
  }
  _maybeSanitize(t) {
    return this._config.sanitize ? w6(t, this._config.allowList, this._config.sanitizeFn) : t;
  }
  _resolvePossibleFunction(t) {
    return mt(t, [this]);
  }
  _putElementInTemplate(t, n) {
    if (this._config.html) {
      (n.innerHTML = ''), n.append(t);
      return;
    }
    n.textContent = t.textContent;
  }
}
const T6 = 'tooltip',
  k6 = new Set(['sanitize', 'allowList', 'sanitizeFn']),
  Uo = 'fade',
  $6 = 'modal',
  Qi = 'show',
  O6 = '.tooltip-inner',
  kd = `.${$6}`,
  $d = 'hide.bs.modal',
  ws = 'hover',
  qo = 'focus',
  L6 = 'click',
  P6 = 'manual',
  I6 = 'hide',
  M6 = 'hidden',
  N6 = 'show',
  R6 = 'shown',
  D6 = 'inserted',
  z6 = 'click',
  H6 = 'focusin',
  V6 = 'focusout',
  F6 = 'mouseenter',
  B6 = 'mouseleave',
  j6 = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: Nt() ? 'left' : 'right',
    BOTTOM: 'bottom',
    LEFT: Nt() ? 'right' : 'left',
  },
  W6 = {
    allowList: k2,
    animation: !0,
    boundary: 'clippingParents',
    container: !1,
    customClass: '',
    delay: 0,
    fallbackPlacements: ['top', 'right', 'bottom', 'left'],
    html: !1,
    offset: [0, 6],
    placement: 'top',
    popperConfig: null,
    sanitize: !0,
    sanitizeFn: null,
    selector: !1,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    title: '',
    trigger: 'hover focus',
  },
  U6 = {
    allowList: 'object',
    animation: 'boolean',
    boundary: '(string|element)',
    container: '(string|element|boolean)',
    customClass: '(string|function)',
    delay: '(number|object)',
    fallbackPlacements: 'array',
    html: 'boolean',
    offset: '(array|string|function)',
    placement: '(string|function)',
    popperConfig: '(null|object|function)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    selector: '(string|boolean)',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
  };
class en extends Ut {
  constructor(t, n) {
    if (typeof e2 > 'u') throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
    super(t, n),
      (this._isEnabled = !0),
      (this._timeout = 0),
      (this._isHovered = null),
      (this._activeTrigger = {}),
      (this._popper = null),
      (this._templateFactory = null),
      (this._newContent = null),
      (this.tip = null),
      this._setListeners(),
      this._config.selector || this._fixTitle();
  }
  static get Default() {
    return W6;
  }
  static get DefaultType() {
    return U6;
  }
  static get NAME() {
    return T6;
  }
  enable() {
    this._isEnabled = !0;
  }
  disable() {
    this._isEnabled = !1;
  }
  toggleEnabled() {
    this._isEnabled = !this._isEnabled;
  }
  toggle() {
    if (this._isEnabled) {
      if (((this._activeTrigger.click = !this._activeTrigger.click), this._isShown())) {
        this._leave();
        return;
      }
      this._enter();
    }
  }
  dispose() {
    clearTimeout(this._timeout),
      U.off(this._element.closest(kd), $d, this._hideModalHandler),
      this._element.getAttribute('data-bs-original-title') && this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title')),
      this._disposePopper(),
      super.dispose();
  }
  show() {
    if (this._element.style.display === 'none') throw new Error('Please use show on visible elements');
    if (!(this._isWithContent() && this._isEnabled)) return;
    const t = U.trigger(this._element, this.constructor.eventName(N6)),
      r = (r2(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
    if (t.defaultPrevented || !r) return;
    this._disposePopper();
    const s = this._getTipElement();
    this._element.setAttribute('aria-describedby', s.getAttribute('id'));
    const { container: i } = this._config;
    if (
      (this._element.ownerDocument.documentElement.contains(this.tip) || (i.append(s), U.trigger(this._element, this.constructor.eventName(D6))),
      (this._popper = this._createPopper(s)),
      s.classList.add(Qi),
      'ontouchstart' in document.documentElement)
    )
      for (const o of [].concat(...document.body.children)) U.on(o, 'mouseover', Ta);
    const a = () => {
      U.trigger(this._element, this.constructor.eventName(R6)), this._isHovered === !1 && this._leave(), (this._isHovered = !1);
    };
    this._queueCallback(a, this.tip, this._isAnimated());
  }
  hide() {
    if (!this._isShown() || U.trigger(this._element, this.constructor.eventName(I6)).defaultPrevented) return;
    if ((this._getTipElement().classList.remove(Qi), 'ontouchstart' in document.documentElement)) for (const s of [].concat(...document.body.children)) U.off(s, 'mouseover', Ta);
    (this._activeTrigger[L6] = !1), (this._activeTrigger[qo] = !1), (this._activeTrigger[ws] = !1), (this._isHovered = null);
    const r = () => {
      this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute('aria-describedby'), U.trigger(this._element, this.constructor.eventName(M6)));
    };
    this._queueCallback(r, this.tip, this._isAnimated());
  }
  update() {
    this._popper && this._popper.update();
  }
  _isWithContent() {
    return !!this._getTitle();
  }
  _getTipElement() {
    return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip;
  }
  _createTipElement(t) {
    const n = this._getTemplateFactory(t).toHtml();
    if (!n) return null;
    n.classList.remove(Uo, Qi), n.classList.add(`bs-${this.constructor.NAME}-auto`);
    const r = Lb(this.constructor.NAME).toString();
    return n.setAttribute('id', r), this._isAnimated() && n.classList.add(Uo), n;
  }
  setContent(t) {
    (this._newContent = t), this._isShown() && (this._disposePopper(), this.show());
  }
  _getTemplateFactory(t) {
    return (
      this._templateFactory
        ? this._templateFactory.changeContent(t)
        : (this._templateFactory = new C6({
            ...this._config,
            content: t,
            extraClass: this._resolvePossibleFunction(this._config.customClass),
          })),
      this._templateFactory
    );
  }
  _getContentForTemplate() {
    return {
      [O6]: this._getTitle(),
    };
  }
  _getTitle() {
    return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
  }
  _initializeOnDelegatedTarget(t) {
    return this.constructor.getOrCreateInstance(t.delegateTarget, this._getDelegateConfig());
  }
  _isAnimated() {
    return this._config.animation || (this.tip && this.tip.classList.contains(Uo));
  }
  _isShown() {
    return this.tip && this.tip.classList.contains(Qi);
  }
  _createPopper(t) {
    const n = mt(this._config.placement, [this, t, this._element]),
      r = j6[n.toUpperCase()];
    return fu(this._element, t, this._getPopperConfig(r));
  }
  _getOffset() {
    const { offset: t } = this._config;
    return typeof t == 'string' ? t.split(',').map((n) => Number.parseInt(n, 10)) : typeof t == 'function' ? (n) => t(n, this._element) : t;
  }
  _resolvePossibleFunction(t) {
    return mt(t, [this._element]);
  }
  _getPopperConfig(t) {
    const n = {
      placement: t,
      modifiers: [
        {
          name: 'flip',
          options: {
            fallbackPlacements: this._config.fallbackPlacements,
          },
        },
        {
          name: 'offset',
          options: {
            offset: this._getOffset(),
          },
        },
        {
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary,
          },
        },
        {
          name: 'arrow',
          options: {
            element: `.${this.constructor.NAME}-arrow`,
          },
        },
        {
          name: 'preSetPlacement',
          enabled: !0,
          phase: 'beforeMain',
          fn: (r) => {
            this._getTipElement().setAttribute('data-popper-placement', r.state.placement);
          },
        },
      ],
    };
    return {
      ...n,
      ...mt(this._config.popperConfig, [n]),
    };
  }
  _setListeners() {
    const t = this._config.trigger.split(' ');
    for (const n of t)
      if (n === 'click')
        U.on(this._element, this.constructor.eventName(z6), this._config.selector, (r) => {
          this._initializeOnDelegatedTarget(r).toggle();
        });
      else if (n !== P6) {
        const r = n === ws ? this.constructor.eventName(F6) : this.constructor.eventName(H6),
          s = n === ws ? this.constructor.eventName(B6) : this.constructor.eventName(V6);
        U.on(this._element, r, this._config.selector, (i) => {
          const a = this._initializeOnDelegatedTarget(i);
          (a._activeTrigger[i.type === 'focusin' ? qo : ws] = !0), a._enter();
        }),
          U.on(this._element, s, this._config.selector, (i) => {
            const a = this._initializeOnDelegatedTarget(i);
            (a._activeTrigger[i.type === 'focusout' ? qo : ws] = a._element.contains(i.relatedTarget)), a._leave();
          });
      }
    (this._hideModalHandler = () => {
      this._element && this.hide();
    }),
      U.on(this._element.closest(kd), $d, this._hideModalHandler);
  }
  _fixTitle() {
    const t = this._element.getAttribute('title');
    t &&
      (!this._element.getAttribute('aria-label') && !this._element.textContent.trim() && this._element.setAttribute('aria-label', t),
      this._element.setAttribute('data-bs-original-title', t),
      this._element.removeAttribute('title'));
  }
  _enter() {
    if (this._isShown() || this._isHovered) {
      this._isHovered = !0;
      return;
    }
    (this._isHovered = !0),
      this._setTimeout(() => {
        this._isHovered && this.show();
      }, this._config.delay.show);
  }
  _leave() {
    this._isWithActiveTrigger() ||
      ((this._isHovered = !1),
      this._setTimeout(() => {
        this._isHovered || this.hide();
      }, this._config.delay.hide));
  }
  _setTimeout(t, n) {
    clearTimeout(this._timeout), (this._timeout = setTimeout(t, n));
  }
  _isWithActiveTrigger() {
    return Object.values(this._activeTrigger).includes(!0);
  }
  _getConfig(t) {
    const n = dn.getDataAttributes(this._element);
    for (const r of Object.keys(n)) k6.has(r) && delete n[r];
    return (
      (t = {
        ...n,
        ...(typeof t == 'object' && t ? t : {}),
      }),
      (t = this._mergeConfigObj(t)),
      (t = this._configAfterMerge(t)),
      this._typeCheckConfig(t),
      t
    );
  }
  _configAfterMerge(t) {
    return (
      (t.container = t.container === !1 ? document.body : Wn(t.container)),
      typeof t.delay == 'number' &&
        (t.delay = {
          show: t.delay,
          hide: t.delay,
        }),
      typeof t.title == 'number' && (t.title = t.title.toString()),
      typeof t.content == 'number' && (t.content = t.content.toString()),
      t
    );
  }
  _getDelegateConfig() {
    const t = {};
    for (const [n, r] of Object.entries(this._config)) this.constructor.Default[n] !== r && (t[n] = r);
    return (t.selector = !1), (t.trigger = 'manual'), t;
  }
  _disposePopper() {
    this._popper && (this._popper.destroy(), (this._popper = null)), this.tip && (this.tip.remove(), (this.tip = null));
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = en.getOrCreateInstance(this, t);
      if (typeof t == 'string') {
        if (typeof n[t] > 'u') throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
}
Dt(en);
const q6 = 'popover',
  K6 = '.popover-header',
  G6 = '.popover-body',
  Y6 = {
    ...en.Default,
    content: '',
    offset: [0, 8],
    placement: 'right',
    template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    trigger: 'click',
  },
  X6 = {
    ...en.DefaultType,
    content: '(null|string|element|function)',
  };
class mu extends en {
  static get Default() {
    return Y6;
  }
  static get DefaultType() {
    return X6;
  }
  static get NAME() {
    return q6;
  }
  _isWithContent() {
    return this._getTitle() || this._getContent();
  }
  _getContentForTemplate() {
    return {
      [K6]: this._getTitle(),
      [G6]: this._getContent(),
    };
  }
  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = mu.getOrCreateInstance(this, t);
      if (typeof t == 'string') {
        if (typeof n[t] > 'u') throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
}
Dt(mu);
const Q6 = 'scrollspy',
  J6 = 'bs.scrollspy',
  gu = `.${J6}`,
  Z6 = '.data-api',
  e5 = `activate${gu}`,
  Od = `click${gu}`,
  t5 = `load${gu}${Z6}`,
  n5 = 'dropdown-item',
  Mr = 'active',
  r5 = '[data-bs-spy="scroll"]',
  Ko = '[href]',
  s5 = '.nav, .list-group',
  Ld = '.nav-link',
  i5 = '.nav-item',
  a5 = '.list-group-item',
  o5 = `${Ld}, ${i5} > ${Ld}, ${a5}`,
  l5 = '.dropdown',
  c5 = '.dropdown-toggle',
  u5 = {
    offset: null,
    rootMargin: '0px 0px -25%',
    smoothScroll: !1,
    target: null,
    threshold: [0.1, 0.5, 1],
  },
  f5 = {
    offset: '(number|null)',
    rootMargin: 'string',
    smoothScroll: 'boolean',
    target: 'element',
    threshold: 'array',
  };
class po extends Ut {
  constructor(t, n) {
    super(t, n),
      (this._targetLinks = new Map()),
      (this._observableSections = new Map()),
      (this._rootElement = getComputedStyle(this._element).overflowY === 'visible' ? null : this._element),
      (this._activeTarget = null),
      (this._observer = null),
      (this._previousScrollData = {
        visibleEntryTop: 0,
        parentScrollTop: 0,
      }),
      this.refresh();
  }
  static get Default() {
    return u5;
  }
  static get DefaultType() {
    return f5;
  }
  static get NAME() {
    return Q6;
  }
  refresh() {
    this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : (this._observer = this._getNewObserver());
    for (const t of this._observableSections.values()) this._observer.observe(t);
  }
  dispose() {
    this._observer.disconnect(), super.dispose();
  }
  _configAfterMerge(t) {
    return (
      (t.target = Wn(t.target) || document.body),
      (t.rootMargin = t.offset ? `${t.offset}px 0px -30%` : t.rootMargin),
      typeof t.threshold == 'string' && (t.threshold = t.threshold.split(',').map((n) => Number.parseFloat(n))),
      t
    );
  }
  _maybeEnableSmoothScroll() {
    this._config.smoothScroll &&
      (U.off(this._config.target, Od),
      U.on(this._config.target, Od, Ko, (t) => {
        const n = this._observableSections.get(t.target.hash);
        if (n) {
          t.preventDefault();
          const r = this._rootElement || window,
            s = n.offsetTop - this._element.offsetTop;
          if (r.scrollTo) {
            r.scrollTo({
              top: s,
              behavior: 'smooth',
            });
            return;
          }
          r.scrollTop = s;
        }
      }));
  }
  _getNewObserver() {
    const t = {
      root: this._rootElement,
      threshold: this._config.threshold,
      rootMargin: this._config.rootMargin,
    };
    return new IntersectionObserver((n) => this._observerCallback(n), t);
  }
  _observerCallback(t) {
    const n = (a) => this._targetLinks.get(`#${a.target.id}`),
      r = (a) => {
        (this._previousScrollData.visibleEntryTop = a.target.offsetTop), this._process(n(a));
      },
      s = (this._rootElement || document.documentElement).scrollTop,
      i = s >= this._previousScrollData.parentScrollTop;
    this._previousScrollData.parentScrollTop = s;
    for (const a of t) {
      if (!a.isIntersecting) {
        (this._activeTarget = null), this._clearActiveClass(n(a));
        continue;
      }
      const o = a.target.offsetTop >= this._previousScrollData.visibleEntryTop;
      if (i && o) {
        if ((r(a), !s)) return;
        continue;
      }
      !i && !o && r(a);
    }
  }
  _initializeTargetsAndObservables() {
    (this._targetLinks = new Map()), (this._observableSections = new Map());
    const t = pe.find(Ko, this._config.target);
    for (const n of t) {
      if (!n.hash || Un(n)) continue;
      const r = pe.findOne(decodeURI(n.hash), this._element);
      ps(r) && (this._targetLinks.set(decodeURI(n.hash), n), this._observableSections.set(n.hash, r));
    }
  }
  _process(t) {
    this._activeTarget !== t &&
      (this._clearActiveClass(this._config.target),
      (this._activeTarget = t),
      t.classList.add(Mr),
      this._activateParents(t),
      U.trigger(this._element, e5, {
        relatedTarget: t,
      }));
  }
  _activateParents(t) {
    if (t.classList.contains(n5)) {
      pe.findOne(c5, t.closest(l5)).classList.add(Mr);
      return;
    }
    for (const n of pe.parents(t, s5)) for (const r of pe.prev(n, o5)) r.classList.add(Mr);
  }
  _clearActiveClass(t) {
    t.classList.remove(Mr);
    const n = pe.find(`${Ko}.${Mr}`, t);
    for (const r of n) r.classList.remove(Mr);
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = po.getOrCreateInstance(this, t);
      if (typeof t == 'string') {
        if (n[t] === void 0 || t.startsWith('_') || t === 'constructor') throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
}
U.on(window, t5, () => {
  for (const e of pe.find(r5)) po.getOrCreateInstance(e);
});
Dt(po);
const d5 = 'tab',
  h5 = 'bs.tab',
  Cr = `.${h5}`,
  p5 = `hide${Cr}`,
  m5 = `hidden${Cr}`,
  g5 = `show${Cr}`,
  v5 = `shown${Cr}`,
  b5 = `click${Cr}`,
  _5 = `keydown${Cr}`,
  y5 = `load${Cr}`,
  w5 = 'ArrowLeft',
  Pd = 'ArrowRight',
  E5 = 'ArrowUp',
  Id = 'ArrowDown',
  Go = 'Home',
  Md = 'End',
  hr = 'active',
  Nd = 'fade',
  Yo = 'show',
  x5 = 'dropdown',
  $2 = '.dropdown-toggle',
  S5 = '.dropdown-menu',
  Xo = `:not(${$2})`,
  A5 = '.list-group, .nav, [role="tablist"]',
  C5 = '.nav-item, .list-group-item',
  T5 = `.nav-link${Xo}, .list-group-item${Xo}, [role="tab"]${Xo}`,
  O2 = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
  Qo = `${T5}, ${O2}`,
  k5 = `.${hr}[data-bs-toggle="tab"], .${hr}[data-bs-toggle="pill"], .${hr}[data-bs-toggle="list"]`;
class ss extends Ut {
  constructor(t) {
    super(t), (this._parent = this._element.closest(A5)), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), U.on(this._element, _5, (n) => this._keydown(n)));
  }
  static get NAME() {
    return d5;
  }
  show() {
    const t = this._element;
    if (this._elemIsActive(t)) return;
    const n = this._getActiveElem(),
      r = n
        ? U.trigger(n, p5, {
            relatedTarget: t,
          })
        : null;
    U.trigger(t, g5, {
      relatedTarget: n,
    }).defaultPrevented ||
      (r && r.defaultPrevented) ||
      (this._deactivate(n, t), this._activate(t, n));
  }
  _activate(t, n) {
    if (!t) return;
    t.classList.add(hr), this._activate(pe.getElementFromSelector(t));
    const r = () => {
      if (t.getAttribute('role') !== 'tab') {
        t.classList.add(Yo);
        return;
      }
      t.removeAttribute('tabindex'),
        t.setAttribute('aria-selected', !0),
        this._toggleDropDown(t, !0),
        U.trigger(t, v5, {
          relatedTarget: n,
        });
    };
    this._queueCallback(r, t, t.classList.contains(Nd));
  }
  _deactivate(t, n) {
    if (!t) return;
    t.classList.remove(hr), t.blur(), this._deactivate(pe.getElementFromSelector(t));
    const r = () => {
      if (t.getAttribute('role') !== 'tab') {
        t.classList.remove(Yo);
        return;
      }
      t.setAttribute('aria-selected', !1),
        t.setAttribute('tabindex', '-1'),
        this._toggleDropDown(t, !1),
        U.trigger(t, m5, {
          relatedTarget: n,
        });
    };
    this._queueCallback(r, t, t.classList.contains(Nd));
  }
  _keydown(t) {
    if (![w5, Pd, E5, Id, Go, Md].includes(t.key)) return;
    t.stopPropagation(), t.preventDefault();
    const n = this._getChildren().filter((s) => !Un(s));
    let r;
    if ([Go, Md].includes(t.key)) r = n[t.key === Go ? 0 : n.length - 1];
    else {
      const s = [Pd, Id].includes(t.key);
      r = du(n, t.target, s, !0);
    }
    r &&
      (r.focus({
        preventScroll: !0,
      }),
      ss.getOrCreateInstance(r).show());
  }
  _getChildren() {
    return pe.find(Qo, this._parent);
  }
  _getActiveElem() {
    return this._getChildren().find((t) => this._elemIsActive(t)) || null;
  }
  _setInitialAttributes(t, n) {
    this._setAttributeIfNotExists(t, 'role', 'tablist');
    for (const r of n) this._setInitialAttributesOnChild(r);
  }
  _setInitialAttributesOnChild(t) {
    t = this._getInnerElement(t);
    const n = this._elemIsActive(t),
      r = this._getOuterElement(t);
    t.setAttribute('aria-selected', n),
      r !== t && this._setAttributeIfNotExists(r, 'role', 'presentation'),
      n || t.setAttribute('tabindex', '-1'),
      this._setAttributeIfNotExists(t, 'role', 'tab'),
      this._setInitialAttributesOnTargetPanel(t);
  }
  _setInitialAttributesOnTargetPanel(t) {
    const n = pe.getElementFromSelector(t);
    n && (this._setAttributeIfNotExists(n, 'role', 'tabpanel'), t.id && this._setAttributeIfNotExists(n, 'aria-labelledby', `${t.id}`));
  }
  _toggleDropDown(t, n) {
    const r = this._getOuterElement(t);
    if (!r.classList.contains(x5)) return;
    const s = (i, a) => {
      const o = pe.findOne(i, r);
      o && o.classList.toggle(a, n);
    };
    s($2, hr), s(S5, Yo), r.setAttribute('aria-expanded', n);
  }
  _setAttributeIfNotExists(t, n, r) {
    t.hasAttribute(n) || t.setAttribute(n, r);
  }
  _elemIsActive(t) {
    return t.classList.contains(hr);
  }
  _getInnerElement(t) {
    return t.matches(Qo) ? t : pe.findOne(Qo, t);
  }
  _getOuterElement(t) {
    return t.closest(C5) || t;
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = ss.getOrCreateInstance(this);
      if (typeof t == 'string') {
        if (n[t] === void 0 || t.startsWith('_') || t === 'constructor') throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
}
U.on(document, b5, O2, function (e) {
  ['A', 'AREA'].includes(this.tagName) && e.preventDefault(), !Un(this) && ss.getOrCreateInstance(this).show();
});
U.on(window, y5, () => {
  for (const e of pe.find(k5)) ss.getOrCreateInstance(e);
});
Dt(ss);
const $5 = 'toast',
  O5 = 'bs.toast',
  Qn = `.${O5}`,
  L5 = `mouseover${Qn}`,
  P5 = `mouseout${Qn}`,
  I5 = `focusin${Qn}`,
  M5 = `focusout${Qn}`,
  N5 = `hide${Qn}`,
  R5 = `hidden${Qn}`,
  D5 = `show${Qn}`,
  z5 = `shown${Qn}`,
  H5 = 'fade',
  Rd = 'hide',
  Ji = 'show',
  Zi = 'showing',
  V5 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number',
  },
  F5 = {
    animation: !0,
    autohide: !0,
    delay: 5e3,
  };
class mo extends Ut {
  constructor(t, n) {
    super(t, n), (this._timeout = null), (this._hasMouseInteraction = !1), (this._hasKeyboardInteraction = !1), this._setListeners();
  }
  static get Default() {
    return F5;
  }
  static get DefaultType() {
    return V5;
  }
  static get NAME() {
    return $5;
  }
  show() {
    if (U.trigger(this._element, D5).defaultPrevented) return;
    this._clearTimeout(), this._config.animation && this._element.classList.add(H5);
    const n = () => {
      this._element.classList.remove(Zi), U.trigger(this._element, z5), this._maybeScheduleHide();
    };
    this._element.classList.remove(Rd), wi(this._element), this._element.classList.add(Ji, Zi), this._queueCallback(n, this._element, this._config.animation);
  }
  hide() {
    if (!this.isShown() || U.trigger(this._element, N5).defaultPrevented) return;
    const n = () => {
      this._element.classList.add(Rd), this._element.classList.remove(Zi, Ji), U.trigger(this._element, R5);
    };
    this._element.classList.add(Zi), this._queueCallback(n, this._element, this._config.animation);
  }
  dispose() {
    this._clearTimeout(), this.isShown() && this._element.classList.remove(Ji), super.dispose();
  }
  isShown() {
    return this._element.classList.contains(Ji);
  }
  _maybeScheduleHide() {
    this._config.autohide &&
      (this._hasMouseInteraction ||
        this._hasKeyboardInteraction ||
        (this._timeout = setTimeout(() => {
          this.hide();
        }, this._config.delay)));
  }
  _onInteraction(t, n) {
    switch (t.type) {
      case 'mouseover':
      case 'mouseout': {
        this._hasMouseInteraction = n;
        break;
      }
      case 'focusin':
      case 'focusout': {
        this._hasKeyboardInteraction = n;
        break;
      }
    }
    if (n) {
      this._clearTimeout();
      return;
    }
    const r = t.relatedTarget;
    this._element === r || this._element.contains(r) || this._maybeScheduleHide();
  }
  _setListeners() {
    U.on(this._element, L5, (t) => this._onInteraction(t, !0)),
      U.on(this._element, P5, (t) => this._onInteraction(t, !1)),
      U.on(this._element, I5, (t) => this._onInteraction(t, !0)),
      U.on(this._element, M5, (t) => this._onInteraction(t, !1));
  }
  _clearTimeout() {
    clearTimeout(this._timeout), (this._timeout = null);
  }
  static jQueryInterface(t) {
    return this.each(function () {
      const n = mo.getOrCreateInstance(this, t);
      if (typeof t == 'string') {
        if (typeof n[t] > 'u') throw new TypeError(`No method named "${t}"`);
        n[t](this);
      }
    });
  }
}
uo(mo);
Dt(mo);
var L2 = typeof globalThis < 'u' ? globalThis : typeof window < 'u' ? window : typeof global < 'u' ? global : typeof self < 'u' ? self : {};
function P2(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, 'default') ? e.default : e;
}
var I2 = {
  exports: {},
};
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */
(function (e, t) {
  (function (n, r) {
    e.exports = r();
  })(L2, function () {
    var n = {};
    n.version = '0.2.0';
    var r = (n.settings = {
      minimum: 0.08,
      easing: 'ease',
      positionUsing: '',
      speed: 200,
      trickle: !0,
      trickleRate: 0.02,
      trickleSpeed: 800,
      showSpinner: !0,
      barSelector: '[role="bar"]',
      spinnerSelector: '[role="spinner"]',
      parent: 'body',
      template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
    });
    (n.configure = function (g) {
      var d, p;
      for (d in g) (p = g[d]), p !== void 0 && g.hasOwnProperty(d) && (r[d] = p);
      return this;
    }),
      (n.status = null),
      (n.set = function (g) {
        var d = n.isStarted();
        (g = s(g, r.minimum, 1)), (n.status = g === 1 ? null : g);
        var p = n.render(!d),
          _ = p.querySelector(r.barSelector),
          v = r.speed,
          C = r.easing;
        return (
          p.offsetWidth,
          o(function (S) {
            r.positionUsing === '' && (r.positionUsing = n.getPositioningCSS()),
              l(_, a(g, v, C)),
              g === 1
                ? (l(p, {
                    transition: 'none',
                    opacity: 1,
                  }),
                  p.offsetWidth,
                  setTimeout(function () {
                    l(p, {
                      transition: 'all ' + v + 'ms linear',
                      opacity: 0,
                    }),
                      setTimeout(function () {
                        n.remove(), S();
                      }, v);
                  }, v))
                : setTimeout(S, v);
          }),
          this
        );
      }),
      (n.isStarted = function () {
        return typeof n.status == 'number';
      }),
      (n.start = function () {
        n.status || n.set(0);
        var g = function () {
          setTimeout(function () {
            n.status && (n.trickle(), g());
          }, r.trickleSpeed);
        };
        return r.trickle && g(), this;
      }),
      (n.done = function (g) {
        return !g && !n.status ? this : n.inc(0.3 + 0.5 * Math.random()).set(1);
      }),
      (n.inc = function (g) {
        var d = n.status;
        return d ? (typeof g != 'number' && (g = (1 - d) * s(Math.random() * d, 0.1, 0.95)), (d = s(d + g, 0, 0.994)), n.set(d)) : n.start();
      }),
      (n.trickle = function () {
        return n.inc(Math.random() * r.trickleRate);
      }),
      (function () {
        var g = 0,
          d = 0;
        n.promise = function (p) {
          return !p || p.state() === 'resolved'
            ? this
            : (d === 0 && n.start(),
              g++,
              d++,
              p.always(function () {
                d--, d === 0 ? ((g = 0), n.done()) : n.set((g - d) / g);
              }),
              this);
        };
      })(),
      (n.render = function (g) {
        if (n.isRendered()) return document.getElementById('nprogress');
        c(document.documentElement, 'nprogress-busy');
        var d = document.createElement('div');
        (d.id = 'nprogress'), (d.innerHTML = r.template);
        var p = d.querySelector(r.barSelector),
          _ = g ? '-100' : i(n.status || 0),
          v = document.querySelector(r.parent),
          C;
        return (
          l(p, {
            transition: 'all 0 linear',
            transform: 'translate3d(' + _ + '%,0,0)',
          }),
          r.showSpinner || ((C = d.querySelector(r.spinnerSelector)), C && m(C)),
          v != document.body && c(v, 'nprogress-custom-parent'),
          v.appendChild(d),
          d
        );
      }),
      (n.remove = function () {
        f(document.documentElement, 'nprogress-busy'), f(document.querySelector(r.parent), 'nprogress-custom-parent');
        var g = document.getElementById('nprogress');
        g && m(g);
      }),
      (n.isRendered = function () {
        return !!document.getElementById('nprogress');
      }),
      (n.getPositioningCSS = function () {
        var g = document.body.style,
          d = 'WebkitTransform' in g ? 'Webkit' : 'MozTransform' in g ? 'Moz' : 'msTransform' in g ? 'ms' : 'OTransform' in g ? 'O' : '';
        return d + 'Perspective' in g ? 'translate3d' : d + 'Transform' in g ? 'translate' : 'margin';
      });
    function s(g, d, p) {
      return g < d ? d : g > p ? p : g;
    }
    function i(g) {
      return (-1 + g) * 100;
    }
    function a(g, d, p) {
      var _;
      return (
        r.positionUsing === 'translate3d'
          ? (_ = {
              transform: 'translate3d(' + i(g) + '%,0,0)',
            })
          : r.positionUsing === 'translate'
            ? (_ = {
                transform: 'translate(' + i(g) + '%,0)',
              })
            : (_ = {
                'margin-left': i(g) + '%',
              }),
        (_.transition = 'all ' + d + 'ms ' + p),
        _
      );
    }
    var o = (function () {
        var g = [];
        function d() {
          var p = g.shift();
          p && p(d);
        }
        return function (p) {
          g.push(p), g.length == 1 && d();
        };
      })(),
      l = (function () {
        var g = ['Webkit', 'O', 'Moz', 'ms'],
          d = {};
        function p(S) {
          return S.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function (P, N) {
            return N.toUpperCase();
          });
        }
        function _(S) {
          var P = document.body.style;
          if (S in P) return S;
          for (var N = g.length, D = S.charAt(0).toUpperCase() + S.slice(1), k; N--; ) if (((k = g[N] + D), k in P)) return k;
          return S;
        }
        function v(S) {
          return (S = p(S)), d[S] || (d[S] = _(S));
        }
        function C(S, P, N) {
          (P = v(P)), (S.style[P] = N);
        }
        return function (S, P) {
          var N = arguments,
            D,
            k;
          if (N.length == 2) for (D in P) (k = P[D]), k !== void 0 && P.hasOwnProperty(D) && C(S, D, k);
          else C(S, N[1], N[2]);
        };
      })();
    function u(g, d) {
      var p = typeof g == 'string' ? g : h(g);
      return p.indexOf(' ' + d + ' ') >= 0;
    }
    function c(g, d) {
      var p = h(g),
        _ = p + d;
      u(p, d) || (g.className = _.substring(1));
    }
    function f(g, d) {
      var p = h(g),
        _;
      u(g, d) && ((_ = p.replace(' ' + d + ' ', ' ')), (g.className = _.substring(1, _.length - 1)));
    }
    function h(g) {
      return (' ' + (g.className || '') + ' ').replace(/\s+/gi, ' ');
    }
    function m(g) {
      g && g.parentNode && g.parentNode.removeChild(g);
    }
    return n;
  });
})(I2);
var B5 = I2.exports;
const Mn = P2(B5);
var j5 = !1;
/*!
 * pinia v2.1.6
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let M2;
const go = (e) => (M2 = e),
  N2 = Symbol();
function Wl(e) {
  return e && typeof e == 'object' && Object.prototype.toString.call(e) === '[object Object]' && typeof e.toJSON != 'function';
}
var Hs;
(function (e) {
  (e.direct = 'direct'), (e.patchObject = 'patch object'), (e.patchFunction = 'patch function');
})(Hs || (Hs = {}));
function W5() {
  const e = $1(!0),
    t = e.run(() => ce({}));
  let n = [],
    r = [];
  const s = gi({
    install(i) {
      go(s), (s._a = i), i.provide(N2, s), (i.config.globalProperties.$pinia = s), r.forEach((a) => n.push(a)), (r = []);
    },
    use(i) {
      return !this._a && !j5 ? r.push(i) : n.push(i), this;
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  });
  return s;
}
const R2 = () => {};
function Dd(e, t, n, r = R2) {
  e.push(t);
  const s = () => {
    const i = e.indexOf(t);
    i > -1 && (e.splice(i, 1), r());
  };
  return !n && Ic() && O1(s), s;
}
function Nr(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const U5 = (e) => e();
function Ul(e, t) {
  e instanceof Map && t instanceof Map && t.forEach((n, r) => e.set(r, n)), e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n)) continue;
    const r = t[n],
      s = e[n];
    Wl(s) && Wl(r) && e.hasOwnProperty(n) && !We(r) && !Rn(r) ? (e[n] = Ul(s, r)) : (e[n] = r);
  }
  return e;
}
const q5 = Symbol();
function K5(e) {
  return !Wl(e) || !e.hasOwnProperty(q5);
}
const { assign: Ln } = Object;
function G5(e) {
  return !!(We(e) && e.effect);
}
function Y5(e, t, n, r) {
  const { state: s, actions: i, getters: a } = t,
    o = n.state.value[e];
  let l;
  function u() {
    o || (n.state.value[e] = s ? s() : {});
    const c = j3(n.state.value[e]);
    return Ln(
      c,
      i,
      Object.keys(a || {}).reduce(
        (f, h) => (
          (f[h] = gi(
            xe(() => {
              go(n);
              const m = n._s.get(e);
              return a[h].call(m, m);
            }),
          )),
          f
        ),
        {},
      ),
    );
  }
  return (l = D2(e, u, t, n, r, !0)), l;
}
function D2(e, t, n = {}, r, s, i) {
  let a;
  const o = Ln(
      {
        actions: {},
      },
      n,
    ),
    l = {
      deep: !0,
    };
  let u,
    c,
    f = [],
    h = [],
    m;
  const g = r.state.value[e];
  !i && !g && (r.state.value[e] = {}), ce({});
  let d;
  function p(k) {
    let R;
    (u = c = !1),
      typeof k == 'function'
        ? (k(r.state.value[e]),
          (R = {
            type: Hs.patchFunction,
            storeId: e,
            events: m,
          }))
        : (Ul(r.state.value[e], k),
          (R = {
            type: Hs.patchObject,
            payload: k,
            storeId: e,
            events: m,
          }));
    const M = (d = Symbol());
    Gn().then(() => {
      d === M && (u = !0);
    }),
      (c = !0),
      Nr(f, R, r.state.value[e]);
  }
  const _ = i
    ? function () {
        const { state: R } = n,
          M = R ? R() : {};
        this.$patch((ee) => {
          Ln(ee, M);
        });
      }
    : R2;
  function v() {
    a.stop(), (f = []), (h = []), r._s.delete(e);
  }
  function C(k, R) {
    return function () {
      go(r);
      const M = Array.from(arguments),
        ee = [],
        Q = [];
      function te(ae) {
        ee.push(ae);
      }
      function fe(ae) {
        Q.push(ae);
      }
      Nr(h, {
        args: M,
        name: k,
        store: P,
        after: te,
        onError: fe,
      });
      let ye;
      try {
        ye = R.apply(this && this.$id === e ? this : P, M);
      } catch (ae) {
        throw (Nr(Q, ae), ae);
      }
      return ye instanceof Promise ? ye.then((ae) => (Nr(ee, ae), ae)).catch((ae) => (Nr(Q, ae), Promise.reject(ae))) : (Nr(ee, ye), ye);
    };
  }
  const S = {
      _p: r,
      $id: e,
      $onAction: Dd.bind(null, h),
      $patch: p,
      $reset: _,
      $subscribe(k, R = {}) {
        const M = Dd(f, k, R.detached, () => ee()),
          ee = a.run(() =>
            Ze(
              () => r.state.value[e],
              (Q) => {
                (R.flush === 'sync' ? c : u) &&
                  k(
                    {
                      storeId: e,
                      type: Hs.direct,
                      events: m,
                    },
                    Q,
                  );
              },
              Ln({}, l, R),
            ),
          );
        return M;
      },
      $dispose: v,
    },
    P = un(S);
  r._s.set(e, P);
  const N = (r._a && r._a.runWithContext) || U5,
    D = r._e.run(() => ((a = $1()), N(() => a.run(t))));
  for (const k in D) {
    const R = D[k];
    if ((We(R) && !G5(R)) || Rn(R)) i || (g && K5(R) && (We(R) ? (R.value = g[k]) : Ul(R, g[k])), (r.state.value[e][k] = R));
    else if (typeof R == 'function') {
      const M = C(k, R);
      (D[k] = M), (o.actions[k] = R);
    }
  }
  return (
    Ln(P, D),
    Ln($e(P), D),
    Object.defineProperty(P, '$state', {
      get: () => r.state.value[e],
      set: (k) => {
        p((R) => {
          Ln(R, k);
        });
      },
    }),
    r._p.forEach((k) => {
      Ln(
        P,
        a.run(() =>
          k({
            store: P,
            app: r._a,
            pinia: r,
            options: o,
          }),
        ),
      );
    }),
    g && i && n.hydrate && n.hydrate(P.$state, g),
    (u = !0),
    (c = !0),
    P
  );
}
function Ai(e, t, n) {
  let r, s;
  const i = typeof t == 'function';
  typeof e == 'string' ? ((r = e), (s = i ? n : t)) : ((s = e), (r = e.id));
  function a(o, l) {
    const u = Pv();
    return (o = o || (u ? wt(N2, null) : null)), o && go(o), (o = M2), o._s.has(r) || (i ? D2(r, t, s, o) : Y5(r, s, o)), o._s.get(r);
  }
  return (a.$id = r), a;
}
const Es = {};
function X5(e) {
  return Object.keys(e).reduce((t, n) => (e[n] !== !1 && e[n] !== null && e[n] !== void 0 && (t[n] = e[n]), t), {});
}
const Q5 = {
  name: 'InlineSvg',
  inheritAttrs: !1,
  render() {
    return this.svgElSource
      ? ds(
          'svg',
          Object.assign({}, this.getSvgAttrs(this.svgElSource), X5(this.$attrs), {
            innerHTML: this.getSvgContent(this.svgElSource),
          }),
        )
      : null;
  },
  props: {
    src: {
      type: String,
      required: !0,
    },
    title: {
      type: String,
    },
    transformSource: {
      type: Function,
      default: (e) => e,
    },
    keepDuringLoading: {
      type: Boolean,
      default: !0,
    },
  },
  emits: ['loaded', 'unloaded', 'error'],
  data() {
    return {
      svgElSource: null,
    };
  },
  watch: {
    src(e) {
      this.getSource(e);
    },
  },
  mounted() {
    this.getSource(this.src);
  },
  methods: {
    getSvgAttrs(e) {
      let t = {};
      const n = e.attributes;
      if (!n) return t;
      for (let r = n.length - 1; r >= 0; r--) t[n[r].name] = n[r].value;
      return t;
    },
    getSvgContent(e) {
      return (e = e.cloneNode(!0)), (e = this.transformSource(e)), this.title && J5(e, this.title), e.innerHTML;
    },
    getSource(e) {
      Es[e] || (Es[e] = this.download(e)),
        this.svgElSource && Es[e].getIsPending() && !this.keepDuringLoading && ((this.svgElSource = null), this.$emit('unloaded')),
        Es[e]
          .then((t) => {
            (this.svgElSource = t),
              this.$nextTick(() => {
                this.$emit('loaded', this.$el);
              });
          })
          .catch((t) => {
            this.svgElSource && ((this.svgElSource = null), this.$emit('unloaded')), delete Es[e], this.$emit('error', t);
          });
    },
    download(e) {
      return Z5(
        new Promise((t, n) => {
          const r = new XMLHttpRequest();
          r.open('GET', e, !0),
            (r.onload = () => {
              if (r.status >= 200 && r.status < 400)
                try {
                  let a = new DOMParser().parseFromString(r.responseText, 'text/xml').getElementsByTagName('svg')[0];
                  a ? t(a) : n(new Error('Loaded file is not valid SVG"'));
                } catch (s) {
                  n(s);
                }
              else n(new Error('Error loading SVG'));
            }),
            (r.onerror = n),
            r.send();
        }),
      );
    },
  },
};
function J5(e, t) {
  const n = e.getElementsByTagName('title');
  if (n.length) n[0].textContent = t;
  else {
    const r = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    (r.textContent = t), e.insertBefore(r, e.firstChild);
  }
}
function Z5(e) {
  if (e.getIsPending) return e;
  let t = !0,
    n = e.then(
      (r) => ((t = !1), r),
      (r) => {
        throw ((t = !1), r);
      },
    );
  return (
    (n.getIsPending = function () {
      return t;
    }),
    n
  );
}
function e8() {
  var e = window.navigator.userAgent,
    t = e.indexOf('MSIE ');
  if (t > 0) return parseInt(e.substring(t + 5, e.indexOf('.', t)), 10);
  var n = e.indexOf('Trident/');
  if (n > 0) {
    var r = e.indexOf('rv:');
    return parseInt(e.substring(r + 3, e.indexOf('.', r)), 10);
  }
  var s = e.indexOf('Edge/');
  return s > 0 ? parseInt(e.substring(s + 5, e.indexOf('.', s)), 10) : -1;
}
let pa;
function ql() {
  ql.init || ((ql.init = !0), (pa = e8() !== -1));
}
var vo = {
  name: 'ResizeObserver',
  props: {
    emitOnMount: {
      type: Boolean,
      default: !1,
    },
    ignoreWidth: {
      type: Boolean,
      default: !1,
    },
    ignoreHeight: {
      type: Boolean,
      default: !1,
    },
  },
  emits: ['notify'],
  mounted() {
    ql(),
      Gn(() => {
        (this._w = this.$el.offsetWidth), (this._h = this.$el.offsetHeight), this.emitOnMount && this.emitSize();
      });
    const e = document.createElement('object');
    (this._resizeObject = e),
      e.setAttribute('aria-hidden', 'true'),
      e.setAttribute('tabindex', -1),
      (e.onload = this.addResizeHandlers),
      (e.type = 'text/html'),
      pa && this.$el.appendChild(e),
      (e.data = 'about:blank'),
      pa || this.$el.appendChild(e);
  },
  beforeUnmount() {
    this.removeResizeHandlers();
  },
  methods: {
    compareAndNotify() {
      ((!this.ignoreWidth && this._w !== this.$el.offsetWidth) || (!this.ignoreHeight && this._h !== this.$el.offsetHeight)) &&
        ((this._w = this.$el.offsetWidth), (this._h = this.$el.offsetHeight), this.emitSize());
    },
    emitSize() {
      this.$emit('notify', {
        width: this._w,
        height: this._h,
      });
    },
    addResizeHandlers() {
      this._resizeObject.contentDocument.defaultView.addEventListener('resize', this.compareAndNotify), this.compareAndNotify();
    },
    removeResizeHandlers() {
      this._resizeObject &&
        this._resizeObject.onload &&
        (!pa && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener('resize', this.compareAndNotify),
        this.$el.removeChild(this._resizeObject),
        (this._resizeObject.onload = null),
        (this._resizeObject = null));
    },
  },
};
const t8 = tv();
vi('data-v-b329ee4c');
const n8 = {
  class: 'resize-observer',
  tabindex: '-1',
};
bi();
const r8 = t8((e, t, n, r, s, i) => (be(), sn('div', n8)));
vo.render = r8;
vo.__scopeId = 'data-v-b329ee4c';
vo.__file = 'src/components/ResizeObserver.vue';
function ma(e) {
  '@babel/helpers - typeof';
  return (
    typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
      ? (ma = function (t) {
          return typeof t;
        })
      : (ma = function (t) {
          return t && typeof Symbol == 'function' && t.constructor === Symbol && t !== Symbol.prototype ? 'symbol' : typeof t;
        }),
    ma(e)
  );
}
function s8(e, t) {
  if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
}
function zd(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    (r.enumerable = r.enumerable || !1), (r.configurable = !0), 'value' in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function i8(e, t, n) {
  return t && zd(e.prototype, t), n && zd(e, n), e;
}
function Hd(e) {
  return a8(e) || o8(e) || l8(e) || c8();
}
function a8(e) {
  if (Array.isArray(e)) return Kl(e);
}
function o8(e) {
  if (typeof Symbol < 'u' && Symbol.iterator in Object(e)) return Array.from(e);
}
function l8(e, t) {
  if (e) {
    if (typeof e == 'string') return Kl(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if ((n === 'Object' && e.constructor && (n = e.constructor.name), n === 'Map' || n === 'Set')) return Array.from(e);
    if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Kl(e, t);
  }
}
function Kl(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function c8() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function u8(e) {
  var t;
  return (
    typeof e == 'function'
      ? (t = {
          callback: e,
        })
      : (t = e),
    t
  );
}
function f8(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
    r,
    s,
    i,
    a = function (l) {
      for (var u = arguments.length, c = new Array(u > 1 ? u - 1 : 0), f = 1; f < u; f++) c[f - 1] = arguments[f];
      if (((i = c), !(r && l === s))) {
        var h = n.leading;
        typeof h == 'function' && (h = h(l, s)),
          (!r || l !== s) && h && e.apply(void 0, [l].concat(Hd(i))),
          (s = l),
          clearTimeout(r),
          (r = setTimeout(function () {
            e.apply(void 0, [l].concat(Hd(i))), (r = 0);
          }, t));
      }
    };
  return (
    (a._clear = function () {
      clearTimeout(r), (r = null);
    }),
    a
  );
}
function z2(e, t) {
  if (e === t) return !0;
  if (ma(e) === 'object') {
    for (var n in e) if (!z2(e[n], t[n])) return !1;
    return !0;
  }
  return !1;
}
var d8 = (function () {
  function e(t, n, r) {
    s8(this, e), (this.el = t), (this.observer = null), (this.frozen = !1), this.createObserver(n, r);
  }
  return (
    i8(e, [
      {
        key: 'createObserver',
        value: function (n, r) {
          var s = this;
          if ((this.observer && this.destroyObserver(), !this.frozen)) {
            if (
              ((this.options = u8(n)),
              (this.callback = function (o, l) {
                s.options.callback(o, l), o && s.options.once && ((s.frozen = !0), s.destroyObserver());
              }),
              this.callback && this.options.throttle)
            ) {
              var i = this.options.throttleOptions || {},
                a = i.leading;
              this.callback = f8(this.callback, this.options.throttle, {
                leading: function (l) {
                  return a === 'both' || (a === 'visible' && l) || (a === 'hidden' && !l);
                },
              });
            }
            (this.oldResult = void 0),
              (this.observer = new IntersectionObserver(function (o) {
                var l = o[0];
                if (o.length > 1) {
                  var u = o.find(function (f) {
                    return f.isIntersecting;
                  });
                  u && (l = u);
                }
                if (s.callback) {
                  var c = l.isIntersecting && l.intersectionRatio >= s.threshold;
                  if (c === s.oldResult) return;
                  (s.oldResult = c), s.callback(c, l);
                }
              }, this.options.intersection)),
              Gn(function () {
                s.observer && s.observer.observe(s.el);
              });
          }
        },
      },
      {
        key: 'destroyObserver',
        value: function () {
          this.observer && (this.observer.disconnect(), (this.observer = null)), this.callback && this.callback._clear && (this.callback._clear(), (this.callback = null));
        },
      },
      {
        key: 'threshold',
        get: function () {
          return this.options.intersection && typeof this.options.intersection.threshold == 'number' ? this.options.intersection.threshold : 0;
        },
      },
    ]),
    e
  );
})();
function H2(e, t, n) {
  var r = t.value;
  if (r)
    if (typeof IntersectionObserver > 'u')
      console.warn(
        '[vue-observe-visibility] IntersectionObserver API is not available in your browser. Please install this polyfill: https://github.com/w3c/IntersectionObserver/tree/master/polyfill',
      );
    else {
      var s = new d8(e, r, n);
      e._vue_visibilityState = s;
    }
}
function h8(e, t, n) {
  var r = t.value,
    s = t.oldValue;
  if (!z2(r, s)) {
    var i = e._vue_visibilityState;
    if (!r) {
      V2(e);
      return;
    }
    i
      ? i.createObserver(r, n)
      : H2(
          e,
          {
            value: r,
          },
          n,
        );
  }
}
function V2(e) {
  var t = e._vue_visibilityState;
  t && (t.destroyObserver(), delete e._vue_visibilityState);
}
var p8 = {
  beforeMount: H2,
  updated: h8,
  unmounted: V2,
};
function m8(e) {
  return {
    all: (e = e || new Map()),
    on: function (t, n) {
      var r = e.get(t);
      (r && r.push(n)) || e.set(t, [n]);
    },
    off: function (t, n) {
      var r = e.get(t);
      r && r.splice(r.indexOf(n) >>> 0, 1);
    },
    emit: function (t, n) {
      (e.get(t) || []).slice().map(function (r) {
        r(n);
      }),
        (e.get('*') || []).slice().map(function (r) {
          r(t, n);
        });
    },
  };
}
var F2 = {
    itemsLimit: 1e3,
  },
  g8 = /(auto|scroll)/;
function B2(e, t) {
  return e.parentNode === null ? t : B2(e.parentNode, t.concat([e]));
}
var Jo = function (t, n) {
    return getComputedStyle(t, null).getPropertyValue(n);
  },
  v8 = function (t) {
    return Jo(t, 'overflow') + Jo(t, 'overflow-y') + Jo(t, 'overflow-x');
  },
  b8 = function (t) {
    return g8.test(v8(t));
  };
function Vd(e) {
  if (e instanceof HTMLElement || e instanceof SVGElement) {
    for (var t = B2(e.parentNode, []), n = 0; n < t.length; n += 1) if (b8(t[n])) return t[n];
    return document.scrollingElement || document.documentElement;
  }
}
function Gl(e) {
  '@babel/helpers - typeof';
  return (
    (Gl =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && typeof Symbol == 'function' && t.constructor === Symbol && t !== Symbol.prototype ? 'symbol' : typeof t;
          }),
    Gl(e)
  );
}
var j2 = {
  items: {
    type: Array,
    required: !0,
  },
  keyField: {
    type: String,
    default: 'id',
  },
  direction: {
    type: String,
    default: 'vertical',
    validator: function (t) {
      return ['vertical', 'horizontal'].includes(t);
    },
  },
  listTag: {
    type: String,
    default: 'div',
  },
  itemTag: {
    type: String,
    default: 'div',
  },
};
function W2() {
  return this.items.length && Gl(this.items[0]) !== 'object';
}
var Yl = !1;
if (typeof window < 'u') {
  Yl = !1;
  try {
    var _8 = Object.defineProperty({}, 'passive', {
      get: function () {
        Yl = !0;
      },
    });
    window.addEventListener('test', null, _8);
  } catch {}
}
let y8 = 0;
var oi = {
  name: 'RecycleScroller',
  components: {
    ResizeObserver: vo,
  },
  directives: {
    ObserveVisibility: p8,
  },
  props: {
    ...j2,
    itemSize: {
      type: Number,
      default: null,
    },
    gridItems: {
      type: Number,
      default: void 0,
    },
    itemSecondarySize: {
      type: Number,
      default: void 0,
    },
    minItemSize: {
      type: [Number, String],
      default: null,
    },
    sizeField: {
      type: String,
      default: 'size',
    },
    typeField: {
      type: String,
      default: 'type',
    },
    buffer: {
      type: Number,
      default: 200,
    },
    pageMode: {
      type: Boolean,
      default: !1,
    },
    prerender: {
      type: Number,
      default: 0,
    },
    emitUpdate: {
      type: Boolean,
      default: !1,
    },
    skipHover: {
      type: Boolean,
      default: !1,
    },
    listTag: {
      type: String,
      default: 'div',
    },
    itemTag: {
      type: String,
      default: 'div',
    },
    listClass: {
      type: [String, Object, Array],
      default: '',
    },
    itemClass: {
      type: [String, Object, Array],
      default: '',
    },
  },
  emits: ['resize', 'visible', 'hidden', 'update', 'scroll-start', 'scroll-end'],
  data() {
    return {
      pool: [],
      totalSize: 0,
      ready: !1,
      hoverKey: null,
    };
  },
  computed: {
    sizes() {
      if (this.itemSize === null) {
        const e = {
            '-1': {
              accumulator: 0,
            },
          },
          t = this.items,
          n = this.sizeField,
          r = this.minItemSize;
        let s = 1e4,
          i = 0,
          a;
        for (let o = 0, l = t.length; o < l; o++)
          (a = t[o][n] || r),
            a < s && (s = a),
            (i += a),
            (e[o] = {
              accumulator: i,
              size: a,
            });
        return (this.$_computedMinItemSize = s), e;
      }
      return [];
    },
    simpleArray: W2,
  },
  watch: {
    items() {
      this.updateVisibleItems(!0);
    },
    pageMode() {
      this.applyPageMode(), this.updateVisibleItems(!1);
    },
    sizes: {
      handler() {
        this.updateVisibleItems(!1);
      },
      deep: !0,
    },
    gridItems() {
      this.updateVisibleItems(!0);
    },
    itemSecondarySize() {
      this.updateVisibleItems(!0);
    },
  },
  created() {
    (this.$_startIndex = 0),
      (this.$_endIndex = 0),
      (this.$_views = new Map()),
      (this.$_unusedViews = new Map()),
      (this.$_scrollDirty = !1),
      (this.$_lastUpdateScrollPosition = 0),
      this.prerender && ((this.$_prerender = !0), this.updateVisibleItems(!1)),
      this.gridItems && !this.itemSize && console.error('[vue-recycle-scroller] You must provide an itemSize when using gridItems');
  },
  mounted() {
    this.applyPageMode(),
      this.$nextTick(() => {
        (this.$_prerender = !1), this.updateVisibleItems(!0), (this.ready = !0);
      });
  },
  activated() {
    const e = this.$_lastUpdateScrollPosition;
    typeof e == 'number' &&
      this.$nextTick(() => {
        this.scrollToPosition(e);
      });
  },
  beforeUnmount() {
    this.removeListeners();
  },
  methods: {
    addView(e, t, n, r, s) {
      const i = gi({
          id: y8++,
          index: t,
          used: !0,
          key: r,
          type: s,
        }),
        a = Dc({
          item: n,
          position: 0,
          nr: i,
        });
      return e.push(a), a;
    },
    unuseView(e, t = !1) {
      const n = this.$_unusedViews,
        r = e.nr.type;
      let s = n.get(r);
      s || ((s = []), n.set(r, s)), s.push(e), t || ((e.nr.used = !1), (e.position = -9999), this.$_views.delete(e.nr.key));
    },
    handleResize() {
      this.$emit('resize'), this.ready && this.updateVisibleItems(!1);
    },
    handleScroll(e) {
      this.$_scrollDirty ||
        ((this.$_scrollDirty = !0),
        requestAnimationFrame(() => {
          this.$_scrollDirty = !1;
          const { continuous: t } = this.updateVisibleItems(!1, !0);
          t || (clearTimeout(this.$_refreshTimout), (this.$_refreshTimout = setTimeout(this.handleScroll, 100)));
        }));
    },
    handleVisibilityChange(e, t) {
      this.ready &&
        (e || t.boundingClientRect.width !== 0 || t.boundingClientRect.height !== 0
          ? (this.$emit('visible'),
            requestAnimationFrame(() => {
              this.updateVisibleItems(!1);
            }))
          : this.$emit('hidden'));
    },
    updateVisibleItems(e, t = !1) {
      const n = this.itemSize,
        r = this.gridItems || 1,
        s = this.itemSecondarySize || n,
        i = this.$_computedMinItemSize,
        a = this.typeField,
        o = this.simpleArray ? null : this.keyField,
        l = this.items,
        u = l.length,
        c = this.sizes,
        f = this.$_views,
        h = this.$_unusedViews,
        m = this.pool;
      let g, d, p, _, v;
      if (!u) g = d = _ = v = p = 0;
      else if (this.$_prerender) (g = _ = 0), (d = v = Math.min(this.prerender, l.length)), (p = null);
      else {
        const M = this.getScroll();
        if (t) {
          let te = M.start - this.$_lastUpdateScrollPosition;
          if ((te < 0 && (te = -te), (n === null && te < i) || te < n))
            return {
              continuous: !0,
            };
        }
        this.$_lastUpdateScrollPosition = M.start;
        const ee = this.buffer;
        (M.start -= ee), (M.end += ee);
        let Q = 0;
        if ((this.$refs.before && ((Q = this.$refs.before.scrollHeight), (M.start -= Q)), this.$refs.after)) {
          const te = this.$refs.after.scrollHeight;
          M.end += te;
        }
        if (n === null) {
          let te,
            fe = 0,
            ye = u - 1,
            ae = ~~(u / 2),
            de;
          do (de = ae), (te = c[ae].accumulator), te < M.start ? (fe = ae) : ae < u - 1 && c[ae + 1].accumulator > M.start && (ye = ae), (ae = ~~((fe + ye) / 2));
          while (ae !== de);
          for (ae < 0 && (ae = 0), g = ae, p = c[u - 1].accumulator, d = ae; d < u && c[d].accumulator < M.end; d++);
          for (d === -1 ? (d = l.length - 1) : (d++, d > u && (d = u)), _ = g; _ < u && Q + c[_].accumulator < M.start; _++);
          for (v = _; v < u && Q + c[v].accumulator < M.end; v++);
        } else {
          g = ~~((M.start / n) * r);
          const te = g % r;
          (g -= te),
            (d = Math.ceil((M.end / n) * r)),
            (_ = Math.max(0, Math.floor(((M.start - Q) / n) * r))),
            (v = Math.floor(((M.end - Q) / n) * r)),
            g < 0 && (g = 0),
            d > u && (d = u),
            _ < 0 && (_ = 0),
            v > u && (v = u),
            (p = Math.ceil(u / r) * n);
        }
      }
      d - g > F2.itemsLimit && this.itemsLimitError(), (this.totalSize = p);
      let C;
      const S = g <= this.$_endIndex && d >= this.$_startIndex;
      if (this.$_continuous !== S) {
        if (S) {
          f.clear(), h.clear();
          for (let M = 0, ee = m.length; M < ee; M++) (C = m[M]), this.unuseView(C);
        }
        this.$_continuous = S;
      } else if (S)
        for (let M = 0, ee = m.length; M < ee; M++) (C = m[M]), C.nr.used && (e && (C.nr.index = l.indexOf(C.item)), (C.nr.index === -1 || C.nr.index < g || C.nr.index >= d) && this.unuseView(C));
      const P = S ? null : new Map();
      let N, D, k, R;
      for (let M = g; M < d; M++) {
        N = l[M];
        const ee = o ? N[o] : N;
        if (ee == null) throw new Error(`Key is ${ee} on item (keyField is '${o}')`);
        if (((C = f.get(ee)), !n && !c[M].size)) {
          C && this.unuseView(C);
          continue;
        }
        C
          ? ((C.nr.used = !0), (C.item = N))
          : (M === l.length - 1 && this.$emit('scroll-end'),
            M === 0 && this.$emit('scroll-start'),
            (D = N[a]),
            (k = h.get(D)),
            S
              ? k && k.length
                ? ((C = k.pop()), (C.item = N), (C.nr.used = !0), (C.nr.index = M), (C.nr.key = ee), (C.nr.type = D))
                : (C = this.addView(m, M, N, ee, D))
              : ((R = P.get(D) || 0),
                (!k || R >= k.length) && ((C = this.addView(m, M, N, ee, D)), this.unuseView(C, !0), (k = h.get(D))),
                (C = k[R]),
                (C.item = N),
                (C.nr.used = !0),
                (C.nr.index = M),
                (C.nr.key = ee),
                (C.nr.type = D),
                P.set(D, R + 1),
                R++),
            f.set(ee, C)),
          n === null ? ((C.position = c[M - 1].accumulator), (C.offset = 0)) : ((C.position = Math.floor(M / r) * n), (C.offset = (M % r) * s));
      }
      return (
        (this.$_startIndex = g),
        (this.$_endIndex = d),
        this.emitUpdate && this.$emit('update', g, d, _, v),
        clearTimeout(this.$_sortTimer),
        (this.$_sortTimer = setTimeout(this.sortViews, 300)),
        {
          continuous: S,
        }
      );
    },
    getListenerTarget() {
      let e = Vd(this.$el);
      return window.document && (e === window.document.documentElement || e === window.document.body) && (e = window), e;
    },
    getScroll() {
      const { $el: e, direction: t } = this,
        n = t === 'vertical';
      let r;
      if (this.pageMode) {
        const s = e.getBoundingClientRect(),
          i = n ? s.height : s.width;
        let a = -(n ? s.top : s.left),
          o = n ? window.innerHeight : window.innerWidth;
        a < 0 && ((o += a), (a = 0)),
          a + o > i && (o = i - a),
          (r = {
            start: a,
            end: a + o,
          });
      } else
        n
          ? (r = {
              start: e.scrollTop,
              end: e.scrollTop + e.clientHeight,
            })
          : (r = {
              start: e.scrollLeft,
              end: e.scrollLeft + e.clientWidth,
            });
      return r;
    },
    applyPageMode() {
      this.pageMode ? this.addListeners() : this.removeListeners();
    },
    addListeners() {
      (this.listenerTarget = this.getListenerTarget()),
        this.listenerTarget.addEventListener(
          'scroll',
          this.handleScroll,
          Yl
            ? {
                passive: !0,
              }
            : !1,
        ),
        this.listenerTarget.addEventListener('resize', this.handleResize);
    },
    removeListeners() {
      this.listenerTarget && (this.listenerTarget.removeEventListener('scroll', this.handleScroll), this.listenerTarget.removeEventListener('resize', this.handleResize), (this.listenerTarget = null));
    },
    scrollToItem(e) {
      let t;
      this.itemSize === null ? (t = e > 0 ? this.sizes[e - 1].accumulator : 0) : (t = Math.floor(e / this.gridItems) * this.itemSize), this.scrollToPosition(t);
    },
    scrollToPosition(e) {
      const t =
        this.direction === 'vertical'
          ? {
              scroll: 'scrollTop',
              start: 'top',
            }
          : {
              scroll: 'scrollLeft',
              start: 'left',
            };
      let n, r, s;
      if (this.pageMode) {
        const i = Vd(this.$el),
          a = i.tagName === 'HTML' ? 0 : i[t.scroll],
          o = i.getBoundingClientRect(),
          u = this.$el.getBoundingClientRect()[t.start] - o[t.start];
        (n = i), (r = t.scroll), (s = e + a + u);
      } else (n = this.$el), (r = t.scroll), (s = e);
      n[r] = s;
    },
    itemsLimitError() {
      throw (
        (setTimeout(() => {
          console.log("It seems the scroller element isn't scrolling, so it tries to render all the items at once.", 'Scroller:', this.$el),
            console.log(
              "Make sure the scroller has a fixed height (or width) and 'overflow-y' (or 'overflow-x') set to 'auto' so it can scroll correctly and only render the items visible in the scroll viewport.",
            );
        }),
        new Error('Rendered items limit reached'))
      );
    },
    sortViews() {
      this.pool.sort((e, t) => e.index - t.index);
    },
  },
};
const w8 = {
    key: 0,
    ref: 'before',
    class: 'vue-recycle-scroller__slot',
  },
  E8 = {
    key: 1,
    ref: 'after',
    class: 'vue-recycle-scroller__slot',
  };
function x8(e, t, n, r, s, i) {
  const a = gt('ResizeObserver'),
    o = lp('observe-visibility');
  return Za(
    (be(),
    ke(
      'div',
      {
        class: le([
          'vue-recycle-scroller',
          {
            'ready': s.ready,
            'page-mode': n.pageMode,
            [`direction-${e.direction}`]: !0,
          },
        ]),
        onScrollPassive: t[0] || (t[0] = (...l) => i.handleScroll && i.handleScroll(...l)),
      },
      [
        e.$slots.before ? (be(), ke('div', w8, [ct(e.$slots, 'before')], 512)) : yt('v-if', !0),
        (be(),
        sn(
          xf(n.listTag),
          {
            ref: 'wrapper',
            style: mi({
              [e.direction === 'vertical' ? 'minHeight' : 'minWidth']: s.totalSize + 'px',
            }),
            class: le(['vue-recycle-scroller__item-wrapper', n.listClass]),
          },
          {
            default: ve(() => [
              (be(!0),
              ke(
                Ke,
                null,
                no(
                  s.pool,
                  (l) => (
                    be(),
                    sn(
                      xf(n.itemTag),
                      io(
                        {
                          key: l.nr.id,
                          style: s.ready
                            ? {
                                transform: `translate${e.direction === 'vertical' ? 'Y' : 'X'}(${l.position}px) translate${e.direction === 'vertical' ? 'X' : 'Y'}(${l.offset}px)`,
                                width: n.gridItems ? `${(e.direction === 'vertical' && n.itemSecondarySize) || n.itemSize}px` : void 0,
                                height: n.gridItems ? `${(e.direction === 'horizontal' && n.itemSecondarySize) || n.itemSize}px` : void 0,
                              }
                            : null,
                          class: [
                            'vue-recycle-scroller__item-view',
                            [
                              n.itemClass,
                              {
                                hover: !n.skipHover && s.hoverKey === l.nr.key,
                              },
                            ],
                          ],
                        },
                        xv(
                          n.skipHover
                            ? {}
                            : {
                                mouseenter: () => {
                                  s.hoverKey = l.nr.key;
                                },
                                mouseleave: () => {
                                  s.hoverKey = null;
                                },
                              },
                        ),
                      ),
                      {
                        default: ve(() => [
                          ct(e.$slots, 'default', {
                            item: l.item,
                            index: l.nr.index,
                            active: l.nr.used,
                          }),
                        ]),
                        _: 2,
                      },
                      1040,
                      ['style', 'class'],
                    )
                  ),
                ),
                128,
              )),
              ct(e.$slots, 'empty'),
            ]),
            _: 3,
          },
          8,
          ['style', 'class'],
        )),
        e.$slots.after ? (be(), ke('div', E8, [ct(e.$slots, 'after')], 512)) : yt('v-if', !0),
        F(
          a,
          {
            onNotify: i.handleResize,
          },
          null,
          8,
          ['onNotify'],
        ),
      ],
      34,
    )),
    [[o, i.handleVisibilityChange]],
  );
}
oi.render = x8;
oi.__file = 'src/components/RecycleScroller.vue';
var Oa = {
  name: 'DynamicScroller',
  components: {
    RecycleScroller: oi,
  },
  provide() {
    return (
      typeof ResizeObserver < 'u' &&
        (this.$_resizeObserver = new ResizeObserver((e) => {
          requestAnimationFrame(() => {
            if (Array.isArray(e)) {
              for (const t of e)
                if (t.target) {
                  const n = new CustomEvent('resize', {
                    detail: {
                      contentRect: t.contentRect,
                    },
                  });
                  t.target.dispatchEvent(n);
                }
            }
          });
        })),
      {
        vscrollData: this.vscrollData,
        vscrollParent: this,
        vscrollResizeObserver: this.$_resizeObserver,
      }
    );
  },
  inheritAttrs: !1,
  props: {
    ...j2,
    minItemSize: {
      type: [Number, String],
      required: !0,
    },
  },
  emits: ['resize', 'visible'],
  data() {
    return {
      vscrollData: {
        active: !0,
        sizes: {},
        validSizes: {},
        keyField: this.keyField,
        simpleArray: !1,
      },
    };
  },
  computed: {
    simpleArray: W2,
    itemsWithSize() {
      const e = [],
        { items: t, keyField: n, simpleArray: r } = this,
        s = this.vscrollData.sizes,
        i = t.length;
      for (let a = 0; a < i; a++) {
        const o = t[a],
          l = r ? a : o[n];
        let u = s[l];
        typeof u > 'u' && !this.$_undefinedMap[l] && (u = 0),
          e.push({
            item: o,
            id: l,
            size: u,
          });
      }
      return e;
    },
  },
  watch: {
    items() {
      this.forceUpdate(!1);
    },
    simpleArray: {
      handler(e) {
        this.vscrollData.simpleArray = e;
      },
      immediate: !0,
    },
    direction(e) {
      this.forceUpdate(!0);
    },
    itemsWithSize(e, t) {
      const n = this.$el.scrollTop;
      let r = 0,
        s = 0;
      const i = Math.min(e.length, t.length);
      for (let o = 0; o < i && !(r >= n); o++) (r += t[o].size || this.minItemSize), (s += e[o].size || this.minItemSize);
      const a = s - r;
      a !== 0 && (this.$el.scrollTop += a);
    },
  },
  beforeCreate() {
    (this.$_updates = []), (this.$_undefinedSizes = 0), (this.$_undefinedMap = {}), (this.$_events = m8());
  },
  activated() {
    this.vscrollData.active = !0;
  },
  deactivated() {
    this.vscrollData.active = !1;
  },
  unmounted() {
    this.$_events.all.clear();
  },
  methods: {
    onScrollerResize() {
      this.$refs.scroller && this.forceUpdate(), this.$emit('resize');
    },
    onScrollerVisible() {
      this.$_events.emit('vscroll:update', {
        force: !1,
      }),
        this.$emit('visible');
    },
    forceUpdate(e = !0) {
      (e || this.simpleArray) && (this.vscrollData.validSizes = {}),
        this.$_events.emit('vscroll:update', {
          force: !0,
        });
    },
    scrollToItem(e) {
      const t = this.$refs.scroller;
      t && t.scrollToItem(e);
    },
    getItemSize(e, t = void 0) {
      const n = this.simpleArray ? (t ?? this.items.indexOf(e)) : e[this.keyField];
      return this.vscrollData.sizes[n] || 0;
    },
    scrollToBottom() {
      if (this.$_scrollingToBottom) return;
      this.$_scrollingToBottom = !0;
      const e = this.$el;
      this.$nextTick(() => {
        e.scrollTop = e.scrollHeight + 5e3;
        const t = () => {
          (e.scrollTop = e.scrollHeight + 5e3),
            requestAnimationFrame(() => {
              (e.scrollTop = e.scrollHeight + 5e3), this.$_undefinedSizes === 0 ? (this.$_scrollingToBottom = !1) : requestAnimationFrame(t);
            });
        };
        requestAnimationFrame(t);
      });
    },
  },
};
function S8(e, t, n, r, s, i) {
  const a = gt('RecycleScroller');
  return (
    be(),
    sn(
      a,
      io(
        {
          'ref': 'scroller',
          'items': i.itemsWithSize,
          'min-item-size': n.minItemSize,
          'direction': e.direction,
          'key-field': 'id',
          'list-tag': e.listTag,
          'item-tag': e.itemTag,
        },
        e.$attrs,
        {
          onResize: i.onScrollerResize,
          onVisible: i.onScrollerVisible,
        },
      ),
      {
        default: ve(({ item: o, index: l, active: u }) => [
          ct(
            e.$slots,
            'default',
            o3(
              wp({
                item: o.item,
                index: l,
                active: u,
                itemWithSize: o,
              }),
            ),
          ),
        ]),
        before: ve(() => [ct(e.$slots, 'before')]),
        after: ve(() => [ct(e.$slots, 'after')]),
        empty: ve(() => [ct(e.$slots, 'empty')]),
        _: 3,
      },
      16,
      ['items', 'min-item-size', 'direction', 'list-tag', 'item-tag', 'onResize', 'onVisible'],
    )
  );
}
Oa.render = S8;
Oa.__file = 'src/components/DynamicScroller.vue';
var Xl = {
  name: 'DynamicScrollerItem',
  inject: ['vscrollData', 'vscrollParent', 'vscrollResizeObserver'],
  props: {
    item: {
      required: !0,
    },
    watchData: {
      type: Boolean,
      default: !1,
    },
    active: {
      type: Boolean,
      required: !0,
    },
    index: {
      type: Number,
      default: void 0,
    },
    sizeDependencies: {
      type: [Array, Object],
      default: null,
    },
    emitResize: {
      type: Boolean,
      default: !1,
    },
    tag: {
      type: String,
      default: 'div',
    },
  },
  emits: ['resize'],
  computed: {
    id() {
      if (this.vscrollData.simpleArray) return this.index;
      if (this.item.hasOwnProperty(this.vscrollData.keyField)) return this.item[this.vscrollData.keyField];
      throw new Error(`keyField '${this.vscrollData.keyField}' not found in your item. You should set a valid keyField prop on your Scroller`);
    },
    size() {
      return (this.vscrollData.validSizes[this.id] && this.vscrollData.sizes[this.id]) || 0;
    },
    finalActive() {
      return this.active && this.vscrollData.active;
    },
  },
  watch: {
    watchData: 'updateWatchData',
    id() {
      this.size || this.onDataUpdate();
    },
    finalActive(e) {
      this.size ||
        (e
          ? this.vscrollParent.$_undefinedMap[this.id] || (this.vscrollParent.$_undefinedSizes++, (this.vscrollParent.$_undefinedMap[this.id] = !0))
          : this.vscrollParent.$_undefinedMap[this.id] && (this.vscrollParent.$_undefinedSizes--, (this.vscrollParent.$_undefinedMap[this.id] = !1))),
        this.vscrollResizeObserver ? (e ? this.observeSize() : this.unobserveSize()) : e && this.$_pendingVScrollUpdate === this.id && this.updateSize();
    },
  },
  created() {
    if (!this.$isServer && ((this.$_forceNextVScrollUpdate = null), this.updateWatchData(), !this.vscrollResizeObserver)) {
      for (const e in this.sizeDependencies) this.$watch(() => this.sizeDependencies[e], this.onDataUpdate);
      this.vscrollParent.$_events.on('vscroll:update', this.onVscrollUpdate);
    }
  },
  mounted() {
    this.vscrollData.active && (this.updateSize(), this.observeSize());
  },
  beforeUnmount() {
    this.vscrollParent.$_events.off('vscroll:update', this.onVscrollUpdate), this.unobserveSize();
  },
  methods: {
    updateSize() {
      this.finalActive
        ? this.$_pendingSizeUpdate !== this.id && ((this.$_pendingSizeUpdate = this.id), (this.$_forceNextVScrollUpdate = null), (this.$_pendingVScrollUpdate = null), this.computeSize(this.id))
        : (this.$_forceNextVScrollUpdate = this.id);
    },
    updateWatchData() {
      this.watchData && !this.vscrollResizeObserver
        ? (this.$_watchData = this.$watch(
            'item',
            () => {
              this.onDataUpdate();
            },
            {
              deep: !0,
            },
          ))
        : this.$_watchData && (this.$_watchData(), (this.$_watchData = null));
    },
    onVscrollUpdate({ force: e }) {
      !this.finalActive && e && (this.$_pendingVScrollUpdate = this.id), (this.$_forceNextVScrollUpdate === this.id || e || !this.size) && this.updateSize();
    },
    onDataUpdate() {
      this.updateSize();
    },
    computeSize(e) {
      this.$nextTick(() => {
        if (this.id === e) {
          const t = this.$el.offsetWidth,
            n = this.$el.offsetHeight;
          this.applySize(t, n);
        }
        this.$_pendingSizeUpdate = null;
      });
    },
    applySize(e, t) {
      const n = ~~(this.vscrollParent.direction === 'vertical' ? t : e);
      n &&
        this.size !== n &&
        (this.vscrollParent.$_undefinedMap[this.id] && (this.vscrollParent.$_undefinedSizes--, (this.vscrollParent.$_undefinedMap[this.id] = void 0)),
        (this.vscrollData.sizes[this.id] = n),
        (this.vscrollData.validSizes[this.id] = !0),
        this.emitResize && this.$emit('resize', this.id));
    },
    observeSize() {
      !this.vscrollResizeObserver || !this.$el.parentNode || (this.vscrollResizeObserver.observe(this.$el.parentNode), this.$el.parentNode.addEventListener('resize', this.onResize));
    },
    unobserveSize() {
      this.vscrollResizeObserver && (this.vscrollResizeObserver.unobserve(this.$el.parentNode), this.$el.parentNode.removeEventListener('resize', this.onResize));
    },
    onResize(e) {
      const { width: t, height: n } = e.detail.contentRect;
      this.applySize(t, n);
    },
  },
  render() {
    return ds(this.tag, this.$slots.default());
  },
};
Xl.__file = 'src/components/DynamicScrollerItem.vue';
function A8(e, t) {
  e.component(''.concat(t, 'recycle-scroller'), oi),
    e.component(''.concat(t, 'RecycleScroller'), oi),
    e.component(''.concat(t, 'dynamic-scroller'), Oa),
    e.component(''.concat(t, 'DynamicScroller'), Oa),
    e.component(''.concat(t, 'dynamic-scroller-item'), Xl),
    e.component(''.concat(t, 'DynamicScrollerItem'), Xl);
}
var C8 = {
  version: '2.0.0-beta.3',
  install: function (t, n) {
    var r = Object.assign(
      {},
      {
        installComponents: !0,
        componentsPrefix: '',
      },
      n,
    );
    for (var s in r) typeof r[s] < 'u' && (F2[s] = r[s]);
    r.installComponents && A8(t, r.componentsPrefix);
  },
};
const U2 = '/images/ui/arona_error.png';
function T8(e, t) {
  let n, r, s;
  const i = ce(!0),
    a = () => {
      (i.value = !0), s();
    };
  Ze(e, a, {
    flush: 'sync',
  });
  const o = typeof t == 'function' ? t : t.get,
    l = typeof t == 'function' ? void 0 : t.set,
    u = B3(
      (c, f) => (
        (r = c),
        (s = f),
        {
          get() {
            return i.value && ((n = o()), (i.value = !1)), r(), n;
          },
          set(h) {
            l == null || l(h);
          },
        }
      ),
    );
  return Object.isExtensible(u) && (u.trigger = a), u;
}
function li(e) {
  return Ic() ? (O1(e), !0) : !1;
}
function qn(e) {
  return typeof e == 'function' ? e() : E(e);
}
const La = typeof window < 'u' && typeof document < 'u',
  k8 = (e) => typeof e < 'u',
  $8 = Object.prototype.toString,
  O8 = (e) => $8.call(e) === '[object Object]',
  Ql = () => {};
function L8(e, t) {
  function n(...r) {
    return new Promise((s, i) => {
      Promise.resolve(
        e(() => t.apply(this, r), {
          fn: t,
          thisArg: this,
          args: r,
        }),
      )
        .then(s)
        .catch(i);
    });
  }
  return n;
}
const q2 = (e) => e();
function P8(e, t = {}) {
  let n,
    r,
    s = Ql;
  const i = (o) => {
    clearTimeout(o), s(), (s = Ql);
  };
  return (o) => {
    const l = qn(e),
      u = qn(t.maxWait);
    return (
      n && i(n),
      l <= 0 || (u !== void 0 && u <= 0)
        ? (r && (i(r), (r = null)), Promise.resolve(o()))
        : new Promise((c, f) => {
            (s = t.rejectOnCancel ? f : c),
              u &&
                !r &&
                (r = setTimeout(() => {
                  n && i(n), (r = null), c(o());
                }, u)),
              (n = setTimeout(() => {
                r && i(r), (r = null), c(o());
              }, l));
          })
    );
  };
}
function I8(e = q2) {
  const t = ce(!0);
  function n() {
    t.value = !1;
  }
  function r() {
    t.value = !0;
  }
  const s = (...i) => {
    t.value && e(...i);
  };
  return {
    isActive: zc(t),
    pause: n,
    resume: r,
    eventFilter: s,
  };
}
function M8(e, t) {
  var n;
  if (typeof e == 'number') return e + t;
  const r = ((n = e.match(/^-?[0-9]+\.?[0-9]*/)) == null ? void 0 : n[0]) || '',
    s = e.slice(r.length),
    i = Number.parseFloat(r) + t;
  return Number.isNaN(i) ? e : i + s;
}
function K2(e, t, n = {}) {
  const { eventFilter: r = q2, ...s } = n;
  return Ze(e, L8(r, t), s);
}
function N8(e, t, n = {}) {
  const { eventFilter: r, ...s } = n,
    { eventFilter: i, pause: a, resume: o, isActive: l } = I8(r);
  return {
    stop: K2(e, t, {
      ...s,
      eventFilter: i,
    }),
    pause: a,
    resume: o,
    isActive: l,
  };
}
function R8(e, t = !0) {
  _i() ? on(e) : t ? e() : Gn(e);
}
function JO(e, t = 1e3, n = {}) {
  const { immediate: r = !0, immediateCallback: s = !1 } = n;
  let i = null;
  const a = ce(!1);
  function o() {
    i && (clearInterval(i), (i = null));
  }
  function l() {
    (a.value = !1), o();
  }
  function u() {
    const c = qn(t);
    c <= 0 || ((a.value = !0), s && e(), o(), (i = setInterval(e, c)));
  }
  if ((r && La && u(), We(t) || typeof t == 'function')) {
    const c = Ze(t, () => {
      a.value && La && u();
    });
    li(c);
  }
  return (
    li(l),
    {
      isActive: a,
      pause: l,
      resume: u,
    }
  );
}
function ZO(e, t, n = {}) {
  const { debounce: r = 0, maxWait: s = void 0, ...i } = n;
  return K2(e, t, {
    ...i,
    eventFilter: P8(r, {
      maxWait: s,
    }),
  });
}
function zn(e) {
  var t;
  const n = qn(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Bt = La ? window : void 0,
  D8 = La ? window.document : void 0;
function _n(...e) {
  let t, n, r, s;
  if ((typeof e[0] == 'string' || Array.isArray(e[0]) ? (([n, r, s] = e), (t = Bt)) : ([t, n, r, s] = e), !t)) return Ql;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const i = [],
    a = () => {
      i.forEach((c) => c()), (i.length = 0);
    },
    o = (c, f, h, m) => (c.addEventListener(f, h, m), () => c.removeEventListener(f, h, m)),
    l = Ze(
      () => [zn(t), qn(s)],
      ([c, f]) => {
        if ((a(), !c)) return;
        const h = O8(f)
          ? {
              ...f,
            }
          : f;
        i.push(...n.flatMap((m) => r.map((g) => o(c, m, g, h))));
      },
      {
        immediate: !0,
        flush: 'post',
      },
    ),
    u = () => {
      l(), a();
    };
  return li(u), u;
}
function z8(e) {
  return typeof e == 'function' ? e : typeof e == 'string' ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function Fd(...e) {
  let t,
    n,
    r = {};
  e.length === 3 ? ((t = e[0]), (n = e[1]), (r = e[2])) : e.length === 2 ? (typeof e[1] == 'object' ? ((t = !0), (n = e[0]), (r = e[1])) : ((t = e[0]), (n = e[1]))) : ((t = !0), (n = e[0]));
  const { target: s = Bt, eventName: i = 'keydown', passive: a = !1, dedupe: o = !1 } = r,
    l = z8(t);
  return _n(
    s,
    i,
    (c) => {
      (c.repeat && qn(o)) || (l(c) && n(c));
    },
    a,
  );
}
function H8(e = {}) {
  var t;
  const { window: n = Bt, deep: r = !0 } = e,
    s = (t = e.document) != null ? t : n == null ? void 0 : n.document,
    i = () => {
      var o;
      let l = s == null ? void 0 : s.activeElement;
      if (r) for (; l != null && l.shadowRoot; ) l = (o = l == null ? void 0 : l.shadowRoot) == null ? void 0 : o.activeElement;
      return l;
    },
    a = T8(
      () => null,
      () => i(),
    );
  return (
    n &&
      (_n(
        n,
        'blur',
        (o) => {
          o.relatedTarget === null && a.trigger();
        },
        !0,
      ),
      _n(n, 'focus', a.trigger, !0)),
    a
  );
}
function V8() {
  const e = ce(!1);
  return (
    _i() &&
      on(() => {
        e.value = !0;
      }),
    e
  );
}
function G2(e) {
  const t = V8();
  return xe(() => (t.value, !!e()));
}
function Vr(e, t = {}) {
  const { window: n = Bt } = t,
    r = G2(() => n && 'matchMedia' in n && typeof n.matchMedia == 'function');
  let s;
  const i = ce(!1),
    a = (u) => {
      i.value = u.matches;
    },
    o = () => {
      s && ('removeEventListener' in s ? s.removeEventListener('change', a) : s.removeListener(a));
    },
    l = lv(() => {
      r.value && (o(), (s = n.matchMedia(qn(e))), 'addEventListener' in s ? s.addEventListener('change', a) : s.addListener(a), (i.value = s.matches));
    });
  return (
    li(() => {
      l(), o(), (s = void 0);
    }),
    i
  );
}
const F8 = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};
function B8(e, t = {}) {
  function n(o, l) {
    let u = e[o];
    return l != null && (u = M8(u, l)), typeof u == 'number' && (u = `${u}px`), u;
  }
  const { window: r = Bt } = t;
  function s(o) {
    return r ? r.matchMedia(o).matches : !1;
  }
  const i = (o) => Vr(`(min-width: ${n(o)})`, t),
    a = Object.keys(e).reduce(
      (o, l) => (
        Object.defineProperty(o, l, {
          get: () => i(l),
          enumerable: !0,
          configurable: !0,
        }),
        o
      ),
      {},
    );
  return Object.assign(a, {
    greater(o) {
      return Vr(`(min-width: ${n(o, 0.1)})`, t);
    },
    greaterOrEqual: i,
    smaller(o) {
      return Vr(`(max-width: ${n(o, -0.1)})`, t);
    },
    smallerOrEqual(o) {
      return Vr(`(max-width: ${n(o)})`, t);
    },
    between(o, l) {
      return Vr(`(min-width: ${n(o)}) and (max-width: ${n(l, -0.1)})`, t);
    },
    isGreater(o) {
      return s(`(min-width: ${n(o, 0.1)})`);
    },
    isGreaterOrEqual(o) {
      return s(`(min-width: ${n(o)})`);
    },
    isSmaller(o) {
      return s(`(max-width: ${n(o, -0.1)})`);
    },
    isSmallerOrEqual(o) {
      return s(`(max-width: ${n(o)})`);
    },
    isInBetween(o, l) {
      return s(`(min-width: ${n(o)}) and (max-width: ${n(l, -0.1)})`);
    },
    current() {
      const o = Object.keys(e).map((l) => [l, i(l)]);
      return xe(() => o.filter(([, l]) => l.value).map(([l]) => l));
    },
  });
}
function j8(e) {
  return JSON.parse(JSON.stringify(e));
}
const ea = typeof globalThis < 'u' ? globalThis : typeof window < 'u' ? window : typeof global < 'u' ? global : typeof self < 'u' ? self : {},
  ta = '__vueuse_ssr_handlers__',
  W8 = U8();
function U8() {
  return ta in ea || (ea[ta] = ea[ta] || {}), ea[ta];
}
function q8(e, t) {
  return W8[e] || t;
}
function K8(e) {
  return e == null
    ? 'any'
    : e instanceof Set
      ? 'set'
      : e instanceof Map
        ? 'map'
        : e instanceof Date
          ? 'date'
          : typeof e == 'boolean'
            ? 'boolean'
            : typeof e == 'string'
              ? 'string'
              : typeof e == 'object'
                ? 'object'
                : Number.isNaN(e)
                  ? 'any'
                  : 'number';
}
const G8 = {
    boolean: {
      read: (e) => e === 'true',
      write: (e) => String(e),
    },
    object: {
      read: (e) => JSON.parse(e),
      write: (e) => JSON.stringify(e),
    },
    number: {
      read: (e) => Number.parseFloat(e),
      write: (e) => String(e),
    },
    any: {
      read: (e) => e,
      write: (e) => String(e),
    },
    string: {
      read: (e) => e,
      write: (e) => String(e),
    },
    map: {
      read: (e) => new Map(JSON.parse(e)),
      write: (e) => JSON.stringify(Array.from(e.entries())),
    },
    set: {
      read: (e) => new Set(JSON.parse(e)),
      write: (e) => JSON.stringify(Array.from(e)),
    },
    date: {
      read: (e) => new Date(e),
      write: (e) => e.toISOString(),
    },
  },
  Bd = 'vueuse-storage';
function Y8(e, t, n, r = {}) {
  var s;
  const {
      flush: i = 'pre',
      deep: a = !0,
      listenToStorageChanges: o = !0,
      writeDefaults: l = !0,
      mergeDefaults: u = !1,
      shallow: c,
      window: f = Bt,
      eventFilter: h,
      onError: m = (k) => {
        console.error(k);
      },
    } = r,
    g = (c ? W1 : ce)(t);
  if (!n)
    try {
      n = q8('getDefaultStorage', () => {
        var k;
        return (k = Bt) == null ? void 0 : k.localStorage;
      })();
    } catch (k) {
      m(k);
    }
  if (!n) return g;
  const d = qn(t),
    p = K8(d),
    _ = (s = r.serializer) != null ? s : G8[p],
    { pause: v, resume: C } = N8(g, () => S(g.value), {
      flush: i,
      deep: a,
      eventFilter: h,
    });
  return f && o && (_n(f, 'storage', D), _n(f, Bd, N)), D(), g;
  function S(k) {
    try {
      if (k == null) n.removeItem(e);
      else {
        const R = _.write(k),
          M = n.getItem(e);
        M !== R &&
          (n.setItem(e, R),
          f &&
            f.dispatchEvent(
              new CustomEvent(Bd, {
                detail: {
                  key: e,
                  oldValue: M,
                  newValue: R,
                  storageArea: n,
                },
              }),
            ));
      }
    } catch (R) {
      m(R);
    }
  }
  function P(k) {
    const R = k ? k.newValue : n.getItem(e);
    if (R == null) return l && d !== null && n.setItem(e, _.write(d)), d;
    if (!k && u) {
      const M = _.read(R);
      return typeof u == 'function'
        ? u(M, d)
        : p === 'object' && !Array.isArray(M)
          ? {
              ...d,
              ...M,
            }
          : M;
    } else return typeof R != 'string' ? R : _.read(R);
  }
  function N(k) {
    D(k.detail);
  }
  function D(k) {
    if (!(k && k.storageArea !== n)) {
      if (k && k.key == null) {
        g.value = d;
        return;
      }
      if (!(k && k.key !== e)) {
        v();
        try {
          (k == null ? void 0 : k.newValue) !== _.write(g.value) && (g.value = P(k));
        } catch (R) {
          m(R);
        } finally {
          k ? Gn(C) : C();
        }
      }
    }
  }
}
function Y2(e, t, n = {}) {
  const { window: r = Bt, ...s } = n;
  let i;
  const a = G2(() => r && 'ResizeObserver' in r),
    o = () => {
      i && (i.disconnect(), (i = void 0));
    },
    l = xe(() => (Array.isArray(e) ? e.map((f) => zn(f)) : [zn(e)])),
    u = Ze(
      l,
      (f) => {
        if ((o(), a.value && r)) {
          i = new ResizeObserver(t);
          for (const h of f) h && i.observe(h, s);
        }
      },
      {
        immediate: !0,
        flush: 'post',
        deep: !0,
      },
    ),
    c = () => {
      o(), u();
    };
  return (
    li(c),
    {
      isSupported: a,
      stop: c,
    }
  );
}
function eL(e, t = {}) {
  const { reset: n = !0, windowResize: r = !0, windowScroll: s = !0, immediate: i = !0 } = t,
    a = ce(0),
    o = ce(0),
    l = ce(0),
    u = ce(0),
    c = ce(0),
    f = ce(0),
    h = ce(0),
    m = ce(0);
  function g() {
    const d = zn(e);
    if (!d) {
      n && ((a.value = 0), (o.value = 0), (l.value = 0), (u.value = 0), (c.value = 0), (f.value = 0), (h.value = 0), (m.value = 0));
      return;
    }
    const p = d.getBoundingClientRect();
    (a.value = p.height), (o.value = p.bottom), (l.value = p.left), (u.value = p.right), (c.value = p.top), (f.value = p.width), (h.value = p.x), (m.value = p.y);
  }
  return (
    Y2(e, g),
    Ze(
      () => zn(e),
      (d) => !d && g(),
    ),
    s &&
      _n('scroll', g, {
        capture: !0,
        passive: !0,
      }),
    r &&
      _n('resize', g, {
        passive: !0,
      }),
    R8(() => {
      i && g();
    }),
    {
      height: a,
      bottom: o,
      left: l,
      right: u,
      top: c,
      width: f,
      x: h,
      y: m,
      update: g,
    }
  );
}
function tL(
  e,
  t = {
    width: 0,
    height: 0,
  },
  n = {},
) {
  const { window: r = Bt, box: s = 'content-box' } = n,
    i = xe(() => {
      var l, u;
      return (u = (l = zn(e)) == null ? void 0 : l.namespaceURI) == null ? void 0 : u.includes('svg');
    }),
    a = ce(t.width),
    o = ce(t.height);
  return (
    Y2(
      e,
      ([l]) => {
        const u = s === 'border-box' ? l.borderBoxSize : s === 'content-box' ? l.contentBoxSize : l.devicePixelContentBoxSize;
        if (r && i.value) {
          const c = zn(e);
          if (c) {
            const f = r.getComputedStyle(c);
            (a.value = Number.parseFloat(f.width)), (o.value = Number.parseFloat(f.height));
          }
        } else if (u) {
          const c = Array.isArray(u) ? u : [u];
          (a.value = c.reduce((f, { inlineSize: h }) => f + h, 0)), (o.value = c.reduce((f, { blockSize: h }) => f + h, 0));
        } else (a.value = l.contentRect.width), (o.value = l.contentRect.height);
      },
      n,
    ),
    Ze(
      () => zn(e),
      (l) => {
        (a.value = l ? t.width : 0), (o.value = l ? t.height : 0);
      },
    ),
    {
      width: a,
      height: o,
    }
  );
}
const X8 = ['mousedown', 'mouseup', 'keydown', 'keyup'];
function Q8(e, t = {}) {
  const { events: n = X8, document: r = D8, initial: s = null } = t,
    i = ce(s);
  return (
    r &&
      n.forEach((a) => {
        _n(r, a, (o) => {
          typeof o.getModifierState == 'function' && (i.value = o.getModifierState(e));
        });
      }),
    i
  );
}
function kt(e, t, n = {}) {
  const { window: r = Bt } = n;
  return Y8(e, t, r == null ? void 0 : r.localStorage, n);
}
function X2(e, t, n, r = {}) {
  var s, i, a;
  const { clone: o = !1, passive: l = !1, eventName: u, deep: c = !1, defaultValue: f, shouldEmit: h } = r,
    m = _i(),
    g =
      n ||
      (m == null ? void 0 : m.emit) ||
      ((s = m == null ? void 0 : m.$emit) == null ? void 0 : s.bind(m)) ||
      ((a = (i = m == null ? void 0 : m.proxy) == null ? void 0 : i.$emit) == null ? void 0 : a.bind(m == null ? void 0 : m.proxy));
  let d = u;
  t || (t = 'modelValue'), (d = d || `update:${t.toString()}`);
  const p = (C) => (o ? (typeof o == 'function' ? o(C) : j8(C)) : C),
    _ = () => (k8(e[t]) ? p(e[t]) : f),
    v = (C) => {
      h ? h(C) && g(d, C) : g(d, C);
    };
  if (l) {
    const C = _(),
      S = ce(C);
    let P = !1;
    return (
      Ze(
        () => e[t],
        (N) => {
          P || ((P = !0), (S.value = p(N)), Gn(() => (P = !1)));
        },
      ),
      Ze(
        S,
        (N) => {
          !P && (N !== e[t] || c) && v(N);
        },
        {
          deep: c,
        },
      ),
      S
    );
  } else
    return xe({
      get() {
        return _();
      },
      set(C) {
        v(C);
      },
    });
}
function J8({ window: e = Bt } = {}) {
  if (!e)
    return {
      x: ce(0),
      y: ce(0),
    };
  const t = ce(e.scrollX),
    n = ce(e.scrollY);
  return (
    _n(
      e,
      'scroll',
      () => {
        (t.value = e.scrollX), (n.value = e.scrollY);
      },
      {
        capture: !1,
        passive: !0,
      },
    ),
    {
      x: t,
      y: n,
    }
  );
}
/*!
 * vue-router v4.2.4
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
const Fr = typeof window < 'u';
function Z8(e) {
  return e.__esModule || e[Symbol.toStringTag] === 'Module';
}
const Pe = Object.assign;
function Zo(e, t) {
  const n = {};
  for (const r in t) {
    const s = t[r];
    n[r] = jt(s) ? s.map(e) : e(s);
  }
  return n;
}
const Vs = () => {},
  jt = Array.isArray,
  ew = /\/$/,
  tw = (e) => e.replace(ew, '');
function el(e, t, n = '/') {
  let r,
    s = {},
    i = '',
    a = '';
  const o = t.indexOf('#');
  let l = t.indexOf('?');
  return (
    o < l && o >= 0 && (l = -1),
    l > -1 && ((r = t.slice(0, l)), (i = t.slice(l + 1, o > -1 ? o : t.length)), (s = e(i))),
    o > -1 && ((r = r || t.slice(0, o)), (a = t.slice(o, t.length))),
    (r = iw(r ?? t, n)),
    {
      fullPath: r + (i && '?') + i + a,
      path: r,
      query: s,
      hash: a,
    }
  );
}
function nw(e, t) {
  const n = t.query ? e(t.query) : '';
  return t.path + (n && '?') + n + (t.hash || '');
}
function jd(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || '/';
}
function rw(e, t, n) {
  const r = t.matched.length - 1,
    s = n.matched.length - 1;
  return r > -1 && r === s && is(t.matched[r], n.matched[s]) && Q2(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function is(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Q2(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!sw(e[n], t[n])) return !1;
  return !0;
}
function sw(e, t) {
  return jt(e) ? Wd(e, t) : jt(t) ? Wd(t, e) : e === t;
}
function Wd(e, t) {
  return jt(t) ? e.length === t.length && e.every((n, r) => n === t[r]) : e.length === 1 && e[0] === t;
}
function iw(e, t) {
  if (e.startsWith('/')) return e;
  if (!e) return t;
  const n = t.split('/'),
    r = e.split('/'),
    s = r[r.length - 1];
  (s === '..' || s === '.') && r.push('');
  let i = n.length - 1,
    a,
    o;
  for (a = 0; a < r.length; a++)
    if (((o = r[a]), o !== '.'))
      if (o === '..') i > 1 && i--;
      else break;
  return n.slice(0, i).join('/') + '/' + r.slice(a - (a === r.length ? 1 : 0)).join('/');
}
var ci;
(function (e) {
  (e.pop = 'pop'), (e.push = 'push');
})(ci || (ci = {}));
var Fs;
(function (e) {
  (e.back = 'back'), (e.forward = 'forward'), (e.unknown = '');
})(Fs || (Fs = {}));
function aw(e) {
  if (!e)
    if (Fr) {
      const t = document.querySelector('base');
      (e = (t && t.getAttribute('href')) || '/'), (e = e.replace(/^\w+:\/\/[^\/]+/, ''));
    } else e = '/';
  return e[0] !== '/' && e[0] !== '#' && (e = '/' + e), tw(e);
}
const ow = /^[^#]+#/;
function lw(e, t) {
  return e.replace(ow, '#') + t;
}
function cw(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    r = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: r.left - n.left - (t.left || 0),
    top: r.top - n.top - (t.top || 0),
  };
}
const bo = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset,
});
function uw(e) {
  let t;
  if ('el' in e) {
    const n = e.el,
      r = typeof n == 'string' && n.startsWith('#'),
      s = typeof n == 'string' ? (r ? document.getElementById(n.slice(1)) : document.querySelector(n)) : n;
    if (!s) return;
    t = cw(s, e);
  } else t = e;
  'scrollBehavior' in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.pageXOffset, t.top != null ? t.top : window.pageYOffset);
}
function Ud(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Jl = new Map();
function fw(e, t) {
  Jl.set(e, t);
}
function dw(e) {
  const t = Jl.get(e);
  return Jl.delete(e), t;
}
let hw = () => location.protocol + '//' + location.host;
function J2(e, t) {
  const { pathname: n, search: r, hash: s } = t,
    i = e.indexOf('#');
  if (i > -1) {
    let o = s.includes(e.slice(i)) ? e.slice(i).length : 1,
      l = s.slice(o);
    return l[0] !== '/' && (l = '/' + l), jd(l, '');
  }
  return jd(n, e) + r + s;
}
function pw(e, t, n, r) {
  let s = [],
    i = [],
    a = null;
  const o = ({ state: h }) => {
    const m = J2(e, location),
      g = n.value,
      d = t.value;
    let p = 0;
    if (h) {
      if (((n.value = m), (t.value = h), a && a === g)) {
        a = null;
        return;
      }
      p = d ? h.position - d.position : 0;
    } else r(m);
    s.forEach((_) => {
      _(n.value, g, {
        delta: p,
        type: ci.pop,
        direction: p ? (p > 0 ? Fs.forward : Fs.back) : Fs.unknown,
      });
    });
  };
  function l() {
    a = n.value;
  }
  function u(h) {
    s.push(h);
    const m = () => {
      const g = s.indexOf(h);
      g > -1 && s.splice(g, 1);
    };
    return i.push(m), m;
  }
  function c() {
    const { history: h } = window;
    h.state &&
      h.replaceState(
        Pe({}, h.state, {
          scroll: bo(),
        }),
        '',
      );
  }
  function f() {
    for (const h of i) h();
    (i = []), window.removeEventListener('popstate', o), window.removeEventListener('beforeunload', c);
  }
  return (
    window.addEventListener('popstate', o),
    window.addEventListener('beforeunload', c, {
      passive: !0,
    }),
    {
      pauseListeners: l,
      listen: u,
      destroy: f,
    }
  );
}
function qd(e, t, n, r = !1, s = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: r,
    position: window.history.length,
    scroll: s ? bo() : null,
  };
}
function mw(e) {
  const { history: t, location: n } = window,
    r = {
      value: J2(e, n),
    },
    s = {
      value: t.state,
    };
  s.value ||
    i(
      r.value,
      {
        back: null,
        current: r.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0,
    );
  function i(l, u, c) {
    const f = e.indexOf('#'),
      h = f > -1 ? (n.host && document.querySelector('base') ? e : e.slice(f)) + l : hw() + e + l;
    try {
      t[c ? 'replaceState' : 'pushState'](u, '', h), (s.value = u);
    } catch (m) {
      console.error(m), n[c ? 'replace' : 'assign'](h);
    }
  }
  function a(l, u) {
    const c = Pe({}, t.state, qd(s.value.back, l, s.value.forward, !0), u, {
      position: s.value.position,
    });
    i(l, c, !0), (r.value = l);
  }
  function o(l, u) {
    const c = Pe({}, s.value, t.state, {
      forward: l,
      scroll: bo(),
    });
    i(c.current, c, !0);
    const f = Pe(
      {},
      qd(r.value, l, null),
      {
        position: c.position + 1,
      },
      u,
    );
    i(l, f, !1), (r.value = l);
  }
  return {
    location: r,
    state: s,
    push: o,
    replace: a,
  };
}
function gw(e) {
  e = aw(e);
  const t = mw(e),
    n = pw(e, t.state, t.location, t.replace);
  function r(i, a = !0) {
    a || n.pauseListeners(), history.go(i);
  }
  const s = Pe(
    {
      location: '',
      base: e,
      go: r,
      createHref: lw.bind(null, e),
    },
    t,
    n,
  );
  return (
    Object.defineProperty(s, 'location', {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(s, 'state', {
      enumerable: !0,
      get: () => t.state.value,
    }),
    s
  );
}
function vw(e) {
  return typeof e == 'string' || (e && typeof e == 'object');
}
function Z2(e) {
  return typeof e == 'string' || typeof e == 'symbol';
}
const On = {
    path: '/',
    name: void 0,
    params: {},
    query: {},
    hash: '',
    fullPath: '/',
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  em = Symbol('');
var Zl;
(function (e) {
  (e[(e.aborted = 4)] = 'aborted'), (e[(e.cancelled = 8)] = 'cancelled'), (e[(e.duplicated = 16)] = 'duplicated');
})(Zl || (Zl = {}));
function as(e, t) {
  return Pe(
    new Error(),
    {
      type: e,
      [em]: !0,
    },
    t,
  );
}
function Gt(e, t) {
  return e instanceof Error && em in e && (t == null || !!(e.type & t));
}
const Kd = '[^/]+?',
  bw = {
    sensitive: !1,
    strict: !1,
    start: !0,
    end: !0,
  },
  _w = /[.+*?^${}()[\]/\\]/g;
function yw(e, t) {
  const n = Pe({}, bw, t),
    r = [];
  let s = n.start ? '^' : '';
  const i = [];
  for (const u of e) {
    const c = u.length ? [] : [90];
    n.strict && !u.length && (s += '/');
    for (let f = 0; f < u.length; f++) {
      const h = u[f];
      let m = 40 + (n.sensitive ? 0.25 : 0);
      if (h.type === 0) f || (s += '/'), (s += h.value.replace(_w, '\\$&')), (m += 40);
      else if (h.type === 1) {
        const { value: g, repeatable: d, optional: p, regexp: _ } = h;
        i.push({
          name: g,
          repeatable: d,
          optional: p,
        });
        const v = _ || Kd;
        if (v !== Kd) {
          m += 10;
          try {
            new RegExp(`(${v})`);
          } catch (S) {
            throw new Error(`Invalid custom RegExp for param "${g}" (${v}): ` + S.message);
          }
        }
        let C = d ? `((?:${v})(?:/(?:${v}))*)` : `(${v})`;
        f || (C = p && u.length < 2 ? `(?:/${C})` : '/' + C), p && (C += '?'), (s += C), (m += 20), p && (m += -8), d && (m += -20), v === '.*' && (m += -50);
      }
      c.push(m);
    }
    r.push(c);
  }
  if (n.strict && n.end) {
    const u = r.length - 1;
    r[u][r[u].length - 1] += 0.7000000000000001;
  }
  n.strict || (s += '/?'), n.end ? (s += '$') : n.strict && (s += '(?:/|$)');
  const a = new RegExp(s, n.sensitive ? '' : 'i');
  function o(u) {
    const c = u.match(a),
      f = {};
    if (!c) return null;
    for (let h = 1; h < c.length; h++) {
      const m = c[h] || '',
        g = i[h - 1];
      f[g.name] = m && g.repeatable ? m.split('/') : m;
    }
    return f;
  }
  function l(u) {
    let c = '',
      f = !1;
    for (const h of e) {
      (!f || !c.endsWith('/')) && (c += '/'), (f = !1);
      for (const m of h)
        if (m.type === 0) c += m.value;
        else if (m.type === 1) {
          const { value: g, repeatable: d, optional: p } = m,
            _ = g in u ? u[g] : '';
          if (jt(_) && !d) throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);
          const v = jt(_) ? _.join('/') : _;
          if (!v)
            if (p) h.length < 2 && (c.endsWith('/') ? (c = c.slice(0, -1)) : (f = !0));
            else throw new Error(`Missing required param "${g}"`);
          c += v;
        }
    }
    return c || '/';
  }
  return {
    re: a,
    score: r,
    keys: i,
    parse: o,
    stringify: l,
  };
}
function ww(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const r = t[n] - e[n];
    if (r) return r;
    n++;
  }
  return e.length < t.length ? (e.length === 1 && e[0] === 40 + 40 ? -1 : 1) : e.length > t.length ? (t.length === 1 && t[0] === 40 + 40 ? 1 : -1) : 0;
}
function Ew(e, t) {
  let n = 0;
  const r = e.score,
    s = t.score;
  for (; n < r.length && n < s.length; ) {
    const i = ww(r[n], s[n]);
    if (i) return i;
    n++;
  }
  if (Math.abs(s.length - r.length) === 1) {
    if (Gd(r)) return 1;
    if (Gd(s)) return -1;
  }
  return s.length - r.length;
}
function Gd(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const xw = {
    type: 0,
    value: '',
  },
  Sw = /[a-zA-Z0-9_]/;
function Aw(e) {
  if (!e) return [[]];
  if (e === '/') return [[xw]];
  if (!e.startsWith('/')) throw new Error(`Invalid path "${e}"`);
  function t(m) {
    throw new Error(`ERR (${n})/"${u}": ${m}`);
  }
  let n = 0,
    r = n;
  const s = [];
  let i;
  function a() {
    i && s.push(i), (i = []);
  }
  let o = 0,
    l,
    u = '',
    c = '';
  function f() {
    u &&
      (n === 0
        ? i.push({
            type: 0,
            value: u,
          })
        : n === 1 || n === 2 || n === 3
          ? (i.length > 1 && (l === '*' || l === '+') && t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),
            i.push({
              type: 1,
              value: u,
              regexp: c,
              repeatable: l === '*' || l === '+',
              optional: l === '*' || l === '?',
            }))
          : t('Invalid state to consume buffer'),
      (u = ''));
  }
  function h() {
    u += l;
  }
  for (; o < e.length; ) {
    if (((l = e[o++]), l === '\\' && n !== 2)) {
      (r = n), (n = 4);
      continue;
    }
    switch (n) {
      case 0:
        l === '/' ? (u && f(), a()) : l === ':' ? (f(), (n = 1)) : h();
        break;
      case 4:
        h(), (n = r);
        break;
      case 1:
        l === '(' ? (n = 2) : Sw.test(l) ? h() : (f(), (n = 0), l !== '*' && l !== '?' && l !== '+' && o--);
        break;
      case 2:
        l === ')' ? (c[c.length - 1] == '\\' ? (c = c.slice(0, -1) + l) : (n = 3)) : (c += l);
        break;
      case 3:
        f(), (n = 0), l !== '*' && l !== '?' && l !== '+' && o--, (c = '');
        break;
      default:
        t('Unknown state');
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${u}"`), f(), a(), s;
}
function Cw(e, t, n) {
  const r = yw(Aw(e.path), n),
    s = Pe(r, {
      record: e,
      parent: t,
      children: [],
      alias: [],
    });
  return t && !s.record.aliasOf == !t.record.aliasOf && t.children.push(s), s;
}
function Tw(e, t) {
  const n = [],
    r = new Map();
  t = Qd(
    {
      strict: !1,
      end: !0,
      sensitive: !1,
    },
    t,
  );
  function s(c) {
    return r.get(c);
  }
  function i(c, f, h) {
    const m = !h,
      g = kw(c);
    g.aliasOf = h && h.record;
    const d = Qd(t, c),
      p = [g];
    if ('alias' in c) {
      const C = typeof c.alias == 'string' ? [c.alias] : c.alias;
      for (const S of C)
        p.push(
          Pe({}, g, {
            components: h ? h.record.components : g.components,
            path: S,
            aliasOf: h ? h.record : g,
          }),
        );
    }
    let _, v;
    for (const C of p) {
      const { path: S } = C;
      if (f && S[0] !== '/') {
        const P = f.record.path,
          N = P[P.length - 1] === '/' ? '' : '/';
        C.path = f.record.path + (S && N + S);
      }
      if (((_ = Cw(C, f, d)), h ? h.alias.push(_) : ((v = v || _), v !== _ && v.alias.push(_), m && c.name && !Xd(_) && a(c.name)), g.children)) {
        const P = g.children;
        for (let N = 0; N < P.length; N++) i(P[N], _, h && h.children[N]);
      }
      (h = h || _), ((_.record.components && Object.keys(_.record.components).length) || _.record.name || _.record.redirect) && l(_);
    }
    return v
      ? () => {
          a(v);
        }
      : Vs;
  }
  function a(c) {
    if (Z2(c)) {
      const f = r.get(c);
      f && (r.delete(c), n.splice(n.indexOf(f), 1), f.children.forEach(a), f.alias.forEach(a));
    } else {
      const f = n.indexOf(c);
      f > -1 && (n.splice(f, 1), c.record.name && r.delete(c.record.name), c.children.forEach(a), c.alias.forEach(a));
    }
  }
  function o() {
    return n;
  }
  function l(c) {
    let f = 0;
    for (; f < n.length && Ew(c, n[f]) >= 0 && (c.record.path !== n[f].record.path || !tm(c, n[f])); ) f++;
    n.splice(f, 0, c), c.record.name && !Xd(c) && r.set(c.record.name, c);
  }
  function u(c, f) {
    let h,
      m = {},
      g,
      d;
    if ('name' in c && c.name) {
      if (((h = r.get(c.name)), !h))
        throw as(1, {
          location: c,
        });
      (d = h.record.name),
        (m = Pe(
          Yd(
            f.params,
            h.keys.filter((v) => !v.optional).map((v) => v.name),
          ),
          c.params &&
            Yd(
              c.params,
              h.keys.map((v) => v.name),
            ),
        )),
        (g = h.stringify(m));
    } else if ('path' in c) (g = c.path), (h = n.find((v) => v.re.test(g))), h && ((m = h.parse(g)), (d = h.record.name));
    else {
      if (((h = f.name ? r.get(f.name) : n.find((v) => v.re.test(f.path))), !h))
        throw as(1, {
          location: c,
          currentLocation: f,
        });
      (d = h.record.name), (m = Pe({}, f.params, c.params)), (g = h.stringify(m));
    }
    const p = [];
    let _ = h;
    for (; _; ) p.unshift(_.record), (_ = _.parent);
    return {
      name: d,
      path: g,
      params: m,
      matched: p,
      meta: Ow(p),
    };
  }
  return (
    e.forEach((c) => i(c)),
    {
      addRoute: i,
      resolve: u,
      removeRoute: a,
      getRoutes: o,
      getRecordMatcher: s,
    }
  );
}
function Yd(e, t) {
  const n = {};
  for (const r of t) r in e && (n[r] = e[r]);
  return n;
}
function kw(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: $w(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      'components' in e
        ? e.components || null
        : e.component && {
            default: e.component,
          },
  };
}
function $w(e) {
  const t = {},
    n = e.props || !1;
  if ('component' in e) t.default = n;
  else for (const r in e.components) t[r] = typeof n == 'object' ? n[r] : n;
  return t;
}
function Xd(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function Ow(e) {
  return e.reduce((t, n) => Pe(t, n.meta), {});
}
function Qd(e, t) {
  const n = {};
  for (const r in e) n[r] = r in t ? t[r] : e[r];
  return n;
}
function tm(e, t) {
  return t.children.some((n) => n === e || tm(e, n));
}
const nm = /#/g,
  Lw = /&/g,
  Pw = /\//g,
  Iw = /=/g,
  Mw = /\?/g,
  rm = /\+/g,
  Nw = /%5B/g,
  Rw = /%5D/g,
  sm = /%5E/g,
  Dw = /%60/g,
  im = /%7B/g,
  zw = /%7C/g,
  am = /%7D/g,
  Hw = /%20/g;
function vu(e) {
  return encodeURI('' + e)
    .replace(zw, '|')
    .replace(Nw, '[')
    .replace(Rw, ']');
}
function Vw(e) {
  return vu(e).replace(im, '{').replace(am, '}').replace(sm, '^');
}
function ec(e) {
  return vu(e).replace(rm, '%2B').replace(Hw, '+').replace(nm, '%23').replace(Lw, '%26').replace(Dw, '`').replace(im, '{').replace(am, '}').replace(sm, '^');
}
function Fw(e) {
  return ec(e).replace(Iw, '%3D');
}
function Bw(e) {
  return vu(e).replace(nm, '%23').replace(Mw, '%3F');
}
function jw(e) {
  return e == null ? '' : Bw(e).replace(Pw, '%2F');
}
function Pa(e) {
  try {
    return decodeURIComponent('' + e);
  } catch {}
  return '' + e;
}
function Ww(e) {
  const t = {};
  if (e === '' || e === '?') return t;
  const r = (e[0] === '?' ? e.slice(1) : e).split('&');
  for (let s = 0; s < r.length; ++s) {
    const i = r[s].replace(rm, ' '),
      a = i.indexOf('='),
      o = Pa(a < 0 ? i : i.slice(0, a)),
      l = a < 0 ? null : Pa(i.slice(a + 1));
    if (o in t) {
      let u = t[o];
      jt(u) || (u = t[o] = [u]), u.push(l);
    } else t[o] = l;
  }
  return t;
}
function Jd(e) {
  let t = '';
  for (let n in e) {
    const r = e[n];
    if (((n = Fw(n)), r == null)) {
      r !== void 0 && (t += (t.length ? '&' : '') + n);
      continue;
    }
    (jt(r) ? r.map((i) => i && ec(i)) : [r && ec(r)]).forEach((i) => {
      i !== void 0 && ((t += (t.length ? '&' : '') + n), i != null && (t += '=' + i));
    });
  }
  return t;
}
function Uw(e) {
  const t = {};
  for (const n in e) {
    const r = e[n];
    r !== void 0 && (t[n] = jt(r) ? r.map((s) => (s == null ? null : '' + s)) : r == null ? r : '' + r);
  }
  return t;
}
const om = Symbol(''),
  Zd = Symbol(''),
  _o = Symbol(''),
  bu = Symbol(''),
  tc = Symbol('');
function xs() {
  let e = [];
  function t(r) {
    return (
      e.push(r),
      () => {
        const s = e.indexOf(r);
        s > -1 && e.splice(s, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return {
    add: t,
    list: () => e.slice(),
    reset: n,
  };
}
function qw(e, t, n) {
  const r = () => {
    e[t].delete(n);
  };
  fs(r),
    sp(r),
    rp(() => {
      e[t].add(n);
    }),
    e[t].add(n);
}
function nL(e) {
  const t = wt(om, {}).value;
  t && qw(t, 'updateGuards', e);
}
function In(e, t, n, r, s) {
  const i = r && (r.enterCallbacks[s] = r.enterCallbacks[s] || []);
  return () =>
    new Promise((a, o) => {
      const l = (f) => {
          f === !1
            ? o(
                as(4, {
                  from: n,
                  to: t,
                }),
              )
            : f instanceof Error
              ? o(f)
              : vw(f)
                ? o(
                    as(2, {
                      from: t,
                      to: f,
                    }),
                  )
                : (i && r.enterCallbacks[s] === i && typeof f == 'function' && i.push(f), a());
        },
        u = e.call(r && r.instances[s], t, n, l);
      let c = Promise.resolve(u);
      e.length < 3 && (c = c.then(l)), c.catch((f) => o(f));
    });
}
function tl(e, t, n, r) {
  const s = [];
  for (const i of e)
    for (const a in i.components) {
      let o = i.components[a];
      if (!(t !== 'beforeRouteEnter' && !i.instances[a]))
        if (Kw(o)) {
          const u = (o.__vccOpts || o)[t];
          u && s.push(In(u, n, r, i, a));
        } else {
          let l = o();
          s.push(() =>
            l.then((u) => {
              if (!u) return Promise.reject(new Error(`Couldn't resolve component "${a}" at "${i.path}"`));
              const c = Z8(u) ? u.default : u;
              i.components[a] = c;
              const h = (c.__vccOpts || c)[t];
              return h && In(h, n, r, i, a)();
            }),
          );
        }
    }
  return s;
}
function Kw(e) {
  return typeof e == 'object' || 'displayName' in e || 'props' in e || '__vccOpts' in e;
}
function eh(e) {
  const t = wt(_o),
    n = wt(bu),
    r = xe(() => t.resolve(E(e.to))),
    s = xe(() => {
      const { matched: l } = r.value,
        { length: u } = l,
        c = l[u - 1],
        f = n.matched;
      if (!c || !f.length) return -1;
      const h = f.findIndex(is.bind(null, c));
      if (h > -1) return h;
      const m = th(l[u - 2]);
      return u > 1 && th(c) === m && f[f.length - 1].path !== m ? f.findIndex(is.bind(null, l[u - 2])) : h;
    }),
    i = xe(() => s.value > -1 && Qw(n.params, r.value.params)),
    a = xe(() => s.value > -1 && s.value === n.matched.length - 1 && Q2(n.params, r.value.params));
  function o(l = {}) {
    return Xw(l) ? t[E(e.replace) ? 'replace' : 'push'](E(e.to)).catch(Vs) : Promise.resolve();
  }
  return {
    route: r,
    href: xe(() => r.value.href),
    isActive: i,
    isExactActive: a,
    navigate: o,
  };
}
const Gw = Wc({
    name: 'RouterLink',
    compatConfig: {
      MODE: 3,
    },
    props: {
      to: {
        type: [String, Object],
        required: !0,
      },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: {
        type: String,
        default: 'page',
      },
    },
    useLink: eh,
    setup(e, { slots: t }) {
      const n = un(eh(e)),
        { options: r } = wt(_o),
        s = xe(() => ({
          [nh(e.activeClass, r.linkActiveClass, 'router-link-active')]: n.isActive,
          [nh(e.exactActiveClass, r.linkExactActiveClass, 'router-link-exact-active')]: n.isExactActive,
        }));
      return () => {
        const i = t.default && t.default(n);
        return e.custom
          ? i
          : ds(
              'a',
              {
                'aria-current': n.isExactActive ? e.ariaCurrentValue : null,
                'href': n.href,
                'onClick': n.navigate,
                'class': s.value,
              },
              i,
            );
      };
    },
  }),
  Yw = Gw;
function Xw(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute('target');
      if (/\b_blank\b/i.test(t)) return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function Qw(e, t) {
  for (const n in t) {
    const r = t[n],
      s = e[n];
    if (typeof r == 'string') {
      if (r !== s) return !1;
    } else if (!jt(s) || s.length !== r.length || r.some((i, a) => i !== s[a])) return !1;
  }
  return !0;
}
function th(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : '';
}
const nh = (e, t, n) => e ?? t ?? n,
  Jw = Wc({
    name: 'RouterView',
    inheritAttrs: !1,
    props: {
      name: {
        type: String,
        default: 'default',
      },
      route: Object,
    },
    compatConfig: {
      MODE: 3,
    },
    setup(e, { attrs: t, slots: n }) {
      const r = wt(tc),
        s = xe(() => e.route || r.value),
        i = wt(Zd, 0),
        a = xe(() => {
          let u = E(i);
          const { matched: c } = s.value;
          let f;
          for (; (f = c[u]) && !f.components; ) u++;
          return u;
        }),
        o = xe(() => s.value.matched[a.value]);
      Yr(
        Zd,
        xe(() => a.value + 1),
      ),
        Yr(om, o),
        Yr(tc, s);
      const l = ce();
      return (
        Ze(
          () => [l.value, o.value, e.name],
          ([u, c, f], [h, m, g]) => {
            c && ((c.instances[f] = u), m && m !== c && u && u === h && (c.leaveGuards.size || (c.leaveGuards = m.leaveGuards), c.updateGuards.size || (c.updateGuards = m.updateGuards))),
              u && c && (!m || !is(c, m) || !h) && (c.enterCallbacks[f] || []).forEach((d) => d(u));
          },
          {
            flush: 'post',
          },
        ),
        () => {
          const u = s.value,
            c = e.name,
            f = o.value,
            h = f && f.components[c];
          if (!h)
            return rh(n.default, {
              Component: h,
              route: u,
            });
          const m = f.props[c],
            g = m ? (m === !0 ? u.params : typeof m == 'function' ? m(u) : m) : null,
            p = ds(
              h,
              Pe({}, g, t, {
                onVnodeUnmounted: (_) => {
                  _.component.isUnmounted && (f.instances[c] = null);
                },
                ref: l,
              }),
            );
          return (
            rh(n.default, {
              Component: p,
              route: u,
            }) || p
          );
        }
      );
    },
  });
function rh(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const lm = Jw;
function Zw(e) {
  const t = Tw(e.routes, e),
    n = e.parseQuery || Ww,
    r = e.stringifyQuery || Jd,
    s = e.history,
    i = xs(),
    a = xs(),
    o = xs(),
    l = W1(On);
  let u = On;
  Fr && e.scrollBehavior && 'scrollRestoration' in history && (history.scrollRestoration = 'manual');
  const c = Zo.bind(null, (A) => '' + A),
    f = Zo.bind(null, jw),
    h = Zo.bind(null, Pa);
  function m(A, I) {
    let T, B;
    return Z2(A) ? ((T = t.getRecordMatcher(A)), (B = I)) : (B = A), t.addRoute(B, T);
  }
  function g(A) {
    const I = t.getRecordMatcher(A);
    I && t.removeRoute(I);
  }
  function d() {
    return t.getRoutes().map((A) => A.record);
  }
  function p(A) {
    return !!t.getRecordMatcher(A);
  }
  function _(A, I) {
    if (((I = Pe({}, I || l.value)), typeof A == 'string')) {
      const x = el(n, A, I.path),
        L = t.resolve(
          {
            path: x.path,
          },
          I,
        ),
        $ = s.createHref(x.fullPath);
      return Pe(x, L, {
        params: h(L.params),
        hash: Pa(x.hash),
        redirectedFrom: void 0,
        href: $,
      });
    }
    let T;
    if ('path' in A)
      T = Pe({}, A, {
        path: el(n, A.path, I.path).path,
      });
    else {
      const x = Pe({}, A.params);
      for (const L in x) x[L] == null && delete x[L];
      (T = Pe({}, A, {
        params: f(x),
      })),
        (I.params = f(I.params));
    }
    const B = t.resolve(T, I),
      J = A.hash || '';
    B.params = c(h(B.params));
    const b = nw(
        r,
        Pe({}, A, {
          hash: Vw(J),
          path: B.path,
        }),
      ),
      y = s.createHref(b);
    return Pe(
      {
        fullPath: b,
        hash: J,
        query: r === Jd ? Uw(A.query) : A.query || {},
      },
      B,
      {
        redirectedFrom: void 0,
        href: y,
      },
    );
  }
  function v(A) {
    return typeof A == 'string' ? el(n, A, l.value.path) : Pe({}, A);
  }
  function C(A, I) {
    if (u !== A)
      return as(8, {
        from: I,
        to: A,
      });
  }
  function S(A) {
    return D(A);
  }
  function P(A) {
    return S(
      Pe(v(A), {
        replace: !0,
      }),
    );
  }
  function N(A) {
    const I = A.matched[A.matched.length - 1];
    if (I && I.redirect) {
      const { redirect: T } = I;
      let B = typeof T == 'function' ? T(A) : T;
      return (
        typeof B == 'string' &&
          ((B =
            B.includes('?') || B.includes('#')
              ? (B = v(B))
              : {
                  path: B,
                }),
          (B.params = {})),
        Pe(
          {
            query: A.query,
            hash: A.hash,
            params: 'path' in B ? {} : A.params,
          },
          B,
        )
      );
    }
  }
  function D(A, I) {
    const T = (u = _(A)),
      B = l.value,
      J = A.state,
      b = A.force,
      y = A.replace === !0,
      x = N(T);
    if (x)
      return D(
        Pe(v(x), {
          state: typeof x == 'object' ? Pe({}, J, x.state) : J,
          force: b,
          replace: y,
        }),
        I || T,
      );
    const L = T;
    L.redirectedFrom = I;
    let $;
    return (
      !b &&
        rw(r, B, T) &&
        (($ = as(16, {
          to: L,
          from: B,
        })),
        tt(B, B, !0, !1)),
      ($ ? Promise.resolve($) : M(L, B))
        .catch((z) => (Gt(z) ? (Gt(z, 2) ? z : Ye(z)) : Se(z, L, B)))
        .then((z) => {
          if (z) {
            if (Gt(z, 2))
              return D(
                Pe(
                  {
                    replace: y,
                  },
                  v(z.to),
                  {
                    state: typeof z.to == 'object' ? Pe({}, J, z.to.state) : J,
                    force: b,
                  },
                ),
                I || L,
              );
          } else z = Q(L, B, !0, y, J);
          return ee(L, B, z), z;
        })
    );
  }
  function k(A, I) {
    const T = C(A, I);
    return T ? Promise.reject(T) : Promise.resolve();
  }
  function R(A) {
    const I = O.values().next().value;
    return I && typeof I.runWithContext == 'function' ? I.runWithContext(A) : A();
  }
  function M(A, I) {
    let T;
    const [B, J, b] = e7(A, I);
    T = tl(B.reverse(), 'beforeRouteLeave', A, I);
    for (const x of B)
      x.leaveGuards.forEach((L) => {
        T.push(In(L, A, I));
      });
    const y = k.bind(null, A, I);
    return (
      T.push(y),
      ne(T)
        .then(() => {
          T = [];
          for (const x of i.list()) T.push(In(x, A, I));
          return T.push(y), ne(T);
        })
        .then(() => {
          T = tl(J, 'beforeRouteUpdate', A, I);
          for (const x of J)
            x.updateGuards.forEach((L) => {
              T.push(In(L, A, I));
            });
          return T.push(y), ne(T);
        })
        .then(() => {
          T = [];
          for (const x of b)
            if (x.beforeEnter)
              if (jt(x.beforeEnter)) for (const L of x.beforeEnter) T.push(In(L, A, I));
              else T.push(In(x.beforeEnter, A, I));
          return T.push(y), ne(T);
        })
        .then(() => (A.matched.forEach((x) => (x.enterCallbacks = {})), (T = tl(b, 'beforeRouteEnter', A, I)), T.push(y), ne(T)))
        .then(() => {
          T = [];
          for (const x of a.list()) T.push(In(x, A, I));
          return T.push(y), ne(T);
        })
        .catch((x) => (Gt(x, 8) ? x : Promise.reject(x)))
    );
  }
  function ee(A, I, T) {
    o.list().forEach((B) => R(() => B(A, I, T)));
  }
  function Q(A, I, T, B, J) {
    const b = C(A, I);
    if (b) return b;
    const y = I === On,
      x = Fr ? history.state : {};
    T &&
      (B || y
        ? s.replace(
            A.fullPath,
            Pe(
              {
                scroll: y && x && x.scroll,
              },
              J,
            ),
          )
        : s.push(A.fullPath, J)),
      (l.value = A),
      tt(A, I, T, y),
      Ye();
  }
  let te;
  function fe() {
    te ||
      (te = s.listen((A, I, T) => {
        if (!q.listening) return;
        const B = _(A),
          J = N(B);
        if (J) {
          D(
            Pe(J, {
              replace: !0,
            }),
            B,
          ).catch(Vs);
          return;
        }
        u = B;
        const b = l.value;
        Fr && fw(Ud(b.fullPath, T.delta), bo()),
          M(B, b)
            .catch((y) =>
              Gt(y, 12)
                ? y
                : Gt(y, 2)
                  ? (D(y.to, B)
                      .then((x) => {
                        Gt(x, 20) && !T.delta && T.type === ci.pop && s.go(-1, !1);
                      })
                      .catch(Vs),
                    Promise.reject())
                  : (T.delta && s.go(-T.delta, !1), Se(y, B, b)),
            )
            .then((y) => {
              (y = y || Q(B, b, !1)), y && (T.delta && !Gt(y, 8) ? s.go(-T.delta, !1) : T.type === ci.pop && Gt(y, 20) && s.go(-1, !1)), ee(B, b, y);
            })
            .catch(Vs);
      }));
  }
  let ye = xs(),
    ae = xs(),
    de;
  function Se(A, I, T) {
    Ye(A);
    const B = ae.list();
    return B.length ? B.forEach((J) => J(A, I, T)) : console.error(A), Promise.reject(A);
  }
  function Ce() {
    return de && l.value !== On
      ? Promise.resolve()
      : new Promise((A, I) => {
          ye.add([A, I]);
        });
  }
  function Ye(A) {
    return de || ((de = !A), fe(), ye.list().forEach(([I, T]) => (A ? T(A) : I())), ye.reset()), A;
  }
  function tt(A, I, T, B) {
    const { scrollBehavior: J } = e;
    if (!Fr || !J) return Promise.resolve();
    const b = (!T && dw(Ud(A.fullPath, 0))) || ((B || !T) && history.state && history.state.scroll) || null;
    return Gn()
      .then(() => J(A, I, b))
      .then((y) => y && uw(y))
      .catch((y) => Se(y, A, I));
  }
  const He = (A) => s.go(A);
  let W;
  const O = new Set(),
    q = {
      currentRoute: l,
      listening: !0,
      addRoute: m,
      removeRoute: g,
      hasRoute: p,
      getRoutes: d,
      resolve: _,
      options: e,
      push: S,
      replace: P,
      go: He,
      back: () => He(-1),
      forward: () => He(1),
      beforeEach: i.add,
      beforeResolve: a.add,
      afterEach: o.add,
      onError: ae.add,
      isReady: Ce,
      install(A) {
        const I = this;
        A.component('RouterLink', Yw),
          A.component('RouterView', lm),
          (A.config.globalProperties.$router = I),
          Object.defineProperty(A.config.globalProperties, '$route', {
            enumerable: !0,
            get: () => E(l),
          }),
          Fr && !W && l.value === On && ((W = !0), S(s.location).catch((J) => {}));
        const T = {};
        for (const J in On)
          Object.defineProperty(T, J, {
            get: () => l.value[J],
            enumerable: !0,
          });
        A.provide(_o, I), A.provide(bu, Dc(T)), A.provide(tc, l);
        const B = A.unmount;
        O.add(A),
          (A.unmount = function () {
            O.delete(A), O.size < 1 && ((u = On), te && te(), (te = null), (l.value = On), (W = !1), (de = !1)), B();
          });
      },
    };
  function ne(A) {
    return A.reduce((I, T) => I.then(() => R(T)), Promise.resolve());
  }
  return q;
}
function e7(e, t) {
  const n = [],
    r = [],
    s = [],
    i = Math.max(t.matched.length, e.matched.length);
  for (let a = 0; a < i; a++) {
    const o = t.matched[a];
    o && (e.matched.find((u) => is(u, o)) ? r.push(o) : n.push(o));
    const l = e.matched[a];
    l && (t.matched.find((u) => is(u, l)) || s.push(l));
  }
  return [n, r, s];
}
function cm() {
  return wt(_o);
}
function t7() {
  return wt(bu);
}
var rL = {
    prefix: 'fas',
    iconName: 'trash-can',
    icon: [
      448,
      512,
      [61460, 'trash-alt'],
      'f2ed',
      'M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z',
    ],
  },
  n7 = {
    prefix: 'fas',
    iconName: 'right-from-bracket',
    icon: [
      512,
      512,
      ['sign-out-alt'],
      'f2f5',
      'M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z',
    ],
  },
  r7 = {
    prefix: 'fas',
    iconName: 'arrow-up-long',
    icon: [
      384,
      512,
      ['long-arrow-up'],
      'f176',
      'M214.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3V480c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128z',
    ],
  },
  sL = {
    prefix: 'fas',
    iconName: 'clipboard-list',
    icon: [
      384,
      512,
      [],
      'f46d',
      'M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16z',
    ],
  },
  iL = {
    prefix: 'fas',
    iconName: 'arrow-down-9-1',
    icon: [
      576,
      512,
      ['sort-numeric-desc', 'sort-numeric-down-alt'],
      'f886',
      'M160 480c9 0 17.5-3.8 23.6-10.4l88-96c11.9-13 11.1-33.3-2-45.2s-33.3-11.1-45.2 2L192 365.7V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V365.7L95.6 330.4c-11.9-13-32.2-13.9-45.2-2s-13.9 32.2-2 45.2l88 96C142.5 476.2 151 480 160 480zM450.7 294c-8.3-6-19.1-7.7-28.8-4.4l-48 16c-16.8 5.6-25.8 23.7-20.2 40.5s23.7 25.8 40.5 20.2l5.9-2V416H384c-17.7 0-32 14.3-32 32s14.3 32 32 32h48 48c17.7 0 32-14.3 32-32s-14.3-32-32-32H464V320c0-10.3-4.9-19.9-13.3-26zM418.3 91a32 32 0 1 1 27.4 57.9A32 32 0 1 1 418.3 91zM405.1 203.8l-6.8 9.2c-10.5 14.2-7.5 34.2 6.7 44.8s34.2 7.5 44.8-6.7l48.8-65.8c14-18.9 21.5-41.7 21.5-65.2c0-48.6-39.4-88-88-88s-88 39.4-88 88c0 39.2 25.6 72.4 61.1 83.8z',
    ],
  },
  s7 = {
    prefix: 'fas',
    iconName: 'bars',
    icon: [
      448,
      512,
      ['navicon'],
      'f0c9',
      'M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z',
    ],
  },
  i7 = {
    prefix: 'fas',
    iconName: 'square-check',
    icon: [
      448,
      512,
      [9745, 9989, 61510, 'check-square'],
      'f14a',
      'M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z',
    ],
  },
  aL = i7,
  oL = {
    prefix: 'fas',
    iconName: 'lock',
    icon: [
      448,
      512,
      [128274],
      'f023',
      'M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z',
    ],
  },
  lL = {
    prefix: 'fas',
    iconName: 'arrow-down-z-a',
    icon: [
      576,
      512,
      ['sort-alpha-desc', 'sort-alpha-down-alt'],
      'f881',
      'M183.6 469.6C177.5 476.2 169 480 160 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L128 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 64c0-17.7 14.3-32 32-32H480c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9L429.3 160H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H352c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9L402.7 96H352c-17.7 0-32-14.3-32-32zm96 192c12.1 0 23.2 6.8 28.6 17.7l64 128 16 32c7.9 15.8 1.5 35-14.3 42.9s-35 1.5-42.9-14.3L460.2 448H371.8l-7.2 14.3c-7.9 15.8-27.1 22.2-42.9 14.3s-22.2-27.1-14.3-42.9l16-32 64-128c5.4-10.8 16.5-17.7 28.6-17.7zM395.8 400h40.4L416 359.6 395.8 400z',
    ],
  },
  a7 = {
    prefix: 'fas',
    iconName: 'mitten',
    icon: [
      448,
      512,
      [],
      'f7b5',
      'M352 384H64L5.4 178.9C1.8 166.4 0 153.4 0 140.3C0 62.8 62.8 0 140.3 0h3.4c66 0 123.5 44.9 139.5 108.9l31.4 125.8 17.6-20.1C344.8 200.2 362.9 192 382 192h2.8c34.9 0 63.3 28.3 63.3 63.3c0 15.9-6 31.2-16.8 42.9L352 384zM32 448c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32v32c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V448z',
    ],
  },
  cL = {
    prefix: 'fas',
    iconName: 'chevron-up',
    icon: [
      512,
      512,
      [],
      'f077',
      'M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z',
    ],
  },
  o7 = {
    prefix: 'fas',
    iconName: 'stopwatch',
    icon: [
      448,
      512,
      [9201],
      'f2f2',
      'M176 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h16V98.4C92.3 113.8 16 200 16 304c0 114.9 93.1 208 208 208s208-93.1 208-208c0-41.8-12.3-80.7-33.5-113.2l24.1-24.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L355.7 143c-28.1-23-62.2-38.8-99.7-44.6V64h16c17.7 0 32-14.3 32-32s-14.3-32-32-32H224 176zm72 192V320c0 13.3-10.7 24-24 24s-24-10.7-24-24V192c0-13.3 10.7-24 24-24s24 10.7 24 24z',
    ],
  },
  uL = {
    prefix: 'fas',
    iconName: 'chart-simple',
    icon: [
      448,
      512,
      [],
      'e473',
      'M160 80c0-26.5 21.5-48 48-48h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V80zM0 272c0-26.5 21.5-48 48-48H80c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272zM368 96h32c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H368c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48z',
    ],
  },
  fL = {
    prefix: 'fas',
    iconName: 'wand-magic-sparkles',
    icon: [
      576,
      512,
      ['magic-wand-sparkles'],
      'e2ca',
      'M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z',
    ],
  },
  dL = {
    prefix: 'fas',
    iconName: 'user',
    icon: [
      448,
      512,
      [128100, 62144],
      'f007',
      'M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z',
    ],
  },
  um = {
    prefix: 'fas',
    iconName: 'globe',
    icon: [
      512,
      512,
      [127760],
      'f0ac',
      'M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z',
    ],
  },
  hL = {
    prefix: 'fas',
    iconName: 'star',
    icon: [
      576,
      512,
      [11088, 61446],
      'f005',
      'M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z',
    ],
  },
  pL = {
    prefix: 'fas',
    iconName: 'repeat',
    icon: [
      512,
      512,
      [128257],
      'f363',
      'M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96H320v32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32V64H160C71.6 64 0 135.6 0 224zm512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96H192V352c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V448H352c88.4 0 160-71.6 160-160z',
    ],
  },
  sh = {
    prefix: 'fas',
    iconName: 'box',
    icon: [
      448,
      512,
      [128230],
      'f466',
      'M50.7 58.5L0 160H208V32H93.7C75.5 32 58.9 42.3 50.7 58.5zM240 160H448L397.3 58.5C389.1 42.3 372.5 32 354.3 32H240V160zm208 32H0V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192z',
    ],
  },
  l7 = {
    prefix: 'fas',
    iconName: 'right-to-bracket',
    icon: [
      512,
      512,
      ['sign-in-alt'],
      'f2f6',
      'M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z',
    ],
  },
  ih = {
    prefix: 'fas',
    iconName: 'user-group',
    icon: [
      640,
      512,
      [128101, 'user-friends'],
      'f500',
      'M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z',
    ],
  },
  mL = {
    prefix: 'fas',
    iconName: 'arrow-up-a-z',
    icon: [
      576,
      512,
      ['sort-alpha-up'],
      'f15e',
      'M183.6 42.4C177.5 35.8 169 32 160 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L128 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 320c0 17.7 14.3 32 32 32h50.7l-73.4 73.4c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H429.3l73.4-73.4c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8H352c-17.7 0-32 14.3-32 32zM416 32c-12.1 0-23.2 6.8-28.6 17.7l-64 128-16 32c-7.9 15.8-1.5 35 14.3 42.9s35 1.5 42.9-14.3l7.2-14.3h88.4l7.2 14.3c7.9 15.8 27.1 22.2 42.9 14.3s22.2-27.1 14.3-42.9l-16-32-64-128C439.2 38.8 428.1 32 416 32zM395.8 176L416 135.6 436.2 176H395.8z',
    ],
  },
  c7 = {
    prefix: 'fas',
    iconName: 'circle-arrow-up',
    icon: [
      512,
      512,
      ['arrow-circle-up'],
      'f0aa',
      'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM385 231c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-71-71V376c0 13.3-10.7 24-24 24s-24-10.7-24-24V193.9l-71 71c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 119c9.4-9.4 24.6-9.4 33.9 0L385 231z',
    ],
  },
  gL = c7,
  vL = {
    prefix: 'fas',
    iconName: 'microphone-lines',
    icon: [
      384,
      512,
      [127897, 'microphone-alt'],
      'f3c9',
      'M96 96V256c0 53 43 96 96 96s96-43 96-96H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V192H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V128H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80c0-53-43-96-96-96S96 43 96 96zM320 240v16c0 70.7-57.3 128-128 128s-128-57.3-128-128V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v24z',
    ],
  },
  u7 = {
    prefix: 'fas',
    iconName: 'map-location-dot',
    icon: [
      576,
      512,
      ['map-marked-alt'],
      'f5a0',
      'M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z',
    ],
  },
  ah = u7,
  bL = {
    prefix: 'fas',
    iconName: 'image',
    icon: [
      512,
      512,
      [],
      'f03e',
      'M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z',
    ],
  },
  _L = {
    prefix: 'fas',
    iconName: 'rotate-left',
    icon: [
      512,
      512,
      ['rotate-back', 'rotate-backward', 'undo-alt'],
      'f2ea',
      'M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z',
    ],
  },
  yL = {
    prefix: 'fas',
    iconName: 'table-columns',
    icon: [512, 512, ['columns'], 'f0db', 'M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 64V416H224V160H64zm384 0H288V416H448V160z'],
  },
  f7 = {
    prefix: 'fas',
    iconName: 'chair',
    icon: [
      448,
      512,
      [129681],
      'f6c0',
      'M248 48V256h48V58.7c23.9 13.8 40 39.7 40 69.3V256h48V128C384 57.3 326.7 0 256 0H192C121.3 0 64 57.3 64 128V256h48V128c0-29.6 16.1-55.5 40-69.3V256h48V48h48zM48 288c-12.1 0-23.2 6.8-28.6 17.7l-16 32c-5 9.9-4.4 21.7 1.4 31.1S20.9 384 32 384l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32V384H352v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384c11.1 0 21.4-5.7 27.2-15.2s6.4-21.2 1.4-31.1l-16-32C423.2 294.8 412.1 288 400 288H48z',
    ],
  },
  fm = {
    prefix: 'fas',
    iconName: 'circle-check',
    icon: [
      512,
      512,
      [61533, 'check-circle'],
      'f058',
      'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z',
    ],
  },
  wL = fm,
  EL = {
    prefix: 'fas',
    iconName: 'box-open',
    icon: [
      640,
      512,
      [],
      'f49e',
      'M58.9 42.1c3-6.1 9.6-9.6 16.3-8.7L320 64 564.8 33.4c6.7-.8 13.3 2.7 16.3 8.7l41.7 83.4c9 17.9-.6 39.6-19.8 45.1L439.6 217.3c-13.9 4-28.8-1.9-36.2-14.3L320 64 236.6 203c-7.4 12.4-22.3 18.3-36.2 14.3L37.1 170.6c-19.3-5.5-28.8-27.2-19.8-45.1L58.9 42.1zM321.1 128l54.9 91.4c14.9 24.8 44.6 36.6 72.5 28.6L576 211.6v167c0 22-15 41.2-36.4 46.6l-204.1 51c-10.2 2.6-20.9 2.6-31 0l-204.1-51C79 419.7 64 400.5 64 378.5v-167L191.6 248c27.8 8 57.6-3.8 72.5-28.6L318.9 128h2.2z',
    ],
  },
  d7 = {
    prefix: 'fas',
    iconName: 'palette',
    icon: [
      512,
      512,
      [127912],
      'f53f',
      'M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z',
    ],
  },
  xL = {
    prefix: 'fas',
    iconName: 'arrow-down-wide-short',
    icon: [
      576,
      512,
      ['sort-amount-asc', 'sort-amount-down'],
      'f160',
      'M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 480c-17.7 0-32-14.3-32-32s14.3-32 32-32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H320zm0-128c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H320z',
    ],
  },
  nl = {
    prefix: 'fas',
    iconName: 'book-atlas',
    icon: [
      448,
      512,
      ['atlas'],
      'f558',
      'M0 96C0 43 43 0 96 0H384h32c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32H384 96c-53 0-96-43-96-96V96zM64 416c0 17.7 14.3 32 32 32H352V384H96c-17.7 0-32 14.3-32 32zM247.4 283.8c-3.7 3.7-6.2 4.2-7.4 4.2s-3.7-.5-7.4-4.2c-3.8-3.7-8-10-11.8-18.9c-6.2-14.5-10.8-34.3-12.2-56.9h63c-1.5 22.6-6 42.4-12.2 56.9c-3.8 8.9-8 15.2-11.8 18.9zm42.7-9.9c7.3-18.3 12-41.1 13.4-65.9h31.1c-4.7 27.9-21.4 51.7-44.5 65.9zm0-163.8c23.2 14.2 39.9 38 44.5 65.9H303.5c-1.4-24.7-6.1-47.5-13.4-65.9zM368 192a128 128 0 1 0 -256 0 128 128 0 1 0 256 0zM145.3 208h31.1c1.4 24.7 6.1 47.5 13.4 65.9c-23.2-14.2-39.9-38-44.5-65.9zm31.1-32H145.3c4.7-27.9 21.4-51.7 44.5-65.9c-7.3 18.3-12 41.1-13.4 65.9zm56.1-75.8c3.7-3.7 6.2-4.2 7.4-4.2s3.7 .5 7.4 4.2c3.8 3.7 8 10 11.8 18.9c6.2 14.5 10.8 34.3 12.2 56.9h-63c1.5-22.6 6-42.4 12.2-56.9c3.8-8.9 8-15.2 11.8-18.9z',
    ],
  },
  SL = {
    prefix: 'fas',
    iconName: 'filter-circle-xmark',
    icon: [
      576,
      512,
      [],
      'e17b',
      'M3.9 22.9C10.5 8.9 24.5 0 40 0H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L396.4 195.6C316.2 212.1 256 283 256 368c0 27.4 6.3 53.4 17.5 76.5c-1.6-.8-3.2-1.8-4.7-2.9l-64-48c-8.1-6-12.8-15.5-12.8-25.6V288.9L9 65.3C-.7 53.4-2.8 36.8 3.9 22.9zM432 224a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm59.3 107.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L432 345.4l-36.7-36.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L409.4 368l-36.7 36.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L432 390.6l36.7 36.7c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L454.6 368l36.7-36.7z',
    ],
  },
  h7 = {
    prefix: 'fas',
    iconName: 'language',
    icon: [
      640,
      512,
      [],
      'f1ab',
      'M0 128C0 92.7 28.7 64 64 64H256h48 16H576c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H320 304 256 64c-35.3 0-64-28.7-64-64V128zm320 0V384H576V128H320zM178.3 175.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1 .1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1h73.6l8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2L179 276H141l19-42.8zM448 164c11 0 20 9 20 20v4h44 16c11 0 20 9 20 20s-9 20-20 20h-2l-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4c.9 .6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9l-18.9-11.3c-4.5-2.7-8.8-5.5-13.1-8.5c-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8l-12.2-12.2c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6 .5 .5c12.4-13.1 22.5-28.3 29.8-45H448 376c-11 0-20-9-20-20s9-20 20-20h52v-4c0-11 9-20 20-20z',
    ],
  },
  AL = {
    prefix: 'fas',
    iconName: 'filter',
    icon: [
      512,
      512,
      [],
      'f0b0',
      'M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z',
    ],
  },
  p7 = {
    prefix: 'fas',
    iconName: 'arrow-up-right-from-square',
    icon: [
      512,
      512,
      ['external-link'],
      'f08e',
      'M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z',
    ],
  },
  m7 = p7,
  CL = {
    prefix: 'fas',
    iconName: 'heart',
    icon: [
      512,
      512,
      [128153, 128154, 128155, 128156, 128420, 129293, 129294, 129505, 9829, 10084, 61578],
      'f004',
      'M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z',
    ],
  },
  TL = {
    prefix: 'fas',
    iconName: 'circle',
    icon: [512, 512, [128308, 128309, 128992, 128993, 128994, 128995, 128996, 9679, 9898, 9899, 11044, 61708, 61915], 'f111', 'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z'],
  },
  kL = {
    prefix: 'fas',
    iconName: 'wrench',
    icon: [
      512,
      512,
      [128295],
      'f0ad',
      'M352 320c88.4 0 160-71.6 160-160c0-15.3-2.2-30.1-6.2-44.2c-3.1-10.8-16.4-13.2-24.3-5.3l-76.8 76.8c-3 3-7.1 4.7-11.3 4.7H336c-8.8 0-16-7.2-16-16V118.6c0-4.2 1.7-8.3 4.7-11.3l76.8-76.8c7.9-7.9 5.4-21.2-5.3-24.3C382.1 2.2 367.3 0 352 0C263.6 0 192 71.6 192 160c0 19.1 3.4 37.5 9.5 54.5L19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L297.5 310.5c17 6.2 35.4 9.5 54.5 9.5zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48z',
    ],
  },
  $L = {
    prefix: 'fas',
    iconName: 'circle-question',
    icon: [
      512,
      512,
      [62108, 'question-circle'],
      'f059',
      'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z',
    ],
  },
  g7 = {
    prefix: 'fas',
    iconName: 'arrow-rotate-right',
    icon: [
      512,
      512,
      [8635, 'arrow-right-rotate', 'arrow-rotate-forward', 'redo'],
      'f01e',
      'M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H464c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z',
    ],
  },
  oh = g7,
  OL = {
    prefix: 'fas',
    iconName: 'arrow-up-1-9',
    icon: [
      576,
      512,
      ['sort-numeric-up'],
      'f163',
      'M450.7 38c8.3 6 13.3 15.7 13.3 26v96h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H432 384c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V108.4l-5.9 2c-16.8 5.6-34.9-3.5-40.5-20.2s3.5-34.9 20.2-40.5l48-16c9.8-3.3 20.5-1.6 28.8 4.4zM160 32c9 0 17.5 3.8 23.6 10.4l88 96c11.9 13 11.1 33.3-2 45.2s-33.3 11.1-45.2-2L192 146.3V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V146.3L95.6 181.6c-11.9 13-32.2 13.9-45.2 2s-13.9-32.2-2-45.2l88-96C142.5 35.8 151 32 160 32zM445.7 364.9A32 32 0 1 0 418.3 307a32 32 0 1 0 27.4 57.9zm-40.7 54.9C369.6 408.4 344 375.2 344 336c0-48.6 39.4-88 88-88s88 39.4 88 88c0 23.5-7.5 46.3-21.5 65.2L449.7 467c-10.5 14.2-30.6 17.2-44.8 6.7s-17.2-30.6-6.7-44.8l6.8-9.2z',
    ],
  },
  LL = {
    prefix: 'fas',
    iconName: 'arrow-left',
    icon: [
      448,
      512,
      [8592],
      'f060',
      'M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z',
    ],
  },
  v7 = {
    prefix: 'fas',
    iconName: 'ruler',
    icon: [
      512,
      512,
      [128207],
      'f545',
      'M177.9 494.1c-18.7 18.7-49.1 18.7-67.9 0L17.9 401.9c-18.7-18.7-18.7-49.1 0-67.9l50.7-50.7 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 41.4-41.4 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 41.4-41.4 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 41.4-41.4 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 50.7-50.7c18.7-18.7 49.1-18.7 67.9 0l92.1 92.1c18.7 18.7 18.7 49.1 0 67.9L177.9 494.1z',
    ],
  },
  PL = {
    prefix: 'fas',
    iconName: 'cake-candles',
    icon: [
      448,
      512,
      [127874, 'birthday-cake', 'cake'],
      'f1fd',
      'M86.4 5.5L61.8 47.6C58 54.1 56 61.6 56 69.2V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L105.6 5.5C103.6 2.1 100 0 96 0s-7.6 2.1-9.6 5.5zm128 0L189.8 47.6c-3.8 6.5-5.8 14-5.8 21.6V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L233.6 5.5C231.6 2.1 228 0 224 0s-7.6 2.1-9.6 5.5zM317.8 47.6c-3.8 6.5-5.8 14-5.8 21.6V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L361.6 5.5C359.6 2.1 356 0 352 0s-7.6 2.1-9.6 5.5L317.8 47.6zM128 176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48c-35.3 0-64 28.7-64 64v71c8.3 5.2 18.1 9 28.8 9c13.5 0 27.2-6.1 38.4-13.4c5.4-3.5 9.9-7.1 13-9.7c1.5-1.3 2.7-2.4 3.5-3.1c.4-.4 .7-.6 .8-.8l.1-.1 0 0 0 0s0 0 0 0s0 0 0 0c3.1-3.2 7.4-4.9 11.9-4.8s8.6 2.1 11.6 5.4l0 0 0 0 .1 .1c.1 .1 .4 .4 .7 .7c.7 .7 1.7 1.7 3.1 3c2.8 2.6 6.8 6.1 11.8 9.5c10.2 7.1 23 13.1 36.3 13.1s26.1-6 36.3-13.1c5-3.5 9-6.9 11.8-9.5c1.4-1.3 2.4-2.3 3.1-3c.3-.3 .6-.6 .7-.7l.1-.1c3-3.5 7.4-5.4 12-5.4s9 2 12 5.4l.1 .1c.1 .1 .4 .4 .7 .7c.7 .7 1.7 1.7 3.1 3c2.8 2.6 6.8 6.1 11.8 9.5c10.2 7.1 23 13.1 36.3 13.1s26.1-6 36.3-13.1c5-3.5 9-6.9 11.8-9.5c1.4-1.3 2.4-2.3 3.1-3c.3-.3 .6-.6 .7-.7l.1-.1c2.9-3.4 7.1-5.3 11.6-5.4s8.7 1.6 11.9 4.8l0 0 0 0 0 0 .1 .1c.2 .2 .4 .4 .8 .8c.8 .7 1.9 1.8 3.5 3.1c3.1 2.6 7.5 6.2 13 9.7c11.2 7.3 24.9 13.4 38.4 13.4c10.7 0 20.5-3.9 28.8-9V288c0-35.3-28.7-64-64-64V176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48H256V176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48H128V176zM448 394.6c-8.5 3.3-18.2 5.4-28.8 5.4c-22.5 0-42.4-9.9-55.8-18.6c-4.1-2.7-7.8-5.4-10.9-7.8c-2.8 2.4-6.1 5-9.8 7.5C329.8 390 310.6 400 288 400s-41.8-10-54.6-18.9c-3.5-2.4-6.7-4.9-9.4-7.2c-2.7 2.3-5.9 4.7-9.4 7.2C201.8 390 182.6 400 160 400s-41.8-10-54.6-18.9c-3.7-2.6-7-5.2-9.8-7.5c-3.1 2.4-6.8 5.1-10.9 7.8C71.2 390.1 51.3 400 28.8 400c-10.6 0-20.3-2.2-28.8-5.4V480c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32V394.6z',
    ],
  },
  IL = {
    prefix: 'fas',
    iconName: 'angles-up',
    icon: [
      448,
      512,
      ['angle-double-up'],
      'f102',
      'M246.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 109.3 361.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160zm160 352l-160-160c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 301.3 361.4 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z',
    ],
  },
  ML = {
    prefix: 'fas',
    iconName: 'arrow-up-9-1',
    icon: [
      576,
      512,
      ['sort-numeric-up-alt'],
      'f887',
      'M160 32c9 0 17.5 3.8 23.6 10.4l88 96c11.9 13 11.1 33.3-2 45.2s-33.3 11.1-45.2-2L192 146.3V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V146.3L95.6 181.6c-11.9 13-32.2 13.9-45.2 2s-13.9-32.2-2-45.2l88-96C142.5 35.8 151 32 160 32zM450.7 294c8.3 6 13.3 15.7 13.3 26v96h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H432 384c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V364.4l-5.9 2c-16.8 5.6-34.9-3.5-40.5-20.2s3.5-34.9 20.2-40.5l48-16c9.8-3.3 20.5-1.6 28.8 4.4zm-5-145.1A32 32 0 1 0 418.3 91a32 32 0 1 0 27.4 57.9zm-40.7 54.9C369.6 192.4 344 159.2 344 120c0-48.6 39.4-88 88-88s88 39.4 88 88c0 23.5-7.5 46.3-21.5 65.2L449.7 251c-10.5 14.2-30.6 17.2-44.8 6.7s-17.2-30.6-6.7-44.8l6.8-9.2z',
    ],
  },
  b7 = {
    prefix: 'fas',
    iconName: 'circle-info',
    icon: [
      512,
      512,
      ['info-circle'],
      'f05a',
      'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z',
    ],
  },
  NL = b7,
  RL = {
    prefix: 'fas',
    iconName: 'arrow-down-1-9',
    icon: [
      576,
      512,
      ['sort-numeric-asc', 'sort-numeric-down'],
      'f162',
      'M450.7 38c-8.3-6-19.1-7.7-28.8-4.4l-48 16c-16.8 5.6-25.8 23.7-20.2 40.5s23.7 25.8 40.5 20.2l5.9-2V160H384c-17.7 0-32 14.3-32 32s14.3 32 32 32h48 48c17.7 0 32-14.3 32-32s-14.3-32-32-32H464V64c0-10.3-4.9-19.9-13.3-26zM160 480c9 0 17.5-3.8 23.6-10.4l88-96c11.9-13 11.1-33.3-2-45.2s-33.3-11.1-45.2 2L192 365.7V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V365.7L95.6 330.4c-11.9-13-32.2-13.9-45.2-2s-13.9 32.2-2 45.2l88 96C142.5 476.2 151 480 160 480zM418.3 307a32 32 0 1 1 27.4 57.9A32 32 0 1 1 418.3 307zM405.1 419.8l-6.8 9.2c-10.5 14.2-7.5 34.2 6.7 44.8s34.2 7.5 44.8-6.7l48.8-65.8c14-18.9 21.5-41.7 21.5-65.2c0-48.6-39.4-88-88-88s-88 39.4-88 88c0 39.2 25.6 72.4 61.1 83.8z',
    ],
  },
  lh = {
    prefix: 'fas',
    iconName: 'crosshairs',
    icon: [
      512,
      512,
      [],
      'f05b',
      'M256 0c17.7 0 32 14.3 32 32V42.4c93.7 13.9 167.7 88 181.6 181.6H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H469.6c-13.9 93.7-88 167.7-181.6 181.6V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V469.6C130.3 455.7 56.3 381.7 42.4 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H42.4C56.3 130.3 130.3 56.3 224 42.4V32c0-17.7 14.3-32 32-32zM107.4 288c12.5 58.3 58.4 104.1 116.6 116.6V384c0-17.7 14.3-32 32-32s32 14.3 32 32v20.6c58.3-12.5 104.1-58.4 116.6-116.6H384c-17.7 0-32-14.3-32-32s14.3-32 32-32h20.6C392.1 165.7 346.3 119.9 288 107.4V128c0 17.7-14.3 32-32 32s-32-14.3-32-32V107.4C165.7 119.9 119.9 165.7 107.4 224H128c17.7 0 32 14.3 32 32s-14.3 32-32 32H107.4zM256 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64z',
    ],
  },
  DL = {
    prefix: 'fas',
    iconName: 'arrow-down-a-z',
    icon: [
      576,
      512,
      ['sort-alpha-asc', 'sort-alpha-down'],
      'f15d',
      'M183.6 469.6C177.5 476.2 169 480 160 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L128 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 320c0-17.7 14.3-32 32-32H480c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9L429.3 416H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H352c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9L402.7 352H352c-17.7 0-32-14.3-32-32zM416 32c12.1 0 23.2 6.8 28.6 17.7l64 128 16 32c7.9 15.8 1.5 35-14.3 42.9s-35 1.5-42.9-14.3L460.2 224H371.8l-7.2 14.3c-7.9 15.8-27.1 22.2-42.9 14.3s-22.2-27.1-14.3-42.9l16-32 64-128C392.8 38.8 403.9 32 416 32zM395.8 176h40.4L416 135.6 395.8 176z',
    ],
  },
  nc = {
    prefix: 'fas',
    iconName: 'gear',
    icon: [
      512,
      512,
      [9881, 'cog'],
      'f013',
      'M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z',
    ],
  },
  zL = nc,
  dm = {
    prefix: 'fas',
    iconName: 'caret-down',
    icon: [320, 512, [], 'f0d7', 'M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z'],
  },
  HL = {
    prefix: 'fas',
    iconName: 'sliders',
    icon: [
      512,
      512,
      ['sliders-h'],
      'f1de',
      'M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z',
    ],
  },
  _7 = {
    prefix: 'fas',
    iconName: 'flask',
    icon: [
      448,
      512,
      [],
      'f0c3',
      'M288 0H160 128C110.3 0 96 14.3 96 32s14.3 32 32 32V196.8c0 11.8-3.3 23.5-9.5 33.5L10.3 406.2C3.6 417.2 0 429.7 0 442.6C0 480.9 31.1 512 69.4 512H378.6c38.3 0 69.4-31.1 69.4-69.4c0-12.8-3.6-25.4-10.3-36.4L329.5 230.4c-6.2-10.1-9.5-21.7-9.5-33.5V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H288zM192 196.8V64h64V196.8c0 23.7 6.6 46.9 19 67.1L309.5 320h-171L173 263.9c12.4-20.2 19-43.4 19-67.1z',
    ],
  },
  VL = {
    prefix: 'fas',
    iconName: 'ellipsis-vertical',
    icon: [128, 512, ['ellipsis-v'], 'f142', 'M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z'],
  },
  ch = {
    prefix: 'fas',
    iconName: 'calculator',
    icon: [
      384,
      512,
      [128425],
      'f1ec',
      'M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM96 64H288c17.7 0 32 14.3 32 32v32c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32zm32 160a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM96 352a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM64 416c0-17.7 14.3-32 32-32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM192 256a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zm64-64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM288 448a32 32 0 1 1 0-64 32 32 0 1 1 0 64z',
    ],
  },
  y7 = {
    prefix: 'fas',
    iconName: 'forward',
    icon: [
      512,
      512,
      [9193],
      'f04e',
      'M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416V96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3V256v41.7L52.5 440.6zM256 352V256 128 96c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29V352z',
    ],
  },
  w7 = {
    prefix: 'fas',
    iconName: 'house',
    icon: [
      576,
      512,
      [127968, 63498, 63500, 'home', 'home-alt', 'home-lg-alt'],
      'f015',
      'M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z',
    ],
  },
  uh = w7,
  FL = {
    prefix: 'fas',
    iconName: 'arrow-up-wide-short',
    icon: [
      576,
      512,
      ['sort-amount-up'],
      'f161',
      'M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 480h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32z',
    ],
  },
  E7 = {
    prefix: 'fas',
    iconName: 'sun',
    icon: [
      512,
      512,
      [9728],
      'f185',
      'M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z',
    ],
  },
  BL = {
    prefix: 'fas',
    iconName: 'arrow-down-short-wide',
    icon: [
      576,
      512,
      ['sort-amount-desc', 'sort-amount-down-alt'],
      'f884',
      'M151.6 469.6C145.5 476.2 137 480 128 480s-17.5-3.8-23.6-10.4l-88-96c-11.9-13-11.1-33.3 2-45.2s33.3-11.1 45.2 2L96 365.7V64c0-17.7 14.3-32 32-32s32 14.3 32 32V365.7l32.4-35.4c11.9-13 32.2-13.9 45.2-2s13.9 32.2 2 45.2l-88 96zM320 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H320c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H320c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H320c-17.7 0-32-14.3-32-32s14.3-32 32-32zm0 128H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H320c-17.7 0-32-14.3-32-32s14.3-32 32-32z',
    ],
  },
  jL = {
    prefix: 'fas',
    iconName: 'angle-down',
    icon: [
      448,
      512,
      [8964],
      'f107',
      'M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z',
    ],
  },
  fh = {
    prefix: 'fas',
    iconName: 'toolbox',
    icon: [
      512,
      512,
      [129520],
      'f552',
      'M176 88v40H336V88c0-4.4-3.6-8-8-8H184c-4.4 0-8 3.6-8 8zm-48 40V88c0-30.9 25.1-56 56-56H328c30.9 0 56 25.1 56 56v40h28.1c12.7 0 24.9 5.1 33.9 14.1l51.9 51.9c9 9 14.1 21.2 14.1 33.9V304H384V288c0-17.7-14.3-32-32-32s-32 14.3-32 32v16H192V288c0-17.7-14.3-32-32-32s-32 14.3-32 32v16H0V227.9c0-12.7 5.1-24.9 14.1-33.9l51.9-51.9c9-9 21.2-14.1 33.9-14.1H128zM0 416V336H128v16c0 17.7 14.3 32 32 32s32-14.3 32-32V336H320v16c0 17.7 14.3 32 32 32s32-14.3 32-32V336H512v80c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64z',
    ],
  },
  x7 = {
    prefix: 'fas',
    iconName: 'arrows-left-right-to-line',
    icon: [
      640,
      512,
      [],
      'e4ba',
      'M32 64c17.7 0 32 14.3 32 32l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32V96C0 78.3 14.3 64 32 64zm214.6 73.4c12.5 12.5 12.5 32.8 0 45.3L205.3 224l229.5 0-41.4-41.4c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3l-96 96c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L434.7 288l-229.5 0 41.4 41.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0zM640 96V416c0 17.7-14.3 32-32 32s-32-14.3-32-32V96c0-17.7 14.3-32 32-32s32 14.3 32 32z',
    ],
  },
  S7 = {
    prefix: 'fas',
    iconName: 'magnifying-glass',
    icon: [
      512,
      512,
      [128269, 'search'],
      'f002',
      'M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z',
    ],
  },
  hm = S7,
  A7 = {
    prefix: 'fas',
    iconName: 'chevron-down',
    icon: [
      512,
      512,
      [],
      'f078',
      'M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z',
    ],
  },
  WL = {
    prefix: 'fas',
    iconName: 'list-ul',
    icon: [
      512,
      512,
      ['list-dots'],
      'f0ca',
      'M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z',
    ],
  },
  C7 = {
    prefix: 'fas',
    iconName: 'circle-half-stroke',
    icon: [512, 512, [9680, 'adjust'], 'f042', 'M448 256c0-106-86-192-192-192V448c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z'],
  },
  T7 = {
    prefix: 'fas',
    iconName: 'clapperboard',
    icon: [
      512,
      512,
      [],
      'e131',
      'M448 32H361.9l-1 1-127 127h92.1l1-1L453.8 32.3c-1.9-.2-3.8-.3-5.8-.3zm64 128V96c0-15.1-5.3-29.1-14-40l-104 104H512zM294.1 32H201.9l-1 1L73.9 160h92.1l1-1 127-127zM64 32C28.7 32 0 60.7 0 96v64H6.1l1-1 127-127H64zM512 192H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192z',
    ],
  },
  UL = {
    prefix: 'fas',
    iconName: 'plus',
    icon: [
      448,
      512,
      [10133, 61543, 'add'],
      '2b',
      'M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z',
    ],
  },
  dh = {
    prefix: 'fas',
    iconName: 'hammer',
    icon: [
      576,
      512,
      [128296],
      'f6e3',
      'M413.5 237.5c-28.2 4.8-58.2-3.6-80-25.4l-38.1-38.1C280.4 159 272 138.8 272 117.6V105.5L192.3 62c-5.3-2.9-8.6-8.6-8.3-14.7s3.9-11.5 9.5-14l47.2-21C259.1 4.2 279 0 299.2 0h18.1c36.7 0 72 14 98.7 39.1l44.6 42c24.2 22.8 33.2 55.7 26.6 86L503 183l8-8c9.4-9.4 24.6-9.4 33.9 0l24 24c9.4 9.4 9.4 24.6 0 33.9l-88 88c-9.4 9.4-24.6 9.4-33.9 0l-24-24c-9.4-9.4-9.4-24.6 0-33.9l8-8-17.5-17.5zM27.4 377.1L260.9 182.6c3.5 4.9 7.5 9.6 11.8 14l38.1 38.1c6 6 12.4 11.2 19.2 15.7L134.9 484.6c-14.5 17.4-36 27.4-58.6 27.4C34.1 512 0 477.8 0 435.7c0-22.6 10.1-44.1 27.4-58.6z',
    ],
  },
  qL = {
    prefix: 'fas',
    iconName: 'angles-left',
    icon: [
      512,
      512,
      [171, 'angle-double-left'],
      'f100',
      'M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z',
    ],
  },
  k7 = {
    prefix: 'fas',
    iconName: 'clock-rotate-left',
    icon: [
      512,
      512,
      ['history'],
      'f1da',
      'M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z',
    ],
  },
  rc = k7,
  KL = {
    prefix: 'fas',
    iconName: 'arrow-up-short-wide',
    icon: [
      576,
      512,
      ['sort-amount-up-alt'],
      'f885',
      'M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H320zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32s-14.3-32-32-32H320z',
    ],
  },
  $7 = {
    prefix: 'fas',
    iconName: 'moon',
    icon: [
      384,
      512,
      [127769, 9214],
      'f186',
      'M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z',
    ],
  },
  GL = {
    prefix: 'fas',
    iconName: 'music',
    icon: [
      512,
      512,
      [127925],
      'f001',
      'M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z',
    ],
  },
  O7 = {
    prefix: 'fas',
    iconName: 'up-right-and-down-left-from-center',
    icon: [
      512,
      512,
      ['expand-alt'],
      'f424',
      'M344 0H488c13.3 0 24 10.7 24 24V168c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87L327 41c-6.9-6.9-8.9-17.2-5.2-26.2S334.3 0 344 0zM168 512H24c-13.3 0-24-10.7-24-24V344c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39 87-87c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8z',
    ],
  },
  YL = O7,
  hh = {
    prefix: 'fas',
    iconName: 'calendar',
    icon: [
      448,
      512,
      [128197, 128198],
      'f133',
      'M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z',
    ],
  },
  L7 = {
    prefix: 'fas',
    iconName: 'circle-plus',
    icon: [
      512,
      512,
      ['plus-circle'],
      'f055',
      'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z',
    ],
  },
  XL = L7,
  QL = {
    prefix: 'fas',
    iconName: 'arrow-up-z-a',
    icon: [
      576,
      512,
      ['sort-alpha-up-alt'],
      'f882',
      'M183.6 42.4C177.5 35.8 169 32 160 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L128 146.3V448c0 17.7 14.3 32 32 32s32-14.3 32-32V146.3l32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 64c0 17.7 14.3 32 32 32h50.7l-73.4 73.4c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H429.3l73.4-73.4c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8H352c-17.7 0-32 14.3-32 32zm96 192c-12.1 0-23.2 6.8-28.6 17.7l-64 128-16 32c-7.9 15.8-1.5 35 14.3 42.9s35 1.5 42.9-14.3l7.2-14.3h88.4l7.2 14.3c7.9 15.8 27.1 22.2 42.9 14.3s22.2-27.1 14.3-42.9l-16-32-64-128C439.2 262.8 428.1 256 416 256zM395.8 400L416 359.6 436.2 400H395.8z',
    ],
  },
  P7 = {
    prefix: 'fas',
    iconName: 'triangle-exclamation',
    icon: [
      512,
      512,
      [9888, 'exclamation-triangle', 'warning'],
      'f071',
      'M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z',
    ],
  },
  JL = P7,
  pm = {
    prefix: 'fas',
    iconName: 'circle-xmark',
    icon: [
      512,
      512,
      [61532, 'times-circle', 'xmark-circle'],
      'f057',
      'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z',
    ],
  },
  ZL = {
    prefix: 'fas',
    iconName: 'magnifying-glass-plus',
    icon: [
      512,
      512,
      ['search-plus'],
      'f00e',
      'M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM184 296c0 13.3 10.7 24 24 24s24-10.7 24-24V232h64c13.3 0 24-10.7 24-24s-10.7-24-24-24H232V120c0-13.3-10.7-24-24-24s-24 10.7-24 24v64H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h64v64z',
    ],
  },
  eP = {
    prefix: 'fas',
    iconName: 'mask',
    icon: [
      576,
      512,
      [],
      'f6fa',
      'M288 64C64 64 0 160 0 272S80 448 176 448h8.4c24.2 0 46.4-13.7 57.2-35.4l23.2-46.3c4.4-8.8 13.3-14.3 23.2-14.3s18.8 5.5 23.2 14.3l23.2 46.3c10.8 21.7 33 35.4 57.2 35.4H400c96 0 176-64 176-176s-64-208-288-208zM96 256a64 64 0 1 1 128 0A64 64 0 1 1 96 256zm320-64a64 64 0 1 1 0 128 64 64 0 1 1 0-128z',
    ],
  },
  tP = {
    prefix: 'fas',
    iconName: 'magnifying-glass-minus',
    icon: [
      512,
      512,
      ['search-minus'],
      'f010',
      'M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM136 184c-13.3 0-24 10.7-24 24s10.7 24 24 24H280c13.3 0 24-10.7 24-24s-10.7-24-24-24H136z',
    ],
  },
  I7 = typeof global == 'object' && global && global.Object === Object && global;
const mm = I7;
var M7 = typeof self == 'object' && self && self.Object === Object && self,
  N7 = mm || M7 || Function('return this')();
const qt = N7;
var R7 = qt.Symbol;
const Kn = R7;
var gm = Object.prototype,
  D7 = gm.hasOwnProperty,
  z7 = gm.toString,
  Ss = Kn ? Kn.toStringTag : void 0;
function H7(e) {
  var t = D7.call(e, Ss),
    n = e[Ss];
  try {
    e[Ss] = void 0;
    var r = !0;
  } catch {}
  var s = z7.call(e);
  return r && (t ? (e[Ss] = n) : delete e[Ss]), s;
}
var V7 = Object.prototype,
  F7 = V7.toString;
function B7(e) {
  return F7.call(e);
}
var j7 = '[object Null]',
  W7 = '[object Undefined]',
  ph = Kn ? Kn.toStringTag : void 0;
function Tr(e) {
  return e == null ? (e === void 0 ? W7 : j7) : ph && ph in Object(e) ? H7(e) : B7(e);
}
function Jn(e) {
  return e != null && typeof e == 'object';
}
var U7 = '[object Symbol]';
function vm(e) {
  return typeof e == 'symbol' || (Jn(e) && Tr(e) == U7);
}
function q7(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, s = Array(r); ++n < r; ) s[n] = t(e[n], n, e);
  return s;
}
var K7 = Array.isArray;
const wr = K7;
var G7 = 1 / 0,
  mh = Kn ? Kn.prototype : void 0,
  gh = mh ? mh.toString : void 0;
function bm(e) {
  if (typeof e == 'string') return e;
  if (wr(e)) return q7(e, bm) + '';
  if (vm(e)) return gh ? gh.call(e) : '';
  var t = e + '';
  return t == '0' && 1 / e == -G7 ? '-0' : t;
}
var Y7 = /\s/;
function X7(e) {
  for (var t = e.length; t-- && Y7.test(e.charAt(t)); );
  return t;
}
var Q7 = /^\s+/;
function J7(e) {
  return e && e.slice(0, X7(e) + 1).replace(Q7, '');
}
function Wt(e) {
  var t = typeof e;
  return e != null && (t == 'object' || t == 'function');
}
var vh = 0 / 0,
  Z7 = /^[-+]0x[0-9a-f]+$/i,
  eE = /^0b[01]+$/i,
  tE = /^0o[0-7]+$/i,
  nE = parseInt;
function Bs(e) {
  if (typeof e == 'number') return e;
  if (vm(e)) return vh;
  if (Wt(e)) {
    var t = typeof e.valueOf == 'function' ? e.valueOf() : e;
    e = Wt(t) ? t + '' : t;
  }
  if (typeof e != 'string') return e === 0 ? e : +e;
  e = J7(e);
  var n = eE.test(e);
  return n || tE.test(e) ? nE(e.slice(2), n ? 2 : 8) : Z7.test(e) ? vh : +e;
}
function _m(e) {
  return e;
}
var rE = '[object AsyncFunction]',
  sE = '[object Function]',
  iE = '[object GeneratorFunction]',
  aE = '[object Proxy]';
function _u(e) {
  if (!Wt(e)) return !1;
  var t = Tr(e);
  return t == sE || t == iE || t == rE || t == aE;
}
var oE = qt['__core-js_shared__'];
const rl = oE;
var bh = (function () {
  var e = /[^.]+$/.exec((rl && rl.keys && rl.keys.IE_PROTO) || '');
  return e ? 'Symbol(src)_1.' + e : '';
})();
function lE(e) {
  return !!bh && bh in e;
}
var cE = Function.prototype,
  uE = cE.toString;
function kr(e) {
  if (e != null) {
    try {
      return uE.call(e);
    } catch {}
    try {
      return e + '';
    } catch {}
  }
  return '';
}
var fE = /[\\^$.*+?()[\]{}|]/g,
  dE = /^\[object .+?Constructor\]$/,
  hE = Function.prototype,
  pE = Object.prototype,
  mE = hE.toString,
  gE = pE.hasOwnProperty,
  vE = RegExp(
    '^' +
      mE
        .call(gE)
        .replace(fE, '\\$&')
        .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
      '$',
  );
function bE(e) {
  if (!Wt(e) || lE(e)) return !1;
  var t = _u(e) ? vE : dE;
  return t.test(kr(e));
}
function _E(e, t) {
  return e == null ? void 0 : e[t];
}
function $r(e, t) {
  var n = _E(e, t);
  return bE(n) ? n : void 0;
}
var yE = $r(qt, 'WeakMap');
const sc = yE;
var _h = Object.create,
  wE = (function () {
    function e() {}
    return function (t) {
      if (!Wt(t)) return {};
      if (_h) return _h(t);
      e.prototype = t;
      var n = new e();
      return (e.prototype = void 0), n;
    };
  })();
const EE = wE;
function xE(e, t, n) {
  switch (n.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, n[0]);
    case 2:
      return e.call(t, n[0], n[1]);
    case 3:
      return e.call(t, n[0], n[1], n[2]);
  }
  return e.apply(t, n);
}
function ym(e, t) {
  var n = -1,
    r = e.length;
  for (t || (t = Array(r)); ++n < r; ) t[n] = e[n];
  return t;
}
var SE = 800,
  AE = 16,
  CE = Date.now;
function TE(e) {
  var t = 0,
    n = 0;
  return function () {
    var r = CE(),
      s = AE - (r - n);
    if (((n = r), s > 0)) {
      if (++t >= SE) return arguments[0];
    } else t = 0;
    return e.apply(void 0, arguments);
  };
}
function kE(e) {
  return function () {
    return e;
  };
}
var $E = (function () {
  try {
    var e = $r(Object, 'defineProperty');
    return e({}, '', {}), e;
  } catch {}
})();
const Ia = $E;
var OE = Ia
  ? function (e, t) {
      return Ia(e, 'toString', {
        configurable: !0,
        enumerable: !1,
        value: kE(t),
        writable: !0,
      });
    }
  : _m;
const LE = OE;
var PE = TE(LE);
const IE = PE;
function ME(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r && t(e[n], n, e) !== !1; );
  return e;
}
var NE = 9007199254740991,
  RE = /^(?:0|[1-9]\d*)$/;
function wm(e, t) {
  var n = typeof e;
  return (t = t ?? NE), !!t && (n == 'number' || (n != 'symbol' && RE.test(e))) && e > -1 && e % 1 == 0 && e < t;
}
function yu(e, t, n) {
  t == '__proto__' && Ia
    ? Ia(e, t, {
        configurable: !0,
        enumerable: !0,
        value: n,
        writable: !0,
      })
    : (e[t] = n);
}
function yo(e, t) {
  return e === t || (e !== e && t !== t);
}
var DE = Object.prototype,
  zE = DE.hasOwnProperty;
function Em(e, t, n) {
  var r = e[t];
  (!(zE.call(e, t) && yo(r, n)) || (n === void 0 && !(t in e))) && yu(e, t, n);
}
function Ci(e, t, n, r) {
  var s = !n;
  n || (n = {});
  for (var i = -1, a = t.length; ++i < a; ) {
    var o = t[i],
      l = r ? r(n[o], e[o], o, n, e) : void 0;
    l === void 0 && (l = e[o]), s ? yu(n, o, l) : Em(n, o, l);
  }
  return n;
}
var yh = Math.max;
function HE(e, t, n) {
  return (
    (t = yh(t === void 0 ? e.length - 1 : t, 0)),
    function () {
      for (var r = arguments, s = -1, i = yh(r.length - t, 0), a = Array(i); ++s < i; ) a[s] = r[t + s];
      s = -1;
      for (var o = Array(t + 1); ++s < t; ) o[s] = r[s];
      return (o[t] = n(a)), xE(e, this, o);
    }
  );
}
function VE(e, t) {
  return IE(HE(e, t, _m), e + '');
}
var FE = 9007199254740991;
function xm(e) {
  return typeof e == 'number' && e > -1 && e % 1 == 0 && e <= FE;
}
function wo(e) {
  return e != null && xm(e.length) && !_u(e);
}
function BE(e, t, n) {
  if (!Wt(n)) return !1;
  var r = typeof t;
  return (r == 'number' ? wo(n) && wm(t, n.length) : r == 'string' && t in n) ? yo(n[t], e) : !1;
}
function Sm(e) {
  return VE(function (t, n) {
    var r = -1,
      s = n.length,
      i = s > 1 ? n[s - 1] : void 0,
      a = s > 2 ? n[2] : void 0;
    for (i = e.length > 3 && typeof i == 'function' ? (s--, i) : void 0, a && BE(n[0], n[1], a) && ((i = s < 3 ? void 0 : i), (s = 1)), t = Object(t); ++r < s; ) {
      var o = n[r];
      o && e(t, o, r, i);
    }
    return t;
  });
}
var jE = Object.prototype;
function wu(e) {
  var t = e && e.constructor,
    n = (typeof t == 'function' && t.prototype) || jE;
  return e === n;
}
function WE(e, t) {
  for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
  return r;
}
var UE = '[object Arguments]';
function wh(e) {
  return Jn(e) && Tr(e) == UE;
}
var Am = Object.prototype,
  qE = Am.hasOwnProperty,
  KE = Am.propertyIsEnumerable,
  GE = wh(
    (function () {
      return arguments;
    })(),
  )
    ? wh
    : function (e) {
        return Jn(e) && qE.call(e, 'callee') && !KE.call(e, 'callee');
      };
const ic = GE;
function YE() {
  return !1;
}
var Cm = typeof exports == 'object' && exports && !exports.nodeType && exports,
  Eh = Cm && typeof module == 'object' && module && !module.nodeType && module,
  XE = Eh && Eh.exports === Cm,
  xh = XE ? qt.Buffer : void 0,
  QE = xh ? xh.isBuffer : void 0,
  JE = QE || YE;
const Eu = JE;
var ZE = '[object Arguments]',
  e9 = '[object Array]',
  t9 = '[object Boolean]',
  n9 = '[object Date]',
  r9 = '[object Error]',
  s9 = '[object Function]',
  i9 = '[object Map]',
  a9 = '[object Number]',
  o9 = '[object Object]',
  l9 = '[object RegExp]',
  c9 = '[object Set]',
  u9 = '[object String]',
  f9 = '[object WeakMap]',
  d9 = '[object ArrayBuffer]',
  h9 = '[object DataView]',
  p9 = '[object Float32Array]',
  m9 = '[object Float64Array]',
  g9 = '[object Int8Array]',
  v9 = '[object Int16Array]',
  b9 = '[object Int32Array]',
  _9 = '[object Uint8Array]',
  y9 = '[object Uint8ClampedArray]',
  w9 = '[object Uint16Array]',
  E9 = '[object Uint32Array]',
  Ve = {};
Ve[p9] = Ve[m9] = Ve[g9] = Ve[v9] = Ve[b9] = Ve[_9] = Ve[y9] = Ve[w9] = Ve[E9] = !0;
Ve[ZE] = Ve[e9] = Ve[d9] = Ve[t9] = Ve[h9] = Ve[n9] = Ve[r9] = Ve[s9] = Ve[i9] = Ve[a9] = Ve[o9] = Ve[l9] = Ve[c9] = Ve[u9] = Ve[f9] = !1;
function x9(e) {
  return Jn(e) && xm(e.length) && !!Ve[Tr(e)];
}
function xu(e) {
  return function (t) {
    return e(t);
  };
}
var Tm = typeof exports == 'object' && exports && !exports.nodeType && exports,
  js = Tm && typeof module == 'object' && module && !module.nodeType && module,
  S9 = js && js.exports === Tm,
  sl = S9 && mm.process,
  A9 = (function () {
    try {
      var e = js && js.require && js.require('util').types;
      return e || (sl && sl.binding && sl.binding('util'));
    } catch {}
  })();
const os = A9;
var Sh = os && os.isTypedArray,
  C9 = Sh ? xu(Sh) : x9;
const km = C9;
var T9 = Object.prototype,
  k9 = T9.hasOwnProperty;
function $m(e, t) {
  var n = wr(e),
    r = !n && ic(e),
    s = !n && !r && Eu(e),
    i = !n && !r && !s && km(e),
    a = n || r || s || i,
    o = a ? WE(e.length, String) : [],
    l = o.length;
  for (var u in e)
    (t || k9.call(e, u)) && !(a && (u == 'length' || (s && (u == 'offset' || u == 'parent')) || (i && (u == 'buffer' || u == 'byteLength' || u == 'byteOffset')) || wm(u, l))) && o.push(u);
  return o;
}
function Om(e, t) {
  return function (n) {
    return e(t(n));
  };
}
var $9 = Om(Object.keys, Object);
const O9 = $9;
var L9 = Object.prototype,
  P9 = L9.hasOwnProperty;
function I9(e) {
  if (!wu(e)) return O9(e);
  var t = [];
  for (var n in Object(e)) P9.call(e, n) && n != 'constructor' && t.push(n);
  return t;
}
function Su(e) {
  return wo(e) ? $m(e) : I9(e);
}
function M9(e) {
  var t = [];
  if (e != null) for (var n in Object(e)) t.push(n);
  return t;
}
var N9 = Object.prototype,
  R9 = N9.hasOwnProperty;
function D9(e) {
  if (!Wt(e)) return M9(e);
  var t = wu(e),
    n = [];
  for (var r in e) (r == 'constructor' && (t || !R9.call(e, r))) || n.push(r);
  return n;
}
function Ti(e) {
  return wo(e) ? $m(e, !0) : D9(e);
}
var z9 = $r(Object, 'create');
const ui = z9;
function H9() {
  (this.__data__ = ui ? ui(null) : {}), (this.size = 0);
}
function V9(e) {
  var t = this.has(e) && delete this.__data__[e];
  return (this.size -= t ? 1 : 0), t;
}
var F9 = '__lodash_hash_undefined__',
  B9 = Object.prototype,
  j9 = B9.hasOwnProperty;
function W9(e) {
  var t = this.__data__;
  if (ui) {
    var n = t[e];
    return n === F9 ? void 0 : n;
  }
  return j9.call(t, e) ? t[e] : void 0;
}
var U9 = Object.prototype,
  q9 = U9.hasOwnProperty;
function K9(e) {
  var t = this.__data__;
  return ui ? t[e] !== void 0 : q9.call(t, e);
}
var G9 = '__lodash_hash_undefined__';
function Y9(e, t) {
  var n = this.__data__;
  return (this.size += this.has(e) ? 0 : 1), (n[e] = ui && t === void 0 ? G9 : t), this;
}
function Er(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Er.prototype.clear = H9;
Er.prototype.delete = V9;
Er.prototype.get = W9;
Er.prototype.has = K9;
Er.prototype.set = Y9;
function X9() {
  (this.__data__ = []), (this.size = 0);
}
function Eo(e, t) {
  for (var n = e.length; n--; ) if (yo(e[n][0], t)) return n;
  return -1;
}
var Q9 = Array.prototype,
  J9 = Q9.splice;
function Z9(e) {
  var t = this.__data__,
    n = Eo(t, e);
  if (n < 0) return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : J9.call(t, n, 1), --this.size, !0;
}
function ex(e) {
  var t = this.__data__,
    n = Eo(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function tx(e) {
  return Eo(this.__data__, e) > -1;
}
function nx(e, t) {
  var n = this.__data__,
    r = Eo(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this;
}
function xn(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
xn.prototype.clear = X9;
xn.prototype.delete = Z9;
xn.prototype.get = ex;
xn.prototype.has = tx;
xn.prototype.set = nx;
var rx = $r(qt, 'Map');
const fi = rx;
function sx() {
  (this.size = 0),
    (this.__data__ = {
      hash: new Er(),
      map: new (fi || xn)(),
      string: new Er(),
    });
}
function ix(e) {
  var t = typeof e;
  return t == 'string' || t == 'number' || t == 'symbol' || t == 'boolean' ? e !== '__proto__' : e === null;
}
function xo(e, t) {
  var n = e.__data__;
  return ix(t) ? n[typeof t == 'string' ? 'string' : 'hash'] : n.map;
}
function ax(e) {
  var t = xo(this, e).delete(e);
  return (this.size -= t ? 1 : 0), t;
}
function ox(e) {
  return xo(this, e).get(e);
}
function lx(e) {
  return xo(this, e).has(e);
}
function cx(e, t) {
  var n = xo(this, e),
    r = n.size;
  return n.set(e, t), (this.size += n.size == r ? 0 : 1), this;
}
function gs(e) {
  var t = -1,
    n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
gs.prototype.clear = sx;
gs.prototype.delete = ax;
gs.prototype.get = ox;
gs.prototype.has = lx;
gs.prototype.set = cx;
function Lm(e) {
  return e == null ? '' : bm(e);
}
function Pm(e, t) {
  for (var n = -1, r = t.length, s = e.length; ++n < r; ) e[s + n] = t[n];
  return e;
}
var ux = Om(Object.getPrototypeOf, Object);
const Au = ux;
var fx = '[object Object]',
  dx = Function.prototype,
  hx = Object.prototype,
  Im = dx.toString,
  px = hx.hasOwnProperty,
  mx = Im.call(Object);
function gx(e) {
  if (!Jn(e) || Tr(e) != fx) return !1;
  var t = Au(e);
  if (t === null) return !0;
  var n = px.call(t, 'constructor') && t.constructor;
  return typeof n == 'function' && n instanceof n && Im.call(n) == mx;
}
function vx(e, t, n) {
  var r = -1,
    s = e.length;
  t < 0 && (t = -t > s ? 0 : s + t), (n = n > s ? s : n), n < 0 && (n += s), (s = t > n ? 0 : (n - t) >>> 0), (t >>>= 0);
  for (var i = Array(s); ++r < s; ) i[r] = e[r + t];
  return i;
}
function bx(e, t, n) {
  var r = e.length;
  return (n = n === void 0 ? r : n), !t && n >= r ? e : vx(e, t, n);
}
var _x = '\\ud800-\\udfff',
  yx = '\\u0300-\\u036f',
  wx = '\\ufe20-\\ufe2f',
  Ex = '\\u20d0-\\u20ff',
  xx = yx + wx + Ex,
  Sx = '\\ufe0e\\ufe0f',
  Ax = '\\u200d',
  Cx = RegExp('[' + Ax + _x + xx + Sx + ']');
function Mm(e) {
  return Cx.test(e);
}
function Tx(e) {
  return e.split('');
}
var Nm = '\\ud800-\\udfff',
  kx = '\\u0300-\\u036f',
  $x = '\\ufe20-\\ufe2f',
  Ox = '\\u20d0-\\u20ff',
  Lx = kx + $x + Ox,
  Px = '\\ufe0e\\ufe0f',
  Ix = '[' + Nm + ']',
  ac = '[' + Lx + ']',
  oc = '\\ud83c[\\udffb-\\udfff]',
  Mx = '(?:' + ac + '|' + oc + ')',
  Rm = '[^' + Nm + ']',
  Dm = '(?:\\ud83c[\\udde6-\\uddff]){2}',
  zm = '[\\ud800-\\udbff][\\udc00-\\udfff]',
  Nx = '\\u200d',
  Hm = Mx + '?',
  Vm = '[' + Px + ']?',
  Rx = '(?:' + Nx + '(?:' + [Rm, Dm, zm].join('|') + ')' + Vm + Hm + ')*',
  Dx = Vm + Hm + Rx,
  zx = '(?:' + [Rm + ac + '?', ac, Dm, zm, Ix].join('|') + ')',
  Hx = RegExp(oc + '(?=' + oc + ')|' + zx + Dx, 'g');
function Vx(e) {
  return e.match(Hx) || [];
}
function Fx(e) {
  return Mm(e) ? Vx(e) : Tx(e);
}
function Bx(e) {
  return function (t) {
    t = Lm(t);
    var n = Mm(t) ? Fx(t) : void 0,
      r = n ? n[0] : t.charAt(0),
      s = n ? bx(n, 1).join('') : t.slice(1);
    return r[e]() + s;
  };
}
var jx = Bx('toUpperCase');
const Wx = jx;
function Ux(e) {
  return Wx(Lm(e).toLowerCase());
}
function qx(e, t, n) {
  return e === e && (n !== void 0 && (e = e <= n ? e : n), t !== void 0 && (e = e >= t ? e : t)), e;
}
function lt(e, t, n) {
  return n === void 0 && ((n = t), (t = void 0)), n !== void 0 && ((n = Bs(n)), (n = n === n ? n : 0)), t !== void 0 && ((t = Bs(t)), (t = t === t ? t : 0)), qx(Bs(e), t, n);
}
function Kx() {
  (this.__data__ = new xn()), (this.size = 0);
}
function Gx(e) {
  var t = this.__data__,
    n = t.delete(e);
  return (this.size = t.size), n;
}
function Yx(e) {
  return this.__data__.get(e);
}
function Xx(e) {
  return this.__data__.has(e);
}
var Qx = 200;
function Jx(e, t) {
  var n = this.__data__;
  if (n instanceof xn) {
    var r = n.__data__;
    if (!fi || r.length < Qx - 1) return r.push([e, t]), (this.size = ++n.size), this;
    n = this.__data__ = new gs(r);
  }
  return n.set(e, t), (this.size = n.size), this;
}
function Or(e) {
  var t = (this.__data__ = new xn(e));
  this.size = t.size;
}
Or.prototype.clear = Kx;
Or.prototype.delete = Gx;
Or.prototype.get = Yx;
Or.prototype.has = Xx;
Or.prototype.set = Jx;
function Zx(e, t) {
  return e && Ci(t, Su(t), e);
}
function eS(e, t) {
  return e && Ci(t, Ti(t), e);
}
var Fm = typeof exports == 'object' && exports && !exports.nodeType && exports,
  Ah = Fm && typeof module == 'object' && module && !module.nodeType && module,
  tS = Ah && Ah.exports === Fm,
  Ch = tS ? qt.Buffer : void 0,
  Th = Ch ? Ch.allocUnsafe : void 0;
function Bm(e, t) {
  if (t) return e.slice();
  var n = e.length,
    r = Th ? Th(n) : new e.constructor(n);
  return e.copy(r), r;
}
function nS(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, s = 0, i = []; ++n < r; ) {
    var a = e[n];
    t(a, n, e) && (i[s++] = a);
  }
  return i;
}
function jm() {
  return [];
}
var rS = Object.prototype,
  sS = rS.propertyIsEnumerable,
  kh = Object.getOwnPropertySymbols,
  iS = kh
    ? function (e) {
        return e == null
          ? []
          : ((e = Object(e)),
            nS(kh(e), function (t) {
              return sS.call(e, t);
            }));
      }
    : jm;
const Cu = iS;
function aS(e, t) {
  return Ci(e, Cu(e), t);
}
var oS = Object.getOwnPropertySymbols,
  lS = oS
    ? function (e) {
        for (var t = []; e; ) Pm(t, Cu(e)), (e = Au(e));
        return t;
      }
    : jm;
const Wm = lS;
function cS(e, t) {
  return Ci(e, Wm(e), t);
}
function Um(e, t, n) {
  var r = t(e);
  return wr(e) ? r : Pm(r, n(e));
}
function uS(e) {
  return Um(e, Su, Cu);
}
function fS(e) {
  return Um(e, Ti, Wm);
}
var dS = $r(qt, 'DataView');
const lc = dS;
var hS = $r(qt, 'Promise');
const cc = hS;
var pS = $r(qt, 'Set');
const uc = pS;
var $h = '[object Map]',
  mS = '[object Object]',
  Oh = '[object Promise]',
  Lh = '[object Set]',
  Ph = '[object WeakMap]',
  Ih = '[object DataView]',
  gS = kr(lc),
  vS = kr(fi),
  bS = kr(cc),
  _S = kr(uc),
  yS = kr(sc),
  ir = Tr;
((lc && ir(new lc(new ArrayBuffer(1))) != Ih) || (fi && ir(new fi()) != $h) || (cc && ir(cc.resolve()) != Oh) || (uc && ir(new uc()) != Lh) || (sc && ir(new sc()) != Ph)) &&
  (ir = function (e) {
    var t = Tr(e),
      n = t == mS ? e.constructor : void 0,
      r = n ? kr(n) : '';
    if (r)
      switch (r) {
        case gS:
          return Ih;
        case vS:
          return $h;
        case bS:
          return Oh;
        case _S:
          return Lh;
        case yS:
          return Ph;
      }
    return t;
  });
const Tu = ir;
var wS = Object.prototype,
  ES = wS.hasOwnProperty;
function xS(e) {
  var t = e.length,
    n = new e.constructor(t);
  return t && typeof e[0] == 'string' && ES.call(e, 'index') && ((n.index = e.index), (n.input = e.input)), n;
}
var SS = qt.Uint8Array;
const Mh = SS;
function ku(e) {
  var t = new e.constructor(e.byteLength);
  return new Mh(t).set(new Mh(e)), t;
}
function AS(e, t) {
  var n = t ? ku(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.byteLength);
}
var CS = /\w*$/;
function TS(e) {
  var t = new e.constructor(e.source, CS.exec(e));
  return (t.lastIndex = e.lastIndex), t;
}
var Nh = Kn ? Kn.prototype : void 0,
  Rh = Nh ? Nh.valueOf : void 0;
function kS(e) {
  return Rh ? Object(Rh.call(e)) : {};
}
function qm(e, t) {
  var n = t ? ku(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var $S = '[object Boolean]',
  OS = '[object Date]',
  LS = '[object Map]',
  PS = '[object Number]',
  IS = '[object RegExp]',
  MS = '[object Set]',
  NS = '[object String]',
  RS = '[object Symbol]',
  DS = '[object ArrayBuffer]',
  zS = '[object DataView]',
  HS = '[object Float32Array]',
  VS = '[object Float64Array]',
  FS = '[object Int8Array]',
  BS = '[object Int16Array]',
  jS = '[object Int32Array]',
  WS = '[object Uint8Array]',
  US = '[object Uint8ClampedArray]',
  qS = '[object Uint16Array]',
  KS = '[object Uint32Array]';
function GS(e, t, n) {
  var r = e.constructor;
  switch (t) {
    case DS:
      return ku(e);
    case $S:
    case OS:
      return new r(+e);
    case zS:
      return AS(e, n);
    case HS:
    case VS:
    case FS:
    case BS:
    case jS:
    case WS:
    case US:
    case qS:
    case KS:
      return qm(e, n);
    case LS:
      return new r();
    case PS:
    case NS:
      return new r(e);
    case IS:
      return TS(e);
    case MS:
      return new r();
    case RS:
      return kS(e);
  }
}
function Km(e) {
  return typeof e.constructor == 'function' && !wu(e) ? EE(Au(e)) : {};
}
var YS = '[object Map]';
function XS(e) {
  return Jn(e) && Tu(e) == YS;
}
var Dh = os && os.isMap,
  QS = Dh ? xu(Dh) : XS;
const JS = QS;
var ZS = '[object Set]';
function eA(e) {
  return Jn(e) && Tu(e) == ZS;
}
var zh = os && os.isSet,
  tA = zh ? xu(zh) : eA;
const nA = tA;
var rA = 1,
  sA = 2,
  iA = 4,
  Gm = '[object Arguments]',
  aA = '[object Array]',
  oA = '[object Boolean]',
  lA = '[object Date]',
  cA = '[object Error]',
  Ym = '[object Function]',
  uA = '[object GeneratorFunction]',
  fA = '[object Map]',
  dA = '[object Number]',
  Xm = '[object Object]',
  hA = '[object RegExp]',
  pA = '[object Set]',
  mA = '[object String]',
  gA = '[object Symbol]',
  vA = '[object WeakMap]',
  bA = '[object ArrayBuffer]',
  _A = '[object DataView]',
  yA = '[object Float32Array]',
  wA = '[object Float64Array]',
  EA = '[object Int8Array]',
  xA = '[object Int16Array]',
  SA = '[object Int32Array]',
  AA = '[object Uint8Array]',
  CA = '[object Uint8ClampedArray]',
  TA = '[object Uint16Array]',
  kA = '[object Uint32Array]',
  De = {};
De[Gm] =
  De[aA] =
  De[bA] =
  De[_A] =
  De[oA] =
  De[lA] =
  De[yA] =
  De[wA] =
  De[EA] =
  De[xA] =
  De[SA] =
  De[fA] =
  De[dA] =
  De[Xm] =
  De[hA] =
  De[pA] =
  De[mA] =
  De[gA] =
  De[AA] =
  De[CA] =
  De[TA] =
  De[kA] =
    !0;
De[cA] = De[Ym] = De[vA] = !1;
function Ws(e, t, n, r, s, i) {
  var a,
    o = t & rA,
    l = t & sA,
    u = t & iA;
  if ((n && (a = s ? n(e, r, s, i) : n(e)), a !== void 0)) return a;
  if (!Wt(e)) return e;
  var c = wr(e);
  if (c) {
    if (((a = xS(e)), !o)) return ym(e, a);
  } else {
    var f = Tu(e),
      h = f == Ym || f == uA;
    if (Eu(e)) return Bm(e, o);
    if (f == Xm || f == Gm || (h && !s)) {
      if (((a = l || h ? {} : Km(e)), !o)) return l ? cS(e, eS(a, e)) : aS(e, Zx(a, e));
    } else {
      if (!De[f]) return s ? e : {};
      a = GS(e, f, o);
    }
  }
  i || (i = new Or());
  var m = i.get(e);
  if (m) return m;
  i.set(e, a),
    nA(e)
      ? e.forEach(function (p) {
          a.add(Ws(p, t, n, p, e, i));
        })
      : JS(e) &&
        e.forEach(function (p, _) {
          a.set(_, Ws(p, t, n, _, e, i));
        });
  var g = u ? (l ? fS : uS) : l ? Ti : Su,
    d = c ? void 0 : g(e);
  return (
    ME(d || e, function (p, _) {
      d && ((_ = p), (p = e[_])), Em(a, _, Ws(p, t, n, _, e, i));
    }),
    a
  );
}
var $A = 4;
function OA(e) {
  return Ws(e, $A);
}
var LA = 1,
  PA = 4;
function Xt(e) {
  return Ws(e, LA | PA);
}
function IA(e) {
  return function (t, n, r) {
    for (var s = -1, i = Object(t), a = r(t), o = a.length; o--; ) {
      var l = a[e ? o : ++s];
      if (n(i[l], l, i) === !1) break;
    }
    return t;
  };
}
var MA = IA();
const NA = MA;
var RA = function () {
  return qt.Date.now();
};
const il = RA;
var DA = 'Expected a function',
  zA = Math.max,
  HA = Math.min;
function VA(e, t, n) {
  var r,
    s,
    i,
    a,
    o,
    l,
    u = 0,
    c = !1,
    f = !1,
    h = !0;
  if (typeof e != 'function') throw new TypeError(DA);
  (t = Bs(t) || 0), Wt(n) && ((c = !!n.leading), (f = 'maxWait' in n), (i = f ? zA(Bs(n.maxWait) || 0, t) : i), (h = 'trailing' in n ? !!n.trailing : h));
  function m(N) {
    var D = r,
      k = s;
    return (r = s = void 0), (u = N), (a = e.apply(k, D)), a;
  }
  function g(N) {
    return (u = N), (o = setTimeout(_, t)), c ? m(N) : a;
  }
  function d(N) {
    var D = N - l,
      k = N - u,
      R = t - D;
    return f ? HA(R, i - k) : R;
  }
  function p(N) {
    var D = N - l,
      k = N - u;
    return l === void 0 || D >= t || D < 0 || (f && k >= i);
  }
  function _() {
    var N = il();
    if (p(N)) return v(N);
    o = setTimeout(_, d(N));
  }
  function v(N) {
    return (o = void 0), h && r ? m(N) : ((r = s = void 0), a);
  }
  function C() {
    o !== void 0 && clearTimeout(o), (u = 0), (r = l = s = o = void 0);
  }
  function S() {
    return o === void 0 ? a : v(il());
  }
  function P() {
    var N = il(),
      D = p(N);
    if (((r = arguments), (s = this), (l = N), D)) {
      if (o === void 0) return g(l);
      if (f) return clearTimeout(o), (o = setTimeout(_, t)), m(l);
    }
    return o === void 0 && (o = setTimeout(_, t)), a;
  }
  return (P.cancel = C), (P.flush = S), P;
}
function fc(e, t, n) {
  ((n !== void 0 && !yo(e[t], n)) || (n === void 0 && !(t in e))) && yu(e, t, n);
}
function FA(e) {
  return Jn(e) && wo(e);
}
function dc(e, t) {
  if (!(t === 'constructor' && typeof e[t] == 'function') && t != '__proto__') return e[t];
}
function BA(e) {
  return Ci(e, Ti(e));
}
function jA(e, t, n, r, s, i, a) {
  var o = dc(e, n),
    l = dc(t, n),
    u = a.get(l);
  if (u) {
    fc(e, n, u);
    return;
  }
  var c = i ? i(o, l, n + '', e, t, a) : void 0,
    f = c === void 0;
  if (f) {
    var h = wr(l),
      m = !h && Eu(l),
      g = !h && !m && km(l);
    (c = l),
      h || m || g
        ? wr(o)
          ? (c = o)
          : FA(o)
            ? (c = ym(o))
            : m
              ? ((f = !1), (c = Bm(l, !0)))
              : g
                ? ((f = !1), (c = qm(l, !0)))
                : (c = [])
        : gx(l) || ic(l)
          ? ((c = o), ic(o) ? (c = BA(o)) : (!Wt(o) || _u(o)) && (c = Km(l)))
          : (f = !1);
  }
  f && (a.set(l, c), s(c, l, r, i, a), a.delete(l)), fc(e, n, c);
}
function $u(e, t, n, r, s) {
  e !== t &&
    NA(
      t,
      function (i, a) {
        if ((s || (s = new Or()), Wt(i))) jA(e, t, a, n, $u, r, s);
        else {
          var o = r ? r(dc(e, a), i, a + '', e, t, s) : void 0;
          o === void 0 && (o = i), fc(e, a, o);
        }
      },
      Ti,
    );
}
var WA = Sm(function (e, t, n, r) {
  $u(e, t, n, r);
});
const UA = WA;
var qA = Sm(function (e, t, n) {
  $u(e, t, n);
});
const tn = qA;
function KA() {
  const e = window.navigator.language;
  switch (e.split('-')[0]) {
    case 'ja':
      return ['jp', 0];
    case 'ko':
      return ['kr', 1];
    case 'th':
      return ['th', 1];
    case 'zh':
      return e.toLowerCase().startsWith('zh-tw') ? ['tw', 1] : ['cn', 2];
    default:
      return ['en', 1];
  }
}
const Ae = Ai('settingsstore', {
    state: () => {
      const e = KA(),
        t = {
          language: e[0],
          server: e[1],
          theme: 'auto',
          highcontrast: !!(!(CSS.supports('backdrop-filter', 'blur(1px)') || CSS.supports('-webkit-backdrop-filter', 'blur(1px)')) || window.matchMedia('(prefers-contrast: more)').matches),
          backgrounds: !0,
          preferredUnits: 'metric',
          distanceUnit: 'raw',
          durationUnit: 'seconds',
          screenMode: 'full',
          collectionPerServer: !0,
          showDeveloperProps: !1,
          animationMode: 1,
          restoreRoute: !1,
          restorePage: !1,
          lastRoute: '/',
          showSkillDelay: !1,
          changelogSeen: '',
        };
      return {
        settings: ce(
          kt('settings', t, {
            mergeDefaults: (r, s) => tn(s, r),
          }),
        ),
      };
    },
    getters: {
      languageProp: (e) => Ux(e.settings.language),
    },
  }),
  ie = Ai('dataStore', {
    state: () => ({
      config: {
        data: {},
        isLangSpecfic: !1,
        loaded: !1,
      },
      students: {
        data: {},
        isLangSpecfic: !0,
        loaded: !1,
      },
      voice: {
        data: {},
        isLangSpecfic: !0,
        loaded: !1,
      },
      summons: {
        data: {},
        isLangSpecfic: !0,
        loaded: !1,
      },
      items: {
        data: {},
        isLangSpecfic: !0,
        loaded: !1,
      },
      furniture: {
        data: {},
        isLangSpecfic: !0,
        loaded: !1,
      },
      equipment: {
        data: {},
        isLangSpecfic: !0,
        loaded: !1,
      },
      currency: {
        data: {},
        isLangSpecfic: !0,
        loaded: !1,
      },
      raids: {
        data: {},
        isLangSpecfic: !0,
        loaded: !1,
      },
      stages: {
        data: {},
        isLangSpecfic: !0,
        loaded: !1,
      },
      events: {
        data: {},
        isLangSpecfic: !0,
        loaded: !1,
      },
      enemies: {
        data: {},
        isLangSpecfic: !0,
        loaded: !1,
      },
      localization: {
        data: {},
        isLangSpecfic: !0,
        loaded: !1,
      },
      groups: {
        data: {},
        isLangSpecfic: !1,
        loaded: !1,
      },
      crafting: {
        data: {},
        isLangSpecfic: !1,
        loaded: !1,
      },
      shops: {
        data: {},
        isLangSpecfic: !1,
        loaded: !1,
      },
      schedule: {
        data: {},
        isLangSpecfic: !0,
        loaded: !1,
      },
    }),
    actions: {
      async fetchData(e) {
        if (this[e].isLangSpecfic) {
          const t = Ae().settings.language;
          return this[e].loaded != t
            ? (console.debug(`fetching ${t}/${e}`),
              fetch(`/data/${t}/${e}.min.json`)
                .then((n) => n.json())
                .then((n) => {
                  console.debug(`fetched ${t}/${e}`), Mn.isStarted() && Mn.inc(), (this[e].data = n), (this[e].loaded = t);
                }))
            : Promise.resolve();
        } else
          return this[e].loaded
            ? Promise.resolve()
            : (console.debug(`fetching ${e}`),
              fetch(`/data/${e}.min.json`)
                .then((t) => t.json())
                .then((t) => {
                  console.debug(`fetched ${e}`), Mn.isStarted() && Mn.inc(), (this[e].data = t), (this[e].loaded = !0);
                }));
      },
      async ensureData(...e) {
        return Promise.all(e.map((t) => this.fetchData(t)));
      },
    },
  });
function st(e, t, ...n) {
  var s, i;
  const r = ie().localization.data;
  return ((i = (s = r == null ? void 0 : r[`${e}`]) == null ? void 0 : s[String(t)]) == null ? void 0 : i.replace(/\{([0-9]+)\}/g, (a, o) => (o < n.length ? n[o] : ''))) ?? null;
}
function Y(e, ...t) {
  return st('UI', e, ...t);
}
const GA = {
    class: 'dropdown',
  },
  YA = {
    class: 'label',
  },
  XA = {
    class: 'dropdown-menu dropdown-menu-dark dropdown-menu-scroll-large',
    style: {
      'max-height': 'calc(100vh - 150px)',
    },
  },
  QA = ['onClick'],
  Os = {
    __name: 'DropdownList',
    props: {
      items: Array,
      selectedIndex: Number,
      options: {
        type: Object,
        default() {
          return {
            autoClose: !0,
          };
        },
      },
      btnClass: String,
    },
    emits: ['update:selectedIndex', 'select'],
    setup(e, { expose: t, emit: n }) {
      const r = e,
        s = X2(r, 'selectedIndex', n),
        i = ce(null),
        a = ce(null);
      function o(f) {
        (s.value = f), n('select', r.items[f], f);
      }
      function l() {
        a.value.show();
      }
      function u() {
        a.value.hide();
      }
      function c() {
        a.value.toggle();
      }
      return (
        on(() => {
          a.value = new Mt(i.value, r.options);
        }),
        fs(() => {
          a.value.dispose();
        }),
        t({
          show: l,
          hide: u,
          toggle: c,
        }),
        (f, h) => {
          const m = gt('fa');
          return (
            be(),
            ke('div', GA, [
              w(
                'button',
                {
                  'class': le(['btn-pill', e.btnClass]),
                  'data-bs-toggle': 'dropdown',
                  'ref_key': 'trigger',
                  'ref': i,
                },
                [
                  ct(
                    f.$slots,
                    'button',
                    {
                      item: e.items[E(s)],
                    },
                    () => [w('span', YA, G(e.items[E(s)]), 1)],
                  ),
                  F(
                    m,
                    {
                      icon: E(dm),
                      class: 'me-2',
                    },
                    null,
                    8,
                    ['icon'],
                  ),
                ],
                2,
              ),
              w('ul', XA, [
                ct(f.$slots, 'listHeader'),
                (be(!0),
                ke(
                  Ke,
                  null,
                  no(
                    e.items,
                    (g, d) => (
                      be(),
                      ke('li', null, [
                        w(
                          'button',
                          {
                            class: le([
                              'dropdown-item w-100 d-flex align-items-center',
                              {
                                active: E(s) == d,
                              },
                            ]),
                            onClick: () => o(d),
                          },
                          [
                            ct(
                              f.$slots,
                              'listItem',
                              {
                                item: g,
                              },
                              () => [w('span', null, G(g), 1)],
                            ),
                          ],
                          10,
                          QA,
                        ),
                      ])
                    ),
                  ),
                  256,
                )),
              ]),
            ])
          );
        }
      );
    },
  };
const ki = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, s] of t) n[r] = s;
    return n;
  },
  JA = (e) => (vi('data-v-02b6504d'), (e = e()), bi(), e),
  ZA = {
    key: 0,
    class: 'modal-header',
    style: {
      'border-bottom': 'none',
    },
  },
  eC = {
    class: 'modal-title',
  },
  tC = JA(() =>
    w(
      'button',
      {
        'type': 'button',
        'class': 'btn-close btn-close-white',
        'data-bs-dismiss': 'modal',
      },
      null,
      -1,
    ),
  ),
  nC = {
    key: 1,
    class: 'modal-footer',
  },
  rC = {
    __name: 'Modal',
    props: {
      size: {
        type: String,
        default: 'lg',
      },
      tooltip: String,
      fixedHeight: Boolean,
      keepAlive: Boolean,
      noBackdrop: Boolean,
      noAnimation: Boolean,
      noHeader: Boolean,
      noPadding: Boolean,
    },
    setup(e, { expose: t }) {
      const n = e,
        r = ce(null),
        s = ce(null),
        i = ce(!1);
      function a() {
        r.value.show();
      }
      function o() {
        r.value.hide();
      }
      return (
        on(() => {
          (r.value = new ai(s.value, {
            backdrop: !n.noBackdrop,
          })),
            s.value.addEventListener('show.bs.modal', (l) => {
              i.value = !0;
            }),
            s.value.addEventListener('hidden.bs.modal', (l) => {
              i.value = !1;
            });
        }),
        fs(() => {
          document.body.style.removeProperty('overflow'), document.body.style.removeProperty('padding-right'), r.value.dispose();
        }),
        t({
          show: a,
          hide: o,
        }),
        (l, u) => {
          const c = lp('tooltip');
          return (
            be(),
            ke(
              Ke,
              null,
              [
                Za(
                  (be(),
                  ke(
                    'a',
                    io(
                      {
                        onClick: a,
                      },
                      l.$attrs,
                    ),
                    [ct(l.$slots, 'trigger', {}, void 0, !0)],
                    16,
                  )),
                  [[c, e.tooltip]],
                ),
                (be(),
                sn(
                  vp,
                  {
                    to: 'body',
                  },
                  [
                    w(
                      'div',
                      {
                        class: le([
                          'modal high-contrast',
                          {
                            fade: !e.noAnimation,
                          },
                        ]),
                        ref_key: 'modal',
                        ref: s,
                        tabindex: '-1',
                      },
                      [
                        w(
                          'div',
                          {
                            class: le(`modal-dialog modal-${e.size} modal-fullscreen-lg-down ${e.fixedHeight ? 'h-100' : ''}`),
                          },
                          [
                            i.value || e.keepAlive
                              ? (be(),
                                ke(
                                  'div',
                                  {
                                    key: 0,
                                    class: le([
                                      'modal-content',
                                      {
                                        'h-100': e.fixedHeight,
                                      },
                                    ]),
                                  },
                                  [
                                    e.noHeader ? yt('', !0) : (be(), ke('div', ZA, [w('h5', eC, [ct(l.$slots, 'title', {}, void 0, !0)]), tC])),
                                    w(
                                      'div',
                                      {
                                        class: le([
                                          'modal-body',
                                          {
                                            'pt-1': !e.noHeader,
                                            'p-0 m-0': e.noPadding,
                                            'fixed-height': e.fixedHeight,
                                          },
                                        ]),
                                      },
                                      [
                                        ct(
                                          l.$slots,
                                          'body',
                                          {
                                            close: o,
                                          },
                                          void 0,
                                          !0,
                                        ),
                                      ],
                                      2,
                                    ),
                                    l.$slots.footer ? (be(), ke('div', nC, [ct(l.$slots, 'footer', {}, void 0, !0)])) : yt('', !0),
                                  ],
                                  2,
                                ))
                              : yt('', !0),
                          ],
                          2,
                        ),
                      ],
                      2,
                    ),
                  ],
                )),
              ],
              64,
            )
          );
        }
      );
    },
  },
  al = ki(rC, [['__scopeId', 'data-v-02b6504d']]);
var sC = {
    prefix: 'fab',
    iconName: 'discord',
    icon: [
      640,
      512,
      [],
      'f392',
      'M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z',
    ],
  },
  iC = {
    prefix: 'fab',
    iconName: 'github',
    icon: [
      496,
      512,
      [],
      'f09b',
      'M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z',
    ],
  };
const aC = (e) => (vi('data-v-0684c4c3'), (e = e()), bi(), e),
  oC = {
    class: 'd-none d-lg-block ms-3 flex-fill',
  },
  lC = {
    class: 'navbar-nav my-2 my-lg-0',
  },
  cC = {
    class: 'nav-item dropdown',
  },
  uC = {
    class: 'dropdown-menu dropdown-menu-dark',
  },
  fC = {
    id: 'sidebar-menu',
    class: 'offcanvas offcanvas-start high-contrast',
  },
  dC = {
    class: 'offcanvas-header',
  },
  hC = aC(() =>
    w(
      'button',
      {
        'class': 'btn-close ms-auto',
        'data-bs-dismiss': 'offcanvas',
        'data-bs-target': '#sidebar-menu',
      },
      null,
      -1,
    ),
  ),
  pC = {
    class: 'offcanvas-body p-0',
  },
  mC = {
    class: 'menu-links',
  },
  gC = {
    class: 'separator',
  },
  vC = {
    class: 'offcanvas-footer p-3',
  },
  bC = {
    class: 'd-flex align-items-center gap-2 w-100',
  },
  _C = {
    class: 'btn btn-dark',
    target: '_blank',
    href: 'https://discord.gg/QB7wdyYf4u',
  },
  yC = {
    class: 'btn btn-dark',
    target: '_blank',
    href: 'https://github.com/SchaleDB/SchaleDB',
  },
  wC = {
    __name: 'NavbarLinks',
    setup(e) {
      const t = t7();
      Ze(t, n);
      function n() {
        Mt.getOrCreateInstance(document.getElementById('tools-dropdown')).hide(), bn.getOrCreateInstance(document.getElementById('sidebar-menu')).hide();
      }
      return (r, s) => {
        const i = gt('fa'),
          a = gt('RouterLink'),
          o = gt('inline-svg');
        return (
          be(),
          ke(
            Ke,
            null,
            [
              w('div', oC, [
                w('ul', lC, [
                  F(
                    a,
                    {
                      to: '/home',
                      class: le([
                        'nav-link d-lg-none px-3 circle',
                        {
                          active: E(t).name == 'home',
                        },
                      ]),
                    },
                    {
                      default: ve(() => [
                        F(
                          i,
                          {
                            icon: E(uh),
                            class: 'nav-icon',
                          },
                          null,
                          8,
                          ['icon'],
                        ),
                        _e(' ' + G(E(Y)('navbar_home')), 1),
                      ]),
                      _: 1,
                    },
                    8,
                    ['class'],
                  ),
                  F(
                    a,
                    {
                      to: '/student',
                      class: le([
                        'nav-link px-3 circle',
                        {
                          active: E(t).path.startsWith('/student'),
                        },
                      ]),
                    },
                    {
                      default: ve(() => [
                        F(
                          i,
                          {
                            icon: E(ih),
                            class: 'nav-icon',
                          },
                          null,
                          8,
                          ['icon'],
                        ),
                        _e(' ' + G(E(Y)('students')), 1),
                      ]),
                      _: 1,
                    },
                    8,
                    ['class'],
                  ),
                  F(
                    a,
                    {
                      to: '/item',
                      class: le([
                        'nav-link px-3 circle',
                        {
                          active: E(t).path.startsWith('/item') || E(t).path.startsWith('/furniture') || E(t).path.startsWith('/equipment'),
                        },
                      ]),
                    },
                    {
                      default: ve(() => [
                        F(
                          i,
                          {
                            icon: E(sh),
                            class: 'nav-icon',
                          },
                          null,
                          8,
                          ['icon'],
                        ),
                        _e(' ' + G(E(Y)('item')), 1),
                      ]),
                      _: 1,
                    },
                    8,
                    ['class'],
                  ),
                  F(
                    a,
                    {
                      to: '/crafting',
                      class: le([
                        'nav-link px-3 circle',
                        {
                          active: E(t).path.startsWith('/crafting'),
                        },
                      ]),
                    },
                    {
                      default: ve(() => [
                        F(
                          i,
                          {
                            icon: E(dh),
                            class: 'nav-icon',
                          },
                          null,
                          8,
                          ['icon'],
                        ),
                        _e(' ' + G(E(Y)('crafting')), 1),
                      ]),
                      _: 1,
                    },
                    8,
                    ['class'],
                  ),
                  F(
                    a,
                    {
                      to: '/stage',
                      class: le([
                        'nav-link px-3 circle',
                        {
                          active: E(t).path.startsWith('/stage'),
                        },
                      ]),
                    },
                    {
                      default: ve(() => [
                        F(
                          i,
                          {
                            icon: E(ah),
                            class: 'nav-icon',
                          },
                          null,
                          8,
                          ['icon'],
                        ),
                        _e(' ' + G(E(Y)('stages')), 1),
                      ]),
                      _: 1,
                    },
                    8,
                    ['class'],
                  ),
                  F(
                    a,
                    {
                      to: '/event',
                      class: le([
                        'nav-link px-3 circle',
                        {
                          active: E(t).path.startsWith('/event'),
                        },
                      ]),
                    },
                    {
                      default: ve(() => [
                        F(
                          i,
                          {
                            icon: E(hh),
                            class: 'nav-icon',
                          },
                          null,
                          8,
                          ['icon'],
                        ),
                        _e(' ' + G(E(Y)('events')), 1),
                      ]),
                      _: 1,
                    },
                    8,
                    ['class'],
                  ),
                  F(
                    a,
                    {
                      to: '/raid',
                      class: le([
                        'nav-link px-3 circle',
                        {
                          active: E(t).path.startsWith('/raid') || E(t).path.startsWith('/drill'),
                        },
                      ]),
                    },
                    {
                      default: ve(() => [
                        F(
                          i,
                          {
                            icon: E(lh),
                            class: 'nav-icon',
                          },
                          null,
                          8,
                          ['icon'],
                        ),
                        _e(' ' + G(E(Y)('raids')), 1),
                      ]),
                      _: 1,
                    },
                    8,
                    ['class'],
                  ),
                  w('li', cC, [
                    w(
                      'a',
                      {
                        'id': 'tools-dropdown',
                        'class': le([
                          'nav-link dropdown-toggle px-3 circle',
                          {
                            active: E(t).name == 'calculatorview',
                          },
                        ]),
                        'href': '#',
                        'data-bs-toggle': 'dropdown',
                      },
                      [
                        F(
                          i,
                          {
                            icon: E(fh),
                            class: 'nav-icon',
                          },
                          null,
                          8,
                          ['icon'],
                        ),
                        _e(' ' + G(E(Y)('tools')) + ' ', 1),
                        F(
                          i,
                          {
                            class: 'ms-1',
                            icon: E(dm),
                          },
                          null,
                          8,
                          ['icon'],
                        ),
                      ],
                      2,
                    ),
                    w('ul', uC, [
                      w('li', null, [
                        F(
                          a,
                          {
                            to: '/calculator',
                            class: le([
                              'dropdown-item',
                              {
                                active: E(t).name == 'calculatorview',
                              },
                            ]),
                            onClick: n,
                          },
                          {
                            default: ve(() => [
                              F(
                                i,
                                {
                                  icon: E(ch),
                                  class: 'nav-icon',
                                },
                                null,
                                8,
                                ['icon'],
                              ),
                              _e(' ' + G(E(Y)('damage_calculator')), 1),
                            ]),
                            _: 1,
                          },
                          8,
                          ['class'],
                        ),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              (be(),
              sn(
                vp,
                {
                  to: 'body',
                },
                [
                  w('div', fC, [
                    w('div', dC, [
                      F(
                        o,
                        {
                          class: 'logo',
                          src: '/images/logo_schaledb.svg',
                        },
                        null,
                        8,
                        ['src'],
                      ),
                      hC,
                    ]),
                    w('div', pC, [
                      w('div', mC, [
                        F(
                          a,
                          {
                            to: '/home',
                            class: le([
                              '',
                              {
                                active: E(t).name == 'home',
                              },
                            ]),
                            onClick: n,
                          },
                          {
                            default: ve(() => [
                              F(
                                i,
                                {
                                  icon: E(uh),
                                  class: 'nav-icon',
                                },
                                null,
                                8,
                                ['icon'],
                              ),
                              _e(' ' + G(E(Y)('navbar_home')), 1),
                            ]),
                            _: 1,
                          },
                          8,
                          ['class'],
                        ),
                        F(
                          a,
                          {
                            to: '/student',
                            class: le([
                              '',
                              {
                                active: E(t).path.startsWith('/student'),
                              },
                            ]),
                            onClick: n,
                          },
                          {
                            default: ve(() => [
                              F(
                                i,
                                {
                                  icon: E(ih),
                                  class: 'nav-icon',
                                },
                                null,
                                8,
                                ['icon'],
                              ),
                              _e(' ' + G(E(Y)('students')), 1),
                            ]),
                            _: 1,
                          },
                          8,
                          ['class'],
                        ),
                        F(
                          a,
                          {
                            to: '/item',
                            class: le([
                              '',
                              {
                                active: E(t).path.startsWith('/item'),
                              },
                            ]),
                            onClick: n,
                          },
                          {
                            default: ve(() => [
                              F(
                                i,
                                {
                                  icon: E(sh),
                                  class: 'nav-icon',
                                },
                                null,
                                8,
                                ['icon'],
                              ),
                              _e(' ' + G(E(Y)('item')), 1),
                            ]),
                            _: 1,
                          },
                          8,
                          ['class'],
                        ),
                        F(
                          a,
                          {
                            to: '/furniture',
                            class: le([
                              '',
                              {
                                active: E(t).path.startsWith('/furniture'),
                              },
                            ]),
                            onClick: n,
                          },
                          {
                            default: ve(() => [
                              F(
                                i,
                                {
                                  icon: E(f7),
                                  class: 'nav-icon',
                                },
                                null,
                                8,
                                ['icon'],
                              ),
                              _e(' ' + G(E(Y)('furniture')), 1),
                            ]),
                            _: 1,
                          },
                          8,
                          ['class'],
                        ),
                        F(
                          a,
                          {
                            to: '/equipment',
                            class: le([
                              '',
                              {
                                active: E(t).path.startsWith('/equipment'),
                              },
                            ]),
                            onClick: n,
                          },
                          {
                            default: ve(() => [
                              F(
                                i,
                                {
                                  icon: E(a7),
                                  class: 'nav-icon',
                                },
                                null,
                                8,
                                ['icon'],
                              ),
                              _e(' ' + G(E(Y)('equipment')), 1),
                            ]),
                            _: 1,
                          },
                          8,
                          ['class'],
                        ),
                        F(
                          a,
                          {
                            to: '/crafting',
                            class: le([
                              '',
                              {
                                active: E(t).path.startsWith('/crafting'),
                              },
                            ]),
                            onClick: n,
                          },
                          {
                            default: ve(() => [
                              F(
                                i,
                                {
                                  icon: E(dh),
                                  class: 'nav-icon',
                                },
                                null,
                                8,
                                ['icon'],
                              ),
                              _e(' ' + G(E(Y)('crafting')), 1),
                            ]),
                            _: 1,
                          },
                          8,
                          ['class'],
                        ),
                        F(
                          a,
                          {
                            to: '/stage',
                            class: le([
                              '',
                              {
                                active: E(t).path.startsWith('/stage'),
                              },
                            ]),
                            onClick: n,
                          },
                          {
                            default: ve(() => [
                              F(
                                i,
                                {
                                  icon: E(ah),
                                  class: 'nav-icon',
                                },
                                null,
                                8,
                                ['icon'],
                              ),
                              _e(' ' + G(E(Y)('stages')), 1),
                            ]),
                            _: 1,
                          },
                          8,
                          ['class'],
                        ),
                        F(
                          a,
                          {
                            to: '/event',
                            class: le([
                              '',
                              {
                                active: E(t).path.startsWith('/event'),
                              },
                            ]),
                            onClick: n,
                          },
                          {
                            default: ve(() => [
                              F(
                                i,
                                {
                                  icon: E(hh),
                                  class: 'nav-icon',
                                },
                                null,
                                8,
                                ['icon'],
                              ),
                              _e(' ' + G(E(Y)('events')), 1),
                            ]),
                            _: 1,
                          },
                          8,
                          ['class'],
                        ),
                        F(
                          a,
                          {
                            to: '/raid',
                            class: le([
                              '',
                              {
                                active: E(t).path.startsWith('/raid') || E(t).path.startsWith('/drill'),
                              },
                            ]),
                            onClick: n,
                          },
                          {
                            default: ve(() => [
                              F(
                                i,
                                {
                                  icon: E(lh),
                                  class: 'nav-icon',
                                },
                                null,
                                8,
                                ['icon'],
                              ),
                              _e(' ' + G(E(Y)('raids')), 1),
                            ]),
                            _: 1,
                          },
                          8,
                          ['class'],
                        ),
                        w('div', gC, [
                          F(
                            i,
                            {
                              icon: E(fh),
                              class: 'nav-icon',
                            },
                            null,
                            8,
                            ['icon'],
                          ),
                          _e(' ' + G(E(Y)('tools')), 1),
                        ]),
                        F(
                          a,
                          {
                            to: '/calculator',
                            class: le({
                              active: E(t).name == 'calculatorview',
                            }),
                            onClick: n,
                          },
                          {
                            default: ve(() => [
                              F(
                                i,
                                {
                                  icon: E(ch),
                                  class: 'nav-icon',
                                },
                                null,
                                8,
                                ['icon'],
                              ),
                              _e(' ' + G(E(Y)('damage_calculator')), 1),
                            ]),
                            _: 1,
                          },
                          8,
                          ['class'],
                        ),
                      ]),
                    ]),
                    w('div', vC, [
                      w('div', bC, [
                        w('a', _C, [
                          F(
                            i,
                            {
                              icon: E(sC),
                              style: {
                                width: '20px',
                              },
                            },
                            null,
                            8,
                            ['icon'],
                          ),
                        ]),
                        w('a', yC, [
                          F(
                            i,
                            {
                              icon: E(iC),
                              style: {
                                width: '20px',
                              },
                            },
                            null,
                            8,
                            ['icon'],
                          ),
                        ]),
                      ]),
                    ]),
                  ]),
                ],
              )),
            ],
            64,
          )
        );
      };
    },
  },
  EC = ki(wC, [['__scopeId', 'data-v-0684c4c3']]),
  xC = '/images/craftnode/Node_Border.png';
var Qm = {
  exports: {},
};
(function (e) {
  ((t, n) => {
    e.exports ? (e.exports = n()) : (t.fuzzysort = n());
  })(L2, (t) => {
    var n = (W, O) => {
        if (!W || !O) return Ce;
        var q = g(W);
        ye(O) || (O = m(O));
        var ne = q.bitflags;
        return (ne & O._bitflags) !== ne ? Ce : p(q, O);
      },
      r = (W, O, q) => {
        if (!W) return q != null && q.all ? d(O, q) : Se;
        var ne = g(W),
          A = ne.bitflags,
          I = ne.containsSpace,
          T = f((q == null ? void 0 : q.threshold) || 0),
          B = (q == null ? void 0 : q.limit) || ae,
          J = 0,
          b = 0,
          y = O.length;
        function x(Me) {
          J < B ? (He.add(Me), ++J) : (++b, Me._score > He.peek()._score && He.replaceTop(Me));
        }
        if (q != null && q.key)
          for (var L = q.key, $ = 0; $ < y; ++$) {
            var z = O[$],
              j = fe(z, L);
            if (j && (ye(j) || (j = m(j)), (A & j._bitflags) === A)) {
              var H = p(ne, j);
              H !== Ce && (H._score < T || ((H.obj = z), x(H)));
            }
          }
        else if (q != null && q.keys) {
          var X = q.keys,
            V = X.length;
          e: for (var $ = 0; $ < y; ++$) {
            var z = O[$];
            {
              for (var se = 0, K = 0; K < V; ++K) {
                var L = X[K],
                  j = fe(z, L);
                if (!j) {
                  Q[K] = Ye;
                  continue;
                }
                ye(j) || (j = m(j)), (Q[K] = j), (se |= j._bitflags);
              }
              if ((A & se) !== A) continue;
            }
            if (I) for (let Te = 0; Te < ne.spaceSearches.length; Te++) M[Te] = de;
            for (var K = 0; K < V; ++K) {
              if (((j = Q[K]), j === Ye)) {
                te[K] = Ye;
                continue;
              }
              if (((te[K] = p(ne, j, !1, I)), te[K] === Ce)) {
                te[K] = Ye;
                continue;
              }
              if (I)
                for (let Le = 0; Le < ne.spaceSearches.length; Le++) {
                  if (ee[Le] > -1e3 && M[Le] > de) {
                    var re = (M[Le] + ee[Le]) / 4;
                    re > M[Le] && (M[Le] = re);
                  }
                  ee[Le] > M[Le] && (M[Le] = ee[Le]);
                }
            }
            if (I) {
              for (let Te = 0; Te < ne.spaceSearches.length; Te++) if (M[Te] === de) continue e;
            } else {
              var Z = !1;
              for (let Te = 0; Te < V; Te++)
                if (te[Te]._score !== de) {
                  Z = !0;
                  break;
                }
              if (!Z) continue;
            }
            var he = new l(V);
            for (let Te = 0; Te < V; Te++) he[Te] = te[Te];
            if (I) {
              var ge = 0;
              for (let Te = 0; Te < ne.spaceSearches.length; Te++) ge += M[Te];
            } else {
              var ge = de;
              for (let Le = 0; Le < V; Le++) {
                var H = he[Le];
                if (H._score > -1e3 && ge > de) {
                  var re = (ge + H._score) / 4;
                  re > ge && (ge = re);
                }
                H._score > ge && (ge = H._score);
              }
            }
            if (((he.obj = z), (he._score = ge), q != null && q.scoreFn)) {
              if (((ge = q.scoreFn(he)), !ge)) continue;
              (ge = f(ge)), (he._score = ge);
            }
            ge < T || x(he);
          }
        } else
          for (var $ = 0; $ < y; ++$) {
            var j = O[$];
            if (j && (ye(j) || (j = m(j)), (A & j._bitflags) === A)) {
              var H = p(ne, j);
              H !== Ce && (H._score < T || x(H));
            }
          }
        if (J === 0) return Se;
        for (var Ee = new Array(J), $ = J - 1; $ >= 0; --$) Ee[$] = He.poll();
        return (Ee.total = J + b), Ee;
      },
      s = (W, O = '<b>', q = '</b>') => {
        for (var ne = typeof O == 'function' ? O : void 0, A = W.target, I = A.length, T = W.indexes, B = '', J = 0, b = 0, y = !1, x = [], L = 0; L < I; ++L) {
          var $ = A[L];
          if (T[b] === L) {
            if ((++b, y || ((y = !0), ne ? (x.push(B), (B = '')) : (B += O)), b === T.length)) {
              ne ? ((B += $), x.push(ne(B, J++)), (B = ''), x.push(A.substr(L + 1))) : (B += $ + q + A.substr(L + 1));
              break;
            }
          } else y && ((y = !1), ne ? (x.push(ne(B, J++)), (B = '')) : (B += q));
          B += $;
        }
        return ne ? x : B;
      },
      i = (W) => {
        typeof W == 'number' ? (W = '' + W) : typeof W != 'string' && (W = '');
        var O = v(W);
        return u(W, {
          _targetLower: O._lower,
          _targetLowerCodes: O.lowerCodes,
          _bitflags: O.bitflags,
        });
      },
      a = () => {
        P.clear(), N.clear();
      };
    class o {
      get indexes() {
        return this._indexes.slice(0, this._indexes.len).sort((O, q) => O - q);
      }
      set indexes(O) {
        return (this._indexes = O);
      }
      highlight(O, q) {
        return s(this, O, q);
      }
      get score() {
        return c(this._score);
      }
      set score(O) {
        this._score = f(O);
      }
    }
    class l extends Array {
      get score() {
        return c(this._score);
      }
      set score(O) {
        this._score = f(O);
      }
    }
    var u = (W, O) => {
        const q = new o();
        return (
          (q.target = W),
          (q.obj = O.obj ?? Ce),
          (q._score = O._score ?? de),
          (q._indexes = O._indexes ?? []),
          (q._targetLower = O._targetLower ?? ''),
          (q._targetLowerCodes = O._targetLowerCodes ?? Ce),
          (q._nextBeginningIndexes = O._nextBeginningIndexes ?? Ce),
          (q._bitflags = O._bitflags ?? 0),
          q
        );
      },
      c = (W) => (W === de ? 0 : W > 1 ? W : Math.E ** (((-W + 1) ** 0.04307 - 1) * -2)),
      f = (W) => (W === 0 ? de : W > 1 ? W : 1 - Math.pow(Math.log(W) / -2 + 1, 1 / 0.04307)),
      h = (W) => {
        typeof W == 'number' ? (W = '' + W) : typeof W != 'string' && (W = ''), (W = W.trim());
        var O = v(W),
          q = [];
        if (O.containsSpace) {
          var ne = W.split(/\s+/);
          ne = [...new Set(ne)];
          for (var A = 0; A < ne.length; A++)
            if (ne[A] !== '') {
              var I = v(ne[A]);
              q.push({
                lowerCodes: I.lowerCodes,
                _lower: ne[A].toLowerCase(),
                containsSpace: !1,
              });
            }
        }
        return {
          lowerCodes: O.lowerCodes,
          _lower: O._lower,
          containsSpace: O.containsSpace,
          bitflags: O.bitflags,
          spaceSearches: q,
        };
      },
      m = (W) => {
        if (W.length > 999) return i(W);
        var O = P.get(W);
        return O !== void 0 || ((O = i(W)), P.set(W, O)), O;
      },
      g = (W) => {
        if (W.length > 999) return h(W);
        var O = N.get(W);
        return O !== void 0 || ((O = h(W)), N.set(W, O)), O;
      },
      d = (W, O) => {
        var q = [];
        q.total = W.length;
        var ne = (O == null ? void 0 : O.limit) || ae;
        if (O != null && O.key)
          for (var A = 0; A < W.length; A++) {
            var I = W[A],
              T = fe(I, O.key);
            if (T != Ce) {
              ye(T) || (T = m(T));
              var B = u(T.target, {
                _score: T._score,
                obj: I,
              });
              if ((q.push(B), q.length >= ne)) return q;
            }
          }
        else if (O != null && O.keys)
          for (var A = 0; A < W.length; A++) {
            for (var I = W[A], J = new l(O.keys.length), b = O.keys.length - 1; b >= 0; --b) {
              var T = fe(I, O.keys[b]);
              if (!T) {
                J[b] = Ye;
                continue;
              }
              ye(T) || (T = m(T)), (T._score = de), (T._indexes.len = 0), (J[b] = T);
            }
            if (((J.obj = I), (J._score = de), q.push(J), q.length >= ne)) return q;
          }
        else
          for (var A = 0; A < W.length; A++) {
            var T = W[A];
            if (T != Ce && (ye(T) || (T = m(T)), (T._score = de), (T._indexes.len = 0), q.push(T), q.length >= ne)) return q;
          }
        return q;
      },
      p = (W, O, q = !1, ne = !1) => {
        if (q === !1 && W.containsSpace) return _(W, O, ne);
        for (var A = W._lower, I = W.lowerCodes, T = I[0], B = O._targetLowerCodes, J = I.length, b = B.length, $ = 0, y = 0, x = 0; ; ) {
          var L = T === B[y];
          if (L) {
            if (((D[x++] = y), ++$, $ === J)) break;
            T = I[$];
          }
          if ((++y, y >= b)) return Ce;
        }
        var $ = 0,
          z = !1,
          j = 0,
          H = O._nextBeginningIndexes;
        H === Ce && (H = O._nextBeginningIndexes = S(O.target)), (y = D[0] === 0 ? 0 : H[D[0] - 1]);
        var X = 0;
        if (y !== b)
          for (;;)
            if (y >= b) {
              if ($ <= 0 || (++X, X > 200)) break;
              --$;
              var V = k[--j];
              y = H[V];
            } else {
              var L = I[$] === B[y];
              if (L) {
                if (((k[j++] = y), ++$, $ === J)) {
                  z = !0;
                  break;
                }
                ++y;
              } else y = H[y];
            }
        var se = J <= 1 ? -1 : O._targetLower.indexOf(A, D[0]),
          K = !!~se,
          re = K ? se === 0 || O._nextBeginningIndexes[se - 1] === se : !1;
        if (K && !re) {
          for (var Z = 0; Z < H.length; Z = H[Z])
            if (!(Z <= se)) {
              for (var he = 0; he < J && I[he] === O._targetLowerCodes[Z + he]; he++);
              if (he === J) {
                (se = Z), (re = !0);
                break;
              }
            }
        }
        var ge = (Te) => {
          for (var Le = 0, Sn = 0, Ct = 1; Ct < J; ++Ct) Te[Ct] - Te[Ct - 1] !== 1 && ((Le -= Te[Ct]), ++Sn);
          var at = Te[J - 1] - Te[0] - (J - 1);
          if (((Le -= (12 + at) * Sn), Te[0] !== 0 && (Le -= Te[0] * Te[0] * 0.2), !z)) Le *= 1e3;
          else {
            for (var dt = 1, Ct = H[0]; Ct < b; Ct = H[Ct]) ++dt;
            dt > 24 && (Le *= (dt - 24) * 10);
          }
          return (Le -= (b - J) / 2), K && (Le /= 1 + J * J * 1), re && (Le /= 1 + J * J * 1), (Le -= (b - J) / 2), Le;
        };
        if (z)
          if (re) {
            for (var Z = 0; Z < J; ++Z) D[Z] = se + Z;
            var Ee = D,
              Me = ge(D);
          } else
            var Ee = k,
              Me = ge(k);
        else {
          if (K) for (var Z = 0; Z < J; ++Z) D[Z] = se + Z;
          var Ee = D,
            Me = ge(Ee);
        }
        O._score = Me;
        for (var Z = 0; Z < J; ++Z) O._indexes[Z] = Ee[Z];
        O._indexes.len = J;
        const nt = new o();
        return (nt.target = O.target), (nt._score = O._score), (nt._indexes = O._indexes), nt;
      },
      _ = (W, O, q) => {
        for (
          var ne = new Set(),
            A = 0,
            I = Ce,
            T = 0,
            B = W.spaceSearches,
            J = B.length,
            b = 0,
            y = () => {
              for (let re = b - 1; re >= 0; re--) O._nextBeginningIndexes[R[re * 2 + 0]] = R[re * 2 + 1];
            },
            x = !1,
            K = 0;
          K < J;
          ++K
        ) {
          ee[K] = de;
          var L = B[K];
          if (((I = p(L, O)), q)) {
            if (I === Ce) continue;
            x = !0;
          } else if (I === Ce) return y(), Ce;
          var $ = K === J - 1;
          if (!$) {
            var z = I._indexes,
              j = !0;
            for (let Z = 0; Z < z.len - 1; Z++)
              if (z[Z + 1] - z[Z] !== 1) {
                j = !1;
                break;
              }
            if (j) {
              var H = z[z.len - 1] + 1,
                X = O._nextBeginningIndexes[H - 1];
              for (let Z = H - 1; Z >= 0 && X === O._nextBeginningIndexes[Z]; Z--) (O._nextBeginningIndexes[Z] = H), (R[b * 2 + 0] = Z), (R[b * 2 + 1] = X), b++;
            }
          }
          (A += I._score / J), (ee[K] = I._score / J), I._indexes[0] < T && (A -= (T - I._indexes[0]) * 2), (T = I._indexes[0]);
          for (var V = 0; V < I._indexes.len; ++V) ne.add(I._indexes[V]);
        }
        if (q && !x) return Ce;
        y();
        var se = p(W, O, !0);
        if (se !== Ce && se._score > A) {
          if (q) for (var K = 0; K < J; ++K) ee[K] = se._score / J;
          return se;
        }
        q && (I = O), (I._score = A);
        var K = 0;
        for (let re of ne) I._indexes[K++] = re;
        return (I._indexes.len = K), I;
      },
      v = (W) => {
        for (var O = W.length, q = W.toLowerCase(), ne = [], A = 0, I = !1, T = 0; T < O; ++T) {
          var B = (ne[T] = q.charCodeAt(T));
          if (B === 32) {
            I = !0;
            continue;
          }
          var J = B >= 97 && B <= 122 ? B - 97 : B >= 48 && B <= 57 ? 26 : B <= 127 ? 30 : 31;
          A |= 1 << J;
        }
        return {
          lowerCodes: ne,
          bitflags: A,
          containsSpace: I,
          _lower: q,
        };
      },
      C = (W) => {
        for (var O = W.length, q = [], ne = 0, A = !1, I = !1, T = 0; T < O; ++T) {
          var B = W.charCodeAt(T),
            J = B >= 65 && B <= 90,
            b = J || (B >= 97 && B <= 122) || (B >= 48 && B <= 57),
            y = (J && !A) || !I || !b;
          (A = J), (I = b), y && (q[ne++] = T);
        }
        return q;
      },
      S = (W) => {
        for (var O = W.length, q = C(W), ne = [], A = q[0], I = 0, T = 0; T < O; ++T) A > T ? (ne[T] = A) : ((A = q[++I]), (ne[T] = A === void 0 ? O : A));
        return ne;
      },
      P = new Map(),
      N = new Map(),
      D = [],
      k = [],
      R = [],
      M = [],
      ee = [],
      Q = [],
      te = [],
      fe = (W, O) => {
        var q = W[O];
        if (q !== void 0) return q;
        if (typeof O == 'function') return O(W);
        var ne = O;
        Array.isArray(O) || (ne = O.split('.'));
        for (var A = ne.length, I = -1; W && ++I < A; ) W = W[ne[I]];
        return W;
      },
      ye = (W) => typeof W == 'object' && typeof W._bitflags == 'number',
      ae = 1 / 0,
      de = -ae,
      Se = [];
    Se.total = 0;
    var Ce = null,
      Ye = i(''),
      tt = (W) => {
        var O = [],
          q = 0,
          ne = {},
          A = (I) => {
            for (var T = 0, B = O[T], J = 1; J < q; ) {
              var b = J + 1;
              (T = J), b < q && O[b]._score < O[J]._score && (T = b), (O[(T - 1) >> 1] = O[T]), (J = 1 + (T << 1));
            }
            for (var y = (T - 1) >> 1; T > 0 && B._score < O[y]._score; y = ((T = y) - 1) >> 1) O[T] = O[y];
            O[T] = B;
          };
        return (
          (ne.add = (I) => {
            var T = q;
            O[q++] = I;
            for (var B = (T - 1) >> 1; T > 0 && I._score < O[B]._score; B = ((T = B) - 1) >> 1) O[T] = O[B];
            O[T] = I;
          }),
          (ne.poll = (I) => {
            if (q !== 0) {
              var T = O[0];
              return (O[0] = O[--q]), A(), T;
            }
          }),
          (ne.peek = (I) => {
            if (q !== 0) return O[0];
          }),
          (ne.replaceTop = (I) => {
            (O[0] = I), A();
          }),
          ne
        );
      },
      He = tt();
    return {
      single: n,
      go: r,
      prepare: i,
      cleanup: a,
    };
  });
})(Qm);
var SC = Qm.exports;
const Hh = P2(SC),
  Jt = xe(() => {
    const e = ie().config.data,
      t = Ae().settings,
      n = e.Regions[t.server];
    return {
      ServerName: n.Name,
      AccountMaxLevel: n.StudentMaxLevel,
      WeaponMaxLevel: n.WeaponMaxLevel,
      BondMaxLevel: n.BondMaxLevel,
      EquipmentMaxLevel: n.EquipmentMaxLevel,
      PotentialMax: n.PotentialMax,
      WeaponUnlocked: n.WeaponMaxLevel > 0,
      WeaponMaxStarGrade: n.WeaponMaxLevel / 10 - 2,
      GearUnlocked: !0,
      GearBondReq: n.GearBondReq,
      BulletTypes: ['Normal', 'Explosion', 'Pierce', 'Mystic', 'Sonic'],
      ArmorTypes: ['Normal', 'LightArmor', 'HeavyArmor', 'Unarmed', 'ElasticArmor'],
      CampaignMax: n.CampaignMax,
      CampaignExtra: n.CampaignExtra,
      ChaserMax: n.ChaserMax,
      BloodMax: n.BloodMax,
      FindGiftMax: n.FindGiftMax,
      SchoolDungeonMax: n.SchoolDungeonMax,
      FurnitureSetMax: n.FurnitureSetMax,
      FurnitureTemplateMax: n.FurnitureTemplateMax,
      Events: n.Events,
      CurrentGacha: n.CurrentGacha,
      CurrentRaid: n.CurrentRaid,
      CurrentEvents: n.CurrentEvents,
      UseNewCalculationLimit: n.UseNewCalculationLimit,
    };
  });
function nP(e) {
  return ie().crafting.data.Nodes.find((t) => t.Id == e);
}
function rP(e) {
  return ie().crafting.data.TotalProp[Jt.value.ServerName.toLowerCase()][e - 1];
}
function* sP() {
  for (const e of ie().crafting.data.Nodes) yield e;
}
function* AC() {
  const e = Ae().settings;
  for (const t of ie().crafting.data.Nodes) t.Released[e.server] && (yield t);
}
const CC = {
  Hat: 1,
  Gloves: 2,
  Shoes: 3,
  Bag: 4,
  Badge: 5,
  Hairpin: 6,
  Charm: 7,
  Watch: 8,
  Necklace: 9,
};
function TC(e) {
  return ie().equipment.data[e];
}
function kC(e, t) {
  return TC(CC[e] * 1e3 + (t - 1));
}
function iP(e, t, n) {
  if (t == 0) return {};
  const r = kC(e, t),
    s = {};
  for (let i = 0; i < r.StatType.length; i++) s[r.StatType[i]] = Jm(r.StatValue[i], [n == -1 ? r.MaxLevel : n, r.MaxLevel]);
  return s;
}
function aP(e, t) {
  return {
    calculatedStats: xe(() => {
      const r = et(e),
        s = {};
      for (let i = 0; i < r.StatType.length; i++) {
        const a = Jm(r.StatValue[i], [et(t) == -1 ? r.MaxLevel : et(t), r.MaxLevel]),
          o = r.StatType[i].split('_')[1];
        s[r.StatType[i]] = {
          total: a,
          totalStr: `+${o == 'Base' ? a : +(a / 100).toFixed(2) + '%'}`,
        };
      }
      return s;
    }),
  };
}
function* $C() {
  const e = Ae().settings;
  for (const t in ie().equipment.data) {
    const n = ie().equipment.data[t];
    n.IsReleased[e.server] && (yield n);
  }
}
function Jm([e, t], [n, r]) {
  const s = parseFloat((n - 1) / (r - 1)).toFixed(4);
  return Math.ceil(Math.round((e + (t - e) * s).toFixed(4)));
}
function oP(e) {
  return ie().events.data.Events.find((t) => t.Id == e);
}
function OC(e, t) {
  var r, s;
  const n = ie().events.data.Stages[e];
  if (n) {
    const i = Xt(n),
      a = Jt.value.ServerName;
    if (((i.Category = 'Event'), (i.Rerun = t == 'Rerun'), (r = n.VersionData) != null && r[t])) for (const o in n.VersionData[t]) i[o] = n.VersionData[t][o];
    if ((s = i.ServerData) != null && s[a]) for (const o in i.ServerData[a]) i[o] = i.ServerData[a][o];
    return i;
  }
  return null;
}
function lP(e) {
  return ie().events.data.ConquestMaps.find((t) => t.EventId == e);
}
function Zm(e) {
  const t = ie().events.data.ConquestStages[e];
  if (t) {
    const n = Xt(t);
    return (n.Category = 'Event'), (n.Type = 'Conquest'), (n.Title = st('ConquestMap', t.EventId)), n;
  }
  return null;
}
function cP(e) {
  return Zm(Object.values(ie().events.data.ConquestStages).find((t) => t.EventId == e).Id);
}
function* uP() {
  for (const e of ie().events.data.Events) yield e;
}
function* LC() {
  var e;
  for (const t of ie().events.data.Events) (e = t.Original) != null && e[`EventOpen${Jt.value.ServerName}`] && (yield t);
}
function* fP(e, t) {
  for (const n in ie().events.data.Stages) {
    const r = ie().events.data.Stages[n];
    r.EventId == e && (yield OC(r.Id, t));
  }
}
function* dP(e) {
  for (const t in ie().events.data.ConquestStages) {
    const n = ie().events.data.ConquestStages[t];
    n.EventId == e && (yield Zm(n.Id));
  }
}
function hP(e) {
  return ie().furniture.data[e];
}
function pP(...e) {
  return Object.values(ie().furniture.data).filter((t) => t.Tags.filter((n) => e.includes(n)).length > 0);
}
function* PC() {
  const e = Ae().settings;
  for (const t in ie().furniture.data) {
    const n = ie().furniture.data[t];
    n.IsReleased[e.server] && (yield n);
  }
}
function mP(e) {
  return ie().items.data[e];
}
function gP(e, t) {
  return Object.values(ie().items.data).filter((n) => n.Category === e && n.IsReleased[t]);
}
function vP(...e) {
  return Object.values(ie().items.data).filter((t) => t.Tags.filter((n) => e.includes(n)).length > 0);
}
function* IC() {
  const e = Ae().settings;
  for (const t in ie().items.data) {
    const n = ie().items.data[t];
    n.IsReleased[e.server] && (yield n);
  }
}
function* bP() {
  const e = Ae().settings;
  for (const t in ie().items.data) {
    const n = ie().items.data[t];
    n.ConsumeType && n.IsReleased[e.server] && (yield n);
  }
}
const _P = [17, 25, 35, 50, 70, 80, 90, 90],
  yP = ['Normal', 'Hard', 'VeryHard', 'HardCore', 'Extreme', 'Insane', 'Torment', 'Lunatic'],
  wP = ['NOR', 'HRD', 'VHD', 'HC', 'EXT', 'INS', 'TOR', 'LUN'];
function EP(e) {
  return ie().raids.data.Raid.find((t) => t.Id == e);
}
function xP(e) {
  return ie().raids.data.WorldRaid.find((t) => t.Id == e);
}
function MC(e) {
  return ie().raids.data.MultiFloorRaid.find((t) => t.Id == e);
}
function SP(e) {
  return ie().raids.data.TimeAttack.find((t) => t.Id == e);
}
function AP(e) {
  return ie().raids.data.Raid.find((t) => t.PathName == e);
}
function CP(e) {
  return ie().raids.data.WorldRaid.find((t) => t.PathName == e);
}
function TP(e) {
  return ie().raids.data.MultiFloorRaid.find((t) => t.PathName == e);
}
function kP(e, t, n = null) {
  const r = Ae().settings;
  return ie().raids.data.RaidSeasons[n ?? r.server][e == 'EliminateRaid' ? 'EliminateSeasons' : 'Seasons'].find((s) => s.SeasonId == t);
}
function $P(e) {
  const t = Ae().settings;
  return {
    Raid: ie().raids.data.RaidSeasons[t.server].Seasons.filter((n) => n.RaidId == e),
    EliminateRaid: ie().raids.data.RaidSeasons[t.server].EliminateSeasons.filter((n) => n.RaidId == e),
  };
}
function OP(e, t) {
  const n = Ae().settings;
  return ie().raids.data.RaidSeasons[n.server][e == 'EliminateRaid' ? 'EliminateRewardSets' : 'RewardSets'][t];
}
function LP(e) {
  return ie().raids.data.TimeAttackRules.find((t) => t.Id == e);
}
function* PP() {
  for (const e of ie().raids.data.Raid) yield e;
  for (const e of ie().raids.data.WorldRaid) yield e;
  for (const e of ie().raids.data.MultiFloorRaid) yield e;
}
function* NC() {
  for (const e of ie().raids.data.Raid) yield e;
}
function* RC() {
  for (const e of ie().raids.data.WorldRaid) yield e;
}
function* IP() {
  for (const e of ie().raids.data.TimeAttack) yield e;
}
function* DC() {
  for (const e of ie().raids.data.MultiFloorRaid) yield e;
}
function MP(e, t, n) {
  const r = OA(ie().enemies.data.Enemies[e]),
    s = MC(t);
  for (const [i, a] of Object.entries(s.RaidFloors[n].StatChange[e] ?? {})) {
    const [o, l] = i.split('_');
    l == 'Base' ? ((r[`${o}1`] += a), (r[`${o}100`] += a)) : l == 'Coefficient' && ((r[`${o}1`] += Math.floor((r[`${o}1`] * a) / 1e4)), (r[`${o}100`] += Math.floor((r[`${o}100`] * a) / 1e4)));
  }
  return r;
}
const zC = {
    0: 'Normal',
    1: 'Hard',
  },
  HC = {
    0: 'Story',
    1: 'Quest',
    2: 'Challenge',
  };
function vs(e) {
  var n;
  const t = ie().stages.data[e];
  if (t) {
    const r = Xt(t),
      s = Jt.value.ServerName;
    if ((n = t.ServerData) != null && n[s]) for (const i in t.ServerData[s]) r[i] = t.ServerData[s][i];
    return r;
  }
  return null;
}
function VC(e) {
  switch (e.Category) {
    case 'Event':
      return `event_${e.EventId % 1e4}`;
    case 'Campaign':
      return `mission_${e.Area}_${e.Difficulty}`;
    case 'WeekDungeon':
    case 'Bounty':
    case 'SchoolDungeon':
      return e.Type.toLowerCase();
  }
}
function FC(e) {
  switch (e.Category) {
    case 'Campaign':
      return `${st('StageType', zC[e.Difficulty])} ${e.Area}-${e.Stage}`;
    case 'Event':
      return e.Field ? e.Name : `${HC[e.Difficulty]} ${String(e.Stage).padStart(2, '0')}`;
    case 'WeekDungeon':
    case 'Bounty':
    case 'SchoolDungeon':
      return st('StageTitle', e.Type, String.fromCharCode(64 + e.Stage));
  }
}
function* NP() {
  for (const e in ie().stages.data) {
    const t = vs(e);
    t.Category == 'Campaign' && (yield t);
  }
}
function* RP() {
  for (const e in ie().stages.data) {
    const t = vs(e);
    t.Category == 'WeekDungeon' && (yield t);
  }
}
function* DP() {
  for (const e in ie().stages.data) {
    const t = vs(e);
    t.Category == 'Bounty' && (yield t);
  }
}
function* zP() {
  for (const e in ie().stages.data) {
    const t = vs(e);
    t.Category == 'SchoolDungeon' && (yield t);
  }
}
function* HP() {
  for (const e in ie().stages.data) yield vs(e);
}
function* BC() {
  for (const e in ie().stages.data) {
    const t = vs(e);
    t.Category == 'Campaign' && t.Area <= Jt.value.CampaignMax && (yield t),
      t.Category == 'WeekDungeon' && (t.Type == 'FindGift' ? t.Stage <= Jt.value.FindGiftMax && (yield t) : t.Type == 'Blood' && t.Stage <= Jt.value.BloodMax && (yield t)),
      t.Category == 'Bounty' && t.Stage <= Jt.value.ChaserMax && (yield t),
      t.Category == 'SchoolDungeon' && t.Stage <= Jt.value.CampaignMax && (yield t);
  }
}
function VP(e) {
  return ie().students.data[e];
}
function FP(e) {
  return Object.values(ie().students.data).find((t) => t.PathName == e);
}
function* BP() {
  for (const e in ie().students.data) yield ie().students.data[e];
}
function* jC() {
  const e = Ae().settings;
  for (const t in ie().students.data) {
    const n = ie().students.data[t];
    n.IsReleased[e.server] && (yield n);
  }
}
const WC = ['disabled', 'value', 'placeholder'],
  UC = {
    class: 'icon',
  },
  qC = {
    class: 'clear',
  },
  KC = {
    __name: 'SearchInput',
    props: {
      modelValue: String,
      placeholder: String,
      disabled: Boolean,
      dropdown: Boolean,
      autoFocus: Boolean,
    },
    emits: ['update:modelValue', 'dropdownClick'],
    setup(e, { emit: t }) {
      const n = e,
        r = X2(n, 'modelValue', t),
        s = ce(null),
        i = VA((a) => {
          r.value = a.target.value;
        }, 100);
      return (
        on(() => {
          n.autoFocus && s.value.focus();
        }),
        (a, o) => {
          const l = gt('fa');
          return (
            be(),
            ke(
              'div',
              {
                class: le([
                  'search-box',
                  {
                    dropdown: e.dropdown,
                  },
                ]),
              },
              [
                w(
                  'input',
                  {
                    type: 'search',
                    enterkeyhint: 'search',
                    ref_key: 'searchEl',
                    ref: s,
                    disabled: e.disabled,
                    class: le([
                      'form-control',
                      {
                        disabled: e.disabled,
                      },
                    ]),
                    autocomplete: 'off',
                    value: E(r),
                    onInput: o[0] || (o[0] = (...u) => E(i) && E(i)(...u)),
                    placeholder: e.placeholder ?? E(Y)('search'),
                  },
                  null,
                  42,
                  WC,
                ),
                w('div', UC, [
                  F(
                    l,
                    {
                      icon: E(hm),
                    },
                    null,
                    8,
                    ['icon'],
                  ),
                ]),
                Za(
                  w(
                    'div',
                    qC,
                    [
                      F(
                        l,
                        {
                          icon: E(pm),
                          onClick: o[1] || (o[1] = (u) => (r.value = '')),
                        },
                        null,
                        8,
                        ['icon'],
                      ),
                    ],
                    512,
                  ),
                  [[Ap, E(r).length]],
                ),
                e.dropdown
                  ? (be(),
                    ke(
                      'div',
                      {
                        key: 0,
                        class: le([
                          'dropdown',
                          {
                            disabled: e.disabled,
                          },
                        ]),
                      },
                      [
                        F(
                          l,
                          {
                            icon: E(A7),
                            onClick: o[2] || (o[2] = (u) => t('dropdownClick')),
                          },
                          null,
                          8,
                          ['icon'],
                        ),
                      ],
                      2,
                    ))
                  : yt('', !0),
              ],
              2,
            )
          );
        }
      );
    },
  },
  GC = ki(KC, [['__scopeId', 'data-v-2281ebe8']]);
const eg = (e) => (vi('data-v-896d1ee0'), (e = e()), bi(), e),
  YC = {
    class: 'd-flex align-items-center gap-2 p-3',
  },
  XC = eg(() =>
    w(
      'button',
      {
        'type': 'button',
        'class': 'btn-close btn-close-white d-block d-lg-none',
        'data-bs-dismiss': 'modal',
      },
      null,
      -1,
    ),
  ),
  QC = {
    key: 0,
    class: 'quick-search-list',
  },
  JC = {
    class: 'd-flex align-items-center',
  },
  ZC = ['src'],
  eT = eg(() =>
    w(
      'img',
      {
        class: 'node-border',
        src: xC,
      },
      null,
      -1,
    ),
  ),
  tT = {
    key: 1,
    class: 'ba-search-img',
  },
  nT = ['src'],
  rT = {
    class: 'd-flex flex-column',
  },
  sT = ['innerHTML'],
  iT = ['innerHTML'],
  aT = {
    class: 'd-flex flex-column ms-auto align-items-end',
  },
  oT = {
    key: 0,
    class: 'text-muted text-italic',
  },
  lT = {
    __name: 'NavbarSearch',
    props: {
      close: Function,
    },
    setup(e) {
      const t = e,
        n = ce(''),
        r = ce(!1),
        s = ce(-1),
        i = ce(null),
        a = Ae().settings,
        o = cm(),
        l = xe(() => {
          const d = [];
          if (r.value) {
            for (const p of jC())
              p.StyleId > 0 ||
                d.push({
                  type: 'student',
                  name: p.Name,
                  id: p.Id,
                  category: Y('student'),
                  route: o.resolve({
                    name: 'studentview',
                    params: {
                      id: p.PathName,
                    },
                  }),
                  icon: `/images/student/icon/${p.Id}.webp`,
                  class: 'ba-item-n',
                  tags: a.showDeveloperProps ? [...p.SearchTags, p.DevName] : p.SearchTags,
                  alt: null,
                });
            for (const p of IC())
              d.push({
                type: 'item',
                name: p.Name,
                id: p.Id,
                category: st('ItemCategory', p.Category),
                route: o.resolve({
                  name: 'itemview',
                  params: {
                    id: p.Id,
                  },
                }),
                icon: `/images/item/icon/${p.Icon}.webp`,
                class: `ba-item-${p.Rarity.toLowerCase()}`,
                tags: null,
                alt: null,
              });
            for (const p of PC())
              d.push({
                type: 'furniture',
                name: p.Name,
                id: p.Id,
                category: st('ItemCategory', p.Category),
                route: o.resolve({
                  name: 'furnitureview',
                  params: {
                    id: p.Id,
                  },
                }),
                icon: `/images/furniture/icon/${p.Icon}.webp`,
                class: `ba-item-${p.Rarity.toLowerCase()}`,
                tags: null,
                alt: null,
              });
            for (const p of $C())
              d.push({
                type: 'equipment',
                name: p.Name,
                id: p.Id,
                category: st('ItemCategory', p.Category),
                route: o.resolve({
                  name: 'equipmentview',
                  params: {
                    id: p.Id,
                  },
                }),
                icon: `/images/equipment/icon/${p.Icon}.webp`,
                class: `ba-item-${p.Rarity.toLowerCase()}`,
                tags: null,
                alt: null,
              });
            for (const p of AC())
              d.push({
                type: 'crafting',
                name: p[`Name${Ae().languageProp}`],
                id: p.Id,
                category: st('NodeTier', p.Tier),
                route: o.resolve({
                  name: 'craftingview',
                  params: {
                    nodeid: p.Id,
                  },
                }),
                icon: `/images/craftnode/${p.Icon}.png`,
                class: 'ba-craft-node',
                quality: p.Quality,
                tags: null,
                alt: null,
              });
            for (const p of BC())
              d.push({
                type: 'stage',
                name: FC(p),
                id: p.Id,
                category: st('StageType', p.Category),
                route: o.resolve({
                  name: 'stageview',
                  params: {
                    stageid: p.Id,
                  },
                }),
                icon: `/images/stage/${VC(p)}.webp`,
                class: null,
                tags: null,
                alt: p.Name ?? null,
              });
            for (const p of LC())
              d.push({
                type: 'event',
                name: st('EventName', `${p.Id}`),
                id: p.Id,
                category: st('StageType', 'Event'),
                route: o.resolve({
                  name: 'eventview',
                  params: {
                    eventid: p.Id,
                  },
                }),
                icon: `/images/stage/event_${p.Id}.webp`,
                class: null,
                tags: null,
                alt: null,
              });
            for (const p of NC())
              p.IsReleased[a.server] &&
                d.push({
                  type: 'raid',
                  name: p.Name,
                  id: p.DevName,
                  category: st('StageType', 'Raid'),
                  route: o.resolve({
                    name: 'raidview',
                    params: {
                      id: p.PathName,
                    },
                  }),
                  icon: `/images/raid/icon/Icon_${p.DevName}.png`,
                  class: null,
                  tags: null,
                  alt: null,
                });
            for (const p of RC())
              p.IsReleased[a.server] &&
                d.push({
                  type: 'raid',
                  name: p.Name,
                  id: p.DevName,
                  category: st('StageType', 'WorldRaid'),
                  route: o.resolve({
                    name: 'raidview',
                    params: {
                      id: p.PathName,
                    },
                  }),
                  icon: `/images/raid/icon/Icon_${p.DevName}.png`,
                  class: null,
                  tags: null,
                  alt: null,
                });
            for (const p of DC())
              p.IsReleased[a.server] &&
                d.push({
                  type: 'raid',
                  name: p.Name,
                  id: p.DevName,
                  category: st('StageType', 'MultiFloorRaid'),
                  route: o.resolve({
                    name: 'raidview',
                    params: {
                      id: p.PathName,
                    },
                  }),
                  icon: `/images/raid/icon/Icon_${p.DevName}.png`,
                  class: null,
                  tags: null,
                  alt: null,
                });
          }
          return d;
        }),
        u = xe(() =>
          a.showDeveloperProps && n.value.toLowerCase().startsWith('id:')
            ? Hh.go(n.value.substring(3), l.value, {
                keys: ['id'],
                limit: 12,
                threshold: 0.4,
              }).map((d) => ((d.highlight = {}), (d.highlight.name = d.obj.name), (d.highlight.alt = d.obj.alt), d))
            : Hh.go(n.value, l.value, {
                keys: [
                  'name',
                  'alt',
                  (d) => {
                    var p;
                    return (p = d.tags) == null ? void 0 : p.join();
                  },
                ],
                scoreFn: (d) => Math.max(d[0].score, d[1].score, d[2].score * 0.9),
                limit: 12,
                threshold: 0.4,
              }).map(
                (d) => (
                  (d.highlight = {}),
                  (d.highlight.name = d[0].target == '' ? d.obj.name : d[0].highlight("<span class='highlight'>", '</span>')),
                  (d.highlight.alt = d[1].target == '' ? d.obj.alt : d[1].highlight("<span class='highlight'>", '</span>')),
                  d
                ),
              ),
        );
      function c() {
        t.close();
      }
      function f() {
        (s.value = Math.min(s.value + 1, u.value.length - 1)),
          i.value.querySelector(`[data-index='${s.value}']`).scrollIntoView({
            block: 'nearest',
          });
      }
      function h() {
        (s.value = Math.max(s.value - 1, 0)),
          i.value.querySelector(`[data-index='${s.value}']`).scrollIntoView({
            block: 'nearest',
          });
      }
      function m() {
        u.value.length && (s.value >= 0 && s.value < u.value.length ? g(s.value) : g(0));
      }
      function g(d) {
        i.value.querySelector(`[data-index='${d}']`).click();
      }
      return (
        Ze(
          () => n.value,
          () => {
            s.value = 0;
          },
        ),
        on(() => {
          ie()
            .ensureData('students', 'items', 'equipment', 'furniture', 'crafting', 'stages', 'events', 'raids')
            .then(() => {
              r.value = !0;
            });
        }),
        (d, p) => {
          const _ = gt('RouterLink');
          return (
            be(),
            ke(
              Ke,
              null,
              [
                w('div', YC, [
                  F(
                    GC,
                    {
                      'modelValue': n.value,
                      'onUpdate:modelValue': p[0] || (p[0] = (v) => (n.value = v)),
                      'class': 'flex-fill',
                      'style': {
                        height: '44px',
                      },
                      'auto-focus': '',
                      'onKeydown': [No(m, ['enter']), No(Qf(f, ['prevent']), ['down']), No(Qf(h, ['prevent']), ['up'])],
                    },
                    null,
                    8,
                    ['modelValue', 'onKeydown'],
                  ),
                  XC,
                ]),
                r.value
                  ? (be(),
                    ke('div', QC, [
                      u.value.length
                        ? (be(),
                          ke(
                            'div',
                            {
                              key: 0,
                              class: 'd-flex flex-column mb-2',
                              ref_key: 'list',
                              ref: i,
                            },
                            [
                              (be(!0),
                              ke(
                                Ke,
                                null,
                                no(
                                  u.value,
                                  (v, C) => (
                                    be(),
                                    sn(
                                      _,
                                      {
                                        'data-index': C,
                                        'to': v.obj.route,
                                        'class': le([
                                          'search-result py-2 px-3',
                                          {
                                            selected: s.value == C,
                                          },
                                        ]),
                                        'onClick': c,
                                        'onMousemove': () => {
                                          s.value = C;
                                        },
                                      },
                                      {
                                        default: ve(() => [
                                          w('div', JC, [
                                            v.obj.type == 'crafting'
                                              ? (be(),
                                                ke(
                                                  'div',
                                                  {
                                                    key: 0,
                                                    class: le(['ba-search-img craft-image', v.obj.class]),
                                                  },
                                                  [
                                                    w(
                                                      'img',
                                                      {
                                                        class: le([
                                                          'node-icon',
                                                          {
                                                            rare: v.obj.quality == 2,
                                                          },
                                                        ]),
                                                        src: v.obj.icon,
                                                      },
                                                      null,
                                                      10,
                                                      ZC,
                                                    ),
                                                    eT,
                                                  ],
                                                  2,
                                                ))
                                              : (be(),
                                                ke('div', tT, [
                                                  (be(),
                                                  ke(
                                                    'img',
                                                    {
                                                      key: `${v.obj.type}${v.obj.id}`,
                                                      src: v.obj.icon,
                                                      class: le(v.obj.class),
                                                    },
                                                    null,
                                                    10,
                                                    nT,
                                                  )),
                                                ])),
                                            w('div', rT, [
                                              w(
                                                'span',
                                                {
                                                  class: 'ba-search-name',
                                                  innerHTML: v.highlight.name ?? v.obj.name,
                                                },
                                                null,
                                                8,
                                                sT,
                                              ),
                                              v.obj.alt
                                                ? (be(),
                                                  ke(
                                                    'span',
                                                    {
                                                      key: 0,
                                                      class: 'ba-search-subtitle',
                                                      innerHTML: v.highlight.alt ?? v.obj.alt,
                                                    },
                                                    null,
                                                    8,
                                                    iT,
                                                  ))
                                                : yt('', !0),
                                            ]),
                                            w('div', aT, [w('i', null, G(v.obj.category), 1), E(a).showDeveloperProps ? (be(), ke('small', oT, '[' + G(v.obj.id) + ']', 1)) : yt('', !0)]),
                                          ]),
                                        ]),
                                        _: 2,
                                      },
                                      1032,
                                      ['data-index', 'to', 'class', 'onMousemove'],
                                    )
                                  ),
                                ),
                                256,
                              )),
                            ],
                            512,
                          ))
                        : yt('', !0),
                    ]))
                  : yt('', !0),
              ],
              64,
            )
          );
        }
      );
    },
  },
  cT = ki(lT, [['__scopeId', 'data-v-896d1ee0']]),
  uT = [
    'HealEffectivenessRate',
    'DamagedRatio',
    'DamagedRatio2',
    'DamageRatio',
    'DamageRatio2',
    'ExDamagedRatio',
    'EnhanceExDamageRate',
    'EnhanceLightArmorRate',
    'EnhanceHeavyArmorRate',
    'EnhanceUnarmedRate',
    'EnhanceElasticArmorRate',
  ],
  fT = ['MaxHP', 'AttackPower', 'HealPower', 'DefensePower'],
  dT = {
    MaxHP: 0.1,
    AttackPower: 0.1,
    HealPower: 0.05,
    DefensePower: 0.05,
  },
  hT = {
    MaxHP: 0.05,
    AttackPower: 0.05,
    HealPower: 0.05,
    DefensePower: 0.05,
  },
  pT = {
    MaxHP: 0.35,
    AttackPower: 0.2,
    DefensePower: 0.5,
    HealPower: 0.1,
  },
  mT = ['Special_DebuffCountRed', 'Special_DebuffCountYellow', 'Special_DebuffCountGreen', 'Special_EN0009_Object_B_Energy'],
  na = {
    HealEffectivenessRate: [2e3, 2e4],
    CriticalDamageRate: [1e4, 1e6],
    AttackSpeed: [2e3, 3e4],
    DamagedRatio: [2e3, 2e4],
  },
  gT = [
    'MaxHP',
    'AttackPower',
    'DefensePower',
    'HealPower',
    'AccuracyPoint',
    'DodgePoint',
    'CriticalPoint',
    'CriticalChanceResistPoint',
    'CriticalDamageRate',
    'CriticalDamageResistRate',
    'StabilityPoint',
    'Range',
    'OppressionPower',
    'OppressionResist',
    'DefensePenetration',
    'AmmoCount',
  ],
  jP = [
    'MaxHP',
    'AttackPower',
    'DefensePower',
    'HealPower',
    'AccuracyPoint',
    'DodgePoint',
    'CriticalPoint',
    'CriticalChanceResistPoint',
    'CriticalDamageRate',
    'CriticalDamageResistRate',
    'StabilityPoint',
    'StabilityRate',
    'Range',
    'OppressionPower',
    'OppressionResist',
    'HealEffectivenessRate',
    'RegenCost',
    'AttackSpeed',
    'MoveSpeed',
    'BlockRate',
    'DefensePenetration',
    'AmmoCount',
    'DamageRatio2',
    'DamagedRatio2',
    'EnhanceExDamageRate',
    'EnhanceExplosionRate',
    'EnhancePierceRate',
    'EnhanceMysticRate',
    'EnhanceSonicRate',
    'ExtendBuffDuration',
    'ExtendDebuffDuration',
  ],
  WP = [
    'MaxHP',
    'AttackPower',
    'DefensePower',
    'HealPower',
    'AccuracyPoint',
    'DodgePoint',
    'CriticalPoint',
    'CriticalChanceResistPoint',
    'CriticalDamageRate',
    'CriticalDamageResistRate',
    'StabilityPoint',
    'StabilityRate',
    'Range',
    'OppressionPower',
    'OppressionResist',
    'HealEffectivenessRate',
    'RegenCost',
    'AttackSpeed',
    'MoveSpeed',
    'BlockRate',
    'DefensePenetration',
    'AmmoCount',
    'DamageRatio2',
    'DamagedRatio2',
    'DamageRatio',
    'DamagedRatio',
    'EnhanceExDamageRate',
    'ExDamagedRatio',
    'EnhanceExplosionRate',
    'EnhancePierceRate',
    'EnhanceMysticRate',
    'EnhanceSonicRate',
    'ExtendBuffDuration',
    'ExtendDebuffDuration',
  ];
function UP(e, t, n) {
  const r = et(e),
    s = xe(() => {
      const d = et(e);
      return {
        MaxHP: [d.MaxHP1, d.MaxHP100],
        AttackPower: [d.AttackPower1, d.AttackPower100],
        HealPower: [d.HealPower1, d.HealPower100],
        DefensePower: [d.DefensePower1, d.DefensePower100],
        AccuracyPoint: d.AccuracyPoint,
        DodgePoint: d.DodgePoint,
        CriticalPoint: d.CriticalPoint,
        CriticalDamageRate: d.CriticalDamageRate ?? 2e4,
        CriticalChanceResistPoint: d.CriticalResistPoint ?? 100,
        CriticalDamageResistRate: d.CriticalDamageResistRate ?? 5e3,
        StabilityPoint: d.StabilityPoint,
        StabilityRate: d.StabilityRate ?? 2e3,
        AmmoCount: d.AmmoCount ?? 0,
        AmmoCost: d.AmmoCost ?? 0,
        Range: d.Range ?? 0,
        RegenCost: d.RegenCost ?? 700,
        DamageRatio: d.DamageRatio ?? 1e4,
        DamagedRatio: d.DamagedRatio ?? 1e4,
        DamageRatio2: d.DamageRatio2 ?? 1e4,
        DamagedRatio2: d.DamagedRatio2 ?? 1e4,
        ExDamagedRatio: d.ExDamagedRatio ?? 1e4,
        EnhanceExDamageRate: d.EnhanceExDamageRate ?? 1e4,
        HealEffectivenessRate: d.HealEffectivenessRate ?? 1e4,
        OppressionPower: d.OppressionPower ?? 100,
        OppressionResist: d.OppressionResist ?? 100,
        AttackSpeed: d.AttackSpeed ?? 1e4,
        IgnoreDelayCount: d.IgnoreDelayCount ?? 1,
        BlockRate: d.BlockRate ?? 0,
        DefensePenetration: [d.DefensePenetration1 ?? 0, d.DefensePenetration100 ?? 0],
        MoveSpeed: d.MoveSpeed ?? 200,
        EnhanceExplosionRate: d.EnhanceExplosionRate ?? 1e4,
        EnhancePierceRate: d.EnhancePierceRate ?? 1e4,
        EnhanceMysticRate: d.EnhanceMysticRate ?? 1e4,
        EnhanceSonicRate: d.EnhanceSonicRate ?? 1e4,
        ExtendBuffDuration: d.ExtendBuffDuration ?? 1e4,
        ExtendDebuffDuration: d.ExtendDebuffDuration ?? 1e4,
        ExtendCrowdControlDuration: d.ExtendCrowdControlDuration ?? 1e4,
        EnhanceLightArmorRate: d.EnhanceLightArmorRate ?? 1e4,
        EnhanceHeavyArmorRate: d.EnhanceHeavyArmorRate ?? 1e4,
        EnhanceUnarmedRate: d.EnhanceUnarmedRate ?? 1e4,
        EnhanceElasticArmorRate: d.EnhanceElasticArmorRate ?? 1e4,
        BurnDamagedIncrease: 1e4,
        ChillDamagedIncrease: 1e4,
        ElectricShockDamagedIncrease: 1e4,
        PoisonDamagedIncrease: 1e4,
      };
    }),
    i = ce(r.StatLevelUpType ?? 'Standard'),
    a = xe(() => {
      var d, p, _;
      return {
        AttackPower: ((d = r.Transcendence) == null ? void 0 : d[0]) ?? [0, 1e3, 1200, 1400, 1700],
        MaxHP: ((p = r.Transcendence) == null ? void 0 : p[1]) ?? [0, 500, 700, 900, 1400],
        HealPower: ((_ = r.Transcendence) == null ? void 0 : _[2]) ?? [0, 750, 1e3, 1200, 1500],
      };
    }),
    o = un({});
  function l(d, p, _ = 0) {
    o[d] = {
      buffList: p,
      priority: _,
    };
  }
  function u(d) {
    delete o[d];
  }
  function c(d) {
    var Q;
    let p = s.value[d];
    Array.isArray(p) && (p = tg(p, et(t), 1 + (((Q = a.value[d]) == null ? void 0 : Q.slice(0, et(n)).reduce((te, fe) => te + fe, 0)) ?? 0) / 1e4, i));
    const _ = {
        Base: 0,
        Coefficient: 1,
        BaseOuter: 0,
        BonusList: [],
      },
      v = {
        Base: 0,
        Coefficient: 1,
        BaseOuter: 0,
      },
      C = [],
      S = {};
    for (const te of Object.keys(o).sort((fe, ye) => o[ye].priority - o[fe].priority))
      for (const fe of o[te].buffList)
        if (fe.stat == d && et(fe.enabled)) {
          if (fe.conflictKey)
            if (C.includes(fe.conflictKey)) {
              S[fe.conflictKey] ? S[fe.conflictKey].push(te) : (S[fe.conflictKey] = [te]);
              continue;
            } else C.push(fe.conflictKey);
          let ye = 0;
          fe.type == 'Coefficient' ? (ye += et(fe.amount) / 1e4) : (ye += et(fe.amount)),
            (_[fe.type] += ye),
            fe.icon || (v[fe.type] += ye),
            _.BonusList.push({
              Name: fe.label,
              Type: fe.type,
              Amount: fe.amount,
            });
        }
    let P = !0,
      N = !1;
    (d == 'DamagedRatio' || d == 'DamageRatio') && (N = !0), (d == 'DamagedRatio2' || d == 'DamageRatio2') && ((P = !1), (N = !0)), P && (_.Coefficient = Math.max(_.Coefficient, 0.2));
    let D = Math.round(((p + _.Base) * _.Coefficient).toFixed(4)) + _.BaseOuter,
      k = !1;
    na[d] && (D < na[d][0] || D > na[d][1]) && ((D = lt(D, ...na[d])), (k = !0));
    let R, M;
    uT.includes(d)
      ? ((M = (+((D - 1e4) / 100).toFixed(2)).toLocaleString() + '%'), (R = (+((p - 1e4) / 100).toFixed(2)).toLocaleString() + '%'))
      : vT(d)
        ? ((M = (+(D / 100).toFixed(2)).toLocaleString() + '%'), (R = (+(p / 100).toFixed(2)).toLocaleString() + '%'))
        : ((M = D.toLocaleString()), (R = p.toLocaleString())),
      d == 'MaxHP' && D < 0 && ((D = 4294967295), (R = '-'), (M = '-')),
      (_.BonusList = _.BonusList.reverse());
    const ee = {
      base: p,
      baseStr: R,
      bonuses: _,
      conflicts: S,
      total: N ? D : Math.max(D, 0),
      totalStr: M,
      capped: k,
    };
    if (fT.includes(d)) {
      const te = Math.round(((p + v.Base) * v.Coefficient).toFixed(4)) + v.BaseOuter,
        fe = Math.floor(te * dT[d]),
        ye = Math.floor(te * hT[d]),
        ae = Math.floor(te * pT[d]);
      (ee.special = fe),
        (ee.specialStr = '+' + fe.toLocaleString()),
        (ee.specialExt = ye),
        (ee.specialExtStr = '+' + ye.toLocaleString()),
        (ee.tsaBonus = ae),
        (ee.tsaBonusStr = '+' + ae.toLocaleString());
    }
    return ee;
  }
  const f = xe(() => {
      const d = {};
      for (const p in s.value) d[p] = c(p);
      return d;
    }),
    h = xe(() => {
      const d = [],
        p = {};
      for (const _ in o)
        for (const v of o[_].buffList)
          if (v.icon && v.enabled) {
            if (v.conflictKey) {
              if (d.includes(v.conflictKey)) continue;
              d.push(v.conflictKey);
            }
            p[v.icon] ? mT.includes(v.icon) || (p[v.icon] += v.stacks ?? 1) : (p[v.icon] = v.stacks ?? 1);
          }
      return p;
    }),
    m = xe(() => {
      const d = [],
        p = {};
      for (const _ in o)
        for (const v of o[_].buffList)
          if (v.type == 'Special' && v.enabled) {
            if (v.conflictKey) {
              if (d.includes(v.conflictKey)) continue;
              d.push(v.conflictKey);
            }
            p[v.stat] = v.amount;
          }
      return p;
    });
  function g(d) {
    return f.value[d].total;
  }
  return {
    level: t,
    starGrade: n,
    buffs: o,
    setBuff: l,
    removeBuff: u,
    calculate: c,
    total: g,
    calculatedStats: f,
    activeIcons: h,
    activeSpecial: m,
  };
}
function vT(e) {
  return e == 'AttackSpeed' || e.endsWith('Ratio') || e.endsWith('Ratio2') || e.endsWith('Rate') || e.startsWith('Extend');
}
function qP(e, t) {
  const n = xe(() => {
      const i = et(e);
      return i
        ? {
            MaxHP: [i.MaxHP1, i.MaxHP100],
            AttackPower: [i.AttackPower1, i.AttackPower100],
            HealPower: [i.HealPower1, i.HealPower100],
          }
        : {};
    }),
    r = xe(() => et(e).StatLevelUpType),
    s = xe(() => {
      const i = {};
      for (const a in n.value) {
        const o = tg(n.value[a], et(t), 1, r);
        i[a] = {
          total: o,
          totalStr: '+' + o.toLocaleString(),
        };
      }
      return i;
    });
  return {
    stats: n,
    level: t,
    calculatedStats: s,
  };
}
function KP(e, t) {
  return {
    calculatedStats: xe(() => {
      var i;
      const r = et(e);
      if (!r || r.Released === void 0 || !((i = r.Released) != null && i[Ae().settings.server]) || t == 0) return {};
      const s = {};
      for (let a = 0; a < r.StatType.length; a++)
        s[r.StatType[a]] = {
          total: r.StatValue[a][1],
          totalStr: '+' + r.StatValue[a][1].toLocaleString(),
        };
      return s;
    }),
  };
}
function GP(e, t) {
  return xe(() => {
    const n = et(e),
      r = {
        Street: n.StreetBattleAdaptation ?? 2,
        Outdoor: n.OutdoorBattleAdaptation ?? 2,
        Indoor: n.IndoorBattleAdaptation ?? 2,
      };
    return n.Weapon && et(t) >= 3 && (r[n.Weapon.AdaptationType] += n.Weapon.AdaptationValue), r;
  });
}
function tg([e, t], n, r = 1, s = 'Standard') {
  const i = bT(n, s);
  return Math.ceil((Math.round((e + (t - e) * i).toFixed(4)) * r).toFixed(4));
}
function YP(e, t) {
  return lt(1 - 4e6 / (Math.max(e - t, 0) * 6e3 + 4e6), 0, 1);
}
function XP(e, t = 0, n = 1e4) {
  return 1e7 / (Math.max((e - t) * (n / 1e4), 0) * 6e3 + 1e7);
}
function QP(e, t) {
  return lt(e / (e + 1e3) + t / 1e4, 0, 1);
}
function bT(e, t) {
  switch (et(t)) {
    case 'TimeAttack':
      return e <= 1
        ? 0
        : e == 2
          ? 0.0101
          : e <= 24
            ? 0.0707
            : e == 25
              ? 0.0808
              : e <= 39
                ? 0.1919
                : e == 40
                  ? 0.202
                  : e <= 64
                    ? 0.4444
                    : e == 65
                      ? 0.4545
                      : e <= 77
                        ? 0.7172
                        : e == 78
                          ? 0.7273
                          : parseFloat(((e - 1) / 99).toFixed(4));
    case 'LateBloom':
    case 'Premature':
      return (e - 1) / 99;
    default:
      return parseFloat(((e - 1) / 99).toFixed(4));
  }
}
function JP(e, t) {
  const [n, r] = e.split('_');
  let s;
  return r == 'Coefficient' ? (s = `${+(t / 100).toFixed(2).toLocaleString()}%`) : (s = t.toLocaleString()), `${t >= 0 ? '+' : ''}${s}`;
}
const Ou = Ai('studentstore', {
  state: () => {
    const e = ce(
        kt(
          'studentDisplay',
          {
            ActiveTab: 'stats',
            PathLast: 'aru',
            Level: 1,
            StarGrade: 3,
            WeaponStarGrade: 0,
            WeaponLevel: 1,
            Equipment: [1, 1, 1],
            Gear: 0,
            BondLevel: [20, 20, 20],
            SkillEx: 5,
            SkillPublic: 10,
            SkillPassive: 10,
            SkillExtraPassive: 10,
            Skill: {
              Ex: {
                Level: 5,
                Enabled: !1,
              },
              Public: {
                Level: 10,
                Enabled: !1,
              },
              Passive: {
                Level: 10,
                Enabled: !0,
              },
              ExtraPassive: {
                Level: 10,
                Enabled: !1,
              },
            },
            Potential: {
              MaxHP: 0,
              AttackPower: 0,
              HealPower: 0,
            },
            IncludePassive: !1,
            IncludeEquipment: !1,
            IncludeBond: !1,
            SkillDisplay: {
              ShowUpgrades: !1,
              Ex: 1,
              PublicPassiveSub: 1,
              WeaponPassive: 1,
              GearPublic: 1,
              ExShowMaterials: !1,
              PublicPassiveSubShowMaterials: !1,
              ExShowCumulative: !1,
              PublicPassiveSubShowCumulative: !1,
            },
            WeaponLevelDisplay: 1,
            BondLevelDisplay: 1,
            PotentialDisplay: 0,
            PotentialShowMaterials: !1,
            PotentialShowCumulative: !1,
            Favourites: [],
            VisibleStats: [...gT],
            CalculationVisibleStats: ['MaxHP', 'AttackPower', 'DefensePower', 'HealPower'],
            HideBackground: !1,
          },
          {
            mergeDefaults: function (l, u) {
              return {
                ...UA(u, l, (f, h) => {
                  if (wr(h)) return h;
                }),
              };
            },
          },
        ),
      ),
      t = ce(
        kt('studentCollection', {
          0: {},
          1: {},
          2: {},
        }),
      ),
      n = ce(
        kt(
          'studentListFilters',
          {
            SearchTerm: '',
            Collection: {
              Owned: !1,
              NotOwned: !1,
            },
            Favourite: !1,
            SquadType: {
              Main: !1,
              Support: !1,
            },
            TacticRole: {
              Tanker: !1,
              DamageDealer: !1,
              Healer: !1,
              Supporter: !1,
              Vehicle: !1,
            },
            StarGrade: {
              3: !1,
              2: !1,
              1: !1,
            },
            IsLimited: {
              0: !1,
              1: !1,
              2: !1,
              3: !1,
            },
            BulletType: {
              Explosion: !1,
              Pierce: !1,
              Mystic: !1,
              Sonic: !1,
            },
            ArmorType: {
              LightArmor: !1,
              HeavyArmor: !1,
              Unarmed: !1,
              ElasticArmor: !1,
            },
            School: {
              Abydos: !1,
              Arius: !1,
              Gehenna: !1,
              Hyakkiyako: !1,
              Millennium: !1,
              RedWinter: !1,
              Shanhaijing: !1,
              Trinity: !1,
              Valkyrie: !1,
              SRT: !1,
              Highlander: !1,
              Other: !1,
            },
            WeaponType: {
              SG: !1,
              SMG: !1,
              AR: !1,
              GL: !1,
              HG: !1,
              SR: !1,
              RG: !1,
              MG: !1,
              RL: !1,
              MT: !1,
              FT: !1,
            },
            Position: {
              Front: !1,
              Middle: !1,
              Back: !1,
            },
            Equipment1: {
              Hat: !1,
              Gloves: !1,
              Shoes: !1,
            },
            Equipment2: {
              Bag: !1,
              Badge: !1,
              Hairpin: !1,
            },
            Equipment3: {
              Charm: !1,
              Necklace: !1,
              Watch: !1,
            },
            StreetBattleAdaptation: {
              0: !1,
              1: !1,
              2: !1,
              3: !1,
              4: !1,
              5: !1,
            },
            OutdoorBattleAdaptation: {
              0: !1,
              1: !1,
              2: !1,
              3: !1,
              4: !1,
              5: !1,
            },
            IndoorBattleAdaptation: {
              0: !1,
              1: !1,
              2: !1,
              3: !1,
              4: !1,
              5: !1,
            },
            Gear: !1,
            Cover: {
              true: !1,
              false: !1,
            },
            UsesArtifact: [],
            PassiveStat: [],
            WeaponPassiveStat: [],
            ExtraPassiveStat: [],
            SkillBuff: [],
            SkillDebuff: [],
            SkillCC: [],
            SkillSpecial: [],
            SkillHeal: !1,
            SkillShield: !1,
            SkillDispel: !1,
            SkillHealTargets: [],
            SkillDispelTargets: [],
            SkillRepositionTargets: [],
            SkillSummonTypes: [],
            SkillIgnoreCover: !1,
            SkillIsAreaDamage: !1,
            SkillBuffSpecials: [],
            SkillKnockback: !1,
            ExcludeAlts: !1,
            TerrainUpgrades: !1,
            ShowInfo: !1,
          },
          {
            mergeDefaults: (l, u) => tn(u, l),
          },
        ),
      ),
      r = ce(
        kt(
          'studentListSort',
          {
            SortKey: 'DefaultOrder',
            Mode: 1,
            UseCollectionStats: !1,
          },
          {
            mergeDefaults: (l, u) => tn(u, l),
          },
        ),
      ),
      s = un([]),
      i = un([]),
      a = un([]),
      o = ce(
        kt(
          'pinned',
          {
            Buffs: [],
            Enemies: [],
          },
          {
            mergeDefaults: (l, u) => tn(u, l),
          },
        ),
      );
    return (
      Ze(q3(Ae().settings, 'server'), (l, u) => {
        if (u != l) {
          const c = Jt.value;
          (e.value.Level = Math.min(e.value.Level, c.AccountMaxLevel)),
            (e.value.WeaponStarGrade = Math.min(e.value.WeaponStarGrade, c.WeaponMaxStarGrade)),
            (e.value.WeaponLevel = Math.min(e.value.WeaponLevel, c.WeaponMaxLevel));
          for (let f = 0; f < 3; f++) (e.value.BondLevel[f] = Math.min(e.value.BondLevel[f], c.BondMaxLevel)), (e.value.Equipment[f] = Math.min(e.value.Equipment[f], c.EquipmentMaxLevel[f]));
          for (const f in e.value.Potential) e.value.Potential[f] = Math.min(e.value.Potential[f], c.PotentialMax);
        }
      }),
      {
        studentDisplay: e,
        studentListFilters: n,
        studentListSort: r,
        studentCollection: t,
        studentBuffs: s,
        studentSummonBuffs: i,
        studentSupports: a,
        pinned: o,
      }
    );
  },
  getters: {
    activeFilters(e) {
      const t = {};
      for (const n in e.studentListFilters)
        if (!(n == 'ShowInfo' || n == 'TerrainUpgrades'))
          if (typeof e.studentListFilters[n] == 'object')
            if (Array.isArray(e.studentListFilters[n])) e.studentListFilters[n].length && (t[n] = [...e.studentListFilters[n]]);
            else {
              const r = [];
              for (const s in e.studentListFilters[n]) e.studentListFilters[n][s] === !0 && r.push(isNaN(Number(s)) ? s : Number(s));
              r.length && (t[n] = r);
            }
          else e.studentListFilters[n] === !0 && (t[n] = [!0]);
      return t;
    },
    filterCount() {
      return Object.keys(this.activeFilters).length + (this.studentListFilters.SearchTerm.length ? 1 : 0);
    },
  },
  actions: {
    clearFilters() {
      for (const e in this.activeFilters)
        if (Array.isArray(this.studentListFilters[e])) this.studentListFilters[e] = [];
        else if (typeof this.studentListFilters[e] == 'object') for (const t of this.activeFilters[e]) this.studentListFilters[e][t] = !1;
        else this.studentListFilters[e] = !1;
      this.studentListFilters.SearchTerm = '';
    },
    collectionExists(e) {
      const t = Ae().settings,
        n = t.collectionPerServer ? t.server : 0;
      return this.studentCollection[n][e] !== void 0;
    },
    collectionLocked(e) {
      var r;
      const t = Ae().settings,
        n = t.collectionPerServer ? t.server : 0;
      return ((r = this.studentCollection[n][e]) == null ? void 0 : r.Lock) ?? !1;
    },
    collectionUpdate(e, t) {
      var s;
      const n = Ae().settings,
        r = n.collectionPerServer ? n.server : 0;
      ((s = this.studentCollection[r][e.Id]) == null ? void 0 : s.Lock) !== !0 &&
        ((this.studentCollection[r][e.Id] = {
          Level: t.Level,
          StarGrade: t.StarGrade,
          WeaponStarGrade: t.WeaponStarGrade,
          WeaponLevel: t.WeaponLevel,
          Equipment: [...t.Equipment],
          Gear: t.Gear,
          BondLevel: t.BondLevel[0],
          Skills: Xt(t.Skill),
          Potential: Xt(t.Potential),
        }),
        e.FavorAlts.forEach((i, a) => {
          this.studentCollection[r][i] !== void 0 && (this.studentCollection[r][i].BondLevel = t.BondLevel[a + 1]);
        }),
        console.debug('saved collection stats', e.Id));
    },
    collectionGet(e) {
      const t = Ae().settings,
        n = t.collectionPerServer ? t.server : 0,
        r = {};
      return (
        this.studentCollection[n][e.Id] !== void 0 &&
          ((r.Level = this.studentCollection[n][e.Id].Level),
          (r.StarGrade = this.studentCollection[n][e.Id].StarGrade),
          (r.WeaponStarGrade = this.studentCollection[n][e.Id].WeaponStarGrade),
          (r.WeaponLevel = this.studentCollection[n][e.Id].WeaponLevel),
          (r.Equipment = [...this.studentCollection[n][e.Id].Equipment]),
          (r.Gear = this.studentCollection[n][e.Id].Gear),
          (r.BondLevel = [this.studentCollection[n][e.Id].BondLevel]),
          (r.Skill = Xt(this.studentCollection[n][e.Id].Skills)),
          (r.Potential = Xt(this.studentCollection[n][e.Id].Potential)),
          e.FavorAlts.forEach((s) => {
            this.studentCollection[n][s] !== void 0 ? r.BondLevel.push(this.studentCollection[n][s].BondLevel) : r.BondLevel.push(1);
          })),
        r
      );
    },
    collectionLoad(e) {
      const t = Ae().settings,
        n = t.collectionPerServer ? t.server : 0;
      this.studentCollection[n][e.Id] !== void 0 &&
        ((this.studentDisplay.Level = this.studentCollection[n][e.Id].Level),
        (this.studentDisplay.StarGrade = this.studentCollection[n][e.Id].StarGrade),
        (this.studentDisplay.WeaponStarGrade = this.studentCollection[n][e.Id].WeaponStarGrade),
        (this.studentDisplay.WeaponLevel = this.studentCollection[n][e.Id].WeaponLevel),
        (this.studentDisplay.Equipment = [...this.studentCollection[n][e.Id].Equipment]),
        (this.studentDisplay.Gear = this.studentCollection[n][e.Id].Gear),
        (this.studentDisplay.BondLevel[0] = this.studentCollection[n][e.Id].BondLevel),
        (this.studentDisplay.Skill = Xt(this.studentCollection[n][e.Id].Skills)),
        (this.studentDisplay.Potential = Xt(this.studentCollection[n][e.Id].Potential))),
        e.FavorAlts.forEach((r, s) => {
          this.studentCollection[n][r] !== void 0 && (this.studentDisplay.BondLevel[s + 1] = this.studentCollection[n][r].BondLevel);
        });
    },
    collectionRemove(e) {
      const t = Ae().settings,
        n = t.collectionPerServer ? t.server : 0;
      delete this.studentCollection[n][e];
    },
    collectionLock(e) {
      const t = Ae().settings,
        n = t.collectionPerServer ? t.server : 0;
      this.studentCollection[n][e].Lock = !this.studentCollection[n][e].Lock;
    },
    favouritesExists(e) {
      return this.studentDisplay.Favourites.includes(e);
    },
    favouritesToggle(e) {
      const t = this.studentDisplay.Favourites.indexOf(e);
      t !== -1 ? this.studentDisplay.Favourites.splice(t, 1) : this.studentDisplay.Favourites.push(e);
    },
    pinnedExists(e, t) {
      return this.pinned[e].includes(t);
    },
    pinnedToggle(e, t) {
      const n = this.pinned[e].indexOf(t);
      n !== -1 ? this.pinned[e].splice(n, 1) : this.pinned[e].push(t);
    },
  },
});
function _T(e) {
  const t = Ou().studentCollection[e],
    n = {};
  for (const r in t)
    n[r] = {
      s: t[r].StarGrade,
      l: t[r].Level,
      e1: t[r].Equipment[0],
      e2: t[r].Equipment[1],
      e3: t[r].Equipment[2],
      e4: t[r].Gear,
      ws: t[r].WeaponStarGrade,
      wl: t[r].WeaponLevel,
      b: t[r].BondLevel,
      s1: t[r].Skills.Ex.Level,
      s2: t[r].Skills.Public.Level,
      s3: t[r].Skills.Passive.Level,
      s4: t[r].Skills.ExtraPassive.Level,
      pm: t[r].Potential.MaxHP,
      pa: t[r].Potential.AttackPower,
      ph: t[r].Potential.HealPower,
      lock: t[r].Lock ?? !1,
    };
  return btoa(JSON.stringify(n));
}
function yT(e, t) {
  const n = ie().config.data.Regions[t];
  try {
    const r = JSON.parse(atob(e)),
      s = {};
    for (const i in r)
      s[i] = {
        StarGrade: r[i].s,
        Level: r[i].l,
        Equipment: [r[i].e1, r[i].e2, r[i].e3],
        Gear: r[i].e4 ?? 0,
        WeaponStarGrade: r[i].ws,
        WeaponLevel: r[i].wl,
        BondLevel: r[i].b,
        Skills: {
          Ex: {
            Level: r[i].s1 ?? 1,
            Enabled: !1,
          },
          Public: {
            Level: r[i].s2 ?? 1,
            Enabled: !1,
          },
          Passive: {
            Level: r[i].s3 ?? 1,
            Enabled: !0,
          },
          ExtraPassive: {
            Level: r[i].s4 ?? 1,
            Enabled: !1,
          },
        },
        Potential: {
          MaxHP: r[i].pm ?? 0,
          AttackPower: r[i].pa ?? 0,
          HealPower: r[i].ph ?? 0,
        },
        Lock: r[i].lock ?? !1,
      };
    return s;
  } catch (r) {
    console.debug(r);
  }
  try {
    const r = JSON.parse(e),
      s = {};
    return (
      r.characters.forEach((i) => {
        i.eleph.unlocked &&
          (s[i.id] = {
            StarGrade: lt(parseInt(i.current.star), 1, 5),
            Level: lt(parseInt(i.current.level), 1, n.StudentMaxLevel),
            Equipment: [lt(parseInt(i.current.gear1), 0, n.EquipmentMaxLevel[0]), lt(parseInt(i.current.gear2), 0, n.EquipmentMaxLevel[1]), lt(parseInt(i.current.gear3), 0, n.EquipmentMaxLevel[2])],
            Gear: 0,
            WeaponStarGrade: lt(parseInt(i.current.ue), 0, n.WeaponMaxLevel / 10 - 2),
            WeaponLevel: lt(parseInt(i.current.ue_level), 0, n.WeaponMaxLevel),
            BondLevel: lt(parseInt(i.current.bond), 1, n.BondMaxLevel),
            Skills: {
              Ex: {
                Level: lt(parseInt(i.current.ex), 1, 5),
                Enabled: !1,
              },
              Public: {
                Level: lt(parseInt(i.current.basic), 1, 10),
                Enabled: !1,
              },
              Passive: {
                Level: lt(parseInt(i.current.passive), 1, 10),
                Enabled: !0,
              },
              ExtraPassive: {
                Level: lt(parseInt(i.current.sub), 1, 10),
                Enabled: !1,
              },
            },
            Potential: {
              MaxHP: 0,
              AttackPower: 0,
              HealPower: 0,
            },
            Lock: !1,
          });
      }),
      s
    );
  } catch (r) {
    console.debug(r);
  }
  return null;
}
function wT(e, t) {
  e && (Ou().studentCollection[t] = Xt(e));
}
const Vh = ['Normal', 'LightArmor', 'HeavyArmor', 'Unarmed', 'ElasticArmor'];
function ZP(e) {
  document.title = `${e} | Schale DB`;
}
function eI(e) {
  const t = new Image();
  (t.onload = function () {
    const n = !document.getElementById('ba-background-front').classList.contains('active');
    (document.getElementById(n ? 'ba-background-front' : 'ba-background-back').style.backgroundImage = `url('${t.src}')`), document.getElementById('ba-background-front').classList.toggle('active', n);
  }),
    (t.src = e);
}
function ng() {
  const e = Ae().settings;
  document.body.classList.toggle('no-background', e.backgrounds == !1);
}
function hc() {
  switch (Ae().settings.theme) {
    case 'auto': {
      const t = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.body.classList.toggle('theme-dark', t), document.querySelector('meta[name="theme-color"]').setAttribute('content', t ? '#212529' : '#dee2e6');
      break;
    }
    case 'dark': {
      document.body.classList.add('theme-dark'), document.querySelector('meta[name="theme-color"]').setAttribute('content', '#212529');
      break;
    }
    case 'light': {
      document.body.classList.remove('theme-dark'), document.querySelector('meta[name="theme-color"]').setAttribute('content', '#dee2e6');
      break;
    }
  }
}
function ET() {
  document.body.classList.toggle('reduced-motion', !1);
}
function rg() {
  const e = Ae().settings;
  document.body.classList.toggle('high-contrast', e.highcontrast);
}
function tI() {
  switch (Ae().settings.animationMode) {
    case 0:
      return 0;
    case 1:
      return 1e3;
    case 2:
      return 1750;
  }
}
function Fh(e) {
  let t = e,
    n = 0;
  const r = ['', 'K', 'M', 'B', 'T'];
  for (; t >= 1e3; ) n++, (t /= 1e3);
  return t + r[n];
}
function nI(e) {
  let t = parseInt(e.replace(/[^0-9]/g));
  return isNaN(t) ? 0 : t;
}
function rI(e) {
  const t = {
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  };
  if (e < 0) return t;
  let n = e;
  return (t.days = Math.floor(n / 86400)), (n -= t.days * 86400), (t.hours = Math.floor(n / 3600)), (n -= t.hours * 3600), (t.minutes = Math.floor(n / 60)), (n -= t.minutes * 60), (t.seconds = n), t;
}
function sI(e, t = !1) {
  return Ae().settings.distanceUnit == 'metric' ? `${e / 100}m` : t ? Y('distance_units', e.toLocaleString()) : e.toLocaleString();
}
function iI(e) {
  return Ae().settings.durationUnit == 'seconds' ? Y('time_seconds', +(e / 30).toFixed(2)) : Y('time_frames', e);
}
function aI(e) {
  return `${Math.floor(e / 60)}:${`${e % 60}`.padStart(2, '0')}`;
}
function oI(e) {
  return new Date(e * 1e3).toLocaleDateString([], {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
  });
}
function lI(e) {
  return Array.isArray(e) ? e : [e];
}
function cI(e) {
  return String.fromCharCode(64 + e);
}
function uI(e) {
  return `linear-gradient(135deg,${e
    .sort((n, r) => Vh.indexOf(n) - Vh.indexOf(r))
    .map((n, r) => {
      const s = Math.round((r == 0 ? 0 : 15) + (r / e.length) * 70),
        i = Math.round((r == e.length - 1 ? 30 : 15) + ((r + 1) / e.length) * 70);
      return `var(--col-bg-${n}) ${s}% ${i}%`;
    })
    .join(',')})`;
}
const xT = {
  AttackPower: 'ATK',
  DefensePower: 'DEF',
  CriticalPoint: 'CriticalChance',
  CriticalDamageRate: 'CriticalDamage',
  CriticalDamageResistRate: 'CriticalDamageRateResist',
  DamageRatio2: 'DamageRatio',
  DamagedRatio2: 'DamagedRatio',
  DodgePoint: 'Dodge',
  HealEffectivenessRate: 'HealEffectiveness',
  AccuracyPoint: 'HIT',
  MaxHP: 'MAXHP',
  DefensePenetration: 'Penetration',
  StabilityPoint: 'Stability',
  StabilityRate: 'Stability',
  RegenCost: 'CostRegen',
};
function fI(e, t) {
  const n = e.split('_')[0];
  return n == 'IgnoreDelayCount' ? '' : n.endsWith('DamagedIncrease') ? `Debuff_${n}` : (t < 0 ? 'Debuff' : 'Buff') + '_' + (xT[n] ?? n);
}
function dI(e, t) {
  if (e == 0) return Y('conquest_occupy');
  switch (t) {
    case 815:
      return Y('conquest_operate');
    case 822:
      return Y('conquest_analyze');
    default:
      return Y('conquest_operate');
  }
}
function hI(e, t) {
  return t > 1 ? `&times;${Fh(e)}${t > e ? '~' + Fh(t) : ''}` : null;
}
function pI(e) {
  const [t, n] = e.split('/');
  return isNaN(t) || isNaN(n) ? null : new Date(0, t - 1, n);
}
function mI(e) {
  let t = '',
    n = !1;
  for (let r = 0; r < e.length; r++)
    r == 0 ? (t += e[r]) : r == e.length - 1 ? (t += (e[r] == e[r - 1] + 1 ? '-' : ', ') + e[r]) : e[r] == e[r - 1] + 1 ? (n = !0) : (n && ((t += `-${e[r - 1]}`), (n = !1)), (t += `, ${e[r]}`));
  return t;
}
const ST = {
    class: 'd-flex flex-column gap-2',
  },
  AT = {
    class: 'd-flex align-items-center',
  },
  CT = {
    class: 'flex-fill me-4',
  },
  TT = {
    class: 'd-flex align-items-center',
  },
  kT = {
    class: 'label',
  },
  $T = {
    class: 'text-muted mb-3',
  },
  OT = {
    class: 'd-flex align-items-center mb-1',
  },
  LT = {
    class: 'flex-fill me-4',
  },
  PT = {
    class: 'd-flex align-items-center',
  },
  IT = {
    class: 'label',
  },
  MT = {
    class: 'text-muted mb-3',
  },
  NT = {
    class: 'my-3',
  },
  RT = {
    class: 'd-flex align-items-center mb-1',
  },
  DT = {
    class: 'flex-fill me-4',
  },
  zT = {
    class: 'd-flex align-items-center',
  },
  HT = {
    class: 'btn-group',
  },
  VT = w(
    'span',
    {
      class: 'label',
    },
    'Auto',
    -1,
  ),
  FT = [VT],
  BT = {
    class: 'label',
  },
  jT = {
    class: 'px-2',
  },
  WT = {
    class: 'label',
  },
  UT = {
    class: 'px-2',
  },
  qT = {
    class: 'text-muted mb-3',
  },
  KT = {
    class: 'd-flex align-items-center mb-1',
  },
  GT = {
    class: 'flex-fill me-4',
  },
  YT = {
    class: 'd-flex align-items-center',
  },
  XT = {
    class: 'btn-group',
  },
  QT = {
    class: 'label',
  },
  JT = {
    class: 'label',
  },
  ZT = {
    class: 'text-muted mb-3',
  },
  ek = {
    class: 'd-flex align-items-center mb-1',
  },
  tk = {
    class: 'flex-fill me-4',
  },
  nk = {
    class: 'd-flex align-items-center',
  },
  rk = {
    class: 'btn-group',
  },
  sk = {
    class: 'label',
  },
  ik = {
    class: 'label',
  },
  ak = {
    class: 'label',
  },
  ok = {
    class: 'text-muted mb-3',
  },
  lk = {
    class: 'my-3',
  },
  ck = {
    class: 'd-flex align-items-center mb-1',
  },
  uk = {
    class: 'flex-fill me-4',
  },
  fk = {
    class: 'd-flex align-items-center',
  },
  dk = {
    class: 'btn-group',
  },
  hk = {
    class: 'label',
  },
  pk = {
    class: 'label',
  },
  mk = {
    class: 'text-muted mb-3',
  },
  gk = {
    class: 'd-flex align-items-center mb-1',
  },
  vk = {
    class: 'flex-fill me-4',
  },
  bk = {
    class: 'd-flex align-items-center',
  },
  _k = {
    class: 'btn-group',
  },
  yk = {
    class: 'label',
  },
  wk = {
    class: 'label',
  },
  Ek = {
    class: 'text-muted mb-3',
  },
  xk = {
    class: 'd-flex align-items-center mb-1',
  },
  Sk = {
    class: 'flex-fill me-4',
  },
  Ak = {
    class: 'd-flex align-items-center',
  },
  Ck = {
    class: 'btn-group',
  },
  Tk = {
    class: 'label',
  },
  kk = {
    class: 'label',
  },
  $k = {
    class: 'text-muted mb-3',
  },
  Ok = {
    class: 'my-3',
  },
  Lk = {
    class: 'd-flex align-items-center mb-1',
  },
  Pk = {
    class: 'flex-fill me-4',
  },
  Ik = {
    class: 'd-flex align-items-center',
  },
  Mk = {
    class: 'btn-group',
  },
  Nk = {
    class: 'label',
  },
  Rk = {
    class: 'label',
  },
  Dk = {
    class: 'text-muted mb-3',
  },
  zk = {
    class: 'ps-4',
  },
  Hk = {
    class: 'd-flex align-items-center mb-1',
  },
  Vk = {
    class: 'flex-fill me-4',
  },
  Fk = {
    class: 'd-flex align-items-center',
  },
  Bk = {
    class: 'btn-group',
  },
  jk = {
    class: 'label',
  },
  Wk = {
    class: 'label',
  },
  Uk = {
    class: 'text-muted mb-3',
  },
  qk = {
    class: 'd-flex align-items-center mb-1',
  },
  Kk = {
    class: 'flex-fill me-4',
  },
  Gk = {
    class: 'd-flex align-items-center',
  },
  Yk = {
    class: 'btn-group',
  },
  Xk = {
    class: 'label',
  },
  Qk = {
    class: 'label',
  },
  Jk = {
    class: 'text-muted mb-3',
  },
  Zk = {
    class: 'd-flex align-items-center mb-1',
  },
  e$ = {
    class: 'flex-fill me-4',
  },
  t$ = {
    class: 'd-flex align-items-center',
  },
  n$ = {
    class: 'btn-group',
  },
  r$ = {
    class: 'label',
  },
  s$ = {
    class: 'label',
  },
  i$ = {
    class: 'text-muted mb-3',
  },
  a$ = {
    class: 'my-3',
  },
  o$ = {
    class: 'd-flex align-items-center mb-1',
  },
  l$ = {
    class: 'flex-fill me-4',
  },
  c$ = {
    class: 'd-flex align-items-center',
  },
  u$ = {
    class: 'btn-group',
  },
  f$ = {
    class: 'label',
  },
  d$ = {
    class: 'label',
  },
  h$ = {
    class: 'text-muted mb-3',
  },
  p$ = {
    class: 'd-flex align-items-center mb-2',
  },
  m$ = {
    class: 'flex-fill me-4',
  },
  g$ = {
    class: 'd-flex align-items-center gap-2',
  },
  v$ = {
    class: 'label',
  },
  b$ = {
    class: 'label',
  },
  _$ = ['value', 'placeholder'],
  y$ = {
    class: 'd-flex align-items-center mb-1 mt-2',
  },
  w$ = {
    class: 'flex-fill me-4',
  },
  E$ = {
    class: 'text-muted mb-3',
  },
  x$ = ['innerHTML'],
  S$ = ['placeholder'],
  A$ = {
    class: 'd-flex align-items-center gap-2 mt-2',
  },
  C$ = {
    class: 'label',
  },
  T$ = ['disabled'],
  k$ = {
    class: 'label',
  },
  $$ = {
    __name: 'NavbarSettings',
    setup(e) {
      const t = Ae().settings,
        n = ie().config.data,
        r = ce(null),
        s = ce(t.collectionPerServer ? t.server : 0),
        i = ce(t.collectionPerServer ? t.server : 0),
        a = ce(null),
        o = ce(null),
        l = ce(!1),
        u = ce(null),
        c = n.Regions.map((d, p) => st('ServerName', p)),
        f = {
          en: 'English',
          jp: '日本語',
          kr: '한국어',
          tw: '繁體中文',
          cn: '简体中文',
          zh: '简体中文(民译)',
          th: 'ภาษาไทย',
        };
      function h(d, p) {
        (t[d] = p), d == 'theme' && hc(), d == 'highcontrast' && rg(), d == 'backgrounds' && ng(), d == 'language' && window.location.reload();
      }
      function m(d) {
        (a.value = yT(d.target.value, i.value)),
          d.target.value == ''
            ? ((l.value = !1), (u.value = null))
            : a.value
              ? ((l.value = !0), (u.value = Y('collection_import_status_valid', Object.keys(a.value).length)))
              : ((l.value = !1), (u.value = Y('collection_import_status_invalid')));
      }
      function g() {
        wT(a.value, i.value), (o.value.value = ''), (u.value = Y('toast_import_success', Object.keys(a.value).length));
      }
      return (d, p) => {
        const _ = gt('fa');
        return (
          be(),
          ke('div', ST, [
            w('div', null, [
              w('div', AT, [
                w('span', CT, [
                  F(
                    _,
                    {
                      icon: E(um),
                      class: 'me-2',
                    },
                    null,
                    8,
                    ['icon'],
                  ),
                  _e(G(E(Y)('settings_server')), 1),
                ]),
                w('span', TT, [
                  F(
                    Os,
                    {
                      'items': E(c),
                      'selected-index': E(t).server,
                      'onUpdate:selectedIndex': p[0] || (p[0] = (v) => (E(t).server = v)),
                    },
                    {
                      button: ve((v) => [w('span', kT, G(v.item), 1)]),
                      _: 1,
                    },
                    8,
                    ['items', 'selected-index'],
                  ),
                ]),
              ]),
              w('div', $T, G(E(Y)('settings_server_description')), 1),
            ]),
            w('div', null, [
              w('div', OT, [
                w('span', LT, [
                  F(
                    _,
                    {
                      icon: E(h7),
                      class: 'me-2',
                    },
                    null,
                    8,
                    ['icon'],
                  ),
                  _e(G(E(Y)('settings_language')), 1),
                ]),
                w('span', PT, [
                  F(
                    Os,
                    {
                      'items': Object.keys(f),
                      'selected-index': Object.keys(f).indexOf(E(t).language),
                      'onUpdate:selectedIndex': p[1] || (p[1] = (v) => h('language', Object.keys(f)[v])),
                    },
                    {
                      button: ve((v) => [w('span', IT, G(f[v.item]), 1)]),
                      listItem: ve((v) => [_e(G(f[v.item]), 1)]),
                      _: 1,
                    },
                    8,
                    ['items', 'selected-index'],
                  ),
                ]),
              ]),
              w('div', MT, G(E(Y)('settings_language_description')), 1),
            ]),
            w('h5', NT, G(E(Y)('settings_appearance')), 1),
            w('div', null, [
              w('div', RT, [
                w('span', DT, [
                  F(
                    _,
                    {
                      icon: E(d7),
                      class: 'me-2',
                    },
                    null,
                    8,
                    ['icon'],
                  ),
                  _e(G(E(Y)('settings_theme')), 1),
                ]),
                w('span', zT, [
                  w('div', HT, [
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).theme === 'auto',
                          },
                        ]),
                        onClick: p[2] || (p[2] = (v) => h('theme', 'auto')),
                      },
                      FT,
                      2,
                    ),
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).theme === 'light',
                          },
                        ]),
                        onClick: p[3] || (p[3] = (v) => h('theme', 'light')),
                      },
                      [
                        w('span', BT, [
                          w('span', jT, [
                            F(
                              _,
                              {
                                icon: E(E7),
                              },
                              null,
                              8,
                              ['icon'],
                            ),
                          ]),
                        ]),
                      ],
                      2,
                    ),
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).theme === 'dark',
                          },
                        ]),
                        onClick: p[4] || (p[4] = (v) => h('theme', 'dark')),
                      },
                      [
                        w('span', WT, [
                          w('span', UT, [
                            F(
                              _,
                              {
                                icon: E($7),
                              },
                              null,
                              8,
                              ['icon'],
                            ),
                          ]),
                        ]),
                      ],
                      2,
                    ),
                  ]),
                ]),
              ]),
              w('div', qT, G(E(Y)('settings_theme_description')), 1),
            ]),
            w('div', null, [
              w('div', KT, [
                w('span', GT, [
                  F(
                    _,
                    {
                      icon: E(C7),
                      class: 'me-2',
                    },
                    null,
                    8,
                    ['icon'],
                  ),
                  _e(G(E(Y)('settings_contrast')), 1),
                ]),
                w('span', YT, [
                  w('div', XT, [
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).highcontrast === !1,
                          },
                        ]),
                        onClick: p[5] || (p[5] = (v) => h('highcontrast', !1)),
                      },
                      [w('span', QT, G(E(Y)('setting_off')), 1)],
                      2,
                    ),
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).highcontrast === !0,
                          },
                        ]),
                        onClick: p[6] || (p[6] = (v) => h('highcontrast', !0)),
                      },
                      [w('span', JT, G(E(Y)('setting_on')), 1)],
                      2,
                    ),
                  ]),
                ]),
              ]),
              w('div', ZT, [w('p', null, G(E(Y)('settings_contrast_description')), 1)]),
            ]),
            w('div', null, [
              w('div', ek, [
                w('span', tk, [
                  F(
                    _,
                    {
                      icon: E(y7),
                      class: 'me-2',
                    },
                    null,
                    8,
                    ['icon'],
                  ),
                  _e(G(E(Y)('settings_animation')), 1),
                ]),
                w('span', nk, [
                  w('div', rk, [
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).animationMode === 1,
                          },
                        ]),
                        onClick: p[7] || (p[7] = (v) => h('animationMode', 1)),
                      },
                      [w('span', sk, G(E(Y)('setting_normal')), 1)],
                      2,
                    ),
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).animationMode === 2,
                          },
                        ]),
                        onClick: p[8] || (p[8] = (v) => h('animationMode', 2)),
                      },
                      [w('span', ik, G(E(Y)('setting_slow')), 1)],
                      2,
                    ),
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).animationMode === 0,
                          },
                        ]),
                        onClick: p[9] || (p[9] = (v) => h('animationMode', 0)),
                      },
                      [w('span', ak, G(E(Y)('setting_off')), 1)],
                      2,
                    ),
                  ]),
                ]),
              ]),
              w('div', ok, [w('p', null, G(E(Y)('settings_animation_description')), 1)]),
            ]),
            w('h5', lk, G(E(Y)('settings_preferences')), 1),
            w('div', null, [
              w('div', ck, [
                w('span', uk, [
                  F(
                    _,
                    {
                      icon: E(_7),
                      class: 'me-2',
                    },
                    null,
                    8,
                    ['icon'],
                  ),
                  _e(G(E(Y)('settings_itemids')), 1),
                ]),
                w('span', fk, [
                  w('div', dk, [
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).showDeveloperProps === !1,
                          },
                        ]),
                        onClick: p[10] || (p[10] = (v) => h('showDeveloperProps', !1)),
                      },
                      [w('span', hk, G(E(Y)('setting_off')), 1)],
                      2,
                    ),
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).showDeveloperProps === !0,
                          },
                        ]),
                        onClick: p[11] || (p[11] = (v) => h('showDeveloperProps', !0)),
                      },
                      [w('span', pk, G(E(Y)('setting_on')), 1)],
                      2,
                    ),
                  ]),
                ]),
              ]),
              w('div', mk, [w('p', null, G(E(Y)('settings_itemids_description')), 1)]),
            ]),
            w('div', null, [
              w('div', gk, [
                w('span', vk, [
                  F(
                    _,
                    {
                      icon: E(v7),
                      class: 'me-2',
                    },
                    null,
                    8,
                    ['icon'],
                  ),
                  _e(G(E(Y)('settings_distanceunit')), 1),
                ]),
                w('span', bk, [
                  w('div', _k, [
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).distanceUnit === 'raw',
                          },
                        ]),
                        onClick: p[12] || (p[12] = (v) => h('distanceUnit', 'raw')),
                      },
                      [w('span', yk, G(E(Y)('setting_raw')), 1)],
                      2,
                    ),
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).distanceUnit === 'metric',
                          },
                        ]),
                        onClick: p[13] || (p[13] = (v) => h('distanceUnit', 'metric')),
                      },
                      [w('span', wk, G(E(Y)('setting_metric')), 1)],
                      2,
                    ),
                  ]),
                ]),
              ]),
              w('div', Ek, [w('p', null, G(E(Y)('settings_distanceunit_description')), 1)]),
            ]),
            w('div', null, [
              w('div', xk, [
                w('span', Sk, [
                  F(
                    _,
                    {
                      icon: E(T7),
                      class: 'me-2',
                    },
                    null,
                    8,
                    ['icon'],
                  ),
                  _e(G(E(Y)('settings_animationunit')), 1),
                ]),
                w('span', Ak, [
                  w('div', Ck, [
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).durationUnit === 'seconds',
                          },
                        ]),
                        onClick: p[14] || (p[14] = (v) => h('durationUnit', 'seconds')),
                      },
                      [w('span', Tk, G(E(Y)('setting_seconds')), 1)],
                      2,
                    ),
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).durationUnit === 'raw',
                          },
                        ]),
                        onClick: p[15] || (p[15] = (v) => h('durationUnit', 'raw')),
                      },
                      [w('span', kk, G(E(Y)('setting_frames')), 1)],
                      2,
                    ),
                  ]),
                ]),
              ]),
              w('div', $k, [w('p', null, G(E(Y)('settings_animationunit_description')), 1)]),
            ]),
            w('h5', Ok, G(E(Y)('settings_experiments')), 1),
            w('div', null, [
              w('div', Lk, [
                w('span', Pk, [
                  F(
                    _,
                    {
                      icon: E(rc),
                      class: 'me-2',
                    },
                    null,
                    8,
                    ['icon'],
                  ),
                  _e(G(E(Y)('settings_restorepage')), 1),
                ]),
                w('span', Ik, [
                  w('div', Mk, [
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).restoreRoute === !1,
                          },
                        ]),
                        onClick: p[16] || (p[16] = (v) => h('restoreRoute', !1)),
                      },
                      [w('span', Nk, G(E(Y)('setting_off')), 1)],
                      2,
                    ),
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).restoreRoute === !0,
                          },
                        ]),
                        onClick: p[17] || (p[17] = (v) => h('restoreRoute', !0)),
                      },
                      [w('span', Rk, G(E(Y)('setting_on')), 1)],
                      2,
                    ),
                  ]),
                ]),
              ]),
              w('div', Dk, [w('p', null, G(E(Y)('settings_restorepage_description')), 1)]),
            ]),
            w('div', zk, [
              w('div', Hk, [
                w('span', Vk, G(E(Y)('settings_defaultpage')), 1),
                w('span', Fk, [
                  w('div', Bk, [
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).restorePage === !1,
                          },
                        ]),
                        onClick: p[18] || (p[18] = (v) => h('restorePage', !1)),
                      },
                      [w('span', jk, G(E(Y)('list')), 1)],
                      2,
                    ),
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).restorePage === !0,
                          },
                        ]),
                        onClick: p[19] || (p[19] = (v) => h('restorePage', !0)),
                      },
                      [w('span', Wk, G(E(Y)('setting_lastviewed')), 1)],
                      2,
                    ),
                  ]),
                ]),
              ]),
              w('div', Uk, [w('p', null, G(E(Y)('settings_defaultpage_description')), 1)]),
            ]),
            w('div', null, [
              w('div', qk, [
                w('span', Kk, [
                  F(
                    _,
                    {
                      icon: E(o7),
                      class: 'me-2',
                    },
                    null,
                    8,
                    ['icon'],
                  ),
                  _e(G(E(Y)('settings_showskilldelay')), 1),
                ]),
                w('span', Gk, [
                  w('div', Yk, [
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).showSkillDelay === !1,
                          },
                        ]),
                        onClick: p[20] || (p[20] = (v) => h('showSkillDelay', !1)),
                      },
                      [w('span', Xk, G(E(Y)('setting_off')), 1)],
                      2,
                    ),
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).showSkillDelay === !0,
                          },
                        ]),
                        onClick: p[21] || (p[21] = (v) => h('showSkillDelay', !0)),
                      },
                      [w('span', Qk, G(E(Y)('setting_on')), 1)],
                      2,
                    ),
                  ]),
                ]),
              ]),
              w('div', Jk, [w('p', null, G(E(Y)('settings_showskilldelay_description')), 1)]),
            ]),
            w('div', null, [
              w('div', Zk, [
                w('span', e$, [
                  F(
                    _,
                    {
                      icon: E(x7),
                      class: 'me-2',
                    },
                    null,
                    8,
                    ['icon'],
                  ),
                  _e(G(E(Y)('settings_screenmode')), 1),
                ]),
                w('span', t$, [
                  w('div', n$, [
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).screenMode === 'full',
                          },
                        ]),
                        onClick: p[22] || (p[22] = (v) => h('screenMode', 'full')),
                      },
                      [w('span', r$, G(E(Y)('setting_off')), 1)],
                      2,
                    ),
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).screenMode === 'limited',
                          },
                        ]),
                        onClick: p[23] || (p[23] = (v) => h('screenMode', 'limited')),
                      },
                      [w('span', s$, G(E(Y)('setting_on')), 1)],
                      2,
                    ),
                  ]),
                ]),
              ]),
              w('div', i$, [w('p', null, G(E(Y)('settings_screenmode_description')), 1)]),
            ]),
            w('h5', a$, G(E(Y)('settings_data')), 1),
            w('div', null, [
              w('div', o$, [
                w('span', l$, [
                  F(
                    _,
                    {
                      icon: E(nl),
                      class: 'me-2',
                    },
                    null,
                    8,
                    ['icon'],
                  ),
                  _e(G(E(Y)('settings_servercollection')), 1),
                ]),
                w('span', c$, [
                  w('div', u$, [
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).collectionPerServer === !1,
                          },
                        ]),
                        onClick: p[24] || (p[24] = (v) => h('collectionPerServer', !1)),
                      },
                      [w('span', f$, G(E(Y)('setting_off')), 1)],
                      2,
                    ),
                    w(
                      'button',
                      {
                        type: 'button',
                        class: le([
                          'btn-pill',
                          {
                            active: E(t).collectionPerServer === !0,
                          },
                        ]),
                        onClick: p[25] || (p[25] = (v) => h('collectionPerServer', !0)),
                      },
                      [w('span', d$, G(E(Y)('setting_on')), 1)],
                      2,
                    ),
                  ]),
                ]),
              ]),
              w('div', h$, [w('p', null, G(E(Y)('settings_servercollection_description')), 1)]),
              w('div', p$, [
                w('span', m$, [
                  F(
                    _,
                    {
                      icon: E(n7),
                      class: 'me-2',
                    },
                    null,
                    8,
                    ['icon'],
                  ),
                  _e(G(E(Y)('collection_export_collection')), 1),
                ]),
                w('span', g$, [
                  F(
                    Os,
                    {
                      'items': E(c),
                      'selected-index': s.value,
                      'onUpdate:selectedIndex': p[26] || (p[26] = (v) => (s.value = v)),
                    },
                    {
                      button: ve((v) => [
                        w('span', v$, [
                          F(
                            _,
                            {
                              icon: E(nl),
                              class: 'me-2',
                            },
                            null,
                            8,
                            ['icon'],
                          ),
                          _e(' ' + G(v.item), 1),
                        ]),
                      ]),
                      _: 1,
                    },
                    8,
                    ['items', 'selected-index'],
                  ),
                  w(
                    'button',
                    {
                      type: 'button',
                      class: 'btn-pill',
                      onClick: p[27] || (p[27] = (v) => (r.value = E(_T)(s.value))),
                    },
                    [w('span', b$, G(E(Y)('collection_export')), 1)],
                  ),
                ]),
              ]),
              w(
                'textarea',
                {
                  rows: '5',
                  value: r.value,
                  readonly: '',
                  onclick: 'this.select()',
                  placeholder: E(Y)('collection_export_placeholder'),
                },
                null,
                8,
                _$,
              ),
              w('div', y$, [
                w('span', w$, [
                  F(
                    _,
                    {
                      icon: E(l7),
                      class: 'me-2',
                    },
                    null,
                    8,
                    ['icon'],
                  ),
                  _e(G(E(Y)('collection_import_collection')), 1),
                ]),
              ]),
              w('div', E$, [
                w(
                  'p',
                  {
                    innerHTML: E(Y)('collection_import_help'),
                  },
                  null,
                  8,
                  x$,
                ),
              ]),
              w(
                'textarea',
                {
                  rows: '5',
                  onclick: 'this.select()',
                  ref_key: 'importTextEl',
                  ref: o,
                  onInput: m,
                  placeholder: E(Y)('collection_import_placeholder'),
                },
                null,
                40,
                S$,
              ),
              w('div', A$, [
                u.value
                  ? (be(),
                    ke(
                      'span',
                      {
                        key: 0,
                        class: le(l.value ? 'text-positive' : 'text-negative'),
                      },
                      [
                        F(
                          _,
                          {
                            icon: l.value ? E(fm) : E(pm),
                            class: 'me-1',
                          },
                          null,
                          8,
                          ['icon'],
                        ),
                        _e(' ' + G(u.value), 1),
                      ],
                      2,
                    ))
                  : yt('', !0),
                F(
                  Os,
                  {
                    'class': 'ms-auto',
                    'items': E(c),
                    'selected-index': i.value,
                    'onUpdate:selectedIndex': p[28] || (p[28] = (v) => (i.value = v)),
                  },
                  {
                    button: ve((v) => [
                      w('span', C$, [
                        F(
                          _,
                          {
                            icon: E(nl),
                            class: 'me-2',
                          },
                          null,
                          8,
                          ['icon'],
                        ),
                        _e(' ' + G(v.item), 1),
                      ]),
                    ]),
                    listItem: ve(({ item: v }) => [w('span', null, G(v), 1)]),
                    _: 1,
                  },
                  8,
                  ['items', 'selected-index'],
                ),
                w(
                  'button',
                  {
                    type: 'button',
                    class: le([
                      'btn-pill',
                      {
                        disabled: !l.value || o.value.value == '',
                      },
                    ]),
                    disabled: !l.value,
                    onClick: g,
                  },
                  [w('span', k$, G(E(Y)('collection_import')), 1)],
                  10,
                  T$,
                ),
              ]),
            ]),
          ])
        );
      };
    },
  };
function Lu() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null,
  };
}
let Lr = Lu();
function sg(e) {
  Lr = e;
}
const ig = /[&<>"']/,
  O$ = new RegExp(ig.source, 'g'),
  ag = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  L$ = new RegExp(ag.source, 'g'),
  P$ = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  },
  Bh = (e) => P$[e];
function _t(e, t) {
  if (t) {
    if (ig.test(e)) return e.replace(O$, Bh);
  } else if (ag.test(e)) return e.replace(L$, Bh);
  return e;
}
const I$ = /(^|[^\[])\^/g;
function Ne(e, t) {
  let n = typeof e == 'string' ? e : e.source;
  t = t || '';
  const r = {
    replace: (s, i) => {
      let a = typeof i == 'string' ? i : i.source;
      return (a = a.replace(I$, '$1')), (n = n.replace(s, a)), r;
    },
    getRegex: () => new RegExp(n, t),
  };
  return r;
}
function jh(e) {
  try {
    e = encodeURI(e).replace(/%25/g, '%');
  } catch {
    return null;
  }
  return e;
}
const Us = {
  exec: () => null,
};
function Wh(e, t) {
  const n = e.replace(/\|/g, (i, a, o) => {
      let l = !1,
        u = a;
      for (; --u >= 0 && o[u] === '\\'; ) l = !l;
      return l ? '|' : ' |';
    }),
    r = n.split(/ \|/);
  let s = 0;
  if ((r[0].trim() || r.shift(), r.length > 0 && !r[r.length - 1].trim() && r.pop(), t))
    if (r.length > t) r.splice(t);
    else for (; r.length < t; ) r.push('');
  for (; s < r.length; s++) r[s] = r[s].trim().replace(/\\\|/g, '|');
  return r;
}
function As(e, t, n) {
  const r = e.length;
  if (r === 0) return '';
  let s = 0;
  for (; s < r; ) {
    const i = e.charAt(r - s - 1);
    if (i === t && !n) s++;
    else if (i !== t && n) s++;
    else break;
  }
  return e.slice(0, r - s);
}
function M$(e, t) {
  if (e.indexOf(t[1]) === -1) return -1;
  let n = 0;
  for (let r = 0; r < e.length; r++)
    if (e[r] === '\\') r++;
    else if (e[r] === t[0]) n++;
    else if (e[r] === t[1] && (n--, n < 0)) return r;
  return -1;
}
function Uh(e, t, n, r) {
  const s = t.href,
    i = t.title ? _t(t.title) : null,
    a = e[1].replace(/\\([\[\]])/g, '$1');
  if (e[0].charAt(0) !== '!') {
    r.state.inLink = !0;
    const o = {
      type: 'link',
      raw: n,
      href: s,
      title: i,
      text: a,
      tokens: r.inlineTokens(a),
    };
    return (r.state.inLink = !1), o;
  }
  return {
    type: 'image',
    raw: n,
    href: s,
    title: i,
    text: _t(a),
  };
}
function N$(e, t) {
  const n = e.match(/^(\s+)(?:```)/);
  if (n === null) return t;
  const r = n[1];
  return t
    .split(
      `
`,
    )
    .map((s) => {
      const i = s.match(/^\s+/);
      if (i === null) return s;
      const [a] = i;
      return a.length >= r.length ? s.slice(r.length) : s;
    }).join(`
`);
}
class Ma {
  constructor(t) {
    Re(this, 'options');
    Re(this, 'rules');
    Re(this, 'lexer');
    this.options = t || Lr;
  }
  space(t) {
    const n = this.rules.block.newline.exec(t);
    if (n && n[0].length > 0)
      return {
        type: 'space',
        raw: n[0],
      };
  }
  code(t) {
    const n = this.rules.block.code.exec(t);
    if (n) {
      const r = n[0].replace(/^ {1,4}/gm, '');
      return {
        type: 'code',
        raw: n[0],
        codeBlockStyle: 'indented',
        text: this.options.pedantic
          ? r
          : As(
              r,
              `
`,
            ),
      };
    }
  }
  fences(t) {
    const n = this.rules.block.fences.exec(t);
    if (n) {
      const r = n[0],
        s = N$(r, n[3] || '');
      return {
        type: 'code',
        raw: r,
        lang: n[2] ? n[2].trim().replace(this.rules.inline.anyPunctuation, '$1') : n[2],
        text: s,
      };
    }
  }
  heading(t) {
    const n = this.rules.block.heading.exec(t);
    if (n) {
      let r = n[2].trim();
      if (/#$/.test(r)) {
        const s = As(r, '#');
        (this.options.pedantic || !s || / $/.test(s)) && (r = s.trim());
      }
      return {
        type: 'heading',
        raw: n[0],
        depth: n[1].length,
        text: r,
        tokens: this.lexer.inline(r),
      };
    }
  }
  hr(t) {
    const n = this.rules.block.hr.exec(t);
    if (n)
      return {
        type: 'hr',
        raw: As(
          n[0],
          `
`,
        ),
      };
  }
  blockquote(t) {
    const n = this.rules.block.blockquote.exec(t);
    if (n) {
      let r = As(
          n[0],
          `
`,
        ).split(`
`),
        s = '',
        i = '';
      const a = [];
      for (; r.length > 0; ) {
        let o = !1;
        const l = [];
        let u;
        for (u = 0; u < r.length; u++)
          if (/^ {0,3}>/.test(r[u])) l.push(r[u]), (o = !0);
          else if (!o) l.push(r[u]);
          else break;
        r = r.slice(u);
        const c = l.join(`
`),
          f = c
            .replace(
              /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
              `
    $1`,
            )
            .replace(/^ {0,3}>[ \t]?/gm, '');
        (s = s
          ? `${s}
${c}`
          : c),
          (i = i
            ? `${i}
${f}`
            : f);
        const h = this.lexer.state.top;
        if (((this.lexer.state.top = !0), this.lexer.blockTokens(f, a, !0), (this.lexer.state.top = h), r.length === 0)) break;
        const m = a[a.length - 1];
        if ((m == null ? void 0 : m.type) === 'code') break;
        if ((m == null ? void 0 : m.type) === 'blockquote') {
          const g = m,
            d =
              g.raw +
              `
` +
              r.join(`
`),
            p = this.blockquote(d);
          (a[a.length - 1] = p), (s = s.substring(0, s.length - g.raw.length) + p.raw), (i = i.substring(0, i.length - g.text.length) + p.text);
          break;
        } else if ((m == null ? void 0 : m.type) === 'list') {
          const g = m,
            d =
              g.raw +
              `
` +
              r.join(`
`),
            p = this.list(d);
          (a[a.length - 1] = p),
            (s = s.substring(0, s.length - m.raw.length) + p.raw),
            (i = i.substring(0, i.length - g.raw.length) + p.raw),
            (r = d.substring(a[a.length - 1].raw.length).split(`
`));
          continue;
        }
      }
      return {
        type: 'blockquote',
        raw: s,
        tokens: a,
        text: i,
      };
    }
  }
  list(t) {
    let n = this.rules.block.list.exec(t);
    if (n) {
      let r = n[1].trim();
      const s = r.length > 1,
        i = {
          type: 'list',
          raw: '',
          ordered: s,
          start: s ? +r.slice(0, -1) : '',
          loose: !1,
          items: [],
        };
      (r = s ? `\\d{1,9}\\${r.slice(-1)}` : `\\${r}`), this.options.pedantic && (r = s ? r : '[*+-]');
      const a = new RegExp(`^( {0,3}${r})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      let o = !1;
      for (; t; ) {
        let l = !1,
          u = '',
          c = '';
        if (!(n = a.exec(t)) || this.rules.block.hr.test(t)) break;
        (u = n[0]), (t = t.substring(u.length));
        let f = n[2]
            .split(
              `
`,
              1,
            )[0]
            .replace(/^\t+/, (_) => ' '.repeat(3 * _.length)),
          h = t.split(
            `
`,
            1,
          )[0],
          m = !f.trim(),
          g = 0;
        if (
          (this.options.pedantic ? ((g = 2), (c = f.trimStart())) : m ? (g = n[1].length + 1) : ((g = n[2].search(/[^ ]/)), (g = g > 4 ? 1 : g), (c = f.slice(g)), (g += n[1].length)),
          m &&
            /^ *$/.test(h) &&
            ((u +=
              h +
              `
`),
            (t = t.substring(h.length + 1)),
            (l = !0)),
          !l)
        ) {
          const _ = new RegExp(`^ {0,${Math.min(3, g - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
            v = new RegExp(`^ {0,${Math.min(3, g - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
            C = new RegExp(`^ {0,${Math.min(3, g - 1)}}(?:\`\`\`|~~~)`),
            S = new RegExp(`^ {0,${Math.min(3, g - 1)}}#`);
          for (; t; ) {
            const P = t.split(
              `
`,
              1,
            )[0];
            if (((h = P), this.options.pedantic && (h = h.replace(/^ {1,4}(?=( {4})*[^ ])/g, '  ')), C.test(h) || S.test(h) || _.test(h) || v.test(t))) break;
            if (h.search(/[^ ]/) >= g || !h.trim())
              c +=
                `
` + h.slice(g);
            else {
              if (m || f.search(/[^ ]/) >= 4 || C.test(f) || S.test(f) || v.test(f)) break;
              c +=
                `
` + h;
            }
            !m && !h.trim() && (m = !0),
              (u +=
                P +
                `
`),
              (t = t.substring(P.length + 1)),
              (f = h.slice(g));
          }
        }
        i.loose || (o ? (i.loose = !0) : /\n *\n *$/.test(u) && (o = !0));
        let d = null,
          p;
        this.options.gfm && ((d = /^\[[ xX]\] /.exec(c)), d && ((p = d[0] !== '[ ] '), (c = c.replace(/^\[[ xX]\] +/, '')))),
          i.items.push({
            type: 'list_item',
            raw: u,
            task: !!d,
            checked: p,
            loose: !1,
            text: c,
            tokens: [],
          }),
          (i.raw += u);
      }
      (i.items[i.items.length - 1].raw = i.items[i.items.length - 1].raw.trimEnd()), (i.items[i.items.length - 1].text = i.items[i.items.length - 1].text.trimEnd()), (i.raw = i.raw.trimEnd());
      for (let l = 0; l < i.items.length; l++)
        if (((this.lexer.state.top = !1), (i.items[l].tokens = this.lexer.blockTokens(i.items[l].text, [])), !i.loose)) {
          const u = i.items[l].tokens.filter((f) => f.type === 'space'),
            c = u.length > 0 && u.some((f) => /\n.*\n/.test(f.raw));
          i.loose = c;
        }
      if (i.loose) for (let l = 0; l < i.items.length; l++) i.items[l].loose = !0;
      return i;
    }
  }
  html(t) {
    const n = this.rules.block.html.exec(t);
    if (n)
      return {
        type: 'html',
        block: !0,
        raw: n[0],
        pre: n[1] === 'pre' || n[1] === 'script' || n[1] === 'style',
        text: n[0],
      };
  }
  def(t) {
    const n = this.rules.block.def.exec(t);
    if (n) {
      const r = n[1].toLowerCase().replace(/\s+/g, ' '),
        s = n[2] ? n[2].replace(/^<(.*)>$/, '$1').replace(this.rules.inline.anyPunctuation, '$1') : '',
        i = n[3] ? n[3].substring(1, n[3].length - 1).replace(this.rules.inline.anyPunctuation, '$1') : n[3];
      return {
        type: 'def',
        tag: r,
        raw: n[0],
        href: s,
        title: i,
      };
    }
  }
  table(t) {
    const n = this.rules.block.table.exec(t);
    if (!n || !/[:|]/.test(n[2])) return;
    const r = Wh(n[1]),
      s = n[2].replace(/^\||\| *$/g, '').split('|'),
      i =
        n[3] && n[3].trim()
          ? n[3].replace(/\n[ \t]*$/, '').split(`
`)
          : [],
      a = {
        type: 'table',
        raw: n[0],
        header: [],
        align: [],
        rows: [],
      };
    if (r.length === s.length) {
      for (const o of s) /^ *-+: *$/.test(o) ? a.align.push('right') : /^ *:-+: *$/.test(o) ? a.align.push('center') : /^ *:-+ *$/.test(o) ? a.align.push('left') : a.align.push(null);
      for (let o = 0; o < r.length; o++)
        a.header.push({
          text: r[o],
          tokens: this.lexer.inline(r[o]),
          header: !0,
          align: a.align[o],
        });
      for (const o of i)
        a.rows.push(
          Wh(o, a.header.length).map((l, u) => ({
            text: l,
            tokens: this.lexer.inline(l),
            header: !1,
            align: a.align[u],
          })),
        );
      return a;
    }
  }
  lheading(t) {
    const n = this.rules.block.lheading.exec(t);
    if (n)
      return {
        type: 'heading',
        raw: n[0],
        depth: n[2].charAt(0) === '=' ? 1 : 2,
        text: n[1],
        tokens: this.lexer.inline(n[1]),
      };
  }
  paragraph(t) {
    const n = this.rules.block.paragraph.exec(t);
    if (n) {
      const r =
        n[1].charAt(n[1].length - 1) ===
        `
`
          ? n[1].slice(0, -1)
          : n[1];
      return {
        type: 'paragraph',
        raw: n[0],
        text: r,
        tokens: this.lexer.inline(r),
      };
    }
  }
  text(t) {
    const n = this.rules.block.text.exec(t);
    if (n)
      return {
        type: 'text',
        raw: n[0],
        text: n[0],
        tokens: this.lexer.inline(n[0]),
      };
  }
  escape(t) {
    const n = this.rules.inline.escape.exec(t);
    if (n)
      return {
        type: 'escape',
        raw: n[0],
        text: _t(n[1]),
      };
  }
  tag(t) {
    const n = this.rules.inline.tag.exec(t);
    if (n)
      return (
        !this.lexer.state.inLink && /^<a /i.test(n[0]) ? (this.lexer.state.inLink = !0) : this.lexer.state.inLink && /^<\/a>/i.test(n[0]) && (this.lexer.state.inLink = !1),
        !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(n[0])
          ? (this.lexer.state.inRawBlock = !0)
          : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0]) && (this.lexer.state.inRawBlock = !1),
        {
          type: 'html',
          raw: n[0],
          inLink: this.lexer.state.inLink,
          inRawBlock: this.lexer.state.inRawBlock,
          block: !1,
          text: n[0],
        }
      );
  }
  link(t) {
    const n = this.rules.inline.link.exec(t);
    if (n) {
      const r = n[2].trim();
      if (!this.options.pedantic && /^</.test(r)) {
        if (!/>$/.test(r)) return;
        const a = As(r.slice(0, -1), '\\');
        if ((r.length - a.length) % 2 === 0) return;
      } else {
        const a = M$(n[2], '()');
        if (a > -1) {
          const l = (n[0].indexOf('!') === 0 ? 5 : 4) + n[1].length + a;
          (n[2] = n[2].substring(0, a)), (n[0] = n[0].substring(0, l).trim()), (n[3] = '');
        }
      }
      let s = n[2],
        i = '';
      if (this.options.pedantic) {
        const a = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(s);
        a && ((s = a[1]), (i = a[3]));
      } else i = n[3] ? n[3].slice(1, -1) : '';
      return (
        (s = s.trim()),
        /^</.test(s) && (this.options.pedantic && !/>$/.test(r) ? (s = s.slice(1)) : (s = s.slice(1, -1))),
        Uh(
          n,
          {
            href: s && s.replace(this.rules.inline.anyPunctuation, '$1'),
            title: i && i.replace(this.rules.inline.anyPunctuation, '$1'),
          },
          n[0],
          this.lexer,
        )
      );
    }
  }
  reflink(t, n) {
    let r;
    if ((r = this.rules.inline.reflink.exec(t)) || (r = this.rules.inline.nolink.exec(t))) {
      const s = (r[2] || r[1]).replace(/\s+/g, ' '),
        i = n[s.toLowerCase()];
      if (!i) {
        const a = r[0].charAt(0);
        return {
          type: 'text',
          raw: a,
          text: a,
        };
      }
      return Uh(r, i, r[0], this.lexer);
    }
  }
  emStrong(t, n, r = '') {
    let s = this.rules.inline.emStrongLDelim.exec(t);
    if (!s || (s[3] && r.match(/[\p{L}\p{N}]/u))) return;
    if (!(s[1] || s[2] || '') || !r || this.rules.inline.punctuation.exec(r)) {
      const a = [...s[0]].length - 1;
      let o,
        l,
        u = a,
        c = 0;
      const f = s[0][0] === '*' ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (f.lastIndex = 0, n = n.slice(-1 * t.length + a); (s = f.exec(n)) != null; ) {
        if (((o = s[1] || s[2] || s[3] || s[4] || s[5] || s[6]), !o)) continue;
        if (((l = [...o].length), s[3] || s[4])) {
          u += l;
          continue;
        } else if ((s[5] || s[6]) && a % 3 && !((a + l) % 3)) {
          c += l;
          continue;
        }
        if (((u -= l), u > 0)) continue;
        l = Math.min(l, l + u + c);
        const h = [...s[0]][0].length,
          m = t.slice(0, a + s.index + h + l);
        if (Math.min(a, l) % 2) {
          const d = m.slice(1, -1);
          return {
            type: 'em',
            raw: m,
            text: d,
            tokens: this.lexer.inlineTokens(d),
          };
        }
        const g = m.slice(2, -2);
        return {
          type: 'strong',
          raw: m,
          text: g,
          tokens: this.lexer.inlineTokens(g),
        };
      }
    }
  }
  codespan(t) {
    const n = this.rules.inline.code.exec(t);
    if (n) {
      let r = n[2].replace(/\n/g, ' ');
      const s = /[^ ]/.test(r),
        i = /^ /.test(r) && / $/.test(r);
      return (
        s && i && (r = r.substring(1, r.length - 1)),
        (r = _t(r, !0)),
        {
          type: 'codespan',
          raw: n[0],
          text: r,
        }
      );
    }
  }
  br(t) {
    const n = this.rules.inline.br.exec(t);
    if (n)
      return {
        type: 'br',
        raw: n[0],
      };
  }
  del(t) {
    const n = this.rules.inline.del.exec(t);
    if (n)
      return {
        type: 'del',
        raw: n[0],
        text: n[2],
        tokens: this.lexer.inlineTokens(n[2]),
      };
  }
  autolink(t) {
    const n = this.rules.inline.autolink.exec(t);
    if (n) {
      let r, s;
      return (
        n[2] === '@' ? ((r = _t(n[1])), (s = 'mailto:' + r)) : ((r = _t(n[1])), (s = r)),
        {
          type: 'link',
          raw: n[0],
          text: r,
          href: s,
          tokens: [
            {
              type: 'text',
              raw: r,
              text: r,
            },
          ],
        }
      );
    }
  }
  url(t) {
    var r;
    let n;
    if ((n = this.rules.inline.url.exec(t))) {
      let s, i;
      if (n[2] === '@') (s = _t(n[0])), (i = 'mailto:' + s);
      else {
        let a;
        do (a = n[0]), (n[0] = ((r = this.rules.inline._backpedal.exec(n[0])) == null ? void 0 : r[0]) ?? '');
        while (a !== n[0]);
        (s = _t(n[0])), n[1] === 'www.' ? (i = 'http://' + n[0]) : (i = n[0]);
      }
      return {
        type: 'link',
        raw: n[0],
        text: s,
        href: i,
        tokens: [
          {
            type: 'text',
            raw: s,
            text: s,
          },
        ],
      };
    }
  }
  inlineText(t) {
    const n = this.rules.inline.text.exec(t);
    if (n) {
      let r;
      return (
        this.lexer.state.inRawBlock ? (r = n[0]) : (r = _t(n[0])),
        {
          type: 'text',
          raw: n[0],
          text: r,
        }
      );
    }
  }
}
const R$ = /^(?: *(?:\n|$))+/,
  D$ = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  z$ = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  $i = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  H$ = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  og = /(?:[*+-]|\d{1,9}[.)])/,
  lg = Ne(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/)
    .replace(/bull/g, og)
    .replace(/blockCode/g, / {4}/)
    .replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/)
    .replace(/blockquote/g, / {0,3}>/)
    .replace(/heading/g, / {0,3}#{1,6}/)
    .replace(/html/g, / {0,3}<[^\n>]+>\n/)
    .getRegex(),
  Pu = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  V$ = /^[^\n]+/,
  Iu = /(?!\s*\])(?:\\.|[^\[\]\\])+/,
  F$ = Ne(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/)
    .replace('label', Iu)
    .replace('title', /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/)
    .getRegex(),
  B$ = Ne(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/)
    .replace(/bull/g, og)
    .getRegex(),
  So =
    'address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul',
  Mu = /<!--(?:-?>|[\s\S]*?(?:-->|$))/,
  j$ = Ne(
    '^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))',
    'i',
  )
    .replace('comment', Mu)
    .replace('tag', So)
    .replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/)
    .getRegex(),
  cg = Ne(Pu)
    .replace('hr', $i)
    .replace('heading', ' {0,3}#{1,6}(?:\\s|$)')
    .replace('|lheading', '')
    .replace('|table', '')
    .replace('blockquote', ' {0,3}>')
    .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
    .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
    .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
    .replace('tag', So)
    .getRegex(),
  W$ = Ne(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/)
    .replace('paragraph', cg)
    .getRegex(),
  Nu = {
    blockquote: W$,
    code: D$,
    def: F$,
    fences: z$,
    heading: H$,
    hr: $i,
    html: j$,
    lheading: lg,
    list: B$,
    newline: R$,
    paragraph: cg,
    table: Us,
    text: V$,
  },
  qh = Ne('^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)')
    .replace('hr', $i)
    .replace('heading', ' {0,3}#{1,6}(?:\\s|$)')
    .replace('blockquote', ' {0,3}>')
    .replace('code', ' {4}[^\\n]')
    .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
    .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
    .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
    .replace('tag', So)
    .getRegex(),
  U$ = {
    ...Nu,
    table: qh,
    paragraph: Ne(Pu)
      .replace('hr', $i)
      .replace('heading', ' {0,3}#{1,6}(?:\\s|$)')
      .replace('|lheading', '')
      .replace('table', qh)
      .replace('blockquote', ' {0,3}>')
      .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
      .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
      .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
      .replace('tag', So)
      .getRegex(),
  },
  q$ = {
    ...Nu,
    html: Ne(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`)
      .replace('comment', Mu)
      .replace(/tag/g, '(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b')
      .getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: Us,
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: Ne(Pu)
      .replace('hr', $i)
      .replace(
        'heading',
        ` *#{1,6} *[^
]`,
      )
      .replace('lheading', lg)
      .replace('|table', '')
      .replace('blockquote', ' {0,3}>')
      .replace('|fences', '')
      .replace('|list', '')
      .replace('|html', '')
      .replace('|tag', '')
      .getRegex(),
  },
  ug = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  K$ = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  fg = /^( {2,}|\\)\n(?!\s*$)/,
  G$ = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  Oi = '\\p{P}\\p{S}',
  Y$ = Ne(/^((?![*_])[\spunctuation])/, 'u')
    .replace(/punctuation/g, Oi)
    .getRegex(),
  X$ = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,
  Q$ = Ne(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, 'u')
    .replace(/punct/g, Oi)
    .getRegex(),
  J$ = Ne(
    '^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])',
    'gu',
  )
    .replace(/punct/g, Oi)
    .getRegex(),
  Z$ = Ne(
    '^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])',
    'gu',
  )
    .replace(/punct/g, Oi)
    .getRegex(),
  eO = Ne(/\\([punct])/, 'gu')
    .replace(/punct/g, Oi)
    .getRegex(),
  tO = Ne(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/)
    .replace('scheme', /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/)
    .replace('email', /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/)
    .getRegex(),
  nO = Ne(Mu).replace('(?:-->|$)', '-->').getRegex(),
  rO = Ne('^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>')
    .replace('comment', nO)
    .replace('attribute', /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/)
    .getRegex(),
  Na = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,
  sO = Ne(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/)
    .replace('label', Na)
    .replace('href', /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/)
    .replace('title', /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/)
    .getRegex(),
  dg = Ne(/^!?\[(label)\]\[(ref)\]/)
    .replace('label', Na)
    .replace('ref', Iu)
    .getRegex(),
  hg = Ne(/^!?\[(ref)\](?:\[\])?/)
    .replace('ref', Iu)
    .getRegex(),
  iO = Ne('reflink|nolink(?!\\()', 'g').replace('reflink', dg).replace('nolink', hg).getRegex(),
  Ru = {
    _backpedal: Us,
    anyPunctuation: eO,
    autolink: tO,
    blockSkip: X$,
    br: fg,
    code: K$,
    del: Us,
    emStrongLDelim: Q$,
    emStrongRDelimAst: J$,
    emStrongRDelimUnd: Z$,
    escape: ug,
    link: sO,
    nolink: hg,
    punctuation: Y$,
    reflink: dg,
    reflinkSearch: iO,
    tag: rO,
    text: G$,
    url: Us,
  },
  aO = {
    ...Ru,
    link: Ne(/^!?\[(label)\]\((.*?)\)/)
      .replace('label', Na)
      .getRegex(),
    reflink: Ne(/^!?\[(label)\]\s*\[([^\]]*)\]/)
      .replace('label', Na)
      .getRegex(),
  },
  pc = {
    ...Ru,
    escape: Ne(ug).replace('])', '~|])').getRegex(),
    url: Ne(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, 'i')
      .replace('email', /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/)
      .getRegex(),
    _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
  },
  oO = {
    ...pc,
    br: Ne(fg).replace('{2,}', '*').getRegex(),
    text: Ne(pc.text)
      .replace('\\b_', '\\b_| {2,}\\n')
      .replace(/\{2,\}/g, '*')
      .getRegex(),
  },
  ra = {
    normal: Nu,
    gfm: U$,
    pedantic: q$,
  },
  Cs = {
    normal: Ru,
    gfm: pc,
    breaks: oO,
    pedantic: aO,
  };
class $t {
  constructor(t) {
    Re(this, 'tokens');
    Re(this, 'options');
    Re(this, 'state');
    Re(this, 'tokenizer');
    Re(this, 'inlineQueue');
    (this.tokens = []),
      (this.tokens.links = Object.create(null)),
      (this.options = t || Lr),
      (this.options.tokenizer = this.options.tokenizer || new Ma()),
      (this.tokenizer = this.options.tokenizer),
      (this.tokenizer.options = this.options),
      (this.tokenizer.lexer = this),
      (this.inlineQueue = []),
      (this.state = {
        inLink: !1,
        inRawBlock: !1,
        top: !0,
      });
    const n = {
      block: ra.normal,
      inline: Cs.normal,
    };
    this.options.pedantic ? ((n.block = ra.pedantic), (n.inline = Cs.pedantic)) : this.options.gfm && ((n.block = ra.gfm), this.options.breaks ? (n.inline = Cs.breaks) : (n.inline = Cs.gfm)),
      (this.tokenizer.rules = n);
  }
  static get rules() {
    return {
      block: ra,
      inline: Cs,
    };
  }
  static lex(t, n) {
    return new $t(n).lex(t);
  }
  static lexInline(t, n) {
    return new $t(n).inlineTokens(t);
  }
  lex(t) {
    (t = t.replace(
      /\r\n|\r/g,
      `
`,
    )),
      this.blockTokens(t, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      const r = this.inlineQueue[n];
      this.inlineTokens(r.src, r.tokens);
    }
    return (this.inlineQueue = []), this.tokens;
  }
  blockTokens(t, n = [], r = !1) {
    this.options.pedantic ? (t = t.replace(/\t/g, '    ').replace(/^ +$/gm, '')) : (t = t.replace(/^( *)(\t+)/gm, (o, l, u) => l + '    '.repeat(u.length)));
    let s, i, a;
    for (; t; )
      if (
        !(
          this.options.extensions &&
          this.options.extensions.block &&
          this.options.extensions.block.some((o) =>
            (s = o.call(
              {
                lexer: this,
              },
              t,
              n,
            ))
              ? ((t = t.substring(s.raw.length)), n.push(s), !0)
              : !1,
          )
        )
      ) {
        if ((s = this.tokenizer.space(t))) {
          (t = t.substring(s.raw.length)),
            s.raw.length === 1 && n.length > 0
              ? (n[n.length - 1].raw += `
`)
              : n.push(s);
          continue;
        }
        if ((s = this.tokenizer.code(t))) {
          (t = t.substring(s.raw.length)),
            (i = n[n.length - 1]),
            i && (i.type === 'paragraph' || i.type === 'text')
              ? ((i.raw +=
                  `
` + s.raw),
                (i.text +=
                  `
` + s.text),
                (this.inlineQueue[this.inlineQueue.length - 1].src = i.text))
              : n.push(s);
          continue;
        }
        if ((s = this.tokenizer.fences(t))) {
          (t = t.substring(s.raw.length)), n.push(s);
          continue;
        }
        if ((s = this.tokenizer.heading(t))) {
          (t = t.substring(s.raw.length)), n.push(s);
          continue;
        }
        if ((s = this.tokenizer.hr(t))) {
          (t = t.substring(s.raw.length)), n.push(s);
          continue;
        }
        if ((s = this.tokenizer.blockquote(t))) {
          (t = t.substring(s.raw.length)), n.push(s);
          continue;
        }
        if ((s = this.tokenizer.list(t))) {
          (t = t.substring(s.raw.length)), n.push(s);
          continue;
        }
        if ((s = this.tokenizer.html(t))) {
          (t = t.substring(s.raw.length)), n.push(s);
          continue;
        }
        if ((s = this.tokenizer.def(t))) {
          (t = t.substring(s.raw.length)),
            (i = n[n.length - 1]),
            i && (i.type === 'paragraph' || i.type === 'text')
              ? ((i.raw +=
                  `
` + s.raw),
                (i.text +=
                  `
` + s.raw),
                (this.inlineQueue[this.inlineQueue.length - 1].src = i.text))
              : this.tokens.links[s.tag] ||
                (this.tokens.links[s.tag] = {
                  href: s.href,
                  title: s.title,
                });
          continue;
        }
        if ((s = this.tokenizer.table(t))) {
          (t = t.substring(s.raw.length)), n.push(s);
          continue;
        }
        if ((s = this.tokenizer.lheading(t))) {
          (t = t.substring(s.raw.length)), n.push(s);
          continue;
        }
        if (((a = t), this.options.extensions && this.options.extensions.startBlock)) {
          let o = 1 / 0;
          const l = t.slice(1);
          let u;
          this.options.extensions.startBlock.forEach((c) => {
            (u = c.call(
              {
                lexer: this,
              },
              l,
            )),
              typeof u == 'number' && u >= 0 && (o = Math.min(o, u));
          }),
            o < 1 / 0 && o >= 0 && (a = t.substring(0, o + 1));
        }
        if (this.state.top && (s = this.tokenizer.paragraph(a))) {
          (i = n[n.length - 1]),
            r && (i == null ? void 0 : i.type) === 'paragraph'
              ? ((i.raw +=
                  `
` + s.raw),
                (i.text +=
                  `
` + s.text),
                this.inlineQueue.pop(),
                (this.inlineQueue[this.inlineQueue.length - 1].src = i.text))
              : n.push(s),
            (r = a.length !== t.length),
            (t = t.substring(s.raw.length));
          continue;
        }
        if ((s = this.tokenizer.text(t))) {
          (t = t.substring(s.raw.length)),
            (i = n[n.length - 1]),
            i && i.type === 'text'
              ? ((i.raw +=
                  `
` + s.raw),
                (i.text +=
                  `
` + s.text),
                this.inlineQueue.pop(),
                (this.inlineQueue[this.inlineQueue.length - 1].src = i.text))
              : n.push(s);
          continue;
        }
        if (t) {
          const o = 'Infinite loop on byte: ' + t.charCodeAt(0);
          if (this.options.silent) {
            console.error(o);
            break;
          } else throw new Error(o);
        }
      }
    return (this.state.top = !0), n;
  }
  inline(t, n = []) {
    return (
      this.inlineQueue.push({
        src: t,
        tokens: n,
      }),
      n
    );
  }
  inlineTokens(t, n = []) {
    let r,
      s,
      i,
      a = t,
      o,
      l,
      u;
    if (this.tokens.links) {
      const c = Object.keys(this.tokens.links);
      if (c.length > 0)
        for (; (o = this.tokenizer.rules.inline.reflinkSearch.exec(a)) != null; )
          c.includes(o[0].slice(o[0].lastIndexOf('[') + 1, -1)) && (a = a.slice(0, o.index) + '[' + 'a'.repeat(o[0].length - 2) + ']' + a.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (o = this.tokenizer.rules.inline.blockSkip.exec(a)) != null; ) a = a.slice(0, o.index) + '[' + 'a'.repeat(o[0].length - 2) + ']' + a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (o = this.tokenizer.rules.inline.anyPunctuation.exec(a)) != null; ) a = a.slice(0, o.index) + '++' + a.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; t; )
      if (
        (l || (u = ''),
        (l = !1),
        !(
          this.options.extensions &&
          this.options.extensions.inline &&
          this.options.extensions.inline.some((c) =>
            (r = c.call(
              {
                lexer: this,
              },
              t,
              n,
            ))
              ? ((t = t.substring(r.raw.length)), n.push(r), !0)
              : !1,
          )
        ))
      ) {
        if ((r = this.tokenizer.escape(t))) {
          (t = t.substring(r.raw.length)), n.push(r);
          continue;
        }
        if ((r = this.tokenizer.tag(t))) {
          (t = t.substring(r.raw.length)), (s = n[n.length - 1]), s && r.type === 'text' && s.type === 'text' ? ((s.raw += r.raw), (s.text += r.text)) : n.push(r);
          continue;
        }
        if ((r = this.tokenizer.link(t))) {
          (t = t.substring(r.raw.length)), n.push(r);
          continue;
        }
        if ((r = this.tokenizer.reflink(t, this.tokens.links))) {
          (t = t.substring(r.raw.length)), (s = n[n.length - 1]), s && r.type === 'text' && s.type === 'text' ? ((s.raw += r.raw), (s.text += r.text)) : n.push(r);
          continue;
        }
        if ((r = this.tokenizer.emStrong(t, a, u))) {
          (t = t.substring(r.raw.length)), n.push(r);
          continue;
        }
        if ((r = this.tokenizer.codespan(t))) {
          (t = t.substring(r.raw.length)), n.push(r);
          continue;
        }
        if ((r = this.tokenizer.br(t))) {
          (t = t.substring(r.raw.length)), n.push(r);
          continue;
        }
        if ((r = this.tokenizer.del(t))) {
          (t = t.substring(r.raw.length)), n.push(r);
          continue;
        }
        if ((r = this.tokenizer.autolink(t))) {
          (t = t.substring(r.raw.length)), n.push(r);
          continue;
        }
        if (!this.state.inLink && (r = this.tokenizer.url(t))) {
          (t = t.substring(r.raw.length)), n.push(r);
          continue;
        }
        if (((i = t), this.options.extensions && this.options.extensions.startInline)) {
          let c = 1 / 0;
          const f = t.slice(1);
          let h;
          this.options.extensions.startInline.forEach((m) => {
            (h = m.call(
              {
                lexer: this,
              },
              f,
            )),
              typeof h == 'number' && h >= 0 && (c = Math.min(c, h));
          }),
            c < 1 / 0 && c >= 0 && (i = t.substring(0, c + 1));
        }
        if ((r = this.tokenizer.inlineText(i))) {
          (t = t.substring(r.raw.length)),
            r.raw.slice(-1) !== '_' && (u = r.raw.slice(-1)),
            (l = !0),
            (s = n[n.length - 1]),
            s && s.type === 'text' ? ((s.raw += r.raw), (s.text += r.text)) : n.push(r);
          continue;
        }
        if (t) {
          const c = 'Infinite loop on byte: ' + t.charCodeAt(0);
          if (this.options.silent) {
            console.error(c);
            break;
          } else throw new Error(c);
        }
      }
    return n;
  }
}
class Ra {
  constructor(t) {
    Re(this, 'options');
    Re(this, 'parser');
    this.options = t || Lr;
  }
  space(t) {
    return '';
  }
  code({ text: t, lang: n, escaped: r }) {
    var a;
    const s = (a = (n || '').match(/^\S*/)) == null ? void 0 : a[0],
      i =
        t.replace(/\n$/, '') +
        `
`;
    return s
      ? '<pre><code class="language-' +
          _t(s) +
          '">' +
          (r ? i : _t(i, !0)) +
          `</code></pre>
`
      : '<pre><code>' +
          (r ? i : _t(i, !0)) +
          `</code></pre>
`;
  }
  blockquote({ tokens: t }) {
    return `<blockquote>
${this.parser.parse(t)}</blockquote>
`;
  }
  html({ text: t }) {
    return t;
  }
  heading({ tokens: t, depth: n }) {
    return `<h${n}>${this.parser.parseInline(t)}</h${n}>
`;
  }
  hr(t) {
    return `<hr>
`;
  }
  list(t) {
    const n = t.ordered,
      r = t.start;
    let s = '';
    for (let o = 0; o < t.items.length; o++) {
      const l = t.items[o];
      s += this.listitem(l);
    }
    const i = n ? 'ol' : 'ul',
      a = n && r !== 1 ? ' start="' + r + '"' : '';
    return (
      '<' +
      i +
      a +
      `>
` +
      s +
      '</' +
      i +
      `>
`
    );
  }
  listitem(t) {
    let n = '';
    if (t.task) {
      const r = this.checkbox({
        checked: !!t.checked,
      });
      t.loose
        ? t.tokens.length > 0 && t.tokens[0].type === 'paragraph'
          ? ((t.tokens[0].text = r + ' ' + t.tokens[0].text),
            t.tokens[0].tokens && t.tokens[0].tokens.length > 0 && t.tokens[0].tokens[0].type === 'text' && (t.tokens[0].tokens[0].text = r + ' ' + t.tokens[0].tokens[0].text))
          : t.tokens.unshift({
              type: 'text',
              raw: r + ' ',
              text: r + ' ',
            })
        : (n += r + ' ');
    }
    return (
      (n += this.parser.parse(t.tokens, !!t.loose)),
      `<li>${n}</li>
`
    );
  }
  checkbox({ checked: t }) {
    return '<input ' + (t ? 'checked="" ' : '') + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: t }) {
    return `<p>${this.parser.parseInline(t)}</p>
`;
  }
  table(t) {
    let n = '',
      r = '';
    for (let i = 0; i < t.header.length; i++) r += this.tablecell(t.header[i]);
    n += this.tablerow({
      text: r,
    });
    let s = '';
    for (let i = 0; i < t.rows.length; i++) {
      const a = t.rows[i];
      r = '';
      for (let o = 0; o < a.length; o++) r += this.tablecell(a[o]);
      s += this.tablerow({
        text: r,
      });
    }
    return (
      s && (s = `<tbody>${s}</tbody>`),
      `<table>
<thead>
` +
        n +
        `</thead>
` +
        s +
        `</table>
`
    );
  }
  tablerow({ text: t }) {
    return `<tr>
${t}</tr>
`;
  }
  tablecell(t) {
    const n = this.parser.parseInline(t.tokens),
      r = t.header ? 'th' : 'td';
    return (
      (t.align ? `<${r} align="${t.align}">` : `<${r}>`) +
      n +
      `</${r}>
`
    );
  }
  strong({ tokens: t }) {
    return `<strong>${this.parser.parseInline(t)}</strong>`;
  }
  em({ tokens: t }) {
    return `<em>${this.parser.parseInline(t)}</em>`;
  }
  codespan({ text: t }) {
    return `<code>${t}</code>`;
  }
  br(t) {
    return '<br>';
  }
  del({ tokens: t }) {
    return `<del>${this.parser.parseInline(t)}</del>`;
  }
  link({ href: t, title: n, tokens: r }) {
    const s = this.parser.parseInline(r),
      i = jh(t);
    if (i === null) return s;
    t = i;
    let a = '<a href="' + t + '"';
    return n && (a += ' title="' + n + '"'), (a += '>' + s + '</a>'), a;
  }
  image({ href: t, title: n, text: r }) {
    const s = jh(t);
    if (s === null) return r;
    t = s;
    let i = `<img src="${t}" alt="${r}"`;
    return n && (i += ` title="${n}"`), (i += '>'), i;
  }
  text(t) {
    return 'tokens' in t && t.tokens ? this.parser.parseInline(t.tokens) : t.text;
  }
}
class Du {
  strong({ text: t }) {
    return t;
  }
  em({ text: t }) {
    return t;
  }
  codespan({ text: t }) {
    return t;
  }
  del({ text: t }) {
    return t;
  }
  html({ text: t }) {
    return t;
  }
  text({ text: t }) {
    return t;
  }
  link({ text: t }) {
    return '' + t;
  }
  image({ text: t }) {
    return '' + t;
  }
  br() {
    return '';
  }
}
class Ot {
  constructor(t) {
    Re(this, 'options');
    Re(this, 'renderer');
    Re(this, 'textRenderer');
    (this.options = t || Lr),
      (this.options.renderer = this.options.renderer || new Ra()),
      (this.renderer = this.options.renderer),
      (this.renderer.options = this.options),
      (this.renderer.parser = this),
      (this.textRenderer = new Du());
  }
  static parse(t, n) {
    return new Ot(n).parse(t);
  }
  static parseInline(t, n) {
    return new Ot(n).parseInline(t);
  }
  parse(t, n = !0) {
    let r = '';
    for (let s = 0; s < t.length; s++) {
      const i = t[s];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[i.type]) {
        const o = i,
          l = this.options.extensions.renderers[o.type].call(
            {
              parser: this,
            },
            o,
          );
        if (l !== !1 || !['space', 'hr', 'heading', 'code', 'table', 'blockquote', 'list', 'html', 'paragraph', 'text'].includes(o.type)) {
          r += l || '';
          continue;
        }
      }
      const a = i;
      switch (a.type) {
        case 'space': {
          r += this.renderer.space(a);
          continue;
        }
        case 'hr': {
          r += this.renderer.hr(a);
          continue;
        }
        case 'heading': {
          r += this.renderer.heading(a);
          continue;
        }
        case 'code': {
          r += this.renderer.code(a);
          continue;
        }
        case 'table': {
          r += this.renderer.table(a);
          continue;
        }
        case 'blockquote': {
          r += this.renderer.blockquote(a);
          continue;
        }
        case 'list': {
          r += this.renderer.list(a);
          continue;
        }
        case 'html': {
          r += this.renderer.html(a);
          continue;
        }
        case 'paragraph': {
          r += this.renderer.paragraph(a);
          continue;
        }
        case 'text': {
          let o = a,
            l = this.renderer.text(o);
          for (; s + 1 < t.length && t[s + 1].type === 'text'; )
            (o = t[++s]),
              (l +=
                `
` + this.renderer.text(o));
          n
            ? (r += this.renderer.paragraph({
                type: 'paragraph',
                raw: l,
                text: l,
                tokens: [
                  {
                    type: 'text',
                    raw: l,
                    text: l,
                  },
                ],
              }))
            : (r += l);
          continue;
        }
        default: {
          const o = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent) return console.error(o), '';
          throw new Error(o);
        }
      }
    }
    return r;
  }
  parseInline(t, n) {
    n = n || this.renderer;
    let r = '';
    for (let s = 0; s < t.length; s++) {
      const i = t[s];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[i.type]) {
        const o = this.options.extensions.renderers[i.type].call(
          {
            parser: this,
          },
          i,
        );
        if (o !== !1 || !['escape', 'html', 'link', 'image', 'strong', 'em', 'codespan', 'br', 'del', 'text'].includes(i.type)) {
          r += o || '';
          continue;
        }
      }
      const a = i;
      switch (a.type) {
        case 'escape': {
          r += n.text(a);
          break;
        }
        case 'html': {
          r += n.html(a);
          break;
        }
        case 'link': {
          r += n.link(a);
          break;
        }
        case 'image': {
          r += n.image(a);
          break;
        }
        case 'strong': {
          r += n.strong(a);
          break;
        }
        case 'em': {
          r += n.em(a);
          break;
        }
        case 'codespan': {
          r += n.codespan(a);
          break;
        }
        case 'br': {
          r += n.br(a);
          break;
        }
        case 'del': {
          r += n.del(a);
          break;
        }
        case 'text': {
          r += n.text(a);
          break;
        }
        default: {
          const o = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent) return console.error(o), '';
          throw new Error(o);
        }
      }
    }
    return r;
  }
}
class qs {
  constructor(t) {
    Re(this, 'options');
    Re(this, 'block');
    this.options = t || Lr;
  }
  preprocess(t) {
    return t;
  }
  postprocess(t) {
    return t;
  }
  processAllTokens(t) {
    return t;
  }
  provideLexer() {
    return this.block ? $t.lex : $t.lexInline;
  }
  provideParser() {
    return this.block ? Ot.parse : Ot.parseInline;
  }
}
Re(qs, 'passThroughHooks', new Set(['preprocess', 'postprocess', 'processAllTokens']));
class lO {
  constructor(...t) {
    Re(this, 'defaults', Lu());
    Re(this, 'options', this.setOptions);
    Re(this, 'parse', this.parseMarkdown(!0));
    Re(this, 'parseInline', this.parseMarkdown(!1));
    Re(this, 'Parser', Ot);
    Re(this, 'Renderer', Ra);
    Re(this, 'TextRenderer', Du);
    Re(this, 'Lexer', $t);
    Re(this, 'Tokenizer', Ma);
    Re(this, 'Hooks', qs);
    this.use(...t);
  }
  walkTokens(t, n) {
    var s, i;
    let r = [];
    for (const a of t)
      switch (((r = r.concat(n.call(this, a))), a.type)) {
        case 'table': {
          const o = a;
          for (const l of o.header) r = r.concat(this.walkTokens(l.tokens, n));
          for (const l of o.rows) for (const u of l) r = r.concat(this.walkTokens(u.tokens, n));
          break;
        }
        case 'list': {
          const o = a;
          r = r.concat(this.walkTokens(o.items, n));
          break;
        }
        default: {
          const o = a;
          (i = (s = this.defaults.extensions) == null ? void 0 : s.childTokens) != null && i[o.type]
            ? this.defaults.extensions.childTokens[o.type].forEach((l) => {
                const u = o[l].flat(1 / 0);
                r = r.concat(this.walkTokens(u, n));
              })
            : o.tokens && (r = r.concat(this.walkTokens(o.tokens, n)));
        }
      }
    return r;
  }
  use(...t) {
    const n = this.defaults.extensions || {
      renderers: {},
      childTokens: {},
    };
    return (
      t.forEach((r) => {
        const s = {
          ...r,
        };
        if (
          ((s.async = this.defaults.async || s.async || !1),
          r.extensions &&
            (r.extensions.forEach((i) => {
              if (!i.name) throw new Error('extension name required');
              if ('renderer' in i) {
                const a = n.renderers[i.name];
                a
                  ? (n.renderers[i.name] = function (...o) {
                      let l = i.renderer.apply(this, o);
                      return l === !1 && (l = a.apply(this, o)), l;
                    })
                  : (n.renderers[i.name] = i.renderer);
              }
              if ('tokenizer' in i) {
                if (!i.level || (i.level !== 'block' && i.level !== 'inline')) throw new Error("extension level must be 'block' or 'inline'");
                const a = n[i.level];
                a ? a.unshift(i.tokenizer) : (n[i.level] = [i.tokenizer]),
                  i.start &&
                    (i.level === 'block'
                      ? n.startBlock
                        ? n.startBlock.push(i.start)
                        : (n.startBlock = [i.start])
                      : i.level === 'inline' && (n.startInline ? n.startInline.push(i.start) : (n.startInline = [i.start])));
              }
              'childTokens' in i && i.childTokens && (n.childTokens[i.name] = i.childTokens);
            }),
            (s.extensions = n)),
          r.renderer)
        ) {
          const i = this.defaults.renderer || new Ra(this.defaults);
          for (const a in r.renderer) {
            if (!(a in i)) throw new Error(`renderer '${a}' does not exist`);
            if (['options', 'parser'].includes(a)) continue;
            const o = a,
              l = r.renderer[o],
              u = i[o];
            i[o] = (...c) => {
              let f = l.apply(i, c);
              return f === !1 && (f = u.apply(i, c)), f || '';
            };
          }
          s.renderer = i;
        }
        if (r.tokenizer) {
          const i = this.defaults.tokenizer || new Ma(this.defaults);
          for (const a in r.tokenizer) {
            if (!(a in i)) throw new Error(`tokenizer '${a}' does not exist`);
            if (['options', 'rules', 'lexer'].includes(a)) continue;
            const o = a,
              l = r.tokenizer[o],
              u = i[o];
            i[o] = (...c) => {
              let f = l.apply(i, c);
              return f === !1 && (f = u.apply(i, c)), f;
            };
          }
          s.tokenizer = i;
        }
        if (r.hooks) {
          const i = this.defaults.hooks || new qs();
          for (const a in r.hooks) {
            if (!(a in i)) throw new Error(`hook '${a}' does not exist`);
            if (['options', 'block'].includes(a)) continue;
            const o = a,
              l = r.hooks[o],
              u = i[o];
            qs.passThroughHooks.has(a)
              ? (i[o] = (c) => {
                  if (this.defaults.async) return Promise.resolve(l.call(i, c)).then((h) => u.call(i, h));
                  const f = l.call(i, c);
                  return u.call(i, f);
                })
              : (i[o] = (...c) => {
                  let f = l.apply(i, c);
                  return f === !1 && (f = u.apply(i, c)), f;
                });
          }
          s.hooks = i;
        }
        if (r.walkTokens) {
          const i = this.defaults.walkTokens,
            a = r.walkTokens;
          s.walkTokens = function (o) {
            let l = [];
            return l.push(a.call(this, o)), i && (l = l.concat(i.call(this, o))), l;
          };
        }
        this.defaults = {
          ...this.defaults,
          ...s,
        };
      }),
      this
    );
  }
  setOptions(t) {
    return (
      (this.defaults = {
        ...this.defaults,
        ...t,
      }),
      this
    );
  }
  lexer(t, n) {
    return $t.lex(t, n ?? this.defaults);
  }
  parser(t, n) {
    return Ot.parse(t, n ?? this.defaults);
  }
  parseMarkdown(t) {
    return (r, s) => {
      const i = {
          ...s,
        },
        a = {
          ...this.defaults,
          ...i,
        },
        o = this.onError(!!a.silent, !!a.async);
      if (this.defaults.async === !0 && i.async === !1)
        return o(new Error('marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.'));
      if (typeof r > 'u' || r === null) return o(new Error('marked(): input parameter is undefined or null'));
      if (typeof r != 'string') return o(new Error('marked(): input parameter is of type ' + Object.prototype.toString.call(r) + ', string expected'));
      a.hooks && ((a.hooks.options = a), (a.hooks.block = t));
      const l = a.hooks ? a.hooks.provideLexer() : t ? $t.lex : $t.lexInline,
        u = a.hooks ? a.hooks.provideParser() : t ? Ot.parse : Ot.parseInline;
      if (a.async)
        return Promise.resolve(a.hooks ? a.hooks.preprocess(r) : r)
          .then((c) => l(c, a))
          .then((c) => (a.hooks ? a.hooks.processAllTokens(c) : c))
          .then((c) => (a.walkTokens ? Promise.all(this.walkTokens(c, a.walkTokens)).then(() => c) : c))
          .then((c) => u(c, a))
          .then((c) => (a.hooks ? a.hooks.postprocess(c) : c))
          .catch(o);
      try {
        a.hooks && (r = a.hooks.preprocess(r));
        let c = l(r, a);
        a.hooks && (c = a.hooks.processAllTokens(c)), a.walkTokens && this.walkTokens(c, a.walkTokens);
        let f = u(c, a);
        return a.hooks && (f = a.hooks.postprocess(f)), f;
      } catch (c) {
        return o(c);
      }
    };
  }
  onError(t, n) {
    return (r) => {
      if (
        ((r.message += `
Please report this to https://github.com/markedjs/marked.`),
        t)
      ) {
        const s = '<p>An error occurred:</p><pre>' + _t(r.message + '', !0) + '</pre>';
        return n ? Promise.resolve(s) : s;
      }
      if (n) return Promise.reject(r);
      throw r;
    };
  }
}
const xr = new lO();
function Ie(e, t) {
  return xr.parse(e, t);
}
Ie.options = Ie.setOptions = function (e) {
  return xr.setOptions(e), (Ie.defaults = xr.defaults), sg(Ie.defaults), Ie;
};
Ie.getDefaults = Lu;
Ie.defaults = Lr;
Ie.use = function (...e) {
  return xr.use(...e), (Ie.defaults = xr.defaults), sg(Ie.defaults), Ie;
};
Ie.walkTokens = function (e, t) {
  return xr.walkTokens(e, t);
};
Ie.parseInline = xr.parseInline;
Ie.Parser = Ot;
Ie.parser = Ot.parse;
Ie.Renderer = Ra;
Ie.TextRenderer = Du;
Ie.Lexer = $t;
Ie.lexer = $t.lex;
Ie.Tokenizer = Ma;
Ie.Hooks = qs;
Ie.parse = Ie;
Ie.options;
Ie.setOptions;
Ie.use;
Ie.walkTokens;
Ie.parseInline;
Ot.parse;
$t.lex;
const cO = (e) => (vi('data-v-e8ed4958'), (e = e()), bi(), e),
  uO = {
    key: 0,
    class: 'd-flex flex-column gap-2',
  },
  fO = {
    class: 'mb-3',
  },
  dO = ['href'],
  hO = {
    class: 'text-bold',
  },
  pO = {
    class: 'p-2 m-0 ba-panel log-entry',
  },
  mO = ['innerHTML'],
  gO = {
    class: 'text-muted mt-1',
  },
  vO = {
    key: 1,
  },
  bO = cO(() =>
    w(
      'p',
      {
        class: 'text-negative text-center',
      },
      'Error retrieving changelog.',
      -1,
    ),
  ),
  _O = [bO],
  yO = {
    class: 'd-flex justify-content-center',
  },
  wO = {
    class: 'btn-pill large',
    href: 'https://github.com/SchaleDB/SchaleDB/releases',
    target: '_blank',
  },
  EO = {
    class: 'label',
  },
  xO = {
    __name: 'Changelog',
    setup(e) {
      const t = ce([]),
        n = ce(!1);
      return (
        fetch('https://api.github.com/repos/SchaleDB/SchaleDB/releases?per_page=10', {
          method: 'GET',
          headers: {},
        }).then((r) => {
          r.ok
            ? r.json().then((s) => {
                t.value = s;
              })
            : (n.value = !0);
        }),
        (r, s) => {
          const i = gt('fa');
          return (
            be(),
            ke(
              Ke,
              null,
              [
                n.value
                  ? (be(), ke('div', vO, _O))
                  : (be(),
                    ke('div', uO, [
                      (be(!0),
                      ke(
                        Ke,
                        null,
                        no(
                          t.value,
                          (a) => (
                            be(),
                            ke('div', fO, [
                              w(
                                'a',
                                {
                                  href: a.html_url,
                                  target: '_blank',
                                  class: 'text-emphasis',
                                },
                                [w('h3', hO, G(a.name), 1)],
                                8,
                                dO,
                              ),
                              w('div', pO, [
                                w(
                                  'div',
                                  {
                                    innerHTML: E(Ie).parse(a.body),
                                  },
                                  null,
                                  8,
                                  mO,
                                ),
                                w('small', gO, G(new Date(a.published_at).toLocaleDateString()), 1),
                              ]),
                            ])
                          ),
                        ),
                        256,
                      )),
                    ])),
                w('div', yO, [
                  w('a', wO, [
                    w('span', EO, [
                      _e('View Full Changelog'),
                      F(
                        i,
                        {
                          class: 'ms-2',
                          icon: E(m7),
                        },
                        null,
                        8,
                        ['icon'],
                      ),
                    ]),
                  ]),
                ]),
              ],
              64,
            )
          );
        }
      );
    },
  },
  SO = ki(xO, [['__scopeId', 'data-v-e8ed4958']]);
const AO = {
    class: 'navbar fixed-top navbar-expand-lg navbar-dark bg-dark drop-shadow',
  },
  CO = {
    class: 'container-fluid',
  },
  TO = {
    'class': 'btn btn-menu ms-1 me-2',
    'type': 'button',
    'data-bs-toggle': 'offcanvas',
    'data-bs-target': '#sidebar-menu',
  },
  kO = {
    class: 'dropdown-header',
  },
  $O = {
    class: 'label',
  },
  OO = {
    id: 'navbar-version',
    class: 'text-muted',
  },
  LO = {
    __name: 'NavbarHeader',
    setup(e) {
      const t = B8(F8),
        n = t.smaller('lg'),
        r = t.greater('sm'),
        s = ce(null),
        i = ce(null),
        { y: a } = J8(),
        o = xe(() => n.value && a.value > 250),
        l = H8(),
        u = Q8('Control');
      Fd('/', c, {
        target: document,
      }),
        Fd(
          'k',
          (p) => {
            u.value && c(p);
          },
          {
            target: document,
          },
        );
      function c(p) {
        var _;
        ((_ = l.value) == null ? void 0 : _.tagName) !== 'INPUT' && !document.body.classList.contains('modal-open') && (p.preventDefault(), s.value.show());
      }
      function f() {
        window.scroll({
          top: 0,
          behavior: 'smooth',
        });
      }
      Ae().settings;
      const h = ie().config.data,
        m = xe(() => h.Regions.map((p, _) => st('ServerName', _))),
        g = '1.2.0',
        d = h.build;
      return (p, _) => {
        const v = gt('fa'),
          C = gt('inline-svg'),
          S = gt('RouterLink');
        return (
          be(),
          ke('nav', AO, [
            w('div', CO, [
              w('button', TO, [
                F(
                  v,
                  {
                    icon: E(s7),
                  },
                  null,
                  8,
                  ['icon'],
                ),
              ]),
              F(
                S,
                {
                  to: '/home',
                  class: 'navbar-logo ps-2 me-auto d-flex align-items-center',
                  translate: 'no',
                },
                {
                  default: ve(() => [
                    F(
                      C,
                      {
                        class: 'logo',
                        src: '/images/logo_small.svg',
                      },
                      null,
                      8,
                      ['src'],
                    ),
                  ]),
                  _: 1,
                },
              ),
              F(EC),
              Za(
                F(
                  Os,
                  {
                    'class': 'me-2',
                    'items': m.value,
                    'selected-index': E(Ae)().settings.server,
                    'onUpdate:selectedIndex': _[0] || (_[0] = (P) => (E(Ae)().settings.server = P)),
                  },
                  {
                    listHeader: ve(() => [w('li', null, [w('h6', kO, G(E(Y)('settings_server')), 1)])]),
                    button: ve((P) => [
                      w('span', $O, [
                        F(
                          v,
                          {
                            icon: E(um),
                            class: 'me-2',
                          },
                          null,
                          8,
                          ['icon'],
                        ),
                        _e(' ' + G(P.item), 1),
                      ]),
                    ]),
                    _: 1,
                  },
                  8,
                  ['items', 'selected-index'],
                ),
                [[Ap, E(r)]],
              ),
              F(
                Jc,
                {
                  name: 'slide-fade',
                },
                {
                  default: ve(() => [
                    o.value
                      ? (be(),
                        ke(
                          'button',
                          {
                            key: 0,
                            class: 'btn btn-dark me-2',
                            onClick: f,
                          },
                          [
                            F(
                              v,
                              {
                                icon: E(r7),
                              },
                              null,
                              8,
                              ['icon'],
                            ),
                          ],
                        ))
                      : yt('', !0),
                  ]),
                  _: 1,
                },
              ),
              F(
                al,
                {
                  'no-animation': '',
                  'no-header': '',
                  'no-padding': '',
                  'class': 'btn btn-dark me-2',
                  'ref_key': 'searchModal',
                  'ref': s,
                },
                {
                  trigger: ve(() => [
                    F(
                      v,
                      {
                        icon: E(hm),
                      },
                      null,
                      8,
                      ['icon'],
                    ),
                  ]),
                  body: ve(({ close: P }) => [
                    F(
                      cT,
                      {
                        close: P,
                      },
                      null,
                      8,
                      ['close'],
                    ),
                  ]),
                  _: 1,
                },
                512,
              ),
              F(
                al,
                {
                  'fixed-height': '',
                  'class': 'btn btn-dark',
                },
                {
                  trigger: ve(() => [
                    F(
                      v,
                      {
                        icon: E(nc),
                      },
                      null,
                      8,
                      ['icon'],
                    ),
                  ]),
                  title: ve(() => [
                    F(
                      v,
                      {
                        icon: E(nc),
                        class: 'me-1',
                      },
                      null,
                      8,
                      ['icon'],
                    ),
                    _e(' ' + G(E(Y)('settings')), 1),
                  ]),
                  body: ve(() => [F($$)]),
                  footer: ve(() => [w('small', OO, G(E(g)) + '-' + G(E(d)), 1)]),
                  _: 1,
                },
              ),
              F(
                al,
                {
                  'class': 'd-none',
                  'ref_key': 'changelogModal',
                  'ref': i,
                  'fixed-height': '',
                  'size': 'lg',
                },
                {
                  trigger: ve(() => [
                    F(
                      v,
                      {
                        icon: E(rc),
                      },
                      null,
                      8,
                      ['icon'],
                    ),
                  ]),
                  title: ve(() => [
                    F(
                      v,
                      {
                        icon: E(rc),
                        class: 'me-2',
                      },
                      null,
                      8,
                      ['icon'],
                    ),
                    _e(G(E(Y)('changelog')), 1),
                  ]),
                  body: ve(() => [F(SO)]),
                  _: 1,
                },
                512,
              ),
            ]),
          ])
        );
      };
    },
  };
const PO = {
    key: 0,
  },
  IO = w(
    'div',
    {
      id: 'ba-background-back',
      class: 'background',
      style: {
        position: 'fixed',
      },
    },
    null,
    -1,
  ),
  MO = w(
    'div',
    {
      id: 'ba-background-front',
      class: 'background active',
      style: {
        position: 'fixed',
      },
    },
    null,
    -1,
  ),
  NO = w(
    'div',
    {
      id: 'bg-overlay',
      style: {
        position: 'fixed',
      },
    },
    null,
    -1,
  ),
  RO = {
    key: 1,
    class: 'error d-flex w-100 align-items-center justify-content-center',
  },
  DO = w(
    'img',
    {
      class: 'mb-2',
      src: U2,
    },
    null,
    -1,
  ),
  zO = {
    class: 'label',
  },
  HO = {
    key: 1,
  },
  VO = {
    class: 'error d-flex w-100 align-items-center justify-content-center',
  },
  FO = w(
    'img',
    {
      class: 'mb-2',
      src: U2,
    },
    null,
    -1,
  ),
  BO = w('p', null, 'Something went wrong.', -1),
  jO = {
    class: 'label',
  },
  WO = {
    __name: 'App',
    setup(e) {
      const t = Ae().settings,
        n = ce(!1),
        r = Vr('(min-width: 1800px)'),
        s = cm(),
        i = ce(''),
        a = ce(!1),
        o = ce(null);
      Yr('background', i),
        hc(),
        rg(),
        ng(),
        Mn.configure({
          showSpinner: !1,
        }),
        document.body.classList.add(`font-${t.language}`),
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', hc),
        on(() => {
          ET();
        }),
        ie()
          .ensureData('localization', 'config')
          .then(
            () => {
              n.value = !0;
            },
            () => {
              console.error('Unable to load config and/or localization data'), (a.value = !0);
            },
          );
      const u = xe(() => r.value && t.screenMode == 'full');
      Yr('useThreeCol', u),
        s.afterEach((f, h, m) => {
          Gt(m, Zl.aborted) ? ((a.value = !0), Mn.done(), (o.value = f.path)) : (a.value = !1);
        });
      function c() {
        (a.value = !1),
          o.value
            ? s.push({
                path: o.value,
              })
            : window.location.reload();
      }
      return (f, h) => {
        const m = gt('fa');
        return n.value
          ? (be(),
            ke('div', PO, [
              IO,
              MO,
              NO,
              w(
                'div',
                {
                  id: 'ba-content',
                  class: le([
                    'p-0',
                    {
                      'container-xxl limit-width': E(t).screenMode == 'limited',
                      'container-fluid full-width': E(t).screenMode == 'full',
                      'three-column': u.value,
                    },
                  ]),
                },
                [
                  w('header', null, [F(LO)]),
                  w('main', null, [
                    a.value
                      ? (be(),
                        ke('div', RO, [
                          DO,
                          w('p', null, G(E(Y)('error_msg')), 1),
                          w(
                            'button',
                            {
                              class: 'btn-pill large',
                              onClick: c,
                            },
                            [
                              w('span', zO, [
                                F(
                                  m,
                                  {
                                    icon: E(oh),
                                    class: 'me-2',
                                  },
                                  null,
                                  8,
                                  ['icon'],
                                ),
                                _e(G(E(Y)('error_retry')), 1),
                              ]),
                            ],
                          ),
                        ]))
                      : (be(),
                        sn(E(lm), {
                          key: 0,
                        })),
                  ]),
                ],
                2,
              ),
            ]))
          : a.value
            ? (be(),
              ke('div', HO, [
                w('div', VO, [
                  FO,
                  BO,
                  w(
                    'button',
                    {
                      class: 'btn-pill large',
                      onClick: c,
                    },
                    [
                      w('span', jO, [
                        F(
                          m,
                          {
                            icon: E(oh),
                            class: 'me-2',
                          },
                          null,
                          8,
                          ['icon'],
                        ),
                        _e('Retry '),
                      ]),
                    ],
                  ),
                ]),
              ]))
            : yt('', !0);
      };
    },
  },
  UO = 'modulepreload',
  qO = function (e) {
    return '/' + e;
  },
  Kh = {},
  rt = function (t, n, r) {
    if (!n || n.length === 0) return t();
    const s = document.getElementsByTagName('link');
    return Promise.all(
      n.map((i) => {
        if (((i = qO(i)), i in Kh)) return;
        Kh[i] = !0;
        const a = i.endsWith('.css'),
          o = a ? '[rel="stylesheet"]' : '';
        if (!!r)
          for (let c = s.length - 1; c >= 0; c--) {
            const f = s[c];
            if (f.href === i && (!a || f.rel === 'stylesheet')) return;
          }
        else if (document.querySelector(`link[href="${i}"]${o}`)) return;
        const u = document.createElement('link');
        if (((u.rel = a ? 'stylesheet' : UO), a || ((u.as = 'script'), (u.crossOrigin = '')), (u.href = i), document.head.appendChild(u), a))
          return new Promise((c, f) => {
            u.addEventListener('load', c), u.addEventListener('error', () => f(new Error(`Unable to preload CSS for ${i}`)));
          });
      }),
    )
      .then(() => t())
      .catch((i) => {
        const a = new Event('vite:preloadError', {
          cancelable: !0,
        });
        if (((a.payload = i), window.dispatchEvent(a), !a.defaultPrevented)) throw i;
      });
  },
  ol = Ai('itemstore', {
    state: () => {
      const e = {
          common: {
            Rarity: {
              N: !1,
              R: !1,
              SR: !1,
              SSR: !1,
            },
            Craftable: !1,
            Fusion: !1,
          },
          item: {
            Category: {
              Material: !1,
              Coin: !1,
              CharacterExpGrowth: !1,
              Favor: !1,
              SecretStone: !1,
              Consumable: !1,
              Collectible: !1,
            },
            SubCategory: {
              Artifact: !1,
              CDItem: !1,
              BookItem: !1,
            },
            StageDrop: !1,
            Shop: !1,
            ShopCategory: [],
            ShowImmediateUse: !1,
            ShowExpired: !1,
          },
          furniture: {
            Category: {
              Furnitures: !1,
              Interiors: !1,
              Decorations: !1,
            },
            SubCategory: {
              Wallpaper: !1,
              Floor: !1,
              Background: !1,
              Table: !1,
              Chair: !1,
              Closet: !1,
              FloorDecoration: !1,
              WallDecoration: !1,
              Prop: !1,
              HomeAppliance: !1,
              Bed: !1,
              FurnitureEtc: !1,
            },
            SetGroupId: {
              0: !1,
            },
            FurnitureInteraction: !1,
          },
          equipment: {
            Category: {
              Exp: !1,
              WeaponExpGrowth: !1,
              Hat: !1,
              Gloves: !1,
              Shoes: !1,
              Bag: !1,
              Badge: !1,
              Hairpin: !1,
              Charm: !1,
              Necklace: !1,
              Watch: !1,
            },
            Tier: {},
          },
        },
        t = ie().config.data.Regions[0];
      for (let s = 100; s <= t.FurnitureSetMax; s++) e.furniture.SetGroupId[s] = !1;
      for (let s = 1; s <= t.EquipmentMaxLevel[0]; s++) e.equipment.Tier[s] = !1;
      const n = ce(
          kt(
            'itemListFilters',
            {
              activeTab: 'item',
              searchTerm: '',
              filters: e,
              lastPaths: {
                item: 1,
                furniture: 1,
                equipment: 1,
              },
            },
            {
              mergeDefaults: (s, i) => tn(i, s),
            },
          ),
        ),
        r = ce(
          kt(
            'itemListSort',
            {
              SortKey: 'Id',
              Mode: 1,
            },
            {
              mergeDefaults: (s, i) => tn(i, s),
            },
          ),
        );
      return {
        listFilters: n,
        listSort: r,
      };
    },
    getters: {
      activeFilters: (e) => {
        const t = {};
        for (const n in e.listFilters.filters) {
          t[n] = {};
          for (const r in e.listFilters.filters[n])
            if (typeof e.listFilters.filters[n][r] == 'object') {
              const s = [];
              for (const i in e.listFilters.filters[n][r]) e.listFilters.filters[n][r][i] === !0 && s.push(isNaN(Number(i)) ? i : Number(i));
              s.length && (t[n][r] = s);
            } else e.listFilters.filters[n][r] === !0 && (t[n][r] = [!0]);
        }
        return t;
      },
      activeFilterCount() {
        const e = this.activeFilters;
        return Object.keys(e.common).length + Object.keys(e[this.listFilters.activeTab]).length + (this.listFilters.searchTerm ? 1 : 0);
      },
    },
    actions: {
      clearFilters(...e) {
        this.listFilters.searchTerm = '';
        for (const t of ['common', ...e])
          for (const n in this.listFilters.filters[t])
            if (typeof this.listFilters.filters[t][n] == 'object') for (const r in this.listFilters.filters[t][n]) this.listFilters.filters[t][n][r] = !1;
            else this.listFilters.filters[t][n] = !1;
      },
    },
  }),
  sr = Ai('miscstore', {
    state: () => {
      const e = ce(
          kt(
            'stageState',
            {
              reverseSortOrder: !1,
              searchTerm: '',
              tab: 'Campaign',
              lastPath: 1011101,
            },
            {
              mergeDefaults: (s, i) => tn(i, s),
            },
          ),
        ),
        t = ce(
          kt(
            'eventState',
            {
              reverseSortOrder: !1,
              searchTerm: '',
              eventBonusOwnedOnly: !1,
              lastEvent: 801,
              lastStage: 8012301,
            },
            {
              mergeDefaults: (s, i) => tn(i, s),
            },
          ),
        ),
        n = ce(
          kt(
            'craftingState',
            {
              listUntranslated: !1,
              listChance: !1,
              simpleView: !0,
              searchTerm: '',
              lastPath: 1,
            },
            {
              mergeDefaults: (s, i) => tn(i, s),
            },
          ),
        ),
        r = ce(
          kt(
            'raidState',
            {
              reverseSortOrder: !1,
              tab: 'Raid',
              lastRaid: 'binah',
              lastDrill: 1,
            },
            {
              mergeDefaults: (s, i) => tn(i, s),
            },
          ),
        );
      return {
        stageState: e,
        eventState: t,
        craftingState: n,
        raidState: r,
      };
    },
  }),
  zu = Zw({
    history: gw('/'),
    routes: [
      {
        path: '/',
        alias: '/home',
        name: 'home',
        component: () =>
          rt(
            () => import('./HomeView-dcb545e1.js'),
            [
              'assets/HomeView-dcb545e1.js',
              'assets/Translate-9eb11c95.js',
              'assets/EventCard-fdb9a4c4.js',
              'assets/TimeAttackCard-fac93f62.js',
              'assets/Type_Defense-88bb0a76.js',
              'assets/Type_Attack-a131040d.js',
              'assets/TimeAttackCard-278a07d4.css',
              'assets/StudentListItem-66ff8143.js',
              'assets/Icon-381f1d6f.js',
              'assets/StudentListItem-f82fc634.css',
              'assets/StudentIcon-70a4612c.js',
              'assets/Tooltip-c3fa681b.js',
              'assets/HomeView-e022ae75.css',
            ],
          ),
        meta: {
          requiredJson: ['students', 'raids', 'events'],
        },
      },
      {
        path: '/student',
        name: 'studentlistview',
        component: () =>
          rt(
            () => import('./StudentListView-2b9ac640.js'),
            [
              'assets/StudentListView-2b9ac640.js',
              'assets/StudentListFilters-87ff90b1.js',
              'assets/Icon-381f1d6f.js',
              'assets/BooleanButton-c77cfd7b.js',
              'assets/index-872fa5a8.js',
              'assets/ListSort-9b27b60f.js',
              'assets/ListSort-56cb099f.css',
              'assets/StudentListFilters-744ab99a.css',
              'assets/StudentListItem-66ff8143.js',
              'assets/StudentListItem-f82fc634.css',
              'assets/StudentListView-f07f196c.css',
            ],
          ),
        meta: {
          requiredJson: ['students', 'summons', 'items', 'equipment'],
        },
      },
      {
        path: '/student/:id',
        name: 'studentview',
        component: () =>
          rt(
            () => import('./StudentView-655617c4.js'),
            [
              'assets/StudentView-655617c4.js',
              'assets/StudentGifts-973abb7a.js',
              'assets/BooleanButton-c77cfd7b.js',
              'assets/index-872fa5a8.js',
              'assets/ItemIcon-be1f9f08.js',
              'assets/Tooltip-c3fa681b.js',
              'assets/sum-b09b9bb4.js',
              'assets/StudentListModal-107fa8e6.js',
              'assets/StudentListFilters-87ff90b1.js',
              'assets/Icon-381f1d6f.js',
              'assets/ListSort-9b27b60f.js',
              'assets/ListSort-56cb099f.css',
              'assets/StudentListFilters-744ab99a.css',
              'assets/Collapse-dabe16a5.js',
              'assets/TypeHelper-29fa0b91.js',
              'assets/TypeHelper-ab6f2226.css',
              'assets/Translate-9eb11c95.js',
              'assets/StudentListItem-66ff8143.js',
              'assets/StudentListItem-f82fc634.css',
              'assets/StudentListModal-2e6b8131.css',
              'assets/SkillTags-ae348bf8.css',
              'assets/StatsTable-a39d8028.js',
              'assets/StatsTable-4cc680ab.css',
              'assets/Type_Attack-a131040d.js',
              'assets/Type_Defense-88bb0a76.js',
              'assets/StudentView-7a970ab9.css',
            ],
          ),
        meta: {
          requiredJson: ['students', 'summons', 'enemies', 'raids', 'items', 'equipment', 'furniture', 'currency'],
        },
      },
      {
        path: '/calculator',
        name: 'calculatorview',
        component: () =>
          rt(
            () => import('./CalculatorView-e65dcc36.js'),
            [
              'assets/CalculatorView-e65dcc36.js',
              'assets/Type_Attack-a131040d.js',
              'assets/Type_Defense-88bb0a76.js',
              'assets/StudentListFilters-87ff90b1.js',
              'assets/Icon-381f1d6f.js',
              'assets/BooleanButton-c77cfd7b.js',
              'assets/index-872fa5a8.js',
              'assets/ListSort-9b27b60f.js',
              'assets/ListSort-56cb099f.css',
              'assets/StudentListFilters-744ab99a.css',
              'assets/TypeHelper-29fa0b91.js',
              'assets/Tooltip-c3fa681b.js',
              'assets/TypeHelper-ab6f2226.css',
              'assets/Collapse-dabe16a5.js',
              'assets/StudentListModal-107fa8e6.js',
              'assets/sum-b09b9bb4.js',
              'assets/Translate-9eb11c95.js',
              'assets/StudentListItem-66ff8143.js',
              'assets/StudentListItem-f82fc634.css',
              'assets/StudentListModal-2e6b8131.css',
              'assets/SkillTags-ae348bf8.css',
              'assets/StatsTable-a39d8028.js',
              'assets/StatsTable-4cc680ab.css',
              'assets/EnemyCard-8e112f8b.js',
              'assets/EnemyCard-b44f7e37.css',
              'assets/CalculatorView-38ac6201.css',
            ],
          ),
        meta: {
          requiredJson: ['students', 'equipment', 'summons', 'items', 'enemies', 'stages', 'events', 'raids'],
        },
      },
      {
        path: '/item',
        name: 'itemlistview',
        component: () =>
          rt(
            () => import('./ItemListView-399a45b5.js'),
            [
              'assets/ItemListView-399a45b5.js',
              'assets/ItemList-8f64e710.js',
              'assets/ListSort-9b27b60f.js',
              'assets/Icon-381f1d6f.js',
              'assets/ListSort-56cb099f.css',
              'assets/ItemList-b010ea63.css',
              'assets/ItemListView-0053009c.css',
            ],
          ),
        meta: {
          requiredJson: ['students', 'items', 'equipment', 'furniture', 'currency', 'shops'],
        },
      },
      {
        path: '/furniture',
        name: 'furniturelistview',
        component: () =>
          rt(
            () => import('./ItemListView-399a45b5.js'),
            [
              'assets/ItemListView-399a45b5.js',
              'assets/ItemList-8f64e710.js',
              'assets/ListSort-9b27b60f.js',
              'assets/Icon-381f1d6f.js',
              'assets/ListSort-56cb099f.css',
              'assets/ItemList-b010ea63.css',
              'assets/ItemListView-0053009c.css',
            ],
          ),
        meta: {
          requiredJson: ['students', 'items', 'equipment', 'furniture', 'currency', 'shops'],
        },
      },
      {
        path: '/equipment',
        name: 'equipmentlistview',
        component: () =>
          rt(
            () => import('./ItemListView-399a45b5.js'),
            [
              'assets/ItemListView-399a45b5.js',
              'assets/ItemList-8f64e710.js',
              'assets/ListSort-9b27b60f.js',
              'assets/Icon-381f1d6f.js',
              'assets/ListSort-56cb099f.css',
              'assets/ItemList-b010ea63.css',
              'assets/ItemListView-0053009c.css',
            ],
          ),
        meta: {
          requiredJson: ['students', 'items', 'equipment', 'furniture', 'currency', 'shops'],
        },
      },
      {
        path: '/item/:id',
        name: 'itemview',
        component: () =>
          rt(
            () => import('./ItemView-f0d1287e.js'),
            [
              'assets/ItemView-f0d1287e.js',
              'assets/ItemList-8f64e710.js',
              'assets/ListSort-9b27b60f.js',
              'assets/Icon-381f1d6f.js',
              'assets/ListSort-56cb099f.css',
              'assets/ItemList-b010ea63.css',
              'assets/StatsTable-a39d8028.js',
              'assets/StatsTable-4cc680ab.css',
              'assets/StudentIcon-70a4612c.js',
              'assets/Tooltip-c3fa681b.js',
              'assets/ItemIcon-be1f9f08.js',
              'assets/sum-b09b9bb4.js',
              'assets/StageCard-bc1571a8.js',
              'assets/Type_Defense-88bb0a76.js',
              'assets/StageCard-88ce0fbc.css',
              'assets/Collapse-dabe16a5.js',
              'assets/StudentGifts-973abb7a.js',
              'assets/ItemView-6e253a83.css',
            ],
          ),
        meta: {
          requiredJson: ['students', 'items', 'groups', 'equipment', 'stages', 'furniture', 'currency', 'crafting', 'shops', 'schedule'],
        },
      },
      {
        path: '/equipment/:id',
        name: 'equipmentview',
        component: () =>
          rt(
            () => import('./ItemView-f0d1287e.js'),
            [
              'assets/ItemView-f0d1287e.js',
              'assets/ItemList-8f64e710.js',
              'assets/ListSort-9b27b60f.js',
              'assets/Icon-381f1d6f.js',
              'assets/ListSort-56cb099f.css',
              'assets/ItemList-b010ea63.css',
              'assets/StatsTable-a39d8028.js',
              'assets/StatsTable-4cc680ab.css',
              'assets/StudentIcon-70a4612c.js',
              'assets/Tooltip-c3fa681b.js',
              'assets/ItemIcon-be1f9f08.js',
              'assets/sum-b09b9bb4.js',
              'assets/StageCard-bc1571a8.js',
              'assets/Type_Defense-88bb0a76.js',
              'assets/StageCard-88ce0fbc.css',
              'assets/Collapse-dabe16a5.js',
              'assets/StudentGifts-973abb7a.js',
              'assets/ItemView-6e253a83.css',
            ],
          ),
        meta: {
          requiredJson: ['students', 'items', 'groups', 'equipment', 'stages', 'furniture', 'currency', 'crafting', 'shops', 'schedule'],
        },
      },
      {
        path: '/furniture/:id',
        name: 'furnitureview',
        component: () =>
          rt(
            () => import('./ItemView-f0d1287e.js'),
            [
              'assets/ItemView-f0d1287e.js',
              'assets/ItemList-8f64e710.js',
              'assets/ListSort-9b27b60f.js',
              'assets/Icon-381f1d6f.js',
              'assets/ListSort-56cb099f.css',
              'assets/ItemList-b010ea63.css',
              'assets/StatsTable-a39d8028.js',
              'assets/StatsTable-4cc680ab.css',
              'assets/StudentIcon-70a4612c.js',
              'assets/Tooltip-c3fa681b.js',
              'assets/ItemIcon-be1f9f08.js',
              'assets/sum-b09b9bb4.js',
              'assets/StageCard-bc1571a8.js',
              'assets/Type_Defense-88bb0a76.js',
              'assets/StageCard-88ce0fbc.css',
              'assets/Collapse-dabe16a5.js',
              'assets/StudentGifts-973abb7a.js',
              'assets/ItemView-6e253a83.css',
            ],
          ),
        meta: {
          requiredJson: ['students', 'items', 'groups', 'equipment', 'stages', 'furniture', 'currency', 'crafting', 'shops', 'schedule'],
        },
      },
      {
        path: '/stage/:stageid?',
        name: 'stageview',
        component: () =>
          rt(
            () => import('./StageView-57952e54.js'),
            [
              'assets/StageView-57952e54.js',
              'assets/StageCard-bc1571a8.js',
              'assets/sum-b09b9bb4.js',
              'assets/Type_Defense-88bb0a76.js',
              'assets/StageCard-88ce0fbc.css',
              'assets/StageRender-a9917652.js',
              'assets/ItemIcon-be1f9f08.js',
              'assets/Tooltip-c3fa681b.js',
              'assets/TypeHelper-29fa0b91.js',
              'assets/TypeHelper-ab6f2226.css',
              'assets/BooleanButton-c77cfd7b.js',
              'assets/index-872fa5a8.js',
              'assets/EnemyList-d6eca5fe.js',
              'assets/EnemyCard-8e112f8b.js',
              'assets/EnemyCard-b44f7e37.css',
              'assets/StatsTable-a39d8028.js',
              'assets/Icon-381f1d6f.js',
              'assets/StatsTable-4cc680ab.css',
              'assets/Translate-9eb11c95.js',
              'assets/StageRewards-c0bd80b1.js',
              'assets/StudentIcon-70a4612c.js',
              'assets/StageRender-5312307e.css',
              'assets/StageView-b6e3f1cf.css',
            ],
          ),
        meta: {
          requiredJson: ['students', 'stages', 'enemies', 'items', 'groups', 'equipment', 'furniture', 'currency'],
        },
      },
      {
        path: '/event/:eventid?',
        name: 'eventview',
        component: () => rt(() => import('./EventView-620d7dc4.js'), ['assets/EventView-620d7dc4.js', 'assets/EventCard-fdb9a4c4.js', 'assets/EventView-a131891d.css']),
        meta: {
          requiredJson: ['students', 'events', 'stages', 'enemies', 'items', 'groups', 'equipment', 'furniture', 'currency'],
        },
        children: [
          {
            path: 'stage/:stageid?',
            name: 'eventStageView',
            component: () =>
              rt(
                () => import('./EventStages-7aab7c98.js'),
                [
                  'assets/EventStages-7aab7c98.js',
                  'assets/StageCard-bc1571a8.js',
                  'assets/sum-b09b9bb4.js',
                  'assets/Type_Defense-88bb0a76.js',
                  'assets/StageCard-88ce0fbc.css',
                  'assets/StageRender-a9917652.js',
                  'assets/ItemIcon-be1f9f08.js',
                  'assets/Tooltip-c3fa681b.js',
                  'assets/TypeHelper-29fa0b91.js',
                  'assets/TypeHelper-ab6f2226.css',
                  'assets/BooleanButton-c77cfd7b.js',
                  'assets/index-872fa5a8.js',
                  'assets/EnemyList-d6eca5fe.js',
                  'assets/EnemyCard-8e112f8b.js',
                  'assets/EnemyCard-b44f7e37.css',
                  'assets/StatsTable-a39d8028.js',
                  'assets/Icon-381f1d6f.js',
                  'assets/StatsTable-4cc680ab.css',
                  'assets/Translate-9eb11c95.js',
                  'assets/StageRewards-c0bd80b1.js',
                  'assets/StudentIcon-70a4612c.js',
                  'assets/StageRender-5312307e.css',
                  'assets/EventStages-c7f62ea9.css',
                ],
              ),
          },
        ],
      },
      {
        path: '/crafting/:nodeid?',
        name: 'craftingview',
        component: () =>
          rt(
            () => import('./CraftingView-ae77f2e5.js'),
            [
              'assets/CraftingView-ae77f2e5.js',
              'assets/ItemIcon-be1f9f08.js',
              'assets/Tooltip-c3fa681b.js',
              'assets/sum-b09b9bb4.js',
              'assets/BooleanButton-c77cfd7b.js',
              'assets/index-872fa5a8.js',
              'assets/StageRewards-c0bd80b1.js',
              'assets/CraftingView-5495f590.css',
            ],
          ),
        meta: {
          requiredJson: ['crafting', 'students', 'items', 'groups', 'equipment', 'furniture', 'currency'],
        },
      },
      {
        path: '/raid/:id?',
        name: 'raidview',
        component: () =>
          rt(
            () => import('./RaidView-42c44e75.js'),
            [
              'assets/RaidView-42c44e75.js',
              'assets/TimeAttackCard-fac93f62.js',
              'assets/Type_Defense-88bb0a76.js',
              'assets/Type_Attack-a131040d.js',
              'assets/TimeAttackCard-278a07d4.css',
              'assets/TypeHelper-29fa0b91.js',
              'assets/Tooltip-c3fa681b.js',
              'assets/TypeHelper-ab6f2226.css',
              'assets/EnemyList-d6eca5fe.js',
              'assets/EnemyCard-8e112f8b.js',
              'assets/EnemyCard-b44f7e37.css',
              'assets/StatsTable-a39d8028.js',
              'assets/Icon-381f1d6f.js',
              'assets/StatsTable-4cc680ab.css',
              'assets/Translate-9eb11c95.js',
              'assets/ItemIcon-be1f9f08.js',
              'assets/sum-b09b9bb4.js',
              'assets/index-872fa5a8.js',
              'assets/StageRewards-c0bd80b1.js',
              'assets/RaidView-93360624.css',
              'assets/SkillTags-ae348bf8.css',
            ],
          ),
        meta: {
          requiredJson: ['raids', 'students', 'enemies', 'items', 'groups', 'equipment', 'furniture', 'currency'],
        },
      },
      {
        path: '/drill/:id?',
        name: 'timeattackview',
        component: () =>
          rt(
            () => import('./RaidView-42c44e75.js'),
            [
              'assets/RaidView-42c44e75.js',
              'assets/TimeAttackCard-fac93f62.js',
              'assets/Type_Defense-88bb0a76.js',
              'assets/Type_Attack-a131040d.js',
              'assets/TimeAttackCard-278a07d4.css',
              'assets/TypeHelper-29fa0b91.js',
              'assets/Tooltip-c3fa681b.js',
              'assets/TypeHelper-ab6f2226.css',
              'assets/EnemyList-d6eca5fe.js',
              'assets/EnemyCard-8e112f8b.js',
              'assets/EnemyCard-b44f7e37.css',
              'assets/StatsTable-a39d8028.js',
              'assets/Icon-381f1d6f.js',
              'assets/StatsTable-4cc680ab.css',
              'assets/Translate-9eb11c95.js',
              'assets/ItemIcon-be1f9f08.js',
              'assets/sum-b09b9bb4.js',
              'assets/index-872fa5a8.js',
              'assets/StageRewards-c0bd80b1.js',
              'assets/RaidView-93360624.css',
              'assets/SkillTags-ae348bf8.css',
            ],
          ),
        meta: {
          requiredJson: ['raids', 'students', 'enemies', 'items', 'groups', 'equipment', 'furniture', 'currency'],
        },
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: '/',
      },
    ],
    scrollBehavior(e, t, n) {
      if (n)
        return {
          top: n.top,
          behavior: 'instant',
        };
      if (e.name !== t.name)
        return {
          top: 0,
          behavior: 'instant',
        };
    },
  });
zu.beforeEach(async (e, t) => {
  var n, r;
  if (e.path == '/') {
    if (Object.keys(e.query).length) {
      if (e.query.chara)
        return {
          name: 'studentview',
          params: {
            id: e.query.chara.toLowerCase().replace('bunny', 'bunnygirl').replace('hotspring', 'onsen'),
          },
        };
      if (e.query.charaid)
        return {
          name: 'studentview',
          params: {
            id: e.query.charaid,
          },
        };
      if (e.query.item) {
        const s = parseInt(e.query.item);
        return s >= 1e6 && s < 2e6
          ? {
              name: 'furnitureview',
              params: {
                id: s - 1e6,
              },
            }
          : s >= 2e6 && s < 3e6
            ? {
                name: 'equipmentview',
                params: {
                  id: s - 2e6,
                },
              }
            : {
                name: 'itemview',
                params: {
                  id: s,
                },
              };
      } else {
        if (e.query.craftnode)
          return {
            name: 'craftingview',
            params: {
              nodeid: e.query.craftnode,
            },
          };
        if (e.query.stage) {
          const s = e.query.stage;
          return s < 7e6
            ? {
                name: 'stageview',
                params: {
                  stageid: s,
                },
              }
            : {
                name: 'eventStageView',
                params: {
                  eventid: e.query.stage.substring(0, 3),
                  stageid: s,
                },
              };
        } else if (e.query.raid) {
          const s = parseInt(e.query.raid);
          return s >= 1e3 && s < 8e5
            ? {
                name: 'timeattackview',
                params: {
                  id: s / 1e3,
                },
              }
            : {
                name: 'raidview',
                params: {
                  id: s,
                },
              };
        }
      }
    }
    return Ae().settings.restoreRoute && !t.name && Ae().settings.lastRoute != '/'
      ? {
          path: Ae().settings.lastRoute,
        }
      : {
          path: '/home',
        };
  } else if (Ae().settings.restorePage) {
    if (e.name == 'studentlistview' && !t.path.startsWith('/student'))
      return {
        name: 'studentview',
        params: {
          id: Ou().studentDisplay.PathLast,
        },
      };
    if (e.name == 'itemlistview' && !t.path.startsWith('/item') && t.name != 'furniturelistview' && t.name != 'equipmentlistview')
      return {
        name: 'itemview',
        params: {
          id: ol().listFilters.lastPaths.item,
        },
      };
    if (e.name == 'furniturelistview' && !t.path.startsWith('/furniture') && t.name != 'itemlistview' && t.name != 'equipmentlistview')
      return {
        name: 'furnitureview',
        params: {
          id: ol().listFilters.lastPaths.furniture,
        },
      };
    if (e.name == 'equipmentlistview' && !t.path.startsWith('/equipment') && t.name != 'itemlistview' && t.name != 'furniturelistview')
      return {
        name: 'equipmentview',
        params: {
          id: ol().listFilters.lastPaths.equipment,
        },
      };
    if (e.name == 'craftingview' && !e.params.nodeid && !t.path.startsWith('/crafting'))
      return {
        name: 'craftingview',
        params: {
          nodeid: sr().craftingState.lastPath,
        },
      };
    if (e.name == 'stageview' && !e.params.stageid && !t.path.startsWith('/stage'))
      return {
        name: 'stageview',
        params: {
          stageid: sr().stageState.lastPath,
        },
      };
    if (e.name == 'eventview' && !e.params.eventid && !t.path.startsWith('/event'))
      return {
        name: 'eventStageView',
        params: {
          eventid: sr().eventState.lastEvent,
          stageid: sr().eventState.lastStage,
        },
      };
    if (e.name == 'raidview' && !e.params.id && !t.path.startsWith('/raid') && !t.path.startsWith('/drill'))
      return sr().raidState.tab == 'TimeAttack'
        ? {
            name: 'timeattackview',
            params: {
              id: sr().raidState.lastDrill,
            },
          }
        : {
            name: 'raidview',
            params: {
              id: sr().raidState.lastRaid,
            },
          };
  }
  if ((((n = e.matched[0]) == null ? void 0 : n.name) != ((r = t.matched[0]) == null ? void 0 : r.name) && Mn.start(), e.meta.requiredJson))
    try {
      await ie().ensureData(...e.meta.requiredJson);
    } catch (s) {
      return console.error(s), !1;
    }
});
zu.afterEach((e) => {
  (Ae().settings.lastRoute = e.path), setTimeout(() => Mn.done(), 25);
});
function Gh(e) {
  return `
    <span class='ba-tooltip'>
        <div class='ba-tooltip-header m-0'>
            <div class='d-flex justify-content-center w-100'>
                <div class='ba-tooltip-title text-center fs-6'>${e}</div>
            </div>
        </div>
    </span>`;
}
const KO = {
    mounted(e, t) {
      t.value &&
        t.value != '' &&
        new en(e, {
          title: Gh(t.value),
          html: !0,
          trigger: 'hover',
        });
    },
    updated(e, t) {
      if (t.value != t.oldValue) {
        const n = en.getInstance(e);
        n && n.dispose(),
          t.value &&
            t.value != '' &&
            new en(e, {
              title: Gh(t.value),
              html: !0,
              trigger: 'hover',
            });
      }
    },
    unmounted(e) {
      const t = en.getInstance(e);
      t && t.dispose();
    },
  },
  Zn = L4(WO);
Zn.component('font-awesome-icon', $p);
Zn.component('fa', $p);
Zn.component('inline-svg', Q5);
G0.styleDefault = 'solid';
Zn.directive('tooltip', KO);
Zn.use(W5());
Zn.use(C8);
Zn.use(zu);
Zn.mount('#app');
export {
  AL as $,
  le as A,
  ve as B,
  sn as C,
  VP as D,
  yt as E,
  Ke as F,
  o3 as G,
  wp as H,
  jC as I,
  PL as J,
  eI as K,
  ZP as L,
  al as M,
  zL as N,
  NL as O,
  sC as P,
  iC as Q,
  rc as R,
  SO as S,
  vi as T,
  bi as U,
  Ou as V,
  Vr as W,
  tL as X,
  Za as Y,
  Ap as Z,
  ki as _,
  ie as a,
  XP as a$,
  GC as a0,
  oi as a1,
  iI as a2,
  lp as a3,
  mi as a4,
  UL as a5,
  o7 as a6,
  $L as a7,
  lh as a8,
  X2 as a9,
  qP as aA,
  hL as aB,
  wt as aC,
  cm as aD,
  LL as aE,
  WL as aF,
  dL as aG,
  pL as aH,
  fm as aI,
  L7 as aJ,
  m7 as aK,
  eP as aL,
  bL as aM,
  t7 as aN,
  FP as aO,
  qt as aP,
  Bs as aQ,
  Lm as aR,
  fI as aS,
  fs as aT,
  rL as aU,
  un as aV,
  yP as aW,
  YL as aX,
  Os as aY,
  lt as aZ,
  QP as a_,
  et as aa,
  on as ab,
  ii as ac,
  jL as ad,
  We as ae,
  Fh as af,
  KP as ag,
  CL as ah,
  Jt as ai,
  j3 as aj,
  q3 as ak,
  QO as al,
  GL as am,
  ch as an,
  GP as ao,
  kC as ap,
  io as aq,
  Qf as ar,
  hm as as,
  jP as at,
  VL as au,
  yL as av,
  WP as aw,
  gT as ax,
  HL as ay,
  vL as az,
  B8 as b,
  Yw as b$,
  mI as b0,
  uL as b1,
  BP as b2,
  uP as b3,
  fP as b4,
  FC as b5,
  dP as b6,
  zP as b7,
  NC as b8,
  _P as b9,
  fL as bA,
  JP as bB,
  xf as bC,
  JL as bD,
  i7 as bE,
  cL as bF,
  A7 as bG,
  _L as bH,
  CC as bI,
  ZO as bJ,
  oL as bK,
  IL as bL,
  pm as bM,
  pI as bN,
  nI as bO,
  Mt as bP,
  xT as bQ,
  b7 as bR,
  XO as bS,
  vP as bT,
  pP as bU,
  tI as bV,
  mP as bW,
  HP as bX,
  sP as bY,
  bP as bZ,
  hI as b_,
  RC as ba,
  IP as bb,
  DC as bc,
  Hh as bd,
  xP as be,
  Gn as bf,
  SL as bg,
  MP as bh,
  Xt as bi,
  PP as bj,
  sI as bk,
  ct as bl,
  tg as bm,
  Ai as bn,
  kt as bo,
  tn as bp,
  UP as bq,
  iP as br,
  W1 as bs,
  Ic as bt,
  YO as bu,
  O1 as bv,
  No as bw,
  kL as bx,
  dm as by,
  XL as bz,
  F8 as c,
  YP as c$,
  TC as c0,
  hP as c1,
  wL as c2,
  aP as c3,
  TL as c4,
  ol as c5,
  gP as c6,
  vp as c7,
  sh as c8,
  f7 as c9,
  eL as cA,
  Zm as cB,
  uI as cC,
  Vh as cD,
  ZL as cE,
  tP as cF,
  cP as cG,
  OC as cH,
  dI as cI,
  xv as cJ,
  cI as cK,
  P7 as cL,
  qL as cM,
  sL as cN,
  gL as cO,
  VC as cP,
  nP as cQ,
  rP as cR,
  LP as cS,
  $P as cT,
  OP as cU,
  wP as cV,
  lI as cW,
  aI as cX,
  AP as cY,
  CP as cZ,
  TP as c_,
  a7 as ca,
  $C as cb,
  PC as cc,
  IC as cd,
  xL as ce,
  FL as cf,
  lL as cg,
  QL as ch,
  iL as ci,
  ML as cj,
  BL as ck,
  KL as cl,
  DL as cm,
  mL as cn,
  RL as co,
  OL as cp,
  aL as cq,
  sr as cr,
  NP as cs,
  RP as ct,
  DP as cu,
  vs as cv,
  oI as cw,
  lP as cx,
  nL as cy,
  hh as cz,
  JO as d,
  EL as d0,
  _m as d1,
  vv as d2,
  en as d3,
  xe as e,
  kP as f,
  oP as g,
  EP as h,
  SP as i,
  MC as j,
  rI as k,
  Y as l,
  gt as m,
  ke as n,
  be as o,
  w as p,
  F as q,
  ce as r,
  E as s,
  st as t,
  Ae as u,
  um as v,
  Ze as w,
  _e as x,
  G as y,
  no as z,
};
