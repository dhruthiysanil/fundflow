// "use client"

// import { useState, useEffect } from "react"
// import "./Screen.css"
// import Donation from "./Donation"
// import { useParams } from "react-router-dom";
// import api from '../utils/axiosConfig';


// function Screen() {
//   const { id } = useParams(); // Get the campaign ID from URL
//   // console
//   const [campaign, setCampaign] = useState(null);


//   const [activeTab, setActiveTab] = useState("story")
//   const [showQR, setShowQR] = useState(true)
//   const [showDonationModal, setShowDonationModal] = useState(false)

//   useEffect(() => {
//     const fetchCampaign = async () => {
//       try {
//         const response = await api.get(`/api/campaign/${id}`);
//         console.log(response.data)
//         setCampaign(response.data);
//       } catch (error) {
//         console.error("Error fetching campaign:", error);
//       }
//     };

//     fetchCampaign();
//   }, [id]);

//   const toggleQR = () => {
//     setShowQR(!showQR)
//   }

//   const handleDonateClick = () => {
//     setShowDonationModal(true)
//   }

//   const closeDonationModal = () => {
//     setShowDonationModal(false)
//   }

//   const supporters = [
//     {
//       id: 1,
//       initials: "MI",
//       name: "Milaap Impact User",
//       amount: "₹10",
//       note: "Matching payment towards Anonymous' contribution",
//     },
//     {
//       id: 2,
//       initials: "A",
//       name: "Anonymous",
//       amount: "₹100",
//       note: "",
//     },
//     {
//       id: 3,
//       initials: "MI",
//       name: "Milaap Impact User",
//       amount: "₹50",
//       note: "Matching payment towards Vaibhav's contribution",
//     },
//     {
//       id: 4,
//       initials: "VG",
//       name: "Vaibhav",
//       amount: "₹500",
//       note: "",
//     },
//   ]

//   return (
//     <div className="mlf2025_main_container">
//       <div className="mlf2025_notice_banner">
//         <p className="mlf2025_notice_text">Milaap will not charge any fee on your donation to this fundraiser.</p>
//       </div>

//       <div className="mlf2025_content_wrapper">
//         <div className="mlf2025_left_section">
//           <h1 className="mlf2025_main_heading">Help My Mother Fight Brain Stroke & Save Life</h1>

//           <div className="mlf2025_media_container">
//             <button className="mlf2025_nav_button mlf2025_prev_button">❮</button>

//             <div className="mlf2025_media_content">
//               <div className="mlf2025_milaap_logo">
//                 <span className="mlf2025_logo_text">Milaap</span>
//               </div>


//             </div>

//             <button className="mlf2025_nav_button mlf2025_next_button">❯</button>
//           </div>

//           <div className="mlf2025_tabs_container">
//             <div className="mlf2025_tabs">
//               <button
//                 className={`mlf2025_tab ${activeTab === "story" ? "mlf2025_tab_active" : ""}`}
//                 onClick={() => setActiveTab("story")}
//               >
//                 Story
//               </button>
//               <button
//                 className={`mlf2025_tab ${activeTab === "updates" ? "mlf2025_tab_active" : ""}`}
//                 onClick={() => setActiveTab("updates")}
//               >
//                 Updates (1)
//               </button>
//             </div>
//           </div>

//           <div className="mlf2025_tab_content">
//             {activeTab === "story" ? (
//               <div className="mlf2025_story_content">
//                 <h2 className="mlf2025_story_title">
//                   Urgent Fundraiser for My Mother's Treatment: BRAIN STROKE (Ischemic Stroke)
//                 </h2>

//                 <div className="mlf2025_story_text">
//                   <p>Hello,</p>
//                   <p>
//                     My name is Lokendra, and I am reaching out with a heavy heart to request your urgent help for my
//                     mother, Mrs. Haripyari. She is currently suffering from severe brain stroke (Ischemic Stroke) with
//                     approximately 50% brain damage.{" "}
//                     <strong>
//                       As a cancer survivor who has bravely fought through many challenges before, she now faces another
//                       life-threatening battle
//                     </strong>
//                     . Unfortunately, our family has exhausted all our savings, and we are in{" "}
//                     <strong>urgent need of your financial support</strong>.
//                   </p>

//                   <p>
//                     When she had the brain stroke, we took her to Birla Hospital in Gwalior, but they refused to admit
//                     her because they didn't have the necessary surgical equipment and procedures. The doctors warned
//                     that time is crucial in stroke cases, and she needs surgery immediate to survive. So doctor
//                     suggested to <strong>admit to Medanta hospital, Gurgaon</strong>. And she is currently under
//                     treatment.
//                   </p>

//                   <p>
//                     The total <strong>cost of treatment is expected to exceed ₹ 18,50,000</strong>. We have managed to
//                     arrange some funds and have <strong>already paid ₹ 6,22,745</strong> for the initial surgery on the
//                     first day. However, we are unable to cover the remaining{" "}
//                     <strong>₹ 12,27,255 needed for her continued treatment to save her life</strong>.
//                   </p>
//                 </div>

//                 {/* Supporters Section */}
//                 <div className="supporters_section">
//                   <h2 className="supporters_heading">Supporters</h2>

//                   <div className="supporters_divider">
//                     <div className="diamond_divider"></div>
//                     <div className="diamond_divider diamond_center"></div>
//                     <div className="diamond_divider"></div>
//                   </div>

//                   <div className="supporters_notice">
//                     <a href="#" className="supporters_notice_link">
//                       Click here
//                     </a>{" "}
//                     if you are not able to find your donation listed below.
//                   </div>

//                   <div className="supporters_list">
//                     {supporters.map((supporter) => (
//                       <div key={supporter.id} className="supporter_item">
//                         <div className="supporter_avatar">
//                           <span className="supporter_initials">{supporter.initials}</span>
//                         </div>
//                         <div className="supporter_details">
//                           <div className="supporter_name">{supporter.name}</div>
//                           <div className="supporter_amount">{supporter.amount}</div>
//                           {supporter.note && <div className="supporter_note">{supporter.note}</div>}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="view_all_container">
//                     <a href="#" className="view_all_link">
//                       View all supporters
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="mlf2025_updates_content">
//                 <div className="mlf2025_update_item">
//                   <h3 className="mlf2025_update_title">Latest Medical Report</h3>
//                   <p className="mlf2025_update_date">March 9, 2025</p>
//                   <p className="mlf2025_update_text">
//                     The doctors have reported some improvement in mother's condition after the initial surgery. She is
//                     responding well to the treatment, but there's still a long way to go. We are grateful for all your
//                     support and prayers.
//                   </p>
//                 </div>
//                 <div className="mlf2025_update_item">
//                   <h3 className="mlf2025_update_title">Treatment Progress</h3>
//                   <p className="mlf2025_update_date">March 7, 2025</p>
//                   <p className="mlf2025_update_text">
//                     We've completed the first phase of treatment. The doctors are monitoring her condition closely and
//                     have scheduled additional procedures for next week. Thank you for your continued support during this
//                     difficult time.
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="mlf2025_donation_sticky">
//           <div className="donation_card">
//             <div className="donation_header">
//               <div className="donation_title_container">
//                 <svg
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="donation_icon"
//                 >
//                   <path
//                     d="M3.5,9 C3.5,11.5 5.5,14 8,14 C9.5,14 10.5,13 10.5,13 L15,17.5 C15,17.5 15.5,18 16,18 C17,18 17.5,17 17.5,16.5 L17.5,9 C17.5,8 16.5,7 15.5,7 L5.5,7 C4.5,7 3.5,8 3.5,9 Z"
//                     stroke="#333333"
//                     strokeWidth="1.5"
//                     fill="none"
//                   />
//                 </svg>
//                 <h2 className="donation_title">Donate</h2>
//               </div>
//               <a href="#" className="supporters_link">
//                 710 supporters
//               </a>
//             </div>

//             <div className="progress_container">
//               <div className="progress_circle_container">
//                 <div className="progress_circle">
//                   <div className="progress_circle_inner">
//                     <span className="progress_percent">59%</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="amount_container">
//                 <p className="raised_label">Raised</p>
//                 <div className="amount_wrapper">
//                   <span className="amount_raised">Rs.7,24,667</span>
//                   <span className="amount_goal"> of Rs.12,27,255</span>
//                 </div>
//               </div>
//             </div>

//             <button className="donate_button" onClick={handleDonateClick}>
//               Donate now
//             </button>

//             <p className="payment_methods">Card, Netbanking, Cheque pickups</p>

//             <div className="divider">
//               <span className="divider_text">Or Donate using</span>
//             </div>

//             <div className="qr_container">
//               {showQR && (
//                 <div className="qr_code">
//                   <img src="/placeholder.svg?height=200&width=200" alt="QR Code" className="qr_image" />
//                 </div>
//               )}
//               <button className="generate_qr_btn" onClick={toggleQR}>
//                 Generate QR
//               </button>
//             </div>

//             <p className="scan_text">Scan & donate with any app</p>

//             <div className="payment_apps">
//               <div className="app_icon phonepe"></div>
//               <div className="app_icon gpay"></div>
//               <div className="app_icon paytm"></div>
//               <div className="app_icon bhim"></div>
//               <div className="app_icon amazonpay"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Donation isOpen={showDonationModal} onClose={closeDonationModal} />
//     </div>
//   )
// }

// export default Screen



"use client"

import { useState, useEffect } from "react"
import "./Screen.css"
import Donation from "./Donation"
import { useParams } from "react-router-dom";
import api from '../utils/axiosConfig';
import { Header } from "./Header";
import { Footer } from "./Footer";

function Screen() {
  const { id } = useParams(); // Get the campaign ID from URL
  // console
  const [campaign, setCampaign] = useState({ campaign_title: "" });
  const [updates, setUpdates] = useState([]);
  // const [supporters, setSupporters] = useState([]);


  const [activeTab, setActiveTab] = useState("story")
  const [showQR, setShowQR] = useState(true)
  const [showDonationModal, setShowDonationModal] = useState(false)

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await api.get(`/api/campaign/${id}`);
        console.log(response.data);
        setCampaign(response.data);
      } catch (error) {
        console.error("Error fetching campaign:", error);
      }
    };
    // Fetch campaign updates
    const fetchUpdates = async () => {
      try {
        const response = await api.get(`/api/updates/${id}`);
        console.log(response.data)
        setUpdates(response.data);
      } catch (error) {
        console.error("Error fetching updates:", error);
      }
    };

    // Fetch supporters (donations)
    const fetchSupporters = async () => {
      try {
        const response = await api.get(`/api/donations/${id}`);
        // setSupporters(response.data);
      } catch (error) {
        console.error("Error fetching supporters:", error);
      }
    };

    fetchUpdates();
    // fetchSupporters();
    fetchCampaign();
  }, [id]);

  const toggleQR = () => {
    setShowQR(!showQR)
  }

  const handleDonateClick = () => {
    setShowDonationModal(true)
  }

  const closeDonationModal = () => {
    setShowDonationModal(false)
  }

  const supporters = [
    {
      id: 1,
      initials: "MI",
      name: "Milaap Impact User",
      amount: "₹10",
      note: "Matching payment towards Anonymous' contribution",
    },
    {
      id: 2,
      initials: "A",
      name: "Anonymous",
      amount: "₹100",
      note: "",
    },
    {
      id: 3,
      initials: "MI",
      name: "Milaap Impact User",
      amount: "₹50",
      note: "Matching payment towards Vaibhav's contribution",
    },
    {
      id: 4,
      initials: "VG",
      name: "Vaibhav",
      amount: "₹500",
      note: "",
    },
  ]

  return (
    <><Header />
      <div className="mlf2025_main_container">
        <div className="mlf2025_notice_banner">
          <p className="mlf2025_notice_text">FundFlow will not charge any fee on your donation to this fundraiser.</p>
        </div>

        <div className="mlf2025_content_wrapper">
          <div className="mlf2025_left_section">
            <h1 className="mlf2025_main_heading">
              {campaign.campaign_title}
            </h1>

            <div className="mlf2025_media_container">

              <div
                className="mlf2025_media_content"
                style={{
                  backgroundImage: `url(http://localhost:5000${campaign.campaign_photo})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >



              </div>


            </div>

            <div className="mlf2025_tabs_container">
              <div className="mlf2025_tabs">
                <button
                  className={`mlf2025_tab ${activeTab === "story" ? "mlf2025_tab_active" : ""}`}
                  onClick={() => setActiveTab("story")}
                >
                  Story
                </button>
                <button
                  className={`mlf2025_tab ${activeTab === "updates" ? "mlf2025_tab_active" : ""}`}
                  onClick={() => setActiveTab("updates")}
                >
                  Updates ({updates.length})
                </button>
              </div>
            </div>

            <div className="mlf2025_tab_content">
              {activeTab === "story" ? (
                <div className="mlf2025_story_content">
                  <h2 className="mlf2025_story_title">
                    {campaign.campaign_title}
                  </h2>

                  <div className="mlf2025_story_text">

                    {campaign.campaign_story}
                  </div>

                  {/* Supporters Section */}
                  <div className="supporters_section">
                    <h2 className="supporters_heading">Supporters</h2>

                    <div className="supporters_divider">
                      <div className="diamond_divider"></div>
                      <div className="diamond_divider diamond_center"></div>
                      <div className="diamond_divider"></div>
                    </div>

                    <div className="supporters_notice">
                      <a href="#" className="supporters_notice_link">
                        Click here
                      </a>{" "}
                      if you are not able to find your donation listed below.
                    </div>

                    <div className="supporters_list">
                      {supporters.map((supporter) => (
                        <div key={supporter.id} className="supporter_item">
                          <div className="supporter_avatar">
                            <span className="supporter_initials">{supporter.initials}</span>
                          </div>
                          <div className="supporter_details">
                            <div className="supporter_name">{supporter.name}</div>
                            <div className="supporter_amount">{supporter.amount}</div>
                            {supporter.note && <div className="supporter_note">{supporter.note}</div>}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="view_all_container">
                      <a href="#" className="view_all_link">
                        View all supporters
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mlf2025_updates_content">


                  {/* <div className="mlf2025_update_item">
                    <h3 className="mlf2025_update_title">Latest Medical Report</h3>
                    <p className="mlf2025_update_date">March 9, 2025</p>
                    <p className="mlf2025_update_text">
                      The doctors have reported some improvement in mother's condition after the initial surgery. She is
                      responding well to the treatment, but there's still a long way to go. We are grateful for all your
                      support and prayers.
                    </p>
                  </div>
                  <div className="mlf2025_update_item">
                    <h3 className="mlf2025_update_title">Treatment Progress</h3>
                    <p className="mlf2025_update_date">March 7, 2025</p>
                    <p className="mlf2025_update_text">
                      We've completed the first phase of treatment. The doctors are monitoring her condition closely and
                      have scheduled additional procedures for next week. Thank you for your continued support during this
                      difficult time.
                    </p>
                  </div> */}

                  {updates.map((update) => {
                    return (
                      <div key={update.id} className="mlf2025_update_item">
                        <h3 className="mlf2025_update_title">{update.title}</h3>
                        <p className="mlf2025_update_date">
                          {new Date(update.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="mlf2025_update_text">
                          {update.note}
                        </p>
                      </div>
                    );
                  })}

                </div>

              )}
            </div>
          </div>

          <div className="mlf2025_donation_sticky">
            <div className="donation_card">
              <div className="donation_header">
                <div className="donation_title_container">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="donation_icon"
                  >
                    <path
                      d="M3.5,9 C3.5,11.5 5.5,14 8,14 C9.5,14 10.5,13 10.5,13 L15,17.5 C15,17.5 15.5,18 16,18 C17,18 17.5,17 17.5,16.5 L17.5,9 C17.5,8 16.5,7 15.5,7 L5.5,7 C4.5,7 3.5,8 3.5,9 Z"
                      stroke="#333333"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>

                 


                  <h2 className="donation_title">Donate</h2>
                </div>
                <a href="#" className="supporters_link">
                  {supporters.length} supporters
                </a>
              </div>

              <div className="progress_container">
                <div className="progress_circle_container">
                  <div className="progress_circle">
                    <div className="progress_circle_inner">
                      <span className="progress_percent">{campaign.percentage}%</span>
                    </div>
                  </div>
                </div>

                <div className="amount_container">
                  <p className="raised_label">Raised</p>
                  <div className="amount_wrapper">
                    <span className="amount_raised">Rs.{campaign.raised_amount}</span>
                    <span className="amount_goal"> of Rs.{campaign.target_amount}</span>
                  </div>
                </div>
              </div>

              <button className="donate_button" onClick={handleDonateClick}>
                Donate now
              </button>



              <p className="payment_methods">Card, Netbanking, Cheque pickups</p>

              <div className="divider">
                <span className="divider_text">Or Donate using</span>
              </div>

              <div className="qr_container">
                {showQR && (
                  <div className="qr_code">
                    <img src={"/placeholder.svg?height=200&width=200"} alt="QR Code" className="qr_image" />
                  </div>
                )}
                <button className="generate_qr_btn" onClick={toggleQR}>
                  Generate QR
                </button>
              </div>

              <p className="scan_text">Scan & donate with any app</p>

              <div className="payment_apps">
                <div className="app_icon phonepe"></div>
                <div className="app_icon gpay"></div>
                <div className="app_icon paytm"></div>
                <div className="app_icon bhim"></div>
                <div className="app_icon amazonpay"></div>
              </div>
            </div>
          </div>
        </div>

       
      </div>
      <Footer />
    </>
  )
}

export default Screen

