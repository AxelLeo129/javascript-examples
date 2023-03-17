const bcrypt = require("bcryptjs");

const encrypt = async (textPplain) => {
    return await bcrypt.hash(textPplain, 10);
}

module.exports = { encrypt };