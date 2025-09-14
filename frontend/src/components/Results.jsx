import React from "react";

function Results({ keywords, plan }) {
  return (
    <div>
      <h2>Keyword Suggestions</h2>
      {keywords.length > 0 ? (
        <ul>
          {keywords.map((kw, i) => (
            <li key={i}>
              {kw.keyword} | Volume: {kw.volume} | CPC: {kw.cpc_low} -{" "}
              {kw.cpc_high} | Competition: {kw.competition}
            </li>
          ))}
        </ul>
      ) : (
        <p>No keywords yet.</p>
      )}

      <h2>SEM Plan</h2>
      {plan ? (
        <div>
          <h3>Ad Groups</h3>
          {Object.keys(plan.ad_groups).map((group) => (
            <div key={group}>
              <h4>{group}</h4>
              <ul>
                {plan.ad_groups[group].map((kw, i) => (
                  <li key={i}>
                    {kw.keyword} (Match: {kw.match_type})
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <h3>PMax Themes</h3>
          <ul>
            {plan.pmax_themes.map((theme, i) => (
              <li key={i}>{theme}</li>
            ))}
          </ul>

          <h3>Shopping CPC</h3>
          <p>${plan.shopping_cpc}</p>
        </div>
      ) : (
        <p>No plan generated yet.</p>
      )}
    </div>
  );
}

export default Results;
