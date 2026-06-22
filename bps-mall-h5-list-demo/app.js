(function () {
  const { PRODUCTS, MAIN_CATS, SUB_CATS, PRODUCT_TITLE } = window.BPS_LIST_DATA;

  const state = {
    mode: 'showcase',
    screen: 'all',
    mainCat: 'living',
    favorites: new Set(),
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function parseRoute() {
    const hash = location.hash.replace(/^#\/?/, '');
    if (hash === 'all' || hash === 'category' || hash === 'list') {
      state.mode = 'single';
      state.screen = hash;
    } else {
      state.mode = 'showcase';
    }
  }

  function showToast(msg) {
    let el = $('#toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 1800);
  }

  function renderToolbar() {
    return `
      <div class="demo-toolbar">
        <a href="#/" class="${state.mode === 'showcase' ? 'active' : ''}">All Screens</a>
        <a href="#/all" class="${state.screen === 'all' && state.mode === 'single' ? 'active' : ''}">ALL List</a>
        <a href="#/category" class="${state.screen === 'category' && state.mode === 'single' ? 'active' : ''}">Category</a>
        <a href="#/list" class="${state.screen === 'list' && state.mode === 'single' ? 'active' : ''}">Subcategory List</a>
      </div>
    `;
  }

  function renderStatusBar() {
    return `
      <div class="status-bar">
        <span>10:00</span>
        <span class="status-icons">▮▮▮ ▮▮▮▮ 📶 🔋</span>
      </div>
    `;
  }

  function renderNavBar(opts = {}) {
    const { title = 'Products', back = false } = opts;
    return `
      <div class="nav-bar ${back ? 'back-mode' : ''}">
        ${back ? '<button type="button" class="nav-btn" data-action="back">‹</button>' : '<span></span>'}
        <div class="nav-title">${title}</div>
        <div class="nav-right">
          <button type="button" class="nav-btn">⋯</button>
          <button type="button" class="nav-btn nav-pill">◎</button>
        </div>
      </div>
    `;
  }

  function renderSearch(text = '') {
    return `
      <div class="search-row">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="${text ? '' : 'Search products'}" value="${text}" readonly />
          <span class="search-icon">🔍</span>
        </div>
      </div>
    `;
  }

  function renderTabs(active) {
    return `
      <div class="tab-row">
        <button type="button" class="tab-btn ${active === 'all' ? 'active' : ''}" data-screen="all">ALL</button>
        <button type="button" class="tab-btn ${active === 'category' ? 'active' : ''}" data-screen="category">Category</button>
      </div>
    `;
  }

  function renderChips(active, withMenu) {
    const chips = active === 'list'
      ? ['All Products', 'Entryway Cabinet', 'Shoe Cabinet']
      : ['New Arrivals', 'Bestsellers', '$101-$500', 'Wood...'];
    return `
      <div class="chip-row">
        ${chips.map((c, i) => `
          <button type="button" class="filter-chip ${i === 0 ? 'active' : ''}">${c}</button>
        `).join('')}
        ${withMenu ? '<button type="button" class="chip-menu">☰</button>' : ''}
      </div>
    `;
  }

  function renderProductCard(p) {
    const thumbs = p.gallery.slice(0, 3);
    return `
      <article class="product-card" data-id="${p.id}">
        <div class="card-img">
          <img class="product-img" src="${p.image}" alt="${PRODUCT_TITLE}" loading="lazy" />
          <div class="thumb-row">
            ${thumbs.map((t) => `<img class="dot-img" src="${t}" alt="" />`).join('')}
            <span class="more">+${p.images}</span>
          </div>
        </div>
        <div class="card-body">
          <div class="card-title-row">
            <h3 class="card-title">${PRODUCT_TITLE}</h3>
            <button type="button" class="fav-btn" data-fav="${p.id}">♡</button>
          </div>
          <div class="card-price">$${p.price.toFixed(2)} USD</div>
          <div class="card-meta">
            <span>Est. Del: ${p.estDel}</span>
            <span>MOQ: ${p.moq} pcs</span>
            <span>Item: ${p.item}</span>
          </div>
        </div>
      </article>
    `;
  }

  function renderProductGrid(count = 8) {
    return `
      <div class="product-grid">
        ${PRODUCTS.slice(0, count).map(renderProductCard).join('')}
      </div>
    `;
  }

  function renderBottomNav(active = 'products') {
    const items = [
      { id: 'home', label: 'Home', icon: '⌂' },
      { id: 'products', label: 'Products', icon: '▦' },
      { id: 'wishlist', label: 'Wishlist', icon: '♡' },
      { id: 'mine', label: 'Mine', icon: '☺' },
    ];
    return `
      <nav class="bottom-nav">
        ${items.map((item) => `
          <button type="button" class="${active === item.id ? 'active' : ''}">
            <span class="nav-icon">${item.icon}</span>
            <span>${item.label}</span>
          </button>
        `).join('')}
      </nav>
    `;
  }

  function renderAllScreen() {
    return `
      <div class="phone-shell">
        ${renderStatusBar()}
        ${renderNavBar({ title: 'Products' })}
        ${renderSearch()}
        ${renderTabs('all')}
        ${renderChips('all', false)}
        <div class="scroll-body">${renderProductGrid(10)}</div>
        ${renderBottomNav('products')}
      </div>
    `;
  }

  function renderCategoryScreen() {
    const subs = SUB_CATS.living || [];
    return `
      <div class="phone-shell">
        ${renderStatusBar()}
        ${renderNavBar({ title: 'Products' })}
        ${renderSearch()}
        ${renderTabs('category')}
        <div class="category-layout">
          <div class="cat-sidebar">
            ${MAIN_CATS.map((c) => `
              <button type="button" class="cat-side-item ${c.id === state.mainCat ? 'active' : ''}" data-main-cat="${c.id}">${c.name}</button>
            `).join('')}
          </div>
          <div class="subcat-grid">
            ${subs.map((s) => `
              <button type="button" class="subcat-item" data-subcat="${s.slug || ''}">
                <img class="subcat-img" src="${s.img}" alt="${s.name}" />
                <div class="subcat-name">${s.name}</div>
              </button>
            `).join('')}
          </div>
        </div>
        ${renderBottomNav('products')}
      </div>
    `;
  }

  function renderListScreen() {
    return `
      <div class="phone-shell">
        ${renderStatusBar()}
        ${renderNavBar({ title: 'Storage Cabinet', back: true })}
        ${renderSearch('Storage Cabinet')}
        ${renderChips('list', true)}
        <div class="scroll-body">${renderProductGrid(8)}</div>
        ${renderBottomNav('products')}
      </div>
    `;
  }

  function renderPhone(label, content) {
    return `
      <div>
        <div class="phone-label">${label}</div>
        <div class="phone-frame">${content}</div>
      </div>
    `;
  }

  function renderShowcase() {
    return `
      <div class="showcase-wrap">
        ${renderPhone('ALL List', renderAllScreen())}
        ${renderPhone('Category', renderCategoryScreen())}
        ${renderPhone('Subcategory List', renderListScreen())}
      </div>
    `;
  }

  function renderSingle() {
    let content = renderAllScreen();
    if (state.screen === 'category') content = renderCategoryScreen();
    if (state.screen === 'list') content = renderListScreen();
    return `<div class="phone-frame single">${content}</div>`;
  }

  function render() {
    parseRoute();
    $('#app').innerHTML = `
      ${renderToolbar()}
      ${state.mode === 'showcase' ? renderShowcase() : renderSingle()}
    `;
    bindEvents();
  }

  function bindEvents() {
    $$('[data-screen]').forEach((btn) => {
      btn.addEventListener('click', () => {
        location.hash = `#/${btn.dataset.screen}`;
      });
    });

    $$('[data-subcat]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.dataset.subcat === 'storage-cabinet') location.hash = '#/list';
        else showToast('Open sub-category list');
      });
    });

    $$('[data-action="back"]').forEach((btn) => {
      btn.addEventListener('click', () => {
        location.hash = '#/category';
      });
    });

    $$('[data-fav]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.fav;
        if (state.favorites.has(id)) state.favorites.delete(id);
        else state.favorites.add(id);
        showToast(state.favorites.has(id) ? 'Added to wishlist' : 'Removed');
      });
    });

    $$('.filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        chip.closest('.chip-row')?.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });

    $$('[data-main-cat]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.mainCat = btn.dataset.mainCat;
        render();
      });
    });
  }

  window.addEventListener('hashchange', render);
  render();
})();
