import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TechSheepLogo from './Logo';
import TypingPractice from './TypingPractice';
import { Button, Radio, Space, Card, Avatar, Typography, Layout, Row, Col, Dropdown, Menu } from 'antd';
import { GlobalOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

interface UserAchievement {
  id: number;
  name: string;
  avatar: string;
  wordsCompleted: number;
  speed: number;
  accuracy: number;
  time: string;
  language: string;
  message: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  
  // 从URL参数确定当前语言类型
  const currentLanguage = params.language as 'uyghur' | 'pinyin' | 'english' | undefined;
  // 模拟用户战绩数据
  const mockAchievements: UserAchievement[] = [
    {
      id: 1,
      name: "艾力",
      avatar: "艾",
      wordsCompleted: 200,
      speed: 45,
      accuracy: 98,
      time: "5分钟前",
      language: "维吾尔语",
      message: "刚刚完成了200个单词的练习，速度45字/分钟，准确率98%！"
    },
    {
      id: 2,
      name: "古丽",
      avatar: "古",
      wordsCompleted: 150,
      speed: 38,
      accuracy: 95,
      time: "10分钟前",
      language: "维吾尔语",
      message: "完成了句子练习，速度38字/分钟，准确率95%，继续加油！"
    },
    {
      id: 3,
      name: "买买提",
      avatar: "买",
      wordsCompleted: 300,
      speed: 52,
      accuracy: 96,
      time: "15分钟前",
      language: "维吾尔语",
      message: "文章练习完成，速度52字/分钟，准确率96%，进步很大！"
    },
    {
      id: 4,
      name: "热依拉",
      avatar: "热",
      wordsCompleted: 180,
      speed: 42,
      accuracy: 97,
      time: "20分钟前",
      language: "维吾尔语",
      message: "单词练习完成，速度42字/分钟，准确率97%，表现优秀！"
    },
    {
      id: 5,
      name: "阿布都",
      avatar: "阿",
      wordsCompleted: 250,
      speed: 48,
      accuracy: 94,
      time: "25分钟前",
      language: "维吾尔语",
      message: "句子练习完成，速度48字/分钟，准确率94%，再接再厉！"
    },
    {
      id: 6,
      name: "帕提古丽",
      avatar: "帕",
      wordsCompleted: 220,
      speed: 40,
      accuracy: 99,
      time: "30分钟前",
      language: "维吾尔语",
      message: "文章练习完成，速度40字/分钟，准确率99%，非常棒！"
    }
  ];

  // 轮播配置
  const VISIBLE = 4; // 同时可见卡片数量
  const ANIM_MS = 500; // 动画时长

  // 轮播内部状态
  const [index, setIndex] = useState(0); // 当前偏移索引（0..mockAchievements.length）
  const [cardWidth, setCardWidth] = useState(0); // 计算出的单卡像素宽度
  const [enableTransition, setEnableTransition] = useState(true); // 是否启用过渡（用于无缝跳转时关闭）

  // 引用 DOM
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [selectedLanguage, setSelectedLanguage] = useState<'uyghur' | 'pinyin' | 'english'>('uyghur');
  const [selectedType, setSelectedType] = useState<'word' | 'sentence' | 'article'>('word');
  const [activeTab, setActiveTab] = useState(currentLanguage ? 'typing' : 'typing');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentLang, setCurrentLang] = useState('中文');

  // 当URL参数变化时更新选中的语言和activeTab
  useEffect(() => {
    if (currentLanguage) {
      setSelectedLanguage(currentLanguage);
      setActiveTab('typing');
    }
  }, [currentLanguage]);

  const handleStartPractice = () => {
    navigate(`/typing/${selectedLanguage}`);
  };

  // 计算卡片宽度（基于容器宽度 / 可见数量）
  useEffect(() => {
    function recalc() {
      if (carouselRef.current) {
        const w = carouselRef.current.clientWidth;
        const single = Math.floor(w / VISIBLE); // 像素取整，避免小数累积
        setCardWidth(single);
      }
    }
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, []);

  // 自动轮播（每 5s 前进 1 卡）
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 当到达「克隆区域」时（index === 原始长度），在动画结束后无缝跳回 0
  useEffect(() => {
    if (index === mockAchievements.length) {
      // 动画结束后去掉过渡并回到 0
      const t = setTimeout(() => {
        setEnableTransition(false);
        setIndex(0);
        // 下一帧再打开过渡
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setEnableTransition(true));
        });
      }, ANIM_MS);
      return () => clearTimeout(t);
    }
  }, [index, mockAchievements.length]);

  // 需要渲染的列表 = 原始 + 克隆前 VISIBLE 个
  const renderList = [...mockAchievements, ...mockAchievements.slice(0, VISIBLE)];

  // 语言菜单项
  const languageMenu = (
    <Menu
      items={[
        {
          key: 'chinese',
          label: '中文',
          onClick: () => setCurrentLang('中文')
        },
        {
          key: 'english',
          label: 'English',
          onClick: () => setCurrentLang('English')
        },
        {
          key: 'uyghur',
          label: 'ئۇيغۇرچە',
          onClick: () => setCurrentLang('ئۇيغۇرچە')
        }
      ]}
    />
  );

  return (
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e6f7ff 0%, #f0f9ff 100%)' }}>
      {/* 顶部导航栏 - 始终显示 */}
      <Header style={{ 
        background: '#fff', 
        borderBottom: '2px solid #1890ff',
        boxShadow: '0 2px 8px rgba(24, 144, 255, 0.1)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo区域 */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
          gap: 12, 
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '8px',
          transition: 'background-color 0.2s'
        }}
        onClick={() => navigate('/')}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f9ff'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <div style={{width:48,height:48,display:'flex',alignItems:'center',justifyContent:'center',border:'1px dashed #1890ff',borderRadius:8,background:'#f0f9ff'}}>
          <TechSheepLogo size={40} style={{ display: 'block' }} />
        </div>
        <Title level={3} style={{ margin: 0, background: 'linear-gradient(90deg,#1890ff,#52b4ff)', WebkitBackgroundClip: 'text', color: 'transparent', fontWeight: 700, letterSpacing: '.5px' }}>
          HatHat
        </Title>
      </div>

      {/* Tab导航（保留 打字练习 / 更多文章 / 排行榜） */}
      <Space size="large">
        <Button 
          type={activeTab === 'typing' ? 'primary' : 'text'} 
          onClick={() => {
            setActiveTab('typing');
            if (!currentLanguage) {
              navigate('/');
            }
          }}
        >
          打字练习
        </Button>
        <Button 
          type={activeTab === 'articles' ? 'primary' : 'text'} 
          onClick={() => {
            setActiveTab('articles');
            navigate('/');
          }}
        >
          更多文章
        </Button>
        <Button 
          type={activeTab === 'ranking' ? 'primary' : 'text'} 
          onClick={() => {
            setActiveTab('ranking');
            navigate('/');
          }}
        >
          排行榜
        </Button>
      </Space>

      {/* 用户管理区域 - 始终显示 */}
      <Space size="middle">
        <Dropdown overlay={languageMenu} trigger={['click']}>
          <Button 
            type="text" 
            style={{ 
              color: '#1890ff',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <GlobalOutlined />
            <span style={{ fontSize: '12px' }}>{currentLang}</span>
            <DownOutlined style={{ fontSize: '10px' }} />
          </Button>
        </Dropdown>
        <Avatar 
          icon={<UserOutlined />} 
          style={{ backgroundColor: '#1890ff', cursor: 'pointer' }}
          onClick={() => setShowUserMenu(!showUserMenu)}
        />
      </Space>
    </Header>

      {/* 主要内容区域 */}
      <Content style={{ padding: '24px', flex: 1 }}>
        {/* 如果在练习模式且activeTab是typing，显示练习页面 */}
        {currentLanguage && activeTab === 'typing' ? (
          <TypingPractice testType={currentLanguage} />
        ) : (
          /* 否则显示默认的选择界面 */
          <Row justify="center">
            <Col xs={24} sm={20} md={16} lg={12} xl={10}>
              <Card 
                style={{ 
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(24, 144, 255, 0.1)',
                  border: '1px solid #e6f7ff'
                }}
              >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  {/* 测试类型选择 */}
                  <div>
                    <Text strong style={{ color: '#1890ff', fontSize: '16px', marginBottom: '12px', display: 'block' }}>输入法:</Text>
                    <Radio.Group 
                      value={selectedLanguage} 
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                    >
                      <Space direction="vertical">
                        <Radio value="english">英文打字</Radio>
                        <Radio value="pinyin">中文拼音打字</Radio>
                        <Radio value="uyghur">维吾尔语打字</Radio>
                      </Space>
                    </Radio.Group>
                  </div>

                  {/* 练习类型选择 */}
                  <div>
                    <Text strong style={{ color: '#1890ff', fontSize: '16px', marginBottom: '12px', display: 'block' }}>类型:</Text>
                    <Radio.Group 
                      value={selectedType} 
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <Space direction="vertical">
                        <Radio value="word">单词练习</Radio>
                        <Radio value="sentence">句子练习</Radio>
                        <Radio value="article">文章练习</Radio>
                      </Space>
                    </Radio.Group>
                  </div>

                  {/* 开始练习按钮 */}
                  <Button 
                    type="primary" 
                    size="middle" 
                    block
                    onClick={handleStartPractice}
                    style={{
                      height: '36px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
                      border: 'none',
                      borderRadius: '6px'
                    }}
                  >
                    开始练习
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        )}
      </Content>

      {/* 底部用户战绩轮播图 - 只在非练习模式下显示 */}
      {!(currentLanguage && activeTab === 'typing') && (
        <div
          ref={carouselRef}
          style={{
            background: '#fff',
            borderTop: '1px solid #e6f7ff',
            padding: '12px 0 20px', // 上下缩短让整体比例更紧凑
            overflow: 'hidden'
          }}
        >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            willChange: 'transform',
            transition: enableTransition ? `transform ${ANIM_MS}ms ease` : 'none',
            transform: `translateX(-${index * (cardWidth || 0)}px)`
          }}
        >
          {renderList.map((achievement, i) => (
            <div
              key={`${achievement.id}-${i}`}
              style={{
                flex: `0 0 ${cardWidth ? cardWidth + 'px' : 100 / VISIBLE + '%'}`,
                boxSizing: 'border-box',
                padding: '0 10px'
              }}
            >
              <Card
                size="small"
                bodyStyle={{ padding: '10px 12px 12px' }}
                style={{
                  height: 135, // 调整 +5px
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '10px',
                  border: '1px solid #e0f1ff',
                  background: 'linear-gradient(135deg, #f5fbff 0%, #e8f5ff 100%)',
                  boxShadow: '0 2px 4px rgba(24,144,255,0.08)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Avatar style={{ backgroundColor: '#1890ff' }} size={24}>
                    <span style={{ fontSize: 12 }}>{achievement.avatar}</span>
                  </Avatar>
                  <Text strong style={{ color: '#1890ff', fontSize: 12 }}>@{achievement.name}</Text>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    lineHeight: '1.3',
                    color: '#555',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {achievement.message}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ fontSize: 10, color: '#999' }}>{achievement.time}</span>
                  <span style={{ fontSize: 10, color: '#52c41a', fontWeight: 500 }}>{achievement.speed}字/分</span>
                </div>
              </Card>
            </div>
          ))}
        </div>
        </div>
      )}
    </Layout>
  );
};

export default HomePage;