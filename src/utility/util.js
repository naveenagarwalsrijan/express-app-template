const EmailService = require('../lib/services/email-service');

module.exports = {
  handleRuntimeError(error) {
    global.logger.log('error', 'From runtime error >>> %s', error);

    const emailService = new EmailService();
    emailService.sendEmail(error).catch(() => {
      global.logger.error('Exception occurred while sending email for service exception.');
    });
  },
};