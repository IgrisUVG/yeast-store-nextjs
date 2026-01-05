export default function Home() {
  return <>
    <section className="hero-banner">
      <img src="/img/background/hopfen-fields.jpg" alt="Beautiful hops on a dark background" className="hero-banner__image" />
      <div className="hero-banner__overlay"></div>
    </section>

    <div className="container main-content-grid">
      <aside className="sidebar filter-menu">
        <div className="sidebar__section">
          <h3 className="section-title">Keywords</h3>
          <div className="keywords-list"></div>
        </div>

        <div className="sidebar__section">
          <h3 className="section-title">Product Type</h3>
          <div className="checkbox-group">
            <label className="checkbox-container">Hops
              <input type="checkbox" data-keyword="Hops" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">Malts
              <input type="checkbox" data-keyword="Malts" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">Yeast
              <input type="checkbox" data-keyword="Yeast" />
              <span className="checkmark"></span>
            </label>
            <label className="checkbox-container">Adjuncts
              <input type="checkbox" data-keyword="Adjuncts" />
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
      </aside>

      <section className="products-area product-grid-section">
        <div className="search-sort-bar">
          <div className="search-input-wrapper">
            <input type="text" placeholder="Search" className="search-input" />
            <button className="search-button" aria-label="Search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          <div className="sort-options">
            <button className="sort-button active-sort">
              <span>New</span>
            </button>
            <button className="sort-button">Price ascending</button>
            <button className="sort-button">Price descending</button>
            <button className="sort-button">Rating</button>
          </div>
        </div>

        <div className="product-grid"></div>
      </section>
    </div>
  </>;
}
