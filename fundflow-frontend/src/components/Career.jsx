import "./Career.css"
import { useState } from "react";



const Career = () => {
    const teamCards = [
        {
            id: 1,
            title: "Team",
            image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-20%20111552-fuELNVafq5YkvSLcInD1Js3roDMrT3.png",
            description: "Join our diverse and passionate team working towards making a difference",
        },
        {
            id: 2,
            title: "Culture",
            image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-20%20111552-fuELNVafq5YkvSLcInD1Js3roDMrT3.png",
            description: "Experience a vibrant workplace culture that celebrates creativity and fun",
        },
        {
            id: 3,
            title: "About us",
            image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-20%20111552-fuELNVafq5YkvSLcInD1Js3roDMrT3.png",
            description: "Making urgent medical care and financial possibilities accessible",
        },
    ]

    const requirements = [
        "Empathy and social awareness",
        "The Attitude – integrity, perseverance and adaptability is key",
        "Skills specific to the role",
    ]





    const [searchParams, setSearchParams] = useState({
        keywords: '',
        category: '',
        jobType: '',
        location: ''
    });

    const [expandedJobId, setExpandedJobId] = useState(null);
    const jobsData = [
        {
            id: 1,
            title: "Junior Front-end Developer (1-2 years of Experience)",
            type: "Full time, Remote",
            postedTime: "Posted 6 months ago",
            description: "We are looking for a talented web front-end developer to join our carefully hand-picked talented team of developers. You will be involved in creating high-performance, responsive and standards-compliant applications.",
            requirements: [
                "1-2 years of experience in front-end development",
                "Strong proficiency in JavaScript, HTML5, and CSS3",
                "Experience with React.js and its core principles",
                "Experience with popular React.js workflows (Redux)",
                "Familiarity with RESTful APIs",
                "Good understanding of responsive web design",
                "Knowledge of modern authorization mechanisms",
                "Familiarity with version control systems (Git)",
                "Good problem-solving skills",
                "Excellent communication skills"
            ],
            responsibilities: [
                "Developing new user-facing features",
                "Building reusable components for future use",
                "Optimizing components for maximum performance",
                "Collaborating with back-end developers",
                "Participating in code reviews",
                "Writing unit tests for your code"
            ],
            qualifications: [
                "Bachelor's degree in Computer Science or related field",
                "Strong understanding of web fundamentals",
                "Proficiency in English",
                "Portfolio of web development projects"
            ]
        }
    ];

    const [filteredJobs, setFilteredJobs] = useState(jobsData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({
            ...prev,
            [name]: value
        }));

        // Apply filters immediately when any search parameter changes
        applyFilters({ ...searchParams, [name]: value });
    };

    const applyFilters = (params) => {
        let filtered = jobsData.filter(job => {
            const searchString = (job.title + job.description + job.type).toLowerCase();
            const keywordMatch = params.keywords === '' ||
                searchString.includes(params.keywords.toLowerCase());
            const categoryMatch = params.category === '' ||
                job.title.toLowerCase().includes(params.category.toLowerCase());
            const jobTypeMatch = params.jobType === '' ||
                job.type.toLowerCase().includes(params.jobType.toLowerCase());
            const locationMatch = params.location === '' ||
                job.type.toLowerCase().includes(params.location.toLowerCase());

            return keywordMatch && categoryMatch && jobTypeMatch && locationMatch;
        });

        setFilteredJobs(filtered);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        applyFilters(searchParams);
    };

    const toggleJobDetails = (jobId) => {
        setExpandedJobId(expandedJobId === jobId ? null : jobId);
    };







    return (
        <div className="career-container">
            <section className="requirements-section">
                <h1>What do we look for in candidate?</h1>
                <p className="intro-text">Are you willing to be a part of Milaap? Here is what we look for in candidates</p>
                <ul className="requirements-list">
                    {requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                    ))}
                </ul>
            </section>

            <section className="teams-section">
                <h2>Meet our teams to know where you best fit!</h2>
                <div className="team-cards">
                    {teamCards.map((card) => (
                        <div key={card.id} className="team-card">

                            <div className="card-content">

                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                                <button className="learn-more-btn">Learn more</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="join-section">
                <div className="join-content">
                    <h2>Ready to make an impact?</h2>
                    <p>Join us in our mission to make healthcare and education accessible to all</p>
                    <button className="view-positions-btn">View open positions</button>
                </div>
            </section>
            <h1 id="jobOpening">Milaap careers: Job Opening</h1>

            <div className="search-section">
                <input
                    type="text"
                    name="keywords"
                    placeholder="Keywords"
                    value={searchParams.keywords}
                    onChange={handleInputChange}
                    className="search-input"
                />

                <div className="filters-container">
                    <select
                        name="category"
                        value={searchParams.category}
                        onChange={handleInputChange}
                        className="filter-select"
                    >
                        <option value="">Category</option>
                        <option value="development">Development</option>
                        <option value="design">Design</option>
                        <option value="marketing">Marketing</option>
                    </select>

                    <select
                        name="jobType"
                        value={searchParams.jobType}
                        onChange={handleInputChange}
                        className="filter-select"
                    >
                        <option value="">Job Type</option>
                        <option value="fullTime">Full Time</option>
                        <option value="partTime">Part Time</option>
                        <option value="contract">Contract</option>
                    </select>

                    <select
                        name="location"
                        value={searchParams.location}
                        onChange={handleInputChange}
                        className="filter-select"
                    >
                        <option value="">Location</option>
                        <option value="remote">Remote</option>
                        <option value="onsite">On-site</option>
                        <option value="hybrid">Hybrid</option>
                    </select>

                    <button onClick={handleSearch} className="search-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="jobs-container">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <div key={job.id} className="job-card">
                            <div className="job-header">
                                <h2>{job.title}</h2>
                                <div className="job-meta">
                                    <span className="job-type">{job.type}</span>
                                    <span className="posted-time">{job.postedTime}</span>
                                </div>
                            </div>
                            <p className="job-description">
                                {expandedJobId === job.id ? job.description : `${job.description.substring(0, 150)}...`}
                            </p>

                            {expandedJobId === job.id && (
                                <div className="job-details">
                                    <div className="requirements-section">
                                        <h3>Requirements:</h3>
                                        <ul>
                                            {job.requirements.map((req, index) => (
                                                <li key={index}>{req}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="responsibilities-section">
                                        <h3>Responsibilities:</h3>
                                        <ul>
                                            {job.responsibilities.map((resp, index) => (
                                                <li key={index}>{resp}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="qualifications-section">
                                        <h3>Qualifications:</h3>
                                        <ul>
                                            {job.qualifications.map((qual, index) => (
                                                <li key={index}>{qual}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            <button
                                className="read-more-btn"
                                onClick={() => toggleJobDetails(job.id)}
                            >
                                {expandedJobId === job.id ? 'Show Less' : 'Read More'}
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="no-results">
                        <h3>No results found</h3>
                        <p>Try adjusting your search criteria</p>
                    </div>
                )}
            </div>


        </div>
    )
}

export default Career

