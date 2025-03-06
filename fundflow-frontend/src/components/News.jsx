import { useState } from 'react';
import './News.css';

const News = () => {
  const [selectedYear, setSelectedYear] = useState('All');

  const years = ['All', '2022', '2021', '2020', '2019', '2018', '2017', '2016'];

  const newsArticles = [
    {
      id: 1,
      title: "मिलाप लॉन्च करत आहे भारतातील क्राउडफंडिंग;गॅरंटेड रिफंड धोरणाच्या माध्यमातून 'मिलाप' वापरकर्त्यांना पुरवती जाणार सुरक्षा",
      source: "TV9Marathi.com",
      date: "Mar 16 2022",
      excerpt: "भारतातील आघाडीच्या क्राउडफंडिंग प्लॅटफॉर्म, (Crowdfunding platform) ऑनलाइन रक्कम देण्याला अधिक सुरक्षा देण्याच्या हेतूने Milaap.org ही 'मिलाप गॅरंटी' (Milaap Guarantee) सादर करत आहे.",
      year: "2022",
      fullArticleUrl: "https://example.com/article1",
    },
    {
      id: 2,
      title: "Milaap Launches India's First Guarantee in Crowdfunding Industry",
      source: "CXOoutlook.com",
      date: "Mar 16 2022",
      excerpt: "Milaap.org introduced Milaap Guarantee for enhanced protection to online donors. The initiative guarantees a full refund if a fraud committed by a fund-raiser and ensures donations reach the beneficiaries.",
      year: "2022",
      fullArticleUrl: "https://example.com/article2",
    },
    {
      id: 3,
      title: "Milaap Raises $5.1M Series A Funding",
      source: "TechCrunch",
      date: "Dec 15 2021",
      excerpt: "Leading crowdfunding platform Milaap has secured $5.1M in Series A funding led by venture capital firms, with participation from angel investors.",
      year: "2021",
      fullArticleUrl: "https://example.com/article3",
    },
    {
      id: 4,
      title: "Milaap Partners with Major Hospitals for Medical Fundraising",
      source: "Healthcare Weekly",
      date: "Aug 23 2020",
      excerpt: "Milaap announces strategic partnerships with leading hospital chains across India to streamline medical fundraising processes for patients in need.",
      year: "2020",
      fullArticleUrl: "https://example.com/article4",
    },
    {
      id: 5,
      title: "How Milaap is Revolutionizing Charitable Giving in India",
      source: "Economic Times",
      date: "May 10 2019",
      excerpt: "A deep dive into how Milaap's platform is transforming the landscape of charitable giving in India through technology and transparency.",
      year: "2019",
      fullArticleUrl: "https://example.com/article5",
    },
    {
      id: 6,
      title: "Milaap Expands Education Fundraising Program",
      source: "Education Today",
      date: "Nov 30 2018",
      excerpt: "Milaap launches dedicated education vertical to help students from underprivileged backgrounds access quality education through crowdfunding.",
      year: "2018",
      fullArticleUrl: "https://example.com/article6",
    },
    {
      id: 7,
      title: "Milaap Achieves Milestone of 100,000 Fundraisers",
      source: "Business Standard",
      date: "Jul 05 2017",
      excerpt: "Crowdfunding platform Milaap celebrates helping over 100,000 individuals and causes raise funds for various needs across India.",
      year: "2017",
      fullArticleUrl: "https://example.com/article7",
    }
  ];

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  const handleReadMore = (url) => {
    window.open(url, '_blank');
  };

  const filteredArticles = selectedYear === 'All' 
    ? newsArticles 
    : newsArticles.filter(article => article.year === selectedYear);

  return (
    <div className="news-container">
      <h1 className="news-heading">Milaap in news</h1>
      
      <div className="news-content">
        <div className="year-filter">
          {years.map(year => (
            <button
              key={year}
              className={`year-button ${selectedYear === year ? 'active' : ''}`}
              onClick={() => handleYearClick(year)}
            >
              {year}
            </button>
          ))}
        </div>

        <div className="articles-container">
          {filteredArticles.map(article => (
            <article key={article.id} className="news-article">
              <h2 className="article-title">{article.title}</h2>
              <div className="article-meta">
                <span className="article-source">{article.source}</span>
                <span className="article-date">{article.date}</span>
              </div>
              <p className="article-excerpt">{article.excerpt}</p>
              <button 
                className="read-more-btn"
                onClick={() => handleReadMore(article.fullArticleUrl)}
              >
                Read more
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
