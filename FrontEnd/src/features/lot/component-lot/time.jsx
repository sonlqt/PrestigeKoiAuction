/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";

function Time({ remainingTime, auctionId, startTime }) {
  // Hàm để chuyển đổi thời gian còn lại thành định dạng giờ:phút:giây
  const formatTime = (time) => {
    console.log("remain time: ", remainingTime);
    if (time < 0) return ""; // Trả về 0 nếu thời gian âm
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / 1000 / 60 / 60) % 24);
    const days = Math.floor(time / 1000 / 60 / 60 / 24);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="pl-20 pt-20">
      <h1 className="font-bold text-3xl text-[#bcab6f]">Auction#{auctionId}</h1>
      <h2 className="text-2xl text-white">
        {remainingTime === -1 ? "Ended" : formatTime(remainingTime)}
        {remainingTime === -2
          ? `Starting at ${new Date(startTime).toLocaleString()}`
          : ""}
      </h2>
    </div>
  );
}

Time.propTypes = {
  remainingTime: PropTypes.number.isRequired,
};

export default Time;
