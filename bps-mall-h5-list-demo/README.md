# LINSY BPS Mall · H5 Product List Demo

Static HTML/CSS/JS prototype of the BPS mall **H5 product listing flows**: ALL list, category browser, and subcategory product list.

## Preview

**Double-click `index.html`** to open locally. CSS and JavaScript are inlined (no external script loading issues).

For GitHub Pages, deploy the repo root; `index.html` is the entry.

| Screen | URL hash |
|--------|----------|
| Three-screen showcase (default) | `#/` or empty |
| ALL product list | `#/all` |
| Category sidebar + subcategories | `#/category` |
| Subcategory product list (Storage Cabinet) | `#/list` |

From **Category** view, tap **Storage Cabinet** to open the list screen.

## Files

| File | Description |
|------|-------------|
| `index.html` | Entry page |
| `styles.css` | Mobile layout & components |
| `app.js` | Multi-screen render & navigation |
| `data.js` | Mock products, categories, subcategories |

## Features

- Status bar, nav bar, search, ALL / Category tabs
- Filter chips & filter menu (list screen)
- 2-column product grid with thumbnails & +N badge
- Category sidebar with active indicator
- Subcategory image grid
- Bottom tab bar: Home, Products, Wishlist, Mine

## Notes

- Mock data only; no backend API
- Product images load from Unsplash CDN (network required)
- Showcase mode shows three phone frames side by side on desktop

## License

Internal demo / design reference. Adjust before public use.
