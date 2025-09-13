-- 创建数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS typing_practice CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE typing_practice;

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 文章表
CREATE TABLE IF NOT EXISTS articles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    language ENUM('uyghur', 'pinyin', 'english') NOT NULL,
    difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 测试记录表
CREATE TABLE IF NOT EXISTS test_records (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    article_id INT,
    test_type ENUM('uyghur', 'pinyin', 'english') NOT NULL,
    wpm DECIMAL(5,2) NOT NULL,
    accuracy DECIMAL(5,2) NOT NULL,
    total_characters INT NOT NULL,
    correct_characters INT NOT NULL,
    incorrect_characters INT NOT NULL,
    test_duration INT NOT NULL, -- 秒
    test_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE SET NULL
);

-- 用户设置表
CREATE TABLE IF NOT EXISTS user_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE,
    show_keyboard BOOLEAN DEFAULT TRUE,
    night_mode BOOLEAN DEFAULT FALSE,
    show_trajectory BOOLEAN DEFAULT FALSE,
    default_test_time INT DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 插入示例数据
INSERT INTO articles (title, content, language, difficulty) VALUES
-- 维吾尔语文章
('维吾尔语基础练习', 'ئۇيغۇر تىلى ئۆگىنىش پروگراممىسى. مەن ئۇيغۇر تىلىدا يېزىشنى ئۆگىنىمەن. بۇ بىر ئاددىي تىل ئۆگىنىش پروگراممىسى.', 'uyghur', 'easy'),
('维吾尔语进阶练习', 'تېز ۋە تەخت يېزىش ئۈچۈن مەشىق قىلىڭ. ھەر كۈنى مەشىق قىلسىڭىز تېزراق ئۆگىنىسىز. ئۇيغۇر تىلى بىزنىڭ ئانا تىلىمىز.', 'uyghur', 'medium'),
('维吾尔语高级练习', 'ئۇيغۇر مەدەنىيىتىنى ئۆگىنىش. ئۇيغۇر ئەدەبىياتىنى ئوقۇش. ئۇيغۇر تارىخىنى بىلىش. ئۇيغۇر خەلقىنىڭ ئەنئەنىۋى ئۇسۇللىرى.', 'uyghur', 'hard'),

-- 汉语拼音文章
('汉语拼音基础', 'ni hao wo shi zhong guo ren. wo ai wo de zu guo. zhong hua min zu wei da fu xing.', 'pinyin', 'easy'),
('汉语拼音进阶', 'chun tian dao le hua er kai le. xiao niao zai shu shang chang ge. tai yang gong gong zai tian shang xiao.', 'pinyin', 'medium'),
('汉语拼音高级', 'zhong hua wen ming yuan yuan liu chang. si da fa ming wei ren lei zuo chu le ju da gong xian. wo men yao ji cheng he fa yang you liang chuan tong.', 'pinyin', 'hard'),

-- 英文文章
('English Basic', 'Hello world. This is a typing test. Practice makes perfect. Keep typing to improve your speed.', 'english', 'easy'),
('English Intermediate', 'The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet. Typing is an essential skill in the digital age.', 'english', 'medium'),
('English Advanced', 'Technology has revolutionized the way we communicate and work. From typewriters to computers, the evolution of typing has been remarkable. Today, fast and accurate typing is crucial for productivity.', 'english', 'hard');

-- 创建索引以提高查询性能
CREATE INDEX idx_test_records_user_id ON test_records(user_id);
CREATE INDEX idx_test_records_test_date ON test_records(test_date);
CREATE INDEX idx_test_records_test_type ON test_records(test_type);
CREATE INDEX idx_articles_language ON articles(language);
CREATE INDEX idx_articles_difficulty ON articles(difficulty);
