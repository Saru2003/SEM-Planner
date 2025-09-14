import React, { useState } from "react";
import axios from "axios";

function InputForm({ keywords, setKeywords, setPlan }) {
  const [brandUrl, setBrandUrl] = useState("");
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [searchBudget, setSearchBudget] = useState(500);
  const [shoppingBudget, setShoppingBudget] = useState(300);
  const [pmaxBudget, setPmaxBudget] = useState(200);

  const backendUrl = "http://127.0.0.1:8000"; 

  const fetchKeywords = async () => {
    try {
      const res = await axios.post(`${backendUrl}/keywords`, {
        brand_url: brandUrl,
        competitor_url: competitorUrl,
      });
      setKeywords(res.data.keywords);
    } catch (err) {
      console.error("Error fetching keywords", err);
    }
  };

const generatePlan = async () => {
  console.log("Generating plan with keywords:", keywords);
  try {
    const res = await axios.post(`${backendUrl}/plan`, {
      keywords: keywords.map((k) => k.keyword),
      search_budget: searchBudget,
      shopping_budget: shoppingBudget,
      pmax_budget: pmaxBudget,
    });
    setPlan(res.data);
  } catch (err) {
    console.error("Error generating plan", err);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  await fetchKeywords();
};

  return (
  <form onSubmit={handleSubmit}>
    <div>
      <label>Brand URL:</label>
      <input
      type="text"
      value={brandUrl}
      onChange={(e) => setBrandUrl(e.target.value)}
      required
      />
      </div>
      <div>
        <label>Competitor URL:</label>
        <input
          type="text"
          value={competitorUrl}
          onChange={(e) => setCompetitorUrl(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Search Budget ($):</label>
        <input
          type="number"
          value={searchBudget}
          onChange={(e) => setSearchBudget(e.target.value)}
        />
      </div>
      <div>
        <label>Shopping Budget ($):</label>
        <input
          type="number"
          value={shoppingBudget}
          onChange={(e) => setShoppingBudget(e.target.value)}
        />
      </div>
      <div>
        <label>PMax Budget ($):</label>
        <input
          type="number"
          value={pmaxBudget}
          onChange={(e) => setPmaxBudget(e.target.value)}
        />
      </div>

      <button type="submit">Fetch Keywords</button>
      <button type="button" onClick={generatePlan}>
        Generate Plan
      </button>
    </form>
  );
}

export default InputForm;
