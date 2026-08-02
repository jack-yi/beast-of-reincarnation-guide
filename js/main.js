// Beast of Reincarnation Guide - Interactive Script

document.addEventListener('DOMContentLoaded', function() {

  // === 返回顶部 ===
  const backTop = document.querySelector('.back-to-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('show', window.scrollY > 400);
    });
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === Tab 切换 ===
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.tab-group') || document;
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      group.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      const el = group.querySelector(`[data-tab-content="${target}"]`);
      if (el) el.classList.add('active');
    });
  });

  // === 搜索过滤 ===
  const searchInput = document.querySelector('.navbar-search input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      document.querySelectorAll('[data-searchable]').forEach(el => {
        const text = (el.dataset.searchable || '').toLowerCase();
        const match = !q || text.includes(q);
        el.style.display = match ? '' : 'none';
      });
    });
  }

  // === 卡片展开/折叠 ===
  document.querySelectorAll('.card[data-expandable]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') return;
      const detail = card.querySelector('.card-detail');
      if (detail) {
        detail.style.display = detail.style.display === 'none' ? 'block' : 'none';
      }
    });
  });

  // === 进度条动画 ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const target = fill.dataset.width;
        fill.style.width = target + '%';
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.progress-fill[data-width]').forEach(el => observer.observe(el));

  // === 移动端菜单 ===
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.navbar-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });
  }

  // === 当前页面高亮导航 ===
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // === 侧边栏高亮 ===
  document.querySelectorAll('.sidebar-link').forEach(link => {
    const hash = window.location.hash;
    if (hash && link.getAttribute('href') === hash) {
      link.classList.add('active');
    }
    link.addEventListener('click', () => {
      document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

});
