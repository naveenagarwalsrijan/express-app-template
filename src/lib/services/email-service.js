const request = require('request-promise-native');

class EmailService {
  constructor() {
    this.eventBusUri = `${global.config.eventBusUrl}/topics/${global.config.emailPublishTopic}/events`;
  }

  buildEmail(params = {}) {
    let mailOptions = {};
    mailOptions['subject'] = global.env.toUpperCase() + ' - ' + global.config.exceptionMessage;
    mailOptions['from'] = global.config.emailFrom;
    mailOptions['to'] = global.config.emailTo;
    mailOptions['cc'] = global.config.cc;
    mailOptions['message'] = `
      Runtime exception occured.<br><br>Error log ::<br>
      error: ${String(params.message)},
      <br>
			stackTrace: ${String(params.stack).replace(/^(\s{4})(at)/gm, '<br>&nbsp;&nbsp;&nbsp;&nbsp;at')
      }`;
    return mailOptions;
  }

  sendEmail(params) {
    global.logger.info('***** Trigger email *****');

    let mailOptions = this.buildEmail(params);
    const requestBody = { event: 'publish', message: 'Send Mail', message_attributes: mailOptions };
    const options = {
      uri: this.eventBusUri,
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: requestBody,
      json: true
    };
    global.logger.log('info', 'request options >>> %s', mailOptions);

    return request(options);
  }
}

module.exports = EmailService;