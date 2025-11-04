const generateInvoice = () => {
  const currentDate = new Date();

  const prefix = `INV${currentDate.getFullYear()}${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}${String(currentDate.getDate()).padStart(2, "0")}`;

  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  return `${prefix}-${random}`;
};

module.exports = generateInvoice