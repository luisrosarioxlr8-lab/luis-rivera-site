/* Luis Rivera site interactions: constellation, reveal, active nav. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var revObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { revObserver.observe(el); });
  }

  /* ---------- Active nav highlighting ---------- */
  var sections = document.querySelectorAll("main section[id], header[id]");
  var navMap = {};
  document.querySelectorAll(".navlinks a").forEach(function (a) {
    navMap[a.getAttribute("href").replace("#", "")] = a;
  });
  if ("IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = navMap[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          Object.keys(navMap).forEach(function (k) { navMap[k].classList.remove("active"); });
          link.classList.add("active");
        }
      });
    }, { threshold: 0.5, rootMargin: "-30% 0px -55% 0px" });
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ---------- Constellation background ---------- */
  var canvas = document.getElementById("constellation");
  if (!canvas || reduceMotion) return;
  var ctx = canvas.getContext("2d");
  var w, h, dpr, particles, mouse = { x: -999, y: -999 };

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = Math.floor(window.innerWidth * dpr);
    h = canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    var area = window.innerWidth * window.innerHeight;
    var count = Math.max(36, Math.min(90, Math.round(area / 18000)));
    particles = [];
    for (var i = 0; i < count; i++) {
      particles.push({
        x: rand(0, w), y: rand(0, h),
        vx: rand(-0.18, 0.18) * dpr, vy: rand(-0.18, 0.18) * dpr,
        r: rand(0.6, 1.7) * dpr
      });
    }
  }

  function step() {
    ctx.clearRect(0, 0, w, h);
    var linkDist = 130 * dpr;
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(32, 178, 166, 0.55)";
      ctx.fill();

      for (var j = i + 1; j < particles.length; j++) {
        var q = particles[j];
        var dx = p.x - q.x, dy = p.y - q.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < linkDist) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = "rgba(32, 178, 166, " + (0.12 * (1 - d / linkDist)) + ")";
          ctx.lineWidth = dpr * 0.6;
          ctx.stroke();
        }
      }

      var mdx = p.x - mouse.x, mdy = p.y - mouse.y;
      var md = Math.sqrt(mdx * mdx + mdy * mdy);
      if (md < 170 * dpr) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = "rgba(61, 213, 200, " + (0.18 * (1 - md / (170 * dpr))) + ")";
        ctx.lineWidth = dpr * 0.7;
        ctx.stroke();
      }
    }
    raf = requestAnimationFrame(step);
  }

  var raf;
  window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr;
  });
  window.addEventListener("mouseleave", function () { mouse.x = -999; mouse.y = -999; });

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(size, 180);
  });

  size();
  step();
})();
