import React from 'react';
import './X.css';

function JoinTeam() {
  return (
    <div className="join-team-container">
      <div className="decorative-elements">
        <div className="star star-1">✦</div>
        <div className="star star-2">✦</div>
        <div className="star star-3">✦</div>
        <div className="star star-4">✦</div>
        <div className="star star-5">✦</div>
        <div className="star star-6">✦</div>
        <div className="icon icon-1">⚙️</div>
        <div className="icon icon-2">📊</div>
        <div className="icon icon-3">💬</div>
        <div className="icon icon-4">📝</div>
        <div className="icon icon-5">🚀</div>
      </div>

      <div className="content">
        <h1 className="title">Join our Team.</h1>
        <p className="subtitle">Help us on our quest to make good software even better</p>
        
        <button className="openings-button">See current openings</button>
      </div>

      <div className="team-avatars">
        <div className="avatar-container avatar-left">
          <div className="avatar avatar-yellow">
            <div className="avatar-image person-with-glasses"></div>
          </div>
        </div>
        
        <div className="avatar-container avatar-bottom">
          <div className="avatar avatar-green">
            <div className="avatar-image person-with-dark-hair"></div>
          </div>
        </div>
        
        <div className="avatar-container avatar-right-top">
          <div className="avatar avatar-pink">
            <div className="avatar-image person-with-curly-hair"></div>
          </div>
        </div>
        
        <div className="avatar-container avatar-right-bottom">
          <div className="avatar avatar-blue">
            <div className="avatar-image person-with-light-hair"></div>
          </div>
        </div>

        <svg className="connecting-lines">
          <path d="M 120 180 Q 200 300, 280 360" className="line" />
          <path d="M 280 360 Q 400 400, 650 350" className="line" />
          <path d="M 650 350 Q 750 300, 710 180" className="line" />
        </svg>
      </div>

      <div className="divider"></div>
    </div>
  );
}

export default JoinTeam;