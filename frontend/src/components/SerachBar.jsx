import "./SearchBar.css";

function SearchBar({
    location,
    setLocation,
    budget,
    setBudget
}) {
    return (
        <div className="container search-container-outer">
            <div className="search-card-box">
                <h5 className="search-title mb-4">
                    Search for available properties
                </h5>

                <div className="row g-3 align-items-center">

                    <div className="col-lg-4 col-md-6">
                        <div className="search-input-field">
                            <span className="field-icon">
                                <i className="bi bi-geo-alt"></i>
                            </span>

                            <div className="field-content">
                                <label className="field-label">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    className="field-input"
                                    placeholder="Search Location"
                                    value={location}
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="search-input-field">
                            <span className="field-icon">
                                <i className="bi bi-currency-dollar"></i>
                            </span>

                            <div className="field-content">
                                <label className="field-label">
                                    Budget
                                </label>

                                <input
                                    type="number"
                                    className="field-input"
                                    placeholder="Maximum Budget"
                                    value={budget}
                                    onChange={(e) =>
                                        setBudget(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-12">
                        <button className="btn-search-now w-100">
                            Search Now
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SearchBar;