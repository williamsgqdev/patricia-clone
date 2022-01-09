import styled from "styled-components";
import InfoIcon from "../icons/info.svg";
const Announcement = styled.div`
  background-color: #ebf9fc;
  padding: 20px 40px;
  border: 1px solid #98c6cd;
  border-radius: 10px;
  background-image: url("https://app.mypatricia.co/img/notification-bg.c9106fc0.svg");
  background-repeat: no-repeat;
  background-position: 100%;
`;

const AnnouncementTitle = styled.p`
  display: flex;
  font-weight: 600;
  font-size: 16px;
`;
const AnnouncementText = styled.p`
  line-height: 2.1rem;
  margin-left: 30px;
  font-size: 14px;
`;
const ImgInfo = styled.img`
  margin-right: 10px;
`;
const AnnouncementBoard = () => {
  return (
    <Announcement>
      <AnnouncementTitle>
        <ImgInfo src={InfoIcon} /> Beta Testing
      </AnnouncementTitle>
      <AnnouncementText>
        Hello Chief , <br /> We are rolling out a new P2P Deposit feature on
        Beta Testing. <br /> We are always here for you.
      </AnnouncementText>
    </Announcement>
  );
};

export default AnnouncementBoard;
