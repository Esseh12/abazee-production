'use client';

import { useState } from 'react';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import RadioGroup from './RadioGroup';
import TextareaInput from './TextareaInput';
import SuccessModal from '../Modal/SuccessModal';

const initialState = {
	firstname: '',
	lastname: '',
	email: '',
	phone: '',
	slot: '',
	partySize: '',
	job: '',
	ownsSonyCamera: '',
	sonyModel: '',
	currentCamera: '',
	matchingEnvironment: '',
	colorWorkflow: '',
};

export default function ReservationForm() {
	const [formData, setFormData] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const required = [
			'firstname',
			'lastname',
			'email',
			'phone',
			'slot',
			'partySize',
			'job',
			'ownsSonyCamera',
			'currentCamera',
			'matchingEnvironment',
			'colorWorkflow',
		];

		for (const field of required) {
			if (!formData[field]) {
				alert('Please fill in all required fields.');
				setLoading(false);
				return;
			}
		}

		if (formData.ownsSonyCamera === 'true' && !formData.sonyModel.trim()) {
			alert('Please enter your Sony camera model.');
			setLoading(false);
			return;
		}

		const phoneRegex = /^[0-9+\s()-]+$/;
		if (!phoneRegex.test(formData.phone)) {
			alert('Please enter a valid phone number.');
			setLoading(false);
			return;
		}

		try {
			const response = await fetch('/api/reservations', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...formData,
					email: formData.email.trim().toLowerCase(),
					firstname: formData.firstname.trim(),
					lastname: formData.lastname.trim(),
					partySize: Number(formData.partySize),
					ownsSonyCamera: formData.ownsSonyCamera === 'true',
				}),
			});

			const result = await response.json();

			if (!result.success) {
				alert(result.message);
				setLoading(false);
				return;
			}

			setSuccess(true);
			setFormData(initialState);
		} catch (error) {
			console.error('Submit Error:', error);
			alert('Something went wrong. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const ownsSony = formData.ownsSonyCamera === 'true';

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className='space-y-8 mt-10 w-full max-w-2xl'>
				{/* Name */}
				<div className='grid sm:grid-cols-2 gap-4'>
					<TextInput
						label='First Name'
						name='firstname'
						value={formData.firstname}
						onChange={handleChange}
						required
						placeholder='John'
					/>
					<TextInput
						label='Last Name'
						name='lastname'
						value={formData.lastname}
						onChange={handleChange}
						required
						placeholder='Doe'
					/>
				</div>

				{/* Contact */}
				<div className='grid sm:grid-cols-2 gap-4'>
					<TextInput
						label='Email'
						name='email'
						type='email'
						value={formData.email}
						onChange={handleChange}
						required
						placeholder='john@email.com'
					/>
					<TextInput
						label='Telephone'
						name='phone'
						type='tel'
						value={formData.phone}
						onChange={handleChange}
						required
						placeholder='+234 800 000 0000'
					/>
				</div>

				{/* Slot */}
				<RadioGroup
					label='Slot Attending'
					name='slot'
					value={formData.slot}
					onChange={handleChange}
					required
					options={[
						{ value: '12th March', label: '12th March' },
						{ value: '13th March', label: '13th March' },
					]}
				/>

				{/* Party size */}
				<TextInput
					label='How Many in Your Party?'
					name='partySize'
					type='number'
					value={formData.partySize}
					onChange={handleChange}
					required
					placeholder='1'
					inputMode='numeric'
				/>

				{/* Job role */}
				<SelectInput
					label='Your Role'
					name='job'
					value={formData.job}
					onChange={handleChange}
					required
					placeholder='Select your role'
					options={['DOP', 'Producer', 'Gaffer', 'DIT', 'Marketer']}
				/>

				{/* Divider */}
				<div className='border-t border-zinc-800 pt-2'>
					<p className='text-xs font-semibold uppercase tracking-widest text-zinc-500'>
						Camera Details
					</p>
				</div>

				{/* Sony ownership */}
				<RadioGroup
					label='Do You Own a Sony Camera?'
					name='ownsSonyCamera'
					value={formData.ownsSonyCamera}
					onChange={handleChange}
					required
					options={[
						{ value: 'true', label: 'Yes' },
						{ value: 'false', label: 'No' },
					]}
				/>

				{/* Sony model — only shown if they own one */}
				{ownsSony && (
					<TextInput
						label='Sony Camera Model'
						name='sonyModel'
						value={formData.sonyModel}
						onChange={handleChange}
						required
						placeholder='e.g. Sony FX3, A7S III'
					/>
				)}

				{/* Current camera */}
				<TextInput
					label='What Camera Do You Currently Shoot With?'
					name='currentCamera'
					value={formData.currentCamera}
					onChange={handleChange}
					required
					placeholder='e.g. Canon C70, Blackmagic Pocket 6K'
				/>

				{/* Matching environment */}
				<div className='flex flex-col gap-3'>
					<label className='text-xs font-semibold uppercase tracking-widest text-zinc-400'>
						Do you frequently shoot in environments where you need to match a
						primary cinema camera with alpha mirrorless bodies (e.g. Sony FX2)?
						<span className='text-amber-500 ml-1'>*</span>
					</label>
					<div className='flex flex-col gap-3'>
						{[
							'Yes, constantly',
							'Occasionally',
							'No, I usually stick to a single camera body',
						].map((option) => {
							const isSelected = formData.matchingEnvironment === option;
							return (
								<label
									key={option}
									className={`flex items-center gap-3 border rounded-md px-4 py-3 cursor-pointer transition-all text-sm
                    ${
											isSelected ?
												'border-amber-500 bg-amber-500/10 text-white'
											:	'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500'
										}`}>
									<input
										type='radio'
										name='matchingEnvironment'
										value={option}
										checked={isSelected}
										onChange={handleChange}
										className='hidden'
									/>
									<span
										className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${isSelected ? 'border-amber-500' : 'border-zinc-600'}`}>
										{isSelected && (
											<span className='w-2 h-2 rounded-full bg-amber-500' />
										)}
									</span>
									{option}
								</label>
							);
						})}
					</div>
				</div>

				{/* Color workflow */}
				<TextareaInput
					label='What is Your Current Post-Production Color Workflow?'
					name='colorWorkflow'
					value={formData.colorWorkflow}
					onChange={handleChange}
					required
					placeholder='e.g. DaVinci Resolve with s709 LUTs, Premiere Pro with custom LUTs...'
				/>

				<button
					type='submit'
					disabled={loading}
					className='w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed
            text-black font-bold py-4 rounded-lg text-sm uppercase tracking-widest transition-colors cursor-pointer'>
					{loading ? 'Submitting...' : 'Submit RSVP'}
				</button>
			</form>

			<SuccessModal
				isOpen={success}
				onClose={() => setSuccess(false)}
			/>
		</>
	);
}
