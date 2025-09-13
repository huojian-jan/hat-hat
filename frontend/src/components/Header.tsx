import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>维吾尔语打字练习</h1>
          <p>Uyghur Typing Practice</p>
        </div>
        <nav className="nav-menu">
          <a href="#" className="nav-item">速度测试</a>
          <a href="#" className="nav-item">键位练习</a>
          <a href="#" className="nav-item">成绩查询</a>
          <a href="#" className="nav-item">更多文章</a>
        </nav>
        <div className="user-section">
          <span className="user-name">游客</span>
          <button className="login-btn">登录</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
