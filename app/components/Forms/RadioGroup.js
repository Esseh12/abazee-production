'use client';

export default function RadioGroup({
	label,
	name,
	value,
	onChange,
	options,
	required,
}) {
	return (
		<div className='flex flex-col gap-3'>
			<label className='text-xs font-semibold uppercase tracking-widest text-zinc-400'>
				{label}
				{required && <span className='text-amber-500 ml-1'>*</span>}
			</label>
			<div className='flex flex-col sm:flex-row gap-3'>
				{options.map((option) => {
					const isSelected = value === option.value;
					return (
						<label
							key={option.value}
							className={`flex items-center gap-3 flex-1 border rounded-md px-4 py-3 cursor-pointer transition-all text-sm
                ${
									isSelected ?
										'border-amber-500 bg-amber-500/10 text-white'
									:	'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500'
								}`}>
							<input
								type='radio'
								name={name}
								value={option.value}
								checked={isSelected}
								onChange={onChange}
								required={required}
								className='hidden'
							/>
							<span
								className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                  ${isSelected ? 'border-amber-500' : 'border-zinc-600'}`}>
								{isSelected && (
									<span className='w-2 h-2 rounded-full bg-amber-500' />
								)}
							</span>
							{option.label}
						</label>
					);
				})}
			</div>
		</div>
	);
}
