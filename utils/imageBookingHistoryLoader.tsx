const imageBookingHistory = {};

const importAll = (context) => {
  context.keys().forEach((key) => {
    const imageName = key.replace("./", "").replace(".jpg", ""); // Lấy tên file
    imageBookingHistory[imageName] = context(key);
  });
};

importAll(require.context("@/assets/images/bookingHistory", false, /\.jpg$/));

export default imageBookingHistory;
