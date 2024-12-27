import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// Dropdown items fetched from backend
const dropdownWeeks = [
  '113-1學期 第三週',
  '113-1學期 第四週',
  '113-1學期 第五週',
];

const feedbackdata = [
  {
    name: '林詩涵',
    feedback:
      '老師的課程講解非常清晰，特別是在講解數據結構時用的實例很貼近生活。不過希望能多一些實作練習的機會，這樣可以加深對概念的理解。',
    feedback2:
      '這學期的小組專案讓我學會了如何與團隊協作。雖然過程中遇到不少挑戰，但通過討論和互相支援，最終完成了一個令人滿意的作品。',
  },
  {
    name: '吳承翰',
    feedback:
      '課程內容充實，但進度稍快，建議可以在每個主題結束後多留一些時間讓我們消化和提問。實驗課的設計很有趣，讓我更容易理解理論知識。',
    feedback2:
      '期末專題的自由發揮空間很大，這讓我能夠結合自己的興趣來實踐所學。希望以後能有更多類似的創意任務。',
  },
  {
    name: '黃雅芝',
    feedback:
      '感謝老師在課後都願意留下來解答我們的問題。程式設計的部分講解得很仔細，對新手來說很友善。希望教材可以提前發放，方便預習。',
    feedback2:
      '分組討論的環節很有幫助，聽到其他同學的想法讓我學到很多。但小組報告的時間可以再延長一些。',
  },
  {
    name: '無待錚',
    feedback:
      '專題製作的指導很詳細，讓我學會了專案規劃和時間管理。不過作業量較大，建議可以適當調整，讓我們有更多時間深入研究感興趣的主題。',
    feedback2:
      '課堂上的即時互動很有趣，但希望能增加一些實際應用案例的分析，幫助我們理解知識在職場上的運用。',
  },
  {
    name: '陳思穎',
    feedback:
      '老師上課時會分享業界經驗，讓課程內容更貼近實際應用。希望可以安排一些業界專家來分享，增加我們對行業的了解。',
    feedback2:
      '線上學習平台的功能很完善，但有時會遇到技術問題。建議可以提供更詳細的平台使用教學。',
  },
  {
    name: '曾柏魚',
    feedback:
      '理論課程安排得很有條理，循序漸進。但有時作業的難度會突然提高，希望能有更多的範例說明和指導。',
    feedback2:
      '很喜歡課堂上的案例分析環節，但希望能有更多機會讓同學上台分享自己的想法和經驗。',
  },
  {
    name: '張芸瑄',
    feedback:
      '課程的實用性很高，特別是在教授新技術時會結合當前產業趨勢。建議可以提供更多額外的學習資源和延伸閱讀材料。',
    feedback2:
      '小組討論的時間安排得很好，但場地有時會太吵，影響討論品質。希望能有更適合的討論空間。',
  },
  {
    name: '章節',
    feedback:
      '老師的教學方式很活潑，善於用生活化的例子來解釋複雜的概念。不過課程簡報內容可以再豐富一些。',
    feedback2:
      '期中考試的難度適中，但考試範圍可以說明得更清楚一些。整體來說，考試能有效檢驗學習成果。',
  },
  {
    name: '蔡佩珊',
    feedback:
      '課程內容與實際應用結合得很好，但有時上課節奏太快，建議可以在重要概念上多花一些時間講解。',
    feedback2:
      '很感謝老師提供的課後輔導機會，這對學習困難的同學很有幫助。希望這類輔導時間能更有彈性。',
  },
  {
    name: '彭尙折',
    feedback:
      '作業設計很有創意，能激發思考。但繳交期限有時太緊湊，希望能提前公布作業內容，方便我們規劃時間。',
    feedback2:
      '課程的評分標準很清楚，但建議期末作業的比重可以再高一些，因為投入了很多心力。',
  },
  {
    name: '王采薇',
    feedback:
      '老師對待學生很有耐心，課堂氣氛輕鬆愉快。希望能增加一些戶外教學或參訪活動，增添學習樂趣。',
    feedback2:
      '小組作業的分組方式很公平，但建議可以讓同學有更多機會與不同的同學合作，增進交流。',
  },
  {
    name: '郭建志',
    feedback:
      '實驗課的器材很完善，助教的指導也很細心。但實驗前的說明可以再詳細一些，幫助我們更好地準備。',
    feedback2:
      '對課程安排的建議是可以增加一些業界專題研究的機會，讓我們更了解實際工作環境。',
  },
];
const groupfeedbackdata = [
  {
    group: 1,
    namelist: ['王小明', '張嘉欣', '王子豪', '陳志明'],
    feedback:
      '實驗課的器材很完善，助教的指導也很細心。但實驗前的說明可以再詳細一些，幫助我們更好地準備。',
    feedback2:
      '對課程安排的建議是可以增加一些業界專題研究的機會，讓我們更了解實際工作環境。',
  },
  {
    group: 2,
    namelist: ['林雅婷', '陳俊宏', '曾柏魚', '許瑋倫'],
    feedback:
      '小組討論時間的安排很合理，但希望能有更多跨組交流的機會。組內合作氣氛良好，每個人都積極參與。',
    feedback2:
      '專題研究的主題選擇很有挑戰性，讓我們學到了很多。建議可以提供更多研究方法的指導。',
  },
  {
    group: 3,
    namelist: ['黃思穎', '彭尙折', '吳雨珊', '蔡明宏'],
    feedback:
      '課程內容結構清晰，理論與實務結合得當。組員們都認為實作環節特別有幫助，加深了對概念的理解。',
    feedback2:
      '希望能增加更多即時互動的環節，例如案例分析或情境模擬。這樣可以提高學習興趣和參與度。',
  },
  {
    group: 4,
    namelist: ['謝佳芳', '楊志偉', '李美玲', '周子軒'],
    feedback:
      '團隊合作過程中，我們學會了如何有效溝通和分工。每個人都發揮所長，共同完成專案。',
    feedback2:
      '建議可以提供更多業界實例分析，讓我們更了解理論知識在實際工作中的應用。',
  },
  {
    group: 5,
    namelist: ['朱家瑋', '郭雅芬', '賴建志', '葉思伶'],
    feedback:
      '老師的教學方式很活潑，善於引導我們思考。小組討論時大家都能積極發言，互相學習。',
    feedback2: '期望能有更多機會練習簡報技巧，這對未來職涯發展很有幫助。',
  },
  {
    group: 6,
    namelist: ['莊雅婷', '洪志明', '徐佩珊', '江承翰'],
    feedback:
      '實作課程的設計很用心，讓我們能夠實際應用所學。組員間的配合度很高，互相支援。',
    feedback2: '建議可以安排一些工作坊形式的課程，增加實務操作的機會。',
  },
  {
    group: 7,
    namelist: ['鄭博文', '廖雅琪', '羅建業', '沈佳玲'],
    feedback:
      '小組報告的準備過程讓我們學到了很多，包括資料收集、分析和呈現的技巧。',
    feedback2: '希望能有更多與其他組別交流的機會，分享不同的觀點和經驗。',
  },
  {
    group: 8,
    namelist: ['曾昱銘', '無待錚', '彭俊傑', '胡佳琪'],
    feedback:
      '課程的評量方式多元化，不只是考試，還包括專案實作和報告，很能檢驗學習成果。',
    feedback2: '建議可以提供更多額外的學習資源，幫助我們深入研究感興趣的主題。',
  },
  {
    group: 9,
    namelist: ['馮志豪', '童雅文', '邱建德', '傅佳穎'],
    feedback: '組內討論氣氛融洽，每個人都能提出自己的觀點，互相尊重和學習。',
    feedback2: '希望能增加一些創新思考的培養，讓我們在專案中發揮更多創意。',
  },
  {
    group: 10,
    namelist: ['章節', '唐雅婷', '盧建宏', '趙佳琳'],
    feedback: '專題製作過程中，我們學會了如何整合不同觀點，共同解決問題。',
    feedback2: '建議可以安排一些企業參訪活動，增進對產業實務的了解。',
  },
];

// Styled Components
const Mainpage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const SearchField = styled.div`
  margin-top: 1.2rem;
  display: flex;
  justify-content: space-around;
  background-color: ${(props) =>
    props.userType === 'teacher'
      ? 'rgba(0, 76, 76, 0.6)'
      : props.userType === 'student'
        ? '#ffc8dd'
        : '#95a5a6'};
  padding: 0.8rem 1rem;
  margin-left: 5vw;
  width: 16rem;
  border-radius: 25px;
  position: relative; /* Needed for absolute positioning of DropdownMenu */
`;

const ButtonBox = styled.button`
  background-color: #ffffff;
  color: #000000;
  font-size: 1rem;
  border: none;
  border-radius: 20px;
  padding: 0.3rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.userType === 'teacher'
        ? '#53a7ba'
        : props.userType === 'student'
          ? '#ff8fab'
          : '#95a5a6'};

    color: #ffffff;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 80%; /* Align below the button */
  left: 0;
  margin-top: 5px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 1000;
  width: 100%; /* Match button width */
  display: ${({ visible }) =>
    visible ? 'flex' : 'none'}; /* Control visibility */
  flex-direction: column;
  border: 1px solid #ccc;

  div {
    color: #000000;
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

const FeedBackBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  background-color: inherit;
  width: 100vw;
  height: 90vh;
  border-radius: 20px;
  padding-left: 14vw;
  margin-top: 1rem;

  /* Add these properties */
  justify-content: ${(props) => (props.isScrolling ? 'flex-start' : 'center')};
  padding-bottom: ${(props) => (props.isScrolling ? '0' : '6rem')};
  overflow-y: auto; /* Enable vertical scrolling when content overflows */
  max-height: 90vh; /* Ensure consistent max height */

  /* Optional: Add custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  & > div {
    margin-right: 3vw;
    margin-bottom: 2rem;
  }

  & > div:last-child {
    margin-bottom: 0;
  }
`;
const FeedBackDialog = styled.div`
  color: #000000;
  background: ${(props) =>
    props.userType === 'teacher'
      ? 'linear-gradient(180deg,rgba(178, 216, 216, 0.7),rgba(102, 178, 178, 0.6),rgba(0, 128, 128, 0.5),rgba(0, 102, 102, 0.7),rgba(0, 76, 76, 0.7))'
      : props.userType === 'student'
        ? 'linear-gradient(180deg,#ffe5ec,#ffc2d1,#ffb3c6,#ff8fab,#fb6f92)'
        : '#95a5a6'};

  border-radius: 20px;
  padding: 1rem;
  font-size: 1.3rem;
  width: ${(props) => (props.isSingle ? '42vw' : '25vw')};
  & > div {
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
  & > div:last-child {
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.3rem;
    font-weight: normal;
    padding-left: 1rem;
    margin: 0;
  }
  div {
    padding: 0.5rem 2rem;
    background-color: #ffffff;
    font-size: 1rem;
    border-radius: 20px;
    color: inherit;
  }
`;
const GroupTitle = styled.div`
  display: flex;
  flex-direction: column;
  width: 10vw;
  & > div:first-child {
    font-size: 1.5rem;
  }
`;
const GroupRow = styled.div`
  display: flex;
  flex-direction: row;
`;
const NameList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  & > div {
    margin-right: 0.5rem;
    margin-top: 0.3rem;
  }
`;
const TableContainer = styled.div`
  display: flex;
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
  margin-top: 1rem;
  padding-left: 5vw;
`;

const ScrollableTable = styled.div`
  flex: 1;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
  }
`;

const ScrollableInnerTable = styled.table`
  min-width: 80vw; /* Ensure enough width for horizontal scroll */
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 0.4rem;
  text-align: center;
  background-color: #22577a;
  position: sticky;
  top: 0;
  height: 5rem;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1.3rem;
    height: 3rem;
    border-radius: 20px;
    background-color: ${(props) => (props.isHead ? 'inherit' : '#ffffff')};
    width: ${(props) => (props.isHead ? '6vw' : 'auto')};
  }
`;

const Td = styled.td`
  padding: 1rem 1.3rem;
  text-align: ${(props) => (props.isHead ? 'center' : 'left')};
  border: 1px solid #ccc;
  white-space: nowrap; /* Prevent text wrapping */
`;

const RowPlatte = ['#99babe', '#bee3db', '#faf9f9', '#ffd6ba'];
const TableRow = styled.tr`
  & > td:first-child {
    // group
    background-color: #007d87;
    font-weight: bold;
    color: #fff;
  }
  &:nth-child(4n + 2) {
    background-color: ${RowPlatte[0]};
  }
  &:nth-child(4n + 3) {
    background-color: ${RowPlatte[1]};
  }
  &:nth-child(4n + 4) {
    background-color: ${RowPlatte[2]};
  }
  &:nth-child(4n + 5) {
    background-color: ${RowPlatte[3]};
  }
`;
const Feedback = ({ params }) => {
  const token = localStorage.getItem('token');
  const [person, setPerson] = useState('個人');
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState('113-1學期 第三週');

  const getUserData = async () => {
    try {
      const response = await axios.get('http://se.bitx.tw:5000/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { user } = response.data;
      setUserName(user.name);
      setUserType(user.user_type);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
    // getCourseData();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectWeek = (week) => {
    setSelectedWeek(week);
    setDropdownVisible(false); // Close dropdown after selection
  };

  const changeType = () => {
    setPerson(person === '個人' ? '團體' : '個人');
  };

  const personRenderContent = () => {
    // !Debugging
    // console.log(
    //   'Rendering person content, userType:',
    //   userType,
    //   'userName:',
    //   userName
    // );
    if (userType === 'student') {
      for (let i = 0; i < feedbackdata.length; i++) {
        if (feedbackdata[i].name === userName) {
          return (
            <FeedBackBox isStudentView>
              <FeedBackDialog userType={userType} isSingle>
                <h2>回饋</h2>
                <div>{feedbackdata[i].feedback}</div>
                <h2>重點延伸思考方式以及建議</h2>
                <div>{feedbackdata[i].feedback2}</div>
              </FeedBackDialog>
            </FeedBackBox>
          );
        }
      }
    } else if (userType === 'teacher') {
      return (
        <FeedBackBox isScrolling>
          {feedbackdata.map((feed, index) => (
            <FeedBackDialog userType={userType} key={index}>
              <h2>{feed.name}</h2>
              <div>{feed.feedback}</div>
            </FeedBackDialog>
          ))}
        </FeedBackBox>
      );
    }
  };
  const groupRenderContent = () => {
    // !Debugging
    // console.log(
    //   'Rendering group content, userType:',
    //   userType,
    //   'userName:',
    //   userName
    // );
    if (userType === 'student') {
      for (let i = 0; i < groupfeedbackdata.length; i++) {
        if (groupfeedbackdata[i].namelist.includes(userName)) {
          return (
            <FeedBackBox>
              <GroupTitle>
                <div>第 {groupfeedbackdata[i].group} 組</div>
                <NameList>
                  {groupfeedbackdata[i].namelist.map((name) => (
                    <div>{name}</div>
                  ))}
                </NameList>
              </GroupTitle>
              <FeedBackDialog isSingle userType={userType}>
                <h2>回饋</h2>
                <div>{groupfeedbackdata[i].feedback}</div>
                <h2>重點延伸思考方式以及建議</h2>
                <div>{groupfeedbackdata[i].feedback2}</div>
              </FeedBackDialog>
            </FeedBackBox>
          );
        }
      }
    } else if (userType === 'teacher') {
      return (
        <FeedBackBox isScrolling>
          {groupfeedbackdata.map((group, index) => (
            <GroupRow>
              <GroupTitle>
                <div>第 {group.group} 組</div>
                <NameList>
                  {group.namelist.map((name) => (
                    <div>{name}</div>
                  ))}
                </NameList>
              </GroupTitle>
              <FeedBackDialog userType={userType}>
                <h2>回饋</h2>
                <div>{group.feedback}</div>
                <h2>重點延伸思考方式以及建議</h2>
                <div>{group.feedback2}</div>
              </FeedBackDialog>
            </GroupRow>
          ))}
        </FeedBackBox>
        // Old version
        // <TableContainer>
        //   <ScrollableTable>
        //     <ScrollableInnerTable>
        //       <thead>
        //         <tr>
        //           <Th isHead>
        //             <div></div>
        //           </Th>
        //           {groupfeedbackdata[0].feedbacklist.map((feed, index) => (
        //             <Th key={index}>
        //               <div>{feed.section}</div>
        //             </Th>
        //           ))}
        //         </tr>
        //       </thead>
        //       <tbody>
        //         {groupfeedbackdata.map((group, index) => (
        //           <TableRow key={index}>
        //             <Td isHead>第 {group.group} 組</Td>
        //             {group.feedbacklist.map((feed, index) => (
        //               <Td key={index}>{feed.feedback}</Td>
        //             ))}
        //           </TableRow>
        //         ))}
        //       </tbody>
        //     </ScrollableInnerTable>
        //   </ScrollableTable>
        // </TableContainer>
      );
    }
  };
  return (
    <Mainpage>
      <SearchField userType={userType}>
        {/* Dropdown Wrapper for Button and Menu */}
        <DropdownWrapper
          onMouseEnter={() => setDropdownVisible(true)}
          onMouseLeave={() => setDropdownVisible(false)}
        >
          <ButtonBox userType={userType}>{selectedWeek}</ButtonBox>
          <DropdownMenu visible={dropdownVisible}>
            {dropdownWeeks.map((week) => (
              <div key={week} onClick={() => selectWeek(week)}>
                {week}
              </div>
            ))}
          </DropdownMenu>
        </DropdownWrapper>
        <ButtonBox userType={userType} onClick={changeType}>
          {person}
        </ButtonBox>
      </SearchField>
      {/* !Debugging */}
      {/* {console.log('Current person state:', person)} */}
      {person === '個人' ? personRenderContent() : groupRenderContent()}
    </Mainpage>
  );
};

export default Feedback;
