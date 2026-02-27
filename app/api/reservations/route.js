import { connectDB } from '@/lib/mongodb';
import Reservation from '@/models/Reservation';
import nodemailer from 'nodemailer';
import { reservationEmailTemplate } from '@/app/email-templates/reservationEmail';

export async function POST(req) {
	try {
		await connectDB();
		const body = await req.json();

		const {
			firstname,
			lastname,
			email,
			phone,
			slot,
			partySize,
			job,
			ownsSonyCamera,
			sonyModel,
			currentCamera,
			matchingEnvironment,
			colorWorkflow,
		} = body;

		// Check duplicate email
		const existing = await Reservation.findOne({ email });
		if (existing) {
			return Response.json(
				{ success: false, message: 'This email has already been registered.' },
				{ status: 400 },
			);
		}

		await Reservation.create({
			firstname,
			lastname,
			email,
			phone,
			slot,
			partySize,
			job,
			ownsSonyCamera,
			sonyModel: ownsSonyCamera ? sonyModel : '',
			currentCamera,
			matchingEnvironment,
			colorWorkflow,
		});

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.GMAIL_USERNAME,
				pass: process.env.GMAIL_PASSWORD,
			},
		});

		const htmlTemplate = reservationEmailTemplate({
			firstname,
			lastname,
			email,
			phone,
			slot,
			partySize,
			job,
		});

		await transporter.sendMail({
			from: `"Sony Event Team" <${process.env.GMAIL_USERNAME}>`,
			to: email,
			subject: 'Your RSVP is Confirmed',
			html: htmlTemplate,
		});

		return Response.json(
			{
				success: true,
				message: 'RSVP successful! Check your email for confirmation.',
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error('API ERROR:', error);
		return Response.json(
			{ success: false, message: error.message || 'Server error' },
			{ status: 500 },
		);
	}
}
