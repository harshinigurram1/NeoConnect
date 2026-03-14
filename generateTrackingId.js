let counter = 1;

const generateTrackingId = () => {
  const year = new Date().getFullYear();
  const id = `NEO-${year}-${String(counter).padStart(3, "0")}`;
  counter++;
  return id;
};

module.exports = generateTrackingId;