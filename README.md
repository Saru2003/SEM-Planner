# SEM Planner

A full-stack application to generate a structured SEM (Search Engine Marketing) plan using **React (frontend)** and **FastAPI (backend)**. The tool collects brand and competitor inputs, applies budgets, and outputs a mock SEM plan.

---

## 🚀 Live Deployment

* **Frontend (Netlify):** [https://lucent-gumption-f051d2.netlify.app/](https://lucent-gumption-f051d2.netlify.app/)
* **Backend (Render):** [https://sem-planner.onrender.com](https://sem-planner.onrender.com)

---

## 📌 Current Capabilities

* **Keyword Suggestions (Mocked Data)**

  * Based on brand and competitor URLs.
  * Returns seed keywords with volume, CPC ranges, and competition levels.

* **SEM Plan Generation**

  * Groups keywords into ad groups:

    * Brand Terms
    * Competitor Terms
    * Category Terms
    * Location Terms
    * Long-tail Queries
  * Assigns match types (Exact / Phrase).

* **Performance Max (PMax) Themes**

  * Example campaign themes such as:

    * Vegan Protein Products
    * Post-Workout Recovery
    * For Busy Professionals
    * Back to School Fitness

* **Shopping CPC Calculation**

  * Computes suggested CPC using provided budgets and a fixed 2% conversion rate.

---

## ⚠️ Limitations / Next Steps

* Google Keyword Planner API **not yet integrated** (currently using mocked keywords).
* Service location input not yet influencing segmentation.
* Currently tested primarily with:

  * `https://www.myprotein.com`
  * `https://www.muscleblaze.com`
* Output is mocked but structured to allow easy API integration in the future.

---

## 🛠️ Tech Stack

* **Frontend:** React (Netlify deployment)
* **Backend:** FastAPI (Render deployment)
* **Styling:** Basic React components (can be extended with Lovable/other design tools)
* **Communication:** REST API with Axios

---

## 📂 Project Structure

```
SEM-Planner/
├── backend/
│   └── main.py        # FastAPI backend
├── frontend/
│   ├── src/
│   │   ├── App.js     # Main React app
│   │   ├── components/
│   │   │   ├── InputForm.jsx
│   │   │   └── Results.jsx
│   └── package.json
├── requirements.txt   # Python dependencies
└── README.md
```

---

## ▶️ Running Locally

### Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Server runs at: `http://127.0.0.1:8000`

### Frontend (React)

```bash
cd frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

---

## 📤 Submission Notes

* This submission includes:

  * **Deployed live link (Netlify + Render)**
  * **Source code (React + FastAPI)**
* Current implementation demonstrates:

  * Input collection
  * Mock keyword generation
  * SEM plan output with budgets
* Ready to extend with:

  * Google Keyword Planner API
  * Real scraping / data enrichment
  * Location-based segmentation
