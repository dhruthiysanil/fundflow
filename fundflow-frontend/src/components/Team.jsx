import "./Team.css";
import p from "../components/p.jpg";
import p2 from "../components/p2.jpg";
import p3 from "../components/p3.jpg";
import p10 from "../components/p10.webp";
const OurPeople = () => {
  const teamMembers = [
    { name: "Zack Hill", title: "Partner & CEO", email: "zack@few.io", image: p },
    { name: "Anton Lowry", title: "Partner & COO", email: "anton@few.io", image: p2 },
    { name: "Sarah Devine", title: "Director of Projects", email: "sarah@few.io", image: p3 },
    { name: "Sarah Devine", title: "Director of Projects", email: "sarah@few.io", image: p3 },
    { name: "Sarah Devine", title: "Director of Projects", email: "sarah@few.io", image: p3 },
    {
      name: "Calvin Bramlett",
      title: "Senior Designer",
      email: "calvin@few.io",
      image: p3,
    },
  ];

  return (
    <div className="our-people-container">
      <div className="our-people-header">
        <p className="we-are-few">WE ARE FEW</p>
        <h1 className="our-people-title">Our People</h1>
      </div>

      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div className="team-member" key={index}>
            <div className="member-image-container">
              <div className="purple-blob"></div>
              {/* ✅ Use member.image instead of placeholder */}
              <img src={member.image} alt={member.name} className="member-image" />
            </div>
            <div className="member-info">
              <p className="member-title">{member.title}</p>
              <h3 className="member-name">{member.name}</h3>
              <p className="member-email">{member.email}</p>
            </div>
          </div>
        ))}
      </div>


      <div className="join-team-section">
        <h2 className="join-team-heading">JOIN OUR TEAM</h2>
        <button className="read-more-btn">Read more</button>
        <p className="work-together">Let's work together!</p>
        <div className="team-illustration">
          <img
            src={p10}
            alt="Diverse team members illustration"
            className="team-illustration-img"
          />
        </div>
        <div className="divider"></div>
      </div>





    </div>
  );
};

export default OurPeople;
