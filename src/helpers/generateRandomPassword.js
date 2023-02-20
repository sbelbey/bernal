module.exports = {
  generateRandomPassword: () => {
    let password = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!-';
    for (let i = 1; i <= 12; i++) {
      let char = Math.floor(Math.random() * characters.length + 1);
      password += characters.charAt(char);
    }
    return password;
  },
};
