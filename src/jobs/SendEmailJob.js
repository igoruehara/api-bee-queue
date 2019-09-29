const nodemailer = require("nodemailer");
class SendEmail {
	get key() {
		return "sendmail";
	}

	async handle({ data }) {
		const { teste } = data;

		console.log("SEND EMAIL OR SEND JOB=============================>" + " " + teste);

		return;
	}
}

module.exports = new SendEmail();


