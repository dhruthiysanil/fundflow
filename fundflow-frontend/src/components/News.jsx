"use client"

import "./News.css"
import { useState } from "react"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { Header } from "./Header"

const News = () => {
  const [selectedYear, setSelectedYear] = useState("All")
  const years = ["All", "2022", "2021", "2020", "2019", "2018", "2017"]



  const newsArticles = [
    {
      id: 1,
      title:" FundFlow Launches Crowdfunding Platform in India with Guaranteed Refund Policy",
      source: "The Economic Times",
      date: "Mar 16 2022",
      excerpt: "FundFlow a leading crowdfunding platform, has announced its launch in India, introducing a guaranteed refund policy to ensure donor trust and transparency in fundraising campaigns",
      year: "2022",
      fullArticleUrl: "https://example.com/article1",
    },
    {
      id: 2,
      title: "FundFlow Partners with Global NGOs to Improve Healthcare Fundraising",
      source: "Times Now",
      date: " February 15, 2025",
      excerpt:
        "To strengthen healthcare fundraising, FundFlow has partnered with international NGOs, enabling faster medical support for patients in need across various regions.",
      year: "2022",
      fullArticleUrl: "https://example.com/article2",
    },
    {
      id: 3,
      title: "FundFlow 5.1M Series A Funding",
      source: "TechCrunch",
      date: "Dec 15 2021",
      excerpt:
        "Leading crowdfunding platform FundFlow  has secured $5.1M in Series A funding led by venture capital firms, with participation from angel investors.",
      year: "2021",
      fullArticleUrl: "https://example.com/article3",
    },
    {
      id: 4,
      title: "FundFlow Partners with Major Hospitals for Medical Fundraising",
      source: "Healthcare Weekly",
      date: "Aug 23 2020",
      excerpt:
        "Milaap announces strategic partnerships with leading hospital chains across India to streamline medical fundraising processes for patients in need.",
      year: "2020",
      fullArticleUrl: "https://example.com/article4",
    },
    {
      id: 5,
      title: "How FundFlow is Revolutionizing Charitable Giving in India",
      source: "Economic Times",
      date: "May 10 2019",
      excerpt:
        "A deep dive into how FundFlow's platform is transforming the landscape of charitable giving in India through technology and transparency.",
      year: "2019",
      fullArticleUrl: "https://example.com/article5",
    },
    {
      id: 6,
      title: "FundFlow Expands Education Fundraising Program",
      source: "Education Today",
      date: "Nov 30 2018",
      excerpt:
        "FundFlow  launches dedicated education vertical to help students from underprivileged backgrounds access quality education through crowdfunding.",
      year: "2018",
      fullArticleUrl: "https://example.com/article6",
    },
    {
      id: 7,
      title: "FundFlow  Achieves Milestone of 100,000 Fundraisers",
      source: "Business Standard",
      date: "Jul 05 2017",
      excerpt:
        "Crowdfunding platform FundFlow  celebrates helping over 100,000 individuals and causes raise funds for various needs across India.",
      year: "2017",
      fullArticleUrl: "https://example.com/article7",
    },
  ]

  const handleYearClick = (year) => {
    setSelectedYear(year)
  }

  const handleReadMore = (url) => {
    window.open(url, "_blank")
  }

  const filteredArticles =
    selectedYear === "All" ? newsArticles : newsArticles.filter((article) => article.year === selectedYear)

  return (
    <>
      {/* Header moved outside the news-container for full width */}
      <Header />

      <div className="news-container">
        <h1 className="news-heading">Milaap in news</h1>

        <div className="news-content">
          <div className="year-filter">
            {years.map((year) => (
              <button
                key={year}
                className={`year-button ${selectedYear === year ? "active" : ""}`}
                onClick={() => handleYearClick(year)}
              >
                {year}
              </button>
            ))}
          </div>

          <div className="articles-container">
            {filteredArticles.map((article) => (
              <article key={article.id} className="news-article">
                <h2 className="article-title">{article.title}</h2>
                <div className="article-meta">
                  <span className="article-source">{article.source}</span>
                  <span className="article-date">{article.date}</span>
                </div>
                <p className="article-excerpt">{article.excerpt}</p>
                <button className="read-more-btn" onClick={() => handleReadMore(article.fullArticleUrl)}>
                  Read more
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Footer remains outside the news-container for full width */}
      <footer className="full-width-footer">
        <div className="footer-content">
          <div className="footer-column">
            <h2 className="footer-logo">FUND FLOW</h2>
            <p>Together, We Make a Difference!.</p>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="About">About Us</a>
              </li>
              <li>
                <a href="Team">Our Team</a>
              </li>
              <li>
                <a href="Contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Urgent Charity</h3>
            <ul>
              <li>
                <a href="Career">Career</a>
              </li>
              <li>
                <a href="News">News</a>
              </li>
              <li>
                <a href="#">Our Children</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Donate Today, Change Tomorrow!</h3>
            <p>Raise Hope, Fund Change</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Email" />
              <button type="submit">ENQUIRY</button>
            </form>
          </div>
        </div>
      </footer>
    </>
  )
}

export default News

