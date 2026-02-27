import mongoose from 'mongoose';

const ReservationSchema = new mongoose.Schema(
	{
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phone: { type: String, required: true },
		slot: { type: String, required: true, enum: ['12th March', '13th March'] },
		partySize: { type: Number, required: true, min: 1 },
		job: {
			type: String,
			required: true,
			enum: ['DOP', 'Producer', 'Gaffer', 'DIT', 'Marketer'],
		},
		ownsSonyCamera: { type: Boolean, required: true },
		sonyModel: { type: String, default: '' },
		currentCamera: { type: String, required: true },
		matchingEnvironment: {
			type: String,
			required: true,
			enum: [
				'Yes, constantly',
				'Occasionally',
				'No, I usually stick to a single camera body',
			],
		},
		colorWorkflow: { type: String, required: true },
	},
	{ timestamps: true },
);

export default mongoose.models.Reservation ||
	mongoose.model('Reservation', ReservationSchema);
