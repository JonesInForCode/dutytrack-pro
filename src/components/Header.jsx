import React from 'react';

const Header = ({ metadata }) => {
  return (
    <>
      <div className="header-metadata">
        <div>Created: {metadata.createdAt} by {metadata.createdBy}</div>
        <div>Last Modified: {metadata.lastModified} by {metadata.lastModifiedBy}</div>
      </div>
      <div className="app-branding">
        <h1>DutyTrack Pro</h1>
        <p className="tagline">Streamlined Modified Duty Management</p>
      </div>
      <h2 className="form-title">MODIFIED DUTY AGREEMENT & FOLLOW-UP TRACKER</h2>
    </>
  );
};

export default Header;